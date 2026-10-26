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
| **stale-comment-knowledgepartnership** ([workflow](workflows/stale-comment-knowledgepartnership.yml)) | Hourly schedule or manual dispatch. | Validate labels, backfill enrollment, clean obsolete markers, and check inactivity before sending reminders. |

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

The existing labeling, label-validation, cleanup, and reminder implementations
remain unchanged. In particular:

- The inactivity threshold remains three days; the reminder operation budget
  remains 350, not a PR-count limit.
- The hourly scan backfills enrollment before reminder processing, so missed PR
  events don't permanently exclude a matching PR.
- The reminder action skips drafts and PRs with `keep-open`. Enrollment
  retains its existing open-PR branch-prefix filter.
- Existing reminder comments, markers, activity handling, disabled closure, and
  paused reviewer automation aren't changed by the workflow split.
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
the existing general stale policy. Both stale bots and reminder processing remain
unchanged.

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
```

The tests verify trigger separation, 384 repository/event/branch/manual-option
routing cases, private-repository guards, shared settings, reusable input
contracts, permissions, dependencies, concurrency, target-change participation,
and no-op reconciliation cases.

After merge, verify that PR-event runs appear under **stale-enroll-knowledgepartnership** and hourly
runs appear under **stale-comment-knowledgepartnership**. Inspect job results as well as the
run conclusion. A green run alone doesn't prove that every PR was processed.

The entry-point and configuration job check names can change. Repository
maintainers should check any required-status rules or automation that references
those names. This change doesn't modify branch protection or dispatch a live
test run.
