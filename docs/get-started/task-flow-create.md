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

This article descibes how to start building a task flow, starting either from scratch or with one of Fabric's predefined task flows. It targets data analytics solution architects and others who want to create a visualization of a data project.


## Open the workspace

Navigate to the workspace where you want to create your task flow and open **List view**.

You'll see that the workspace view is split between the task flow, where you'll build your task flow, and the item list, which shows you the items in the workspace. A moveable separator bar allows you to adjust the size of the views. You can also collapse the task flow if you want to get it out of the way.

The task flow itself is split between the canvas, which will hold the visualization of your work flow, and a side pane that contains information and controls to help you build the task flow. The contents of the side pane changes according to what is selected in the canvas.

When no task flow has been configured, an empty default task flow entitled **Get started with a task flow** is there. To start building your task flow, you can either select one of the predesigned task flows or add a task to start building one from scratch.

The following image shows what the workspace looks like before a task flow has been configured.

:::image type="content" source="./media/task-flow-create/task-flow-initial-state.png" alt-text="Screenshot showing the initial empty state of a task flow." lightbox="./media/task-flow-create/task-flow-initial-state.png":::

1. List view selector
1. Task flow canvas
1. Task flow details pane
1. Resize bar
1. Show/hide task flow
1. Items list

## Start with a predesigned task flow

On the empty default task flow, choose **Select a task flow**.

The side pane lists ten predesigned task flows provided by Microsoft. Each predefined task flow has a a brief description of its use case. When you select a flow, you'll see a more detailed description of the task flow and how it's used, and also the workloads and item types that the task flow requires.

:::image type="content" source="./media/task-flow-create/task-flow-predesigned-panel.png" alt-text="Screenshot showing the task flow side panel of a predesigned task flow." lightbox="./media/task-flow-create/task-flow-predesigned-panel.png":::

1. List of predesigned task flows.
1. Name of selected predesigned task flow.
1. Number of tasks in the task flow.
1. Detailed description of the task flow and how it's used.
1. The workloads that the task flow typically requires.
1. The item types that are typically used in task flow.

Select the task flow that best fits your project needs and then choose **Select**. The selected task flow will be applied to the task flow canvas.

:::image type="content" source="./media/task-flow-create/task-flow-predefined-task-flow-applied.png" alt-text="Screenshot showing a predefined task flow selected and applied to canvas." lightbox="./media/task-flow-create/task-flow-predefined-task-flow-applied.png":::

The task flow canvas provides a graphic view of the tasks and how they are connected logically.

The side panel shows detailed information about the task flow, including
* Task flow name
* Task flow description
* Total number of tasks in the task flow
* A list of the tasks in the task flow.

It's recommended that you change the task flow name and description to something meaningful that enables others to better understand what the task is all about. To change the name and description, select **Edit**. For more information, see [Edit task name and description](./task-flow-work-with.md#edit-task-name-and-description).

The items list shows all the items and folders in the workspace, including those items that are attached to tasks in the task flow. When you select a task in the task flow, the items list is filtered to show just the items that are attached to the selected task.

> [!NOTE]
> Selecting a predefined task flow just places the tasks involved in the task flow on the canvas and indicates the connections between them. It is just a graphical representation - no actual items or data connections are created at this point.

After you've added the predefined task flow to the canvas, you can start modifying it to suit your needs. See [Working with taskflows](./task-flow-work-with.md) for details.

## Start with a custom task flow

If you already have a clear idea of what the structure of your task flow needs to be, or if none of the predesigned task flows fit your needs, you can build a custom task flow from scratch.

First, select **Edit** in the task flow side pand and provide a name and description for your task flow to help other members of this workspace understand the task flow and your project.

Next, on the task flow canvas select **Add a task** and choose a task type.

:::image type="content" source="./media/task-flow-create/task-flow-add-initial-task.png" alt-text="Screenshot illustrating renaming a task flow and adding an initial task." lightbox="./media/task-flow-create/task-flow-add-initial-task.png":::

The task appears on the canvas. Note that the side pane now shows the task details.

:::image type="content" source="./media/task-flow-create/task-flow-initial-task.png" alt-text="Screenshot showing the first task added to the canvas." lightbox="./media/task-flow-create/task-flow-initial-task.png":::

You can continue to add other tasks to the canvas, as well as manage tasks and link tasks together. For more information about this topics, see [Working with task flows](./task-flow-work-with.md).

## Related concepts

* [Task flow overview](./task-flow-overview.md)
* [Task flow concepts](./task-flow-concepts.md)
* [Manage tasks](./task-flow-work-with.md)
