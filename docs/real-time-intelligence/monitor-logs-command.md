---
title: Command logs
description: View and analyze the log of commands run on an Eventhouse KQL database within Real-Time Intelligence.
author: spelluru
ms.author: spelluru
ms.topic: reference
ms.custom:
ms.date: 11/06/2024
---

# Command logs

The command logs table contains the list of commands run on an Eventhouse KQL database, which is part of Real-Time Intelligence. For each command, a log event record is stored in the **EventhouseCommandLogs** table.

## Command logs table

Use the command logs to:

* Analyze command performance and trends.
* Identify commands that consume a large amount of system resources.
* Identify the users and applications that run the highest number of commands.

The following table describes the columns stored in the **EventhouseCommandLogs** table:

| Column Name | Type | Description |
|--|--|--|
| CacheColdHitsBytes | long | The amount of cold storage data that was available for the command in cold cache due to data prefetching. |
| CacheColdMissesBytes | long | The amount of cold storage data that wasn't available for the command in cold cache. |
| CacheHotHitsBytes | long | The amount of data that was available for the command in the hot cache. The amount of data stored in hot cache is defined by the database or table caching policy. |
| CacheHotMissesBytes | long | The amount of data that wasn't available for the command in hot cache. |
| CapacityId | string | The Fabric capacity identifier. |
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
| ItemId | string | The identifier of the Fabric Eventhouse item. |
| ItemKind | string | The type of Fabric item. Valid values: `Eventhouse`. |
| ItemName | string | The name of the Fabric Eventhouse item. |
| Level | string | Not applicable. |
| MemoryPeakBytes | long | The peak memory consumption of the command. |
| OperationEndTime | datetime | The time (UTC) the operation ended. |
| OperationId | string | The unique command log identifier. |
| OperationName | string | The name of the operation performed. |
| OperationStartTime | datetime | The time (UTC) the operation started. |
| Region | string | The region where the Fabric KQL database is located. |
| ScannedExtentsCount | long | The number of extents scanned by the command. A high number might indicate the cause of a command latency issue. |
| ScannedRowsCount | long | The number of rows scanned by the command. A high number might indicate the cause of a command latency issue. |
| SourceApplication | string | The name of the source application that ran the command. |
| Status | string | The completion status of the command. |
| Timestamp | datetime | The time (UTC) the event was generated. |
| TotalExtentsCount | long | The total number of extents in the result set. |
| TotalRowsCount | long | The total number of rows in the result set. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceMonitoringTableName | string | The name of the workspace monitoring table. Valid values: `EventhouseCommandyLogs`. |
| WorkspaceName | string | The name of the workspace. |

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Related content

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)

* [Eventhouse monitoring](monitor-eventhouse.md)
