---
title: Job concurrency and queue monitoring (Preview)
description: Learn how to monitor Spark job concurrency, troubleshoot queuing, and understand capacity utilization in Microsoft Fabric.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/05/2026
ai-usage: ai-assisted
---

# Job concurrency and queue monitoring (Preview)

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

In high-concurrency environments, Spark jobs from notebooks, Spark Job Definitions, and pipelines compete for the same capacity resources. Without clear visibility, it can be hard to determine whether delays come from workspace limits, capacity saturation, or cross-workspace contention.

This monitoring experience helps you understand job state and capacity pressure from submission through execution so you can identify bottlenecks faster.

## Understanding job concurrency and queuing

When Spark workloads (such as notebooks, Spark Job Definitions, or Livy jobs) are throttled or queued, this experience helps you determine whether you're hitting:

- **Maximum compute limits:** Limits based on the Fabric capacity SKU, or the max CU limits configured for autoscale billing.
- **CU saturation:** Current capacity consumption by active jobs in the workspace.
- **Capacity contention:** Resource pressure caused by other workspaces on the same shared capacity.

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

## Related content

- Learn about [Concurrency limits and queueing in Apache Spark for Microsoft Fabric](spark-job-concurrency-and-queueing.md).
- [Get started with Data Engineering and Data Science admin settings for your Fabric capacity](capacity-settings-overview.md).
- [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about [Apache Spark compute for Fabric](spark-compute.md).
