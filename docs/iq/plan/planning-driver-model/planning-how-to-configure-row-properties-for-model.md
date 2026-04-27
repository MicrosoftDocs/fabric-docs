---
title: Configure row properties for the model
description: Learn how to configure row properties for a model
ms.date: 04/26/2026
ms.topic: how-to
#customer intent: As a user, I want to learn how to configure the row properties for a model.
---

# Configure row properties in the model

In this article, you learn about the row properties and how to configure them in a model.

## **Hybrid Row Configuration**

The Model Builder looks as shown below. There are two tabs: **Closed Period** and **Open Period.**

By default, the row configurations are the same for both closed and open periods when you start. Toggle between the tabs to specify different row configurations for the open and the closed periods.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/hybrid-row.jpg" alt-text="Screenshot of hybrid row configuration showing open and closed periods.":::

Open period row values represent the plan, forecast, or any projection measures, whereas the closed period values refer to the actuals. Using this option, you can configure different formulas, data sources, or manual values for the actuals and the forecast.

## Row Properties

To configure the row properties, select the **Type**, **Configuration,** and **Aggregation** dropdowns from the model builder view and choose the required options. Make sure you choose the correct period (open/closed).

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/row-type.jpg" alt-text="Screenshot of row type and configuration dropdowns.":::

Alternatively, hover over a row and select the pencil icon beside the row name to edit the complete row properties.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/edit-row-properties.png" alt-text="Screenshot of edit icon beside the row name.":::

A side panel opens where you can configure the properties. It has **General** and **Display** tabs. Configure all row properties in the General tab and node display settings for the tree view in the Display tab.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/row-properties-panel.png" alt-text="Screenshot of row properties side panel.":::

### **Row name**

Enter or edit the name of the row.

### Type

Assign the type of the row, which helps set up the required configuration. Select one of the row types below:

<table><thead><tr><th width="139">Row type</th><th>Description</th></tr></thead><tbody><tr><td>Formula</td><td>Row values are derived from the user-defined formula for the row. </td></tr><tr><td>Data Source</td><td>Row values are retrieved from the corresponding source data.</td></tr><tr><td>Data Input</td><td>Row allows users to manually enter the values.</td></tr><tr><td>Aggregate</td><td>Row aggregates values from child rows (for example, sum, product, average, etc.).</td></tr><tr><td>Driver Input</td><td>Row values are calculated based on the configured driver row, driver method, and driver inputs. </td></tr><tr><td>Distribution</td><td>Specified row total is distributed based on weights derived from the row itself or other rows or can also be equally distributed. You can also use it to copy row values from another row instead of a distribution function.</td></tr><tr><td>Linked Row</td><td>The row values, its properties, and simulation settings are linked to another row. This type can be configured for rows in the Open Period.</td></tr></tbody></table>

### **Configuration**

Based on the row types, fill in the configuration as required.

#### **Formula**

For a **Formula** row, enter the configuration as a formula. You can type the formula manually and/or select from the suggestions that appear as you start typing.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/formula-editor.png" alt-text="Screenshot of formula editor.":::

>[!Note]
>To access help suggestions with examples, press Ctrl+Space. To select between row references and functions, switch between the **References** and **Functions** tabs.

#### **Data Source**

In this case, the row values are retrieved from the source data based on the row you select from the dropdown menu.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/data-source-row.png" alt-text="Screenshot of data source row.":::

#### **Data Input**

For **Data Input** nodes, you can either enter values manually or copy values from an existing row.

* **Row**: Select a data source row whose values you want to copy.
* **Static**: Enter a value to be applied across all periods.

The example below demonstrates both options configured.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/data-input-row.png" alt-text="Screenshot of data input row.":::

#### **Aggregate**

This type offers various aggregation options, allowing you to define how child rows have to be aggregated. Options include *Sum*, *Subtract*, *Product*, *Divide*, *Minimum*, *Maximum*, *First*, *Last*, *Average*, and *Average (Leaf Only).*

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/aggregate-row.png" alt-text="Screenshot of aggregate row.":::

#### **Linked Row**

In a **Linked Row**, you can select another row to link to. Linked rows share the same values, properties, configuration, and simulation behavior, ensuring they remain in sync. Use this type when the same row must be reused in multiple parts of the model, allowing all instances to be changed once. This type can be specified for open period rows.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/linked-row.png" alt-text="Screenshot of linked row.":::

#### **Driver Input**

If you choose the **Driver Input** type for a row, you can define how its values are calculated by selecting a **driver row** (the source row that influences it) and a **driver method**—such as addition, subtraction, multiplication, division, percentage of, or growth by.

