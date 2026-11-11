---
title: Compute Page in Fabric Capacity Metrics app preview
description: Learn how to use the Compute page in the Fabric Capacity Metrics app preview report to investigate capacity utilization, throttling, and workload activity.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: atishghosh
ms.topic: concept-article
ms.date: 08/25/2026
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator, I want to understand what the Compute page shows so that I can interpret utilization and throttling.
---

# Understand the Compute page in Fabric Capacity Metrics app preview

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The **Compute** page is a diagnostic page in the Fabric Capacity Metrics app preview report that shows the usage, throttling, and workload activity of a selected capacity. This page belongs to the [Preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report), the redesigned monitoring experience, not the default **Microsoft Fabric Capacity Metrics** report. For the compute page in the generally available report, see [compute page in the capacity metrics app](metrics-app-compute-page.md).

When a capacity throttles or runs hot, this page helps you find when usage affected capacity health and which items, workspaces, and operations drove the consumption.

This article explains the views the page provides and the visuals in each view, so you can interpret utilization and throttling and identify the activity behind them.

## Compute views

The compute page provides three views:

- **Smoothed: Last 24 Hours**: Investigate recent capacity health at finer time granularity. Use this view to relate utilization and capacity-state changes to specific throttling activity and identify the items that contributed to or were affected during a selected period.
- **Smoothed: Last 14 Days**: Investigate capacity health and recurring throttling patterns across a longer period. Use this view to connect utilization and capacity-state changes with specific throttling activity, identify recurring patterns, and determine which items contributed to or were affected during selected periods.
- **Unsmoothed: Last 14 Days**: Perform a general capacity review, identify long-term activity trends, and compare consumption by item kind, workspace, or item. This view shows consumption when operations reported it, without applying smoothing.

Use a smoothed view to understand when usage affected capacity health and throttling. Use the unsmoothed view to understand the types and relative sizes of activities that reported consumption.

## Smoothed views

The two smoothed views contain the same visuals for different time periods. The 24-hour view uses smaller time windows than the 14-day view, which makes it more suitable for investigating recent events.

Smoothed data shows when usage affects the capacity rather than when the operation reports it. For example, if a background operation reports usage at 8:00 AM, the unsmoothed view attributes the usage to 8:00 AM. The smoothed views distribute that usage across the following 24 hours, which reflects how it contributes to throttling.

The following video walks you through the smoothed views and how to use them to investigate capacity health and throttling.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=40f9d932-ebce-4700-999a-66cb8fb9cc2b]

The page header contains high-level capacity metrics that are also available on the Health page.

## Utilization and throttling

In a smoothed view, use the bookmarks in the top section to switch between these visuals:

- **CU(s) over time**: Shows average CU seconds consumed per second in 30-second windows against the capacity limit. For example, an F64 provides 64 CU seconds per second. If it uses 1,100 CU seconds in a 30-second window, the visual shows 36.7 CU seconds per second (1,100 CU seconds / 30 seconds = 36.7 CU seconds per second) against the limit of 64 CU seconds per second. Use this visual to review scale changes and compare actual usage over time regardless of capacity size.
- **CU % over time**: Shows the percentage of available CUs used over time, calculated by dividing the CUs used by the CUs available in the selected period. For example, an F64 provides 64 CU seconds per second, or 1,920 CU seconds in a 30-second window. If it uses 1,100 CU seconds during that window, utilization is approximately 57.3% (1,100 / 1,920). Conditional formatting indicates interactive and background throttling states. Hover over the visual to review the capacity state.
- **Approx. CUs - Item Kind**: Shows smoothed usage by item kind at the time the usage affects the capacity. For example, if a semantic model refresh reports its usage at 8:00 AM, the visual distributes that usage across the following 24 hours instead of showing it all at 8:00 AM.
- **Throttling**: Shows separate trends for interactive delay, interactive rejection, and background rejection. A value of 100% or more indicates that the capacity is experiencing that throttling state unless capacity overage is active. Conditional formatting indicates when throttling or capacity overage occurs.
- **Overage (Carryforward)**: Shows overage added, overage burned down, overage carryforward, and cumulative overage. An overage add occurs when utilization exceeds 100%. If utilization later falls below 100%, unused capacity burns down the carried-forward overage. For example, if a period has a CU limit of 100 and uses 110 CUs, 10 CUs carry forward. If the next period uses 93 CUs, 7 of the 10 carried-forward CUs burn down, leaving 3 CUs to carry forward to the next period. **Cumulative overage** is the running total of overage additions and burn down.
- **Capacity Overage**: Shows paid capacity-overage activity. Capacity overage is a paid feature that processes cumulative overage that would otherwise result in throttling. Its views provide the following information:
	- **Table**: Shows the configured overage-hour limit, the maximum rolling 24-hour billed overage during the displayed period, and processed overage for the selected window. Expand the table to 30-second window detail.
	- **Timepoint**: Shows processed overage for each window in 20-minute intervals.
	- **Cumulative**: Shows processed CU hours in a rolling 24-hour window. For example, a value of 47 CU hours at 9:05 AM on Tuesday represents the CU hours billed between 9:05 AM on Monday and 9:05 AM on Tuesday. The rolling window advances in five-minute increments.

> [!NOTE]
> - Utilization above 100% doesn't always mean the capacity is throttled, and utilization below 100% doesn't guarantee that throttling isn't occurring. Use the throttling visuals and capacity state together when reviewing capacity health.
>
> - Throttling occurs when future usage exceeds 100% over the applicable period: 10 minutes for interactive delay, 60 minutes for interactive rejection, and 24 hours for background rejection.
>
> - Conditional formatting on the utilization visuals might not indicate interactive delay or rejection when no interactive jobs are running. Use the throttling visuals as the detailed source for throttling percentages and protection activity.

