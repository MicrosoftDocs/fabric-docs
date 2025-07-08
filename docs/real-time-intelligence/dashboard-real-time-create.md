---
title: Create a Real-Time Dashboard
description: Learn how to visualize data with Real-Time Dashboards.
ms.reviewer: tzgitlin
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 06/19/2025
ms.search.form: product-kusto, Real-Time Dashboard
---
# Create a Real-Time Dashboard

A dashboard is a collection of tiles, optionally organized in pages, where each tile has an underlying query and a visual representation. You can natively export Kusto Query Language (KQL) queries to a dashboard as visuals and later modify their underlying queries and visual formatting as needed. In addition to ease of data exploration, this fully integrated dashboard experience provides improved query and visualization performance.

In this article, you learn how to create a new Real-Time Dashboard, add data sources, and add tiles to the dashboard. You also learn how to enable auto refresh, use parameters, and export dashboards.

> [!IMPORTANT]
> Your data is secure. Dashboards and dashboard-related metadata about users are encrypted at rest using Microsoft-managed keys.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with data

## Enable tenant settings in the admin portal

> [!IMPORTANT]
> This step must be completed by the tenant admin.

1. Browse to the [admin portal](../admin/admin-center.md).

1. In the **Tenant settings** tab, search for *Real-Time Dashboards*. For more information, see [About tenant settings](../admin/about-tenant-settings.md).
1. Toggle the button for **Create Real-Time Dashboards** to **Enabled**. For more information, see [Tenant settings - Microsoft Fabric](../admin/tenant-settings-index.md).
1. Select **Apply**.

    :::image type="content" source="media/real-time-dashboard/enable-tenant-settings.png" alt-text="Screenshot of enabling tenant settings for Real-Time Dashboards.":::

## Create a new dashboard

[!INCLUDE [Real-Time Intelligence create-real-time-dashboard](includes/create-real-time-dashboard.md)]

> [!NOTE]
> You can also use Copilot to help you write queries. For more information, see [Use Copilot in KQL Queryset](../fundamentals/copilot-for-writing-queries.md).

## Edit mode
If you aren't able to edit a dashboard, ensure that you are in the Editing mode. 

:::image type="content" source="media/real-time-dashboard/edit-mode.png" alt-text="Screenshot showing the selection of the editing view." lightbox="media/real-time-dashboard/edit-mode.png":::


## Add data source

Data sources are reusable references to a specific database in the same workspace as the Real-Time Dashboard. Different tiles can be based on different data sources.

1. Select **New data source** on the ribbon at the top, and then select **Azure Data Explorer**.

    :::image type="content" source="media/real-time-dashboard/new-data-source.png" alt-text="Screenshot of adding a new data source to a Real-Time Dashboard in Real-Time Intelligence in Microsoft Fabric.":::
1. In the **Connect Azure Data Explorer cluster** window, follow these steps:
    1. Enter the **Connection URI** for your Azure Data Explorer cluster. 
    1. Select a **database** in the cluster. 
    1. Select **Create**. 

        :::image type="content" source="media/real-time-dashboard/connect-azure-data-explorer-cluster.png" alt-text="Screenshot of the Connect Azure Data Explorer cluster window.":::  
1. On the **Create new data source** page, enter a display name for the data source, and select **Add**. 

    :::image type="content" source="media/real-time-dashboard/create-new-data-source.png" alt-text="Screenshot of the Create new data source window.":::  

## Add tile

Dashboard tiles use Kusto Query Language snippets to retrieve data and render visuals. Each tile/query can support a single visual.

1. Select **Add tile** from the dashboard canvas or the top menu bar.

    :::image type="content" source="media/real-time-dashboard/add-tile-button.png" alt-text="Screenshot showing the selection of the Add tile button.":::   
