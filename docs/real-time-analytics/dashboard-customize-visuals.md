---
title: Customize Real-Time Analytics dashboard visuals
description: Easily customize your Real-Time Analytics dashboard visuals
ms.reviewer: gabil
ms.topic: how-to
ms.date: 09/12/2023
---

# Customize Real-Time Analytics dashboard visuals

Visuals are essential part of any Real-Time Analytics dashboard. In this article, you'll learn how to customize different visuals.

## Prerequisites

<!-- TODO: Link to the doc on how to create dashboard. -->
* A Real-Time Analytics dashboard
* Permissions to edit the dashboard

## Customize visuals

To make changes in your dashboard:

1. On the top menu, select **Viewing** and toggle to **Editing** mode.

1. Browse to the tile you wish to change. Select the **Edit** icon.

1. Once you've finished making changes in the visual pane, select **Apply changes** to return to the dashboard and view your changes.

## Properties for customization

Use the following properties to customize visuals.

|Section  |Description | Visual types
|---------|---------|-----|
|**General**    |    Select the **stacked** or **non stacked** chart format  | [Bar](../kusto/query/visualization-barchart.md), [Column](../kusto/query/visualization-columnchart.md), and [Area charts](../kusto/query/visualization-areachart.md) |
|**Data**    |   Select source data **Y and X Columns** for your visual. Keep the selection as **Infer** if you want the platform to automatically select a column based on the query result    |[Bar](../kusto/query/visualization-barchart.md), [Column](../kusto/query/visualization-columnchart.md), [Scatter](../kusto/query/visualization-scatterchart.md), and [Anomaly charts](../kusto/query/visualization-anomalychart.md)|
|**Legend**    |   Toggle to show or hide the display of legends on your visuals   |[Bar](../kusto/query/visualization-barchart.md), [Column](../kusto/query/visualization-columnchart.md), [Area](../kusto/query/visualization-areachart.md), [Line](../kusto/query/visualization-linechart.md), [Scatter](../kusto/query/visualization-scatterchart.md), [Anomaly chart](../kusto/query/visualization-anomalychart.md) and [Time charts](../kusto/query/visualization-timechart.md) |
|**Y Axis**     |   Allows customization of Y-Axis properties: <br>**Label**: Text for a custom label. <br>**Maximum Value**: Change the maximum value of the Y axis.  <br>**Minimum Value**: Change the minimum value of the Y axis.        |[Bar](../kusto/query/visualization-barchart.md), [Column](../kusto/query/visualization-columnchart.md), [Area](../kusto/query/visualization-areachart.md), [Line](../kusto/query/visualization-linechart.md), [Scatter](../kusto/query/visualization-scatterchart.md), [Anomaly](../kusto/query/visualization-anomalychart.md), and [Time charts](../kusto/query/visualization-timechart.md) |
|**X Axis**     |    Allows customization of X-axis properties. <br>**Label**: Text for a custom label.    | [Bar](../kusto/query/visualization-barchart.md), [Column](../kusto/query/visualization-columnchart.md), [Area](../kusto/query/visualization-areachart.md), [Line](../kusto/query/visualization-linechart.md), [Scatter](../kusto/query/visualization-scatterchart.md), [Anomaly](../kusto/query/visualization-anomalychart.md), and [Time charts](../kusto/query/visualization-timechart.md)|
|**Render links**     |    Toggle to make links that start with "https://" in tables, clickable. <br>**Apply on columns**: Select columns containing URL.   | [Table](../kusto/query/visualization-table.md)|
|**Layout**     |    Select the layout configuration for multi stat visual. <br>**Apply on columns**: Select columns containing URL.     | Multi stat|


## Conditional formatting

> [!NOTE]
> This feature is supported for table, stat and multi stat visuals.

Conditional formatting is used to format the visual data points by their values using colors, tags, and icons.  Conditional formatting can be applied to a specific set of cells in a predetermined column or to entire rows.
Each visual can have one or more conditional formatting rules defined. When multiple rules conflict, the last rule will override previous rules.

### Add a conditional formatting rule

1. Enter the editing mode of the table, stat, or multi stat visual you wish to conditionally format.

1. In the **Visual formatting** pane, scroll to the bottom and toggle **Conditional formatting** to **Show**.

1. Select **Add rule**. A new rule appears with default values.

1. Select the **Edit** icon. The **Conditional formatting** pane opens. You can either [Color by condition](#color-by-condition) or [Color by value](#color-by-value).

#### Color by condition

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

#### Color by value

1. In this example, we're going to create a rule that will color the cells of event count on a gradient determined by the value of this count.  Enter the following information:

    Field | Description | Suggested value
    |---|---|---|
    | Rule type | Condition-based rules or absolute value-based rules. | Color by value
    | Rule name | Enter a name for this rule. If not defined, the condition column will be used by default. |Event count
    | Column | The column to be used for the condition definition. | event
    | Theme | Color scheme. | Cold
    | Min value | Optional minimum value for conditional coloring.
    | Max value |  Optional maximum value for conditional coloring.
    | Apply options | Apply the formatting to cells in a specific column or to the entire row. | Apply to cells |

1. Select **Save**. The visual will now be colored conditionally. Note the color changes based on the value in the **event** column.

## Next steps

* [Use parameters in Real-Time Analytics dashboards](dashboard-parameters.md)
* Explore query results with the [web UI results grid](web-results-grid.md)
* [Write Kusto Query Language queries in the web UI](web-ui-kql.md)
* Use [Dashboard-specific visuals](dashboard-visuals.md)
