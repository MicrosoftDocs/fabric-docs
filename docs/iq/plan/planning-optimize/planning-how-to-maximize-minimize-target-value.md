---
title: Maximize or Minimize a Target Value
description: Learn how to maximize or minimize a target value by using Optimize in Fabric Plan.
ms.topic: how-to
ms.date: 07/29/2026
---

# Maximize or minimize a target value

Direction-based optimization adjusts one or more data input measures to maximize or minimize a selected objective while satisfying the specified constraints.

## Run Optimize on calculated fields

1. Select the target cell in the calculated measure.

1. On the **Planning** ribbon, select **Optimize**.

   In this example, you select the target cell from the *Profit per unit* measure.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/run-optimize-calculated-field.png" alt-text="Screenshot of selecting the Profit per unit cell and the Optimize command on the Planning ribbon." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/run-optimize-calculated-field.png":::

1. In **Objective**, choose the optimization direction.

   - Select **Maximize** to achieve the highest possible value, such as revenue, profit, or return on investment.
   - Select **Minimize** to achieve the lowest possible value, such as cost, expenses, or inventory holding costs.

   In this example, you set **Objective** to **Maximize** to maximize *Profit per unit*.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-objective-maximize.png" alt-text="Screenshot of the Objective setting configured to Maximize in the Optimize dialog." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-objective-maximize.png":::

1. Under **Variables to Update**, select the editable measures that Optimize can adjust.

   In this example, you select *Units Sold (Projection)* and *COGS (Projection)* so Optimize can maximize *Profit per unit*.

   Select **Next**.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-select-variables.png" alt-text="Screenshot of selecting Units Sold and COGS projection measures under Variables to Update." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-select-variables.png":::

1. Configure optimization constraints.

   Select **Add Constraint**, specify the allowed adjustment range for each data input measure, and then select **Apply**.

   In this example, you configure constraints for *COGS (Projection)* and *Units Sold (Projection)*.

   > [!NOTE]
   > This step is optional. Skip it if you don't need to restrict the optimization range.

   For more information, see [Configure optimization thresholds](optimizer-overview.md#configure-optimization-thresholds).

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-add-constraints.png" alt-text="Screenshot of configuring minimum and maximum constraint values for optimization variables." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-add-constraints.png":::

1. Review the optimization results.

   Verify the updated values and select **Apply** to write the optimized values back to the planning sheet.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-output-results.png" alt-text="Screenshot of the optimization results showing updated variable values before applying changes." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-output-results.png":::

1. After the optimization completes, the *Profit per unit* value increases from 6.6 to 10.2 while remaining within the specified constraints. In this example, Optimize adjusts *Units Sold (Projection)* to 2k and *COGS (Projection)* to 24.8k.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-calculated-field-results.png" alt-text="Screenshot showing the updated Profit per unit value after Optimize applies the calculated changes." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-calculated-field-results.png":::

## Run Optimize on parent cells

You can also optimize parent (aggregate) cells. When Optimize runs on a parent cell, it recalculates the required adjustment and distributes the updated value proportionally across the editable child cells.

1. Select the target cell in the calculated measure.

1. On the **Planning** ribbon, select **Optimize**.

   In this example, you select the target cell from the *Profit per unit* measure.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/run-optimize-parent-cell.png" alt-text="Screenshot of selecting a parent Profit per unit cell before running Optimize." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/run-optimize-parent-cell.png":::

1. Set **Objective** to **Minimize**.

   Under **Variables to Update**, select *Revenue (Projection)*.

   Select **Next**.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-parent-objective-minimize.png" alt-text="Screenshot of selecting Revenue Projection while minimizing the optimization objective." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-parent-objective-minimize.png":::

1. Configure a constraint for *Revenue (Projection)*.

   Specify the minimum and maximum values that Optimize can use, and then select **Apply**.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-parent-constraint-range.png" alt-text="Screenshot of configuring a range constraint for the Revenue Projection measure." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-parent-constraint-range.png":::

1. Review the optimization results and select **Apply**.

   In this example, Optimize updates *Revenue (Projection)* to meet the optimization objective.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-parent-output-results.png" alt-text="Screenshot showing optimization results before applying updated Revenue Projection values." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-parent-output-results.png":::

1. Optimize reduces *Revenue (Projection)* at the parent level and distributes the updated value proportionally across the editable child rows to achieve the target *Profit per unit*.

   > [!NOTE]
   > Optimization doesn't modify locked child cells.

   :::image type="content" source="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-parent-cell-results.png" alt-text="Screenshot showing optimized parent values distributed proportionally across editable child rows." lightbox="../media/planning-optimize/planning-how-to-maximize-minimize-target-value/optimize-parent-cell-results.png":::

## Related content

[Optimize forecast values to meet a target](planning-how-to-optimize-input-values.md#using-optimize-on-forecast-measures)
