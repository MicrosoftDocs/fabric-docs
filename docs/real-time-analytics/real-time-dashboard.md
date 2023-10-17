---
title: Visualize data with Real-Time Dashboards
description: Learn how to visualize data with Real-Time dashboards
ms.reviewer: tzgitlin
author: YaelSchuster
ms.author: yaschust
ms.topic: how-to
ms.date: 09/27/2023
ms.search.form: product-kusto, Real-Time Dashboard
---
# Visualize data with Real-Time Dashboards

A dashboard is a collection of tiles, optionally organized in pages, where each tile has an underlying query and a visual representation. You can natively export Kusto Query Language (KQL) queries to a dashboard as visuals and later modify their underlying queries and visual formatting as needed. In addition to ease of data exploration, this fully integrated dashboard experience provides improved query and visualization performance.

> [!IMPORTANT]
> Your data is secure. Dashboards and dashboard-related metadata about users are encrypted at rest using Microsoft-managed keys.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with data

## Create a new dashboard

The Real-Time Dashboard exists within the context of a workspace. A new Real-Time dashboard is always associated with the workspace you're using when you create it.

1. Browse to the desired workspace.
1. Select **+New** > **Real-Time Dashboard**
1. Enter a dashboard name and select **Create**.

:::image type="content" source="media/real-time-dashboard/dashboard-new.png" alt-text="Screenshot of newly created Real-Time Dashboard in Real-Time Analytics in Microsoft Fabric.":::

## Add data source

Data sources are reusable references to a specific database in the same workspace as the Real-Time Dashboard. Different tiles can be based on different data sources.

1. Select the **Manage** tab > **Data sources**
1. In the **Data sources** pane, select **+ New data source**.

    :::image type="content" source="media/real-time-dashboard/new-data-source.png" alt-text="Screenshot of adding a new data source to a Real-Time Dashboard in Real-Time Analytics in Microsoft Fabric.":::

1. In the **Create new data source** pane:
    1. Enter a **Data source name**.
    1. Select a **Database** from the drop-down list.

## Add tile

Dashboard tiles use Kusto Query Language snippets to retrieve data and render visuals. Each tile/query can support a single visual.

1. Select **Add tile** from the dashboard canvas or the top menu bar.

1. In the **Query** pane,
    1. Select the data source from the drop-down menu.
    1. Type the query, and the select **Run**. For more information about generating queries that use parameters, see [Use parameters in your query](dashboards-parameters.md#use-parameters-in-your-query).

    1. Select **+ Add visual**.

    :::image type="content" source="media/real-time-dashboard/query.png" alt-text="Screenshot of dashboard query in Real-Time Dashboards in Real-Time Analytics in Microsoft Fabric.":::

1. In the **Visual formatting** tab, select **Visual type** to choose the type of visual.
1. Select **Apply changes** to pin the visual to the dashboard.

    :::image type="content" source="media/real-time-dashboard/visual-formatting.png" alt-text="Screenshot of visual formatting pane in Real-Time Dashboards.":::
1. You can resize the visual and then select the **Save** icon.

    :::image type="content" source="media/real-time-dashboard/save-dashboard.png" alt-text="Screenshot of dashboard tile with save highlighted in a red box.":::

## Add page

Pages are optional containers for tiles. You can use pages to organize tiles into logical groups, such as by data source or by subject area. You can also use pages to create a dashboard with multiple views, such as a dashboard with a drillthrough from a summary page to a details page.

1. On the **Pages** pane, select **+ Add page**.

    :::image type="content" source="media/real-time-dashboard/new-page.png" alt-text="Screenshot of adding a page to a Real-Time Dashboard in Real-Time Analytics in Microsoft Fabric.":::

1. To name the page, select the vertical **More menu [...]** > **Rename page**.

    :::image type="content" source="media/real-time-dashboard/new-page-rename.png" alt-text="Screenshot of renaming a page in Real-Time Dashboards.":::

1. [Add tiles](#add-tile) to the page.

## Enable auto refresh

Auto refresh is a feature that allows you to automatically update the data on a dashboard without manually reloading the page or clicking a refresh button.

The default auto refresh rate can be set by a database editor. Both editors and viewers can change the actual rate of auto refresh while viewing a dashboard.

However, database editors can limit the minimum refresh rate that any viewer can set so as to reduce the cluster load. When the minimum refresh rate is set, database users can't set a refresh rate lower than the minimum.

1. Select the **Manage** tab > **Auto refresh**.
1. Toggle the option so auto refresh is **Enabled**.
1. Select values for **Minimum time interval** and **Default refresh rate**.
1. Select **Apply** and then **Save** the dashboard.

    :::image type="content" source="media/real-time-dashboard/auto-refresh.png" alt-text="Screenshot of auto refresh pane in Real-Time Dashboards.":::

## Use parameters

Parameters significantly improve dashboard rendering performance, and enable you to use filter values as early as possible in the query. Filtering is enabled when the parameter is included in the query associated with your tiles.  For more information about how to set up and use different kinds of parameters, see [Use parameters in Real-Time Dashboards](dashboards-parameters.md).

### Share the dashboard

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

### Update or restore an existing dashboard from a file

You can update an existing dashboard, or restore a previous version, as follows:

1. In the dashboard, select the **Manage** tab > **Replace with file**.
1. Select the file to update the dashboard.
1. Select **Save**.
