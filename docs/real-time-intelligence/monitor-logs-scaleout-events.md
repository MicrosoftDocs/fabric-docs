---
title: Eventhouse scale-out event logs
description: Monitor and analyze Eventhouse scale-out events using workspace monitoring logs in Microsoft Fabric Real-Time Intelligence.
ms.topic: reference
ms.date: 08/26/2026
ms.reviewer: guregini
ai-usage: ai-assisted
---

# Eventhouse scale-out event logs

The Eventhouse scale-out event logs table contains records of when an Eventhouse scaled out and the reasons that triggered the scale-out. For each event, the system stores a log record in the **EventhouseScaleoutEvents** table in your [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) Eventhouse.

The system aggregates and reports scale-out events every 24 hours. If scale-out events occur in the past 24 hours, a single log record includes all scale-out reasons.

Use the scale-out event logs to:

* Understand why your Eventhouse scaled out and increased CU consumption.
* Identify workload patterns that trigger repeated scale-out events.
* Take action to optimize resource usage and reduce unexpected costs.

## Recommended actions for scale-out events

The `Reason` field can contain one or more of the following values. Each reason describes why the Eventhouse increased its compute resources during the past 24 hours.

| Reason | Description | Recommended action |
|--|--|--|
|Minimum consumption |A Minimum capacity consumption value was configured for the Eventhouse. Fabric allocates at least this level of compute, even if the workload doesn't require it. You're charged for the full configured CU amount. (Part of eventhouse capacity planner) |Ensure the Minimum consumption setting aligns with your Fabric capacity SKU and your expected workload. Reduce it if your workload doesn't require this baseline compute. |
|High memory utilization |The Eventhouse memory consumption is consistently high due to query execution, ingestion processing, or background operations. |Optimize queries, reduce large intermediate datasets, and review retention and caching policies. Consider distributing workloads across tables or time ranges. |
|High CPU utilization |The Eventhouse CPU usage is consistently high due to query execution, ingestion processing, or background operations. |Optimize heavy queries, reduce unnecessary logic, and use filters and time ranges to limit the data scanned. |
|High cache utilization |The data cache is heavily used, indicating many queries are accessing cached data simultaneously. |Review query patterns and caching policies. Consider optimizing queries to reduce repeated large scans, or adjust data retention and caching strategy. |
| High ingestion load |A high volume or rate of incoming data is being ingested into the Eventhouse, requiring additional compute to process ingestion pipelines. |Review ingestion strategies and check for unexpected increases in ingestion volume or rate. |
|Performance optimization - query acceleration |Query acceleration features are heavily utilized to speed up query execution, requiring additional compute resources. |No action needed. This is due to query acceleration performance optimization. |
|Ingestion optimization - data management service | Indicates a delay between when events are generated in the data source (such as Event Hub or Event Grid) and when the Eventhouse discovers and begins processing them. Higher latency may occur during periods of heavy ingestion load. |No action needed. This is due to internal ingestion optimization. |
|High memory utilization |The Eventhouse memory usage is consistently high due to query execution, ingestion processing, or background operations. |Optimize queries, reduce large intermediate datasets, and review retention and caching policies. Consider distributing workloads across tables or time ranges. |
|Ingestion optimization - high CPU in data management service |High utilization in one or more internal data ingestion processing stages, which can create a temporary bottleneck. |Check the ingestion workload. Consider reducing ingestion volume or allow the Eventhouse to scale to handle the load. |
|Performance optimization |Indicates that the Eventhouse scaled out to meet the minimum compute resources required for stable system operation. This is an internal system requirement. |No action needed. This is due to internal performance optimization. |
|Ingestion optimization - streaming ingestion |Indicates that the Eventhouse scaled out to handle streaming ingestion workloads. This is an internal system requirement. |No action needed. This is due to internal ingestion optimization. |

## EventhouseScaleoutEvents table

The following table describes the columns stored in the **EventhouseScaleoutEvents** table:

| Column name | Type | Description |
|--|--|--|
| Timestamp | datetime | The time (UTC) the event was generated. |
| OperationName | string | Empty (not applicable) |
| ItemId | string | Unique ID of the Eventhouse logging the data. |
| ItemKind | string | Type of Fabric item. Valid values: `Eventhouse`. |
| ItemName | string | Name of the Eventhouse logging this event. |
| WorkspaceId | string | The identifier of the workspace. |
| WorkspaceName | string | The name of the workspace. |
| CapacityId | string | Unique identifier of the capacity hosting the Eventhouse. |
| CorrelationId | string | Empty (not applicable) | 
| OperationId | string | Empty (not applicable) |
| Identity | dynamic | Empty (not applicable) |
| CustomerTenantId | string | The customer tenant identifier. |
| DurationMs | Long | Empty (not applicable) |
| Status | string | Empty (not applicable) |
| Level | string | Empty (not applicable) |
| Region | string | The capacity region where the eventhouse is hosted. |
| WorkspaceMonitoringTableName | string | The name of the table where the records belong. Valid values: `EventhouseScaleoutEvents`. |
| ScaleoutReason | string | Concatenated string of all scale-out reasons that occurred in the past 24 hours. For example, `Ingestion, High CPU, Minimum Consumption`. |

## Templates

You can explore and visualize the logs using Real-Time dashboards built-in templates by following the [Visualize workspace monitoring](../fundamentals/sample-gallery-workspace-monitoring.md?tabs=built-in-templates.md) guide.

## Related content

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
* [What is workspace monitoring?](../fundamentals/workspace-monitoring-overview.md)
* [Eventhouse capacity throttling logs](monitor-logs-capacity-throttling.md)
* [Eventhouse monitoring](monitor-eventhouse.md)
* [Fabric capacity throttling](../enterprise/throttling.md)