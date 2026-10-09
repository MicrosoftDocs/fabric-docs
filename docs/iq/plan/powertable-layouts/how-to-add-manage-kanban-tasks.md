---
title: Add and Manage Tasks in the PowerTable Kanban Layout
description: Add and manage tasks in the PowerTable Kanban layout. Learn how to create, edit, duplicate, move, and delete task cards, then save changes to your database.
ms.date: 10/08/2026
ms.topic: how-to
---

# Add and manage tasks in Kanban layout

This article explains how to add and manage tasks within the Kanban layout.

> [!IMPORTANT]
>
> * After you add, edit, duplicate, delete, or move tasks between stacks, select **Save to Database** to save your changes to the database.
> * Use **Discard Changes** if you want to discard all the changes you made.
> * Select **Preview Changes** to preview all changes you made. You can select the ones you want to discard and save the remaining to the database.

## View tasks

Each Kanban card displays the task title and the assigned user. Cards are organized into stacks based on the selected **Stack by** field.

:::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/view-tasks.png" alt-text="Screenshot of the Kanban board with task cards in Backlog, In Progress, Review, Done, and To Do stacks." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/view-tasks.png":::

You can:

* Scroll vertically to view more tasks within a stack.
* Select **Load More Tasks** to add more stacks to the display for your viewing.
* See the number of tasks in each stack from the count displayed next to the stack header.
* Scroll horizontally to view more Kanban stacks or workflow stages.

    :::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/load-more-tasks.png" alt-text="Screenshot of the Kanban board with the Load More Tasks button highlighted below the task stacks." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/load-more-tasks.png":::

## Add a task

To add a new task:

1. Select **Add Task** on the toolbar. The form editor opens.

    :::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/add-task.png" alt-text="Screenshot of the PowerTable toolbar with Add Task highlighted above a Kanban board grouped by Status." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/add-task.png":::

1. Enter the task details in the form editor.

    :::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/add-task-details.png" alt-text="Screenshot of the PowerTable Record Details form editor with new task details entered and the Apply button highlighted." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/add-task-details.png":::

1. Select **Apply**. The new task is added to the appropriate Kanban stack based on the entered **Stage**.

1. Select **Save to Database** to update the database table.

Alternatively, select the **+** icon on the required stage stack to add a new task in that stack.

:::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/select-plus-button.png" alt-text="Screenshot of PowerTable Kanban board with the plus icons highlighted on the In Progress and Review stacks for adding a new task." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/select-plus-button.png":::

> [!NOTE]
> Use [**Customize Form**](../powertable-how-to-generate-forms.md#customize-form) in the form editor to customize the form.

## Edit a task

To edit a task, follow these steps:

1. Select the vertical ellipsis on the task card you want to edit, and then select **Edit**. The form editor opens.

    :::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/edit-task.png" alt-text="Screenshot of a Kanban task card menu with Edit highlighted and the Record Details form editor open for the task." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/edit-task.png":::

1. Update the required fields in the form editor.
1. Select **Apply** to save the changes.
1. Select **Save to Database** to update the changes in the database table.

> [!TIP]
> You can also open the **Form Editor** for a task card by selecting anywhere on the card and then starting to edit the task details.

## View history

View the audit trail of changes made to a specific task by using the **History** tab.

To view task history:

1. Select a task in the Kanban layout.
1. In the **Record Details** side panel, select the **History** tab. The following image shows the **History** tab for a recently added task, displaying the changes recorded for the task.

    :::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/history-tab.png" alt-text="Screenshot of the Kanban layout with a selected task and the History tab highlighted in the Record Details panel." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/history-tab.png":::

1. The **History** tab displays operations performed on the task record, including:

   * The task that you inserted or modified.
   * The field that you modified.
   * The previous and updated values.
   * The user who made the change.
   * The date and time of the change.

   The following image shows the updates made to an existing task along with all these details.

    :::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/history-details.png" alt-text="Screenshot of Record Details History tab listing T-1008 updates: Progress changed from 0 to 10 and Status from Backlog to In Progress." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/history-details.png":::

1. Use the **History** tab to review task updates and track changes throughout the task lifecycle.
1. Within the tab, you can:

   * Use **Search** to find specific history entries.
   * Use **Filter** to filter the history and display specific changes based on action type (Insert, Update, or Delete), who made the change, when the change occurred, or who approved the change (if approvals are enabled).
   * Use [**Export**](../powertable-how-to-bulk-edit-data.md#export-history) to export the available history records.
   * Use **Audit logs** to review changes made to the task in detail. For more information, see [Audit logs](../powertable-how-to-view-audit-logs.md).

## Move stacks

You can rearrange stacks by using drag and drop. Drag a stack to the position where you want it to go to rearrange the stacks.

:::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/move-stacks.png" alt-text="Screenshot of the To Do stack being moved by drag and drop, with the hand cursor highlighted in a red box.":::

## Move tasks between stacks

You can rearrange task cards within a stack or between stacks.

* Drag and drop a task card within a stack to reposition the task visually.
* Drag a task card from one stack to another to update its **Stage**. After drag and drop, select **Save to Database** to update the changes in the database.

For example, when work begins, drag a task from **To Do** to **In Progress**. The task's **Stage** automatically updates to **In Progress**.

:::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/move-tasks-between-stacks.png" alt-text="Screenshot of a task board showing the Configure CI Pipeline card being dragged from the To Do stack toward the In Progress stack.":::

Alternatively, select the vertical ellipsis on a task card and use **Move To** to move it to another stage.

:::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/move-to-stack-option.png" alt-text="Screenshot of the Kanban board showing the vertical ellipsis menu on a task card with the Move To submenu open." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/move-to-stack-option.png":::

## Duplicate a task

To duplicate a task, select the vertical ellipsis on the task card and then select **Duplicate**.

:::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/duplicate-task.png" alt-text="Screenshot of the Kanban board showing the vertical ellipsis menu on the Fix Payment Gateway Bug card with the Duplicate option highlighted." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/duplicate-task.png":::

PowerTable duplicates the selected task and opens the form editor. You can edit the details you want in the form editor and select **Apply** to save changes.

## Delete a task

To delete a task, select the vertical ellipsis on the task card and then select **Delete**. Alternatively, right-click the card and select **Delete**.

:::image type="content" source="../media/powertable-layouts/how-to-add-manage-kanban-tasks/delete-task.png" alt-text="Screenshot of the Kanban board showing the vertical ellipsis menu on the Add Audit Logging card with the Delete option highlighted." lightbox="../media/powertable-layouts/how-to-add-manage-kanban-tasks/delete-task.png":::

> [!NOTE]
> The [**Manage Access**](../powertable-how-to-set-up-access-control.md#delete) menu controls your delete access. If **Delete** is disabled, select **Manage Access** to update the delete access settings.
