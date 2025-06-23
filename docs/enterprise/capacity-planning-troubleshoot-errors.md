---
title: Troubleshooting guide - Diagnose and resolve "Capacity limit exceeded" errors
description: Learn how to troubleshoot and resolve "Capacity limit exceeded" errors in Microsoft Fabric by confirming capacity overload, checking throttling, and identifying the specific workspace and item causing the issue.  
author: JulCsc  
ms.author: juliacawthra  
ms.topic: troubleshooting  
ms.custom:  
ms.date: 06/23/2025  
---

# Troubleshooting guide: Diagnose and resolve "Capacity limit exceeded" errors

This guide is intended for **Microsoft Fabric capacity administrators** to help diagnose and resolve issues where users encounter capacity overload errors.

## Scenario

Users running background jobs or interactive queries in Microsoft Fabric might receive one of the following error messages indicating the capacity is overloaded:

- "Status Code: **CapacityLimitExceeded**"
- "Your organization's Fabric compute capacity has **exceeded its limits**. Try again later."
- "Cannot load model due to **reaching capacity limits**."

When a user receives such an error, it means the Fabric capacity was in an **overloaded state**, and the platform started throttling operations to protect the system. Essentially, the capacity ran out of available resources at that moment, causing the user's operation to be delayed or rejected. For more information, see [Introducing job queueing for notebooks in Microsoft Fabric](https://blog.fabric.microsoft.com/blog/introducing-job-queueing-for-notebook-in-microsoft-fabric?ft=All).

To troubleshoot these errors, a capacity administrator can use the **Microsoft Fabric Capacity Metrics app** to identify when the capacity was overloaded and which workspace or item caused the overload. This guide walks through the steps to confirm the overload timing, check for throttling, and pinpoint the specific item responsible for exceeding the capacity.

## Prerequisites

Before troubleshooting, gather the following information:

- **Workspace name**
- **Capacity name**
- **Time of the error** (when the user saw the message)

This information is crucial for filtering and analyzing the correct capacity metrics.

> [!NOTE]
> If the failing item depends on another workspace (for example, a report in Workspace A using a dataset in Workspace B on a different capacity), you might need to check the other capacity as well for the same timeframe.

Ensure you're using the latest version of the [Microsoft Fabric Capacity Metrics app](metrics-app-install.md). For more information, see [Metrics app documentation](metrics-app.md).

Familiarize yourself with the following pages in the Capacity Metrics app:

- [Understand the metrics app compute page](metrics-app-compute-page.md)
- [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)

## Overview of troubleshooting stages

To troubleshoot "Capacity limit exceeded" errors, we follow a three-stage process that confirms the overload, checks for throttling, and identifies the specific workspace and item causing the issue. The stages are as follows:

:::image type="content" source="media/capacity-troubleshoot/flowchart-high-level-errors.png" alt-text="High-level troubleshooting flowchart for capacity limit exceeded errors." lightbox="media/capacity-troubleshoot/flowchart-high-level-errors.png":::

| Stage | Action | Description |
|-------|--------|-------------|
| **1** | **Confirm the capacity was overloaded at the error time** | Verify whether the capacity was in an overloaded state when the user's error occurred by using the **Compute page** of the Capacity Metrics app to look at system events and utilization charts. |
| **2** | **Check if throttling occurred during the overload** | Determine whether the capacity overload triggered throttling (delayed or rejected operations) by inspecting the **Throttling** tab in the Metrics app. |
| **3** | **Identify the specific workspace and item causing the overload** | Pinpoint the operations causing the overload using the **Timepoint Detail** page to identify the workspace and item responsible. |

Each stage is detailed in the sections that follow, with a flowchart and a table explaining the steps.

> [!NOTE]
> In the flowcharts, **Start** and **End** steps are drawn as rounded rectangles, **Decision** points as diamonds (with **Yes/No** branches), and **Action** or **Process** steps as rectangles. Arrows show the progression of steps.

## Stage 1: Confirm the capacity was overloaded at the error time

In this stage, verify whether the capacity was in an overloaded state when the user's error occurred. Use the **Compute page** of the Capacity Metrics app to look at system events and utilization charts.

The following flowchart illustrates Stage 1 (steps 1-10), confirming the capacity overload:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-1-errors.png" alt-text="Stage 1 troubleshooting flowchart to confirm capacity overload." lightbox="media/capacity-troubleshoot/flowchart-stage-1-errors.png":::

