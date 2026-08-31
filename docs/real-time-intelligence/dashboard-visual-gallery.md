---
title: Real-Time Dashboard Visual Gallery
description: Overview of the visual capabilities available in Real-Time Dashboards and how to customize them.
ms.reviewer: gabil, mbar
ms.topic: reference
ms.subservice: rti-dashboard
ms.custom:
ms.date: 08/23/2026
ai-usage: ai-assisted
---

# Dashboard visual gallery

Real-Time Dashboards help you transform query results into interactive visuals that support monitoring, troubleshooting, and decision-making. Whether you're tracking system health, analyzing trends, monitoring business metrics, or investigating operational issues, you can create a dashboard that combines multiple visual types into a single experience. Real-Time Dashboards support a wide range of charts, tables, maps, KPI indicators, and dashboard-specific visuals.

This article provides an overview of the visual capabilities available in Real-Time Dashboards and how you can customize and organize them to tell your data story effectively.

## Choose the right visual for your data

Each dashboard tile combines a Kusto Query Language (KQL) query with a visual representation of the query results. Different visual types help answer different questions. For example:

- Use time-based charts to monitor trends and detect changes over time.
- Use bar, column, pie, and funnel charts to compare categories and distributions.
- Use tables to inspect detailed records.
- Use KPI, Stat, and Multi Stat visuals to highlight important metrics.
- Use maps to visualize geographical data.
- Use heatmaps to identify concentration and patterns across dimensions.

For a complete list of supported visual types and their use cases, see [Supported visuals in Real-Time Dashboards](dashboard-supported-visuals.md).

## Build and edit dashboard visuals

Dashboard authors can add new visuals, modify existing tiles, and update the underlying query at any time. In editing mode, you can:

- Add new visual tiles.
- Change a visual type.
- Edit the underlying KQL query.
- Configure visual-specific settings.
- Update formatting and display options.

Real-Time Dashboards also support Copilot-assisted authoring, allowing you to create and modify visuals using natural language prompts.

## Organize your dashboard layout

A dashboard is a collection of visual tiles that can be arranged to support the way users consume information. After adding visuals, you can organize them into a meaningful layout by:

- Drag-and-drop to move tiles to different positions.
- Resize tiles to emphasize important information.
- Add markdown content for instructions, context, or documentation.

Effective layouts help viewers quickly identify the most important metrics and understand relationships between different visualizations.

## Customize visual appearance

Most visual types include formatting options that control how data is displayed. Depending on the visual, you can customize:

- Colors and color palettes.
- Axis labels and scales.
- Legends and series presentation.
- Data aggregation and grouping.
- Reference lines and target indicators.
- Layout and display orientation.
- Time ranges and zoom behavior.
- Data series colors for consistent visual storytelling.

These settings help you tailor visuals to your audience and make important patterns easier to identify.

For detailed customization options, see [Customize dashboard visuals](dashboard-visuals-customize.md).

## Highlight important data with conditional formatting

Conditional formatting helps viewers focus on values that require attention. You can apply rules that change colors, display icons, or add tags when specific conditions are met. Depending on the visual type, conditional formatting can:

- Highlight critical values.
- Emphasize warnings and thresholds.
- Color individual cells or entire rows.
- Apply color gradients based on data values.
- Change KPI states based on configured thresholds.

For step-by-step instructions, see [Apply conditional formatting in Real-Time Dashboard visuals](dashboard-conditional-formatting.md).

## Specialized visual experiences

Some scenarios benefit from dashboard-specific visuals and capabilities, including:

- [KPI visuals](dashboard-visuals-customize.md#kpi-visualization) for operational monitoring and threshold tracking.
- [Time Series visuals](dashboard-time-series.md) for analyzing multiple measures over time.
- [Markdown visuals](dashboard-markdown-visual.md) for contextual information and documentation.

Each visual type includes its own configuration options and best practices.

## Next steps

- Learn about [supported visual types](dashboard-supported-visuals.md).
- [Customize dashboard visuals](dashboard-visuals-customize.md).
- Apply [Conditional formatting in Real-Time Dashboard visuals](dashboard-conditional-formatting.md).
- Use [Parameters in Real-Time Dashboards](dashboard-parameters.md).
