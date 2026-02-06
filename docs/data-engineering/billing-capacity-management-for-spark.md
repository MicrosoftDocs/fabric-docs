---
title: Billing and utilization reports in Apache Spark for Fabric
description: Learn about the billing, capacity utilization, and utilization reporting for Apache Spark in the Data Engineering and Science experiences in Microsoft Fabric.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 11/11/2024
---
# Billing and utilization reporting for Apache Spark in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

This article explains the compute utilization and reporting for ApacheSpark which powers the Fabric Data Engineering and Science workloads in Microsoft Fabric. The compute utilization includes lakehouse operations like table preview, load to delta, notebook runs from the interface, scheduled runs, runs triggered by notebook steps in the pipelines, and Apache Spark job definition runs. 

Like other experiences in Microsoft Fabric, Data Engineering also uses the capacity associated with a workspace to run these job and your overall capacity charges appear in the Azure portal under your [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview) subscription. To learn more about Fabric billing, see [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing.md).

## Fabric capacity

You as a user could purchase a Fabric capacity from Azure by specifying using an Azure subscription. The size of the capacity determines the amount of computation power available. 
For Apache Spark for Fabric, every CU purchased translates to 2 Apache Spark VCores. For example if you purchase a Fabric capacity F128, this translates to 256 SparkVCores. A Fabric capacity is shared across all the workspaces added to it and in which the total Apache Spark compute allowed gets shared across all the jobs submitted from all the workspaces associated to a capacity. 
To understand about the different SKUs, cores allocation and throttling on Spark, see [Concurrency limits and queueing in Apache Spark for Microsoft Fabric](spark-job-concurrency-and-queueing.md).

## Autoscale Billing for Spark

**Autoscale Billing for Spark** introduces a flexible, pay-as-you-go billing model for Spark workloads in Microsoft Fabric. With this model enabled, Spark jobs use dedicated serverless resources instead of consuming compute from Fabric capacity. This serverless option optimizes cost and provides scalability without resource contention.

When enabled, **Autoscale Billing** allows you to set a maximum Capacity Unit (CU) limit, which controls your budget and resource allocation. The billing for Spark jobs is based solely on the compute used during job execution, with no idle compute costs. The cost per Spark job remains the same (0.5 CU Hour), and you are only charged for the runtime of active jobs.

### Key Benefits of Autoscale Billing:
- **Cost Efficiency**: Pay only for the Spark job runtime.
- **Independent Scaling**: Spark workloads scale independently of other workload demands.
- **Enterprise-Ready**: Integrates with Azure Quota Management for flexible scaling.

### How Autoscale Billing Works:
- Spark jobs no longer consume CU from the Fabric capacity but instead use serverless resources.
- A max CU limit can be set to align with budget or governance policies, ensuring predictable costs.
- Once the CU limit is reached, Spark jobs will either queue (for batch jobs) or throttle (for interactive jobs).
- There is no idle compute cost, and only active job compute usage is billed.

For more detailed information, see the [Autoscale Billing for Spark Overview](autoscale-billing-for-spark-overview.md).

## Spark compute configuration and purchased capacity

Apache Spark compute for Fabric offers two options when it comes to compute configuration. 

1. **Starter pools**: These default pools are fast and easy way to use Spark on the Microsoft Fabric platform within seconds. You can use Spark sessions right away, instead of waiting for Spark to set up the nodes for you, which helps you do more with data and get insights quicker. When it comes to billing and capacity consumption, you're charged when you start executing your notebook or Spark job definition or lakehouse operation. You aren't charged for the time the clusters are idle in the pool.

   :::image type="content" source="media/spark-compute/starter-pool-billing-states-high-level.png" alt-text="Diagram showing the high-level stages in billing of starter pools." lightbox="media/spark-compute/starter-pool-billing-states-high-level.png":::

   For example, if you submit a notebook job to a starter pool, you're billed only for the time period where the notebook session is active. The billed time doesn't include the idle time or the time taken to personalize the session with the Spark context.
   To understand more about configuring Starter pools based on the purchased Fabric Capacity SKU, visit [Configuring Starter Pools based on Fabric Capacity](configure-starter-pools.md)

