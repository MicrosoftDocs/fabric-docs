---
title: Refresh SQL analytics endpoint activity
description: Learn how to use the refresh SQL analytics endpoint activity in Microsoft Fabric pipelines to ensure your Lakehouse SQL analytics endpoint reflects the latest data for downstream processes.
ms.date: 09/03/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Refresh SQL analytics endpoint activity

The refresh SQL analytics endpoint activity in Microsoft Fabric pipelines lets you programmatically refresh a Lakehouse SQL analytics endpoint as part of an orchestrated workflow. It's part of the Lakehouse Utility Suite for pipelines, and is typically used after the [Lakehouse Maintenance activity](lakehouse-maintenance-activity.md) (for example, after OPTIMIZE or VACUUM operations). Downstream consumers—such as Power BI reports, notebooks, or external SQL clients—then see the latest data after data preparation or maintenance steps complete.

Use this activity to make SQL analytics endpoints immediately reflect recent updates without relying on manual refreshes or ad hoc processes. Use this activity when your pipeline:

- Updates or maintains Lakehouse data (for example, after Copy Jobs, Notebook execution, or Lakehouse maintenance activities).
- Requires the Lakehouse SQL analytics endpoint to reflect the latest metadata and data changes.
- Needs deterministic refresh timing before downstream steps such as reporting, analytics, or exports.

## Prerequisites

Before using this activity, make sure that:

