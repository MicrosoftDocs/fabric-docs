---
ai-usage: ai-assisted
---

# Knowledge Partnership workflow histories

Separate entry-point workflows handle enrollment, target changes, and stale-reminder scans.
They run only in `MicrosoftDocs/fabric-docs-pr`; public mirrors and forks skip
their jobs.

| Actions workflow | Trigger | Purpose |
| --- | --- | --- |
| **stale-enroll-knowledgepartnership** ([workflow](workflows/stale-enroll-knowledgepartnership.yml)) | PR opened, reopened, marked ready, edited, or synchronized. | Validate required labels and add the event label to matching open rollout PRs. No cleanup or reminders run here. |
| **stale-reconcile-knowledgepartnership** ([workflow](workflows/stale-reconcile-knowledgepartnership.yml)) | PR edited with a target-branch change. | Read the current PR and remove the event label from open PRs outside rollout scope. No other labels or reminders change. |
| **stale-comment-knowledgepartnership** ([workflow](workflows/stale-comment-knowledgepartnership.yml)) | Hourly schedule or manual dispatch. | Validate labels, backfill enrollment, clean obsolete markers, and check business-day inactivity before sending reminders. |

The schedule remains `0 * * * *`, in UTC. GitHub can delay scheduled execution;
it doesn't guarantee that each run starts exactly at minute zero.

Both entry-point filenames match their Actions names, with a `.yml` extension.
The scanner replaces `stale-KnowledgePartnership.yml`; update saved workflow links
and scripts that use that path to `stale-comment-knowledgepartnership.yml`.
Historical runs aren't migrated by this rename. Use their existing run URLs to
inspect them rather than assuming the new workflow view includes the old history.
After merge, new PR events appear under **stale-enroll-knowledgepartnership**.

## Shared settings and behavior

Edit [the shared settings workflow](workflows/reusable-kp-configuration.yml) to
change labels, the rollout branch prefix, the inactivity threshold, or the
operation budget. All entry points receive the same validated outputs.

Enrollment, exemptions, and the stock stale action's reminder message and marker
lifecycle remain in place:

- The inactivity threshold is three business days, defined as 72 elapsed weekday
  hours in Redmond, Washington (`America/Los_Angeles`), with daylight saving time.
  Saturday and Sunday don't count. There is no holiday calendar or office-hours
  restriction.
- The hourly scan backfills enrollment before reminder processing, so missed PR
  events don't permanently exclude a matching PR.
- The reminder action skips drafts and PRs with `keep-open`. Enrollment
  retains its existing open-PR branch-prefix filter.
- Stock `actions/stale` still posts reminder comments and manages reminder
  markers. Closure remains disabled, and reviewer automation remains paused.
- All required labels must already exist. Enrollment and scanning fail explicitly
  when label validation fails; neither workflow creates label definitions.
- PR events never check out or execute contributor code.

Manual dispatch retains its existing **labels-only** option. When selected, the
run title says **Manual enrollment backfill (no reminders)**; validation and
enrollment run, but cleanup and reminders are skipped. Manual runs are live, not
dry runs.

Scheduled/manual scans keep their existing non-canceling concurrency group.
Enrollment uses the existing non-canceling per-PR groups. These groups allow
enrollment and scanning to overlap, as before; label additions remain safe to
repeat.

## Business-day reminder eligibility

Create the `kp-reminder-due` label before enabling this change. Like the existing
process labels, its definition is manually managed; a missing definition fails
the reminder job before any clock or due-label writes. The bot alone manages
this label's membership.

Each participating PR receives one bot-owned metadata comment holding its
activity timestamp and a fingerprint of its PR properties. Initialize the clock
from the PR's current `updated_at`, not deployment time. This preserves the
existing starting point, including event enrollment as activity, without making
existing PRs start a new wait. Don't delete or edit these managed comments:
missing state initializes from current `updated_at`, while malformed or duplicate
bot state fails explicitly.

