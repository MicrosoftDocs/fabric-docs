---
title: Concurrency limits and queueing for Fabric Spark
description: Learn about the job concurrency limits and queueing for notebooks, Spark job definitions and lakehouse jobs in Fabric.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.custom: build-2023
ms.date: 02/24/2023
---
# Concurrency limits and queueing in Microsoft Fabric Spark

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric allows allocation of compute units through capacity, which is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different items consume different capacity at a certain time. Microsoft Fabric offers capacity through the Fabric SKUs and trials. For more information, see [What is capacity?](../enterprise/scale-capacity.md)

[!INCLUDE [preview-note](../includes/preview-note.md)]

When users create a Microsoft Fabric capacity on Azure, they get to choose a capacity size based on their analytics workload size. In Spark, users get two Spark VCores for every capacity unit they get reserved as part of their SKU.

*One Capacity Unit = Two Spark VCores*

Once the capacity is purchased, admins can create workspaces within the capacity in Microsoft Fabric. The Spark VCores associated with the capacity is shared among all the Spark-based items like notebooks, Spark job definitions, and the lakehouse created in these workspaces.

## Concurrency throttling and queueing

The following section lists various numerical limits for Spark workloads based on Microsoft Fabric capacity SKUs:

| Capacity SKU | Equivalent Power BI SKU | Capacity units | Equivalent Spark VCores | Max concurrent jobs | Queue limit |
|:-----:|:-----:|:------:|:-----:|:-----:|:-----:|
| F2 | - | 2 | 4 | 1 | 4 |
| F4 | - | 4 | 8 | 1 | 4 |
| F8 | - | 8 | 16 | 2 | 8 |
| F16 | - | 16 | 32 | 4 | 16 |
| F32 | - | 32 | 64 | 8 | 32 |
| F64 | P1 | 64 | 128 | 16 | 64 |
| Fabric Trial | P1 | 64 | 128 | 5 | - |
| F128 | P2 | 128 | 256 | 32 | 128 |
| F256 | P3 | 256 | 512 | 64 | 256 |
| F512 | P4 | 512 | 1024 | 128 | 512 |
| F1024 | - | 1024 | 2048 | 256 | 1024 |
| F2048 | - | 2048 | 4096 | 512 | 2048 |

The queueing mechanism is a simple FIFO-based queue, which checks for available job slots and automatically retries the jobs once the capacity has become available. As there are different items like notebooks, Spark job definition, and lakehouse which users could use in any workspace. As the usage varies across different enterprise teams, users could run into starvation scenarios where there's dependency on only type of item, such as a Spark job definition. This situation could result in users sharing the capacity from running a notebook based job or any lakehouse based operation like load to table.

To avoid these blocking scenarios, Microsoft Fabric applies a **Dynamic reserve based throttling** for jobs from these items. Notebook and lakehouse based jobs being more interactive and real-time are classified as **interactive**. Whereas Spark job definition is classified as **batch**. As part of this dynamic reserve, minimum and maximum reserve bounds are maintained for these job types. The reserves are mainly to address use cases where an enterprise team could experience peak usage scenarios having their entire capacity consumed through batch jobs. During those peak hours, users are blocked from using interactive items like notebooks or lakehouse. With this approach, every capacity gets a minimum reserve of 30% of the total jobs allocated for interactive jobs (5% for lakehouse and 25% for notebooks) and a minimum reserve of 10% for batch jobs.  

| Job type | Item | Min % | Max % |
|--|--|--|--|
| Batch | Spark job definition | 10 | 70 |
| Interactive | Interactive min and max | 30 | 90 |
|  | Notebook | 25 | 85 |
|  | Lakehouse | 5 | 65 |

When they exceed these reserves and when the capacity is at its maximum utilization, interactive jobs like notebooks and lakehouse are throttled with the message *HTTP Response code 430: Unable to submit this request because all the available capacity is currently being used. Cancel a currently running job, increase your available capacity, or try again later*.

With queueing enabled, batch jobs like Spark Job Definitions get added to the queue and are automatically retried when the capacity is freed up.

> [!NOTE]
> The jobs have a queue expiration period of 24 hours, after which they are cancelled and users would have to resubmit them for job execution.

## Next steps

* Get Started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
* Learn about the [Spark compute for Fabric](spark-compute.md) data engineering and data science experiences.
