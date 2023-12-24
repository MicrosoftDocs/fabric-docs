---
title: Create an Eventhouse (Preview)
description: Learn about how to create an Eventhouse for data storage in Real-Time Analytics.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 12/24/2023
ms.search.form: Eventhouse
---
# Create an Eventhouse (Preview)

An Eventhouse allows you to manage multiple databases at once, and to consolidate small databases into a larger unit for billing purposes. For more information, see [Eventhouse overview (Preview)](eventhouse.md)

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

In this article, you learn how to create an Eventhouse, add new databases to an Eventhouse, and delete an Eventhouse.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Create an Eventhouse

1. Select **New** > **Eventhouse**.

    :::image type="content" source="media/eventhouse/new-eventhouse.png" alt-text="Screenshot of creating new Eventhouse item in Real-Time Analytics.":::

1. Enter a name Eventhouse. Both an Eventhouse and its child KQL database are created with the same name.

    > [!NOTE]
    > The Eventhouse name can contain alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

    :::image type="content" source="media/eventhouse/create-eventhouse.png" alt-text="Screenshot of creating Eventhouse by entering name in Real-Time Analytics.":::

1. The [database details](create-database.md#database-details) page opens for the default database in the newly created Eventhouse. To view all the databases in this Eventhouse or create new databases, select the **Eventhouse** menu item.

    :::image type="content" source="media/eventhouse/choose-eventhouse.png" alt-text="Screenshot of choosing Eventhouse from database details page":::

## Add a KQL database in the Eventhouse

1. To create a new KQL database in the existing Eventhouse, select **+ New**.

    :::image type="content" source="media/eventhouse/databases-in-eventhouse.png" alt-text="Screenshot showing the databases summary in Eventhouse.":::

1. Choose the database type - default, or [database shortcut](database-shortcut.md).
1. Enter a database name, and select **Create**.

## Delete an Eventhouse

When you delete an Eventhouse, both the Eventhouse and all its child KQL databases are deleted forever.

1. Browse to the Eventhouse item in your workspace.
1. Select **More menu** [**...**] > **Delete**.

    :::image type="content" source="media/eventhouse/delete-eventhouse.png" alt-text="Screenshot of deleting Eventhouse.":::

## Related content

* [Eventhouse overview (Preview)](eventhouse.md)
* [Create a KQL database](create-database.md)