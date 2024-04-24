---
title: Share your warehouse and manage permissions
description: Learn how to share your warehouse in Microsoft Fabric and manage its user permissions.
author: jacindaeng
ms.author: jacindaeng
ms.reviewer: wiassaf
ms.date: 12/05/2023
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Warehouse roles and permissions # This article's title should not change. If so, contact engineering.
---
# Share your warehouse and manage permissions

**Applies to:** [!INCLUDE[fabric-dw-and-mirrored-db](includes/applies-to-version/fabric-dw-and-mirrored-db.md)]

Sharing is a convenient way to provide users read access to your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] for downstream consumption. Sharing allows downstream users in your organization to consume a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using SQL, Spark, or Power BI. You can customize the level of permissions that the shared recipient is granted to provide the appropriate level of access.

> [!NOTE]
> You must be an admin or member in your workspace to share a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

## Get started

After identifying the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] you would like to share with another user in your Fabric workspace, select the quick action in the row to **Share** a [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

The following animated gif reviews the steps to select a warehouse to share, select the permissions to assign, and then finally **Grant** the permissions to another user.

:::image type="content" source="media\share-warehouse-manage-permissions\share-warehouse.gif" alt-text="An animated gif showing interaction with the Fabric portal where a user shares a warehouse in Microsoft Fabric with another user." lightbox="media\share-warehouse-manage-permissions\share-warehouse.gif" :::

You can share your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] from the OneLake Data Hub or the Synapse Data Warehouse by choosing **Share** from quick action, as highlighted in the following image.

:::image type="content" source="media\share-warehouse-manage-permissions\share-warehouse-data-hub.png" alt-text="Screenshot showing how to share a warehouse in the OneLake Data Hub page." lightbox="media\share-warehouse-manage-permissions\share-warehouse-data-hub.png":::

## Share a Warehouse

You are prompted with options to select who you would like to share the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] with, what permission(s) to grant them, and whether they will be notified by email. When you have filled in all the required fields, select **Grant access**.

Here's more detail about each of the permissions provided:

- **If no additional permissions are selected** - The shared recipient by default receives "Read" permission, which only allows the recipient to *connect* to the [!INCLUDE [fabric-se](includes/fabric-se.md)], the equivalent of CONNECT permissions in SQL Server. The shared recipient will not be able to query any table or view or execute any function or stored procedure unless they are provided access to objects within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using T-SQL [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true) statement.

> [!NOTE]
> **ReadData**, **ReadAll**, and **Build** are separate permissions that do not overlap.

- **"Read all data using SQL" is selected ("ReadData" permissions)**- The shared recipient can read all the database objects within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. **ReadData** is the equivalent of *db_datareader* role in SQL Server. The shared recipient can read data from all tables and views within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. If you want to further restrict and provide granular access to some objects within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], you can do this using T-SQL GRANT/REVOKE/DENY statements.

    - In the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse, **"Read all SQL Endpoint data"** is equivalent to **"Read all data using SQL"**.

- **"Read all data using Apache Spark" is selected ("ReadAll" permissions)**- The shared recipient has read access to the underlying parquet files in OneLake, which can be consumed using Spark. **ReadAll** should be provided only if the shared recipient wants complete access to your warehouse's files using the Spark engine.

- **"Build reports on the default dataset" checkbox is selected ("Build" permissions)**- The shared recipient can build reports on top of the default semantic model that is connected to your [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. **Build** should be provided if the shared recipient wants **Build** permissions on the default semantic model, to create Power BI reports on this data. The **Build** checkbox is selected by default, but can be unchecked.

When the shared recipient receives the email, they can select **Open** and navigate to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] Data Hub page.

:::image type="content" source="media\share-warehouse-manage-permissions\recipient-open-shared-warehouse.png" alt-text="A screenshot showing the shared user's email notification of a shared warehouse." lightbox="media\share-warehouse-manage-permissions\recipient-open-shared-warehouse.png":::

Depending on the level of access the shared recipient has been granted, the shared recipient is now able to connect to the [!INCLUDE [fabric-se](includes/fabric-se.md)], query the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], build reports, or read data through Spark.

:::image type="content" source="media\share-warehouse-manage-permissions\share-see-what-already-exists.png" alt-text="A screenshot from the Fabric portal showing the 'See what already exists' page of the shared warehouse." lightbox="media\share-warehouse-manage-permissions\share-see-what-already-exists.png":::

### ReadData permissions

With **ReadData** permissions, the shared recipient can open the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] editor in read-only mode and query the tables and views within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The shared recipient can also choose to copy the [!INCLUDE [fabric-se](includes/fabric-se.md)] provided and connect to a client tool to run these queries.

For example, in the following screenshot, a user with **ReadData** permissions can query the warehouse.

:::image type="content" source="media\share-warehouse-manage-permissions\readdata-read-only-editor.png" alt-text="A screenshot from the Fabric portal show a user can query a shared warehouse." lightbox="media\share-warehouse-manage-permissions\readdata-read-only-editor.png" :::

### ReadAll permissions

A shared recipient with **ReadAll** permissions can find the [Azure Blob File System (ABFS) path](/azure/storage/blobs/data-lake-storage-introduction-abfs-uri) to the specific file in OneLake from the Properties pane in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] editor. The shared recipient can then use this path within a Spark Notebook to read this data.

For example, in the following screenshot, a user with **ReadAll** permissions can query the data in `FactSale` with a Spark query in a new notebook.

