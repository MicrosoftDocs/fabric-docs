---
title: Generate Statistical Forecasts Using the Predict Feature
description: Learn how to generate statistical forecasts by using the Predict feature in planning in Fabric.
ms.date: 08/10/2026
ms.topic: how-to
---

# Generate statistical forecasts by using the Predict feature

Statistical forecasting uses historical data to identify trends, seasonality, and other statistical patterns. It generates forecasts automatically without requiring manual calculations. The Predict feature enables forward-looking analysis by estimating future values from historical observations.


The Predict feature supports confidence interval, seasonality, growth factor, algorithm, and hierarchy evaluation method configuration (Top-Down or Bottom-Up), allowing forecasts across planning hierarchies. You can review forecast results in graphical and tabular formats.

## How forecasting works

The Predict feature uses the selected measure cell as a time series. It analyzes historical data within the selected historical date range and generates estimated values for the selected forecast period.

During forecasting, the system considers the following characteristics of the time series:

- **Level** – The underlying baseline value of the series.
- **Trend** – A sustained upward or downward movement over time.
- **Seasonality** – A repeating pattern that occurs at regular calendar or operational intervals.
- **Past-value relationships** – The extent to which previous observations help explain future values.
- **Past-error relationships** – The extent to which previous forecast errors improve future predictions.

## Prerequisites

Before running a statistical forecast, ensure the following conditions:


- A forecast measure exists with either blank initial values or prepopulated values.
- The planning sheet contains sufficient historical data.
  - For monthly data, provide at least **24 months** of historical data.
  - For quarterly data, provide at least **24 quarters** of historical data.
  - Some forecasting algorithms require **36** or **48** historical periods to produce more reliable forecast results.

## Configure statistical forecasts

1. Create a planning model by assigning **row** fields, **column** fields, and measures under the **value** field.

   Consider the model in the following image.

   :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/configuring-model.png" alt-text="Screenshot of a planning model configured with row fields, column fields, and measures." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/configuring-model.png":::

1. Create a forecast measure (for example, *2026 Forecast*) by selecting the required forecast period through December 2026.

   :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/forecast-measure.png" alt-text="Screenshot of creating a forecast measure for a future planning period." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/forecast-measure.png":::

1. Select the *All Row Total* cell of the *2026 Forecast* measure.

1. On the **Model** tab, select **Predict**.

   :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/predict-option.png" alt-text="Screenshot of the Predict option in the Model tab." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/predict-option.png":::

   **Row Selected** represents the hierarchy member for which the forecast is generated.

   **Measure Selected** is used as the historical input series, and forecast values are written into this measure.

   These fields are automatically populated based on the selected planning sheet cell. Selecting another visible cell updates the selected row and measure in the Predict panel.

   Lock the selection to prevent selecting another cell from changing the selected row or measure.

   :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/locking-row-measure-selection.png" alt-text="Screenshot showing locked row and measure selection in the Predict panel." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/locking-row-measure-selection.png":::

1. Specify the date ranges used for forecasting.

   **Historic Data Range** specifies the historical periods used to build the statistical model. By default, the system selects all closed periods.

   **Forecast Date Range** specifies the future periods for which forecasts are generated. By default, the system selects all open periods.

   You can modify both ranges to suit your business requirements.

   > [!NOTE]
   > The forecast period can extend beyond the open period. This extension is useful when only a short open planning horizon exists (for example, Q1 only), but you need forecasts for a longer period to support planning and forecast validation.

   :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/assigning-period-range.png" alt-text="Screenshot showing historical and forecast date range selection." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/assigning-period-range.png":::

1. Select an existing forecast profile or create a new one by selecting **More options (⋯)**.

   A **profile** is a saved collection of forecast settings that helps standardize forecast execution.

   A profile includes:

   - Confidence (%)
   - Growth Factor (%)
   - Hierarchy evaluation
   - Negative-value handling
   - Algorithm choices
   - Seasonality choices

   You can create, duplicate, delete, or reset profiles. Use descriptive profile names so forecast configurations can be easily reproduced.

   :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/setting-profile.png" alt-text="Screenshot showing forecast profile configuration." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/setting-profile.png":::

1. Set **Confidence (%)**.

   **Confidence (%)** specifies the confidence level used when generating the forecast confidence interval. It represents the probability that the actual value falls within the predicted range.

   Typical confidence level choices include:

   - **80%** – Produces a narrower confidence interval suitable for central planning.
   - **90%** – A balanced confidence level for most business forecasts.
   - **95%** – Produces a wider, more conservative confidence interval.

