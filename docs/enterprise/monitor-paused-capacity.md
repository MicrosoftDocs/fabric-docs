---
title: Monitor a paused capacity
description: Learn how to monitor a Microsoft Fabric paused capacity using the Microsoft Fabric Capacity Metrics app.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 09/11/2024
---

# Monitor a paused capacity

To monitor [paused capacities](pause-resume.md), use the latest version of the [Microsoft Fabric Capacity Metrics app](metrics-app.md).

## View the paused capacity events

The [system events](metrics-app-compute-page.md#system-events) table lists all the paused capacity events. Use this table to see when your capacity was paused and when it was reactivated. In the *State* column, a paused capacity is listed as *Suspended*, and a resumed capacity is listed as *Active*. Use the *Time* column to calculate the amount of time your capacity was active or paused.

## Why is my capacity spiking?

To allow your capacity to perform at the highest level, its usage is [smoothed](throttling.md#balance-between-performance-and-reliability) over time. When you pause your capacity, the remaining cumulative overages and smoothed operations are executed. As a result, a spike appears in the [Utilization](metrics-app-compute-page.md#utilization) visual.

The spike provides an indication that your capacity was paused. You can hover over the spike to view and see the state of the capacity in the tooltip.

:::image type="content" source="media/monitor-paused-capacity/suspended-capacity.png" alt-text="Screenshot showing a card that lists a suspended capacity in the utilization tab in the Microsoft Fabric capacity metrics app.":::

## View carryforward operations

You can find out what's the percentage of [carryforward](throttling.md#carryforward-capacity-usage-reduction) operations that your capacity had when it was paused.

1. Locate the paused capacity timepoint by reviewing the spike in the utilization visual.

2. Right-click the paused capacity's timepoint and drill through to the [Timepoint Detail](metrics-app-timepoint-page.md) page.

3. Hover over the SKU card. A tooltip displays the remaining cumulative carryforward percent.

:::image type="content" source="media/monitor-paused-capacity/sku-card-hover.png" alt-text="Screenshot showing a tooltip that lists the remaining cumulative carry forward percent when you hover over the S K U card on the Timepoint page in the Microsoft Fabric capacity metrics app.":::

## Considerations and limitations

* When you pause a capacity, the timepoint of the paused capacity is displayed on the [Timepoint page](metrics-app-timepoint-page.md) 30 seconds afterward. This timepoint includes all of your capacity’s reconciled consumption. If you have enabled [capacity alerts](../admin/service-admin-premium-capacity-notifications.md) you might receive a false alert that your capacity usage has exceeded the threshold you specified, after it was paused.

* When you pause a capacity, the timepoint preceding the timepoint at which the capacity was paused is canceled and doesn't appear on the [Compute page](metrics-app-compute-page.md). For example, if you pause your capacity at 13:00:00, the 12:29:30 timepoint won't exist.
* When you pause a capacity, after the _Suspended_ event is shown, you may see an _Active NotOverloaded_ event. The capacity is still paused. This occurs if your capacity was overloaded prior to the capacity being paused.

## Related content

* [Scale your capacity](scale-capacity.md)
* [Understand the Metrics app Compute page](metrics-app-compute-page.md)
* [Understand the Metrics app Timepoint page](metrics-app-timepoint-page.md)
