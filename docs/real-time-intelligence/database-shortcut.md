---
title: Create a Database Shortcut
description: Create a database shortcut to share all or selected tables, materialized views, and functions from a KQL database or Azure Data Explorer.
ms.reviewer: sharmaanshul
ms.topic: how-to
ms.custom: sfi-image-nochange, msecd-doc-authoring-1030
ms.date: 11/05/2026
ms.search.form: KQL Database
ms.subservice: rti-eventhouse
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to create a database shortcut with selected subitems so that I can share the data consumers need without exposing the entire source database.
---

# Create a database shortcut

A database shortcut in Real-Time Intelligence provides read-only access to data in another KQL database or an Azure Data Explorer database without ingesting the data again. You can include all subitems from the source database or select specific tables, shortcut tables, materialized views, and functions.

In this article, you create a database shortcut and choose which subitems to include. Use table-level sharing when consumers need only part of a source database.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A source [KQL database](create-database.md) or [Azure Data Explorer database](/azure/data-explorer/create-cluster-and-database).
* An [eventhouse](create-eventhouse.md) for the database shortcut.
* The source database and the database shortcut in the same tenant and region. Cross-tenant and cross-region sharing aren't supported.

## When is a database shortcut useful?

If you have data in an Azure Data Explorer database and want to use this data in Real-Time Intelligence, create a database shortcut to expose this data. This feature is also useful to segregate compute resources to protect a production environment from nonproduction use cases. You can also use a database shortcut to associate the costs with the party that runs queries on the data.

By using table-level sharing, you can expose a curated set of subitems to another team without exposing the rest of the source database. Consumers can query and view only the subitems included in the share.

## How does a database shortcut work?

The owner of the source database, the data provider, shares the database with the creator of the shortcut in Real-Time Intelligence, the data consumer. The owner and the creator can be the same person.

The database shortcut connects in read-only mode, so you can view and run queries on the shared data that the source database ingested. Because of synchronization, there's a data lag of a few seconds to a few minutes in data availability. The length of the time lag depends on the overall size of the source database metadata.

The source and database shortcuts use the same storage account to fetch the data. The source database owns the storage. The database shortcut views the data without needing to ingest it. Since the database shortcut is a read-only database, you can't modify the data, tables, and policies in the database except for caching policy, principals, and permissions.

## Create database shortcut

A data consumer can select a source KQL database from the OneLake catalog, enter a cluster URI and database name, or use an invitation link from an Azure Data Explorer data provider. For the OneLake catalog and cluster URI methods, use **Shared entities** to choose all or specific subitems. With an invitation token, the data provider defines the shared subitems.

The data consumer can control how much data is cached by setting the [cache policy](/azure/data-explorer/kusto/management/cachepolicy?context=%2Ffabric%2Fcontext%2Fcontext-rta&pivots=fabric). The main implications of setting the hot cache policy are:

* **Cost**: The cost of cold cache can be dramatically lower than the cost of hot cache.
* **Performance**: Data in hot cache is queried faster, particularly for range queries that scan large amounts of data.

> [!IMPORTANT]
> The database shortcut setup requires a high level of trust between the involved parties, such as the leader database and the database shortcut (follower).
> You can establish the database shortcut even if the leader cluster is behind a virtual network (VNet) or has public access disabled.
> Ensure that you thoroughly review and accept the security posture of this setup.

Select the tab that corresponds with the way you'd like to create a shortcut.

### [Use the OneLake catalog](#tab/onelake-catalog)

Use the OneLake catalog to select a source KQL database in Fabric.

### Create a shortcut with the OneLake catalog

To create a shortcut from a KQL database in the OneLake catalog:

