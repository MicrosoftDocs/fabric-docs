---
title: "Tutorial: Add node types to your graph"
description: Learn how to add nodes to your graph model in Microsoft Fabric.
ms.topic: tutorial
ms.date: 02/02/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Add nodes to your graph
---

# Tutorial: Add node types to your graph

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you add node types to your graph model. Nodes represent entities in your data, such as customers, products, or orders. Later, you connect these nodes with edges to define relationships between them.

## Adventure Works node mappings

In the Adventure Works data model, create a node type for each entity. The following table shows the node mappings. Use this information to add nodes to your graph:

| Node type label    | Mapping table                       | ID of mapping column |
| ------------------ | ----------------------------------- | -------------------- |
| Customer           | adventureworks_customers            | CustomerID_K         |
| Employee           | adventureworks_employees            | EmployeeID_K         |
| Order              | adventureworks_orders               | SalesOrderDetailID_K |
| ProductCategory    | adventureworks_productcategories    | CategoryID_K         |
| Product            | adventureworks_products             | ProductID_K          |
| ProductSubcategory | adventureworks_productsubcategories | SubcategoryID_K      |
| VendorProduct      | adventureworks_vendorproduct        | ProductID_FK         |
| Vendor             | adventureworks_vendors              | VendorID_K           |

## Add node types to the graph

To add node types to your graph, follow these steps:

1. In your graph model, select **Add node** to add a new node type to your graph.
1. In the **Add node to graph** dialog, enter a **Label** name and select the appropriate **Mapping table** and **ID** of the mapping column.

    :::image type="content" source="./media/quickstart/node-add-customer.png" alt-text="Screenshot showing the Add node to graph dialog." lightbox="./media/quickstart/node-add-customer.png":::

    For example, for the first node, use these values:
    - **Label**: Customer
    - **Mapping table**: *adventureworks_customers*
    - **ID** of the mapping column: CustomerID_K

   > [!TIP]
   > You can set compound keys (IDs consisting of multiple columns).

1. Select **Confirm** to add the node type to your graph.
1. Repeat the process for all other node types in the Adventure Works data model:

    | Node type label    | Mapping table                       | ID of mapping column |
    | ------------------ | ----------------------------------- | -------------------- |
    | Employee           | adventureworks_employees            | EmployeeID_K         |
    | Order              | adventureworks_orders               | SalesOrderDetailID_K |
    | ProductCategory    | adventureworks_productcategories    | CategoryID_K         |
    | Product            | adventureworks_products             | ProductID_K          |
    | ProductSubcategory | adventureworks_productsubcategories | SubcategoryID_K      |
    | VendorProduct      | adventureworks_vendorproducts       | ProductID_K          |
    | Vendor             | adventureworks_vendors              | VendorID_K           |

   > [!TIP]
   > When you double-click on a node type, you see its properties. Each property maps to a column in the source table. Delete properties that you don't need in queries or analysis, because excessive properties make your graph harder to maintain and use.

1. You should see all the node types represented in your graph.

    :::image type="content" source="./media/quickstart/node-add-completed.png" alt-text="Screenshot showing all of the nodes added to the graph." lightbox="./media/quickstart/node-add-completed.png":::

1. Select **Save** to save your progress.

Now that you added nodes to your graph, the next step is to add edges to define the relationships between these nodes.

> [!TIP]
> Besides creating node types from entire tables, any column (or set of columns) from any table can form a standalone node type if it represents an entity that you need on the graph. For example, you can create a **country** node type from the **country** column in the **adventureworks_employees** table, with **country** as the ID. Delete properties that aren't required for the uniqueness of the **country** nodes, such as employee name, employee ID, job title, gender, and other properties.

## Next step

> [!div class="nextstepaction"]
> [Add edges to your graph](tutorial-model-edges.md)
