---
title: "Tutorial: Introduction to Graph in Microsoft Fabric"
description: Learn how to build a complete graph model in Microsoft Fabric, from creating a graph model to querying your data.
ms.topic: tutorial
ms.date: 02/02/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Introduction to Graph in Microsoft Fabric
---

# Tutorial: Introduction to Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This tutorial is a step-by-step walkthrough of an end-to-end graph scenario in Microsoft Fabric. It covers everything from creating your graph model to querying your data and analyzing insights. Complete this tutorial to build a basic understanding of the Microsoft Fabric graph experience and its capabilities.

## Prerequisites

Before you start this tutorial, verify that:

1. [Graph is available in your region](overview.md#region-availability).
1. Graph is enabled in your Fabric tenant.

   :::image type="content" source="./media/quickstart/tenant-enable-graph.png" alt-text="Enable graph in your Fabric tenant." lightbox="./media/quickstart/tenant-enable-graph.png":::

1. You're a member of a Fabric workspace or have permission to create items in the workspace. For more information, see [Workspaces in Microsoft Fabric](../admin/portal-workspaces.md).

    > [!IMPORTANT]
    > Access management of the graph is restricted to the workspace that hosts it. Users outside of the workspace can't access the graph. Users within the workspace who have access to the underlying data in the lakehouse can model and query the graph.

## Graph end-to-end scenario

In this tutorial, you take on the role of a data analyst at the fictional Adventure Works company. You build a graph model to represent the relationships between customers, orders, employees, products, and vendors. Then, you query the graph to uncover insights about customer purchasing behavior and product performance. Follow these steps:

1. [Load sample data](tutorial-load-data.md) into a lakehouse.
1. [Create a graph](tutorial-create-graph.md) by creating a graph model and loading data from OneLake.
1. [Add nodes to your graph](tutorial-model-nodes.md) for each entity in the data model.
1. [Add edges to your graph](tutorial-model-edges.md) to define relationships between nodes.
1. [Query the graph with the query builder](tutorial-query-builder.md) using an interactive visual interface.
1. [Query the graph with GQL](tutorial-query-code-editor.md) using the code editor.
1. [Clean up tutorial resources](tutorial-clean-up.md) by deleting the workspace and other items.

## Graph end-to-end architecture

- **Data sources** - Microsoft Fabric makes it quick and easy to connect to Azure Data Services, other cloud platforms, and on-premises data sources.

- **Storage** - Microsoft Fabric standardizes on Delta Lake format stored in OneLake. Graph in Microsoft Fabric reads data directly from your lakehouse tables to construct the graph model.

- **Graph modeling** - Create nodes and edges that represent entities and relationships in your data. The graph model provides a flexible way to explore connected data.

- **Query and analyze** - Use the visual query builder for interactive exploration or write GQL (Graph Query Language) queries for more complex analysis.

## Sample data

For this tutorial's sample data, use the [Adventure Works sample dataset](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/graph). Adventure Works is a fictional bicycle manufacturer that sells bicycles and accessories to customers worldwide.

> [!NOTE]
> The Adventure Works dataset used in this tutorial is a custom-transformed version designed specifically for demonstrating Graph capabilities. It differs from standard Adventure Works datasets and supports graph-specific features.

The Adventure Works dataset includes:

- **Customers** - People who purchase products
- **Orders** - Sales transactions
- **Employees** - Staff who process sales
- **Products** - Items available for purchase
- **Product categories and subcategories** - Product classification hierarchy
- **Vendors** - Suppliers who produce products

## Data model

The Adventure Works data model demonstrates a typical retail scenario with multiple entities and relationships. In this tutorial, you model the following relationships:

| Relationship | Description |
| ------------ | ----------- |
| Employee **sells** Order | Employees process customer orders |
| Customer **purchases** Order | Customers make purchases |
| Order **contains** Product | Orders include products |
| Product **isOfType** ProductSubcategory | Products belong to subcategories |
| ProductSubcategory **belongsTo** ProductCategory | Subcategories belong to categories |
| Vendor **produces** Product | Vendors supply products |

## Next step

> [!div class="nextstepaction"]
> [Load sample data](tutorial-load-data.md)
