---
title: Monitor Warehouse Activity with Workspace Monitoring (Preview)
description: Learn how to use workspace monitoring for Fabric Data Warehouse to compare performance, investigate failures, and attribute CPU use across a workspace.
ms.reviewer: mariyaali
ms.date: 09/28/2026
ms.topic: how-to
ai-usage: ai-generated
---

# Monitor warehouse activity with workspace monitoring (preview)

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

Workspace monitoring collects completed Data Warehouse query execution events from all supported items in a workspace. Use the `WarehouseExecutions` table to compare warehouse performance, investigate failures, and identify the users associated with higher CPU consumption.

Workspace monitoring complements [Data Warehouse Monitor](monitor.md) and [Query Insights](query-insights.md). Start with workspace monitoring when you need a workspace-wide view. After you identify an item and query that need investigation, use Monitor or Query Insights for detailed query analysis.

## Prerequisites

- Enable [workspace monitoring](../fundamentals/enable-workspace-monitoring.md). You need the **Admin** workspace role to enable monitoring.
- Use a workspace on a Power BI Premium or Fabric capacity.
- To query the monitoring database, you need at least the **Contributor** workspace role.
- Learn the basics of [Kusto Query Language (KQL)](/kusto/query/).

## Monitoring scenarios

Use Data Warehouse telemetry in workspace monitoring for these scenarios:

| Scenario | Workspace monitoring task | Detailed investigation |
|---|---|---|
| Performance degradation | Compare average, median, and 95th-percentile query duration across items. | Use the shared operation identifier to find the exact execution in Query Insights. |
| Reliability and failure investigation | Rank items by failed query count, failure rate, and result code. | Review query text and error details in Query Insights or Data Warehouse Monitor. |
| Workload attribution | Rank items and users by query count, duration, and CPU time. | Review the related query executions before changing schedules, policies, or capacity. |
| Activity tracking | Analyze query volume, status, and operation types over time. | Use saved KQL queries or a Real-Time Dashboard to monitor recurring patterns. |

## Events, logs, and metrics catalog

When you enable workspace monitoring, Fabric writes Data Warehouse execution events to the `WarehouseExecutions` table in the workspace monitoring database.

The table includes completed, user-initiated queries that run a distributed workload. It supports activity from:

- Warehouses.
- SQL analytics endpoints.
- Warehouse snapshots.

Fabric writes one event when each qualifying query completes. System-generated queries and queries that run only in the SQL front end, such as many metadata lookups, don't appear in the table.

For a cross-database query, Fabric attributes the event to the item that the user connected to when they submitted the query.

| Telemetry | Type | When it's emitted | Use it to |
|---|---|---|---|
| `WarehouseExecutions` | Log | One event is emitted when a user-initiated distributed query completes. | Compare performance, investigate failures, attribute query activity, and locate the corresponding Query Insights execution. |

The Data Warehouse workload doesn't emit a separate workspace monitoring metrics table in this release. Calculate metrics such as query count, failure rate, duration percentiles, and total CPU time from `WarehouseExecutions`.

## WarehouseExecutions schema

The following table describes the main columns in `WarehouseExecutions`.

