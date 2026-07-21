---
title: IBCS Area and Line Charts to Visualize Trends
description: IBCS line charts track KPIs like revenue, profit, and expenses across time periods. Discover how to configure trend lines and deviations for consistent reporting.
ms.date: 07/18/2026
ms.topic: how-to
---

# Area and line charts

IBCS area and line charts help you visualize trends, patterns, and changes over time by using standardized layouts and semantic formatting. Use these charts to track business performance, compare actual and reference values, and communicate trends consistently across reports.

## C07: Line chart

An IBCS line chart visualizes trends and changes across sequential time periods. It works best for tracking KPIs such as revenue, profit, expenses, or inventory over time. Use it to analyze growth patterns, seasonal trends, and changes in performance.

| Configuration option | Configuration value |
|---|---|
| Chart type | Line |
| Category | Assign the dimension that defines the columns along the x-axis. *Example: Month*. |
| Actual(s) | Assign one or more measures to analyze. The values determine the position of each data point on the y-axis, and the connected points form the trend line. *Example: Profit - Actual*. |
| Comparison 1 (vs Actuals) | Assign the previous year's actuals measure for comparison. The chart shows the comparison measure as a second line. This comparison is optional. *Example: Profit - Prior Year*. |
| Comparison 3 (vs Actuals) | Assign a forecast measure for comparison. The chart shows the comparison measure as a dotted line for the forecast period. This comparison is optional. *Example: Profit - Forecast*. |

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/ibcs-line-assign-data.png" alt-text="Screenshot of measure and dimension assignments for an IBCS line chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/ibcs-line-assign-data.png":::

1. In the **Line** ribbon, select **Series**. Deselect the variance series (the column and lollipop charts) to show only the line chart.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/ibcs-line-select-series.jpg" alt-text="Screenshot of removing the variance series to show in the chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/ibcs-line-select-series.jpg":::

1. Select **Deviation** > **Customize** > **Display** and select **Create your own**. Select **Apply**, and then select the points to plot the deviation.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/show-deviation.jpg" alt-text="Screenshot of adding a deviation line between selected points in the chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/show-deviation.jpg":::

1. To customize the series colors, in the chart ribbon (in this example, **Line**), go to **Settings** > **Canvas** > **Category format** and select the colors to apply.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/customize-line-series-colors.png" alt-text="Screenshot of setting custom line colors from canvas settings." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/customize-line-series-colors.png":::

## C08: Area chart

IBCS area charts emphasize the magnitude of values while showing trends over time. The shaded area highlights cumulative values, making it easier to compare the overall volume of business metrics such as sales, cash flow, or production. Use this chart when both trend and magnitude are important to the analysis.

| Configuration option | Configuration value |
|---|---|
| Chart type | Stacked area |
| Category | Assign the dimension that defines the columns along the x-axis. *Example: Month*. |
| Actual(s) | Assign one or more measures to analyze. The values determine the position of each data point on the y-axis, and the connected points form the trend line. *Example: Profit - Actual*. |
| Legend / Color by / Stacked | Assign a dimension to split the measure into separate series. The chart plots each unique value as a distinct area and stacks the areas to show the cumulative total. *Example: Region*. |

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/ibcs-area-chart-data-assignment.png" alt-text="Screenshot of the dimension and measure assignment for an IBCS area chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/ibcs-area-chart-data-assignment.png":::

To customize the series colors, in the chart ribbon (in this example, **Stacked area**), go to **Settings** > **Canvas** > **Stack groups** and select the colors to apply.

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/ibcs-area-customize-colors.jpg" alt-text="Screenshot of an IBCS area chart with custom colors." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-line-area-charts/ibcs-area-customize-colors.jpg":::
