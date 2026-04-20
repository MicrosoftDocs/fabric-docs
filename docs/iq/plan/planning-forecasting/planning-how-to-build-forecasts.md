---
title: Create forecasts using predictions and historical data
description: Learn how to create and manage forecasts in a Planning sheet. Create forecast models, manage forecast periods, and streamline planning and forecasting workflows.
ms.date: 04/26/2026
ms.topic: how-to
---

# Forecast data to predict future trends

Forecasting capabilities in the Planning sheet enable organizations to move beyond static annual plans and adopt agile planning methods, such as rolling forecasts and periodic reforecasting. Use forecasting to project revenue, expenses, and other metrics for upcoming periods based on historical data.

Create dynamic forecasts directly on semantic models and update them as new actuals become available. Forecasts can be generated using multiple approaches, such as copying historical values, applying averages, or manually adjusting projections.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Prerequisite

* The column dimension is a standard date hierarchy (for example, year > quarter > month).

## Define initial forecast settings

The first step in configuring a forecast is to set the time frame for which the forecast is generated. Then configure how to populate static values in the forecast measure for past or closed periods. For instance, if you have actuals for 2025 and are generating a forecast for 2026, a static forecast measure is created for 2025.

>[!NOTE]
>The forecast measure for previous periods can't be edited. Static values for closed forecasts can be sourced from a measure in your planning sheet by setting **Closed Period** to **Measure**. Set **Closed Period** to **Formula** to define a formula to populate closed periods.

1. Go to **Model** > **Forecast** to create a forecast.
1. Set the start and end date of the forecast period.
1. Choose how to fill closed forecasts. Set **Closed Period** to **Formula** and enter the formula. When creating a formula, you can reference other measures in the planning sheet.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/closed-period-formula.png" alt-text="Screenshot of configuring closed forecasts." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/closed-period-formula.png":::

    Closed forecasts are populated using the specified formula.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/closed-forecast.png" alt-text="Screenshot of closed forecasts." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/closed-forecast.png":::

## Initialize a forecast using historical or current data

Prepopulate future forecast periods using existing historical or current data. These initial values can then be manually adjusted by selecting and editing the cell.

1. Set **Open Period** to **Data Input** and **Default Value** to **None**.

    >[!TIP]
    >If the measure used to initialize the forecast contains null values, you can replace them with a default value. The default value can be a static value, another measure, or a formula.

1. Select **Create**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/open-forecast-default-value.png" alt-text="Screenshot of default values for forecasts." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/open-forecast-default-value.png":::

1. In **Period Setup**, From **Copy Source**, select the measure to use to prepopulate the forecast.
1. **Apply Operation** is set to **Period Range**, and **Source Periods** are automatically populated. The Revenue measure from January–December 2025 is used to initialize the forecast for January–December 2026.

    >[!NOTE]
    >The period range duration should match the target period duration. For example, if the target period is six months, then you must select a period range spanning six months.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/period-range-forecast.png" alt-text="Screenshot of period range for forecasts." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/period-range-forecast.png":::

    The forecast is initialized using revenue from the corresponding month in the previous year.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/open-forecast-period-range.png" alt-text="Screenshot of open forecast with period range." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/open-forecast-period-range.png":::

You can set the time period used to initialize the forecast in two ways:

* To initialize forecasts with the average measure value over a specified period range, set **Apply Operation** to **Average of Period Range** and select the timeframe from **Source Periods**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/average-period-range-config.png" alt-text="Screenshot of configuring an open forecast with average of period range." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/average-period-range-config.png":::

    The average revenue from Q4 2025 is used to initialize each month in the 2026 forecast.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/average-period-range-forecast.png" alt-text="Screenshot of an open forecast with period range." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/average-period-range-forecast.png" :::

* Similarly, to initialize forecasts with measure values from a single period, set **Apply Operation** to **Single Period** and select the period.

    The revenue from December 2025 is used to initialize each month in the 2026 forecast.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/single-period-forecast.png" alt-text="Screenshot of an open forecast with a single period range." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/single-period-forecast.png":::

## Initialize forecast ranges using different methods

Split a forecast period into multiple ranges and initialize each range using a different method, such as average values or data from a prior period.

1. Configure the initial forecast settings, then go to **Period Setup**.
1. Set the **Target Period** to January–March 2026, **Copy Source** to the Revenue measure, **Apply Operation** to **Single Period**, and **Source Periods** to December 2025.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/split-forecast-single-period-config.png" alt-text="Screenshot of configuration for splitting a forecast with a single period.":::

1. Select **Add Range**.
1. Set the **Target Period** to April–June 2026, **Copy Source** to the Revenue measure, **Apply Operation** to **Average of Period Range**, and **Source Periods** to January–December 2025.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/split-forecast-average-period-config.png" alt-text="Screenshot of configuration for splitting a forecast with average period.":::

1. Select **Add Range**.
1. Set the **Target Period** to July–August 2026, **Copy Source** to the Revenue measure, **Apply Operation** to **Period Range**, and **Source Periods** to November–December 2025.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/split-forecast-period-range-config.png" alt-text="Screenshot of configuration for splitting a forecast with period range.":::

The 2026 forecast is split into multiple ranges based on the period setup configurations:

* The forecast for January–March 2026 is initialized from the December 2025 revenue.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/split-forecast-single-period.png" alt-text="Screenshot of splitting a forecast with single period." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/split-forecast-single-period.png":::

* The forecast for April–June (Q2) 2026 is created from the average revenue from 2025.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/split-forecast-average-period.png" alt-text="Screenshot of splitting a forecast with average period." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/split-forecast-average-period.png":::

* The forecast for July–August 2026 is based on the revenue from November–December 2025.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/split-forecast-period-range.png" alt-text="Screenshot of splitting a forecast with period range." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/split-forecast-period-range.png":::

* The forecast values for September through December 2026 are blank because no initial value is configured in the Period Setup.

## Populate open forecasts from the data source

If forecast values are already available for future periods in the data source, you can populate open periods using the native forecast measure or a formula that references it.

To initialize the open forecast from a measure in the planning sheet, set **Open Period** to **Measure**, then select the measure from **Linked Measure**.

To set forecast values based on a formula, set **Open Period** to **Formula** and enter the formula.

:::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/open-forecast-measure-formula.png" alt-text="Screenshot of configuring an open forecast from a measure.":::

## Update open forecasts

After a forecast is created, its initial values can be modified at any time. If the open forecast is into multiple periods, you can update the values for a specific period without affecting the configured values for the other periods.

1. Select **Reforecast** > **Reforecast Column**.
1. Define the period range to update the open forecast.
1. Select the measure and method to populate the forecast.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/re-forecast-configuration.png" alt-text="Screenshot of reforecasting configuration" lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/re-forecast-configuration.png":::

    The new configuration is applied to the July forecast.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/re-forecasting.png" alt-text="Screenshot of reforecasted data." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/re-forecasting.png":::
