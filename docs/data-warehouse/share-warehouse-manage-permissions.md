---
title: Share Your Warehouse and Manage Permissions
description: Learn how to share your warehouse in Microsoft Fabric and manage its user permissions.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mesrivas, fresantos
ms.date: 07/14/2025
ms.topic: how-to
ms.search.form: Warehouse roles and permissions # This article's title should not change. If so, contact engineering.
ms.custom: sfi-image-nochange
---
# Share your data and manage permissions

**Applies to:** [!INCLUDE[fabric-dw-mirroreddb](includes/applies-to-version/fabric-dw-mirroreddb.md)]

Sharing is a convenient way to provide users read access to your data for downstream consumption. Sharing allows downstream users in your organization to consume a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using T-SQL, Spark, or Power BI. You can customize the level of permissions that the shared recipient is granted to provide the appropriate level of access.

> [!NOTE]
> You must be an admin or member in your workspace to share an item in [!INCLUDE [product-name](../includes/product-name.md)].

## Get started

After identifying the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] item you would like to share with another user in your Fabric workspace, select the quick action in the row to **Share**.

Select a warehouse to share, select the permissions to assign, and **Grant** the permissions to another user.

## Share a warehouse

1. You can share your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] from the **OneLake** or Warehouse item by choosing **Share** from quick action, as highlighted in the following image.

1. You're prompted with options to select who you would like to share the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] with, what permissions to grant them, and whether they'll be notified by email.

1. Fill out all required fields, select **Grant access**.

1. When the shared recipient receives the email, they can select **Open** and navigate to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] OneLake catalog page.

   :::image type="content" source="media/share-warehouse-manage-permissions/recipient-open-shared-warehouse.png" alt-text="Screenshot showing the shared user's email notification of a shared warehouse." lightbox="media/share-warehouse-manage-permissions/recipient-open-shared-warehouse.png":::

1. Depending on the level of access the shared recipient has been granted, the shared recipient is now able to connect to the [!INCLUDE [fabric-se](includes/fabric-se.md)], query the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], or read data through Spark.

## Fabric security roles

Here's more detail about each of the permissions provided:

- **If no additional permissions are selected** - The shared recipient by default receives "Read" permission, which only allows the recipient to *connect* to the [!INCLUDE [fabric-se](includes/fabric-se.md)], the equivalent of CONNECT permissions in SQL Server. The shared recipient won't be able to query any table or view or execute any function or stored procedure unless they're provided access to objects within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using T-SQL [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true) statement.

   > [!TIP]
   > **ReadData** (used by the warehouse for T-SQL permissions) and **ReadAll** (used by OneLake and the SQL analytics endpoint) are separate permissions that do not overlap.

- **"Read all data using SQL" is selected ("ReadData" permissions)** - The shared recipient can read all the tables and views within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in read-only mode. The shared recipient can also choose to copy the [!INCLUDE [fabric-se](includes/fabric-se.md)] provided and connect to a client tool to run these queries. **ReadData** is the equivalent of *db_datareader* role in SQL Server. If you want to further restrict and provide granular access to some objects within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], you can do this using T-SQL `GRANT`/`REVOKE`/`DENY` statements.

    - In the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse, **"Read all SQL Endpoint data"** is equivalent to **"Read all data using SQL"**.

- **"Read all data using Apache Spark" is selected ("ReadAll" permissions)** - The shared recipient should only be provided **ReadAll** if they want complete access to your warehouse's files using the Spark engine. A shared recipient with **ReadAll** permissions can find the [Azure Blob File System (ABFS) path](/azure/storage/blobs/data-lake-storage-introduction-abfs-uri) to the specific file in OneLake from the Properties pane in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] editor. The shared recipient can then use this path within a Spark Notebook to read this data. The recipient can also subscribe to OneLake events generated for the data warehouse in Real time hub.

    - **"Subscribe to events" ("SubscribeOneLakeEvents" permissions)** - A shared recipient with this permission can subscribe to OneLake events generated for the warehouse in Fabric Real-Time Hub.

   For example, a user with **ReadAll** permissions can query the data in `FactSale` with a Spark query in a new notebook.

- **Monitor** – Users with **Monitor** permission can query Dynamic Management Views (DMVs), such as `sys.dm_exec_requests`, query text, system connections, sessions, and Insights views. This permission is typically required for operational monitoring, troubleshooting, and performance analysis.

- **Audit** – Users with **Audit** permission can enable, configure, and query audit logs. With this permission, users can access auditing data to review activity history, monitor compliance, and support security investigations.


## Manage permissions

The **Manage permissions** page shows the list of users who have been given access by either assigning to Workspace roles or item permissions.

If you're a member of the **Admin** or **Member** workspace roles, go to your workspace and select **More options**. Then, select **Manage permissions**.