Count elapsed time only while the local date is Monday through Friday. For
example, activity at noon Friday PDT becomes due at noon Wednesday PDT. A spring
or autumn DST transition changes the UTC deadline, not the Redmond local deadline
in this example. Eligibility persists after the threshold, including over a
weekend; this is an inactivity clock, not a weekday-only execution schedule.

New activity resets the clock. The implementation checks `updated_at`, PR
properties, all timeline pages, and comment update timestamps, so body changes,
commits, reviews, comments, and ordinary label updates can reset the wait. Only
the workflow bot's clock comments, exact reminder comments, and due/reminder-label
bookkeeping are excluded. Those writes must not extend the eligibility wait.
Other bots' activity continues to count, consistent with the old `updated_at`
clock. Drafts and `keep-open` PRs remain ineligible.

The reminder job reconciles clocks and `kp-reminder-due` before stock stale runs.
Stock stale requires `conference-event` plus either `kp-reminder-due` or an
existing `kp-author-stalepr` marker. New reminders therefore require due, while
existing markers still reach normal cleanup after activity clears due. Stock
stale clears an updated marker without immediately marking it again in the same
pass. Its elapsed calendar-day threshold is zero because the companion clock
already enforces the business-day wait. The clock helper never posts reminders
or adds/removes reminder markers. It doesn't add a missing due label to an
already-marked PR, which would otherwise disturb stock cleanup.

The single stale pass retains the configured 350-operation budget; clock scans and
their API reads/writes are additional. The existing non-canceling scan concurrency
serializes clock processing. The helper is loaded from the trusted scan revision;
PR-event workflows still never check out contributor code.

These are API observations and separate writes, not an atomic transaction.
Activity concurrent with a scan can be observed on the next scan, and GitHub's
second-resolution timestamps can't order every simultaneous change. Hourly
workflow delays can also delay the reminder after it becomes due.

## Current event participation

`conference-event` means current participation, not historical membership. After
a target-branch change, the reconciliation workflow checks the edited payload's
`changes.base.ref.from` field and fetches the current PR. If the PR is open,
has the event label, and no longer targets the configured `release-ignite26-`
prefix, it removes only `conference-event`. Already-correct labels, closed PRs,
and unrelated title or body edits cause no label writes. Drafts and exemptions
don't change target-based participation; other KP labels remain untouched.

Existing enrollment already handles edited events and adds the label when an
open PR enters rollout scope. Reconciliation shares enrollment's per-PR
concurrency group and uses the same validated configuration. Neither workflow
checks out or executes contributor code.

Removing `conference-event` excludes the PR from KP reminders and returns it to
the existing general stale policy. This target-change behavior is independent of
the business-day eligibility clock.

> [!CAUTION]
> This is event-driven reconciliation: there remains a brief window between retargeting and label removal when a reminder could run.
>
> A delayed, failed, or overlapping run can leave the label temporarily out of
> date. This workflow doesn't backfill out-of-scope labels left by target changes
> before it was enabled.

## Validate the split

The regression tests require Python 3, PyYAML, and Node.js. From the repository
root, run:

```powershell
python -m unittest discover -s .github/tests -p test_kp_workflows.py
node --test .github/tests/test_kp_business_clock.cjs
```

The tests verify trigger separation, 384 repository/event/branch/manual-option
routing cases, private-repository guards, shared settings, reusable input
contracts, permissions, dependencies, concurrency, target-change participation,
and no-op reconciliation cases. Clock tests cover Friday/weekend counting,
Redmond UTC boundaries, both DST transitions, persisted initialization, activity
resets, bookkeeping exclusions, draft/exemption filters, and explicit failures.

After merge, verify that PR-event runs appear under **stale-enroll-knowledgepartnership** and hourly
runs appear under **stale-comment-knowledgepartnership**. Inspect job results as well as the
run conclusion. A green run alone doesn't prove that every PR was processed.

The entry-point and configuration job check names can change. Repository
maintainers should check any required-status rules or automation that references
those names. This change doesn't modify branch protection or dispatch a live
test run.
