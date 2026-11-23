---
title: Customize Real-Time Dashboard Visuals
description: Learn how to customize your Real-Time Dashboard visuals.
ms.reviewer: gabil, mbar
ms.topic: how-to
ms.subservice: rti-dashboard
ms.custom:
ms.date: 08/23/2026
ai-usage: ai-assisted
---

# Customize Real-Time Dashboard visuals

Real-Time Dashboards are a collection of tiles that feature a visual representation supported by an underlying Kusto Query Language (KQL) query. This article explains how to edit the visualizations and queries of a Real-Time Dashboard tile. It also provides an overview of customization properties specific to each visualization type.

Real-Time Dashboards support all visualizations that you can create in the context of the [render operator](/azure/data-explorer/kusto/query/renderoperator?context=/fabric/context/context-rta&pivots=fabric#visualizations), along with the [dashboard-specific visuals](dashboard-visuals.md).

> [!TIP]
> You can embed Real-Time Dashboard visuals in your own web application by using [Fabric Embedded](../embed/what-is-fabric-embed.md).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* Editor permissions on a [Real-Time Dashboard](dashboard-real-time-create.md)

## Customize a dashboard tile

To make changes to your dashboard:

1. In the top menu, select **Viewing** and toggle to **Editing** mode.

1. On the tile that you want to customize, select the **Edit** icon. Edit the underlying query or the visualization properties.
1. Select **Apply changes** to save your changes and return to the dashboard.

## Customization properties

The following table describes the available customization properties, categorized alphabetically by section, and specifies which visuals support each property.

| Section | Property | Description | Visual types |
|--|--|--|--|
| **Colors** | **Color palette** | Determines the set of colors to use for the heatmap. | Heatmap |
| **Conditional formatting** | **Hide** or **Show** | A toggle option to turn off or turn on conditional formatting. For more information, see [Apply conditional formatting](dashboard-conditional-formatting.md). | Anomaly chart, Area chart, Bar chart, Column chart, KPI, Multi Stat, Scatter chart, Table, Time chart |
| **Data** | **Y columns** | The columns that provide data for the vertical axis. | Anomaly chart, Area chart, Bar chart, Column chart, Line chart, Scatter chart, Time chart |
|  | **X column** | The column that provides data for the horizontal axis. | Anomaly chart, Area chart, Bar chart, Column chart, Line chart, Scatter chart, Time chart |
|  | **Series columns** | The columns used to categorize data into different series. | Anomaly chart, Area chart, Bar chart, Column chart, Line chart, Scatter chart, Time chart |
|  | **Category column** | The column that determines the data categories. | Funnel chart, Heatmap, Pie chart |
|  | **Label column** | Assigns labels to each slot using the designated column. | Multi Stat |
|  | **Value column** | The column that provides data for the visualization. | Funnel chart, KPI, Multi stat |
|  | **Value** | The numeric column that serves as the primary variable for the heatmap. | Heatmap |
|  | **Numeric column** | The column that provides the numeric value for the data category. | Pie chart |
|  | **Define location by** | Determines the method used to define the location: **Infer**, **Latitude and longitude**, or **Geo point**. | Map |
| **Data series colors** | **Color palette** | Customizes the colors presented in the visualization. | Anomaly chart, Area chart, Bar chart, Column chart, Line chart, Pie chart, Scatter chart, Time chart, Time series chart |
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
|  | **Maximum value** | Defines the maximum value on the vertical axis. | Anomaly chart, Area chart, Bar chart, Column chart, KPI. Multi Stat, Scatter chart, Time chart |
|  | **Minimum value** | Defines the minimum value on the vertical axis. | Anomaly chart, Area chart, Bar chart, Column chart, KPI, Multi Stat, Scatter chart, Time chart |
|  | **Reference lines** | Marks a value on the chart as a reference line for visual guidance. | Anomaly chart, Area chart, Bar chart, Column chart, KPI, Multi Stat, Scatter chart, Time chart |

## Data series colors

By using data series colors, you control how colors are applied to your visuals. Instead of relying on automatic color assignments, assign specific colors to each data series to convey meaning and maintain consistency across your dashboards.

By using data series colors, you can:

* Assign colors directly to each data series.

* Override system defaults with intentional choices.

* Maintain color consistency across visuals and dashboards.

This feature is supported for the following visual types: Anomaly chart, Area chart, Bar chart, Column chart, Line chart, Pie chart, Scatter chart, Time chart, and Time series visual.

To configure data series colors:

1. In the top menu, select **Viewing** and toggle to **Editing** mode.

1. Select the **Edit** icon on the visual you want to customize.

1. In the **Visual** tab of the formatting pane, expand the **Series colors** section.

1. Select a color for each data series in your visual.

1. Select **Apply changes** to save your settings.

:::image type="content" source="media/customize-dashboard-visuals/color-series.png" alt-text="Screenshot of the Series colors section in the Visual tab." lightbox="media/customize-dashboard-visuals/color-series.png":::

When you assign colors intentionally, viewers can interpret visuals at a glance without needing to read legends or labels. Consider using colors that align with your organization's standards or that naturally convey the meaning of each series, such as red for critical states or green for healthy metrics.

## KPI visualization

A KPI tile displays a single query-based numeric value as a visual indicator. It helps you quickly assess the health or status of a metric. Use KPI tiles for monitoring scenarios where you need to answer questions like: *"Is this value healthy or problematic?" "Is it above or below a baseline target?"*

### Display modes

KPI tiles support four display modes:

| Mode | Description | Best for |
|------|-------------|----------|
| **Gauge** | A 180° arc with a needle pointing to the current value | Classic monitoring dashboards |
| **Bar** | A horizontal bar filled to reflect the current value | Compact horizontal layouts |
| **Donut** | A full 360° progress ring | Square tile layouts |
| **Number** | A large formatted number with threshold color | Dense dashboards |

### Add a KPI tile

1. In your dashboard, switch to **Editing** mode.
1. In the top menu bar, select **Add visual** and then select **KPI**.

    :::image type="content" source="media/real-time-dashboard/add-kpi-visual.png" alt-text="Screenshot of the Add visual menu with KPI selected." lightbox="media/real-time-dashboard/add-kpi-visual.png":::

1. Configure the KPI settings:
    - **Visual type**: Choose between **Bar**, **Donut**, **Gauge**, and **Number**.
    - **Data**: Select the numeric field from your query to display.
    - **Value format**: Choose **Auto**, decimals, thousands separator, or compact notation (for example, 1.2K).
    - [**Conditional formatting**](#kpi-threshold-states): Set thresholds to define the healthy, warning, and critical ranges for your KPI. You can also choose whether higher or lower values are considered worse.
    - **Reference line**: Optionally, add a baseline reference line to indicate a target or expected value.

    :::image type="content" source="media/real-time-dashboard/customize-kpi-visual.png" alt-text="Screenshot of the KPI settings pane with options for visual type, data, value format, conditional formatting, and reference line." lightbox="media/real-time-dashboard/customize-kpi-visual.png":::

1. Select **Done** to add the tile to the dashboard.
1. Select the **Save** button to save the dashboard.

> [!TIP]
> Use Copilot to create and configure KPI tiles from natural language. For example, try prompts like *"Show CPU usage as a gauge with thresholds at 70 and 90"* or *"Create a KPI for error rate with a baseline of 5%."*

### KPI threshold states

KPI tiles display one of three threshold states based on the current value and your threshold configuration:

| State | Default color | Description |
|-------|---------------|-------------|
| Good | 🟢 Green | Value is in the healthy range. |
| Warning | 🟡 Yellow | Value is approaching a critical level. |
| Critical | 🔴 Red | Value is in the problematic range. |

You can configure the threshold direction. Set **Higher is worse** for metrics like error rate or latency, or **Lower is worse** for metrics like throughput or availability. To ensure accessibility, threshold states also use pattern fills (stripes or dots) in addition to color, so they're distinguishable for color-blind users.

### KPI change detection

KPI tiles use event-driven updates rather than polling. When the data source receives new data, the KPI value updates automatically with a smooth 300 ms transition animation. If new data isn't received within 60 seconds (configurable in tile settings), a **Data stale** overlay displays with the timestamp of the last update.

### Responsive sizing

KPI tiles adapt their layout based on tile size:

| Tile size | Rendered elements |
|-----------|-------------------|
| Small (2×2 to 3×3) | Value and threshold color only. |
| Medium (4×4 to 6×6) | Value, label, unit, threshold color, and baseline marker. |
| Large (7×7 and above) | Full rendering with threshold bands, tick marks, and scale labels. |

## Related content

* [Real-Time Dashboard visual customization properties gallery](dashboard-visual-gallery.md)
* [Add a Markdown visual to a Real-Time Dashboard](dashboard-markdown-visual.md)
* [Time series analysis in Real-Time Dashboard](dashboard-time-series.md)
* [Apply conditional formatting to Real-Time Dashboard visuals](dashboard-conditional-formatting.md)
* [Troubleshoot Real-Time Dashboard visual errors](troubleshoot-dashboard-tile-error.md)
