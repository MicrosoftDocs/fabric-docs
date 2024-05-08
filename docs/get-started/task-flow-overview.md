---
title: Fabric task flow overview
description: This article gives an overview of task flows and task flow terminology.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: concept-article
ms.date: 05/07/2024
---
# What is a Fabric task flow?

This article is an overview of the task flows feature in Microsoft Fabric. It's target audience is data analytics solution architects who want to use a task flow to build a visual representation of their project, and engineers who are working on such a project and want to know how to use the task flow to facilitate their work.

Task flows is a workspace feature makes it possible to build a visual representation of the flow of work in the workspace, and provides functionality that helps engineering teams carry out that work. The task flow helps you understand how the various items in a workspace are related and work together, and makes it easier for you to navigate the workspace, even as it becomes more complex over time.

Fabric provides a set of predefined, end-to-end task flows based on industry best practices that are intended to make it easier to get started with your project. You can customize these predefined task flow to suit your specific needs and requirements. You can also build a task flow scratch, enabling you to create a tailored solution that meets your unique business needs and goals.

## Considerations and limitations

* While the positioning of tasks in the task flow is persistent, due to a know issue, when a new task is added to the canvas all tasks that are not connected to another task will return to their default position. For this reason, whenever possible, it is recommended to connect all tasks before adding a new task.
* Keyboard interactions aren't supported.
* Dragging link on the canvas isn't supported.
* Creation of Report and Dataflow Gen2 from tasks aren't supported in task flows.

## Related content

* [Task flow concepts](./task-flow-concepts.md)
* [Set up a task flow](./task-flow-create.md)
* [Manage tasks](./task-flow-work-with.md)
