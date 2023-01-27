---
title: What is Data Factory
description: Overview of Data Factory dataflows and pipelines.
ms.reviewer: DougKlopfenstein 
ms.author: makromer
author: kromerm
ms.topic: overview
ms.date: 01/27/2023
---

# Overview: What is [!INCLUDE [product-name](../includes/product-name.md)] Data Factory

[!INCLUDE [product-name](../includes/product-name.md)] Project - Data factory provides cloud-scale data movement and data transformation services that allow you to solve the most complex Data factory and ETL scenarios. It's intended to make your Data factory experience easy to use, powerful, and truly enterprise-grade.

## Dataflows

Dataflows provide a low-code interface for ingesting data from hundreds of data sources, transforming your data using 300+ data transformations and loading the resulting data into multiple destinations such as Azure SQL Databases and more. Dataflows can be run repeatedly via manual or scheduled refresh, or as part of a data pipeline orchestration.

Dataflows are built using the familiar [Power Query](/power-query/power-query-what-is-power-query) experience that is available today across several Microsoft products and services such as Excel, Power BI, Power Platform, Dynamics 365 Insights Applications and more. Power Query empowers all users, ranging from Citizen to Pro, to perform data ingestion and data transformations across their data estate. Perform joins, aggregations, data cleansing, custom transformations, and much more all from an easy-to-use, highly visual, low-code UI.

:::image type="content" source="media/data-factory-overview/dataflow-experience-01.png" alt-text="Power BI user interface showing dataflow experience.":::

## Data pipelines

Data pipelines enable powerful workflow capabilities at cloud-scale. With data pipelines, you can build complex workflows that can refresh your dataflow, move PB-size data, and define sophisticated control flow pipelines.

Use data pipelines to build complex ETL and Data factory workflows that can perform many different tasks at scale. Control flow capabilities are built into pipelines that will allow you to build workflow logic, which provides loops and conditionals.

Add a configuration-driven copy activity together with your low-code dataflow refresh in a single pipeline for an end-to-end ETL data pipeline. You can even add code-first activities as well for Spark Notebooks, SQL scripts, store procs, and more.

:::image type="content" source="media/data-factory-overview/data-pipelines-02.png" alt-text="User interface showing copy activity.":::

## Next steps

To get started with [!INCLUDE [product-name](../includes/product-name.md)], see [Quickstart: Create your first Dataflows Gen2 to get and transform data (Preview)](create-first-dataflow-gen2.md).
