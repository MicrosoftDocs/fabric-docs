---
title: Pricing for data pipelines
description: This article provides details of the pricing model of data pipelines for Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Data pipelines pricing for Data Factory in Microsoft Fabric

Data pipelines enable you to apply rich out-of-the-box data orchestration capabilities to compose flexible data workflows that meet your enterprise data movement and ingestion needs. These capabilities require different computing service engines that have distinct consumption rates.


:::image type="content" source="media/pricing-overview/pipelines-pricing-diagram.png" alt-text="Diagram showing the data pipeline pricing model for Data Factory in Microsoft Fabric.":::

When you run a Data Pipeline with Data Factory in Microsoft Fabric, Fabric Capacity Units are consumed for the following services:

- Pipeline services for orchestration of _activity runs_: Your charge is based on the number of activity runs that are orchestrated.
- Data Movement service for Copy activity runs. You are charged based on the Capacity Units consumed during the Copy activity execution duration.

> [!NOTE]
> We are currently experiencing an issue in Fabric Data Factory capacity unit emissions resulting in very low billing for data pipelines. We expected to have this issue corrected shortly. In the interim, you can expect to see much lower than expected CUs and billing for your data pipelines in Fabric Data Factory.

## Pricing model

The following table shows a breakdown of the pricing model for data pipelines within Data Factory in Microsoft Fabric:

|Data Pipelines Engine Type  |Charge Meters and Metric Units  |Fabric Capacity Units (CUs) consumption rate  |
|---------|---------|---------|
|Data movement    | Based on Copy activity run duration in hours and the used intelligent optimization throughput resources        | 1.5 CUs / hour   |
|Data orchestration     |  Incorporates orchestration activity runs and activity integration runtime charges       | 0.0056 CUs for each non-copy activity run |

It indicates that for each intelligent optimization throughput resource usage in a Data Pipeline execution, 1.5 CU per hour are consumed for data movement Copy activities. Secondly, each orchestration activity run consumes 0.0056 CU. At the end of each pipeline run, the CU consumption for each engine type is summed and is billed as per the translated price of the Fabric Capacity in the region where the capacity is deployed.  

> [!NOTE]
> Whenever a pipeline orchestration activity triggers other Fabric artifacts to run (for example, Notebook or Dataflow Gen2), the consumption for those artifacts needs to be taken into account as well.

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](/fabric/release-plan/data-factory) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/en-US/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.  

## Compute estimated costs using the Fabric Metrics App

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. It's used by capacity administrators to monitor the performance of workloads and their usage compared to purchased capacity. Using the Fabrics Metrics App is the most accurate way to estimate the costs of data pipeline executions.

The following table can be used as a template to compute estimated costs using Fabric Metrics app for a data pipeline run:

|Metric  | Data movement operation  |Activity run operation  |
|---------|---------|---------|
|Duration in seconds     |  t in seconds       | N/A         |
|CU seconds     | x CU seconds    |  y CU seconds       |
|Effective CU-hour     | x CU seconds / (60*60) = X CU-hour    | y CU(s) / (60*60) = Y CU-hour        |

**Total cost**: (X + Y CU-hour) * (Fabric capacity per unit price)

## Related content

- [Pricing example scenarios](pricing-overview.md#pricing-examples)
- [Pricing Dataflow Gen2](pricing-dataflows-gen2.md)
