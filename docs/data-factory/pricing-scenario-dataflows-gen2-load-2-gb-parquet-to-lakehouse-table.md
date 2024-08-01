---
title: Pricing scenario - Dataflow Gen2 loads 2 GB of Parquet data to a Lakehouse table
description: This article provides an example pricing scenario for loading 2 GB of Parquet data to a Lakehouse Table using Dataflow Gen2 for Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Pricing scenario using Dataflow Gen2 to load 2 GB of Parquet data to a Lakehouse table

In this scenario, Dataflow Gen2 was used to load 2 GB of Parquet data stored in Azure Data Lake Storage (ADLS) Gen2 to a Lakehouse table in Microsoft Fabric. We used the NYC Taxi-green sample data for the Parquet data.

The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. These are just to demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric. Also, since Fabric capacities are priced uniquely across regions, we use the pay-as-you-go pricing for a Fabric capacity at US West 2 (a typical Azure region), at $0.18 per CU per hour. Refer here to [Microsoft Fabric - Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore other Fabric capacity pricing options.

## Configuration

To accomplish this scenario, you need to create a dataflow with the following steps:

1. Initialize Dataflow: Get 2 GB Parquet files data from ADLS Gen2 storage account.
1. Configure Power Query:
   1. Navigate to Power Query.
   1. Ensure the option for staging the query is enabled.
   1. Proceed to combine the Parquet files.
1. Data Transformation:
   1. Promote headers for clarity.
   1. Remove unnecessary columns.
   1. Adjust column data types as needed.
1. Define Output Data Destination:
   1. Configure Lakehouse as the data output destination.
   1. In this example, a Lakehouse within Fabric was created and utilized.

## Cost estimation using the Fabric Metrics App

:::image type="content" source="media/pricing-scenarios/fabric-metrics-app-load-2-gb-parquet-to-lakehouse-table.png" alt-text="Screenshot showing the duration and CU consumption of the job in the Fabric Metrics App.":::

:::image type="content" source="media/pricing-scenarios/dataflows-gen2-scenario-2-metrics-details-1.png" alt-text="Screenshot showing details of Dataflow Gen2 Refresh duration and CU consumption.":::

:::image type="content" source="media/pricing-scenarios/dataflows-gen2-scenario-2-metrics-details-2.png" alt-text="Screenshot showing details of SQL Endpoint Query duration and CU consumption used in the run.":::

:::image type="content" source="media/pricing-scenarios/dataflows-gen2-scenario-2-metrics-details-3.png" alt-text="Screenshot showing details of Warehouse Query and OneLake Compute duration and CU consumption used in the run.":::

:::image type="content" source="media/pricing-scenarios/dataflows-gen2-scenario-2-metrics-details-4.png" alt-text="Screenshot showing details of Query and Dataset On-Demand Refresh duration and CU consumption and SQL Endpoint Query used in the run.":::

:::image type="content" source="media/pricing-scenarios/dataflows-gen2-scenario-2-metrics-details-5.png" alt-text="Screenshot showing details of a second Query and Dataset On-Demand Refresh duration and CU consumption used in the run.":::

:::image type="content" source="media/pricing-scenarios/dataflows-gen2-scenario-2-metrics-details-6.png" alt-text="Screenshot showing details of OneLake Compute and 2 High Scale Dataflow Compute duration and CU consumption used in the run.":::

The High Scale Dataflow Compute Meter recorded negligible activity. Standard Compute meter for Dataflow Gen2 refresh operations consumes 112,098.540 Compute Units (CUs). It's important to consider that other operations, including Warehouse Query, SQL Endpoint Query, and Dataset On-Demand Refresh, constitute detailed aspects of Dataflow Gen2 implementation that are currently transparent and necessary for their respective operations. However, these operations will be concealed in future updates and should be disregarded when estimating costs for Dataflow Gen2.

> [!NOTE]
> Although reported as a metric, the actual duration of the run isn't relevant when calculating the effective CU hours with the Fabric Metrics App since the CU seconds metric it also reports already accounts for its duration.

|Metric  |Standard Compute | High Scale Compute  |
|---------|---------|---------|
|Total CU seconds | 112,098.54 CU seconds | 0 CU seconds |
|Effective CU-hours billed | 112,098.54 / (60*60) = 31.14 CU hours | 0 / (60*60) = 0 CU hours |

**Total run cost at $0.18/CU hour** = (31.14 CU-hours) * ($0.18/CU hour) ~= **$5.60**

## Related content

- [Data pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflow Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
- [Pricing example scenarios](pricing-overview.md#pricing-examples)
