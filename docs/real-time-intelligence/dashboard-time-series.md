---
title: Time series analysis in Real-Time Dashboard
description: Learn how to use the Time Series visualization and KQL capabilities for time series analysis in Real-Time Dashboards in Microsoft Fabric.
ms.reviewer: mibar
ms.topic: concept-article
ms.subservice: rti-dashboard
ms.date: 06/29/2026
ai-usage: ai-assisted
---

# Time series analysis in Real-Time Dashboard (preview)

Time series analysis helps you understand how data behaves over time. Whether you're tracking sensor readings, monitoring system performance, or analyzing business trends, visualizing and exploring time-based data leads to better decisions. Real-Time Dashboards in Microsoft Fabric provide tools for both visual exploration and code-based analysis of Time series data.

This article introduces the Time Series visualization for Real-Time Dashboards and provides an overview of Kusto Query Language (KQL) capabilities for advanced Time series analysis.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## When to use Time series analysis

Time series analysis is useful when data changes over time and patterns matter. Common use cases include:

- **IoT and equipment monitoring**: Compare sensor readings against historical patterns to identify equipment drifting out of tolerance or approaching failure.
- **Operational analytics**: Track application response times, error rates, or throughput over time. Navigate through service tiers or geographic regions to find performance bottlenecks.
- **Business trend analysis**: Analyze sales, revenue, or customer engagement patterns across time periods. Compare this quarter to last quarter, or this year to the same period last year, with aligned timeframes that make seasonal patterns visible.
- **Anomaly detection**: Identify unexpected spikes, dips, or deviations from normal baseline patterns in your data.

## Time series visualization

The Time series visual in Real-Time Dashboards provides dedicated capabilities for navigating, comparing, and customizing Time series data. Unlike traditional charts, this visual is designed for the unique characteristics of time-based data: trends that emerge over periods, seasonal patterns, and anomalies.

:::image type="content" source="media/dashboard-time-series/time-series-chart.png" alt-text="Screenshot of a Time series visual." lightbox="media/dashboard-time-series/time-series-chart.png":::

### Navigate multivariate data

Time series datasets often contain dozens or even hundreds of metrics. A single dashboard tile tracking machine performance across a factory floor might display readings from every sensor on every piece of equipment. The Time series visual provides tools to find the data that matters:

- **Legend search**: Use the legend search bar to locate specific data series by name.
- **Series selection**: Select a series from the chart or legend, and corresponding elements highlight automatically.
- **Entities panel**: View your data series in a hierarchical tree structure based on your entity selections. Filter the list to find specific series, expand or collapse groups, and use checkboxes to show or hide individual series in the chart.
- **Navigation tree**: For datasets with logical groupings, such as sensors organized by machine or metrics organized by region, navigate through groups using the navigation tree on the right.

### Adjust the timeline

The Time series visual renders multiple measures as separate charts, each with its own time axis and synchronized time slider. As you adjust the time range, all charts update together, keeping your analysis aligned across different metrics.

Use the time slider to:

- Drag to select a specific timeframe.
- Enter exact values to render all charts in a specific timeframe.
- Zoom in on areas of interest while maintaining context.

:::image type="content" source="media/dashboard-time-series/adjust-timeline.png" alt-text="Screenshot of the Time series visual with the time slider highlighted." lightbox="media/dashboard-time-series/adjust-timeline.png":::

### Customize your visual

The Time series visual editor gives you control over how you organize and display your data. In the **Data** section, define your Time series structure by selecting:

- **Measured entities**: The dimensions that categorize your data, such as region, machine, or event type.
- **Measured data**: The numeric values you want to track over time.

Additional customization options include:

| Option | Description |
|--------|-------------|
| Y-axis scaling | Choose between global, separate, or adaptive scaling with outlier removal. |
| Color assignments | Assign colors via color picker or palette. |
| Zoom controls | Zoom in and out on the data. |
| Axis scales | Switch between linear and logarithmic axis scales. |

For more information on customizing Time series visuals, see [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md#time-series-visual-preview).

## Advanced Time series analysis with KQL

For deeper analysis beyond visual exploration, KQL provides native support for creating, processing, and analyzing Time series data. By using KQL, you can:

- **Create Time series**: Use the `make-series` operator to aggregate data into regular time bins, fill in missing values, and partition by dimensions.
- **Filter and smooth data**: Apply moving averages and other filtering techniques to reduce noise and highlight trends.
- **Detect trends and seasonality**: Identify linear trends, trend changes, and periodic patterns in your data.
- **Detect anomalies**: Find outliers and unexpected deviations from baseline patterns.
- **Forecast future values**: Predict upcoming values by extrapolating seasonal and trend components.

For more information about KQL Time series capabilities, see:

- [Time series analysis](/kusto/query/time-series-analysis?view=microsoft-fabric&preserve-view=true)
- [Anomaly detection and forecasting](/kusto/query/anomaly-detection?view=microsoft-fabric&preserve-view=true)

## Related content

- [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md)
- [Real-Time Dashboard-specific visuals](dashboard-visuals.md)
- [Create a Real-Time Dashboard](dashboard-real-time-create.md)
