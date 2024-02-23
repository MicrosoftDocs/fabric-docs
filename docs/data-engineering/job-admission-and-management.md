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

Fabric spark employs Optimistic Job Admission technique which determines the minimum number of cores required for a Spark job (interactive or batch jobs from notebook or lakehouse or spark job definitions based on the min node setting of the Spark Pool chosen as the compute option in the workspace setting or environment attached to the items. The jobs will be accepted and will begin running as long as there are cores available in the Fabric capacity linked to the workspace. The jobs when accepted, start with their min node setting and can request a scale up within their max node limits depending on the job stages. The job admission and throttling layer on Fabric spark allows the scale up if the total cores used by all the jobs currently running and using the Fabric capacity is less than the max burst cores assigned for the Fabric capacity SKU. 

[Learn more the Max SparkVCores limits for Fabric Capacity SKUs](spark-job-concurrency-and-queueing.md)

## How does Optimistic Job Admission work?

In Microsoft Fabric, Starter Pools (which is the default compute option for any workspace) comes preconfigured with min node of 1 and Custom pools users can set the min nodes to a value based on their workload requirement. Spark jobs tend to grow and reduce in compute requirements based on different job stages during their execution within their min and max nodes if autoscaling option is enabled. Based on this the Optimistic Job Admission uses the min cores for every job submitted to evaluate and admit the job for execution based on the cores available out of the Max Cores in a Fabric capacity.  Once these jobs are admitted, each of these jobs tries to grow based on their max nodes due to the jobs compute demand during the stages of its execution, and during which the scale up requests from all these jobs are approved if the overall cores being used by Spark is still within the burst limits of total cores allocated for the Fabric capacity SKU. If the utilization is already at the maximum limit and there is no available cores based on the max limit of total cores for the Fabric Capacity, the job scale up requests to add more nodes to the job gets rejected until the cores are freed up by completion or cancelation of other active running jobs. 

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
| Trial Capacity | P1 | 128 | 384 |  NA |

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
