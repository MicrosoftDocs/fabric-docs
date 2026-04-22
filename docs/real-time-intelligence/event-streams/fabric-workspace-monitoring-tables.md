---
title: Eventstream Monitoring Tables Overview
description: Eventstream monitoring tables track node status, data flow metrics, and errors across three workspace tables. Learn how to monitor your eventstream effectively.
#customer intent: As a Fabric developer, I want to understand what Eventstream monitoring tables are so that I can decide how to monitor my eventstream's health and performance.
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 04/21/2026
ms.topic: article
---

# Eventstream monitoring tables overview

**Eventstream monitoring tables** are a set of three tables created in your workspace monitoring database that capture different aspects of your eventstream's behavior. All tables share common columns (base dimensions) and include table-specific columns for the data they track.

| Table | Emission Frequency |
|---|---|
| `EventStreamNodeStatus` | Approximately every 6 hours |
| `EventStreamMetrics` | Every minute |
| `EventStreamErrorMetrics` | Every minute |

> [!NOTE]
> Eventstream workspace monitoring is currently in preview. 

## Common columns (base dimensions)

These columns appear in all three Eventstream monitoring tables. They identify which eventstream and workspace the data belongs to.

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

Node status is emitted periodically (approximately every 6 hours).

| Column | Type | Description |
|---|---|---|
| `NodeId` | string | The unique identifier of the node (a GUID that stays the same even if the node is renamed). |
| `NodeName` | string | The display name of the node (the alias you see in the Eventstream editor). |
| `NodeDirection` | string | The role of the node: Source, Destination, Default Stream, or Derived Stream. |
| `NodeType` | string | The type of the node, such as Eventhouse, Lakehouse, IoTHub, AzureEventHub, and others. |
| `NodeStatus` | string | The current status of the node. Possible values: Unknown, Creating, Running, Paused, Failed, Warning, Deleting. |

## EventStreamMetrics

This table contains data flow metrics for your eventstream. It tells you how much data is flowing through each part of your eventstream such as how many messages are coming in, going out, and whether processing is keeping up with the incoming volume.

| Column | Type | Description |
|---|---|---|
| `CorrelationId` | string | An identifier that maps the metric to the underlying service resource (for example, a processing job or an event hub entity). |
| `NodeDirection` | string | The role of the node: Source, Destination, Default Stream, or Derived Stream. |
| `NodeType` | string | The type of the node. |
| `MetricsName` | string | The name of the metric being reported (see available metrics later in this article). |
| `Aggregation` | string | How the metric was aggregated: Avg, Max, Min, or Sum. |
| `Value` | real | The numeric value of the metric. |
| `Unit` | string | The unit of measurement: Count, Seconds, or Bytes. |
| `MetricSpecificDimensions` | dynamic | More context as a JSON object. Can include PartitionId, ProcessorId, QueryStepId, OperatorId, LogicalName, ChildEntityName, Protocol, or ContainerId depending on the source. |

### Stream metrics
`
These metrics apply to default and derived streams.

| Metric name | Aggregation | Unit | What it measures |
|---|---|---|---|
| `Incoming Bytes` | Sum | Bytes | The total bytes received by the stream. |
| `Incoming Messages` | Sum | Count | The total number of messages received by the stream. |
| `Outgoing Bytes` | Sum | Bytes | The total bytes read from the stream by consumers. |
| `Outgoing Messages` | Sum | Count | The total number of messages read from the stream by consumers. |

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