1. In the **Query** pane,
    1. Select the data source from the dropdown menu.
    1. Type the query, and the select **Run**. For more information about generating queries that use parameters, see [Use parameters in your query](dashboard-parameters.md#use-parameters-in-your-query).
    1. Select **+ Add visual** on the ribbon for the Results pane at the bottom.

    :::image type="content" source="media/real-time-dashboard/query.png" alt-text="Screenshot of dashboard query in Real-Time Dashboards in Real-Time Intelligence in Microsoft Fabric.":::
1. In the **Visual formatting** tab, select **Visual type** to choose the type of visual. For more information on how to customize the visual, see [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md).
1. Select **Apply changes** to pin the visual to the dashboard.

    :::image type="content" source="media/real-time-dashboard/visual-formatting.png" alt-text="Screenshot of visual formatting pane in Real-Time Dashboards." lightbox="media/real-time-dashboard/visual-formatting.png":::
1. Select the **Save** icon.

    :::image type="content" source="media/real-time-dashboard/save-button.png" alt-text="Screenshot showing the selection of the Save button on the ribbon." lightbox="media/real-time-dashboard/visual-formatting.png":::    

## Add tile from a queryset

You can add tiles to your dashboard directly from queries written in a KQL queryset.

1. [Open an existing KQL queryset](create-query-set.md#open-an-existing-kql-queryset).
1. [Write a query](kusto-query-set.md#write-a-query).
1. Select **Pin to dashboard**.

    :::image type="content" source="media/real-time-dashboard/queryset-pin-query.png" alt-text="Screenshot of the pin query to dashboard button in a queryset query."  lightbox="media/real-time-dashboard/queryset-pin-query.png":::
1. In the **Pin query to dashboard** window, do the following:
    1. Select an existing dashboard or create a new dashboard.
    1. Name your dashboard tile.
    1. Optionally, select **Open dashboard after tile creation** to view your dashboard immediately after creation.
    1. Select **Create**.

        :::image type="content" source="media/real-time-dashboard/pin-query-dashboard.png" alt-text="Screenshot of the Pin query to dashboard window.":::

## Add page

Pages are optional containers for tiles. You can use pages to organize tiles into logical groups, such as by data source or by subject area. You can also use pages to create a dashboard with multiple views, such as a dashboard with a drillthrough from a summary page to a details page.

1. Switch to the editing mode by selecting **Editing** in the top-right corner. 
1. On the **Pages** pane, select **+ Add page**.

    :::image type="content" source="media/real-time-dashboard/new-page.png" alt-text="Screenshot of adding a page to a Real-Time Dashboard in Real-Time Intelligence in Microsoft Fabric." lightbox="media/real-time-dashboard/new-page.png":::

1. To name the page, select the vertical **More menu [...]** > **Rename page**.

    :::image type="content" source="media/real-time-dashboard/new-page-rename.png" alt-text="Screenshot of renaming a page in Real-Time Dashboards.":::
1. Select the new page in the Pages pane, and [add tiles](#add-tile) to the page.

## Use parameters

Parameters significantly improve dashboard rendering performance, and enable you to use filter values as early as possible in the query. Filtering is enabled when the parameter is included in the query associated with your tiles. For more information about how to set up and use different kinds of parameters, see [Use parameters in Real-Time Dashboards](dashboard-parameters.md).

## Tile legend

You can change the position of the legend in your tiles and use the legend to interact with the data.

### Change the legend location

If you have edit rights on a real-time dashboard, you can change the location of the legend in your tile. Toggle to **Edit** mode and select the **Edit** pencil icon. In the **Visual formatting** pane, under **Legend**, you can select your location preference.

### Interact with your data

You can use the legend to interact with the data in your tile. You can change what data you view by selecting the specific item in the legend. Use <kbd>Ctrl</kbd> to add or remove items from the selection, hold <kbd>shift</kbd> to select a range. Items not selected are greyed out.

The **Search** button allows you to search and filter items.

Use the **Invert** button to invert your selection.

The **Up** and **Down** arrows navigate through the list in the following ways:

* When one item is selected, the up and down arrows select the previous or next item.
* When more than one item is selected, the up and down arrows scroll through the list of items, and the data for any selected items you navigate to is highlighted.

:::image type="content" source="media/real-time-dashboard/interactive-legend.png" alt-text="Screenshot showing the buttons to use the legend to interact with your data.":::

## View query

You can view the query in either editing or viewing mode. Editing the underlying query of a tile is only possible in editing mode.

1. On the tile you want to explore, select the **More menu [...]** > **View query**. A pane opens with the query and results table.

    :::image type="content" source="media/real-time-dashboard/view-query-menu.png" alt-text="Screenshot of the View query menu for a tile on the dashboard." lightbox="media/real-time-dashboard/view-query-menu.png"::: 
1. Select **Edit query**.
1. Choose either **Existing KQL Queryset** or **New KQL Queryset**. Proceed to edit the query in the [KQL Queryset](kusto-query-set.md).

    :::image type="content" source="media/real-time-dashboard/edit-query.png" alt-text="Screenshot of the KQL query editor." lightbox="media/real-time-dashboard/edit-query.png"::: 

    > [!NOTE]
    > Any edits made to the query using this flow won't be reflected in the original Real-Time Dashboard.

## Enable auto refresh

Auto refresh is a feature that allows you to automatically update the data on a dashboard without manually reloading the page or clicking a refresh button.

Dashboard authors can configure autorefresh settings for other viewers. By default, the refresh rate is set using the **Default refresh rate**, but viewers can adjust this rate for their own sessions.

The **Minimum time interval** defines the fastest refresh rate allowed and acts as a lower limit. For example, if the author sets the default refresh rate to 1 hour and the minimum time interval to 30 minutes, viewers can choose a refresh rate between 30 minutes and 1 hour, but not lower than 30 minutes.

This setting gives authors control over how frequently dashboards can refresh, helping to manage system load and performance.

1. Select the **Manage** tab > **Auto refresh**.
1. Toggle the option so auto refresh is **Enabled**.
1. Select values for **Minimum time interval** and **Default refresh rate**.
1. Select **Apply** and then **Save** the dashboard.

    :::image type="content" source="media/real-time-dashboard/auto-refresh.png" alt-text="Screenshot of auto refresh pane in Real-Time Dashboards.":::

## Share the dashboard

To share the dashboard link:

1. Select **Share** in the top-right corner of the dashboard.

    :::image type="content" source="media/real-time-dashboard/share-link.png" alt-text="Screenshot that shows the Share button." lightbox="media/real-time-dashboard/share-link.png":::
1. In the **Create and send link** window, you can do the following steps: 
    - To see a link to the dashboard and copy it to the clipboard, select **Copy link**. 
    - To share a link to the dashboard via email, select **by Email**. 
    - To share a link to the dashboard via Teams, select **by Teams**. 

## Export dashboards

Use the file menu to export a dashboard to a JSON file. Exporting dashboard can be useful in the following scenarios:

* **Version control**: You can use the file to restore the dashboard to a previous version.
* **Dashboard template**: You can use the file as template for creating new dashboards.
* **Manual editing**: You can edit the file to modify the dashboard. The file can be imported back to the dashboard.

To export a dashboard, in the dashboard, select the **Manage** tab > **|-> Download file**.
:::image type="content" source="media/real-time-dashboard/download-file-button.png" alt-text="Screenshot that shows the Download file button on the Manage tab button." lightbox="media/real-time-dashboard/download-file-button.png":::

The file contains the dashboard data in JSON format, an outline of which is shown in the following snippet.

```json
{
    "id": "{GUID}",
    "eTag": "{TAG}",
    "title": "Dashboard title",
    "tiles": [
        {
            "id": "{GUID}",
            "title": "Tile title",
            "query": "{QUERY}",
            "layout": {
                "x": 0,
                "y": 7,
                "width": 6,
                "height": 5
            },
            "pageId": "{GUID}",
            "visualType": "line",
            "dataSourceId": "{GUID}",
            "visualOptions": {
                "xColumn": {
                    "type": "infer"
                },
                "yColumns": {
                    "type": "infer"
                },
                "yAxisMinimumValue": {
                    "type": "infer"
                },
                "yAxisMaximumValue": {
                    "type": "infer"
                },
                "seriesColumns": {
                    "type": "infer"
                },
                "hideLegend": false,
                "xColumnTitle": "",
                "yColumnTitle": "",
                "horizontalLine": "",
                "verticalLine": "",
                "xAxisScale": "linear",
                "yAxisScale": "linear",
                "crossFilterDisabled": false,
                "crossFilter": {
                    "dimensionId": "dragX-timeRange",
                    "parameterId": "{GUID}"
                },
                "multipleYAxes": {
                    "base": {
                        "id": "-1",
                        "columns": [],
                        "label": "",
                        "yAxisMinimumValue": null,
                        "yAxisMaximumValue": null,
                        "yAxisScale": "linear",
                        "horizontalLines": []
                    },
                    "additional": []
                },
                "hideTileTitle": false
            },
            "usedParamVariables": [
                "{PARAM}"
            ]
        }
    ],
    "dataSources": [
        {}
    ],
    "$schema": "https://dataexplorer.azure.com/static/d/schema/20/dashboard.json",
    "autoRefresh": {
        "enabled": true,
        "defaultInterval": "15m",
        "minInterval": "5m"
    },
    "parameters": [
        {}
    ],
    "pages": [
        {
            "name": "Primary",
            "id": "{GUID}"
        }
    ],
    "schema_version": "20"
}
```

## Update or restore an existing dashboard from a file

You can update an existing dashboard, or restore a previous version, as follows:

1. In the dashboard, select the **Manage** tab > **Replace with file**.

    :::image type="content" source="media/real-time-dashboard/replace-with-file-button.png" alt-text="Screenshot that shows the Replace with file button on the Manage tab button." lightbox="media/real-time-dashboard/replace-with-file-button.png":::
1. Select the file to update the dashboard.
1. On the **Home** tab, select **Save**.

## Related content

* [Use parameters in Real-Time Dashboards](dashboard-parameters.md)
* [Real-Time Dashboard-specific visuals](dashboard-visuals.md)
* [Apply conditional formatting in Real-Time Dashboard visuals](dashboard-conditional-formatting.md)
* [Create [!INCLUDE [fabric-activator](includes/fabric-activator.md)] alerts from a Real-Time Dashboard](data-activator/activator-get-data-real-time-dashboard.md)
