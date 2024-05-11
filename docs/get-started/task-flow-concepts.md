---
title: Fabric task flow concepts
description: This article describes the main task flow concepts.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: concept-article
ms.date: 05/09/2024
---

# Task flow concepts

This article describes the main concepts of the task flows feature in Microsoft Fabric. It's intended audience is data analytics solutions architects who want to use task flows to help them build a visualization of their project to help data engineers understand and implement the project, and data engineers who want to use task flows to faciliate their work.

## Task flow

A task flow is a collection of connected tasks that represent relationships in a process or collection of processes that complete an end-to-end data solution. A workspace has one task flow. You can either build it from scratch or use one of Fabric's predefined task flows, which you can customize as desired.

## Task

A task is a unit of process in the task flow. A task has recommended item types to help you select the appropriate items when building your solution. Tasks also help you navigate the items in the workspace.

## Task types

 Each task has a task type that classifies the task based on its key capabilities in the data processing flow. Fabric provides seven predefined task types:

| Task type | What you want to do with the task |
|:--------|:----------|
| **General** | Create a customized task for your project needs that you can assign available item types to. |
| **Get data** | Ingest both batch and real-time data into a single location within your Fabric workspace. |
| **Store data** | Organize, query, and store your ingested data in an easily retrievable format. |
| **Prepare data** | Prepare your data for analysis or modeling by addressing issues with the data, such as duplicates, missing values, formatting, etc. |
| **Analyze and train data** | Analyze and use your newly structured data to build and train machine learning models to make decisions and predictions. |
| **Track data** | Take actions, such as sending automated emails or notifications, about the insights that your data provides. |
| **Visualize data** | Present your data as rich visualizations and insights that can be shared with others. |

## Connectors

Connectors are arrows that represent logical connections between the tasks in the task flow. They do not represent the flow of data, and they do not create any actual data connections.

## Related content

* [Task flow overview](./task-flow-overview.md)
* [Set up a task flow](./task-flow-create.md)
* [Manage tasks](./task-flow-work-with.md)
