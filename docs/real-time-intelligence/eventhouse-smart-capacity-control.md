---
title: Schedule Eventhouse Capacity for Real-Time Analytics Workloads
description: Optimize Eventhouse capacity with a customizable schedule. Guarantee performance during peak hours and save costs during low activity periods. Learn more.
author: spelluru
ms.author: spelluru
ms.reviewer: tzgitlin
ms.subservice: rti-eventhouse
ms.topic: how-to
ms.date: 05/25/2026
ms.search.form: Eventhouse
ai-usage: ai-assisted

#CustomerIntent: As a data engineer, I want to configure a capacity schedule for my Eventhouse so that I can optimize costs and ensure performance during peak hours.
---

# Schedule smart Eventhouse capacity control

Real-time analytics workloads often follow predictable patterns. You might see heavy ingestion during business hours, lighter query traffic overnight, quiet weekends, and short but critical pipeline windows. You can customize a minimum capacity schedule that aligns with your workload patterns.

## Use cases

A customized schedule prevents using a single minimum capacity value for the entire week, paying for guaranteed resources when they're not needed, or risking performance during peak hours.

The capacity planner scheduler supports common real-world patterns, including:

* Guaranteed ingestion during ETL or streaming windows.
* High query concurrency during business hours.
* Cost-optimized off-hours and weekends.
* Seasonal or campaign-driven load patterns.
* Adapting easily to operational realities.

Capacity planning enables smart, policy-driven capacity management in your Eventhouse. It complements existing investments in autoscale, cost-performance balancing, and helps you fine-tune availability. By separating when capacity must be guaranteed from how much demand actually occurs, Eventhouse gives you control without complexity, and performance without waste.

## Minimum capacity schedule

The minimum capacity schedule helps you define a default minimum capacity and adjust this value using the schedule to meet your workload requirements, instead of relying on a single static value. You can:

* Configure a default value that applies to any period where a schedule isn't set.

* Use the scheduler to further refine your minimum capacity by:
   * Configuring a seven-day recurring schedule.

   * Splitting each day into 60-minute time blocks.

   * Defining a minimum capacity per block, or explicitly marking it as no minimum.

   * Using the scheduler to raise or lower the minimum capacity for a certain time block, as needed, without disabling autoscale. The scheduler doesn't replace autoscale but works alongside it.

       * The schedule only sets a floor, not a ceiling, so you can still benefit from autoscale's ability to handle unexpected spikes without interruption.

       * The system never forces a scale-down if capacity is already higher due to active demand.

       * Any scale operation performed on a cluster results in a 24-hour cooldown period when trying to scale down from a physical to virtual cluster due to low utilization.

       * If you don't define a minimum for a time block, the default minimum capacity is 2 CUs (25 GB of premium storage size).

> [!NOTE]
>
> Changes to the schedule take up to 30 minutes to impact capacity. Plan accordingly when setting up or modifying your schedule, especially for critical workloads.

### Capacity planner settings

The **Capacity Planner** pane includes a **Default minimum capacity** field and an optional **Schedule**. The default field defines the week-wide baseline. Schedule entries override that value for the selected days and times.

The pane validates minimum capacity values against supported ranges. The schedule overview summarizes the total scheduled minimum capacity for the next 24 hours.

> [!WARNING]
> If a scheduled minimum capacity exceeds the available capacity for your workspace or capacity SKU, a warning appears in the pane. Adjust the schedule or upgrade your capacity SKU to avoid constraint violations.

## Enable capacity planner

When you enable **Capacity Planner mode**, you don't pay for *OneLake Cache Storage*. The eventhouse is always active, so you get 100% Eventhouse UpTime without extra premium storage costs. Capacity planner mode (previously known as *Always-on*) prevents the eventhouse from suspending the service due to inactivity. For highly time-sensitive systems, it prevents the latency of reactivating the eventhouse.

* From the eventhouse ribbon, select **Capacity Planner** and ensure **Capacity Planner mode** is enabled.

:::image type="content" source="media/eventhouse-capacity-observability/capacity-planner-mode.png" alt-text="Screenshot of the capacity planner window that opens when you select capacity planner from the toolbar. The enable button is highlighted." lightbox="media/eventhouse-capacity-observability/capacity-planner-mode.png":::

> [!NOTE]
> If you don't continue by scheduling capacity values, the minimum capacity is set at a minimum value of 2 CUs (25 GB of premium storage size).

## Set the default minimum capacity

Set a default minimum capacity to define a baseline for the entire week.

1. From the Eventhouse ribbon, select **Capacity Planner** and ensure **Capacity Planner mode** is enabled.
1. In **Default minimum capacity**, enter the minimum capacity value in CUs.
1. Select **Done** to save the default without adding schedule entries.

> [!NOTE]
> In rare cases, the minimum capacity value you enter is rounded up to the nearest supported value. This value appears when you return to the capacity settings.


## Schedule minimum capacity

Add a schedule only when you need to override the default minimum capacity during specific periods.

1. From the eventhouse ribbon, select **Capacity Planner** and ensure **Capacity Planner mode** is enabled.

1. Select the **Customize minimum capacity schedule** option.

1. Select the days of the week you want to set a minimum capacity value.

1. For each selected day, enter a [minimum capacity unit (CU) value](#capacity-units-mapping) in the 60-minute block cells on the weekly grid. Each cell corresponds to a one-hour window. Leave a cell empty or select **No minimum** to let the eventhouse scale freely during that block.

    * The UI validates your entries at the cell level, ensuring values are within supported ranges.

    * The higher minimum CU value takes precedence when multiple settings apply to the same time window.

1. Select **Done**.

For periods without a scheduled override, Eventhouse uses Default minimum capacity. For example, set a default of 4 CUs for the entire week. Add a schedule of 16 CUs during weekday business hours. Eventhouse maintains at least 16 CUs during those hours and at least 4 CUs at other times. Autoscale can increase capacity above either minimum when demand requires it.

:::image type="content" source="media/eventhouse/minimum-capacity-small.png" alt-text="Screenshot showing the eventhouse capacity planner for the Eventhouse." lightbox="media/eventhouse/minimum-capacity.png":::

## Capacity units mapping

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
