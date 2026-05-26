---
title: "Tutorial: Add node types to your graph"
description: Learn how to add node types to your graph model in Microsoft Fabric by mapping source tables and configuring node properties.
ms.topic: tutorial
ms.date: 04/14/2026
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Add nodes to your graph
ai-usage: ai-assisted
---

# Tutorial: Add node types to your graph

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you add node types to your graph model. Node types represent entities in your data, such as customers, products, or orders. Later, you connect these node types with edge types to define relationships between them.

## Adventure Works node mappings

In the Adventure Works data model, create a node type for each entity. The following table shows the node mappings. Use this information to add node types to your graph:

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
   > You can set compound keys (IDs consisting of multiple columns). After you select a mapping table, choose one ID from the **ID** dropdown, then use the dropdown again to add another.

1. Select **Confirm** to add the node type to your graph.
1. Repeat the process for all remaining node types listed in the [Adventure Works node mappings](#adventure-works-node-mappings) table.

1. You see all eight node types represented in your graph. Select **Save** to save your progress.

    :::image type="content" source="./media/tutorial/node-add-completed.png" alt-text="Screenshot showing all of the nodes added to the graph." lightbox="./media/tutorial/node-add-completed.png":::

## Understand node properties

When you add a node type, every column in the mapping table automatically becomes a **property** on that node type. You don't need to add properties manually. To see the properties for a node type, double-click it in the graph model editor to open the **Edit node schema** dialog.

:::image type="content" source="./media/tutorial/edit-node-schema-properties.png" alt-text="Screenshot showing the Edit node schema dialog for the Employee node type with all 10 properties listed, each with a delete icon." lightbox="./media/tutorial/edit-node-schema-properties.png":::

For this tutorial, keep all properties on every node type. In a later step, you extract a column into its own node type and remove redundant properties. For details, see [Model a node and edge from the same table](tutorial-model-node-edge-from-same-table.md). For general guidance on choosing which properties to keep or remove, see [Remove unnecessary properties](design-graph-schema.md#remove-unnecessary-properties).

After you add node types to your graph, add edge types to define the relationships between them.

## Next step

> [!div class="nextstepaction"]
> [Add edges to your graph](tutorial-model-edges.md)
