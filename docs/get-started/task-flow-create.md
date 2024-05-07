---
title: Set up a task flow
description: This article shows how to set up a task flow.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: how-to
ms.date: 05/07/2024
---

# Set up a task flow in a workspace

Open the workspace. You'll see that the workspace view is split between the task flow, where you'll build your task flow, and the item list, which shows you the items in the workspace. A moveable separator allows you adjust the size of the views.

The task flow itself is split between the canvas, which will hold the visualization of your work flow, and a side panel that contains information and controls to help you build the task flow. The contents of the side panel changes according to what is selected in the canvas.

When no task flow has been configured, an empty default task flow entitled **Get started with a task flow** is there. To start building a task flow, you can either select a task flow from one of predesigned task flows or add a task to start building one yourself.

The following image shows how the workspace looks before a task flow has been configured and before any items have been created in the workspace. 

:::image type="content" source="./media/task-flow-create/task-flow-initial-state.png" alt-text="Screenshot showing the initial empty state of a task flow." lightbox="./media/task-flow-create/task-flow-initial-state.png"::: 

## Start with a predesigned task flow

On the default task flow, choose **Select a task flow**. The side panel lists ten predesigned task flows provided by Microsoft. Each predefined task flow has a a brief description of its use case. When you select a flow, you'll see a more detailed description of the task flow and how it's used, and also the workloads and item types that the task flow requires.

:::image type="content" source="./media/task-flow-create/task-flow-predesigned-panel.png" alt-text="Screenshot showing the task flow side panel of a predesigned task flow." lightbox="./media/task-flow-create/task-flow-predesigned-panel.png":::

1. Task flow name.
1. Brief description of the task flow use case.
1. Number of tasks in the task flow.
1. Detailed description of the task flow and how it's used.
1. The workloads that the task flow typically requires.
1. The item types that are typically used in task flow.

Select the task flow that best fits your project needs and then choose **Select**. The selected task flow will be applied to the task flow canvas.

:::image type="content" source="./media/task-flow-create/task-flow-predefined-task-flow-applied.png" alt-text="Screenshot showing a predefined task flow selected and applied to canvas." lightbox="./media/task-flow-create/task-flow-predefined-task-flow-applied.png":::

* The task flow canvas provides a graphic view of the tasks and all interactions of the task flow. [QUESTION: what do we mean by "all interactions"?]

* The side panel shows detailed information about the task flow, including task flow name, description, total number of tasks in the task flow, and a list of those tasks. You can change the task flow name and description in the task flow details pane by selecting **Edit** .

* The items list shows all the items and folders in the workspace, including those items that are attached to tasks in the task flow. When you select a task in the task flow, the items list is filtered to show just the items that are attached to the selected task. In the preceding illustration, the items list is empty because no items have been created yet.

> [!NOTE]
> Selecting a predefined task flow just places the tasks involved in the task flow on the canvas and indicates the connections between them. It is just a graphical representation - no actual items or data connections are created at this point.

## Start with a custom task flow

If you already have a clear idea of what the structure of your task flow needs to be, or if none of the predesigned task flows fit your needs, you can build a custom task flow.

First, select **Edit** in the task flow side panel and provide a name and description for your task flow to help other members of this workspace understand the task flow and your project.

Next, on the task flow canvas select **Add a task** and choose a task type.

:::image type="content" source="./media/task-flow-create/task-flow-add-initial-task.png" alt-text="Screenshot illustrating renaming a task flow and adding an initial task." lightbox="./media/task-flow-create/task-flow-add-initial-task.png":::

The task appears on the canvas. Note that the side panel now shows the task details.

:::image type="content" source="./media/task-flow-create/task-flow-initial-task.png" alt-text="Screenshot showing the first task added to the canvas." lightbox="./media/task-flow-create/task-flow-initial-task.png":::

You can continue to add other tasks to the canvas, as well as manage tasks and link tasks together. These topics are discussed in more detail in the following sections.

## Delete a task flow

Deleting the task flow will only delete all the tasks and any associations between the items and the tasks.

[QWESTION: What do you mean by "associations between the items and the tasks? Do you mean assignments?]

To delete a task flow, first select a blank area of the canvas to display the task flow pane. Next, select the trash icon to delete the task flow.

:::image type="content" source="./media/task-flow-create/delete-task-flow.png" alt-text="Screenshot showing how to delete a task flow.":::

Deleting a task flow deletes all tasks, the task list, and any item assignments.

Any items created will remain in the workspace, but you need to assign them to tasks in your new task flow.

## Related concepts

* [Task flow overview](./task-flow-overview.md)
* [Task flow concepts](./task-flow-concepts.md)
* [Manage tasks](./task-flow-work-with.md)
