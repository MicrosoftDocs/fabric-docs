---
title: Pricing for Dataflow Gen2
description: This article provides details of the pricing model of Dataflow Gen2 for Data Factory in Microsoft Fabric.
ms.reviewer: susabat
ms.date: 11/03/2026
ms.topic: concept-article
ms.custom:
  - dataflows
ai-usage: ai-assisted
---

# Dataflow Gen2 pricing for Data Factory in Microsoft Fabric

Dataflow Gen2 helps you shape and transform data with ease. It offers a low-code interface and over 300 built-in data and AI transformations, all powered by the familiar Power Query experience you'll find in Excel, Power BI, Power Platform, and Dynamics 365. Dataflow Gen2 also supports Spark-backed transformation execution through mapping data flow (MDF) transforms for native and migrated workloads.

This pricing applies to all Fabric capacity SKUs (F2 and above). Pricing doesn't apply to Fabric trial capacities. For real-world CU consumption benchmarks across common scenarios, see [Dataflow Gen2 cost and performance benchmarks](dataflow-gen2-cost-performance-benchmarks.md).

When you publish a dataflow, it creates a definition that runs during refresh. The Dataflow Gen2 engine uses that definition to plan and manage how queries run-across data sources, gateways, and compute engines. It builds tables in staging storage or sends them to your chosen destination, so you get reliable results without the heavy lifting.

:::image type="content" source="media/pricing-dataflows-gen2/dataflows-gen2-pricing-diagram.png" alt-text="Diagram of the Dataflow Gen2 architecture.":::

The diagram shows components of the Data Factory Dataflow Gen2 architecture, including the Lakehouse used to stage data being ingested, and Warehouse item used as a compute engine to write results to staging or output faster. When you can't use Warehouse compute, or when you disable staging for a query, the Mashup Engine extracts, transforms, or loads the data to staging or data destinations. To learn more about how Dataflow Gen2 works, see [Data Factory Spotlight: Dataflow Gen2](https://blog.fabric.microsoft.com/blog/data-factory-spotlight-dataflows-gen2?ft=All).

Dataflow Gen2 can execute workloads using either the Mashup Engine or Spark Engine. When MDF transforms are used inside Dataflow Gen2, Spark-backed compute is used for transformation execution and data processing.

When you refresh or publish a Dataflow Gen2 item, Fabric Capacity Units are consumed for the following engines:

- Standard Compute: You're charged for it based on the query evaluation time across all your Dataflow queries that run through the Mashup engine.
- High Scale Dataflow Compute: You're charged when staging is enabled, based on Lakehouse (Staging storage) and Warehouse (Storage Compute) SQL engine consumption duration.
- Fast Copy: You're charged when fast copy connectors are enabled and can be used in the Dataflow, based on copy job duration. Fast Copy runs in parallel across multiple cores, so this duration is the total time spent across all the cores the copy job uses, not the wall-clock time of the refresh.
- Spark Compute: MDF transforms use underlying Spark compute for execution. Consumption for the same Dataflow Gen2 item is associated with two billing operations:
  - **MDF Transforms – Core:** Billed starting with general availability at 1.0 CU per Spark vCore-hour. Consumption is reported per Dataflow Gen2 item in CU-seconds in the Fabric Capacity Metrics app.
  - **MDF Transforms – Compute:** Represents the underlying Spark compute used by the same MDF transform execution. This operation isn't billed at general availability. Billing will be introduced after GA, and this article will be updated before billing begins for this operation.

## Dataflow Gen2 pricing model

### How pricing rates are determined

Dataflow Gen2 pricing depends on how each query uses compute. For standard compute, queries run on the mashup engine. Depending on whether your Dataflow is Dataflow Gen2 (CI/CD), the rating varies.

In Dataflow Gen2 (CI/CD), there's a two-tier rate applied to the query duration:

- If a query runs under 10 minutes, it's rated at 12 CU
- If it runs longer, each extra second is rated at 1.5 CU.

If your Dataflow Gen2 is non-CI/CD, the rate is 16 CU applied to the entire query duration.

> [!NOTE]
> When you use [partitioned compute](dataflow-gen2-partitioned-compute.md), Dataflow Gen2 evaluates each partition as its own unit of work. Standard compute charges are based on the sum of the processing duration of every partition. Running partitions in parallel shortens the overall (wall-clock) time to complete the run, while the total CU consumption reflects the combined compute of all partitions.

For high-scale scenarios-when staging is turned on-queries run on the Lakehouse or Warehouse SQL engine. Each second of compute time uses 6 CU seconds, so longer queries consume more.

