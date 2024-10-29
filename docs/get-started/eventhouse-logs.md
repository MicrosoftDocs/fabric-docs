---
title: Eventhouse logs
description: Understand the eventhouse logs so that you can use them with your Fabric workspace monitoring feature.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 09/02/2024

#customer intent: As a workspace admin I want to enable the workspace monitoring feature in my workspace
---

# Eventhouse logs

Eventhouse logs are registered in the Eventhouse KQL database, which is part of the Real-Time Intelligence solution. You can use these logs to monitor the usage and performance of your workspace.

| Column Name                 | Type     | Description                                                                                                        |    |
|-----------------------------|----------|--------------------------------------------------------------------------------------------------------------------|----|
| ArtifactId                  | string   | The identifier of the Fabric Eventhouse item.                                                                      | Command, data operations |
| ArtifactKind                | string   | The type of Fabric item. Valid values: `Eventhous`.                                                                | Command, data operations |
| ArtifactName                | string   | The name of the Fabric Eventhouse item.                                                                            | Command, data operations |
| CacheColdHitsBytes          | long     | The amount of cold storage data that was available for the command in cold cache due to data prefetching.          | Command |
| CacheColdMissesBytes        | long     | The amount of cold storage data that was not available for the command in cold cache.                              | Command |
| CacheHotHitsBytes           | long     | The amount of data that was available for the command in the hot cache. The amount of data stored in hot   cache is defined by the database or table caching policy.  | Command |
| CacheHotMissesBytes         | long     | The amount of data that was not available for the command in hot cache.                                            | Command |
| CommandText                 | string   | The text of the command.                                                                                           | Command |
| ComponentFault              | string   | In the event of a command error, the component where the fault occurred. Valid values:  `Server` or `Client`.      | Command |
| CorrelationId               | string   | The correlation identifier of the command.                                                                         | Command, data operations |
| CpuTimeMs                   | long     | Total CPU in millisecond (ms) used by the command.                                                                 | Command, data operations |
| CustomerTenantId            | string   | The customer tenant identifier.                                                                                    | Command, data operations |
| DatabaseId                  | string   | The database unique identifier.                                                                                    | Command, data operations |
| DatabaseName                | string   | The name of the database.                                                                                          | Command, data operations |
| DataOperationKind           | string   | The type of data operation activity.                                                                               | Data operations |
| DurationMs                  | long     | The duration of the command (ms).                                                                                  | Command |
| EventhouseDataOperationProperties      | dynamic  | (Optional) Additional properties for specific data operation types.                                     | Data operations |
| EventhouseCommandType       | string   | The type of command that was run.                                                                                  | Command, data operations |
| ExtentSizeInBytes           | long     | The total size of extents ingested on this operation.                                                              | Data operations |
| ExtentsMaxScannedTime       | datetime | The maximum data scan time.                                                                                        | Command |
| ExtentsMinScannedTime       | datetime | The minimum data scan time.                                                                                        | Command |
| FailureReason               | string   | The reason the command failed.                                                                                     | Command |
| Identity                    | dynamic  | The identity of the user or application that ran the command.                                                      | Command |
| MemoryPeakBytes             | long     | The peak memory consumption of the command.                                                                        | Command |
| OperationEndTime            | datetime | The time (UTC) the operation ended.                                                                                | Command |
| OperationId                 | string   | The unique command log identifier.                                                                                 | Command, data operations |
| OperationStartTime          | datetime | The time (UTC) the operation started.                                                                              | Command |
| OriginalSizeInBytes         | long     | The original size of data ingested.                                                                                | Data operations |
| PlatformMonitoringTableName | string   | The name of the platform monitoring table. Valid values:  `EventhouseCommandyLogs`.                                | Command |
| PremiumCapacityId           | string   | The Fabric capacity identifier.                                                                                    | Command, data operations |
| PremiumCapacityName         | string   | The Fabric capacity name.                                                                                          | Command, data operations |
| Region                      | string   | The region where the Fabric KQL Database is located.                                                               | Command, data operations |
| ScannedExtentsCount         | long     | The number of extents scanned by the command. A high number might indicate the cause of a command latency issue.   | Command |
| ScannedRowsCount            | long     | The number of rows scanned by the command. A high number might indicate the cause of a command latency issue.      | Command |
| SourceApplication           | string   | The name of the source application that ran the command.                                                           | Command |
| Status                      | string   | The completion status of the command.                                                                              | Command |
| TableName                   | string   | The name of the destination table used by the data operation.                                                      | Data operations |
| Timestamp                   | datetime | The time (UTC) the event was generated.                                                                            | Command, data operations |
| TotalExtentsCount           | long     | The total number of extents in the result set.                                                                     | Command, data operations |
| TotalRowsCount              | long     | The total number of rows in the result set.                                                                        | Command, data operations |
| WorkspaceId                 | string   | The identifier of the workspace.                                                                                   | Command, data operations |
| WorkspaceName               | string   | The name of the workspace.                                                                                         | Command, data operations |

## Eventhouse log types

* **Command** - Use the command logs to:
    * Analyze command performance and trends.  
    * Identify commands that consume a large amount of system resources.
    * Identify the users and applications that run the highest number of commands.

* **Data operations** - Use the data operations logs to:
    * Analyze data operations performance and trends.
    * Troubleshoot data operations consuming large quantity of CPU activity minutes.
    * Identify the data operations applied on specific table.

    Data operations include:
    * `BatchIngest` - For each batch ingestion data operation.
    * `UpdatePolicy` – For each update policy data operation.
    * `MaterializedView` – For each materialized view update data operation.
    * `RowStoreSeal` – Refers to the data operation that seals an extent of streaming data that's temporarily stored in a rowstore. The RowStoreSeal data operation happens after the streaming data is already available for data queries.  

* **Ingestion results** - Provide information about successful and failed ingestion operations, and are supported for queued ingestions. Use to:
    * Monitor the number of successful ingestions.
    * Monitor the number of failed ingestions.
    * Troubleshoot the cause of failed ingestions.

## Related content

* [Microsoft Fabric licenses](../enterprise/licenses.md)

* [About tenant settings](../admin/about-tenant-settings.md)