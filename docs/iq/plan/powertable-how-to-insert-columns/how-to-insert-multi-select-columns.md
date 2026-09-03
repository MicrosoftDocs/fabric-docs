---
title: Insert Multi-Select Relationship Columns in PowerTable Sheet
description: Add a multi-select relationship column in PowerTable to create many-to-many lookups between tables. Follow step-by-step instructions to configure.
ms.date: 08/06/2026
ms.topic: how-to
---

# Insert multi-select relationship columns in PowerTable

A multi-select relationship column is a type of [visual column](how-to-insert-visual-columns.md) that you use to associate one or more records from a lookup table with each record in the primary table. It uses a relation table to store the relationships between the primary and lookup tables, enabling many-to-many associations.

By retrieving values from a lookup table, multi-select relationship columns help maintain data consistency, reduce manual data entry, and ensure that users select only valid values.

In this article, you learn how to add a multi-select relationship column to a primary table and add column values that are fetched from the records in a lookup table.

## Prerequisites

Before creating a multi-select relationship column and configuring a many-to-many lookup, make sure that the following tables exist in the database:

* The primary table that contains a primary key.
* The lookup table that contains a primary key and one or more columns with selectable values.
* The relation table that contains an identity column and foreign keys that reference the primary key columns in the primary and lookup tables.

> [!NOTE]
> Make sure that the relation table includes an identity column. When you create the table, select that column as the **Identity Column** in the **Configure Table** window.

If the required tables don't exist in the database, create or import them to the database before configuring the multi-select relationship column.

You can import them by using PowerTable from external sources such as Excel or CSV files. To learn more, see [this section](../powertable-how-to-create-table-app.md).

## Add multi-select column

In the following example, you add a *Sales Rep* multi-select column to the *Products* table so you can assign one or more sales representatives to each product.

This column retrieves column values from the *Sales Representatives* table (lookup table) by using the relationship information obtained from the *Relation\_table\_products* table (relation table).

> [!NOTE]
> The relation table stores or updates the mapping between products and sales reps as you assign and unassign sales reps to the products.

To add a multi-select column:

1. Select **Insert Column** > **Visual Column** > **Add Multi-Select Relationship Column**.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/add-multi-select-column.jpeg" alt-text="Screenshot of the Insert Column menu with Visual Column expanded and Add MultiSelect Relationship Column highlighted." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/add-multi-select-column.jpeg":::

1. Enter a name for the column in the **Column Name**. Enter *Sales Rep*.
1. Enter the lookup table details. This table provides the list of values for each record. Use the dropdown menus to select the items listed in the following list.

    * **Lookup Table**: *Sales Representatives*
    * **Lookup Value**: *FirstName*
    * **Lookup Key**: *Sales Rep Key*

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/configure-lookup-details.png" alt-text="Screenshot of the Add MultiSelect Relationship Column panel with Lookup Table, Lookup Value, and Lookup Key fields highlighted." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/configure-lookup-details.png":::

1. Specify the **relation table**, the **reference column** that stores the lookup table key, and the **identifier column** used to match records between the primary table and the lookup table. These mappings establish and maintain the relationship between the tables.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/relation-table-details.png" alt-text="Screenshot of Table, Reference Column, and Identifier Column fields highlighted in the MultiSelect Relationship Column panel." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/relation-table-details.png":::

    Use the dropdown menus to select the relation table details and identifier column:

    * **Table**: *Relation\_table\_products*

    * **Reference Column**: *Sales Rep Key* (lookup key)

    * **Identifier Column**: *ProductKey* (matching column between the tables)

1. Select [default value](../powertable-how-to-configure-columns/how-to-configure-general-column-properties.md#default-value) if needed.
1. Select **Save.**

You added a multi-select relationship column that you use to assign multiple sales representatives to each product. The column also looks up and displays the corresponding sales representatives for each product based on the data in the relationship table.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/multi-select-column-added.png" alt-text="Screenshot of a PowerTable sheet showing sales rep names as tags in the added multi-select relationship column." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/multi-select-column-added.png":::

## Enter values in the column

To enter values into the multi-select column, select the cell and choose one or more values from the list.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/enter-values.png" alt-text="Screenshot of PowerTable sheet with a multi-select relationship cell open for entering sales rep values." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/enter-values.png":::

Select **Save to Database** and **Proceed** to save your changes to the database.

PowerTable updates the relation table also simultaneously based on the selected values.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/updated-relation-table.png" alt-text="Screenshot of the relation table with ID, ProductKey, and Sales Rep columns and a new highlighted row 195.":::

## Add new lookup records

If you want to add options from the lookup table that aren't currently available for the record, you can add them directly from the lookup column in the **Products** table.

1. Select the lookup cell, and then select the **expand** arrow. A window opens.
1. Select **+ Add**. The lookup table opens.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/add-new-lookup-records.png" alt-text="Screenshot of the Row Preview dialog for Sales Representatives with the Add button highlighted." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/add-new-lookup-records.png":::

1. Select one or more records from the lookup table and select **Add**.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/select-lookup-records.png" alt-text="Screenshot of the Row Preview dialog with two lookup records selected and the Add (2) button highlighted.":::

The selected records are added to the current record and become available in the drop-down list for that record.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-multi-select-columns/new-records-available.png" alt-text="Screenshot of the Sales Rep column showing an open multi-select drop-down with added records and a search box.":::

## FAQs

### Does a lookup column display only the values that are present in the current table?

No. A lookup column displays the complete set of distinct values from the lookup table, not just the values that are present in the current table or the column where the lookup is configured.

### How do I add a new value to a lookup column?

To add a new value to a lookup column, first insert the value into the table that contains the lookup values. The new value then becomes available in the lookup column.

### In a lookup column, what is stored in the row - the key or the display value?

A lookup column stores the **key** for the displayed value.

When you configure a lookup column, PowerTable treats the values in the column as business keys and displays the corresponding values from the same table or a different table.

### Can I configure a lookup column by using the same table?

Yes. You can configure a lookup column that references the same table.

For example, an **Employee** table might contain an **Employee ID**, **Employee Name**, and **Manager ID**. You can configure the **Manager** column as a lookup that references the **Employee** table to display the manager's name.

### What does **Add Hierarchy** do in the lookup configuration?

The **Add Hierarchy** option displays a drill-down hierarchy in the lookup dropdown, making it easier to organize and navigate lookup values.

You can configure the hierarchy by using multiple tables that are related through common columns.

### What does **Filter based on another column** do in the lookup configuration?

The **Filter based on another column** option filters the values in a lookup column based on columns that are common between the source and lookup tables.

This option displays a filtered list of values in the lookup dropdown based on the corresponding value of another column in the same row.
