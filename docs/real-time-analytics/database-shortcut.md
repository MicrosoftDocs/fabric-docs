---
title: Create a database shortcut in Real-Time Analytics
description: Learn how to create a database shortcut in Real-Time Analytics in Microsoft Fabric
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 08/30/2023
ms.search.form: product-kusto
---
# Create a database shortcut

[!INCLUDE [preview-note](../includes/preview-note.md)]

A database shortcut in Real-Time Analytics is an embedded reference within a KQL database to a source database in Azure Data Explorer. The behavior exhibited by the database shortcut is similar to that of a [follower database](/azure/data-explorer/follower).

## When is a database shortcut useful?

If you have data in an Azure Data Explorer database and want to use this data in Real-Time Analytics, you can create a database shortcut to expose this data. This feature is also useful to segregate compute resources to protect a production environment from nonproduction use cases. A database shortcut can also be used to associate the costs with the party that runs queries on the data.

## How does a database shortcut work?

The database shortcut is attached in read-only mode, making it possible to view the data and run queries on the data that was ingested into the source Azure Data Explorer database. The database shortcut synchronizes changes in the source database. Because of the synchronization, there's a data lag of a few seconds to a few minutes in data availability. The length of the time lag depends on the overall size of the source database metadata.

The source and database shortcuts use the same storage account to fetch the data. The storage is owned by the source database. The database shortcut views the data without needing to ingest it. Since the database shortcut is a read-only database, the data, tables, and policies in the database can't be modified except for caching policy, principals, and permissions.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An Azure subscription. Create a [free Azure account](https://azure.microsoft.com/free/).
* An Azure Data Explorer cluster and database. [Create a cluster and database](/azure/data-explorer/create-cluster-and-database).

> [!IMPORTANT]
> Both the source Azure Data Explorer database and the database shortcut in Real-Time Analytics must be in the same region.

## Create database shortcut

You can create a database shortcut in Real-Time Analytics from any source database in Azure Data Explorer using an invitation link, or by using a cluster URI and database name. Select the desired tab that corresponds with the way you'd like to create a shortcut.

### [Using an invitation link](#tab/link)

To create a shortcut using an invitation link, you must first [create the link](#create-an-invitation-token). Once created, use the link to open Real-Time Analytics with the **New database shortcut** dialog box, and then follow these steps:

1. Enter a name for your database shortcut.
1. Specify the **Workspace** in which you want to create the database shortcut.
1. Optionally, modify the default [cache policy](/azure/data-explorer/kusto/management/cachepolicy?context=%2Ffabric%2Fcontext%2Fcontext-rta&pivots=fabric).
1. Check that the **Invitation token** is populated with the token you created and verified.

    :::image type="content" source="media/database-shortcut/new-shortcut-with-link.png" alt-text="Screenshot of new database shortcut from link dialog in Real-Time Analytics.":::

1. Select **Create**.

### [Using a cluster URI](#tab/workspace)

To create a shortcut using a cluster URI and database name, follow these steps:

1. Browse to your workspace in Microsoft Fabric.
1. Open the experience switcher on the bottom of the navigation pane and select **Real-Time Analytics**.
1. Select **+ New** > **KQL Database (Preview)**
1. Enter a name for your database shortcut.
1. Select **Type** > **New shortcut database (Follower)**

    :::image type="content" source="media/database-shortcut/new-database.png" alt-text="Screenshot of new database dialog for creating database shortcut in Real-Time Analytics.":::

1. In the **Method** dropdown, select **Cluster URI**.
1. Enter the URI of the source cluster.
1. Specify the source **Database**.
1. Optionally, modify the default [cache policy](/azure/data-explorer/kusto/management/cachepolicy?context=%2Ffabric%2Fcontext%2Fcontext-rta&pivots=fabric).

  :::image type="content" source="media/database-shortcut/new-shortcut-with-uri.png" alt-text="Screenshot of new database shortcut from a cluster U R I dialog in Real-Time Analytics.":::

1. Select **Create**.

Once the shortcut is created, you're taken to the [database details](create-database.md#database-details) view of the new database shortcut.

:::image type="content" source="media/database-shortcut/new-database-shortcut.png" alt-text="Screenshot of resulting database shortcut in Real-Time Analytics." lightbox="media/database-shortcut/new-database-shortcut.png":::

---

## Create an invitation token

You can create an invitation token to create a database shortcut for yourself or for another user.

To create an invitation token, follow these steps:

1. Browse to the [Azure portal](https://ms.portal.azure.com).
1. Browse to the Azure Data Explorer database you wish to use as source.
1. Select Share.

    :::image type="content" source="media/database-shortcut/database-share.png" alt-text="Screenshot of database in the Azure portal and the share button." lightbox="media/database-shortcut/database-share.png":::

1. Enter the recipient email address. This address should be the email address associated with the Fabric user account in which you'll later create the database shortcut. This email address may be your own, or someone else's.
1. Select **Share**.
1. Choose one of the following options:
    * If you used your own email address to create the token and want to create the shortcut immediately, select **Open link**.
    * Otherwise, select **Copy link**. The person who the token was created for can later paste this link into a browser to create the shortcut.

    > [!NOTE]
    > The options open the **New database shortcuts** dialog box and with the **Source cluster URI** and **Database** name autopopulated from the information in the invitation token and is the recommended way to create a shortcut. Optionally, you can select **Copy token** to copy the token to the clipboard and us the token string to manually create a shortcut in your workspace. You can do this by selecting **+ New** > **KQL Database (Preview)**, setting **Type** > **New shortcut database (Follower)**, and then pasting the token into the **Invitation token** box.

    :::image type="content" source="media/database-shortcut/create-token.png" alt-text="Screenshot of Azure portal select the open option to create a database shortcut in Real-Time Analytics." lightbox="media/database-shortcut/create-token.png":::

## Delete database shortcut

1. Within your workspace, find the KQL database shortcut you wish to delete.
1. Select the **More menu [...]** > **Delete**.

    :::image type="content" source="media/database-shortcut/delete-database-shortcut.png" alt-text="Screenshot of deleting item of database shortcut.":::

Your database shortcut has now been deleted. Once a database is deleted, it can't be recovered. You can, however, create a new database shortcut from the same source database.

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Create a KQL database](create-database.md)
