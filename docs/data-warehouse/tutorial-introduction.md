---
title: Data warehouse tutorial - introduction
description: Learn about the purpose of the tutorial, the end-to-end scenario and architecture, the sample data, and the data model.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.date: 5/23/2023
---

# Data warehouse tutorial introduction

[[!INCLUDE [product-name](../includes/product-name.md)]](../get-started/microsoft-fabric-overview.md) provides a one-stop shop for all the analytical needs for every enterprise. It covers the complete spectrum of services including data movement, data lake, data engineering, data integration and data science, real time analytics, and business intelligence. With Fabric, there's no need to stitch together different services from multiple vendors. Instead, the customer enjoys an end-to-end, highly integrated, single comprehensive product that is easy to understand, onboard, create and operate. No other product on the market offers the breadth, depth, and level of integration that Fabric offers. Additionally, [Microsoft Purview](../governance/microsoft-purview-fabric.md) is included by default in every tenant to meet compliance and governance needs.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Purpose of this tutorial

While many concepts in Fabric may be familiar to data and analytics professionals, it can be challenging to apply those concepts in a new environment. This tutorial has been designed to walk step-by-step through an end-to-end scenario from data acquisition to data consumption to build a basic understanding of the Fabric UX, the various workloads and their integration points, and the Fabric professional and citizen developer experiences.

The tutorials aren't intended to be a reference architecture, an exhaustive list of features and functionality, or a recommendation of specific best practices.

## Data warehouse end-to-end scenario

As prerequisities to this tutorial, complete the following steps:

1. Sign into your Power BI online account, or if you don't have an account yet, sign up for a free trial.
1. [Enable Fabric](../admin/admin-fabric-switch.md) in your tenant.

In this tutorial, you take on the role of a data warehouse developer at the fictional Wide World Importers company and complete the following steps in the [!INCLUDE [product-name](../includes/product-name.md)] portal to build and implement an end-to-end data warehouse solution:

1. [Create a Fabric workspace](tutorial-create-workspace.md).
1. Quickly [create a data warehouse](tutorial-create-warehouse.md).
1. [Ingest data](tutorial-ingest-data.md) from source to the data warehouse dimensional model with a data pipeline.
1. [Build a report](tutorial-build-report.md) with the data you ingested into your warehouse.
1. [Create tables](tutorial-create-tables.md) in your warehouse.
1. [Load data with T-SQL](tutorial-load-data.md) with the SQL query editor.
1. [Transform the data](tutorial-transform-data.md) to create aggregated datasets using T-SQL.
1. Query the data warehouse using T-SQL and a [visual query editor](tutorial-visual-query.md).
1. [Create Power BI reports](tutorial-power-bi-report.md) using DirectLake mode to analyze the data in place.
1. [Clean up resources](tutorial-clean-up.md) by deleting the workspace and other items.

## Data warehouse end-to-end architecture

:::image type="content" source="media\tutorial-introduction\data-warehouse-architecture.png" alt-text="Diagram that shows the data warehouse end to end architecture." lightbox="media\tutorial-introduction\data-warehouse-architecture.png":::

**Data sources** - Fabric makes it easy and quick to connect to Azure Data Services, other cloud platforms, and on-premises data sources to ingest data from.

**Ingestion** - With 200+ native connectors as part of the Fabric pipeline and with drag and drop data transformation with dataflow, you can quickly build insights for your organization. Shortcut is a new feature in Fabric that provides a way to connect to existing data without having to copy or move it. You can find more details about the Shortcut feature later in this tutorial.

**Transform and store** - Fabric standardizes on Delta Lake format, which means all the engines of Fabric can read and work on the same dataset stored in OneLake - no need for data duplicity. This storage allows you to build a data warehouse or data mesh based on your organizational need. For transformation, you can choose either low-code or no-code experience with pipelines/dataflows or use T-SQL for a code first experience.

**Consume** - Data from the data warehouse can be consumed by Power BI, the industry leading business intelligence tool, for reporting and visualization. Each data warehouse comes with a built-in TDS/SQL endpoint for easily connecting to and querying data from other reporting tools, when needed. When a data warehouse is created, a secondary item, called a default dataset, is generated at the same time with the same name. You can use the default dataset to start visualizing data with just a couple of mouse clicks.

## Sample data

For sample data, we use the [Wide World Importers (WWI) sample database](/sql/samples/wide-world-importers-what-is?view=sql-server-ver16&preserve-view=true). For our data warehouse end-to-end scenario, we have generated sufficient data for a sneak peek into the scale and performance capabilities of the Fabric platform.

Wide World Importers (WWI) is a wholesale novelty goods importer and distributor operating from the San Francisco Bay area. As a wholesaler, WWI's customers are mostly companies who resell to individuals. WWI sells to retail customers across the United States including specialty stores, supermarkets, computing stores, tourist attraction shops, and some individuals. WWI also sells to other wholesalers via a network of agents who promote the products on WWI's behalf. To earn more about their company profile and operation, see [Wide World Importers sample databases for Microsoft SQL](/sql/samples/wide-world-importers-what-is?view=sql-server-ver16&preserve-view=true).

Typically, you would bring data from transactional systems (or line of business applications) into a data lake or data warehouse staging area. However, for this tutorial, we use the dimensional model provided by WWI as our initial data source. We use it as the source to ingest the data into a data warehouse and transform it through T-SQL.

## Data model

While the WWI dimensional model contains multiple fact tables, for this tutorial we focus on the Sale Fact table and its related dimensions only, as follows, to demonstrate this end-to-end data warehouse scenario:

:::image type="content" source="media\tutorial-introduction\data-warehouse-data-model.png" alt-text="Diagram that shows the data model you use in this tutorial, which includes the Sale Fact table and its related dimensions." lightbox="media\tutorial-introduction\data-warehouse-data-model.png":::

## Next steps

> [!div class="nextstepaction"]
> [Tutorial: Create a Microsoft Fabric workspace](tutorial-create-workspace.md)
