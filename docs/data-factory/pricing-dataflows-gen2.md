---
title: Pricing for Dataflow Gen2
description: This article provides details of the pricing model of Dataflow Gen2 for Data Factory in Microsoft Fabric.
ms.topic: concept-article
ms.date: 12/18/2024
ms.reviewer: susabat
ms.custom: 
    - dataflows
---

# Dataflow Gen2 pricing for Data Factory in Microsoft Fabric

Dataflow Gen2 helps you shape and transform data with ease. It offers a low-code interface and over 300 built-in data and AI transformations, all powered by the familiar Power Query experience you’ll find in Excel, Power BI, Power Platform, and Dynamics 365.

When you publish a dataflow, it creates a definition that runs during refresh. The Dataflow Gen2 engine uses that definition to plan and manage how queries run—across data sources, gateways, and compute engines. It builds tables in staging storage or sends them to your chosen destination, so you get reliable results without the heavy lifting.


:::image type="content" source="media/pricing-dataflows-gen2/dataflows-gen2-pricing-diagram.png" alt-text="Diagram of the Dataflow Gen2 architecture.":::

The diagram captures components of the Data Factory Dataflow Gen2 architecture, including the Lakehouse used to stage data being ingested, and Warehouse item used as a compute engine to write results to staging or output faster. When Warehouse compute can't be used, or when staging is disabled for a query, the Mashup Engine will extract, transform, or load the data to staging or data destinations. You can learn more about how Dataflow Gen2 works in this blog: [Data Factory Spotlight: Dataflow Gen2](https://blog.fabric.microsoft.com/blog/data-factory-spotlight-dataflows-gen2?ft=All).

When you refresh or publish a Dataflow Gen2 item, Fabric Capacity Units are consumed for the following engines:

- Standard Compute: You're charged for it based on the query evaluation time across all your Dataflow queries that run through the Mashup engine.  
- High Scale Dataflow Compute: You're charged when staging is enabled, based on Lakehouse (Staging storage) and Warehouse (Storage Compute) SQL engine consumption duration.
- Fast Copy: You're charged when fast copy connectors are enabled and can be used in the Dataflow, based on copy job duration.

## Dataflow Gen2 pricing model

### How Pricing Rates are determined
Dataflow Gen2 pricing depends on how each query uses compute. For standard compute, queries run on the mashup engine. Depending on whether your Dataflow is Dataflow Gen2 (CI/CD), the rating varies.

In Dataflow Gen2 (CI/CD), there's a two-tier rate applied to the query duration:

- If a query runs under 10 minutes, it's rated at 12 CU
- If it runs longer, each extra second is rated at 1.5 CU.

If your Dataflow Gen2 is non-CI/CD, the rate is 16 CU applied to the entire query duration.

For high-scale scenarios—when staging is turned on—queries run on the Lakehouse or Warehouse SQL engine. Each second of compute time uses 6 CU seconds, so longer queries consume more.

If you turn on fast copy, there's a separate rate for data movement: 1.5 CU, based on how long the activity runs.

At the end of each run, Dataflow Gen2 adds up the CU usage from each engine and bills it based on the Fabric capacity pricing in your region.

### CU Rate Table

|Dataflow Gen2 Engine Type  |Consumption Meters  |Fabric CU consumption rate  |Consumption reporting granularity      |
|---------|---------|---------|---------|
|Standard Compute  (Dataflow Gen2 (CI/CD))   | Based on each mashup engine query execution duration in seconds. Standard Compute has two tier pricing depending on the query duration.       | -  For every second up to 10 minutes, 12 CU<br>-  For every second beyond 10 minutes, 1.5 CU      | Per Dataflow Gen2 item        |
|Standard Compute  (non CI/CD)   | Based on each mashup engine query execution duration in seconds.      | 16 CU| Per Dataflow Gen2 item        |
|High Scale Dataflows Compute     | Based on Lakehouse/Warehouse SQL engine execution (with staging enabled) duration in seconds.         | 6 CU         | Per workspace        |
|Data movement     | Based on Fast Copy run duration in seconds and the used intelligent optimization throughput resources.         | 1.5 CU         | Per Dataflow Gen2 item        |

## Virtual Network Data Gateway Pricing with Dataflow Gen2 

The Virtual Network (VNET) Data Gateway is billed as an additive infrastructure charge, associated with a Fabric capacity. This means that it has its own meter and incurs a bill that is consistent across and extra to all Fabric item runs.

