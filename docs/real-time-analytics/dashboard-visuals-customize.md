---
title: Customize Real-Time Dashboard visuals
description: Learn how to customize your Real-Time Dashboard visuals.
ms.author: yaschust
author: YaelSchuster
ms.reviewer: gabil
ms.topic: how-to
ms.date: 02/21/2024
---

# Customize Real-Time Dashboard visuals

Real-Time Dashboards are a collection of tiles that feature a visual representation supported by an underlying Kusto Query Language (KQL) query. This article explains how to edit the visualizations and queries of a Real-Time Dashboard tile and provides an overview of customization properties specific to each visualization type.

All visualizations that can be created in the context of the [render operator](/azure/data-explorer/kusto/query/renderoperator?context=/fabric/context/context-rta&pivots=fabric#visualizations) along with the [dashboard-specific visuals](dashboard-visuals.md) are available in Real-Time Dashboards.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* Editor permissions on a [Real-Time Dashboard](dashboard-real-time-create.md)

## Customize a dashboard tile

To make changes in your dashboard:

1. In the top menu, select **Viewing** and toggle to **Editing** mode.

    :::image type="content" source="media/customize-dashboard-visuals/viewing-to-editing-mode.png" alt-text="Screenshot of option to switch to editing mode." lightbox="media/customize-dashboard-visuals/viewing-to-editing-mode.png":::

1. On the tile that you'd like to customize, select the **Edit** icon. Edit the underlying query or the visualization properties.

    :::image type="content" source="media/customize-dashboard-visuals/tile-edit-icon.png" alt-text="Screenshot of the tile edit icon." lightbox="media/customize-dashboard-visuals/tile-edit-icon.png":::

1. To save your changes and return to the dashboard, select **Apply changes**.

    :::image type="content" source="media/customize-dashboard-visuals/apply-changes.png" alt-text="Screenshot of the apply changes button." lightbox="media/customize-dashboard-visuals/apply-changes.png":::

## Customization properties

The following table describes the available customization properties, categorized alphabetically by section, and specifies which visuals support the given property.

| Section | Property | Description | Visual types |
|--|--|--|--|
| **Colors** | **Color palette** | Determines the set of colors to use for the heatmap. | Heatmap |
| **Conditional formatting** | **Hide** or **Show** | A toggle option to turn off or turn on conditional formatting. For more information, see [Apply conditional formatting](dashboard-conditional-formatting.md). | Anomaly chart, Area chart, Bar chart, Column chart, Multi Stat, Scatter chart, Table, Time chart |
| **Data** | **Y columns** | The columns that provide data for the vertical axis. | Anomaly chart, Area chart, Bar chart, Column chart, Line chart, Scatter chart, Time chart |
|  | **X column** | The column that provides data for the horizontal axis. | Anomaly chart, Area chart, Bar chart, Column chart, Line chart, Scatter chart, Time chart |
|  | **Series columns** | The columns used to categorize data into different series. | Anomaly chart, Area chart, Bar chart, Column chart, Line chart, Scatter chart, Time chart |
|  | **Category column** | The column that determines the data categories. | Funnel chart, Heatmap, Pie chart |
|  | **Label column** | Assigns labels to each slot using the designated column. | Multi Stat |
|  | **Value column** | The column that provides data for the visualization. | Funnel chart, Multi stat |
|  | **Value** | The numeric column that serves as the primary variable for the heatmap. | Heatmap |
|  | **Numeric column** | The column that provides the numeric value for the data category. | Pie chart |
|  | **Define location by** | Determines the method used to define the location: **Infer**, **Latitude and longitude**, or **Geo point**. | Map |
| **Display options** | **Order by** | How to order the results in the chart: **Name**, **Size**, or **None**. | Pie chart |
|  | **Top N** | Option to only show sections for the top *n* values in the chart. | Pie chart |
| **General** | **Display orientation** | Determines the orientation of the display: Horizontal or Vertical. | Multi Stat |
|  | **Text size** | Determines the size of the text: **Recommended**, **Small**, or **Large**. | Multi Stat, Stat |
|  | **Visual format** | Determines the format for the chart. For area, bar, and column charts, the format can be standard, stacked, or stacked 100%. For pie charts, the format can be pie or donut. | Area chart, Bar chart, Column chart, Pie chart |
| **Layout** | **Slot configuration** | Customizes the grid layout with options ranging from 1 column by 1 row (1 slot) to 5 columns by 5 rows (25 slots). | Multi Stat |
| **Legend** | **Hide** or **Show** | Hides or shows a legend explaining data series in the chart. | Anomaly chart, Area chart, Bar chart, Column chart, Multi Stat, Scatter chart, Time chart |
| **Size** | **Hide** or **Show** | Toggles sizing for the map points on or off. | Map |
|  | **Size column** | The column used to determine the size of the map point. | Map |
| **URLs** | **Apply link on column** | When enabled, selecting a value in this column directs to the URL specified in the **URL column**. | Table |
|  | **URL column** | The column that contains URL values. | Table |
| **X Axis** | **Label** | Sets a custom label for the horizontal axis. | Anomaly chart, Area chart, Bar chart, Column chart, Multi Stat, Scatter chart, Time chart |
|  | **Vertical line value** | Specifies a value on the horizontal axis for vertical reference lines. | Anomaly chart, Area chart, Bar chart, Column chart, Multi Stat, Scatter chart, Time chart |
|  | **X axis scale** | Adjusts the scale of the horizontal axis to **linear** or **logarithmic**. | Anomaly chart, Area chart, Bar chart, Multi Stat, Scatter chart, Table, Time chart |
| **Y Axis** | **Label** | Sets a custom label for the vertical axis. | Anomaly chart, Area chart, Bar chart, Column chart, Multi Stat, Scatter chart, Time chart |
|  | **Maximum value** | Defines the maximum value on the vertical axis. | Anomaly chart, Area chart, Bar chart, Column chart, Multi Stat, Scatter chart, Time chart |
|  | **Minimum value** | Defines the minimum value on the vertical axis. | Anomaly chart, Area chart, Bar chart, Column chart, Multi Stat, Scatter chart, Time chart |
|  | **Reference lines** | Marks a value on the chart as a reference line for visual guidance. | Anomaly chart, Area chart, Bar chart, Column chart, Multi Stat, Scatter chart, Time chart |

## Embed images

You can embed images in your dashboard tiles using Markdown text.

For more information on GitHub Flavored Markdown, see [GitHub Flavored Markdown Spec](https://github.github.com/gfm/).

1. Open a [Real-Time Dashboard](dashboard-real-time-create.md#create-a-new-dashboard).
1. In the top menu, select **Add text** to open a text tile.

    :::image type="content" source="media/customize-dashboard-visuals/add-tile.png" alt-text="Screenshot of the Home menu in a Real-Time Dashboard. The option titled Add text is highlighted.":::

1. In the query pane, paste the URL of an image located in an image hosting service using the following syntax:

    ```md
    ![](URL)
    ```

    The image renders in the tile's preview.

    :::image type="content" source="media/customize-dashboard-visuals/embed-image.png" alt-text="Screenshot of dashboard query pane showing image syntax in markdown text. ":::

1. In the top menu, select **Apply changes** to save the tile.

For more information on image syntax in GitHub Flavored Markdown, see [Images](https://github.github.com/gfm/#images).

## Related content

* [Apply conditional formatting to Real-Time Dashboard visuals](dashboard-conditional-formatting.md)
