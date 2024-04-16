---
title: Job queueing for Fabric Spark
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

Microsoft Fabric supports the queueing of background jobs when you have reached your Spark compute limits for your Fabric capacity. The job queueing system offers automatic retries for jobs that are added to the queue until they reach queue expiry. When users create a Microsoft Fabric capacity on Azure, they choose a capacity size based on the size of their analytics workload. 
After purchasing the capacity, admins can create workspaces within the capacity in Microsoft Fabric. Spark jobs that run within these workspaces can use up to the maximum cores allocated for a given capacity, and once the max limit has been reached, the jobs are either throttled or queued.

Learn more about the [Spark Concurrency Limits in Microsoft Fabric](spark-job-concurrency-and-queueing.md)

Job queueing is supported for Notebook jobs that are triggered by pipelines or through the scheduler, as well as for Spark job definitions. Queueing is not supported for **interactive notebook jobs** and notebook jobs triggered through **notebook public API**.

The queue operates in a First-In-First-Out (FIFO) manner, where jobs are added to the queue based on the time of their submission and are constantly retried and start executing when the capacity is freed up. 

> [!NOTE]
> Queueing of Spark jobs is not supported when your Fabric capacity is in its throttled state. All new jobs submitted will be rejected. In the case of Spark jobs this could occur when the Spark usage has been at its maximum for > 24 Hours. Learn more about [Fabric Capacity throttling policy](./enterprise/throttling.md)

:::image type="content" source="media\job-queueing-for-fabric-spark\job-queueing-animation.gif" alt-text="Animated illustration of the process of job queuing in Microsoft Fabric.":::

Once a job is added to the queue, its status is updated to **Not Started** in the Monitoring hub. Notebooks and Spark Job Definitions when they get picked from the queue and begin executing, their status is updated from **Not Started** to **In progress**.

> [!NOTE]
> Queue expiration is 24 hours for all jobs from the time they were admitted into the queue. Once the expiration time is reached, the jobs will need to be resubmitted.


## Queue Sizes

Fabric Spark enforces queue sizes based on the capacity SKU size attached to a workspace, providing a throttling and queueing mechanism where users can submit jobs based on the purchased Fabric capacity SKUs.

The following section lists various queue sizes for Spark workloads based on Microsoft Fabric based on the capacity SKUs:

| Fabric capacity SKU | Equivalent Power BI SKU | Queue limit |
| ------------------- | ----------------------- | ----------- |
| F2                  | -                       | 4           |
| F4                  | -                       | 4           |
| F8                  | -                       | 8           |
| F16                 | -                       | 16          |
| F32                 | -                       | 32          |
| F64                 | P1                      | 64          |
| F128                | P2                      | 128         |
| F256                | P3                      | 256         |
| F512                | P4                      | 512         |
| F1024               | -                       | 1024        |
| F2048               | -                       | 2048        |
| Trial Capacity      | P1                      | NA          |


> [!NOTE]
> Queueing is not supported for Fabric trial capacities. Users would have to switch to a paid Fabric F or P SKU to use queueing for Spark jobs.

Once the max queue limit has been reached for a Fabric capacity, the new jobs submitted will be throttled with a error message _[TooManyRequestsForCapacity] This spark job can't be run because you have hit a spark compute or API rate limit. To run this spark job, cancel an active Spark job through the Monitoring hub, choose a larger capacity SKU, or try again later. HTTP status code: 430 {Learn more} HTTP status code: 430_.

## Related content

- Learn about the [Billing and utilization for Spark in Microsoft Fabric](billing-capacity-management-for-spark.md).
- Learn about the [Spark compute for Fabric](spark-compute.md) data engineering and data science experiences.
