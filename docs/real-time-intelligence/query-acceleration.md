---
title: Accelerate queries over OneLake shortcuts (preview)
description: Learn how to use the query acceleration policy over OneLake shortcuts to improve query performance and reduce latency for external delta tables.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 10/15/2024
# Customer intent: Learn how to use the query acceleration policy to accelerate queries over shortcuts and external delta tables.
---
# Accelerate queries over OneLake shortcuts (preview)

OneLake shortcuts are references from an Eventhouse that point to internal Fabric or external sources. This kind of shortcut is later accessed for query in [KQL querysets](create-query-set.md) by using the [`external_table()` function](/kusto/query/external-table-function). Queries run over OneLake shortcuts can be less performant than on data that is ingested directly to Eventhouses due to various factors such as network calls to fetch data from storage, the absence of indexes, and more. Query acceleration allows specifying a policy on top of external delta tables that defines the number of days to cache data for high-performance queries. 

Query acceleration is supported in Eventhouse over delta tables from [OneLake shortcuts](onelake-shortcuts.md), Azure Data Lake Store Gen1, or Azure blob storage external tables.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

This article explains how to use the query acceleration policy to accelerate queries over OneLake shortcuts in the Microsoft Fabric UI. To set this policy using commands, see [query acceleration policy](https://aka.ms/query-acceleration).

> [!NOTE]
> * If you have compliance considerations that require you to store data in a specific region, make sure your Eventhouse capacity is in the same region as your external table or shortcut data.
> 
> * Accelerated external tables add to the storage COGS and to the SSD storage consumption your Eventhouse, similar to regular tables in your KQL database. You can control the amount of data to cache by defining the *Hot* property in the [query acceleration policy](https://aka.ms/query-acceleration). Indexing and ingestion activity also contributes to compute resources use.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* Role of **Admin**, **Contributor**, or **Member** [in the workspace](../get-started/roles-workspaces.md)

## Enable query acceleration on a new shortcut

Query acceleration can be enabled during shortcut creation, or on existing shortcuts. To enable query acceleration on a new shortcut, follow these steps:

[!INCLUDE [one-lake-shortcut](includes/one-lake-shortcut.md)]
5. Toggle the **Accelerate** button to **On**. 

    :::image type="content" source="../media/onelake-shortcuts/onelake-shortcut/create-shortcut.png" alt-text="Screenshot of the New shortcut window showing the data in the LakeHouse. The subfolder titled StrmSC and the Create button are highlighted."  lightbox="../media/onelake-shortcuts/onelake-shortcut/create-shortcut.png":::

6. Select **Create**.

## Enable query acceleration on an existing shortcut

1. Browse to the shortcut you want to accelerate.
1. In the menu bar, select **Manage** > **Data policies**.
1. In the data policy pane, toggle the **Accelerate** button to **On**.

## Set caching period

You can also set the number of days to cached data for high performance queries. The default value is 36500 days. To set this policy using commands, see [query acceleration policy](https://aka.ms/query-acceleration).

1. Browse to the shortcut you want to accelerate.
1. In the menu bar, select **Manage** > **Data policies**.
1. In the data policy pane, enter the number of days for which data will be cached.

:::image type="content" source="media/query-acceleration/data-policy-query-acceleration.png" alt-text="Screenshot of the data policy for query acceleration.":::
