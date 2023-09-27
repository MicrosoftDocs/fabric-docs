---
title: Customize Real-Time Dashboard visuals
description: Learn how to customize your Real-Time Dashboard visuals.
ms.author: yaschust
author: YaelSchuster
ms.reviewer: gabil
ms.topic: how-to
ms.date: 09/27/2023
---

# Customize Real-Time Dashboard visuals

Real-Time Dashboards are composed of tiles, each featuring a visual representation supported by an underlying Kusto Query Language (KQL) query. This article explains how to edit the visualizations and queries of a Real-Time Dashboard tile and provides an overview of customization properties specific to each visualization type.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* [Visualize data with Real-Time Dashboards](real-time-dashboards.md)
* Editor permissions on a Real-Time Dashboard

## Customize visuals

To make changes in your dashboard:

1. In the top menu, select **Viewing** and toggle to **Editing** mode.

    :::image type="content" source="media/customize-dashboard-visuals/viewing-to-editing-mode.png" alt-text="Screenshot of option to switch to editing mode." lightbox="media/customize-dashboard-visuals/viewing-to-editing-mode.png":::

1. On the tile that you'd like to customize, select the **Edit** icon. Edit the underlying query or the visualization properties.

    :::image type="content" source="media/customize-dashboard-visuals/tile-edit-icon.png" alt-text="Screenshot of the tile edit icon." lightbox="media/customize-dashboard-visuals/tile-edit-icon.png":::

1. To save your changes and return to the dashboard, select **Apply changes**.

    :::image type="content" source="media/customize-dashboard-visuals/apply-changes.png" alt-text="Screenshot of the apply changes button." lightbox="media/customize-dashboard-visuals/apply-changes.png":::

## Table

When **Visual type** is set to **Table**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **URLs** | **URL column** | The column that contains URL values. |
|  | **Apply link on column** | When this option is set, selecting the value in this column directs to the URL from the **URL column**. |
| **Conditional formatting** | **Hide** or **Show** | A toggle option to turn off or turn on conditional formatting. When turned on, you can add conditional formatting rules to the visualization. For more information, see [Apply conditional formatting](dashboards-conditional-formatting.md). |

## Bar chart

When **Visual type** is set to **Bar chart**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **General** | **Visual format** | Determines the format for the chart: **Bar chart**, **Stacked bar chart**, or **Stacked 100% bar chart**. |
| **Data** | **Y columns** | The columns that provide data for the vertical axis. |
|  | **X column** | The column that provides data for the horizontal axis. |
|  | **Series columns** | The columns used to categorize data into different series. |
| **Legend** | **Hide** or **Show** | Hides or shows a legend to explain the data series in the chart. |
| **Y Axis** | **Label** | Sets a custom label for the vertical axis. |
|  | **Maximum value** | Defines the maximum value on the vertical axis. |
|  | **Minimum value** | Defines the minimum value on the vertical axis. |
|  | **Y axis scale** | Adjusts the scale of the vertical axis to linear or logarithmic. |
|  | **Reference lines** | A value to mark on the chart as a reference line for visual guidance. |
| **X Axis** | **Label** | Sets a custom label for the horizontal axis. |
|  | **X axis scale** | Adjusts the scale of the horizontal axis to linear or logarithmic. |
|  | **Vertical line value** | Specifies a value on the horizontal axis for vertical reference lines. |

## Column chart

When **Visual type** is set to **Column chart**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **General** | **Visual format** | Determines the format for the chart: **Column chart**, **Stacked column chart**, or **Stacked 100% column chart**. |
| **Data** | **Y columns** | The columns that provide data for the vertical axis. |
|  | **X column** | The column that provides data for the horizontal axis. |
|  | **Series columns** | The columns used to categorize data into different series. |
| **Legend** | **Hide** or **Show** | Hides or shows a legend to explain the data series in the chart. |
| **Y Axis** | **Label** | Sets a custom label for the vertical axis. |
|  | **Maximum value** | Defines the maximum value on the vertical axis. |
|  | **Minimum value** | Defines the minimum value on the vertical axis. |
|  | **Y axis scale** | Adjusts the scale of the vertical axis to linear or logarithmic. |
|  | **Reference lines** | A value to mark on the chart as a reference line for visual guidance. |
| **X Axis** | **Label** | Sets a custom label for the horizontal axis. |
|  | **X axis scale** | Adjusts the scale of the horizontal axis to linear or logarithmic. |
|  | **Vertical line value** | Specifies a value on the horizontal axis for vertical reference lines. |

## Area chart

