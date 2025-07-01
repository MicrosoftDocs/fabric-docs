---
title: Metrics
description: View and analyze the metrics of ingestions, materialized views, and continuous exports of an Eventhouse KQL database within Real-Time Intelligence.
author: spelluru
ms.author: spelluru
ms.topic: reference
ms.custom:
ms.date: 11/06/2024
---

# Metrics

The metrics table contains the details of ingestions, materialized views, and continuous exports of an Eventhouse KQL database, which is part of Real-Time Intelligence. For each metric, a log event record is stored in the **EventhouseMetrics** table.

## Metric operation logs

Use the metrics to:

* Analyze ingestion performance and trends.
* Monitor batch vs streaming ingestions.
* Troubleshoot ingestion failures.
* Deep dive into ingestion flows.
* Materialized views monitoring and health.
* Continuous exports monitoring.

The following table describes the columns stored in the **EventhouseMetrics** table:

| Column Name | Type | Description |
|--|--|--|
| CapacityId | string | The Fabric capacity identifier. |
| CustomerTenantId | string | The customer tenant identifier. |
| DurationMs | long | Not applicable. |
| ItemId | string | The identifier of the Fabric Eventhouse item |
| ItemKind | string | The type of the Fabric item. Valid values: Eventhouse. |
| ItemName | string | The name of the Fabric Eventhouse item. |
| Level | string | Not applicable. |
| MetricCount | long | The metric count value. |
| MetricMaxValue | long | The metric maximum value. |
| MetricMinValue | long | The metric minimum value. |
| MetricName | string | The metric name. |
| MetricSpecificDimensions | dynamic | The specific dimensions of each metric, as described in [Metric Specific Dimension Column](#metric-specific-dimension-column). Where relevant, dimension descriptions are provided as part of the metric description. |
| MetricSumValue | long | The metric sum value. |
| OperationName | string | The name of the operation performed. |
| Region | string | The region where the Fabric KQL database is located. |
| Timestamp | datetime | The time (UTC) the event was generated. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceMonitoringTableName | string | The name of the workspace monitoring table. Valid values:  EventhouseQueryLogs |
| WorkspaceName | string | The name of the workspace. |

### Metric Specific Dimension Column

The following table contains a list of all the reported Eventhouse metrics, and the specific dimensions reported for each metric.

| Metric Type | MetricName | Unit | Aggregation | Description | Metric Specific Dimensions |
|--|--|--|--|--|--|
| Ingestion | BatchBlobCount | Count | Avg, Max, Min | The number of data sources ingested in a completed batch. | Database, Table |
| Ingestion | BatchDurationSec | Seconds | Avg, Max, Min | The duration of the batching phase within the ingestion flow. | Database, Table |
| Ingestion | BatchSizeBytes | Bytes | Avg, Max, Min | The expected uncompressed data size in an aggregated ingestion batch. | Database, Table |
| Ingestion | BatchesProcessed | Count | Sum, Max, Min | The number of completed ingestion batches. | Database, Table, Batching Type |
| Ingestion | BlobsDropped | Count | Sum, Max, Min | The number of blobs permanently dropped by a component, with each failure reason recorded in the `IngestionResult` metric. | Database, Table, ComponentType, ComponentName |
| Ingestion | BlobsProcessed | Count | Sum, Max, Min | The number of blobs processed by a component. | Database, Table, ComponentType, ComponentName |
| Ingestion | BlobsReceived | Count | Sum, Max, Min | The number of blobs received from an input stream by a component. | Database, ComponentType, ComponentName |
| Export | ContinuousExportRecordsCount | Count | Sum | The number of exported records in all continuous export jobs. | Database, ContinuousExportName |
| Export | ContinuousExportMaxLateness | Count | Max | The lateness (minutes) reported by the continuous export jobs in the KQL Database. |  |
| Export | ContinousExportPendingCount | Count | Max | The number of pending continuous export jobs that are ready to run but are waiting in a queue, possibly due to insufficient capacity. |  |
| Export | ContinuousExportResult | The Failure/Success result of each continuous export run. | ContinuousExportName | The result of each continuous export run, indicating either failure or success. | ContinuousExportName |
| Ingestion | DiscoveryLatencyInSeconds | Seconds | Avg | The time from when data is enqueued until it's discovered by data connections. This time isn't included in the *Stage latency* or *Ingestion latency* metrics. Discovery latency might increase in the following situations:<li>When cross-region data connections are used.</li><li>In Event Hubs data connections, if the number of Event Hubs partitions is insufficient for the data egress volume.</li> | ComponentType, ComponentName |
| Ingestion | EventsDropped | Count | Sum, Max, Min | The number of events dropped by data connections. | ComponentType, ComponentName |
| Ingestion | EventsProcessed | Count | Sum, Max, Min | The number of events processed by data connections. | ComponentType, ComponentName |
| Ingestion | EventsReceived | Count | Sum, Max, Min | The number of events received by data connections from an input stream. | ComponentType, ComponentName |
| Ingestion | IngestionLatencyInSeconds | Seconds | Avg, Max, Min | The time taken from when data is received in the cluster until it's ready for query. The time depends on the ingestion type, such as Streaming Ingestion or Queued Ingestion. | IngestionKind |
| Ingestion | IngestionResult | Count | Sum | The total number of sources that were either successfully ingested or failed to be ingested. For more information, see [Dimension descriptions](#dimension-descriptions) | Database, Table, IngestionResultDetails, FailureKind, ViaUpdatePolicy |
| Ingestion | IngestionVolumeInBytes | Count | Max, Sum | The total size of data ingested to the KQL database (Bytes) before compression. | Database, Table |
| Materialized View | MaterializedViewAgeSeconds | Seconds | Avg | The age of the view (minutes) is defined by the current time minus the last ingestion time processed by the view. A lower value indicates a healthier view. | Database, MaterializedViewName |
| Materialized View | MaterializedViewHealth | 1, 0 | Avg | A value of 1 indicates the view is considered healthy; otherwise, the value is 0. | Database, MaterializedViewName |
| Materialized View | MaterializedViewResult | 1 | Avg | The metric value is always 1. `Result` indicates the result of the last materialization cycle. For possible values, see `MaterializedViewResult`. | Database, MaterializedViewName, Result |
| Ingestion | QueueLength | Count | Avg | The number of pending messages in a component's input queue. The batching component processes one message per blob, while the ingestion component handles one message per batch. A batch consists of a single ingest command that includes one or more blobs. | ComponentType |
| Ingestion | QueueOldestMessage | Seconds | Avg | The time (seconds) from when the oldest message in a component's input queue was inserted. | ComponentType |
| Ingestion | ReceivedDataSizeBytes | Bytes | Avg, Sum | The size of the data received by data connections from an input stream. | ComponentType, ComponentName |
| StreamingIngestion | StreamingIngestDataRate | Bytes | Count, Avg, Max, Min, Sum | The total volume of data ingested by streaming ingestion. | Database, Table |
| StreamingIngestion | StreamingIngestDuration | Milliseconds | Avg, Max, Min | The total duration of all streaming ingestion requests. | None |

#### Dimension descriptions

The following list describes the dimensions reported in the `IngestionResult` metric:

* `IngestionResultDetails`: Success for successful ingestion or the failure category for failures. For a complete list of possible failure categories, see [Ingestion error codes](/azure/data-explorer/error-codes).
* `FailureKind`: Whether the failure is permanent or transient. The value is `None` for a successful ingestion.
* `ViaUpdatePolicy`: True, if the ingestion was triggered by an [Update Policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true).

> [!NOTE]
>
> * Event Hubs and IoT Hub ingestion events are pre-aggregated into one blob and then treated as a single ingestion source. They appear as a single ingestion result after pre-aggregation.
> * Transient failures are automatically retried a limited number of times. Each transient failure is reported as a transient ingestion result, which means a single ingestion may generate multiple ingestion results.

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Related content

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)

* [Eventhouse monitoring](monitor-eventhouse.md)
