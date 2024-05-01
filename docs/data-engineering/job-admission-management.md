---
title: Job admission and management in Fabric Spark
description: Learn about job admission and management for notebooks, Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.date: 05/03/2024
---
# Job admission in Microsoft Fabric Spark

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Fabric Spark employs Optimistic Job Admission technique, which determines the minimum number of cores that are required for a Spark job (interactive or batch jobs from notebooks, lakehouses, or Spark job definitions based on the minimum node setting of the Spark Pool chosen as the compute option in the workspace setting or environment attached to the items). Jobs are accepted and begin running as long as there are available cores in the Fabric capacity linked to the workspace. The jobs when accepted, start with their minimum node setting and can request a scale-up within their maximum node limits depending on the job stages. The job admission and throttling layer on Fabric Spark allows the job to scale up if the total cores used by all the jobs currently running and using the Fabric capacity is less than the maximum burst cores assigned for that capacity.

For more information, see [Concurrency limits and queueing in Microsoft Fabric Spark](spark-job-concurrency-and-queueing.md).

## How does Optimistic Job Admission work?

In Microsoft Fabric, Starter Pools (which is the default compute option for any workspace) come preconfigured with minimum node of 1 and Custom pools users can set the minimum nodes to a value based on their workload requirement. Spark jobs tend to grow and reduce in compute requirements. Requirements are based on different job stages during their execution, within their minimum and maximum nodes, if the autoscaling option is enabled. Optimistic Job Admission uses the minimum cores for every job submitted to evaluate and admit the job for execution based on the cores available out of the Max Cores in a Fabric capacity. After these jobs are admitted, each job tries to grow based on its maximum nodes due to the jobs compute demand during the stages of its execution, and during which the scale up requests from all these jobs are approved if the overall cores being used by Spark is still within the burst limits of total cores allocated for the Fabric capacity.

> [!NOTE]
> The job scale up requests to increase the number of nodes for the job are denied if the utilization has reached the maximum limit and there are no available cores within the total cores limit for the Fabric Capacity. The cores need to be released by other active running jobs finishing or being canceled first.

## How does this affect job concurrency for Fabric Spark?

The minimum core requirements for each job determines if the job can be accepted. If the capacity is fully utilized, and there are no cores left that can meet the minimum core requirements of the job, the job is rejected. Interactive notebook jobs or lakehouse operations are blocked with an error: *HTTP Response code 430: Unable to submit this request because all the available capacity is currently being used. Cancel a currently running job, increase your available capacity, or try again later.* Batch jobs are put in a queue and processed automatically when the cores are freed.

Lets take the example scenario where a user is using a Fabric F32 capacity. Assuming all jobs submitted are using the default Starter Pool configuration, without Optimistic Job Admission, the capacity allows a maximum concurrency of three jobs as it reserved all the maximum number of cores for each job based on the maximum nodes configuration.

:::image type="content" source="media/job-admission-and-management/reserved-job-admission-overview.png" alt-text="Screenshot showing the job concurrency without optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/reserved-job-admission-overview.png":::

With Optimistic job admission, as an example with the same configuration, the capacity would allow 24 jobs to be admitted and start executing with their minimum node configuration during a maximum concurrency scenario as the jobs are admitted accounting for 8 SparkVCores (1 Minimum node configuration of size Medium)

:::image type="content" source="media/job-admission-and-management/job-admission.gif" alt-text="Screenshot showing the job concurrency with optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/job-admission.gif":::

## Job Scale using Spark Autoscale

When Spark Autoscale is enabled for the Spark pools, jobs would start executing with their minimum node configuration and during runtime, the job scale up could be triggered and these scales up requests for additional nodes. These scales up requests will go through the job admission control which approves the scale up allowing it to scale to its maximum limits based on the total available cores on Spark. When Autoscale requests are rejected, the active running jobs aren't impacted and continue to run with their current configuration till cores become available.

:::image type="content" source="media/job-admission-and-management/job-scale-up.gif" alt-text="Screenshot showing the job scale up with optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/job-scale-up.gif":::

> [!NOTE]
> If you want the job to have the total cores reserved for it based on its maximum nodes configuration, which would ensure the scale up, you could turn off Autoscale and set maximum nodes to the desired value within the permitted limits based on your Fabric capacity SKU. In this case, since the job does not have a minimum core requirement, this job would get accepted and start running when there are free cores in the Fabric capacity and have the total cores reserved for it ensuring the job scale up to the total cores configured. If the capacity is fully used, the job will either be slowed down if it’s a Notebook interactive job, or would get queued which would be automatically retried as the cores become free in the Capacity.

## Related content

- Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about [Spark compute for Fabric](spark-compute.md) data engineering and data science.
- Learn more about the [Concurrency and queueing limits for Fabric Spark](spark-job-concurrency-and-queueing.md).