When **Visual type** is set to **Area chart**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **General** | **Visual format** | Determines the format for the chart: **Area chart**, **Stacked area chart**, or **Stacked 100% area chart**. |
| **Data** | **Y columns** | The columns that provide data for the vertical axis. |
|  | **X column** | The column that provides data for the horizontal axis. |
|  | **Series columns** | The columns used to categorize data into different series. |
| **Legend** | **Hide** or **Show** | Hides or shows a legend to explain the data series in the chart. |
| **Y Axis** | **Label** | Sets a custom label for the vertical axis. |
|  | **Maximum value** | Defines the maximum value on the vertical axis. |
|  | **Minimum value** | Defines the minimum value on the vertical axis. |
|  | **Y axis scale** | Adjusts the scale of the vertical axis to linear or logarithmic. |
|  | **Reference lines** | A value to mark on the chart as a reference line for visual guidance. |
| **X Axis** | **Label** | Sets a custom label for the horizontal axis. |
|  | **X axis scale** | Adjusts the scale of the horizontal axis to linear or logarithmic. |
|  | **Vertical line value** | Specifies a value on the horizontal axis for vertical reference lines. |


## Line chart

When **Visual type** is set to **Line chart**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **Data** | **Y columns** | The columns that provide data for the vertical axis. |
|  | **X column** | The column that provides data for the horizontal axis. |
|  | **Series columns** | The columns used to categorize data into different series. |
| **Legend** | **Hide** or **Show** | Hides or shows a legend to explain the data series in the chart. |
| **Y Axis** | **Label** | Sets a custom label for the vertical axis. |
|  | **Maximum value** | Defines the maximum value on the vertical axis. |
|  | **Minimum value** | Defines the minimum value on the vertical axis. |
|  | **Y axis scale** | Adjusts the scale of the vertical axis to linear or logarithmic. |
|  | **Reference lines** | A value to mark on the chart as a reference line for visual guidance. |
| **X Axis** | **Label** | Sets a custom label for the horizontal axis. |
|  | **X axis scale** | Adjusts the scale of the horizontal axis to linear or logarithmic. |
|  | **Vertical line value** | Specifies a value on the horizontal axis for vertical reference lines. |


## Stat

When **Visual type** is set to **Stat**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **General** | **Text size** | Determines the size of the text: **Recommended**, **Small**, or **Large**. |
| **Data** | **Value column** | The column that provides data for the visualization. |
| **Conditional formatting** | **Hide** or **Show** | A toggle option to turn off or turn on conditional formatting. When turned on, you can add conditional formatting rules to the visualization. For more information, see [Apply conditional formatting](dashboards-conditional-formatting.md). |

## Multi Stat

When **Visual type** is set to **Multi Stat**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **General** | **Text size** | Determines the size of the text: **Recommended**, **Small**, or **Large**. |
|  | **Display orientation** | Determines the orientation of the display: **Horizontal** or **Vertical**. |
| **Layout** | **Slot configuration** | Customizes the grid layout with options ranging from 1 column by 1 row (1 slot) to 5 columns by 5 rows (25 slots). |
| **Data** | **Label column** | Assigns labels to each slot using the designated column. |
|  | **Value column** | The column that provides data for the visualization. |
| **Conditional formatting** | **Hide** or **Show** | A toggle option to turn off or turn on conditional formatting. When turned on, you can add conditional formatting rules to the visualization. For more information, see [Apply conditional formatting](dashboards-conditional-formatting.md). |

## Pie chart

When **Visual type** is set to **Pie chart**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **General** | **Visual format** | Determines the format for the chart: **Pie** or **Donut**. |
| **Data** | **Category column** | The column that determines the data categories. |
|  | **Numeric column** | The column that provides the numeric value for the data category. |
| **Legend** | **Hide** or **Show** | Hides or shows a legend to explain the data series in the chart. |
| **Label** | **Text** | Determines what to include in the label: **Name**, **Percentage**, and **Value**. |
| **Tooltip** | **Text** | Determines what to include in the tooltip, which can be seen when hovering over a section of the chart: **Name**, **Percentage**, and **Value**. |
| **Display options** | **Order by** | How to order the results in the chart: **Name**, **Size**, or **None**. |
|  | **Top N** | Option to only show sections for the top *n* values in the chart. |

## Scatter chart

When **Visual type** is set to **Scatter chart**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **Data** | **Y columns** | The columns that provide data for the vertical axis. |
|  | **X column** | The column that provides data for the horizontal axis. |
|  | **Series columns** | The columns used to categorize data into different series. |
| **Legend** | **Hide** or **Show** | Hides or shows a legend to explain the data series in the chart. |
| **Y Axis** | **Label** | Sets a custom label for the vertical axis. |
|  | **Maximum value** | Defines the maximum value on the vertical axis. |
|  | **Minimum value** | Defines the minimum value on the vertical axis. |
|  | **Y axis scale** | Adjusts the scale of the vertical axis to linear or logarithmic. |
|  | **Reference lines** | A value to mark on the chart as a reference line for visual guidance. |
| **X Axis** | **Label** | Sets a custom label for the horizontal axis. |
|  | **X axis scale** | Adjusts the scale of the horizontal axis to linear or logarithmic. |
|  | **Vertical line value** | Specifies a value on the horizontal axis for vertical reference lines. |

