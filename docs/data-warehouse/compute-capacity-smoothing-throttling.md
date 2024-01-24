---
title: Smoothing and throttling in Fabric Data Warehousing
description: Learn about smoothing and throttling principles applicable for data warehousing in Microsoft Fabric.
author: sowmi93
ms.author: sosivara
ms.reviewer: wiassaf
ms.date: 11/21/2023
ms.topic: conceptual
ms.custom:
  - ignite-2023
---

# Smoothing and throttling in Fabric Data Warehousing

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article details the concepts of smoothing and throttling in workloads using [!INCLUDE [fabricdw](includes/fabric-dw.md)] and [!INCLUDE [fabricse](includes/fabric-se.md)] in Microsoft Fabric.

This article is specific to data warehousing workloads in Microsoft Fabric. For all Fabric workloads, visit [Throttling in Microsoft Fabric](../enterprise/throttling.md).

## Compute capacity

Capacity forms the foundation in Microsoft Fabric and provides the computing power that drives all Fabric workload experiences. Based on the Capacity SKU purchased, you're entitled to a set of Capacity Units (CUs) that are shared across Fabric. You can review the CUs for each SKU at [Capacity and SKUs](../enterprise/licenses.md#capacity-license).

## Smoothing

Capacities have periods where they're under-utilized (idle) and over-utilized (peak). When a capacity is running multiple jobs, a sudden spike in compute demand might be generated that exceeds the limits of a purchased capacity. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] provide [burstable capacity](burstable-capacity.md) that allows workloads to use more resources to achieve better performance.

Smoothing offers relief for customers who create sudden spikes during their peak times while they have a lot of idle capacity that is unused. Smoothing simplifies capacity management by spreading the evaluation of compute to ensure that customer jobs run smoothly and efficiently.

Smoothing won't affect execution time. It helps streamline capacity management by allowing customers to size your capacity based on average, rather than peak usage.

- **For interactive jobs run by users:** capacity consumption is typically smoothed over a minimum of 5 minutes, or longer, to reduce short-term temporal spikes.

- **For scheduled, or background jobs:** capacity consumption is spread over 24 hours, eliminating the concern for job scheduling or contention.

For more information, visit [Throttling in Microsoft Fabric](../enterprise/throttling.md).

## Operation classification for Fabric data warehousing

