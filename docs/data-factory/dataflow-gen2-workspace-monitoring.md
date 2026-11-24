---
title: Workspace Monitoring for Dataflow Gen2 in Microsoft Fabric
description: Learn how to query DataflowGen2Logs to monitor Dataflow Gen2 refresh and publish operations, analyze durations, and create alerts.
ms.reviewer: jeluitwi
ms.date: 10/30/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Workspace monitoring for Dataflow Gen2 in Microsoft Fabric

Workspace monitoring collects logs from supported items in a workspace and stores them in a monitoring eventhouse. Dataflow Gen2 writes refresh and publish operation logs to the `DataflowGen2Logs` table. Use Kusto Query Language (KQL) to review reported operation outcomes, compare durations, and investigate activity across your dataflows.

`DataflowGen2Logs` is different from the shared `ItemJobEventLogs` table. It uses `OperationName`, `OperationId`, and `Status`, not the job-specific columns in [item job event logs](../fundamentals/item-job-event-logs.md).

> [!NOTE]
> Workspace monitoring for Dataflow Gen2 covers dataflows that have the CI/CD and Git integration capability (Dataflow Gen2 with CI/CD). It captures item-level refresh and publish operations, not individual query or table execution details from Power Query.

## Monitoring scenarios

Use workspace monitoring for Dataflow Gen2 to:

- **Review refresh and publish activity.** Query reported operation outcomes across dataflows in a single monitoring database.
- **Investigate operations reported as failed.** Find the dataflow, timestamp, and correlation ID, and then use refresh history and detailed logs to investigate.
- **Analyze operation performance.** Compare durations over time to identify long-running operations.
- **Build custom reports and alerts.** Use KQL queries in real-time dashboards, Power BI reports, or Activator alerts.

## Enable workspace monitoring

1. Follow [Configure workspace monitoring](../fundamentals/enable-workspace-monitoring.md) to meet the prerequisites, configure a Monitoring Item, and turn on data collection.
1. Refresh or publish a Dataflow Gen2 item with CI/CD support. Collection doesn't backfill earlier activity, and records take time to appear after an operation.
1. Open the monitoring KQL database, select `DataflowGen2Logs`, and select **Query data**. The table might not appear until the dataflow generates telemetry.

For workspace monitoring permissions, retention, and limitations, see [Workspace monitoring overview](../fundamentals/workspace-monitoring-overview.md).

## Review DataflowGen2Logs

The `DataflowGen2Logs` table contains Dataflow Gen2 operation events. You don't need an `ItemKind` filter to separate dataflows from other item types. Use the following `OperationName` values to distinguish the operations:

| OperationName | Description |
|---|---|
| `RunArtifact` | A dataflow refresh operation. |
| `ApplyChangesFromArtifact` | A publish operation that applies dataflow changes. |

Completion records use `Status` values of `Succeeded` or `Failed`. `DurationMs` contains the operation duration in milliseconds. Use `OperationId` to group records for an operation and `CorrelationId` to investigate related telemetry. Don't use this table as a live progress feed.

> [!IMPORTANT]
> The `Status` column reports the operation's telemetry classification. It doesn't replace the refresh result. A `Succeeded` value can include operations classified as user errors, so it doesn't by itself confirm that the dataflow refresh succeeded. Use [refresh history](dataflows-gen2-monitor.md) to confirm the refresh result and review error details. Alerts that filter for `Status == "Failed"` don't cover every failed refresh.

### DataflowGen2Logs schema

The following table describes the columns in `DataflowGen2Logs`:

| Column name | Column type | Description |
|----|----|----|
| `Timestamp` | datetime | UTC timestamp when the log entry was generated. |
| `OperationName` | string | Operation name: `RunArtifact` or `ApplyChangesFromArtifact`. |
| `ItemId` | string | Unique identifier of the dataflow item. |
| `ItemKind` | string | Item type. For these events, the value is `Dataflow`. |
| `ItemName` | string | Name of the dataflow item. |
| `WorkspaceId` | string | Unique identifier of the workspace that contains the dataflow. |
| `WorkspaceName` | string | Name of the workspace that contains the dataflow. |
| `CapacityId` | string | Unique identifier of the capacity that hosts the workspace. |
| `CapacityName` | string | Name of the capacity that hosts the workspace. |
| `CorrelationId` | string | Correlation identifier for tracing the operation. |
| `OperationId` | string | Identifier of the logged operation. Dataflow Gen2 populates it with the same value as `CorrelationId`. |
| `Region` | string | Region associated with the event. |
| `Identity` | dynamic | Identity information associated with the operation. |
| `CustomerTenantId` | string | Unique identifier of the customer tenant. |
| `WorkspaceMonitoringTableName` | string | Target monitoring table name: `DataflowGen2Logs`. |
| `DurationMs` | long | Duration of the operation in milliseconds. |
| `Status` | string | Reported operation outcome: `Succeeded` or `Failed`. See the status caveat earlier in this article. |
| `Level` | string | Severity level associated with the event. |

