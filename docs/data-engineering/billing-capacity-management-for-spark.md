---
title: Apache Spark billing and utilization in Microsoft Fabric
description: Learn how billing, capacity usage, and utilization reporting work for Apache Spark in Fabric Data Engineering and Data Science.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/05/2026
ai-usage: ai-assisted
---
# Apache Spark billing and utilization in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Apache Spark workloads in Fabric Data Engineering and Data Science include lakehouse operations (for example, table preview and load to delta), notebook runs (interactive, scheduled, and pipeline-triggered), and Spark job definition runs. These workloads use workspace-associated capacity by default, and charges appear in Azure Cost Management for the linked subscription.

This article helps you understand:

- How Spark billing works on Fabric capacity, and how autoscale billing changes usage and cost reporting.
- How billing behavior differs between starter pools and custom Spark pools.
- Where to view Spark usage and cost, and how billing attribution works across workspaces and capacities.

For general Fabric billing guidance, see [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing.md).

## How Spark billing works on Fabric capacity

A Fabric capacity is purchased in Azure and associated with an Azure subscription. Capacity size determines available compute.

For Spark in Fabric, each capacity unit (CU) maps to two Spark vCores. For example, F128 provides 256 Spark vCores. Capacity is shared across all workspaces assigned to that capacity, so Spark compute is shared across jobs submitted from those workspaces.

For stock-keeping unit (SKU) details, core allocation, and queueing behavior, see [Spark concurrency limits](spark-job-concurrency-and-queueing.md).

## Autoscale billing for Spark

Autoscale billing for Spark introduces a flexible, pay-as-you-go billing model for Spark workloads in Microsoft Fabric. With this model enabled, Spark jobs use dedicated serverless resources instead of consuming compute from Fabric capacity. This serverless option optimizes cost and provides scalability without resource contention.

When enabled, autoscale billing allows you to set a maximum capacity unit (CU) limit, which controls your budget and resource allocation. Billing for Spark jobs is based solely on the compute used during job execution, with no idle compute costs. The cost per Spark job remains the same (0.5 CU hour), and you're charged only for the runtime of active jobs.

**Key benefits of autoscale billing**

- **Cost efficiency**: Pay only for the Spark job runtime.
- **Independent scaling**: Spark workloads scale independently of other workload demands.
- **Enterprise-ready**: Integrates with Azure Quota Management for flexible scaling.

**How autoscale billing works**

- Spark jobs no longer consume CU from the Fabric capacity and instead use serverless resources.
- A max CU limit can be set to align with budget or governance policies, ensuring predictable costs.
- Once the CU limit is reached, Spark jobs either queue (for batch jobs) or throttle (for interactive jobs).
- There is no idle compute cost, and only active job compute usage is billed.

For more details, see [Autoscale Billing for Spark overview](autoscale-billing-for-spark-overview.md).

## Billing behavior by compute option

Spark billing behavior depends on how Spark compute is configured.

- **Starter pools**: These default pools are optimized for fast startup. Billing starts when notebook, Spark job definition, or lakehouse operations begin. Idle pool time isn't billed.

   :::image type="content" source="media/spark-compute/starter-pool-billing-states-high-level.png" alt-text="Diagram showing the high-level stages in billing of starter pools." lightbox="media/spark-compute/starter-pool-billing-states-high-level.png":::

  For example, if you submit a notebook job to a starter pool, you're billed only while the notebook session is active. Billed time doesn't include idle pool time.

  To learn more, see [Configure starter pools in Fabric](configure-starter-pools.md).

