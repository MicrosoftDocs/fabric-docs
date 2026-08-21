---
title: Create Forecasts Using Predictions and Historical Data
description: Learn how to create and manage forecasts in a planning sheet. Create forecast models, manage forecast periods, and streamline planning and forecasting workflows.
ms.date: 08/21/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Create a P&L forecast

Use the Forecast feature to extend the time horizon of a planning sheet by creating a visual measure for future periods. For example, if a planning sheet contains data for 2024 and 2025, create a forecast measure to project values for 2026. You can visualize future-period projections alongside historical or existing planning data without modifying the underlying planning data.

In this article, you learn to:

* Create a forecast using historical actuals as a baseline
* Create a zero-based forecast
* Top-down and bottom-up forecast allocation
* Lock forecast values
* Create statistical forecasts using Predict
* Generate deviation between budgets and forecasts

## Prerequisites

* Create a planning sheet and assign row and column dimensions.
* The column dimension should be a standard date hierarchy such as Year > Quarter > Month.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/prerequisite-date-hierarchy-columns.jpg" alt-text="Screenshot of a standard date hierarchy assigned to the column dimension data well in a planning sheet." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/prerequisite-date-hierarchy-columns.jpg":::

## Create a forecast from historical actuals

Configure forecasts using historical actuals as the starting point for future periods. This approach carries forward historical trends and values to provide a baseline for forecasting, which you can adjust in response to expected business changes.

1. In the **Model** ribbon, select **Forecast**.
1. The default measure name is set to *Forecast.* Set a custom name if required, and then select the future period to forecast. Plan automatically populates the forecast period based on the existing data. Select **Next** to configure closed periods.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/forecast-measure-name-period-selection.jpg" alt-text="Screenshot of entering the forecast measure name and selecting the forecast period." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/forecast-measure-name-period-selection.jpg":::

1. Closed periods represent past periods for which actual data is available. Forecast values for closed periods are locked and can't be edited. Use an existing measure or formula to populate closed forecast periods.

    To use existing measure values for closed forecasts, select **Link to Measure** and choose the measure from **Source Measure**. In this example, you populate closed periods with values from the *Actuals* measure. Select **Next** to configure open periods.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/closed-forecast-actuals-link-measure.jpg" alt-text="Screenshot of the closed period link to measure configuration that uses actuals." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/closed-forecast-actuals-link-measure.jpg":::

1. Select **Data Input** to manually enter forecasts. Retain the default **None** option for **Default Value.**

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/open-period-data-input-option.jpg" alt-text="Screenshot of data input option to enter open period forecasts manually." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/open-period-data-input-option.jpg":::

1. To prepopulate open forecasts from historical data, expand the **Pre-fill Open Periods** section. To initialize forecast values from a specific historical period:

    * Configure **Copy from** with the measure that contains the source values.
    * Set **Operation** to **Period Range**.
    * Define the periods to copy by specifying the **Source Range** as the historical period and the **Target Range** as the future period. Plan copies the values from the source range to the corresponding periods in the target range to initialize the forecast.

    In this example, you initialize the 2026 *Budget* with the 2025 *Actuals*.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/open-period-prefill-period-range.png" alt-text="Screenshot of prefill option for data input open periods with the period range option to copy values from 2025 to the 2026 forecast." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/open-period-prefill-period-range.png":::

    After saving the configuration, plan creates the *Budget* measure as a time extension for 2026. Notice that *Actuals* aren't available for the forecast period.

    * The *Budget* measure is locked for 2023, 2024, and 2025 and populated with *Actuals* according to the configuration in Step 3.
    * The 2026 *Budget* remains available for forecasting.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/closed-period-locked-open-period-initialized-actuals.png" alt-text="Screenshot of the closed forecast that is locked and editable open forecast initialized with prior year actuals." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/closed-period-locked-open-period-initialized-actuals.png":::

