---
title: Maximize or Minimize a Target Value in Planning
description: Learn how to maximize or minimize a target value by using Optimize in planning in Fabric.
ms.topic: how-to
ms.date: 07/29/2026
---

# Maximize or minimize a target value

Direction-based optimization adjusts one or more data input measures to maximize or minimize the selected objective measure while satisfying the defined constraints.

## Prerequisites

Before you begin, review the [Prerequisites section for Optimize](./optimizer-overview.md#prerequisites) to understand the initial setup requirements.

## Maximize a calculated field

To demonstrate direction-based optimization, maximize the calculated field *Profit forecast* by optimizing independent variables - *Revenue Forecast*, *Purchase Forecast*, *Advertising Forecast*, and *Transport Forecast*.

> [!NOTE]
> You can optimize values at any hierarchy level. In this example, optimize at the total level. When Optimize runs on a parent cell, it recalculates the required change and distributes the updated value to the underlying editable child cells.

1. Select the target cell in the calculated measure. In the **Planning** ribbon, select **Optimize**. In this example, select the target cell from the *Profit Forecast* measure.

    :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/calculated-measure-optimize-formula.png" alt-text="Screenshot of a calculated measure and formula used as the dependent measure to optimize." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/calculated-measure-optimize-formula.png":::

1. To achieve direction-based optimization,

    * Set **Objective** to **Maximize** to achieve the highest possible value. For example, maximize revenue, profit, or return on investment.
    * Set **Objective** to **Minimize** to achieve the lowest possible value. For example, minimize cost, expenses, or inventory holding costs.
      In this example, set the **Objective** to **Maximize** to arrive at the maximum *Profit Forecast*.

    :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/target-maximize-minimize-objective.png" alt-text="Screenshot of setting the optimize objective to maximize." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/target-maximize-minimize-objective.png":::

1. Select the data input or forecast measures (independent variables) to optimize from **Variables to Update**. In this case, Optimize adjusts the *Revenue Forecast*, *Purchase Forecast*, *Advertising Forecast*, and *Transport Forecast* to maximize the *Profit Forecast*. Select **Next**.

    :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/select-independent-variables-optimize.png" alt-text="Screenshot of selecting the independent measures to optimize." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/select-independent-variables-optimize.png":::

1. Select **Add Constraint** to define the minimum and maximum limits for the data input measure. For more information, see [Configure optimization thresholds](./optimizer-overview.md#configure-optimization-thresholds).

    > [!TIP]
    > Adding constraints is optional. Directly select **Run** to skip defining constraints; however, as a best practice, explicitly specify constraints for all the independent measures used in Optimize.

1. Choose the measure to apply the constraint from **Apply to Variable**. Select **Range** for the **Set Type** option. Enter the minimum and maximum optimization thresholds.

    :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/add-range-constraint-independent-measure.png" alt-text="Screenshot of adding a range constraint to independent measures. " lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/add-range-constraint-independent-measure.png":::

1. Select **Apply**. Select **Add** to specify additional constraints. Select **Run** after you define all the constraints.

    :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/add-multiple-optimize-constraints.png" alt-text="Screenshot of adding multiple constraints for each independent measure in Optimize." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/add-multiple-optimize-constraints.png":::

1. Review the adjusted values and select **Apply** to update the values of the independent measures. For more information about Optimize parameters, see [Adjust parameters to achieve targets](./optimizer-overview.md#adjust-parameters-to-achieve-targets).

    :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-maximized-profit-forecast-values.png" alt-text="Screenshot of maximized target value and optimized independent values." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-maximized-profit-forecast-values.png":::

1. Optimize increases the *Profit Forecast* to 50.46m from 43.92m after adjusting independent measures within the specified constraints. Since you applied Optimize on a total value, the update cascades to all the related child dimensions.

    > [!NOTE]
    > Optimize doesn't change the values of locked cells. The target value is maximized or minimized by adjusting the values of editable cells.

    :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimized-values-applied-measures-updated.png" alt-text="Screenshot of applying the optimized values and updating the measures in the planning sheet." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimized-values-applied-measures-updated.png":::
