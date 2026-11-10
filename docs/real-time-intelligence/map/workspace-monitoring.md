---
title: Monitor Fabric Maps with workspace monitoring
description: Learn how to query MapLogs to monitor Fabric Maps tileset jobs, investigate failures, and correlate operations with Fabric job events.
author: sipa
ms.author: sipa
ms.service: fabric
ms.subservice: rti-map
ms.reviewer: smunk
ms.topic: how-to
ms.date: 11/04/2026
ai-usage: ai-assisted
search.app:
- fabric-realtimeanalytics-docs
---

# Monitor Fabric Maps with workspace monitoring

Use [workspace monitoring](../../fundamentals/workspace-monitoring-overview.md) to collect and query operational logs for Fabric Maps. These logs help you investigate failed operations, review operation durations, and correlate tileset jobs with Fabric job events.

Fabric Maps stores its logs in the `MapLogs` table in the monitoring database. Use [Kusto Query Language (KQL)](/kusto/query/) to query these logs.

> [!IMPORTANT]
> Fabric Maps currently logs only `BuildTileset` jobs that succeed, fail, or get canceled.

## Prerequisites

To query Fabric Maps logs:

- [Enable workspace monitoring](../../fundamentals/enable-workspace-monitoring.md) for the workspace that contains the Map item, and turn on data collection.
- Use a workspace role that can query the monitoring database. Workspace users with at least the Contributor role can query it.
- Run a supported tileset job after you turn on data collection. Workspace monitoring doesn't backfill earlier activity.
- Have basic familiarity with KQL.

The `MapLogs` table might not appear until a supported Fabric Maps operation generates telemetry.

## Supported monitoring scenarios

Use Fabric Maps workspace monitoring to:

- Find failed or canceled tileset jobs and review their result codes.
- Identify completed tileset jobs with long durations and compare duration trends.
- Summarize tileset reliability by status.
- Correlate operation results with job events in `ItemJobEventLogs`.
- Create dashboard visuals and alerts based on tileset job results.

Fabric Maps currently writes at most one `MapLogs` record when a `BuildTileset` job finishes with one of these statuses:

- `Succeeded`
- `Failed`
- `Cancelled`

Each record summarizes the operation. It doesn't include progress updates, individual retry attempts, or per-tile data.

For tileset jobs, `MapLogs.OperationId` matches `ItemJobEventLogs.JobInstanceId`. Use these fields to correlate operation results with job lifecycle information:

```text
MapLogs.OperationId == ItemJobEventLogs.JobInstanceId
```

Use `ItemJobEventLogs` to view job lifecycle information, including how the job was triggered and when it started and ended. Use `MapLogs` to view the Fabric Maps operation name, duration, status, and result code.

## MapLogs schema

The following table describes the columns in `MapLogs`.

The `ItemName`, `WorkspaceName`, and `Identity` columns aren't currently populated for `BuildTileset` jobs. Use identifiers such as `ItemId`, `WorkspaceId`, and `OperationId` to identify items and correlate operations.

| Column name | Type | Description |
| --- | --- | --- |
| `Timestamp` | datetime | UTC timestamp when the completion record was generated. |
| `ItemId` | string | Unique identifier of the Fabric Map item. |
| `ItemKind` | string | Fabric item type. The value is `Map`. |
| `ItemName` | string | Display name of the Map item, when available. This value can be empty. |
| `WorkspaceId` | string | Unique identifier of the workspace that contains the Map item. |
| `WorkspaceName` | string | Display name of the workspace, when available. This value can be empty. |
| `CapacityId` | string | Unique identifier of the Fabric capacity that hosts the operation. |
| `CapacityName` | string | Display name of the capacity, when available. This value can be empty. |
| `OperationId` | string | Unique identifier of the logical Fabric Maps operation. For tileset jobs, this value matches `ItemJobEventLogs.JobInstanceId`. |
| `OperationName` | string | Stable name of the Fabric Maps operation. Currently, the supported value is `BuildTileset`. |
| `CustomerTenantId` | string | Identifier of the customer tenant where the operation ran. |
| `WorkspaceMonitoringTableName` | string | Workspace monitoring routing name. The value is `MapLogs`. |
| `Identity` | string | Identity associated with the operation, when available. This value can be empty. |
| `CorrelationId` | string | Root request or distributed trace identifier, when available. This value can be empty. |
| `DurationMs` | long | Duration of the completed operation in milliseconds. |
| `Status` | string | Final operation status: `Succeeded`, `Failed`, or `Cancelled`. |
| `Level` | string | Severity assigned to the completion record. |
| `Region` | string | Azure region of the service that emitted the record. |
| `ResultCode` | string | Stable, machine-readable result code. Empty for successful operations and populated for failed or canceled operations. |
| `ResultMessage` | string | Optional troubleshooting guidance associated with `ResultCode`. Empty for successful operations and limited to 256 characters. |