1. To analyze specific periods in a forecast, select **Period** from the **Model** ribbon. Select the **Calendar** icon to define the required time range. To focus only on actual and forecast values, clear **Show Closed Periods** to hide locked historical values from the view.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/period-settings-hide-closed-periods.png" alt-text="Screenshot of options to display a specific forecasting period and hide closed periods." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/period-settings-hide-closed-periods.png":::

    In Step 3, you selected **Period Range** to initialize the open forecast periods. Based on this configuration, plan creates the 2026 *Budget* by copying the corresponding *Actuals* values from 2025. This provides an initial forecast for 2026 using the values from the selected historical period.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/period-range-forecast-prefill-historical-data.png" alt-text="Screenshot of initializing a forecast using the period range option and copying historical values from the corresponding past period." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/period-range-forecast-prefill-historical-data.png":::

## Create a zero-based forecast

Use zero-based forecasts to enter new forecast values based on current assumptions, targets, or business expectations.

1. To create another forecast measure, expand the **Measures** pane and select **Add new measure.**

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/add-new-forecast-measure.png" alt-text="Screenshot of option to add a new forecast measure from the forecasting window." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/add-new-forecast-measure.png":::

1. Follow the same steps as in the previous section to configure the forecast timeframe and closed periods.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/new-forecast-measure-closed-period-initial-settings.png" alt-text="Screenshot of creating a new forecast measure and entering the measure name and forecast period." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/new-forecast-measure-closed-period-initial-settings.png":::

1. In the **Open Period** configuration, ensure that you select **Data Input.** Leave the other options unchanged. Select **Save**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/zero-based-forecast-open-period.png" alt-text="Screenshot of selecting the data input option to create zero based forecasts." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/zero-based-forecast-open-period.png":::

    The screenshot shows the *Budget* sourced from *Actuals* alongside the zero-based *Forecast*. The budget values are initialized using the corresponding actuals, while the forecast starts with zero values for the open forecast periods.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/budget-historical-data-zero-based-forecast.png" alt-text="Screenshot of a budget forecast created from historical data and a zero based forecast." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/budget-historical-data-zero-based-forecast.png":::

## Allocate forecasts across hierarchical data

Top-down and bottom-up allocation provide complementary approaches to distributing forecast values across business dimensions.

Top-down allocation starts with a high-level forecast and distributes it to lower-level entities, while bottom-up allocation builds the forecast from detailed inputs and aggregates them to higher levels.

1. Before allocation, in the **Planning** ribbon, change the scaling to **None**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/number-scaling-select-none.png" alt-text="Screenshot of changing the number scaling to None to show the full number." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/number-scaling-select-none.png":::

1. For top-down allocation, double-click the grand total cell for *Budget* and enter the new value.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/top-down-allocation-enter-value-grand-total-level.png" alt-text="Screenshot of entering a value for the grand total budget for top down allocation." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/top-down-allocation-enter-value-grand-total-level.png":::

1. The value you enter is automatically allocated to child nodes.

      :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/entered-value-allocated-child-nodes-self-weight.png" alt-text="Screenshot of the grand total budget value allocated from parent to child nodes based on self weight." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/entered-value-allocated-child-nodes-self-weight.png":::

1. You can enable subtotals before bottom-up allocations. In the **Planning** tab, set **Column Subtotal** to **Left**. This action shows the *2026 Total* column.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/enable-column-subtotal-left-position.png" alt-text="Screenshot of enabling the column subtotal and displaying it on the left side." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/enable-column-subtotal-left-position.png":::

1. Select a leaf node or subtotal node and enter the required value.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/enter-value-leaf-node-subtotal-node.png" alt-text="Screenshot of entering a forecast value for a subtotal chart of accounts row." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/enter-value-leaf-node-subtotal-node.png":::

1. The value you enter aggregates to the grand total *Budget*.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/value-entered-aggregated-grand-total.png" alt-text="Screenshot of bottom-up allocation with the entered value aggregated to the grand total Budget row." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/value-entered-aggregated-grand-total.png":::

## Lock forecasts

Lock values entered in a planning sheet to prevent further edits and preserve approved planning data.

