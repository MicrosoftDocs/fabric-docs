---
title: Configure Column Properties in PowerTable
description: Learn how to configure column properties, constraints, display settings, and other column options to control data entry and display in PowerTable.
ms.date: 07/02/2026
ms.topic: how-to
#customer intent: As a user, I want to configure column properties, constraints, and display settings so that I can control how data is entered, validated, and displayed in PowerTable.
---

# Configure column properties for a PowerTable sheet

Configuring column properties helps ensure data accuracy and consistency in the database. By defining appropriate data types, constraints, default values, and relationships, you can prevent data-entry errors and maintain data integrity.

Column properties also help improve the usability, maintainability, and scalability of your tables by controlling how data is displayed and managed.

In this article, you learn how to access and configure column properties in a PowerTable sheet.

## Column properties

Column properties control various aspects of a column, including:

* Input type
* Editability
* Nullability
* Default values
* Minimum and maximum values
* Lookups and relationships
* Prefixes and suffixes
* Display settings

## Configuring columns during setup

* When you create a powertable app by importing data from a CSV file, creating a table from scratch, or connecting to a database, you can set the column properties during the setup process.
* Powertable automatically detects and configures the input type and other basic column settings. You can retain the detected settings or modify them to meet your business requirements.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/configure-table.jpg" alt-text="Screenshot of the Configure Table window." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/configure-table.jpg":::

## Configuring columns in the created PowerTable sheet

After loading data into the PowerTable sheet, you can configure column properties at any time in the **Columns** section.

To access column properties:

1. Select **Setup** > **Columns**.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/setup-columns.png" alt-text="Screenshot of selecting Columns option from the Setup menu." :::

    Alternatively, you can go to the **PowerTable** ribbon and select **Manage Columns** > **Edit Config**.

    :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/edit-config.png" alt-text="Screenshot of the Manage Column window with Edit Config option." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/edit-config.png":::

1. The **Column Setup** window opens as shown in the following image.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/column-setup-window.png" alt-text="Screenshot of the column setup window." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/column-setup-window.png":::

## Add columns

To add a new column to the table, use the **Add Visual Column**, **Add Formula Column**, or **Add Database Column** options available in the column setup window.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/add-columns.png" alt-text="Screenshot of the options for adding new columns." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/add-columns.png":::

For more information about these column types, see **Add Columns Overview**.
<!--add hyperlink to Add columns overview page-->

## Set column constraints

PowerTable enables you to configure column constraints without writing code. You can apply a unique constraint to a single column or define a composite unique constraint across multiple columns to ensure that each value or combination of values remains unique. Unique constraints help maintain data integrity by preventing duplicate values.

To configure column constraints:

1. Select **Column Constraints** in the column setup window.

    :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/column-constraints.png" alt-text="Screenshot of the Column Constraints option." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/column-constraints.png":::

1. The **Column Constraints** window opens, as shown in the following image.

    :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/column-constraints-window.png" alt-text="Screenshot of the Column Constraints pop-up window." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/column-constraints-window.png":::

### Unique Value

Use the **Unique Value** option to ensure that all values in a selected column are unique.

1. Under **Unique Value**, select a column from the dropdown list.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/unique-value.png" alt-text="Screenshot of the Unique Value dropdown." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/unique-value.png":::

1. To configure additional unique constraints, select **Add** and choose another column.
1. Select **Save**.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/unique-value-add.png" alt-text="Screenshot of the Add option to configure additional unique constraints." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/unique-value-add.png":::

After you apply the constraint, users can't enter duplicate values in the selected column.

For example, if *ProductSKU* is configured as a unique column, users can't enter a SKU value that already exists in the table.

> [!NOTE]
> Primary key columns don't appear in the **Unique Value** dropdown because they're unique by default.

If a selected column already contains duplicate values, PowerTable sheet displays an error and doesn't allow you to save the constraint until you remove the duplicate values.

### Unique Combination

Use **Unique Combination** to ensure that a specific combination of values across multiple columns remains unique.

1. Under **Unique Combination**, select the required columns from the dropdown list.
1. To configure additional unique combinations, select **Add** and choose another set of columns.
1. Select **Save**.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/unique-combination.png" alt-text="Screenshot of the Unique Combination dropdown." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/unique-combination.png":::

> [!NOTE]
> You can't select columns configured with the **Unique Value** constraint in the **Unique Combination** constraint.

After you apply the constraint, users can't enter records that duplicate an existing combination of values in the selected columns.

For example, if *ModelName* and *ProductName* are configured as a unique combination, each *ModelName* - *ProductName* pair must be unique. Users can reuse an individual value in either column, but the same combination of values can't exist more than once.

If a user attempts to enter a duplicate combination, PowerTable sheet displays a validation error and prevents the record from being saved.

To remove a configured constraint, select the **Delete** icon next to it.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/column-constraints-delete.png" alt-text="Screenshot of the Delete icons in the Column Constraints window." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/column-constraints-delete.png":::

## Display or hide columns

Use the **Display** option to control whether a column is visible in the table.

Clear the **Display** checkbox to hide a column while retaining its data in the table. This option is useful when a column contains information that should be available but doesn't need to be displayed to users.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/display.png" alt-text="Screenshot of the Display column in the column setup window." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/display.png":::

To adjust column widths, drag the column header boundary or configure the width through [**Manage Columns**](../powertable-how-to-manage-columns.md).

## Allow or restrict `NULL` values

Use the **Required** option to specify whether a column must contain a value. When enabled, users must provide a value before a record can be saved. When disabled, the column can be left `NULL`.

Primary key and business key columns are typically configured as required fields.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/required.png" alt-text="Screenshot of the Required column in the column setup window." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/required.png":::

## Configure other properties

To configure or modify other properties for a column, select the pencil icon next to the column or double-click the column name.

   :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/edit-icon-column-name.png" alt-text="Screenshot of the edit icon and column name to select for configuring properties." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/edit-icon-column-name.png":::

To edit the properties of a specific column directly from the table, select the column header menu (**...**) and then select **Edit**.

:::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/column-edit.png" alt-text="Screenshot of the Edit option in the column header context menu.":::

Column properties are grouped and classified into two tabs:

* [**General**](./how-to-configure-general-column-properties.md) - Configure the **Input Type**, **Constraints**, **Default values**, and other data-related settings.
* [**Display**](./how-to-configure-display-column-properties.md) - Configure the **Display name** and **Description** for a column. For numeric columns, additional formatting options are available, including the **Prefix**, **Suffix**, **Thousand Separator**, and other number formatting settings.

  :::image type="content" source="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/general-display.png" alt-text="Screenshot of the General and Display tabs." lightbox="../media/powertable-how-to-configure-columns/how-to-configure-column-properties-summary/general-display.png":::

## Related content

* [Configure general properties for a column](./how-to-configure-general-column-properties.md)
* [Configure display properties for a column](./how-to-configure-display-column-properties.md)
