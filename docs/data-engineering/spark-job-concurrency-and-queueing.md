---
title: Concurrency limits and queueing in Apache Spark for Fabric
description: Learn about the job concurrency limits and queueing for notebooks, Apache Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/20/2023
---
# Concurrency limits and queueing in Apache Spark for Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric allows allocation of compute units through capacity, which is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different items consume different capacity at a certain time. Microsoft Fabric offers capacity through the Fabric SKUs and trials. For more information, see [What is capacity?](../enterprise/scale-capacity.md).

When users create a Microsoft Fabric capacity on Azure, they choose a capacity size based on their analytics workload size. In Apache Spark, users get two Apache Spark VCores for every capacity unit they reserve as part of their SKU.

*One Capacity Unit = Two Spark VCores*

Once they have purchased the capacity, admins can create workspaces within the capacity in Microsoft Fabric. The Spark VCores associated with the capacity are shared among all the Apache Spark-based items like notebooks, Apache Spark job definitions, and lakehouses created in these workspaces.

## Concurrency throttling and queueing

Spark for Fabric enforces a cores-based throttling and queueing mechanism, where users can submit jobs based on the purchased Fabric capacity SKUs. The queueing mechanism is a simple FIFO-based queue, which checks for available job slots and automatically retries the jobs once the capacity has become available. 
When users submit notebook or lakehouse jobs like Load to Table when their capacity is at its maximum utilization due to concurrent running jobs using all the Spark Vcores available for their purchased Fabric capacity SKU, they're throttled with the message

*HTTP Response code 430: This Spark job can't be run because you have hit a Spark compute or API rate limit. To run this Spark job, cancel an active Spark job through the Monitoring hub, or choose a larger capacity SKU or try again later.*

With queueing enabled, notebook jobs triggered from pipelines and job scheduler and Spark job definitions are added to the queue and automatically retried when the capacity is freed up.
The queue expiration is set to 24 hours from the job submission time. After this period, the jobs will need to be resubmitted.

Fabric capacities are enabled with bursting which allows you to consume extra compute cores beyond what have been purchased to speed the execution of a workload. For Apache Spark workloads bursting allows users to submit jobs with a total of 3X the Spark VCores purchased.

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
*F64 SKU* offers *128 Spark VCores*. The burst factor applied for a F64 SKU is 3, which gives a total of 384 Spark Vcores. The burst factor is only applied to help with concurrency and does not increase the max cores available for a single Spark job.  That means *a single Notebook or Spark job definition or lakehouse job* can use a pool configuration of max 128 vCores and 3 jobs with the same configuration can be run concurrently. If notebooks are using a smaller compute configuration, they can be run concurrently till the max utilization reaches the 384 SparkVcore limit.

> [!NOTE]
> The jobs have a queue expiration period of 24 hours, after which they are cancelled, and users must resubmit them for job execution.

Spark for Fabric throttling doesn't have enforced arbitrary jobs-based limits, and the throttling is only based on the number of cores allowed for the purchased Fabric capacity SKU.
The job admission by default will be an optimistic admission control, where the jobs are admitted based on their minimum cores requirement. Learn more about the optimistic job admission [Job Admission and Management](job-admission-management.md)
If the default pool (Starter Pool) option is selected for the workspace, the following table lists the max concurrency job limits.

Learn more about the default starter pool configurations based on the Fabric Capacity SKU [Configuring Starter Pools](configure-starter-pools.md).

## Job level bursting 

Admins can configure their Apache Spark pools to utilize the max Spark cores with burst factor available for the entire capacity. For example a workspace admin having their workspace attached to a F64 Fabric capacity can now configure their Spark pool (Starter pool or Custom pool) to 384 Spark VCores, where the max nodes of Starter pools can be set to 48 or admins can set up an XX Large node size pool with 6 max nodes. 

## Related content

- Get started with [Apache Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about the [Apache Spark compute for Fabric](spark-compute.md) data engineering and data science experiences.
