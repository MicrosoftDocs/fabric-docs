---
title: Create a Real-Time Dashboard
description: Learn how to visualize data with Real-Time Dashboards.
ms.reviewer: tzgitlin
author: shsagir
ms.author: shsagir
ms.topic: how-to
ms.custom:
ms.date: 08/11/2025
ms.search.form: product-kusto, Real-Time Dashboard
---
# Create a Real-Time Dashboard

A dashboard is a collection of tiles, optionally organized in pages, where each tile has an underlying query and a visual representation. You can natively export Kusto Query Language (KQL) queries to a dashboard as visuals and later modify their underlying queries and visual formatting as needed. In addition to ease of data exploration, this fully integrated dashboard experience provides improved query and visualization performance.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

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

The Real-Time Dashboard exists within the context of a workspace. A new Real-Time dashboard is always associated with the workspace you're using when you create it.

1. Browse to the desired workspace.
1. Select **+New** > **Real-Time Dashboard**
1. Enter a dashboard name and select **Create**.

:::image type="content" source="media/real-time-dashboard/dashboard-new.png" alt-text="Screenshot of newly created Real-Time Dashboard in Real-Time Intelligence in Microsoft Fabric.":::

A new dashboard is created in your workspace.

## Add data source

Data sources are reusable references to a specific database in the same workspace as the Real-Time Dashboard. Different tiles can be based on different data sources.

1. Select the **Home** tab > **New data source**.
1. In the **Data sources** pane, select **+ Add**.

    :::image type="content" source="media/real-time-dashboard/new-data-source.png" alt-text="Screenshot of adding a new data source to a Real-Time Dashboard in Real-Time Intelligence in Microsoft Fabric.":::

1. In the **Create new data source** pane:
    1. Enter a **Data source name**.
    1. Select a **Database** from the drop-down list.
1. Select **Create**.
  
## Add tile

Dashboard tiles use Kusto Query Language snippets to retrieve data and render visuals. Each tile/query can support a single visual.

1. Select **Add tile** from the dashboard canvas or the top menu bar.

