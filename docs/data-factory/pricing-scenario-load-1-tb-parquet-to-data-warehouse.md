---
title: Pricing scenario - Data pipelines load 1 TB of Parquet data to data warehouse
description: This article provides an example pricing scenario for loading 1 TB of Parquet data to a data warehouse using Data Factory in Microsoft Fabric.
ms.reviewer: whhender
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.custom: configuration
ms.date: 06/16/2025
---

# Pricing scenario using a data pipeline to load 1 TB of Parquet data to a data warehouse

In this scenario, a Copy activity was used in a data pipeline to load 1 TB of Parquet table data stored in Azure Data Lake Storage (ADLS) Gen2 to a data warehouse in Microsoft Fabric.

The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. These are just to demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric. Also, since Fabric capacities are priced uniquely across regions, we use the pay-as-you-go pricing for a Fabric capacity at US West 2 (a typical Azure region), at $0.18 per CU per hour. Refer here to [Microsoft Fabric - Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore other Fabric capacity pricing options.

## Configuration

To accomplish this scenario, you need to create a pipeline with the following configuration:

:::image type="content" source="media/pricing-scenarios/load-1-tb-parquet-to-data-warehouse.png" alt-text="Screenshot showing the configuration of a pipeline copying Parquet data from ADLS Gen2 to a data warehouse.":::

## Cost estimation using the Fabric Metrics App

:::image type="content" source="media/pricing-scenarios/fabric-metrics-app-load-1-tb-parquet-to-data-warehouse.png" alt-text="Screenshot showing the duration and CU consumption of the job in the Fabric Metrics App.":::

The data movement operation utilized 3,960 CU seconds with a 662.64 second duration while activity run operation was null since there weren’t any non-copy activities in the pipeline run. 

The pricing is based on the used intelligent throughput optimization, which depends on its configured maximum in the copy activity. It can be obtained from the activity output under `usedDataIntegrationUnits`. For more information, see this [article](copy-activity-performance-and-scalability-guide.md#intelligent-throughput-optimization). In this example, the used intelligent throughput optimization is 4.

The utilized CU seconds can be derived using the following calculation:

According to [data pipeline pricing model](pricing-pipelines.md#pricing-model), each unit of intelligent optimization throughput consumes 1.5 CU hours. Given the intelligent throughput optimization used is 4, and the data movement operation duration is 662.64 seconds (approximately 11 minutes), the total CU hours utilized will be:

Utilized CU hours = 4 * 1.5 * (11/60) = 1.1

To convert CU hours into CU seconds, multiply by 3600 (the number of seconds in an hour). 

Utilized CU seconds = 1.1 * 3600 = 3960

> [!NOTE]
> Although reported as a metric, the actual duration of the run isn't relevant when calculating the effective CU hours with the Fabric Metrics App since the CU seconds metric it also reports already accounts for its duration.

|Metric  |Data Movement Operation  |
|---------|---------|
|CU seconds     | 3,960 CU seconds        |
|Effective CU-hours     | (3,960) / (60*60) CU-hours = 1.1 CU-hours        |

**Total run cost at $0.18/CU hour** = (1.1 CU-hour) * ($0.18/CU hour) ~= **$0.20**

## Related content

- [Data pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflow Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
- [Pricing example scenarios](pricing-overview.md#pricing-examples)
