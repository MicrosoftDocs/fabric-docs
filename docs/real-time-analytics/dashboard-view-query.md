---
title: View queries in Real-Time Dashboards
description: Learn how to view queries in Real-Time Dashboards
ms.author: yaschust
author: YaelSchuster
ms.reviewer: gabil
ms.topic: how-to
ms.date: 02/21/2023
---
# View queries in Real-Time Dashboards

[Real-Time Dashboards](dashboard-real-time.md) are a collection of tiles that feature a visual representation supported by an underlying [Kusto Query Language (KQL)](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rta&pivots=fabric) query. This article explains how to view and edit the underlying query of a Real-Time Dashboard tile.

The way you view or edit the query of a tile depends on the permissions you have and the mode you've entered on the dashboard. Choose the tab below that corresponds to viewing or editing the dashboard.

Toggle between modes using the **Viewing** and **Editing** buttons in the top menu.

:::image type="content" source="media/dashboard-view-query/editing-viewing-modes.png" alt-text="Screenshot of Real-Time Dashboard showing how to toggle between editing and viewing modes in Real-Time Analytics in Microsoft Fabric.":::

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* Viewer or editor permissions on a [Real-Time Dashboard](dashboard-real-time.md). To enter the editing mode, you must have editor permissions.

### [Viewing mode](#tab/viewing)

While viewing the dashboard, you can see the underlying query of any tile. This query can then be modified in an existing or new KQL Queryset.

1. Browse to your Real-Time Dashboard.
1. On the tile you want to explore, select the **More menu [...]** > **View query**.
    
    A pane opens with the query and results table.

1. Select **Edit query**.
1. Choose either **Existing Queryset** or **New Queryset**. Proceed to edit the query in the [KQL Queryset](kusto-query-set.md).

    :::image type="content" source="media/dashboard-view-query/view-query-viewing-mode.png" alt-text="Screenshot of the viewing mode of Real-Time Dashboards view query with options to futher edit in KQL Queryset in Real-Time Analytics in Microsoft Fabric.":::

> [!NOTE]
> Any edits made to the query using this flow won't be reflected in the original Real-Time Dashboard.

### [Editing mode](#tab/editing)

While in editing mode, you can view and make changes to the underlying query.

1. Select the pencil icon of the tile you want to explore.

    :::image type="content" source="media/dashboard-view-query/edit-query.png" alt-text="Screenshot of Real-Time Dashboard tile with edit pencil icon highlighted in red box in Real-Time Analytics in Microsoft Fabric.":::

1. Edit and modify the query as needed.

    :::image type="content" source="media/dashboard-view-query/edit-query-tile.png" alt-text="Screenshot of editing a query tile in Real-Time Dashboards in Real-Time Analytics in Microsoft Fabric.":::

1. Select **Apply changes** to save your changes.

---

## Related content

* [Visualize data with Real-Time Dashboards](dashboard-real-time.md)
* [Kusto Query Language (KQL)](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rta&pivots=fabric)