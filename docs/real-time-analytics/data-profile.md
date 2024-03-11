---
title: Access the data profile of a table in Real-Time Analytics
description: Learn how to access the data profile of a table in Real-Time Analytics.
ms.reviewer: mibar
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.date: 03/11/2024
---

# Access the data profile of a table

The data profile feature in a KQL queryset allows you to quickly gain insights into the data within your tables. It features a time chart illustrating data distribution according to a specified `datetime` field and presents each column of the table along with essential related statistics. This article explains how to access and understand the data profile of a table.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with editing permissions and data.

## Open the data profile

To open the data profile view for a table, in the **Explorer** pane, right-click the desired table > **Data profile**:

:::image type="content" source="media/data-profile/data-profile-in-menu.png" alt-text="Screenshot of data profile in menu.":::

The data profile for the selected table view opens in a side window.

> [!NOTE]
> The data profile is based on data from the [hot cache](/azure/data-explorer/kusto/management/cache-policy?context=/fabric/context/context-rta&pivots=fabric).

[!INCLUDE [data-profile](~/../kusto-repo/data-explorer/includes/cross-repo/data-profile.md)]

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Use example queries](query-table.md)
* [Customize results in the KQL Queryset results grid](customize-results.md)
