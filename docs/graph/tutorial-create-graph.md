---
title: "Tutorial: Create a graph model in Microsoft Fabric"
description: Learn how to create a new graph model in Microsoft Fabric, including loading data from OneLake and configuring graph properties.
ms.topic: tutorial
ms.date: 06/24/2026
ms.reviewer: wangwilliam
ms.search.form: Tutorial - Create a graph
ai-usage: ai-assisted
---

# Tutorial: Create a graph

In this tutorial step, you create a graph model and load data from OneLake. A graph model is the foundation for building your graph and defines the structure of your nodes and edges.

This step assumes you already [loaded the sample data](tutorial-load-data.md) into a lakehouse within your workspace.

## Create a graph model

[!INCLUDE [create a graph model](includes/create-model.md)]

## Load data into the graph

To load data into your graph from OneLake, follow these steps:

1. In your graph model, select **Get data**.
1. In the **OneLake catalog** dialog, select your lakehouse (for example, *AdventureWorksLakehouse*), and then select **Add**.

   :::image type="content" source="./media/tutorial/graph-data-select.png" alt-text="Screenshot showing the data selection menu in OneLake." lightbox="./media/tutorial/graph-data-select.png":::

1. In the **Choose data** pane, select the name of your lakehouse (for example, *AdventureWorksLakehouse*) to automatically select all tables under it.
1. Select **Load**.

Select the **Data** icon on the right of the screen to open the data pane. You see the eight tables from your lakehouse listed in the data pane, available for use in your graph.

   :::image type="content" source="./media/tutorial/graph-data-view.png" alt-text="Screenshot showing the data view in the graph model." lightbox="./media/tutorial/graph-data-view.png":::

## Next step

> [!div class="nextstepaction"]
> [Add node types to your graph](tutorial-model-nodes.md)
