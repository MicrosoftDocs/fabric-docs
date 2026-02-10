---
title: "Tutorial: Create a graph"
description: Learn how to create a graph model and load data into it from OneLake in Microsoft Fabric.
ms.topic: tutorial
ms.date: 02/02/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Create a graph
---

# Tutorial: Create a graph

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you create a graph model and load data from OneLake. A graph model is the foundation for building your graph and defines the structure of your nodes and edges.

This step assumes you already [loaded the sample data](tutorial-load-data.md) into a lakehouse within your workspace.

## Create a graph model

1. In [Microsoft Fabric](https://fabric.microsoft.com/), select the workspace where you want to create the graph model.
1. Select **+ New item**.
1. Select **Analyze and train data** > **Graph model (preview)**.

    :::image type="content" source="./media/quickstart/new-item-graph-model.png" alt-text="Screenshot showing the new item menu with the option to select Graph model (preview)." lightbox="./media/quickstart/new-item-graph-model.png":::

    > [!TIP]
    > Alternatively, enter "graph" in the search box and press **Enter** to search for graph items.

1. Enter a name for your graph model (for example, "AdventureWorksGraph") and select **Create**.

After creating the graph model, you're taken to the graph view where you can see **Save**, **Get data**, **Add node**, and **Add edge** buttons.

## Load data into the graph

To load data into your graph from OneLake, follow these steps:

1. In your graph model, select **Get data**.
1. From the OneLake catalog, select the data from Fabric that you want to use in your graph.

   :::image type="content" source="./media/quickstart/graph-data-select.png" alt-text="Screenshot showing the data selection menu in OneLake." lightbox="./media/quickstart/graph-data-select.png":::

1. Select **Connect**.
1. Select the data tables you want to use. In this tutorial, select all the Adventure Works tables you previously loaded into your lakehouse. Then select **Load**.

You should now see the data available for use in your graph.

   :::image type="content" source="./media/quickstart/graph-data-view.png" alt-text="Screenshot showing the data view in the graph model." lightbox="./media/quickstart/graph-data-view.png":::

## Next step

> [!div class="nextstepaction"]
> [Add nodes to your graph](tutorial-model-nodes.md)
