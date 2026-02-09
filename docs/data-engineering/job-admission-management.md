---
title: Job admission in Apache Spark for Fabric
description: Learn about job admission and management for notebooks, Apache Spark job definitions, and lakehouse jobs in Fabric.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.date: 05/09/2024
---
# Job admission in Apache Spark for Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Apache Spark for Fabric utilizes the optimistic job admission technique to determine the minimum core requirement for Spark jobs. This process is applicable to interactive or batch jobs from notebooks, lakehouses, or Spark job definitions. It relies on the minimum node setting of the chosen Spark pool in the workspace settings or attached environment. If available cores are found in the Fabric capacity linked to the workspace, the job is accepted and commences execution. Jobs initiate with their minimum node setting and can scale up within their maximum node limits as per job stages. If the total cores used by running jobs utilizing the Fabric capacity is below the maximum burst cores assigned, the job admission and throttling layer on Fabric Spark permits the job to scale up.

For more information, see [Concurrency limits and queueing in Microsoft Fabric Spark](spark-job-concurrency-and-queueing.md).

## How does optimistic job admission work?

In Fabric, starter pools come with a default minimum of one node, while custom pools allow you to set minimum nodes based on workload needs. Autoscaling adjusts compute requirements for Spark jobs during execution stages, within the configured minimum and maximum nodes. Optimistic job admission evaluates job submissions based on available cores, and executes them with minimum cores. Jobs attempt to grow based on maximum allocated nodes during execution. Scale-up requests are approved if total Spark cores used are within allocated capacity limits.

> [!NOTE]
> If usage reaches the maximum limit and all cores within the total capacity for Fabric are in use, any scale-up requests will be denied. Active jobs must either finish or be canceled to free up cores.

## How does this affect job concurrency?

The minimum core requirement for each job determines if the job can be accepted. If the capacity is fully utilized and has no cores left  to fulfill a job's minimum core needs, the job is rejected. Interactive notebook jobs or Lakehouse operations will be blocked with an error message *Unable to submit this request because all the available capacity is currently being used. Cancel a currently running job, increase your available capacity, or try again later*. Batch jobs are queued and executed once cores become available.

For example, consider a scenario with a user utilizing the Fabric F32 capacity SKU. Assuming all jobs use the default starter pool setup without optimistic job admission, the capacity would support a maximum concurrency of three jobs. The maximum number of cores per job are allocated according to the max nodes configuration.

:::image type="content" source="media/job-admission-and-management/reserved-job-admission-overview.png" alt-text="Screenshot showing the job concurrency without optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/reserved-job-admission-overview.png":::

With optimistic job admission with same capacity as above, 24 jobs can be admitted and executed using their minimum node configuration during maximum concurrency scenario. Because each job requires 8 Spark VCores where one minimum node configuration is of size medium.

:::image type="content" source="media/job-admission-and-management/job-admission.gif" alt-text="Screenshot showing the job concurrency with optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/job-admission.gif":::

## Scale jobs with Spark autoscale

When you enable autoscale for Spark pools, jobs execute with their minimum node configuration. During runtime, scaling may occur. These requests go through the job admission control. Approved requests scale up to the maximum limits based on total available cores. Rejected requests don't affect active jobs; they continue to run with their current configuration until cores become available.

:::image type="content" source="media/job-admission-and-management/job-scale-up.gif" alt-text="Screenshot showing a job scaling up with optimistic job admission in Fabric Spark." lightbox="media/job-admission-and-management/job-scale-up.gif":::

> [!NOTE]
> To ensure maximum core allocation for a job according to its max nodes configuration, disable autoscale and set the max nodes within Fabric capacity SKU. In this case, since the job has no minimum core requirement, it will start running once free cores are available, scaling up to the configured total. If capacity is fully used, notebook interactive jobs may slow down or queued. Queued jobs are automatically retried as cores become available.

## Related content

- Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
- Learn about [Spark compute for Fabric](spark-compute.md) data engineering and data science.
- Learn more about the [Concurrency and queueing limits for Fabric Spark](spark-job-concurrency-and-queueing.md).
