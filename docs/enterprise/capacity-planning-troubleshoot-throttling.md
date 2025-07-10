---
title: Troubleshooting guide - Determine source of report slowness
description: Diagnose and resolve Microsoft Fabric report slowness caused by capacity throttling. Follow step-by-step troubleshooting to identify and fix performance issues.
author: JulCsc
ms.author: juliacawthra
ms.reviewer: cnovak
ms.topic: troubleshooting
ms.custom:
ms.date: 07/10/2025
---

# Troubleshooting guide: Determine source of report slowness

This guide is for **Microsoft Fabric Capacity administrators**. Use it to check the source of report slowness when you suspect **capacity throttling**. This article gives a step-by-step approach to confirm if capacity throttling causes the slowness and, if so, to identify the workspace and item responsible for the overload.

## Scenario

Users experience slowness in their Power BI report and suspect that **capacity throttling** is the cause (the capacity running the report is overloaded, leading to delays or rejections of operations). This guide gives a step-by-step process to check if capacity throttling causes the slowness and to identify the offending service or item.

> [!NOTE]
> If the report uses a semantic model with Log Analytics or Workspace Monitoring enabled, the workspace owner can use [queries against log analytics](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure) to check the reasons for the report's slowness, because there can be factors beyond capacity throttling. If business users suspect that slowness is due to **capacity throttling** and the semantic models of these reports *don't have log analytics or workspace monitoring enabled*, this troubleshooting document helps the capacity admin confirm this from a capacity perspective.

## Prerequisites

Find and note the **workspace name**, **capacity name**, and **exact time** when the user experienced slowness. Use this information to filter and analyze the correct capacity metrics. Document the timeframe of the issue to help pinpoint relevant data in the Microsoft Fabric Capacity Metrics app.

The Metrics app lets you monitor Microsoft Fabric capacities. Use the app to check your capacity consumption and make informed decisions about your capacity resources. Admins should use the latest version of the [Metrics app](metrics-app-install.md). For details about using the app, see [Metrics app](metrics-app.md).

For troubleshooting, use the **Compute** and **Timepoint** pages of the Metrics app. To better understand and navigate these pages, see [Understand the Metrics app **Compute** page](metrics-app-compute-page.md) and [Understand the Metrics app **Timepoint** page](metrics-app-timepoint-page.md).

## Overview of troubleshooting stages

To troubleshoot report slowness suspected to be caused by capacity throttling, follow a three-step process: check capacity utilization, identify if throttling occurred, and drill down to find the specific workspace and item that caused the overload. The following flowchart shows this process:

:::image type="content" source="media/capacity-troubleshoot/flowchart-high-level-throttling.png" alt-text="Screenshot of the high-level flowchart showing the three stages of throttling troubleshooting." lightbox="media/capacity-troubleshoot/flowchart-high-level-throttling.png":::

| Stage | Action | Description |
|-------|--------|-------------|
| **1** | **Identify if the capacity was overutilized** | Check if the capacity utilization (the **Capacity units, or CUs, % over time** metric) exceeded 100% during the period of slowness. |
| **2** | **Identify if throttling occurred on the capacity** | If the capacity utilization was over 100%, check if throttling (interactive delay/rejection or background rejection) was triggered at that time. |
| **3** | **Identify the specific cause** | If throttling occurred, drill through to timepoint details to find which workspace, operation, and item (like dataset, now called semantic model, or report) caused the overload. |

Start by checking the capacity utilization during the user's reported slowness. If utilization never exceeded 100%, slowness isn't due to capacity throttling (process ends). If it exceeded 100%, check the throttling metrics. If no throttling occurred despite high utilization, throttling isn't the cause. Only if throttling occurred, investigate the detailed **Timepoint detail** report to find the specific item causing the issue, and then finish the analysis with that information.

Each stage is detailed in the following sections, with a flowchart and a table that explain the steps.

> [!NOTE]
> In the flowcharts, **Start** and **End** steps are rounded rectangles, **Decision** points are diamonds (with **Yes/No** branches), and **Action** or **Process** steps are rectangles. Arrows show the progression of steps.