2. **Spark pools**: These are custom pools, where you get to customize on what size of resources you need for your data analysis tasks. You can give your Spark pool a name, and choose how many and how large the nodes (the machines that do the work) are. You can also tell Spark how to adjust the number of nodes depending on how much work you have. Creating a Spark pool is free; you only pay when you run a Spark job on the pool, and then Spark sets up the nodes for you.

   * The size and number of nodes you can have in your custom Spark pool depends on your Microsoft Fabric capacity. You can use these Spark VCores to create nodes of different sizes for your custom Spark pool, as long as the total number of Spark VCores doesn't exceed 128.
   * Spark pools are billed like starter pools; you don't pay for the custom Spark pools that you have created unless you have an active Spark session created for running a notebook or Spark job definition. You're only billed for the duration of your job runs. You aren't billed for stages like the cluster creation and deallocation after the job is complete.

   :::image type="content" source="media/spark-compute/custom-pool-billing-states-high-level.png" alt-text="Diagram showing the high-level stages in billing of custom pools." lightbox="media/spark-compute/custom-pool-billing-states-high-level.png":::

   For example, if you submit a notebook job to a custom Spark pool, you're only charged for the time period when the session is active. The billing for that notebook session stops once the Spark session has stopped or expired. You aren't charged for the time taken to acquire cluster instances from the cloud or for the time taken for initializing the Spark context. To understand more about configuring Spark pools based on the purchased Fabric Capacity SKU, visit [Configuring Pools based on Fabric Capacity](spark-compute.md)

> [!NOTE]
> The default session expiration time period for the Starter Pools and Spark Pools that you create is set to 20 minutes.
> If you don't use your Spark pool for 2 minutes after your session expires, your Spark pool will be deallocated.
> To stop the session and the billing after completing your notebook execution before the session expiry time period, you can either click the stop session button from the notebooks Home menu or go to the monitoring hub page and stop the session there. 

## Spark compute usage reporting

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workloads in one place. It's used by capacity administrators to monitor the performance of workloads and their usage, compared to purchased capacity.  

Once you have installed the app, select the item type **Notebook**,**Lakehouse**,**Spark Job Definition** from the **Select item kind:** dropdown list. The **Multi metric ribbon chart** chart can now be adjusted to a desired timeframe to understand the usage from all these selected items.

All Spark related operations are classified as [background operations](../enterprise/fabric-operations.md#background-operations). Capacity consumption from Spark is displayed under a notebook, a Spark job definition, or a lakehouse, and is aggregated by operation name and item. For example: If you run a notebook job, you can see the notebook run, the CUs used by the notebook (Total Spark VCores/2 as 1 CU gives 2 Spark VCores), duration the job has taken in the report. 

:::image type="content" source="media\monitor-spark-capacity-consumption\items-report.png" alt-text="Screenshot showing items report." lightbox="media\monitor-spark-capacity-consumption\items-report.png":::
To understand more about Spark capacity usage reporting, see [Monitor Apache Spark capacity consumption](monitor-spark-capacity-consumption.md)

## Billing example

Consider the following scenario: 

* There is a Capacity C1 which hosts a Fabric Workspace W1 and this Workspace contains Lakehouse LH1 and Notebook NB1. 
  * Any Spark operation that the notebook(NB1) or lakehouse(LH1) performs is reported against the capacity C1. 

* Extending this example to a scenario where there is another Capacity C2 which hosts a Fabric Workspace W2 and lets say that this Workspace contains a Spark job definition (SJD1) and Lakehouse (LH2). 

  * If the Spark Job Definition (SDJ2) from Workspace (W2) reads data from lakehouse (LH1) the usage is reported against the Capacity C2 which is associated with the Workspace (W2) hosting the item.
  * If the Notebook (NB1) performs a read operation from Lakehouse(LH2), the capacity consumption is reported against the Capacity C1 which is powering the workspace W1 that hosts the notebook item.

When **Autoscale Billing** is enabled for Spark, the usage is reported against the **Autoscale for Spark Capacity CU** meter. This separate meter tracks the compute usage directly and is reflected in the **Cost Analysis** section of your Azure subscription, allowing administrators to monitor costs specifically associated with Spark workloads using Autoscale Billing.

### Tracking Autoscale Billing in Azure Cost Analysis:
After enabling Autoscale Billing, use Azure’s built-in cost management tools to track the spend:

1. Navigate to the **Azure portal**.
2. Select the **Subscription** linked to your Fabric capacity.
3. In the subscription page, go to **Cost Analysis**.
4. Filter by the resource (Fabric capacity) and use the meter: **Autoscale for Spark Capacity Usage CU**.
5. View real-time compute spend for Spark workloads using Autoscale Billing.

## Related content

* [Get Started with Data Engineering/Science Admin Settings for your Fabric Capacity](capacity-settings-overview.md)
* [Apache Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
* [Autoscale Billing for Spark Overview](autoscale-billing-for-spark-overview.md)
* [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
* [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)
