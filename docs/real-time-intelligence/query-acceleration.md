---
title: Query acceleration over OneLake shortcuts
description: Learn how to use the query acceleration policy over OneLake shortcuts to improve query performance and reduce latency for external delta tables.
ms.reviewer: sharmaanshul
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
# Customer intent: Learn how to use the query acceleration policy to accelerate queries over shortcuts and external delta tables.
---
# Query acceleration over OneLake shortcuts

This article explains how to use the query acceleration policy to accelerate queries over OneLake shortcuts in the Microsoft Fabric UI. To set this policy using commands, see [query acceleration policy](https://aka.ms/query-acceleration). For general information on the query acceleration over OneLake shortcuts, see [Query acceleration over OneLake shortcuts - overview](query-acceleration-overview.md).

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

> [!NOTE]
> If you have compliance considerations that require you to store data in a specific region, make sure your Eventhouse capacity is in the same region as your external table or shortcut data.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* Role of **Admin**, **Contributor**, or **Member** [in the workspace](../fundamentals/roles-workspaces.md)
* The relevant shortcut [OneLake security permissions](../onelake/security/data-access-control-model.md)

## Enable query acceleration on a new shortcut

Query acceleration can be enabled during shortcut creation, or on existing shortcuts. To enable query acceleration on a new shortcut, follow these steps:

[!INCLUDE [one-lake-shortcut](includes/one-lake-shortcut.md)]
5. Toggle the **Accelerate** button to **On**. 

    :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/create-shortcut.png" alt-text="Screenshot of the New shortcut window showing the data in the Lakehouse. The subfolder titled StrmSC and the Create button are highlighted."  lightbox="media/onelake-shortcuts/onelake-shortcut/create-shortcut.png":::

6. Select **Create**.

## Enable query acceleration on an existing shortcut

1. Browse to the shortcut you want to accelerate.
1. In the menu bar, select **Manage** > **Data policies**.
1. In the data policy pane, toggle the **Query acceleration** button to **On**.

## Set caching period

Query acceleration is applied to data within a specific time period, defined as a timespan in days, starting from the `modificationTime` in the [delta log](https://github.com/delta-io/delta/blob/master/PROTOCOL.md#add-file-and-remove-file). 

The default caching period is that of the database in which the OneLake shortcut has been created. To set this policy using commands, see [query acceleration policy](https://aka.ms/query-acceleration). To set the caching period in the UI, follow these steps:

1. Browse to the shortcut you want to accelerate.
1. In the menu bar, select **Manage** > **Data policies**.
1. In the data policy pane, enter the number of days for which data will be cached.

    :::image type="content" source="media/query-acceleration/data-policy-query-acceleration.png" alt-text="Screenshot of the data policy for query acceleration.":::

## Related content

* [Query acceleration over OneLake shortcuts - overview](query-acceleration-overview.md)
* [OneLake shortcuts](onelake-shortcuts.md)
* [Query acceleration policy](https://aka.ms/query-acceleration)
