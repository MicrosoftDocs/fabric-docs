---
title: Insert Number Columns in a Planning Sheet
description: Learn how to insert and configure data input number columns in a planning sheet.
ms.date: 08/26/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to insert and configure data input number columns in a planning sheet.
---

# Insert number columns in planning sheet

With Plan, you can enter and format numeric data in multiple ways. You can either create an empty column and enter numbers, or copy values from another series.

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

Enter a title and configure the required properties to create the column. For more information, see [Configure number column properties](#configure-number-column-properties).

After you configure the properties, select **Create**. The column is inserted into the report.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/created-blank-columns.png" alt-text="Screenshot of inserted empty series." lightbox="../media/planning-how-to-insert-columns/how-to-insert-number-columns/created-blank-columns.png":::

## Configure number column properties

[Configure data input column properties](how-to-insert-data-input-columns.md#configure-data-input-column-properties) covers the fundamental properties of a data input column, such as **Insert as**, **Input type**, **Default value**, **Change formula**, **Allow input**, and **Description**.

The Number input type offers these additional configuration options:

* **Aggregation**: Defines how totals and subtotals are calculated. You can configure aggregation types separately for rows and columns. By default, values are aggregated using Sum, but you can choose other aggregation methods such as Average, Minimum, or Maximum.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/aggregation.png" alt-text="Screenshot of options available in aggregation.":::

* **Distribute parent value to children**: When enabled, values entered at the parent level are automatically distributed to child rows. This option is useful for budgeting and allocation scenarios.

   > [!NOTE]
   > The **Distribute parent value to children** feature  is supported only for **Sum**, **Average (Leaf)**, **Minimum**, **Maximum**, **First**, and **Last** aggregation types.

* **Minimum and maximum values**: Define the allowed input range for leaf-level cells. You can specify the limits using a static value or a measure. If a user enters a value outside the configured range, an error message is displayed.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/min-and-max-values.png" alt-text="Screenshot of options such as distribute parent value to children, and minimum, maximum and default values.":::

> [!NOTE]
> You can modify existing **Number** input type measures or columns. For more information, see [Modify column properties](how-to-insert-data-input-columns.md#modify-column-properties).

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

## Insert column through column gripper

Use the column gripper to copy an existing column and create a new data input column with the same values.

1. Hover over the column and select the column gripper.
1. Select **Insert** > **Copy as data input**.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-number-columns/copy-as-data-input.png" alt-text="Screenshot of copy as data input option." :::

1. A side panel opens where you can update the title and configure properties if necessary. Select **Create**.

The new column is created with copied values.
