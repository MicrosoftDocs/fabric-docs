---
title: Apply conditional formatting to Real-Time Dashboard visuals
description: Learn how to apply conditional formatting to Real-Time Dashboard visuals.
ms.author: yaschust
author: YaelSchuster
ms.reviewer: gabil
ms.topic: how-to
ms.date: 09/21/2023
---

## Apply conditional formatting to Real-Time Dashboard visuals

Conditional formatting allows you to format the visual representation of data points based on their values, utilizing colors, tags, and icons. Conditional formatting can be applied either to a specific set of cells within a designated column or to entire rows.

For each visual, you have the flexibility to define one or more conditional formatting rules. In cases where multiple rules conflict, the last rule defined will take precedence over any previous ones.

## Prerequisites

* A [Table](customize-dashboard-visuals.md#table), [Stat](customize-dashboard-visuals.md#stat), or [Multi Stat](customize-dashboard-visuals.md#multi-stat) dashboard visual.

## Add a conditional formatting rule

1. On the tile that you'd like to customize, select the **Edit** icon.

    :::image type="content" source="media/dashboard-conditional-formatting/multi-stat-injuries.png" alt-text="Screenshot of the tile edit icon on a table visual." lightbox="media/dashboard-conditional-formatting/multi-stat-injuries.png":::

1. In the **Visual formatting** pane, scroll to the bottom and toggle **Conditional formatting** from **Hide** to **Show**.

1. Select **Add rule**. A new rule appears with default values.

    :::image type="content" source="media/dashboard-conditional-formatting/add-rule-button.png" alt-text="Screenshot of the conditional formatting add rule button." lightbox="media/dashboard-conditional-formatting/add-rule-button.png":::

1. On the new rule, select the **Edit** icon. The **Conditional formatting** pane opens. For table visuals, you can either [color by condition](#color-by-condition) or [color by value](#color-by-value). For stat and multi stat visuals, you can only [color by condition](#color-by-condition).

## Color by condition

1. In this example, we're going to create a rule that will color the cells of states in which the damage column is a value greater than zero. Enter the following information:

    Field | Description | Suggested value
    |---|---|---|
    | Rule type | Condition-based rules or absolute value-based rules. | Color by condition
    | Rule name | Enter a name for this rule. If not defined, the condition column will be used by default. | Nonzero damage
    | Color style | Color formatting cell fill or text. |Bold
    | **Conditions**
    | Column | The column to be used for the condition definition. |  Damage
    | Operator | The operator to be used to define the condition. | Greater than ">"
    | Value | The value to be compared to the condition. |
    |**Formatting**
    | Apply options | Apply the formatting to cells in a specific column or to the entire row. | Apply to cells
    | Column | The column on which the formatting is applied. By default, this column is the condition column. This option is only available when **Formatting: Apply options** is set to *Apply to cells*. | State
    | Hide text | Hides the text in the formatted column. This option is only available when **Formatting: Apply options** is set to *Apply to cells*. | Off
    | Color | The color to apply to the formatted column/rows. | Red
    | Tag | Optional tag to add to the formatted column. This option is only available when **Formatting: Apply options** is set to *Apply to cells*. | Blank
    | Icon | Optional icon to add to the formatted column. This option is only available when **Formatting: Apply options** is set to *Apply to cells*. | No icon

1. Select **Save**. The visual will now be colored conditionally. Note in this example that the *State* column is highlighted when the *Damage* column is greater than zero.

## Color by value

The color by value conditional formatting option allows you to visualize values on a color gradient. This option is available for table visuals.

To color your results by value:

1. In the **Conditional formatting** window, set the **Rule type** to **Color by value**.

    :::image type="content" source="media/dashboard-conditional-formatting/color-by-value.png" alt-text="Screenshot of option to color by value." lightbox="media/dashboard-conditional-formatting/color-by-value.png":::

1. Enter information for the following fields:
   
    | Field | Required | Description |
    |--|--|--|
    | **Rule name** |  | A name for the rule. If not defined, the condition column is used. |
    | **Column** | &check; | The column to be used for the condition definition. |
    | **Theme** | &check; | The color theme: **Traffic lights**, **Cold**, **Warm**, **Blue**, **Red**, or **Yellow**. The default is **Traffic lights**. |
    | **Min value** |  | Minimum value for conditional coloring. |
    | **Max value** |  | Maximum value for conditional coloring. |
    | **Reverse colors** |  | A toggle option that defines the direction of the gradient. |
    | **Apply options** | &check; | Apply the formatting to cells in a specific column or to the entire row. |

1. Select **Save**. In the following example, the cells of a table are colored based on the `Count` column.

    :::image type="content" source="media/dashboard-conditional-formatting/color-by-value-example.png" alt-text="Screenshot of option to color by value." lightbox="media/dashboard-conditional-formatting/color-by-value-example.png":::

## Related content

* [Visualize data with Real-Time Dashboards](real-time-dashboards.md)
* [Customize Real-Time Dashboard visuals](customize-dashboard-visuals.md)
