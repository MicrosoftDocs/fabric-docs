---
title: How to observe Synapse Data Warehouse utilization trends
description: Learn how to use the Fabric Capacity Metrics app to observe Microsoft Fabric Synapse Data Warehouse utilization trends.
author: sowmi93
ms.author: sosivara
ms.reviewer: wiassaf
ms.date: 10/01/2023
ms.topic: conceptual
ms.search.form: Warehouse billing and utilization
---

# How to: Observe Synapse Data Warehouse utilization trends

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Learn how to observe trends and spikes in your data warehousing workload in Microsoft Fabric using the Microsoft Fabric Capacity Metrics app. 

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workloads in one place. It's mostly used by capacity administrators to monitor the performance of workloads and their usage, compared to purchased capacity.  

## Prerequisites

- Have a [Microsoft Fabric licenses](/fabric/enterprise/licenses), which grants Capacity Units (CUs) shared across all Fabric workloads.
- Add the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) from AppSource.

## Observe overall trend across all items in Fabric capacity

In the Fabric Capacity Metrics app, use the **Multi metric ribbon chart** to find peaks in CU utilization. Look for patterns in your Fabric usage that may coincide with peak end-user activity, nightly processing, periodic reporting, etc. Determine what resources are consuming the most CUs at peak utilization and/or business hours.

This graph can provide high-level CU trends in the last 14 days to see which Fabric workload has used the most CU.

:::image type="content" source="media/how-to-observe-utilization/metrics-app-data-warehousing.gif" alt-text="A screenshot from the Fabric Capacity Metrics app showing steps to isolate Warehouse utilization and observe." lightbox="media/how-to-observe-utilization/metrics-app-data-warehousing.gif":::

1. Use the **Item** table to identify specific warehouses consuming most Compute. The Items table below the multi metric ribbon chart provides aggregated consumption at item level. In this view, for example, you can identify which items have consumed the most CUs.
1. Select "Warehouse" in the **Select item kind(s)** dropdown list.
1. Sort by CU(s) descending.

## Drill through peak activity

Use the timepoint graph to identify a range of activity where CU utilization was at its peak. We can identify individual interactive and background activities consuming utilization.

This graph shows granular usage into a list of operations that were at the selected timepoint.

:::image type="content" source="media/how-to-observe-utilization/utilization-graph-explore.png" alt-text="A screenshot from the Fabric Capacity Metrics app showing the time point graph of CU over time.":::

- Yellow dotted line provides visibility into upper SKU limit boundary based on the SKU purchased along with the enablement of autoscale, if a user has configured their capacity with autoscale enabled.
- When you zoom in and select a specific time point, you can observe the usage at the CU limit. With a specific timepoint or range selected, then select the **Explore** button.
  - Apply a filter to drill down into specific warehouse usage in the familiar **Filter** pane. Expand the **ItemKind** list and **Warehouse**.
  - Sort by total CU(s) descending.
  - In this example, you can identify users, operations, start/stop times, durations that consumed the most CUs.
  - The table includes an `Operation Id` for a specific operation. This is the unique identifier, which can be used in other monitoring tools like dynamic management views (DMVs) for end-to-end traceability, such as in `dist_statement_id` in [sys.dm_exec_requests](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-requests-transact-sql?view=fabric&preserve-view=true).
  - The table of operations also provides a list of operations that are **InProgress**, so you can understand long running queries and its current CU consumption.

## Related content

- [Billing and utilization reporting in Synapse Data Warehouse](usage-reporting.md)
- [Monitor connections, sessions, and requests using DMVs](monitor-using-dmv.md)
- [Workload management](workload-management.md)
- [Synapse Data Warehouse in Microsoft Fabric performance guidelines](guidelines-warehouse-performance.md)
- [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
- [Smoothing and throttling in Fabric Data Warehousing](compute-capacity-smoothing-throttling.md)
