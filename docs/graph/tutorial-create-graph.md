---
title: "Tutorial: Create a graph model in Microsoft Fabric"
description: Learn how to create a new graph model in Microsoft Fabric, including loading data from OneLake and configuring graph properties.
ms.topic: tutorial
ms.date: 04/14/2026
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Create a graph
ai-usage: ai-assisted
---

# Tutorial: Create a graph

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this tutorial step, you create a graph model and load data from OneLake. A graph model is the foundation for building your graph and defines the structure of your nodes and edges.

This step assumes you already [loaded the sample data](tutorial-load-data.md) into a lakehouse within your workspace.

## Create a graph model

1. In [Microsoft Fabric](https://fabric.microsoft.com/), select the workspace where you want to create the graph model (for example, *My workspace*).
1. Select **+ New item**.
1. Select **Analyze and train data** > **Graph model (preview)**.

    :::image type="content" source="./media/quickstart/new-item-graph-model.png" alt-text="Screenshot showing the new item menu with the option to select Graph model (preview)." lightbox="./media/quickstart/new-item-graph-model.png":::

    > [!TIP]
    > Alternatively, enter "graph" in the search box and press **Enter** to search for graph items.

1. Enter a name for your graph model, such as `AdventureWorksGraph`, and select **Create**.

After creating the graph model, you're taken to the graph view where you can see **Save**, **Get data**, **Add node**, and **Add edge** buttons.

## Load data into the graph

To load data into your graph from OneLake, follow these steps:

1. In your graph model, select **Get data**.
1. In the **OneLake catalog** dialog, select your lakehouse (for example, *AdventureWorksLakehouse*), and then select **Add**.

   :::image type="content" source="./media/quickstart/graph-data-select.png" alt-text="Screenshot showing the data selection menu in OneLake." lightbox="./media/quickstart/graph-data-select.png":::

1. In the **Choose data** pane, select your lakehouse (for example, *AdventureWorksLakehouse*) to automatically select all tables under it.
1. Select **Load**.

You should now see the eight tables from your lakehouse listed in the data pane, available for use in your graph.

   :::image type="content" source="./media/quickstart/graph-data-view.png" alt-text="Screenshot showing the data view in the graph model." lightbox="./media/quickstart/graph-data-view.png":::

## Next step

> [!div class="nextstepaction"]
> [Add node types to your graph](tutorial-model-nodes.md)
