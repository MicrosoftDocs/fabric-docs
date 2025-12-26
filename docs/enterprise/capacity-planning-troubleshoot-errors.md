---
title: Troubleshooting guide - Diagnose and resolve "capacity limit exceeded" errors
description: Troubleshoot and resolve capacity limit exceeded errors in Microsoft Fabric by confirming overload, checking throttling, and identifying the affected workspace and item. Learn how to prevent future errors - read the full guide. 
author: JulCsc 
ms.author: juliacawthra
ms.reviewer: cnovak 
ms.topic: troubleshooting 
ms.custom: 
ms.date: 07/10/2025 
---

# Troubleshooting guide: Diagnose and resolve "capacity limit exceeded" errors

This guide helps **Microsoft Fabric capacity administrators** diagnose and fix capacity limit exceeded errors. Learn how to spot overloads, check for throttling, and find the workspace or item causing the issue.

## Scenario

If you're running background or interactive operations in Microsoft Fabric, you might see one of these error messages when the capacity is overloaded:

- "Status code: `CapacityLimitExceeded`"
- "Your organization's Fabric compute capacity has **exceeded its limits**. Try again later."
- "Cannot load model due to **reaching capacity limits**."

If you see one of these errors, it means Fabric capacity is overloaded. The platform moves to a rejection phase - the next step after throttling - to protect the system. At that moment, there aren't enough resources, so your operation is rejected. For more information, see [Introducing job queueing for notebooks in Microsoft Fabric](https://blog.fabric.microsoft.com/blog/introducing-job-queueing-for-notebook-in-microsoft-fabric?ft=All).

To troubleshoot these errors, use the **Microsoft Fabric Capacity Metrics app** to check when the capacity was overloaded and which workspace or item caused it. This article shows you how to confirm the overload timing, check for throttling, and find the specific item that exceeded capacity.

## Prerequisites

Before troubleshooting, gather this information:

- **Workspace name**
- **Capacity name**
- **Time of the error** (when the user saw the message)

This information helps you filter and analyze the correct capacity metrics.

> [!NOTE]
> If the failing item depends on another workspace (for example, a report in workspace A uses a dataset (semantic model) in workspace B on a different capacity), you might need to check the other capacity for the same timeframe. For example, if a report on capacity 1 queries a dataset (semantic model) on capacity 2, check both capacities.

Make sure you're using the latest version of the [Microsoft Fabric Capacity Metrics app](metrics-app-install.md). To learn more, see [Metrics app documentation](metrics-app.md).

Review these pages in the Metrics app:

- [Understand the Metrics app **Compute** page](metrics-app-compute-page.md)
- [Understand the Metrics app **Timepoint** page](metrics-app-timepoint-page.md)

## Overview of troubleshooting stages for capacity limit exceeded errors

To troubleshoot "capacity limit exceeded" errors, follow a three-stage process that confirms the overload, checks for throttling, and identifies the specific workspace and item causing the issue. Here are the stages:

:::image type="content" source="media/capacity-troubleshoot/flowchart-high-level-errors.png" alt-text="Screenshot of high-level troubleshooting flowchart for capacity limit exceeded errors." lightbox="media/capacity-troubleshoot/flowchart-high-level-errors.png":::

| Stage | Action | Description |
|-------|--------|-------------|
| **1** | **Confirm the capacity was overloaded at the error time** | Check if the capacity was overloaded when the error occurred by using the **Compute** page of the  Metrics app to look at system events and utilization charts. |
| **2** | **Check if throttling occurred during the overload** | Check if the capacity overload triggered throttling (delayed or rejected operations) by inspecting the **Throttling** tab in the Metrics app. |
| **3** | **Identify the specific workspace and item causing the overload** | Find the operations causing the overload by using the **Timepoint detail** page to identify the workspace and item responsible. |

Each stage is explained in the following sections, with a flowchart and a table that show the steps.

> [!NOTE]
> In the flowcharts, **Start** and **End** steps are drawn as rounded rectangles, **Decision** points as diamonds (with **Yes/No** branches), and **Action** or **Process** steps as rectangles. Arrows show the progression of steps.

## Stage 1: Confirm the capacity was overloaded at the error time

In this stage, verify whether the capacity was in an overloaded state when the user's error occurred. Use the **Compute** page of the Metrics app to look at system events and utilization charts.