1. Set **Growth Factor (%)**.

   **Growth Factor (%)** applies a business adjustment to the statistical forecast. It applies a business adjustment to forecast values by increasing or decreasing the generated forecast by the specified percentage.

   Examples:

   - **5%** increases forecast values to reflect an expected business uplift.
   - **-5%** decreases forecast values.
   - **0%** preserves the statistical forecast without adjustment.

1. Choose an **Evaluation** method.

   **Bottom-Up** generates forecasts at detailed hierarchy levels and aggregates them into higher-level totals.

   **Top-Down** generates forecasts at higher hierarchy levels and distributes them into lower levels.

1. Set **Round all negative values to zero**.

    - Select **Yes** if the forecasted measure can't contain negative values.
    - Select **No** if negative values are valid for the business scenario.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/configuring-forecast-options.png" alt-text="Screenshot showing forecast configuration options, including evaluation method and negative value handling." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/configuring-forecast-options.png":::

1. Choose a forecasting **algorithm** that best matches the characteristics of your historical data.

    The following forecasting algorithms are available:

    - **Trend Decomposition with MSTL** – Breaks down complex data with multiple repeating patterns into simple parts so they're easier to handle.
    - **Exponential Smoothing** – Focuses on smooth trends and clear, single-cycle seasons, giving more weight to recent data.
    - **ARIMA** – Looks at recent spikes, drops, and lags to project where the trend is heading next.

    For more information about forecasting algorithms, statistical models, and model orders, see [Forecasting algorithms](../planning-concept-predict.md).

1. Configure **Seasonality**.

    Seasonality is a repeating pattern in data that occurs at regular intervals, such as yearly, quarterly, or both.

    Select one of the following options:

    - **Year** – Use when the pattern repeats annually.
    - **Quarter** – Use when the pattern repeats quarterly.
    - **Both** – Use when the pattern repeats annually and quarterly.

    > [!NOTE]
    > The Seasonality list doesn't display the lowest level of the time dimension.

1. Select **Run Forecast**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/setting-algorithm.png" alt-text="Screenshot showing forecasting algorithm selection." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/setting-algorithm.png":::

1. Review the forecast preview.

    The preview is available in graphical and tabular formats.

    - Historical values appear in **grey**.
    - Forecast values appear in **green**.
    - The shaded green band represents the selected confidence interval.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/preview-graphical-format.png" alt-text="Screenshot showing the graphical forecast preview with historical values, forecast values, and confidence interval." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/preview-graphical-format.png":::

    :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/preview-tabular-format.png" alt-text="Screenshot showing the tabular forecast preview." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/preview-tabular-format.png":::

1. If necessary, select **Reconfigure** or **Re-run Forecast** to adjust the forecasting parameters.

    When you're satisfied with the results, select **Save Forecast**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/save-forecast.png" alt-text="Screenshot showing the Save Forecast option." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/save-forecast.png":::

1. Apply the forecast values to a planning scenario or export the results to a CSV file.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/other-save-options.png" alt-text="Screenshot showing options to apply the forecast or export it to a CSV file." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/other-save-options.png":::

1. Generate forecasts for the selected measure and row category. When you use the Bottom-Up approach, the system automatically aggregates values to the parent levels.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/forecasted-value.png" alt-text="Screenshot showing forecast values in the planning sheet after the forecast is generated." lightbox="../media/planning-forecasting/planning-how-to-generate-statistical-forecasts-using-predict-feature/forecasted-value.png":::

## Choose a forecasting algorithm

Use the following table to help determine which forecasting algorithm best matches your data or when you have a question like **"Which algorithm should I choose?"**.

| Data pattern | Recommended algorithm |
| --- | --- |
| Stable data with no trend or seasonality | Simple Exponential Smoothing |
| Trend only | Holt's Linear Trend |
| Trend gradually weakens | Holt's Damped Trend |
| Trend with constant seasonal variation | Holt-Winters Additive |
| Trend with seasonal variation proportional to the level | Holt-Winters Multiplicative |
| Multiple seasonal patterns | MSTL |
| Non-seasonal data with autocorrelation | ARIMA |
| Seasonal data | SARIMA |
| Unsure which ETS model to use | Auto ETS |
| Unsure which ARIMA model to use | Auto ARIMA |
