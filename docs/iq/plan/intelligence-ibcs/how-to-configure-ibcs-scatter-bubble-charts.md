---
ai-usage: ai-assisted
title: Configure IBCS Scatter and Bubble Charts in Fabric Planning
description: IBCS scatter and bubble charts help you spot correlations, clusters, and outliers. Follow this guide to assign measures, dimensions, and bubble sizes.
ms.date: 09/15/2026
ms.topic: how-to
---

# Scatter and bubble charts

IBCS scatter and bubble charts help you visualize relationships between business measures using standardized layouts and semantic formatting. Use these charts to identify correlations, clusters, trends, and outliers while comparing data across categories.

## C09: Scattergrams

Use an IBCS scatter chart to analyze the relationship between two measures. It's useful for identifying correlations, trends, clusters, and outliers in business data, such as sales versus profit or revenue versus quantity. Use this chart to compare the distribution of data points across two numeric measures.

| Configuration option | Configuration value |
|----------------------|---------------------|
| **Chart type** | Scatter Chart |
| **Category** | Assign a dimension to define each bubble. Each category is displayed as a separate bubble. *Example: Product Subcategory.* |
| **X-Axis** | Assign a measure to plot on the x-axis. The values determine the horizontal position of each bubble. *Example: Sales, Profit, or Cost.* |
| **Y-Axis** | Assign a measure to plot on the y-axis. The values determine the vertical position of each bubble. *Example: Quantity.* |
| **Legend / Color by / Stacked** | Assign a dimension to categorize the bubbles. Each category is displayed in a different color. *Example: Segment.* |

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-scatter-bubble-charts/axis-values-assignments-scatter-chart-ibcs.png" alt-text="Screenshot of the category, x-axis, y-axis, and legend assignments used to configure an IBCS bubble chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-scatter-bubble-charts/axis-values-assignments-scatter-chart-ibcs.png":::

## C10: Bubble charts

Use an IBCS bubble chart to compare the relationship between two measures while using bubble size to represent a third measure. It's useful for analyzing metrics such as revenue, profit, and market share across products, customers, or regions. Use this chart to visualize multiple business measures in a single view.

| Configuration option | Configuration value |
|----------------------|---------------------|
| **Chart type** | Bubble Chart |
| **Category** | Assign a dimension to define each bubble. Each category is displayed as a separate bubble. *Example: Product.* |
| **X-Axis** | Assign a measure to plot on the x-axis. The values determine the horizontal position of each bubble. *Example: Profit - Actual.* |
| **Y-Axis** | Assign a measure to plot on the y-axis. The values determine the vertical position of each bubble. *Example: Profit - Target.* |
| **Size** | Assign the measure that determines the size of each bubble. *Example: Quantity sold.* |
| **Legend / Color by / Stacked** | Assign a dimension to define the bubble legend. Each category is represented by a different colored bubble. *Example: Segment.* |

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-scatter-bubble-charts/axis-values-assignments-bubble-chart-ibcs.png" alt-text="Screenshot of axis, category, legend and values parameters required to create an IBCS bubble chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-scatter-bubble-charts/axis-values-assignments-bubble-chart-ibcs.png":::
