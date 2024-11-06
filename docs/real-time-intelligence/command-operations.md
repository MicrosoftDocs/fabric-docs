---
title: Command operation logs
description: View a set of command operation logs that you can query in your Fabric workspace monitoring database.
author: KesemSharabi
ms.author: kesharab
ms.topic: reference
ms.date: 11/06/2024

---

# Command operations

Command operation logs are part of the Eventhouse logs and are registered in the Eventhouse KQL database, which is part of the Real-Time Intelligence solution. You can use these logs to monitor the usage and performance of your workspace.

## Command operation logs

Use the command operation logs to:

* Analyze command performance and trends.
* Identify commands that consume a large amount of system resources.
* Identify the users and applications that run the highest number of commands.

This table lists the command logs.

| Column Name | Type | Description |
|--|--|--|
| ArtifactId | string | The identifier of the Fabric Eventhouse item. |
| ArtifactKind | string | The type of Fabric item. Valid values: `Eventhouse`. |
| ArtifactName | string | The name of the Fabric Eventhouse item. |
| CacheColdHitsBytes | long | The amount of cold storage data that was available for the command in cold cache due to data prefetching. |
| CacheColdMissesBytes | long | The amount of cold storage data that was not available for the command in cold cache. |
| CacheHotHitsBytes | long | The amount of data that was available for the command in the hot cache. The amount of data stored in hot cache is defined by the database or table caching policy. |
| CacheHotMissesBytes | long | The amount of data that was not available for the command in hot cache. |
| CommandText | string | The text of the command. |
| ComponentFault | string | In the event of a command error, the component where the fault occurred. Valid values: `Server` or `Client`. |
| CorrelationId | string | The correlation identifier of the command. |
| CpuTimeMs | long | Total CPU in millisecond (ms) used by the command. |
| CustomerTenantId | string | The customer tenant identifier. |
| DatabaseId | string | The database unique identifier. |
| DatabaseName | string | The name of the database. |
| DurationMs | long | The duration of the command (ms). |
| EventhouseCommandType | string | The type of command that was run. |
| ExtentsMaxScannedTime | datetime | The maximum data scan time. |
| ExtentsMinScannedTime | datetime | The minimum data scan time. |
| FailureReason | string | The reason the command failed. |
| Identity | dynamic | The identity of the user or application that ran the command. |
| MemoryPeakBytes | long | The peak memory consumption of the command. |
| OperationEndTime | datetime | The time (UTC) the operation ended. |
| OperationId | string | The unique command log identifier. |
| OperationStartTime | datetime | The time (UTC) the operation started. |
| PlatformMonitoringTableName | string | The name of the platform monitoring table. Valid values: `EventhouseCommandyLogs`. |
| PremiumCapacityId | string | The Fabric capacity identifier. |
| PremiumCapacityName | string | The Fabric capacity name. |
| Region | string | The region where the Fabric KQL Database is located. |
| ScannedExtentsCount | long | The number of extents scanned by the command. A high number might indicate the cause of a command latency issue. |
| ScannedRowsCount | long | The number of rows scanned by the command. A high number might indicate the cause of a command latency issue. |
| SourceApplication | string | The name of the source application that ran the command. |
| Status | string | The completion status of the command. |
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
