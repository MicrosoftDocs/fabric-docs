---
title: "Manage Fabric materialized lake views lineage"
description: Learn how to Manage Fabric materialized lake views lineage.
ms.author: apsinhar
author: apurbasroy
ms.reviewer: nijelsf
ms.topic: how-to
ms.date: 06/06/2025
# customer intent: As a data engineer, I want to manage Fabric materialized lake views lineage in Microsoft Fabric so that I can efficiently handle large datasets and optimize query performance.
---

# Manage Fabric materialized lake views lineage

Fabric materialized lake views (MLV) are an efficient way to manage and query large datasets by pre computing and storing the results of a query. In a fabric environment, managing these views effectively can significantly enhance performance and reduce query times.

This document delves into the various aspects of managing a Fabric materialized lake views, including understanding the lineage, scheduling the MLV runs, exploring the history of materialized lake views, and detailing operational run specifics.

## View lineage

A lineage is a fundamental structure for managing dependencies and scheduling tasks. In the context of materialized lake views (MLV), the lineage represents the sequence of MLV that needs to be executed to refresh the MLV once new data is available.

After you creates materialized lake view, select **Manage materialized lake views** to navigate to the MLV lineage.

## Materialized lake views Lineage

The lineage or the materialized lake view flow is defined per the code written by the user in the notebook. It's created after the MLV end to end flow is created.

:::image type="content" source="./media/view-lineage/job-graph.png" alt-text="Screenshot showing a job graph in lineage." border="true" lightbox="./media/view-lineage/job-graph.png":::

To run the lineage, schedule the lineage as per your requirement. Once the job Graph is scheduled, navigate to the current run and check the lineage view.

:::image type="content" source="./media/view-lineage/lineage-view.png" alt-text="Screenshot showing an executed lineage view." border="true" lightbox="./media/view-lineage/lineage-view.png":::

## Understand the lineage view

The lineage for a materialized view ensures that data is processed in the correct order, respecting all the dependencies. Each node in the lineage represents a specific operation, such as reading from a source table or performing a transformation. Arrows between nodes signify the dependencies, dictating the execution order. You can select a particular node to understand the flow right from the source tables and parent nodes to the dependent nodes as well.

The lineage UI also has the following functionalities:

* **Refresh:** This option lets you refresh the lineage UI to reflect any recent changes in status.

  > [!NOTE]
  > * This is a lineage UI refresh only and not a data refresh.
  > * Lineage UI is auto refreshed for every 2 minutes when there's an ongoing run or if the user's browser tab is active.

  :::image type="content" source="./media/view-lineage/view-refresh.png" alt-text="Screenshot showing how to refresh a lineage UI." border="true" lightbox="./media/view-lineage/view-refresh.png":::

* **New materialized lake view:** You can open a notebook to make changes to the materialized lake views as per their requirements.

  > [!NOTE]
  > These notebooks aren't directly linked to a lineage UI and are used to create a materialized lake view.

  :::image type="content" source="./media/view-lineage/new-materialized-view.png" alt-text="Screenshot showing a new materialized lake views." border="true" lightbox="./media/view-lineage/new-materialized-view.png":::

* **Schedule:** You can schedule a run as per your business requirements and refresh the materialized lake views when new data is present.

:::image type="content" source="./media/view-lineage/schedule-button.png" alt-text="Screenshot showing the schedule button." border="true" lightbox="./media/view-lineage/schedule-button.png":::

* **Toggle View:** You can now toggle the view to *Portrait or Landscape* view depending on the size of the lineage.

* **Reset lineage** You can adjust the lineage UI according to the screen size using this option.

  :::image type="content" source="./media/view-lineage/switch-layout.png" alt-text="Screenshot showing how to switch lineage view layout." border="true" lightbox="./media/view-lineage/switch-layout.png":::

## Related articles

* [Microsoft Fabric materialized lake views overview](overview-materialized-lake-view.md)
* [Microsoft Fabric materialized lake view tutorial](tutorial.md)
