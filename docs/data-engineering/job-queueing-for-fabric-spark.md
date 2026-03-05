---
title: Job queueing in Apache Spark for Fabric
description: Learn about background job queueing for notebooks, Apache Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: saravi
ms.topic: concept-article
ms.custom: sfi-image-blocked
ms.date: 03/04/2026
ai-usage: ai-assisted
---
# Job queueing in Apache Spark for Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric supports queueing for background Spark jobs when capacity reaches compute limits. Queued jobs are retried automatically until they start or expire.

When capacity is available, jobs start immediately. When capacity is fully used, behavior depends on job type and queue eligibility.

To learn more about concurrency limits, see [Concurrency limits and queueing in Apache Spark for Microsoft Fabric](spark-job-concurrency-and-queueing.md).

## What gets queued

Queueing is supported for:

- Notebook jobs triggered by pipelines.
- Notebook jobs triggered by scheduler.
- Spark Job Definition runs triggered by pipelines or scheduler.

Queueing isn't supported for:

- Interactive notebook jobs.
- Notebook jobs triggered through notebook public API.

The queue uses first in, first out (FIFO) order.

> [!NOTE]
> Queueing isn't supported when Fabric capacity is in a throttled state. New submitted jobs are rejected.

## How job queueing works

If a submitted job is queue-eligible and the Fabric capacity is at maximum compute usage, the job is added to the FIFO queue.

For notebook queueing through a pipeline trigger, you configure a Data Factory pipeline with a notebook activity. To learn that setup, see [Quickstart: Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md) and [Notebook activity](../data-factory/notebook-activity.md).

Use these steps to queue a notebook from a pipeline:

1. Create a new **Pipeline** item and add a **Notebook activity** to run the notebook.

1. Select the **Notebook activity**, open the **Settings** tab, choose the notebook you want to queue, and then **Run** the pipeline.

   :::image type="content" source="media/job-queueing-for-fabric-spark/run-notebook-pipeline.png" alt-text="Screenshot showing how to run a notebook from a pipeline." lightbox="media/job-queueing-for-fabric-spark/run-notebook-pipeline.png":::

1. The job enters the FIFO queue. In the **Monitoring hub**, the job appears as **Not started** while it waits for capacity.

1. As running jobs complete and free resources, queued jobs are picked up. When execution begins, the status changes from **Not started** to **In progress**.

> [!NOTE]
> Queue entries expire 24 hours after queue admission. Expired jobs must be resubmitted.

## Queue sizes

Fabric Spark enforces queue limits by capacity SKU.

|Fabric capacity SKU|Equivalent Power BI SKU|Queue limit|
|---|---|---|
|F2|-|4|
|F4|-|4|
|F8|-|8|
|F16|-|16|
|F32|-|32|
|F64|P1|64|
|F128|P2|128|
|F256|P3|256|
|F512|P4|512|
|F1024|-|1024|
|F2048|-|2048|
|Trial Capacity|P1|Not available|

> [!NOTE]
> Queueing isn't supported for Fabric trial capacities. To use queueing, switch to a paid Fabric F or P SKU.

When a capacity reaches the queue limit, new submissions are rejected with `TooManyRequestsForCapacity` (HTTP 430). To continue, cancel active Spark jobs, choose a larger capacity SKU, or submit again later.

## Related content

- Learn about [Apache Spark billing and utilization in Microsoft Fabric](billing-capacity-management-for-spark.md).
- Learn about [Apache Spark compute for Fabric](spark-compute.md).
- Learn about [job admission in Apache Spark for Microsoft Fabric](job-admission-management.md).
