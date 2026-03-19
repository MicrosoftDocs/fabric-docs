---
title: Schedule Eventhouse Capacity for Real-Time Analytics Workloads
description: Optimize Eventhouse capacity with a customizable schedule. Guarantee performance during peak hours and save costs during low activity periods. Learn more.
author: spelluru
ms.author: spelluru
ms.reviewer: tzgitlin
ms.subservice: rti-eventhouse
ms.topic: how-to
ms.date: 02/12/2026
ms.search.form: Eventhouse

#CustomerIntent: As a data engineer, I want to configure a capacity schedule for my Eventhouse so that I can optimize costs and ensure performance during peak hours.
---

# Schedule smart Eventhouse capacity control (preview)

Real-time analytics workloads often follow predictable patterns. You might see heavy ingestion during business hours, lighter query traffic overnight, quiet weekends, and short but critical pipeline windows. You can customize a minimum capacity schedule that aligns with your workload patterns.

A customized schedule prevents using a single minimum capacity value for the entire week, paying for guaranteed resources when they're not needed, or risking performance during peak hours.

The Capacity Planner scheduler supports common real-world patterns, including:

* Guaranteed ingestion during ETL or streaming windows.
* High query concurrency during business hours.
* Cost-optimized off-hours and weekends.
* Seasonal or campaign-driven load patterns.
* Adapting easily to operational realities.

Capacity planning enables smart, policy-driven capacity management in your Eventhouse. It complements existing investments in autoscale, cost-performance balancing, and helps you fine-tune availability. By separating when capacity must be guaranteed from how much demand actually occurs, Eventhouse gives you control without complexity, and performance without waste.

## Capacity planner scheduler

The capacity planner scheduler allows you to define different minimum capacity levels across the week, instead of relying on a single static value. You can:

* Configure a 7-day recurring schedule.
* Split each day into 60-minute time blocks.
* Define a minimum capacity per block, or explicitly mark it as no minimum.
* Use the scheduler to raise or lower the minimum capacity for a certain time block, as needed, without disabling autoscale. The scheduler doesn't replace autoscale rather works alongside it.
    * When you define a minimum, Eventhouse guarantees a capacity floor. Autoscale can still scale above that floor during demand spikes.
    * The system never forces a scale-down if capacity is already higher due to active demand.
    *  If no minimum is defined for a time block, the default minimum capacity is 2 CUs (25 GB of premium storage size).

## Enable capacity planner

When you enable **Capacity Planner mode**, you don't pay for *OneLake Cache Storage*. The eventhouse is always active, so you get 100% Eventhouse UpTime without extra premium storage costs. Capacity planner mode (previously known as *Always-on*) prevents the eventhouse from suspending the service due to inactivity. For highly time-sensitive systems, it prevents the latency of reactivating the eventhouse.

* From the eventhouse ribbon, select **Capacity Planner** and ensure **Capacity Panner mode** is enabled.

:::image type="content" source="media/eventhouse-capacity-observability/capacity-planner-mode.png" alt-text="Screenshot of the capacity planner window that opens when you select capacity planner from the toolbar. The enable button is highlighted." lightbox="media/eventhouse-capacity-observability/capacity-planner-mode.png":::

> [!NOTE]
> If you don't continue by scheduling capacity values, the minimum capacity is set at a minimum value of 2 CUs (25 GB of premium storage size).

## Schedule minimum capacity

In addition to the always-on **Capacity Planner mode**, you can further customize a minimum capacity schedule. This schedule sets a minimum available capacity unit (CU) size for an eventhouse per day and specific times during that day.

1. From the eventhouse ribbon, select **Capacity Planner** and ensure **Capacity Panner mode** is enabled.

1. Select the **Customize minimum capacity schedule** option.

1. Select the days of the week you want to set a minimum capacity value.

1. For each selected day, define the time ranges and the corresponding [minimum capacity unit (CU) size](#capacity-units-mapping).

    * You can add multiple time ranges with different minimum CU sizes within the same day.

    * If there are overlapping time ranges, the higher minimum CU size takes precedence during the overlapping period.

1. Select **Done**.

:::image type="content" source="media/eventhouse/minimum-capacity-small.png" alt-text="Screenshot showing the eventhouse capacity planner for the Eventhouse." lightbox="media/eventhouse/minimum-capacity.png":::

### Capacity units mapping

Use the following table to determine the appropriate minimum capacity unit (CU) size for your eventhouse based on your expected workload and performance requirements. The minimum CU size you select ensures that your eventhouse has enough resources to handle your workload during the scheduled times. You can also optimize costs by allowing the eventhouse to scale down during periods of low activity.

The table maps storage sizes to minimum [capacity units](../admin/capacity-settings.md) that you can assign to the eventhouse:

| Minimum CUs | SSD capacity (GB) of free storage |
| ----------- | --------------------------------- |
| 2 (default) | 25                                |
| 4           | 50                                |
| 8           | 200                               |
| 12          | 800                               |
| 16          | 3500-4000                         |
| 24          | 5250-6000                         |
| 32          | 7000-8000                         |
| 48          | 10500-12000                       |
| Custom      | ~200/CU (Ex: 100 CU = ~20,000 GB) |

> [!TIP]
> If you had *Always-on* enabled with a minimum CU value of 4.25, 8.5, 18, 26, 34, or 50, when you enable **Capacity Planner mode** the minimum CU value is set to 4, 8, 16, 24, 32, or 48 respectively. If you had a custom minimum CU value that doesn't match the values in the table, when you enable **Capacity Planner mode** the minimum CU value is set to the closest lower value in the table. For example, if your custom minimum CU value was 10, when you enable **Capacity Planner mode** the minimum CU value is set to 8.

## Related content

- [Eventhouse and KQL Database consumption](real-time-intelligence-consumption.md)
- [Manage and monitor an eventhouse](manage-monitor-eventhouse.md)
