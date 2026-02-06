---
title: "Data Warehouse Tutorial: Introduction"
description: "Learn about the purpose of the tutorial, the end-to-end scenario and architecture, the sample data, and the data model."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 08/22/2025
ms.topic: tutorial
---

# Tutorial: Introduction

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This tutorial is a step-by-step walkthrough of an end-to-end data warehousing scenario, from data acquisition to data consumption. Complete this tutorial to build a basic understanding of the [!INCLUDE [product-name](../includes/product-name.md)] user experience, the various experiences and their integration points, and the [!INCLUDE [product-name](../includes/product-name.md)] professional and citizen developer experiences.

While many concepts in [!INCLUDE [product-name](../includes/product-name.md)] might be familiar to data and analytics professionals, it can be challenging to apply those concepts in a new environment. The tutorials aren't intended to be a reference architecture, an exhaustive list of features and functionality, or a recommendation of specific best practices.

## Data warehouse end-to-end scenario

Before you start this tutorial, follow these steps:

1. Sign in to your Power BI online account, or if you don't have an account, sign up for a free trial.
1. [Enable [!INCLUDE [product-name](../includes/product-name.md)]](../admin/fabric-switch.md) in your tenant.

In this tutorial, you take on the role of a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] developer at the fictional *Wide World Importers* company. You'll implement an end-to-end data warehouse solution:

1. [Create a workspace](tutorial-create-workspace.md).
1. [Create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)]](tutorial-create-warehouse.md).
1. [Ingest data](tutorial-ingest-data.md) from the source to the data warehouse dimensional model with a pipeline.
1. [Clone a table with T-SQL](tutorial-clone-table.md) with the SQL query editor.
1. [Transform data with a stored procedure](tutorial-transform-data.md) to create aggregated datasets.
1. [Time travel with T-SQL](tutorial-time-travel.md) to see data as it appeared at a point in time.
1. [Create a query with the visual query editor](tutorial-visual-query.md) to retrieve results from the data warehouse.
1. [Analyze data in a notebook](tutorial-analyze-data-notebook.md).
1. [Create and execute a cross-warehouse query](tutorial-sql-cross-warehouse-query-editor.md) with SQL query editor.
1. [Create a DirectLake semantic model and Power BI report](tutorial-power-bi-report.md) to analyze the data in place.
1. [Generate a report](tutorial-build-report-onelake-data-hub.md) from the OneLake catalog.
1. [Clean up tutorial resources](tutorial-clean-up.md) by deleting the workspace and other items.

## Data warehouse end-to-end architecture

:::image type="content" source="media/tutorial-introduction/data-warehouse-architecture.png" alt-text="Diagram that shows the data warehouse end to end architecture.":::

**Data sources** - [!INCLUDE [product-name](../includes/product-name.md)] makes it easy and quick to connect to Azure Data Services, other cloud platforms, and on-premises data sources.

**Ingestion** - With 200+ native connectors as part of the [!INCLUDE [product-name](../includes/product-name.md)] pipeline and with drag and drop data transformation with dataflow, you can quickly build insights for your organization. Shortcut is a new feature in [!INCLUDE [product-name](../includes/product-name.md)] that provides a way to connect to existing data without having to copy or move it. You can find more details about the Shortcut feature later in this tutorial.

**Transform and store** - [!INCLUDE [product-name](../includes/product-name.md)] standardizes on Delta Lake format, which means all the engines of [!INCLUDE [product-name](../includes/product-name.md)] can read and work on the same data stored in OneLake - no need for data duplicity. This storage allows you to build a data warehouse or data mesh based on your organizational need. For transformation, you can choose either low-code or no-code experience with pipelines/dataflows or use T-SQL for a code first experience.

**Consume** - Use Power BI, the industry-leading business intelligence tool, to report and visualize data from the warehouse. Each warehouse has a built-in TDS endpoint for connecting to and querying data from other reporting tools when needed. In this tutorial, you create a semantic model on your sample warehouse to start visualizing data in a star schema in just a few steps.

## Sample data

For sample data, we use the [Wide World Importers (WWI) sample database](/sql/samples/wide-world-importers-what-is?view=sql-server-ver16&preserve-view=true). For our data warehouse end-to-end scenario, we have generated sufficient data for a sneak peek into the scale and performance capabilities of the [!INCLUDE [product-name](../includes/product-name.md)] platform.

Wide World Importers (WWI) is a wholesale novelty goods importer and distributor based in the San Francisco Bay area. WWI's customers are mostly companies that resell to individuals. WWI also sells to retail customers across the United States, like specialty stores, supermarkets, computing stores, tourist attraction shops, and some individuals. WWI sells to other wholesalers through a network of agents who promote the products for WWI. To learn more about the company profile and operations, see [Wide World Importers sample databases for Microsoft SQL](/sql/samples/wide-world-importers-what-is?view=sql-server-ver16&preserve-view=true).

Typically, you would bring data from transactional systems (or line of business applications) into a data lake or data warehouse staging area. However, for this tutorial, we use the dimensional model provided by WWI as our initial data source. We use it as the source to ingest the data into a data warehouse and transform it through T-SQL.

## Data model

The WWI dimensional model has multiple [fact tables](dimensional-modeling-fact-tables.md) in [a star schema](dimensional-modeling-overview.md). In this tutorial, you focus on the `fact_sale` table and its related [dimensions](dimensional-modeling-dimension-tables.md) to demonstrate an end-to-end data warehouse scenario:

:::image type="content" source="media/tutorial-introduction/data-warehouse-data-model.png" alt-text="Diagram that shows the data model you use in this tutorial, which includes the fact_sale table and its related dimensions." lightbox="media/tutorial-introduction/data-warehouse-data-model.png":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create a workspace](tutorial-create-workspace.md)
