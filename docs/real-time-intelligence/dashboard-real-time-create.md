---
title: Create a Real-Time Dashboard
description: Learn how to visualize data with Real-Time Dashboards.
ms.reviewer: tzgitlin
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.date: 10/05/2025
ms.subservice: rti-dashboard
ms.search.form: product-kusto, Real-Time Dashboard
ai-usage: ai-assisted
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
1. Toggle the button for **Create Real-Time dashboards** to **Enabled**. For more information, see [Tenant settings - Microsoft Fabric](../admin/tenant-settings-index.md).
1. Select **Apply**.

    :::image type="content" source="media/real-time-dashboard/enable-tenant-settings.png" alt-text="Screenshot of enabling tenant settings for Real-Time Dashboards.":::

## Create a new dashboard

There are several ways to create a new Real-Time dashboard, select the tab that corresponds with your desired creation method.

## [Manual](#tab/create-manual)

[!INCLUDE [Real-Time Intelligence create-real-time-dashboard](includes/create-real-time-dashboard.md)]

6. Complete dashboard setup by adding a data source to the dashboard. After the dashboard is connected to a data source, you can access all dashboard options like adding new tiles.

    :::image type="content" source="media/real-time-dashboard/dashboard-new-with-source.png" alt-text="Screenshot of Real-Time Dashboard with all options enabled.":::

## [Copilot](#tab/create-copilot)

Copilot streamlines the creation of Real-Time Dashboards by automating the setup process, making it accessible even to users without advanced technical expertise. By using natural language input, you can describe the dashboard you want, and Copilot uses AI to generate it. Start by selecting a data table from the Real-Time Hub or a KQL Queryset. Copilot will then create a Real-Time Dashboard tailored to your specifications, including an insights page for a high-level summary and a data profile page for in-depth analysis.

For detailed instructions, see [Generate Real-Time Dashboard Using Copilot](../fundamentals/copilot-generate-dashboard.md).

## [Queryset](#tab/create-queryset)

