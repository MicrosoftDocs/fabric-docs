---
title: GraphQL operation logs
description: View a set of GraphQL operation logs that you can query in your Fabric workspace monitoring database.
author: eric-urban
ms.author: eur
ms.reviewer: edlima
ms.topic: reference
ms.custom: freshness-kr
ms.date: 01/21/2026
---

# GraphQL operations

Every GraphQL query and mutation executed through your Fabric API for GraphQL generates detailed operation logs that capture performance metrics, query text, authentication details, and execution results. These logs are automatically collected and stored in your workspace's monitoring database, providing visibility into how your GraphQL APIs are being used and how they're performing.

GraphQL operation logs are part of Fabric's [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) capability. When you enable workspace monitoring, Fabric creates an Eventhouse database in your workspace that continuously collects logs from all your GraphQL APIs. You can query these logs using KQL (Kusto Query Language) to troubleshoot issues, optimize performance, track usage patterns, and ensure your APIs meet SLA requirements.

## Prerequisites

To access and query GraphQL operation logs:

1. [Enable workspace monitoring](../fundamentals/enable-workspace-monitoring.md) in your Fabric workspace
1. Access the Eventhouse KQL database created for your workspace
1. Familiarity with [Kusto Query Language (KQL)](/azure/data-explorer/kusto/query/) for querying the logs

Once monitoring is enabled, GraphQL operations are automatically logged to two tables: `GraphQLMetrics` for aggregated metrics and `GraphQLLog` for detailed operation logs.

## Who uses GraphQL operation logs

Operation logs and monitoring are essential for:
- **Fabric workspace admins** monitoring GraphQL API usage, performance, and capacity consumption
- **Data engineers** tracking data access patterns and optimizing Fabric lakehouse and warehouse queries
- **DevOps teams** ensuring production applications consuming Fabric data meet SLA requirements
- **Fabric capacity administrators** understanding API consumption metrics for capacity planning and cost management

Use operation logs when you need to monitor, troubleshoot, or analyze the performance and usage of your Fabric GraphQL APIs.

## GraphQL operation logs

A log event for each query run by the Fabric API for GraphQL on its connected data sources is stored in two complementary tables:

- **GraphQLMetrics**: Contains aggregated metric data with time-grain summaries, ideal for performance monitoring and trend analysis
- **GraphQLLog**: Contains detailed operation logs with full query text and execution details, ideal for troubleshooting specific queries

Use these logs to:
* Identify behavior changes and potential API degradation
* Detect unusual or resource-heavy queries
* Identify users and applications with the highest number of queries
* Analyze query performance and trends
* Troubleshoot slow queries
* Diagnose issues with specific GraphQL queries

### GraphQLMetrics table

The `GraphQLMetrics` table stores aggregated metrics for GraphQL operations. Use this table for performance monitoring, capacity planning, and identifying trends over time.

This table contains the following columns:

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

### GraphQLLog table

The `GraphQLLog` table stores detailed operation logs for each GraphQL query execution. Use this table for troubleshooting specific queries, analyzing query text, and investigating errors or performance issues.

For more information on the events and a drill-down into the `ExecutionMetrics` event, see [Events and schema](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure#events-and-schema).

This table contains the following columns:

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

Use these KQL queries to analyze your GraphQL operation logs. You can run these queries directly in the Eventhouse query editor within your workspace.

### Find slow queries

Identify GraphQL queries that take longer than 5 seconds to execute:

```kusto
GraphQLLog
| where DurationMs > 5000
| project Timestamp, ItemName, DurationMs, QueryText, Status, Identity
| order by DurationMs desc
| take 20
```

### Top users by query count

Find which users or applications are making the most GraphQL requests:

```kusto
GraphQLLog
| summarize QueryCount = count() by Identity
| order by QueryCount desc
| take 10
```

### Error rate analysis

Calculate the error rate for GraphQL operations over time:

```kusto
GraphQLLog
| summarize 
    TotalQueries = count(),
    FailedQueries = countif(Status == "failed"),
    ErrorRate = (countif(Status == "failed") * 100.0) / count()
    by bin(Timestamp, 1h)
| order by Timestamp desc
```

### Most resource-intensive queries

Identify queries that process the largest amount of data:

```kusto
GraphQLLog
| where ProcessedBytes > 0
| project Timestamp, ItemName, ProcessedBytes, QueryText, DurationMs
| order by ProcessedBytes desc
| take 20
```

### Query performance trends

Analyze average query performance over the last 24 hours:

```kusto
GraphQLMetrics
| where Timestamp > ago(24h)
| summarize 
    AvgDuration = avg(MetricSumValue),
    MaxDuration = max(MetricSumValue),
    QueryCount = count()
    by bin(Timestamp, 1h), ItemName
| order by Timestamp desc
```

For more workspace monitoring samples, visit [workspace-monitoring](https://github.com/microsoft/fabric-samples/tree/main/workspace-monitoring) in the Fabric samples GitHub repository.

## Related content

- [What is workspace monitoring?](../fundamentals/workspace-monitoring-overview.md)
- [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
