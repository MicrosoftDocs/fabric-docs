---
title: Use predictions for statistical forecasts.
description: Learn how to generate statistical forecasts using Predict by analyzing historical data. Configure confidence intervals, seasonality, and growth factors.
ms.date: 04/26/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and use data input effectively.
---

# Generate forecasts from statistical data

Statistical forecasting applies historical trends and seasonality to generate forecasts without manual input. The prediction feature enables forward‑looking analysis by deriving future values from historical patterns. It supports the configuration of confidence interval, seasonality, and growth factor, and allows top-down or bottom-up approaches to apply forecasts across hierarchies. Results can be explored visually or in tabular form.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

* A forecast measure with blank initial values.
* The planning sheet must contain at least two years of historical data.

>[!TIP]
>The forecast configuration can be saved to a profile. Select the profile to reuse a predefined configuration.

1. Select the cell for which to create a forecast.
2. Go to **Model** > **Predict**.
3. Select More options (…) and then select **Create New Profile** and enter the profile name. If a profile already exists, select the profile.

    :::image type="content" source="../media/planning-create-statistical-forecasts/create-profile.png" alt-text="Screenshot of the creating statistical profiles." lightbox="../media/planning-create-statistical-forecasts/create-profile.png":::

4. Select the historical date range based on which predictions will be generated.
5. Select the forecast date range.

>[!TIP]
>The forecast range can extend beyond the open period. Range extension is useful when the open forecast period is short (for example, Q1 only). Predicted values are needed over a longer period to assess accuracy and get a better perspective.

1. Your data might show repeating patterns over time, known as seasonality. Select the seasonality type:

* If your data repeats at one regular interval, choose **Single Seasonality**.
  For example, sales that repeat every month.
* If your data repeats at more than one time level, choose **Multi‑Seasonality**.
  This applies when the data shows patterns at multiple intervals, such as a quarterly trend (Q1, Q2, Q3, Q4), and a monthly pattern within each quarter.

1. Set the **Confidence (%)** to indicate the level of certainty that the actual value will fall within the predicted range.
1. Set the **Growth Factor (%)** that defines the expected rate at which the predicted values increase or decrease over time.
1. Assign the **Evaluation** method:
   * To enter the forecast for a parent cell and distribute it to child categories, select **Top Down**.
   * To enter forecasts at the child level and aggregate them to the parent category, select B**ottom Up**.
1. Select **Run Forecast**.
1. Preview the predicted values in a graph:
    * Historical data points are plotted in grey.
    * Predicted data points are plotted in green.
    * The green reference band indicates the confidence interval.

    :::image type="content" source="../media/planning-create-statistical-forecasts/run-prediction.png" alt-text="Screenshot of running a prediction." lightbox="../media/planning-create-statistical-forecasts/run-prediction.png":::

1. Select **Table** to review the actual predicted values in tabular format.

    :::image type="content" source="../media/planning-create-statistical-forecasts/tabular-view-predictions.png" alt-text="Screenshot of tabular view." lightbox="../media/planning-create-statistical-forecasts/tabular-view-predictions.png":::

1. Select **Save Forecast** after parameters are adjusted to create an accurate prediction.

    :::image type="content" source="../media/planning-create-statistical-forecasts/apply-prediction.png" alt-text="Screenshot of applying predictions." lightbox="../media/planning-create-statistical-forecasts/apply-prediction.png":::

1. Predictions are generated for the selected measure and row category. As the Bottom-Up approach is used, values are automatically aggregated to the parent levels.

    :::image type="content" source="../media/planning-create-statistical-forecasts/forecast-with-prediction.png" alt-text="Screenshot of forecast with prediction." lightbox="../media/planning-create-statistical-forecasts/forecast-with-prediction.png":::

## Locking selections

When the **Predict** panel opens, the selected cell can still be changed by selecting a different visible cell on the canvas. The updated row and column selection is reflected in the Predict panel.

When the selection is locked, selecting other cells doesn't change the row or column used for prediction.

:::image type="content" source="../media/planning-create-statistical-forecasts/lock-dimension-measure.png" alt-text="Screenshot of locking selections." lightbox="../media/planning-create-statistical-forecasts/lock-dimension-measure.png":::
