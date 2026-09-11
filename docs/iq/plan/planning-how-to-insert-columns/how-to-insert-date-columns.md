---
title: Insert Date Columns in a Planning Sheet
description: Learn how to insert and configure date columns in a planning sheet.
ms.date: 08/27/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to insert and configure date columns in a planning sheet.
---

# Insert date columns in planning sheet

Create and use a date column in the planning sheet to insert date values for each row. Define the date format, a default date, and acceptable date range as needed.

## Insert a date column

To insert a date column:

1. Go to **Planning** > **Insert Column** > **Date.**

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-date-columns/insert-column-date.png" alt-text="Screenshot of inserting a date column." :::

1. Enter a title and configure the required properties in the side panel.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-date-columns/side-panel-date.png" alt-text="Screenshot of side panel with configuration options for a date column." :::

1. Select **Create** to add an empty date column to the report with the default configuration.
1. To enter a date, double-click a cell and select a value from the date picker or calendar.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-date-columns/entering-date.png" alt-text="Screenshot of entering a date in date column." lightbox="../media/planning-how-to-insert-columns/how-to-insert-date-columns/entering-date.png":::

> [!NOTE]
> You can [modify a date input column](how-to-insert-data-input-columns.md#modify-column-properties) to update its properties.

## Configure date column properties

You can define properties such as **Insert As**, **Input type**, **Allow entry on Totals/Subtotals**, **On Change Formula**, **Allow Input**, and **Description**, similar to other data input columns. For more information, see [configure data input column properties](how-to-insert-data-input-columns.md#configure-data-input-column-properties).

Additional configurations for date columns include:

* **Format**: Select the required date format from the **Format** dropdown.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-date-columns/format-date.png" alt-text="Screenshot of selecting a date format." :::

* **Minimum and maximum date**: Set the allowed date range by defining minimum and/or maximum values. Users can't enter dates outside this range.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-date-columns/min-max-date.png" alt-text="Screenshot of defining minimum and maximum date." lightbox="../media/planning-how-to-insert-columns/how-to-insert-date-columns/min-max-date.png":::

* **Default value**: Pre-fill the column with a default date to avoid manual entry. Set the default value by using:

  * **Static**: Use the date picker to define a common date for all rows.

      :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-date-columns/default-value-static.png" alt-text="Screenshot of defining a static default value." lightbox="../media/planning-how-to-insert-columns/how-to-insert-date-columns/default-value-static.png":::

  * **Measure/Column**: Select a measure or column (native, formula, or date input) to source the default value.

      :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-date-columns/default-value-column.png" alt-text="Screenshot of defining a default value from an existing column." lightbox="../media/planning-how-to-insert-columns/how-to-insert-date-columns/default-value-column.png":::

After configuring the properties, select **Create** to insert the column. You can overwrite the default value by double-clicking a cell and selecting a new date from the date picker.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-date-columns/overwriting-date.png" alt-text="Screenshot of overwriting a date value." :::

> [!NOTE]
> The default value option is available for both visual measures and visual columns. The system automatically handles invalid date formats as blank values to ensure clean export and writeback.
