---
title: Pricing for Dataflows Gen2
description: This article provides details of the pricing model of Dataflows Gen2 for Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.date: 10/30/2023
---

# Dataflows Gen2 pricing for Data Factory in Microsoft Fabric

The following table indicates that to determine Dataflow Gen2 execution costs, each query execution utilizes the mashup engine for standard computing, and that compute execution duration is translated to a consumption rate of 16 CU per hour. Secondly, for high scale compute scenarios when staging is enabled, Lakehouse/Warehouse SQL engine execution duration should be accounted for as well. Compute execution duration is translated to a consumption rate of 6 CU per hour. At the end of each Dataflows Gen2 run, the Capacity Unit (CU) consumption for each engine type is summed and is billed according to the translated price for Fabric capacity in the region where it is deployed.


|Dataflows Gen2 Engine Type  |Consumption Meters  |Fabric CUs consumption rate  |Consumption reporting granularity      |
|---------|---------|---------|---------|
|Standard Compute     | Based on each mashup engine query execution duration in seconds.         | 16 CUs per hour         | Per Dataflows Gen2 item        |
|High Scale Dataflows Compute     | Based on LH/WH SQL engine execution (Staging enabled) duration in seconds.         | 6 CUs per hour         | Per workspace        |

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft will use reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](../release-plan/) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers may use the cancellation options available for the chosen payment method.

## Manually compute estimated costs

The following table is a template to help you manually estimate costs for a Dataflows Gen2 refresh with staging enabled:

|Metric    |Standard Compute  |
|---------|---------|
|Duration in seconds     |  t seconds       |
|Billed duration (in hours)     |  t / (60*60) hours       |
|Effective CU-hours billed     |  (16 CUs) * (Billed duration in hour)       |

**Total refresh cost** = (Effective CU-hours billed) * (Fabric capacity per unit cost)

The following table can be utilized as a template to manually compute estimated costs for a Dataflows Gen2 refresh with staging enabled:

|Metric    |Standard Compute  | High Scale Compute |
|---------|---------|---------|
|Duration in seconds     |  t seconds       | d seconds |
|Billed duration (in hours)     |  t / (60*60) hours       | d / (60*60) hour |
|Effective CU-hours billed     |  (16 CU) * (Billed duration in hour) = X CU-hours      | (6 CUs) * (Billed duration in hour) = Y CU-hours |

**Total refresh cost** = (X + Y CU-hours) * (Fabric capacity per unit cost)

## Compute estimated costs using the Fabric Metrics App

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. It is used by capacity administrators to monitor the performance of workloads and their usage compared to purchased capacity. Using the Metrics app is the most accurate way to estimate the costs of Dataflow Gen2 refresh runs. While load-testing your scenario, create the Dataflow Gen2 item in a new workspace to reduce any reported noise in the Fabric Metrics App.

The following table can be utilized as a template to compute estimated costs using Fabric Metrics app for a Dataflows Gen2 refresh:


|Metric  |Standard Compute  |High Scale Compute  |
|---------|---------|---------|
|Total CUs     | s CU seconds        |  h CU seconds       |
|Effective CU-hours billed      | s / (60*60) = S CU-hour        |  h / (60*60) = H CU-hour       |

**Total refresh cost** = (S + H CU-hour) * (Fabric capacity per unit price)

## Next steps

- [Pricing example scenarios](pricing-overview.md#pricing-examples)
- [Pricing data pipelines](pricing-pipelines.md)