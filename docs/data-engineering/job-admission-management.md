---
title: Job admission in Apache Spark for Fabric
description: Learn about job admission and management for notebooks, Apache Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/04/2026
ai-usage: ai-assisted
---
# Job admission in Apache Spark for Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Fabric Spark uses optimistic job admission to decide whether a job can start immediately. The decision is based on the job's minimum core requirement and currently available Spark VCores in the connected Fabric capacity.

This behavior applies to interactive and batch jobs from notebooks, lakehouses, and Spark Job Definitions. Jobs start with their minimum node setting, and can scale toward their configured maximum if capacity remains available.

For more information, see [Concurrency limits and queueing in Microsoft Fabric Spark](spark-job-concurrency-and-queueing.md).

## How optimistic job admission works

In Fabric, starter pools default to a minimum of one node, and custom pools let you define minimum and maximum nodes. Job admission follows this sequence:

1. Fabric evaluates the submitted job against the pool's minimum node configuration.
1. If enough Spark VCores are available, the job starts.
1. During execution, autoscale requests are evaluated against remaining capacity.
1. Scale-up is allowed only when total in-use cores stay within the capacity limit (including burst, when available).

> [!NOTE]
> If total Fabric capacity cores are already in use, scale-up requests are denied until cores are freed by running jobs.

## How this affects job concurrency

Each job's minimum core requirement determines whether it can be admitted. If capacity has no available cores to satisfy the minimum requirement:

- Interactive notebook jobs and lakehouse operations are blocked with a capacity error.
- Batch jobs are queued and run when cores become available.

### Example: F32 capacity

Consider an F32 capacity. With burst, this capacity can use up to 192 Spark VCores. If each job is admitted at the full pool maximum of 64 Spark VCores, the capacity runs three concurrent jobs.

:::image type="content" source="media/job-admission-and-management/reserved-job-admission-overview.png" alt-text="Screenshot showing the job concurrency without optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/reserved-job-admission-overview.png":::

With optimistic job admission, the same capacity can admit up to 24 jobs if each job starts with a minimum of 8 Spark VCores (for example, one Medium node).

:::image type="content" source="media/job-admission-and-management/job-admission.gif" alt-text="Screenshot showing the job concurrency with optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/job-admission.gif":::

## Scale jobs with Spark autoscale

When autoscale is enabled, jobs start at their minimum node configuration. During runtime, scale requests are evaluated by the same admission control.

- Approved scale requests increase resources toward the configured maximum.
- Rejected scale requests keep the job running at its current allocation until capacity is available.

:::image type="content" source="media/job-admission-and-management/job-scale-up.gif" alt-text="Screenshot showing a job scaling up with optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/job-scale-up.gif":::

> [!NOTE]
> If you need predictable per-job compute, disable autoscale and use a fixed node configuration that fits your Fabric capacity limits. If capacity is fully in use, interactive requests can be blocked and batch requests can queue until cores become available.

## Related content

- Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about [Apache Spark compute for Fabric](spark-compute.md) for data engineering and data science.
- Learn more about [concurrency limits and queueing in Microsoft Fabric Spark](spark-job-concurrency-and-queueing.md).
