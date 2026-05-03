---
title: Configure row properties
description: Learn how to configure row properties for a model.
ms.date: 04/26/2026
ms.topic: how-to
#customer intent: As a user, I want to learn how to configure the row properties for a model.
---

# Configure row properties in a model

This article explains row properties and how to configure them in a model.

## Hybrid row configuration

The model builder looks like the following image. There are two tabs: **Closed Period** and **Open Period**.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/hybrid-row.png" alt-text="Screenshot of hybrid row configuration showing open and closed periods." lightbox="../media/planning-driver-model/planning-how-to-configure-model-row-properties/hybrid-row.png":::

By default, the row configurations are the same for both closed and open periods. Toggle between the tabs to specify different row configurations for the open and the closed periods.

Open period row values represent the plan, forecast, or any projection measures. Closed period values refer to the actuals. Using this option, you can configure different formulas, data sources, or manual values for the actuals and the forecast.

## Row properties

To configure the row properties, select the **Type**, **Configuration**, and **Aggregation** dropdown menus from the model builder view. Make sure to choose the correct period, open or closed.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/row-type.png" alt-text="Screenshot of row type and configuration dropdowns." lightbox="../media/planning-driver-model/planning-how-to-configure-model-row-properties/row-type.png":::

Or, hover over a row and select the pencil icon beside the row name to edit the complete row properties.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/edit-row-properties.png" alt-text="Screenshot of edit icon beside the row name.":::

A side panel opens to configure the properties. It has **General** and **Display** tabs. In the **General** tab, configure all row properties. In the **Display** tab, configure node display settings for the tree view.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/row-properties-panel.png" alt-text="Screenshot of row properties side panel.":::

The following sections describe the setting options.

### Row name

Enter or edit the name of the row.

## Type

Assign the type of the row to set up the right configuration. Select one of the following row types:

| Row type | Description |
|----------|-------------|
| Formula | Row values are derived from the user-defined formula for the row. |
| Data Source | Row values are retrieved from the corresponding source data. |
| Data Input | Row allows users to manually enter the values. |
| Aggregate | Row aggregates values from child rows (for example, sum, product, average, and so on). |
| Driver Input | Row values are calculated based on the configured driver row, driver method, and driver inputs. |
| Distribution | Specified row total is distributed based on weights derived from the row itself or other rows, or is equally distributed. You can also use it to copy row values from another row instead of a distribution function. |
| Linked Row | The row values, its properties, and simulation settings are linked to another row. This type can be configured for rows in the Open Period. |

## Configuration

Based on the row type, fill in the configuration as follows.

### Formula

For a **Formula** row, enter the configuration as a formula. You can type the formula manually or select from the suggestions that appear as you start typing.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/formula-editor.png" alt-text="Screenshot of formula editor." lightbox="../media/planning-driver-model/planning-how-to-configure-model-row-properties/formula-editor.png":::

>[!NOTE]
>To access help suggestions with examples, press <kbd>Ctrl</kbd>+<kbd>Space</kbd>. To select between row references and functions, switch between the **References** and **Functions** tabs.

### Data Source

For **Data Source** rows, the row values are retrieved from the source data based on the row you select from the dropdown menu.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/data-source-row.png" alt-text="Screenshot of data source row." lightbox="../media/planning-driver-model/planning-how-to-configure-model-row-properties/data-source-row.png":::

### Data Input

For **Data Input** rows, you can either enter values manually or copy values from an existing row.

* **Row**: Select a data source row whose values you want to copy.
* **Static**: Enter a value to be applied across all periods.

The following example demonstrates both options configured.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/data-input-row.png" alt-text="Screenshot of data input row." lightbox="../media/planning-driver-model/planning-how-to-configure-model-row-properties/data-input-row.png":::

### Aggregate

This type offers various aggregation options, letting you define how child rows are aggregated. Options include *Sum*, *Subtract*, *Product*, *Divide*, *Minimum*, *Maximum*, *First*, *Last*, *Average*, and *Average (Leaf Only).*

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/aggregate-row.png" alt-text="Screenshot of aggregate row.":::

### Linked Row

For a **Linked Row**, you can select another row to link. Linked rows share the same values, properties, configuration, and simulation behavior, ensuring they remain in sync. Use this type when you need to reuse the same row in multiple parts of the model, as it lets you change all instances at once. This type can be specified for open period rows.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/linked-row.png" alt-text="Screenshot of linked row." lightbox="../media/planning-driver-model/planning-how-to-configure-model-row-properties/linked-row.png":::

