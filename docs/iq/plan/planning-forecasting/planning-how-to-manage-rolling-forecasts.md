---
title: Create rolling forecasts
description: Learn close forecasts when actuals are available and how to extend the forecast period.
ms.date: 04/26/2026
ms.topic: how-to
---

# Enable continuous planning with rolling forecasts

Rolling forecasts continuously extend the forecast horizon. When actual data is available for a forecasted period, the forecast is closed, and the report displays the actuals.

In this section, you learn how to close forecasts and extend forecast periods.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Close forecasts

Forecasts should be closed as actuals become available. Once a forecast is closed, it can no longer be edited.

>[!TIP]
>To hide closed forecasts, deselect **Period** > **Show Closed Periods**.

1. Go to **Model** > **Period**. Select **Close Period**.
1. If multiple forecasts exist, select the forecast to close.
1. Select the forecast period to close—current or previous year, quarter, or month. A custom period can also be specified.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/close-forecast-period.png" alt-text="Screenshot of closing forecasts." lightbox="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/close-forecast-period.png":::

1. Select **Preview.** The open and closed periods are displayed. Select **Save**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/preview-open-closed-periods.png" alt-text="Screenshot of forecast period preview." lightbox="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/preview-open-closed-periods.png":::

    The forecast is closed for January and can't be edited.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/period-closed-example.png" alt-text="Screenshot of closed period." lightbox="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/period-closed-example.png":::

## Extend forecast periods

As forecast periods are closed, new future periods are added to maintain a rolling forecast.

1. Go to **Model** > **Period**. Select **Close Period**.
1. Select the period to close.
1. Select **Extend Forecast Range** and set the duration.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/extend-forecast-option.png" alt-text="Screenshot of the option to extend forecasts." lightbox="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/extend-forecast-option.png" :::

1. Review the closed and open periods. Select **Save**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/review-forecast-periods.png" alt-text="Screenshot of open and closed forecasts." lightbox="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/review-forecast-periods.png":::

    As the open forecast for April 2026 is closed, a rolling forecast is created by simultaneously extending the forecast into 2027.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/rolling-forecast.png" alt-text="Screenshot of rolling forecasts." lightbox="../media/planning-forecasting/planning-how-to-manage-rolling-forecasts/rolling-forecast.png":::
