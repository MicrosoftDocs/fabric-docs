---
title: Run History of Microsoft Fabric Materialized Lake Views
description: Learn how to check the recent runs of materialized lake views in Microsoft Fabric.
ms.reviewer: rkottackal
ms.topic: how-to
ms.date: 03/01/2026
#customer intent: As a data engineer, I want to check the run history of materialized lake views in Microsoft Fabric so that I can monitor and troubleshoot the runs.
---

# Recent runs of materialized lake views

Use the **Recent runs** page to monitor materialized lake view refreshes in one place. You can confirm data freshness, identify failed runs, and open run details to troubleshoot quickly.

This article explains how to read run states, find specific runs, and investigate failures.

Each row in the table is a single refresh. You can see at a glance which schedule or action triggered it (**Run(s)** column), whether it succeeded or failed (**Status**), how many views were refreshed (**Materialized lake views**), and how long it took (**Duration**).

The following screenshot shows the **Recent runs** table.

:::image type="content" source="./media/materialized-lake-view-run-history/recent-runs-table.png" alt-text="Screenshot showing the Recent runs page for materialized lake views with a table of all runs." border="true" lightbox="./media/materialized-lake-view-run-history/recent-runs-table.png":::

The **Run(s)** column shows what triggered the refresh - typically a schedule name. For the lineage formed by all the MLVs in the Lakehouse and for ad-hoc runs, the Lakehouse name is used as the default run name. Run names must be unique within a Lakehouse, so give your schedules and ad-hoc runs distinct names to keep the history easy to follow.

## Run states in lineage view

Here's what each status means:

| Status | What it means |
|---|---|
| **In progress** | The refresh is currently running. |
| **Success** | All views refreshed successfully - your data is fresh. |
| **Failed** | One or more views hit an error. A run is marked as Failed if any view in that run fails. Child views of a failed view are automatically marked as **Skipped**. |
| **Skipped** | This run was skipped because the same view was already being refreshed by another active run. |
| **Canceled** | The run was manually canceled from the monitor hub. |

## Find a specific run

When the table grows long, you can quickly narrow it down:

- **Filter by keyword** - Type in the search box to instantly filter the table.
- **Filters** - Narrow by run state, start date, or a specific schedule/run name.
- **Column Options** - Show or hide columns so you see only what matters. Select **Apply** to save, or **Reset to default** to restore the original layout.

> [!TIP]
> If you run multiple schedules on the same Lakehouse, filter by the **Run(s)** column to isolate a specific schedule's history.

## Investigate why a run failed

When you see a failed run, here's how to find out what went wrong:

1. **Select the Run ID** to open the run details page. At the top you see the **lineage graph** - source tables on the left, materialized lake views on the right, with each node showing whether it completed or failed. This tells you immediately which part of the lineage was affected.

1. Review the **Run details** panel on the right. It shows the **Job instance ID** (same as the Run ID), start and end times, duration, refresh mode (**Optimal** or **Full**), the run name, and the overall status. Below it, the **Settings** section shows the Spark **Environment** and **Refresh concurrency** that were in effect.

1. Scroll down to the **Activities** table. This lists every individual view in the run with its status and duration. Use the **Failed** tab to jump straight to the views that need attention.

1. **Select a failed view** - either in the lineage graph or the Activities table - to open the **Materialized lake view details** panel. This shows the view's name, type, timing, and status. 

    :::image type="content" source="./media/materialized-lake-view-run-history/failed-runs.png" alt-text="Screenshot showing the run details." border="true" lightbox="./media/materialized-lake-view-run-history/failed-runs.png":::

    For failed views, you can also see:
    - **Error log** with the **Error Code** and **Message** explaining what went wrong.
    - **Copy all to clipboard** button to easily share the error with your team.
    - **Detailed logs** section with a **More details** link for deeper investigation.

## Review a successful run

For runs that completed successfully, the same drill-down is available - select the **Run ID** to see the lineage graph, run details, settings, and per-view timing in the Activities table. This is useful when you want to check how long individual views took or verify that the correct refresh mode was used.

> [!NOTE]
> - The run history keeps the last 25 runs or the runs from the last seven days, whichever comes first.
> - Environment details appear only if you have access to the environment and it still exists.

## Related content

- [Microsoft Fabric materialized lake views tutorial](./tutorial.md)
- [Manage Fabric materialized lake views lineage](./view-lineage.md)