### Driver Input

If you choose the **Driver Input** type for a row, define how its values are calculated by selecting a **driver row** (the source row that influences it) and a **driver method**—such as addition, subtraction, multiplication, division, percentage of, or growth by.

You can specify the aggregation and distribution methods for Driver Input rows.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/driver-input.png" alt-text="Screenshot of driver input row." lightbox="../media/planning-driver-model/planning-how-to-configure-model-row-properties/driver-input.png":::

Based on the inputs entered in the Planning sheet, this row is automatically calculated using the selected driver configuration. To learn more, refer to this section: [Create a driver model](planning-how-to-create-driver-model.md).

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/driver-input-in-planning-sheet.png" alt-text="Screenshot of driver input entered in the Planning sheet." lightbox="../media/planning-driver-model/planning-how-to-configure-model-row-properties/driver-input-in-planning-sheet.png":::

### Distribution

This row type lets you specify how the entered row total value is distributed—either equally, based on weights, or by copying values by trend.

If you select to distribute by weight, specify the row from which the weights are derived.

If you select **Copy**, choose how values are copied:

* Copy without trend
* Copy with trend by value
* Copy with trend by percentage, and specify the trend values

Enter the total in the Planning sheet. The values are distributed or copied accordingly based on the selected method.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/distribution-row.png" alt-text="Screenshot of distribution type row." lightbox="../media/planning-driver-model/planning-how-to-configure-model-row-properties/distribution-row.png":::

### Formatting

Use the following options to control how values are displayed:

* **Scale:** Choose a number scaling option, such as *None*, *Auto*, *Thousands*, *Millions*, *Billions*, or *Trillions*.
* **Decimal Points:** Specify the number of decimal places to display for numeric values.
* **Prefix:** Add a prefix to values, such as a currency symbol.
* **Suffix:** Add a suffix to values, such as units.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/formatting-trend-simulation.png" alt-text="Screenshot of formatting, trend, and simulation options.":::

### Tree view layout 

Use the Desired Trend and Simulation settings in the tree view layout.

#### Desired trend

Set the desired trend for a row to *Increase* or *Decrease* depending on the row context. For instance, the desired trend for the *Revenue* row is *Increase*, while for the *Expense* row, it's *Decrease*.

This setting controls how node values are represented visually in the tree layout. When you simulate in the direction of the desired trend, the node is represented in green; when you simulate in the opposite direction, the node is represented in red.

#### Simulation

**Slide Right to:** To increase the node value on sliding right, set the Slide Right to property as *Positive Simulation*. To decrease the value, set it as *Negative Simulation*.

**Value:** Set the maximum simulation range. The default simulation range is 100, so the simulation percentages are calculated as a percentage of 100.

## Aggregation

Specify how the total row value is aggregated from the period or column values.

:::image type="content" source="../media/planning-driver-model/planning-how-to-configure-model-row-properties/column-aggregation.png" alt-text="Screenshot of column aggregation for a row.":::

The following table shows the available aggregations:

| Time aggregation | Description |
|------------------|-------------|
| Sum | Adds all the period values. |
| Minimum | Returns the minimum value among the period values. |
| Maximum | Returns the maximum value among the period values. |
| Average (children) | Calculates the average of the immediate child node values. |
| Average (leaf) | Calculates the average of the leaf node values. |
| Average excluding zeros | Calculates the average of the non-zero period values. |
| First | Displays the first period value of the node. |
| Last | Displays the last period value of the node. |
| Weighted average | Calculates the weighted average of the period values based on selected nodes. |
| Standard deviation | Calculates the standard deviation of the period values. |
| Formula | Calculates and applies a custom formula entered by the user. |

## Other options

* **Distribute parent value to children:** For Data Input rows, select this option to distribute the entered parent row value to child rows.
* **Include in total**: When enabled, the row values are included in the parent total. This setting is enabled by default.
* **Bind for Cross filter/RLS**: Enable **Bind for Cross filter/RLS** to ensure that cross-filter selections and row-level security (RLS) rules are applied to formula rows and data input rows that reference other rows. If the Bind for cross filter/RLS option is disabled, a manager responsible for Canada accounts can see a manually inserted row that references US data.
* **Minimum and Maximum values**: For driver input and distribution type rows, specify the minimum and maximum permissible input values.
* **Description:** Enter any text describing the row or technical notes in the Description box.

## Next steps

[Create a model using model builder](planning-how-to-create-model-using-model-builder.md)

## Related content

[What is a driver model?](planning-concept-driver-model.md)
