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

A Fabric task flow is a visualization of the logical structure of your work in the workspace. Fabric provides a range of predefined, end-to-end task flows based on industry best practices that are intended to make it easier to get started with your project. In addition, you can customize the task flows to suit your specific needs and requirements. This enables you to create a tailored solution that meets your unique business needs and goals.

With task flows, you can understand how items are connected and work together in your workspace. This makes it easier for you to navigate your workspace, even as it becomes more complex over time. Moreover, you can easily standardize your team's work and keep your design and development work in sync to boost the team's collaboration and efficiency.  

## Terms

* **Task flow**: A task flow is a collection of connected tasks that represent relationships in a process or collection of processes that complete an end-to-end data solution.

* **Task**: A task is a unit of process in the task flow. On a task, it provides task type and item recommendations to help you select the appropriate item and allows you to create and attach items to tasks, as well as to navigate items.

## Task types

Each task has a task type that classifies the task based on its key capabilities in the data process flow. The predefined task types are:

| Task type | Description |
|:--------|:----------|
| **General** | Create tasks customized to your project needs and associate available item types with them. |
| **Get data** | Ingest both batch and real-time data into a single location within your Fabric workspace. |
| **Store data** | Organize, query, and store your ingested data in an easily retrievable format. |
| **Prepare data** | Prepare your data for analysis or modeling by addressing issues with the data, such as duplicates, missing values, formatting, etc. |
| **Analyze and train data** | Analyze and use your newly structured data to build and train machine learning models to make decisions and predictions. |
| **Track data** | Take actions, such as sending automated emails or notifications, on the insights that your data provides. |
| **Visualize data** | Present your data as rich visualizations and insights that can be shared with others. |

* **Get data**: Ingest both batch and real-time data into a single location within your Fabric workspace.
* **Clean and transform data**: Prepare your data for analysis or modeling by addressing issues with the data, such as duplicates, missing values, formatting, etc.
* **Store and query data**: Organize, query, and store your ingested data in an easily retrievable format.
* **Analyze and model data**: Analyze and use your newly structured data to build and train machine learning models to make decisions and predictions.
* **Visualize data**: Present your data as rich visualizations and insights that can be shared with others.
* **Respond to data**: Take actions, such as sending automated emails or notifications, on the insights that your data provides.
* **General**: Create tasks customized to your project needs and associate available item types with them.

## Set up a task flow in a workspace

Open the workspace, you can see the **Task flow (preview)** tab in workspace page, where you can build task flow and manage items. You can also select the **All items and folders** and back to the item list view.  

:::image type="content" source="./media/taskflows-overview/image4.png" alt-text="A screenshot of a computer  Description automatically generated1":::

To build a task flow, you can either select a task flow from one of predesigned task flows or add a task to start building one yourself.  

## Start with predesigned task flows

In the task flow default page, you can see the option of **Select a task flow**

:::image type="content" source="./media/taskflows-overview/image5.png" alt-text="A screenshot of a computer  Description automatically generated2":::

By clicking it, you can open and browse the predesigned task flows provided by Microsoft. It lists eight task flows with descriptions about each task flow and item types used in each task flow, which gives a high level view of the task flows and how it's used.

The layout and content are listed here and discussed in more detail later.

:::image type="content" source="./media/taskflows-overview/image6.png" alt-text="A screenshot of a computer  Description automatically generated3":::

1. Task flow name 
1. Briefly description of the use case of task flow 
1. Total number of tasks in this task flow 
1. More detailed description of the task flow and how it's used
1. Item types that are used in task flow 

You can select one that can best fit your project needs by clicking **Select.** And the selected task flow is applied into the task flow canvas.

:::image type="content" source="./media/taskflows-overview/image7.png" alt-text="A screenshot of a computer  Description automatically generated4":::
:::image type="content" source="{source}" alt-text="{alt-text}":::

The layout of the task flow view is:

1. Canvas: The canvas contains a graph view of tasks and all interactions of task flow.
1. Task flow details pane: detailed information of the task flow, including name, description, total number of tasks and task list.
1. Item list: which includes items that are attached with tasks in this task flow

You can also update the task flow name and description in task flow details pane by clicking **Edit** .

:::image type="content" source="./media/taskflows-overview/image8.png" alt-text="A group of rectangular boxes with text  Description automatically generated5":::

The details section is in editing mode now. You can edit name and description and save the update by clicking **Save** . 

:::image type="content" source="./media/taskflows-overview/image9.png" alt-text="A diagram of a diagram  Description automatically generated with medium confidence6":::

## Start with a custom task flow

If you already have a clear view of your taskflow, or none of the predesigned task flows fit with your needs, you can choose to build a custom task flow by selecting a task type and adding a task directly into a canvas. 

:::image type="content" source="./media/taskflows-overview/image10.png" alt-text="A screenshot of a computer  Description automatically generated7":::

The task is added into the canvas then. And the task flow is initiated in this workspace now.  Select **Edit** to update task flow name and descriptions to help other members in this workspace to understand the task flow and your project.

:::image type="content" source="./media/taskflows-overview/image11.png" alt-text="A white background with a black and white flag  Description automatically generated with medium confidence8":::

