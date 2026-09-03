---
title: Optimize Input Values for Target KPIs in Planning
description: Use Optimize to adjust multiple data input measures at once and hit target values for revenue, margin, or cash flow. Discover setup steps and constraints here.
ms.date: 08/10/2026
ms.topic: how-to
---

# Optimize overview

Use Optimize to find the input values you need to reach a target KPI, like revenue, margin, or cash. It also makes what-if analysis easier by recalculating the required input changes. Optimize supports multivariate goal seek by adjusting multiple data input measures simultaneously to meet a target value for a selected result measure.

The most common use cases for Optimize in planning include:

* **Revenue planning:** Determine the sales volume, average selling price, or product mix required to achieve a target revenue.
* **Profit margin optimization:** Calculate the changes in pricing, costs, or sales mix needed to reach a target gross or operating margin.
* **Expense budgeting:** Identify the reductions or reallocations across multiple expense categories required to meet a budget target.
* **Cash flow forecasting:** Determine the changes in collections, payments, or capital expenditures needed to achieve a target cash balance.

The Optimize feature adjusts one or more independent input measures within user-defined constraints to maximize, minimize, or achieve a target value for a dependent formula measure. For example, it can vary *Purchase Plan* and *Transport Expense Plan* to optimize a calculated *Profit* measure.

* **Independent variables** – Select one or more input or forecast measures that the optimizer can adjust, such as *Purchase Plan, Revenue Plan*, or *Transport Expense Plan*.
* **Dependent measure** – Create a formula measure that represents the objective to optimize. For example, `Profit = Revenue - (Purchase + Transport Expense)`.
* **Optimization goal** – Specify whether to maximize, minimize, or achieve a target value for the dependent measure.
* **Constraints** – Define upper and lower limits, fixed values, or other restrictions on the independent variables to control how they can be adjusted.
* **Optimization result** – The optimizer iteratively adjusts the independent variables within the defined constraints to produce the optimal value for the dependent measure.

## Prerequisites

1. Create independent variables

    Set up the planning sheet with at least one data input or forecast measure. Optimize adjusts the independent variables to achieve a target value or maximize or minimize the objective value.

    > [!NOTE]
    > You can't edit native measures from the semantic model. To use native measures such as prior year profit or COGS, create copies of the native measures before running optimization. In the **Planning** ribbon, go to **Insert Column** > **Number**. Select **Copy from another series**. Select the native measure to copy.

    In the following example, *Revenue PY*, *Purchase Expense PY*, *Transport Expense PY*, and *Advertising Expense PY* are the native measures.

    :::image type="content" source="../media/planning-optimize/optimizer-overview/assign-native-measures-planning-sheet.jpg" alt-text="Screenshot of assigning native measures to the planning sheet." lightbox="../media/planning-optimize/optimizer-overview/assign-native-measures-planning-sheet.jpg":::

    Create forecasts for each native measure: *Revenue Forecast*, *Purchase Forecast*, *Advertising Forecast*, and *Transport Forecast*. For more information, see [Create a Forecast](../planning-forecasting/planning-how-to-build-forecasts.md).

    :::image type="content" source="../media/planning-optimize/optimizer-overview/create-forecasts-native-measures.png" alt-text="Screenshot of creating forecasts based on native measures." lightbox="../media/planning-optimize/optimizer-overview/create-forecasts-native-measures.png":::

    > [!NOTE]
    > In the **Planning** ribbon, go to **Show Columns** and hide measures that you don't need for planning. In this example, hide the native measures as you only use the forecasts for Optimize.

1. Create the dependent variable

    Add at least one formula measure to the planning sheet. The formula measure is the dependent variable. Optimize adjusts one or more independent variables to achieve a target, minimum, or maximum value for a dependent variable.

    > [!NOTE]
    > Ensure the formula uses a data input or forecast measure. Optimize adjusts the data input values to meet the target. The independent measure acts as the driver that Optimize changes to reach the target.

    * To insert a formula measure, in the **Planning** ribbon, go to **Insert Column** and select **Formula.** Enter a formula that uses the data input measures created in the previous step.

        :::image type="content" source="../media/planning-optimize/optimizer-overview/create-calculated-measure-define-formula.jpg" alt-text="Screenshot of creating a calculated measure and entering a formula that uses forecast measures." lightbox="../media/planning-optimize/optimizer-overview/create-calculated-measure-define-formula.jpg":::

    * Set **Row aggregation** and **Column aggregation** to **Formula** and select **Create.**

        :::image type="content" source="../media/planning-optimize/optimizer-overview/set-row-column-aggregation-formula.png" alt-text="Screenshot of setting row and column aggregation to Formula for a calculated measure used in Optimize." lightbox="../media/planning-optimize/optimizer-overview/set-row-column-aggregation-formula.png":::

        The following screenshot shows the forecast and calculated measures.

        :::image type="content" source="../media/planning-optimize/optimizer-overview/calculated-forecast-measures.png" alt-text="Screenshot of the calculated measure and forecast measures created for optimize." lightbox="../media/planning-optimize/optimizer-overview/calculated-forecast-measures.png":::