:::image type="content" source="media\share-warehouse-manage-permissions\table-spark-open-new-notebook.png" alt-text="A screenshot from the Fabric portal where a user opens a Spark notebook to query the Warehouse shortcut." lightbox="media\share-warehouse-manage-permissions\table-spark-open-new-notebook.png" :::

### Build permissions

With **Build** permissions, the shared recipient can create reports on top of the default semantic model that is connected to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The shared recipient can create Power BI reports from the Data Hub or also do the same using Power BI Desktop.

For example, in the following screenshot a user with **Build** permissions can start to **Auto-create** a Power BI report based on the shared warehouse.

:::image type="content" source="media\share-warehouse-manage-permissions\visualize-this-data-auto-create.png" alt-text="An screenshot showing interaction with the Fabric portal, where a user can autocreate a report on the shared warehouse." lightbox="media\share-warehouse-manage-permissions\visualize-this-data-auto-create.png" :::

## Manage permissions

The **Manage permissions** page shows the list of users who have been given access by either assigning to Workspace roles or item permissions.

If you are an Admin or Member, go to your workspace and select **More options**. Then, select **Manage permissions**.

:::image type="content" source="media\share-warehouse-manage-permissions\manage-permissions-workspace.png" alt-text="Screenshot showing a user selecting Manage permissions in the warehouse context menu." lightbox="media\share-warehouse-manage-permissions\manage-permissions-workspace.png":::

For users who were provided workspace roles, it shows the corresponding user, workspace role and permissions. Admin, Member and contributors have read/write access to items in this workspace. Viewers have **ReadData** permissions and can query all tables and views within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in that workspace. Item permissions **Read**, **ReadData**, and **ReadAll** can be provided to users.

:::image type="content" source="media\share-warehouse-manage-permissions\manage-permissions-page.png" alt-text="Screenshot showing the Manage permissions page of the Warehouse in the Fabric portal." lightbox="media\share-warehouse-manage-permissions\manage-permissions-page.png":::

You can choose to add or remove permissions using **Manage permissions**:

- **Remove access** removes all item permissions.
- **Remove ReadData** removes the **ReadData** permissions.
- **Remove ReadAll** removes **ReadAll** permissions.
- **Remove build** removes **Build** permissions on the corresponding default semantic model.

:::image type="content" source="media\share-warehouse-manage-permissions\remove-readall-manage-permissions.png" alt-text="Screenshot showing a user removing the ReadAll permission of a shared recipient." lightbox="media\share-warehouse-manage-permissions\remove-readall-manage-permissions.png":::

## Limitations

- If you provide item permissions or remove users who previously had permissions, permission propagation can take up to two hours. The new permissions will reflect in "Manage permissions" immediately. Sign in again to ensure that the permissions are reflected in your [!INCLUDE [fabric-se](includes/fabric-se.md)].
- Shared recipients are able to access the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using owner's identity (delegated mode). Ensure that the owner of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is not removed from the workspace.
- Shared recipients only have access to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] they receive and not any other items within the same workspace as the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. If you want to provide permissions for other users in your team to collaborate on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] (read and write access), add them as Workspace roles such as "Member" or "Contributor".
- Currently, when you share a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and choose **Read all data using SQL**, the shared recipient can access the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] editor in a read-only mode. These shared recipients can create queries, but cannot currently save their queries.
- Currently, sharing a Warehouse is only available through the user experience.
- If you want to provide granular access to specific objects within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], share the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] with no additional permissions, then provide granular access to specific objects using T-SQL GRANT statement. For more information, see T-SQL syntax for [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true).
- If you see that the **ReadAll** permissions and **ReadData** permissions are disabled in the sharing dialog, refresh the page.
- Shared recipients do not have permission to reshare a [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
- If a report built on top of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is shared with another recipient, the shared recipient needs more permissions to access the report. This depends on the mode of [access to the semantic model by Power BI](semantic-models.md):
  - If accessed through [Direct query mode](/power-bi/connect-data/service-dataset-modes-understand#directquery-mode) then **ReadData** permissions (or [granular SQL permissions](sql-granular-permissions.md) to specific tables/views) need to be provided to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
  - If accessed through [Direct lake mode](../get-started/direct-lake-overview.md), then **ReadData** permissions (or [granular permissions](sql-granular-permissions.md) to specific tables/views) need to be provided to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. Direct Lake mode is the default connection type for semantic models that use a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] as a data source. For more information, see [Direct Lake mode](semantic-models.md#direct-lake-mode). 
  - If accessed through [Import mode](/power-bi/connect-data/service-dataset-modes-understand#import-mode) then no additional permissions are needed.
  - Currently, sharing a warehouse directly with a SPN is not supported. 

## Data protection features

Microsoft Fabric data warehousing supports several technologies that administrators can use to protect sensitive data from unauthorized viewing. By securing or obfuscating data from unauthorized users or roles, these security features can provide data protection in both a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] without application changes.

- [Column-level security](column-level-security.md) prevents unauthorized viewing of columns in tables.
- [Row-level security](row-level-security.md) prevents unauthorized viewing of rows in tables, using familiar `WHERE` clause filter predicates.
- [Dynamic data masking](dynamic-data-masking.md) prevents unauthorized viewing of sensitive data by using masks to prevent access to complete, such as email addresses or numbers.

## Related content

- [Query the Warehouse](query-warehouse.md)
- [How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md)
- [Accessing shortcuts](../onelake/access-onelake-shortcuts.md)
- [Navigate the Fabric Lakehouse explorer](../data-engineering/navigate-lakehouse-explorer.md)
- [GRANT (Transact-SQL)](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true)
