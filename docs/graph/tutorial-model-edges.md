---
title: "Tutorial: Add edge types to your graph"
description: Learn how to add edges to define relationships between nodes in your graph model.
ms.topic: tutorial
ms.date: 02/02/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Add edges to your graph
---

# Tutorial: Add edge types to your graph

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you add edge types to your graph model. Edges define the relationships between nodes, such as "Customer purchases Order" or "Employee sells Order."

## Adventure Works edge mappings

In the Adventure Works data model, create edges to define the relationships between the nodes. The following table shows the edge mappings to use:

| Edge type label | Mapping table                       | Source node type/ Associated mapping column | Target node type/ Associated mapping column |
| --------------- | ----------------------------------- | ------------------------------------------- | ------------------------------------------- |
| sells           | adventureworks_orders               | Employee / EmployeeID_FK                    | Order / SalesOrderDetailID_K                |
| purchases       | adventureworks_orders               | Customer / CustomerID_FK                    | Order / SalesOrderDetailID_K                |
| contains        | adventureworks_orders               | Order / SalesOrderDetailID_K                | Product / ProductID_FK                      |
| isOfType        | adventureworks_products             | Product / ProductID_K                       | ProductSubCategory / SubcategoryID_FK       |
| belongsTo       | adventureworks_productsubcategories | ProductSubCategory / SubcategoryID_K        | ProductCategory / CategoryID_FK             |
| produces        | adventureworks_vendorproduct        | Vendor / VendorID_FK                        | Product / ProductID_FK                      |

## Add edge types to the graph

To add edges to your graph, follow these steps:

1. Select **Add edge** to create a relationship between nodes.
1. In the **Add edge** dialog, configure the edge:
   - Enter the edge **Label** to describe the relationship.
   - Select the **Mapping table**.
   - Select the **Source node** and its associated mapping column.
   - Select the **Target node** and its associated mapping column.

    :::image type="content" source="./media/quickstart/edge-add-sells.png" alt-text="Screenshot showing the add edge dialog." lightbox="./media/quickstart/edge-add-sells.png":::

    For the first edge, use these values taken from the table:
    - **Label**: sells
    - **Mapping table**: adventureworks_orders
    - **Source node**: Employee
    - **Mapping table column to be linked to source node key**: EmployeeID_FK
    - **Target node**: Order
    - **Mapping table column to be linked to target node key**: SalesOrderDetailID_K

   > [!IMPORTANT]
   > If you configured node types with compound keys (IDs consisting of multiple columns), you also need to select the corresponding compound key columns here.

1. Select **Confirm** to add the edge to your graph.
1. Repeat the process for all other edges in the Adventure Works data model, using the table as a reference.

You should see all the edge types represented in your graph.

:::image type="content" source="./media/tutorial/edge-add-completed.png" alt-text="Screenshot showing all of the edges added to the graph." lightbox="./media/tutorial/edge-add-completed.png":::

## Load the graph

After adding all node types and edge types, load the graph:

1. Select **Save** to verify the graph model, load data from OneLake, construct the graph, and make it ready for querying. Be patient, as this process might take some time depending on the size of your data.

> [!IMPORTANT]
> Currently, you need to reload the graph (by selecting **Save**) whenever you change the model or the underlying data.

At this point, you defined all the node types and edge types for your graph. These node types and edge types form the schema of your graph model. Your graph is ready for querying once data is ingested to form the nodes and edges.

## Next step

> [!div class="nextstepaction"]
> [Query the graph with the query builder](tutorial-query-builder.md)
