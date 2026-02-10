---
title: "Quickstart: Create your first graph in Microsoft Fabric"
description: Create a basic graph with two nodes and one edge in Microsoft Fabric in just a few minutes.
ms.topic: quickstart
ms.date: 02/02/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Quickstart - Create your first graph in Microsoft Fabric
---

# Quickstart: Create your first graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this quickstart, you create a basic graph with two nodes and one edge, and then run a query. This process takes about 15 minutes.

For a comprehensive tutorial that covers the full Adventure Works data model and more advanced scenarios, see the [Graph tutorial](tutorial-introduction.md).

## Prerequisites

Before you start this quickstart, verify that:

1. [Graph is available in your region](overview.md#region-availability).
1. Graph is enabled in your Fabric tenant.

   :::image type="content" source="./media/quickstart/tenant-enable-graph.png" alt-text="Enable graph in your Fabric tenant." lightbox="./media/quickstart/tenant-enable-graph.png":::

1. You're a member of a Fabric workspace or have permission to create items in the workspace. For more information, see [Workspaces in Microsoft Fabric](../admin/portal-workspaces.md).

    > [!IMPORTANT]
    > Access management of the graph is restricted to the workspace that hosts it. Users outside of the workspace can't access the graph. Users within the workspace who have access to the underlying data in the lakehouse can model and query the graph.

## Load sample data

To create your graph, first load sample data into a lakehouse in your Fabric workspace.

### Download the sample data

1. Go to the [Fabric Graph GQL example datasets](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/graph) on GitHub.
1. Select the *adventureworks_docs_sample.zip* file and download it to your local machine.

    > [!TIP]
    > To download a file from GitHub, select the file, and then select the **Download raw file** icon.

1. Extract the downloaded *adventureworks_docs_sample.zip* file to a folder on your local machine.

   > [!TIP]
   > In File Explorer, right-click the zip file and select **Extract All**, then choose a destination folder.

### Create a lakehouse

1. In [Microsoft Fabric](https://fabric.microsoft.com/), select your workspace.
1. Select **+ New item**.
1. Select **Store data** > **Lakehouse**.
1. Enter a name (for example, "AdventureWorksLakehouse"), clear the **Lakehouse schemas** option, and select **Create**.

    > [!IMPORTANT]
    > Graph doesn't currently support lakehouses with [lakehouse schema (preview) enabled](/fabric/data-engineering/lakehouse-schemas).

### Load the data into tables

For this quickstart, you only need two tables: *adventureworks_customers* and *adventureworks_orders*. Upload the full sample data folder, and then load just these two tables.

1. In your lakehouse, hover over **Files**, select the ellipsis (...), and then select **Upload** > **Upload folder**.
1. Browse to the extracted folder and upload it. This action uploads all the sample data files to your lakehouse.
1. Expand **Files** and the uploaded folder to see the subfolders. For this quickstart, you only need to load two of them as tables.
1. Hover over the *adventureworks_customers* subfolder, select the ellipsis (...), and choose **Load to Tables** > **New table**.
1. Set the file type to Parquet and select **Load**.
1. Repeat steps 4-5 for the *adventureworks_orders* subfolder.

## Create a graph model

1. In your [Microsoft Fabric workspace](https://fabric.microsoft.com/), select **+ New item**.
1. Select **Analyze and train data** > **Graph model (preview)**.

    :::image type="content" source="./media/quickstart/new-item-graph-model.png" alt-text="Screenshot showing the new item menu with the option to select Graph model (preview)." lightbox="./media/quickstart/new-item-graph-model.png":::

    > [!TIP]
    > Alternatively, enter "graph" in the search box and press **Enter** to search for graph items.

1. Enter a name (for example, "MyFirstGraph") and select **Create**.

After creating the graph model, you're taken to the graph view where you can see the default mode is set to **Model** with **Save**, **Get data**, **Add node**, and **Add edge** buttons at the top.

## Create a graph

To create a graph in Microsoft Fabric, follow these steps in graph view:

1. Select **Get data**.
1. From the OneLake catalog, select your lakehouse with the Adventure Works data.
1. Select **Connect**.
1. Select the *adventureworks_customers* and *adventureworks_orders* tables, and then select **Load**.

    :::image type="content" source="./media/quickstart/get-data.png" alt-text="Screenshot showing the get data dialog with selected tables." lightbox="./media/quickstart/get-data.png":::

## Add two nodes

1. Select **Add node**.
1. Configure the first node:
   - **Label**: Customer
   - **Mapping table**: adventureworks_customers
   - **ID of mapping column**: CustomerID_K

    :::image type="content" source="./media/quickstart/node-add-customer.png" alt-text="Screenshot showing the add node to graph dialog." lightbox="./media/quickstart/node-add-customer.png":::

1. Select **Confirm**.
1. Select **Add node** again.
1. Configure the second node:
   - **Label**: Order
   - **Mapping table**: adventureworks_orders
   - **ID of mapping column**: SalesOrderDetailID_K
1. Select **Confirm**.

## Add one edge

1. Select **Add edge**.
1. Configure the edge:
   - **Label**: purchases
   - **Mapping table**: adventureworks_orders
   - **Source node**: Customer
   - **Source mapping column**: CustomerID_FK
   - **Target node**: Order
   - **Target mapping column**: SalesOrderDetailID_K

    :::image type="content" source="./media/quickstart/edge-add-purchases.png" alt-text="Screenshot showing the add edge dialog." lightbox="./media/quickstart/edge-add-purchases.png":::

1. Select **Confirm**.
1. Select **Save** to load the graph.

## Query your graph

Run a GQL query to find the top five customers by order count.

1. Select  **Query** mode.
1. Select **Code editor** from the top menu.
1. Enter the following GQL query in the input box:

    ```gql
    MATCH (c:Customer)-[:purchases]->(o:`Order`)
    RETURN c.fullName AS customer_name, count(o) AS num_orders
    GROUP BY customer_name
    ORDER BY num_orders DESC
    LIMIT 5
    ```

1. Select **Run query** to see the top five customers by order count.

The following image shows the GQL query and its results:

:::image type="content" source="./media/quickstart/code-editor-query-and-results.png" alt-text="Screenshot showing the result of running a GQL query." lightbox="./media/quickstart/code-editor-query-and-results.png":::

Congratulations! You created your first graph in Microsoft Fabric and ran a query against it.

## Next steps

- [Graph tutorial](tutorial-introduction.md) - Build a complete graph with multiple nodes, edges, and queries
- [GQL language guide](gql-language-guide.md) - Learn GQL syntax
- [What is Graph in Microsoft Fabric?](overview.md) - Learn about graph concepts
