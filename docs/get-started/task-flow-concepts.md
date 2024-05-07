---
title: Fabric task flow concepts
description: This article describes the main task flow concepts.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: concept-article
ms.date: 05/07/2024
---

# Task flow concepts

Fabric task flow is a workspace feature that enables you to build a visualization of the flow of work in the workspace. The task flow helps you understand how items are related and work together in your workspace, and makes it easier for you to navigate your workspace, even as it becomes more complex over time. Moreover, the task flow can help you standardize your team's work and keep your design and development work in sync to boost the team's collaboration and efficiency.

Fabric provides a range of predefined, end-to-end task flows based on industry best practices that are intended to make it easier to get started with your project. In addition, you can customize the task flows to suit your specific needs and requirements. This enables you to create a tailored solution that meets your unique business needs and goals.

## Task flow

A task flow is a collection of connected tasks that represent relationships in a process or collection of processes that complete an end-to-end data solution. A workspace has one task flow. You can either build it from scratch or use one of Fabric's predefined task flows, which you can customize as desired.

pen the workspace. You'll see that the workspace view is split between the task flow, where you'll build your task flow, and the item list, which shows you the items in the workspace. A moveable separator allows you adjust the size of the views.

The task flow itself is split between the canvas, which will hold the visualization of your work flow, and a side panel that contains information and controls to help you build the task flow. The contents of the side panel changes according to what is selected in the canvas.

When no task flow has been configured, an empty default task flow entitled **Get started with a task flow** is there. To start building a task flow, you can either select a task flow from one of predesigned task flows or add a task to start building one yourself.

The following image shows how the workspace looks before a task flow has been configured and before any items have been created in the workspace. 

:::image type="content" source="./media/task-flow-concepts/task-flow-initial-state.png" alt-text="Screenshot showing the initial empty state of a task flow." lightbox="./media/task-flow-concepts/task-flow-initial-state.png"::: 


## Start with a predesigned task flow

On the default task flow, choose **Select a task flow**. The side panel lists ten predesigned task flows provided by Microsoft. Each predefined task flow has a a brief description of its use case. When you select a flow, you'll see a more detailed description of the task flow and how it's used, and also the workloads and item types that the task flow requires.

:::image type="content" source="./media/task-flow-concepts/task-flow-predesigned-panel.png" alt-text="Screenshot showing the task flow side panel of a predesigned task flow." lightbox="./media/task-flow-concepts/task-flow-predesigned-panel.png":::

1. Task flow name.
1. Brief description of the task flow use case.
1. Number of tasks in the task flow.
1. Detailed description of the task flow and how it's used.
1. The workloads that the task flow typically requires.
1. The item types that are typically used in task flow.

Select the task flow that best fits your project needs and then choose **Select**. The selected task flow will be applied to the task flow canvas.

:::image type="content" source="./media/task-flow-concepts/task-flow-predefined-task-flow-applied.png" alt-text="Screenshot showing a predefined task flow selected and applied to canvas." lightbox="./media/task-flow-concepts/task-flow-predefined-task-flow-applied.png":::

* The task flow canvas provides a graphic view of the tasks and all interactions of the task flow. [QUESTION: what do we mean by "all interactions"?]

* The side panel shows detailed information about the task flow, including task flow name, description, total number of tasks in the task flow, and a list of those tasks. You can change the task flow name and description in the task flow details pane by selecting **Edit** .

* The items list shows all the items and folders in the workspace, including those items that are attached to tasks in the task flow. When you select a task in the task flow, the items list is filtered to show just the items that are attached to the selected task. In the preceding illustration, the items list is empty because no items have been created yet.

> [!NOTE]
> Selecting a predefined task flow just places the tasks involved in the task flow on the canvas and indicates the connections between them. It is just a graphical representation - no actual items or data connections are created at this point.

## Task

A task is a unit of process in the task flow. A task has recommended item types to help you select the appropriate items when building your solution. Tasks also help you navigate the items in the workspace.

When you select a task, the side panel displays the task details.

:::image type="content" source="./media/task-flow-concepts/task-details-pane.png" alt-text="Screenshot explaining the task details pane.":::

When you select a task, the side panel displays the task details.

:::image type="content" source="./media/task-flow-concepts/task-details-pane.png" alt-text="Screenshot explaining the task details pane.":::

There are five parts in the Task details pane:

1. Task name. A good task name should identify the task and provide a clear indication of its intended use.
1. Number of items assigned to the task.
1. Task description. A good task description provides a detailed explanation of the task and its intended use.
1. Task type. By configuring and selecting task type, the specific category of the recommended items are different. [QUESTION: I don't understand this sentence very well.]
1. Item recommendation: The list of items recommended for the task. The list of recommended items varies depending on the selected task type.


## Task types

Each task has a task type that classifies the task based on its key capabilities in the data process flow. The predefined task types are:

| Task type | What you want to do with the task |
|:--------|:----------|
| **General** | Create a customized task for your project needs that you can assign available item types to. |
| **Get data** | Ingest both batch and real-time data into a single location within your Fabric workspace. |
| **Store data** | Organize, query, and store your ingested data in an easily retrievable format. |
| **Prepare data** | Prepare your data for analysis or modeling by addressing issues with the data, such as duplicates, missing values, formatting, etc. |
| **Analyze and train data** | Analyze and use your newly structured data to build and train machine learning models to make decisions and predictions. |
| **Track data** | Take actions, such as sending automated emails or notifications, about the insights that your data provides. |
| **Visualize data** | Present your data as rich visualizations and insights that can be shared with others. |

## Items

### Item types

## Connectors

[NOTE: Add note or important bubble to inform that connectors don't do any acutual data connections - they are graphic representations of the flow of tasks only.]

[NOTE: Add tip: arrange the tasks on the canvas they way you want them to appear before connecting them. Connected tasks maintain their arrangement when you add new tasks to the canvas. Unconnected tasks get rearranged vertically every time you add a new task.]


To illustrate the flow of work, you can connect the tasks. To connect two tasks, select the edge of the starting task and drag to an edge of the next task.

:::image type="content" source="./media/task-flow-concepts/connecting-two-tasks-select-drag.png" alt-text="Screenshot showing how to create a connector via select and drag.":::

The connector appears between the two tasks.

:::image type="content" source="./media/task-flow-concepts/connector-between-two-tasks.png" alt-text="Screenshot showing a connector between two tasks.":::


To delete a connector or to update its start and end values, select the connector. The **Connector details** side pane allows you to delete the connector or change its start and end values.

:::image type="content" source="./media/task-flow-concepts/connector-details-pane.png" alt-text="Screenshot showing how to delete or edit a connector on the connector details pane.":::

## Related content

* [Task flow overview](./task-flow-overview.md)
* [Set up a task flow](./task-flow-create.md)
* [Manage tasks](./task-flow-work-with.md)
