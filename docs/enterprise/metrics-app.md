---
title: What is the Microsoft Fabric Capacity Metrics app?
description: Learn how to evaluate your Microsoft Fabric capacity's health, by reading the metrics app.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
  - build-2024
ms.date: 03/12/2024
---

# What is the Microsoft Fabric Capacity Metrics app?

>[!NOTE]
>The Microsoft Fabric Capacity Metrics app has been updated to include support for both EM/A and P SKUs.

Fabric resides on a capacity which is a pool of resources allocated to your platform. Each capacity has its own number of [Capacity Units (CU)](licenses.md). CUs are used to measure the compute power available for your capacity.

The Microsoft Fabric Capacity Metrics app is designed to provide monitoring capabilities for Microsoft Fabric capacities. Use the app to monitor your capacity consumption and make informed decisions on how to use your capacity resources. For example, the app can help identify when to scale up your capacity or when to turn on [autoscale](/power-bi/enterprise/service-premium-auto-scale).

The app is updated often with new features and functionalities and provides the most in-depth information into how your capacities are performing.

## Install the app

You must be a capacity admin to install and view the Microsoft Fabric Capacity Metrics app.

To install the app, follow the instructions in [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md).

## Considerations and limitations

When using the Microsoft Fabric Capacity Metrics app, consider the following limitations.

* In the [Capacity utilization and throttling](metrics-app-compute-page.md#capacity-utilization-and-throttling) visual logarithmic's view, the primary axis seen on the left of the visual, isn't aligned with the secondary axis seen on the right of the visual.

* In the [interactive](metrics-app-timepoint-page.md#interactive-operations-for-timerange) and [background](metrics-app-timepoint-page.md#background-operations-for-timerange) operation tables, the *Throttling(s)* column displays zero when throttling is disabled, even when the capacity is overloaded.

* There's a difference of 0.01-0.05 percent between the *CU %* value in the [Top row visuals](metrics-app-timepoint-page.md#top-row-visuals) *Heartbeat line chart*, and the [interactive](metrics-app-timepoint-page.md#interactive-operations-for-timerange) and [background](metrics-app-timepoint-page.md#background-operations-for-timerange) operations tables *Total CU* values.

* Updates from version 1 to version 1.1 are installed in a new workspace.

* Sampling might occur while exporting data from the Export Data page. See second and third bullet in [Considerations and limitations](/power-bi/visuals/power-bi-visualization-export-data?tabs=powerbi-desktop#considerations-and-limitations).

* Editing the semantic model of the Microsoft Fabric Capacity Metrics app using external model authoring tools, isn't supported.

* The cumulative consumption of CU seconds for a specific item over the past 14 days, is displayed in the *CU (s)* column of the [matrix by item and operation](metrics-app-compute-page.md#matrix-by-item-and-operation) table. If the item was moved from another workspace to the current workspace in the last 14 days, the cumulative consumption of CU seconds for the item in the previous workspace is included in the *CU (s)* column.

## Related content

- [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md)
