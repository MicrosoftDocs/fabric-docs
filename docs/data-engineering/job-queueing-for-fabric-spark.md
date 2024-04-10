---
title: Job queueingfor Fabric Spark
description: Learn about the job queueing for notebooks, Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/10/2024
---
# Job queueing in Microsoft Fabric Spark

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric supports queueing of background jobs when you have hit your Spark compute limits for your Fabric capacity. The job queueing offers automatic retries to jobs that are added to the queue till they reach queue expiry. Users create a Microsoft Fabric capacity on Azure, they choose a capacity size based on their analytics workload size. In Spark, users get two Spark VCores for every capacity unit they reserve as part of their SKU.

*One Capacity Unit = Two Spark VCores*

Once they have purchased the capacity, admins can create workspaces within the capacity in Microsoft Fabric. The Spark VCores associated with the capacity are shared among all the Spark-based items like notebooks, Spark job definitions, and lakehouses created in these workspaces. Spark jobs that run within these workspaces can use upto the max cores allocated for a given capacity and once the max limit has been reached the jobs are either throttled or queued. Learn more about the concurrency limits on Fabric Spark based on Fabric SKUs [Concurrency limits on Fabric Spark](spark-job-concurrency-and-queueing.md)
Job queueing is support for Notebook jobs that are triggered by Pipelines, or triggered through Scheduler, and Spark job definitions. The queue works in a First-In-First-Out(FIFO) manner where the jobs are added to the queue based on the time of their submission and are contsnalt retied and start executing when the capacity is freed up. 

> [!NOTE]
> The bursting factor only increases the total number of Spark VCores to help with the concurrency but doesn't increase the max cores per job. Users can't submit a job that requires more cores than what their Fabric capacity offers.


## Queue Sizes

Fabric Spark enforces a cores-based throttling and queueing mechanism, where users can submit jobs based on the purchased Fabric capacity SKUs. The queueing mechanism is a simple FIFO-based queue, which checks for available job slots and automatically retries the jobs once the capacity has become available. 
When users submit notebook or lakehouse jobs like Load to Table when their capacity is at its maximum utilization due to concurrent running jobs using all the Spark Vcores available for their purchased Fabric capacity SKU, they're throttled with the message *HTTP Response code 430: Unable to submit this request because all the available capacity is currently being used. Cancel a currently running job, increase your available capacity, or try again later.*

With queueing enabled, notebook jobs triggered from pipelines and job scheduler and spark job defintions are added to the queue and automatically retried when the capacity is freed up.
The queue expiration is set to 24 hours from the job submission time. After this period, the jobs will need to be resubmitted.

Fabric capacities offer bursting which allows you to consume extra compute cores beyond what have been purchased to speed the execution of a workload. For Spark workloads bursting allows users to submit jobs with a total of 3X the Spark VCores purchased.

> [!NOTE]
> The bursting factor only increases the total number of Spark VCores to help with the concurrency but doesn't increase the max cores per job. Users can't submit a job that requires more cores than what their Fabric capacity offers.

The following section lists various cores-based limits for Spark workloads based on Microsoft Fabric capacity SKUs:

| Fabric capacity SKU | Equivalent Power BI SKU | Spark VCores | Max Spark VCores with Burst Factor | Queue limit |
|--|--|--|--|--|
| F2 | - | 4 | 20 | 4 |
| F4 | - | 8 | 24 | 4 |
| F8 | - | 16 | 48 | 8 |
| F16 | - | 32 | 96 | 16 |
| F32 | - | 64 | 192 | 32 |
| F64 | P1 | 128 | 384 | 64 |
| F128 | P2 | 256 | 768 | 128 |
| F256 | P3 | 512 | 1536 | 256 |
| F512 | P4 | 1024 | 3072 | 512 |
| F1024 | - | 2048 | 6144 | 1024 |
| F2048 | - | 4096 | 12288 | 2048 |
| Trial Capacity | P1 | 128 | 128 |  NA |

Example calculation:
*F64 SKU* offers *128 Spark VCores*. The burst factor applied for a F64 SKU is 3, which gives a total of 384 Spark Vcores. The burst factor is only applied to help with concurrency and does not increase the max cores available for a single Spark job.  That means *a single Notebook or Spark Job Definition or Lakehouse Job* can use a pool configuration of max 128 vCores and 3 jobs with the same configuration can be run concurrently. If notebooks are using a smaller compute configuration, they can be run concurrently till the max utilization reaches the 384 SparkVcore limit.

> [!NOTE]
> The jobs have a queue expiration period of 24 hours, after which they are cancelled, and users must resubmit them for job execution.

Fabric Spark throttling doesn't have enforced arbitrary jobs-based limits, and the throttling is only based on the number of cores allowed for the purchased Fabric capacity SKU.

If the default pool (Starter Pool) option is selected for the workspace, the following table lists the max concurrency job limits.

Learn more about the default starter pool configurations based on the Fabric Capacity SKU [Configuring Starter Pools](configure-starter-pools.md)

| SKU Name         | Capacity Units | Spark VCores | Cores per Job (Default Starter Pools Configuration)| Max Jobs |
|------------------|----------------|--------------|---------------------------|----------|
| F2               | 2              | 4            | 8                         | 2        |
| F4               | 4              | 8            | 8                         | 3        |
| F8               | 8              | 16           | 16                        | 3        |
| F16              | 16             | 32           | 32                        | 3        |
| F32              | 32             | 64           | 64                        | 3        |
| F64              | 64             | 128          | 80                        | 4        |
| Trial Capacity   | 64             | 128          | 80                        | 4        |
| F128             | 128            | 256          | 80                        | 9        |
| F256             | 256            | 512          | 80                        | 19       |
| F512             | 512            | 1024         | 80                        | 38       |
| F1024            | 1024           | 2048         | 80                        | 76       |
| F2048            | 2048           | 4096         | 80                        | 153      |

## Related content

- Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about the [Spark compute for Fabric](spark-compute.md) data engineering and data science experiences.
