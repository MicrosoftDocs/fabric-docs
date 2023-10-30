---
title: Pricing for data pipelines
description: This article provides details of the pricing model for data pipelines for Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.date: 10/30/2023
---

# Data pipelines pricing for Data Factory in Microsoft Fabric

Data pipelines enable you to leverage rich out-of-the-box data orchestration capabilities to compose flexible data workflows that meet your enterprise data movement and ingestion needs. These capabilities require different computing service engines that have distinct consumption rates.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

:::image type="content" source="media/pricing-overview/pipelines-pricing-diagram.png" alt-text="Diagram showing the data pipeline pricing model for Data Factory in Microsoft Fabric.":::

When you run a Data Pipeline with Data Factory in Microsoft Fabric, Fabric Capacity Units are consumed for the following services:

- Pipeline services for orchestration _activity runs_: Your charge is based on the number of activity runs that are orchestrated.
- Azure Data Movement Services (ADMS) for Copy activity runs require _Throughput Optimization Units (TOU)_ hours. For copy activities, your charge is based on the number of TOU used and the execution duration.

> [!NOTE]
> Data Integration Units was recently renamed to Throughput Optimization Units. The data pipelines user experience might still display the legacy name in some activity output.

## Pricing model

The following table shows a breakdown of the pricing model for Data Factory in Microsoft Fabric:

|Data Pipelines Engine Type  |Charge Meters and Metric Units  |Fabric Capacity Units (CUs) consumption rate  |
|---------|---------|---------|
|Data orchestration    | Based on TOU-Hours consumed to run copy activities        | 1.5 CU hours for each TOU hour consumed   |
|Data movement     |  Incorporates orchestration activity runs and activity integration runtime charges       | 0.0056 CUs for each non-copy activity run |

It indicates that for each _Throughput Optimization Unit (TOU)_ hour used in data movement Copy activities, 1.5 Fabric Capacity Units (CU) are consumed and their billing is prorated by the minute and rounded up. For example, 1 second of Copy activity is billed for 1 minute, and 1 minute 5 seconds is billed for 2 minutes. Secondly, each orchestration activity run consumes 0.0056 CU. At the end of each pipeline run, the CU consumption for each engine type is summed and is billed as per the translated price of the Fabric Capacity in the region where the capacity is deployed.

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft will use reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](/release-plan/) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/en-US/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers may use the cancellation options available for the chosen payment method.  

## Manually compute estimated costs

The following table can be used as a template to manually compute estimated costs for a Pipeline run:

|  |Data Movement Operation  |Activity Run Operation (Count = n)  |
|---------|---------|---------|
|Duration in minutes     | t mins        | N/A        |
|TOU utilized by the activity run     |         | N/A         |
|Billed duration (hour)     | t/60        | N/A         |
|Effective TOU-hour billed     | (TOU utilized) * (Billed duration)        | N/A        |
|Effective CU     | TOU-hour billed * 1.5 CU = X CU        | n * 0.0056 CU        |

**Total run cost** = (X CU + (n*0.0056)) * (Fabric capacity price per unit)

## Compute estimated costs using the Fabric Metrics App

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. It is used by capacity administrators to monitor the performance of workloads and their usage compared to purchased capacity. Using the Fabrics Metrics App is the most accurate way to estimate the costs of data pipeline executions.

The following table can be used as a template to compute estimated costs using Fabric Metrics app for a data pipeline run:

|  | Data movement operation  |Activity run operation  |
|---------|---------|---------|
|Duration in seconds     |  t in seconds       | N/A         |
|CU (s)     | x CU (s)    |  y CU(s)       |
|Effective CU-hour     | x CU(s) / (60*60) = X CU-hour    | y CU(s) / (60*60) = Y CU-hour        |

**Total cost**: (X + Y CU-hour) * (Fabric Capacity per unit price)

We'll apply this information to calculate costs for a number of [pricing example scenarios](pricing-overview.md#pricing-examples). 