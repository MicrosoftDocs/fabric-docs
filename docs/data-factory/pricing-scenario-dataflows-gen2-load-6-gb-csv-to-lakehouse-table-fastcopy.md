---
title: Pricing scenario - Dataflow Gen2 loads 6 GB CSV file to a Lakehouse table with Fast Copy
description: This article provides an example pricing scenario for loading 6 GB of CSV data to a Lakehouse table using Dataflow Gen2 with Fast Copy enabled for Data Factory in Microsoft Fabric.
ms.reviewer: 
ms.author: yexu
author: dearandyxu
ms.topic: conceptual
ms.date: 07/05/2024
ms.custom: 
    - dataflows
    - configuration
---

# Pricing scenario using Dataflow Gen2 to load 6 GB of CSV data to a Lakehouse table with Fast Copy enabled

In this scenario, Dataflow Gen2 was used to load 6 GB of CSV data to a Lakehouse table in Microsoft Fabric.

The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. These are just to demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric. Also, since Fabric capacities are priced uniquely across regions, we use the pay-as-you-go pricing for a Fabric capacity at US West 2 (a typical Azure region), at $0.18 per CU per hour. Refer here to [Microsoft Fabric - Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore other Fabric capacity pricing options.

## Configuration

To accomplish this scenario, you need to create a dataflow with the following steps:

1. Start by uploading 6 GB CSV files from your ADLS Gen2 environment into the dataflow.
1. Configure Power Query to combine the CSV files. 
1. Set Lakehouse as the data output destination.
1. Enable Fast Copy Feature.


## Cost estimation using the Fabric Metrics App

The Dataflow Gen2 Refresh operation consumed almost about 4 minutes with 3,696 CU seconds on Dataflow Gen2 Refresh and 5,448 CU seconds on Data movement.

> [!NOTE]
> Although reported as a metric, the actual duration of the run isn't relevant when calculating the effective CU hours with the Fabric Metrics App since the CU seconds metric it also reports already accounts for its duration.

|Metric  |Compute consumption  |
|---------|---------|
|Dataflow Gen2 Refresh CU seconds    | 3,696 CU seconds        |
|Data movement CU seconds     | 5,448 CU seconds        |

**Total run cost at $0.18/CU hour** = (3,696 + 5,448) / (60*60) CU-hours * ($0.18/CU hour) ~= **$0.46**

## Related content

- [Data pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflow Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
- [Pricing example scenarios](pricing-overview.md#pricing-examples)
