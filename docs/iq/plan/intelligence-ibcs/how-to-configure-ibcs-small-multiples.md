---
title: Configure IBCS Small Multiples Charts in Fabric Planning
description: Small multiples charts let you compare one metric across many categories using consistent scales and formatting. Learn how to configure the IBCS template.
ms.date: 09/15/2026
ms.topic: how-to
---

# Small multiples

Use the IBCS small multiples template to compare the same metric across multiple categories in a consistent layout. Each panel uses the same scale and formatting, making it easier to identify patterns and differences.

> [!TIP]
> Small multiples work best with chart types that share a common scale and are intended for repeated comparison across categories.

| Configuration option | Configuration value |
|---|---|
| **Chart type** | Bar, Column, Area, Line, or Waterfall |
| **Category** | Assign the dimension that defines the columns along the x-axis. The chart displays each unique value as a separate column. *Example: Month.* |
| **Actual(s)** | Assign one or more measures to analyze. The values determine the height of each stacked column or segment. *Example: Profit - Actual.* |
| **Comparison 1-3 (vs Actuals)** | Assign up to three additional measures to compare with the actual values. The chart displays each comparison measure as a separate column or an overlapped column for the same category. This option is optional. *Example: Profit - Prior Year, Profit - Forecast.* |
| **Trellis Row** | Assign a dimension to plot trellis panels. Each category is shown as a separate chart. *Example: Product.* |

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-small-multiples/data-assignment-small-multiples-ibcs.png" alt-text="Screenshot of assigning category, actuals, comparison, and trellis parameters to render a small multiples chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-small-multiples/data-assignment-small-multiples-ibcs.png":::
