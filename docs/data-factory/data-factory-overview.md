---
title: What is Data Factory
description: Overview of Data Factory dataflows and data pipelines.
ms.reviewer: DougKlopfenstein
ms.author: makromer
author: kromerm
ms.topic: overview
ms.search.form: product-data-integration, Data_Factory_Overview
ms.date: 05/23/2023
---

# What is Data Factory in Microsoft Fabric?

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] provides cloud-scale data movement and data transformation services that allow you to solve the most complex data factory and ETL scenarios. It's intended to make your data factory experience easy to use, powerful, and truly enterprise-grade.

## Dataflows

Dataflows provide a low-code interface for ingesting data from hundreds of data sources, transforming your data using 300+ data transformations. You can then load the resulting data into multiple destinations, such as Azure SQL databases and more. Dataflows can be run repeatedly using manual or scheduled refresh, or as part of a data pipeline orchestration.

Dataflows are built using the familiar [Power Query](/power-query/power-query-what-is-power-query) experience that's available today across several Microsoft products and services such as Excel, Power BI, Power Platform, Dynamics 365 Insights applications, and more. Power Query empowers all users, ranging from citizen to pro, to perform data ingestion and data transformations across their data estate. Perform joins, aggregations, data cleansing, custom transformations, and much more all from an easy-to-use, highly visual, low-code UI.

:::image type="content" source="media/data-factory-overview/dataflow-experience.png" alt-text="Screenshot of the Power BI user interface showing the dataflow experience." lightbox="media/data-factory-overview/dataflow-experience.png":::

## Data pipelines

Data pipelines enable powerful workflow capabilities at cloud-scale. With data pipelines, you can build complex workflows that can refresh your dataflow, move PB-size data, and define sophisticated control flow pipelines.

Use data pipelines to build complex ETL and data factory workflows that can perform many different tasks at scale. Control flow capabilities are built into data pipelines that will allow you to build workflow logic, which provides loops and conditionals.

Add a configuration-driven copy activity together with your low-code dataflow refresh in a single pipeline for an end-to-end ETL data pipeline. You can even add code-first activities for Spark Notebooks, SQL scripts, stored procs, and more.

:::image type="content" source="media/data-factory-overview/data-pipelines.png" alt-text="Screenshot of the user interface showing copy activity." lightbox="media/data-factory-overview/data-pipelines.png":::

## Next steps

To get started with [!INCLUDE [product-name](../includes/product-name.md)], go to [Quickstart: Create your first Dataflows Gen2 to get and transform data](create-first-dataflow-gen2.md).