- **Custom Spark pools**: These pools let you choose node size and scaling settings for workload requirements. Creating a custom pool is free. Billing applies only when Spark compute is actively used.

  - The size and number of nodes available for a custom Spark pool depend on your Fabric capacity.
  - As with starter pools, billing applies to active session runtime, not cluster creation or deallocation stages.

   :::image type="content" source="media/spark-compute/custom-pool-billing-states-high-level.png" alt-text="Diagram showing the high-level stages in billing of custom pools." lightbox="media/spark-compute/custom-pool-billing-states-high-level.png":::

  For example, if you submit a notebook job to a custom Spark pool, you're charged only while the session is active. Billing stops when the Spark session stops or expires. You aren't charged for cluster acquisition or Spark context initialization time.

  To learn more, see [Apache Spark compute in Microsoft Fabric](spark-compute.md).

> [!NOTE]
> The default session expiration for starter and custom Spark pools is 20 minutes.
> If you don't use a Spark pool for 2 minutes after session expiration, the pool is deallocated.
> To stop session billing earlier, stop the session from the notebook Home menu or from Monitoring hub.

## Where to view Spark usage and cost

Use two views together: the Capacity Metrics app for utilization, and Azure Cost Analysis for cost.

### Spark usage in Capacity Metrics app

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage across Fabric workloads. Capacity admins use it to monitor workload performance and usage against purchased capacity.

After you install the app, select **Notebook**, **Lakehouse**, and **Spark Job Definition** in **Select item kind**. Then adjust the **Multi metric ribbon chart** timeframe to review usage trends for those items.

Spark operations are classified as [background operations](../enterprise/fabric-operations.md#background-operations). Spark capacity consumption appears under notebook, Spark job definition, or lakehouse items, and is aggregated by operation name and item.

For example, for a notebook run, you can review runtime and CU usage in the report.

:::image type="content" source="media/monitor-spark-capacity-consumption/items-report.png" alt-text="Screenshot showing items report." lightbox="media/monitor-spark-capacity-consumption/items-report.png":::

To learn more, see [Monitor Apache Spark capacity consumption](monitor-spark-capacity-consumption.md).

### Spark cost in Azure Cost Analysis

When **Autoscale Billing** is enabled for Spark, usage is reported against the **Autoscale for Spark Capacity Usage CU** meter.

To track this usage in Azure Cost Analysis:

1. Go to the **Azure portal**.
1. Select the **Subscription** linked to your Fabric capacity.
1. In the left pane, expand **Cost Management**, then select **Cost analysis**.
1. Filter by the Fabric capacity resource.
1. Select the meter **Autoscale for Spark Capacity Usage CU**.
1. Review real-time Spark compute spend.

## Billing attribution examples

Billing is attributed to the capacity associated with the workspace that runs the item.

Consider the following scenario:

- Capacity `C1` hosts workspace `W1`, and workspace `W1` contains lakehouse `LH1` and notebook `NB1`.
- Capacity `C2` hosts workspace `W2`, and workspace `W2` contains Spark job definition `SJD1` and lakehouse `LH2`.

With this baseline, billing attribution for Spark operations works as follows.

- Any Spark operation performed by notebook `NB1` or lakehouse `LH1` is reported against capacity `C1`.
- If Spark job definition `SJD1` from workspace `W2` reads data from lakehouse `LH1`, usage is reported against capacity `C2`, because `W2` hosts the running item.
- If notebook `NB1` performs a read operation from lakehouse `LH2`, capacity consumption is reported against capacity `C1`, because `W1` hosts the running item.

The following table summarizes billing attribution for different operations in this scenario.

| Example | Running item and read path | Billed capacity |
|--|--|--|
| 1 | `NB1` or `LH1` in `W1` | `C1` |
| 2 | `SJD1` in `W2` reading `LH1` in `W1` | `C2` |
| 3 | `NB1` in `W1` reading `LH2` in `W2` | `C1` |

## Related content

- [Get started with Data Engineering and Data Science admin settings for your Fabric capacity](capacity-settings-overview.md)
- [Apache Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
- [High concurrency mode in Apache Spark for Fabric](high-concurrency-overview.md)
- [Autoscale Billing for Spark overview](autoscale-billing-for-spark-overview.md)
- [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
- [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)
