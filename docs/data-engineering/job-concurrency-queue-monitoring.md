---
title: Job Concurrency and Queue Monitoring (Preview)
description: Learn how to monitor Spark job concurrency, troubleshoot queuing, and understand capacity utilization in Microsoft Fabric.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 02/28/2026
---

# Job Concurrency and Queue Monitoring (Preview)

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-and-ds.md)]

Efficient management of Apache Spark workloads requires deep visibility into how compute resources are allocated and consumed across a capacity. In high-concurrency environments, multiple jobs from various notebooks, job definitions, and pipelines often compete for the same pool of Capacity Units (CUs). 

Without granular monitoring, identifying why a job is delayed—whether due to internal workspace limits or external capacity pressure—can be difficult. The **Job Concurrency and Queue Monitoring** addresses this by providing a transparent look into the job lifecycle, from submission to execution, directly within the workspace context.

---

## Understanding Job Concurrency and Queuing 

When Spark workloads (such as Notebooks, Spark Job Definitions or Livy jobs) are throttled or enter a queued state, it can be challenging to identify the specific bottleneck. This ambiguity often leads to complexities in workload management. The job concurrency and queue monitoring experience helps you determine if you are hitting:

* **Maximum Compute Limits:** Compute limits based on the Fabric capacity SKU or the max CU limits configured as part of the Autoscale Biling capacity setting.
* **CU Saturation:** Current capacity consumption by active jobs in the workspace.
* **Capacity Contention:** Resources are being consumed by other workspaces attached to the same shared capacity.



---

## Key Features

The new settings experience focuses on transparency and actionable insights:

### Real-time Visibility
* **Threshold Tracking:** View your maximum CU limits and concurrency thresholds alongside currently active jobs.
* **Consumption Metrics:** See the specific CU consumption associated with active jobs to understand the weight of each workload.

### Capacity Insights
* **Workspace vs. Capacity Usage:** View the percentage of utilization from your current workspace compared to usage from other workspaces on the same capacity. This identifies "noisy neighbor" scenarios.
* **Queue Depth:** Distinguish between active and queued behavior with clear counts of how many jobs are waiting for resources.

### Integrated Diagnostics
* **Monitoring Hub Navigation:** Navigate directly from Workspace Settings into the **Monitoring Hub**. The detail view with workspace level filter allowing you to drill into the full list of historical and active jobs.

---

## Benefits and Impact

With these insights, administrators can:

1.  **Diagnose Delays:** Quickly identify if a job is waiting due to SKU-level concurrency limits or physical capacity bottlenecks.
2.  **Track Cross-Workspace Activity:** Understand overall capacity load and how different teams are impacting shared resources.
3.  **Optimize Load:** Make informed decisions about upgrading SKUs or scheduling jobs during off-peak hours based on clearer visibility into queued states.

---

## Get Started

### Accessing Workspace Monitoring
To view concurrency and queue signals for your specific workspace:
1.  Go to **Workspace Settings**.
2.  Select **Data Engineering**.
3.  Click on **Jobs** to view the live dashboard.
4.  Select **Monitoring** for a deeper inspection of specific job logs.

   :::image type="content" source="media\job-concurrency-queue-monitoring\job-concurrency-queue-monitoring.png" alt-text="Screenshot showing the job monitoring view in workspace settings.":::
---

## Related Content

* Learn about [Concurrency limits and queueing in Apache Spark for Microsoft Fabric](spark-job-concurrency-and-queueing.md).
* [Get Started with Data Engineering/Science Admin Settings for your Fabric Capacity](capacity-settings-overview.md)
* [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
* Understand [Spark Compute for Fabric](spark-compute.md).