## Capacity health heat map

The heat map uses background color to display the highest-priority capacity state for each time period. States include background rejection, interactive rejection, interactive delay, at risk, healthy, and paused.

The heat map uses this priority order, from highest to lowest:

1. Background rejection (red)
1. Interactive rejection (dark amber)
1. Interactive delay (light amber)
1. At risk (yellow)
1. Healthy (green)
1. Paused (gray)

The background color represents the highest-priority state that occurred during the period. For example, if a capacity changes from healthy to background rejection during a period, the background is red for that period. As a result, the heat map shows the paused background only when the capacity was paused for the entire period. Otherwise, the background shows a higher-priority state. Surge protection appears as an icon, so a capacity in background rejection only because of surge protection can have a healthy background.

Icons indicate whether any of these events occurred during the period:

- Capacity overage was active.
- Surge protection was active.
- The capacity was paused.

Combined icons indicate when two or more of these events occurred during the same period. The help tooltip defines each icon.

Select a period in the heat map to cross-filter the visuals in the top and bottom-right sections.

The **System Events** visual shows when capacity state changes began. Use these events to correlate capacity transitions with utilization, throttling, overage, or health-state changes.

## Item consumption and impact

Use the bottom-right section to review:

- **Approx CU Consumption in Window**: Shows the smoothed CU consumption attributed to each item during the selected period.
- **Impacted Items During Time Window**: Shows items that attempted to run and were affected by interactive delay, interactive rejection, or background rejection.

Select a period in the heat map to focus these visuals on the period you want to investigate.

**Impacted Items During Time Window** doesn't include operations that users didn't attempt because the capacity was already throttled.

## Unsmoothed view

The **Unsmoothed: Last 14 Days** view shows when consumption was reported rather than when it was attributed to the capacity after smoothing. For example, if a background operation reports consumption at 8:00 AM, the unsmoothed view shows all of that consumption at 8:00 AM. A smoothed view distributes the consumption across the period when it affects the capacity.

The following video walks you through the unsmoothed view and how to use it to review reported consumption and activity trends.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=d29d5886-d062-40fc-b122-d546902d55c3]

Use this view to review aggregate CU usage, identify general activity trends, and find the item kinds, workspaces, or items that report the most compute. Because smoothing isn't applied, use the smoothed views instead when investigating capacity health or throttling at a specific time. The header contains high-level capacity metrics that are also available on the Health page.

Use the top-left bookmarks to review high-level capacity activity:

- **CU(s)**: Shows unsmoothed CU consumption by item kind. For example, if a background item reports consumption at 11:50 PM on January 1, the visual attributes all of that consumption to January 1 even though smoothing might attribute most of it to January 2. Use this visual to identify general consumption patterns and cross-filter other visuals.
- **Duration**: Shows aggregated operation duration by item kind. Use this visual to identify changes in how long operations run.
- **Operations**: Shows operation count by item kind. Use this visual to identify changes in activity, particularly for semantic models.
- **Users**: Shows distinct user count by item kind. Use this visual to review usage trends for reports and semantic models.

The top-right section aggregates consumption by item kind and workspace to identify the largest contributors:

- **CU(s) by Item kind**: CU consumption by item kind. Expand an item kind to identify which operations consume the most CUs.
- **CU(s) by workspace**: CU consumption by workspace. Use this information to identify high-consumption workspaces and help set workspace-level surge protection limits.

The bottom section shows **CU consumption by item**. Hover over an item to review its consumption by operation.

Select an item in **CU consumption by item** to cross-filter the CU, duration, operation, and user trends. Duration, operation, and user trends are most useful when filtered to a single item.

## Review an item

Drill through from an item on the Compute page to review up to 14 days of detailed history for that item. For more information, see [Understand the Item details Preview page](metrics-app-preview-item-details-page.md).

## Frequently asked questions

### Why isn't my capacity overloaded when utilization is greater than 100%?

Throttling occurs only when future usage reaches 100% over the applicable period: 10 minutes for interactive delay, 60 minutes for interactive rejection, and 24 hours for background rejection. Conditional formatting on the graph indicates the throttling state. Hover over a column in the visual to review throttling percentages.

### Why is my capacity overloaded when utilization is less than 100%?

A capacity can be below 100% utilization and still experience throttling when it carries forward overage from an earlier period of high utilization. Hover over a column in the chart to review throttling percentages and carried-forward overage. You can also open the **Overage (Carryforward)** view to determine whether the capacity is burning down carried-forward overage.

### Why does the CU percentage over time increase and decrease sharply?

The **CU% over time** visual calculates utilization by dividing consumed CUs by the available CU budget, which is based on the capacity SKU size. If the SKU size is halved, utilization doubles even when CU consumption doesn't change. Review the **CU(s) over time** visual to determine whether a change in SKU size caused the sharp change in utilization.

## Next step

> [!div class="nextstepaction"]
> [Monitor capacity and throttling in the Fabric Capacity Metrics app preview](metrics-app-monitor-capacity-throttling.md)

## Related content

- [Capacity Metrics app preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report)
- [Monitor capacity and throttling in the Capacity Metrics app preview](metrics-app-monitor-capacity-throttling.md)
- [Understand the Health page](metrics-app-preview-health-page.md)
- [Understand the Item details page](metrics-app-preview-item-details-page.md)
- [Understand the Storage page](metrics-app-preview-storage-page.md).
- [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md)
- [Understand Fabric capacity throttling](throttling.md)
- [Surge protection](surge-protection.md)