1. In the **Query** pane,
    1. Select the data source from the drop-down menu.
    1. Type the query, and the select **Run**. For more information about generating queries that use parameters, see [Use parameters in your query](dashboard-parameters.md#use-parameters-in-your-query).

    1. Select **+ Add visual**.

    :::image type="content" source="media/real-time-dashboard/query.png" alt-text="Screenshot of dashboard query in Real-Time Dashboards in Real-Time Intelligence in Microsoft Fabric.":::

1. In the **Visual formatting** tab, select **Visual type** to choose the type of visual. For more information on how to customize the visual, see [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md).
1. Select **Apply changes** to pin the visual to the dashboard.

    :::image type="content" source="media/real-time-dashboard/visual-formatting.png" alt-text="Screenshot of visual formatting pane in Real-Time Dashboards.":::

1. Select the **Save** icon.

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

1. On the **Pages** pane, select **+ Add page**.

    :::image type="content" source="media/real-time-dashboard/new-page.png" alt-text="Screenshot of adding a page to a Real-Time Dashboard in Real-Time Intelligence in Microsoft Fabric.":::

1. To name the page, select the vertical **More menu [...]** > **Rename page**.

    :::image type="content" source="media/real-time-dashboard/new-page-rename.png" alt-text="Screenshot of renaming a page in Real-Time Dashboards.":::

1. [Add tiles](#add-tile) to the page.

## Use parameters

Parameters significantly improve dashboard rendering performance, and enable you to use filter values as early as possible in the query. Filtering is enabled when the parameter is included in the query associated with your tiles. For more information about how to set up and use different kinds of parameters, see [Use parameters in Real-Time Dashboards](dashboard-parameters.md).

## Tile legend

You can change the position of the legend in your tiles and use the legend to interact with the data.

### Change the legend location

If you have edit rights on a real-time dashboard, you can change the location of the legend in your tile. Toggle to **Edit** mode and select the **Edit tile** pencil icon. In the **Visual formatting** pane, under **Legend**, you can select your location preference.

### Interact with your data

You can use the legend to interact with the data in your tile. You can change what data you view by selecting the specific item in the legend. Use <kbd>Ctrl</kbd> to add or remove items from the selection, hold <kbd>shift</kbd> to select a range. Items not selected are greyed out.

The **Search** button allows you to search and filter items.

Use the **Invert** button to invert your selection.

The **Up** and **Down** arrows navigate through the list in the following ways:

* When one item is selected, the up and down arrows select the previous or next item.
* When more than one item is selected, the up and down arrows scroll through the list of items, and the data for any selected items you navigate to is highlighted.

:::image type="content" source="media/real-time-dashboard/interactive-legend.png" alt-text="Screenshot showing the buttons to use the legend to interact with your data.":::

## View query

You can view the query in either editing or viewing mode.

1. On the tile you want to explore, select the **More menu [...]** > **View query**.

    A pane opens with the query and results table.

1. Select **Edit query**.
1. Choose either **Existing KQL Queryset** or **New KQL Queryset**. Proceed to edit the query in the [KQL Queryset](kusto-query-set.md).

    :::image type="content" source="media/dashboard-view-query/view-query-viewing-mode.png" alt-text="Screenshot of the viewing mode of Real-Time Dashboards view query with options to further edit in KQL Queryset in Real-Time Intelligence in Microsoft Fabric.":::

> [!NOTE]
> Any edits made to the query using this flow won't be reflected in the original Real-Time Dashboard.

## Edit tile

Editing the underlying query of a tile is only possible in editing mode.

1. On the tile you want to edit, select the **Edit tile** pencil icon.

    :::image type="content" source="media/real-time-dashboard/edit-tile.png" alt-text="Screenshot of the Edit tile pencil icon in Real-Time Dashboards tile.":::

1. In the active pane, you can edit the query and visual formatting options.
1. The explorer pane on the left side allows you to explore the data source and select tables and/or columns to add to the query.

    :::image type="content" source="media/real-time-dashboard/explorer-pane.png" alt-text="Screenshot of the explorer pane in Real-Time Dashboards.":::

## Enable auto refresh

Auto refresh is a feature that allows you to automatically update the data on a dashboard without manually reloading the page or clicking a refresh button.

The default auto refresh rate can be set by a database editor. Both editors and viewers can change the actual rate of auto refresh while viewing a dashboard.

However, database editors can limit the minimum refresh rate that any viewer can set so as to reduce the cluster load. When the minimum refresh rate is set, database users can't set a refresh rate lower than the minimum.

1. Select the **Manage** tab > **Auto refresh**.
1. Toggle the option so auto refresh is **Enabled**.
1. Select values for **Minimum time interval** and **Default refresh rate**.
1. Select **Apply** and then **Save** the dashboard.

    :::image type="content" source="media/real-time-dashboard/auto-refresh.png" alt-text="Screenshot of auto refresh pane in Real-Time Dashboards.":::

## Share the dashboard

To share the dashboard link:

1. Select **Share** and then select **Copy link**
1. In the **Dashboard permissions** window, select **Copy link**.

## Export dashboards

Use the file menu to export a dashboard to a JSON file. Exporting dashboard can be useful in the following scenarios:

* **Version control**: You can use the file to restore the dashboard to a previous version.
* **Dashboard template**: You can use the file as template for creating new dashboards.
* **Manual editing**: You can edit the file to modify the dashboard. The file can be imported back to the dashboard.

To export a dashboard, in the dashboard, select the **Manage** tab > **|-> Export to file**.

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
      "layout": { "x": 0, "y": 7, "width": 6, "height": 5 },
      "pageId": "{GUID}",
      "visualType": "line",
      "dataSourceId": "{GUID}",
      "visualOptions": {
        "xColumn": { "type": "infer" },
        "yColumns": { "type": "infer" },
        "yAxisMinimumValue": { "type": "infer" },
        "yAxisMaximumValue": { "type": "infer" },
        "seriesColumns": { "type": "infer" },
        "hideLegend": false,
        "xColumnTitle": "",
        "yColumnTitle": "",
        "horizontalLine": "",
        "verticalLine": "",
        "xAxisScale": "linear",
        "yAxisScale": "linear",
        "crossFilterDisabled": false,
        "crossFilter": { "dimensionId": "dragX-timeRange", "parameterId": "{GUID}" },
        "multipleYAxes": {
          "base": { "id": "-1", "columns": [], "label": "", "yAxisMinimumValue": null, "yAxisMaximumValue": null, "yAxisScale": "linear", "horizontalLines": [] },
          "additional": []
        },
        "hideTileTitle": false
      },
      "usedParamVariables": [ "{PARAM}" ]
    }
  ],
  "dataSources": [ {} ],
  "$schema": "https://dataexplorer.azure.com/static/d/schema/20/dashboard.json",
  "autoRefresh": { "enabled": true, "defaultInterval": "15m", "minInterval": "5m" },
  "parameters": [ {} ],
  "pages": [ { "name": "Primary", "id": "{GUID}" } ],
  "schema_version": "20"
}
```

## Update or restore an existing dashboard from a file

You can update an existing dashboard, or restore a previous version, as follows:

1. In the dashboard, select the **Manage** tab > **Replace with file**.
1. Select the file to update the dashboard.
1. Select **Save**.

## Related content

* [Use parameters in Real-Time Dashboards](dashboard-parameters.md)
* [Real-Time Dashboard-specific visuals](dashboard-visuals.md)
* [Apply conditional formatting in Real-Time Dashboard visuals](dashboard-conditional-formatting.md)
* [Create [!INCLUDE [fabric-activator](includes/fabric-activator.md)] alerts from a Real-Time Dashboard](data-activator/activator-get-data-real-time-dashboard.md)
