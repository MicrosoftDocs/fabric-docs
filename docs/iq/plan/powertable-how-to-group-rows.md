---
title: Group Rows in PowerTable Sheet
description: Learn how to group rows, create subgroups, expand or collapse groups, remove grouping, and work with grouped data in PowerTable.
ms.date: 07/15/2026
ms.topic: how-to
#customer intent: As a user, I want to group rows and create subgroups so that I can organize, navigate, and analyze data more effectively in PowerTable.
---

# Group rows in PowerTable

Use the **Group By** feature to organize records into logical groups based on shared values. Grouping makes large datasets easier to navigate and analyze. Expand or collapse individual groups to control the level of detail in the table.

## Group rows

To group rows:

1. From the **PowerTable** tab, select **Group By**.

   :::image type="content" source="media/powertable-how-to-group-rows/group-by.png" alt-text="Screenshot of the Group By option on the toolbar." lightbox="media/powertable-how-to-group-rows/group-by.png":::

1. From the dropdown, select the column to group the records, and then select **Save**.

   :::image type="content" source="media/powertable-how-to-group-rows/select-column.png" alt-text="Screenshot of selecting a column from the dropdown." lightbox="media/powertable-how-to-group-rows/select-column.png":::

PowerTable groups the records based on the selected column. In the following example, PowerTable groups the records by the *ProductSubcategoryKey* column. It aggregates the numerical fields to sum.

:::image type="content" source="media/powertable-how-to-group-rows/grouped-records.png" alt-text="Screenshot of the table with grouped records." lightbox="media/powertable-how-to-group-rows/grouped-records.png":::

## Expand or collapse groups

Select the expand or collapse arrow beside a group name to show or hide the records within that group.

:::image type="content" source="media/powertable-how-to-group-rows/expand-collapse-groups.png" alt-text="Screenshot of the expand and collapse arrows." lightbox="media/powertable-how-to-group-rows/expand-collapse-groups.png":::

## Create subgroups

Create subgroups within a group.

1. Select **Group By** again, and then select **Add Sub Group**.

   :::image type="content" source="media/powertable-how-to-group-rows/add-sub-group.png" alt-text="Screenshot of the Add Sub Group option." lightbox="media/powertable-how-to-group-rows/add-sub-group.png":::

1. Select another column from the dropdown, and then select **Save**.

   :::image type="content" source="media/powertable-how-to-group-rows/select-column-sub-group.png" alt-text="Screenshot of selecting a column for sub group." lightbox="media/powertable-how-to-group-rows/select-column-sub-group.png":::

PowerTable creates nested groups within the existing group. The following example shows the records further grouped by the *ModelName* column under *ProductSubcategoryKey*.

:::image type="content" source="media/powertable-how-to-group-rows/nested-groups.png" alt-text="Screenshot of the table with nested groups." lightbox="media/powertable-how-to-group-rows/nested-groups.png":::

## Remove grouping

To remove a group, select the delete (bin) icon next to it, and then select **Save**. To return to the default table view, remove all groups.

:::image type="content" source="media/powertable-how-to-group-rows/remove-group.png" alt-text="Screenshot of the delete icon to remove group." lightbox="media/powertable-how-to-group-rows/remove-group.png":::

## Work with grouped data

You can continue to perform table operations on grouped records, including:

* Edit data
* Insert rows
* Bulk edit records
* Apply formatting
* Sort records
* Use Find and Replace

:::image type="content" source="media/powertable-how-to-group-rows/edit-data.png" alt-text="Screenshot of editing the grouped data." lightbox="media/powertable-how-to-group-rows/edit-data.png":::
