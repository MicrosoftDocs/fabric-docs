---
title: GraphQL operation logs
description: View a set of GraphQL operation logs that you can query in your Fabric workspace monitoring database.
author: eric-urban
ms.author: eur
ms.reviewer: sngun
ms.topic: reference
ms.custom:
ms.date: 11/06/2024
---

# GraphQL operations

GraphQL operation logs are part of the [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) logs and are registered in the Eventhouse KQL database, which is part of the Real-Time Intelligence solution. You can use these logs to monitor the usage and performance of your workspace.

## GraphQL operation logs

A log event for each query run by the Fabric API for GraphQL on its connected data sources, is stored in two tables: *GraphQLMetrics* and *GraphQLLog*.

Use query logs to:
* Identify behavior changes and potential API degradation.
* Detect unusual or resource-heavy queries.
* Identify users and applications with the highest number of queries
* Analyze query performance and trends.
* Troubleshoot slow queries.
* Diagnose issues with specific GraphQL queries.

This table lists the GraphQL logs.

| Column Name | Type | Description |
|---|---|---|
| Timestamp | datetime | The timestamp (UTC) of when the log entry was generated when the record was created by the data source. |
| ItemId | string | Unique ID of the resource logging the data. |
| ItemKind | string | Type of artifact logging the operation. |
| ItemName | string | The name of the Fabric artifact logging this operation. |
| WorkspaceId | string | Unique identifier of the Fabric workspace that contains the artifact being operated on |
| WorkspaceName | string | Name of the Fabric workspace containing the artifact. |
| CapacityId | string | Unique identifier of the capacity hosting the artifact being operated on. |
| CustomerTenantId | string | Customer Tenant ID, where the operation was performed. |
| PlatformMonitoringTableName | string | The name of the table to records belongs to (or the certified event type of the record). Format is \<WorkloadName\> + [OperationType>]+ \<TelemetryType\> |
| Region | string | The region of the resource emitting the event; for example, East US or France South. |
| MetricTimeGrain | string | Time grain of the metric (ISO 8601 Duration). |
| MetricUnitName | string | Unit of the metric. |
| MetricSumValue | long | The aggregated sum value of a metric during a single minute. |
| DatasourceTypes | dynamic | Array of DataSource types that are used by the model. |
| ResultCode | string | Error Code of the failed activities, used to extend usage to reliability. |
| Status | string | Status of the operation. Query executed successfully/successfully with errors/failed. |

### GraphQL log attributes

This table describes the GraphQLLogs attributes. For more information on the events and a drill-down into the `ExecutionMetrics` event, see [Events and schema](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure#events-and-schema).

| Column Name | Type | Description |
|--|--|--|
| Timestamp | datetime | The timestamp (UTC) of when the log entry was generated when the record was created by the data source. |
| OperationName | string | The name of the operation. |
| ItemId | string | Unique ID of the resource logging the data. |
| ItemKind | string | Type of artifact logging the operation. |
| ItemName | string | The name of the Fabric artifact logging this operation. |
| WorkspaceId | string | Unique identifier of the Fabric workspace that contains the artifact being operated on. |
| WorkspaceName | string | Name of the Fabric workspace containing the artifact. |
| CapacityId | string | Unique identifier of the capacity hosting the artifact being operated on. |
| CorrelationId | string | Root Activity ID. |
| OperationId | string | Unique identifier for the operation being logged. |
| Identity | dynamic | User and claim details. The user associated with the operation that is being reported. |
| CustomerTenantId | string | Customer Tenant ID, where the operation was performed. |
| DurationMs | long | Elapsed CPU time that has passed while all required operations have been processed. Unit is in milliseconds. |
| Status | string | Status of the operation. Query executed successfully/successfully with errors/failed. |
| Level | string | Metadata required by platform monitoring team. |
| Region | string | The region of the resource emitting the event; for example, East US or France South. |
| PlatformMonitoringTableName | string | The name of the table to records belongs to (or the certified event type of the record). Format is \<WorkloadName\> + [OperationType>]+ \<TelemetryType\> |
| QueryText | string | The text of the query. |
| GraphQLOverheadDurationMs | long | The GraphQL overhead in ms for a dataplane request. |
| ProcessedBytes | long | Processed data volume in byte. |
| TransportProtocol | string | Transport protocol for a request. |
| QueryResultMessage | string | This dimension is used to give additional context to the result of a query operation. |

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Related content

* [What is workspace monitoring?](../fundamentals/workspace-monitoring-overview.md)

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
