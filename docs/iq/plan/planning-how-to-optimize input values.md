---
title: Use Optimize to meet target key performance indicators in planning
description: Optimize recalculates data input measures to meet a target value for a result measure. Use it for budgets and forecasts to speed up scenario planning.
ms.date: 04/27/2026
ms.topic: how-to
---

# Optimize input values to meet a target

Optimize supports multivariate scenarios by adjusting multiple data input measures to meet a target value for a selected result measure. Use Optimize to determine the driver inputs required to reach a target KPI(Key performance indicator), such as revenue, margin, or cash, and to streamline what-if analysis by recalculating the required input changes.

Set a target value, then run Optimize to calculate the input values required to reach the target. Plan recalculates the inputs and applies the updated values to achieve the specified outcome.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

* Add at least one formula measure to the planning sheet. Optimize requires a formula measure to run. The formula measure acts as the target/output.
* Ensure the formula uses a data input or forecast measure. Optimize adjusts the data input values to meet the target. The data input measure acts as the input/driver that Optimize changes to reach the target.
* Set **Row aggregation** and **Column aggregation** to **Formula** for the formula measure.

    :::image type="content" source="media/planning-how-to-optimize-input-values/row-column-aggregation.png" alt-text="Screenshot of row and column aggregation for calculated fields." lightbox="media/planning-how-to-optimize-input-values/row-column-aggregation.png":::

## Run Optimize on calculated fields

1. Select the target cell in the formula measure field, then select **Optimize**. In this example, the formula measure used is Profit per unit.
1. Choose an optimization goal: **Maximize, Minimize,** or **Target**. Optimize adjusts the data input measure values to meet the selected goal. To achieve a specific target, set **Objective** to **Target** and enter the target value.
1. Set **Variables to Update** to the data input measure to adjust to meet the target. In this case, the COGS is adjusted to meet the target Profit per unit.

    :::image type="content" source="media/planning-how-to-optimize-input-values/target-value-input-field.jpg" alt-text="Screenshot of entering the target value and selecting the data input field to optimize." lightbox="media/planning-how-to-optimize-input-values/target-value-input-field.jpg":::

1. Select **Add Constraint** and define the minimum and maximum limits for the data input measure. For example, the cost of goods can only be adjusted based on achievable reductions. Select **Apply,** then **Run**.

    :::image type="content" source="media/planning-how-to-optimize-input-values/constraints-range.jpg" alt-text="Screenshot of entering the minimum and maximum allowed values for the data input field." lightbox="media/planning-how-to-optimize-input-values/constraints-range.jpg":::

    >[!NOTE]
    >This step is optional. Select **Run** to skip defining constraints.

1. Validate the adjusted value and select **Apply** to update the data input measure - in this case, COGS.

    :::image type="content" source="media/planning-how-to-optimize-input-values/apply-optimized-value.jpg" alt-text="Screenshot of optimized input value to apply." lightbox="media/planning-how-to-optimize-input-values/apply-optimized-value.jpg":::

    The Profit per unit is increased to the target value of 17.32 by changing the COGS to 1.0163 million.

    :::image type="content" source="media/planning-how-to-optimize-input-values/optimized-value-planning-sheet.jpg" alt-text="Screenshot of optimized value applied in planning sheet." lightbox="media/planning-how-to-optimize-input-values/optimized-value-planning-sheet.jpg":::

## Adjust parameters to achieve targets

If **Optimize** doesn't reach the target value, adjust **Strategy**, **Tolerance**, and **Number of iterations**, then run Optimize again.

:::image type="content" source="media/planning-how-to-optimize-input-values/optimize-parameters.jpg" alt-text="Screenshot of parameters used to calibrate Optimize." lightbox="media/planning-how-to-optimize-input-values/optimize-parameters.jpg":::

* **Strategy** controls the size of the adjustments made to the input value while trying to achieve the target. Lower values use smaller steps and might take longer to converge. Higher values use larger steps and can converge faster, but can overshoot.
* **Tolerance** defines the allowed error between the achieved value and the target value and determines how precise the Optimize result is. For example, the target Profit per Unit = 0.50. If the tolerance = 0.01, Optimize stops when the achieved value is between 0.49 and 0.51.
* **Number of iterations** sets the maximum number of times to repeat the optimization loop. In each iteration, Optimize
    1. Tries an input value.
    1. Calculates the result.
    1. Compares the result to the target value.
    1. Adjusts the input value based on the comparison.

    :::image type="content" source="media/planning-how-to-optimize-input-values/successful-optimize.png" alt-text="Screenshot of Optimize successful after adjusting parameters." lightbox="media/planning-how-to-optimize-input-values/successful-optimize.png":::

## Run Optimize on parent cells

To meet a target at an aggregated level, apply Optimize on parent (total) cells. When Optimize runs on a parent cell, it recalculates the required change and distributes the update to the underlying editable child cells.

:::image type="content" source="media/planning-how-to-optimize-input-values/optimize-parent-cells.png" alt-text="Screenshot of selecting a parent cell to optimize." lightbox="media/planning-how-to-optimize-input-values/optimize-parent-cells.png":::

In this example, Optimize reduced COGS at the parent level and distributed the reduction proportionally across the child rows to achieve the target profit.

:::image type="content" source="media/planning-how-to-optimize-input-values/optimize-distribution.png" alt-text="Screenshot of optimized value distributed to child levels." lightbox="media/planning-how-to-optimize-input-values/optimize-distribution.png":::

## Using Optimize on forecast measures

Optimize helps align forecast measures to business targets by calculating the required adjustments to achieve the target.

* Optimize updates forecast values only for open periods. Closed periods are locked by default.
* To run Optimize on forecasts, configure the open period forecast as a data input measure so the values are editable.

:::image type="content" source="media/planning-how-to-optimize-input-values/optimize-forecasts.png" alt-text="Screenshot of Optimize for forecasts." lightbox="media/planning-how-to-optimize-input-values/optimize-forecasts.png":::

In this example, the Implied Price is calculated using the formula shown:

:::image type="content" source="media/planning-how-to-optimize-input-values/forecast-formula.png" alt-text="Sreenshot of formula that uses forecasts." lightbox="media/planning-how-to-optimize-input-values/forecast-formula.png":::

The steps to run Optimize on forecast measures are the same as the steps used for data input measures described earlier.

:::image type="content" source="media/planning-how-to-optimize-input-values/forecast-parameters.png" alt-text="Screenshot of Optimize parameters for forecasts." lightbox="media/planning-how-to-optimize-input-values/forecast-parameters.png":::

To reach the target implied price of 86.42, Optimize updates the revenue forecast at the parent level and distributes the change proportionally across the child rows.

:::image type="content" source="media/planning-how-to-optimize-input-values/forecast-optimized.png" alt-text="Screenshot of optimized forecast value distributed to child levels." lightbox="media/planning-how-to-optimize-input-values/forecast-optimized.png":::
