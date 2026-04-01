---
title: Input data into Planning sheets
description: Learn how to enter data in Planning sheets, and add data input rows and columns.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and use data input effectively.
---

# Extend Planning sheets with data input

Data input rows and columns allow Planning sheet authors to extend a sheet by entering values directly within the matrix. These inputs support planning, forecasting, and operational scenarios where certain values must be captured manually or adjusted within the sheet.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Using data input rows and columns, you can capture business inputs that aren't available in the underlying dataset or need manual adjustments while maintaining the sheet's hierarchy, totals, and calculations.

## When to use data input rows and columns

Data input rows and columns are useful when you need to:

* Capture manual adjustments or planning values.
* Add business metrics that aren't available in the dataset.
* Insert placeholder rows for future categories or products.
* Allow business users to enter data directly in the Planning sheet.

For example, a financial report might retrieve revenue and expenses from a database but require manual entry for values such as **shares outstanding** or newly introduced product categories.

## Prerequisites

Before you create data input rows or columns, make sure that you have the following prerequisites in place:

* The Planning sheet is configured with the required dataset.
* You have **edit permissions** in the Planning sheet.
* The Planning sheet includes the **row or column hierarchy** where data input is to be added.

## Insert a data input row

1. Select a row in the sheet where you want to insert the new row.
1. Go to **Insert Row** and select the **row type** to be inserted.

    :::image type="content" source="media/planning-how-to-input-data/insert-row.png" alt-text="Screenshot of inserting a new row and choosing a type." lightbox="media/planning-how-to-input-data/insert-row.png":::

1. Insert a **Data Input Number row**.
1. Enter the **Title** for the **Static Row** and configure the row properties.

    :::image type="content" source="media/planning-how-to-input-data/static-row.png" alt-text="Screenshot of configuring a static row.":::

1. Select **Create**.
1. The new row is inserted after the selected row and becomes available for manual data entry.

    :::image type="content" source="media/planning-how-to-input-data/new-row.png" alt-text="Screenshot of a new row that can be edited.":::

### Configure row properties

When creating a data input row, you can configure the following properties.

#### **Insert As**

* **Single**: Single row is inserted.
* **Templated**: Multiple rows are inserted across dimension hierarchies.

#### Scaling factor

Specifies the numeric scaling applied to the row values, such as thousands or millions. The default option is **Auto**.

#### Include in total

Determines whether values entered in the row contribute to parent totals or grand totals.

#### Distribute parent value to children

When enabled, values entered at a parent level are automatically distributed across child rows.

#### Bind for cross-filter or RLS

Ensures that **cross-filter selections and row-level security (RLS)** rules apply to manually inserted rows. This action prevents users from viewing data outside their permitted scope.

:::image type="content" source="media/planning-how-to-input-data/row-properties.png" alt-text="Screenshot of the Static Row configuration including the properties described in this section.":::

These settings help control how users interact with manually inserted rows.

## Insert a data input column

### Types of data input columns

Planning sheet supports various types of data input columns to be inserted, depending on your needs.

* **Formula**: A calculated column that derives values using formulas.
* **Number**: A column for numeric input, including integers, decimals, currency, or percentages.
* **Simulate**: A column for entering values used in scenario simulations or adjustments.
* **Text**: A column for free-form text input.
* **Checkbox**: A boolean input column for true/false or checked/unchecked values.
* **Person**: A column to select or assign a person from a predefined list.
* **List**: A dropdown input column allowing selection from predefined options.
* **Date**: A column for selecting or entering dates.
* **Audit**: A tracking column that logs changes and user actions for auditing purposes.

:::image type="content" source="media/planning-how-to-input-data/insert-column.png" alt-text="Screenshot of the Insert Column configuration.":::

### Steps to insert a data input column

1. Go to **Planning > Insert Column**.
1. Select the data input column you want to configure.
1. Insert a data input **Number** column. You can insert an empty series and enter your values, or copy from another series in the sheet.

    :::image type="content" source="media/planning-how-to-input-data/insert-number-column.png" alt-text="Screenshot of inserting a new column with a Number input.":::

1. Enter the **Title** and configure the [properties](#configure-column-properties). Select **Create**. The Number input data column is created.

    :::image type="content" source="media/planning-how-to-input-data/number-column.png" alt-text="Screenshot of the new Number column in the Planning sheet." lightbox="media/planning-how-to-input-data/number-column.png":::

1. Double-click and enter the values in the cell.

    :::image type="content" source="media/planning-how-to-input-data/enter-value.png" alt-text="Screenshot of entering value in the new Number column in the Planning sheet." lightbox="media/planning-how-to-input-data/enter-value.png":::

1. Similarly, you can insert the other types of data input measures and columns.

### Configure column properties

Columns have the following configurable properties:

* **Title**: Name of the input column displayed in the Planning sheet.
* **Insert as**:
* **Visual Measure -** A column is added at each column hierarchy.
  * **Visual Column -** A single column is added at the end outside the column hierarchy.
* **Input type**: Specifies the data type for the column (such as *Number*).
* **Row aggregation type**: Defines how values roll up across hierarchy levels (such as *Sum*).
* **Distribute parent value to children**: Automatically allocates parent values proportionally to child members.
* **Enable Multi-Dimension Allocation**: Allows splitting values across multiple dimension breakdowns.
* **Minimum Value**: Sets the lowest allowable input value for validation.
* **Maximum Value**: Sets the highest allowable input value for validation.
* **Static Value**: Set a fixed value.

:::image type="content" source="media/planning-how-to-input-data/column-properties.png" alt-text="Screenshot of the column settings configurable from the Data Input pane.":::
