---
title: Data operation logs
description: View and analyze the log of data operations of an Eventhouse KQL database within Real-Time Intelligence.
author: spelluru
ms.author: spelluru
ms.topic: reference
ms.custom:
ms.date: 11/06/2024
---

# Data operation logs

The data operation logs table contains the list of data operations of an Eventhouse KQL database, which is part of Real-Time Intelligence. For each data operation, a log event record is stored in the **EventhouseDataOperationsLogs** table.

## Data operation logs table

Use the data operation logs to:

* Analyze data operations performance and trends.
* Troubleshoot data operations consuming large quantity of CPU activity minutes.
* Identify the data operations applied on specific table.

Data operations include:

* `BatchIngest` - For each batch ingestion data operation.
* `UpdatePolicy` – For each update policy data operation.
* `MaterializedView` – For each materialized view update data operation.
* `RowStoreSeal` – Refers to the data operation that seals an extent of streaming data that's temporarily stored in a rowstore. The `RowStoreSeal` data operation happens after the streaming data is already available for queries.

The following table describes the columns stored in the **EventhouseDataOperationsLogs** table:

| Column Name | Type | Description |
|--|--|--|
| CapacityId | string | The Fabric capacity identifier. |
| CorrelationId | string | The correlation identifier of the data operation. |
| CpuTimeMs | long | The total CPU time (ms) used by the data operation. |
| CustomerTenantId | string | The customer tenant identifier. |
| DatabaseId | string | The database unique identifier. |
| DatabaseName | string | The name of the database. |
| DataOperationKind | string | The type of data operation activity. |
| DurationMs | long | The duration of the data operation (ms). |
| EventhouseDataOperationProperties | dynamic | (optional) Additional properties for specific data operation types. |
| ExtentSizeInBytes | long | The total size of extents ingested on this operation. |
| Identity | dynamic | Not applicable. |
| ItemId | string | The identifier of the Fabric Eventhouse item. |
| ItemKind | string | The type of the Fabric item. Valid values: `Eventhouse`. |
| ItemName | string | The name of the Fabric Eventhouse item. |
| Level | string | Not applicable. |
| OperationId | string | The unique data operation log identifier. |
| OriginalSizeInBytes | long | The original size of data ingested. |
| Region | string | The region where the Fabric KQL database is located. |
| Status | string | Not applicable. |
| TableName | string | The name of the destination table used by the data operation. |
| Timestamp | datetime | The time (UTC) the event was generated. |
| TotalExtentsCount | long | The total number of extents ingested by the data operation. |
| TotalRowsCount | long | The number of rows ingested by the data operation. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceMonitoringTableName | string | The name of the workspace monitoring table. Valid values: `EventhouseDataOperationsLogs`. |
| WorkspaceName | string | The name of the workspace. |

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Related content

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)

* [Eventhouse monitoring](monitor-eventhouse.md)