You can continue to add other tasks, link tasks and manage tasks on canvas, which will be discussed in more detail later.

## Task management in task flows

When you select a task by clicking on it, you can see the **Task details**. 

:::image type="content" source="./media/taskflows-overview/image12.png" alt-text="A white background with a black and white flag  Description automatically generated with medium confidence9":::

There are five parts in the Task details pane:

1. Task name, identifying a task and providing a clear indication of its intended use
1. This is an overview of task type and the number of items attached to it.
1. Task description, it provides a detailed explanation of the task and its intended use.
1. Task type, by configuring and selecting task type, the specific category of the recommended items are different.
1. Item recommendation: recommended items vary depending on the selected task type.

### Update task details and type

**When adding a task, the system task type and its associated description are assigned as the default name and description** **to the task. You can update the task name and description by clicking** **Edit details.**

:::image type="content" source="./media/taskflows-overview/image13.png" alt-text="A white background with black and white clouds  Description automatically generated with medium confidenceA":::

**The details section is in editing mode now. You can edit name and description and save the update by clicking** **Save .** 

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

By selecting and clicking on a link on the canvas, you can view the **Link details** and update the link or delete the link as needed.

:::image type="content" source="./media/taskflows-overview/image22.png" alt-text="Alttext3":::

### Delete a task

To delete a task, first select it by clicking on it. Then, in the Task Details pane, you can find the **Delete** button to remove the task.

:::image type="content" source="./media/taskflows-overview/image23.png" alt-text="Alttext4":::

## Attach and detach items with a task

Once the task flow is set up, you can attach items to individual tasks for logically structuring and organizing your work. You can choose to create a new item or attach existing items from the many already saved to the workspace. 

### Create an item on a task

To create a new item for a specific task, first select the task by clicking on it. Then, select on the clip icon located on the task, and select **New item** to open the item creation panel for creating a new item.

:::image type="content" source="./media/taskflows-overview/image24.png" alt-text="Alttext15":::

Alternatively, you can select the **Attach item** in the header of the bottom list to select **New item** and open the item creation panel.

:::image type="content" source="./media/taskflows-overview/image25.png" alt-text="Alttext6":::

The recommended items are displayed by default in the creation panel. If the item you need isn't listed, you can select 'All items' in the display option to view the full list of the items. In the creation panel, select the item and create the item. Once the item is created, it's listed in the bottom list of the page. The task also shows that it has one item attached to it.

:::image type="content" source="./media/taskflows-overview/image26.png" alt-text="Alttext7":::

:::image type="content" source="./media/taskflows-overview/image27.png" alt-text="Alttext8":::

### Attach existing items to a task

To attach existing items, you can either select on the clip icon on task or select the **Attach item** in the header of the bottom list, and select **Existing item**. 

:::image type="content" source="./media/taskflows-overview/image28.png" alt-text="A group of rectangular boxes with text  Description automatically generated with medium confidenceH":::

In the dialog box, select one or multiple items at once and select **Select** to attach selected items to the task. 

:::image type="content" source="./media/taskflows-overview/image29.png" alt-text="Alttext9":::

You can see the selected items are attached to the task and listed in the bottom list. 

### Detach items from task

You can detach items from a selected task or detach items from all tasks. 

#### Detach items from a task

To detach item(s) from a task, first select the task you want to remove the item from. Second, select the item(s) in the bottom list. Then, select on **Detach from task** in the list header to detach the item(s) from the task.

:::image type="content" source="./media/taskflows-overview/image30.png" alt-text="AlttextA":::

#### Detach items from all tasks

You can also detach multiple items that are attached to different tasks at once. When no step is selected in the task flow, you can view all the items in the task flow. Select the items and select **Detach from all tasks** button to detach items from tasks. 

:::image type="content" source="./media/taskflows-overview/image31.png" alt-text="AlttextB":::

## Navigate items with task flows

With items attached to the tasks, you can use task flow to quickly understand how items in the workspace work together and get a clear view of your work in the workspace. 

:::image type="content" source="./media/taskflows-overview/image32.png" alt-text="AlttextC":::

Clicking on each task in the task flow, you can only view the items attached to the task. 

:::image type="content" source="./media/taskflows-overview/image33.png" alt-text="AlttextD":::

## Delete a task flow

Deleting the task flow will only delete all the tasks and any associations between the items and the tasks. 

To delete a task flow, first select on a blank area of the canvas to ensure that no tasks are selected. This makes the task flow pane visible. Next, locate the '...' in the top right corner of the pane and select on it. Then select **Delete** **task flow** to delete the task flow.

:::image type="content" source="./media/taskflows-overview/image34.png" alt-text="AlttextE":::

Select **Delete** to delete the task flow from current workspace. 

:::image type="content" source="./media/taskflows-overview/image35.png" alt-text="AlttextF":::

## Private preview limitations

The private preview of external data sharing has certain limitations that you should be aware of.

* Please note that tasks’ positions can't be saved on canvas. Whenever a new task is added, all tasks on the canvas will be reset to their default positions.
* Keyboard interactions aren't supported.
* Dragging link on the canvas isn't supported.
* Creation of Report and Dataflow Gen2 from tasks aren't supported in task flowa.

## Related content
