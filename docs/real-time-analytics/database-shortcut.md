---
title: Create a database shortcut
description: Learn how to create a database shortcut to data in another KQL Database or in Azure Data Explorer in Real-Time Analytics.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 03/19/2024
ms.search.form: KQL Database
#Customer intent: To create a database shortcut in Real-Time Analytics.
---
# Create a database shortcut

A database shortcut in Real-Time Analytics is an embedded reference within a KQL database to a source database. The source database can be one of the following:

* A KQL Database in Real-Time Analytics
* An Azure Data Explorer database

The behavior exhibited by the database shortcut is similar to that of a [follower database](/azure/data-explorer/follower).

## When is a database shortcut useful?

If you have data in an Azure Data Explorer database and want to use this data in Real-Time Analytics, you can create a database shortcut to expose this data. This feature is also useful to segregate compute resources to protect a production environment from nonproduction use cases. A database shortcut can also be used to associate the costs with the party that runs queries on the data.

## How does a database shortcut work?

The owner of the source database, the data provider, shares the database with the creator of the shortcut in Real-Time Analytics, the data consumer. The owner and the creator can be the same person.

The database shortcut is attached in read-only mode, making it possible to view and run queries on the data that was ingested into the source Azure Data Explorer database. The database shortcut synchronizes changes in the source database. Because of the synchronization, there's a data lag of a few seconds to a few minutes in data availability. The length of the time lag depends on the overall size of the source database metadata.

The source and database shortcuts use the same storage account to fetch the data. The storage is owned by the source database. The database shortcut views the data without needing to ingest it. Since the database shortcut is a read-only database, the data, tables, and policies in the database can't be modified except for caching policy, principals, and permissions.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A source database. This can be an [Azure Data Explorer database](/azure/data-explorer/create-cluster-and-database) or a [KQL Database](create-database.md).

> [!IMPORTANT]
> Both the source database and the database shortcut in Real-Time Analytics must be in the same region, but can be in different tenants.

## Create database shortcut

A data consumer can create a database shortcut in Real-Time Analytics from any source database in Azure Data Explorer using an invitation link, or by using a cluster URI and database name. The data consumer can control how much data is cached by setting the [cache policy](/azure/data-explorer/kusto/management/cachepolicy?context=%2Ffabric%2Fcontext%2Fcontext-rta&pivots=fabric). The main implications setting the hot cache policy are:

* **Cost**: The cost of cold cache can be dramatically lower than of hot cache.
* **Performance**: Data in hot cache is queried faster, particularly for range queries that scan large amounts of data.

Select the desired tab that corresponds with the way you'd like to create a shortcut. 

### [Use an invitation link](#tab/link)

> [!IMPORTANT]
> This method only works when the source database is in Azure Data Explorer.

#### Create an invitation token

A data consumer who wants to create a database shortcut using invitation tokens must obtain a token from the data provider. A token is a code that lets a data consumer create a shortcut to the source database. You don't need a token if you create a database shortcut using the cluster URI method.

To create an invitation token, the data provider can use the following steps:

1. Browse to the [Azure portal](https://ms.portal.azure.com).
1. Browse to the Azure Data Explorer database you wish to use as source.
1. Select Share.

    :::image type="content" source="media/database-shortcut/database-share.png" alt-text="Screenshot of database in the Azure portal and the share button." lightbox="media/database-shortcut/database-share.png":::

1. Enter the recipient email address. This address should be the email address associated with the Fabric user account in which you later create the database shortcut. This email address may be your own, or someone else's.
1. Select **Share**.
1. Choose one of the following options to create a link for a new shortcut.

    We recommend using a link to create a shortcut as it opens the **New database shortcuts** dialog box and with the **Source cluster URI** and **Database** name autopopulated from the information in the invitation token.

    * If you used your own email address to create the token and want to create the shortcut immediately, select **Open link**.
    * Otherwise, select **Copy link**. The person who the token was created for can later paste this link into a browser to create the shortcut.

    :::image type="content" source="media/database-shortcut/create-token.png" alt-text="Screenshot of Azure portal select the open option to create a database shortcut in Real-Time Analytics." lightbox="media/database-shortcut/create-token.png":::

    > [!NOTE]
    > Optionally, you can choose to manually create the shortcut. To do so, select **Copy token**. Go to your workspace, select **+ New** > **KQL Database**, and then select **Type** > **New shortcut database (Follower)**. Select **Method** > **Invitation token**, in **Invitation token** paste the token, and then select **Create**.

#### Use the invitation token

Use the link to open Real-Time Analytics showing the **New database shortcut** dialog box, and then follow these steps:

1. Enter a name for your database shortcut.
1. Specify the **Workspace** in which you want to create the database shortcut.
1. Optionally, modify the default cache policy.
1. Check that the **Invitation token** is populated with the token you created and verified.

    :::image type="content" source="media/database-shortcut/new-shortcut-with-link.png" alt-text="Screenshot of new database shortcut from link dialog in Real-Time Analytics." lightbox="media/database-shortcut/new-shortcut-with-link.png":::

1. Select **Create**.

### [Use a cluster URI](#tab/workspace)

> [!IMPORTANT]
> This method works with sources both in Azure Data Explorer and in Real-Time Analytics.

To create a shortcut using a cluster URI and database name, make sure you have at least contributor permissions on the source data, and then follow these steps:

1. Browse to your workspace in Microsoft Fabric.
1. Open the experience switcher on the bottom of the navigation pane and select **Real-Time Analytics**.
1. Select **+ New** > **KQL Database**.
1. Enter a name for your database shortcut.
1. Select **Type** > **New shortcut database (Follower)**

    :::image type="content" source="media/database-shortcut/new-database.png" alt-text="Screenshot of new database dialog for creating database shortcut in Real-Time Analytics." lightbox="media/database-shortcut/new-database.png":::

1. Select **Method** > **Cluster URI**.
1. Enter the URI of the source cluster. To find the URI of a KQL Database, see [Copy URI](access-database-copy-uri.md#copy-uri).
1. Specify the source **Database**.
1. Optionally, modify the default cache policy.

    :::image type="content" source="media/database-shortcut/new-shortcut-with-uri.png" alt-text="Screenshot of new database shortcut from a cluster URI dialog in Real-Time Analytics." lightbox="media/database-shortcut/new-shortcut-with-uri.png":::

1. Select **Create**.

---

Once the shortcut is created, you're taken to the [database details](create-database.md#database-details) view of the new database shortcut.

:::image type="content" source="media/database-shortcut/new-database-shortcut.png" alt-text="Screenshot of resulting database shortcut in Real-Time Analytics." lightbox="media/database-shortcut/new-database-shortcut.png":::

## Delete database shortcut

1. Within your workspace, find the KQL database shortcut you wish to delete.
1. Select the **More menu [...]** > **Delete**.

    :::image type="content" source="media/database-shortcut/delete-database-shortcut.png" alt-text="Screenshot of deleting item of database shortcut.":::

Your database shortcut has now been deleted. Once a database is deleted, it can't be recovered. You can, however, create a new database shortcut from the same source database.

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Create a KQL database](create-database.md)
