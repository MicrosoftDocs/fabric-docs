---
title: Pricing scenario - Dataflow Gen2 Loads 2 GB of Parquet Data to a Lakehouse Table Through Virtual Network Data Gateway
description: This article provides an example pricing scenario for loading 2 GB of Parquet data to a Lakehouse Table using Dataflow Gen2 for Data Factory in Microsoft Fabric and Virtual Network Data Gateway.
ms.reviewer: whhender
ms.author: lle
author: lrtoyou1223
ms.topic: conceptual
ms.date: 10/25/2024
ms.custom: 
    - dataflows
    - configuration
---

# Pricing scenario using Dataflow Gen2 and Virtual Network Data Gateway to load 2 GB of Parquet data to a Lakehouse table

In this scenario, Dataflow Gen2 and Virtual Network Data Gateway were used to load 2 GB of Parquet data stored in Azure Data Lake Storage (ADLS) Gen2 to a Lakehouse table in Microsoft Fabric. We used the NYC Taxi-green sample data for the Parquet data.

The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. These are just to demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric. Also, since Fabric capacities are priced uniquely across regions, we use the pay-as-you-go pricing for a Fabric capacity at US West 2 (a typical Azure region), at $0.18 per CU per hour. Refer here to [Microsoft Fabric - Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore other Fabric capacity pricing options.

## Configuration

To accomplish this scenario, you need to create a dataflow with the following steps:

1. Initialize Dataflow: Get 2 GB Parquet files data from ADLS Gen2 storage account.
1. Setup Virtual Network Data Gateway with 1 instance and 30 minutes time-to-live.
1. Configure Power Query.
1. Configure Lakehouse as the data output destination.


## Cost estimation using the Fabric Metrics App

:::image type="content" source="media/pricing-scenarios/fabric-metrics-app-load-2-gb-parquet-lakehouse-table-vnet-gateway.png" alt-text="Screenshot showing the duration and CU consumption of the job in the Fabric Metrics App.":::

:::image type="content" source="media/pricing-scenarios/fabric-metrics-app-load-2-gb-parquet-lakehouse-table-gateway-consumption.png" alt-text="Screenshot showing details of Virtual Network Data Gateway Uptime CU consumption.":::


When running a dataflow to load data through the Virtual Network Data Gateway, the overall consumption is divided into two main components: dataflow refresh and Virtual Network Data Gateway uptime. Charges for the Virtual Network Data Gateway are based on its uptime, which includes both the workload execution time and its time-to-live whenever the gateway is active.

The load operation consumed about 2 minutes with 970.6228 CU seconds on Dataflow Gen2 Refresh and 7480.6466 CU seconds on Virtual Network Data Gateway uptime.

> [!NOTE]
> Although reported as a metric, the actual duration of the run isn't relevant when calculating the effective CU hours with the Fabric Metrics App since the CU seconds metric it also reports already accounts for its duration.

|Metric  |Compute Consumption |
|---------|---------|
|Dataflow Gen2 Refresh | 970.6228 CU seconds |
|Virtual Network Data Gateway Uptime | 7480.6466 CU seconds |

**Total run cost at $0.18/CU hour** = (970.6228 + 7480.6466) / (60 * 60) CU-hours * ($0.18/CU hour) ~= **$0.42**

## Related content
- [Pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflow Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
- [Pricing example scenarios](pricing-overview.md#pricing-examples)
