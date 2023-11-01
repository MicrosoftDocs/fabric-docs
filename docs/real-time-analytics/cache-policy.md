---
title: Caching policy in Real-Time Analytics
description: Learn how to create a caching policy in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 10/22/2023
ms.search.form: product-kusto
---
# Caching policy

[!INCLUDE [preview-note](../includes/preview-note.md)]

The caching policy allows to you to choose which data should be cached and kept in local SSD storage. The availability of data in hot cache increases query performance but also storage costs. In Real-Time Analytics, you can enable a cashing policy on a KQL Database level. After enabling caching, you can set the time span that the data remains in the hot cache.

For more information, see [Cache policy](/azure/data-explorer/kusto/management/cachepolicy?context=/fabric/context/context&pivots=fabric).

In this article, you learn how to set a caching policy on your KQL database.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md)

## Set a caching policy

1. Browse to your KQL database and select  **Manage** > **Data policies**

    :::image type="content" source="media/data-management/data-policies.png" alt-text="Screenshot showing the manage tab in a KQL database." :::

1. Under **Caching**, either select the toggle to set the caching period to **Unlimited**, or enter a time period and select **Done**. By default, your data is cached for 3650 days.

    :::image type="content" source="media/data-management/caching-policy.png" alt-text="Screenshot of data retention policy pane with default value.":::

> [!NOTE]
> The time period you set for the caching policy must be lower than or equal to the data retention time period.

## Related content

* [.alter database policy caching command](/azure/data-explorer/kusto/management/alter-database-cache-policy-command?context=/fabric/context/context)
* [Change the data retention policy](data-retention-policy.md)
* [Enable Python plugin](python-plugin.md)
