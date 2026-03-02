---
title: Job concurrency and queue monitoring (Preview)
description: Learn how to monitor Spark job concurrency, troubleshoot queuing, and understand capacity utilization in Microsoft Fabric.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/02/2026
---

# Job concurrency and queue monitoring (Preview)

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Efficient management of Apache Spark workloads requires deep visibility into how compute resources are allocated and consumed across a capacity. In high-concurrency environments, multiple Spark jobs from various notebooks, Spark job definitions, and pipelines often compete for the same pool of Capacity Units (CUs). 

Without granular monitoring, identifying why a job is delayed—whether due to internal workspace limits or external capacity pressure—can be difficult. Detailed visibility into the job lifecycle, from submission through execution, helps surface where delays occur directly within the workspace context.

## Understanding job concurrency and queuing

When Spark workloads (such as Notebooks, Spark Job Definitions or Livy jobs) are throttled or enter a queued state, it can be challenging to identify the specific bottleneck. This ambiguity often leads to complexities in workload management. The job concurrency and queue monitoring experience helps you determine if you are hitting:

* **Maximum compute limits:** Compute limits based on the Fabric capacity SKU or the max CU limits configured as part of the Autoscale Billing capacity setting.
* **CU saturation:** Current capacity consumption by active jobs in the workspace.
* **Capacity contention:** Resources are being consumed by other workspaces attached to the same shared capacity.

## Key features

The new settings experience focuses on transparency and actionable insights:

### Real-time visibility
* **Threshold tracking:** View your maximum CU limits and concurrency thresholds alongside currently active jobs.
* **Consumption metrics:** See the specific CU consumption associated with active jobs to understand the weight of each workload.

### Capacity insights
* **Workspace vs. capacity usage:** View the percentage of utilization from your current workspace compared to usage from other workspaces on the same capacity. This identifies "noisy neighbor" scenarios.
* **Queue depth:** Distinguish between active and queued behavior with clear counts of how many jobs are waiting for resources.

### Integrated diagnostics
* **Monitoring Hub navigation:** Navigate directly from Workspace Settings into the **Monitoring Hub**. The detail view with workspace-level filter allows you to drill into the full list of historical and active jobs.

## Benefits and impact

With these insights, administrators can:

-  **Diagnose delays:** Quickly identify if a job is waiting due to SKU-level concurrency limits or physical capacity bottlenecks.
-  **Track cross-workspace activity:** Understand overall capacity load and how different teams are impacting shared resources.
-  **Optimize load:** Make informed decisions about upgrading SKUs or scheduling jobs during off-peak hours based on clearer visibility into queued states.

## Get started

### Accessing workspace monitoring
To view concurrency and queue signals for your specific workspace:
1.  Go to **Workspace settings**.
1.  Select **Data Engineering/Science** > **Spark settings**.
1.  Select **Jobs** to view the live dashboard.

    :::image type="content" source="media\job-concurrency-queue-monitoring\job-concurrency-queue-monitoring.png" alt-text="Screenshot showing the job monitoring view in workspace settings.":::
   
1. Select **View job submission details** for a deeper inspection of specific job logs.

## Related content

* Learn about [Concurrency limits and queueing in Apache Spark for Microsoft Fabric](spark-job-concurrency-and-queueing.md).
* [Get started with Data Engineering/Science admin settings for your Fabric capacity](capacity-settings-overview.md)
* [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
* Understand [Spark Compute for Fabric](spark-compute.md).
