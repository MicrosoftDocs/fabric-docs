---
title: Pricing scenario - Data pipelines load 1 TB of Parquet data to data warehouse
description: This article provides an example pricing scenario for loading 1 TB of Parquest data to a data warehouse using Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.date: 10/31/2023
---

# Pricing scenario using a data pipeline to load 1 TB of Parquet data to a data warehouse

In this scenario, a Copy activity was used in a data pipeline to load 1 TB of Parquet table data stored in ADLS Gen2 to a data warehouse in Microsoft Fabric.

The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. These are just to demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric. Also, since Fabric capacities are priced uniquely across regions, we will be using the pay-as-you-go pricing for a Fabric capacity at US West 2 (a typical Azure region), at $0.18 per CU per hour. Refer here to [Microsoft Fabric - Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore other Fabric capacity pricing options.

## Configuration

To accomplish this scenario, you need to create a pipeline with the following configuration:

:::image type="content" source="media/pricing-scenarios/load-1tb-parquet-to-data-warehouse.png" alt-text="Screenshot showing the configuration of a pipeline copying Parquet data from ADLS Gen2 to a data warehouse.":::

## Manual cost estimation

:::image type="content" source="media/pricing-scenarios/load-1tb-parquet-to-data-warehouse-details.png" alt-text="Screenshot showing the copy data details for the scenario.":::

|  |Source to Destination - Data Movement  |
|---------|---------|
|Duration     | 00:11:01        |
|Used Parallel copies     | 1        |
|TOU utilized by the activity run     | 4        |
|Billed duration     | 11 minutes 1 second = 12/60 hour        |
|Effective TOU-hours billed     | (4 TOU) * (12/60 hour) = 0.8 TOU-hours        |
|Effective CU     | (0.8 TOU-hours) * (1.5 CU) = 1.2 CU        |

**Total run cost at $0.18/CU hour** = (1.2 CU hours) * ($0.18/CU hour) ~= **$ 0.22**

## Cost estimation using the Fabric Metrics App

:::image type="content" source="media/pricing-scenarios/fabric-metrics-app-load-1tb-parquet-to-data-warehouse.png" alt-text="Screenshot showing the duration  and CU consumption of the job in the Fabric Metrics App.":::

The data movement operation utilized 3,960 CUs with a 662.64 second duration while activity run operation was null since there weren’t any non-copy activities in the pipeline run.

> [!NOTE]
> Although reported as a metric, the actual duration of the run isn't relevant when calculating the effective CU hours with the Fabric Metrics App since the CU seconds metric it also reports already accounts for its duration.


|  |Data Movement Operation  |
|---------|---------|
|CU seconds     | 3960 CU seconds        |
|Effective CU-hours     | (3960) / (60*60) CU-hours = 1.1 CU-hours        |

**Total run cost at $0.18/CU hour** = (1.1 CU-hour) * ($0.18/CU hour) ~= **$0.20**

## Next steps

- [Data pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflows Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
- [Pricing example scenarios](pricing-overview.md#pricing-examples)
