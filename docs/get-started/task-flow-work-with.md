---
title: Manage tasks
description: This show how to add, delete, change, and connect tasks, and also how to assign items to tasks.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: how-to
ms.date: 05/07/2024
---

# Manage tasks

When you select a task, the side panel displays the task details.

:::image type="content" source="./media/task-flow-work-with/task-details-side-pane.png" alt-text="Screenshot explaining the task details pane.":::

1. [Delete task](#delete-a-task)
1. [Edit task name and description](#edit-task-name-and-description)
1. [Change task type](#change-task-type)
1. [Create new item for task](#create-a-new-item-for-a-task)
1. [Assign existing items to task](#assign-existing-items-to-a-task)

## Add a task 

To add a new task to the task flow canvas, open the **Add** dropdown menu and select the desired task type.

:::image type="content" source="./media/task-flow-work-with/add-task.png" alt-text="Screenshot showing the Add dropdown menu on the task flow canvas." lightbox="./media/task-flow-work-with/add-task.png":::

The task of the selected task type is added onto the canvas. The name and description of the new task are the default name and description of the task type. Consider [changing the name and description](#edit-task-name-and-description) of the new task to better describe its purpose in the work flow. A good task name should identify the task and provide a clear indication of its intended use.

## Edit task name and description

To edit a task's name or description:

1. Select the task on the canvas to open the [task details side pane](#manage-tasks).

2. Select **Edit** and change the name and description fields as desired. When done, select **Save**.

## Change task type

To change a task to a different type:

1. Select the task on the canvas to open the [task details side pane](#manage-tasks).

1. Open the **Task type** dropdown menu and choose the new desired task type.

> [!NOTE]
> Changing the task type doesn't change the task name or description. Consider changing these fields to suit the new task type.

## Arrange tasks on the canvas

Part of building a task flow is arranging the tasks in the proper order. To arrange the tasks, select and drag each task to the desired position in the task flow.

> [!TIP]
> When you move tasks around on the canvas, they stay in the place where you put them. However, due to a known issue, when you add a new task to the canvas, any unconnected tasks will move back to their default positions. Therefore, to safeguard your arrangement of tasks, it's highly recommended to connect them all with connectors before adding any new tasks to the canvas.

## Connect tasks

Connectors show the  logical flow of work. They don't make or indicate any actual data connections - they are graphic representations of the flow of tasks only.

### Add a connector

To connect two tasks, select the edge of the starting task and drag to an edge of the next task.

:::image type="content" source="./media/task-flow-work-with/connecting-two-tasks-select-drag.png" alt-text="Screenshot showing how to create a connector via select and drag.":::

Alternatively, you can select **Add** > **Connector** from the **Add** dropdown on the canvas.

:::image type="content" source="./media/task-flow-work-with/connecting-two-tasks-add-menu.png" alt-text="Screenshot showing how to create a connector using the add menu.":::

Then, in the **Add connector** dialog, select the start and end tasks, then select **Add**.

:::image type="content" source="./media/task-flow-work-with/connecting-two-tasks-add-connector-dialog.png" alt-text="Screenshot showing how to specify the start and end tasks in the add connector dialog.":::

### Delete a connector

To delete a connector, select it and press **Enter**.

Alternatively, select the connector to open the connector details side pane, then select the trash can icon.

:::image type="content" source="./media/task-flow-work-with/connector-delete.png" alt-text="Screenshot showing how to delete a connector on the connector details pane.":::

### Change connector start and end points or direction

To change a connector's start and end values, or switch it's direction:

1. Select the connector to open the connector details side pane.

1. In the side pane, change the start and end values as desired, or select **Swap** to change connector direction.

    :::image type="content" source="./media/task-flow-work-with/connector-edit-swap.png" alt-text="Screenshot showing how to edit connector start and end points or change connector direction on the connector details pane.":::

## Assign items to a task

Once a task has been placed on the canvas, you can assign items to it help logically structuring and organizing your work. You can [create new items to be assign to the task](#create-a-new-item-for-a-task), or you can [assign items that already exist in the workspace](#assign-existing-items-to-a-task).

### Create a new item for a task

To create a new item for a specific task:

1. Select **+ New item** on the task.

    :::image type="content" source="./media/task-flow-work-with/create-item-for-task.png" alt-text="Screenshot showing how to create a new item for a task.":::

1. On the **Create an item** pane that opens, the recommended item types for the task are displayed by default. Choose one of the recommended types.

    If you don't see the item type you want, change the **Display** selector from *Recommended items* to *All items*, and then choose the item type you want.

### Assign existing items to a task

To attach existing items to a task:

1. Select the clip icon on the task.

    :::image type="content" source="./media/task-flow-work-with/assign-existing-task-clip-icon.png" alt-text="Screenshot showing the assign existing items clip icon.":::

1. In the **Assign item** dialog box that opens, hover over item you want to assign to the task and mark the checkbox. You can assign more than one item. When done choosing the items you want to assign to the task, choose **Select** to attach the selected items to the task.

    :::image type="content" source="./media/task-flow-work-with/assign-existing-item-dialog.png" alt-text="Screenshot showing the Assign item dialog.":::

The items you selected items are assigned to the task.

### Detach items from tasks

You can detach items from a selected task or detach items from all tasks.

> [!NOTE]
> Detaching items from tasks does not remove the items from the workspace.

#### Detach items from a task

To unassign items from a task, first select the task you want to remove the items from. This filters the item list to show just the items that are assigned to the task. Next, in the item list, hover over the items you want to unassign and then mark the checkboxes that appear. Finally, on the workspace toolbar, choose **Unassign from task**.

:::image type="content" source="./media/task-flow-work-with/unassign-items-from-task.png" alt-text="Screenshot illustrating how to unassign items from a task.":::

#### Detach items from all tasks

You can also detach multiple items that are attached to different tasks at once.

To unassign multiple items from multiple tasks, select **Clear all** at the top of the items list to clear all filters so that all items in the workspace are visible. Next hover over the items you want to unassign and mark the checkboxes. When you've finished making your selections, select **Unassign from all tasks** in the workspace toolbar.

:::image type="content" source="./media/task-flow-work-with/unassign-items-from-all-tasks.png" alt-text="Screenshot showing how to unassign items from all tasks." lightbox="./media/task-flow-work-with/unassign-items-from-all-tasks.png":::

[QUESTION: Can an item only be assigned to one task at a time?]

## Delete a task

To delete a task, select it to open the task details side pane, and then select the trash can icon.

:::image type="content" source="./media/task-flow-work-with/delete-task.png" alt-text="Screenshot showing how to delete a task.":::

Alternatively, select the task flow canvas to open the task flow details pane. Then in the task flow details pane, hover over the task you want to delete in the Tasks list and select the trash can icon.

:::image type="content" source="./media/task-flow-work-with/delete-task-via-task-flow-details-pane.png" alt-text="Screenshot showing how to delete a task from the task flow details pane.":::

## Navigate items with task flows

With items assigned to the tasks, you can use the task flow to quickly understand how items in the workspace work together and get a clear view of your work in the workspace.

* For each item that you see in the items list, you can see the item type and what task it's assigned to, if any.

    :::image type="content" source="./media/task-flow-work-with/navigate-with-task-flow.png" alt-text="Screenshot illustrating how to use the task flow to navigate the item list.":::

* When you select a task, the items list is filtered to show only the items that are assigned to that task.

    :::image type="content" source="./media/task-flow-work-with/filter-item-list.png" alt-text="Screenshot illustrating how to filter the item list by selecting a task.":::

[QUESTION: Can you clarify what you mean by "understand how they work together, and "get a clear view of your work in the workspace. To mean, I understand that selecting a task filters the items to those items that are in the task. Can you state more precisely how this helps you understand your work?] 

## Delete a task flow

Deleting the task flow will only delete all the tasks and any associations between the items and the tasks.

[QWESTION: What do you mean by "associations between the items and the tasks? Do you mean assignments?]

To delete a task flow, first select a blank area of the canvas to display the task flow pane. Next, select the trash icon to delete the task flow.

:::image type="content" source="./media/task-flow-work-with/delete-task-flow.png" alt-text="Screenshot showing how to delete a task flow.":::

Deleting a task flow deletes all tasks, the task list, and any item assignments.

Any items created will remain in the workspace, but you need to assign them to tasks in your new task flow.

## Related concepts

* [Task flow overview](./task-flow-overview.md)
* [Task flow concepts](./task-flow-concepts.md)
* [Set up a task flow](./task-flow-create.md)