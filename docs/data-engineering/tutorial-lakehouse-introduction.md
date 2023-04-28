---
title: Lakehouse tutorial - introduction
description: Read the introduction to the Microsoft Fabric Lakehouse end-to-end scenario before you begin the tutorial.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.date: 4/28/2023
---

# Lakehouse tutorial: Introduction to Microsoft Fabric

Microsoft Fabric is an all-in-one analytics solution for enterprises that covers everything from data movement to data science, real-time analytics, and business intelligence. It offers a comprehensive suite of services, including data lake, data engineering, and data integration, all in one place. For more information, see [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)

For more information, see [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)

## Purpose of this tutorial

This tutorial walks you step-by-step through an end-to-end scenario from data acquisition to data consumption. It builds a basic understanding of Fabric, the various workloads, their integration points, and the Fabric professional and citizen developer experiences.

This tutorial isn't intended to be a reference architecture, an exhaustive list of features and functionality, or a recommendation of specific best practices.

## Lakehouse end-to-end scenario

Traditionally, organizations have been building modern data warehouses for their transactional and structured data analytics needs. And data lakehouses for big data (semi/unstructured) data analytics needs. These two systems ran in parallel, creating silos, data duplicity, and increased total cost of ownership.

Fabric with its unification of data store and standardization on Delta Lake format allows you to eliminate silos, remove data duplicity, and drastically reduce total cost of ownership.

With the flexibility offered by Fabric, you can implement either lakehouse or data warehouse architectures or combine these two together to get the best of both with simple implementation. In this tutorial, you're going to take an example of a retail organization and build its lakehouse from start to finish. It uses the [medallion architecture](/azure/databricks/lakehouse/medallion) where the bronze layer has the raw data, the silver layer has the validated and deduplicated data, and the gold layer has highly refined data. You can take the same approach to implement a lakehouse for any organization from any industry.

This tutorial explains how a developer at the fictional Wide World Importers company from the retail domain completes the following steps:

1. Sign in to your Power BI account, or if you don’t have one yet, [sign up for a free trial](../placeholder.md).

1. Build and implement an end-to-end lakehouse for your organization:
   1. [Create a Fabric workspace](tutorial-lakehouse-get-started.md)
   1. [Create a lakehouse](tutorial-build-lakehouse.md) - an optional module to implement medallion architecture (Bronze, Silver, and Gold).
   1. [Ingest data](tutorial-lakehouse-data-ingestion.md), [transform](tutorial-lakehouse-data-preparation.md), and load it into the lakehouse - bronze, silver, and gold zones as delta lake tables for medallion architecture.
   1. Explore OneLake, OneCopy of your data across lake mode and warehouse mode
   1. Connect to your lakehouse using TDS/SQL endpoint.
   1. [Create a Power BI report using DirectLake](tutorial-lakehouse-build-report.md) - to analyze sales data across different dimensions.
   1. Orchestrate and schedule data ingestion and transformation flow with Pipeline.

1. [Clean up resources](tutorial-lakehouse-clean-up.md) by deleting the workspace and other items.

## Lakehouse end-to-end architecture

:::image type="content" source="media\tutorial-lakehouse-introduction\lakehouse-end-to-end-architecture.png" alt-text="Diagram of the end-to-end architecture of a lakehouse in Microsoft Fabric." lightbox="media\tutorial-lakehouse-introduction\lakehouse-end-to-end-architecture.png":::

**Data sources** - Fabric makes it easy and quick to connect to Azure Data Services, other cloud platforms, and on-premises data sources to ingest data from.

**Ingestion** - With 200+ native connectors as part of the Fabric pipeline and with drag and drop data transformation with dataflow, you can quickly build insights for your organization. Shortcut is a new feature in Fabric that provides a way to connect to existing data without having to copy or move it.

**Transform and store** - Fabric standardizes on Delta Lake format, which means all the engines of Fabric can read and work on the same dataset stored in OneLake - no need for data duplicity. This storage allows you to build lakehouses using a medallion architecture or data mesh based on your organizational need. For transformation, you can choose either low-code or no-code experience with pipelines/dataflows or notebook/Spark for a code first experience.

**Consume** - Data from Lakehouse can be consumed by Power BI, industry leading business intelligence tool, for reporting and visualization. Each Lakehouse comes with a built-in TDS/SQL endpoint for easily connecting to and querying data in the Lakehouse tables from other reporting tools, when needed. When a Lakehouse is created a secondary item, called a Warehouse, is automatically generated at the same time with the same name as the Lakehouse and this Warehouse item provides you with the TDS/SQL endpoint.

