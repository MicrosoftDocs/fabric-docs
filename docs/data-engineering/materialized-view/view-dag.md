---
title: "Manage Fabric materialized lake view lineage"
description: Learn how to Manage Fabric materialized lake view lineage.
ms.author: apsinhar
author: apurbasroy
ms.reviewer: nijelsf
ms.topic: tutorial
ms.date: 04/17/2025
---

# Manage Fabric materialized lake view lineage

Fabric Materialized lake views are an efficient way to manage and query large datasets by pre computing and storing the results of a query. 
In a fabric environment, managing these views effectively can significantly enhance performance and reduce query times. 
This document delves into the various aspects of managing a Fabric materialized lake view, including understanding the view lineage, scheduling the lineage runs, 
exploring the history of materialized lake views, and detailing operational run specifics.

## View lineage
A lineage is a fundamental structure for managing dependencies and scheduling tasks. In the context of Materialized Lake View(MLV), the lineage represents the sequence of MV that need to be executed to refresh the view once new data is available.
After the creation of materialized lake view by the user, click on Manage materialized lake views and it navigates to the lineage view.


## Job Graph

The Job Graph(the MV flow) is as per the code written by the user in the notebook, after the MV end to end flow is created.
:::image type="content" source="./media/view-dag/job-graph.png" alt-text="Screenshot showing a job graph in lineage." border="true" lightbox="./media/view-dag/job-graph.png":::

To run the lineage, the user has to schedule the lineage as per their requirement and
once the Job Graph is scheduled, navigate to the current run and check the lineage view.

:::image type="content" source="./media/view-dag/dag-view.png" alt-text="Screenshot showing an executed lineage view." border="true" lightbox="./media/view-dag/dag-view.png":::

## Understand the lineage view

The lineage for a materialized view ensures that data is processed in the correct order, respecting all dependencies. Each node in the lineage represents a specific operation, such as reading from a source table or performing a transformation. Arrows between nodes signify the dependencies, dictating the execution order. User can click on a particular node to understand the flow right from the source tables and parent nodes to the dependent nodes as well.
The lineage UI also has the following functionalities:
*	Refresh: This button is for a lineage UI refresh just to update the current status of the lineage if there are any changes which have occurred

> [!NOTE]
> This is a lineage UI refresh only and not for data refresh.
> Auto refresh for the lineage UI is done every 2 minutes if there is an ongoing run, provided that user is present in the browser tab.

:::image type="content" source="./media/view-dag/dag-refresh.png" alt-text="Screenshot showing how to refresh a lineage UI." border="true" lightbox="./media/view-dag/dag-refresh.png":::

*	New materialized lake view: User can open a notebook to make changes to the materialized lake views as per their requirements.

> [!NOTE]
> These notebooks aren't directly linked to a lineage UI and are just used to create a materialized lake view.

:::image type="content" source="./media/view-dag/new-materialized-view.png" alt-text="Screenshot showing a new materialized lake view." border="true" lightbox="./media/view-dag/new-materialized-view.png":::

*	Schedule: User can schedule a run as per their business requirements as and when they require the materialized lake views to be refreshed when new data is present.

:::image type="content" source="./media/view-dag/schedule-button.png" alt-text="Screenshot showing the schedule button." border="true" lightbox="./media/view-dag/schedule-button.png":::

* Toggle View: User can now toggle the view to Portrait or Landscape view depending on the size of the lineage. 
* User also has the option to adjust the lineage UI according to the screen size using the Reset lineage button.

:::image type="content" source="./media/view-dag/switch-layout.png" alt-text="Screenshot showing how to switch lineage view layout." border="true" lightbox="./media/view-dag/switch-layout.png":::


  ## Next steps
  
  * [Microsoft Fabric materialized lake view tutorial](./tutorial.md)
