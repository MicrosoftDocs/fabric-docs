---
title: Concurrency limits and queueing in Apache Spark for Fabric
description: Learn about the job concurrency limits and queueing for notebooks, Apache Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 10/20/2023
---

# Concurrency limits and queueing in Apache Spark for Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric allows allocation of compute units through capacity, which is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different items consume different capacity at a certain time. Microsoft Fabric offers capacity through the Fabric SKUs and trials. For more information, see [What is capacity?](../enterprise/scale-capacity.md).

When users create a Microsoft Fabric capacity on Azure, they choose a capacity size based on their analytics workload size. In Apache Spark, users get two Apache Spark VCores for every capacity unit they reserve as part of their SKU.

**One Capacity Unit = Two Spark VCores**

Once they have purchased the capacity, admins can create workspaces within the capacity in Microsoft Fabric. The Spark VCores associated with the capacity are shared among all the Apache Spark-based items like notebooks, Apache Spark job definitions, and lakehouses created in these workspaces.

## Concurrency throttling and queueing

Spark for Fabric enforces a cores-based throttling and queueing mechanism, where users can submit jobs based on the purchased Fabric capacity SKUs. The queueing mechanism is a simple FIFO-based queue, which checks for available job slots and automatically retries the jobs once the capacity has become available.

When users submit notebook or lakehouse jobs (such as **Load to Table**) and the capacity is at maximum utilization—due to concurrent jobs using all Spark VCores—they receive the following error on too many requests for capacity: 

```text
[TooManyRequestsForCapacity] HTTP Response code 430: This Spark job can't be run because you have hit a Spark compute or API rate limit. To run this Spark job, cancel an active Spark job through the Monitoring hub, or choose a larger capacity SKU or try again later.
```

With **queueing enabled**, notebook jobs triggered from **pipelines**, **job scheduler**, and **Spark job definitions** are added to the queue and automatically retried when capacity becomes available.

> [!NOTE]
> The queue expiration is set to **24 hours** from job submission time. After this period, jobs are removed from the queue and must be resubmitted manually.

Fabric capacities are also enabled with **bursting**, allowing you to consume **up to 3×** the number of Spark VCores you've purchased. This burst helps improve concurrency by allowing more jobs to run in parallel.

> [!NOTE]
> The **bursting factor increases the total Spark VCores** for concurrency **and can be leveraged by a single job**, if the Spark pool is configured with a higher core count.  
> In other words, the **pool configuration** determines the max cores a job can use—not just the base SKU allocation.

### Example

If you have a **F64** SKU with **384 Max Spark VCores with Burst Factor**:

- You can configure a custom or starter pool with **up to 384 Spark VCores**.
- If a workspace admin creates such a pool, a **single Spark job** (e.g., a notebook, job definition, or lakehouse job) **can use all 384 VCores**.
- Example: A pool with `Medium` nodes (8 VCores each) and 48 max nodes = 384 VCores.


> [!TIP]
> To maximize job performance, confirm your workspace pool is configured with sufficient node size and count.

## Spark Capacity SKU Limits

| Fabric capacity SKU | Equivalent Power BI SKU | Spark VCores | Max Spark VCores with Burst Factor | Queue limit |
|----------------------|--------------------------|--------------|------------------------------------|--------------|
| F2                   | -                        | 4            | 20                                 | 4            |
| F4                   | -                        | 8            | 24                                 | 4            |
| F8                   | -                        | 16           | 48                                 | 8            |
| F16                  | -                        | 32           | 96                                 | 16           |
| F32                  | -                        | 64           | 192                                | 32           |
| F64                  | P1                       | 128          | 384                                | 64           |
| F128                 | P2                       | 256          | 768                                | 128          |
| F256                 | P3                       | 512          | 1536                               | 256          |
| F512                 | P4                       | 1024         | 3072                               | 512          |
| F1024                | -                        | 2048         | 6144                               | 1024         |
| F2048                | -                        | 4096         | 12288                              | 2048         |
| Trial Capacity       | P1                       | 128          | 128                                | NA           |

> [!Important]
> The table applies only to Spark jobs running on Fabric Capacity. With autoscale billing enabled, Spark jobs run separately from Fabric capacity, avoiding bursting or smoothing. The total Spark VCores will be twice the maximum capacity units set in autoscale settings.

### Example calculation

- A **F64 SKU** offers **128 Spark VCores**.
- With a burst factor of 3, it supports **up to 384 Spark VCores** for concurrent execution.
- If a pool is configured with the full 384 VCores, **a single job can use them all**, assuming no other jobs are consuming capacity.
- Example: 3 jobs using 128 VCores each can run concurrently OR 1 job using 384 VCores can run.

> [!NOTE]
> Jobs have a queue expiration period of 24 hours, after which they're canceled, and users must resubmit them for execution.

Spark for Fabric throttling doesn't have enforced arbitrary jobs-based limits, and the throttling is only based on the number of cores allowed for the purchased Fabric capacity SKU. Job admission by default is an optimistic admission control, where jobs are admitted based on their minimum core requirements. Learn more: [Job Admission and Management](job-admission-management.md).

If the default pool (Starter Pool) option is selected for the workspace, the following table lists the max concurrency job limits.

Learn more: [Configuring Starter Pools](configure-starter-pools.md).

Admins can configure their Apache Spark pools to utilize the maximum Spark VCores available in the capacity, including the burst factor of 3× that Fabric offers for concurrent execution. For example, a workspace admin with an F64 Fabric capacity can configure their Spark pool (Starter Pool or Custom Pool) to use up to 384 Spark VCores by:

Setting Starter Pool max nodes to 48 (with Medium nodes = 8 VCores each), or

Configuring a Custom Pool using larger nodes (e.g., XXLarge = 64 VCores each) with an appropriate node count to reach the desired capacity.

With this configuration, a single Spark job can consume the entire burst capacity, which is ideal for large-scale data processing that prioritizes performance.

New: Job-level bursting control via admin portal
Capacity admins now have control over enabling or disabling job-level bursting through a new setting in the Admin Portal:

Navigate to Admin Portal → Capacity Settings → Data Engineering/Science tab

Use the new "Disable Job-Level Bursting" switch to prevent a single Spark job from consuming all available burst capacity

> [!NOTE]
> When job-level bursting is disabled, the Spark engine enforces that no single job can utilize all available capacity (including burst cores). This ensures that capacity remains available for concurrent jobs, improving throughput and multi-user concurrency.

This feature is particularly useful in multi-tenant or high-concurrency environments, where workloads need to be balanced across multiple teams and pipelines. Admins can tune this setting based on whether the capacity is optimized for maximum job throughput (bursting enabled) or higher concurrency and fairness (bursting disabled).

Example scenarios
Bursting enabled (default):
A large batch notebook job can consume all 384 Spark VCores in an F64 capacity, assuming no other jobs are running.

Bursting disabled:
A job may be capped at the base core limit (e.g., 128 Spark VCores for F64), allowing headroom for other jobs to start concurrently.

> [!TIP]
> For teams with diverse job types (ETL, ML, Adhoc), disabling job-level bursting can help prevent capacity monopolization and reduce job queueing delays.



## Related content

- Get started with [Apache Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
- Learn about [Apache Spark compute for Fabric](spark-compute.md) for data engineering and data science workloads