You can also specify the aggregation and distribution methods for Driver Input rows.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/driver-input.png" alt-text="Screenshot of driver input row.":::

Based on the inputs entered in the planning sheet, this row is automatically calculated using the selected driver configuration. To learn more, refer to this section: [Create a driver-based model](./planning-how-to-create-driver-based-model.md).

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/driver-input-in-planning-sheet.png" alt-text="Screenshot of driver input entered in the planning sheet.":::

#### **Distribution**

This row type allows you to specify how the entered row total value should be distributed—either equally, based on weights, or by copying values by trend.

If you select to distribute by weight, specify the row from which the weights are derived.

If you select **Copy**, choose how values should be copied:

* Copy without trend
* Copy with trend by value
* Copy with trend by percentage, and specify the trend values

Enter the total in the planning sheet, and the values are distributed or copied accordingly based on the selected method.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/distribution-row.png" alt-text="Screenshot of distribution type row.":::

### Formatting

Use the following options to control how values are displayed:

* **Scale:** Choose a number scaling option, such as *None*, *Auto*, *Thousands*, *Millions*, *Billions*, or *Trillions*.
* **Decimal Points:** Specify the number of decimal places to display for numeric values.
* **Prefix:** Add a prefix to values, such as a currency symbol.
* **Suffix:** Add a suffix to values, such as units.

>[!Note]
>The following settings—Desired Trend and Simulation settings are for the tree view layout.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/formatting-trend-simulation.png" alt-text="Screenshot of formatting, trend, and simulation options.":::

### **Desired Trend**

The desired trend for a row can be set to *Increase* or *Decrease* depending on the row context. For instance, the desired trend for the *Revenue* row is *Increase* whereas for the *Expense* row, it is *Decrease*.

This setting controls how node values are represented visually in the tree layout. When you simulate in the direction of the desired trend, the node is represented in green; when you simulate in the opposite direction, the node is represented in red.

### Simulation

**Slide Right to:** To increase the node value on sliding right, set the Slide Right to property as *Positive Simulation* and to decrease the value, set it as *Negative Simulation*.

**Value:** Set the maximum simulation range. The default simulation range is 100, so the simulation percentages are calculated as a percentage of 100.

### Aggregation

Specify how the total row value should be aggregated from the period or column values.

:::image type="content" source="../media/planning-model-builder/planning-how-to-configure-row-properties-for-model/column-aggregation.png" alt-text="Screenshot of column aggregation for a row.":::

The following are the available aggregations:

<table><thead><tr><th width="255">Time aggregation</th><th>Description</th></tr></thead><tbody><tr><td>Sum</td><td>Adds all the period values.</td></tr><tr><td>Minimum</td><td>Returns the minimum value among the period values.</td></tr><tr><td>Maximum</td><td>Returns the maximum value among the period values.</td></tr><tr><td>Average (children)</td><td>Calculates the average of the immediate child node values.</td></tr><tr><td>Average (leaf)</td><td>Calculates the average of the leaf node values.</td></tr><tr><td>Average excluding zeros</td><td>Calculates the average of the non-zero period values.</td></tr><tr><td>First</td><td>Displays the first period value of the node.</td></tr><tr><td>Last</td><td>Displays the last period value of the node.</td></tr><tr><td>Weighted average</td><td>Calculates the weighted average of the period values based on selected nodes.</td></tr><tr><td>Standard deviation</td><td>Calculates the standard deviation of the period values.</td></tr><tr><td>Formula</td><td>Calculates and applies a custom formula entered by the user.</td></tr></tbody></table>

### Other Options

**Distribute parent value to children:** For Data Input rows, select this option to allocate the entered parent row value to child rows.

**Include in total**: When enabled, the row values are included in the parent total. It is enabled by default.

**Bind for Cross filter/RLS**: Enable **Bind for Cross filter/RLS** to ensure that cross-filter selections and row-level security (RLS) rules are applied to formula rows and data input rows that reference other rows. If the Bind for cross filter/RLS option is disabled, a manager responsible for *Canada* accounts can see a manually inserted row that references *US* data.

**Minimum and Maximum values**: For driver input and distribution type rows, you can specify the minimum and maximum permissible input values.

**Description:** Any text describing the row or technical notes can be entered in the Description box.

## Next step

[Create a model using Model Builder](./planning-how-to-create-model-using-model-builder.md)

## Related content

[What is a driver model?](../planning-concept-driver-model.md)
