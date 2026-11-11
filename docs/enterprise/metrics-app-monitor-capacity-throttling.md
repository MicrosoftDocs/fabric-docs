---
title: "Monitoring Scenarios in the Capacity Metrics App Preview"
description: Monitor Fabric capacity health and throttling by scenario. Find the right Capacity Metrics app preview pages and views, then drill from a capacity down to an item.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: atishghosh
ms.topic: how-to
ms.date: 08/28/2026
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator, I want to know which Metrics Preview pages and views to use for each monitoring scenario so that I can investigate capacity health and throttling efficiently.
---

# Monitor capacity and throttling in the Fabric Capacity Metrics app preview

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The Fabric Capacity Metrics app preview report helps you monitor the health of your Fabric capacities, investigate throttling, and identify the workloads and items that drive utilization. The report spreads this information across several pages and views, so the right place to start depends on what you want to investigate.

This article maps common monitoring scenarios - such as checking capacity health in near real time or investigating a capacity at risk of throttling - to the pages, views, and step-by-step procedures that address them. Use it to find the starting point that fits your scenario, then follow the steps to drill down from a capacity to an individual item and its operations.

There are four pages in the Capacity Metrics app preview you use for these scenarios. To learn more about each page before you work through these scenarios, see the following articles:

- [Understand the Health page](metrics-app-preview-health-page.md)
- [Understand the Compute page](metrics-app-preview-compute-page.md)
- [Understand the Item details page](metrics-app-preview-item-details-page.md)
- [Understand the Storage page](metrics-app-preview-storage-page.md).

## Choose a monitoring scenario

Find your monitoring scenario in the following table to see which pages and views to use. For step-by-step guidance, go to the matching section.

| Scenario | Start with | Continue with |
| --- | --- | --- |
| Review capacity issues in near real time | **Latest** and **Last 1 hour** on the Health page | **Smoothed: Last 24 Hours** on the Compute page |
| Review a capacity at risk of throttling | **24 Hours: At risk** or **14 days: At Risk** on the Health page. Every other Health view also includes at least some at-risk indicators. | The **heat map** and **Throttling** view on the Compute page |
| Review capacity issues from the past two weeks | **14 Days: Utilization** on the Health page | **Smoothed: Last 14 Days** on the Compute page |
| Perform a general capacity review | **24 hours: Utilization** or **14 days: Utilization** on the Health page, selecting relevant optional columns | **Unsmoothed: Last 14 Days** on the Compute page |
| Investigate an item at the operation level | An item on the Compute page | Operation trends and details on the Item details page |

## Review capacity issues in near real time

This scenario shows you how to check the most recent capacity data and quickly spot capacities that need attention:

1. On the [Health page](metrics-app-preview-health-page.md), open the **Latest** view to review the last reported utilization, throttling, and health state for each active capacity. Check the subtitle for the time of the last data update.
1. Review warning and status indicators to identify capacities above a 90% throttling threshold, capacities where capacity overage prevented throttling, and capacities in background rejection because surge protection is active.
1. Refresh the page or visual to retrieve newly available data. The values represent the latest 30-second window and have a latency of about 10 to 15 minutes.
1. Switch to **Last 1 hour** for a more stable view. This view shows the maximum values that each capacity reported during the hour, so you can review the worst state it reached recently.
1. For a capacity that requires investigation, open **Smoothed: Last 24 Hours** on the [Compute page](metrics-app-preview-compute-page.md).
1. Use **CU(s) over time** to identify anomalous usage in 30-second windows.
1. Use the capacity health heat map to identify an anomalous period, and select it to filter the visuals in the top and bottom-right sections.
1. Review the throttling visuals and **System Events** to correlate capacity-state changes with utilization and throttling activity.
1. If capacity overage or surge protection was active, review the corresponding indicators and **Capacity Overage** views.
1. Use **Approx CU Consumption in Window** and **Impacted Items During Time Window** to identify the items that contributed to the issue or that the issue affected during the selected period.
1. Drill through on a high-impact item to investigate its operations on the [Item details page](metrics-app-preview-item-details-page.md). Review operation IDs, capacity unit (CU) consumption, duration, status, and users to identify the operations associated with the issue.

## Review a capacity at risk of throttling

This scenario shows you how to find capacities that approached throttling thresholds and investigate when and why the risk occurred:

1. On the Health page, open the **At risk** view for **Last 24 hours** or **Last 14 days**. The table shows only capacities that spent time above 90% of the interactive delay threshold.
1. Compare the percentage of time each capacity spent at risk and in throttling states, and review the icons that identify capacity-level surge protection and capacity overage activity.
1. Sort or filter the table to identify capacities that spent the most time at risk or throttled.
1. Other Health views also include at-risk indicators. **Latest** and **Last 1 hour** show a warning when a throttling threshold exceeds 90%, while the historical **Utilization** views indicate capacities currently at risk of interactive delay.
1. On the Compute page, review the heat map for **At risk** periods. This state means that the interactive delay threshold exceeds 90% but doesn't reach 100%.
1. Open the **Throttling** view to identify periods when the capacity approached any of the three throttling thresholds.
1. Review the utilization trend to determine whether compute usage is increasing over time.

## Review capacity issues from the past two weeks

This scenario shows you how to analyze capacity health over a 14-day period and identify recurring patterns:

1. On the Health page, open the **Last 14 days** **Utilization** view.
1. Compare the percentage of time capacities spent paused, without throttling, in interactive delay, in interactive rejection, in background rejection, or with surge protection active.
1. Sort or filter the table to identify outliers and capacities that spent the most time in an unhealthy state.
1. Use the surge protection and capacity overage icons to identify mitigations that were active during the selected period.
1. For a capacity that requires investigation, open **Smoothed: Last 14 Days** on the Compute page.
1. Use the capacity health heat map to identify patterns that repeat by hour or day, and select a period to filter the visuals in the top and bottom-right sections.
1. Compare utilization, throttling, overage, and system events during the selected period.
1. Review item consumption and impacted items to identify the workloads associated with the issue.

## Perform a general capacity review

This scenario shows you how to routinely review overall capacity usage and the workloads that drive it:

1. On the Health page, open the **Last 24 hours** or **Last 14 days** **Utilization** view.
1. Add optional columns to review interactive and background usage, billed Spark Autoscale hours, blocked workspaces, and capacity overage information.
1. Drill through on a capacity to **Unsmoothed: Last 14 Days** on the Compute page to investigate workloads and consumption in more detail.
1. Compare CU consumption, duration, operation count, and distinct users by item kind.
1. Review consumption by item kind, workspace, and item to identify the largest contributors to capacity utilization.
1. Select an item to filter the trends, or drill through to the Item details page to review up to 14 days of detailed item history, including operation ID-level information.

## Investigate an item at the operation level

This scenario shows you how to drill into a single item and analyze its consumption down to individual operations:

1. On the Compute page, select an item that contributed significant CU consumption or was affected during the selected time window.
1. Drill through to the Item details page. The page retains time filters from the Compute page, including the selections you make in the capacity health heat map.
1. Use the item trends to compare smoothed and unsmoothed CU consumption, operation duration, and successful and failed operation counts.
1. Use the consumption breakdown to compare CU consumption by operation, status, and user.
1. Review the detailed operations table to identify the CU consumption, duration, and operation ID for individual operations.

## Related content

- [Capacity Metrics app preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report)
- [Understand the Health page](metrics-app-preview-health-page.md)
- [Understand the Compute page](metrics-app-preview-compute-page.md)
- [Understand the Item details page](metrics-app-preview-item-details-page.md)
- [Understand the Storage page](metrics-app-preview-storage-page.md).
