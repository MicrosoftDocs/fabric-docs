---
title: Concurrency limits and queueing for Fabric Spark
description: Learn about the job concurrency limits and queueing for notebooks, Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/20/2023
---
# Concurrency limits and queueing in Microsoft Fabric Spark

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric allows allocation of compute units through capacity, which is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different items consume different capacity at a certain time. Microsoft Fabric offers capacity through the Fabric SKUs and trials. For more information, see [What is capacity?](../enterprise/scale-capacity.md).

When users create a Microsoft Fabric capacity on Azure, they choose a capacity size based on their analytics workload size. In Spark, users get two Spark VCores for every capacity unit they reserve as part of their SKU.

*One Capacity Unit = Two Spark VCores*

Once they have purchased the capacity, admins can create workspaces within the capacity in Microsoft Fabric. The Spark VCores associated with the capacity are shared among all the Spark-based items like notebooks, Spark job definitions, and lakehouses created in these workspaces.

## Concurrency throttling and queueing

Fabric Spark enforces a cores-based throttling and queueing mechanism, where users can submit jobs based on the purchased Fabric capacity SKUs. The queueing mechanism is a simple FIFO-based queue, which checks for available job slots and automatically retries the jobs once the capacity has become available. Because users can use different items like notebooks, Spark job definitions, and lakehouses in any workspace, and the usage varies across different enterprise teams, they could run into starvation scenarios where there's dependency on only type of item (like a Spark job definition). This situation could result in users sharing the capacity from running a notebook-based job or any lakehouse-based operation like load to table. 

Microsoft Fabric Spark supports two types of jobs, **interactive** and **batch**. Below is a table detailing the jobs and their respective groups:

| Job Type    | Operation                                         |
| ----------- | ------------------------------------------------- |
|             | Jobs submitted from notebook                      |
|             | Scheduled notebook jobs                           |
| Interactive | Notebook jobs from pipelines                      |
|             | Lakehouse operations like Table Preview           |
|             | Spark job definitions                             |
| Batch       | Lakehouse operations like load to delta           |


To avoid these blocking scenarios, Microsoft Fabric applies a **dynamic reserve-based throttling** for jobs from these items, based on two job types. Because notebook- and lakehouse-based jobs are more interactive and real-time, they're classified as **interactive**. Spark job definitions are classified as **batch**. As part of this dynamic reserve, minimum and maximum reserve bounds are maintained for these job types. The reserves address use cases where an enterprise team could experience peak usage scenarios, having their entire capacity consumed by batch jobs. During those peak hours, users are blocked from using interactive items like notebooks or lakehouses. With this approach, every capacity has a minimum reserve of 30% of the total jobs allocated for interactive jobs (5% for lakehouses and 25% for notebooks), and a minimum reserve of 10% for batch jobs.

| Job type | Item | Min % | Max % |
|--|--|--|--|
| Batch | Spark job definition | 10 | 70 |
| Interactive | Interactive min and max | 30 | 90 |
|  | Notebook | 25 | 85 |
|  | Lakehouse | 5 | 65 |

When interactive jobs exceed these reserves and when the capacity is at its maximum utilization due to concurrent running jobs, they're throttled with the message *HTTP Response code 430: Unable to submit this request because all the available capacity is currently being used. Cancel a currently running job, increase your available capacity, or try again later.*

With queueing enabled, batch jobs are added to the queue and automatically retried when the capacity is freed up.

Fabric capacities offer bursting which allows you to consume extra compute cores beyond what have been purchased to speed the execution of a workload. For Spark workloads bursting allows users to submit jobs with a total of 3X the Spark VCores purchased. 

> [!NOTE]
> The bursting factor only increases the total number of Spark VCores to help with the concurrency but doesn't increase the max cores per job. Users can't submit a job that requires more cores than what their Fabric capacity offers.

The following section lists various cores-based limits for Spark workloads based on Microsoft Fabric capacity SKUs:

| Fabric capacity SKU | Equivalent Power BI SKU | Spark VCores | Interactive min cores | Interactive max cores (with bursting) | Batch min cores | Batch max cores (with bursting) | Queue limit |
|--|--|--|--|--|--|--|--|
| F2 | - | 4 | 6 | 18 | 2 | 14 | 4 |
| F4 | - | 8 | 7 | 22 | 2 | 17 | 4 |
| F8 | - | 16 | 14 | 43 | 5 | 34 | 8 |
| F16 | - | 32 | 29 | 86 | 10 | 67 | 16 |
| F32 | - | 64 | 58 | 173 | 19 | 134 | 32 |
| F64 | P1 | 128 | 115 | 346 | 38 | 269 | 64 |
| F128 | P2 | 256 | 230 | 691 | 77 | 538 | 128 |
| F256 | P3 | 512 | 461 | 1382 | 154 | 1075 | 256 |
| F512 | P4 | 1024 | 922 | 2765 | 307 | 2150 | 512 |
| F1024 | - | 2048 | 1843 | 5530 | 614 | 4301 | 1024 |
| F2048 | - | 4096 | 3686 | 11058 | 1229 | 8602 | 2048 |
| Trial Capacity | P1 | 128 | 38 | 115 | 13 | 90 | NA |

Example calculation:
*F64 SKU* offers *128 Spark VCores*. The maximum reserve percentage of *interactive jobs* is 90%.  That means *Interactive max cores (with bursting)* can be calculated as 128 vCores x 3 BurstFactor x 0.9 MaxReserve = 345,6 which rounds to 346 as can be seen in the table.

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


## Next steps

- Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about the [Spark compute for Fabric](spark-compute.md) data engineering and data science experiences.
