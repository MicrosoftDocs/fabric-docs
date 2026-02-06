---
title: Smoothing and Throttling
description: Learn about smoothing and throttling principles applicable for Microsoft Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sosivara
ms.date: 07/02/2025
ms.topic: concept-article
---

# Smoothing and throttling in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article details the concepts of smoothing and throttling in workloads using [!INCLUDE [fabricdw](includes/fabric-dw.md)] and [!INCLUDE [fabricse](includes/fabric-se.md)] in Microsoft Fabric.

This article is specific to data warehousing workloads in Microsoft Fabric. For all Fabric workloads and general information, see [The Fabric throttling policy](../enterprise/throttling.md).

## Compute capacity

Capacity forms the foundation in Microsoft Fabric and provides the computing power that drives all Fabric workloads. Based on the Capacity SKU purchased, you're entitled to a set of Capacity Units (CUs) that are shared across Fabric. You can review the CUs for each SKU at [Capacity and SKUs](../enterprise/licenses.md#capacity).

## Smoothing

Capacities have periods where they're under-utilized (idle) and over-utilized (peak). When a capacity is running multiple jobs, a sudden spike in compute demand might be generated that exceeds the limits of a purchased capacity. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] provide [burstable capacity](burstable-capacity.md) that allows workloads to use more resources to achieve better performance.

Smoothing offers relief for customers who create sudden spikes during their peak times while they have a lot of idle capacity that is unused. Smoothing simplifies capacity management by spreading the evaluation of compute to ensure that customer jobs run smoothly and efficiently.

Smoothing won't affect execution time. It helps streamline capacity management by allowing customers to size your capacity based on average, rather than peak usage.

- **For interactive jobs run by users:** capacity consumption is typically smoothed over a minimum of 5 minutes, or longer, to reduce short-term temporal spikes.
- **For scheduled, or background jobs:** capacity consumption is spread over 24 hours, eliminating the concern for job scheduling or contention.

## Throttling behavior specific to the warehouse and SQL analytics endpoint

In general, similar to Power BI, [operations](../enterprise/fabric-operations.md#fabric-operations-by-experience) are classified either as *[interactive](../enterprise/fabric-operations.md#interactive-operations)* or *[background](../enterprise/fabric-operations.md#background-operations)*.

Most [operations](usage-reporting.md#warehouse-operation-categories) in the **Warehouse** category are reported as *background* to take advantage of 24-hour smoothing of activity to allow for the most flexible usage patterns. With 24-hour smoothing, operations can run simultaneously without causing any spikes at any time during the day. Customers get the benefit of a consistently fast performance without having to worry about tiny spikes in their workload. Thus, classifying data warehousing as *background* reduces the frequency of peaks of CU utilization from triggering throttling too quickly.

Most [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] operations only experience operation rejection after over-utilization averaged over a 24-hour period. For more information, see [The Fabric throttling policy](../enterprise/throttling.md).

### Throttling considerations

- Any inflight operations including long-running queries, stored procedures, batches won't get throttled mid-way. Throttling policies are applicable to the next operation after consumption is smoothed.
- Warehouse operations are *background* except for scenarios that involves Modeling operations (such as creating a measure, visualize results, etc.) or creating/updating Power BI semantic models or reports. These operations continue to follow "Interactive Rejection" policy.
- Just like most **Warehouse** operations, dynamic management views (DMVs) are also classified as *background* and covered by the "Background Rejection" policy. As a result, DMVs cannot be queried when capacity is throttled. Even though DMVs are not available, capacity admins can go to [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) to understand the root cause.
- When the ["Background Rejection" policy](../enterprise/throttling.md) is enabled, any activity on [the SQL query editor](sql-query-editor.md), [visual query editor](visual-query-editor.md), or modeling view, might see the error message: `Unable to complete the action because your organization's Fabric compute capacity has exceeded its limits. Try again later`.
- When the "Background Rejection" policy is enabled, if you attempt to connect to a warehouse via the SQL connection string in client applications like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or the [mssql extension](https://aka.ms/mssql-marketplace) for [Visual Studio Code](https://code.visualstudio.com/docs), you might see SQL error code 24801 and the error text `Unable to complete the action because your organization's Fabric compute capacity has exceeded its limits. Try again later`.

## Best practices to recover from overload situations

Review [actions you can take to recover from overload situations](../enterprise/throttling.md#how-to-stop-throttling-when-it-occurs).

## Monitor overload information with Fabric Capacity Metrics App

Capacity administrators can view overload information and drilldown further via [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).

For a walkthrough of the app, visit [How to: Observe Fabric Data Warehouse utilization trends](how-to-observe-utilization.md).

Use the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) to view a visual history of any overutilization of capacity, including carry forward, cumulative, and burndown of utilization. For more information, refer to [Throttling in Microsoft Fabric](../enterprise/throttling.md) and [Overages in the Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md#overages).

:::image type="content" source="media/compute-capacity-smoothing-throttling/metrics-app-throttling.gif" alt-text="An animated image showing the capabilities of the Fabric Capacity Metrics app." lightbox="media/compute-capacity-smoothing-throttling/metrics-app-throttling.gif":::

## Next step

> [!div class="nextstepaction"]
> [How to: Observe Fabric Data Warehouse utilization trends](how-to-observe-utilization.md)

## Related content

- [Throttling in Microsoft Fabric](../enterprise/throttling.md)
- [Billing and utilization reporting in Fabric Data Warehouse](usage-reporting.md)
- [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
- [Fabric Data Warehouse performance guidelines](guidelines-warehouse-performance.md)
- [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing.md)
- [Smoothing and throttling in Fabric Data Warehousing](compute-capacity-smoothing-throttling.md)
- [Burstable capacity in Fabric data warehousing](burstable-capacity.md)
- [Pause and resume in Fabric data warehousing](pause-resume.md)
