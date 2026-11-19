---
title: Workspace monitoring for graph in Microsoft Fabric
description: Monitor graph query execution and natural-language-to-GQL translation with workspace monitoring logs, schema references, and sample KQL queries.
ms.topic: reference
ms.date: 11/18/2026
ms.reviewer: angelalin
ai-usage: ai-generated
---

# Workspace monitoring for graph in Microsoft Fabric

Graph operation logs are part of Fabric's [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) capability. Workspace monitoring sends logs to a monitoring KQL database in the configured destination, which can be in the current workspace or another Monitoring Item's workspace. After you turn on data collection, graph operations such as query execution generate logs. You can query these logs using KQL (Kusto Query Language) to troubleshoot issues and optimize performance.

## Prerequisites

To collect and query graph telemetry:

- Have a graph model in a Fabric workspace
- [Enable workspace monitoring](../fundamentals/enable-workspace-monitoring.md) for the workspace that contains the graph model
- Have permission to query the monitoring KQL database

Once monitoring and data collection are enabled, Graph operations are automatically logged to respective tables in the monitoring Eventhouse item.

## Supported scenarios and telemetry

Graph provides the following operation log tables:

| Scenario | Table | Operation name | When and why the telemetry is emitted |
| --- | --- | --- | --- |
| Direct GQL query execution against a graph model. | `GraphModelQueryLogs` | `GraphQuery` | Records direct query operations against a graph model. Use the query text, duration, status, and error details to investigate query failures and performance. |
| Natural-language-to-GQL translation for a graph model. | `GraphModelNLToQueryLogs` | `NLtoGQL` | Records natural-language-to-graph-query translation operations used by [Fabric data agent](../data-science/concept-data-agent.md). Use the question, generated query, validation details, and retry count to investigate query-generation problems. |

Query generation and query execution are different operations. A translation log describes generation of a GQL query, not the result of executing that query.

Use these logs to:

- Track query and translation activity by graph model and workspace.
- Compare operation durations over time and identify slow operations.
- Investigate query failures by GQL status code, error code, and error message.
- Diagnose natural-language translation failures and validation problems.

For graph refresh job status, use the [Monitoring hub](monitoring-overview.md). For capacity consumption, use the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-install.md).

## Log schemas

All tables contain the common columns in the following section, plus their operation-specific columns. Column names are case-sensitive in KQL; use the names shown in the tables.

### Common columns

| Column | Type | Description |
| --- | --- | --- |
| `Timestamp` | datetime | Time when the event was recorded. |
| `OperationName` | string | Operation being logged: `GraphQuery` for query execution or `NLtoGQL` for natural-language-to-GQL translation. |
| `ItemId` | string | Unique identifier (GUID) of the Fabric item that logs the operation. |
| `ItemKind` | string | Type of item, such as a graph model or graph queryset. |
| `ItemName` | string | Name of the Fabric item that logs the operation. |
| `WorkspaceId` | string | Unique identifier (GUID) of the workspace that contains the item. |
| `WorkspaceName` | string | Name of the workspace that contains the item. |
| `CapacityId` | string | Unique identifier (GUID) of the Premium or Fabric capacity that hosts the item. |
| `CorrelationId` | string | Event identifier (GUID) used to correlate records across tables. |
| `OperationId` | string | Unique identifier (GUID) of the operation being logged. |
| `Identity` | string | Object identifier of the user who performs the operation. |
| `CustomerTenantId` | string | Microsoft Entra tenant identifier (GUID) of the customer. |
| `DurationMs` | long | Time taken by the operation, in milliseconds. |
| `Status` | string | Operation status, ex: `Success`, `SuccessDespiteError`, `Failed`. |
| `Level` | string | Severity level of the log. |
| `Region` | string | Fabric region of the resource emitting the log. |
| `PlatformMonitoringTableName` | string | Monitoring table associated with the event. |


### GraphModelQueryLogs table

The `GraphModelQueryLogs` table audits direct query operations executed against a graph model. The `OperationName` is `GraphQuery`. Use these records to inspect the GQL query, its duration and outcome, and diagnostic information.