| Column name | Type | Description |
|---|---|---|
| `Timestamp` | `datetime` | UTC timestamp when the monitoring record was generated. |
| `OperationStartTime` | `datetime` | UTC time when the query started. |
| `OperationEndTime` | `datetime` | UTC time when the query ended. |
| `ItemName` | `string` | Not supported for Data Warehouse events. |
| `ItemId` | `string` | Unique identifier of the warehouse, SQL analytics endpoint, or warehouse snapshot. |
| `ItemKind` | `string` | Type of item associated with the query. |
| `CustomerTenantId` | `string` | Unique identifier of the tenant where the operation ran. |
| `DurationMs` | `long` | Total elapsed time of the query, in milliseconds. |
| `Identity` | `dynamic` | Claims for the user associated with the query. |
| `Level` | `string` | Severity level of the event. |
| `OperationId` | `string` | Unique query execution identifier. The value matches Query Insights `distributed_statement_id`. |
| `OperationName` | `string` | Type of query operation. |
| `CapacityId` | `string` | Unique identifier of the capacity that hosts the item. |
| `WorkspaceMonitoringTableName` | `string` | Monitoring table name. The value is `WarehouseExecutions`. |
| `Region` | `string` | Fabric region where the event was emitted. |
| `Status` | `string` | Completion status, such as `Succeeded`, `Failed`, or `Canceled`. |
| `WorkspaceName` | `string` | Not supported for Data Warehouse events. |
| `WorkspaceId` | `string` | Unique identifier of the workspace that contains the item. |
| `ResultCode` | `string` | Result or error code associated with the completed query. |
| `CpuTimeMs` | `long` | CPU time associated with the distributed query execution, in milliseconds. |
| `SqlConnectionId` | `string` | Identifier of the SQL connection associated with the query. |
| `CapacityName` | `string` | Not supported for Data Warehouse events. |

## Tutorials and examples

The following examples show how to investigate performance, reliability, and workload attribution. Run each query in the KQL query editor for the workspace monitoring database.

### Compare performance across warehouses

Compare average and percentile query duration for each item over the last 24 hours:

```kusto
WarehouseExecutions
| where Timestamp > ago(24h)
| summarize
    QueryCount = count(),
    AverageDurationMs = round(avg(DurationMs), 2),
    P50DurationMs = percentile(DurationMs, 50),
    P95DurationMs = percentile(DurationMs, 95)
    by ItemId, ItemKind
| order by P95DurationMs desc
```

Use percentile values with the average to distinguish consistently slower activity from a smaller number of long-running queries.

### Rank items by CPU time

Rank items by total CPU time to identify where distributed query activity is concentrated:

```kusto
WarehouseExecutions
| where Timestamp > ago(24h)
| summarize
    QueryCount = count(),
    TotalCpuTimeMs = sum(CpuTimeMs),
    AverageCpuTimeMs = round(avg(CpuTimeMs), 2)
    by ItemId, ItemKind
| order by TotalCpuTimeMs desc
```

`CpuTimeMs` supports relative workload attribution and comparison. It isn't a monetary charge or an invoiced cost. For capacity billing and utilization, use the [Microsoft Fabric Capacity Metrics app](usage-reporting.md).

### Investigate failures

Calculate the failure rate for each item and result code:

```kusto
let QueryTotals =
    WarehouseExecutions
    | where Timestamp > ago(24h)
    | summarize TotalQueries = count() by ItemId, ItemKind;
let Failures =
    WarehouseExecutions
    | where Timestamp > ago(24h)
    | where Status == "Failed"
    | summarize FailedQueries = count() by ItemId, ItemKind, ResultCode;
Failures
| join kind=leftouter QueryTotals on ItemId, ItemKind
| extend FailureRatePercent =
    round(100.0 * FailedQueries / TotalQueries, 2)
| project
    ItemId,
    ItemKind,
    ResultCode,
    FailedQueries,
    TotalQueries,
    FailureRatePercent
| order by FailedQueries desc
```

After you identify an affected item, result code, and time window, open that warehouse in [Data Warehouse Monitor](monitor.md) or query its [Query Insights](query-insights.md) views for more detail.

### Drill down to Query Insights

Workspace monitoring and Query Insights serve different scopes:

- Workspace monitoring provides a workspace-wide view across warehouses.
- Query Insights provides detailed history and query text within one warehouse or SQL analytics endpoint.

`WarehouseExecutions.OperationId` matches `queryinsights.exec_requests_history.distributed_statement_id`. Use this shared identifier to investigate the exact query execution in Query Insights:

1. Record the `ItemId`, `ItemKind`, and `OperationId` from `WarehouseExecutions`.
1. Open the corresponding warehouse or SQL analytics endpoint.
1. Query `queryinsights.exec_requests_history` by using the `OperationId` value:

   ```sql
   SELECT *
   FROM queryinsights.exec_requests_history
   WHERE distributed_statement_id =
       'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
   ```

1. Review the query text, query hash, status, login, duration, CPU time, scan metrics, and SQL pool details.

Query Insights can take up to 15 minutes to show a completed execution.

## Consumption guidance

Save the KQL examples as a query set when your team uses the same investigation repeatedly. Use the monitoring database as a source for a Real-Time Dashboard when you need a shared operational view.

### Build a dashboard query

Use a time-binned query to visualize query volume, failures, duration, and CPU time:

```kusto
WarehouseExecutions
| where Timestamp > ago(24h)
| summarize
    QueryCount = count(),
    FailedQueries = countif(Status == "Failed"),
    AverageDurationMs = round(avg(DurationMs), 2),
    TotalCpuTimeMs = sum(CpuTimeMs)
    by bin(Timestamp, 15m), ItemId, ItemKind
| extend FailureRatePercent =
    round(100.0 * FailedQueries / QueryCount, 2)
| order by Timestamp asc
```

Use the result for:

- A time chart of query volume and failed queries.
- A table ranked by total CPU time.
- A chart that compares average duration by item.
- A failure-rate tile grouped by item.

For dashboard setup guidance, see [Visualize your workspace monitoring in a Real-Time dashboard or Power BI report](../fundamentals/sample-gallery-workspace-monitoring.md).

### Define an alert query

Use this query as the basis for an alert when an item exceeds a failure-rate threshold:

```kusto
WarehouseExecutions
| where Timestamp > ago(15m)
| summarize
    QueryCount = count(),
    FailedQueries = countif(Status == "Failed")
    by ItemId, ItemKind
| extend FailureRatePercent =
    round(100.0 * FailedQueries / QueryCount, 2)
| where QueryCount >= 10 and FailureRatePercent >= 20
```

Adjust the time window, minimum query count, and failure-rate threshold for your workload. Create the alert from a Real-Time Dashboard or Activator after you validate the query against typical workspace activity.

### Use a troubleshooting workflow

1. Run the failure or performance summary for the affected time range.
1. Identify the affected `ItemId` and `OperationId`.
1. Open the corresponding warehouse or SQL analytics endpoint.
1. Find the exact Query Insights record where `distributed_statement_id` equals the workspace monitoring `OperationId`.
1. Review query text, execution status, duration, CPU time, scan metrics, and SQL pool details.
1. Save the KQL query or dashboard view if the pattern requires ongoing monitoring.

## Considerations and limitations

- Workspace monitoring retains monitoring data for 30 days by default.
- Workspace monitoring consumption is billed at standard eventhouse and KQL database rates.
- `WarehouseExecutions` contains completed, user-initiated distributed query executions. It doesn't contain running queries, system-generated queries, or SQL front-end-only operations.
- Events appear after a qualifying query completes.
- Workspace monitoring is scoped to one workspace. Each enabled workspace has its own monitoring eventhouse and database.
- Use Data Warehouse Monitor or Query Insights when you need query text, query hashes, scan metrics, SQL pool details, or other engine-level diagnostics.

## Related content

- [What is workspace monitoring (preview)?](../fundamentals/workspace-monitoring-overview.md)
- [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
- [Monitor Fabric Data Warehouse](monitoring-overview.md)
- [Monitor T-SQL queries (Preview)](monitor.md)
- [Query Insights in Fabric Data Warehouse](query-insights.md)
- [Warehouse consumption and utilization in Microsoft Fabric](usage-reporting.md)
- [Visualize your workspace monitoring in a Real-Time dashboard or Power BI report](../fundamentals/sample-gallery-workspace-monitoring.md)
- [Workspace monitoring samples](https://github.com/microsoft/fabric-samples/tree/main/workspace-monitoring)