If you turn on fast copy, there's a separate rate for data movement: 1.5 CU, based on how long the activity runs. Fast copy automatically balances each scenario to decide how many cores to use, and the billed duration is the total time spent across all of those cores rather than the wall-clock time you see in the refresh history. Spreading the work across more cores shortens the elapsed time, while the billed duration accounts for every core the copy job uses.

MDF transforms have two separate billing components: **MDF Transforms – Core** and **MDF Transforms – Compute**. MDF Transforms – Core is billed starting with general availability at **1.0 CU per Spark vCore-hour**, based on the aggregate Spark vCore-hours used during execution. Consumption is reported per Dataflow Gen2 item.

> [!NOTE]
> Only MDF Transforms – Core is currently billed. The separate MDF Transforms – Compute component, which covers the underlying Spark compute, isn't billed at general availability. Billing for MDF Transforms – Compute will be introduced after GA, and this article will be updated before billing begins for that component.

At the end of each run, Dataflow Gen2 adds up the CU usage from each engine and bills it based on the Fabric capacity pricing in your region. For MDF transforms, only MDF Transforms – Core consumption is currently billed. The separate MDF Transforms – Compute component isn't currently billed.

### CU rate table

| Dataflow Gen2 Engine Type | Consumption Meters | Fabric CU consumption rate | Consumption reporting granularity |
| --- | --- | --- | --- |
| Standard Compute (Dataflow Gen2 (CI/CD)) | Based on each mashup engine query execution duration in seconds. Standard Compute has two tier pricing depending on the query duration. | - For every second up to 10 minutes, 12 CU<br />- For every second beyond 10 minutes, 1.5 CU | Per Dataflow Gen2 item |
| Standard Compute (non CI/CD) | Based on each mashup engine query execution duration in seconds. | 16 CU | Per Dataflow Gen2 item |
| High Scale Dataflows Compute | Based on Lakehouse/Warehouse SQL engine execution (with staging enabled) duration in seconds. | 6 CU | Per workspace |
| Data movement | Based on Fast Copy run duration, measured as the aggregate core time in seconds summed across all the cores the copy job uses. Dataflow automatically balances how many cores each fast copy scenario uses. | 1.5 CU | Per Dataflow Gen2 item |
| MDF Transforms – Core | Aggregate Spark vCore-hours used during MDF transform execution | 1.0 CU per Spark vCore-hour. Billing starts with general availability. | Per Dataflow Gen2 item |

> [!NOTE]
> MDF Transforms – Compute is a separate billing component for the underlying Spark compute. It isn't currently billed and isn't included in the MDF Transforms – Core rate above. Billing for MDF Transforms – Compute will be introduced after GA, and this article will be updated before billing begins for that component.

## Virtual network data gateway pricing with Dataflow Gen2

The Virtual Network (VNET) Data Gateway is billed as an additive infrastructure charge, associated with a Fabric capacity. This means that it has its own meter and incurs a bill that is consistent across and extra to all Fabric item runs.

The total bill for running Dataflow Gen2 through the Virtual Network Data Gateway is calculated as: Dataflow Gen2 Charge + Virtual Network Data Gateway Charge.

The Virtual Network Data Gateway Charge is proportional to your usage of the Virtual Network Data Gateway, where usage is defined as uptime, or anytime the Virtual Network Data Gateway is on.

Virtual Network Data Gateway CU consumption rate: 4 CU

