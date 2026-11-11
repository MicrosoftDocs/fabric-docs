---
title: Health Page in Fabric Capacity Metrics app preview
description: Learn how to use the Health page in the Fabric Capacity Metrics app preview report to assess capacity health, throttling states, and surge protection across regions.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: atishghosh
ms.topic: concept-article
ms.date: 08/25/2026
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator, I want to understand what the Health page shows so that I can assess capacity health and throttling.
---

# Understand the Health page in Fabric Capacity Metrics app preview

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The **Health** page is a summary view in the Fabric Capacity Metrics app preview report that shows the health and throttling state of the capacities in a selected region. You select the region, and the page shows only the capacities that you can access in that region. This page belongs to the [Preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report), the redesigned monitoring experience, not the default **Microsoft Fabric Capacity Metrics** report. For the Health page in the generally available report, see [the metrics app health page](metrics-app-health-page.md).

When you're responsible for many capacities, it's hard to tell which ones are healthy and which ones are throttling without checking each one separately. The Health page brings that state together in a single view, so you can quickly see where problems occur and where to focus your investigation.

This article helps you understand the summary cards and detail views on the Health page and how to interpret the throttling states they report.

:::image type="content" source="media/metrics-app-preview-health-page/health-page-overview.png" alt-text="Screenshot of the Health page showing capacity summary cards, region and capacity filters, and the capacity details table in the 14-day view." lightbox="media/metrics-app-preview-health-page/health-page-overview.png":::

The following video walks you through the Health page and how to use it to assess capacity health and throttling.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=ee59d167-ee8f-4c7b-8b1e-30a7abb53bff]

## Capacity summary

The cards at the top of the page summarize capacity states over the past 24 hours and 14 days:

- **Active capacity**: Counts the number of distinct capacities that were active at any point within the indicated period (24 hours or 14 days).
- **Capacities without any throttling**: Counts the number of capacities that didn't throttle throughout the entire indicated period. In other words, this count represents consistently healthy capacities.
- **Capacities with interactive delay**: Counts the number of capacities that spent any period, however short, in interactive delay during the indicated period. If mitigations such as capacity overage prevented throttling, the capacity isn't counted.
- **Capacities in interactive rejection**: Counts the number of capacities that spent any period, however short, in interactive rejection during the indicated period. If mitigations such as capacity overage prevented throttling, the capacity isn't counted.
- **Capacities with surge protection active**: Counts the number of capacities on which capacity-level surge protection activated. This means the capacity is in background rejection, although not necessarily in interactive delay or interactive rejection.
- **Capacities with background rejection**: Counts the number of capacities that spent any period, however short, in background rejection during the indicated period. If mitigations such as capacity overage prevented throttling, the capacity isn't counted.

> [!NOTE]
> Not all of these metrics are mutually exclusive. For example, a capacity might be in interactive delay at one point during the period and in background rejection at another point during the same period. In this case, the capacity is counted in both metrics.

## Capacity details

The capacity details table provides six views across four time periods. These views are the same views used in the workflows described in [Monitor capacity and throttling in the Capacity Metrics app preview](metrics-app-monitor-capacity-throttling.md).

### Latest view

The **Latest** view shows utilization, throttling percentages, and health state from the most recently reported 30-second window for each active capacity. The table subtitle shows when the data was last updated.

Data has a latency of about 10 to 15 minutes. Refresh the page or visual to retrieve newly available data. The view highlights:

- Capacities where a throttling threshold exceeds 90%.
- Capacities where capacity overage prevents throttling.
- Capacities in background rejection because surge protection is active.

### Last 1 hour view

The **Last 1 hour** view provides a more stable view of recent health than the **Latest** view. It shows the maximum utilization and throttling values reported during the recent period, allowing you to identify the worst state reached by each capacity.

The view displays a warning indicator when a throttling threshold exceeds 90%.

### Last 24 hours period

The **Last 24 hours** period contains two views:

- **Utilization**: Shows the percentage of time each capacity spent in states such as paused, not throttled, interactive delay, interactive rejection, background rejection, and surge protection.
- **At risk**: Shows only capacities that spent time above 90% of the interactive delay threshold. It includes the percentage of time spent at risk and in throttling states.

For example, an **Interactive delay** value of 10% means that the capacity spent 10% of the previous 24 hours in interactive delay.

### Last 14 days period

The **Last 14 days** period contains the same two views as **Last 24 hours**, calculated across the past 14 days:

- **Utilization**: Shows the percentage of time each capacity spent in each capacity state.
- **At risk**: Shows capacities that spent time above 90% of the interactive delay threshold.

## Optional capacity detail columns

In the historical utilization views, select optional columns to review additional capacity information, including:

- Background and interactive usage breakdowns.
- Spark Autoscale hours billed.
- Blocked workspaces.
- Overage capacity unit (CU) hours.
- Processed hours.
- Overage billing information.

## Visual help tooltips

Each visual has a help tooltip that explains what the visual shows and provides more information about its data, indicators, and thresholds.

## Considerations and limitations

- The **Latest** view typically has a data delay of 10 to 15 minutes.
- State percentages might not total 100% because some states overlap.
- Paused capacities appear when they were active during the selected period.
- Deleted capacities don't appear because the source APIs don't return them.
- Storage values include Fabric item storage, but don't include Power BI storage.

## Frequently asked questions

### Why are there six different views?

Each view is created with a different use case in mind. You don't need to use all views - use whichever is most useful for your scenario.

### In the utilization views, why is my Time no throttling showing as green when it's less than 100%?

Time in no throttling shows green either when time spent in that state is 100% or the total of time spent in that state and in a paused state is 100%.

### Why are some capacities showing no storage or lower storage than I would expect?

The Health page only shows storage for Fabric item. Power BI storage is unpaid and not recorded here.

### Why don't the health states in the utilization page always add up to 100%?

Some of the health states aren't mutually exclusive. For instance, a capacity can be in interactive rejection and background rejection at the same time.

### My capacity health is showing as 100% no throttling but isn't highlighted green

The most likely cause for this is a rounding error. If the capacity entered a throttled state for only a very short time, the time spent in throttling metric might show 0.00% and time spent with no throttling might show 100.00%, but the actual time spent in a healthy state would be very slightly less than 100% - hence the capacity doesn't show green. This condition indicates that there's some small duration of throttling on the capacity, even if the rounding doesn't show it.

## Next step

> [!div class="nextstepaction"]
> [Monitor capacity and throttling in the Fabric Capacity Metrics app preview](metrics-app-monitor-capacity-throttling.md)

## Related content

- [Capacity Metrics app preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report)
- [Monitor capacity and throttling in the Capacity Metrics app preview](metrics-app-monitor-capacity-throttling.md)
- [Understand the Compute page](metrics-app-preview-compute-page.md)
- [Understand the Item details page](metrics-app-preview-item-details-page.md)
- [Understand the Storage page](metrics-app-preview-storage-page.md).
- [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md)
- [Understand Fabric capacity throttling](throttling.md)
- [Surge protection](surge-protection.md)
