---
title: Manage data in Graph in Microsoft Fabric
description: Learn how to refresh graph data manually and configure a scheduled refresh in Microsoft Fabric.
ms.topic: how-to
ms.date: 02/18/2026
ms.reviewer: wangwilliam
---

# Manage data in Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This article shows you how to save your graph model, refresh graph data, and configure scheduled refresh in Microsoft Fabric.

## Save your graph model

When you select **Save** in the graph model editor, Graph performs two operations:

1. **Persists your graph model** – Saves the current configuration, including node types, edge types, and column mappings.
1. **Triggers data ingestion** – Ingests data from the underlying lakehouse tables and constructs the queryable graph based on the updated model.

Because save and ingestion are a single operation, every save refreshes your graph data. Save your model whenever you add or modify node types, edge types, or mappings.

## Refresh graph data manually

If the data in your underlying lakehouse changes but your graph model stays the same, you can manually pull in the latest data by selecting **Save** in the graph model editor. Even when the model configuration hasn't changed, the save operation re-ingests data from OneLake and rebuilds the queryable graph.

## Configure scheduled refresh

If your underlying lakehouse receives updated data regularly, you can configure scheduled refreshes so the graph automatically stays in sync without manual intervention.

To configure scheduled refresh in a shared workspace:

1. In [Microsoft Fabric](https://fabric.microsoft.com/), select **Workspaces** in the navigation pane.
1. Select the workspace that contains your graph.
1. Locate your graph item in the workspace content list.
1. Select the **...** (More options) menu that appears next to the graph item when you hover over it.
1. Select **Schedule**.

   :::image type="content" source="./media/how-to/schedule-option.png" alt-text="Screenshot showing how to access the schedule option for a graph." lightbox="./media/how-to/schedule-option.png":::

1. Select **Add schedule** in the **Schedules** menu.
1. Configure the refresh frequency to match how often your lakehouse data updates (for example, every *n* hours).
1. Select **Save** to save the schedule.

You can schedule refreshes to run by the minute, hourly, daily, weekly, or monthly. The following image shows an example of a refresh schedule configured to run hourly:

:::image type="content" source="./media/how-to/scheduled-refresh.png" alt-text="Screenshot showing a configured scheduled refresh for a graph." lightbox="./media/how-to/scheduled-refresh.png":::

To edit or delete a scheduled refresh, select the **Edit** option in the **Schedules** menu.

> [!NOTE]
> Scheduled refresh is available for graphs in shared workspaces. The schedule option isn't available in **My Workspace**.

## Related content

- [Graph overview](overview.md)
- [Monitor graph status](monitoring-overview.md)
- [Troubleshooting and FAQ](troubleshooting-and-faq.md)
