---
title: Pricing for Dataflow Gen2
description: This article provides details of the pricing model of Dataflow Gen2 for Data Factory in Microsoft Fabric.
ms.reviewer: whhender
ms.author: whhender
author: whhender
ms.topic: conceptual
ms.date: 12/18/2024
ms.custom: 
    - dataflows
---

# Dataflow Gen2 pricing for Data Factory in Microsoft Fabric

Dataflow Gen2 lets you use a low-code interface with 300+ data and AI-based transformations, letting you transform data easier and with more flexibility than any other tool. Dataflow Gen2 is authored using the familiar Power Query experience that’s available today across several Microsoft products and services such as Excel, Power BI, Power Platform, Dynamics 365 Insights applications, and more. Once you publish a dataflow, the dataflow definition is generated - this is the program that runs once the dataflow is refreshed to produce tables in staging storage and/or output destination. During refresh, the definition of a dataflow is used by the dataflow engine to generate an orchestration plan, manage resources, and orchestrate execution of queries. It does this work across data sources, gateways, and compute engines, and creates tables in either the staging storage or data destination.


:::image type="content" source="media/pricing-dataflows-gen2/dataflows-gen2-pricing-diagram.png" alt-text="Diagram of the Dataflow Gen2 architecture.":::

The diagram captures components of the Data Factory Dataflow Gen2 architecture, including the Lakehouse used to stage data being ingested, and Warehouse item used as a compute engine to write results to staging or output faster. When Warehouse compute can't be used, or when staging is disabled for a query, the Mashup Engine will extract, transform, or load the data to staging or data destinations. You can learn more about how Dataflow Gen2 works in this blog: [Data Factory Spotlight: Dataflow Gen2](https://blog.fabric.microsoft.com/blog/data-factory-spotlight-dataflows-gen2?ft=All).

When you refresh or publish a Dataflow Gen2 item, Fabric Capacity Units are consumed for the following engines:

- Standard Compute: You're charged for it based on the query evaluation time across all your Dataflow queries ran through the Mashup engine.  
- High Scale Dataflows Compute: You're charged when staging is enabled based on Lakehouse (Staging storage) and Warehouse (Storage Compute) SQL engine consumption duration.  

## Dataflow Gen2 pricing model

The following table indicates that to determine Dataflow Gen2 execution costs, each query execution utilizes the mashup engine for standard computing, and that compute execution duration is translated to a consumption rate of 16 CU (for every second, 16 CU seconds of capacity is consumed). Secondly, for high scale compute scenarios when staging is enabled, Lakehouse/Warehouse SQL engine execution duration should be accounted for as well. Compute execution duration is translated to a consumption rate of 6 CU. At the end of each Dataflow Gen2 run, the Capacity Unit (CU) consumption for each engine type is summed and is billed according to the translated price for Fabric capacity in the region where it's deployed.

|Dataflow Gen2 Engine Type  |Consumption Meters  |Fabric CU consumption rate  |Consumption reporting granularity      |
|---------|---------|---------|---------|
|Standard Compute     | Based on each mashup engine query execution duration in seconds.         | 16 CU         | Per Dataflow Gen2 item        |
|High Scale Dataflows Compute     | Based on Lakehouse/Warehouse SQL engine execution (with staging enabled) duration in seconds.         | 6 CU         | Per workspace        |
|Data movement     | Based on Fast Copy run duration in hours and the used intelligent optimization throughput resources.         | 1.5 CU         | Per Dataflow Gen2 item        |

## Virtual Network Data Gateway Pricing with Dataflow Gen2 

The Virtual Network (VNET) Data Gateway is billed as an additive infrastructure charge, associated with a Fabric capacity. This means that it has its own meter and incurs a bill that is consistent across and extra to all Fabric item runs.

The total bill for running Dataflows Gen2 through the VNET Data Gateway is calculated as: Dataflows Gen2 Charge + VNET Data Gateway Charge.

The VNET Data Gateway Charge is proportional to your usage of the VNET Data Gateway, where usage is defined as uptime, or anytime the VNET Data Gateway is on.

VNET Data Gateway CU consumption rate: (4 CU-hour) * (Fabric capacity per unit price)

Learn more at [Virtual Network Data Gateways Pricing and Billing](/data-integration/vnet/data-gateway-business-model).

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](https://aka.ms/fabricrm) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.

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
- [Pricing pipelines](pricing-pipelines.md)
