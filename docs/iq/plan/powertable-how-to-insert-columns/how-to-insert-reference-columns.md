---
title: Insert Reference Columns in PowerTable Sheet
description: Reference columns let you access related table data without duplication. Discover how to add and configure one in PowerTable with this clear, step-by-step example.
#customer intent: As a PowerTable user, I want to join tables through matching columns so that I can access information from related tables in one place.
ms.date: 07/11/2026
ms.topic: how-to
---

# Insert reference columns in PowerTable

A reference column is a type of [visual column](how-to-insert-visual-columns.md) that joins tables through matching columns and shows related data from another table directly within the current table. You can access information from related tables without duplicating the data.

This article explains the steps to insert a reference column that references data from another table by using a sample scenario.

## Insert the reference columns with a sample scenario

Consider the following example: You add a reference column to the *Products* table that references and shows order dates from the *Sales* table.

1. To add a reference column, go to **PowerTable** > **Insert Column** > **Visual Column** > **Add Reference Column**.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-reference-columns/insert-reference-column.png" alt-text="Screenshot of PowerTable menu with Insert Column, Visual Column, and Add Reference Column highlighted.":::

1. In the side panel, enter a name for the column.

1. Use **Input Type** to select the column's input type based on what you want to reference. Depending on the chosen type, the reference columns are available for selection. For example, if you choose **Date**, all date columns are available for selection.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-reference-columns/input-type-name.png" alt-text="Screenshot of Add Reference Column panel with Input Type set to Date and Column Name Order Date highlighted." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-reference-columns/input-type-name.png":::

1. Select the schema, reference table name, and the reference column to show.
   In this example, *Sales* is the reference table and *Order Date* is the reference column.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-reference-columns/configure-reference-column.png" alt-text="Screenshot of Add Reference Column panel with schema, reference table, and matching columns configured, Save button highlighted.":::

1. Enable [Match multiple](#match-multiple-records) to retrieve multiple values from all matching records in the reference table.

1. Select the matching column between the current table and the reference table.

    > [!NOTE]
    > 
    > * PowerTable uses the matching column to map the records and retrieve values from the reference table.
    > * When tables have multiple matching columns and you choose a different matching column, PowerTable uses the new column mappings to match records and retrieve reference values.

1. Select **Save**. PowerTable adds the reference column.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-reference-columns/reference-column-added.png" alt-text="Screenshot of PowerTable displaying product records with the new reference column added." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-reference-columns/reference-column-added.png":::

> [!NOTE]
> Reference columns are non-editable, and their values only change when the underlying column values change.
> [!TIP]
> Use the **Display** tab in the **Add Reference Column** side panel to specify how PowerTable shows the values. To learn more, see [Display](../powertable-how-to-configure-columns/how-to-configure-display-column-properties.md).

## Match multiple records

When you turn on **Match multiple**, the reference column retrieves values from multiple matching records in the reference table. The values appear in the reference column.

When you turn off this feature, the matching columns identify a single latest record in the reference table. Turn on this option when a record in the current table can associate with multiple matching records in the reference table.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-reference-columns/matching-multiple-records.png" alt-text="Screenshot of PowerTable reference column popup showing multiple matching Order Date values 02/28/2023 and 12/03/2023." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-reference-columns/matching-multiple-records.png":::
