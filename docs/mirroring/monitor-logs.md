---
title: Mirrored database operation logs
description: View a set of Mirrored database operation logs that you can query in your Fabric workspace monitoring database.
author: linda33wj
ms.author: jingwang
ms.topic: reference
ms.date: 05/12/2025
---

# Mirrored database operation logs (Preview)

Mirrored database operation logs are part of the [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) logs and are registered in the Eventhouse KQL database, which is part of the Real-Time Intelligence solution. You can use these logs to monitor the execution and performance of your mirrored database.

## Mirrored database table execution logs

Mirrored database table-level logs provide detailed information about the mirroring execution, complementing the glance view of monitoring from the Fabric portal. You can use those logs to:

- Understand the amount of data replicated over time for the mirrored databases/tables.
- Track additions and removals of tables for mirroring.
- Monitor the mirroring status and diagnose failures.
- Measure the time and latency for initial snapshots and incremental data replication.

Learn more about how to [use workspace monitoring](monitor.md#use-workspace-monitoring) to monitor your mirrored database.

The following table describes the columns stored in the **MirroredDatabaseTableExecution** table:

| Column Name | Type | Description |
|---|---|---|
| Timestamp | datetime | The timestamp (UTC) of when the log entry was generated when the record was created by the data source. |
| OperationName | string | The operation associated with the operation log record. Valid values: `AddTable`, `ReplicatingSchema`, `StartSnapshotting`, `Snapshotting`, `StartReplicating`, `Replicating`, `StartReseeding`, `FailTable`, `RemoveTable`, `StopTable`. |
| ItemId | string | The identifier of the Fabric mirrored database item. |
| ItemKind | string | The type of the Fabric item. Valid values: `MirroredDatabase`. |
| ItemName | string | The name of the Fabric mirrored database item. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceName | string | The name of the workspace. |
| CapacityId | string | The Fabric capacity identifier hosting the item being operated on. |
| CorrelationId | string | Not applicable. |
| OperationId | string | Not applicable. |
| Identity | string | Not applicable. |
| CustomerTenantId | string | Customer Tenant ID, where the operation was performed. |
| DurationMs | long | Not applicable. |
| Status | string | Not applicable. |
| Level | string | Not applicable. |
| Region | string | The region where the Fabric mirrored database is located. |
| WorkspaceMonitoringTableName | string | The name of the workspace monitoring table. Valid values: `MirroredDatabaseTableExecution`. |
| OperationStartTime | datetime | The time (UTC) the operation started. |
| OperationEndTime | datetime | The time (UTC) the operation ended. |
| MirroringSourceType          | string   | The type of the source database, e.g. `AzureSqlDatabase`, `AzurePostgreSql`, `Snowflake`. |
| SourceTableName              | string   | The name of the source table.                                |
| SourceSchemaName             | string   | The name of the source schema.                               |
| ProcessedRows                | long     | The number of rows processed by the given operation.         |
| ProcessedBytes               | long     | The size of data processed by the given operation.           |
| ReplicatorBatchLatency       | long     | The latency to replicate the batch of data during mirroring. Unit is in seconds. |
| ErrorType                    | string   | The type of the error - `UserError` or `SystemError`.      |
| ErrorMessage                 | string   | The error message details.                                   |

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples/tree/main/workspace-monitoring/Mirrored%20database%20operations) GitHub repository.

## Related content

* [What is workspace monitoring?](../fundamentals/workspace-monitoring-overview.md)
* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
* [Monitor Fabric mirrored database replication](../database/mirrored-database/monitor.md)
