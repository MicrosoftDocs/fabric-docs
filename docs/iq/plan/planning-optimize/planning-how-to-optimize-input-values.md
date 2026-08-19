---
title: Use Optimize to Meet Target Key Performance Indicators in Fabric Plan
description: Optimize recalculates data input measures to meet a target value for a result measure. Use it for budgets and forecasts to speed up scenario planning.
ms.date: 08/12/2026
ms.topic: how-to
---

# Optimize input values to meet a target

Use target-based optimization to determine the input values required to achieve a specific business objective, such as a revenue target. Optimize recalculates one or more selected input measures and updates them with the values needed to achieve the specified result.

## Prerequisites

Before you begin, review the [Prerequisites section for Optimize](./optimizer-overview.md#prerequisites) to understand the initial setup requirements.

## Achieve a target value on a calculated field

To demonstrate target-based optimization, set a target for the calculated field *Profit forecast* by optimizing independent variables - *Revenue Forecast*, *Purchase Forecast*, *Advertising Forecast*, and *Transport Forecast*.

> [!NOTE]
> You can optimize values at any hierarchy level. In this example, optimize at the total level. When Optimize runs on a parent cell, it recalculates the required change and distributes the updated value to the underlying editable child cells.

1. Select the target cell in the calculated measure. In the **Planning** ribbon, select **Optimize**. In this example, select the target cell from the *Profit Forecast* measure.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-input-values/calculated-measure-optimize-formula.png" alt-text="Screenshot of a calculated measure and formula used as the dependent measure to optimize." lightbox="../media/planning-optimize/planning-how-to-optimize-input-values/calculated-measure-optimize-formula.png":::

1. To achieve a specific target, set **Objective** to **Target** and enter the target value. In this example, set the target value to 45m.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-input-values/target-maximize-minimize-objective.png" alt-text="Screenshot of setting the optimize objective to maximize." lightbox="../media/planning-optimize/planning-how-to-optimize-input-values/target-maximize-minimize-objective.png":::

1. Select the data input or forecast measures (independent variables) to optimize from **Variables to Update**. In this case, Optimize adjusts the *Revenue Forecast*, *Purchase Forecast*, *Advertising Forecast*, and *Transport Forecast* to achieve the target *Profit Forecast*. Select **Next**.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-input-values/select-independent-variables-optimize.png" alt-text="Screenshot of selecting the independent measures to optimize." lightbox="../media/planning-optimize/planning-how-to-optimize-input-values/select-independent-variables-optimize.png":::

1. Select **Add Constraint** to define the minimum and maximum limits for the data input measure. For more information, see [Configure optimization thresholds](https://docs.fabricplan.com/documentation/readme/planning-sheets/how-tos/optimize-overview#configure-optimization-thresholds).

    > [!TIP]
    > Adding constraints is optional. Directly select **Run** to skip defining constraints; however, as a best practice, explicitly specify constraints for all the independent measures used in Optimize.

1. Choose the measure to apply the constraint from **Apply to Variable**. Select **Range** for the **Set Type** option. Enter the minimum and maximum optimization thresholds.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-input-values/add-range-constraint-independent-measure.png" alt-text="Screenshot of adding a range constraint to independent measures. " lightbox="../media/planning-optimize/planning-how-to-optimize-input-values/add-range-constraint-independent-measure.png":::

1. Select **Apply**. Select **Add** to specify additional constraints. Select **Run** after you define all the constraints.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-input-values/add-multiple-optimize-constraints.png" alt-text="Screenshot of adding multiple constraints for each independent measure in Optimize." lightbox="../media/planning-optimize/planning-how-to-optimize-input-values/add-multiple-optimize-constraints.png":::

1. Review the adjusted values, then select **Apply** to update the independent measures with the optimized values. For more information about Optimize parameters, see [Adjust parameters to achieve targets](./optimizer-overview.md#adjust-parameters-to-achieve-targets)

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-input-values/optimize-target-profit-forecast-value-achieved.png" alt-text="Screenshot of maximized target value and optimized independent values." lightbox="../media/planning-optimize/planning-how-to-optimize-input-values/optimize-target-profit-forecast-value-achieved.png":::

1. Optimize increases the *Profit Forecast* to 45m from 43.92m after adjusting independent measures within the specified constraints. Since you applied Optimize to a total value, the update cascades to all the related child dimensions.

    > [!NOTE]
    > Optimize doesn't change the values of locked cells. The target value is maximized or minimized by adjusting the values of editable cells.

    :::image type="content" source="../media/planning-optimize/planning-how-to-optimize-input-values/optimized-values-applied-measures-updated.png" alt-text="Screenshot of applying the optimized values and updating the measures in the planning sheet." lightbox="../media/planning-optimize/planning-how-to-optimize-input-values/optimized-values-applied-measures-updated.png":::
