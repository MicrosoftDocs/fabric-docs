---
title: Insert Text Columns in a Planning Sheet
description: Learn how to insert and configure text input columns in a planning sheet.
ms.date: 08/25/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to insert and configure text input columns in a planning sheet.
---

# Insert text input columns in planning sheet

This article explains how to insert a text input column in a planning sheet.

Use text columns to capture free-form input in reports. A text column accepts short text, long text, numbers, and alphanumeric inputs.

## Insert a text column

To insert a text column:

1. Go to **Planning** > **Insert Column** > **Text.**

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-text-columns/insert-column-text.png" alt-text="Screenshot of inserting a text column." :::

1. Enter a title and configure the required settings in the side panel that opens when you select **Text**, as shown in the following image.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-text-columns/side-panel.png" alt-text="Screenshot of side panel with configuration options for text column." :::

1. Select **Create.**

After you create the column, double-click a cell to enter text and press Enter to save. You can [modify a text column](how-to-insert-data-input-columns.md#modify-column-properties) to edit its configuration.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-text-columns/entering-text.png" alt-text="Screenshot of entering a text in the text column." :::

## Configure text input column properties

Configure key properties such as **Insert As**, **Input type**, **Default Value**, **Allow entry on Totals/Subtotals**, **On Change Formula**, **Allow Input**, and **Description** as you do for other data input columns. For more information, see [configure data input column properties](how-to-insert-data-input-columns.md#configure-data-input-column-properties).

Text columns also support the following properties:

* **Word wrap**: Enable word wrap for long text values to improve readability. Use the **word wrap** option in the **Format** tab to adjust text based on column width.
* **Prevent Null**: Prevents users from leaving the value empty. To enable this option, configure a **Default value** to ensure that a value is entered when the column is created or updated.
   > [!NOTE]
   > The **Prevent Null** option is available only for the **Short Text** input type and isn't available for **Long Text**.
* **Text validation** - Validate text input to ensure data quality. You can:

  * Define **minimum** and **maximum length** to control the length of text input.

       :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-text-columns/min-max-length.png" alt-text="Screenshot of defining minimum and maximum length of the text." lightbox="../media/planning-how-to-insert-columns/how-to-insert-text-columns/min-max-length.png":::

  * Restrict input type (numeric, email, alphanumeric) by selecting the required option from the **Field Validation** dropdown.

      :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-text-columns/field-validation.png" alt-text="Screenshot of field validation option." lightbox="../media/planning-how-to-insert-columns/how-to-insert-text-columns/field-validation.png":::

  * Use the **Custom** option to apply a regular expression (regex). Select **Custom** and enter the required text pattern.

      :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-text-columns/field-validation-custom.png" alt-text="Screenshot of field validation custom option." lightbox="../media/planning-how-to-insert-columns/how-to-insert-text-columns/field-validation-custom.png":::

> [!NOTE]
> Only text that satisfies the validation rules is accepted. Invalid entries display an error.

| Field Validation  | Allowed Text                                                |
| ----------------- | ----------------------------------------------------------- |
| **Any Value**     | Allows numbers, alphabets, punctuation, and special symbols |
| **Numeric**       | Only numbers                                                |
| **Non Numeric**   | Everything except numbers                                   |
| **Alpha Numeric** | Numbers and alphabets                                       |
| **Email**         | Valid email addresses                                       |
| **URL**           | Valid URL links                                             |
| **Custom**        | Text that matches the defined pattern                       |
