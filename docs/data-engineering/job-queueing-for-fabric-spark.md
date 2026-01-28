---
title: Job queueing in Apache Spark for Fabric
description: Learn about background job queueing for notebooks, Apache Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom: sfi-image-blocked
ms.date: 04/10/2024
---
# Job queueing in Apache Spark for Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric supports the queueing of background jobs when you have reached your Spark compute limits for your Fabric capacity. The job queueing system offers automatic retries for jobs that are added to the queue until they reach queue expiry. When users create a Microsoft Fabric capacity on Azure, they choose a capacity size based on the size of their analytics workload.

After purchasing the capacity, admins can create workspaces within the capacity in Microsoft Fabric. Spark jobs that run within these workspaces can use up to the maximum cores allocated for a given capacity, and once the max limit has been reached, the jobs are either throttled or queued.

Learn more about the [Spark Concurrency Limits in Microsoft Fabric](spark-job-concurrency-and-queueing.md)

Job queueing is supported for Notebook jobs and Spark job definitions that are triggered by pipelines or through the scheduler. Queueing isn't supported for **interactive notebook jobs** and notebook jobs triggered through **notebook public API**.

The queue operates in a First-In-First-Out (FIFO) manner, where jobs are added to the queue based on the time of their submission and are constantly retried and start executing when the capacity is freed up.

> [!NOTE]
> Queueing of Spark jobs isn't supported when your Fabric capacity is in its throttled state. All new jobs submitted will be rejected.

## How job queueing works

When a Spark job is submitted, if the Fabric capacity is already at its maximum compute limit, the job can't be executed immediately. In such cases, you can queue the job for execution. Use the following steps to queue a notebook from a pipeline:

1. Create a new **Pipeline** item and a new **Pipeline activity** within it to run the notebook.

1. From the pipeline activity, open the **Settings** tab and choose the notebook you want to queue and **Run** the pipeline.

   :::image type="content" source="media\job-queueing-for-fabric-spark\run-notebook-pipeline.png" alt-text="Screenshot showing how to run a notebook from a pipeline." lightbox="media/job-queueing-for-fabric-spark/run-notebook-pipeline.png":::

1. The Job enters FIFO queue. Navigate to the **Monitor** hub and notice that the job status is **Not Started** indicating it's been queued and awaiting capacity.

1. As existing jobs complete and free up compute resources, jobs from the queue are picked up. When the execution begins, the status changes from **Not Started** to **In Progress**. Queue expires after 24 hours for all jobs from the time they were admitted into the queue. Once the expiration time is reached, the jobs must be resubmitted.

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
> Queueing isn't supported for Fabric trial capacities. Users would have to switch to a paid Fabric F or P SKU to use queueing for Spark jobs.

Once the max queue limit has been reached for a Fabric capacity, the new jobs submitted will be throttled with an error message _[TooManyRequestsForCapacity] This spark job can't be run because you have hit a spark compute or API rate limit. To run this spark job, cancel an active Spark job through the Monitoring hub, choose a larger capacity SKU, or try again later. HTTP status code: 430 {Learn more} HTTP status code: 430_.

## Related content

- Learn about the [Billing and utilization for Spark in Microsoft Fabric](billing-capacity-management-for-spark.md).
- Learn about the [Spark compute for Fabric](spark-compute.md) data engineering and data science experiences.
