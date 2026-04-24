---
title: "Tutorial: Add edge types to your graph"
description: Learn how to add edge types to define relationships between nodes in your graph in Microsoft Fabric model, including configuring source and destination nodes.
ms.topic: tutorial
ms.date: 04/14/2026
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Add edges to your graph
ai-usage: ai-assisted
---

# Tutorial: Add edge types to your graph

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you add edge types to your graph model. Edges define the relationships between nodes, such as "`Customer` purchases `Order`" or "`Employee` sells `Order`."

> [!IMPORTANT]
> When you define an edge type, use a mapping table that contains two columns such that:
>
> - One column matches the **source node's key** in terms of values and data type.
> - Another column matches the **target node's key** in terms of values and data type.
>
> Tables that you use to create node types can also serve as edge mapping tables if they meet this requirement.

## Adventure Works edge mappings

In the Adventure Works data model, create edges to define the relationships between the nodes. These edges capture key business relationships – such as which employees sold which orders, which customers made purchases, and which vendors supply which products. When you add the edges, you can query across these relationships to answer questions like "What products did a specific customer buy?" or "Which vendors supply touring bikes?"

The following table shows the edge mappings to use:

| Edge type label | Mapping table                       | Source node type/ Associated mapping column | Target node type/ Associated mapping column |
| --------------- | ----------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `sells`         | adventureworks_orders               | `Employee` / `EmployeeID_FK`                | `Order` / `SalesOrderDetailID_K`            |
| `purchases`     | adventureworks_orders               | `Customer` / `CustomerID_FK`                | `Order` / `SalesOrderDetailID_K`            |
| `contains`      | adventureworks_orders               | `Order` / `SalesOrderDetailID_K`            | `Product` / `ProductID_FK`                  |
| `isOfType`      | adventureworks_products             | `Product` / `ProductID_K`                   | `ProductSubcategory` / `SubcategoryID_FK`   |
| `belongsTo`     | adventureworks_productsubcategories | `ProductSubcategory` / `SubcategoryID_K`    | `ProductCategory` / `CategoryID_FK`         |
| `produces`      | adventureworks_vendorproduct        | `Vendor` / `VendorID_FK`                    | `Product` / `ProductID_FK`                  |

## Add edge types to the graph

To add edges to your graph, follow these steps:

1. Select **Add edge** to create a relationship between nodes.
1. In **Add edge**, configure the edge by referencing the [Adventure Works edge mappings](#adventure-works-edge-mappings) table for the appropriate values:
   - Enter the edge **Label** to describe the relationship.
   - Select the **Mapping table**.
   - Select the **Source node** and its associated mapping column.
   - Select the **Target node** and its associated mapping column.

    :::image type="content" source="./media/quickstart/edge-add-sells.png" alt-text="Screenshot showing the add edge dialog." lightbox="./media/quickstart/edge-add-sells.png":::

    For example, for the first edge, use these values:
    - **Label**: `sells`
    - **Mapping table**: adventureworks_orders
    - **Source node**: `Employee`
    - **Mapping table column to be linked to source node key**: `EmployeeID_FK`
    - **Target node**: `Order`
    - **Mapping table column to be linked to target node key**: `SalesOrderDetailID_K`

   > [!IMPORTANT]
   > If you configured node types with compound keys (IDs consisting of multiple columns), you also need to select the corresponding compound key columns here.

1. Select **Confirm** to add the edge to your graph.
1. Repeat the process for all remaining edge types listed in the [Adventure Works edge mappings](#adventure-works-edge-mappings) table.

> [!TIP]
> Unlike node types, edge types don't get properties automatically. You can add properties when the data describes the relationship itself - for example, quantity or price on a `contains` edge. Edge properties are most useful when you write GQL queries that filter, aggregate, or return relationship-level data. For this tutorial, you don't need to add edge properties. For guidance, see [Add properties to edge types](design-graph-schema.md#add-properties-to-edge-types).

You should see all the edge types represented in your graph.

:::image type="content" source="./media/tutorial/edge-add-completed.png" alt-text="Screenshot showing all of the edges added to the graph." lightbox="./media/tutorial/edge-add-completed.png":::

## Load the graph

After adding all node types and edge types, load the graph:

- Select **Save** to verify the graph model, load data from OneLake, construct the graph, and make it ready for querying. Be patient, as this process might take some time depending on the size of your data. When the graph loads successfully, you see all node and edge labels in the graph view canvas.

> [!IMPORTANT]
> Currently, you need to reload the graph (by selecting **Save**) whenever you change the model or the underlying data.

At this point, you defined all the node types and edge types for your graph. These node types and edge types form the schema of your graph model. Your graph is ready for querying once you ingest data to form the nodes and edges.

## Next step

> [!div class="nextstepaction"]
> [Create multiple node and edge types from one mapping table](tutorial-model-node-edge-from-same-table.md)
