---
title: Insert Relation Columns in PowerTable Sheet
description: Relation columns in PowerTable link parent and child records in a master-detail relationship. Learn how to add, configure, and filter them step by step.
ms.date: 08/06/2026
ms.topic: how-to
---

# Insert relation columns in PowerTable sheet

A relation column is a type of [visual column](how-to-insert-visual-columns.md) that creates a one-to-many relationship between records in two tables. It links a record in a parent (master) table to one or more related records in a child (details) table. You can use this column to organize and manage related data across tables. This relationship is called a **master-detail relationship**.

Use this feature to model a hierarchical relationship between two sets of records by connecting one record (the parent) to one or more related records (the children). This structure enables logical data grouping and represents a master record along with its associated details. For example, there could be a list of customers (parent records), each with several orders (child records).

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/relation-table-illustration.png" alt-text="Diagram showing master-detail relationship where customer 1 with 3 orders points to three highlighted Orders rows.":::

> [!NOTE]
> A single record in the master table can link to multiple records in the detail table, but each record in the detail table can only link to one record in the master table.

## **Benefits of adding a relation column**

Adding a relation column provides the following benefits:

* **Organized data structure:** Group related records to make complex datasets easier to navigate and understand.
* **Data integrity:** Maintain relationships between parent and child records to prevent incomplete or inconsistent data, such as an order item without an associated customer.
* **Streamlined data entry and updates:** Reduce data duplication by storing common information in parent records and allowing child records to inherit those values.
* **Simplified reporting and filtering:** Filter, summarize, and drill down into data by using parent-child relationships.
* **Improved user experience:** View and manage related parent and child records from a single interface.
* **Scaling and maintenance:** Scale your databases while maintaining data accuracy and integrity.

## Key components

A relation column uses the following components to establish a relationship between two tables:

* **Master table:** Contains the primary records. Each record represents a unique entity, such as a customer, project, or product.
* **Detail table:** Contains records that are related to a record in the master table. You can associate multiple detail records with a single master record.
* **Foreign key column:** Stores the reference to the primary key in the master table, establishing the relationship between the two tables. PowerTable uses this column to link each detail record to its corresponding master record.

## Add a relation column

This section explains the steps to add a relation column and create parent-child relationship linked tables by using an example.

### Prerequisite

If two or more tables in a dataset share a foreign key column, you can establish a primary-foreign relationship between them.

### Steps to add a relation column

In this example, you create a parent-child relationship between the **Product Subcategories** and **Products** tables. Both tables share the **ProductSubcategoryKey** column, which acts as a foreign key.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/master-table.png" alt-text="Screenshot of PowerTable master table ProductSubcategories and the shared key column outlined in red." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/master-table.png":::

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/details-table.png" alt-text="Screenshot of PowerTable detail table Products with the shared ProductSubcategoryKey column outlined in red." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/details-table.png":::

Optionally, configure the foreign key column as a [lookup column](../powertable-how-to-configure-columns/how-to-configure-lookup-relation-columns.md) in the **Products** table to display the corresponding subcategory name from the **ProductSubcategories** table.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/lookup-column.png" alt-text="Screenshot of the PowerTable Products table with the SubcategoryName lookup column selected, showing colored subcategory tags." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/lookup-column.png":::

To create the relationship, add a **relation column** to the parent (subcategories) table.

1. Go to **Insert Column** > **Visual** **Column** > **Add Relation Column**. A side panel opens.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/add-relation-column.png" alt-text="Screenshot of the PowerTable Insert Column menu with Visual Column expanded and Add Relation Column highlighted." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/add-relation-column.png":::

1. Configure the column properties:

    * **Column Name**: Enter a name for the relation column.
    * **Relation Table**: Select the child table to relate to, such as **Products**.
    * **Column from Current Table**: Select the column in the current (parent) table that establishes the relationship.
    * **Column from Relation Table**: Select the matching foreign key column in the related (child) table. *ProductSubcategoryKey* is the matching foreign key column in this example.
    * **Column To Display**: Select the column whose values are displayed as reference labels for related records when you expand a record. In this example, select **Product Subcategory Key**. The corresponding lookup labels are displayed as reference labels for related records in the details table.
    * **Display name for Relation Table**: Enter the text to display in the relation column. Users select this text to expand a record and view its related records.

1. **If Condition**: Optionally, select **Add Filter** to add one or more filter conditions. Combine multiple conditions by using **AND** or **OR**. PowerTable displays only related records that meet the specified conditions. For example, you can display child records only when the **Product Price** is more than a specific value.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/configure-relation-column.png" alt-text="Screenshot of the Add Relation Column panel with column name, relation table, key columns, an If Condition filter, and Cascade delete toggle set to On." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/configure-relation-column.png":::

1. **Cascade delete to linked records**: Enable this option to delete related child records automatically when the parent record is deleted.
1. The display properties for the relation column can be configured in the panel's **Display** tab. To learn more, see [Display](../powertable-how-to-configure-columns/how-to-configure-display-column-properties.md).

1. Select **Save**.

The relation column is added to the subcategories table. The number of related child records for each parent record is displayed in parentheses.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/relation-column-added.png" alt-text="Screenshot of the ProductSubcategories table with a highlighted Related Products column showing Products counts in parentheses.":::

Expand a parent record to view its related child records. The related records open in a new table, identified by the selected subcategory label.

:::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/expand-relation-column-record.png" alt-text="Screenshot of child records table showing Mountain Bikes products, with the SubcategoryName column and Display Value header highlighted." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-relation-columns/expand-relation-column-record.png":::

In the details table, you can:

* Select [**Insert Row**](../powertable-how-to-insert-rows-import-data.md#insert-rows) to add a new child record.
* Select [**Filter**](../powertable-how-to-filter-data.md) to filter the displayed records.
* Select [**Sort By**](../powertable-how-to-explore-organize-data.md#sort-records) to sort records by a specific column.
* Use the [**Search**](../powertable-how-to-explore-organize-data.md#search-records) box to find records by using keywords.
