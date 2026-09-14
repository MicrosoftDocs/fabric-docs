---
title: Eventhouse capacity throttling logs
description: Monitor and analyze Eventhouse capacity throttling events using workspace monitoring logs in Microsoft Fabric Real-Time Intelligence.
ms.topic: reference
ms.date: 08/26/2026
ms.reviewer: guregini
ai-usage: ai-assisted
---

# Eventhouse capacity throttling logs

The Eventhouse capacity throttling logs table contains records of when an Eventhouse enters or exits a capacity throttling state. For each event, the **EventhouseCapacityThrottlingState** table in your [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) Eventhouse stores a log record.

Use the capacity throttling logs to:

* Know when your Eventhouse enters or exits a throttling state.
* Identify which throttling states affect your Eventhouse and for how long.
* Set up alerts to take proactive steps before performance issues escalate.

## Throttling states

The following table describes the throttling states that the **EventhouseCapacityThrottlingState** table tracks, and their impact on Eventhouse operations.

| Throttling state | Capacity usage | Impact |
|--|--|--|
| Overage Protection | Up to 10 minutes | No impact on the user. Jobs can consume up to 10 minutes of future capacity without throttling. |
| Interactive Delay | 10 minutes to 1 hour | Response times might be slower. Autoscale is currently disabled to reduce CU consumption. |
| Interactive Rejection | 1 hour to 24 hours | Queries are throttled. The Eventhouse might be scaled in to reduce CU consumption. |
| Background Rejection | More than 24 hours | All operations are throttled. The Eventhouse is scaled to minimum size to reduce CU consumption. |
| Exited Throttling | — | The Eventhouse exited the throttling state and should now operate normally. |

## Recommendations to reduce throttling and optimize performance

If your Eventhouse enters throttling states, consider the following actions:

* **Review caching policy** – The more data you store in the hot cache, the more CUs you consume. Store in the cache only data that you query regularly.

* **Monitor ingestion load** – High ingestion volume can increase CU consumption. Review your ingestion strategies and check for unexpected increases.

* **Review queries and commands** – Queries and commands determine CPU resource usage. Review which users and applications drive most of the activity and check for changes.

* **Review memory consumption** – Background processes such as extent merges, along with commands and queries, consume memory. Changes in query patterns might result in increased memory usage.

* **Review Query Acceleration policies** – If you defined Query Acceleration policies or Eventhouse endpoints, they might contribute to higher CU usage. Review whether they're still needed.

* **Review Minimum Consumption settings** – If you configured a Minimum Consumption value, you pay for that full amount even if the workload doesn't require it. Make sure the value aligns with your capacity SKU and actual workload.

* **Increase capacity or reduce load** – Consider increasing your capacity SKU, reducing the load on the capacity, or pausing and restarting the capacity to exit a throttling state. Contact your capacity administrator for assistance.

For additional information, see:

* [How to stop throttling when it occurs](../enterprise/throttling.md#how-to-stop-throttling-when-it-occurs)
* [Manage high compute usage](../enterprise/optimize-capacity.md#manage-high-compute-usage)
* [Optimize capacity for Real-Time Intelligence](../enterprise/optimize-capacity.md#real-time-intelligence)

## EventhouseCapacityThrottlingState table

The following table describes the columns stored in the **EventhouseCapacityThrottlingState** table:

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
| WorkspaceMonitoringTableName | string | The name of the table where the records belong. Valid values: `EventhouseCapacityThrottlingState`. |
| ThrottlingState | string | The current throttling state. One of: `Overage Protection`, `Interactive Delay`, `Interactive Rejection`, `Background Rejection`, or `Exited Throttling`. |

## Templates

You can explore and visualize the logs using Real-Time dashboards built-in templates by following the [Visualize workspace monitoring](../fundamentals/sample-gallery-workspace-monitoring.md?tabs=built-in-templates.md) guide.

## Related content

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
* [What is workspace monitoring?](../fundamentals/workspace-monitoring-overview.md)
* [Eventhouse monitoring](monitor-eventhouse.md)
* [Fabric capacity throttling](../enterprise/throttling.md)