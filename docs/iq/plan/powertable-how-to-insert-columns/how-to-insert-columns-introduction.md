---
title: Insert Columns in PowerTable
description: Know about the different types of columns you can insert in a PowerTable sheet.
ms.date: 07/08/2026
ms.topic: how-to
#customer intent: As a PowerTable user, I want to add new columns to an existing table so that I can capture new types of information as my business needs change.
---

# Introduction to inserting PowerTable columns

As your business requirements evolve, you might need to capture new types of information in your tables. In PowerTable, you can add columns to an existing table at any time. This feature lets you adjust your table structure as your needs change without rebuilding the table.

By using this feature, you can:

* Add and manage database columns directly from the PowerTable sheet, without writing any queries.
* Add columns only to the PowerTable sheet to manage extra data without affecting the source database.
* Choose from various column types such as data, formula, lookup, reference, attachment, roll up, button, and others to capture and manage information in the way that best suits your needs.

You can add a new column to a table during table creation, or after the table is created or connected.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Add column during table creation

Use **Add column** during the initial table configuration to create and configure extra columns alongside the imported columns.

:::image type="content" source="../media/powertable-how-to-insert-columns/add-columns-summary/add-during-table-creation.png" alt-text="Screenshot of Configure Table step with column settings and Add Column button." lightbox="../media/powertable-how-to-insert-columns/add-columns-summary/add-during-table-creation.png":::

## Add column after you create or connect a table

After you create or connect a table, add new columns at any time by using **Insert Column**.

:::image type="content" source="../media/powertable-how-to-insert-columns/add-columns-summary/add-after-table-creation.png" alt-text="Screenshot of PowerTable sheet showing Insert Column dropdown highlighted with column type choices." lightbox="../media/powertable-how-to-insert-columns/add-columns-summary/add-after-table-creation.png":::

Alternatively, select **Setup** > **Columns** and use the **Add Visual Column**, **Add Formula Column**, and **Add Database Column** options during column configuration.

:::image type="content" source="../media/powertable-how-to-insert-columns/add-columns-summary/add-columns-options.png" alt-text="Screenshot of Columns setup page with Add Visual, Formula, and Database Columns dropdowns." lightbox="../media/powertable-how-to-insert-columns/add-columns-summary/add-columns-options.png":::

* **Visual columns** exist only within the PowerTable sheet. PowerTable doesn't add these columns to the source database. This column type includes multiselect relationship columns, reference columns, relation columns, roll up, button, and attachment columns. For more information, see [Insert visual columns in PowerTable](how-to-insert-visual-columns.md).
* **Database columns** exist in the underlying database and become part of the table schema. For more information, see [Insert database columns in PowerTable](how-to-insert-database-column.md).
* **Formula columns** can be either visual or database columns. Use formula columns to calculate values based on formulas and display the results in the table. For more information, see [Insert formula columns in PowerTable](how-to-insert-formula-columns.md).
