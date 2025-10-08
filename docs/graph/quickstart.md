---
title: Get Started with Graph in Microsoft Fabric
description: Learn how to get started with Graph in Microsoft Fabric, including key concepts, setup instructions, and first steps.
ms.topic: quickstart
ms.date: 10/07/2025
author: eric-urban
ms.author: eur
ms.reviewer: wawng
ms.service: fabric
ms.subservice: graph
ms.search.form: Getting started with Graph
---

# Quickstart Guide for Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this quickstart, you learn how to create a graph model in Microsoft Fabric.

## Prerequisites

To get started with graph in Microsoft Fabric, you need the following prerequisites:

- A lakehouse in OneLake with data that you want to analyze. This quickstart uses Adventure Works data as an example. Your data and results might differ. If you don't have a lakehouse, create one by following these steps: [Create a lakehouse with OneLake](../onelake/create-lakehouse-onelake.md).

    > [!IMPORTANT]
    > You can't use a lakehouse that has [lakehouse schema (preview) enabled](/fabric/data-engineering/lakehouse-schemas).

- You are a member of a workspace or have permission to create items in the workspace. For more information, see [Workspaces in Microsoft Fabric](/fabric/admin/portal-workspaces).

    > [!IMPORTANT]
    > Access management of the graph is restricted to the workspace where it's hosted. The graph isn't accessible to users outside of the workspace. Users within the workspace who have access to the underlying data in the lakehouse will be able to model and query the graph.


## Create a graph model

To create a graph model in Microsoft Fabric, follow these steps:

1. Go to your [Microsoft Fabric workspace](https://fabric.microsoft.com/).
1. Select **+ New item**.
1. Select **Analyze and train data** > **Graph model (preview)**.

    :::image type="content" source="./media/quickstart/new-item-graph-model.png" alt-text="Screenshot showing the new item menu with the option to select Graph model (preview)." lightbox="./media/quickstart/new-item-graph-model.png":::

    > [!TIP]
    > Alternatively, enter "graph" in the search box and press **Enter** to search for graph items.

1. Enter a name for your graph model and select **Create**.

## Create a graph

In graph view, you should see **Save**, **Add node**, and **Add edge**, and **Get data** buttons.

To create a graph in Microsoft Fabric, follow these steps:

1. In your graph model, select **Get data**.
1. From the OneLake catalog, select data from Fabric to use in your graph. 

   :::image type="content" source="./media/quickstart/graph-data-select.png" alt-text="Screenshot showing the data selection menu in OneLake." lightbox="./media/quickstart/graph-data-select.png":::

    > [!NOTE]
    > This quickstart uses Adventure Works data as an example. Your data set and results might differ.

1. Then select **Connect**.
1. Select data tables and then select **Load**.
1. You should see data available for use in your graph.

   :::image type="content" source="./media/quickstart/graph-data-view.png" alt-text="Screenshot showing the data view in the graph model." lightbox="./media/quickstart/graph-data-view.png":::


    > [!NOTE]
    > Graph in Microsoft Fabric currently supports the following date types:
    > - Boolean
    > - Integer
    > - Float
    > - String
    > - ZoneDateTime

## Start modeling

Now you can start modeling by adding nodes and edges to the graph. We use the Adventure Works data model as an example.

### Add nodes

In this section, we create nodes for each entity in the Adventure Works data model.

| Node label | Mapping table | Mapping column |
|------------------|--------------------|-----------------------|
| Customer | customers | CustomerID_K |
| Order | orders | SalesOrderDetailID_K |
| Employee | employees | EmployeeID_K |
| Product | products | ProductID_K |
| ProductCategory | productCategories | CategoryID_K |
| ProductSubcategory| productSubcategories| SubcategoryID_K |

To add the nodes to your graph, follow these steps:

1. In your graph model, select **Add node** to add a new node to your graph.
1. In the **Add node to graph** dialog, enter a **Label** name and select the appropriate **Mapping table** and **Mapping column**. 

    :::image type="content" source="./media/quickstart/node-add-customer.png" alt-text="Screenshot showing the add node to graph dialog." lightbox="./media/quickstart/node-add-customer.png":::

    In this example, the node label is "Customer", the mapping table is "customers", and the mapping column is "CustomerID_K".

1. Select **Confirm** to add the node to your graph.
1. Repeat the process for all other nodes. You should see all the nodes represented in your graph.

    :::image type="content" source="./media/quickstart/node-add-completed.png" alt-text="Screenshot showing all of the nodes added to the graph." lightbox="./media/quickstart/node-add-completed.png":::

### Add edges

In this section, we create edges to define the relationships between the nodes in the Adventure Works data model.

| Edge | Mapping table | Source node mapping column | Target node mapping column |
|-----|-------|------|----|
| sells | orders | Employee<br/><br/>EmployeeID_FK | Order<br/><br/>SalesOrderDetailID_K |
| purchases | orders | Customer<br/><br/>CustomerID_FK | Order<br/><br/>SalesOrderDetailID_K |
| contains | orders | Order<br/><br/>SalesOrderDetailID_K | Product<br/><br/>ProductID_FK |
| isOfType | products | Product<br/><br/>ProductID_K |ProductSubCategory<br/><br/>SubcategoryID_FK |
| belongsTo | productSubcategories | ProductSubCategory<br/><br/>SubcategoryID_K | ProductCategory<br/><br/>CategoryID_FK |

To add the edges to your graph, follow these steps:

1. Select **Add edge** to create a relationship between nodes.
1. In the **Add edge** dialog, select the mapping table, source and target nodes, and define the relationship. 

    :::image type="content" source="./media/quickstart/edge-add-sells.png" alt-text="Screenshot showing the add edge dialog." lightbox="./media/quickstart/edge-add-sells.png":::

    In this example, the edge is defined as "sells" with the mapping table "orders", connecting the source node "Employee" (EmployeeID_FK) to the target node "Order" (SalesOrderDetailID_K).

1. Select **Confirm** to add the edge to your graph.
1. Repeat the process for all other edges. You should see all the edges represented in your graph.

    :::image type="content" source="./media/quickstart/edge-add-completed.png" alt-text="Screenshot showing all of the edges added to the graph." lightbox="./media/quickstart/edge-add-completed.png":::

By this point, you created all the nodes and edges for your graph. This is the basic structure of your graph model.

## Query the graph

In the next sections, we query the graph by selecting specific nodes and relationships. All queries are based on the graph structure that [we built in the previous section.](#start-modeling)

Follow these steps to switch to query mode and start querying your graph:

1. Select **Modes** > **Query** from your graph's home page. From this view you can also create a read-only QuerySet, which has the same functionalities as below and allows you to share your query results.
1. Select **Add node** to see the available nodes for querying.
1. Select a node to add it to your query. In this example, we add the **Customer** node.

    :::image type="content" source="./media/quickstart/query-add-node-customer.png" alt-text="Screenshot showing the query mode selection." lightbox="./media/quickstart/query-add-node-customer.png":::

1. From here you can build your query by adding nodes and edges, applying filters, and selecting properties to return in the results.

## Related content

- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
