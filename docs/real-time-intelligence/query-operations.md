---
title: Query operation logs
description: View a set of query operation logs, that you can query in your Fabric workspace monitoring database.
author: KesemSharabi
ms.author: kesharab
ms.topic: reference
ms.date: 11/06/2024

---

# Query operations

Query operation logs are part of the Eventhouse logs and are registered in the Eventhouse KQL database, which is part of the Real-Time Intelligence solution. You can use these logs to monitor the usage and performance of your workspace.

## query operation logs

A log event for each query run on an Eventhouse KQL database, is stored in the *EventhouseQueryLogs* table.

Use query logs to:

* Analyze query performance and trends
* Troubleshoot slow queries
* Identify heavy queries consuming large amount of system resources
* Identify the users/applications running the highest number of queries

This table lists the query logs.

| Column Name | Type | Description |
|--|--|--|
| ArtifactId | string | The identifier of the Fabric Eventhouse item. |
| ArtifactKind | string | The type of Fabric item. Valid values: `Eventhouse`. |
| ArtifactName | string | The name of the Fabric Eventhouse item. |
| CacheColdHitsBytes | long | The amount of cold storage data that was available for the query in cold cache due to data prefetching. |
| CacheColdMissesBytes | long | The amount of cold storage data that was not available for the query in cold cache. |
| CacheHotHitsBytes | long | The amount of data that was available for the query in hot cache. The amount of data stored in hot cache is defined by the database or table caching policy. |
| CacheHotMissesBytes | long | The amount of data that was not available for the query in hot cache. |
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
| MemoryPeakBytes | long | The peak memory consumption of the query. |
| OperationEndTime | datetime | The time (UTC) the operation ended. |
| OperationId | string | The unique query log identifier. |
| OperationStartTime | datetime | The time (UTC) the operation started. |
| PlatformMonitoringTableName | string | The name of the platform monitoring table. Valid values: `EventhouseQueryLogs`. |
| PremiumCapacityId | string | The Fabric capacity identifier. |
| PremiumCapacityName | string | The Fabric capacity name. |
| QueryText | string | The text of the query. |
| Region | string | The region where the Fabric KQL Database is located. |
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
| WorkspaceName | string | The name of the workspace. |

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Related content

* [Enable monitoring in your workspace](enable-workspace-monitoring.md)

* [Eventhouse logs](eventhouse-logs.md)