## Query Fabric Maps logs

Run the following queries in the monitoring database.

### View recent tileset operations

```kusto
MapLogs
| where Timestamp > ago(24h)
| project
    Timestamp,
    ItemName,
    ItemId,
    OperationId,
    OperationName,
    Status,
    DurationMs,
    ResultCode,
    ResultMessage
| order by Timestamp desc
```

### Find failed tileset operations

```kusto
MapLogs
| where Timestamp > ago(24h)
| where Status == "Failed"
| project
    Timestamp,
    WorkspaceName,
    ItemName,
    ItemId,
    OperationId,
    OperationName,
    DurationMs,
    ResultCode,
    ResultMessage,
    CorrelationId
| order by Timestamp desc
```

### Summarize reliability and duration

```kusto
MapLogs
| where Timestamp > ago(7d)
| summarize
    OperationCount = count(),
    AverageDurationMs = avg(DurationMs),
    P95DurationMs = percentile(DurationMs, 95)
    by Status, OperationName
| order by OperationCount desc
```

### Find completed tileset operations with the longest durations

The following query returns the 20 completed operations with the longest durations in the selected time range:

```kusto
MapLogs
| where Timestamp > ago(24h)
| where OperationName == "BuildTileset"
| top 20 by DurationMs desc
| project
    Timestamp,
    ItemName,
    ItemId,
    OperationId,
    Status,
    DurationMs,
    ResultCode
```

### Correlate MapLogs with ItemJobEventLogs

Use `OperationId` and `JobInstanceId` to combine Fabric Maps operation results with job lifecycle information:

```kusto
let StartTime = ago(24h);
let MapOperations =
    MapLogs
    | where Timestamp > StartTime
    | project
        MapTimestamp = Timestamp,
        ItemId,
        ItemName,
        WorkspaceId,
        OperationId,
        OperationName,
        MapStatus = Status,
        DurationMs,
        ResultCode,
        ResultMessage,
        CorrelationId;
let JobEvents =
    ItemJobEventLogs
    | where Timestamp > StartTime
    | summarize arg_max(Timestamp, *) by JobInstanceId
    | project
        JobTimestamp = Timestamp,
        JobInstanceId,
        JobStatus,
        JobInvokeType,
        JobType,
        JobStartTime,
        JobEndTime;
MapOperations
| join kind=leftouter JobEvents on $left.OperationId == $right.JobInstanceId
| project
    MapTimestamp,
    JobTimestamp,
    ItemName,
    ItemId,
    OperationId,
    OperationName,
    MapStatus,
    JobStatus,
    JobInvokeType,
    JobType,
    JobStartTime,
    JobEndTime,
    DurationMs,
    ResultCode,
    ResultMessage,
    CorrelationId
| order by MapTimestamp desc
```

To investigate only failed operations, add `| where Status == "Failed"` immediately after the timestamp filter in the `MapOperations` query.

## Visualize and alert on monitoring data

Use the sample queries to build a [Real-Time Dashboard](../dashboard-real-time-create.md) or Power BI report. Useful visuals include:

