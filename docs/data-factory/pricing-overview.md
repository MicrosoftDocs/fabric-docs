---
title: Data Factory Pricing
description: This article provides an overview of the pricing model for Data Factory in Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: adija
author: adityajain2408
ms.topic: conceptual
ms.date: 10/30/2023
---

# Data Factory pricing in Microsoft Fabric

Data Factory in Microsoft Fabric provides serverless and elastic data integration service capabilities built for cloud scale. There is no fixed-size compute power that you need to plan for peak load; rather you need to specify which operations to perform while authoring pipelines and dataflows, which will translate into an amount of **Fabric Capacity Units** consumed, that you can further track using the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app) to plan and manage your consumption metrics. This allows you to design the ETL processes in a much more scalable manner. In addition, Data Factory, like other Fabric experiences, is billed on a consumption-based plan, which means you only pay for what you use.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Microsoft Fabric Capacities

Fabric is a unified data platform that offers shared experiences, architecture, governance, compliance, and billing. Capacities provide the computing power that drives all of these experiences. They offer a simple and unified way to scale resources to meet customer demand and can be easily increased with a SKU upgrade.

:::image type="content" source="media/pricing-overview/fabric-compute-capacities.png" alt-text="A diagram showing an overview of Microsoft Fabric, highlighting the Universal Compute Capacities and key features.":::

You can manage your Fabric Data Factory run costs easily with simplified billing. Additional users don't require any cost management on a per-user basis, and you can save money by planning and committing Fabric capacities for your data integration projects ahead. With the pay-as-you-go option, you can easily scale your capacities up and down to adjust their computing power and pause their capacities when not in use to save costs. Learn more about [Fabric capacities](../enterprise/licenses.md) and [usage billing](../enterprise/azure-billing.md).

## Data Factory pricing meters

Whether you’re a citizen or professional developer, Data Factory enables you to develop enterprise-scale data integration solutions with next-generation dataflows and data pipelines. These experiences operate on multiple services with different capacity meters. Data pipelines leverage **Data Orchestration** and **Data Movement** meters, while Dataflows Gen2 leverage **Standard Compute** and **High Scale Compute**. Additionally, like other Fabric experiences, the common meter for storage consumption is OneLake Storage.

:::image type="content" source="media/pricing-overview/pricing-meters.png" alt-text="Diagram showing the pricing meters for Data Factory in Microsoft Fabric.":::

## Pricing examples

Here are some example scenarios for pricing of data pipelines:

- [Load 1TB Parquet to a data warehouse]()
- [Load 1 TB Parquet to a data warehouse via staging]()
- [Load 1 TB CSV files to a Lakehouse table]()
- [Load 1 TB CSV files to a Lakehouse files with binary copy]()
- [Load 1 TB Parquet to a Lakehouse table]()

Here are some pricing examples for Dataflows Gen2:

- [Load on-premises 2 GB CSV file to a Lakehouse table]()
- [Load 2 GB Parquet to a Lakehouse table]()

## Next steps

- [Data pipelines pricing for Data Factory in Microsoft Fabric](pricing-pipelines.md)
- [Dataflows Gen2 pricing for Data Factory in Microsoft Fabric](pricing-dataflows-gen2.md)
