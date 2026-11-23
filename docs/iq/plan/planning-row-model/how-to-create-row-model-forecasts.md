---
title: Row Model Forecasts for Driver-Based Planning
description: Learn how to create a forecast in a row model, adjust key drivers, and instantly see how each change flows through calculated rows and KPIs like profit.
#customer intent: As a budget owner and planning user, I want to adjust forecast drivers at the year or quarter level so that I can test different business assumptions quickly.
ms.date: 08/25/2026
ms.topic: how-to
---

# Create forecasts with row model for driver-based planning

Use forecasting with a row model to project future values for row-level drivers and evaluate their impact on related rows and KPIs.

For example, you can forecast *revenue*, *expenses*, and other key drivers. Modify the forecasted drivers to explore different assumptions and analyze their cascading impact across the model.

This process involves:

* Creating a row model to define relationships between drivers and calculated rows.
* Using **Forecast** to create forecast values and see how changes flow through the model.

## Use cases

You can use forecasts with a row model to:

* **Project future performance:** Forecast business drivers and outcomes for upcoming periods.
* **Build driver-based forecasts:** Use historical or current values as a starting point and adjust individual drivers based on business assumptions to see the impact on KPIs.
* **Perform rolling forecasts:** Update forecast periods as new actuals become available and reforecast future periods.

## Prerequisites

Before you create a forecast:

* Ensure the planning sheet uses a standard date hierarchy, such as `Year > Quarter > Month`.
* Ensure the row model is configured with the required drivers and calculated rows. To learn how to create a row model, see [create a row model](how-to-create-row-model.md).

## Create a forecast

1. To forecast *2026 values*, use the following **P&L (Profit and Loss) row model**.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-forecasts/sample-profit-loss-row-model.png" alt-text="Screenshot of a Profit and Loss row model grid showing Actuals and PY Actuals for 2025 and 2026 by quarter." lightbox="../media/planning-row-model/how-to-create-row-model-forecasts/sample-profit-loss-row-model.png":::

1. Go to **Model** > **Forecast**.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-forecasts/select-forecast.png" alt-text="Screenshot showing Model menu selected and Forecast option outlined in the toolbar." lightbox="../media/planning-row-model/how-to-create-row-model-forecasts/select-forecast.png":::

1. In **Basics**, enter the forecast measure name and set the date range for the forecast period as **Jan 2026 - Dec 2026**. Select **Next**.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-forecasts/select-forecast-period.png" alt-text="Screenshot of the Insert Forecast Measures dialog Basics step with Forecast Period set to Jan 2026 - Dec 2026 and Next highlighted." lightbox="../media/planning-row-model/how-to-create-row-model-forecasts/select-forecast-period.png":::

1. Configure the **Closed Period** settings to populate values for locked periods.
   * **Configure as:** Select **Link to Measure** to populate the forecast values from an existing measure.
   * **Source Measure:** Select **Actuals** to use the actual values for the closed periods.
1. Select **Next**.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-forecasts/source-measure.png" alt-text="Screenshot of the Insert Forecast Measures dialog Closed Periods step with Link to Measure selected, Source Measure set to Actuals, and Next highlighted." lightbox="../media/planning-row-model/how-to-create-row-model-forecasts/source-measure.png":::

    > [!NOTE]
    > Closed-period forecast values are locked historical periods and users can't edit these values.

1. Configure the **Open Period** settings to pre-fill the 2026 forecast values using the 2025 actuals.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-forecasts/save-forecast-configuration.png" alt-text="Screenshot of the Open Periods step with Pre-fill range copying Actuals from Jan 2025-Dec 2025 to Jan 2026-Dec 2026 and Save highlighted." lightbox="../media/planning-row-model/how-to-create-row-model-forecasts/save-forecast-configuration.png":::

    * **Configure as:** Select **Data Input** to allow users to enter and modify forecast values.
    * **Default Value:** Select **Measure** to use an existing measure as the default value and initialize the forecast values.
    * **Measure:** Select **Actuals** measure for default values.
    * Under **Pre-fill Open Periods**, configure the range to copy the 2025 actuals to the 2026 forecast as follows:
      * **Copy from:** Select **Actuals**.
      * **Target Range:** Select **Jan 2026 – Dec 2026** as the target.
      * **Operation:** Select **Period Range** to map each period in the source range to the corresponding period in the target range.
      * **Source Range:** Select **Jan 2025 – Dec 2025**.

1. Select **Save**.

The forecast measure is created for the row model. Review the generated forecast values and modify the open-period values as needed.

:::image type="content" source="../media/planning-row-model/how-to-create-row-model-forecasts/forecast-measures-added.png" alt-text="Screenshot of a grid showing Actuals, PY Actuals, and Forecast columns for 2025 and 2026 with forecast values highlighted and a Measure created successfully notification." lightbox="../media/planning-row-model/how-to-create-row-model-forecasts/forecast-measures-added.png":::

### Analyze the forecast in the row model

After you create the forecast, use the row model to analyze how changes to forecast drivers affect related rows. For example, changing *Revenue* or *Purchase* expense can flow through the defined row relationships and affect *Profit* and other KPIs.

You can enter values at any period level, such as the **Year** total or individual **Quarter** cells.&#x20;

The following image shows how a change in *revenue* for *Q1* affects the quarter-level *profit* and flows through to the overall *profit.*

:::image type="content" source="../media/planning-row-model/how-to-create-row-model-forecasts/revenue-change-impact-profit.png" alt-text="Screenshot of the Model tab grid showing Q1 Revenue changed to 20.00 and recalculated Profit and Income forecast cells for 2026." lightbox="../media/planning-row-model/how-to-create-row-model-forecasts/revenue-change-impact-profit.png":::

The following image demonstrates how reducing purchase expense increases profit.

:::image type="content" source="../media/planning-row-model/how-to-create-row-model-forecasts/purchase-changes-impact-profit.png" alt-text="Screenshot of a planning grid showing reduced Purchase expense of 21.50 for 2026 and updated Expense and Profit forecast values." lightbox="../media/planning-row-model/how-to-create-row-model-forecasts/purchase-changes-impact-profit.png":::

This approach lets you combine forecasting with driver-based row modeling to evaluate future performance and understand the cascading impact of different assumptions.

> [!NOTE]
> To learn more about all forecasting options, see [Create a PnL forecast](../planning-forecasting/planning-how-to-build-forecasts.md).

## Next steps

After you create a forecast, you can take your analysis further by creating **scenarios** to simulate different assumptions without changing the base plan.

Create scenarios, adjust key drivers, and compare outcomes to identify the scenarios that best support your planning decisions. To learn more, see [Perform scenario analysis in the row model](how-to-create-row-model-scenarios.md).
