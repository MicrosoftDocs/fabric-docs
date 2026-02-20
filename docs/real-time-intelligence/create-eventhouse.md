---
title: Create an eventhouse
description: Learn about how to create an eventhouse for data storage in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.topic: how-to
ms.date: 12/11/2025
ms.subservice: rti-eventhouse
ms.search.form: Eventhouse
#customer intent: As a user, I want to learn how to create an eventhouse for data storage in Real-Time Intelligence so that I can effectively manage my data.
---
# Create an eventhouse

An eventhouse allows you to manage multiple databases at once, sharing capacity and resources to optimize performance and cost. It provides unified monitoring and management across all databases and per database. For more information, see [Eventhouse overview](eventhouse.md).

In this article, you learn how to create an eventhouse, add new databases to an eventhouse, rename, and delete an eventhouse.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Create an eventhouse

1. In the [Fabric portal](https://app.fabric.microsoft.com), switch to the Fabric experience if needed, and then select **My workspace**.

    :::image type="content" source="media/eventhouse/fabric-experience.png" alt-text="Screenshot showing the Fabric experience in Real-Time Intelligence." lightbox="media/eventhouse/fabric-experience.png":::
1. In the pop-up pane, select **My workspace**. 

    :::image type="content" source="media/eventhouse/select-workspace.png" alt-text="Screenshot showing the selection of a workspace." lightbox="media/eventhouse/select-workspace.png":::    
1. On your workspace page, select **New item**. 

    :::image type="content" source="media/eventhouse/select-new-item.png" alt-text="Screenshot showing the Select new item menu." lightbox="media/eventhouse/select-new-item.png":::    
1. In the **New item** pane, search for **Eventhouse**, and then select the **Eventhouse** item.

    :::image type="content" source="media/eventhouse/new-eventhouse.png" alt-text="Screenshot of creating a new eventhouse item in Real-Time Intelligence." lightbox="media/eventhouse/new-eventhouse.png":::
1. Enter a name for the eventhouse, and then select **Create**. 

    :::image type="content" source="media/eventhouse/name.png" alt-text="Screenshot of New eventhouse dialog box." lightbox="media/eventhouse/name.png":::    

    Both an eventhouse and its default child Kusto Query Language (KQL) database are created with the same name. The database name, like all items in Fabric, can be renamed at any time.

    > [!NOTE]
    > The eventhouse name can contain alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.
1. The [system overview](manage-monitor-eventhouse.md#view-system-overview) opens in the main view area of the newly created eventhouse.

    :::image type="content" source="media/eventhouse/choose-eventhouse.png" alt-text="Screenshot of system overview in the main view area." lightbox="media/eventhouse/choose-eventhouse.png":::

    > [!NOTE]
    > Sharing the Eventhouse isn't supported. You can share individual databases only.

## Add a new database to an eventhouse

1. From the explorer, in the **KQL Databases** section, select **+**.

   :::image type="content" source="media/eventhouse/add-database.png" alt-text="Screenshot showing the selector to add a new database.":::
1. Enter a database name, and select **Create**.

   :::image type="content" source="media/eventhouse/name-new-database.png" alt-text="Screenshot showing the pop-up box to name your new database.":::
1. The [Database details](manage-monitor-database.md#database-details) page for your new database opens in the main view area.

    :::image type="content" source="media/eventhouse/database-details.png" alt-text="Screenshot of the database details page for your new database." lightbox="media/eventhouse/database-details.png":::

    To learn more about creating KQL databases, see [Create a KQL database](create-database.md).

## Rename an eventhouse

1. Browse to your workspace.
1. Hover the mouse over your eventhouse item, select [**...**] (ellipsis), and then select **Settings**.

    :::image type="content" source="media/eventhouse/settings.png" alt-text="Screenshot of the Settings menu for an eventhouse." lightbox="media/eventhouse/settings.png":::    
1. In the right pane, update the name of the eventhouse.

    :::image type="content" source="media/eventhouse/update-name.png" alt-text="Screenshot of the Settings page with a new name for the eventhouse.":::

## Share an eventhouse

Sharing a direct link to an eventhouse enables users to access the eventhouse and its components, such as KQL databases and embedded querysets, with the same permissions as the sharer. For more information, see [Share an Eventhouse](eventhouse.md#share-an-eventhouse).

1. Browse to the eventhouse item in your workspace.
1. Select **Share** in the top right corner.

    :::image type="content" source="media/eventhouse/share-menu.png" alt-text="Screenshot showing the Share button in the top-right corner." lightbox="media/eventhouse/share-menu.png":::    
1. On the **Create and send link** page, select the first link to set permissions.

    :::image type="content" source="media/eventhouse/share-permissions.png" alt-text="Screenshot showing the Create and send link page.":::        
1. On the **Select permissions** page, specify who can view and what permissions they have:
    1. Select **Share** to allow recipients to share the eventhouse link with others.
    1. Select **Edit** to let recipients add or modify databases and tables.
    1. Select **Apply** to save the permissions and return to the **Create and send link** page.

        :::image type="content" source="media/eventhouse/select-permissions.png" alt-text="Screenshot showing the Select permissions page.":::
1. Enter the name or email address of the person you want to share the eventhouse with.
1. Add a message if desired.
1. Then, select **Send** to share the eventhouse link via email.

    :::image type="content" source="media/eventhouse/send-link.png" alt-text="Screenshot of sending the eventhouse link." lightbox="media/eventhouse/send-link.png":::

You can also choose one of the following options to share the eventhouse link:

- Select **Copy link** to copy the eventhouse link to your clipboard.
- Select **By email** to send an email notification with the shared link. You can also add a message to the email.
- Select **By Teams** to share the eventhouse link via Microsoft Teams. You can also add a message to the Teams notification.

    :::image type="content" source="media/eventhouse/share-eventhouse.png" alt-text="Screenshot of sharing an eventhouse link." lightbox="media/eventhouse/share-eventhouse.png":::

> [!NOTE]
>
> To share a single database, select that database and then use the [share a database link](access-database-copy-uri.md#share-a-kql-database-link) option.

## Delete an eventhouse

When you delete an eventhouse, both the eventhouse and all its child KQL databases are deleted forever.

1. Browse to your workspace.
1. Hover the mouse over your eventhouse item, select [**...**] (ellipsis), and then selected **Delete**.

    :::image type="content" source="media/eventhouse/delete-eventhouse.png" alt-text="Screenshot of deleting an eventhouse.":::

## Related content

* [Eventhouse overview](eventhouse.md)
* [Manage and monitor an eventhouse](manage-monitor-eventhouse.md)
* [Create a KQL database](create-database.md)
