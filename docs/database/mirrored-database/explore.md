---
title: "Explore data in your mirrored database using Microsoft Fabric"
description: Learn how to explore data in your mirrored databases using Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, chweb, maprycem, cynotebo, anithaa
ms.date: 03/13/2024
ms.service: fabric
ms.topic: conceptual
---
# Explore data in your mirrored database using Microsoft Fabric

Learn more about all the methods to query the data in your mirrored database within Microsoft Fabric.

## Use the SQL analytics endpoint

Microsoft Fabric provides a read-only T-SQL serving layer for replicated delta tables. This SQL-based experience is called the SQL analytics endpoint. You can analyze data in delta tables using a no code visual query editor or T-SQL to create views, functions, stored procedures, and apply SQL security.

To access the SQL analytics endpoint, select the corresponding item in the workspace view or switch to the SQL analytics endpoint mode in the mirrored database explorer. For more information, see [What is SQL endpoint for a lakehouse?](../../data-engineering/lakehouse-sql-analytics-endpoint.md)

## Use Data view to preview data

The **Data preview** is one of the three switcher modes along with the Query editor and Model view within the SQL analytics endpoint that provides an easy interface to view the data within your tables or views to preview sample data (top 1,000 rows).

For more information, see [View data in the Data preview](../../data-warehouse/data-preview.md).

## Use Visual Queries to analyze data

The **Visual Query Editor** is a feature in **Microsoft Fabric** that provides a no-code experience to create T-SQL queries against data in your mirrored database item. You can drag and drop tables onto the canvas, design queries visually, and use Power Query diagram view.

For more information, see [Query using the visual query editor](../../data-warehouse/visual-query-editor.md).

## Use SQL Queries to analyze data

The **SQL Query Editor** is a feature in **Microsoft Fabric** that provides a query editor to create T-SQL queries against data in your mirrored database item. The SQL query editor provides support for IntelliSense, code completion, syntax highlighting, client-side parsing, and validation.

For more information, see [Query using the SQL query editor](../../data-warehouse/sql-query-editor.md).

## Use notebooks to explore your data with a Lakehouse shortcut

Notebooks are a powerful code item for you to develop Apache Spark jobs and machine learning experiments on your data. You can use notebooks in the Fabric Lakehouse to explore your mirrored tables. You can access your mirrored database from the Lakehouse with Spark queries in notebooks. You first need to create a shortcut from your mirrored tables into the Lakehouse, and then build notebooks with Spark queries in your Lakehouse.

For a step-by-step guide, see [Explore data in your mirrored database with notebooks](explore-onelake-shortcut.md).

For more information, see [Shortcut data in a lakehouse](../../data-engineering/lakehouse-shortcuts.md) and see [Explore data in lakehouse](../../data-engineering/lakehouse-notebook-explore.md).

## Access delta files directly

You can access mirrored database table data in Delta format files. Connect to the [OneLake](../../onelake/onelake-overview.md) directly through the [OneLake file explorer](../../onelake/onelake-file-explorer.md) or [Azure Storage Explorer](../../onelake/onelake-azure-storage-explorer.md).

For a step-by-step guide, see [Explore data in your mirrored database directly in OneLake](explore-data-directly.md).

## Model your data and add business semantics

In Microsoft Fabric, [Power BI datasets are a semantic model](../../data-warehouse/datasets.md) with metrics; a logical description of an analytical domain, with business friendly terminology and representation, to enable deeper analysis. This semantic model is typically a star schema with facts that represent a domain. Dimensions allow you to analyze the domain to drill down, filter, and calculate different analyses. With the semantic model, the dataset is created automatically for you, with inherited business logic from the parent mirrored database. Your downstream analytics experience for business intelligence and analysis starts with an item in Microsoft Fabric that is managed, optimized, and kept in sync with no user intervention.

The default Power BI dataset inherits all relationships between entities defined in the model view and infers them as Power BI dataset relationships, when objects are enabled for BI (Power BI Reports). Inheriting the mirrored database's business logic allows a warehouse developer or BI analyst to decrease the time to value toward building a useful semantic model and metrics layer for analytical business intelligence (BI) reports in Power BI, Excel, or external tools like Tableau, that read the XMLA format. For more information, see [Data modeling in the default Power BI dataset](../../data-warehouse/model-default-power-bi-dataset.md).

A well-defined data model is instrumental in driving your analytics and reporting experiences. In a SQL analytics endpoint in Microsoft Fabric, you can easily [build and change your data model](../../data-warehouse/data-modeling-defining-relationships.md) with a few simple steps in our visual editor. Modeling the mirrored database item is possible by setting primary and foreign key constraints and setting identity columns on the model view within the SQL analytics endpoint page in the Fabric portal. After you navigate the model view, you can do this in a visual entity relationship diagram. The diagram allows you to drag and drop tables to infer how the objects relate to one another. Lines visually connecting the entities infer the type of physical relationships that exist.

## Create a report

Create a report directly from the semantic model (default) in three different ways:

- SQL analytics endpoint editor in the ribbon
- Data hub in the navigation bar
- Semantic model (default) in the workspace

For more information, see [Create reports in the Power BI](../../data-warehouse/reports-power-bi-service.md).

## Related content

- [What is Mirroring in Fabric?](overview.md)
- [Model data in the default Power BI semantic model in Microsoft Fabric](../../data-warehouse/model-default-power-bi-dataset.md)
- [What is the SQL analytics endpoint for a Lakehouse?](../../data-engineering/lakehouse-sql-analytics-endpoint.md)
- [Direct Lake](/power-bi/enterprise/directlake-overview)
