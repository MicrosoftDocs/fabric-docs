---
title: Eventhouse logs
description: Understand the eventhouse logs so that you can use them with your Fabric workspace monitoring feature.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 09/02/2024

#customer intent: As a workspace admin I want to enable the workspace monitoring feature in my workspace
---

# Eventhouse logs

Eventhouse logs are registered in the Eventhouse KQL database, which is part of the Real-Time Intelligence solution. You can use these logs to monitor the usage and performance of your workspace.

This article includes information about all the Eventhouse logs, according to the log type.

# [Command](#tab/command)

Use the command logs to:

* Analyze command performance and trends.
* Identify commands that consume a large amount of system resources.
* Identify the users and applications that run the highest number of commands.

## Command logs

This table lists the command logs.

| Column Name | Type | Description |
|--|--|--|
| ArtifactId | string | The identifier of the Fabric Eventhouse item. |
| ArtifactKind | string | The type of Fabric item. Valid values: `Eventhouse`. |
| ArtifactName | string | The name of the Fabric Eventhouse item. |
| CacheColdHitsBytes | long | The amount of cold storage data that was available for the   command in cold cache due to   data prefetching. |
| CacheColdMissesBytes | long | The amount of cold storage data that was not available for   the command in cold   cache. |
| CacheHotHitsBytes | long | The amount of data that was available for the command in the hot cache.  The amount of data stored in hot   cache is defined by the database or table caching policy. |
| CacheHotMissesBytes | long | The amount of data that was not available for the command   in hot cache. |
| CommandText | string | The text of the command. |
| ComponentFault | string | In the event of a command error, the component where the   fault occurred. |
|  |  | Valid values:  Server or Client |
| CorrelationId | string | The correlation identifier of the command. |
| CpuTimeMs | long | Total CPU in millisecond (ms) used by the command. |
| CustomerTenantId | string | The customer tenant identifier. |
| DatabaseId | string | The database unique identifier. |
| DatabaseName | string | The name of the database. |
| DurationMs | long | The duration of the command (ms). |
| EventhouseCommandType | string | The type of command that was run. |
| ExtentsMaxScannedTime | datetime | The maximum data scan time. |
| ExtentsMinScannedTime | datetime | The minimum data scan time. |
| FailureReason | string | The reason the command failed. |
| Identity | dynamic | The identity of the user or application that ran the   command. |
| MemoryPeakBytes | long | The peak memory consumption of the command. |
| OperationEndTime | datetime | The time (UTC) the operation ended. |
| OperationId | string | The unique command log identifier. |
| OperationStartTime | datetime | The time (UTC) the operation started. |
| PlatformMonitoringTableName | string | The name of the platform monitoring table. Valid values:  `EventhouseCommandyLogs`. |
| PremiumCapacityId | string | The Fabric capacity identifier. |
| PremiumCapacityName | string | The Fabric capacity name. |
| Region | string | The region where the Fabric KQL   Database is located. |
| ScannedExtentsCount | long | The number of extents scanned by the command. A high   number might indicate the cause of a command latency issue. |
| ScannedRowsCount | long | The number of rows scanned by the command. A high number   might indicate the cause of a command latency issue. |
| SourceApplication | string | The name of the source application that ran the command. |
| Status | string | The completion status of the command. |
| Timestamp | datetime | The time (UTC) the event was generated. |
| TotalExtentsCount | long | The total number of extents in the result set. |
| TotalRowsCount | long | The total number of rows in the result set. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceName | string | The name of the workspace. |

## Command log sample queries

```kusto
//Failed command count per command type in past 1 day  
let Duration =timespan(1d);  
EventhouseCommandLogs 
|where Timestamp > ago (Duration) 
| where Status == "Failed" 
|summarize FailureCount=count() by EventhouseCommandType 
 
//Failed command count per command type in past 10 minutes 
let Duration =timespan(10m);  
EventhouseCommandLogs 
|where Timestamp > ago (Duration) 
| where Status == "Failed" 
|project-reorder Timestamp, EventhouseCommandType, CommandText, Status 

//Top X Users by Command CPU Sec in the past 1d 
let Duration =timespan(1d);  
let Topcount=10;  
EventhouseCommandLogs  
| where Timestamp  > ago (Duration)  
|extend UPN=todynamic(tostring(Identity)).claims.upn , AppId=todynamic(tostring(Identity)).claims.AppId  
|extend User=tostring(iff(isempty(UPN), AppId, UPN)), PrincipalUserType=iff(isempty(UPN), "Application", "User")  
| summarize CpuTimeMs=sum(CpuTimeMs) by User 

//Top X Commands by CPU Sec in the past 1d 
let Duration =timespan(1d);  
let Topcount=10;  
EventhouseCommandLogs  
| where Timestamp  > ago (Duration)  
| summarize CpuTimeMs=sum(CpuTimeMs) by EventhouseCommandType 
```

# [Data operations](#tab/data-operations)

Use the data operations logs to:

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
| CorrelationId | string | The correlation identifier of the data   operation. |
| CpuTimeMs | long | The total CPU time (ms) used by the data   operation. |
| CustomerTenantId | string | The customer tenant identifier. |
| DataOperationKind | string | The type of data operation activity. |
| DatabaseId | string | The database unique identifier. |
| DatabaseName | string | The name of the database. |
| DurationMs | long | The duration of the data operation (ms). |
| EventhouseDataOperationProperties | dynamic | (optional) Additional properties for specific data   operation types. |
| ExtentSizeInBytes | long | The total size of extents ingested on this   operation. |
| OperationId | string | The unique data operation log identifier. |
| OriginalSizeInBytes | long | The original size of data ingested. |
| PremiumCapacityId | string | The Fabric capacity identifier. |
| PremiumCapacityName | string | The Fabric capacity name. |
| Region | string | The region where the Fabric KQL   Database is located. |
| TableName | string | The name of the destination table used by the data   operation. |
| Timestamp | datetime | The time (UTC) the event was generated. |
| TotalExtentsCount | long | The total number of extents ingested by the data   operation. |
| TotalRowsCount | long | The number of rows ingested by the data operation. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceName | string | The name of the workspace. |