The total bill for running Dataflow Gen2 through the VNET Data Gateway is calculated as: Dataflow Gen2 Charge + VNET Data Gateway Charge.

The VNET Data Gateway Charge is proportional to your usage of the VNET Data Gateway, where usage is defined as uptime, or anytime the VNET Data Gateway is on.

VNET Data Gateway CU consumption rate: 4 CU

Learn more at [Virtual Network Data Gateways Pricing and Billing](/data-integration/vnet/data-gateway-business-model).

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](https://aka.ms/fabricrm) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.

## Compute estimated costs using the Fabric Metrics App and Dataflow Refresh History

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. It's used by capacity administrators to monitor the performance of workloads and their usage compared to purchased capacity. Using the Metrics app is the most accurate way to estimate the costs of Dataflow Gen2 refresh runs. To understand how the tiered pricing impacted your standard compute costs, you also need to use Dataflow refresh history.

These exercises show you how to validate costs for both CI/CD and non CI/CD dataflows. For the CI/CD dataflow with standard compute, we'll use an example, and we'll provide instructions for all other scenarios.

### Exercise 1: Standard compute for a CI/CD Dataflow

The following dataflow has two queries involving transformation, and staging is disabled. 

:::image type="content" source="media/pricing-dataflows-gen2/dataflows-query-details.png" alt-text="Screenshot showing Dataflow Gen2 with two queries.":::



:::image type="content" source="media/pricing-dataflows-gen2/staging-disabled.png" alt-text="Screenshot showing Dataflow Gen2 with Staging Disabled.":::

Dataflow Gen2 will only use the Standard Compute.

For each query, access the query duration from Refresh history and apply the following formula to compute the CU consumption per query.

For the first query, the duration is 2,131 seconds.

:::image type="content" source="media/pricing-dataflows-gen2/recent-run-history-no-staging-1.png" alt-text="Screenshot showing Query 1 refresh history.":::

Similarly, for the second query, the duration is 913 seconds

:::image type="content" source="media/pricing-dataflows-gen2/recent-run-history-no-staging-2.png" alt-text="Screenshot showing Query 2 refresh history.":::

<code>StandardComputeCapacityConsumptionInCUSeconds = if(QueryDurationInSeconds < 600, QueryDurationInSeconds x 12, (QueryDurationInSeconds - 600) x 1.5 + 600 x 12) </code>

For query 1, the computed consumption is 9497 CU seconds and for query 2, the computed consumption is 7670 CU seconds.

Aggregate the Capacity Consumption in CU seconds and validate the consumption in the Fabric capacity metrics app. In this scenario, the metrics app shows 17,180 CU seconds as the Standard Compute usage which compares well with the computed consumption of 17,167 CU seconds. Any discrepancies could be due to rounding in periodic reporting of usage.

:::image type="content" source="media/pricing-dataflows-gen2/fabric-capacity-metrics-app-dataflow.png" alt-text="Screenshot showing Fabric Capacity Metrics App showing Dataflow consumption.":::

### Exercise 2: Standard compute for a non-CI/CD Dataflow

When your dataflow involves transformation, and staging is disabled, Dataflow Gen2 will only use the Standard Compute.

For each query, access the query duration from Refresh history and apply the following formula to compute the CU consumption per query.

<code>StandardComputeCapacityConsumptionInCUSeconds = QueryDurationInSeconds x 16 </code>

Aggregate the Capacity Consumption in CU seconds and validate the consumption in the Fabric capacity metrics app.

### Exercise 3: Understanding High Scale Compute Consumption (both CI/CD and non CI/CD dataflows)

If your dataflow uses staging, to find out how much High Scale compute you used, open the Fabric Capacity Metrics App and filter by your Dataflow’s name. Right-click the name, look for High Scale compute in the list of operations, and check the duration.

```
HighScaleComputeCapacityConsumptionInCUSeconds = QueryDurationInSeconds x 6
```

### Exercise 4: Understanding Fast Copy Compute Consumption (both CI/CD and non-CI/CD dataflows)

If your dataflow uses fast copy, to find out how much Data Movement compute you used, open the Fabric Capacity Metrics App and filter by your Dataflow’s name. Right-click the name, look for Data Movement in the list of operations, and check the duration.

```
FastCopyComputeCapacityConsumptionInCUSeconds = QueryDurationInSeconds x 1.5
```

## Related content

- [Pricing example scenarios](pricing-overview.md#pricing-examples)
- [Pricing pipelines](pricing-pipelines.md)
