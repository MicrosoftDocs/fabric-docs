---
title: Configure General Properties for a Column in PowerTable
description: Learn how to configure input type, validation rules, constraints, and default value for columns in PowerTable.
ms.date: 07/04/2026
ms.topic: how-to
#customer intent: As a user, I want to configure general properties for a column such as input type, validation rules, constraints, and default value so that I can control how data is entered and validated in PowerTable.
---

# Configure general properties for a column

Use the **General** tab to set the data type, validation rules, constraints, and default value for a column.

## Configure general properties

To configure the general properties:

1. Select **Setup** > **Columns**.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/setup-columns.png" alt-text="Screenshot of the Column option under the Setup tab.":::

1. The column configuration window opens. Select the pencil icon next to the column name or double-click the column name.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/edit-icon-column-name.png" alt-text="Screenshot of the edit icon beside the column name for configuring column properties." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/edit-icon-column-name.png":::

1. Select the **General** tab in the side panel.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/general.png" alt-text="Screenshot of the General tab in the side panel." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/general.png":::

You can configure the following properties:

* [Input type](#input-type)
* [Constraints](#constraints)
* [Default value](#default-value)

## Input type

Use the **Input Type** property to specify how to enter, store, and display data in a column.

PowerTable sheet supports a wide range of input types. The available input types depend on the column's underlying SQL data type.

For example:

* Numeric data types such as `INT`, `BIGINT`, `FLOAT`, and `DECIMAL` support input types such as **Number**, **Single Select**, **Decimal**, **Currency**, **Percent**, **Percent Complete**, and **Rating**.

  :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/input-type-number.png" alt-text="Screenshot of the input types for numeric data types." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/input-type-number.png":::

* Date and time data types support input types such as **Date Time** and **Single Select**.

  :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/input-type-date-time.png" alt-text="Screenshot of the input types for date and time data types." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/input-type-date-time.png":::

* Text-based data types such as `VARCHAR` and `NVARCHAR` support input types such as **Text**, **Email**, **URL**, **Phone Number**, **Person** (name or email), **Image** (URL-based), **Single Select**, and **Check Box**.

  :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/input-type-text.png" alt-text="Screenshot of the input types for text data types." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/input-type-text.png":::

* Boolean data types support input types such as **Check Box**.

Depending on the input type you choose, you can set more properties. For example, you can set minimum and maximum values for numeric input types and a list of selectable values for single select columns.

For a complete list of supported column types and their input types, see [Supported column input types](../powertable-reference-supported-column-input-types.md).

## Constraints

Use the **Constraints** section to restrict input values within a range and configure field validation.

### Minimum and maximum values

Use **Minimum** and **Maximum** to set the range of allowed values for a column. The system doesn't accept values outside the configured range.

These constraints apply to the input types of **Number**, **Currency**, and **Date Time**.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/min-max.png" alt-text="Screenshot of the Minimum and Maximum constraints fields where you can set limits." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/min-max.png":::

Existing table values stay the same. When you enter new values outside the configured range, PowerTable sheet shows a message that indicates the permitted limits.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/min-max-error.png" alt-text="Screenshot of the error message." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/min-max-error.png":::

> [!NOTE]
> You can set a minimum value, a maximum value, or both.

For **Date** and **Date Time** columns, you can define a valid date range or a date-time range. The system doesn't accept values outside the configured range.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/min-max-date.png" alt-text="Screenshot of the Minimum and Maximum constraints for the Date Time input type." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/min-max-date.png":::

### Field validation

Use **Field Validation** to control the type of values that a **text** column accepts.

The following validation options are available:

* **Any value**
* **Numeric**
* **Alphanumeric**
* **Non Numeric**
* **Regex**

When you select **Regex**, specify a regular expression pattern to validate user input. PowerTable rejects values that don't match the configured validation rule or the regex pattern.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/field-validation.png" alt-text="Screenshot of the Field Validation options for text input type." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/field-validation.png":::

### Other number properties

For decimal input type, you can configure the default number of decimal places to display.

Select **Allow Negative Numbers** to allow negative entries in the column.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/decimal-points.png" alt-text="Screenshot of the allowed Decimal Points configuration." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/decimal-points.png":::

## Default value

Use **Default Value** to automatically populate a column when you create new rows. This setting helps ensure that new records already contain a valid initial value and reduces manual data entry. Existing column values remain unchanged.

Set default values by using a **manual** static value or a **formula**.

### Manual value

To configure a static default value:

1. Select **Manual**.
1. Enter the required value.

The following example uses **NA** as the default value for the **Product Description** column.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/default-manual.png" alt-text="Screenshot of entering manual default value." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/default-manual.png":::

When you insert a new row, the default value automatically populates the cell, and you can modify it later as needed.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/default-value-populated.png" alt-text="Screenshot of the table with automatically populated default value." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/default-value-populated.png":::

### Reset to default on update

Turn on **Reset to default on update** to automatically reset the column to its configured default value whenever you update the record.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/reset-default-on-update.png" alt-text="Screenshot of Reset to Default on Update checkbox." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/reset-default-on-update.png":::

When you enable this option:

* Existing values stay unchanged until you update the record.
* The value resets to the configured default when you modify other fields in the same record.

In this example, changing the product name automatically resets the product description to the default value NA.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/resets-default-value.png" alt-text="Screenshot of the column value resetting to its default value in the table when the record is updated." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/resets-default-value.png":::

Other default value options are available for specific input types:

* **Person**: Use a user's name or email address as the default value.
* **Single Select**: Select a default value from the configured list of options.

    :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/single-select-default.png" alt-text="Screenshot of the default value options for the Single Select input type." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/single-select-default.png":::

* **Check Box**: Configure default values such as True/False, 1/0, Yes/No, or custom text by selecting **Checked** or **Unchecked**.

    :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/checkbox-default.png" alt-text="Screenshot of the default value options for the Check Box input type." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/checkbox-default.png":::

### Formula

Use **Formula** to calculate default values dynamically.

PowerTable sheet supports formulas and functions for generating default values. These values automatically recalculate based on the underlying reference data.

The following input types support formula-based default values:

* Number
* Decimal
* Text
* Date Time
* Person
* Email

### Recalculate data on update

Enable **Recalculate data on update** to automatically reset the column to its calculated default value whenever you update the record.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/recalculate-data-on-update.png" alt-text="Screenshot of the Recalculate data on update checkbox." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/recalculate-data-on-update.png":::

When you enable this option:

* Existing values stay unchanged until you update the record.
* When you modify another field in the same record, the value resets to the formula-derived default.

In this example, changing the product size calculates the default value and resets the product price to it.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/recalculate-exisiting-value.png" alt-text="Screenshot of the column value resetting to its default value when the record is updated." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-general-column-properties/recalculate-exisiting-value.png":::
