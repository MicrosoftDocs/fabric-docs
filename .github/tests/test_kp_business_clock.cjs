const test = require('node:test');
const assert = require('node:assert/strict');
const {isDue, reconcile, readClock, PREFIX} = require('../scripts/kp-business-clock.cjs');

test('72 elapsed Redmond weekday hours, not office hours or calendar-date counting', () => {
  const due = (start, end) => isDue(start, Date.parse(end), 3);
  // Friday noon PDT -> Wednesday noon PDT; the entire weekend is excluded.
  assert.equal(due('2026-10-23T19:00:00Z', '2026-10-26T19:00:00Z'), false);
  assert.equal(due('2026-10-23T19:00:00Z', '2026-10-28T18:59:59Z'), false);
  assert.equal(due('2026-10-23T19:00:00Z', '2026-10-28T19:00:00Z'), true);
  // UTC Saturday is still Friday evening in Redmond.
  assert.equal(due('2026-10-24T06:00:00Z', '2026-10-29T06:00:00Z'), true);
  assert.equal(due('2026-10-24T07:00:00Z', '2026-10-29T06:59:59Z'), false);
  assert.equal(due('2026-10-24T07:00:00Z', '2026-10-29T07:00:00Z'), true);
  // DST changes on the excluded Sunday: local deadline remains Wednesday noon.
  assert.equal(due('2026-03-06T20:00:00Z', '2026-03-11T18:59:59Z'), false);
  assert.equal(due('2026-03-06T20:00:00Z', '2026-03-11T19:00:00Z'), true);
  assert.equal(due('2026-10-30T19:00:00Z', '2026-11-04T19:59:59Z'), false);
  assert.equal(due('2026-10-30T19:00:00Z', '2026-11-04T20:00:00Z'), true);
  assert.equal(due('2026-10-28T19:00:00Z', '2026-10-27T19:00:00Z'), false);
  assert.throws(() => due('invalid', '2026-10-28T19:00:00Z'), /Invalid/);
  assert.throws(() => isDue('2026-10-23T19:00:00Z', Date.now(), -1), /Invalid/);
});

function fixture() {
  Object.assign(process.env, {
    EVENT_LABEL: 'conference-event', REMINDER_DUE_LABEL: 'kp-reminder-due',
    AUTHOR_REMINDER_LABEL: 'kp-author-stalepr', EXEMPT_LABEL: 'keep-open',
    AUTHOR_REMINDER_MESSAGE: 'Existing author reminder', INACTIVITY_DAYS: '3'
  });
  let now = Date.parse('2026-10-26T19:00:00Z');
  const comments = [], events = [], writes = [];
  const pr = {number: 42, state: 'open', draft: false, title: 'Title', body: 'Body',
    head: {sha: 'abc'}, base: {ref: 'release-ignite26-test'},
    updated_at: '2026-10-23T19:00:00Z', labels: [{name: 'conference-event'}],
    assignees: [], requested_reviewers: [], requested_teams: []};
  const stamp = () => new Date(now += 1000).toISOString();
  function label(name, add) {
    pr.labels = pr.labels.filter(item => item.name !== name);
    if (add) pr.labels.push({name});
    pr.updated_at = stamp();
    events.push({event: add ? 'labeled' : 'unlabeled', label: {name},
      actor: {login: 'github-actions[bot]'}, created_at: pr.updated_at});
    writes.push([add ? 'add' : 'remove', name]);
  }
  const get = async () => ({data: structuredClone(pr)});
  const endpoints = {
    list: () => {}, get,
    listComments: () => {}, listEventsForTimeline: () => {},
    getLabel: async () => ({data: {name: 'kp-reminder-due'}}),
    createComment: async ({body}) => {
      const comment = {id: comments.length + 1, body, user: {login: 'github-actions[bot]'},
        created_at: stamp()};
      comment.updated_at = comment.created_at;
      comments.push(comment); pr.updated_at = comment.updated_at;
      writes.push(['comment', body]);
      return {data: structuredClone(comment)};
    },
    updateComment: async ({comment_id, body}) => {
      const comment = comments.find(item => item.id === comment_id);
      comment.body = body; comment.updated_at = stamp(); pr.updated_at = comment.updated_at;
      writes.push(['update', body]);
      return {data: structuredClone(comment)};
    },
    addLabels: async ({labels}) => {for (const name of labels) label(name, true);},
    removeLabel: async ({name}) => label(name, false)
  };
  const paginate = async endpoint => structuredClone(
    endpoint === endpoints.listComments ? comments : events);
  paginate.iterator = async function* () {yield {data: [structuredClone(pr)]};};
  const github = {rest: {pulls: {list: endpoints.list, get},
    issues: endpoints}, paginate};
  const run = () => reconcile({github, context: {repo: {owner: 'test', repo: 'repo'}},
    core: {info() {}}, now});
  return {pr, comments, events, writes, github, run, label,
    setTime: value => {now = Date.parse(value);},
    humanComment: () => {
      pr.updated_at = stamp();
      comments.push({id: comments.length + 1, body: 'Author activity',
        user: {login: 'author'}, created_at: pr.updated_at, updated_at: pr.updated_at});
    }};
}