## Data operation sample queries

```kusto
//Eventhouse Data Operations by Size past xx days 
let Duration =timespan(1d);  
EventhouseDataOperationLogs 
| where Timestamp > ago (Duration) 
|extend OperationKindName=case (DataOperationKind =="RowStoreSeal", "Streaming Ingestion (Seal)", DataOperationKind=="BatchIngest", "Batch Ingestion", DataOperationKind=="UpdatePolicy", "Update Policy", 
DataOperationKind =="MaterializedView", "Materialized View" ,"Other") 
| summarize Size=sum(OriginalSizeInBytes) by  OperationKindName 
|extend Size = format_bytes(Size) 
|project  OperationKindName, Size 

//Eventhouse Activity CPU Minutes per data operation for past xx days 
let Duration =timespan(1d); 
EventhouseDataOperationLogs 
| where Timestamp > ago (Duration) 
|extend OperationType=case ( DataOperationKind=="BatchIngest", "Batch Ingestion", DataOperationKind=="UpdatePolicy", "Update Policy", 
DataOperationKind =="MaterializedView", "Materialized View" ,"Other") 
| summarize ActivityMinutes=sum(CpuTimeMs)/1000/60 by OperationType, bin (Timestamp,1h) 
|render linechart 

//Eventhouse data ingested by Update Policy per Table name target and source 
let Duration =timespan(30d); 
EventhouseDataOperationLogs 
| where Timestamp > ago (Duration) 
|where  DataOperationKind=="UpdatePolicy" 
|extend SourceTable=['EventhouseDataOperationProperties']['SourceTable'] 
|extend  SourceTable=tostring(todynamic(tostring(EventhouseDataOperationProperties)).SourceTable) 
| summarize Size=format_bytes( sum(OriginalSizeInBytes)) by  OperationName,DatabaseName, TableName, SourceTable 
```

# [GraphQL](#tab/graphql)

A log event for each query run by the Fabric API for GraphQL on its connected data sources, is stored in two tables: *GraphQLMetrics* and *GraphQLLog*.

Use query logs to:
* Identify when behavior changes and potential degradation in the API took place. 
* Identify unusual or heavy queries consuming large amounts of resources. 
* Identify the users/applications running the highest number of queries. 
* Analyze query performance and trends. 
* Troubleshoot slow queries. 
* Troubleshoot why a specific GraphQL query is not working.

This table lists the GraphQL logs.

| Column Name  | Type   | Description  |
|---|---|---|
| Timestamp  | datetime  | The timestamp (UTC) of when the log entry was generated when the record was created by the data source.  |
| ItemId  | string  | Unique ID of the resource logging the data.  |
| ItemKind  | string  | Type of artifact logging the operation.  |
| ItemName  | string  | The name of the Fabric artifact logging this operation.  |
| WorkspaceId  | string  | Unique identifier of the Fabric workspace that contains the artifact being operated on  |
| WorkspaceName  | string  | Name of the Fabric workspace containing the artifact.  |
| CapacityId  | string  | Unique identifier of the capacity hosting the artifact being operated on.  |
| CustomerTenantId  | string  | Customer Tenant ID, where the operation was performed.   |
| PlatformMonitoringTableName  | string  | The name of the table to records belongs to (or the certified event type of the record). Format is \<WorkloadName\> + [OperationType>]+ \<TelemetryType\>   |
| Region  | string  | The region of the resource emitting the event; for example, East US or France South.   |
| MetricName  | string  | Metric name (e.g. Memory, Commit Size)  |
| MetricTimeGrain  | string  | Time grain of the metric (ISO 8601 Duration).  |
| MetricUnitName  | string  | Unit of the metric.  |
| MetricSumValue  | long  | The aggregated sum value of a metric during a single   minute.  |
| DatasourceTypes  | dynamic  | Array of DataSource types that are used by the model.  |
| ResultCode  | string  | Error Code of the failed activities, used to extend usage   to reliability.  |
| Status  | string  | Status of the operation. Query executed successfully/successfully with errors/failed.  |

## GraphQL log attributes

