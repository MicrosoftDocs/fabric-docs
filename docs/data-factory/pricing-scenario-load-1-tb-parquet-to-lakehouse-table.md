---
title: Pricing scenario - Data pipelines load 1 TB of Parquet data to a Lakehouse table
description: This article provides an example pricing scenario for loading 1 TB of Parquet data to a Lakehouse table using Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Pricing scenario using a data pipeline to load 1 TB of Parquet data to a Lakehouse table

In this scenario, a Copy activity was used in a data pipeline to load 1 TB of Parquet data stored in Azure Data Lake Storage (ADLS) Gen2 to a Lakehouse table in Microsoft Fabric.


The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. These are just to demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric. Also, since Fabric capacities are priced uniquely across regions, we use the pay-as-you-go pricing for a Fabric capacity at US West 2 (a typical Azure region), at $0.18 per CU per hour. Refer here to [Microsoft Fabric - Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore other Fabric capacity pricing options.

## Configuration

To accomplish this scenario, you need to create a pipeline with the following configuration:

:::image type="content" source="media/pricing-scenarios/load-1-tb-parquet-to-lakehouse-table.png" alt-text="Screenshot showing the configuration of a pipeline copying CSV data to a Lakehouse table.":::

## Cost estimation using the Fabric Metrics App

:::image type="content" source="media/pricing-scenarios/fabric-metrics-app-load-1-tb-parquet-to-lakehouse-table.png" alt-text="Screenshot showing the duration and CU consumption of the job in the Fabric Metrics App.":::

The data movement operation utilized 291,960 CU seconds with a 810.16 second (13.5 minute) duration while activity run operation was null since there weren’t any non-copy activities in the pipeline run.

> [!NOTE]
> Although reported as a metric, the actual duration of the run isn't relevant when calculating the effective CU hours with the Fabric Metrics App since the CU seconds metric it also reports already accounts for its duration.

|Metric  |Data Movement Operation  |
|---------|---------|
|CU seconds     | 291,960 CU seconds        |
|Effective CU-hours     | (291,960) / (60*60) CU-hours = 81.1 CU-hours        |

**Total run cost at $0.18/CU hour** = (81.1 CU-hours) * ($0.18/CU hour) ~= **$14.60**

## Related content

- [Data pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflow Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
- [Pricing example scenarios](pricing-overview.md#pricing-examples)
