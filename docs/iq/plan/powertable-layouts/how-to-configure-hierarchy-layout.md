---
title: Configure Hierarchy Layout in PowerTable
description: Hierarchy layout organizes records into parent-child relationships for easier navigation of multilevel data. Learn how to configure and manage it in PowerTable.
#customer intent: As a PowerTable user, I want to switch from the default table layout to a hierarchy layout, so that I can view my hierarchical data in a structured format.
ms.date: 07/22/2026
ms.topic: how-to
---

# Configure hierarchy layout

The **Hierarchy** layout organizes records into parent-child relationships, making it easier to navigate and analyze multilevel data. It provides an alternative to the default **Table** layout. This layout is useful for datasets such as organizational structures, product categories, customer orders, and similar hierarchical data.

This article explains the steps to configure the hierarchy layout by using an example.

To configure a hierarchy layout:

1. In the **PowerTable** tab, select **Layout** > **Hierarchy**.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/select-hierarchy-layout.png" alt-text="Screenshot of PowerTable tab with Layout menu open showing Hierarchy option highlighted.":::

   The **Hierarchy Layout Configuration** dialog opens.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/hierarchy-layout-configuration.jpeg" alt-text="Screenshot of Hierarchy Layout Configuration dialog with Primary Key and Hierarchy Column options." lightbox="../media/powertable-layouts/how-to-configure-hierarchy-layout/hierarchy-layout-configuration.jpeg":::

1. Select the **Primary Key Column**.

   The primary key uniquely identifies each record in the table. In the example, *Employee_Id* is the primary key.

1. Select the **Hierarchy Column**.

   The hierarchy column defines the parent-child relationship between records. In the example, *Manager_Id* is the hierarchy column because it links each employee to their manager in a parent-child hierarchy format.

1. Select the **Display Column**.

   The display column specifies which values appear in the hierarchy view. It must be different from the hierarchy column. In the example, *Full_Name* is the display column.

1. Select **Save**.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/hierarchy-layout-configured.jpeg" alt-text="Screenshot of Hierarchy layout configured with Manager_Id and Full_Name columns to create an employee tree." lightbox="../media/powertable-layouts/how-to-configure-hierarchy-layout/hierarchy-layout-configured.jpeg":::

    The table appears in **Hierarchy** layout.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/powertable-sheet-hierarchy-layout.jpeg" alt-text="Screenshot of a table in Hierarchy layout showing an employee tree with expandable rows." lightbox="../media/powertable-layouts/how-to-configure-hierarchy-layout/powertable-sheet-hierarchy-layout.jpeg":::

## Hierarchy layout structure

After you configure the hierarchy:

* The layout automatically pins the selected display column.
* The layout organizes parent and child records into a hierarchical structure.
* The number of child records appears next to each parent record.
* You can expand or collapse parent records to show or hide child records.

:::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/expand-hierarchy.png" alt-text="Screenshot of a hierarchical table displaying parent records with child record counts in parentheses and expand arrows." lightbox="../media/powertable-layouts/how-to-configure-hierarchy-layout/expand-hierarchy.png":::

## Modify the configured hierarchy

You can modify the configuration for an existing hierarchy layout.

To modify and manage the hierarchy configuration:

1. In the **PowerTable** tab, select **Layout** > **Manage Layout**.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/modify-hierarchy.png" alt-text="Screenshot of PowerTable Layout menu with Manage Layout option highlighted.":::

1. In the **Layout Configuration** window, select **Hierarchy**.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/reconfigure-hierarchy-layout.png" alt-text="Screenshot of Layout Configuration window with Hierarchy tab selected showing Primary Key, Hierarchy, and Display Column fields." lightbox="../media/powertable-layouts/how-to-configure-hierarchy-layout/reconfigure-hierarchy-layout.png":::

1. Update the required fields such as **Hierarchy Column** and **Display Column** as needed.
1. Select **Save**.

## Insert and manage hierarchy records

Use the three-dot menu on a parent record to perform the following actions:

:::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/parent-record-menu.png" alt-text="Screenshot of hierarchy table with three-dot menu open showing Expand, Insert Child Row, Move To, and Show Hierarchy options.":::

* **Expand**: Expands the selected parent record to display its child records.
* **Collapse**: Collapses the selected parent record to hide its child records.
* **Insert Child Row**: Adds a new child record under the selected parent. The hierarchy column value (*Manager_Id*) populates automatically. Enter the required values in the remaining fields.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/insert-child-row.png" alt-text="Screenshot of PowerTable showing a newly inserted child row with NULL values and pre-filled Manager_Id under the selected parent record." lightbox="../media/powertable-layouts/how-to-configure-hierarchy-layout/insert-child-row.png":::

* **Move To**: Moves the selected record to another parent. Select the required parent from the list, and then select **Move**.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/move-child-row.png" alt-text="Screenshot of Select a parent to move dialog with search box and list of records showing hierarchy paths." lightbox="../media/powertable-layouts/how-to-configure-hierarchy-layout/move-child-row.png":::

* **Show Hierarchy**: Displays the complete hierarchy for the selected record.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-hierarchy-layout/show-hierarchy-path.png" alt-text="Screenshot of PowerTable Hierarchy Path dialog displaying the reporting chain for the selected employee record." lightbox="../media/powertable-layouts/how-to-configure-hierarchy-layout/show-hierarchy-path.png":::

To expand or collapse all parent records, use **Expand** or **Collapse All** from the same menu, available at the highest level of the hierarchy.
