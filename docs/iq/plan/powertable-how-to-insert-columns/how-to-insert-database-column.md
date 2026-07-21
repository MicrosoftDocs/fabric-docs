---
title: Insert Database Columns in PowerTable
description: Learn how to add a database column in PowerTable to update your source table directly. Configure data types, null rules, and defaults with these simple steps.
ms.date: 07/10/2026
ms.topic: how-to
#customer intent: As a PowerTable user, I want to add a new column to my source database through the table app so that I can avoid working with the database directly.
---

# Insert database columns

Add new columns to the source database directly through the PowerTable app. This feature removes the need to work with the database directly, enhancing security and efficiency.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

> [!NOTE]
> Ensure you have the required permissions to the database you connect to, as you're adding a column directly to the source database.

## Add a database column

Consider the following example where you add the *Status* column to the **Products** table.

1. Select **PowerTable** > **Insert Column** > **Database Column** to add a new column to the source table.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-add-database-columns/insert-database-column.png" alt-text="Screenshot of PowerTable Insert Column menu with Database Column option highlighted.":::

1. In the side panel, enter the column name and its data type. For this example, add a text column by selecting the `VARCHAR` data type.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-add-database-columns/column-name-type.png" alt-text="Screenshot of Add Database Column panel with Column Name and Data type fields highlighted." lightbox="../media/powertable-how-to-insert-columns/how-to-add-database-columns/column-name-type.png":::

1. Select **Not null** to prevent null values in the column. When you enable this option, you must specify a default value to use when no value is available.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-add-database-columns/null-default-value.png" alt-text="Screenshot of Add Database Column panel with Not null checkbox enabled and Default Value set to OPEN.":::

1. Even if you don't select **Not null**, you can specify a default value for the column. Default values can be either **manual** or **formula-based**:

   * Select **Manual** to specify a static default value.
   * Select **Formula** to derive the default value by using a configurable formula instead of a static value.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-add-database-columns/set-default-value.png" alt-text="Screenshot of Add Database Column panel with Default Value section highlighted showing Manual and Formula options.":::

    > [!NOTE]
    > You can specify a default value for the column, regardless of whether you configure the column as nullable or non-nullable. For more information about configuring default values, see [Default value](../powertable-how-to-configure-columns/how-to-configure-general-column-properties.md#default-value).

1. Use **Length** to set the character limit for this column.

1. Select **Save** to create the database column.

## Null setting scenarios

### When you select Not null

When you select Not null, the default value automatically fills the new column and any future rows you add. This setup ensures a valid value is always available when you don't provide one explicitly. You can update these values later.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-add-database-columns/default-value-added.png" alt-text="Screenshot of PowerTable showing Status column with OPEN default value applied to existing and new rows." lightbox="../media/powertable-how-to-insert-columns/how-to-add-database-columns/default-value-added.png":::

### When you clear Not null

When you clear Not null, the column accepts null values. When you create the column, the existing rows are blank, even if you set a default value. However, when you add new rows, the configured default value automatically fills the column. You can modify the default value if needed.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-add-database-columns/default-value-applied-new-row-only.png" alt-text="Screenshot of PowerTable with Status column blank for existing rows and OPEN default value in new row.":::

## Configure extra properties

Configure extra properties for the new column by using these steps:

1. Open the column header menu for the new column, and then select **Edit**.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-add-database-columns/edit-column-properties.png" alt-text="Screenshot of PowerTable column header menu with Edit option highlighted.":::

1. Configure the column properties, and then select **Save**. To learn about configuring columns, see [Configure general properties](../powertable-how-to-configure-columns/how-to-configure-general-column-properties.md#configure-general-properties) and [Configure display properties](../powertable-how-to-configure-columns/how-to-configure-display-column-properties.md).

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-add-database-columns/configure-columns-panel.png" alt-text="Screenshot of Status column properties panel showing General tab with Input Type, Data Type, Constraints, and Default Value settings.":::

Now you can enter data in the column. The new column and the changes sync with the source database.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-add-database-columns/database-column-added.png" alt-text="Screenshot of PowerTable showing the newly added Status column with user-added values ready for syncing." lightbox="../media/powertable-how-to-insert-columns/how-to-add-database-columns/database-column-added.png":::
