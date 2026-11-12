---
title: Monitor Real-Time Dashboards with workspace monitoring
description: Use workspace monitoring to inspect Real-Time Dashboard operation logs, review the schema, and query item activity.
ms.service: fabric
ms.subservice: rti-dashboard
ms.topic: how-to
ms.date: 11/12/2026
ms.search.form: product-kusto, Real-Time Dashboard
ai-usage: ai-assisted
---

# Monitor Real-Time Dashboards with workspace monitoring

Use workspace monitoring to review Real-Time Dashboard operations in the `RealTimeDashboardOperationLogs` table. Query the logs to inspect operation results, identify the associated item and principal, and analyze activity over time.

These logs describe operations on the dashboard item, not tile rendering, refresh performance, or viewing duration.

## Prerequisites

- [Configure workspace monitoring](../fundamentals/enable-workspace-monitoring.md) for the workspace that contains your dashboards, and turn on data collection.
- Have permission to query the destination monitoring KQL database. Workspace Contributors can query it; other users can receive [shared access](../fundamentals/enable-workspace-monitoring.md#share-the-monitoring-item).

## Access monitoring data

Open the destination monitoring item and the monitoring KQL database for the source workspace. Select `RealTimeDashboardOperationLogs`, and select **Query data**.

Collection doesn't backfill earlier activity. Allow time for ingestion after generating item activity.

## RealTimeDashboardOperationLogs table

The table contains the following columns. Fields aren't guaranteed to be populated in every record.

| Column | Type | Description |
| --- | --- | --- |
| `Timestamp` | `datetime` | The date and time (UTC) when the event was recorded. |
| `OperationName` | `string` | Name of the recorded operation. |
| `ItemId` | `string` | Identifier of the Real-Time Dashboard. |
| `ItemKind` | `string` | Fabric item type. |
| `ItemName` | `string` | Display name of the dashboard. |
| `WorkspaceId` | `string` | Identifier of the workspace that contains the dashboard. |
| `WorkspaceName` | `string` | Display name of the source workspace. |
| `CapacityId` | `string` | Capacity identifier. |
| `CorrelationId` | `string` | Identifier for correlating related monitoring records when populated. |
| `OperationId` | `string` | Operation identifier. |
| `ExecutingPrincipalId` | `string` | Object ID of the principal that performed the operation, when populated. |
| `ExecutingPrincipalType` | `string` | Principal type, when populated. |
| `Identity` | `dynamic` | Identity information associated with the operation, when populated. |
| `CustomerTenantId` | `string` | Tenant identifier. |
| `DurationMs` | `long` | Operation duration in milliseconds, when populated. |
| `Status` | `string` | Completion status of the operation. |
| `Region` | `string` | Azure region, when populated. |
| `OperationStartTime` | `datetime` | The date and time (UTC) when the operation began, when populated. |
| `OperationEndTime` | `datetime` | The date and time (UTC) when the operation completed, when populated. |
| `FailureReason` | `string` | Failure details, when populated. |
| `WorkspaceMonitoringTableName` | `string` | Name of the workspace monitoring table associated with the record. |
| `TileCount` | `int` | Dashboard tile count, when populated. |
| `DataSourceCount` | `int` | Dashboard data source count, when populated. |
| `PageCount` | `int` | Dashboard page count, when populated. |

## Sample queries

Run these queries in the monitoring KQL database. Adjust the time range to match your investigation.

### Review recent operations

```kusto
RealTimeDashboardOperationLogs
| where Timestamp >= ago(24h)
| project Timestamp, OperationName, ItemName, ItemId, Status,
    ExecutingPrincipalId, OperationId
| order by Timestamp desc
```

### Chart daily operations

```kusto
RealTimeDashboardOperationLogs
| where Timestamp >= ago(30d)
| summarize OperationCount = count()
    by bin(Timestamp, 1d), OperationName
| render timechart
```

### Review a dashboard's operation history

Replace `<dashboard-item-id>` with the dashboard's item ID.

```kusto
let TargetItemId = "<dashboard-item-id>";
RealTimeDashboardOperationLogs
| where Timestamp >= ago(30d)
| where ItemId == TargetItemId
| project Timestamp, OperationName, Status, ExecutingPrincipalId,
    OperationId, CorrelationId
| order by Timestamp asc
```

## Considerations and limitations

- Operation counts don't measure distinct viewers, viewing duration, or engagement.
- For reported failures, inspect `Status` and `FailureReason` when populated. Retain `OperationId` and `CorrelationId` for investigation.
- Logs cover collected activity, not a complete inventory or lifetime history of dashboards.
- Retention is 30 days by default and is configurable. See [Manage retention and caching](../fundamentals/enable-workspace-monitoring.md#manage-retention-and-caching).
- If data is missing, verify collection and the source workspace's database, then follow [workspace monitoring troubleshooting](../fundamentals/enable-workspace-monitoring.md#troubleshooting).

## Related content

- [Workspace monitoring overview](../fundamentals/workspace-monitoring-overview.md)
- [Create a Real-Time Dashboard](dashboard-real-time-create.md)
- [Visualize workspace monitoring data](../fundamentals/sample-gallery-workspace-monitoring.md)
- [Monitor KQL querysets with workspace monitoring](monitor-kql-querysets-with-workspace-monitoring.md)
