const {createHash} = require('node:crypto');

const PREFIX = '<!-- kp-business-clock:v1\n';
const BOT = 'github-actions[bot]';
const HOUR = 3600000;
const weekday = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles', weekday: 'short'
});

function isDue(activityAt, now, days) {
  let remaining = days * 24 * HOUR;
  let cursor = Date.parse(activityAt);
  if (!Number.isFinite(cursor) || !Number.isFinite(now) ||
      !Number.isInteger(days) || days < 0) throw new Error('Invalid business clock settings');
  // Los Angeles weekday boundaries and DST transitions fall on UTC hour boundaries.
  while (cursor < now && remaining > 0) {
    const next = Math.min(now, (Math.floor(cursor / HOUR) + 1) * HOUR);
    if (!['Sat', 'Sun'].includes(weekday.format(cursor))) remaining -= next - cursor;
    cursor = next;
  }
  return remaining <= 0;
}

function fingerprint(pr, managedLabels) {
  return createHash('sha256').update(JSON.stringify({
    title: pr.title, body: pr.body, head: pr.head.sha, base: pr.base.ref,
    draft: pr.draft, milestone: pr.milestone?.number,
    assignees: pr.assignees.map(item => item.login).sort(),
    reviewers: pr.requested_reviewers.map(item => item.login).sort(),
    teams: pr.requested_teams.map(item => item.id).sort(),
    labels: pr.labels.map(item => item.name).filter(name => !managedLabels.includes(name)).sort()
  })).digest('hex');
}

function readClock(comment) {
  const clock = JSON.parse(comment.body.slice(PREFIX.length).split('\n-->')[0]);
  if (!Number.isFinite(Date.parse(clock.activityAt)) ||
      !Number.isFinite(Date.parse(clock.observedAt)) ||
      !/^[a-f0-9]{64}$/.test(clock.fingerprint)) throw new Error('Invalid persisted KP clock');
  return clock;
}

async function activity(github, repo, pr, comment, comments, settings) {
  const clock = readClock(comment);
  const hash = fingerprint(pr, settings.managedLabels);
  if (hash !== clock.fingerprint) return {activityAt: pr.updated_at, fingerprint: hash};
  if (pr.updated_at <= clock.observedAt || pr.updated_at === comment.updated_at) {
    return {activityAt: clock.activityAt, fingerprint: hash};
  }
  const events = await github.paginate(github.rest.issues.listEventsForTimeline, {
    ...repo, issue_number: pr.number, per_page: 100
  });
  const ownTimes = new Set([comment.updated_at]);
  let latest = clock.activityAt;
  for (const event of [...events, ...comments]) {
    const time = event.updated_at || event.created_at || event.submitted_at;
    if (!time || time <= clock.observedAt || time > pr.updated_at) continue;
    const actor = event.actor?.login || event.user?.login;
    const ownLabel = ['labeled', 'unlabeled'].includes(event.event) &&
      settings.managedLabels.includes(event.label?.name);
    const ownComment = event.body?.startsWith(PREFIX) ||
      event.body === settings.message;
    if (actor === BOT && (ownLabel || ownComment)) ownTimes.add(time);
    else if (time > latest) latest = time;
  }
  // An update absent from the timeline (for example, a body edit) still resets.
  if (!ownTimes.has(pr.updated_at)) latest = pr.updated_at;
  return {activityAt: latest, fingerprint: hash};
}

async function reconcile({github, context, core, now = Date.now()}) {
  const settings = {
    event: process.env.EVENT_LABEL,
    due: process.env.REMINDER_DUE_LABEL,
    marker: process.env.AUTHOR_REMINDER_LABEL,
    exempt: process.env.EXEMPT_LABEL,
    message: process.env.AUTHOR_REMINDER_MESSAGE
  };
  settings.managedLabels = [settings.due, settings.marker];
  const days = Number(process.env.INACTIVITY_DAYS);
  if (!Object.values(settings).every(value => value?.length) ||
      !Number.isInteger(days) || days < 0) {
    throw new Error('Invalid KP business clock settings');
  }
  // Label definitions remain manually managed. Fail before changing any PR.
  await github.rest.issues.getLabel({...context.repo, name: settings.due});
  for await (const page of github.paginate.iterator(github.rest.pulls.list, {
    ...context.repo, state: 'open', per_page: 100
  })) {
    for (const candidate of page.data) {
      if (!candidate.labels.some(label => label.name === settings.event)) continue;
      const {data: pr} = await github.rest.pulls.get({
        ...context.repo, pull_number: candidate.number
      });
      if (pr.state !== 'open' || !pr.labels.some(label => label.name === settings.event)) continue;
      const comments = await github.paginate(github.rest.issues.listComments, {
        ...context.repo, issue_number: pr.number, per_page: 100
      });
      const clocks = comments.filter(comment =>
        comment.user?.login === BOT && comment.body?.startsWith(PREFIX));
      if (clocks.length > 1) throw new Error(`Multiple KP clock comments on #${pr.number}`);
      let comment = clocks[0];
      let clock = comment
        ? await activity(github, context.repo, pr, comment, comments, settings)
        : {activityAt: pr.updated_at, fingerprint: fingerprint(pr, settings.managedLabels)};
      const previous = comment && readClock(comment);
      if (!previous || previous.activityAt !== clock.activityAt ||
          previous.fingerprint !== clock.fingerprint) {
        const body = PREFIX + JSON.stringify({...clock, observedAt: pr.updated_at}) +
          '\n-->\nBusiness-day reminder clock (managed by the documentation bot).';
        const response = comment
          ? await github.rest.issues.updateComment({...context.repo, comment_id: comment.id, body})
          : await github.rest.issues.createComment({...context.repo, issue_number: pr.number, body});
        comment = response.data;
        core.info(`Recorded business-day activity clock for #${pr.number}.`);
      }
      const has = label => pr.labels.some(item => item.name === label);
      // Never touch a marker here. Stock stale owns posting and cleanup.
      const due = !pr.draft && !has(settings.exempt) && isDue(clock.activityAt, now, days) &&
        (has(settings.due) || !has(settings.marker));
      if (due && !has(settings.due)) {
        await github.rest.issues.addLabels({
          ...context.repo, issue_number: pr.number, labels: [settings.due]
        });
      } else if (!due && has(settings.due)) {
        await github.rest.issues.removeLabel({
          ...context.repo, issue_number: pr.number, name: settings.due
        });
      }
    }
  }
}

module.exports = {isDue, fingerprint, readClock, activity, reconcile, PREFIX};
