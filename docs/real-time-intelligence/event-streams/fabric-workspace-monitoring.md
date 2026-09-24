---
title: Eventstream Workspace Monitoring Overview (preview)
description: Eventstream workspace monitoring lets you track health, performance, and errors in Fabric eventstreams. Learn how to query metrics and troubleshoot issues with KQL.
#customer intent: As a Fabric workspace admin, I want to understand what Eventstream workspace monitoring is so that I can decide whether to enable it for my workspace
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 08/24/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Eventstream workspace monitoring overview (preview)

Use **Eventstream workspace monitoring (preview)** to track the health and performance of eventstreams by using Fabric workspace monitoring. When you enable workspace monitoring, Fabric automatically creates an eventhouse in your workspace that collects metrics, node status, and error data from your eventstreams. You can query this data by using KQL (Kusto Query Language) to troubleshoot issues, analyze trends, and build custom dashboards.

[!INCLUDE [Workspace monitoring prerequisites](includes/workspace-monitoring-prerequisites.md)]

## Monitoring tables

Eventstream monitoring provides three tables in the workspace monitoring database. All tables share common columns (base dimensions) and include table-specific columns for the data they track.

| Table | What it tells you | Emission frequency |
|---|---|---|
| `EventStreamNodeStatus` | Whether each node in your eventstream is running, paused, failed, or in another state. | Approximately every 6 hours |
| `EventStreamMetrics` | Data flow metrics like incoming and outgoing message counts, byte volumes, watermark delay, and backlogged events. | Every minute |
| `EventStreamErrorMetrics` | Error counts by type, including runtime errors, deserialization errors, and data conversion errors. | Every minute |

## Questions you can answer

Together, these tables let you answer questions like:

- How many events entered and exited my eventstream in the last hour?
- Is my eventstream healthy? Are all nodes running?
- Where are events being dropped or delayed?
- What types of errors are occurring and how frequently?
- Does the processing keep up with the incoming data volume?

## Common columns (base dimensions)

All three Eventstream monitoring tables include these columns. They show which eventstream and workspace the data belongs to.

| Column | Type | Description |
|---|---|---|
| `Timestamp` | datetime | The date and time (UTC) when the event was recorded. |
| `ArtifactId` | string | The unique identifier of the eventstream. |
| `ArtifactName` | string | The display name of the eventstream. |
| `ArtifactKind` | string | Always `Event Stream` for Eventstream items. |
| `WorkspaceId` | string | The unique identifier of the Fabric workspace. |
| `WorkspaceName` | string | The display name of the workspace. |
| `CustomerTenantId` | string | The Microsoft Entra tenant ID. |
| `Level` | string | The severity level of the event (for example, "Informational"). |
| `OperationId` | string | A unique identifier for the operation. |
| `PremiumCapacityId` | string | The identifier of the Fabric capacity. |
| `PlatformMonitoringCategory` | string | The monitoring category (for example, "Engine"). |
| `PlatformMonitoringTableName` | string | The name of the monitoring table. |
| `LogAnalyticsResourceId` | string | The Azure Log Analytics workspace resource ID. |

## EventStreamNodeStatus

This table tracks the health of each node in your eventstream. A node is an individual component in your eventstream, such as a source, a destination, or a stream. Each row represents the status of one node at a point in time.

Node status is emitted periodically (approximately every six hours).

| Column | Type | Description |
|---|---|---|
| `NodeId` | string | The unique identifier of the node (a GUID that stays the same even if the node is renamed). |
| `NodeName` | string | The display name of the node (the alias you see in the Eventstream editor). |
| `NodeDirection` | string | The role of the node: Source, Destination, Default Stream, or Derived Stream. |
| `NodeType` | string | The type of the node, such as Eventhouse, Lakehouse, IoTHub, AzureEventHub, and others. |
| `NodeStatus` | string | The current status of the node. Possible values: Unknown, Creating, Running, Paused, Failed, Warning, Deleting. |

