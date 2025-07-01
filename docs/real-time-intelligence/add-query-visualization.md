---
title: Add a query visualization in Real-Time Intelligence
description: Learn how to add a query visualization in Real-Time Intelligence.
ms.reviewer: mibar
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
---
# Add and modify a query visualization

In this article, you'll learn how to create and customize visuals from query results. These visuals can be further manipulated, and can be pinned in a [dashboard](dashboard-real-time-create.md). The addition or modification of these visuals doesn't require rerunning the query, which can be especially useful for heavy queries.

For a full list of available visuals, see [Visualization](/kusto/query/render-operator?view=microsoft-fabric&preserve-view=true#visualization). For visuals that are only available in Real-Time Dashboards, see [Dashboard-specific visuals](dashboard-visuals.md).

## Prerequisites

* A Microsoft account or a Microsoft Entra user identity.
* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity). Use the publicly available [**help** cluster](https://dataexplorer.azure.com/help) or [create a database](create-database.md).

## Add a visual to a query

1. [Run a query](create-query-set.md). For example, you can use the following query:

    ```kusto
    Bikestream
    | summarize countEmptyDocks=sum(No_Empty_Docks) by Street
    | top 5 by countEmptyDocks
    ```

1. In the results grid, select **+ Add visual**.

    :::image type="content" source="media/add-query-visualization/add-visual.png" alt-text="Screenshot of query results with add visual button highlighted in a red box." lightbox="media/add-query-visualization/add-visual.png":::

    A pane opens on the right side, with the **Visual Formatting** tab selected.

1. Select the **Visual type** from the dropdown. For a list of available visualizations, see [Visualizations](/kusto/query/render-operator?view=microsoft-fabric&preserve-view=true#visualization).

    :::image type="content" source="media/add-query-visualization/select-visual-type.png" alt-text="Screenshot of visual type dropdown.":::

[!INCLUDE [Set customization properties](includes/customize-visuals.md)]

## Change an existing visualization

There are two ways to use the visual formatting pane to change an existing visualization.

### Visual created with UI

If you've added a visual through the UI, you can change this visual by selecting the **Visual** tab in the results grid.

:::image type="content" source="media/add-query-visualization/edit-visual.png" alt-text="Screenshot of edit visual tab in the results grid.":::

### Visual created in query

If you've created a visual using the [render operator](/kusto/query/render-operator?view=azure-data-explorer&preserve-view=true), you can edit the visual by selecting **Visual** in the results grid.

:::image type="content" source="media/add-query-visualization/change-rendered-visual.png" alt-text="Screenshot of rendered visual as a bar chart that has been changed to a column chart in the visual formatting pane." lightbox="media/add-query-visualization/change-rendered-visual.png":::

> [!IMPORTANT]
> Notice that the visual formatting pane has changed the visual representation, but has not modified the original query.

## Related content

* [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md)
* [Use parameters in Real-Time Dashboards](dashboard-parameters.md)
