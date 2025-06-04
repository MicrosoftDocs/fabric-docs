---
title: Query logs
description: View and analyze the log of queries run on an Eventhouse KQL database within Real-Time Intelligence.
author: spelluru
ms.author: spelluru
ms.topic: reference
ms.custom:
ms.date: 11/06/2024
---

# Query logs

The query logs table contains the list of queries run on an Eventhouse KQL database, which is part of Real-Time Intelligence. For each query, a log event record is stored in the **EventhouseQueryLogs** table.

## query logs table

Use query logs to:

* Analyze query performance and trends.
* Troubleshoot slow queries.
* Identify heavy queries consuming large amount of system resources.
* Identify the users/applications running the highest number of queries.

The following table describes the columns stored in the **EventhouseQueryLogs** table:

| Column Name | Type | Description |
|--|--|--|
| CacheColdHitsBytes | long | The amount of cold storage data that was available for the query in cold cache due to data prefetching. |
| CacheColdMissesBytes | long | The amount of cold storage data that wasn't available for the query in cold cache. |
| CacheHotHitsBytes | long | The amount of data that was available for the query in hot cache. The amount of data stored in hot cache is defined by the database or table caching policy. |
| CacheHotMissesBytes | long | The amount of data that wasn't available for the query in hot cache. |
| CapacityId | string | The Fabric capacity identifier. |
| ComponentFault | string | In the event of a query error, the component where the fault occurred. Valid values: `Server` and `Client`. If the query result set is too large, the value is `Client`. If an internal error occurred, the value is `Server`. |
| CorrelationId | string | The correlation identifier of the query. The value can include components of other items participating in the query, such as the semantic model of the report running the query. |
| CpuTimeMs | long | The total CPU time (ms) used by the query. |
| CustomerTenantId | string | The customer tenant identifier. |
| DatabaseId | string | The database unique identifier. |
| DatabaseName | string | The name of the database. |
| DurationMs | long | The duration of the query (ms). |
| ExtentsMaxScannedTime | datetime | The maximum data scan time. |
| ExtentsMinScannedTime | datetime | The minimum data scan time. |
| FailureReason | string | The reason the query failed. |
| Identity | dynamic | The identity of the user or application that ran the query. |
| ItemId | string | The identifier of the Fabric Eventhouse item. |
| ItemKind | string | The type of Fabric item. Valid values: `Eventhouse`. |
| ItemName | string | The name of the Fabric Eventhouse item. |
| Level | string | Not applicable. |
| MemoryPeakBytes | long | The peak memory consumption of the query. |
| OperationEndTime | datetime | The time (UTC) the operation ended. |
| OperationId | string | The unique query log identifier. |
| OperationStartTime | datetime | The time (UTC) the operation started. |
| QueryText | string | The text of the query. |
| Region | string | The region where the Fabric KQL database is located. |
| ResultTableCount | int | The number of tables used by the query. |
| ResultTableStatistics | string | The detailed statistics of the tables used by the query. |
| ScannedExtentsCount | long | The number of extents scanned by the query. A high number might indicate the cause of a query latency issue. |
| ScannedRowsCount | long | The number of rows scanned by the query. A high number might indicate the cause of a query latency issue. |
| SourceApplication | string | The name of the source application that ran the query. |
| Status | string | The completion status of the query. |
| Timestamp | datetime | The time (UTC) the event was generated. |
| TotalExtentsCount | long | The total number of extents in the result set. |
| TotalRowsCount | long | The total number of rows in the result set. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceMonitoringTableName | string | The name of the workspace monitoring table. Valid values: `EventhouseQueryLogs`. |
| WorkspaceName | string | The name of the workspace. |

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Related content

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)

* [Eventhouse monitoring](monitor-eventhouse.md)
