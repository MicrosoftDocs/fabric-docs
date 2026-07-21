---
title: IBCS Waterfall Charts for Financial Analysis
description: IBCS waterfall charts help you visualize how positive and negative values drive net change. Learn how to configure column, bar, and vertical waterfall charts today.
ms.date: 07/17/2026
ms.topic: how-to
---

# Waterfall charts

IBCS waterfall charts help explain how positive and negative values contribute to a net change between a starting and ending value. Use these charts to visualize business drivers such as revenue, costs, profit, and variances by using standardized IBCS layouts and semantic formatting.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## C05: Columns with waterfall

Use an IBCS columns with waterfall chart to show how incremental increases and decreases contribute to a final value by using vertical columns. It's best suited for financial statements, profit and loss analysis, and budget-to-actual reconciliations.

| Configuration option   | Configuration value |
| --- | --- |
| **Chart type** | Waterfall + column |
| **Category** | Assign the dimension that defines the categories on the x-axis. The waterfall shows each category as a unique column. *Example: Month.* |
| **Actual(s)** | Assign one measure to analyze. The values determine the height of each column. *Example: Profit - Actual.* |
| **Comparison 1–3 (vs Actuals)** | Assign prior-year, plan, and forecast measures to compare with actual values. The chart shows each comparison measure as an overlapping or separate column for the same category and calculates the corresponding variance from the actual and comparison values. *Example: Profit - Prior Year, Profit - Target, Profit - Forecast.* |

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-columns-waterfall.jpg" alt-text="Screenshot of an IBCS waterfall chart with columns to show actuals, plan, and forecast values." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-columns-waterfall.jpg":::

## C06: Bars with vertical waterfall

Use an IBCS bars with vertical waterfall chart to visualize cumulative changes by using horizontal bars. It's useful for comparing contributions across categories with long labels, such as departments, products, or cost centers.

| Configuration option | Configuration value |
| --- | --- |
| **Chart type** | Waterfall + bar |
| **Category** | Assign the dimension that defines the categories on the y-axis. The chart shows each category as a unique bar in the waterfall. *Example: Month.* |
| **Actual(s)** | Assign one measure to analyze. The values determine the length of each bar. *Example: Profit - Actual.* |
| **Comparison 1–3 (vs Actuals)** | Assign prior-year, plan, and forecast measures to compare with actual values. The chart shows each comparison measure as an overlapping or separate bar for the same category and calculates the corresponding variance from the actual and comparison values. *Example: Profit - Prior Year, Profit - Target, Profit - Forecast.* |

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-bars-waterfall.jpg" alt-text="Screenshot of an IBCS waterfall chart with bars to show actuals, plan, and forecast values." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-bars-waterfall.jpg":::

## C12: Vertical waterfall

Use a vertical IBCS waterfall chart to emphasize the progression from a starting value to an ending value across sequential business events or reporting periods. This chart commonly explains changes in cash flow, operating profit, or revenue. Use this chart when the order of contributions is an important part of the analysis.

| Configuration option | Configuration value |
| --- | --- |
| **Chart type** | Side by side waterfall |
| **Category** | Assign the dimension that defines the categories on the x-axis. The chart shows each category as a separate waterfall column. *Example: Income statement line items.* |
| **Actual(s)** | Assign one measure to analyze. The values determine the height of each bar in the first waterfall. *Example: AC.* |
| **Comparison 1 (vs Actuals)** | Assign a measure to compare against actuals. The values determine the height of each bar in the second waterfall. The lollipop and bar charts show the absolute and relative variance between the actual and comparison measures. *Example: PY.*

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-vertical-waterfall.png" alt-text="Screenshot of a side-by-side waterfall chart with IBCS formatting applied and variances plotted as bar and pin charts.":::

Additional configuration steps for the C12 vertical waterfall chart:

1. In the chart ribbon (in this example, **Side by side waterfall**), go to **Sort**, then set the sorting method to **Native** and **By** to **Axis**.
1. Select a bar to use the on-object interaction menu. Convert the bars to result bars.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-vertical-waterfall-result-bar.png" alt-text="Screenshot of using the on-object interaction menu to plot result bars in an IBCS waterfall chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-vertical-waterfall-result-bar.png":::

1. Select bars that represent expenses or costs and use the on-object interaction menu to invert them.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-verticall-waterfall-invert.png" alt-text="Screenshot of using the on-object interaction menu to invert bars for costs and expenses in an IBCS waterfall chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-verticall-waterfall-invert.png":::

1. In the **Side by side waterfall** ribbon, go to **Settings** > **Others** and enable **Category sign** to show plus, minus, and equal to symbols against each category.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-waterfall-show-sign.png" alt-text="Screenshot of showing positive and negative signs for each bar in an IBCS waterfall chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-waterfall-show-sign.png":::

The following screenshot shows the C12 vertical waterfall:

:::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-waterfall-final.png" alt-text="Screenshot of an IBCS vertical waterfall chart." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-waterfall-charts/ibcs-waterfall-final.png":::
