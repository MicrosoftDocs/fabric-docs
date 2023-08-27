---
title: Create a database shortcut in Real-Time Analytics
description: Learn how to create a database shortcut in Real-Time Analytics in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 08/27/2023
ms.search.form: product-kusto
---
# Create a database shortcut

[!INCLUDE [preview-note](../includes/preview-note.md)]

A database shortcut in Real-Time Analytics is an embedded reference within a KQL database to a database in Azure Data Explorer. The behavior exhibited by the database shortcut is similar to that of a [follower database](/azure/data-explorer/follower). 

## When is the database shortcut useful?

If you have data in an Azure Data Explorer database and want to use this data in Real-Time Analytics, you can create a database shortcut to expose this data. This feature is also useful to segregate compute resources to protect a production environment from non-production use cases. A database shortcut can also be used to associate the costs with the party that runs queries on the data.

## How does the database shortcut work?

The database shortcut is attached in read-only mode, making it possible to view the data and run queries on the data that was ingested into the leader Azure Data Explorer database. The database shortcut synchronizes changes in the leader database. Because of the synchronization, there's a data lag of a few seconds to a few minutes in data availability. The length of the time lag depends on the overall size of the leader database metadata. 

The leader and database shortcuts use the same storage account to fetch the data. The storage is owned by the leader database. The database shortcut views the data without needing to ingest it. Since the attached database is a read-only database, the data, tables, and policies in the database can't be modified except for caching policy, principals, and permissions. Attached databases can't be deleted. They must be detached by the leader or follower and only then they can be deleted.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An Azure subscription. Create a [free Azure account](https://azure.microsoft.com/free/).
* An Azure Data Explorer cluster and database. [Create a cluster and database](/azure/data-explorer/create-cluster-and-database).

> [!IMPORTANT]
> Both the leader Azure Data Explorer database and the database shortcut in Real-Time Analytics must be in the same region.

## Create token

1. Browse to the [Azure portal](https://ms.portal.azure.com).
1. Browse to the Azure Data Explorer database you wish to use as leader.
1. Select Share.
    
    :::image type="content" source="media/database-shortcut/database-share.png" alt-text="Screnshot of database in the Azure portal and the share button.":::

1. Enter the recipient email address. This should be the email address associated with the Fabric user account in which you'll later create the database shortcut. This email address may be your own, or someone else's.
1. Select **Share**.
1. Select **Copy token** to copy the sharing token. Save this string for use in a later step.

    :::image type="content" source="media/database-shortcut/copy-token.png" alt-text="Screenshot of Azure portal copying of token to create database shortcut in Real-Time Analytics.":::

## Create database shortcut

1. Browse to your workspace in Microsoft Fabric.
1. Open the experience switcher on the bottom of the navigation pane and select **Real-Time Analytics**.
1. Select **+ New** > **KQL Database (Preview)**
1. Enter a name for your database shortcut. 
1. Select **Type** > **New shortcut database (Follower)**

    :::image type="content" source="media/database-shortcut/new-database.png" alt-text="Screenshot of new database dialog for creating database shortcut in Real-Time Analytics.":::

1. In the **Method** dropdown, select **Invitation token**.
1. Paste the invitation token that was copied above.
    
    :::image type="content" source="media/database-shortcut/new-shortcut-window.png" alt-text="Screenshot of new database shortcut window in Real-Time Analytics.":::

1. The **Source cluster URI** and **Database** name will auto-populate from the information in the invitation token.
1. Select **Create**.
 
    :::image type="content" source="media/database-shortcut/new-database-shortcut.png" alt-text="Screenshot of resulting database shortcut in Real-Time Analytics.":::

The new shortcut database is created. You can view the [Database details](create-database.md#database-details) of the new database shortcut.

## Remove database shortcut

## Related content
