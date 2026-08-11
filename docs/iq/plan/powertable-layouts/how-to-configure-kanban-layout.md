---
title: Configure Kanban layout
description: Configure a Kanban layout to visualize tasks by workflow stage. Follow this guide to create the board, add tasks, group records, and move cards between columns.
#customer intent: As a project manager using PowerTable, I want to filter, sort, and group tasks on the Kanban board, so that I can find bottlenecks and prioritize pending work.
ms.date: 08/11/2026
ms.topic: how-to
---

# Configure Kanban layout

Kanban layout displays records as cards organized into columns based on a selected field. It provides a visual way to track work, monitor progress, and move records through different stages of a workflow.

Each card represents a single record and displays key information, such as the task name, assignee, and other configured fields. You can drag cards between columns to update their status, edit records directly from the board, and quickly identify work that requires attention.

This article explains how to create and use a Kanban view by using a sample **Tasks** table.

## Use cases

Use the Kanban layout to:

* Track work items through stages such as **Backlog**, **To Do**, **In Progress**, **Review**, and **Done**.
* Monitor task ownership by displaying the assignee on each card.
* Visualize the distribution of work across different workflow stages.
* Drag and drop tasks between columns to update their status.
* Identify bottlenecks and prioritize pending work.
* Manage software development tasks, project activities, support tickets, approval workflows, or any process that progresses through defined stages.

## Create the Kanban layout

This section explains how to create the Kanban layout to organize records into columns based on a selected field. In this example, you create a Kanban board for a **Tasks** table, where tasks are grouped by their workflow stage.

The sample **Tasks** table contains the following fields: Task ID, Title, Stage, Priority, Assignee, Sprint, Due Date, Story Points, Category, Description, and Progress.

1. In the **PowerTable** tab, go to **Layout** > **Kanban**. The **Board Layout Configuration** opens.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/create-kanban-layout.png" alt-text="Screenshot of the PowerTable tab with the Layout menu open and the Kanban option highlighted." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/create-kanban-layout.png":::

1. Configure the following properties:

    * **Task ID**: Select the column that uniquely identifies each task. In this example, select **Task ID**.
    * **Task Name**: Select the column to display as the primary label on each Kanban card. In this example, select **Title**.
    * **Stack by**: Select the column used to group tasks into Kanban columns. In this example, select **Stage**.
    * **Assignee** (optional): Select the column that displays the task owner on each card. In this example, select **Assignee**.
    * **Progress** (optional): Select a column that represents the progress of each task.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/configure-kanban-layout.png" alt-text="Screenshot of the Board Layout Configuration dialog with Task Id, Task Name, Stack by, Assignee, and Progress dropdowns and the Save button highlighted." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/configure-kanban-layout.png":::

1. Select **Save**.

    The Kanban view is created. PowerTable groups tasks into columns based on their stage, such as **Backlog**, **To Do**, **In Progress**, **Review**, and **Done**. Each task card has the task name, progress bar, and assignee.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/kanban-layout-created.png" alt-text="Screenshot of a Kanban board grouping tasks into stage columns, each card showing task name, progress bar, and assignee." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/kanban-layout-created.png":::

## View tasks

Each Kanban card displays the task title and the assigned user. Cards are organized into columns based on the selected **Stack by** field.

You can:

* Scroll vertically to view more tasks within a column.
* Scroll horizontally to view more Kanban columns or workflow stages.
* See the number of tasks in each column from the count displayed next to the column header.

## Customize the view

PowerTable provides various options to customize the Kanban layout.

### Compact and expanded view

Select the **Expanded View** in the top right corner to expand all the cards and view complete task details. You can then toggle back to the **Compact View**.

:::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/expanded-view.png" alt-text="Screenshot of PowerTable Kanban board in expanded view with the Expanded View button highlighted in the top right." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/expanded-view.png":::

### Collapse Kanban column

To collapse or minimize a Kanban column, select the three-dot menu for the column, and then select **Collapse**. Use this option when you have many columns and want to view them in a more compact layout and fit all of them on a screen.