:::image type="content" source="media/share-warehouse-manage-permissions/manage-permissions-workspace.png" alt-text="Screenshot showing a user selecting Manage permissions in the warehouse context menu." lightbox="media/share-warehouse-manage-permissions/manage-permissions-workspace.png":::

For users who were provided workspace roles, you'll see the corresponding user, workspace role, and permissions. 

:::image type="content" source="media/share-warehouse-manage-permissions/manage-permissions-page.png" alt-text="Screenshot showing the Manage permissions page of the Warehouse in the Fabric portal." lightbox="media/share-warehouse-manage-permissions/manage-permissions-page.png":::

The following table lists which permission each role has by default and whether the permission is shareable.

| Permission | Given by default to | Shareable |
| --- | --- | --- |
| Read | Admin, Member, Contributor, Viewer| Yes |
| ReadData | Admin, Member, Contributor, Viewer | Yes |
| ReadAll | Admin, Member, Contributor | Yes |
| Write | Admin, Member, Contributor | No |
| Monitor | Admin, Member, Contributor | N/A - can't be granted on its own |
| Audit | Admin | N/A - can't be granted on its own |
| Reshare | Admin, Member | N/A - can't be granted on its own |
| Restore | Admin | No |

You can choose to add or remove permissions using **Manage permissions**:

- **Remove access** removes all item permissions.
- **Remove ReadData** removes the **ReadData** permissions.
- **Remove ReadAll** removes **ReadAll** permissions.

:::image type="content" source="media/share-warehouse-manage-permissions/remove-readall-manage-permissions.png" alt-text="Screenshot showing a user removing the ReadAll permission of a shared recipient." lightbox="media/share-warehouse-manage-permissions/remove-readall-manage-permissions.png":::

## Data protection features

Microsoft Fabric data warehousing supports several technologies that administrators can use to protect sensitive data from unauthorized viewing. By securing or obfuscating data from unauthorized users or roles, these security features can provide data protection in both a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] without application changes.

- [Column-level security](column-level-security.md) prevents unauthorized viewing of columns in tables.
- [Row-level security](row-level-security.md) prevents unauthorized viewing of rows in tables, using familiar `WHERE` clause filter predicates.
- [Dynamic data masking](dynamic-data-masking.md) prevents unauthorized viewing of sensitive data by using masks to prevent access to complete, such as email addresses or numbers.

## Limitations

- If you provide item permissions or remove users who previously had permissions, permission propagation can take up to two hours. The new permissions are visible in **Manage permissions** immediately. Sign in again to ensure that the permissions are reflected in your [!INCLUDE [fabric-se](includes/fabric-se.md)].
- Shared recipients are able to access the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using owner's identity (delegated mode). Ensure that the owner of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is not removed from the workspace.
- Shared recipients only have access to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] they receive and not any other items within the same workspace as the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. If you want to provide permissions for other users in your team to collaborate on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] (read and write access), add them as Workspace roles such as **Member** or **Contributor**.
- Currently, when you share a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and choose **Read all data using SQL**, the shared recipient can access the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] editor in a read-only mode. These shared recipients can create queries, but cannot currently save their queries.
- Currently, sharing a Warehouse is only available through the user experience.
- If you want to provide granular access to specific objects within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], share the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] with no additional permissions, then provide granular access to specific objects using T-SQL GRANT statement. For more information, see T-SQL syntax for [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true).
- If you see that the **ReadAll** permissions and **ReadData** permissions are disabled in the sharing dialog, refresh the page.
- Shared recipients do not have permission to reshare a [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
- If a report built on top of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is shared with another recipient, the shared recipient needs more permissions to access the report. This depends on the mode of [access to the semantic model by Power BI](semantic-models.md):
  - If accessed through [Direct query mode](/power-bi/connect-data/service-dataset-modes-understand#directquery-mode) then **ReadData** permissions (or [granular SQL permissions](sql-granular-permissions.md) to specific tables/views) need to be provided to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
  - If accessed through [Direct Lake mode](../fundamentals/direct-lake-overview.md), then **ReadData** permissions (or [granular permissions](sql-granular-permissions.md) to specific tables/views) need to be provided to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. Direct Lake mode is the default connection type for semantic models that use a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] as a data source. For more information, see [Direct Lake mode](semantic-models.md#direct-lake-mode). 
  - If accessed through [Import mode](/power-bi/connect-data/service-dataset-modes-understand#import-mode) then no additional permissions are needed.
  - Currently, sharing a warehouse directly with an SPN is not supported.
- The sharing dialog for warehouses provides the option to subscribe to OneLake events. Currently, permission to subscribe to OneLake events is granted along with the Read All Apache Spark permission. 

## Related content

- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
- [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md)
- [Access Fabric OneLake shortcuts in an Apache Spark notebook](../onelake/access-onelake-shortcuts.md)
- [Navigate the Fabric Lakehouse explorer](../data-engineering/navigate-lakehouse-explorer.md)
- [GRANT (Transact-SQL)](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true)
