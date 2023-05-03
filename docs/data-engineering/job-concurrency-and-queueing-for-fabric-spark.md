---
title: Concurrency limits and queueing for Fabric Spark
description: Learn about the job concurrency limits and queueing for notebooks, spark job definitions and lakehouse jobs in Fabric.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.date: 02/24/2023
---
# Concurrency limits and queueing for Fabric Spark

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] allows allocation of compute units through Capacity, which is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different items consume different capacity at a certain time. [!INCLUDE [product-name](../includes/product-name.md)] offers capacity through the Fabric SKU and Trials. For more information, see [What is capacity?](../enterprise/what-is-capacity.md)

When users create a [!INCLUDE [product-name](../includes/product-name.md)] capacity on Azure, they get to choose a capacity size based on their analytics workload size. When it comes to spark, users get 2 spark VCores for every capacity unit they get reserved as part of their SKU. 

1 Spark VCore = 2 Capacity Units. 

Once the capacity is purchased, admins can create workspaces within the capacity in [!INCLUDE [product-name](../includes/product-name.md)]  and the Spark VCores associated with the capacity is shared among all the Spark based items like notebooks, spark job definitions and lakehouses created in these workspaces. 

## Concurrency Throttling and Queueing for Data Engineering/Science in Fabric Spark

The following section lists various numerical limits for Fabric Spark workload based on [!INCLUDE [product-name](../includes/product-name.md)] capacity SKUs.

|Capacity SKU|Equivalent Power BI SKU| Capacity Units| Equivalent Spark VCores| Max Concurrent Jobs| Queue Limit|
|:-----:|:-----:|:------:|:-----:|:-----:|:-----:|
|F2|-|2|4|1|4|
|F4|-|4|8|1|4|
|F8|-|8|16|2|8|
|F16|-|16|32|5|20|
|F32|-|32|64|10|40|
|F64|P1|64|128|20|80|
|Fabric Trial|P2|64|128|5|-|
|F128|P3|128|256|40|160|
|F256|P4|256|512|80|320|
|F512|P5|512|1024|160|640|

The queueing mechanism is a simple FIFO based queue which checks for available job slots and automatically retries the jobs once the capacity has become available. 

As there are different items like notebooks, spark job defintions and lakehouses which users could use in any workspace, and as usage varies across different enterprise teams, users could run into starvation scenarios where the dependency on only type of item, like spark job defintions could result in users sharing the capacity from running a notebook based job or any lakehouse based operation like load to table. 

To avoid these  blocking scenarios, [!INCLUDE [product-name](../includes/product-name.md)] applies a **Dynamic reserve based throttling** for jobs from these items. Notebook and Lakehouse based jobs being more interactive and real-time are classified as **interactive** and spark job defintions are classfied as **batch**. As part of this Dynamic reserve, a minimum and maximum reserve bounds is maintained for these job types. This is mainly to address usecases where an enterprise team could experience peak usage scenarios having their entire capacity consumed by batch jobs and during those peak hours, users will be blocked from using interactive items like notebooks or lakehouses. With this approach every capacity gets a minimum reserve of 30% of the total jobs allocated for interactive jobs (5% for Lakehouse and 25% for notebooks) and a minimum reserve of 10% for batch jobs.  

| Job Type     | Artifact                  | Min % | Max % |
|--------------|---------------------------|-------|-------|
| Batch Jobs   | Spark Job Definitions     | 10    | 70    |
| Interactive  | Interactive Min and Max   | 30    | 90    |
|              | Notebooks                 | 25    | 85    |
|              | LH Operations             | 5     | 65    |


Interactive jobs like Notebooks and Lakehouses are throttled with a  **HTTP Response code 430 : Unable to submit this request because all the available capacity is currently being used. Cancel a currently running job, increase your available capacity, or try again later**,  when they exceed these reserves and when their capacity is at its maximum utilization

With queueing enabled, Batch jobs like Spark Job Defintions get added to the queue and are automatically retried when the capacity is freed up.

> [!NOTE]
> The jobs have a queue expiration period of 24 hours, after which they are cancelled and users would have to resubmit them for job execution. 

## Next steps

>[!div class="nextstepaction"]
>[Get Started with Data Engineering/Science Admin Settings for your Fabric Workspace](data-engineering-and-science-workspace-admin-settings.md)
>[Learn about the Spark Compute for Fabric Data Engineering/Science workloads](spark-compute.md)