:::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/collapse-hide-column.png" alt-text="Screenshot of a Kanban column three-dot menu showing the Collapse option used to minimize a column." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/collapse-hide-column.png":::

### Hide a column

To hide a Kanban column, select the three-dot menu, and then select **Hide**.&#x20;

> [!NOTE]
> Hiding a column applies only to the current **Stack By** field. If you [change the **Stack By** field](#stack-by-different-column), the hidden columns become visible again.

### Unhide a column

To unhide a column, select **Properties** and then toggle on **Unhide Stack**.

### Header Count

To display or hide the number of tasks in each column header, use the **Header Count** toggle under **Properties**.

:::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/header-count.png" alt-text="Screenshot of Kanban board with Properties menu open showing Header Count toggle on and Unhide Stack toggle off." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/header-count.png":::

## Stack by different column

After you create the Kanban layout, use the **Stack By** dropdown to instantly change the column by which tasks are grouped. The following image shows the layout stacked by the **Priority** field.

:::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/stack-by-column.png" alt-text="Screenshot of Kanban board with the Stack By dropdown open, showing Priority selected among Title, Stage, Assignee, Sprint, Category, and Description." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/stack-by-column.png":::

## Add a task

To add a new task:

1. Select **Add Task** on the toolbar. The form editor opens.

    :::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/add-task.png" alt-text="Screenshot of the PowerTable toolbar with the Add Task button highlighted above a Kanban board." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/add-task.png":::

1. Enter the task details in the form editor.
1. Select **Apply**.

The new task is added to the appropriate Kanban column based on the entered **Stage**.

Alternatively, select the **+** icon on the required stage column to open the form editor.

:::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/add-task-from-kanban-column.png" alt-text="Screenshot of Kanban columns showing add task plus icons and a form editor pane with Task ID, Stage, and Apply." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/add-task-from-kanban-column.png":::

> [!NOTE]
> Use [**Customize Form**](../powertable-how-to-generate-forms.md#customize-form) in the form editor to customize the form.

## Edit a task

1. Select a task card. The form editor opens.
2. Update the required fields in the form editor.
3. Select **Apply** to save the changes.

## Move tasks between columns

Drag a task card from one column to another to update its **Stage**.

For example, drag a task from **To Do** to **In Progress** when work begins. The task is automatically updated with the new status.

Alternatively, use the three-dot context menu on the task card to edit or move a task between stages.

:::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/edit-duplicate-move-tasks-menu.png" alt-text="Screenshot of a Kanban board task card's three-dot menu showing Edit, Duplicate, Delete, and Move To options with a submenu listing Backlog, In Progress, Review, and To Do.":::

## Duplicate or delete a task

Select the three-dot context menu on the task card as shown in the previous section and then select **Duplicate** or **Delete** to duplicate or delete the selected task.

The setting in the [**Manage Access**](../powertable-how-to-set-up-access-control.md#delete) menu controls the user's delete access.

## Filter, sort, and bulk edit tasks

Use the toolbar to locate specific tasks.

* Use [**Filter by keyword**](../powertable-how-to-explore-organize-data.md#search-records) to search for tasks by using keywords.
* Use the [**Find and Replace**](../powertable-how-to-bulk-edit-data.md#find-and-replace-data) option to bulk edit.
* Select [**Sort By**](../powertable-how-to-explore-organize-data.md#sort-records) to sort tasks by one or more columns.

## Group tasks

Select **Group By**, and then select the column by which you want to group similar tasks within the Kanban column. [This feature](../powertable-how-to-group-rows.md) groups the tasks into sections, making related tasks easier to identify and manage.

The following image shows the tasks grouped by priority within the existing Kanban columns.

:::image type="content" source="../media/powertable-layouts/how-to-configure-kanban-layout/group-tasks.png" alt-text="Screenshot of a Kanban board with Group By: Priority highlighted, showing tasks grouped under Critical, High, Low, and Medium columns." lightbox="../media/powertable-layouts/how-to-configure-kanban-layout/group-tasks.png":::

## Modify layout

To modify the existing Kanban layout and configure a new one, go to **Layout** > **Manage Layout**. Select the layout, and then reset or reconfigure the properties.
