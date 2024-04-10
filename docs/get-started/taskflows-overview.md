---
title: Fabric task flows overview
description: This article gives an overview of task flows and task flow terminology.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: conceptual
ms.date: 04/05/2024
---

# What is a Fabric task flow?

Fabric task flow is a workspace feature that enables you to build a visualization of the flow of work in the workspace. The task flow helps you understand how items are related and work together in your workspace, and makes it easier for you to navigate your workspace, even as it becomes more complex over time. Moreover, the task flow can help you standardize your team's work and keep your design and development work in sync to boost the team's collaboration and efficiency.

Fabric provides a range of predefined, end-to-end task flows based on industry best practices that are intended to make it easier to get started with your project. In addition, you can customize the task flows to suit your specific needs and requirements. This enables you to create a tailored solution that meets your unique business needs and goals.

## Terms

* **Task flow**: A task flow is a collection of connected tasks that represent relationships in a process or collection of processes that complete an end-to-end data solution. A workspace has one task flow. You can either build it from scratch or use one of Fabric's predefined task flows, which you can customize as desired.

* **Task**: A task is a unit of process in the task flow. A task has recommended item types to help you select the appropriate items when building your solution. Tasks also help you navigate the items in the workspace.

## Task types

Each task has a task type that classifies the task based on its key capabilities in the data process flow. The predefined task types are:

| Task type | What you want to do with the task |
|:--------|:----------|
| **General** | Create a customized task customized to your project needs that you can assign available item types to. |
| **Get data** | Ingest both batch and real-time data into a single location within your Fabric workspace. |
| **Store data** | Organize, query, and store your ingested data in an easily retrievable format. |
| **Prepare data** | Prepare your data for analysis or modeling by addressing issues with the data, such as duplicates, missing values, formatting, etc. |
| **Analyze and train data** | Analyze and use your newly structured data to build and train machine learning models to make decisions and predictions. |
| **Track data** | Take actions, such as sending automated emails or notifications, about the insights that your data provides. |
| **Visualize data** | Present your data as rich visualizations and insights that can be shared with others. |

## Set up a task flow in a workspace

Open the workspace. You'll see that the workspace view is split between the task flow, where you'll build your task flow, and the item list, which shows you the items in the workspace. A moveable separator allows you adjust the size of the views.

The task flow itself is split between the canvas, which will hold the visualization of your work flow, and a side panel that contains information and controls to help you build the task flow. The contents of the side panel changes according to what is selected in the canvas.

When no task flow has been configured, an empty default task flow entitled **Get started with a task flow** is there. To start building a task flow, you can either select a task flow from one of predesigned task flows or add a task to start building one yourself.

The following image shows how the workspace looks before a task flow has been configured and before any items have been created in the workspace. 

:::image type="content" source="./media/taskflows-overview/task-flow-initial-state.png" alt-text="Screenshot showing the initial empty state of a task flow." lightbox="./media/taskflows-overview/task-flow-initial-state.png"::: 

## Start with a predesigned task flow

On the default task flow, choose **Select a task flow**. The side panel lists ten predesigned task flows provided by Microsoft. Each predefined task flow has a a brief description of its use case. When you select a flow, you'll see a more detailed description of the task flow and how it's used, and also the workloads and item types that the task flow requires.

:::image type="content" source="./media/taskflows-overview/task-flow-predesigned-panel.png" alt-text="Screenshot showing the task flow side panel of a predesigned task flow." lightbox="./media/taskflows-overview/task-flow-predesigned-panel.png":::

1. Task flow name.
1. Brief description of the task flow use case.
1. Number of tasks in the task flow.
1. Detailed description of the task flow and how it's used.
1. The workloads that the task flow typically requires.
1. The item types that are typically used in task flow.

Select the task flow that best fits your project needs and then choose **Select**. The selected task flow will be applied to the task flow canvas.

:::image type="content" source="./media/taskflows-overview/task-flow-predefined-task-flow-applied.png" alt-text="Screenshot showing a predefined task flow selected and applied to canvas." lightbox="./media/taskflows-overview/task-flow-predefined-task-flow-applied.png":::

Task flow canvas provides a graphic view of the tasks and all interactions of the task flow. [QUESTION: what do we mean by "all interactions"?]

