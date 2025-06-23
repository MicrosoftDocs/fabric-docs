---
title: Troubleshooting guide - Determine source of report slowness
description: This guide helps Microsoft Fabric Capacity Administrators diagnose and resolve issues related to report slowness suspected to be caused by capacity throttling.
author: JulCsc
ms.author: juliacawthra
ms.reviewer: cnovak
ms.topic: troubleshooting
ms.custom:
ms.date: 06/23/2025
---

# Troubleshooting guide: Determine source of report slowness

This guide is intended for **Microsoft Fabric Capacity administrators** to help determine the source of report slowness when the user suspects it might be caused by **capacity throttling**. This page provides a systematic approach to confirm whether capacity throttling is the cause of the slowness and, if so, to identify the specific workspace and item responsible for the overload.

## Scenario

Users are experiencing slowness in their Power BI report and suspect that **capacity throttling** is the cause (that is, the capacity running the report was overloaded, leading to delays or rejections of operations). This guide provides a step-by-step process to determine if capacity throttling is responsible for the slowness and to identify the offending workload or item.

## Prerequisites

Find and note the **workspace name** and **capacity name** where the user experienced slowness, and the **exact time** the slowness occurred. This information is used to filter and analyze the correct capacity metrics. Documenting the timeframe of the issue is crucial for pinpointing relevant data in the Metrics app.

The Microsoft Fabric Capacity Metrics app is designed to provide monitoring capabilities for Microsoft Fabric capacities. Use the app to monitor your capacity consumption and make informed decisions on how to use your capacity resources. Administrator should use the latest version of [Microsoft Fabric Capacity Metrics app](metrics-app-install.md). For more information on how to use Microsoft Fabric Capacity Metrics app, see [Metrics app](metrics-app.md).

For this troubleshooting, the **Compute** and **Timepoint** pages of the Capacity Metrics app are used. For better understanding and navigation, it would be helpful for the administrators to [Understand the Metrics app compute page](metrics-app-compute-page.md) and [Understand the Metrics app timepoint page](metrics-app-timepoint-page.md).

## Overview of troubleshooting stages

To troubleshoot report slowness suspected to be caused by capacity throttling, we follow a three-step process that involves checking the capacity utilization, identifying if throttling occurred, and then drilling down to find the specific workspace and item that caused the overload. The process is visualized in the following flowchart:

:::image type="content" source="media/capacity-troubleshoot/flowchart-high-level-throttling.png" alt-text="High-level flowchart showing the three stages of throttling troubleshooting" lightbox="media/capacity-troubleshoot/flowchart-high-level-throttling.png":::

| Stage | Action | Description |
|-------|--------|-------------|
| **1** | **Identify if the capacity was overutilized** | Determine if the capacity utilization (the **Capacity units [CUs] % over time** metric) exceeded 100% during the period of slowness. |
| **2** | **Identify if throttling occurred** | If the capacity utilization was over 100%, check if throttling (Interactive Delay/Rejection or Background Rejection) was triggered over 100% at that time. |
| **3** | **Identify the specific cause** | If throttling did occur, drill through to timepoint details to find which workspace, operation, and item (for example, dataset, report) caused the overload. |

The high-level process begins by checking the capacity utilization during the user's reported slowness. If utilization never exceeded 100%, we conclude the slowness was **not** due to capacity throttling (process ends). If it did exceed 100%, we then check the throttling metrics. If no throttling occurred despite high utilization, we also conclude throttling wasn't the cause. Only if throttling *did* occur, we proceed to investigate the detailed **Timepoint Detail** report to find the specific item causing the issue, and then conclude the analysis with that information.

Each stage is detailed in the sections that follow, with a flowchart and a table explaining the steps.

> [!NOTE]
> In the flowcharts, **Start** and **End** steps are drawn as rounded rectangles, **Decision** points as diamonds (with **Yes/No** branches), and **Action** or **Process** steps as rectangles. Arrows show the progression of steps.

## Stage 1: Identify when "CU % over time" exceeds 100%