- Tileset operation count by status.
- Failure count over time.
- Average and 95th-percentile duration over time.
- A detail table of recent failed operations.

To create an alert for failed tileset jobs, save the following query and [create an alert from the query results](../data-activator/activator-alert-queryset.md):

```kusto
MapLogs
| where Timestamp > ago(5m)
| where OperationName == "BuildTileset"
| where Status == "Failed"
| project
    Timestamp,
    ItemId,
    OperationId,
    ResultCode,
    ResultMessage
```

Include `ItemId` and `OperationId` in the alert details. These identifiers help responders locate the affected Map item and correlate the failure with `ItemJobEventLogs`.

## Understand operation results

Use the result fields to understand the outcome of an operation:

- `Status` indicates whether the operation succeeded, failed, or was canceled.
- `ResultCode` provides a stable code for grouping results and creating alerts. It isn't a raw exception type.
- `ResultMessage` provides troubleshooting guidance when available.
- `CorrelationId`, when populated, helps Microsoft Support correlate the log record with internal diagnostics.

For successful operations, `ResultCode` and `ResultMessage` are empty.

## Troubleshoot Fabric Maps monitoring

### The MapLogs table is missing

1. Confirm that workspace monitoring is enabled and data collection is turned on.
2. Run a supported `BuildTileset` job after you turn on data collection.
3. Allow several minutes for records to appear in the monitoring database.
4. If you enabled workspace monitoring before Fabric Maps support became available, turn data collection off and then on again. Follow the [workspace monitoring configuration guidance](../../fundamentals/enable-workspace-monitoring.md).

### A completed job doesn't have a MapLogs record

- Confirm that the operation is a `BuildTileset` job. Other Fabric Maps operations aren't currently supported.
- Confirm that the job ran after you turned on data collection. Earlier operations aren't backfilled.
- Expand the query time range to account for ingestion delays.
- Query `ItemJobEventLogs` by `JobInstanceId` to confirm the job identifier and final status.

### A MapLogs record doesn't match an ItemJobEventLogs record

- Join the tables by using `MapLogs.OperationId` and `ItemJobEventLogs.JobInstanceId`.
- Query both tables over the same time range, and expand the range if necessary.
- Allow time for records to arrive in both tables. The tables receive records independently, so related records can arrive at different times.

### Display names or identity fields are empty

`ItemName`, `WorkspaceName`, `CapacityName`, `Identity`, and `CorrelationId` can be empty. These fields are populated only when values are available.

For `BuildTileset` jobs, `ItemName`, `WorkspaceName`, and `Identity` aren't currently populated. Use identifiers such as `ItemId`, `WorkspaceId`, and `OperationId` to identify items and correlate operations.

### ResultMessage doesn't contain detailed error information

`ResultMessage` provides troubleshooting guidance limited to 256 characters. It doesn't include raw exceptions, stack traces, source data, geometry, file names, query text, secrets, or internal service details.

Use `ResultCode` to group results and create alerts. If you need help investigating an operation, provide Microsoft Support with its `OperationId`, `ItemId`, timestamp, and `CorrelationId`, if available.

## Considerations and limitations

- Fabric Maps currently logs only `BuildTileset` jobs that succeed, fail, or get canceled.
- Each eligible tileset job produces at most one Fabric Maps completion record.
- Workspace monitoring doesn't backfill activity that occurred before data collection was turned on.
- Ingestion is asynchronous. Related records can arrive in `MapLogs` and `ItemJobEventLogs` at different times.
- Display names and identity fields can be empty. Use stable identifiers in queries and alerts.

## Related content

- [Workspace monitoring overview](../../fundamentals/workspace-monitoring-overview.md)
- [Enable workspace monitoring](../../fundamentals/enable-workspace-monitoring.md)
- [Monitor Fabric items with item job event logs](../../fundamentals/item-job-event-logs.md)
- [Create tilesets](create-tile-sets.md)
