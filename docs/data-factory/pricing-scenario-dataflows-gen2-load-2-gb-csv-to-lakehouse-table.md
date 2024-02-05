---
title: Pricing scenario - Dataflow Gen2 loads 2 GB on-premises CSV file to a Lakehouse table
description: This article provides an example pricing scenario for loading 2 GB of on-premises CSV data to a Lakehouse table using Dataflow Gen2 for Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Pricing scenario using Dataflow Gen2 to load 2 GB of on-premises CSV data to a Lakehouse table

In this scenario, Dataflow Gen2 was used to load 2 GB of on-premises CSV data to a Lakehouse table in Microsoft Fabric.

The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. These are just to demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric. Also, since Fabric capacities are priced uniquely across regions, we use the pay-as-you-go pricing for a Fabric capacity at US West 2 (a typical Azure region), at $0.18 per CU per hour. Refer here to [Microsoft Fabric - Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore other Fabric capacity pricing options.

## Configuration

To accomplish this scenario, you need to create a dataflow with the following steps:

1. Initialize Dataflow: Start by uploading 2 GB CSV files from your on-premises environment into the dataflow.
1. Configure Power Query:
   1. Navigate to Power Query.
   1. Disable the option for staging the query.
   1. Proceed to combine the CSV files.
1. Data Transformation:
   1. Promote headers for clarity.
   1. Remove unnecessary columns.
   1. Adjust column data types as needed.
1. Define Output Data Destination:
   1. Configure Lakehouse as the data output destination.
   1. In this example, a Lakehouse within Fabric was created and utilized.

## Cost estimation using the Fabric Metrics App

:::image type="content" source="media/pricing-scenarios/fabric-metrics-app-load-2-gb-on-premises-csv-to-lakehouse-table.png" alt-text="Screenshot showing the duration and CU consumption of the job in the Fabric Metrics App.":::

:::image type="content" source="media/pricing-scenarios/dataflows-gen2-scenario-1-metrics-details-1.png" alt-text="Screenshot showing details of the Dataflow Gen2 Refresh cost":::

:::image type="content" source="media/pricing-scenarios/dataflows-gen2-scenario-1-metrics-details-2.png" alt-text="Screenshot showing details of a Dataflow Gen2 High Scale Dataflow Compute consumption used in the run.":::

:::image type="content" source="media/pricing-scenarios/dataflows-gen2-scenario-1-metrics-details-3.png" alt-text="Screenshot showing details of a second Dataflow Gen2 High Scale Dataflow Compute consumption used in the run.":::


The Dataflow Gen2 Refresh operation consumed 4749.42 CU seconds, and two High Scale Dataflows Compute operations consumed 7.78 CU seconds + 7.85 CU seconds each.

> [!NOTE]
> Although reported as a metric, the actual duration of the run isn't relevant when calculating the effective CU hours with the Fabric Metrics App since the CU seconds metric it also reports already accounts for its duration.

|Metric  |Compute consumption  |
|---------|---------|
|Dataflow Gen2 Refresh CU seconds     | 4749.42 CU seconds        |
|High Scale Dataflows Compute CU seconds     | (7.78 + 7.85) 15.63 CU seconds        |
|Effective CU hours billed | (4749.42 + 15.63) / (60*60) = 1.32 CU hours |

**Total run cost at $0.18/CU hour** = (1.32 CU-hours) * ($0.18/CU hour) ~= **$0.24**

## Related content

- [Data pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflow Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
- [Pricing example scenarios](pricing-overview.md#pricing-examples)