1. In the **Model** ribbon, go to **Rules** > **Locking Rule**.
1. To lock edits to the *Budget* measure, set **Apply to Measures** to **Selected Measures**, and then select *Budget* from **Choose Measures**. Select **Apply to Children** to prevent editing child nodes.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/locking-rule-selected-measure-selected-row-dimension.png" alt-text="Screenshot of locking rule configuration for a particular measure and specific row." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/locking-rule-selected-measure-selected-row-dimension.png":::

1. Select **Create**. This rule locks the *Budget* measure.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/budget-measure-editing-locked.png" alt-text="Screenshot of the locking rule applied to the Budget measure, showing locked cells in the planning grid." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/budget-measure-editing-locked.png":::

## Create statistical forecasts based on seasonality and trends

Statistical forecasting uses historical data and statistical models to identify patterns and trends, and generates forecasts without manual input. For more information about Predict, see [Generating statistical forecasts](./planning-how-to-generate-statistical-forecasts-using-predict-feature.md).

1. Before using **Predict**, in the **Model** ribbon, go to **Period** to display historical data from 2023 and 2024. Hide closed forecasts to focus on historical data and the periods available for forecasting.
1. Predict works on any hierarchy level. In this example, select the grand total *Forecast,* then select **Predict** on the **Model** ribbon. Plan displays the selected row and measure.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/predict-pane-selected-measure-forecast-row.png" alt-text="Screenshot of the Predict side pane showing the selected measure and forecast row." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/predict-pane-selected-measure-forecast-row.png":::

1. Set **Evaluation** to **Bottom Up**. This option generates the predicted future value based on the trend of individual leaf nodes; in this example, the chart of accounts,
1. The **Trend Decomposition** forecasting algorithm is selected by default. For more information about algorithms, see [Statistical forecasting algorithms](../planning-concept-predict.md). Select **Year** for **Set Seasonality** and select **Run Forecast**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/predict-evaluation-seasonality-option.png" alt-text="Screenshot of the evaluation options and seasonality option in predict." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/predict-evaluation-seasonality-option.png":::

1. Preview the predicted forecast values in a graph to visualize the expected trends and patterns across future periods.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/predict-graph-forecasted-values.png" alt-text="Screenshot of graph showing the trend of predicted values with the confidence range." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/predict-graph-forecasted-values.png":::

1. Scroll down to view the actual predicted values and the confidence interval and range for each value.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/predict-table-view-actual-forecasted-values.png" alt-text="Screenshot of table showing the actual predicted values and the confidence interval." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/predict-table-view-actual-forecasted-values.png":::

1. Select **Save Forecast**. Review the forecast measure and period, and then select **Save** to apply the predicted values in the planning sheet.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/statistical-forecast-values-applied-planning-sheet.png" alt-text="Screenshot of the planning sheet with statistical forecast predicted values applied for the selected forecast period." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/statistical-forecast-values-applied-planning-sheet.png":::

## Generate deviation between budget and forecast

Deviation shows how actual or forecasted results differ from the original budget or target. It helps you identify where performance is above or below expectations and highlights areas that might require corrective action.

1. In the **Planning** ribbon, select **Forecast**.  Set the **Measure Name** to *Deviation*. Keep the default forecast period for Jan - Dec 2026.
1. In the **Closed Period** configuration, select **Formula** and enter the formula to calculate the deviation between *Budget* and *Forecast*.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/closed-period-formula-based-deviation.png" alt-text="Screenshot of closed period configuration to populate values based on a deviation formula." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/closed-period-formula-based-deviation.png":::

1. Use the same configuration for open periods. Select **Save**.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/open-period-formula-based-deviation.png" alt-text="Screenshot of open period configuration to populate values using a deviation formula." lightbox="../media/planning-forecasting/planning-how-to-build-forecasts/open-period-formula-based-deviation.png":::

    This action creates the deviation measure.

    :::image type="content" source="../media/planning-forecasting/planning-how-to-build-forecasts/create-deviation-budget-forecast.png" alt-text="Screenshot of the deviation measure created between the budget and forecast measures.":::