test('initialization, due bookkeeping, stock reminder, activity cleanup and reset', async () => {
  const f = fixture();
  await f.run();
  assert.equal(readClock(f.comments[0]).activityAt, '2026-10-23T19:00:00Z');
  await f.run();
  assert.equal(f.pr.labels.some(l => l.name === 'kp-reminder-due'), false);
  f.setTime('2026-10-28T19:01:00Z');
  await f.run();
  assert.equal(f.pr.labels.some(l => l.name === 'kp-reminder-due'), true);
  // Represent stock stale's comment-then-marker writes, not a custom commenter.
  await f.github.rest.issues.createComment({body: process.env.AUTHOR_REMINDER_MESSAGE});
  f.label('kp-author-stalepr', true);
  const count = f.writes.length;
  await f.run();
  assert.equal(f.writes.length, count, 'bookkeeping must not rewrite the clock or due label');
  assert.equal(readClock(f.comments[0]).activityAt, '2026-10-23T19:00:00Z');
  f.setTime('2026-10-29T20:00:00Z');
  f.humanComment();
  const activityAt = f.pr.updated_at;
  await f.run();
  assert.equal(readClock(f.comments[0]).activityAt, activityAt);
  assert.equal(f.pr.labels.some(l => l.name === 'kp-reminder-due'), false);
  assert.equal(f.pr.labels.some(l => l.name === 'kp-author-stalepr'), true);
  // The marker itself keeps the PR in stock stale's any-of label filter.
  f.label('kp-author-stalepr', false);
  await f.run();
  assert.equal(f.pr.labels.some(l => l.name === 'kp-reminder-due'), false);
  const resetWrites = f.writes.length;
  await f.run();
  assert.equal(f.writes.length, resetWrites, 'cleanup and due removal must not restart the clock');
  assert.equal(readClock(f.comments[0]).activityAt, activityAt);
});

test('body/commit/label changes reset; drafts/exemptions and absent membership never become due', async () => {
  for (const change of [
    f => {f.pr.body = 'Edited';},
    f => {f.pr.head.sha = 'def';},
    f => {f.pr.labels.push({name: 'human-label'});}
  ]) {
    const f = fixture();
    await f.run();
    change(f); f.pr.updated_at = '2026-10-27T21:00:00Z';
    f.setTime('2026-10-28T19:01:00Z');
    await f.run();
    assert.equal(readClock(f.comments[0]).activityAt, '2026-10-27T21:00:00Z');
    assert.equal(f.pr.labels.some(l => l.name === 'kp-reminder-due'), false);
  }
  for (const change of [
    f => {f.pr.draft = true;},
    f => {f.pr.labels.push({name: 'keep-open'});},
    f => {f.pr.labels = [];}
  ]) {
    const f = fixture(); change(f);
    f.setTime('2026-11-10T20:00:00Z');
    await f.run();
    assert.equal(f.pr.labels.some(l => l.name === 'kp-reminder-due'), false);
  }
});

test('untrusted clocks ignored, invalid bot state and API failures fail explicitly', async () => {
  const f = fixture();
  f.comments.push({id: 99, body: PREFIX + '{}\n-->', user: {login: 'author'}});
  await f.run();
  assert.equal(f.comments.length, 2);
  f.comments[1].body = PREFIX + '{}\n-->';
  await assert.rejects(f.run(), /Invalid persisted/);
  const g = fixture();
  g.github.rest.issues.getLabel = async () => {throw new Error('Missing required label');};
  await assert.rejects(g.run(), /Missing required label/);
  assert.equal(g.writes.length, 0);
  const h = fixture();
  await h.run();
  h.comments.push({...h.comments[0], id: 100});
  await assert.rejects(h.run(), /Multiple KP clock comments/);
});

test('recover activity before later bot writes, including edited old comments', async () => {
  const f = fixture();
  await f.run();
  f.setTime('2026-10-28T19:01:00Z');
  await f.run();
  f.setTime('2026-10-29T19:00:00Z');
  f.humanComment();
  const human = f.comments.at(-1);
  f.label('kp-author-stalepr', true);
  await f.run();
  assert.equal(readClock(f.comments[0]).activityAt, human.updated_at);
  f.setTime('2026-10-30T19:00:00Z');
  human.updated_at = '2026-10-30T19:00:00Z';
  f.pr.updated_at = human.updated_at;
  f.label('kp-author-stalepr', false);
  await f.run();
  assert.equal(readClock(f.comments[0]).activityAt, human.updated_at);
  assert.equal(f.pr.labels.some(l => l.name === 'kp-reminder-due'), false);
});

test('an existing marker without due is not disturbed to force a reminder', async () => {
  const f = fixture();
  f.pr.labels.push({name: 'kp-author-stalepr'});
  f.setTime('2026-11-10T20:00:00Z');
  await f.run();
  assert.equal(f.pr.labels.some(l => l.name === 'kp-reminder-due'), false);
  assert.equal(f.writes.some(([kind]) => kind === 'add' || kind === 'remove'), false);
});