The **Task flow details** panel shows detailed information about the task flow, including task flow name, description, total number of tasks in the task flow, and a list of those tasks. You can change the task flow name and description in the task flow details pane by selecting **Edit** .

The items list shows all the items and folders in the workspace, including those items that are attached to tasks in the task flow. When you select a task in the task flow, the items list is filtered to show just the items that are attached to the selected task. In the preceding illustration, the items list is empty because no items have been created yet.

Selecting a predefined task flow causes the tasks involved in the task flow and the connections between them to be graphically represented on the canvas. No actual items or data connections are created at this point. The representation is graphical only.

## Start with a custom task flow

If you already have a clear idea of what the structure of your task flow needs to be, or if none of the predesigned task flows fit your needs, you can build a custom task flow by selecting **Add a task** choosing a task type to add a task directly onto the canvas.

:::image type="content" source="./media/taskflows-overview/image10.png" alt-text="A screenshot of a computer  Description automatically generated7":::

The task is added into the canvas, and the task flow is in this workspace begun.  Select **Edit** to update the task flow name and descriptions to help other members of this workspace understand the task flow and your project.

:::image type="content" source="./media/taskflows-overview/image11.png" alt-text="A white background with a black and white flag  Description automatically generated with medium confidence8":::

You can continue to add other tasks to the canvas, as well as manage tasks and link tasks together. These topics are discussed in more detail in the following sections.

## Task management in task flows

When you select a task, you'll see **Task details** pane.

:::image type="content" source="./media/taskflows-overview/image12.png" alt-text="A white background with a black and white flag  Description automatically generated with medium confidence9":::

There are five parts in the Task details pane:

1. Task name. A good task name should identify the task and provides a clear indication of its intended use.
1. Number of items attached to the task.
1. Task description, Provides a detailed explanation of the task and its intended use.
1. Task type, by configuring and selecting task type, the specific category of the recommended items are different.
1. Item recommendation: recommended items vary depending on the selected task type.

### Update task details and type

When adding a task, the system task type and its associated description are assigned as the default name and description to the task. You can update the task name and description by selecting **Edit details**.

:::image type="content" source="./media/taskflows-overview/image13.png" alt-text="A white background with black and white clouds  Description automatically generated with medium confidenceA":::

**The details section is in editing mode now. You can edit name and description and save the update by selecting** **Save .** 

:::image type="content" source="./media/taskflows-overview/image14.png" alt-text="A white background with black and white clouds  Description automatically generated with medium confidenceB":::

To update or reset the task type for an existing task, simply select on the dropdown menu and choose a new type.

:::image type="content" source="./media/taskflows-overview/image15.png" alt-text="A white rectangular object with a black border  Description automatically generated with medium confidenceC":::

### Add tasks

To add more tasks into canvas, you can select **Add** and select a task type in the drop-down list. 

:::image type="content" source="./media/taskflows-overview/image16.png" alt-text="A white rectangular object with a black border  Description automatically generatedD":::

The task of the selected task type is added into the canvas. You can also update the name and description of the task.  

:::image type="content" source="./media/taskflows-overview/image17.png" alt-text="A white background with black and white text  Description automatically generated with medium confidenceE":::

Repeat the previous steps and add more tasks into the canvas.

### Link tasks

Currently, the tasks are arranged vertically and separately on the canvas.

:::image type="content" source="./media/taskflows-overview/image18.png" alt-text="A white background with black and white clouds  Description automatically generated with medium confidenceF":::

To link tasks on the canvas, you can select **Add** and select **Link**.

:::image type="content" source="./media/taskflows-overview/image19.png" alt-text="Alttext1":::

In the new dialog box, choose the **Start task** and **End task** options accordingly, then select on **Add** to create the link.

:::image type="content" source="./media/taskflows-overview/image20.png" alt-text="Alttext2":::

Repeat this step to add links between other tasks.

:::image type="content" source="./media/taskflows-overview/image21.png" alt-text="A screenshot of a computer  Description automatically generatedG":::

By selecting and selecting on a link on the canvas, you can view the **Link details** and update the link or delete the link as needed.

:::image type="content" source="./media/taskflows-overview/image22.png" alt-text="Alttext3":::

### Delete a task

