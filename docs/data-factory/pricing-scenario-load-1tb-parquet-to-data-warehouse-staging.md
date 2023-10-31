---
title: Pricing scenario - Data pipelines load 1 TB of Parquet data to data warehouse with staging
description: This article provides an example pricing scenario for loading 1 TB of Parquest data to a data warehouse with staging using Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.date: 10/31/2023
---

# Pricing scenario using a data pipeline to load 1 TB of Parquet data to a data warehouse with staging

In this scenario, a Copy activity was used in a data pipeline to load 1 TB of Parquet table data stored in ADLS Gen2 to a data warehouse with staging in Microsoft Fabric.

The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. These are just to demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric. Also, since Fabric capacities are priced uniquely across regions, we will be using the pay-as-you-go pricing for a Fabric capacity at US West 2 (a typical Azure region), at $0.18 per CU per hour. Refer here to [Microsoft Fabric - Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore other Fabric capacity pricing options.

## Configuration

To accomplish this scenario, you need to create a pipeline with the following configuration:

:::image type="content" source="media/pricing-scenarios/load-1tb-parquet-to-data-warehouse-staging.png" alt-text="Screenshot showing the configuration of a pipeline copying Parquet data from ADLS Gen2 to a data warehouse with staging.":::

## Manual cost estimation

:::image type="content" source="media/pricing-scenarios/load-1tb-parquet-to-data-warehouse-staging-details.png" alt-text="Screenshot showing the copy data details for the scenario.":::

|  |Source to staging  | Staging to destination |
|---------|---------|---------|
|Duration     | 00:14:42        | 00:10:11 |
|Used Parallel copies     | 256        | 1 |
|TOU utilized by the activity run     | 256        | 4 |
|Billed duration     | 15 minutes = 15/60 hour        | 11 minutes = 11/60 hour |
|Effective TOU-hours billed     | (256 TOU) * (15/60 hour) = 64 TOU-hours        | (4 TOU) * (11/60 hour) = 0.74 TOU-hours |
|Effective CU     | (64 TOU-hours) * (1.5 CU) = 96 CU hours        | (0.74 TOU-hours) * (1.5 CU) = 1.1 CU-hours |

**Total run cost at $0.18/CU hour** = (97.1 CU hours) * ($0.18/CU hour) ~= **$ 17.28**

## Cost estimation using the Fabric Metrics App

:::image type="content" source="media/pricing-scenarios/fabric-metrics-app-load-1tb-parquet-to-data-warehouse-staging.png" alt-text="Screenshot showing the duration  and CU consumption of the job in the Fabric Metrics App.":::

The data movement operation utilized 267,480 CU seconds with a 1504.42 second (25.07 minute) duration while activity run operation was null since there weren’t any non-copy activities in the pipeline run.

> [!NOTE]
> Although reported as a metric, the actual duration of the run isn't relevant when calculating the effective CU hours with the Fabric Metrics App since the CU seconds metric it also reports already accounts for its duration.

|  |Data Movement Operation  |
|---------|---------|
|CU seconds     | 267,480 CU seconds        |
|Effective CU-hours     | (267,480) / (60*60) CU-hours = 74.3 CU-hours        |

**Total run cost at $0.18/CU hour** = (74.3 CU-hours) * ($0.18/CU hour) ~= **$13.37**

## Next steps

- [Data pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflows Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
- [Pricing example scenarios](pricing-overview.md#pricing-examples)