## Sample data

For sample data, we're going to use [Wide World Importers (WWI) sample database](/sql/samples/wide-world-importers-what-is?view=sql-server-ver16&preserve-view=true). For our lakehouse end-to-end scenario, we have generated sufficient data for a sneak peek into the scale and performance capabilities of the Fabric platform.

Wide World Importers (WWI) is a wholesale novelty goods importer and distributor operating from the San Francisco Bay area. As a wholesaler, WWI's customers are mostly companies who resell to individuals. WWI sells to retail customers across the United States including specialty stores, supermarkets, computing stores, tourist attraction shops, and some individuals. WWI also sells to other wholesalers via a network of agents who promote the products on WWI's behalf. Learn more about their company profile and operation: [Wide World Importers sample databases for Microsoft SQL](/sql/samples/wide-world-importers-what-is?view=sql-server-ver16&preserve-view=true).

Typically, you would bring data from transactional systems (or line of business applications) into a lakehouse, however for simplicity of this tutorial, we use the dimensional model provided by WWI as our initial data source. We use it as the source to ingest the data into a lakehouse and transform it through different stages (Bronze, Silver, and Gold) of a medallion architecture.

## Data model

While the WWI dimensional model contains multiple fact tables, for simplicity in explanation we focus on the Sale Fact table and its related dimensions only, as shown in the following example, to demonstrate this end-to-end lakehouse scenario:

:::image type="content" source="media\tutorial-lakehouse-introduction\model-sale-fact-table.png" alt-text="Diagram of the Sale Fact table and related dimensions for this tutorial's data model." lightbox="media\tutorial-lakehouse-introduction\model-sale-fact-table.png":::

## End-to-end data and transformation flow

Earlier, we described the [Wide World Importers (WWI) sample data](/sql/samples/wide-world-importers-what-is?view=sql-server-ver16&preserve-view=true), which we're going to leverage in building this end to end lakehouse. For this implementation, this sample data is in an Azure Data storage account in Parquet file format for all the tables, however in your real-world implementation data would likely come from varieties of sources and in a variety of formats.

:::image type="content" source="media\tutorial-lakehouse-introduction\data-transformation-flow.png" alt-text="Diagram of how data flows and transforms in Microsoft Fabric." lightbox="media\tutorial-lakehouse-introduction\data-transformation-flow.png":::

**Data Source** - source data is in Parquet file format in an unpartitioned structure, stored in a folder for each table. In this tutorial, we set up a pipeline to copy/ingest the complete historical or onetime data to the lakehouse.

To demonstrate process and capabilities for subsequent incremental data load, we have an optional module at the end of this tutorial. In that module, we use a fact table (Sale) which has one parent folder with all the historical data for 11 months (one subfolder for each month) and another folder only for incremental data for three months (one subfolder for each month). During initial data ingestion, 11 months of data are ingested or written into the lakehouse table. However, when the incremental data arrives, it has updated data for Oct and Nov and new data for Dec, so Oct and Nov data are merged and new data for Dec is written into lakehouse table as depicted in the following figure.

:::image type="content" source="media\tutorial-lakehouse-introduction\incremental-data-load.png" alt-text="Diagram showing how changed data can be incrementally merged into initially ingested data in a lakehouse." lightbox="media\tutorial-lakehouse-introduction\incremental-data-load.png":::

**Lakehouse** - For this implementation and for simplicity’s sake, we'll create one lakehouse, ingest data into Files section of the lakehouse and then create delta lake tables in the Tables section of the lakehouse.

You can find an optional module at the end of this tutorial, which covers creating the lakehouse with medallion architecture (Bronze, Silver, and Gold) and talks about its recommended approach.

**Transform** - For data preparation and transformation, we demonstrate the use of Notebooks/Spark for code first users and demonstrate Pipelines/Dataflow for low-code/no-code users.

**Consume** - To demonstrate data consumption, you learn how you can use the DirectLake feature of Power BI to create reports/dashboards and directly query data from the lakehouse. Further, to demonstrate how you can make your data available to third party reporting tools, you can use TDS/SQL endpoint to connect to Warehouse and run SQL-based queries for analytics.

## Next steps

- [Lakehouse tutorial: Get started](tutorial-lakehouse-get-started.md)
