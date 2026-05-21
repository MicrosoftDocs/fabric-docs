---
title: Recent runs of materialized lake views
description: Track every materialized lake view refresh — see what ran, when it ran, whether it succeeded, and quickly find the run you're looking for.
ms.reviewer: sairamyeturi
ms.author: rkottackal
ms.topic: how-to
ms.custom: []
ms.date: 02/16/2026
#customer intent: As a data engineer, I want to check the recent runs of materialized lake views in Microsoft Fabric so that I can monitor and troubleshoot the runs.
---

# Recent runs of materialized lake views

Every time your materialized lake views refresh — whether from a schedule, a manual trigger, or an API call — Fabric keeps a record for you. The **Recent runs** page gives you a single place to confirm your data is fresh, spot problems, and drill into the details when something goes wrong.

## Check on your refreshes

Select the **Materialized lake views** tab in the ribbon, then select **Recent run(s)**.

:::image type="content" source="./media/materialized-lake-view-run-history/recent-runs-table.png" alt-text="Screenshot showing the Recent runs tab with columns for Run ID, Run(s), Status, and Start time." border="true" lightbox="./media/materialized-lake-view-run-history/recent-runs-table.png":::

Each row in the table is a single refresh operation on your Lakehouse for materialized lake views run. The default columns are **Run ID**, **Run(s)**, **Status**, and **Start time**. You can show additional columns — **Refreshed materialized lake views**, **End time**, **Duration**, **Scheduled by**, and **Run type** — by selecting **Column Options**.

The **Run(s)** column shows the name of the schedule or run that triggered the refresh. For scheduled runs, this is the schedule name. For ad-hoc runs, this is the name you entered when starting the run.

Here's what each status means:

| Status | What it means |
|---|---|
| **In progress** | The refresh is currently running. |
| **Completed** | All views refreshed successfully. |
| **Failed** | One or more views hit an error. A run is marked as Failed if any view in that run fails. Child views of a failed run are automatically marked as **Skipped**. |
| **Skipped** | This run was skipped because the same view was already being refreshed by another active run. |
| **Cancelled** | The run was manually cancelled. |

## Find a specific run

When the table grows long, you can quickly narrow it down:

- **Search** — Type a keyword in the search box to filter by Run ID or run name.
- **Filters** — Use the **Filters** dropdown to narrow by status (Completed, Failed, Cancelled, In progress, Skipped) or other criteria.
- **Column Options** — Show or hide columns so you see only what matters. Select **Apply** to save, or **Reset to default** to restore the original layout.

> [!TIP]
> If you run multiple schedules on the same Lakehouse, filter by the **Run(s)** column to isolate a specific schedule's history.

## Investigate why a run failed

When you see a failed run, here's how to find out what went wrong:

1. **Open the run** — Select the **Run ID** to open the run details page. The **lineage graph** at the top shows source tables on the left and materialized lake views on the right, with each view color-coded by status. You can immediately see which part of the lineage was affected.

1. **Check the run summary** — The **Run details** panel on the right shows start and end times, duration, refresh mode (**Optimal** or **Full**), the run name, and the overall status. The **Settings** section below shows the Spark **Environment** that was in effect.

1. **Find the failed views** — Scroll to the **Activities** panel. This lists every view in the run with its status and duration. Select the **Failed** tab to jump straight to the views that need attention.

1. **Inspect a view** — Select any materialized lake view to see its name, type, timing, status, and ABFS source path.

1. **Read the error** — Select a failed view in the lineage graph to see:
   - **Error Code** and **Message** explaining what went wrong
   - **Copy all to clipboard** to share with your team
   - **Detailed logs** with a **More details** link for deeper investigation

## Review a successful run

For runs that completed successfully, select the **Run ID** to see the lineage graph, run details, settings, and per-view timing in the Activities panel. This is useful when you want to check how long individual views took or verify that the correct refresh mode was used.

> [!NOTE]
> - The recent runs page keeps runs from the last 30 days.
> - Environment details appear only if you have access to the environment and it still exists.

## Related articles

* [Microsoft Fabric materialized lake views tutorial](./tutorial.md)
* [Manage Fabric materialized lake views lineage](./view-lineage.md)
* [Schedule a materialized lake view refresh](./schedule-lineage-run.md)