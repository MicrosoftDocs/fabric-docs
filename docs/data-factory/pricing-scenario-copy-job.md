---
title: Pricing scenario - Copy job load 1 TB of CSV data to a Lakehouse table
description: This article provides an example pricing scenario for loading 1 TB of CSV data to Lakehouse files with binary copy using Copy job in Data Factory in Microsoft Fabric.
ms.reviewer: yexu
ms.topic: concept-article
ms.custom: configuration
ms.date: 07/24/2025
---

# Pricing scenario using a Copy job to load 1 TB of CSV data to a Lakehouse table

In this scenario, a Copy job was used to load 1 TB of CSV data stored in Azure Data Lake Storage (ADLS) Gen2 to a Lakehouse table in Microsoft Fabric.

The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. These are just to demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric. Also, since Fabric capacities are priced uniquely across regions, we use the pay-as-you-go pricing for a Fabric capacity at US West 2 (a typical Azure region), at $0.18 per CU per hour. Refer here to [Microsoft Fabric - Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore other Fabric capacity pricing options.

## Configuration

To accomplish this scenario, you need to create a Copy job with the following configurations:

1. Upload 1 TB CSV files to your ADLS Gen2 account.
2. Create and run a Copy job using its built-in incremental copy mode to move the 1 TB files to your Fabric Lakehouse.
3. Upload an additional 1 GB CSV file to the same ADLS Gen2 account.
4. Run the Copy Job again, and it will automatically detect and copy only this new file.

## Cost estimation using the Fabric Metrics App

The first run of the Copy Job performs an initial full copy, while subsequent runs only copy new or changed files using incremental copy.

:::image type="content" source="media/pricing-scenarios/fabric-metrics-app-copy-job.png" alt-text="Screenshot showing the duration and CU consumption of the copy job in the Fabric Metrics App.":::


### Full copy

The initial full copy with data movement operation utilized 253,440 CU seconds with a 626.64 second duration.

The pricing is based on the used intelligent throughput optimization. For more information, see this [article](copy-activity-performance-and-scalability-guide.md#intelligent-throughput-optimization). In this example, the used intelligent throughput optimization is 256.

The utilized CU seconds can be derived using the following calculation:

According to [Copy job pricing model](pricing-copy-job.md#pricing-model), each unit of intelligent throughput optimization consumes 1.5 CU hours for full copy. Given the intelligent throughput optimization used is 256, and the data movement operation duration is 626.64 seconds (approximately 11 minutes), the total CU hours utilized will be: 

Utilized CU hours = 256 * 1.5 * (11/60) = 70.4

To convert CU hours into CU seconds, multiply by 3600 (the number of seconds in an hour).

Utilized CU seconds = 70.4 * 3600 = 253,440


### Incremental copy

The incremental copy with data movement – incremental copy operation utilized 720 CU seconds with a 40.48 second duration.

The pricing is also based on the used intelligent throughput optimization. In this example, the used intelligent throughput optimization is 4.

The utilized CU seconds can be derived using the following calculation:

According to [Copy job pricing model](pricing-copy-job.md#pricing-model), each unit of intelligent throughput optimization consumes 3 CU hours for incremental copy. Given the intelligent throughput optimization used is 4, and the data movement – incremental copy operation duration is 40.48 seconds (approximately 1 minute), the total CU hours utilized will be:

Utilized CU hours = 4 * 3 * (1/60) = 0.2

To convert CU hours into CU seconds, multiply by 3600 (the number of seconds in an hour).

Utilized CU seconds = 0.2 * 3600 = 720

> [!NOTE]
> Although reported as a metric, the actual duration of the run isn't relevant when calculating the effective CU hours with the Fabric Metrics App since the CU seconds metric it also reports already accounts for its duration.


### Total

|Metric  | Consumption  |
|---------|---------|
| Data movement CU seconds     | 253,440 CU seconds        |
| Data movement – incremental copy CU seconds      | 720 CU seconds        |

**Total run cost at $0.18/CU hour** = (253,440 + 720) / (60*60) CU-hours * ($0.18/CU hour) = **$12.708**

## Related content

- [Copy job pricing for Data Factory in Microsoft Fabric](pricing-copy-job.md)
- [Pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflow Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
- [Pricing example scenarios](pricing-overview.md#pricing-examples)