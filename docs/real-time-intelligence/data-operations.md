---
title: Data operation logs
description: View a set of data operation logs that you can query in your Microsoft Fabric workspace monitoring database.
author: KesemSharabi
ms.author: kesharab
ms.topic: reference
ms.date: 11/06/2024

---

# Data operations

Data operation logs are part of the Eventhouse logs and are registered in the Eventhouse KQL database, which is part of the Real-Time Intelligence solution. You can use these logs to monitor the usage and performance of your workspace.

## Data operation logs

Use the data operation logs to:

* Analyze data operations performance and trends.
* Troubleshoot data operations consuming large quantity of CPU activity minutes.
* Identify the data operations applied on specific table.

Data operations include:
* `BatchIngest` - For each batch ingestion data operation.
* `UpdatePolicy` – For each update policy data operation.
* `MaterializedView` – For each materialized view update data operation.
* `RowStoreSeal` – Refers to the data operation that seals an extent of streaming data that's temporarily stored in a rowstore. The RowStoreSeal data operation happens after the streaming data is already available for data queries.

This table lists the data operation logs.

| Column Name | Type | Description |
|--|--|--|
| ArtifactId | string | The identifier of the Fabric Eventhouse item. |
| ArtifactKind | string | The type of the Fabric item. Valid values: `Eventhouse`. |
| ArtifactName | string | The name of the Fabric Eventhouse item. |
| CorrelationId | string | The correlation identifier of the data operation. |
| CpuTimeMs | long | The total CPU time (ms) used by the data operation. |
| CustomerTenantId | string | The customer tenant identifier. |
| DataOperationKind | string | The type of data operation activity. |
| DatabaseId | string | The database unique identifier. |
| DatabaseName | string | The name of the database. |
| DurationMs | long | The duration of the data operation (ms). |
| EventhouseDataOperationProperties | dynamic | (optional) Additional properties for specific data operation types. |
| ExtentSizeInBytes | long | The total size of extents ingested on this operation. |
| OperationId | string | The unique data operation log identifier. |
| OriginalSizeInBytes | long | The original size of data ingested. |
| PremiumCapacityId | string | The Fabric capacity identifier. |
| PremiumCapacityName | string | The Fabric capacity name. |
| Region | string | The region where the Fabric KQL Database is located. |
| TableName | string | The name of the destination table used by the data operation. |
| Timestamp | datetime | The time (UTC) the event was generated. |
| TotalExtentsCount | long | The total number of extents ingested by the data operation. |
| TotalRowsCount | long | The number of rows ingested by the data operation. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceName | string | The name of the workspace. |

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Related content

* [Enable monitoring in your workspace](enable-workspace-monitoring.md)

* [Eventhouse logs](eventhouse-logs.md)