1. Browse to your workspace in Microsoft Fabric.
1. Open a new or existing [eventhouse](create-eventhouse.md).
1. Select the plus sign next to **KQL databases**.
1. Enter a name for your database shortcut.
1. Select **Type** > **New shortcut database (Follower)**, and then select **Next**.
1. Select **Method** > **OneLake catalog**.
1. Browse to and select the source KQL database.
1. In **Shared entities**, keep **All entities** selected or select specific subitems. For selection behavior and dependencies, see [Select shared entities](#select-shared-entities).
1. Optionally, modify the default cache policy.
1. Select **Create**.

### [Use a cluster URI](#tab/workspace)

> [!IMPORTANT]
> This method works with sources both in Azure Data Explorer and in Real-Time Intelligence.

### Create a shortcut with a cluster URI

To create a shortcut by using a cluster URI and database name, make sure you have at least contributor permissions on the source data, and then follow these steps:

1. Browse to your workspace in Microsoft Fabric.
1. Open a new or existing [eventhouse](create-eventhouse.md) in **Real-Time Intelligence**.
1. Select the plus sign next to **KQL databases**.

1. Enter a name for your database shortcut.
1. Select **Type** > **New shortcut database (Follower)**.

    :::image type="content" source="media/database-shortcut/new-database.png" alt-text="Screenshot of new database dialog for creating database shortcut in Real-Time Intelligence." lightbox="media/database-shortcut/new-database.png":::

1. Select **Next**.
1. Select **Method** > **Cluster URI**.
1. Enter the URI of the source cluster. To find the URI of a KQL Database, see [Copy URI](access-database-copy-uri.md#copy-uri).
1. Specify the source **Database**.
1. In **Shared entities**, keep **All entities** selected or select specific subitems. For selection behavior and dependencies, see [Select shared entities](#select-shared-entities).
1. Optionally, modify the default cache policy.
1. Select **Create**.

### [Use an invitation link](#tab/link)

> [!IMPORTANT]
> This method works only when the source database is in Azure Data Explorer.

### Create an invitation token

To create a database shortcut by using invitation tokens, a data consumer must get a token from the data provider. A token is a code that lets a data consumer create a shortcut to the source database. The data provider predefines the shared subitems. You don't need a token if you create a database shortcut by using the OneLake catalog or cluster URI method.

To create an invitation token, the data provider can use the following steps:

1. Go to the [Azure portal](https://portal.azure.com).
1. Go to the Azure Data Explorer database you want to use as the source.
1. Select **Share**.

    :::image type="content" source="media/database-shortcut/database-share.png" alt-text="Screenshot of database in the Azure portal and the share button." lightbox="media/database-shortcut/database-share.png":::

1. Enter the recipient email address. This address should be the email address associated with the Fabric user account in which you later create the database shortcut. This email address can be your own, or someone else's.
1. Choose one of the following options to create a link for a new shortcut.

    Use a link to create a shortcut as it opens the **New database shortcuts** dialog box and autopopulates the **Source cluster URI** and **Database** name from the information in the invitation token.

    * If you used your own email address to create the token and want to create the shortcut immediately, select **Open link**.
    * Otherwise, select **Copy link**. The person who the token is for can later paste this link into a browser to create the shortcut.

    :::image type="content" source="media/database-shortcut/create-token.png" alt-text="Screenshot of Azure portal select the open option to create a database shortcut in Real-Time Intelligence." lightbox="media/database-shortcut/create-token.png":::

    > [!NOTE]
    > You can also choose to manually create the shortcut. To do so, select **Copy token**. Go to your workspace, select **+ New** > **KQL Database**, and then select **Type** > **New shortcut database (Follower)**. Select **Method** > **Invitation token**, in **Invitation token** paste the token, and then select **Create**.

#### Use the invitation token

Use the link to open Real-Time Intelligence showing the **New database shortcut** dialog box, and then follow these steps:

1. Enter a name for your database shortcut.
1. Specify the **Workspace** in which you want to create the database shortcut.
1. Optionally, modify the default cache policy.
1. Check that the **Invitation token** is populated with the token you created and verified.

    :::image type="content" source="media/database-shortcut/new-shortcut-with-link.png" alt-text="Screenshot of new database shortcut from link dialog in Real-Time Intelligence." lightbox="media/database-shortcut/new-shortcut-with-link.png":::

1. Select **Create**.

---

When you create the shortcut, you're taken to the [database details](manage-monitor-database.md#database-details) view of the new database shortcut.

:::image type="content" source="media/database-shortcut/new-database-shortcut.png" alt-text="Screenshot of resulting database shortcut in Real-Time Intelligence." lightbox="media/database-shortcut/new-database-shortcut.png":::

## Select shared entities

For the OneLake catalog and cluster URI methods, select the subitems to include before you create the database shortcut:

1. Open **Shared entities**. By default, **All entities** is selected.
1. To share a subset, search by name or expand an entity type, and select the subitems you want to include. You can select tables, shortcut tables, materialized views, and functions.

    :::image type="content" source="../onelake/media/onelake-shortcuts/entities.png" alt-text="Screenshot of the Shared entities picker with tables, materialized views, and functions.":::

Only subitems you have permission to share are available for selection. Review the selection before you select **Create**, because dependencies can change which subitems are included:

* When you select a materialized view or function, its referenced tables are automatically selected.
* When you deselect a materialized view or function, its referenced tables remain selected.
* When you deselect a table, materialized views or functions that depend on it are automatically deselected.

> [!NOTE]
> To query a shared shortcut table or view its metadata, you need permissions for both the followed database and the shortcut table's source data. The same requirements apply to functions and materialized views that refer to shortcut tables.

When you include all entities, the database shortcut automatically synchronizes additions and removals of source subitems. When you select a subset, newly created source subitems aren't automatically added to the share. This selection is separate from schema synchronization for individual shortcut tables. For details, see [Automatic schema sync](../onelake/onelake-shortcuts.md#automatic-schema-sync).

After you create the database shortcut, check its contents and query the shared subitems. Names of subitems that aren't included in the share aren't visible to consumers.

## Delete database shortcut

1. Within your workspace, find the KQL database shortcut you want to delete.
1. Select the **More menu [...]** > **Delete**.

    :::image type="content" source="media/database-shortcut/delete-database-shortcut.png" alt-text="Screenshot of deleting item of database shortcut.":::

You deleted your database shortcut. Once you delete a database, you can't recover it. However, you can create a new database shortcut from the same source database.

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Create a KQL database](create-database.md)
