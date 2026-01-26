---
title: "Explore Data in Your Mirrored Database Using Microsoft Fabric"
description: Learn how to explore data in your mirrored databases using Microsoft Fabric.
author: whhender
ms.author: whhender
ms.reviewer: imotiwala, chweb, maprycem, cynotebo, anithaa
ms.date: 11/19/2024
ms.topic: concept-article
---
# Explore data in your mirrored database using Microsoft Fabric

Learn more about all the methods to query the data in your mirrored database within Microsoft Fabric.

## Use the SQL analytics endpoint

Microsoft Fabric provides a read-only T-SQL serving layer for replicated delta tables. This SQL-based experience is called the SQL analytics endpoint. You can analyze data in delta tables using a no code visual query editor or T-SQL to create views, functions, stored procedures, and apply SQL security.

To access the SQL analytics endpoint, select the corresponding item in the workspace view or switch to the SQL analytics endpoint mode in the mirrored database explorer. For more information, see [What is the SQL analytics endpoint for a lakehouse?](../data-engineering/lakehouse-sql-analytics-endpoint.md)

## Use Data view to preview data

The **Data preview** is one of the three switcher modes along with the Query editor and Model view within the SQL analytics endpoint that provides an easy interface to view the data within your tables or views to preview sample data (top 1,000 rows).

For more information, see [View data in the Data preview in Microsoft Fabric](../data-warehouse/data-preview.md).

## Use Visual Queries to analyze data

The **Visual Query Editor** is a feature in **Microsoft Fabric** that provides a no-code experience to create T-SQL queries against data in your mirrored database item. You can drag and drop tables onto the canvas, design queries visually, and use Power Query diagram view.

For more information, see [Query using the visual query editor](../data-warehouse/visual-query-editor.md).

## Use SQL Queries to analyze data

The **SQL Query Editor** is a feature in **Microsoft Fabric** that provides a query editor to create T-SQL queries against data in your mirrored database item. The SQL query editor provides support for IntelliSense, code completion, syntax highlighting, client-side parsing, and validation.

For more information, see [Query using the SQL query editor](../data-warehouse/sql-query-editor.md).

## Use notebooks to explore your data with a Lakehouse shortcut

Notebooks are a powerful code item for you to develop Apache Spark jobs and machine learning experiments on your data. You can use notebooks in the Fabric Lakehouse to explore your mirrored tables. You can access your mirrored database from the Lakehouse with Spark queries in notebooks. You first need to create a shortcut from your mirrored tables into the Lakehouse, and then build notebooks with Spark queries in your Lakehouse.

For a step-by-step guide, see [Explore data in your mirrored database with notebooks](../mirroring/explore-onelake-shortcut.md).

For more information, see [Create shortcuts in lakehouse](../data-engineering/lakehouse-shortcuts.md) and see [Explore the data in your lakehouse with a notebook](../data-engineering/lakehouse-notebook-explore.md).

## Access delta files directly

You can access mirrored database table data in Delta format files. Connect to the [OneLake](../onelake/onelake-overview.md) directly through the [OneLake file explorer](../onelake/onelake-file-explorer.md) or [Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md).

For a step-by-step guide, see [Explore data in your mirrored database directly in OneLake](../mirroring/explore-data-directly.md).

## Model your data and add business semantics

In Microsoft Fabric, [Power BI semantic models](../data-warehouse/semantic-models.md) (formerly known as Power BI data sets) are a logical description of an analytical domain, with business friendly terminology and representation, to enable deeper analysis. 

A semantic model is typically a star schema with facts that represent a domain. Dimensions allow you to analyze the domain to drill down, filter, and calculate different analyses.

A well-defined data model is instrumental in driving your analytics and reporting workloads. Modeling the mirrored database item is possible by first [creating a semantic model](../data-warehouse/create-semantic-model.md), and setting relationships in the model view. After you navigate the model view, you can do this in a visual entity relationship diagram. The diagram allows you to drag and drop tables to infer how the objects relate to one another. Lines visually connecting the entities infer the type of logical relationships that exist.

## Create a report

Create a report directly from the semantic model in three different ways:

- SQL analytics endpoint editor in the ribbon
- **Data** pane in the navigation bar
- Semantic model in the workspace

For more information, see [Create reports in the Power BI service in Microsoft Fabric and Power BI Desktop](../data-warehouse/reports-power-bi-service.md).

## Related content

- [What is Mirroring in Fabric?](../mirroring/overview.md)
- [What is the SQL analytics endpoint for a lakehouse?](../data-engineering/lakehouse-sql-analytics-endpoint.md)
- [Direct Lake overview](../fundamentals/direct-lake-overview.md)