The following flowchart shows stage 1 (steps 1-10) and confirms the capacity overload:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-1-errors.png" alt-text="Screenshot showing the Stage 1 troubleshooting flowchart to confirm capacity overload." lightbox="media/capacity-troubleshoot/flowchart-stage-1-errors.png":::

The following table outlines the steps for stage 1:

| Step | Description or action | Explanation |
|------|--------|-------------|
| **1** | Identify the **workspace** and **capacity** in question, and the **approximate time** the error occurred. | Having the workspace name and the time of the error is crucial. Use this information to filter the metrics to the right capacity and timeframe. Make sure you know which capacity the workspace is on. If you're unsure, check the workspace settings in the Fabric admin portal. |
| **2** | Open the **Microsoft Fabric Capacity Metrics** app. | The [**Microsoft Fabric Capacity Metrics** app](metrics-app.md) is a Power BI app for monitoring Fabric capacities. It shows detailed consumption and performance metrics for your capacities, helping admins monitor usage and make informed decisions, like when to scale up or enable autoscale. |
| **3** | In the Metrics app, go to the **Compute** page. | The [**Compute** page](metrics-app-compute-page.md) is the main dashboard for capacity performance. It shows an overview of the capacity’s usage over the last 14 days, including visuals for utilization and throttling. This page has a top section with charts and a bottom section with a table of items. |
| **4** | Select the **Capacity name** from the drop-down at the top.| The app can show data for multiple capacities if you administer more than one. Use the capacity selector field at the top to choose the capacity where the error was reported. All the visuals on the page then load data for that capacity. |
| **5** | On the **Compute** page, make sure the **CU** tab on the **Multimetric ribbon** chart (top-left visual) is displayed, and select the **System events** tab on the top-right visual (to show the system events table). | The [**Multimetric ribbon** chart](metrics-app-compute-page.md#multimetric-ribbon-chart) (top-left) shows daily capacity usage. Use it to drill down to the hour of the incident within a day. The **System events** table, accessible from a tab on the top-right visual, lists important capacity events. In system events, you see when the capacity’s state changed - for example, from active to overloaded and back. This table shows the **Time** of the event, the **Capacity state**, and the **Reason** for the state change. Make sure it’s visible so you can check any overload entries. |
| **6** | In the **Multimetric ribbon** chart, **select the date** when the error occurred. | The [**Multimetric ribbon** chart](metrics-app-compute-page.md#multimetric-ribbon-chart)** groups usage by day. Selecting the date of the incident filters all visuals to that specific day. This zooms in so the **Utilization** chart and the system events table show data just for that day. |
| **7** | Check the **System events** table for any events where the **Capacity state** changed to **Overloaded** with either `AllRejected`, `InteractiveDelay`, or `InteractiveRejected` as a reason and later back to **Active** with `NotOverloaded` as a reason on that date. | Look for an entry in the log that shows an overload. For example, you might see: <br>- **State**: Overloaded (with a reason like `InteractiveDelay`, `InteractiveRejected`, or `AllRejected`), at a certain time. <br>- **State**: Active (`NotOverloaded`), at a later time.<br><br>These paired events in the **System events** table show the capacity went into overload and then returned to normal. The table might show reasons such as `InteractiveDelay`, `InteractiveRejected`, or `AllRejected`, which indicate what kind of throttling was happening. You use these in troubleshooting stage 2. There's a fourth reason, `SurgeProtection`. In this case, the failure is because the surge protection thresholds are in effect. |
| **8** | **Capture the timeframe** of any overload event found: note the time it went into **Overloaded** and the time it returned to **Active.** | This gives the duration of the overload. For example, the log might show overloaded at 3:05:00 PM and active at 3:07:30 PM, so the capacity was overloaded for about 2.5 minutes in that incident. During that window, errors like "capacity limit exceeded" can occur. |
| **9 (Decision)** | Does the overload timing align with the user’s error time? | Compare the time from the system events (step 7-8) with the exact error time the user reported (step 1). If the user’s error happened during the logged overload period, select **Yes**. If the user’s error time doesn't match any overload window (for example, the user error was at 4 PM but the only overload was at 1 PM), select **No**. |
| **10 (End)** | **If no (no matching overload)**: Conclude that this capacity’s overload isn't the cause of the user’s error. **End the troubleshooting for this capacity.** If there are other related capacities involved, follow all steps for that capacity. | In this case, the capacity was never over 100% at the time of the error - it stayed "active/`NotOverloaded`". The error likely starts elsewhere. It can be due to a different capacity (see the cross-capacity note in prerequisites) or another issue. You might need to check another capacity or consider noncapacity causes. |

## Stage 2: Check if throttling occurred during the overload

In this stage, we determine whether the capacity overload triggered **throttling** (that is, delayed or rejected operations), and whether the throttling corresponds to the user’s error. Microsoft Fabric has separate throttling metrics for **interactive operations** (user-driven actions like running a query or loading a report) and **background operations** (longer running operations like semantic model refreshes). We use the **Throttling** tab in the Metrics app to inspect these metrics.

If we find no throttling (no delays or rejections), then the user’s error might not have been due to throttling (perhaps the error was unrelated, or the system didn’t actually drop any requests). If we do see throttling events, we note which type (interactive delay/rejection vs. background rejection) and ensure it lines up with the error timeframe.

The following flowchart illustrates stage 2 (steps 11-17), checking for throttling:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-2-errors.png" alt-text="Screenshot showing the Stage 2 troubleshooting flowchart to check for throttling." lightbox="media/capacity-troubleshoot/flowchart-stage-2-errors.png":::

The following table outlines the steps for stage 2:

| Step | Description / action | Explanation |
|------|--------|-------------|
| **11** | In the Metrics app, switch to the **Throttling** tab (on the **Compute** page). Examine the charts for **Interactive delay,** interactive rejection, and **background rejection.** Consider whether the user’s operation was interactive or background. | The [**Throttling** tab](metrics-app-compute-page.md#throttling) shows if and when the capacity enforced delays or rejections due to overload. [*Interactive*](fabric-operations.md#interactive-operations) refers to user-triggered operations (like queries, report loads). [*Background*](fabric-operations.md#background-operations) refers to nonuser operations (like data refreshes). There are typically three line charts: <br>- **Interactive delay** (%): when interactive operations (user-triggered) were delayed (queued). <br>- **Interactive rejection** (%): when interactive operations were denied (errors). <br>- **Background rejection** (%): when background operations (like refreshes) were denied. <br><br>Each chart has a 100% reference line; values above that indicate throttling occurred. Focus on the chart relevant to the operation type: if the error happened during a user’s report or query, check interactive; if it was a background operation (like a scheduled refresh), check background. |
| **12 (Decision)** | **Are any of the throttling charts showing values above 100% around the error time?** | Look at the time of interest on these charts (they're time-filtered to the date from **stage 1**). If **none** of the lines/spikes go above the 100% threshold, choose **No** - meaning the capacity didn't actually throttle activity at that time. If **yes** (one or more charts have a spike over 100%), choose **Yes** - this indicates that the capacity’s consumption exceeded the limit enough to trigger [throttling](throttling.md) in that category. (Tip: You can hover on the charts to see exact values and timestamps. A value over 100% implies the system engaged the throttling policy for that moment.) |
| **13 (End)** | **If no**: No throttling was recorded during the overload for this capacity. **Check other capacity for throttling error**: If there are other related capacities involved, follow all steps for that capacity. | This means that although the capacity was overloaded, the system didn't delay or reject any operations. The troubleshooting for throttling on this capacity ends here. The error likely originates elsewhere. It could be due to a different capacity (see the cross-capacity note in prerequisites) or another issue. |
| **14** | **If yes**: Throttling **did** occur. Identify **which charts** went above 100%: interactive delay, interactive rejection, and/or background rejection. | Determine what type of throttling happened: <br>- **Interactive delay** - the capacity queued interactive requests (users might have experienced slow responses). <br>- **Interactive rejection** - the capacity outright refused some interactive requests (users got errors). <br>- **Background rejection** - the capacity canceled/did not run some background tasks (for example, refreshes were dropped). <br><br>Knowing this helps you understand the nature of the error. For example, if the user error was during a report load and you see interactive rejections, that aligns directly (an interactive request was rejected). Depending on workload [throttling behavior](throttling.md#throttling-behavior-is-specific-to-fabric-workloads) could be different. |
| **15 (Decision)** | Does the timing of the throttling event align with the user’s error time? | This is a sanity check. The chart spike should correspond exactly to when the user got the error. If the timing is off (for example, throttling occurred at 10:00 but the user error was at 10:30), choose **No** - it might be a coincidence, and their error might be unrelated to this particular throttle event. If the times match (the throttling was happening at that moment), choose **Yes**. |
| **16 (End)** | If no: **The throttling detected does not match the user’s error timing.** Conclude that this throttling event likely didn’t cause the user’s error. | In this case, even though throttling occurred on the capacity, it wasn’t at the same time as the user’s operation. Possibly the user’s error lies elsewhere (or on another capacity). You might need to investigate other time periods or components for the cause. |
| **17** | If yes: **The throttling event** does **coincide with the user’s slowness. Now, check the** Items (1 day) **matrix table, ordered by** CU (s), at the bottom of the **Compute** page, to find top CU consuming workspaces and items. | The [**Matrix by item**](metrics-app-compute-page.md#matrix-by-item-and-operation) table named as **Items (1 day)** at the bottom of the [**Compute** page](metrics-app-compute-page.md) shows items ordered by capacity unit - **CU (s)** consumption descending. **The top items on the table are the most resource consuming items.** Hover on the item to find operation level details for that item. This helps you understand which operation on that item is taking most CUs. In most cases these are the same items you might see in the timepoint drill for that time. **This could be good starting point for optimization.** Use this information including item name, workspace, item kind, operation type of the top CU consuming items to work with appropriate persona (analytics engineer or data engineer or report developer, and so on) to further fine tune those items. |
| **Next stage** | Optionally to know more about the specific timepoint. Now, select the specific timepoint (spike) in the **Utilization** chart where the overload/throttling occurred, and select **Explore** (the drill-through button). This opens the **Timepoint detail** report for that 30-second interval. | Optionally to know further details on specific timepoint, this step drills into a detailed view for the exact moment of overload. By selecting the timepoint and using **Explore**, the Metrics app takes you to the **Timepoint detail** page focused on that interval. The [**Timepoint detail** page](metrics-app-timepoint-page.md) shows all operations (interactive and background) that were running in that 30-second window, ranked by their impact on the capacity. This allows us to find which operations consumed the most capacity and triggered the overload/throttling. This is the hand-off to stage 3 of the troubleshooting process. |

At this point we have confirmed that the user’s error was caused by capacity throttling. Next, we need to determine **what** exactly caused it: which workspace and item were consuming so much resource.

## Stage 3: Identify the workspace and item causing the overload

In the previous stage, the [**Matrix by item**](metrics-app-compute-page.md#matrix-by-item-and-operation) (also called **Items**) table on the **Compute** page gives you enough details to identify the workspace, operations, and items that might cause throttling. To learn more about a specific timepoint, use the **Timepoint detail** page (opened through the drill-through in step 17) to pinpoint the operation causing the issue. You see lists of interactive and background operations that run during the overload interval and find those that use the largest share of capacity. The goal is to identify, for example, a semantic model refresh, report, or notebook that uses excessive capacity and causes the "capacity limit exceeded" error. With that information, you can take action, like optimizing the semantic model or query, adjusting its schedule, or increasing capacity.

The following flowchart shows stage 3 (steps 18-22) and helps you identify the specific workspace and item responsible for the overload:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-3-errors.png" alt-text="Screenshot showing the Stage 3 troubleshooting flowchart to identify workspace and item causing overload." lightbox="media/capacity-troubleshoot/flowchart-stage-3-errors.png":::

The following table outlines the steps for stage 3:

| Step | Description / action | Explanation |
|------|--------|-------------|
| **18** | On the **Timepoint detail** page, first check the **Start time** and **End time** displayed (the interval of the timepoint). Then look at the **line chart** (sometimes called the heartbeat chart) that shows **CU%** around that timepoint. | The [Top row visuals](metrics-app-timepoint-page.md#top-row-visuals) of the **Timepoint** page usually shows the interval you’re inspecting (for example, "Start: 3:05:00 PM, End: 3:05:30 PM"). There’s also a small line chart showing about 30 minutes before and after the selected point, with a marker or vertical line at the exact timepoint. This context is useful because it shows how quickly the capacity consumption spikes and drops. For example, you can see if this is an isolated spike or part of a longer high usage period. (If it’s prolonged, you might have multiple timepoints to check.) Start by focusing on the single spike interval where the error occurs. |
| **19** | Scroll down to the tables: **Interactive operations for timerange** and **Background operations for timerange**. For each table, sort by the **Timepoint CU (s)** column in descending order (largest first). | The [**Interactive operations for timerange**](metrics-app-timepoint-page.md#interactive-operations-for-timerange) and [**Background operation for timerange**](metrics-app-timepoint-page.md#background-operations-for-timerange) tables list all the operations in that interval, split by [interactive operations](fabric-operations.md#interactive-operations) and [background operations](fabric-operations.md#background-operations). Sorting by **Timepoint CU (s)** puts the most resource-intensive operations at the top. (**Timepoint CU (s)** shows how many CUs that operation uses in the 30-second time slice.) After sorting, check the top few entries in each table. You find the "heaviest" operations during the throttling window. |
| **20** | For the top operations in each table, check the **% of base capacity** metric (and the total, if shown). Focus on the highest percentages. | The **% of base capacity** shows what fraction of the capacity’s baseline an operation uses (or in total) during the interval. For example, if one operation shows **250% of base capacity**, it uses 2.5 times the capacity’s normal limit in that 30-second window - a huge load that likely gets throttled. High percentages (well over 100%) confirm that those operations use more capacity than available, causing the overload. Note these values for the top offenders in interactive and background categories. See [The Fabric throttling policy](throttling.md) to learn more about throttling. |
| **21** | Check whether **interactive** or **background operations** are the primary cause of the overload. See which side (interactive or background) has the higher impact. | This distinction shows you the type of load causing the issue. For example, you might find that an interactive query uses 180% on its own, while background tasks are all under 50%, which means an interactive operation causes the spike. Or, a background operation, like a dataset (semantic model) refresh or Spark job, might use 300%, more than the interactive usage. This distinction shows you what type of workload to focus on. If the highest load comes from an interactive operation, it might be a heavy report query started by a user. If it comes from background, it could be a semantic model refresh, Spark job, warehouse queries, or an automated process. This helps you decide your next steps, like who to follow up with or what to optimize. If throttling is happening now, use these [strategies to stop throttling](throttling.md#how-to-stop-throttling-when-it-occurs). |
| **22 (End)** | **Identify and note the specific workspace and **item name** of the top culprits**. These are the items to check further. Finish the troubleshooting steps. | In the tables from step 19, the columns include **Workspace**, **Item kind**, and **Item name** for each operation. Find the operations with the highest impact (from step 19/20) and note their workspace and name. For example, you might find: *Workspace: Finance, Item: Semantic model `SalesModel`* has an interactive refresh operation using 250% of capacity, or *Workspace: IT, Item: Notebook `DataPrep_NB`* has a Spark job using 200% of capacity. Those are likely the root cause of the "capacity limit exceeded" error. |

## Next steps

After you identify the workspace and item causing the overload:

- Optimize the dataset (semantic model), report, or query.
- Adjust schedules for heavy workloads.
- Scale up capacity or move workloads to different capacities.

For immediate actions, see [How to stop throttling when it occurs](throttling.md#how-to-stop-throttling-when-it-occurs).

Monitor your capacity usage and address hotspots proactively to ensure smoother performance and avoid user-facing errors.

## Conclusion

You've systematically traced the "capacity limit exceeded" error to a specific cause: a capacity overload at the time, which leads to throttling caused by a particular operation in a workspace. By identifying the responsible item, you take targeted action to prevent these issues in the future. For example, work with the content owner to optimize a query or increase the capacity size if you expect heavy workload. Fabric capacities have built-in burst allowances and throttling policies to protect overall performance - hitting those limits occasionally can happen, but frequent overloads mean the capacity or the workload needs adjustment. Monitor your capacity usage (using this Metrics app) and address hotspots to ensure smoother performance and avoid user-facing errors. 

## Related content

- [Troubleshooting guide: Monitor and identify capacity usage](capacity-planning-troubleshoot-consumption.md)
- [Troubleshooting guide: Diagnose and resolve slowness due to capacity throttling](capacity-planning-troubleshoot-throttling.md)
- [Microsoft Fabric Capacity Metrics app](metrics-app.md)
