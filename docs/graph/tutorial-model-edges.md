---
title: "Tutorial: Add edge types to your graph"
description: Learn how to add edge types to define relationships between nodes in your graph in Microsoft Fabric model, including configuring origin and target nodes.
ms.topic: tutorial
ms.date: 06/24/2026
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Add edges to your graph
ai-usage: ai-assisted
---

# Tutorial: Add edge types to your graph

In this tutorial step, you add edge types to your graph model. Edges define the relationships between nodes, such as `Customer purchases Order` or `Employee sells Order`.

> [!IMPORTANT]
> For canonical edge-mapping requirements, including origin and target key compatibility and data type alignment, see [Choose edge types](design-graph-schema.md#choose-edge-types).

## Adventure Works edge mappings

In the Adventure Works data model, create edges to define the relationships between the nodes. These edges capture key business relationships – such as which employees sold which orders, which customers made purchases, and which vendors supply which products. When you add the edges, you can query across these relationships to answer questions like "What products did a specific customer buy?" or "Which vendors supply touring bikes?"

The following table shows the edge mappings to use in your graph:

| Edge label | Source table  | Origin node / Origin key | Target node / Target key |
| --- | --- | --- | --- |
| `sells`  | adventureworks_orders | `Employee` / `EmployeeID_FK`  | `Order` / `SalesOrderDetailID_K`   |
| `purchases` | adventureworks_orders | `Customer` / `CustomerID_FK`  | `Order` / `SalesOrderDetailID_K`  |
| `contains`  | adventureworks_orders | `Order` / `SalesOrderDetailID_K`  | `Product` / `ProductID_FK`    |
| `isOfType`  | adventureworks_products   | `Product` / `ProductID_K`  | `ProductSubcategory` / `SubcategoryID_FK`   |
| `belongsTo`  | adventureworks_productsubcategories | `ProductSubcategory` / `SubcategoryID_K`  | `ProductCategory` / `CategoryID_FK`  |
| `produces` | adventureworks_vendorproduct | `Vendor` / `VendorID_FK` | `Product` / `ProductID_FK`  |

## Add edge types to the graph

To add edges to your graph, follow these steps:

1. In the top ribbon, select **Add edge** to create a relationship between nodes.
1. In **Create an edge**, configure the edge by referencing the [Adventure Works edge mappings](#adventure-works-edge-mappings) table for the appropriate values:
   - Enter the **Edge label** to describe the relationship.
   - Select the **Source table**.
   - Select the **Origin node** and its associated **Origin key** column.
   - Select the **Target node** and its associated **Target key** column.

    :::image type="content" source="./media/tutorial/edge-add-sells.png" alt-text="Screenshot showing the add edge dialog." lightbox="./media/tutorial/edge-add-sells.png":::

    For example, for the first edge, use these values:
    - **Edge label**: `sells`
    - **Source table**: adventureworks_orders
    - **Origin node**: `Employee`
    - **Origin key**: `EmployeeID_FK`
    - **Target node**: `Order`
    - **Target key**: `SalesOrderDetailID_K`

   > [!IMPORTANT]
   > If you configured node types with compound keys (IDs consisting of multiple columns), you also need to select the corresponding compound key columns here.

1. Select **Create** to add the edge to your graph.
1. Repeat the steps in this section for all remaining edge types listed in the [Adventure Works edge mappings](#adventure-works-edge-mappings) table.

> [!TIP]
> Properties are not added to nodes or edge types automatically. You can add properties when the data describes the relationship itself—for example, quantity or price on a `contains` edge. Edge properties are most useful when you write GQL queries that filter, aggregate, or return relationship-level data. For this tutorial, you don't need to add edge properties. For more information, see [Add properties to edge types](design-graph-schema.md#add-properties-to-edge-types).

You see all six edge types represented in your graph.

:::image type="content" source="./media/tutorial/edge-add-completed.png" alt-text="Screenshot showing all of the edges added to the graph." lightbox="./media/tutorial/edge-add-completed.png":::

## Load the graph

After adding all node types and edge types, select **Save** in the top ribbon to load the graph. This operation verifies the graph model, loads data from OneLake, constructs the graph, and makes it ready for querying. This process might take some time, depending on the size of your data. When the graph loads successfully, you see a banner indicating *Data load completed*.

:::image type="content" source="./media/tutorial/data-load-completed.png" alt-text="Screenshot showing the data load completed banner." lightbox="./media/tutorial/data-load-completed.png":::

> [!IMPORTANT]
> Currently, you need to reload the graph (by selecting **Save**) anytime you change the model or the underlying data.

Now you have all the node types and edge types defined for your graph. These node types and edge types form the schema of your graph model. Your graph is ready for querying once you ingest data to form the nodes and edges.

## Next step

> [!div class="nextstepaction"]
> [Create multiple node and edge types from one source table](tutorial-model-node-edge-from-same-table.md)
