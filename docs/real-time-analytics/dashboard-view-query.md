---
title: View queries in Real-Time Dashboards
description: Learn how to view queries in Real-Time Dashboards
ms.author: yaschust
author: YaelSchuster
ms.reviewer: gabil
ms.topic: how-to
ms.date: 02/25/2024
---
# View queries in Real-Time Dashboards

[Real-Time Dashboards](dashboard-real-time-create.md) are a collection of tiles that feature a visual representation supported by an underlying [Kusto Query Language (KQL)](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rta&pivots=fabric) query. This article explains how to view and edit the underlying query of a Real-Time Dashboard tile.

You can view the query in either editing or viewing mode. Editing the underlying query of a tile is only possible in editing mode.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* Viewer permissions on a [Real-Time Dashboard](dashboard-real-time-create.md).

## View query

While viewing the dashboard, you can see the underlying query of any tile. This query can then be modified in an existing or new KQL Queryset.

1. Browse to your Real-Time Dashboard.
1. On the tile you want to explore, select the **More menu [...]** > **View query**.
    
    A pane opens with the query and results table.

1. Select **Edit query**.
1. Choose either **Existing Queryset** or **New Queryset**. Proceed to edit the query in the [KQL Queryset](kusto-query-set.md).

    :::image type="content" source="media/dashboard-view-query/view-query-viewing-mode.png" alt-text="Screenshot of the viewing mode of Real-Time Dashboards view query with options to futher edit in KQL Queryset in Real-Time Analytics in Microsoft Fabric.":::

> [!NOTE]
> Any edits made to the query using this flow won't be reflected in the original Real-Time Dashboard.

## Related content

* [Visualize data with Real-Time Dashboards](dashboard-real-time-create.md)
* [Kusto Query Language (KQL)](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rta&pivots=fabric)