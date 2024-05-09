---
title: Job admission and management in Fabric Spark
description: Learn about job admission and management for notebooks, Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.date: 05/09/2024
---
# Job admission in Microsoft Fabric Spark

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Fabric Spark employs the optimistic job admission technique to determine the minimum number of cores that a Spark job requires. This process applies to interactive or batch jobs from notebooks, lakehouses, or Spark job definitions, and is based on the minimum node setting of the Spark pool you choose as the compute option in the workspace settings or environment attached to those items. If Spark finds available cores in the Fabric capacity linked to the workspace, Spark accepts the job, and it begins to run. Jobs start with their minimum node setting and can request a scale-up within their maximum node limits, depending on the job stages. If the total cores used by all the jobs currently running and using the Fabric capacity is less than the maximum burst cores assigned for that capacity, the job admission and throttling layer on Fabric Spark allows the job to scale up.

For more information, see [Concurrency limits and queueing in Microsoft Fabric Spark](spark-job-concurrency-and-queueing.md).

## How does optimistic job admission work?

In Fabric, starter pools (which are the default compute option for any workspace) come preconfigured with a minimum of one node. For custom pools, you can set the minimum nodes for to a value based on your workload requirements. Spark jobs tend to grow and reduce in compute requirements. If you enable the autoscaling option, requirements are based on different job stages during execution, within the minimum and maximum nodes. Based on the cores available out of the maximum cores in a Fabric capacity, optimistic job admission uses the minimum cores for every job submitted to evaluate and admit the job for execution. After a job is admitted, and during the stages of its execution, each job tries to grow based on its maximum nodes due to the job's compute demand. If the overall cores being used by Spark are still within the burst limits of total cores allocated for the Fabric capacity, Spark approves the scale-up request.

> [!NOTE]
> If utilization has reached the maximum limit and there are no available cores within the total limit for the Fabric capacity, the scale-up request is denied. Other active running jobs must finish or be canceled to release the unavailable cores.

## How does this affect job concurrency?

The minimum core requirement for each job determines if the job can be accepted. If the capacity is fully utilized and has no cores left that can meet the minimum core requirements of the job, the job is rejected. Rejected interactive notebook jobs and lakehouse operations throw this error: *HTTP Response code 430: Unable to submit this request because all the available capacity is currently being used. Cancel a currently running job, increase your available capacity, or try again later.* Batch jobs are queued and processed automatically when the cores are freed.

For example, consider a scenario where you're using a Fabric F32 capacity. Assuming all jobs submitted are using the default starter pool configuration, without optimistic job admission, the capacity allows a maximum concurrency of three jobs. The capacity sets this limit because the jobs reserve the maximum number of cores for each job, based on the maximum node configuration.

:::image type="content" source="media/job-admission-and-management/reserved-job-admission-overview.png" alt-text="Screenshot showing the job concurrency without optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/reserved-job-admission-overview.png":::

In the same configuration **with** optimistic job admission, the capacity allows 24 jobs to be admitted and start executing with their minimum node configuration during a maximum concurrency scenario. The capacity allows this limit because the jobs are admitted accounting for eight SparkVCores (one minimum node configuration of size Medium).

:::image type="content" source="media/job-admission-and-management/job-admission.gif" alt-text="Screenshot showing the job concurrency with optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/job-admission.gif":::

## Spark autoscale

When you enable Spark autoscale for Spark pools, jobs start executing with their minimum node configuration and can request more nodes during runtime. These requests go through the job admission control, which approves requests and allows jobs to scale to their maximum limits based on the total available cores on Spark. Rejected autoscale requests don't affect active running jobs; they continue to run with their current configuration until more cores become available.

:::image type="content" source="media/job-admission-and-management/job-scale-up.gif" alt-text="Screenshot showing a job scaling up with optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/job-scale-up.gif":::

> [!NOTE]
> If you want a job to have the total cores reserved for it based on its maximum node configuration, which would ensure the scale-up, you can turn off autoscale and set the maximum nodes to the desired value (within the permitted limits based on your Fabric capacity SKU). When the job doesn't have a minimum core requirement, it gets accepted and starts running when cores are free in your Fabric capacity. The job has the total cores reserved for it, ensuring the job scales up to the total cores you configured. If the capacity is fully used, the job either slows down (if it’s a notebook interactive job), or is queued and automatically retried as the cores become available.

## Related content

- Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about [Spark compute for Fabric](spark-compute.md) data engineering and data science.
- Learn more about the [Concurrency and queueing limits for Fabric Spark](spark-job-concurrency-and-queueing.md).
