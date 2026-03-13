---
title: Concurrency limits and queueing in Apache Spark for Fabric
description: Learn about the job concurrency limits and queueing for notebooks, Apache Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/05/2026
ai-usage: ai-assisted
---

# Concurrency limits and queueing in Apache Spark for Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric allocates compute through capacity. Capacity is a dedicated set of resources available at a point in time, and different items consume that capacity differently. Fabric provides capacity through Fabric SKUs and trial capacity. To learn more, see [What is capacity?](../enterprise/scale-capacity.md).

When you create a Fabric capacity, you select a size based on workload needs. For Apache Spark, each capacity unit maps to two Spark VCores.

**One capacity unit = two Spark VCores**

After capacity is provisioned, admins create workspaces in that capacity. Spark VCores are shared across Spark-based items in those workspaces, including notebooks, Spark Job Definitions, and lakehouse jobs.

## Concurrency throttling and queueing

Spark in Fabric uses core-based throttling and queueing. Job admission is based on available Spark VCores in your purchased capacity. Queueing uses first in, first out (FIFO) behavior and retries queued jobs automatically when capacity becomes available.

When a notebook or lakehouse job (such as **Load to Table**) is submitted while capacity is fully used, Fabric returns this error:

```text
[TooManyRequestsForCapacity] HTTP Response code 430: This Spark job can't be run because you have hit a Spark compute or API rate limit. To run this Spark job, cancel an active Spark job through the Monitoring hub, or choose a larger capacity SKU or try again later.
```

With queueing enabled, jobs triggered from pipelines, scheduler, and Spark Job Definitions are queued and retried automatically.

Queueing doesn't apply to interactive notebook jobs or notebook jobs submitted through the notebook public API.

> [!NOTE]
> Queue expiration is **24 hours** from job submission time. After that period, jobs are removed from the queue and must be resubmitted manually.
>
> If a Fabric capacity is in a throttled state, new Spark jobs are rejected instead of queued.

Spark throttling in Fabric is based on available cores, not an arbitrary per-job count limit. By default, Spark uses optimistic admission control, where jobs are admitted using their minimum core requirements. To learn more, see [Job admission and management](job-admission-management.md).

## Bursting and pool configuration

Fabric capacities support **bursting**, which allows consumption of up to **3×** your purchased Spark VCores. Bursting can increase concurrency by allowing more parallel execution when capacity is available.

> [!NOTE]
> The bursting factor increases total Spark VCores for concurrency and can also be used by a single job if the Spark pool is configured with enough cores. In other words, pool configuration determines the maximum cores a job can use, not only base SKU allocation.

### Example: F64 with bursting

If you use an **F64** SKU, the burst maximum is **384 Spark VCores**:

- You can configure a starter or custom pool with up to **384 Spark VCores**.
- If the pool is configured to that limit, a **single Spark job** can consume all **384 VCores**.
- Example: `Medium` nodes (8 VCores each) × 48 max nodes = 384 VCores.

> [!TIP]
> To maximize job performance, configure your workspace pool with appropriate node size and max node count.

## Job-level bursting control

Capacity admins can enable or disable job-level bursting in the Admin portal:

1. Go to **Admin portal** > **Capacity settings** > **Fabric capacity**.
1. Select the capacity you want to manage.
1. Open **Data Engineering/Science settings** > **Open Spark Compute**.
1. Use **Disable job-level bursting**.

When job-level bursting is disabled, Spark prevents any single job from consuming all available capacity (including burst cores). This behavior helps keep capacity available for other concurrent jobs.

This setting is useful for multi-tenant or high-concurrency environments where fairness and throughput across teams are more important than maximizing one job's runtime.

### Example scenarios

**Bursting enabled (default)**

A large batch notebook job can consume all 384 Spark VCores in an F64 capacity when no other jobs are running.

**Bursting disabled**

A job can be capped at the base core limit (for example, 128 Spark VCores for F64), leaving headroom for other jobs to start.

> [!TIP]
> For mixed workloads (for example ETL, ML, and ad hoc analysis), disabling job-level bursting can reduce capacity monopolization and queueing delays.

## Spark capacity SKU limits

|Fabric capacity SKU|Equivalent Power BI SKU|Spark VCores|Max Spark VCores with burst factor|Queue limit|
|---|---|---|---|---|
|F2|-|4|20|4|
|F4|-|8|24|4|
|F8|-|16|48|8|
|F16|-|32|96|16|
|F32|-|64|192|32|
|F64|P1|128|384|64|
|F128|P2|256|768|128|
|F256|P3|512|1536|256|
|F512|P4|1024|3072|512|
|F1024|-|2048|6144|1024|
|F2048|-|4096|12288|2048|
|Trial Capacity|P1|128|128|Not available|

> [!IMPORTANT]
> This table applies only to Spark jobs running on Fabric capacity. With autoscale billing enabled, Spark jobs run separately from Fabric capacity and don't use bursting or smoothing. Total Spark VCores are two times the maximum capacity units set in autoscale settings.

### Example calculation

- An **F64** SKU provides **128 Spark VCores**.
- With a 3× burst factor, it supports up to **384 Spark VCores**.
- If a pool is configured for all 384 VCores, one job can consume all 384 when capacity is otherwise free.
- Example: either three 128-VCore jobs run concurrently, or one 384-VCore job runs.

> [!NOTE]
> Jobs expire from queue after 24 hours and must be resubmitted.

To learn more about starter pools and configuration, see [Configure starter pools in Fabric](configure-starter-pools.md).


## Related content

- Get started with [Apache Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
- Learn about [Apache Spark compute for Fabric](spark-compute.md) for data engineering and data science workloads