## Optimization modes

Optimize supports two modes:

* **Target-based optimization** calculates the input values required to achieve a specified target for a result measure.
* **Direction-based optimization** calculates the input values that maximize or minimize a result measure while honoring the defined constraints.

Both modes support multivariate optimization by adjusting one or more input measures simultaneously.

## Configure optimization thresholds

Constraints are essential in optimization because they ensure the solution is realistic and feasible.  Define constraints to ensure the solution satisfies business rules and operational limits, such as budget caps, production capacity, or minimum staffing requirements.

* In manufacturing, to maximize profit, machine hours cannot exceed 500 hours, raw material is limited to 10,000 units, and production quantities cannot be negative.
* In manufacturing, to maximize profit, machine hours can't exceed 500 hours, raw material is limited to 10,000 units, and production quantities can't be negative.
* In sales planning, to maximize revenue, sales discounts can't exceed 20%, and inventory availability limits the number of units sold.


### Range-based constraint

Specify a minimum and maximum value for each data input measure to constrain the optimization. During optimization, the recalculated values for each input measure stay within the specified range, ensuring that the resulting solution is both feasible and aligned with business requirements.

:::image type="content" source="../media/planning-optimize/optimizer-overview/range-based-constraint-optimizer.jpg" alt-text="Screenshot of applying a range-based optimizer constraint by setting the minimum and maximum values." lightbox="../media/planning-optimize/optimizer-overview/range-based-constraint-optimizer.jpg":::

### Fixed-value constraint

Apply a fixed-value constraint to a data input measure to keep its value unchanged during optimization. The optimizer adjusts the remaining input measures to achieve the specified objective while honoring the fixed constraint.

Suppose *Sales Price* and *Sales Volume* are the input measures, and *Revenue* is the calculated measure. Constrain *Sales Price* to 0.5m so it remains unchanged during optimization. The optimizer adjusts *Sales Volume* to achieve the target revenue while keeping the sales price fixed.

:::image type="content" source="../media/planning-optimize/optimizer-overview/fixed-value-constraint-optimizer.png" alt-text="Screenshot of applying a fixed-value constraint to keep an input measure unchanged during optimization." lightbox="../media/planning-optimize/optimizer-overview/fixed-value-constraint-optimizer.png":::

## Adjust parameters to achieve targets

If Optimize doesn't reach the target value, adjust **Strategy**, **Tolerance**, and **Number of iterations**, then run Optimize again.

:::image type="content" source="../media/planning-optimize/optimizer-overview/optimizer-parameters-strategy-tolerance-iterations.jpg" alt-text="Screenshot of optimizer failure and settings to change the strategy, iterations, and tolerance parameters." lightbox="../media/planning-optimize/optimizer-overview/optimizer-parameters-strategy-tolerance-iterations.jpg":::

* **Strategy** controls the size of the adjustments made to the input value while trying to achieve the target. Lower values use smaller steps and can take longer to converge. Higher values use larger steps and can converge faster, but can overshoot.
* **Tolerance** defines the allowed error between the achieved value and the target value and determines how precise the Optimize result is. For example, the target Profit per Unit = 0.50. If the tolerance = 0.01, Optimize stops when the achieved value is between 0.49 and 0.51.
* **Number of iterations** sets the maximum number of times to repeat the optimization loop. In each iteration, Optimize performs these operations:

  1. Tries an input value.
  2. Calculates the result.
  3. Compares the result to the target value.
  4. Adjusts the input value based on the comparison.

:::image type="content" source="../media/planning-optimize/optimizer-overview/optimize-target-achieved-tune-parameters.png" alt-text="Screenshot of the optimizer target achieved after adjusting the strategy, tolerance, and number of iterations parameters." lightbox="../media/planning-optimize/optimizer-overview/optimize-target-achieved-tune-parameters.png":::

## Related content

[Optimizer solver in planning](https://lumel.com/webinars/microsoft-fabric-optimizer-solver-financial-planning/)
