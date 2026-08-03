---
title: Optimize Input Values for Target KPIs in Fabric Plan
description: Use Optimize to adjust multiple data input measures at once and hit target values for revenue, margin, or cash flow. Discover setup steps and constraints here.
ms.date: 07/22/2026
ms.topic: how-to
---

# Optimize concepts and prerequisites

Use Optimize to find the input values needed to reach a target KPI, such as revenue, margin, or cash. It also makes what-if analysis easier by recalculating the required input changes. Optimize supports multivariate scenarios by adjusting multiple data input measures simultaneously to meet a target value for a selected result measure.

The most common use cases for Optimize in planning include:

* **Revenue planning:** Determine the sales volume, average selling price, or product mix required to achieve a target revenue.
* **Profit margin optimization:** Calculate the changes in pricing, costs, or sales mix needed to reach a target gross or operating margin.
* **Expense budgeting:** Identify the reductions or reallocations across multiple expense categories required to meet a budget target.
* **Cash flow forecasting:** Determine the changes in collections, payments, or capital expenditures needed to achieve a target cash balance.

## Prerequisites

1. Set up the planning sheet with at least one data input measure. The data input measure is the independent variable. Optimize adjusts the data input measure to achieve a target value or maximize or minimize the objective value. For more information, see [numeric data input measures](../planning-how-to-insert-columns/how-to-insert-number-columns.md).

    > [!TIP]
    > You can't edit native measures from the semantic model. To use native measures such as prior year profit or cost of goods sold (COGS), create copies of the native measures before running optimization. In the **Planning** ribbon, go to **Insert Column** > **Number**. Select **Copy from another series**. Select the native measure to copy.
    
    In the following example, *Units Sold (Projection), COGS (Projection), and Revenue (Projection)* are the data input measures.
    
    :::image type="content" source="../media/planning-optimize/optimizer-overview/add-data-input-values.png" alt-text="Screenshot of creating data input measures in a planning sheet." lightbox="../media/planning-optimize/optimizer-overview/add-data-input-values.png":::

1. Add at least one formula measure to the planning sheet. The formula measure is the dependent variable. Optimize adjusts one or more independent variables to achieve a target, minimum, or maximum value for a dependent variable.

    > [!NOTE]
    > Ensure the formula uses a data input or forecast measure. Optimize adjusts the data input values to meet the target. The data input measure acts as the input or driver that Optimize changes to reach the target.
    
    * To insert a formula measure, in the **Planning** ribbon, go to **Insert Column** and select **Formula**. Enter a formula that uses the data input measures created in the previous step.
    
        :::image type="content" source="../media/planning-optimize/optimizer-overview/create-formula-measure.png" alt-text="Screenshot of creating a formula measure based on data input measures." lightbox="../media/planning-optimize/optimizer-overview/create-formula-measure.png":::
    
    * Set **Row aggregation** and **Column aggregation** to **Formula** and select **Create**.
    
        :::image type="content" source="../media/planning-optimize/optimizer-overview/row-column-aggregation.png" alt-text="Screenshot of setting the row and column aggregation to formula." lightbox="../media/planning-optimize/optimizer-overview/row-column-aggregation.png":::

The following screenshot shows the data input and formula measures.

:::image type="content" source="../media/planning-optimize/optimizer-overview/data-input-formula-planning-sheet.png" alt-text="Screenshot of data input and calculated measures created in the planning sheet before running Optimize." lightbox="../media/planning-optimize/optimizer-overview/data-input-formula-planning-sheet.png":::

### Optimization modes

Optimize supports two modes:

* **Target-based optimization** calculates the input values required to achieve a specified target for a result measure. For more information, see [Optimize input values to meet a target](planning-how-to-optimize-input-values.md).
* **Direction-based optimization** calculates the input values that maximize or minimize a result measure while honoring the defined constraints.

Both modes support multivariate optimization by adjusting one or more input measures simultaneously.

## Configure optimization thresholds

Constraints are essential in optimization because they ensure the solution is realistic and feasible. Without constraints, the optimizer might produce mathematically correct results that you can't implement in the real world. Constraints ensure the solution satisfies business rules and operational limits, such as budget caps, production capacity, or minimum staffing requirements.

* In manufacturing, to maximize profit, machine hours can't exceed 500 hours, raw material is limited to 10,000 units, and production quantities can't be negative.
* In budget planning, to minimize operating costs, department budgets can't fall below mandatory spending levels; total headcount must remain above a minimum.
* In sales planning, to maximize revenue, sales discounts can't exceed 20%; inventory availability limits the number of units sold.

### Range-based constraint

Specify a minimum and maximum value for each data input measure to constrain the optimization. During optimization, the recalculated values for each input measure remain within the specified range, ensuring that the resulting solution is both feasible and aligned with business requirements.

:::image type="content" source="../media/planning-optimize/optimizer-overview/range-based-constraint.png" alt-text="Screenshot of setting the minimum and maximum values for a range-based constraint." lightbox="../media/planning-optimize/optimizer-overview/range-based-constraint.png":::

### Fixed-value constraint

Apply a fixed-value constraint to a data input measure to keep its value unchanged during optimization. The optimizer adjusts the remaining input measures to achieve the specified objective while honoring the fixed constraint.

Suppose *Sales Price* and *Sales Volume* are the input measures, and *Revenue* is the result measure. Constrain *Sales Price* to $100 so it remains unchanged during optimization. The optimizer adjusts *Sales Volume* to achieve the target revenue while keeping the sales price fixed.

:::image type="content" source="../media/planning-optimize/optimizer-overview/fixed-value-constraint.png" alt-text="Screenshot of creating a constraint based on a fixed value." lightbox="../media/planning-optimize/optimizer-overview/fixed-value-constraint.png":::

## Adjust parameters to achieve targets

If Optimize doesn't reach the configured target, minimum, or maximum value, adjust **Strategy**, **Tolerance**, and **Number of iterations**, and then **Re-run** Optimize.

:::image type="content" source="../media/planning-optimize/optimizer-overview/optimize-failure.jpg" alt-text="Screenshot of an optimization failure and the optimize parameters." lightbox="../media/planning-optimize/optimizer-overview/optimize-failure.jpg":::

* **Strategy** controls the size of the adjustments made to the input value while trying to achieve the target. Lower values use smaller steps and can take longer to converge. Higher values use larger steps and can converge faster, but can overshoot.
* **Tolerance** defines the allowed error between the achieved value and the target value and determines how precise the Optimize result is. For example, the target Profit per Unit = 0.50. If the tolerance = 0.01, Optimize stops when the achieved value is between 0.49 and 0.51.
* **Number of iterations** sets the maximum number of times to repeat the optimization loop. In each iteration, Optimize performs these operations:

  1. Tries an input value.
  1. Calculates the result.
  1. Compares the result to the target value.
  1. Adjusts the input value based on the comparison.

:::image type="content" source="../media/planning-optimize/optimizer-overview/optimize-parameters.png" alt-text="Screenshot of changing optimize parameters such as strategy, tolerance, and number of iterations to achieve a target value." lightbox="../media/planning-optimize/optimizer-overview/optimize-parameters.png":::
