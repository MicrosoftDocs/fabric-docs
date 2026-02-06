---
title: "Tutorial: Query the graph with the query builder"
description: Learn how to query your graph using the visual query builder in Microsoft Fabric.
ms.topic: tutorial
ms.date: 02/02/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Query the graph with the query builder
---

# Tutorial: Query the graph by using the query builder

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you query your graph by using the visual query builder. The query builder provides an interactive way to explore your graph by selecting nodes and relationships.

You can also query your graph by using GQL, the graph query language. The [next tutorial step](tutorial-query-code-editor.md) shows you how.

## Switch to query builder mode

Follow these steps to switch to query builder and start querying your graph interactively:

1. Select **Modes** > **Query** from your graph's home page.

    > [!TIP]
    > From this view, you can also create a read-only queryset. This queryset has the same functionalities and it allows you to share your query results.

## Build a query

Build a query to answer the question: "What products did a specific customer purchase?" This query traverses the graph from Customer through Order to Product. For example, to query customer Carla Adams' purchases, follow these steps:

1. Select **Add a node** to see the available nodes for querying.

    :::image type="content" source="./media/tutorial/select-add-node.png" alt-text="Screenshot showing result of selecting 'Add a node'." lightbox="./media/tutorial/select-add-node.png":::

1. Select the **Customer** node to add it to your query.

    :::image type="content" source="./media/tutorial/query-select-customer-node.png" alt-text="Screenshot showing result of selecting the Customer node." lightbox="./media/tutorial/query-select-customer-node.png":::

1. Select the **purchases** edge while the Customer node is selected. The query builder automatically adds the connected **Order** node.
1. Select the **contains** edge while the **Order** node is selected. The query builder automatically adds the connected **Product** node.
1. You now have a query pattern: Customer → purchases → Order → contains → Product.

    :::image type="content" source="./media/tutorial/query-nodes-and-edges-selected.png" alt-text="Screenshot showing the query pattern with selected nodes and edges." lightbox="./media/tutorial/query-nodes-and-edges-selected.png":::

1. Apply a filter to the Customer node to focus on a specific customer. For this tutorial, select the Customer node, then select **Add filter**.

1. In the **Filter** popup, configure the filter as shown in the following diagram:

    :::image type="content" source="./media/tutorial/query-add-filter.png" alt-text="Screenshot showing completed Add filter popup on the Customer node." lightbox="./media/tutorial/query-add-filter.png":::

1. Select **Apply** to add the filter to the Customer node.

The query is now set up to find all products purchased by Carla Adams.

## Run the query

1. Select **Run query** to run the query and see the results. The query might take a few moments to complete.

1. When the query finishes, collapse the query builder pane to get a better view of the results.

    :::image type="content" source="./media/tutorial/query-results.png" alt-text="Screenshot of the visualized query results." lightbox="./media/tutorial/query-results.png":::

## Explore your data

The query builder helps you visually explore your graph:

- **Expand nodes**: Hover over a node to see its connected nodes and relationships.
- **View node properties**: Select a node to view its properties.
- **Interact with nodes**: Drag nodes to reposition them or select to highlight connections.
- **Filter results**: Apply filters to focus on specific data.
- **Select properties**: Choose which node and edge properties to include in your results.

You can view your query results in different ways:

- **Diagram view**: Visualize the graph structure and relationships. This view is the default.
- **Card view**: View detailed information about each node in a card format.
- **Table view**: See the results in a tabular format for easier analysis.

:::image type="content" source="./media/tutorial/query-view-modes.png" alt-text="Screenshot showing the different view modes: Diagram, Card, and Table." lightbox="./media/tutorial/query-view-modes.png":::

## Save the query

You can save your query by creating a queryset in your workspace. There are several ways to create a queryset in Fabric. This tutorial uses the interface in **Query** mode.

To create a queryset, follow these steps:

1. In **Query** mode, select **Create queryset**.

   :::image type="content" source="./media/tutorial/query-create-queryset.png" alt-text="Screenshot showing the Create queryset option." lightbox="./media/tutorial/query-create-queryset.png":::

1. In the **New graph queryset** dialog, enter a name for your queryset (for example, "GraphQuerySet_1") and set **Location** to your workspace. Then select **Create**.

   :::image type="content" source="./media/tutorial/query-create-queryset-dialog.png" alt-text="Screenshot showing the New graph queryset dialog." lightbox="./media/tutorial/query-create-queryset-dialog.png":::

1. A new queryset item is created in your workspace, and the current query is saved in it. Select the triple ellipsis (...) next to the queryset name and select **Rename** to give it a meaningful name, such as "CarlaAdams_Purchases".

   :::image type="content" source="./media/tutorial/queryset-item-created.png" alt-text="Screenshot showing the created queryset item in the workspace." lightbox="./media/tutorial/queryset-item-created.png":::

Querysets let you:

- Rerun queries without recreating them
- Share queries with teammates who have workspace access
- Organize related queries together

## Next step

> [!div class="nextstepaction"]
> [Query the graph with GQL](tutorial-query-code-editor.md)
