---
title: Billing and utilization reporting in Fabric Spark
description: Learn about the billing, capacity utilization, and utilization reporting for Spark that powers Data Engineering and Science experiences in Microsoft Fabric.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.custom: ignite-2023
ms.date: 11/07/2023
---
# What is Spark compute in Microsoft Fabric?

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

This article explains the compute utilization and reporting for Fabric Spark which powers the Synapse Data Engineering and Science workloads in Microsoft Fabric. This includes Lakehouse operations like table preview, load to delta, notebook runs from the notebook interface or scheduled runs or the runs triggered by notebook steps in the pipelines and spark job definition runs. 

As every other workload in Microsoft Fabric, Spark also uses the Fabric capacity associated with a workspace to power these job runs and your overall capacity charges appear in the Azure portal  under your subscription [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview).
To understand your Fabric billing, visit [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing.md).

## Fabric Capacity

You as a user could purchase a Fabric capacity from Azure by specifying using an Azure subscription. The size of the capacity determines the amount of computation power available. 
For Fabric Spark every CU purchased translates to 2 Spark VCores. For example if you purchase a Fabric capacity F128, this translates to 256 SparkVCores. 
To understand about the different SKUs, cores allocation and throttling on Spark, visit [Understand Spark throttling and queueing](/spark-job-concurrency-and-queueing.md).

## Fabric Spark compute configuration based on purchased Capacity

Fabric Spark compute offers two options when it comes to compute configuration. 
1. **Starter pools**: These default pools are fast and easy way to use Spark on the Microsoft Fabric platform within seconds. You can use Spark sessions right away, instead of waiting for Spark to set up the nodes for you, which helps you do more with data and get insights quicker.
When it comes to billing and capacity consumption, you're charged when you start executing your notebook or Spark job definition or lakehouse operation. You aren't charged for the time the clusters are idle in the pool.
:::image type="content" source="media/spark-compute/starter-pool-billing-states-high-level.png" alt-text="Diagram showing the high-level stages in billing of starter pools." lightbox="media/spark-compute/starter-pool-billing-states-high-level.png":::

For example, if you submit a notebook job to a starter pool, you're billed only for the time period where the notebook session is active. The billed time doesn't include the idle time or the time taken to personalize the session with the Spark context.
To understand more about configuring Starter pools based on the purchased Fabric Capacity SKU, visit[Configuring Starter Pools based on Fabric Capacity](configure-starter-pools.md)

2.**Spark pools**: These are custom pools, where you get to customize on what size of resources you need for your data analysis tasks. You can give your Spark pool a name, and choose how many and how large the nodes (the machines that do the work) are. You can also tell Spark how to adjust the number of nodes depending on how much work you have. Creating a Spark pool is free; you only pay when you run a Spark job on the pool, and then Spark sets up the nodes for you.

If you don't use your Spark pool for 2 minutes after your session expires, your Spark pool will be deallocated. This default session expiration time period is set to 20 minutes.
The size and number of nodes you can have in your custom Spark pool depends on your Microsoft Fabric capacity. You can use these Spark VCores to create nodes of different sizes for your custom Spark pool, as long as the total number of Spark VCores doesn't exceed 128.
Spark pools are billed like starter pools; you don't pay for the custom Spark pools that you have created unless you have an active Spark session created for running a notebook or Spark job definition. You're only billed for the duration of your job runs. You aren't billed for stages like the cluster creation and deallocation after the job is complete.

:::image type="content" source="media/spark-compute/custom-pool-billing-states-high-level.png" alt-text="Diagram showing the high-level stages in billing of custom pools." lightbox="media/spark-compute/custom-pool-billing-states-high-level.png":::

For example, if you submit a notebook job to a custom Spark pool, you're only charged for the time period when the session is active. The billing for that notebook session stops once the Spark session has stopped or expired. You aren't charged for the time taken to acquire cluster instances from the cloud or for the time taken for initializing the Spark context.
To understand more about configuring Spark pools based on the purchased Fabric Capacity SKU, visit[Configuring Pools based on Fabric Capacity](spark-compute.md)

## Spark compute usage reporting

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workloads in one place. It's used by capacity administrators to monitor the performance of workloads and their usage, compared to purchased capacity.  

Once you have installed the app, select the item type **Notebook**,**Lakehouse**,**Spark Job Defintion** from the **Select item kind:** dropdown list. The **Multi metric ribbon chart** chart can now be adjusted to a desired timeframe to understand the usage from all these selected items.
To understand more about Spark capacity usage reporting, visit[Understand Spark Capacity consumption using Capacity Metrics App](monitor-spark-capacity-consumption.md)

## Next steps

* [Get Started with Data Engineering/Science Admin Settings for your Fabric Capacity](capacity-settings-overview.md)
* [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