Learn more at [Virtual Network Data Gateways Pricing and Billing](/data-integration/vnet/data-gateway-business-model).

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](https://aka.ms/fabricrm) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.

## Compute estimated costs using the Fabric Metrics app and dataflow refresh history

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. It's used by capacity administrators to monitor the performance of workloads and their usage compared to purchased capacity. Using the Metrics app is the most accurate way to estimate the costs of Dataflow Gen2 refresh runs. To understand how the tiered pricing affected your standard compute costs, you also need to use Dataflow refresh history.

These exercises show you how to validate costs for both CI/CD and non CI/CD dataflows. For the CI/CD dataflow with standard compute, a worked example is provided, followed by instructions for all other scenarios.

### Exercise 1: Standard compute for a CI/CD dataflow

The following dataflow has two queries involving transformation, and staging is disabled.

:::image type="content" source="media/pricing-dataflows-gen2/dataflows-query-details.png" alt-text="Screenshot showing Dataflow Gen2 with two queries.":::

:::image type="content" source="media/pricing-dataflows-gen2/staging-disabled.png" alt-text="Screenshot showing Dataflow Gen2 with Staging Disabled.":::

Dataflow Gen2 only uses the standard compute.

For each query, access the query duration from Refresh history and apply the following formula to compute the CU consumption per query.

For the first query, the duration is 2,131 seconds.

:::image type="content" source="media/pricing-dataflows-gen2/recent-run-history-no-staging-1.png" alt-text="Screenshot showing Query 1 refresh history.":::

Similarly, for the second query, the duration is 913 seconds

:::image type="content" source="media/pricing-dataflows-gen2/recent-run-history-no-staging-2.png" alt-text="Screenshot showing Query 2 refresh history.":::

<code>StandardComputeCapacityConsumptionInCUSeconds = if(QueryDurationInSeconds < 600, QueryDurationInSeconds x 12, (QueryDurationInSeconds - 600) x 1.5 + 600 x 12) </code>

For query 1, the computed consumption is 9497 CU seconds and for query 2, the computed consumption is 7670 CU seconds.

Aggregate the Capacity Consumption in CU seconds and validate the consumption in the Fabric capacity metrics app. In this scenario, the metrics app shows 17,180 CU seconds as the Standard Compute usage which compares well with the computed consumption of 17,167 CU seconds. Any discrepancies could be due to rounding in periodic reporting of usage.

:::image type="content" source="media/pricing-dataflows-gen2/fabric-capacity-metrics-app-dataflow.png" alt-text="Screenshot showing Fabric Capacity Metrics App showing Dataflow consumption.":::

### Exercise 2: Standard compute for a non-CI/CD dataflow

When your dataflow involves transformation and staging is disabled, Dataflow Gen2 uses only the standard compute.  

For each query, access the query duration from Refresh history and apply the following formula to compute the CU consumption per query.

<code>StandardComputeCapacityConsumptionInCUSeconds = QueryDurationInSeconds x 16 </code>

Aggregate the Capacity Consumption in CU seconds and validate the consumption in the Fabric capacity metrics app.

### Exercise 3: Understanding high scale compute consumption (both CI/CD and non CI/CD dataflows)

If your dataflow uses staging, to find out how much High Scale compute you used, open the Fabric Capacity Metrics App and filter by your Dataflow's name. Right-click the name, look for High Scale compute in the list of operations, and check the duration.

```
HighScaleComputeCapacityConsumptionInCUSeconds = QueryDurationInSeconds x 6
```

### Exercise 4: Understanding fast copy compute consumption (both CI/CD and non-CI/CD dataflows)

If your dataflow uses fast copy, to find out how much Data Movement compute you used, open the Fabric Capacity Metrics App and filter by your Dataflow's name. Right-click the name, look for Data Movement in the list of operations, and check the duration.

```
FastCopyComputeCapacityConsumptionInCUSeconds = QueryDurationInSeconds x 1.5
```

### Exercise 5: Understanding mapping data flow transform core consumption

MDF transforms have two separate billing components: **MDF Transforms – Core** and **MDF Transforms – Compute**. Starting with general availability, you pay for only **MDF Transforms – Core**, at **1.0 CU per Spark vCore-hour**. Consumption is reported per Dataflow Gen2 item.
The Fabric Capacity Metrics app reports consumption in CU-seconds. Filter by your Dataflow Gen2 item name and select the **MDF Transforms – Core** operation to review only the consumption covered by this calculation.

For an execution that uses a constant number of Spark vCores, calculate MDF Transforms – Core consumption by using the following formula:

```text
MDFTransformCoreConsumptionInCUSeconds = SparkExecutionDurationInSeconds × NumberOfSparkCores × 1.0
```

For example:

- An execution using 8 Spark vCores for one hour consumes `3600 × 8 × 1.0 = 28,800 CU-seconds`, equivalent to 8 CU-hours.
- An execution using 8 Spark vCores for 30 minutes consumes `1800 × 8 × 1.0 = 14,400 CU-seconds`, equivalent to 4 CU-hours.

Use the CU-seconds values when comparing the calculated consumption with the Fabric Capacity Metrics app. To convert CU-seconds to CU-hours, divide by 3,600.


> [!NOTE]
> This calculation includes only MDF Transforms – Core consumption. The separate MDF Transforms – Compute component isn't currently billed. Billing for that component will be introduced after GA, and this article will be updated before billing begins.


## Related content

- [Pricing example scenarios](pricing-overview.md#pricing-examples)
- [Pricing pipelines](pricing-pipelines.md)
- [Dataflow Gen2 cost and performance benchmarks](dataflow-gen2-cost-performance-benchmarks.md)