The following table outlines the steps for Stage 1:

| Step | Description / action | Explanation |
|------|--------|-------------|
| **1** | Note workspace, capacity, and error time | Identify the workspace, capacity, and approximate error time. |
| **2** | Open the Microsoft Fabric Capacity Metrics app | Use the [Capacity Metrics app](metrics-app.md) to monitor capacity usage. |
| **3** | Navigate to the **Compute** page | The [Compute page](metrics-app-compute-page.md) shows capacity usage and system events. |
| **4** | Select the affected capacity | Choose the relevant capacity from the dropdown. |
| **5** | View the **Multimetric ribbon chart** and **System Events** tab | Check for overload events in the system events log. |
| **6** | Filter to the error date | Select the date of the error in the ribbon chart. |
| **7** | Find overload events | Look for **Overloaded** → **Active** events in the system events log. |
| **8** | Note overload timeframe | Record the start and end times of the overload event. |
| **9** | Confirm overload matches error time | Verify if the overload timeframe aligns with the user's error time. |
| **10** | Proceed or end troubleshooting | If matched, proceed to Stage 2; if not, end troubleshooting for this capacity. |

## Stage 2: Check if throttling occurred during the overload

Determine whether the capacity overload triggered throttling (delayed or rejected operations). Use the **Throttling** tab in the Metrics app to inspect these metrics.

The following flowchart illustrates Stage 2 (steps 11-17), checking for throttling:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-2-errors.png" alt-text="Stage 2 troubleshooting flowchart to check for throttling." lightbox="media/capacity-troubleshoot/flowchart-stage-2-errors.png":::

The following table outlines the steps for Stage 2:

| Step | Description / action | Explanation |
|------|--------|-------------|
| **11** | Go to the **Throttling** tab | Check interactive and background throttling charts. |
| **12** | Check for throttling spikes | Look for values above 100% around the error time. |
| **13** | End if no throttling | If no throttling occurred, end troubleshooting for this capacity. |
| **14** | Identify throttling type | Determine if interactive or background throttling occurred. |
| **15** | Confirm throttling matches error time | Verify throttling aligns with the user's error time. |
| **16** | End if timing mismatch | If throttling doesn't match error time, end troubleshooting. |
| **17** | Drill into timepoint detail | If matched, open the **Timepoint Detail** report for further analysis. |

## Stage 3: Identify the workspace and item causing the overload

Use the **Timepoint Detail** page to pinpoint the operations causing the overload.

The following flowchart illustrates Stage 3 (steps 18-22), identifying the specific workspace and item responsible for the overload:

:::image type="content" source="media/capacity-troubleshoot/flowchart-stage-3-errors.png" alt-text="Stage 3 troubleshooting flowchart to identify workspace and item causing overload." lightbox="media/capacity-troubleshoot/flowchart-stage-3-errors.png":::

The following table outlines the steps for Stage 3:

| Step | Description / action | Explanation |
|------|--------|-------------|
| **18** | Note timepoint interval | Observe the start and end times of the overload interval. |
| **19** | Sort operations by capacity unit (CU) usage | Sort interactive and background operations by **Timepoint CU (s)**, descending. |
| **20** | Check **% of base capacity** | Identify operations with the highest percentage of base capacity usage. |
| **21** | Determine primary cause | Identify whether interactive or background operations had higher impact. |
| **22** | Capture workspace and item details | Note the workspace and item names causing the overload. |

## Next steps

After identifying the workspace and item causing the overload, you can:

- Optimize the dataset, report, or query.
- Adjust schedules for heavy workloads.
- Consider scaling up capacity or moving workloads to different capacities.

For immediate actions, see [How to stop throttling when it occurs](throttling.md#how-to-stop-throttling-when-it-occurs).

By monitoring your capacity usage and addressing hotspots proactively, you can ensure smoother performance and avoid user-facing errors in the future.

## Related content

- [Troubleshooting guide: Monitor and identify capacity usage](capacity-planning-troubleshoot-consumption.md)
- [Troubleshooting guide: Diagnose and resolve slowness due to capacity throttling](capacity-planning-troubleshoot-throttling.md)
- [Microsoft Fabric Capacity Metrics app](metrics-app.md)
