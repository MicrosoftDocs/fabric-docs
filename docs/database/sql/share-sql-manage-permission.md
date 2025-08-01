---
title: Share your SQL database and manage permissions
description: Learn how to share a SQL database item in Fabric with others and manage item permissions.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sukkaur, jaszymas, mesrivas  # Microsoft alias
ms.date: 04/06/2025
ms.topic: how-to
ms.custom:
---
# Share your SQL database and manage permissions

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article explains how to share a SQL database item and how to manage item permissions for a SQL database item.

For basic information about access control for SQL database in Fabric, see [Authorization in SQL database](authorization.md).

## Share a SQL database

Sharing is a convenient way to provide users and applications in your organizations with read access to your database. When sharing a database, you can decide how users and applications can consume your data:

- Using Transact-SQL queries against the database.
- Using Transact-SQL queries against the [SQL analytics endpoint](../../data-engineering/lakehouse-sql-analytics-endpoint.md) of the database.
- Accessing the mirrored data in OneLake, for example, using Spark.
- Creating Power BI reports using your database's semantic model.

### Prerequisites

You must be an admin or a member in your workspace to share a SQL database item in Microsoft Fabric.

### Share a database via Share quick action

1. Locate a database, you want to share, in your workspace and select the **Share** quick action for it. Select the ellipsis `...` button next to your database's name and select **Share**.
1. Search for and select a recipient you want to share the database with: a user, an application, or a group.
1. Select additional permissions that determine if and how the recipient can consume your data.
    - No additional permissions - Select no additional permissions if you plan to [configure granular access for the recipient via SQL access controls](configure-sql-access-controls.md). By default, the recipient is granted only the "Read" item permission. Read item permission allows the recipient to read properties of the SQL database, its SQL analytics endpoint, and to connect to the SQL database and its SQL analytics endpoint. The recipient won't be able to query any table or view.
    - **Read all data using SQL database** - Grants the recipient the ReadData item permission for the SQL database, allowing the recipient to read all data in the SQL database using Transact-SQL queries, for example by using [SQL query editor for SQL database](query-editor.md). You can [grant the recipient access to more capabilities via SQL access controls](configure-sql-access-controls.md).
    - **Read all data using SQL analytics endpoint** - Grants the recipient the ReadData item permission for the SQL analytics endpoint, allowing the recipient to read all data via the SQL analytics endpoint using Transact-SQL queries, for example by using [SQL query editor for SQL analytics endpoint](query-editor.md). You can grant the recipient access to more capabilities by configuring [SQL granular permissions for SQL analytics endpoint](share-data.md).
    - **Read all data using Apache Spark** - Grants the ReadAll item permission and SubscribeOneLakeEvents permission to the recipient, allowing them to access the mirrored data in OneLake, for example, by using Spark or [OneLake Explorer](../mirrored-database/explore-data-directly.md), and subscribe to OneLake events in Real time hub.
    - **Build reports on the default dataset** - Grants the Build permission to the recipient, enabling users to [Create simple reports on your SQL database in Power BI](create-reports.md).
1. Select **Notify recipients by email** to notify the recipients. The recipients receives an email with the link to the shared database.
1. Select **Grant**.

> [!NOTE]
> Granting item permissions has no impact on the security metadata *inside* the database. Specifically, it doesn't create any user objects (database-level principals). SQL database automatically creates a user object to represent the calling user/app in the database when a user or an app: is granted the Write item permission and doesn't have a user object in the database, creates an [asymmetric key](/sql/t-sql/statements/create-asymmetric-key-transact-sql), a [certificate](/sql/t-sql/statements/create-certificate-transact-sql), a [schema](/sql/t-sql/statements/create-schema-transact-sql), or a [symmetric key](/sql/t-sql/statements/create-symmetric-key-transact-sql). SQL database makes the new user object the owner of the created asymmetric key, certificate, schema, or symmetric key.

## Manage permissions

To review item permissions granted to a SQL database, its SQL analytics endpoint, or a semantic model, navigate to one of these items in the workspace and select the **Manage permissions** quick action.

If you have the **Share** permission for a SQL database, you can also use the **Manage permissions** page for the database to grant or revoke permissions.

## Limitations

- It can take up to two hours for Fabric permission changes to be visible to users and applications.
- Granting item permissions for a database has no impact on the security metadata inside the database, like the metadata in the [sys.database_permissions](/sql/relational-databases/system-catalog-views/sys-database-permissions-transact-sql), [sys.database_roles_members](/sql/relational-databases/system-catalog-views/sys-database-permissions-transact-sql), and [sys.database_principals](/sql/relational-databases/system-catalog-views/sys-database-principals-transact-sql) catalog views. Therefore, to determine if a user or an application can access a database based on their item permissions, use the **Manage permissions** page in Fabric portal.
- The sharing dialog for SQL database provides the option to subscribe to OneLake events. Permission to subscribe to OneLake events is granted along with the Read All Apache Spark permission.


## Related content

- [Authorization in SQL database](authorization.md)
- [Connect to your SQL database in Microsoft Fabric](connect.md)
