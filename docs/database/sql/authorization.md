---
title: "Authorization in SQL database"
description: Learn about access control in SQL database in Fabric.
author: jaszymas
ms.author: jaszymas
ms.reviewer: wiassaf
ms.date: 10/11/2024
ms.topic: concept-article
---
# Authorization in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article explains access control for SQL database items in Fabric.

You can configure access for your SQL database at two levels:

- In Fabric, by using [Fabric access controls](#fabric-access-controls) - workspace roles and item permissions.
- Inside your database, by using [SQL access controls](#sql-access-controls), such SQL permissions or database-level roles.

The access controls at these two different levels work together.

- To [connect](connect.md) to a database, a user must have at least the [Read permission in Fabric](#item-permissions) for the Fabric database item.
- You can grant access to specific capabilities or data using Fabric access controls, SQL access controls, or both. A permission to connect to the database can only be granted with Fabric roles or permissions.
- Denying access (with the [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric-sqldb&preserve-view=true) Transact-SQL statement) in the database always takes priority.

> [!NOTE]
> Microsoft Purview protection policies can augment effective permission for database users. If your organization uses Microsoft Purview with Microsoft Fabric, see [Protect sensitive data in SQL database with Microsoft Purview protection policies](protect-databases-with-protection-policies.md).


## Fabric access controls

In Fabric, you can control access using Fabric [workspace roles](/fabric/security/permission-model#workspace-roles) and [item permissions](/fabric/security/permission-model#item-permissions).

### Workspace roles

Fabric [workspace roles](/fabric/security/permission-model#workspace-roles) let you manage who can do what in a Microsoft Fabric workspace.

- For an overview of workspace roles, see [Roles in workspaces](../../fundamentals/roles-workspaces.md).
- For instructions on assigning workspace roles, see [Give users access to workspaces](../../fundamentals/give-access-workspaces.md).

The following table captures SQL database-specific capabilities, members of particular workspace roles are allowed to access.

| Capability | Admin role | Member role | Contributor role | Viewer role |
| ---------- | ----- | ------ | ----------- | -------- |
| **Full administrative access and full data access** | Yes | Yes | Yes | No |
| **Read data and metadata** | Yes | Yes | Yes | Yes |
| **Connect to the database** | Yes | Yes | Yes | Yes |

### Item permissions

Fabric [Item permissions](/fabric/security/permission-model#item-permissions) control access to individual Fabric items within a workspace. Different Fabric items have different permissions. The following table lists item permissions that are applicable to SQL database items.

| Permission | Capability |
| ---------- | ---------- |
| **Read**       | Connect to the database |
| **ReadData**   | Read data and metadata |
| **ReadAll**    | Read mirrored data directly from OneLake files |
| **Share**      | Share item and manage Fabric item permissions |
| **Write**      | Full administrative access and full data access |

The easiest way to grant item permissions is by adding a user, an application, or a group to a [workspace role](#workspace-roles). Membership in each role implies the role members have a subset of permissions to all databases in the workspace, as specified in the following table.

| Role            | Read     | ReadAll | ReadData | Write    | Share    |
| --------------- | -------- | ------- | -------- | -------- | -------- |
| **Admin**           | Yes | Yes| Yes | Yes | Yes |
| **Member**          | Yes | Yes| Yes | Yes | Yes |
| **Contributor**     | Yes | Yes| Yes | Yes | No |
| **Viewer**          | Yes | Yes| Yes | No | No |

### Share item permissions

You can also grant Read, ReadAll, and ReadData permissions for an individual database by sharing the database item via the **Share** quick action in Fabric portal. You can view and manage permissions granted for a database item via the **Manage permissions** quick action in Fabric portal. For more information, see [Share your SQL database and manage permissions](share-sql-manage-permission.md).

## SQL access controls

The following SQL concepts allow much more granular access control in comparison to Fabric workspace roles and item permissions.

- [Database-level roles](/sql/relational-databases/security/authentication-access/database-level-roles?view=fabric-sqldb&preserve-view=true). There are two types of database-level roles: *fixed database roles* that are predefined in the database, and *user-defined database roles* that you can create.
   - You can manage membership of database-level roles and define user-defined roles for common scenarios in Fabric portal.
      - For more information, see [Manage SQL database-level roles from Fabric portal](configure-sql-access-controls.md#manage-sql-database-level-roles-from-fabric-portal).
   - You can also manage role membership and role definitions using Transact-SQL.
      - To add and remove users to a database role, use the `ADD MEMBER` and `DROP MEMBER` options of the [ALTER ROLE](/sql/t-sql/statements/alter-role-transact-sql?view=fabric-sqldb&preserve-view=true) statement. To manage definitions of user-defined roles, use [CREATE ROLE](/sql/t-sql/statements/create-role-transact-sql?view=fabric-sqldb&preserve-view=true), [ALTER ROLE](/sql/t-sql/statements/alter-role-transact-sql?view=fabric-sqldb&preserve-view=true), and [DROP ROLE](/sql/t-sql/statements/drop-role-transact-sql?view=fabric-sqldb&preserve-view=true).
- [SQL permissions](/sql/relational-databases/security/permissions-database-engine?view=fabric-sqldb&preserve-view=true). You can manage permissions for database users or database roles by using the [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric-sqldb&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric-sqldb&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric-sqldb&preserve-view=true) Transact-SQL statements.
- [Row-level security (RLS)](/sql/relational-databases/security/row-level-security?view=fabric-sqldb&preserve-view=true) allows you to control access to specific rows in a table.

For more information, see [Configure granular access control for a SQL database](configure-sql-access-controls.md).

## Related content

- [Share your SQL database and manage permissions](share-sql-manage-permission.md)
- [Configure granular access control for a SQL database](configure-sql-access-controls.md)
- [Permission model in Microsoft Fabric](../../security/permission-model.md)
- [Protect sensitive data in SQL database with Microsoft Purview protection policies](protect-databases-with-protection-policies.md)

