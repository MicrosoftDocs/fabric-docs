---
title: "Tutorial: Add node types to your graph"
description: Learn how to add node types to your graph model in Microsoft Fabric by mapping source tables and configuring node properties.
ms.topic: tutorial
ms.date: 03/24/2026
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Add nodes to your graph
ai-usage: ai-assisted
---

# Tutorial: Add node types to your graph

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you add node types to your graph model. Nodes represent entities in your data, such as customers, products, or orders. Later, you connect these nodes with edges to define relationships between them.

## Adventure Works node mappings

In the Adventure Works data model, create a node type for each entity. The following table shows the node mappings. Use this information to add nodes to your graph:

| Node type label | Mapping table | ID of mapping column |
| --- | --- | --- |
| `Customer` | adventureworks_customers | `CustomerID_K` |
| `Employee` | adventureworks_employees | `EmployeeID_K` |
| `Order` | adventureworks_orders | `SalesOrderDetailID_K` |
| `ProductCategory` | adventureworks_productcategories | `CategoryID_K` |
| `Product` | adventureworks_products | `ProductID_K` |
| `ProductSubcategory` | adventureworks_productsubcategories | `SubcategoryID_K` |
| `VendorProduct` | adventureworks_vendorproduct | `ProductID_FK` |
| `Vendor` | adventureworks_vendors | `VendorID_K` |

## Add node types to the graph

To add node types to your graph, follow these steps:

1. In your graph model, select **Add node** to add a new node type to your graph.
1. In the **Add node to graph** dialog, enter a **Label** name and select the appropriate **Mapping table** and **ID** of the mapping column.

    :::image type="content" source="./media/quickstart/node-add-customer.png" alt-text="Screenshot showing the Add node to graph dialog." lightbox="./media/quickstart/node-add-customer.png":::

    For example, for the first node, use these values:
    - **Label**: `Customer`
    - **Mapping table**: *adventureworks_customers*
    - **ID** of the mapping column: `CustomerID_K`

   > [!TIP]
   > You can set compound keys (IDs consisting of multiple columns).

1. Select **Confirm** to add the node type to your graph.
1. Repeat the process for all remaining node types listed in the [Adventure Works node mappings](#adventure-works-node-mappings) table.

   > [!TIP]
   > When you double-click on a node type, you see its properties. Each property maps to a column in the source table. Delete properties that you don't need in queries or analysis, because too many properties make your graph harder to maintain and use.

1. You see all the node types represented in your graph. Select **Save** to save your progress.

    :::image type="content" source="./media/tutorial/node-add-completed.png" alt-text="Screenshot showing all of the nodes added to the graph." lightbox="./media/tutorial/node-add-completed.png":::

After you add nodes to your graph, add edges to define the relationships between these nodes.

> [!TIP]
> Besides creating node types from entire tables, any column or set of columns from any table can form a standalone node type if it represents an entity that you need on the graph. For example, you can create a `Country` node type from the `Country` column in the **adventureworks_employees** table, with `Country` as the ID. Delete properties that aren't required for the uniqueness of the `Country` nodes, such as employee name, employee ID, job title, gender, and other properties. You walk through this process in [Model a node and edge from the same table](tutorial-model-node-edge-from-same-table.md).

## Next step

> [!div class="nextstepaction"]
> [Add edges to your graph](tutorial-model-edges.md)