## EventStreamMetrics

This table contains data flow metrics for your eventstream. It tells you how much data is flowing through each part of your eventstream. For example, it tells you how many messages are coming in, going out, and whether processing keeps up with the incoming volume.

| Column | Type | Description |
|---|---|---|
| `CorrelationId` | string | An identifier that maps the metric to the underlying service resource, such as a processing job or an event hub entity. |
| `NodeDirection` | string | The role of the node: Source, Destination, Default Stream, or Derived Stream. |
| `NodeType` | string | The type of the node. |
| `MetricsName` | string | The name of the metric being reported (see available metrics later in this article). |
| `Aggregation` | string | How the metric was aggregated: Avg, Max, Min, or Sum. |
| `Value` | real | The numeric value of the metric. |
| `Unit` | string | The unit of measurement: Count, Seconds, or Bytes. |
| `MetricSpecificDimensions` | dynamic | More context as a JSON object. Can include PartitionId, ProcessorId, QueryStepId, OperatorId, LogicalName, ChildEntityName, Protocol, or ContainerId depending on the source. |

### Stream metrics

These metrics apply to default and derived streams.

| Metric name | Aggregation | Unit | What it measures |
|---|---|---|---|
| `Incoming Bytes` | Sum | Bytes | The total bytes received by the eventstream. |
| `Incoming Messages` | Sum | Count | The total number of messages received by the eventstream. |
| `Outgoing Bytes` | Sum | Bytes | The total bytes read from the eventstream by consumers. |
| `Outgoing Messages` | Sum | Count | The total number of messages read from the eventstream by consumers. |

### Processing metrics

These metrics apply to sources and destinations with transformations.

| Metric name | Aggregation | Unit | What it measures |
|---|---|---|---|
| `Watermark Delay` | Max | Seconds | The maximum delay between when an event was produced and when it was processed. A rising watermark delay means processing is falling behind. |
| `Input Events` | Sum | Count | The total number of events received by the processor. |
| `Backlogged Input Events` | Max | Count | The number of events waiting to be processed. A high backlog means the processor can't keep up with the incoming rate. |
| `Input Event Bytes` | Sum | Bytes | The total bytes of events received by the processor. |
| `Input Sources Received` | Sum | Count | The number of distinct input sources that sent events. |
| `Output Events` | Sum | Count | The total number of events produced by the processor and sent to destinations. |

## EventStreamErrorMetrics

This table tracks error counts by type. Use it to identify what kinds of errors are occurring and how frequently. Each row represents an error count for a specific error type in a given time period.

| Column | Type | Description |
|---|---|---|
| `CorrelationId` | string | An identifier that maps the error to the underlying service resource. |
| `NodeDirection` | string | The role of the node: Source, Destination, Default Stream, or Derived Stream. |
| `NodeType` | string | The type of the node. |
| `MetricsName` | string | The type of error: Runtime Errors, Deserialization Errors, or Data Conversion Errors. |
| `Aggregation` | string | Always "Sum" for error metrics. |
| `Value` | real | The number of errors that occurred. |
| `Unit` | string | Always "Count" for error metrics. |
| `MetricSpecificDimensions` | dynamic | More context as a JSON object (for example, PartitionId, ProcessorId). |

### Error types

| Error type | What it means |
|---|---|
| `Runtime Errors` | Errors that occurred during event processing, such as query execution failures or output write failures. |
| `Deserialization Errors` | Errors that occurred when trying to read incoming events. This error usually means the data format doesn't match the expected schema. |
| `Data Conversion Errors` | Errors that occurred when converting data between types, such as trying to convert a text value to a number. |

## Related content

- [Enable workspace monitoring](enable-fabric-workspace-monitoring.md)
- [Query Eventstream monitoring data with KQL](query-fabric-workspace-monitoring-data.md)
- [Eventstream workspace monitoring known limitations](fabric-workspace-monitoring-known-limitations.md)
