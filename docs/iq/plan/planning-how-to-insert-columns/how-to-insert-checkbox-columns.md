---
title: Insert Checkbox Columns in a Planning Sheet
description: Learn how to insert and configure checkbox columns in a planning sheet.
ms.date: 08/27/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to insert and configure checkbox columns in a planning sheet.
---

# Insert checkbox columns in planning sheet

In addition to number, text, person, date, and list input columns, Plan supports including a checkbox column in your planning sheet to capture binary inputs.

Use checkbox columns or measures to capture binary inputs such as selection, approval, or status. After inserting a checkbox column, you can select or clear it for each row in the planning sheet as needed.

## Insert a checkbox column

To insert a checkbox column:

1. Go to **Planning** > **Insert Column** > **Checkbox**.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-checkbox-columns/insert-column-checkbox.png" alt-text="Screenshot of inserting a checkbox column." :::

1. Enter a title and configure the required settings in the side panel that opens when you select **Checkbox**, as shown in the following image.

   :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-checkbox-columns/side-panel-checkbox.png" alt-text="Screenshot of the side panel with configuration options for checkbox column." :::

1. Select **Create**.

After creating the column, select a checkbox to check or clear it.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-checkbox-columns/selecting-checkbox.png" alt-text="Screenshot of selection checkbox." lightbox="../media/planning-how-to-insert-columns/how-to-insert-checkbox-columns/selecting-checkbox.png":::

## Configure checkbox column properties

You can configure checkbox column properties similar to other data input columns. For more information, see [configure data input column properties](how-to-insert-data-input-columns.md#configure-data-input-column-properties).

## Modify column properties

After inserting a checkbox column in a sheet, you can [modify] (how-to-insert-data-input-columns.md#modify-column-properties) its properties and change its initial configuration.

## Common use case of checkbox columns

Instead of using a text column for binary options, use a checkbox to neatly capture yes or no choices.

Use checkbox columns for filtering and selection scenarios. For example, you can filter data based on **Checked** or **Unchecked** values. The Writeback feature within plan can use these filters to write back only the selected (checked or unchecked) records based on the configured criteria.
