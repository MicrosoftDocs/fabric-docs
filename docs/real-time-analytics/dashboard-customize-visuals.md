---
title: Customize Real-Time Analytics dashboard visuals
description: Easily customize your Real-Time Analytics dashboard visuals
ms.reviewer: gabil
ms.topic: how-to
ms.date: 09/19/2023
---

# Customize Real-Time Analytics dashboard visuals

Visuals are essential part of any Real-Time Analytics dashboard. This article covers how to customize different visuals.

## Prerequisites

<!-- TODO: Link to the doc on how to create dashboard. -->
* A Real-Time Analytics dashboard
* Permissions to edit the dashboard

## Customize visuals

To make changes in your dashboard:

1. In the top menu, select **Viewing** and toggle to **Editing** mode.

    :::image type="content" source="media/dashboard-customize-visuals/viewing-to-editing-mode.png" alt-text="Screenshot of option to switch to editing mode." lightbox="media/dashboard-customize-visuals/viewing-to-editing-mode.png":::

1. Browse to the tile you wish to change. Select the **Edit** icon.

    :::image type="content" source="media/dashboard-customize-visuals/tile-edit-icon.png" alt-text="Screenshot of the tile edit icon." lightbox="media/dashboard-customize-visuals/tile-edit-icon.png":::

1. To save your changes and return to the dashboard, select **Apply changes**.

    :::image type="content" source="media/dashboard-customize-visuals/apply-changes.png" alt-text="Screenshot of the apply changes button." lightbox="media/dashboard-customize-visuals/apply-changes.png":::

## Table

When **Visual type** is set to **Table**, the following properties are available for customization:

| Section | Property | Description |
|--|--|--|
| **URLs** | **URL column** | The column that contains a URL. |
|  | **Apply link on column** | When selected, this column directs to the URL from the previous property. |
| **Conditional formatting** | **Hide** or **Show** | A toggle option to turn off or turn on conditional formatting. To learn more, see [Conditional formatting](). |

## Bar chart

When **Visual type** is set to **Bar chart**, the following properties are available for customization:

|Section|Property|Description|
|--|--|--|
|General|Visual format|

|Data|Y columns|
||X columns|
||Series columns|

|Legend|

|Y Axis|Label|
||Maximum value|
||Minimum value|
||Y axis scale|
||Reference lines|

|X Axis|Label|
||X axis scale|
||Vertical line value|

## Column chart

When **Visual type** is set to **Column chart**, the following properties are available for customization:

Exact same as bar.

## Area chart

When **Visual type** is set to **Area chart**, the following properties are available for customization:

Exact same as bar.

## Line chart

When **Visual type** is set to **Line chart**, the following properties are available for customization:

same as bar minus the general section.

## Stat

When **Visual type** is set to **Stat**, the following properties are available for customization:

|Section|Property|Description|
|--|--|--|
|General|Text size|
|Data|Value column|
|Conditional formatting|

## Multi Stat

When **Visual type** is set to **Multi Stat**, the following properties are available for customization:

|Section|Property|Description|
|--|--|--|
|General|Text size|
||Display orientation|
|Layout|Slot configuration|
|Data|Label column|
||Value column|
|Conditional formatting|

## Pie chart

When **Visual type** is set to **Pie chart**, the following properties are available for customization:

|Section|Property|Description|
|--|--|--|
|General|Visual format|
|Data|Category column|
||Numeric column|

|Legend|
|Label|Text|
|Tooltip|Text|
|Display options|Order by|
||Top N|

## Scatter chart

When **Visual type** is set to **Scatter chart**, the following properties are available for customization:

Same as bar minus general.

## Time chart

When **Visual type** is set to **Time chart**, the following properties are available for customization:

Same as bar minus general.

## Anomaly chart

When **Visual type** is set to **Anomaly chart**, the following properties are available for customization:

Same as bar minus general.

## Funnel chart

When **Visual type** is set to **Funnel chart**, the following properties are available for customization:

|Section|Property|Description|
|--|--|--|
|Data|Category column|
||Value column|

## Map

When **Visual type** is set to **Map**, the following properties are available for customization:

|Section|Property|Description|
|--|--|--|
|Data|Define location by|
||Label column|
|Size|Hide|
||Size column|

## Markdown

When **Visual type** is set to **Markdown**, the following properties are available for customization:

|Property|Description|
|--|--|
|Column||

## Heatmap

When **Visual type** is set to **Heatmap**, the following properties are available for customization:

|Section|Property|Description|
|--|--|--|
|Data|Y column|
||X column|
||Value|
|X axis|Label|
|Y axis|Label|
|Colors|Color palette|

## Plotly

When **Visual type** is set to **Plotly**, the following properties are available for customization:

|Property|Description|
|--|--|
|Column||

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
