---
title: Configure IBCS Column and Bar Charts
description: Column and bar charts standardize how you compare business metrics across categories and periods. Discover configuration tips for stacked, overlapped, and variance charts.
ms.date: 07/14/2026
ms.topic: how-to
---

# Column and bar charts

IBCS column and bar charts provide standardized visualizations for comparing business metrics across categories and time periods. Select the chart type that best fits your reporting scenario, such as comparing actual values, analyzing variances, or tracking performance over time.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## C01: Stacked column chart

Use this chart to analyze business metrics such as revenue, profit, and expenses across months, quarters, or business units and identify differences in magnitude between categories.

| Configuration option | Configuration value |
|---|---|
| Chart type | Stacked column |
| Category | Assign the dimension that defines the columns along the x-axis. The chart shows each unique value as a separate stacked column. *Example: Month*. |
| Actual(s) | Assign one or more measures to analyze. The values determine the height of each stacked column or segment. *Example: Revenue.* |
| Comparison 1-3 (vs Actuals) | Assign up to three additional measures to compare with the actual values. The chart shows each comparison measure as a separate stacked column or overlapped column for the same category.<br><br>This comparison is optional. *Example: Budget, Forecast, and Previous Year Revenue.* |
| Legend / Color by / Stacked | Assign the dimension that splits each column into stacked segments. The chart shows each unique value as a separate segment within the column. *Example: Product Category.* |

> [!TIP]
> Assign a forecast measure to the Comparison 3 data well to plot hatched bars for future data. In this example, assign *Profit-Forecast.*

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-column-bar-charts/ibcs-stacked-column-chart.jpg" alt-text="Screenshot of a stacked column chart with hatched bars to plot a forecast." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-column-bar-charts/ibcs-stacked-column-chart.jpg":::
    
## C02: Stacked bar

Use a bar chart to compare values across multiple categories, especially when category labels are long. Plot stacked bar charts to rank products, customers, regions, or departments by performance.

| Configuration option | Configuration value |
|---|---|
| Chart type | Stacked bar |
| Category | Assign the dimension that defines the columns along the y-axis. The chart shows each unique value as a separate stacked bar. *Example: Product.* |
| Actual(s) | Assign one or more measures to analyze. The values determine the height of each stacked bar or segment. *Example: Revenue.* |
| Legend / Color by / Stacked | Assign the dimension that splits each column into stacked segments. The chart shows each unique value as a separate segment within the column. *Example: Segment.* |

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-column-bar-charts/ibcs-stacked-bar-chart.png" alt-text="Screenshot of an IBCS stacked bar chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-column-bar-charts/ibcs-stacked-bar-chart.png":::

## C03: Multi-tier column

Use a column chart with variance to compare actual values against a reference value, such as budget, forecast, or prior year. The variance highlights overperformance or underperformance for each category. Use this chart to monitor business performance against targets.

| Configuration option | Configuration value |
|---|---|
| Chart type | Overlapped column |
| Category | Assign the dimension that defines the columns along the x-axis. The chart shows each unique value as a separate column. *Example: Month*. |
| Actual(s) | Assign one or more measures to analyze. The values determine the height of each column. *Example: Profit Actual.* |
| Comparison 1-3 (vs Actuals) | Assign one or more measures to compare with the actual values. The chart shows each comparison measure as an overlapping or separate column for the same category and calculates the corresponding variance from the actual and comparison values. *Example: Profit Target, Profit Forecast.* |

> [!TIP]
> * Assign a plan or target measure to the Comparison 2 data well to plot overlapped bars. In this example, assign *Profit-Target.*
> * Assign a forecast measure to the Comparison 3 data well to plot hatched bars for future data. In this example, assign *Profit-Forecast.*

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-column-bar-charts/ibcs-overlapped-column-chart.png" alt-text="Screenshot of IBCS overlapped column chart with variances." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-column-bar-charts/ibcs-overlapped-column-chart.png":::

## C04: Multi-tier bar

Use a bar chart with variance to compare actual and reference values across categories while emphasizing the variance. It's useful for analyzing performance across business units, products, or regions.

| Configuration option | Configuration value |
|---|---|
| Chart type | Waterfall + bar |
| Category | Assign the dimension that defines the columns along the y-axis. The chart shows each unique value as a separate stacked bar. *Example: Product.* |
| Actual(s) | Assign one or more measures to analyze. The values determine the height of each column. *Example: Profit-Actual.* |
| Comparison 1 (vs Actuals) | Assign the previous year's actuals measure for comparison. The chart shows the comparison measure as an overlapping or separate column for the same category  *Example: Profit - Prior Year.* |

> [!TIP]
> Assign a plan or target measure to the Comparison 1 data well to plot overlapped bars. In this example, assign *Profit-Prior Year.*

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-column-bar-charts/ibcs-overlapped-bar-chart.png" alt-text="Screenshot of IBCS overlapped bar chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-column-bar-charts/ibcs-overlapped-bar-chart.png":::