In general, similar to Power BI, [operations are classified either as ](/power-bi/enterprise/service-premium-interactive-background-operations#operation-list)*[interactive](/power-bi/enterprise/service-premium-interactive-background-operations#operation-list)* or *[background](/power-bi/enterprise/service-premium-interactive-background-operations#operation-list)*.

Most [operations](usage-reporting.md#warehouse-operation-categories) in the **Warehouse** category are reported as *background* to take advantage of 24-hour smoothing of activity to allow for the most flexible usage patterns. With 24-hour smoothing, operations can run simultaneously without causing any spikes at any time during the day. Customers get the benefit of a consistently fast performance without having to worry about tiny spikes in their workload. Thus, classifying data warehousing as *background* reduces the frequency of peaks of CU utilization from triggering throttling too quickly.

## Throttling

Throttling occurs when a customer's capacity consumes more CPU resources than what was purchased. After consumption is smoothed, capacity throttling policies will be checked based on the amount of future capacity consumed. This results in a degraded end-user experience. When a capacity enters a throttled state, it only affects operations that are requested after the capacity has begun throttling. 

Throttling policies are applied at a capacity level. If one capacity, or set of workspaces, is experiencing reduced performance due to being overloaded, other capacities can continue running normally.

The four capacity throttling policies for Microsoft Fabric:

|Future Smoothed Consumption - Policy Limits|Throttling Policy  |Experience Impact|
| -------- | -------- | -------- |
|**Usage <= 10 minutes**|Overage protection|Jobs can consume 10 minutes of future capacity use without throttling.|
|**10 minutes < Usage <=60 minutes**|Interactive Delay|User-requested interactive jobs are delayed 20 seconds at submission. |
|**60 minutes < Usage <= 24 hours**|Interactive Rejection|User requested interactive type jobs are rejected.|
|**Usage > 24 hours**|Background Rejection|All new jobs are rejected from execution. |

Most [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] operations follow "Background Rejection" policy, and as a result experience operation rejection after over-utilization averaged over a 24-hour period.

### Throttling considerations

- Any inflight operations including long-running queries, stored procedures, batches won't get throttled mid-way. Throttling policies are applicable to the next operation after consumption is smoothed.
- Warehouse operations are _background_ except for scenarios that involves Modeling operations (such as creating a measure, adding or removing tables from a default semantic model, visualize results, etc.) or creating/updating Power BI semantic models (including a default semantic model) or reports. These operations continue to follow "Interactive Rejection" policy.
- Just like most **Warehouse** operations, dynamic management views (DMVs) are also classified as *background* and covered by the "Background Rejection" policy. As a result, DMVs cannot be queried when capacity is throttled. Even though DMVs are not available, capacity admins can go to [Microsoft Fabric Capacity Metrics app](/fabric/enterprise/metrics-app) to understand the root cause.
- When the "Background Rejection" policy is enabled, any activity on [the SQL Query Editor](sql-query-editor.md), [visual query editor](visual-query-editor.md), or modeling view, might see the error message: `Unable to complete the action because your organization's Fabric compute capacity has exceeded its limits. Try again later`.
- When the "Background Rejection" policy is enabled, if you attempt to connect to a warehouse or run a new TSQL query in client applications like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [Azure Data Studio](/sql/azure-data-studio/download-azure-data-studio) via SQL connection string, you might see SQL error code 24801 and the error text `Unable to complete the action because your organization's Fabric compute capacity has exceeded its limits. Try again later`.

## Best practices to recover from overload situations

A capacity administrator can recover from a throttling situation by:

- Upgrade the capacity to a higher SKU to raise capacity limit.
- [Identify contributors to peak activity](how-to-observe-utilization.md) and work with high-load project owners to optimize requests by T-SQL query optimization processes or redistributing tasks across other capacities.
- Wait until the overload state is over before issuing new requests.
- Capacity admins can configure proactive [alerts](/power-bi/admin/service-admin-premium-capacity-notifications) and be notified before a capacity gets throttled.

## Monitor overload information with Fabric Capacity Metrics App

Capacity administrators can view overload information and drilldown further via [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).

:::image type="content" source="media/compute-capacity-smoothing-throttling/metrics-app-throttling.gif" alt-text="An animated image showing the capabilities of the Fabric Capacity Metrics app.":::

For a walkthrough of the app, visit [How to: Observe Synapse Data Warehouse utilization trends](how-to-observe-utilization.md).

### Utilization tab

This tab shows utilization of resources compared to capacity purchased. 100% of utilization represents the full throughput of a capacity SKU and is shared by all Fabric experiences. This is represented by the yellow dotted line. Selecting a specific timepoint in the graph enables the **Explore** button, which opens a detailed drill through page.

### Throttling tab

To monitor and analyze throttling policies, a throttling tab is added to the usage graph. With this, capacity admins can easily observe future usage as a percentage of each limit, and even drill down to specific workloads that contributed to an overage. For more information, refer to [Throttling in the Metrics App](../enterprise/metrics-app-compute-page.md#throttling).

In the **Background rejection** section, utilization exceeding the 100% line is subject to throttling in the "Background Rejection" policy.

### Overages Tab

The **Overages** tab provides a visual history of any overutilization of capacity, including carry forward, cumulative, and burndown of utilization. For more information, refer to [Throttling in Microsoft Fabric](../enterprise/throttling.md) and [Overages in the Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md#overages).

## Related content

- [Billing and utilization reporting in Synapse Data Warehouse](usage-reporting.md)
- [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
- [Synapse Data Warehouse in Microsoft Fabric performance guidelines](guidelines-warehouse-performance.md)
- [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing.md)
- [Throttling in Microsoft Fabric](../enterprise/throttling.md)
- [Smoothing and throttling in Fabric Data Warehousing](compute-capacity-smoothing-throttling.md)
- [Burstable capacity in Fabric data warehousing](burstable-capacity.md)
- [Pause and resume in Fabric data warehousing](pause-resume.md)

## Next step

> [!div class="nextstepaction"]
> [How to: Observe Synapse Data Warehouse utilization trends](how-to-observe-utilization.md)
