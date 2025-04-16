---
title: "Manage Fabric materialized view DAG"
description: Learn how to Manage Fabric materialized view DAG.
ms.author: apsinhar
author: apurbasroy
ms.reviewer: nijelsf
ms.topic: tutorial
ms.date: 04/17/2025
---

# Manage Fabric materialized view DAG

Fabric Materialized views are an efficient way to manage and query large datasets by pre computing and storing the results of a query. 
In a fabric environment, managing these views effectively can significantly enhance performance and reduce query times. 
This document delves into the various aspects of managing a Fabric materialized view, including understanding the view DAG (Directed Acyclic Graph), scheduling the DAG runs, 
exploring the history of materialized views, and detailing operational run specifics.

## View DAG
A Directed Acyclic Graph (DAG) is a fundamental structure for managing dependencies and scheduling tasks. In the context of Materialized Views(MV), the DAG represents the sequence of MV that need to be executed to refresh the view once new data is available.
After the creation of materialized view by the user, click on Manage Materialized views and it navigates to the DAG view displaying the Job Graph.


## Job Graph

The Job Graph(the MV flow) is as per the code written by the user in the notebook, after the MV end to end flow is created.
:::image type="content" source="./media/view-dag/job-graph.png" alt-text="Screenshot showing a job graph in DAG." border="true" lightbox="./media/view-dag/job-graph.png":::

To run the DAG, the user has to schedule the DAG as per their requirement and
once the Job Graph is scheduled, navigate to the current run and check the DAG view.

:::image type="content" source="./media/view-dag/dag-view.png" alt-text="Screenshot showing an executed dag view." border="true" lightbox="./media/view-dag/dag-view.png":::

## Understand the DAG view

The DAG for a materialized view ensures that data is processed in the correct order, respecting all dependencies. Each node in the DAG represents a specific operation, such as reading from a source table or performing a transformation. Arrows between nodes signify the dependencies, dictating the execution order. User can click on a particular node to understand the flow right from the source tables and parent nodes to the dependent nodes as well.
The DAG UI also has the following functionalities:
*	Refresh: This button is for a DAG UI refresh just to update the current status of the DAG if there are any changes which have occurred

> [!NOTE]
> This is a DAG UI refresh only and not for data refresh.
> Auto refresh for the DAG UI is done every 2 minutes if there is an ongoing DAG run, provided that user is present in the browser tab.

:::image type="content" source="./media/view-dag/dag-refresh.png" alt-text="Screenshot showing how to refresh a DAG UI." border="true" lightbox="./media/view-dag/dag-refresh.png":::

*	New Materialized view: User can open a notebook to make changes to the Materialized Views as per their requirements.

> [!NOTE]
> These notebooks aren't directly linked to a DAG and are just used to create a Materialized View

:::image type="content" source="./media/view-dag/new-materialized-view.png" alt-text="Screenshot showing a new materialized view." border="true" lightbox="./media/view-dag/new-materialized-view.png":::

*	Schedule: User can schedule a run as per their business requirements as and when they require the Materialized Views to be refreshed when new data is present

:::image type="content" source="./media/view-dag/schedule-button.png" alt-text="Screenshot showing the schedule button." border="true" lightbox="./media/view-dag/schedule-button.png":::

* Toggle View: User can now toggle the view to Portrait or Landscape view depending on the size of the DAG. 
* User also has the option to adjust the DAG UI according to the screen size using the Reset DAG button.

:::image type="content" source="./media/view-dag/switch-layout.png" alt-text="Screenshot showing how to switch DAG view layout." border="true" lightbox="./media/view-dag/switch-layout.png":::


  ## Next steps
  
  * [Microsoft Fabric materialized views tutorial](./tutorial.md)