This stage covers steps 1-10 of the process, where we determine if the capacity was ever over its limit (over 100% utilization) at the time of the reported slowness. If not, the investigation ends here (the slowness isn't due to capacity throttling).

The following flowchart illustrates Stage 1 (steps 1-10), checking capacity utilization on the **Compute** page of the Capacity Metrics app and deciding if it exceeded 100%:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-1-throttling.png" alt-text="Flowchart showing steps 1-10 for checking capacity utilization" lightbox="media/capacity-troubleshoot/flowchart-stage-1-throttling.png":::

> [!NOTE]
> In this diagram, the "Yes" branch leads to the next stage of analysis. The **END** at step 10 represents concluding that capacity throttling wasn't the cause.

The following table explains the steps in Stage 1:

| Step | Description / action | Explanation |
|------|---------------------|-------------|
| **1 (START)** | Note the **workspace name**, **capacity name**, and **approximate time** when the user experienced slowness. | This information is needed to filter the metrics to the relevant capacity and timeframe. Documenting it upfront ensures you analyze the correct data. |
| **2** | Open the **Microsoft Fabric Capacity Metrics app**. | The [Capacity Metrics app](metrics-app.md) provides usage and performance data for capacities (Premium or Fabric capacities). It shows if the capacity was overloaded during the time of the issue. You need Contributor or Admin access to the capacity to view this. |
| **3** | In the Metrics app report, navigate to the **"Compute" page**. | The [Compute page](metrics-app-compute-page.md) is the main dashboard for capacity performance. It shows an overview of the capacity's usage over the last 14 days, including visuals for utilization and throttling. This page is divided into a top section with charts and a bottom section with a table of items. |
| **4** | Select the relevant **Capacity Name** from the drop-down filter. | This loads data for the specific capacity where the slowness was reported (as identified in step 1). All visuals now reflect this capacity's metrics. |
| **5** | Ensure the **Multimetric ribbon chart** (top-left) is visible and that the **"CU % over time"** line chart is displayed (under the Utilization tab on the Compute page). | The [multimetric ribbon chart](metrics-app-compute-page.md#multi-metric-ribbon-chart) lets you pick a date, and the CU % over time [utilization](metrics-app-compute-page.md#utilization) chart shows the percentage of capacity used over time. Together, these help identify if/when the capacity hit its limits. |
| **6** | Check the Y-axis of the **CU % over time** chart. If the CU% values go far above 200%, select the **Logarithmic** scale button (top-right of the chart); otherwise, use the linear scale. | A [logarithmic scale](metrics-app-compute-page.md#utilization) makes it easier to see details when there are extreme spikes (for example, 500% usage) by compressing the Y-axis. If usage is only slightly above 100%, the linear scale is sufficient. |
| **7** | Use the date from step 1 to **filter the report**: Select that date on the multimetric ribbon chart's x-axis. This filters the visuals to that specific day (24-hour period). | Focusing on the day of the incident lets you zoom into the time period of interest. The CU % chart on [utilization](metrics-app-compute-page.md#utilization) tab and other visuals now shows data only for the day the slowness occurred. |
| **8** | On the CU % over time chart, **zoom in on the timeframe of the slowness**. Adjust the time slicer (below the chart) to narrow down to the specific hour/minute window the user reported the issue. | The chart typically shows data points at 30-second intervals. By zooming into the specific timeframe, you can see exactly what the capacity usage was when the user experienced slowness. Look for any sharp peaks around that time. |
| **9 (DECISION)** | **Decision:** Does the **CU % over time** line chart show the utilization going **above 100%** (the capacity limit) during the slowness period? | If **No** - the utilization stayed at or below 100%. The capacity wasn't over capacity. If **Yes** - the utilization exceeded 100%, meaning the capacity was overburdened at that moment. |
| **10 (END)** | **If No:** Since the capacity never went over 100% during that time, **capacity throttling was not the cause** of the slowness. *End of analysis.* | If the capacity wasn't fully utilized, the platform didn't need to throttle any operations. The user's slowness must have another cause (perhaps a slow query, a large data load, network latency, etc.). You can stop the capacity-based investigation here. |

If step 9 was "Yes" (capacity > 100%), proceed to the next section to investigate throttling.

## Stage 2: Identify if and when throttling occurred

If the capacity utilization exceeded 100%, this stage (steps 11-17) checks whether **throttling** occurred and impacted users at that time. We look at the throttling metrics (Interactive Delay/Rejection and Background Rejection) and determine if they were triggered, and if so, whether it coincides with the user's slowness.

The following flowchart illustrates Stage 2 (steps 11-17), checking throttling indicators on the **Throttling** tab and drilling to detail if needed:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-2-throttling.png" alt-text="Flowchart showing steps 11-17 for checking throttling metrics" lightbox="media/capacity-troubleshoot/flowchart-stage-2-throttling.png":::

> [!NOTE]
> In this diagram, two possible END points indicate cases where throttling isn't causing the issue: step 13 = no throttling observed, step 16 = throttling happened but at a different time. If throttling **did** occur at the time of slowness (Yes at step 15), we drill into the **Timepoint Detail** report in step 17 to continue the investigation in Stage 3.

The following table explains the steps in Stage 2:

| Step | Description / action | Explanation |
|------|---------------------|-------------|
| **11** | *(From Stage 1: we found CU% > 100%)*. Now, switch to the **Throttling** tab of the Capacity Metrics app report. Check the charts for **Interactive Delay**, **Interactive Rejection**, and **Background Rejection**. | The [Throttling](metrics-app-compute-page.md#throttling) tab shows if any requests were delayed or dropped due to capacity limits. [*Interactive*](fabric-operations.md#interactive-operations) refers to user-triggered operations (like queries, report loads) and [*Background*](fabric-operations.md#background-operations) refers to nonuser operations (like data refreshes). There are typically three line charts:<br>- **Interactive Delay** (%): when interactive operations (user-triggered) were delayed (queued).<br>- **Interactive Rejection** (%): when interactive operations were denied (errors).<br>- **Background Rejection** (%): when background operations (like refreshes) were denied.<br>Each chart has a 100% reference line; values above the line indicate throttling occurred. Focus on the chart relevant to the operation type: if the slowness happened during a user's report or query, check interactive; if it was a background job (like a scheduled refresh), check background. We need to see if any of these charts went beyond their thresholds (meaning throttling occurred). |
| **12 (DECISION)** | **Decision:** Do any of the throttling charts show lines **above 100%** around the time of interest? (that is, is there any significant Interactive Delay, Interactive Rejection, or Background Rejection?) | If **No** - none of the charts indicate throttling events. If **Yes** - one or more charts indicate that [throttling](throttling.md) took place (the capacity was so overused that some operations were delayed or dropped). |
| **13 (END)** | **If No:** No throttling was recorded on the capacity. **Conclude that capacity throttling was not the cause** of the slowness. *End of analysis.* | This means the capacity, while it went over 100% briefly, didn't actually throttle any requests. The user's slowness wasn't due to throttling (perhaps the report was slow for other reasons). You can stop investigating throttling at this point and focus on other reasons of slowness not related to capacity. |
| **14** | **If Yes:** Throttling **did** occur. Identify which charts show activity: was it **Interactive Delay**, **Interactive Rejection**, or **Background Rejection** (or a combination)? | Determining the type of [throttling](metrics-app-compute-page.md#throttling) tells us what was affected. For example, a high **Interactive Delay** line means interactive operations were being queued (delayed) due to overload. **Interactive Rejection** means interactive requests were refused (some user actions failed). **Background Rejection** means background tasks (like dataset refreshes) were canceled due to high load. Depending on workload [throttling behavior](throttling.md#throttling-behavior-is-specific-to-fabric-workloads) could be different. |
| **15 (DECISION)** | **Decision:** Does the **timing of the throttling** (from those charts) align with the **exact time the user experienced slowness** (from step 1)? | In other words, were the delays/rejections happening at the same moment the user reported the issue? If **Yes** - the throttling event corresponds to the user's experience. If **No** - the capacity was throttled at some point, but not exactly when the user had trouble (the user's issue might be unrelated to the throttle event). |
| **16 (END)** | **If No:** The throttling events found do **not** match the user's slowness timeframe. **Conclude that throttling was likely not the cause** of this specific slowness incident. *End of analysis.* | It's possible to have throttling on the capacity at a different time that didn't affect this user. Since the user's slow report happened at a time when throttling wasn't occurring, you should look for other causes of slowness (outside this guide's scope). |
| **17** | **If Yes:** The throttling event *does* coincide with the user's slowness. Now, select the specific **timepoint** (spike) in the CU% chart where the line crossed 100%. Then select the **Explore** (drill-through) button to open the **Timepoint Detail** report for that 30-second interval. | We now dive deeper into that particular time slice to find out *what* caused the overload. The [**Timepoint Detail**](metrics-app-timepoint-page.md) page shows all operations (interactive and background) that were running in that 30-second window, ranked by their impact on the capacity. This allows us to find which operations consumed the most capacity and triggered the overload/throttling. This is the hand-off to Stage 3 of the troubleshooting process. |

At this point, we confirmed that capacity throttling occurred at the time of the user's issue. Next, we investigate the detailed data to find the root cause.

## Stage 3: Identify the workspace, operations, and items causing throttling

In this final stage (steps 18-22), we analyze the **Timepoint Detail** report (for the throttled interval) to pinpoint which workspace and item caused the capacity overload. The goal is to identify the specific dataset, report, or operation that consumed excessive resources, so that we can address it (for example, optimize the item or scale up the capacity).

The following flowchart illustrates Stage 3 (steps 18-22), analyzing the **Timepoint Detail** report to find the top-consuming operations and items:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-3-throttling.png" alt-text="Flowchart showing steps 18-22 for analyzing timepoint details" lightbox="media/capacity-troubleshoot/flowchart-stage-3-throttling.png":::

> [!NOTE]
> This flow is linear: no decision diamonds, because we're simply gathering information. The final step 22 is the end of the troubleshooting process, yielding the culprit items.

The following table explains the steps in Stage 3:

| Step | Description / action | Explanation |
|------|---------------------|-------------|
| **18** | In the **Timepoint Detail** report, first confirm the **Start Time** and **End Time** of the interval you're examining (at the top of the report). Then look at the **CU % over time** line chart on this page, noting the highlighted spike and the overall trend around it. | Looking at the [Top Row Visuals](metrics-app-timepoint-page.md#top-row-visuals) confirms you're analyzing the correct time window (for example, a specific 30-second interval when throttling occurred). typically shows the interval you're inspecting (for example, "Start: 3:05:00 PM, End: 3:05:30 PM"). There's also a small line chart showing about 30 minutes before and after the selected point, with a marker or vertical line at the exact timepoint. This context is useful: it shows how quickly the capacity consumption spiked and dropped. For instance, you can tell if this was an isolated spike or part of a prolonged high usage period. (If it was prolonged, you might have multiple timepoints to examine.) |
| **19** | Examine the two tables on the **Timepoint Detail** report: **"Interactive operations for time range"** and **"Background operations for time range."** For each table, **sort by the "Timepoint CU (s)" column in descending order** (if not already sorted). | The [Interactive operations for timerange](metrics-app-timepoint-page.md#interactive-operations-for-timerange) and [Background operation for timerange](metrics-app-timepoint-page.md#background-operations-for-timerange) tables list all the operations in that interval, split by [interactive operations](fabric-operations.md#interactive-operations) and [background operations](fabric-operations.md#background-operations) respectively. Sorting by **Timepoint CU (s)** brings the most resource-intensive operations to the top. (**Timepoint CUs** represents how many CUs that operation consumed in the 30-second time slice). After sorting, look at the top few entries in each table. Essentially, you find the "heaviest" operations during the throttling window. |
| **20** | Look at the top entries in each table, specifically their **"% of base capacity"** values. Identify the highest percentages in either table. | The **% of base capacity** indicates how much of the capacity's total resources that operation used (relative to the capacity's normal full capacity). For example, 150% means it used 1.5 times the capacity's base resources (which is an overload), and 300% would be three times (a huge overload). High values confirm those operations were the major contributors to the throttling. Refer [The Fabric Throttling Policy](throttling.md) to understand throttling in more details. |
| **21** | Determine which category of operations dominated the capacity: **Interactive or Background?** In other words, see whether the top usage came from interactive operations (user-driven) or background operations. | This distinction tells you the nature of the load causing the issue. For instance, you might find that an interactive query used 180% on its own, while background tasks were all under 50% - indicating an interactive operation caused the spike. Or vice versa: a background job (like a dataset refresh or Spark job) might consume 300%, dwarfing the interactive usage. This distinction tells you **what type of workload** to focus on. If the highest load came from an interactive operation, it might be a heavy report query initiated by a user. If it came from background, it could be things like a dataset refresh, spark job, Warehouse Queries, or an automated process. This helps direct your next steps (who to follow up with, what to optimize). If throttling occurs, you can use these [strategies to stop throttling](throttling.md#how-to-stop-throttling-when-it-occurs). |
| **22 (END)** | **Capture the details** of the offending items for further action: note the **Workspace name**, the type of item (for example, **Dataset**, **Dataflow**, **Report**), and the **Item Name** of the top contributors to the overload (from step 19/20). These are the likely culprits of the slowness. **End of analysis.** | Now you have identified what caused the capacity throttling and thus the report slowness. For example, you might find that "Workspace A - Dataset X" consumed 250% of capacity. With this information, you can focus on that workspace and item to troubleshoot further: perhaps optimize the dataset (or report), adjust its schedule, or consider scaling up capacity or moving the workload to a different capacity. To stop throttling faster, you can use the strategies listed in ["How to stop throttling when it occurs"](throttling.md#how-to-stop-throttling-when-it-occurs). The troubleshooting guide ends here, as the objective of pinpointing the cause is achieved. The next step would be to engage the workspace owners or take action on the item identified to prevent future occurrences. |

## Conclusion

By following this guide, you can methodically determine whether report slowness is caused by capacity throttling, and if so, exactly which operations and items are responsible. Armed with this information, administrators and developers can take targeted actions to resolve the performance issue (such as optimizing queries or increasing capacity), thereby improving the experience for end users.

## Related content

- [Troubleshooting guide: Monitor and identify capacity usage](capacity-planning-troubleshoot-consumption.md)
- [Troubleshooting guide: Diagnose and resolve "Capacity limit exceeded" errors](capacity-planning-troubleshoot-errors.md)
- [Microsoft Fabric Capacity Metrics app](metrics-app.md)
