---
title: Workspace Monitoring for Dataflow Gen2 in Microsoft Fabric
description: Learn how workspace monitoring captures Dataflow Gen2 refresh logs for diagnostics and performance analysis using KQL.
ms.reviewer: jeluitwi
ms.date: 06/26/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Workspace monitoring for Dataflow Gen2 in Microsoft Fabric

Workspace monitoring gives you log-level visibility for all items in a workspace, including Dataflow Gen2. It stores execution logs in a monitoring eventhouse so you can query and analyze them by using KQL (Kusto Query Language). Dataflow Gen2 sends a record to the standard **ItemJobEventLogs** monitoring table for each dataflow refresh and publish, so you can monitor status, duration, and failures across every dataflow in the workspace.

> [!NOTE]
> Workspace monitoring for Dataflow Gen2 covers dataflows that have the **CI/CD and Git integration** capability (Dataflow Gen2 with CI/CD). It captures item-level logs for refresh and publish operations.

## Monitoring scenarios

Use workspace monitoring for Dataflow Gen2 to:

- **Track refresh health across the workspace.** See success and failure trends for every dataflow in a single eventhouse, instead of opening each dataflow's refresh history one at a time.
- **Troubleshoot failed refreshes.** Find failed refreshes and their timing so you can investigate the root cause.
- **Analyze refresh performance.** Compare refresh durations over time to spot regressions or long-running dataflows.
- **Build custom reports and alerts.** Query the logs by using KQL to build real-time dashboards, Power BI reports, or KQL Queryset alerts for refresh failures.

## Enable workspace monitoring

1. In your Fabric workspace, select **Workspace settings**, and then select the **Monitoring** tab.

   :::image type="content" source="media/monitor-pipeline-runs/workspace-monitoring-settings.png" alt-text="Screenshot of workspace settings showing the option to toggle on workspace monitoring.":::

1. Turn on **Log workspace activity**. This action creates an eventhouse in your workspace to store logs. Fabric also creates a read-only KQL database inside the eventhouse for monitoring data.

   :::image type="content" source="media/monitor-pipeline-runs/monitoring-kql-database.png" alt-text="Screenshot of the items generated from workspace monitoring.":::

1. Go to the KQL database. You can find it in the **Monitoring database** link within the monitoring settings or in your workspace.

For more details on enabling and managing workspace monitoring, see [Enable monitoring in your workspace](/fabric/fundamentals/enable-workspace-monitoring).

## Review ItemJobEventLogs

The **ItemJobEventLogs** table captures item-level run events for your workspace, including Dataflow Gen2 operations. Each operation captures the dataflow name, run status, start and end timestamps, duration, and the principal that ran the job. Filter the table to `ItemKind == "DataFlow"` to focus on Dataflow Gen2 events. Dataflow Gen2 emits two job types: `Refresh` for a dataflow refresh and `Publish` for a just-in-time publish of dataflow changes.

Each operation emits an `InProgress` record when it starts and a terminal `Completed` or `Failed` record when it finishes. Both records share the same `JobInstanceId`, so filter on the terminal status (or deduplicate by `JobInstanceId`) when you count completed or failed runs.

### ItemJobEventLogs schema

The following table describes the schema of `ItemJobEventLogs`:

| **Column name** | **Column type** | **Description** |
|----|----|----|
| Timestamp | datetime | The timestamp (UTC) when the log entry was generated. |
| ItemId | string | Unique ID of the item that logs the data. |
| ItemKind | string | Type of item that logs the operation. For Dataflow Gen2, the value is `DataFlow`. |
| ItemName | string | The name of the Fabric item that logs this operation. |
| WorkspaceId | string | Unique identifier of the Fabric workspace that contains the item. |
| WorkspaceName | string | The name of the workspace that contains the item. |
| CapacityId | string | Unique identifier of the capacity that hosts the item. |
| DurationMs | long | Amount of time in milliseconds taken by the job. |
| ExecutingPrincipalId | string | User ID or service principal ID that runs the job. |
| ExecutingPrincipalType | string | User or service principal that runs the job. |
| WorkspaceMonitoringTableName | string | The name of the table where records belong. |
| JobInstanceId | string | Unique identifier of the job instance. |
| JobInvokeType | string | How the job was triggered, such as `Manual` (on demand) or `Scheduled`. |
| JobType | string | Job type. For Dataflow Gen2, values are `Refresh` (a dataflow refresh) and `Publish` (a just-in-time publish of dataflow changes). |
| JobStatus | string | Status of the job. Values include `InProgress`, `Completed`, and `Failed`. |
| JobDefinitionObjectId | string | ID of the scheduler that triggered the job. |
| JobScheduleTime | datetime | Scheduled job start time. |
| JobStartTime | datetime | Actual job start time. |
| JobEndTime | datetime | Actual job end time. |

## Example KQL queries for Dataflow Gen2

### Summarize Dataflow Gen2 refreshes by status

```kql
ItemJobEventLogs
| where ItemKind == "DataFlow" and JobType == "Refresh"
| summarize count() by JobStatus
```

### Identify failed Dataflow Gen2 refreshes

```kql
ItemJobEventLogs
| where ItemKind == "DataFlow" and JobType == "Refresh" and JobStatus == "Failed"
| order by Timestamp desc
| project Timestamp, ItemName, WorkspaceName, JobStartTime, JobEndTime, JobStatus
```

### Analyze Dataflow Gen2 refresh duration

```kql
ItemJobEventLogs
| where ItemKind == "DataFlow" and JobType == "Refresh" and JobStatus == "Completed"
| project Timestamp, ItemName, JobStartTime, JobEndTime, DurationMs
| order by DurationMs desc
```

### View the refresh history for a specific dataflow

```kql
ItemJobEventLogs
| where ItemKind == "DataFlow" and JobType == "Refresh" and ItemName == "<your-dataflow-name>"
| project Timestamp, JobInvokeType, JobStatus, JobStartTime, JobEndTime, DurationMs
| order by Timestamp desc
```

### Compare scheduled versus on-demand refreshes

```kql
ItemJobEventLogs
| where ItemKind == "DataFlow" and JobType == "Refresh"
| summarize count() by JobInvokeType, JobStatus
```

### Monitor just-in-time publish jobs

```kql
ItemJobEventLogs
| where ItemKind == "DataFlow" and JobType == "Publish"
| project Timestamp, ItemName, WorkspaceName, JobStatus, JobStartTime, JobEndTime, DurationMs
| order by Timestamp desc
```

## Create an alert for workspace-wide Dataflow Gen2 refresh failures

Use a KQL query set to detect Dataflow Gen2 refresh failures across the workspace. The following query returns recent failures so you can configure an alert on the result:

```kql
ItemJobEventLogs
| extend SecondsAgo = datetime_diff('second', now(), ingestion_time())
| where ItemKind == "DataFlow" and JobType == "Refresh" and JobStatus == "Failed"
| where SecondsAgo <= 540
| order by Timestamp desc
| project Timestamp, ItemName, WorkspaceName, JobStartTime, JobEndTime, JobStatus
```

## Best practices

- Use workspace monitoring for deep analysis, custom reporting, and workspace-wide alerting on refresh failures.
- Combine workspace monitoring with the dataflow [refresh history](dataflows-gen2-monitor.md) and the monitoring hub for quick operational checks on individual dataflows.

## Related content

- [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md)
- [Enable monitoring in your workspace](/fabric/fundamentals/enable-workspace-monitoring)
- [Workspace monitoring overview](/fabric/fundamentals/workspace-monitoring-overview)
