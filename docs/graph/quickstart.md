---
title: "Quickstart: Create Your First Graph in Microsoft Fabric"
description: Create a basic graph with two nodes and one edge in Microsoft Fabric in just a few minutes using the visual graph modeling experience.
ms.topic: quickstart
ms.date: 06/23/2026
ms.reviewer: wangwilliam
ms.search.form: Quickstart - Create your first graph in Microsoft Fabric
ai-usage: ai-assisted
---

# Quickstart: Create your first graph in Microsoft Fabric

In this quickstart, you use graph in Microsoft Fabric to create a basic graph with two nodes and one edge, and then run a query. This process takes about 15 minutes.

For a comprehensive tutorial that covers the full Adventure Works data model and more advanced scenarios, see the [graph tutorial](tutorial-introduction.md).

## Prerequisites

Before you start this quickstart, verify that:

1. You have access to a Microsoft Fabric capacity (F2 or higher) or a [Fabric trial](../fundamentals/fabric-trial.md).
1. [Graph is available in your region](overview.md#region-availability).
1. You're a member of a Fabric workspace or have permission to create items in the workspace. For more information, see [Workspaces in Microsoft Fabric](../admin/portal-workspaces.md).

    > [!IMPORTANT]
    > Access management of the graph is restricted to the workspace that hosts it. Users outside of the workspace can't access the graph. Users within the workspace who have access to the underlying data in the lakehouse can model and query the graph.

## Load sample data

To create your graph, first load sample data into a lakehouse in your Fabric workspace.

### Download the sample data

[!INCLUDE [download sample data](includes/sample-data-download.md)]

### Create a lakehouse

[!INCLUDE [create a lakehouse](includes/sample-data-lakehouse.md)]

### Load the data into tables

For this quickstart, you only need two tables: *adventureworks_customers* and *adventureworks_orders*. Upload the full sample data folder, and then load just these two tables.

> [!NOTE]
> The full set of sample files is used in the [full graph tutorial](tutorial-introduction.md). You can also use them to explore additional data on your own.

1. In your lakehouse, hover over **Files**, select the ellipsis (...), and then select **Upload** > **Upload folder**.
1. Browse to the extracted folder and upload it. This action uploads all the sample data files to your lakehouse.
1. Expand **Files** and the uploaded folder to see the subfolders. For this quickstart, you only need to load two of them as tables.
1. Hover over the *adventureworks_customers* subfolder, select the ellipsis (...), and choose **Load to Tables** > **New table**.
1. Set the file type to **parquet** and select **Load**.
1. Repeat steps 4-5 for the *adventureworks_orders* subfolder.

When you finish, you see the two tables under **Tables** in the lakehouse Explorer panel.

:::image type="content" source="./media/quickstart/tables.png" alt-text="Screenshot showing the adventureworks_customers and adventureworks_orders tables." lightbox="./media/quickstart/tables.png":::

## Create a graph model

1. In your [Microsoft Fabric workspace](https://fabric.microsoft.com/), select **+ New item**.
1. Enter *graph* in the search box, press **Enter** to search for graph items, and select **Graph model**. Alternatively, scroll down to **Analyze and train data** > **Graph model**.

    :::image type="content" source="./media/quickstart/new-item-graph-model.png" alt-text="Screenshot showing the new item menu with the option to select Graph model." lightbox="./media/quickstart/new-item-graph-model.png":::

1. Enter a name (for example, "MyFirstGraph") and select **Create**.

After creating the graph model, you're taken to the graph view where you can see the default mode is set to **Model**. Across the top ribbons, you see buttons for **Save**, **Get data**, **Add node**, **Add edge**, and **Delete**.

:::image type="content" source="./media/quickstart/default-view.png" alt-text="Screenshot showing the default view of the graph model." lightbox="./media/quickstart/default-view.png":::

## Add data to your graph model

To add data to your graph model, follow these steps in graph view:

1. In the top ribbon, select **Get data**.
1. From the OneLake catalog, select your lakehouse with the Adventure Works data.
1. Select **Add**.
1. Select the *adventureworks_customers* and *adventureworks_orders* tables, and then select **Load**.

    :::image type="content" source="./media/quickstart/get-data.png" alt-text="Screenshot showing the get data dialog with selected tables." lightbox="./media/quickstart/get-data.png":::

## Define your graph's structure

Now that your data is loaded, define your graph's structure by adding nodes and edges. In this quickstart, you add two node types (`Customer` and `Order`) and one edge type (`purchases`) to model the relationship between customers and their orders.

### Add two nodes

1. In the top ribbon, select **Add node**.
1. Configure the first node:
   - **Node label**: `Customer`
   - **Source table**: adventureworks_customers
   - **Key**: CustomerID_K

    :::image type="content" source="./media/quickstart/node-add-customer.png" alt-text="Screenshot showing the add node to graph dialog." lightbox="./media/quickstart/node-add-customer.png":::

1. Select **+ Add property**, **Add all columns**, and **Apply**. This step makes all columns in this source table available as properties for the node.

    :::image type="content" source="./media/quickstart/node-add-customer-properties.png" alt-text="Screenshot showing the add node to graph dialog with four properties." lightbox="./media/quickstart/node-add-customer-properties.png":::

1. Select **Create**. You see a node for `Customer` appear on the graph canvas.
1. Select **Add node** again.
1. Configure the second node:
   - **Node label**: `Order`
   - **Source table**: adventureworks_orders
   - **Key**: SalesOrderDetailID_K
1. Select **+ Add property**, **Add all columns**, and **Apply**. This step makes all columns in this source table available as properties for the node.
1. Select **Create**. 

You now have two nodes, `Customer` and `Order`, visible on the graph canvas.

:::image type="content" source="./media/quickstart/nodes.png" alt-text="Screenshot showing two new nodes on the canvas.":::

### Add one edge

1. In the top ribbon, select **Add edge**.
1. Configure the edge:
   - **Edge label**: `purchases`
   - **Source table**: adventureworks_orders
   - **Origin node**: `Customer`
   - **Origin key**: CustomerID_FK
   - **Target node**: `Order`
   - **Target key**: SalesOrderDetailID_K

    :::image type="content" source="./media/quickstart/edge-add-purchases.png" alt-text="Screenshot showing the add edge dialog." lightbox="./media/quickstart/edge-add-purchases.png":::
1. Select **+ Add property**, **Add all columns**, and **Apply**. This step makes all columns in this source table available as properties for the edge.
1. Select **Create**.
1. In the top ribbon, select **Save**.

You see the node and edge labels in the graph view canvas.

:::image type="content" source="./media/quickstart/nodes-edge.png" alt-text="Screenshot showing the new edge between the two nodes on the canvas.":::

The data might take a few minutes to finish loading. Wait for the *Data load is in progress* label to show *Data load completed...* before proceeding to the next section.

:::image type="content" source="./media/quickstart/data-load-completed.png" alt-text="Screenshot showing the confirmation message that data load completed." lightbox="./media/quickstart/data-load-completed.png":::

## Query your graph

Run a GQL query to find the top five customers by order count.

1. In the **Modes** panel, select  **Query** mode.

1. In the top ribbon, select **Query builder > Code editor**.

   :::image type="content" source="./media/quickstart/query-mode-code-editor.png" alt-text="Screenshot showing how to select query mode and the code editor." lightbox="./media/quickstart/query-mode-code-editor.png":::

1. Enter the following GQL query in the input box:

    ```gql
    MATCH (c:Customer)-[:purchases]->(o:`Order`)
    RETURN c.fullName AS customer_name, count(o) AS num_orders
    GROUP BY customer_name
    ORDER BY num_orders DESC
    LIMIT 5
    ```

1. In the top ribbon, select **Run query**. You see five rows listing customer names and their order counts, sorted from most to fewest orders.

    :::image type="content" source="./media/quickstart/code-editor-query-and-results.png" alt-text="Screenshot showing the result of running a GQL query." lightbox="./media/quickstart/code-editor-query-and-results.png":::

Congratulations! You created your first graph in Microsoft Fabric and ran a query against it.

## Next steps

- [Graph tutorial](tutorial-introduction.md): Build a complete graph with multiple nodes, edges, and queries.
- [GQL language guide](gql-language-guide.md): Learn GQL syntax.
- [What is graph in Microsoft Fabric?](overview.md): Learn about graph concepts.
