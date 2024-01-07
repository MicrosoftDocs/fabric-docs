---
title: Monitor a paused capacity
description: Learn how to monitor a Microsoft Fabric paused capacity using the Microsoft Fabric Capacity Metrics app.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 01/07/2024
---

# Monitor a paused capacity

To monitor [paused capacities](pause-resume.md), use the [Microsoft Fabric Capacity Metrics app](metrics-app.md).

## View the paused capacity events

The [system events](metrics-app-compute-page.md#system-events) table lists all the paused capacity events. Use this table to see when your capacity was paused and when it was reactivated. In the *State* column, a paused capacity is listed as *Suspended*, and a resumed capacity is listed as *Active*. Use the *Time* column to calculate the amount of time your capacity was active or paused.

## Why is my capacity spiking?

To allow your capacity to perform at the highest level, its usage is [smoothed](throttling.md#balance-between-performance-and-reliability) over time. When you pause your capacity, the remaining smoothed operations are executed. As a result, a spike appears in the [Utilization](metrics-app-compute-page.md#utilization) visual.

The spike provides a good indication that a capacity was paused. You can hover over it spike to view and see the state of the capacity in the tooltip. 

## View carry forward operations

You can find out what's the percentage of [carry forward](throttling.md#carry-forward-capacity-usage-reduction) operations that your capacity had when it was paused.

1. Locate the paused capacity timepoint by reviewing the spike in the utilization visual.

2. From the paused capacity timepoint, drill through to the [Timepoint Detail](metrics-app-timepoint-page.md) page.

3. Hover over the SKU card. A tooltip displays the remaining cumulative carry forward percent.

## Related content

* [Scale your capacity](scale-capacity.md)

* [Understand the metrics app compute page](metrics-app-compute-page.md)

* [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