This table describes the GraphQLLogs attributes. For more information on the events and a drill-down into the `ExecutionMetrics` event, see [Events and schema](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure#events-and-schema).

| Column Name  | Type   | Description  |
|---|---|---|
| Timestamp  | datetime  | The timestamp (UTC) of when the log entry was generated when the record was created by the data source.  |
| OperationName  | string  | The name of the operation.  |
| ItemId  | string  | Unique ID of the resource logging the data.  |
| ItemKind  | string  | Type of artifact logging the operation.  |
| ItemName  | string  | The name of the Fabric artifact logging this operation.  |
| WorkspaceId  | string  | Unique identifier of the Fabric workspace that contains the artifact being operated on.  |
| WorkspaceName  | string  | Name of the Fabric workspace containing the artifact.  |
| CapacityId  | string  | Unique identifier of the capacity hosting the artifact being operated on.  |
| CorrelationId  | string  | Root Activity ID.  |
| OperationId  | string  |  Unique identifier for the operation being logged.   |
| Identity  | dynamic  | User and claim details. The user associated with the operation that is being reported.  |
| CustomerTenantId  | string  | Customer Tenant ID, where the operation was performed.   |
| DurationMs  | long  | Elapsed CPU time that has passed while all required operations have been processed. Unit is in milliseconds.   |
| Status  | string  | Status of the operation. Query executed successfully/successfully with errors/failed.   |
| Level  | string  | Metadata required by platform monitoring team.  |
| Region  | string  | The region of the resource emitting the event; for example, East US or France South.   |
| PlatformMonitoringTableName  | string  | The name of the table to records belongs to (or the certified event type of the record). Format is \<WorkloadName\> + [OperationType>]+ \<TelemetryType\>   |
| QueryText  | string  | The text of the query.   |
| GraphQLOverheadDurationMs  | long  | The GraphQL overhead in ms for a dataplane request.  |
| ProcessedBytes  | long  |  Processed data volume in byte.  |
| TransportProtocol  | string  | Transport protocol for a request.  |
| QueryResultMessage  | string  | This dimension is used to give additional context to the result of a query operation.  |

## GraphQL log sample queries

```kusto
// QUERY FOR GRAPHQL API HEALTH INDEX: 
// API Requests/Sec 
let _endTime = datetime(2024-10-21T02:49:54Z); 
let _graphQLId = 'e99a9999-9d9b-9b9f-a999-ab99ce999acf'; 
let _startTime = datetime(2024-09-21T02:49:54Z); 
let totalCount = toscalar( 
    GraphQLMetrics 
    | where ItemId == _graphQLId  
    | where Timestamp > ago(_endTime - _startTime) 
    | where MetricName == "Request Latency" 
    | summarize Count=count() by MetricName 
    | project Count 
); 
let durationInSeconds = toreal((_endTime - _startTime) / 1s); 
let result = round(toreal(totalCount) / durationInSeconds, 8); 
let resultString = tostring(result); 
// Success Rate (percentage): 
// Success Count. 
let successCount = toscalar( 
    GraphQLMetrics 
    | where ItemId == _graphQLId  
    | where Timestamp > ago(_endTime - _startTime) 
    | summarize Count = countif(Status == "Success") 
); 
// Failure Count. 
let failureCount = toscalar( 
    GraphQLMetrics 
    | where ItemId == _graphQLId  
    | where Timestamp > ago(_endTime - _startTime) 
    | summarize Count = countif(Status == "Failure") 
); 

let totalRequests = todouble(successCount) + todouble(failureCount); 
// Success Rate. 
let successPercentage = case( totalRequests == 0.0, 100.0, round((todouble(successCount) / totalRequests) * 100, 2)); 
let successString = strcat(tostring(successPercentage), '%'); 
// Health Index. 
let healthStatus = case( 
    successPercentage >= 75 and successPercentage <= 100, "Healthy", 
    successPercentage >= 50 and successPercentage < 75, "Needs attention", 
    successPercentage < 50, "Unhealthy", 
    "Unknown" 
); 
let resultTable = union 
        (print Order = 3, Title = "API Request/sec", Value = resultString), 
        (print Order = 2, Title = "Success rate", Value = successString), 
        (print Order = 1, Title = "Health", Value = healthStatus) 
| sort by Order 
| project Title, Value; 
resultTable; 

// Number of API RESUESTS during the specified time. 
let _endTime = datetime(2024-10-21T02:49:54Z); 
let _graphQLId = 'e99a9999-9d9b-9b9f-a999-ab99ce999acf'; 
let _startTime = datetime(2024-09-21T02:49:54Z); 
GraphQLMetrics 
| where Timestamp > ago(_endTime - _startTime) 
| where ItemId == _graphQLId 
| summarize Count=count() 

// Average Request Latency during the specified time. 
let _endTime = datetime(2024-10-21T02:49:54Z); 
let _graphQLId = 'e99a9999-9d9b-9b9f-a999-ab99ce999acf'; 
let _startTime = datetime(2024-09-21T02:49:54Z); 
let avgLatency = round(toscalar(GraphQLMetrics 
| where Timestamp > ago(_endTime - _startTime) 
| where ItemId == _graphQLId 
| where MetricName == "Request Latency" 
| summarize AVG_LATENCY=avg(MetricSumValue)), 2); 
print strcat(tostring(avgLatency), ' ms'); 

// GraphQL Overhead during the specified time. 
let _endTime = datetime(2024-10-21T02:49:54Z); 
let _graphQLId = 'e99a9999-9d9b-9b9f-a999-ab99ce999acf'; 
let _startTime = datetime(2024-09-21T02:49:54Z); 
let avgLatency = round(toscalar(GraphQLMetrics 
| where Timestamp > ago(_endTime - _startTime) 
| where ItemId == _graphQLId  
| where MetricName == "GraphQL Overhead Latency" 
| summarize AVG_LATENCY=avg(MetricSumValue)), 2); 
print strcat(tostring(avgLatency), ' ms'); 

// LATENCY: 
let _endTime = datetime(2024-10-21T02:49:54Z); 
let _graphQLId = 'e99a9999-9d9b-9b9f-a999-ab99ce999acf'; 
let _startTime = datetime(2024-09-21T02:49:54Z); 
// Generate a list of start times for each interval within the specified range 
let timeRange = _endTime - _startTime; 
let interval = case( 
    timeRange <= 1h, 5m,     // 5 minutes if the time range is 1 hour or less 
    timeRange <= 1d, 2h,     // 2 hours if the time range is 1 day or less 
    timeRange <= 7d, 1d,     // 1 day if the time range is 1 week or less (7 days) 
    timeRange <= 30d, 2d,    // 2 days if the time range is 1 month or less (30 days) 
    1d                       // Default to 1 day for any longer ranges 
); 
range IntervalStart from _startTime to _endTime step interval 
| extend IntervalEnd = IntervalStart + interval 
| extend IntervalStartBin = bin(IntervalStart, interval) 
| join kind=leftouter ( 
    GraphQLMetrics 
    | where Timestamp >= _startTime and Timestamp < _endTime 
    | where ItemId == _graphQLId  
    | extend MetricIntervalStartBin = bin(Timestamp, interval) 
    | summarize AvgMetricSumValue = avg(MetricSumValue) by MetricIntervalStartBin 
) on $left.IntervalStartBin == $right.MetricIntervalStartBin 
| project IntervalStartBin, Latency = coalesce(AvgMetricSumValue, real(0)) 

// Number of Requests for bar chart, showing total requests versus errors: 
let _endTime = datetime(2024-10-21T02:49:54Z); 
let _graphQLId = 'e99a9999-9d9b-9b9f-a999-ab99ce999acf'; 
let _startTime = datetime(2024-09-21T02:49:54Z); 
// Define the time span for the intervals (e.g., 1 hour) 
let timeRange = _endTime - _startTime; 
let interval = case( 
    timeRange <= 1h, 5m,    // 5 minutes if the time range is 1 hour or less 
    timeRange <= 1d, 2h,    // 2 hours if the time range is 1 day or less 
    timeRange <= 7d, 1d,    // 1 day if the time range is 1 week or less (7 days) 
    timeRange <= 30d, 2d,   // 2 days if the time range is 1 month or less (30 days) 
    1d                      // Default to 1 day for any longer ranges 
); 

// Generate a list of start times for each interval within the specified range 
range IntervalStart from _startTime to _endTime step interval 
| extend IntervalEnd = IntervalStart + interval 
| extend IntervalStartBin = bin(IntervalStart, interval) 
| join kind=leftouter ( 
    GraphQLMetrics 
    | where Timestamp >= _startTime and Timestamp <= _endTime 
    | where ItemId == _graphQLId  
    | extend MetricIntervalStartBin = bin(Timestamp, interval) 
    | summarize FailureCount = countif(Status == "Failure"), SuccessCount = countif(Status == "Success") by MetricIntervalStartBin 
) on $left.IntervalStartBin == $right.MetricIntervalStartBin 
| project IntervalStartBin, Errors = coalesce(FailureCount, 0), Successes = coalesce(SuccessCount, 0) 
```

# [Ingestion results](#tab/ingestion-results)

Provide information about successful and failed ingestion operations, and are supported for queued ingestions. Use to:

* Monitor the number of successful ingestions.
* Monitor the number of failed ingestions.
* Troubleshoot the cause o failed ingestions.

This table lists the Ingestion result logs.

| Column Name  | Type   | Description  |
|---|---|---|
| ArtifactId  | string  | The identifier of the Fabric Eventhouse item.  |
| ArtifactKind  | string  | The type of Fabric item.   Valid values: Eventhouse.  |
| ArtifactName  | string  | The name of the Fabric Eventhouse item.  |
| CorrelationId  | string  | The correlation identifier of the ingestion operation.   |
| CustomerTenantId  | string  | The customer tenant identifier.  |
| DatabaseId  | string  | The database unique identifier.  |
| DatabaseName  | string  | The name of the database.  |
| IngestionErrorDetails  | string  | The ingestion error details.  |
| IngestionFailureStatus  | string  | The status failure.    Permanent or RetryAttemptsExceeded indicates that the operation exceeded the maximum retries or maximum time limit following a recurring transient error.  |
| IngestionOperationId  | string  | The identifier for the ingest operation.  |
| IngestionResultDetails  | dynamic  | A detailed description of the failure and error message.  |
| IngestionSourceId  | string  | The identifier for the ingested source.  |
| IngestionSourcePath  | string  | The path of the ingestion data sources or the Azure blob storage URI.  |
| IsIngestionOriginatesFromUpdatePolicy  | boolean  | Indicates whether the failure originated from an update policy.  |
| OperationEndTime  | datetime  | The time (UTC) the operation ended.  |
| OperationId  | string  | The unique ingestion results log identifier.  |
| OperationStartTime  | datetime  | The time (UTC) the operation started.  |
| PlatformMonitoringTableName  | string  | The name of the platform monitoring table. Valid values:  EventhouseIngestionResults  |
| PremiumCapacityId  | string  | The Fabric capacity identifier.  |
| PremiumCapacityName  | string  | The Fabric capacity name.  |
| Region  | string  | The region where the Fabric KQL Database is located.  |
| Status  | string  | The completion status of the ingestion.  |
| TableName  | string  | The name of the destination table used by the ingestion.  |
| Timestamp  | datetime  | The time (UTC) the event was generated..  |
| WorkspaceId  | string  | The identifier of the workspace.  |
| WorkspaceName  | string   | The name of the workspace.  |

## Ingestion results sample queries

```kusto
//Ingestions by Ingestion Result status  
let Duration =timespan(30); 
EventhouseIngestionResultsLogs 
| where Timestamp  > ago (Duration) 
| summarize count() by Status 
```

# [Metric](#tab/metric)

A list of metrics that allow you to monitor the following aspects of an Eventhouse: 

* Ingestions
* Materialized Views
* Continuous Exports

You can use the Metric logs to:

* Analyze ingestion performance and trends
* Monitor batch vs streaming ingestions
* Troubleshoot ingestion failures
* Deep dive into ingestion flows
* Materialized views monitoring and health
* Continuous exports monitoring

This table lists the metric logs.

| Column Name  | Type   | Description  |
|---|---|---|
| ArtifactId  | string  | The identifier of the Fabric Eventhouse item  |
| ArtifactKind  | string  | The type of the Fabric item.   Valid values: Eventhouse.  |
| ArtifactName  | string  | The name of the Fabric Eventhouse item.  |
| CustomerTenantId  | string  | The customer tenant identifier.  |
| MetricCount  | long  | The metric count value.  |
| MetricMaxValue  | long  | The metric maximum value.  |
| MetricMinValue  | long  | The metric minimum value.  |
| MetricName  | string  | The metric name.  |
| MetricSpecificDimensions  | dynamic  | The specific dimensions of each metric, as described in the Metric Specific Column of the Metrics table. Where relevant, dimension descriptions are provided as part of the metric description.  |
| MetricSumValue  | long  | The metric sum value.  |
| PlatformMonitoringTableName  | string  | The name of the platform monitoring table. Valid values:  EventhouseQueryLogs  |
| PremiumCapacityId  | string  | The Fabric capacity identifier.  |
| Region  | string  | The region where the Fabric KQL Database is located.  |
| Timestamp  | datetime  | The time (UTC) the event was generated.  |
| WorkspaceId  | string  | The identifier of the workspace.  |
| WorkspaceName  | string  | The name of the workspace.  |

## Metrics table

This table contains a list of all the Eventhouse metrics being reported, and the specific dimensions being reported for each metric.

| Metric Type | MetricName | Unit | Aggregation | Description | Metric Specific Dimensions |
|--|--|--|--|--|--|
| Ingestion | BatchBlobCount | Count | Avg, Max, Min | The number of data sources ingested in a completed batch. | Database, Table |
| Ingestion | BatchDurationSec | Seconds | Avg, Max, Min | The duration of the batching phase within the ingestion flow. | Database, Table |
| Ingestion | BatchSizeBytes | Bytes | Avg, Max, Min | The expected uncompressed data size in an aggregated ingestion batch. | Database, Table |
| Ingestion | BatchesProcessed | Count | Sum, Max, Min | The number of completed ingestion batches. | Database, Table,Batching Type |
| Ingestion | BlobsDropped | Count | Sum, Max, Min | The number of blobs permanently dropped by a component, with each failure reason recorded in the `IngestionResult` metric. | Database, Table, ComponentType, ComponentName |
| Ingestion | BlobsProcessed | Count | Sum, Max, Min | The number of blobs processed by a component. | Database, Table, ComponentType, ComponentName |
| Ingestion | BlobsReceived | Count | Sum, Max, Min | The number of blobs received from an input stream by a component. | Database, ComponentType, ComponentName |
| Export | ContinuousExportRecordsCount | Count | Sum | The number of exported records in all continuous export jobs. | Database, ContinuousExportName |
| Export | ContinuousExportMaxLateness | Count | Max | The lateness (minutes) reported by the continuous export jobs in the KQL Database. |  |
| Export | ContinousExportPendingCount | Count | Max | The number of pending continuous export jobs that are ready to run but are waiting in a queue, possibly due to insufficient capacity. |  |
| Export | ContinuousExportResult | The Failure/Success result of each continuous export run. | ContinuousExportName | The result of each continuous export run, indicating either failure or success. | ContinuousExportName |
| Ingestion | DiscoveryLatencyInSeconds | Seconds | Avg | The time from when data is enqueued until it is discovered by data connections. This time isn't included in the *Stage latency* or *Ingestion latency* metrics. Discovery latency may increase in the following situations:<li>When cross-region data connections are used.</li><li>In Event Hubs data connections, if the number of Event Hubs partitions is insufficient for the data egress volume.</li> | ComponentType, ComponentName |
| Ingestion | EventsDropped | Count | Sum, Max, Min | The number of events dropped by data connections. | ComponentType, ComponentName |
| Ingestion | EventsProcessed | Count | Sum, Max, Min | The number of events processed by data connections. | ComponentType, ComponentName |
| Ingestion | EventsReceived | Count | Sum, Max, Min | The number of events received by data connections from an input stream. | ComponentType, ComponentName |
| Ingestion | IngestionLatencyInSeconds | Seconds | Avg, Max, Min | The time taken from when data is received in the cluster until it is ready for query. The time depends on the ingestion type, such as Streaming Ingestion or Queued Ingestion. | IngestionKind |
| Ingestion | IngestionResult | Count | Sum | The total number of sources that were either successfully ingested or failed to be ingested.<sup>1</sup> | Database, Table, IngestionResultDetails, FailureKind, ViaUpdatePolicy |
| Ingestion | IngestionVolumeInBytes | Count | Max, Sum | The total size of data ingested to the KQL Database (Bytes) before compression. | Database, Table |
| Materialized View | MaterializedViewAgeSeconds | Seconds | Avg | The age of the view (minutes) is defined by the current time minus the last ingestion time processed by the view. A lower value indicates a healthier view. | Database, MaterializedViewName |
| Materialized View | MaterializedViewHealth | 1, 0 | Avg | A value of 1 indicates the view is considered healthy; otherwise, the value is 0. | Database, MaterializedViewName |
| Materialized View | MaterializedViewResult | 1 | Avg | The metric value is always 1. `Result` indicates the result of the last materialization cycle. For possible values, see `MaterializedViewResult`. | Database, MaterializedViewName, Result |
| Ingestion | QueueLength | Count | Avg | The number of pending messages in a component's input queue. The batching component processes one message per blob, while the ingestion component handles one message per batch. A batch consists of a single ingest command that includes one or more blobs. | ComponentType |
| Ingestion | QueueOldestMessage | Seconds | Avg | The time (seconds) from when the oldest message in a component's input queue was inserted. | ComponentType |
| Ingestion | ReceivedDataSizeBytes | Bytes | Avg, Sum | The size of the data received by data connections from an input stream. | ComponentType, ComponentName |
| StreamingIngestion | StreamingIngestDataRate | Bytes | Count, Avg, Max, Min, Sum | The total volume of data ingested by streaming ingestion. | Database, Table |
| StreamingIngestion | StreamingIngestDuration | Milliseconds | Avg, Max, Min | The total duration of all streaming ingestion requests. | None |

<sup>1</sup>Dimension descriptions 
- IngestionResultDetails: Success for successful ingestion or the failure category for failures. For a complete list of possible failure categories see Ingestion error codes. 
- FailureKind: Whether the failure is permanent or transient. The value is None for a successful ingestion. 

- ViaUpdatePolicy: True if the ingestion was triggered by an Update Policy. 
 
Considerations
- Event Hubs and IoT Hub ingestion events are pre-aggregated into one blob, and then treated as a single ingestion source and appear as a single ingestion result after pre-aggregation. 

- Transient failures are automatically retried a limited number of times. Each transient failure is reported as a transient ingestion result, which means a single ingestion may generate multiple ingestion results.

## Metric sample queries

```kusto
//Ingestion volume over time in the past 30 days 
let Duration =timespan(30);  
EventhouseMetrics 
| where Timestamp  > ago (Duration) 
| where MetricName == "IngestionVolumeInBytes" 
|summarize IngestionVolumeInGb=round(sum(MetricSumValue)/1024/1024,2) by bin(Timestamp, 1d) 
|render linechart 

//Top 5 most ingested tables 
let Duration =timespan(30d); 
EventhouseMetrics 
| where Timestamp  > ago (Duration) 
| where MetricName == "IngestionVolumeInBytes" 
|extend Table=tostring(todynamic(tostring(MetricSpecificDimensions)).Table) , Database=tostring(todynamic(tostring(MetricSpecificDimensions)).DatabaseName) 
|where Table !contains "$"  //Remove MVs 
|summarize IngestionVolumeInGb=round(sum(MetricSumValue)/1024/1024,2) by  Table 
|top 5 by IngestionVolumeInGb 
|render barchart 

//Ingestion Result count over time in the past 30 days 
let Duration =timespan(30); 
EventhouseMetrics 
| where Timestamp  > ago (Duration) 
|where MetricName =="IngestionResult" 
|extend Table=tostring(todynamic(tostring(MetricSpecificDimensions)).Table) , Database=tostring(todynamic(tostring(MetricSpecificDimensions)).DatabaseName) 
|extend Result=tostring(todynamic(tostring(MetricSpecificDimensions)).IngestionResultDetails), FailureKind=tostring(todynamic(tostring(MetricSpecificDimensions)).FailureKind) 
|summarize Results=count() by Result 
|order by Results desc 
|render barchart  

//Ingestion Result FailureKind count over time in the past 30 days 
let Duration =timespan(30); 
EventhouseMetrics 
| where Timestamp  > ago (Duration) 
|where MetricName =="IngestionResult" 
|extend  FailureKind=tostring(todynamic(tostring(MetricSpecificDimensions)).FailureKind) 
|where FailureKind !="None" 
|summarize Failures=count() by FailureKind 
```

# [Query](#tab/uery)

A log event for each query run on an Eventhouse KQL database, is stored in the *EventhouseQueryLogs* table.

Use query logs to:

* Analyze query performance and trends  
* Troubleshoot slow queries
* Identify heavy queries consuming large amount of system resources
* Identify the users/applications running the highest number of queries

This table lists the query logs.

| Column Name | Type | Description |
|--|--|--|
| ArtifactId | string | The identifier of the Fabric Eventhouse item. |
| ArtifactKind | string | The type of Fabric item. |
|  |  | Valid values: Eventhouse. |
| ArtifactName | string | The name of the Fabric Eventhouse item. |
| CacheColdHitsBytes | long | The amount of cold storage data that was available for the   query in cold cache due to data prefetching. |
| CacheColdMissesBytes | long | The amount of cold storage data that was not available for   the query in cold cache. |
| CacheHotHitsBytes | long | The amount of data that was available for the query in hot   cache. |
|  |  |  |
|  |  | Note: The amount of data stored in hot   cache is defined by the database or table caching policy. |
| CacheHotMissesBytes | long | The amount of data that was not available for the query in   hot cache. |
| ComponentFault | string | In the event of a query error, the component where the   fault occurred. |
|  |  | Valid values:  Server or Client |
|  |  | For example: If the query result set   is too large, the value is Client. If an internal error occurred, the value   is Server. |
| CorrelationId | string | The correlation identifier of the query. The value can   include components of other items participating in the query, such as the   semantic model of the report running the query. |
| CpuTimeMs | long | The total CPU time (ms) used by the query. |
| CustomerTenantId | string | The customer tenant identifier. |
| DatabaseId | string | The database unique identifier. |
| DatabaseName | string | The name of the database. |
| DurationMs | long | The duration of the query (ms). |
| ExtentsMaxScannedTime | datetime | The maximum data scan time. |
| ExtentsMinScannedTime | datetime | The minimum data scan time. |
| FailureReason | string | The reason the query failed. |
| Identity | dynamic | The identity of the user or application that ran the   query. |
| MemoryPeakBytes | long | The peak memory consumption of the query. |
| OperationEndTime | datetime | The time (UTC) the operation ended. |
| OperationId | string | The unique query log identifier. |
| OperationStartTime | datetime | The time (UTC) the operation started. |
| PlatformMonitoringTableName | string | The name of the platform monitoring table. Valid values:   EventhouseQueryLogs |
| PremiumCapacityId | string | The Fabric capacity identifier. |
| PremiumCapacityName | string | The Fabric capacity name. |
| QueryText | string | The text of the query. |
| Region | string | The region where the Fabric KQL   Database is located. |
| ResultTableCount | int | The number of tables used by the query. |
| ResultTableStatistics | string | The detailed statistics of the tables used by the   query. |
| ScannedExtentsCount | long | The number of extents scanned by the query. A high number   might indicate the cause of a query latency issue. |
| ScannedRowsCount | long | The number of rows scanned by the query. A high number   might indicate the cause of a query latency issue. |
| SourceApplication | string | The name of the source application that ran the   query. |
| Status | string | The completion status of the query. |
| Timestamp | datetime | The time (UTC) the event was generated. |
| TotalExtentsCount | long | The total number of extents in the result set. |
| TotalRowsCount | long | The total number of rows in the result set. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceName | string | The name of the workspace. |

## Query sample queries

```kusto
//List of KQL databases monitored in Workspace 
EventhouseQueryLogs 
|distinct DatabaseName 
|order by DatabaseName asc 

//Query count over time for all workspace databases in past 30 days- Linechart 
let Duration =timespan(30);  
EventhouseQueryLogs 
| where Timestamp  > ago (Duration) 
|summarize count() by bin(Timestamp, 1d) 
|render linechart 

//Succeeded vs Failed Queries over time in past 30 days Linechart 
let Duration =timespan(30);  
EventhouseQueryLogs 
| where Timestamp  > ago (Duration) 
| where Status in("Failed","Throttled") 
|summarize Count=count() by Status, bin(Timestamp, 1d)  
|render linechart 

//Query count for list of databases for past 30 days 
let Duration =timespan(30);  
let DatabaseList =  
EventhouseQueryLogs 
|distinct DatabaseName 
|summarize make_list(DatabaseName) ;  
EventhouseQueryLogs 
| where Timestamp  > ago (Duration) 
| where DatabaseName  in~ (DatabaseList) 
|summarize QueryCount=count() by DatabaseName 
|order by QueryCount desc 

//Top X Users by Query Count in all databases in past 30 days 
let Duration =timespan(30); 
let Topcount=10; 
EventhouseQueryLogs 
| where Timestamp  > ago (Duration) 
|extend UPN=todynamic(tostring(Identity)).claims.upn , AppId=todynamic(tostring(Identity)).claims.AppId 
|extend User=tostring(iff(isempty(UPN), AppId, UPN)), PrincipalUserType=iff(isempty(UPN), "Application", "User") 
|summarize QueryCount=count() by User, PrincipalUserType 
|top Topcount by QueryCount 

//Top X Users by Query Count in selected databases in past 30 days 
let Duration =timespan(30); 
let Topcount=10; 
let _DatabaseName = dynamic(['Database1', 'Database2']); //list your database names 
EventhouseQueryLogs 
| where Timestamp  > ago (Duration) 
| where isempty(['_DatabaseName']) or DatabaseName  in (['_DatabaseName']) 
|extend UPN=todynamic(tostring(Identity)).claims.upn , AppId=todynamic(tostring(Identity)).claims.AppId 
|extend User=tostring(iff(isempty(UPN), AppId, UPN)), PrincipalUserType=iff(isempty(UPN), "Application", "User") 
|summarize QueryCount=count() by User, PrincipalUserType 
|top Topcount by QueryCount 

//Top X Users by CPU Time in selected databases in past 30 days 
let Duration =timespan(30);  
let Topcount=10; 
EventhouseQueryLogs 
| where Timestamp  > ago (Duration) 
|extend UPN=todynamic(tostring(Identity)).claims.upn , AppId=todynamic(tostring(Identity)).claims.AppId 
|extend User=tostring(iff(isempty(UPN), AppId, UPN)), PrincipalUserType=iff(isempty(UPN), "Application", "User") 
| extend CpuTimeMs=totimespan(CpuTimeMs*10000) 
|summarize CPUTimeMs=sum(CpuTimeMs) by User, PrincipalUserType 
|top Topcount by CPUTimeMs 

//Show me top X queries of selected User by CPU-Sec 
let Duration =timespan(30);  
let Topcount=50; 
let _DatabaseName = dynamic(['DB1', 'DB2']); //list your database names 
EventhouseQueryLogs 
| where Timestamp  > ago (Duration) 
//| where isempty(['_DatabaseName']) or DatabaseName  in (['_DatabaseName']) 
|extend UPN=todynamic(tostring(Identity)).claims.upn , AppId=todynamic(tostring(Identity)).claims.AppId 
|extend User=tostring(iff(isempty(UPN), AppId, UPN)), PrincipalUserType=iff(isempty(UPN), "Application", "User") 
| extend CpuTimeMs=totimespan(CpuTimeMs*10000) 
|top Topcount by CpuTimeMs 
|project User, CpuTimeMs, Status, FailureReason, QueryText 

//Top X Applications by used CPU time in past 30 days- piechart 
let Duration =timespan(30);  
let Topcount=10; 
EventhouseQueryLogs 
| where Timestamp  > ago (Duration) 

//Logic to extract Application Name 
|extend Application = case (SourceApplication =="PowerBI", "PowerBI", SourceApplication =="Kusto Web Explorer","Kusto Web Explorer", SourceApplication =="Fabric RTA" and CorrelationId startswith "Kusto.Web.RTA.QuickQuery"  , "Quick Query" ,  
SourceApplication =="Fabric RTA" and CorrelationId startswith "Kusto.Web.RTA.QuerySet", "KQL QuerySet", SourceApplication=="Fabric RTA" and CorrelationId startswith "Kusto.Web.RTA.Dashboards", "RT Dashboard", SourceApplication =="Unknown" and CorrelationId startswith "KD2RunQuery", "Data Activator/SDK",  "Unknown") 
|summarize CPUTimeMs=sum(CpuTimeMs) by Application 
|top Topcount by CPUTimeMs 
|render piechart 
```

# [Semantic model](#tab/semantic-model)

Analysis Services engine process events such as the start of a batch or transaction. For example, execute query and process partition. Typically used to monitor the performance, health and usage of Power BI's data engine. Contains information from the entire tenant.

Use semantic model logs to:

* Identify periods of high or unusual Analysis Services engine activity by capacity, workspace, report, or user.
* Analyze query performance and trends, including external DirectQuery operations.
* Analyze semantic model refresh duration, overlaps, and processing steps.
* Analyze custom operations sent using the Premium XMLA endpoint.

## Semantic model logs

This table lists the semantic model logs. For more information on the events and drill-down into the `ExecutionMetrics` event, see [Events and schema](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure#events-and-schema).

| Column Name  | Type   | Description  |
|---|---|---|
| ApplicationContext  | dynamic  | Property bag of unique identifiers providing details about the application executing the request. for example, report ID.  |
| ApplicationName  | string  | Contains the name of the client application that created the connection to the server. This column is populated with the values passed by the application rather than the displayed name of the program.  |
| DatasetMode  | string  | The mode of the semantic model. Import, DirectQuery, or Composite.  |
| EventText  | string  | Contains verbose information associated with the operation, for example, DAX Query.  |
| OperationDetailName  | string  | More details about the operation  |
| ProgressCounter  | long  | Progress counter  |
| ReplicaId  | string  | Replica identifier that will let you identify the replica when Query Scale Out (QSO) is enabled. Read-write replica always has ReplicaId='AAA' and read-only replicas have ReplicaId starting 'AAB' onwards. For non-QSO enabled semantic models the ReplicaId is always 'AAA'  |
| StatusCode  | int  | Status code of the operation. It covers success and failure.  |
| User  | string  | The user associated with the running operation. Used when an end-user identity must be impersonated on the server.  |
| XmlaObjectPath  | string  | Object path. A comma-separated list of parents, starting with the object's parent.  |
| XmlaProperties  | string  | Properties of the XMLA request  |
| XmlaRequestId  | string  | Unique Identifier of request.  |
| XmlaSessionId  | string  |    |
| Timestamp  | datetime  | The timestamp (UTC) of when the log was generated.  |
| ArtifactId  | string  | Unique identifier of the resource logging the data.  |
| ArtifactKind  | string  | Type of artifact logging the operation, for example, semantic model.  |
| CorrelationId  | string  | The ID for correlated events. Can be used to identify correlated events between multiple tables.  |
| CustomerTenantId  | string  | Fabric tenant identifier  |
| Level  | string  | Contains the severity level of the operation being logged. Success, Informational, Warning, or Error.  |
| Category  | string  | Category of the events, like Audit/Security/Request.  |
| OperationId  | string  |    |
| PremiumCapacityId  | string  | Unique identifier of the capacity hosting the artifact being operated on.  |
| TableName  | string  | Contains the table name for monitoring database where the event is surfaced.  |
| WorkspaceId  | string  | Unique identifier of the workspace containing the item being operated on.  |
| OperationName  | string  | The operation associated with the log record.  |
| ArtifactName  | string  | The name of the Power BI artifact logging this operation.  |
| WorkspaceName  | string  | Name of the Fabric workspace containing the item.  |
| PremiumCapacityName  | string  | Contains the name of Fabric capacity.  |
| Identity  | dynamic  | Information about user and claims.  |
| DurationMs  | long  | Amount of time (in milliseconds) taken by the operation.  |
| Status  | string  | Status of the operation.  |
| CallerIpAddress  | string  |    |
| Region  | string  | Contains the Fabric region   |
| CpuTimeMs  | long  | Amount of CPU time (in milliseconds) used by the event.  |
| ExecutingUser  | string  | The user running the operation.  |

## Sample queries

```kusto
// log count per day for last 30d 
SemanticModelLogs 
| where Timestamp > ago(30d) 
| summarize count() by format_datetime(Timestamp, 'yyyy-MM-dd') 
  
// average query duration by day for last 30d 
SemanticModelLogs 
| where Timestamp > ago(30d) 
| where OperationName == 'QueryEnd' 
| summarize avg(DurationMs) by format_datetime(Timestamp, 'yyyy-MM-dd') 

//query duration percentiles for a single day in 1 hour bins 
SemanticModelLogs 
| where Timestamp >= ago(3d) and Timestamp <= now() 
| where OperationName == 'QueryEnd' 
| summarize percentiles(DurationMs, 0.5, 0.9) by bin(Timestamp, 1h) 
  
// refresh durations by workspace and semantic model for last 30d 
SemanticModelLogs 
| where Timestamp > ago(30d) 
| where OperationName == 'CommandEnd' 
| where User has "Power BI Service" 
| where EventText has "refresh" 
| project WorkspaceName, DatasetName = ArtifactName, DurationMs 

// query count, distinctUsers, avgCPU, avgDuration by workspace for last 30d 
SemanticModelLogs   
| where Timestamp > ago(30d) 
| where OperationName == "QueryEnd"  
| summarize QueryCount=count() 
    , Users = dcount(User) 
    //, AvgCPU = avg(CpuMs) //CPU time is not an available metric 
    , AvgDuration = avg(DurationMs) 
by WorkspaceId 
```

---

## Related content

* [What is workspace monitoring?](workspace-monitoring-overview.md)

* [Enable monitoring in your workspace](enable-workspace- monitoring.md)
