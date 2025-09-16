---
title: Create an eventhouse
description: Learn about how to create an eventhouse for data storage in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 07/29/2025
ms.search.form: Eventhouse
#customer intent: As a user, I want to learn how to create an eventhouse for data storage in Real-Time Intelligence so that I can effectively manage my data.
---
# Create an eventhouse

An eventhouse allows you to manage multiple databases at once, sharing capacity and resources to optimize performance and cost. It provides unified monitoring and management across all databases and per database. For more information, see [Eventhouse overview](eventhouse.md).

In this article, you learn how to create an eventhouse, add new databases to an eventhouse, rename, and delete an eventhouse.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Create an eventhouse

1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select **New** > **Eventhouse**.

    :::image type="content" source="media/eventhouse/new-eventhouse.png" alt-text="Screenshot of creating a new eventhouse item in Real-Time Intelligence." lightbox="media/eventhouse/new-eventhouse.png":::

1. Enter a name for the eventhouse. Both an eventhouse and its default child Kusto Query Language (KQL) database are created with the same name. The database name, like all items in Fabric, can be renamed at any time.

    > [!NOTE]
    > The eventhouse name can contain alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

1. The [system overview](manage-monitor-eventhouse.md#view-system-overview) opens in the main view area of the newly created eventhouse.

    :::image type="content" source="media/eventhouse/choose-eventhouse.png" alt-text="Screenshot of system overview in the main view area." lightbox="media/eventhouse/choose-eventhouse.png":::

    > [!NOTE]
    > Sharing the Eventhouse isn't supported. You can share individual databases only.

## Add a new database to an eventhouse

1. From the explorer, select the **New database** [**+**].

   :::image type="content" source="media/eventhouse/add-database.png" alt-text="Screenshot showing the selector to add a new database.":::

1. Enter a database name, and select **Create**.

   :::image type="content" source="media/eventhouse/name-new-database.png" alt-text="Screenshot showing the pop-up box to name your new database.":::

1. The [Database details](manage-monitor-database.md#database-details) page for your new database opens in the main view area.

    :::image type="content" source="media/eventhouse/database-details.png" alt-text="Screenshot of the database details page for your new database." lightbox="media/eventhouse/database-details.png":::

To learn more about creating KQL databases, see [Create a KQL database](create-database.md).

## Rename an eventhouse

1. Browse to the eventhouse in your workspace.
1. Click on the name of the eventhouse in the top left corner.
1. Enter a new name for the eventhouse.

    :::image type="content" source="media/eventhouse/rename.png" alt-text="Screenshot of renaming an eventhouse.":::

## Share an eventhouse

Sharing a direct link to an eventhouse enables users to access the eventhouse and its components, such as KQL databases and embedded querysets, with the same permissions as the sharer. For more information, see [Share an Eventhouse](eventhouse.md#share-an-eventhouse).

1. Browse to the eventhouse item in your workspace.
1. Select **Share** in the top right corner.
1. Enter the name or email address of the person you want to share the eventhouse with.
1. Set additional permissions, if needed.
    1. Select **Share** to allow recipients to share the eventhouse link with others.
    1. Select **Edit** to let recipients add or modify databases and tables.
1. Select **Notify recipients by email** to send an email notification with the shared link. You can also add a message to the email.
1. Select **Grant** to share the eventhouse link.

    :::image type="content" source="media/eventhouse/share-eventhouse.png" alt-text="Screenshot of sharing an eventhouse link." lightbox="media/eventhouse/share-eventhouse.png":::

> [!NOTE]
>
> To share a single database, select that database and then use the [share a database link](access-database-copy-uri.md#share-a-kql-database-link) option.

## Delete an eventhouse

When you delete an eventhouse, both the eventhouse and all its child KQL databases are deleted forever.

1. Browse to the eventhouse item in your workspace.
1. Select **More menu** [**...**] > **Delete**.

    :::image type="content" source="media/eventhouse/delete-eventhouse.png" alt-text="Screenshot of deleting an eventhouse.":::

## Related content

* [Eventhouse overview](eventhouse.md)
* [Manage and monitor an eventhouse](manage-monitor-eventhouse.md)
* [Create a KQL database](create-database.md)
