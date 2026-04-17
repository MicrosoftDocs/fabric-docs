---
title: "Tutorial: Introduction to graph in Microsoft Fabric"
description: Learn how to build a complete graph model in Microsoft Fabric, from loading data and creating a graph model to querying your data with GQL.
ms.topic: tutorial
ms.date: 03/24/2026
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Introduction to graph in Microsoft Fabric
ai-usage: ai-assisted
---

# Tutorial: Introduction to graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This tutorial walks you through an end-to-end graph scenario in Microsoft Fabric. You take sample data, model it as a graph, and query it for insights — building a working understanding of the graph experience along the way.

## Prerequisites

Before you start this tutorial, verify that:

1. You have access to a Microsoft Fabric capacity (F2 or higher) or a [Fabric trial](../fundamentals/fabric-trial.md).
1. [Graph is available in your region](overview.md#region-availability).
1. A Fabric administrator enabled Graph in your Fabric tenant. They enable this setting in the [admin portal](../admin/admin-center.md).

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
1. [Add multiple node and edge types from one table](tutorial-model-node-edge-from-same-table.md) to create a richer graph model.
1. [Query the graph with the query builder](tutorial-query-builder.md) using an interactive visual interface.
1. [Query the graph with GQL](tutorial-query-code-editor.md) using the code editor.
1. [Clean up tutorial resources](tutorial-clean-up.md) by deleting the workspace and other items.

For a detailed overview of how data flows through graph — from data sources through OneLake storage, graph modeling, querying, and results — see [graph architecture](how-graph-works.md).

## Sample data

For this tutorial's sample data, use the [Adventure Works sample dataset](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/graph). Adventure Works is a fictional bicycle manufacturer that sells bicycles and accessories to customers worldwide.

> [!NOTE]
> The Adventure Works dataset used in this tutorial is a custom-transformed version designed specifically for demonstrating graph capabilities. It differs from standard Adventure Works datasets and supports graph-specific features.

The Adventure Works dataset includes:

- **Customers** - People who purchase products.
- **Orders** - Sales transactions.
- **Employees** - Staff who process sales.
- **Products** - Items available for purchase.
- **Product categories and subcategories** - Product classification hierarchy.
- **Vendors** - Suppliers who produce products.

## Data model

The Adventure Works data model demonstrates a typical retail scenario with multiple entities and relationships. In this tutorial, you model the following relationships:

| Relationship | Description |
| ------------ | ----------- |
| `Employee sells Order` | Employees process customer orders |
| `Customer purchases Order` | Customers make purchases |
| `Order contains Product` | Orders include products |
| `Product isOfType ProductSubcategory` | Products belong to subcategories |
| `ProductSubcategory belongsTo ProductCategory` | Subcategories belong to categories |
| `Vendor produces Product` | Vendors supply products |

## Next step

> [!div class="nextstepaction"]
> [Load sample data](tutorial-load-data.md)
