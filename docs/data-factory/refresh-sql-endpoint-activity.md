---
title: Refresh SQL Endpoint Activity in Microsoft Fabric Pipelines
description: Learn how to use the Refresh SQL Endpoint activity in Microsoft Fabric pipelines to ensure your Lakehouse SQL endpoint reflects the latest data for downstream processes.
ms.date: 02/17/2026
ms.topic: how-to
---

# Refresh SQL Endpoint activity

The Refresh SQL Endpoint activity in Microsoft Fabric pipelines lets you programmatically refresh a Lakehouse SQL endpoint as part of an orchestrated workflow. This approach ensures that downstream consumers—such as Power BI reports, notebooks, or external SQL clients—see the latest data after data preparation or maintenance steps complete.

Use this activity to make SQL endpoints immediately reflect recent updates without relying on manual refreshes or ad-hoc processes.

## When to use the Refresh SQL Endpoint activity

Use this activity when your pipeline:

- Updates or maintains Lakehouse data (for example, after Copy Jobs, Notebook execution, or Lakehouse maintenance activities).
- Requires the Lakehouse SQL endpoint to reflect the latest metadata and data changes.
- Needs deterministic refresh timing before downstream steps such as reporting, analytics, or exports.

## Prerequisites

Before using this activity, make sure that:

- A tenant account with an active subscription. [Create an account for free](/fabric/fundamentals/fabric-trial).
- A Fabric workspace that contains a Lakehouse.
- A SQL endpoint exists for the Lakehouse.
- The pipeline identity (user or service principal) has permission to refresh the SQL endpoint.

## Add a Refresh SQL Endpoint activity to your pipeline in the UI

1. Create a new pipeline in your workspace.  
1. Search for **Refresh SQL Endpoint** in the pipeline **Activities** pane and select it to add it to the pipeline canvas.  

    :::image type="content" source="refresh-sql-endpoint-activities.png" alt-text="Screenshot of the Refresh SQL Endpoint activity in the Activities pane.":::

1. Select the new **Refresh SQL Endpoint** activity on the canvas if it isn't already selected.  

    :::image type="content" source="refresh-sql-endpoint-on-canvas.png" alt-text="Screenshot of the Refresh SQL Endpoint activity on the pipeline canvas.":::

1. Refer to the [**General** settings](/fabric/data-factory/activity-overview#general-settings) guidance to configure the **General** settings tab.

## Refresh SQL Endpoint activity settings

1. Select the **Settings** tab to configure the activity.  
1. Configure connection by selecting an existing connection from the **Connection** dropdown, or creating a new connection, and specifying its configuration details.
1. Specify the **Workspace** that contains the Lakehouse.
1. Specify the**SQL Endpoint** that contains the materialized lake view to refresh. This SQL endpoint is the Lakehouse whose SQL endpoint you want to refresh. The SQL endpoint associated with the selected Lakehouse.

    :::image type="content" source="refresh-sql-endpoint-settings.png" alt-text="Screenshot of the Refresh SQL Endpoint activity settings.":::

## Activity behavior

When the activity run finishes:

- If the Output pop-up shows the **Success** status, the request syncs unsynced data successfully.

    :::image type="content" source="refresh-sql-endpoint-success.png" alt-text="Screenshot of a Success status in the activity Output pop-up.":::

- A **NotRun** status in the Output pop-up means that the refresh of the SQL endpoint didn't run. That condition usually means that you didn't add new data since the last sync, so you didn't need to run it.

    :::image type="content" source="refresh-sql-endpoint-not-run.png" alt-text="Screenshot of a NotRun status in the activity Output pop-up.":::

- If the Output pop-up shows the **Failure** status, something went wrong.

> [!NOTE]
> The activity run sets these statuses in the Output pop-up. Don't confuse these statuses with the activity status itself.

## Common scenarios

- Refreshing the SQL endpoint after a Notebook writes transformed data to a Lakehouse.
- Triggering a SQL endpoint refresh after Optimize or Vacuum operations complete.
- Ensuring reports and dashboards query the most recent Lakehouse state at well‑defined points in a pipeline.

## Why does my SQL Endpoint Refresh fail when underlying data is locked?

The Refresh SQL Endpoint activity can fail intermittently when other processes actively update the underlying Lakehouse data. These processes include ingestion pipelines, notebooks, or concurrent write operations.

This failure happens because the SQL Endpoint needs to acquire internal locks to complete the refresh. If another operation locks the data, the request times out or returns an error.

This behavior is expected based on how SQL Endpoints manage metadata refresh operations.

### Symptoms

- The activity fails intermittently, not consistently.
- Error messages indicate refresh conflicts or lock contention.
- Pipelines with multiple sequential Refresh SQL Endpoint activities show higher failure rates.

### Root cause

SQL Endpoints require exclusive access to certain metadata structures during refresh.
If another compute process writes to the Lakehouse at the same time, lock contention occurs.

This behavior isn't a defect in the Refresh SQL Endpoint activity. It's the natural result of concurrent read and write operations on the underlying data.

### Workarounds

Two practical approaches can mitigate this issue:

- [Use Only One Refresh SQL Endpoint Activity at the End of Processing](#use-only-one-refresh-sql-endpoint-activity-at-the-end-of-processing)
- [Implement a Recurring Refresh Schedule](#implement-a-recurring-refresh-schedule)

#### Use Only One Refresh SQL Endpoint Activity at the End of Processing

To reduce the likelihood of lock conflicts, consolidate your pipeline so that:

- All ingestion, transformation, and update activities run first,
- Then only one Refresh SQL Endpoint activity executes at the end.
- This approach doesn't eliminate failures completely, but greatly reduces how often they occur.

#### Implement a Recurring Refresh Schedule

If your scenario doesn't require strict transactional consistency at a specific moment, adopt a recurring refresh pattern:

- Schedule a refresh every 15 minutes—continuously. Some refresh attempts might fail due to locking, but enough succeed to keep your SQL Endpoint relatively up to date.

:::image type="content" source="refresh-sql-endpoint-schedule.png" alt-text="Screenshot of a recurring Refresh SQL Endpoint schedule configuration.":::

This approach is practical and robust for many analytics workloads.

## Known issues

- The Refresh SQL Endpoint activity might intermittently fail when other processes actively update the underlying Lakehouse data. For workarounds, see the section **Why is my SQL Endpoint Refresh failing when underlying data is locked?**

## Related content

- [Items - Refresh Sql Endpoint Metadata - REST API (SQLEndpoint) \| Microsoft Learn](/rest/api/fabric/sqlendpoint/items/refresh-sql-endpoint-metadata?tabs=HTTP)
