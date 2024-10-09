---
title: Add a query visualization in Real-Time Intelligence
description: Learn how to add a query visualization in the Real-Time Intelligence web UI.
ms.reviewer: mibar
author: andykop
ms.topic: how-to
ms.date: 10/09/2024
---
# Add and modify a query visualization in the web UI

In this article, you'll learn how to create and customize visuals from query results, using the web UI. These visuals can be further manipulated, and can be pinned in a [dashboard](dashboard-real-time-create.md). The addition or modification of these visuals doesn't require rerunning the query, which can be especially useful for heavy queries.

For a full list of available visuals, see [Visualization](/kusto/query/render-operator?view=microsoft-fabric&preserve-view=true#visualization). For visuals that are only available in the web UI or dashboards, see [Dashboard-specific visuals](dashboard-visuals.md).

## Prerequisites

* A Microsoft account or a Microsoft Entra user identity.
* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity). Use the publicly available [**help** cluster](https://dataexplorer.azure.com/help) or [create a database](create-database.md).

## Add a visual to a query

1. [Run a query](create-query-set.md) in the web UI. For example, you can use the following query:

<!-- update link to navigate to an RTI sample -->

    > [!div class="nextstepaction"]
    > <a href="https://dataexplorer.azure.com/clusters/help/databases/Samples?query=H4sIAAAAAAAAAwsuyS/KdS1LzSsp5qpRKM9ILUpVCC5JLElVsLVVUPd29At2DFYHyhSX5uYmFmVWpYJYGi6JuYnpqQFF+QWpRSWVmgpJlQpgM0IqC1IBD28nVFIAAAA=" target="_blank">Run the query</a>

    ```kusto
    StormEvents
    | where State == 'KANSAS'
    | summarize sum(DamageProperty) by EventType
    ```

1. In the results grid, select **+ Add visual**.

    :::image type="content" source="media/add-query-visualization/add-visual.png" alt-text="Screenshot of query results with add visual button highlighted in a red box.":::

    A pane opens on the right side, with the **Visual Formatting** tab selected.

1. Select the **Visual type** from the dropdown. For a list of available visualizations, see [Visualizations](/kusto/query/render-operator?view=azure-data-explorer&preserve-view=true#visualization). 

    :::image type="content" source="media/add-query-visualization/select-visual-type.png" alt-text="Screenshot of visual type dropdown in Azure Data Explorer web UI.":::

[!INCLUDE [customize-visuals](includes/customize-visuals.md)]

## Change an existing visualization

There are two ways to use the visual formatting pane to change an existing visualization.

### Visual created with UI

If you've added a visual through the UI, you can change this visual by selecting the **Edit visual** tab in the results grid.

:::image type="content" source="media/add-query-visualization/edit-visual.png" alt-text="Screenshot of edit visual tab in the results grid in Azure Data Explorer web UI.":::

### Visual created in query

If you've created a visual using the [render operator](/kusto/query/render-operator?view=azure-data-explorer&preserve-view=true), you can edit the visual by selecting **Visual** in the results grid.

:::image type="content" source="media/add-query-visualization/change-rendered-visual.png" alt-text="Screenshot of rendered visual as a bar chart that has been changed to a column chart in the visual formatting pane in Azure Data Explorer web UI." lightbox="media/add-query-visualization/change-rendered-visual.png":::

> [!IMPORTANT]
> Notice that the visual formatting pane has changed the visual representation, but has not modified the original query.

## Pin to dashboard

After you have formatted your visual, you can pin this visual to a new or existing dashboard.

1. From the visual formatting pane, select **Pin to dashboard**.

    :::image type="content" source="media/add-query-visualization/pin-to-dashboard.png" alt-text="Screenshot of pin to dashboard tab in Azure Data Explorer web UI.":::

1. The pin to dashboard dialog opens. Enter a **Tile name** for this visual and select a new or existing dashboard.

    :::image type="content" source="media/add-query-visualization/pin-to-dashboard-menu.png" alt-text="Screenshot of dialog for pinning visual to dashboard in Azure Data Explorer web UI.":::

1. Select **Pin**.

## Related content

* [Customize Azure Data Explorer dashboard visuals](dashboard-customize-visuals.md)
* [Use parameters in Azure Data Explorer dashboards](dashboard-parameters.md)