`DataflowGen2Logs` doesn't include a job trigger type, separate job start and end timestamps, or detailed error messages. Use [item job event logs](../fundamentals/item-job-event-logs.md) for scheduler-level metadata and [detailed refresh logs](dataflow-gen2-detailed-refresh-logs.md) for Power Query diagnostics.

To inspect the schema in your monitoring database, run:

```kql
DataflowGen2Logs
| getschema
```

## Example KQL queries for Dataflow Gen2

The following examples use a seven-day window. Adjust it to your investigation and the database's retention period. Where an example summarizes operations, `arg_max()` keeps the latest record per workspace, dataflow, and operation instead of counting repeated records.

### Summarize reported refresh operation outcomes

```kql
DataflowGen2Logs
| where Timestamp > ago(7d)
| where OperationName == "RunArtifact" and Status in ("Succeeded", "Failed")
| summarize arg_max(Timestamp, *) by WorkspaceId, ItemId, OperationId
| summarize Operations = count() by Status
```

### Identify refresh operations reported as failed

```kql
DataflowGen2Logs
| where Timestamp > ago(7d)
| where OperationName == "RunArtifact" and Status == "Failed"
| summarize arg_max(Timestamp, *) by WorkspaceId, ItemId, OperationId
| project Timestamp, ItemId, ItemName, WorkspaceName, OperationId, CorrelationId, Status, DurationMs
| order by Timestamp desc
```

### Analyze refresh operation duration

```kql
DataflowGen2Logs
| where Timestamp > ago(7d)
| where OperationName == "RunArtifact" and Status in ("Succeeded", "Failed")
| summarize arg_max(Timestamp, *) by WorkspaceId, ItemId, OperationId
| project Timestamp, ItemId, ItemName, WorkspaceName, OperationId, Status, DurationMs, DurationSeconds = DurationMs / 1000.0
| order by DurationMs desc
```

### View refresh operation logs for a specific dataflow

Replace `<your-dataflow-item-id>` with the dataflow's item ID. Filtering by ID avoids ambiguity when dataflows have the same name or are renamed.

```kql
DataflowGen2Logs
| where Timestamp > ago(7d)
| where OperationName == "RunArtifact" and ItemId == "<your-dataflow-item-id>"
| project Timestamp, ItemName, OperationId, CorrelationId, Status, DurationMs
| order by Timestamp desc
```

### Inspect records for a correlation ID

Replace `<your-correlation-id>` with a value from the logs to inspect records associated with that identifier.

```kql
DataflowGen2Logs
| where Timestamp > ago(7d)
| where CorrelationId == "<your-correlation-id>"
| project Timestamp, OperationName, ItemId, ItemName, WorkspaceName, OperationId, Status, DurationMs
| order by Timestamp asc
```

### Monitor publish operations

```kql
DataflowGen2Logs
| where Timestamp > ago(7d)
| where OperationName == "ApplyChangesFromArtifact"
| summarize arg_max(Timestamp, *) by WorkspaceId, ItemId, OperationId
| project Timestamp, ItemName, WorkspaceName, OperationId, CorrelationId, Status, DurationMs
| order by Timestamp desc
```

## Create an alert for reported refresh operation failures

Use a KQL Queryset to find refresh operations reported as failed across the workspace. The following query returns failure records ingested in the last 10 minutes, including records that arrive after the operation's event timestamp:

```kql
DataflowGen2Logs
| where ingestion_time() > ago(10m)
| where OperationName == "RunArtifact" and Status == "Failed"
| summarize arg_max(Timestamp, *) by WorkspaceId, ItemId, OperationId
| project Timestamp, ItemId, ItemName, WorkspaceName, OperationId, CorrelationId, Status, DurationMs
| order by Timestamp desc
```

Follow [Create Activator alerts from a KQL Queryset](../real-time-intelligence/data-activator/activator-alert-queryset.md) to configure the alert. Set a query interval shorter than the lookback window. Overlapping windows can return the same operation more than once, so account for repeated notifications when designing the alert.

## Best practices

- Use item and operation IDs when filtering or grouping logs. Names can change.
- Use completion records for duration comparisons. Don't sum repeated records for the same operation.
- Combine workspace monitoring with [refresh history](dataflows-gen2-monitor.md), the monitoring hub, and [detailed refresh logs](dataflow-gen2-detailed-refresh-logs.md) to confirm refresh outcomes and investigate errors.

## Related content

- [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md)
- [Understand Dataflow Gen2 detailed refresh logs](dataflow-gen2-detailed-refresh-logs.md)
- [Configure workspace monitoring](../fundamentals/enable-workspace-monitoring.md)
- [Workspace monitoring overview](../fundamentals/workspace-monitoring-overview.md)
- [Monitor Fabric items with item job event logs](../fundamentals/item-job-event-logs.md)
