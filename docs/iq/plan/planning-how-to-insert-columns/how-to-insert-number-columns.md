---
title: Insert Number Columns in a Planning Sheet
description: Learn how to insert and configure data input number columns in a planning sheet.
ms.date: 06/16/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to insert and configure data input number columns in a planning sheet.
---

# Insert number columns

With plan (preview), you can enter and format numeric data in multiple ways. You can either create an empty column and enter numbers, or copy values from another series.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

In this article, you learn how to create and manage numeric data input columns.

## Create a data input number column

To create a number column:

1. Go to **Planning** > **Insert Column** and select **Number**.
1. Select one of the following options:
   * **Insert a new empty series**
   * **Copy from another series**

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/insert-number-column.png" alt-text="Screenshot of inserting a number column." :::

## Create a blank number column

**Insert a new empty series** inserts a blank numeric column that you can configure and populate manually. When you select this option, a side panel opens.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/insert-new-empty-series.png" alt-text="Screenshot of the configuration for inserting a new empty series." :::

Enter a title and configure the required properties to create the column. For more information, see [Configure data input column properties](./how-to-insert-data-input-columns.md#configure-data-input-column-properties).

After you configure the properties, select **Create**. The column is inserted into the report.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/created-blank-columns.png" alt-text="Screenshot of inserted empty series." lightbox="../media/planning-how-to-insert-columns/how-to-insert-number-columns/created-blank-columns.png":::

## Enter values

You can enter values in the following ways:

* Double-click the cells and enter values using the formula bar.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/enter-values-formula-bar.png" alt-text="Screenshot of entering a value using formula bar.":::

* Select a cell, enter a value, and then press **Enter**.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/enter-values-cell.png" alt-text="Screenshot of entering a value directly in a cell." :::

Entered values are automatically aggregated to parent levels and distributed to child levels when applicable.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/aggregated-values-parent-child-levels.png" alt-text="Screenshot of distribution of aggregated values to parent and child levels." :::

## Create a number column from an existing series

This option creates a numeric column by copying values from an existing series.

You can select from available measures, forecasts, or hidden measures. The copied values act as initial values only. Changes to the source series aren't reflected in the new column.

To create a numeric input column using values from an existing series:

1. Go to **Planning** > **Insert Columns** > **Number**.
1. Select **Copy from another series**.
1. Select the measure or column whose data you want to use.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/copy-from-another-series.png" alt-text="Screenshot of inserting a column through copy from another series option." :::

1. A side panel opens for configuration. Enter a title and configure the required properties to create the column. For more information, see [Configure data input column properties](./how-to-insert-data-input-columns.md#configure-data-input-column-properties).

1. After you configure the properties, select **Create**.

The column is created with prepopulated values.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/column-created-prepopulated-values.png" alt-text="Screenshot of a column created with prepopulated values." lightbox="../media/planning-how-to-insert-columns/how-to-insert-number-columns/column-created-prepopulated-values.png":::

### Insert column through column gripper

Use the column gripper to copy an existing column and create a new data input column with the same values.

1. Hover over the column and select the column gripper.
1. Select **Insert** > **Copy as data input**.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/copy-as-data-input.png" alt-text="Screenshot of copy as data input option." :::

1. A side panel opens where you can update the title and configure properties if necessary. Select **Create**.

The new column is created with copied values.

## Modify column properties

To modify the properties of an existing data input column:

1. Go to **Planning** > **Insert Column** > **Manage Measures**.
1. Select the required option:
   * **Edit** (pencil icon) to modify the column properties.
   * **Delete** to remove the column.
   * **Show/Hide** to control column visibility.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/manage-measures-options.png" alt-text="Screenshot of manage measures options." lightbox="../media/planning-how-to-insert-columns/how-to-insert-number-columns/manage-measures-options.png":::

Alternatively, you can use the column gripper:

1. Hover over the column or measure header to display the column gripper.
1. Select the column gripper and select the required action, such as **Edit Measure**, **Delete Measure**, or **Hide Column**.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/column-gripper-modify-options.png" alt-text="Screenshot of modifying options in column gripper." :::

1. If you select the **Edit** option, a side panel opens where you can update the required properties. After you make the changes, select **Update**.
