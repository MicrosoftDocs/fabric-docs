---
title: Rule-Based Optimization and Derived Measure Optimization
description: Optimize derived measures in planning sheets by working backward through formula chains to adjust underlying forecast variables. Learn how to apply locking, distribution, and min-max rules.
ms.date: 08/17/2026
ms.topic: how-to
---


# Use Optimize on derived measures and allocation rules

Optimization can also work on a formula measure that is itself derived from another formula measure. Optimize works backward through the measure dependencies and adjusts the same underlying input variables. The optimizer evaluates the complete formula chain and adjusts the underlying independent variables to achieve the specified target.

Use rules to control how Optimize adjusts underlying values while achieving a specified target. Apply locking rules to protect specific values, distribution rules to control how values are allocated, and min-max rules to enforce allowable value ranges during optimization. This approach provides greater control over the optimization process while preserving defined business constraints.

In this article, you learn to apply optimization to

* Derived measures that reference a formula
* Measures bound by allocation rules

## Prerequisites

Before you begin, review the [Prerequisites section for Optimize](optimizer-overview.md#prerequisites) to understand the initial setup requirements.

## Run Optimize on derived measures

The steps to configure Optimize and define constraints are the same as for [target-based ](./planning-how-to-optimize-input-values.md)and [direction-based](./planning-how-to-maximize-minimize-target-value.md) optimization. The difference is that the calculated measure used for optimization can be derived from another calculated measure.

Example: Instead of optimizing *Profit Forecast* to reach a specific value, maximize *Margin %*. The optimizer can adjust *Revenue Forecast, Advertising Forecast, Transport Forecast,* and *Purchase Forecast* to find a combination that achieves the margin target.

1. Create the first-level formula that uses data input or forecast measures as underlying independent variables.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/first-level-formula-profit-forecast.png" alt-text="Screenshot of first-level formula based on forecast measures." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/first-level-formula-profit-forecast.png":::

1. Create a dependent formula. In this example, you define Margin % as `Profit Forecast / Revenue Forecast`. Margin % therefore depends on the Profit Forecast formula, which in turn depends on the four underlying forecast measures.

    > [!NOTE]
    > Ensure the row and column aggregation types are set to **Formula**.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/create-second-level-formula.png" alt-text="Screenshot of entering a derived formula for margin percentage based on the first-level formula for profit forecast." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/create-second-level-formula.png":::

1. Select a target cell in the dependent formula. Then, in the **Planning** ribbon, select **Optimize**.
1. Select the optimize objective. Notice that the **Variables to Update** are the forecast measures used in the first-level formula created in step 1.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/underlying-variables-optimize.png" alt-text="Screenshot of underlying independent variables appearing in the optimize configuration for derived formulas." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/underlying-variables-optimize.png":::

1. Define thresholds for optimizing the independent measures. For more information, see [Configure optimization thresholds](./optimizer-overview.md#configure-optimization-thresholds).

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/define-independent-variable-optimization-range.png" alt-text="Screenshot of defining range-based constraints for the independent optimizer variables." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/define-independent-variable-optimization-range.png":::

1. Review the optimized values for the underlying independent variables and target measure. Then, select **Apply** to update the measures in the planning sheet with the optimized values.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/review-apply-optimized-values.png" alt-text="Screenshot of optimizer output for the derived formula measure for margin percentage." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/review-apply-optimized-values.png":::

1. Notice how Optimize updates the underlying *Revenue Forecast, Purchase Forecast, Advertising Forecast,* and *Transport Forecast* measures to achieve the target *Margin %*.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/first-level-underlying-measures-updated.png" alt-text="Screenshot of underlying forecast measures optimized to achieve the target set for the derived formula measure." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/first-level-underlying-measures-updated.png":::

1. To convert the *Margin %* to a percentage value, select the measure and select the **%** icon from the **Planning** ribbon. Ensure **Row Aggregation** and **Column Aggregation** are set to **Formula** to optimize the measure further.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/convert-percentage-value-formula-aggregation.png" alt-text="Screenshot of the number formatting option to convert values to percentages. It also shows the option to set row and column aggregation." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/convert-percentage-value-formula-aggregation.png":::

## Apply rule-based optimization

Define rules to control how Optimize modifies the underlying measures during optimization. Use different rule types to restrict edits, control value distribution, or enforce allowable value ranges.

* Locking rules restrict edits to specific rows, columns, or periods during optimization.
* Distribution rules control how values are allocated across measures and dimensions.
* Min-max rules enforce minimum and maximum values for measures during optimization.

For example, optimize *Margin %* while preventing changes to the *North America Purchase Forecast*. This rule allows Optimize to adjust other underlying variables while keeping specified values unchanged.

1. To create a rule, in the **Model** ribbon, select **Rule**, and then select a rule type. In this example, select **Locking rule**.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/model-ribbon-rule-menu-locking-rule.png" alt-text="Screenshot of the Rule menu in the Model ribbon showing locking, distribution, and min-max rule type options." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/model-ribbon-rule-menu-locking-rule.png":::

1. To lock edits to *Purchase Forecast*, set **Apply to Measures** to **Selected Measures**, and then select *Purchase Forecast* from **Choose Measures**. To lock edits to the *North America* row category, set **Row Selection** to **Custom** and select *North America* from **Custom Rows**.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/locking-rule-purchase-forecast-north-america.png" alt-text="Screenshot of defining custom row and column locking rules on region and purchase forecast." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/locking-rule-purchase-forecast-north-america.png":::

1. Follow the same steps outlined in the [Run Optimize on derived measures](#run-optimize-on-derived-measures) section to configure Optimize. Note that the *Purchase Forecast* for *North America* is locked for editing.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/optimize-output-purchase-forecast-locked-north-america.png" alt-text="Screenshot of Optimize output showing the Purchase Forecast measure with the North America values locked from editing." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/optimize-output-purchase-forecast-locked-north-america.png":::

1. The target value is achieved by optimizing the other values while preserving the values protected by the locking rule.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/target-value-achieved-locked-cell-unchanged.png" alt-text="Screenshot of achieving the target value without affecting the locked cell." lightbox="../media/planning-optimize/planning-how-to-optimize-derived-measures/target-value-achieved-locked-cell-unchanged.png":::

1. To convert the *Margin %* to a percentage value, select the measure and select the **%** icon from the **Planning** ribbon. Ensure **Row Aggregation** and **Column Aggregation** are set to **Formula** to optimize the measure further.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-derived-measures/convert-percentage-number-format-option.png" alt-text="Screenshot of the number formatting option to convert the margin percentage measure with a locked cell to a percentage value.":::