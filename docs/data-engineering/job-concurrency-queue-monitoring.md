---
title: Job concurrency and queue monitoring
description: Learn how to monitor Spark job concurrency, troubleshoot queuing, and understand capacity utilization in Microsoft Fabric.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 07/04/2026
ai-usage: ai-assisted
---

# Job concurrency and queue monitoring

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

In high-concurrency environments, Spark jobs from notebooks, Spark Job Definitions, and pipelines compete for the same capacity resources. Without clear visibility, it can be hard to determine whether delays come from workspace limits, capacity saturation, or cross-workspace contention.

This monitoring experience helps you understand job state and capacity pressure from submission through execution so you can identify bottlenecks faster. It provides two views: a workspace-level view for teams investigating their own jobs, and a capacity-level view for administrators balancing many workspaces on a shared capacity.

## Understanding job concurrency and queuing

When Spark workloads (such as notebooks, Spark Job Definitions, or Livy jobs) are throttled or queued, this experience helps you determine whether you're hitting:

- **Maximum compute limits:** Limits based on the Fabric capacity SKU, or the max CU limits configured for autoscale billing.
- **CU saturation:** Current capacity consumption by active jobs in the workspace.
- **Capacity contention:** Resource pressure caused by other workspaces on the same shared capacity.

When a capacity reaches its maximum compute limits, new Spark job submissions can receive an `HTTP 429 Too many requests` response. These views help you identify which of the preceding conditions caused the throttling so you can take the right action.

## Key features

The monitoring page focuses on transparency and actionable insights:

### Real-time visibility
- **Threshold tracking:** View maximum CU limits and concurrency thresholds alongside active jobs.
- **Consumption metrics:** View CU consumption for active jobs to understand workload weight.

### Capacity insights
- **Workspace vs. capacity usage:** Compare workspace utilization with usage from other workspaces on the same capacity to identify noisy-neighbor scenarios.
- **Queue depth:** Distinguish active versus queued jobs with clear wait counts.

### Integrated diagnostics
- **Monitoring Hub navigation:** Open **Monitoring hub** directly from workspace settings, then drill into historical and active jobs with workspace-level filtering.

## Capacity-level view

The capacity-level view gives administrators a single place to see how all workspaces on a capacity consume resources over time. Use it to identify which workspaces drive the most demand and when contention occurs.

### Maximum CU used per workspace

The view shows the maximum CUs used by any workspace at any point in time. Use it to:

- **Identify heavy consumers:** See which workspaces place the greatest demand on the capacity.
- **Gauge headroom:** See how close each workspace comes to the capacity limit.
- **Spot overlapping peaks:** Detect when multiple workspaces consume resources at the same time.

### Usage trends over time

Observe consumption across a selectable time period to distinguish one-time spikes from recurring patterns:

- **Last 24 hours:** Investigate a recent incident or a specific busy window.
- **Last 7 days:** Identify daily patterns, such as overlapping nightly pipelines.
- **Last 30 days:** Identify weekly and monthly patterns, such as month-end processing, to inform capacity planning.

### Identify and resolve contention

By comparing workspaces over time, you can pinpoint which workspaces run into resource contention on the shared capacity, and then take action:

- **Adjust workspace-level pool limits** so a single workspace doesn't crowd out others.
- **Increase capacity-level limits** or enable autoscale when sustained demand justifies more compute.
- **Reschedule heavy workloads** to lower-traffic windows to smooth out peaks.

These actions improve concurrency and help you achieve higher capacity utilization.

:::image type="content" source="media/job-concurrency-queue-monitoring/job-concurrency-queue-monitoring-capacity.png" alt-text="Screenshot showing the capacity-level job concurrency view with the maximum capacity units used by each workspace over time.":::

## Benefits and impact

With these insights, admins can:

- **Diagnose delays:** Identify whether jobs wait because of SKU-level limits or capacity bottlenecks.
- **Track cross-workspace activity:** Understand how other teams and workspaces affect shared capacity.
- **Optimize workload timing:** Decide when to resize capacity or schedule jobs during lower-traffic windows.

## Get started with workspace monitoring

To view concurrency and queue signals for a workspace:

1. Go to **Workspace settings**.
1. Select **Data Engineering/Science** > **Spark settings**.
1. Select **Jobs** to open the live dashboard.

   :::image type="content" source="media/job-concurrency-queue-monitoring/job-concurrency-queue-monitoring.png" alt-text="Screenshot showing the job monitoring view in workspace settings.":::
   
1. Select **View job submission details** to inspect specific job events and logs.

## Get started with capacity-level monitoring

To review usage across a capacity:

1. Open the capacity-level concurrency view for your capacity.
1. Select a time period: **Last 24 hours**, **Last 7 days**, or **Last 30 days**.
1. Review the maximum CU used per workspace to identify the heaviest consumers and overlapping peaks.
1. Adjust workspace pool limits or capacity limits based on the observed trends.

## Related content

- Learn about [Concurrency limits and queueing in Apache Spark for Microsoft Fabric](spark-job-concurrency-and-queueing.md).
- [Get started with Data Engineering and Data Science admin settings for your Fabric capacity](capacity-settings-overview.md).
- [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about [Apache Spark compute for Fabric](spark-compute.md).
