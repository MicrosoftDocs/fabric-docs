---
title: Create an event house
description: Learn about how to create an event house for data storage in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 05/23/2024
ms.search.form: Eventhouse
#customer intent: As a user, I want to learn how to create an event house for data storage in Real-Time Analytics so that I can effectively manage my data.
---
# Create an event house

An event house allows you to manage multiple databases at once, sharing capacity and resources to optimize performance and cost. It provides unified monitoring and management across all databases and per database. For more information, see [Event house overview](eventhouse.md).

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

In this article, you learn how to create an event house, add new databases to an event house, and delete an event house.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Enable tenant settings in the admin portal

> [!IMPORTANT]
> This step must be completed by the tenant admin.

1. Browse to the [admin portal](../admin/admin-center.md).

1. In the **Tenant settings** tab, search for *Eventhouse*. For more information, see [About tenant settings](../admin/about-tenant-settings.md).
1. Toggle the button for **Create Eventhouse** to **Enabled**. For more information, see [Tenant settings - Microsoft Fabric](../admin/tenant-settings-index.md).
1. Select **Apply**.

    :::image type="content" source="media/eventhouse/enable-admin-settings.png" alt-text="Screenshot of section of admin settings relating to enabling Eventhouse.":::

## Create an event house

1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select **New** > **Eventhouse**.

    :::image type="content" source="media/eventhouse/new-eventhouse.png" alt-text="Screenshot of creating a new event house item in Real-Time Intelligence.":::

1. Enter a name for the event house. Both an event house and its default child KQL database are created with the same name. The database name, like all items in Fabric, can be renamed at any time.

    > [!NOTE]
    > The event house name can contain alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

1. The [database details](create-database.md#database-details) page opens for the default database in the newly created event house. To view all the databases in this event house or create new databases, select the **Eventhouse** menu item.

    :::image type="content" source="media/eventhouse/choose-eventhouse.png" alt-text="Screenshot of choosing an event house from database details page." lightbox="media/eventhouse/choose-eventhouse.png":::

## Delete an event house

When you delete an event house, both the event house and all its child KQL databases are deleted forever.

1. Browse to the event house item in your workspace.
1. Select **More menu** [**...**] > **Delete**.

    :::image type="content" source="media/eventhouse/delete-eventhouse.png" alt-text="Screenshot of deleting an event house.":::

## Related content

* [Eventhouse overview](eventhouse.md)
* [Manage and monitor an event house](manage-monitor-eventhouse.md)
* [Create a KQL database](create-database.md)
