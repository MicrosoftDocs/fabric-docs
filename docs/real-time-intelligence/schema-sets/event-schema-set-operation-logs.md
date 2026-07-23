---
title: Event schema set operation logs
description: View the set of event schema set operation logs that you can query in your Fabric workspace monitoring database.
author: spelluru
ms.author: spelluru
ms.reviewer: majia
ms.topic: reference
ms.date: 07/23/2026
---

# Event schema set operations

Event schema set operation logs are part of the [workspace monitoring](../../fundamentals/workspace-monitoring-overview.md) logs and are registered in the Eventhouse KQL database, which is part of the Real-Time Intelligence solution. You can use these logs to monitor the control-plane activity and health of the event schema sets in your workspace.

## Event schema set operation logs

The event schema set (the Real-Time hub schema registry item) records a control-plane operation each time a schema, schema version, or event type is created, updated, or deleted. Each record captures the operation, the entity it affected, the outcome, and how long it took.

Use event schema set operation logs to:

* Audit who created, updated, or deleted schemas, schema versions, and event types, and when.
* Investigate authoring failures by filtering on `Status == "Failed"` and reviewing `ErrorType`.
* Track authoring volume and latency by operation category over time.
* Correlate schema set activity with other workspace items by using `CorrelationId`.

This table lists the event schema set operation logs.

| ColumnName | ColumnType | Description |
|--|--|--|
| Timestamp | datetime | The timestamp (UTC) of when the log was generated. |
| OperationName | string | The operation associated with the log record. |
| ItemId | string | Unique identifier of the event schema set the operation was performed on. |
| ItemKind | string | Type of the Fabric item logging the operation. |
| ItemName | string | The display name of the event schema set. |
| WorkspaceId | string | Unique identifier of the workspace containing the item. |
| WorkspaceName | string | Name of the workspace containing the item. |
| CapacityId | string | Unique identifier of the capacity hosting the item. |
| CorrelationId | string | The ID for correlated events. Can be used to identify correlated events between multiple tables. |
| OperationId | string | Unique identifier of the operation or request. |
| Identity | dynamic | Information about the user and claims for the identity that initiated the operation. |
| CustomerTenantId | string | Fabric tenant identifier. |
| DurationMs | long | Amount of time (in milliseconds) taken by the operation. |
| Status | string | Status of the operation, for example `Succeeded` or `Failed`. |
| Region | string | The Fabric region. |
| WorkspaceMonitoringTableName | string | Name of the table the events are available in for Fabric workspace monitoring. |
| OperationCategory | string | The category of event schema set entity the operation affected: `Schema`, `SchemaVersion`, or `EventType`. |
| SchemaId | string | Identifier of the schema affected by the operation, when applicable. |
| SchemaName | string | Name of the schema affected by the operation, when applicable. |
| EventTypeName | string | Name of the event type affected by the operation, when applicable. |
| SchemaVersion | string | Version of the schema affected by the operation, when applicable. |
| ErrorType | string | Type of error when the operation failed, for example `UserError` or `SystemError`. Empty on success. |

## Sample queries

Find failed schema authoring operations in the last day:

```kusto
EventSchemaSetOperations
| where Timestamp > ago(1d)
| where Status == "Failed"
| project Timestamp, OperationName, OperationCategory, ItemName, SchemaName, EventTypeName, ErrorType, DurationMs
| order by Timestamp desc
```

Summarize authoring volume by operation category and outcome over the last week:

```kusto
EventSchemaSetOperations
| where Timestamp > ago(7d)
| summarize Operations = count() by OperationCategory, Status
| order by Operations desc
```

Identify the slowest operations in the last day:

```kusto
EventSchemaSetOperations
| where Timestamp > ago(1d)
| top 20 by DurationMs desc
| project Timestamp, OperationName, OperationCategory, ItemName, DurationMs, Status
```

## Related content

* [What is workspace monitoring?](../../fundamentals/workspace-monitoring-overview.md)
* [Enable monitoring in your workspace](../../fundamentals/enable-workspace-monitoring.md)
* [Schema Registry overview](schema-registry-overview.md)
* [Explore the Event schema registry page in Real-Time hub](../../real-time-hub/event-schema-registry-page.md)
