---
title: "Manage Fabric Materialized Lake Views Lineage"
description: Learn how to view and manage materialized lake views lineage in Microsoft Fabric, including the lineage interface and custom Spark environments.
ms.reviewer: sairamyeturi
ms.topic: how-to
ms.date: 03/18/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to manage Fabric materialized lake views lineage in Microsoft Fabric so that I can efficiently handle large datasets and optimize query performance.
---

# Manage Fabric materialized lake views lineage

Fabric materialized lake views (MLVs) help you manage and query large datasets by precomputing and storing query results. In Fabric, lineage helps you understand dependencies and refresh flow so you can operate MLVs more reliably.

This article explains how to view lineage, understand the lineage interface, and work with custom environments.

## View lineage

A materialized lake views lineage shows dependency order for refresh operations. For MLVs, lineage represents the sequence of views that must run when new data is available.

After you create the MLV in Microsoft Fabric, select **Manage materialized lake views** to navigate to the MLV lineage.

## Materialized lake views lineage

Notebook code defines the lineage (MLV flow), and Fabric creates it when you create the end-to-end MLV flow.

> [!Important]
> The lineage view treats all shortcuts as source entities.
> The lineage view treats all tables or materialized lake views in a shortcut schema as source entities.

:::image type="content" source="./media/view-lineage/job-graph.png" alt-text="Screenshot showing a job graph in lineage." border="true" lightbox="./media/view-lineage/job-graph.png":::

To run lineage, schedule it based on your refresh requirements. After the job graph is scheduled, go to the current run to view lineage execution.

:::image type="content" source="./media/view-lineage/lineage-view.png" alt-text="Screenshot showing an executed lineage view." border="true" lightbox="./media/view-lineage/lineage-view.png":::

## Understand the lineage view

In the materialized lake views lineage view, the system processes data in dependency order. Each node represents an operation (for example, reading from a source table or running a transformation). Arrows show dependencies and execution order.

Select a node to inspect upstream and downstream relationships.

The lineage page includes these actions:

- **Refresh**: Refreshes the lineage view to reflect recent status changes.

  > [!NOTE]
  > This action refreshes only the lineage view. It doesn't refresh data.
  > The lineage view auto-refreshes every 2 minutes when a run is in progress and the browser tab is active.

  :::image type="content" source="./media/view-lineage/view-refresh.png" alt-text="Screenshot showing how to refresh a lineage UI." border="true" lightbox="./media/view-lineage/view-refresh.png":::

- **New materialized lake view**: Opens a notebook where you can create or modify MLVs.

  > [!NOTE]
  > These notebooks aren't directly linked to the lineage view.

  :::image type="content" source="./media/view-lineage/new-materialized-view.png" alt-text="Screenshot showing a new materialized lake view." border="true" lightbox="./media/view-lineage/new-materialized-view.png":::

- **Schedule**: Schedules refresh runs based on your business requirements.

  :::image type="content" source="./media/view-lineage/schedule-button.png" alt-text="Screenshot showing the schedule button." border="true" lightbox="./media/view-lineage/schedule-button.png":::

- **Reset lineage**: Resets lineage layout for your current screen size.

  :::image type="content" source="./media/view-lineage/switch-layout.png" alt-text="Screenshot showing how to switch lineage view layout." border="true" lightbox="./media/view-lineage/switch-layout.png":::

## Use custom environment

You can attach a custom Spark environment to materialized lake views lineage to optimize performance and resource usage during refresh.

By default, lineage uses the workspace environment. You can select a different environment to match workload-specific compute settings. Changes to environment selection apply on the next refresh.

### Access requirements

You can select only environments that you can access.

If you don't have access to the selected environment:

- You might not see the environment name or workspace-specific environment details.
- You can't use the **Schedule** and **Run** actions.

### Deleted environment behavior

If the Spark environment associated with materialized lake views lineage is deleted, the environment dropdown shows an error and prompts you to select an accessible environment.

## Related content

- [Microsoft Fabric materialized lake views overview](overview-materialized-lake-view.md)
- [Microsoft Fabric materialized lake view tutorial](tutorial.md)