- A tenant account with an active subscription. [Create an account for free](/fabric/fundamentals/fabric-trial).
- A [workspace](/fabric/fundamentals/create-workspaces) with a [Lakehouse](/fabric/data-engineering/create-lakehouse)
- A [SQL analytics endpoint](/fabric/data-warehouse/data-warehousing#sql-analytics-endpoint-of-the-lakehouse) exists for the Lakehouse.
- The pipeline identity (user or service principal) has [permission to refresh the SQL analytics endpoint](/rest/api/fabric/sqlendpoint/items/refresh-sql-endpoint-metadata#permissions).

## Add a refresh SQL analytics endpoint activity to your pipeline in the UI

1. [Create a new pipeline](create-first-pipeline-with-sample-data.md#create-a-pipeline) in your workspace.
1. Search for **Refresh SQL analytics endpoint** in the pipeline **Activities** pane and select it to add it to the pipeline canvas.

    :::image type="content" source="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-activities.png" alt-text="Screenshot of the refresh SQL analytics endpoint activity in the Activities pane." lightbox="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-activities.png":::

1. Select the new **Refresh SQL analytics endpoint** activity on the canvas if it isn't already selected.

    :::image type="content" source="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-on-canvas.png" alt-text="Screenshot of the refresh SQL analytics endpoint activity on the pipeline canvas." lightbox="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-on-canvas.png":::

    > [!TIP]
    > You can orchestrate this activity alongside other Lakehouse Utility Suite activities—such as the [Lakehouse Maintenance activity](lakehouse-maintenance-activity.md)—in the same pipeline so maintenance and refresh run in sequence.

1. Refer to the [**General** settings](/fabric/data-factory/activity-overview#general-settings) guidance to configure the **General** settings tab.

## Refresh SQL analytics endpoint activity settings

1. Select the **Settings** tab to configure the activity.  
1. Configure connection by selecting an existing connection from the **Connection** dropdown, or creating a new connection, and specifying its configuration details.
1. Specify the **Workspace** that contains the Lakehouse.
1. Specify the SQL analytics endpoint as the **SQL analytics endpoint Id** for the Lakehouse you want to refresh. The refresh updates the Lakehouse SQL analytics endpoint metadata so it reflects recent data and schema changes.

    :::image type="content" source="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-settings.png" alt-text="Screenshot of the refresh SQL analytics endpoint activity settings, where you specify the SQL analytics endpoint." lightbox="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-settings.png":::

## Activity behavior

When the activity run finishes:

- If the Output pop-up shows the **Success** status, the request syncs unsynced data successfully.

    :::image type="content" source="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-success.png" alt-text="Screenshot of a Success status in the activity Output pop-up." lightbox="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-success.png":::

- A **NotRun** status in the Output pop-up means that the refresh of the SQL analytics endpoint didn't run. That condition usually means that you didn't add new data since the last sync, so you didn't need to run it.

    :::image type="content" source="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-not-run.png" alt-text="Screenshot of a NotRun status in the activity Output pop-up." lightbox="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-not-run.png":::

- If the Output pop-up shows the **Failure** status, something went wrong.

> [!NOTE]
> The activity run sets these statuses in the Output pop-up. Don't confuse these statuses with the activity status itself.

## Common scenarios

- Refreshing the SQL analytics endpoint after a Notebook writes transformed data to a Lakehouse.
- Trigger a SQL analytics endpoint refresh after the [Lakehouse Maintenance activity](lakehouse-maintenance-activity.md) (OPTIMIZE or VACUUM) completes.
- Ensuring reports and dashboards query the most recent Lakehouse state at well-defined points in a pipeline.

## Why does my SQL analytics endpoint refresh fail when underlying data is locked?

The refresh SQL analytics endpoint activity can fail intermittently when other processes actively update the underlying Lakehouse data. These processes include ingestion pipelines, notebooks, or concurrent write operations.

This failure happens because the SQL analytics endpoint needs to acquire internal locks to complete the refresh. If another operation locks the data, the request times out or returns an error.

This behavior is expected based on how SQL analytics endpoints manage metadata refresh operations.

### Symptoms

- The activity fails intermittently, not consistently.
- Error messages indicate refresh conflicts or lock contention.
- Pipelines with multiple sequential refresh SQL analytics endpoint activities show higher failure rates.

### Root cause

SQL analytics endpoints require exclusive access to certain metadata structures during refresh.
If another compute process writes to the Lakehouse at the same time, lock contention occurs.

This behavior isn't a defect in the refresh SQL analytics endpoint activity. It's the natural result of concurrent read and write operations on the underlying data.

### Workarounds

Two practical approaches can mitigate this issue:

- [Use only one refresh SQL analytics endpoint activity at the end of processing](#use-only-one-refresh-sql-analytics-endpoint-activity-at-the-end-of-processing)
- [Implement a recurring refresh schedule](#implement-a-recurring-refresh-schedule)

#### Use only one Refresh SQL analytics endpoint activity at the end of processing

To reduce the likelihood of lock conflicts, consolidate your pipeline so that:

- All ingestion, transformation, and update activities run first,
- Then only one refresh SQL analytics endpoint activity executes at the end.
- This approach doesn't eliminate failures completely, but greatly reduces how often they occur.

#### Implement a recurring refresh schedule

If your scenario doesn't require strict transactional consistency at a specific moment, adopt a recurring refresh pattern:

- Schedule a refresh every 15 minutes—continuously. Some refresh attempts might fail due to locking, but enough succeed to keep your SQL analytics endpoint relatively up to date.

:::image type="content" source="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-schedule.png" alt-text="Screenshot of a recurring refresh SQL analytics endpoint schedule configuration."  lightbox="media/refresh-sql-endpoint-activity/refresh-sql-endpoint-schedule.png":::

This approach is practical and robust for many analytics workloads.

## Save and run or schedule the pipeline

[!INCLUDE [save-run-schedule-pipeline](includes/save-run-schedule-pipeline.md)]

## Known issues

- The refresh SQL analytics endpoint activity might intermittently fail when other processes actively update the underlying Lakehouse data. For workarounds, see [Why does my SQL analytics endpoint refresh fail when underlying data is locked?](#why-does-my-sql-analytics-endpoint-refresh-fail-when-underlying-data-is-locked)

## Related content

- [Lakehouse maintenance activity](lakehouse-maintenance-activity.md)
- [Refresh SQL analytics endpoint metadata with the REST API](/rest/api/fabric/sqlendpoint/items/refresh-sql-endpoint-metadata?tabs=HTTP)