1. [Open an existing KQL queryset](create-query-set.md#open-an-existing-kql-queryset).
1. [Write a query](kusto-query-set.md#write-a-query).
1. Select **Save to dashboard**.
1. In the **Pin query to dashboard** window, do the following:

    :::image type="content" source="media/real-time-dashboard/save-query-to-dashboard.png" alt-text="Screenshot of the Save query to dashboard window.":::

1. Select create a new dashboard.
1. Name your dashboard tile.
1. Optionally, select **Open dashboard after tile creation** to view your dashboard immediately after creation.
1. Select **Create**.

## [Replacing the file](#tab/replacing-file)

Select the **Manage** tab, then choose **Replace with file**. Select the file you want to use to create a new dashboard, update an existing one, restore a previous version, or use a file received from another user.

:::image type="content" source="media/real-time-dashboard/replace-file.png" alt-text="Screenshot of the Replace with file option.":::

----

## Add data source

Data sources are reusable references to a specific database in the same workspace as the Real-Time dashboard. Different tiles can be based on different data sources.

Select the tab that corresponds with your desired data source type.

## [Eventhouse / KQL Database](#tab/kql-database)

1. Open your Real-Time dashboard.

1. In the upper tool bar, select **New data source** > **Eventhouse / KQL Database**.

    :::image type="content" source="media/real-time-dashboard/event-house.png" alt-text="Screenshot of the data source menu showing a list of optional data sources with eventhouse/kql database highlighted.":::

1. In the **OneLake catalog** window, select a KQL database to connect to your KQL queryset, and then select **Connect**.

    Alternatively, close the **OneLake data hub** window and use the **+ Add data source** menu to connect to a different data source.

## [Azure Data Explorer](#tab/azure-data-explorer-cluster)

1. Open your Real-Time dashboard.

1. In the upper tool bar, select **New data source** > **Azure Data Explorer**.

    :::image type="content" source="media/real-time-dashboard/azure-data.png" alt-text="Screenshot of the data source menu showing a list of optional data sources with Azure data explorer highlighted.":::

## [Azure Monitor](#tab/azure-data-monitor)

1. Open your Real-Time dashboard.

1. In the upper tool bar, select **New data source** > **Azure Monitor** and select either **Application Insights** or **Log Analytics**.

    :::image type="content" source="media/real-time-dashboard/azure-monitor.png" alt-text="Screenshot of the data source menu showing a list of optional data sources with Azure monitor highlighted.":::

1. Enter your connection parameters or a full connection URI:

    **To enter your connection parameters**:

    1. Enter your **Subscription ID**. You can find the ID in the Azure portal by selecting **Subscriptions** > your subscription name > copy the Subscription ID from the resource Overview tab.

    1. Select the **Resource Group** that contains your Application Insights or Log Analytics database.

    1. Enter the **Workspace Name** for Log Analytics or the **Application Insights app name** for Application Insights. You can find the name in the Azure portal by selecting the Application Insights or Log Analytics resource.

    1. Select the **Application Insights** or **Log Analytics** database from the drop-down list. This list is populated with the databases in your selected database group.

    **To enter a full connection URI**:

    1. Select **Connection URI** and enter your Connection URI in this format:

    > Replace \<subscription-id\>, \<resource-group-name\> and \<ai-app-name\> with your own values.

    For Log Analytics: `https://ade.loganalytics.io/subscriptions/<subscription-id>/resourcegroups/<resource-group-name>/providers/microsoft.insights/components/<ai-app-name>`

    For Application Insights: `https://ade.applicationinsights.io/subscriptions/<subscription-id>/resourcegroups/<resource-group-name>/providers/microsoft.insights/components/<ai-app-name>`

1. Select a **Database**. Expand the list and select a database.

1. In the **Connect Azure Data Explorer cluster** window, follow these steps:
    1. Enter the **Connection URI** for your Azure Data Explorer cluster.
    1. Select a **database** in the cluster.
    1. Select **Connect**.

 A list of tables associated with this data source appears below the data source name.

----

## Edit mode

To switch to edit mode, select **Editing** in the top-right corner.

:::image type="content" source="media/real-time-dashboard/edit-mode.png" alt-text="Screenshot showing the selection of the editing view.":::

Under the Home tab in the **toolbar**, you can perform edit actions to enrich the dashboard such as [adding new tiles](#add-tile), creating base queries, and [defining new parameters](dashboard-parameters.md#create-a-parameter).

:::image type="content" source="media/real-time-dashboard/home-tab.png" alt-text="Screenshot of the toolbar options under the Home tab.":::

Under the Manage tab, you can manage data sources and [parameters](dashboard-parameters.md), as well as configure settings for [Auto refresh](#enable-auto-refresh).

:::image type="content" source="media/real-time-dashboard/manage-tab.png" alt-text="Screenshot of the toolbar options under the Manage tab.":::

## Add tile

Dashboard tiles use Kusto Query Language (KQL) queries to fetch data and generate visuals. Each tile or query is designed to support a single visual representation.

1. Select **Add tile** from the dashboard canvas or **New tile** from the top menu bar.

    :::image type="content" source="media/real-time-dashboard/add-tile-button.png" alt-text="Screenshot showing the selection of the Add tile button.":::
1. In the **Query** pane,
    1. Select the data source from the dropdown menu.
    1. Type the query, and the select **Run**. For more information about generating queries that use parameters, see [Use parameters in your query](dashboard-parameters.md#use-parameters-in-your-query).
    
    > [!TIP]
    > You can use Copilot directly from the editing pane to author KQL with natural language. Copilot can generate a new query, replace the current query, or refine it without leaving the tile editor. For more information, see [Use Copilot in the tile editing pane](#use-copilot-in-the-tile-editing-pane).
    
    1. Select **+ Add visual** on the ribbon for the Results pane at the bottom.

    :::image type="content" source="media/real-time-dashboard/query.png" alt-text="Screenshot of dashboard query in Real-Time Dashboards in Real-Time Intelligence in Microsoft Fabric.":::
1. In the **Visual formatting** tab, select **Visual type** to choose the type of visual. For more information on how to customize the visual, see [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md).
1. Select **Apply changes** to save the visual to the dashboard.

    :::image type="content" source="media/real-time-dashboard/visual-formatting.png" alt-text="Screenshot of visual formatting pane in Real-Time Dashboards." lightbox="media/real-time-dashboard/visual-formatting.png":::
1. Select the **Save** icon.

    :::image type="content" source="media/real-time-dashboard/save-button.png" alt-text="Screenshot showing the selection of the Save button on the ribbon." lightbox="media/real-time-dashboard/save-button.png":::

## Add tile from a queryset

You can add tiles to your dashboard directly from queries written in a KQL queryset.

1. [Open an existing KQL queryset](create-query-set.md#open-an-existing-kql-queryset).
1. [Write a query](kusto-query-set.md#write-a-query).
1. Select **Save to Dashboard**.

    :::image type="content" source="media/real-time-dashboard/pin-to-dashboard.png" alt-text="Screenshot of the save query to dashboard button in a queryset query."  lightbox="media/real-time-dashboard/pin-to-dashboard.png":::
1. In the **Pin query to dashboard** window, do the following:

    :::image type="content" source="media/real-time-dashboard/query-to-dashboard.png" alt-text="Screenshot of the pin to dashboard dialog box.":::

    1. Select an existing dashboard or create a new dashboard.
    1. Name your dashboard tile.
    1. Optionally, select **Open dashboard after tile creation** to view your dashboard immediately after creation.
    1. Select **Create**.

## Edit tile

Editing the underlying query of a tile is only possible in editing mode.

1. On the tile you want to edit, select the **Edit tile** pencil icon.

    :::image type="content" source="media/real-time-dashboard/edit-tile.png" alt-text="Screenshot of the Edit tile pencil icon in Real-Time Dashboards tile.":::

1. In the edit tile page, you can edit the query and visual formatting options.
1. The explorer pane on the left side allows you to explore the data source, view the available tables, functions, etc. and help you build your query.

    :::image type="content" source="media/real-time-dashboard/explorer-pane.png" alt-text="Screenshot of the explorer pane in Real-Time Dashboards.":::

1. Select the **Copilot** icon and describe in natural language what you want to visualize. Copilot generates a query that you can edit as needed. For more information, see [Use Copilot for writing KQL queries](copilot-writing-queries.md).

    :::image type="content" source="media/real-time-dashboard/copilot.png" alt-text="Screenshot of the Copilot icon in Real-Time Dashboards.":::

### Use Copilot in the tile editing pane

When editing a tile, Copilot can help you author or modify the KQL query using natural language. You can:

* **Generate a new query:** Enter a natural language prompt describing what you want to visualize, and Copilot creates a new KQL query from scratch.
* **Replace the current tile query:** Use Copilot to generate a new query that replaces the existing tile query entirely.
* **Refine the existing query:** Ask Copilot to modify the current query by adding filters, changing time windows, or adjusting aggregations.

After Copilot generates the query, you can review it in the Query tab, run it to preview the results, and make any manual edits before applying the changes to save the updated tile.

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

You can view the query in either viewing or editing mode.

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
