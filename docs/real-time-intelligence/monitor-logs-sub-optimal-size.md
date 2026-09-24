---
title: Eventhouse sub-optimal size logs
description: Monitor and analyze sub-optimal Eventhouse size events after capacity throttling exits using workspace monitoring logs in Microsoft Fabric Real-Time Intelligence.
ms.topic: reference
ms.date: 08/26/2026
ms.reviewer: guregini
ai-usage: ai-assisted
---

# Eventhouse sub-optimal size logs

The Eventhouse sub-optimal size logs table contains records of when an Eventhouse runs at a reduced size after exiting a [capacity throttling state](monitor-logs-capacity-throttling.md#throttling-states). For each event, the **EventhouseSubOptimalSizeAfterThrottling** table in your [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) Eventhouse stores a log record.

A sub-optimal size occurs when an Eventhouse scales down to exit a capacity throttling state and remain available for use. While the scale-down helps keep the Eventhouse available and responsive, it means the Eventhouse is operating below its optimal size.

The Eventhouse will not scale back up without any change, as doing so could create a cycle of repeated capacity throttling and scale-downs to become available again. Instead, it remains at the reduced size until capacity is added or the load decreases.

These logs are reported every five minutes while the Eventhouse remains in this state.

> [!NOTE]
> If the Eventhouse engine is unavailable, the system doesn't report sub-optimal size events.

Use the sub-optimal size logs to:

* Know when your Eventhouse runs at a reduced size after throttling.
* Receive alerts so you can take action to restore the Eventhouse to its optimal size.
* Track how long the Eventhouse remains in a sub-optimal state.

## Recommendations to restore optimal size

When your Eventhouse is in a sub-optimal size state, take one or more of the following actions to restore it to its optimal size:

* **Add capacity** – Increasing the available capacity allows the Eventhouse to scale out automatically to its optimal size.

* **Reduce load or hot cache** – Reduce the ingestion or query load on the Eventhouse, or reduce the amount of data stored in the hot cache. The less compute required, the sooner the Eventhouse can scale back out.

* **Restart the capacity** – Pausing and restarting the capacity can help exit the throttling state and allow the Eventhouse to resize.

For more information on reducing load and caching, see [Eventhouse capacity throttling logs](monitor-logs-capacity-throttling.md#recommendations-to-reduce-throttling-and-optimize-performance).

## EventhouseSubOptimalSizeAfterThrottling table

The following table describes the columns stored in the **EventhouseSubOptimalSizeAfterThrottling** table:

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
| PlatformMonitoringTableName | string | The name of the table where the records belong. Valid values: `EventhouseSubOptimalSizeAfterThrottling`. |

## Templates

You can explore and visualize the logs using Real-Time dashboards built-in templates by following the [Visualize workspace monitoring](../fundamentals/sample-gallery-workspace-monitoring.md?tabs=built-in-templates.md) guide.

## Related content

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
* [What is workspace monitoring?](../fundamentals/workspace-monitoring-overview.md)
* [Eventhouse capacity throttling logs](monitor-logs-capacity-throttling.md)
* [Eventhouse monitoring](monitor-eventhouse.md)
* [Fabric capacity throttling](../enterprise/throttling.md)