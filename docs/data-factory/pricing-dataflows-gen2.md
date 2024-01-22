---
title: Pricing for Dataflow Gen2
description: This article provides details of the pricing model of Dataflow Gen2 for Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Dataflow Gen2 pricing for Data Factory in Microsoft Fabric

Dataflow Gen2 enables you to leverage a low-code interface and 300+ data and AI-based transformations, letting you transform data easier and with more flexibility than any other tool.  Dataflow Gen2 is authored using the familiar Power Query experience that’s available today across several Microsoft products and services such as Excel, Power BI, Power Platform, Dynamics 365 Insights applications, and more. Once you publish a dataflow, the dataflow definition is generated - this is the program that will run once the dataflow is refreshed to produce tables in staging storage and/or output destination. During refresh, the definition of a dataflow is used by the dataflow engine to generate an orchestration plan, manage resources, and orchestrate execution of queries across data sources, gateways, and compute engines, and to create tables in either the staging storage or data destination.


:::image type="content" source="media/pricing-dataflows-gen2/dataflows-gen2-pricing-diagram.png" alt-text="Diagram of the Dataflow Gen2 architecture.":::

The diagram shown here captures the various components of the Data Factory Dataflow Gen2 architecture, including the Lakehouse used to stage data being ingested, and Warehouse artifact used as a compute engine and means to write back results to staging or supported output destinations faster. When Warehouse compute cannot be used, or when staging is disabled for a query, the Mashup Engine will extract, transform, or load the data to staging or data destinations. You can learn more about how Dataflow Gen2 works in this blog post here: [Data Factory Spotlight: Dataflow Gen2](https://blog.fabric.microsoft.com/blog/data-factory-spotlight-dataflows-gen2?ft=All).

When you refresh or publish a Dataflow Gen2 item, Fabric Capacity Units are consumed for the following engines.
- Standard Compute: You're charged for it based on the query evaluation time across all your Dataflow queries ran through the Mashup engine.  
- High Scale Dataflows Compute: You are charged when staging is enabled based on Lakehouse (Staging storage) and Warehouse (Storage Compute) SQL engine consumption duration.  

## Dataflow Gen2 pricing model

The following table indicates that to determine Dataflow Gen2 execution costs, each query execution utilizes the mashup engine for standard computing, and that compute execution duration is translated to a consumption rate of 16 CUs per hour. Secondly, for high scale compute scenarios when staging is enabled, Lakehouse/Warehouse SQL engine execution duration should be accounted for as well. Compute execution duration is translated to a consumption rate of 6 CUs per hour. At the end of each Dataflow Gen2 run, the Capacity Unit (CU) consumption for each engine type is summed and is billed according to the translated price for Fabric capacity in the region where it's deployed.

|Dataflow Gen2 Engine Type  |Consumption Meters  |Fabric CU consumption rate  |Consumption reporting granularity      |
|---------|---------|---------|---------|
|Standard Compute     | Based on each mashup engine query execution duration in seconds.         | 16 CUs per hour         | Per Dataflow Gen2 item        |
|High Scale Dataflows Compute     | Based on Lakehouse/Warehouse SQL engine execution (with staging enabled) duration in seconds.         | 6 CUs per hour         | Per workspace        |

> [!NOTE]
> It isn't currently possible to cancel a Dataflow Gen2 run, but we will add this capability by January, 2024.

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](/fabric/release-plan/data-factory) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.

## Compute estimated costs using the Fabric Metrics App

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. It's used by capacity administrators to monitor the performance of workloads and their usage compared to purchased capacity. Using the Metrics app is the most accurate way to estimate the costs of Dataflow Gen2 refresh runs. When you load-test your scenario, create the Dataflow Gen2 item in a new workspace to reduce any reported noise in the Fabric Metrics App.

The following table can be utilized as a template to compute estimated costs using Fabric Metrics app for a Dataflow Gen2 refresh:


|Metric  |Standard Compute  |High Scale Compute  |
|---------|---------|---------|
|Total CUs     | s CU seconds        |  h CU seconds       |
|Effective CU-hours billed      | s / (60*60) = S CU-hour        |  h / (60*60) = H CU-hour       |

**Total refresh cost** = (S + H CU-hour) * (Fabric capacity per unit price)

## Related content

- [Pricing example scenarios](pricing-overview.md#pricing-examples)
- [Pricing data pipelines](pricing-pipelines.md)
