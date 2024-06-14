---
title: Task flows overview (preview)
description: This article gives an overview of task flows and task flow terminology.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: concept-article
ms.date: 06/06/2024

#customer intent: As a data analytics solutions architect, or as a data engineer, I want to learn about task flows and how they can help facilitate the completion of a complex data analytics solution. 

---
# Task flows in Microsoft Fabric (preview)

This article describes the task flows feature in Microsoft Fabric. Its target audience is data analytics solution architects who want to use a task flow to build a visual representation of their project, engineers who are working on the project and want to use the task flow to facilitate their work, and others who want to use the task flow to filter the item list to help navigate and understand the workspace.

## Overview

Fabric task flow is a workspace feature that enables you to build a visualization of the flow of work in the workspace. The task flow helps you understand how items are related and work together in your workspace, and makes it easier for you to navigate your workspace, even as it becomes more complex over time. Moreover, the task flow can help you standardize your team's work and keep your design and development work in sync to boost the team's collaboration and efficiency.

:::image type="content" source="./media/task-flow-overview/task-flow-overview.png" alt-text="Screenshot showing a task flow in Microsoft Fabric." lightbox="./media/task-flow-overview/task-flow-overview.png":::

Fabric provides a range of predefined, end-to-end task flows based on industry best practices that are intended to make it easier to get started with your project. In addition, you can customize the task flows to suit your specific needs and requirements. This enables you to create a tailored solution that meets your unique business needs and goals.

Each workspace has one task flow. The task flow occupies the upper part of workspace list view. It consists of a canvas where you can build the visualization of your data analytics project, and a side pane where you can see and edit details about the task flow, tasks, and connectors.

> [!NOTE]
> You can [resize or hide the task flow](./task-flow-work-with.md#resize-or-hide-the-taskflow) using the controls on the horizontal separator bar.

## Key concepts

Key concepts to know when working with a task flow are described in the following sections.

### Task flow

A task flow is a collection of connected tasks that represent relationships in a process or collection of processes that complete an end-to-end data solution. A workspace has one task flow. You can either build it from scratch or use one of Fabric's predefined task flows, which you can customize as desired.


### Task

A task is a unit of process in the task flow. A task has recommended item types to help you select the appropriate items when building your solution. Tasks also help you navigate the items in the workspace.

### Task type

Each task has a task type that classifies the task based on its key capabilities in the data process flow. The predefined task types are:

| Task type | What you want to do with the task |
|:--------|:----------|
| **General** | Create a customized task for your project needs that you can assign available item types to. |
| **Get data** | Ingest both batch and real-time data into a single location within your Fabric workspace. |
| **Store data** | Organize, query, and store your ingested data in an easily retrievable format. |
| **Prepare data** | Clean, transform, extract, and load your data for analysis and modeling tasks. |
| **Analyze and train data** | Propose hypotheses, train models, and explore your data to make decisions and predictions. |
| **Track data** | Monitor your streaming or nearly real-time operational data, and make decisions based on gained insights. |
| **Visualize data** | Present your data as rich visualizations and insights that can be shared with others. |

### Connector

Connectors are arrows that represent logical connections between the tasks in the task flow. They don't represent the flow of data, nor do they create any actual data connections.

:::image type="content" source="./media/task-flow-overview/task-flow-connector.png" alt-text="Screenshot showing connectors in a task flow." lightbox="./media/task-flow-overview/task-flow-connector.png":::

## Considerations and limitations

* The positioning of tasks on the task flow canvas is persistent. However, due to a known issue, when a new task is added to the canvas, all tasks that aren't connected to another task will return to their default position. Therefore, whenever possible, it's recommended to connect all tasks before adding a new task.
* Creating paginated reports, dataflows Gen1, and semantic models from a task isn't supported.
* Creating reports from a task is supported only if a published semantic model is picked. 

## Related content

* [Set up a task flow](./task-flow-create.md)
* [Work with task flows](./task-flow-work-with.md)
