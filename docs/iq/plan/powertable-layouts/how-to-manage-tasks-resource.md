---
title: Add and Manage Tasks in Resource Layout
description: Learn how to add, edit, move, delete, and view tasks in PowerTable Resource layout to manage tasks, milestones, backlog tasks, and task information.
#customer intent: As a PowerTable business user, I want to add and manage tasks in resource layout so that I can organize tasks, track task information, and manage my project activities from a single timeline view.
ms.date: 08/17/2026
ms.topic: how-to
---

# Add and manage tasks

Use the resource layout to manage tasks throughout their lifecycle. You can [add](#add-a-task) tasks, [update](#edit-a-task) task details, [view](#view-task-effort-and-history) task information, and [delete](#delete-a-task) tasks when they're no longer required.

## Add a task

Use tasks to plan, assign, and track work for resources in the resource layout. Depending on your scheduling requirements, you can create a [standard task](#create-a-standard-task), a [milestone](#create-a-milestone), or a [backlog task](#create-a-backlog-task). Each task type serves a different purpose and is displayed differently in the timeline.

### Create a standard task

A standard task is a scheduled work item that has a defined start date and end date. The timeline displays standard tasks based on their duration. You can assign a standard task to a resource for planning and tracking purposes.


To add a standard task:

1. In the **PowerTable** tab, select **Add Task**. Alternatively, expand **Add Task** and select **Add Task**.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/add-task.png" alt-text="Screenshot of the PowerTable tab with the Add Task menu open and the Add Task option highlighted.":::

   The **Record Details** side panel opens with the **Form Editor**.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/add-task-form-editor.png" alt-text="Screenshot of the Record Details side panel with the Form Editor tab." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/add-task-form-editor.png":::

1. Enter the task details. Fill in all mandatory fields.
1. Select the resource to which you want to assign the task.
1. Specify the **Start Date** and **End Date**.
1. Select **Apply**.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/configured-form-editor.png" alt-text="Screenshot of the Record Details side panel with the configured Form Editor tab to add a task." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/configured-form-editor.png":::

   The new task is added under the selected resource and appears on the timeline based on its start and end dates.

1. Select **Save to Database** to save the changes to the destination database.

:::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/added-task.png" alt-text="Screenshot of the Resource Layout with a added task." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/added-task.png":::

> [!NOTE]
>
> * If you add a task without assigning a resource, the task appears under **(NULL)**.
> * If you add a task without specifying a **Start Date**, the task is considered a [**Milestone**](#create-a-milestone) and is added as a milestone in the resource layout.
> * If you add a task without specifying the **Start Date** and **End Date**, the task is moved under [**Backlog Task**](#create-a-backlog-task).

### Create a milestone

Milestones represent important events, deadlines, or completion points in a project schedule.

To create a milestone:

1. In the **PowerTable** tab, expand **Add Task** and select **Insert Milestone**. The **Record Details** side panel opens with the **Form Editor**.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/insert-milestone.png" alt-text="Screenshot of the PowerTable tab with the Add Task menu open and the Insert Milestone option highlighted.":::

1. Enter the required task details and fill in all mandatory fields, including the **Resource** field.
1. Select **Apply**.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/milestone-form-editor.png" alt-text="Screenshot of the Record Details side panel with the configured Form Editor to insert a Milestone." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/milestone-form-editor.png":::

The configured milestone is displayed on the timeline. Select **Save to Database** to save the milestone to the database.

:::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/added-milestone.png" alt-text="Screenshot of the Resource Layout with a added Milestone." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/added-milestone.png":::

> [!NOTE]
> The **Start Date** field is disabled when you create a milestone because a milestone is represented by a single date rather than a task duration.

### Create a backlog task

A backlog task is a task that you create without a specific **Start Date** or **End Date**. It's not scheduled within a particular time period in the resource layout, so you can keep tasks that you haven't planned or scheduled yet separate. You can assign a backlog task to a time period later by specifying its start and end dates.


To create a backlog task:

1. Select **Backlog Task** to open the **Backlog Task** panel.
1. Select **Add Task** to open the **Record Details** panel.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/backlog-task.png" alt-text="Screenshot of the Resource layout with Backlog Task option highlighted." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/backlog-task.png":::

1. Enter the required task information in the **Form Editor**.
1. Leave **Start Date** and **End Date** empty to create the task as a backlog task.
1. Select **Apply**.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/backlog-task-form-editor.png" alt-text="Screenshot of the Record Details side panel with configured Form Editor to create a backlog task." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/backlog-task-form-editor.png":::

The task is added as a backlog task without a scheduled time period. Select **Save to Database** to save the backlog task to the database. You can delete or edit the task at any time to assign it to a specific time period by selecting the **Edit** icon.

:::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/edit-backlog-task.png" alt-text="Screenshot of the Backlog Task side panel with edit and delete options." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/edit-backlog-task.png":::

> [!NOTE]
> If you specify **Start Date** and **End Date** when configuring a backlog task, the task is added as a standard task instead of a **Backlog Task**.

## Edit a task

Edit tasks to update scheduling information, resource assignments, or other task details. You can modify tasks [using the **Form Editor**](#using-the-form-editor) or [adjust task dates](#using-drag-handles) directly from the timeline. After making the required changes, select **Save to Database** to save the updates to the destination database.

### Using the form editor

Use the form editor to update task properties such as resource assignments, dates, and other available fields.


To edit a task by using the form editor:

1. Select the task bar. The **Record Details** side panel opens with the **Form Editor**.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/edit-form-editor.png" alt-text="Screenshot of the Record Details side panel with Form Editor that opens upon selecting the task bar." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/edit-form-editor.png":::

1. Edit the task details as required.
1. Update the **Resource**, **Start Date**, **End Date**, and other available fields.
1. Select **Apply**.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/editing-form-editor.png" alt-text="Screenshot of the Record Details side panel with Form Editor that contains edited task details." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/editing-form-editor.png":::

The resource layout updates to reflect the changes you made to the task.

:::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/edited-task.png" alt-text="Screenshot of the Resource layout with an updated task bar." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/edited-task.png":::

### Using drag handles

Use drag handles to quickly adjust task start and end dates directly from the timeline without opening the Form Editor.

To adjust the task timeline:

1. Hover over the task bar. Drag handles appear at both ends of the task bar.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/drag-handles.png" alt-text="Screenshot of the Resource layout with drag handles of a task bar." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/drag-handles.png":::

1. Drag the handles to adjust the **Start Date** or **End Date**.
1. Release the drag handle to apply the changes.

The resource layout updates the task timeline based on the new start and end dates. Use this option to adjust task durations or resolve overlapping tasks assigned to a resource.

:::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/adjusted-task.png" alt-text="Screenshot of the Resource layout with an adjusted timeline of a task bar." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/adjusted-task.png":::

## Move a task to another resource

You can reassign a task from one resource to another resource or assign a task from **(NULL)** to a resource to manage resource allocation.


To move a task to another resource:

1. Drag the task that you want to reassign.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/drag-task.png" alt-text="Screenshot of the Resource layout with a selected task bar to drag it to the required resource." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/drag-task.png":::

1. Drop the task under the required resource.
1. Select **Save to Database** to save the changes to the database.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/drop-task.png" alt-text="Screenshot of the Resource layout with task dropped at the required resource." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/drop-task.png":::

The task appears under the newly assigned resource. PowerTable automatically updates the **Start Date**, **End Date**, and **Assignee** fields for the task based on the new assignment.

## Delete a task

You can delete tasks that you no longer need.


To delete a task:

1. Select the task that you want to delete.
1. Select the **Delete icon** on the toolbar. Alternatively, right-click the task and select **Delete**.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/delete-task.png" alt-text="Screenshot of the Resource layout with a selected task and highlighted delete icon." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/delete-task.png":::

1. Confirm the deletion.
1. Select **Save to Database** to save the changes.

The task is removed from the assigned resource.

:::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/deleted-task.png" alt-text="Screenshot of the Resource layout after a deleted task." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/deleted-task.png":::

## View task effort and history

The **Record Details** side panel provides more information about a selected task through the [**Effort**](#view-effort-information) and [**History**](#view-task-history) tabs. Use these tabs to review estimated effort allocation and track changes made to task records.

### View effort information

The **Effort** tab displays estimated effort details for the selected task and shows how the effort is distributed across the task duration.

To view effort information:

1. Select a task in the resource layout.
1. In the **Record Details** side panel, select the **Effort** tab.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/effort-tab.png" alt-text="Screenshot of the Record Details side panel with the Effort tab highlighted." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/effort-tab.png":::

The **Effort** tab displays:

* **Duration** - The total duration of the task.
* **Total Effort** - The estimated effort assigned to the task in hours.

The effort allocation summary displays the calculated effort allocated per day based on the task duration and total effort.

When you update the **Total Effort** value, the allocation summary recalculates to display the average effort allocated per day across the task duration.

For example:

* Duration: 3 days
* Total Effort: 40 hours
* Allocation summary: 13.3 hours per day over 3 days

> [!NOTE]
>
>* The **Effort** tab displays effort allocation based on the configured **Estimated Effort** field and the task duration.
>* The **Effort** tab appears in the **Record Details** panel only when you select a column for **Estimated Effort** in the [**Layout Configuration**](how-to-configure-resource-overview.md#configuration-properties). If you don't select an **Estimated Effort** column, the **Effort** tab isn't displayed.

### View task history

The **History** tab displays an audit trail of changes made to the selected task.

To view task history:

1. Select a task in the resource layout.
1. In the **Record Details** side panel, select the **History** tab.

   :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/history-tab.png" alt-text="Screenshot of the Record Details side panel with the History tab highlighted." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/history-tab.png":::

The **History** tab displays:

* Modified field name.
* Previous value and updated value.
* User who made the change.
* Date and time of the modification.

Use the **History** tab to review task updates and track changes throughout the task lifecycle.

You can also:

* Use **Search** to locate specific history entries.
* Use **Filter** to display specific types of changes.
* Use **Export** to export available history records.
* Use **Audit logs** to track and review changes made to the task. For more information, see [Audit logs](../powertable-how-to-view-audit-logs.md).

  :::image type="content" source="../media/powertable-layouts/how-to-manage-tasks-resource/history-tab-features.png" alt-text="Screenshot of the Record Details side panel with highlighted features in History tab such as Search, Filter, Audit Logs and Export." lightbox="../media/powertable-layouts/how-to-manage-tasks-resource/history-tab-features.png":::