To delete a task, first select it by selecting on it. Then, in the Task Details pane, you can find the **Delete** button to remove the task.

:::image type="content" source="./media/taskflows-overview/image23.png" alt-text="Alttext4":::

## Attach and detach items with a task

Once the task flow is set up, you can attach items to individual tasks for logically structuring and organizing your work. You can choose to create a new item or attach existing items from the many already saved to the workspace. 

### Create an item on a task

To create a new item for a specific task, select **+ New item** on the task.

:::image type="content" source="./media/taskflows-overview/image24.png" alt-text="Alttext15":::

On the **Create an item** pane that opens, the item types recommended for the task are displayed by default. choose one of the recommended item types. If you don't see the item type you want, change the **Display** selector from *Recommended items* to *All items*. Choose the item type you want.


:::image type="content" source="./media/taskflows-overview/image26.png" alt-text="Alttext7":::

Once the item is created, the it will show up in the items list, and the task will show that it has had an item attached to it.

:::image type="content" source="./media/taskflows-overview/image27.png" alt-text="Alttext8":::

### Attach existing items to a task

To attach existing items to a task, select the clip icon on the task. 

:::image type="content" source="./media/taskflows-overview/image28.png" alt-text="A group of rectangular boxes with text  Description automatically generated with medium confidenceH":::

In the **Assign item** dialog box that opens, select one or more items, and then choose **Select** to attach selected items to the task. 

:::image type="content" source="./media/taskflows-overview/image29.png" alt-text="Alttext9":::

The items you selected items are attached to the task and listed in the Items list.

### Detach items from task

You can detach items from a selected task or detach items from all tasks.

> [!NOTE]
> Detaching items from tasks does not remove the items from the workspace.

#### Detach items from a task

To detach item(s) from a task, first select the task you want to remove the item from. Next, in the Item's list, select the item(s) you want to unassign. Finally, on the workspace toolbar, choose **Unassign from task**.

:::image type="content" source="./media/taskflows-overview/image30.png" alt-text="AlttextA":::

#### Detach items from all tasks

You can also detach multiple items that are attached to different tasks at once.

To unassign multiple items from multiple tasks, select **Clear all** at the top of the Item list to clear all filters. All the items in the workspace are now visibile. Hover over the items that you want to unassign from all tasks and select the checkbox. When you've finished making your selections, select **Unassign from all tasks** in the workspace toolbar.

:::image type="content" source="./media/taskflows-overview/image31.png" alt-text="AlttextB":::

[QUESTION: Can an item only be assigned to one task at a time?]

## Navigate items with task flows

With items assigned to the tasks, you can use the task flow to quickly understand how items in the workspace work together and get a clear view of your work in the workspace.

For each item that you see in the items list, you can see the item type as well as what task it is assigned to, if any. 

When you select a task, the items list is filtered to show only the items that are assigned to that task. 

[QUESTION: Can you clarify what you mean by "understand how they work together, and "get a clear view of your work in the workspace. To mean, I understand that selecting a task filters the items to those that are in the task. Can you state more precisely how this helps you understand your work?] 

:::image type="content" source="./media/taskflows-overview/image32.png" alt-text="AlttextC":::

When you select a task, the items list is filtered to show only the items that are assigned to that task. 

:::image type="content" source="./media/taskflows-overview/image33.png" alt-text="AlttextD":::

## Delete a task flow

Deleting the task flow will only delete all the tasks and any associations between the items and the tasks. 

[QWESTION: What do you mean by "associations between the items and the tasks? Do you mean assignments?]

To delete a task flow, first select on a blank area of the canvas to display the task flow pane. Next, select the trash icon to delete the task flow.

:::image type="content" source="./media/taskflows-overview/image34.png" alt-text="AlttextE":::

Select **Delete** to delete the task flow from current workspace. 

:::image type="content" source="./media/taskflows-overview/image35.png" alt-text="AlttextF":::

## Private preview limitations

The private preview of external data sharing has certain limitations that you should be aware of.

* Please note that tasks’ positions can't be saved on canvas. Whenever a new task is added, all tasks on the canvas will be reset to their default positions.
* Keyboard interactions aren't supported.
* Dragging link on the canvas isn't supported.
* Creation of Report and Dataflow Gen2 from tasks aren't supported in task flows.

## Related content
