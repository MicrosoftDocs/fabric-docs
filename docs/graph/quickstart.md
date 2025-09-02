---
title: Get Started with Graph in Microsoft Fabric
description: Learn how to get started with Graph in Microsoft Fabric, including key concepts, setup instructions, and first steps.
ms.topic: quickstart
ms.date: 09/15/2025
author: eric-urban
ms.author: eur
ms.reviewer: eur
ms.service: fabric
#ms.subservice: graph
ms.search.form: Getting started with Graph
---

# Quickstart Guide for Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

In this quickstart, you learn how to create a graph model in Microsoft Fabric.

## Prerequisites

To get started with graph in Microsoft Fabric, you need the following prerequisites:

- A lakehouse in OneLake with data that you want to analyze. This quickstart uses Adventure Works data as an example. Your data and results might differ. If you don't have a lakehouse, create one by following these steps: [Create a lakehouse with OneLake](../onelake/create-lakehouse-onelake.md).

    > [!IMPORTANT]
    > You can't use a lakehouse that has [lakehouse schema (preview) enabled](/fabric/data-engineering/lakehouse-schemas).

- You are a member of a workspace or have permission to create items in the workspace. For more information, see [Workspaces in Microsoft Fabric](/fabric/admin/portal-workspaces).

    > [!IMPORTANT]
    > Access management of the graph is restricted to the workspace where it's hosted. The graph isn't accessible to users outside of the workspace. Users within the workspace who have access to the underlying data in Lake house will be able to model and query the graph.


## Create a graph model

To create a graph model in Microsoft Fabric, follow these steps:

1. Go to your [Microsoft Fabric workspace](https://fabric.microsoft.com/).
1. Select **+ New item**.
1. Select **Analyze and train data** > **Graph model (preview)**.

    :::image type="content" source="./media/quickstart/new-item-graph-model.png" alt-text="Screenshot showing the new item menu with the option to select Graph model (preview)." lightbox="./media/quickstart/new-item-graph-model.png":::

    > [!TIP]
    > Alternatively, enter "graph" in the search box and press **Enter** to search for graph items.

1. Enter a name for your graph model and select **Create**.

## Build a graph

In graph view, you should see **Save**, **Add node**, and **Add edge**, and **Get data** buttons.

To build a graph in Microsoft Fabric, follow these steps:

1. In your graph model, select **Get data**.
1. From the OneLake catalog, select data from Fabric to use in your graph. 

   :::image type="content" source="./media/quickstart/graph-data-select.png" alt-text="Screenshot showing the data selection menu in OneLake." lightbox="./media/quickstart/graph-data-select.png":::

    > [!NOTE]
    > This quickstart uses Adventure Works data as an example. Your data set and results might differ.

1. Then select **Connect**.
1. Select data tables and then select **Load**.
1. You should see data available for use in your graph.

   :::image type="content" source="./media/quickstart/graph-data-view.png" alt-text="Screenshot showing the data view in the graph model." lightbox="./media/quickstart/graph-data-view.png":::

Now you can start modeling. 

## Start modeling

1. In your graph model, select **Add node** to add a new node to your graph.
1. In the **Add node** pane, select the data you want to use for the node.
1. Select **Add edge** to create a relationship between nodes.
1. In the **Add edge** pane, select the source and target nodes, and define the relationship.

## Related content

- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
- [End-to-end tutorials in Microsoft Fabric](/fabric/fundamentals/end-to-end-tutorials)
