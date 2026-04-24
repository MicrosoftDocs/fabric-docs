---
title: Configure closed periods, aggregation, and general forecast settings
description: Learn how to extend open periods, adjust and reopen closed periods, and set the aggregation method for 
ms.date: 04/22/2026
ms.topic: how-to
---

# Configure forecast settings

Keep forecasts aligned with reporting cycles by editing the forecast period, managing closed periods, configuring aggregation, and defining how actuals update forecast results.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Prerequisites

* A forecast measure must be created in the planning sheet.

## Editing forecasts

Select **Planning** > **Insert Column** > **Manage Measures** and select the edit icon for the forecast measure.

>[!TIP]
>You can also edit forecasts by selecting **Edit Measure** from the column gripper.

The following edit options are available:

* To extend or shorten the open period, select the end period in **Forecast Period**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/edit-forecast-period.png" alt-text="Screenshot of editing the forecast period." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/edit-forecast-period.png":::

    The open forecast is shortened until Q3, and the Q4 forecast is removed.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/edit-forecast-period-result.png" alt-text="Screenshot of shortening the forecast period." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/edit-forecast-period-result.png":::

* Use **Closed Period Range** to reopen forecasts. Select the period up to which closed forecasts should be reopened.

    >[!TIP]
    >Select **Reset closed period range** to reopen all closed forecast periods.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/edit-closed-period-range.png" alt-text="Screenshot of option to extend or shorten the closed period range." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/edit-closed-period-range.png":::

    The Q2 forecast is reopened.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/reopen-forecast.png" alt-text="Screenshot of reopening closed forecasts." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/reopen-forecast.png":::

* To change the values used to populate open and closed forecasts, select **Re-configure** and edit the default value configuration.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/reconfigure-default-values.png" alt-text="Screenshot of options to change the values used to initialize closed and open forecasts." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/reconfigure-default-values.png":::

## Set aggregation for forecast column totals

When the grand total or subtotal columns are enabled, configure how the forecast measure total is calculated:

* To calculate the total as the sum of open and closed forecast periods, set **Aggregate total** to **All Periods**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/set-aggregation.png" alt-text="Screenshot of option to set aggregation method for forecast total and subtotal columns." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/set-aggregation.png":::

* To calculate the total as the sum of closed forecast periods, set **Aggregate total** to **Closed Periods**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/aggregation-closed-periods.png" alt-text="Screenshot of forecast aggregation set to closed periods." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/aggregation-closed-periods.png":::

* To include only open forecasts in the total, set **Aggregate total** to **Open Periods**.

## Control forecast updates from actuals

Define how the forecast responds as actuals are loaded: replace forecast values with actuals or keep forecast values unchanged.

To replace forecasted values with actuals as they become available, set **Closed Period** to **Measure**.

:::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/retain-forecast-prerequisite.png" alt-text="Screenshot of setting closed period to measure." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/retain-forecast-prerequisite.png":::

Then, choose an **Action for closed periods**:
* To replace forecasted values with actuals when the forecast for that period is closed, choose **Overwrite forecasts**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/overwrite-forecast-result.png" alt-text="Screenshot of overwriting forecasts with actuals." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/overwrite-forecast-result.png":::

* To preserve forecasted values, choose **Retain forecasts**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/retain-forecast.png" alt-text="Screenshot of option to retain forecast values." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/retain-forecast.png":::

* To leave empty forecast cells unchanged when the forecast is closed, select **Retain blank values**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/retain-blank-forecasts-option.jpg" alt-text="Retaining blank forecast values when actuals become available." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/retain-blank-forecasts-option.jpg":::

    When the forecast is closed, blank values are replaced with actuals unless they're explicitly retained.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-configure-forecast-settings/replace-blank-values-actuals.png" alt-text="Screenshot of replacing blank forecasts with actuals when the retain option isn't selected." lightbox="../media/planning-forecasting/planning-how-to-configure-forecast-settings/replace-blank-values-actuals.png":::
