---
title: Job admission and management in Fabric Spark
description: Learn about the job admission and management for notebooks, Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.date: 02/23/2023
---
# Job admission in Microsoft Fabric Spark

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Fabric spark employs Optimistic Job Admission technique, which determines the minimum number of cores required for a Spark job (interactive or batch jobs from notebook or lakehouse or spark job definitions based on the min node setting of the Spark Pool chosen as the compute option in the workspace setting or environment attached to the items.  jobs are accepted and begin running as long as there are available cores in the Fabric capacity linked to the workspace. The jobs when accepted, start with their min node setting and can request a scale-up within their max node limits depending on the job stages. The job admission and throttling layer on Fabric spark allows the job to scale up if the total cores used by all the jobs currently running and using the Fabric capacity is less than the max burst cores assigned for the Fabric capacity SKU. 

[Learn more the Max SparkVCores limits for Fabric Capacity SKUs](spark-job-concurrency-and-queueing.md)

## How does Optimistic Job Admission work?

In Microsoft Fabric, Starter Pools (which is the default compute option for any workspace) comes preconfigured with min node of 1 and Custom pools users can set the min nodes to a value based on their workload requirement. Spark jobs tend to grow and reduce in compute requirements based on different job stages during their execution within their min and max nodes if autoscaling option is enabled. Based on this the Optimistic Job Admission, uses the min cores for every job submitted to evaluate and admit the job for execution based on the cores available out of the Max Cores in a Fabric capacity.  Once these jobs are admitted, each of these jobs tries to grow based on their max nodes due to the jobs compute demand during the stages of its execution, and during which the scale up requests from all these jobs are approved if the overall cores being used by Spark is still within the burst limits of total cores allocated for the Fabric capacity SKU. 

> [!NOTE]
> The job scale up requests to increase the number of nodes for the job are denied if the utilization has reached the maximum limit and there are no available cores within the total cores limit for the Fabric Capacity. The cores need to be released by other active running jobs finishing or being canceled first.

## How does this impact the Job Concurrency for Fabric Spark? 
The minimum cores requirements for each job will determine whether the job can be accepted or not. If the capacity is fully utilized and there are no cores left that can meet the min core requirements of the job, the job will be rejected. Interactive notebook jobs or Lakehouse operations will be blocked with a *HTTP Response code 430: Unable to submit this request because all the available capacity is currently being used. Cancel a currently running job, increase your available capacity, or try again later* error. Batch jobs will be put in a queue and processed automatically when the cores are freed.

Lets take the example scenario where a user is using Fabric F32 capacity SKU. Assuming all jobs submitted are using the default Starter Pool configuration, without Optimistic Job Admission, the capacity would allow a maximum concurrency of 3 jobs as it reserved all the max number of cores for each job based on the max nodes configuration.

:::image type="content" source="media/job-admission-and-management/reserved-job-admission-overview.png" alt-text="Image showing the job concurrency without optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/reserved-job-admission-overview.png":::

With Optimistic job admission, with the same configuration, the capacity would allow 24 jobs to be admitted and start executing with their min node configuration during a max concurrency scenario as the jobs are admitted accounting for 8 SparkVCores (1 Minimum node configuration of size Medium)

:::image type="content" source="media/job-admission-and-management/optimistic-job-admission-overview.png" alt-text="Image showing the job concurrency with optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/optimistic-job-admission-overview.png":::


> [!NOTE]
> If you want the job to have the total cores reserved for it based on its max nodes configuration, which would ensure the scale up, you could turn off Autoscale and set max nodes to the desired value within the permitted limits based on your Fabric capacity SKU. In this case, since the job does not have a minimum core requirement, this job would get accepted and start running when there are free cores in the Fabric capacity and have the total cores reserved for it ensuring the job scale up to the total cores configured. If the capacity is fully used, the job will either be slowed down if it’s a Notebook interactive job, or would get queued which would be automatically retried as the cores become free in the Capacity.

## Related content

- Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about the [Spark compute for Fabric](spark-compute.md) data engineering and data science experiences.
- Learn more about the [Concurrency and queueing limits for Fabric Spark](spark-job-concurrency-and-queueing.md)