## Stage 1: Identify when "CU % over time" exceeds 100%

This stage covers steps 1-10 of the process, where you check if the capacity is ever over its limit (over 100% utilization) at the time of the reported slowness. If not, end the investigation here because the slowness isn't due to capacity throttling.

The following flowchart shows Stage 1 (steps 1-10). It helps you check capacity utilization on the **Compute** page of the Metrics app and decide if it exceeds 100%:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-1-throttling.png" alt-text="Screenshot of the flowchart showing steps 1-10 for checking capacity utilization." lightbox="media/capacity-troubleshoot/flowchart-stage-1-throttling.png":::

> [!NOTE]
> In this diagram, the "Yes" branch leads to the next stage of analysis. The **END** at step 10 means capacity throttling isn't the cause.

The following table explains the steps in Stage 1:

| Step | Description / Action | Explanation |
|------|---------------------|-------------|
| **1 (START)** | Note the workspace name, capacity name, and approximate time when the user experienced slowness. | You need this information to filter the metrics to the relevant capacity and timeframe. Documenting it upfront helps you analyze the correct data. |
| **2** | Open the **Microsoft Fabric Capacity Metrics** app. | The [Metrics app](metrics-app.md) shows usage and performance data for capacities (Premium or Fabric capacities). It shows if the capacity is overloaded during the time of the issue. You need contributor or admin access to the capacity to view this. |
| **3** | In the Metrics app report, go to the [**Compute** page](metrics-app-compute-page.md). | The **Compute** page is the main dashboard for capacity performance. It shows an overview of the capacity’s usage over the last 14 days, including visuals for utilization and throttling. This page has a top section with charts and a bottom section with a table of items. |
| **4** | Select the relevant **Capacity Name** from the drop-down filter. | This loads data for the specific capacity where the slowness was reported (as identified in step 1). All visuals now reflect this capacity’s metrics. |
| **5** | Make sure the **CU** tab in the **Multimetric ribbon** chart (top-left) is visible and the **CU % over time** line chart is displayed (under the **Utilization** tab on the **Compute** page). | The [multimetric ribbon chart](metrics-app-compute-page.md#multimetric-ribbon-chart) lets you pick a date, and the CU % over time [**Utilization**](metrics-app-compute-page.md#utilization) chart shows the percentage of capacity used over time. Together, these help you check if the capacity exceeds its limits. |
| **6** | Check the *y*-axis of the **CU % over time** chart. If the CU% values go far above 200%, select the logarithmic scale button (top-right of the chart); otherwise, use the linear scale. | A [logarithmic scale](metrics-app-compute-page.md#utilization) makes it easier to see details when there are extreme spikes (like 500% usage) by compressing the *y*-axis. If usage is only slightly above 100%, the linear scale is enough. |
| **7** | Use the date from step 1 to **filter the report**: select that date on the multimetric ribbon chart’s *x*-axis. This filters the visuals to that specific day (24-hour period). | Focusing on the day of the incident lets you zoom into the time period of interest. The **CU %** chart on the [**Utilization**](metrics-app-compute-page.md#utilization) tab and other visuals now show data only for the day the slowness occurred. |
| **8** | On the **CU % over time** chart, **zoom in on the timeframe of the slowness**. Adjust the time slicer (below the chart) to narrow down to the specific hour or minute window the user reported the issue. | The chart typically shows data points at 30-second intervals. By zooming into the specific timeframe, you see exactly what the capacity usage is when the user experienced slowness. Look for any sharp peaks around that time. |
| **9 (DECISION)** | **Decision**: Does the **CU % over time line** chart show the utilization going **above 100%** (the capacity limit) during the slowness period? | **If no**: the utilization stays at or below 100%. The capacity isn't over capacity. <br><br>**If yes**: the utilization exceeds 100%, meaning the capacity is overloaded at that moment. |
| **10 (END)** | **If no**: Since the capacity never goes over 100% during that time, **capacity throttling isn't the cause of the slowness**. *End of analysis*.<br><br>**If yes** (capacity > 100%): Go to the next section to investigate throttling.| **If no**: If the capacity isn't fully utilized, the platform doesn't need to throttle any operations. The user's slowness must have another cause (like a slow query, a large data load, network latency, and so on). Stop the capacity-based investigation here.<br><br>**If yes** (capacity > 100%): Go to the next section to investigate throttling.|

## Stage 2: Identify if and when throttling occurred

If the capacity utilization exceeded 100%, this stage (steps 11-17) checks whether **throttling** occurred and impacted users at that time. We look at the throttling metrics (interactive delay/rejection and background rejection) and determine if they were triggered, and if so, whether it coincides with the user's slowness.

The following flowchart illustrates Stage 2 (steps 11-17), checking throttling indicators on the **Throttling** tab and drilling to detail if needed:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-2-throttling.png" alt-text="Screenshot of the flowchart showing steps 11-17 for checking throttling metrics." lightbox="media/capacity-troubleshoot/flowchart-stage-2-throttling.png":::

> [!NOTE]
> In this diagram, two possible END points indicate cases where throttling isn't causing the issue: step 13 = no throttling observed, step 16 = throttling happened but at a different time. If throttling **did** occur at the time of slowness (yes at step 15), we drill into the **Timepoint detail** report in step 17 to continue the investigation in Stage 3.

The following table explains the steps in Stage 2:

| Step | Description / Action | Explanation |
|------|---------------------|-------------|
| **11** | *(From Stage 1: we found CU% > 100%)*. Now, switch to the **Throttling** tab of the Metrics app report. Check the charts for **Interactive Delay**, **Interactive Rejection**, and **Background Rejection**. | The [**Throttling**](metrics-app-compute-page.md#throttling) tab shows if any requests were delayed or dropped due to capacity limits. [*Interactive*](fabric-operations.md#interactive-operations) refers to user-triggered operations (like queries, report loads) and [*background*](fabric-operations.md#background-operations) refers to longer running operations (like data refreshes). There are typically three line charts:<br><br>- **Interactive Delay** (%): when interactive operations (user-triggered) were delayed (queued).<br>- **Interactive Rejection** (%): when interactive operations were denied (errors).<br>- **Background Rejection** (%): when background operations (like refreshes) were denied.<br>Each chart has a 100% reference line; values above that indicate throttling occurred. Focus on the chart relevant to the operation type: if the slowness happened during a user’s report or query, check interactive; if it was a background operation (like a scheduled refresh), check background. We need to see if any of these charts went beyond their thresholds (meaning throttling occurred). |
| **12 (DECISION)** | **Decision**: Do any of the throttling charts show lines **above 100%** around the time of interest? (that is, is there any significant interactive delay, interactive rejection, or background rejection?) | **If no**: none of the charts indicate throttling events. If yes - one or more charts indicate that [throttling](throttling.md) took place (the capacity was so overused that some operations were delayed or dropped). |
| **13 (END)** | **If no**: No throttling was recorded on the capacity. **Conclude that capacity throttling was not the cause of the slowness**. *End of analysis*. | This means the capacity, while it went over 100% briefly, didn't actually throttle any requests. The user’s slowness wasn’t due to throttling (perhaps the report was slow for other reasons). You can stop investigating throttling at this point and focus on other reasons of slowness not related to capacity. |
| **14** | **If yes**: Throttling **did** occur. Identify which charts show activity: was it **interactive delay**, **interactive rejection**, or **background rejection** (or a combination)? | Determining the type of [throttling](metrics-app-compute-page.md#throttling) tells us what was affected. For example, a high **interactive delay** line means interactive operations were being queued (delayed) due to overload. **Interactive rejection** means interactive requests were refused (some user actions failed). **Background rejection** means background tasks, for example, dataset (semantic model) refreshes were canceled due to high load. Depending on workload [throttling behavior](throttling.md#throttling-behavior-is-specific-to-fabric-workloads) could be different. |
| **15 (DECISION)** | **Decision**: Does the **timing of the throttling** (from those charts) align with the **exact time the user experienced slowness** (from step 1)? | In other words, were the delays/rejections happening at the same moment the user reported the issue? **If yes**: the throttling event corresponds to the user’s experience. **If no**: the capacity was throttled at some point, but not exactly when the user had trouble (the user’s issue might be unrelated to the throttle event). |
| **16 (END)** | **If no**: The throttling events found don't match the user’s slowness timeframe. **Conclude that throttling was likely not the cause of this specific slowness incident**. *End of analysis*. | It’s possible to have had throttling on the capacity at a different time that didn't affect this user. Since the user’s slow report happened at a time when throttling wasn’t occurring, you should look for other causes of slowness (outside this guide’s scope). |
| **17** | **If yes**: The throttling event does coincide with the user’s slowness. Now, check the **Items (1 day)** matrix table, ordered by **CU (s)**, at the bottom of the **Compute** page, to find top CU consuming workspaces and items. | The [matrix by item](metrics-app-compute-page.md#matrix-by-item-and-operation) table named as **Items (1 day)** at the bottom of the **Compute** page shows items ordered by **CU (s)** consumption descending. *The top items on the table are the most resource consuming items.* Hover on the item to find operation level details for that item. This helps you understand which operation on that item is taking most CUs. In most cases these are the same items you might see in the timepoint drill for that time. *This could be a good starting point for optimization.* Use this information including item name, workspace, item kind, operation type of the top CU consuming items to work with appropriate persona (analytics engineer or data engineer or report developer, and so on) to further fine tune those items.|
|**Next stage** | Optionally to know more about the specific timepoint. Now, select the specific **timepoint** (spike) in the **CU%** chart where the line crossed 100%. Then select the **Explore** (drill-through) button to open the **Timepoint detail** report for that 30-second interval.|Optionally to know further details on specific timepoint, we now dive deeper into that particular time slice to find out what caused the overload. The [**Timepoint detail**](metrics-app-timepoint-page.md) page shows all operations (interactive and background) that were running in that 30-second window, ranked by their impact on the capacity. This allows us to find which operations consumed the most capacity and triggered the overload/throttling. This is the hand-off to Stage 3 of the troubleshooting process.<br>(At this point, we have confirmed that capacity throttling occurred at the time of the user’s issue. Next, we investigate the detailed data to find the root cause.) |

At this point, we confirmed that capacity throttling occurred at the time of the user's issue. Next, we investigate the detailed data to find the root cause.

## Stage 3: Identify the workspace, operations, and items causing throttling

In the previous stage, you use the [matrix by item](metrics-app-compute-page.md#matrix-by-item-and-operation) (also called **Items**) table on the **Compute** page to find enough details to identify the workspace, operations, and items that might cause throttling. To learn more about a specific timepoint, in this final stage (steps 18 - 22), analyze the **Timepoint detail** report (for the throttled interval) to pinpoint which workspace and item cause the capacity overload. The goal is to identify the specific semantic model, report, or operation that uses excessive resources, so you can address it (for example, optimize the item or scale up the capacity).

The following flowchart illustrates Stage 3 (steps 18-22), analyzing the **Timepoint detail** report to find the top-consuming operations and items:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-3-throttling.png" alt-text="Screenshot of the flowchart showing steps 18-22 for analyzing timepoint details." lightbox="media/capacity-troubleshoot/flowchart-stage-3-throttling.png":::

> [!NOTE]
> This flow is linear - no decision diamonds - because you're just gathering information. Step 22 ends the troubleshooting process and identifies the culprit items.

The following table explains the steps in Stage 3:

| Step | Description / Action | Explanation |
|------|---------------------|-------------|
| **18** | In the **Timepoint detail** report, first check the **Start time** and **End time** of the interval you're examining (at the top of the report). Then look at the **CU % over time** line chart on this page, and note the highlighted spike and the overall trend around it. | Looking at the [top row visuals](metrics-app-timepoint-page.md#top-row-visuals) confirms you're analyzing the correct time window (for example, a specific 30-second interval when throttling occurs). The report typically shows the interval you're inspecting (for example, "Start: 3:05:00 PM, End: 3:05:30 PM"). There's also a small line chart showing about 30 minutes before and after the selected point, with a marker or vertical line at the exact timepoint. This context is useful because it shows how quickly the capacity consumption spikes and drops. For example, you can see if this is an isolated spike or part of a prolonged high usage period. (If it's prolonged, you might have multiple timepoints to examine.) |
| **19** | Check the two tables on the **Timepoint detail** report: **Interactive operations for time range** and **Background operations for time range**. For each table, sort by the **Timepoint CU (s)** column in **descending order** (if not already sorted). | The [interactive operations for timerange](metrics-app-timepoint-page.md#interactive-operations-for-timerange) and [background operation for timerange](metrics-app-timepoint-page.md#background-operations-for-timerange) tables list all the operations in that interval, split by [interactive operations](fabric-operations.md#interactive-operations) and [background operations](fabric-operations.md#background-operations). Sorting by **Timepoint CU (s)** brings the most resource-intensive operations to the top. Timepoint CU (s) shows how many CUs that operation uses in the 30-second time slice. After sorting, look at the top few entries in each table. You find the "heaviest" operations during the throttling window. |
| **20** | Look at the top entries in each table, specifically their **% of base capacity** values. Find the highest percentages in either table. | The **% of base capacity** shows how much of the capacity's total resources that operation uses (relative to the capacity's normal full capacity). For example, 150% means it uses 1.5 times the capacity's base resources (which is an overload), and 300% is three times (a huge overload). High values confirm those operations are the main contributors to throttling. See the [Fabric throttling policy](throttling.md) to learn more about throttling. |
| **21** | Check which category of operations dominates the capacity: **interactive** or **background**. In other words, see whether the top usage comes from interactive operations (user-driven) or background operations. | This distinction shows you the type of load causing the issue. For example, you might find that an interactive query uses 180% on its own, while background tasks are all under 50% - showing an interactive operation causes the spike. Or the opposite: a background operation (like a semantic model refresh or Spark job) might use 300%, more than interactive usage. This distinction shows you what type of workload to focus on. If the highest load comes from an interactive operation, it might be a heavy report query started by a user. If it comes from background, it could be a semantic model refresh, Spark job, warehouse queries, or an automated process. This helps you decide your next steps (who to follow up with, what to optimize). If throttling is happening now, use these [strategies to stop throttling](throttling.md#how-to-stop-throttling-when-it-occurs). |
| **22 (END)** | **Capture the details** of the high CU consuming item for further action: note the **workspace name**, the type of item (for example, **dataset, dataflow, report**), and the **item name** of the top contributor to the overload (from step 19/20). These are the likely causes of the slowness. *End of analysis*. | Now you know what causes the capacity throttling and the report slowness. For example, you might find that "Workspace A - Dataset (semantic model) X" uses 250% of capacity. With this information, focus on that workspace and item to troubleshoot further: optimize the semantic model (or report), adjust its schedule, or consider scaling up capacity or moving the workload to a different capacity. To stop throttling faster, use the strategies in [How to stop throttling when it occurs](throttling.md#how-to-stop-throttling-when-it-occurs). The troubleshooting guide ends here, as the objective of finding the cause is achieved. Next, engage the workspace owner or take action on the item identified to prevent future issues. |

## Conclusion

Follow this guide to methodically check if report slowness is caused by capacity throttling, and if so, which operations and items are responsible. With this information, admins and developers can take targeted actions to fix the performance issue, like optimizing queries or increasing capacity, and improve the experience for end users.

## Related content

- [Troubleshooting guide: Monitor and identify capacity usage](capacity-planning-troubleshoot-consumption.md)
- [Troubleshooting guide: Diagnose and resolve "Capacity limit exceeded" errors](capacity-planning-troubleshoot-errors.md)
- [Microsoft Fabric Capacity Metrics app](metrics-app.md)