## Time chart

When **Visual type** is set to **Time chart**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **Data** | **Y columns** | The columns that provide data for the vertical axis. |
|  | **X column** | The column that provides data for the horizontal axis. |
|  | **Series columns** | The columns used to categorize data into different series. |
| **Legend** | **Hide** or **Show** | Hides or shows a legend to explain the data series in the chart. |
| **Y Axis** | **Label** | Sets a custom label for the vertical axis. |
|  | **Maximum value** | Defines the maximum value on the vertical axis. |
|  | **Minimum value** | Defines the minimum value on the vertical axis. |
|  | **Y axis scale** | Adjusts the scale of the vertical axis to linear or logarithmic. |
|  | **Reference lines** | A value to mark on the chart as a reference line for visual guidance. |
| **X Axis** | **Label** | Sets a custom label for the horizontal axis. |
|  | **X axis scale** | Adjusts the scale of the horizontal axis to linear or logarithmic. |
|  | **Vertical line value** | Specifies a value on the horizontal axis for vertical reference lines. |

## Anomaly chart

When **Visual type** is set to **Anomaly chart**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **Data** | **Y columns** | The columns that provide data for the vertical axis. |
|  | **X column** | The column that provides data for the horizontal axis. |
|  | **Series columns** | The columns used to categorize data into different series. |
| **Legend** | **Hide** or **Show** | Hides or shows a legend to explain the data series in the chart. |
| **Y Axis** | **Label** | Sets a custom label for the vertical axis. |
|  | **Maximum value** | Defines the maximum value on the vertical axis. |
|  | **Minimum value** | Defines the minimum value on the vertical axis. |
|  | **Y axis scale** | Adjusts the scale of the vertical axis to linear or logarithmic. |
|  | **Reference lines** | A value to mark on the chart as a reference line for visual guidance. |
| **X Axis** | **Label** | Sets a custom label for the horizontal axis. |
|  | **X axis scale** | Adjusts the scale of the horizontal axis to linear or logarithmic. |
|  | **Vertical line value** | Specifies a value on the horizontal axis for vertical reference lines. |

## Funnel chart

A funnel chart visualizes a linear process that has sequential, connected stages.

When **Visual type** is set to **Funnel chart**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **Data** | **Category column** | The column that determines the data categories. |
|  | **Value column** | The column that provides the value for the data category. |

## Map

When **Visual type** is set to **Map**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **Data** | **Define location by** | Determines the method used to define the location: **Infer**, **Latitude and longitude**, or **Geo point**. |
|  | **Label column** | The column to use for the map point label. |
| **Size** | **Hide** | A toggle option to turn off or turn on sizing for the map points. |
|  | **Size column** | The column to use to determine the size of the map point. |

## Markdown

When **Visual type** is set to **Markdown**, the first row of the column specified in the **Column** property is rendered as Markdown.

## Heatmap

A heatmap shows values for a main variable of interest across two axis variables as a grid of colored squares.

When **Visual type** is set to **Heatmap**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **Data** | **Y column** | The column providing data for the vertical axis. If this column contains `string` values, the corresponding **X column** must also contain `string` values. If it contains `datetime` values, the **X column** must be numeric. |
|  | **X column** | The column providing data for the horizontal axis. |
|  | **Value** | The numeric column that serves as the primary variable for the heatmap. |
| **X axis** | **Label** | Sets a custom label for the horizontal axis. |
| **Y axis** | **Label** | Sets a custom label for the vertical axis. |
| **Colors** | **Color palette** | Determines the set of colors to use for the heatmap: **blue**, **green**, **purple**, **orange**, **pink**, or **yellow**. |

## Plotly

The Plotly graphics library offers extensive support for a wide range of chart types useful for advanced charting needs, including geographic, scientific, machine learning, 3D, and animation, and more. For more information, see [Plotly](/azure/data-explorer/kusto/query/visualization-plotly?pivots=fabric).

To display a Plotly visualization in your Real-Time Dashboard, your query must generate a table with a single string cell containing [Plotly JSON](https://plotly.com/chart-studio-help/json-chart-schema/). 

When **Visual type** is set to **Plotly**, the **Column** property should be set to the column containing the Plotly JSON for rendering.

## Related content

* [Apply conditional formatting to Real-Time Dashboard visuals](dashboards-conditional-formatting.md)