In addition to the [common columns](#common-columns), this table contains:

| Column | Type | Description |
| --- | --- | --- |
| `GQLQuery` | string | User-generated GQL query text, for example, `MATCH p=(x) RETURN p`. |
| `GQLStatusCode` | string | GQL status code reported for the query, for example, `00000`, `02000`, or `42000`. |
| `ErrorCode` | string | Error code associated with the query operation, for example, `QueryValidationFailed`. |
| `GQLErrorMessage` | string | Error message that helps you diagnose and resolve user errors in the query. |

For background on query status codes, see [GQL status codes reference](gql-reference-status-codes.md).

### GraphModelNLToQueryLogs table

The `GraphModelNLToQueryLogs` table audits natural-language-to-graph-query translation operations for a graph model. The `OperationName` is `NLtoGQL`. Use these records to investigate why a question couldn't be translated into a valid GQL query.

In addition to the [common columns](#common-columns), this table contains:

| Column | Type | Description |
| --- | --- | --- |
| `NaturalLanguage` | string | Natural-language question provided by the user. |
| `GeneratedGQL` | string | GQL query generated from the question, for example, `MATCH p=(x) RETURN p`. |
| `ErrorCode` | string | Error code associated with query generation, for example, `UnableToGenerateGQL`, `CREATE_SEMANTIC_INVALID`, or `CREATE_DUPLICATE_EDGE`. |
| `RetryCount` | int | Retry count reported for query generation. The documented range is 1-3. |
| `ValidationFailureType` | string | Type of validation failure, for example, `SemanticInvalid` or `SyntaxInvalid`. |
| `GraphErrorMessage` | string | Error message that helps you diagnose query-generation problems, such as a request that requires rephrasing or entities, relationships, or properties that aren't available in the graph. |

Error codes and validation failure types shown here are examples, not exhaustive lists.

## Sample queries

Use these KQL queries to analyze your Graph operation logs. You can run these queries directly in the monitoring Eventhouse query editor. Adjust the time range and add an `ItemId` filter to focus on a specific graph model.

### Find slow queries

Find the 20 slowest completed query operations in the last 24 hours:

```kusto
GraphModelQueryLogs
| where Timestamp > ago(24h)
| summarize arg_max(Timestamp, *) by WorkspaceId, ItemId, OperationId
| where Status in ("Success", "SuccessDespiteError", "Failed")
| top 20 by DurationMs desc
| project Timestamp, WorkspaceName, ItemId, ItemName, OperationId,
    DurationMs, Status, GQLStatusCode, ErrorCode, GQLQuery
```

### Track query volume, failures, and duration

Calculate hourly operation counts, failure rates, and durations. This example counts `Failed` operations as failures and reports `SuccessDespiteError` operations separately.

```kusto
GraphModelQueryLogs
| where Timestamp > ago(24h)
| summarize arg_max(Timestamp, *) by WorkspaceId, ItemId, OperationId
| where Status in ("Success", "SuccessDespiteError", "Failed")
| summarize
    QueryCount = count(),
    FailedQueries = countif(Status == "Failed"),
    QueriesWithErrors = countif(Status == "SuccessDespiteError"),
    AverageDurationMs = avg(DurationMs),
    P95DurationMs = percentile(DurationMs, 95)
    by bin(Timestamp, 1h), WorkspaceId, ItemId
| extend FailureRatePercent = 100.0 * FailedQueries / QueryCount
| order by Timestamp desc
```

### Investigate translation failures

Inspect failed natural-language translation operations and their validation details:

```kusto
GraphModelNLToQueryLogs
| where Timestamp > ago(24h)
| summarize arg_max(Timestamp, *) by WorkspaceId, ItemId, OperationId
| where Status in ("Failed", "SuccessDespiteError")
| project Timestamp, WorkspaceName, ItemId, ItemName, OperationId,
    CorrelationId, DurationMs, Status, RetryCount, ValidationFailureType,
    ErrorCode, GraphErrorMessage, NaturalLanguage, GeneratedGQL
| order by Timestamp desc
| take 100
```

## Considerations

- Logs can contain query text, natural-language questions, generated GQL, and user identifiers. Review access to the monitoring database and its retention policy before sharing monitoring data.
- Translation failures and query execution failures describe different stages. Use the table and `OperationName` to identify the stage before investigating an error.
- If a table is missing or empty, verify that monitoring collection is on, generate the corresponding graph activity, and allow time for ingestion. For more information, see [Configure workspace monitoring](../fundamentals/enable-workspace-monitoring.md#troubleshooting).
- Workspace monitoring uses Fabric capacity and follows workspace monitoring retention and access controls. For details, see [Workspace monitoring considerations and limitations](../fundamentals/workspace-monitoring-overview.md#considerations-and-limitations).

## Related content

- [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
- [What is workspace monitoring?](../fundamentals/workspace-monitoring-overview.md)
- [Monitor graph workloads](monitoring-overview.md)
- [Monitor graph performance](monitor-graph-performance.md)
- [Optimize GQL query performance](gql-query-performance.md)
