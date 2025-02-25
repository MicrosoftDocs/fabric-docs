---
title: Configure granular access control for a SQL database
description: Learn how to configure granular access control for SQL database using SQL access control mechanisms.
author: jaszymas
ms.author: jaszymas
ms.reviewer: wiassaf # Microsoft alias
ms.date: 10/11/2024
ms.topic: how-to
ms.search.form: SQL database security
---

# Configure granular access control for a SQL database

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

[Fabric workspace roles](authorization.md#fabric-access-controls) and item permissions allow you to easily set up authorization for your database users who need full administrative access or read-only access to the database.

To configure granular database access, use SQL access controls: [Database-level roles](/sql/relational-databases/security/authentication-access/database-level-roles?view=fabric&preserve-view=true), [SQL permissions](/sql/relational-databases/security/permissions-database-engine?view=fabric&preserve-view=true), and/or [row-level security (RLS)](/sql/relational-databases/security/row-level-security?view=fabric&preserve-view=true).

You can manage membership of database-level roles and define custom (user-defined) roles for common data access scenarios using Fabric portal. You can configure all SQL access controls using Transact-SQL.

## Manage SQL database-level roles from Fabric portal

To begin managing database-level roles for a Fabric SQL database:

1. Navigate to and open your database in Fabric portal.
1. From the main menu, select **Security** and select **Manage SQL security**.

  :::image type="content" source="media/configure-sql-access-controls/open-manage-sql-security.png" alt-text="Screenshot from the Fabric portal of the button to open manage SQL security.":::
  
1. The **Manage SQL security** page opens.
   
  :::image type="content" source="media/configure-sql-access-controls/manage-sql-security-page.png" alt-text="Screenshot from the Fabric portal of the button to manage SQL security page." lightbox="media/configure-sql-access-controls/manage-sql-security-page.png":::

To add a new custom (user-defined) database-level role that allows its members to access objects in specific schemas of your database:

1. In the **Manage SQL security** page, select **New**.
1. In the **New role** page, enter a role name.
1. Select one or more schemas.
1. Select permissions you want to grant for role members for each selected schema. **Select**, **Insert**, **Update**, and **Delete** permissions apply to all tables and views in a schema. The **Execute** permission applies to all stored procedures and functions in a schema.
  :::image type="content" source="media/configure-sql-access-controls/create-new-role.png" alt-text="Screenshot from the Fabric portal of defining a custom role." lightbox="media/configure-sql-access-controls/create-new-role.png":::
1. Select **Save**.

To alter the definition of a custom database-level role:

1. In the **Manage SQL security** page, select a custom role and select **Edit**.
1. Change a role name or role's permissions for your database schemas.
   > [!NOTE]
   > The **Manage SQL security** page allows you to view and manage only the five schema-level permissions. If you've granted the role `SELECT`, `INSERT`, `UPDATE`, `DELETE`, or `EXECUTE` for an object other than a schema, or if you've granted the role other permissions via the [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true) Transact-SQL statement, the **Manage SQL security** page doesn't show them.
1. Select **Save**.

To delete a custom database-level role:

1. In the **Manage SQL security** page, select a role and select **Delete**.
1. Select **Delete** again, when prompted.

To view the list of role members and to add or remove role members:

1. In the **Manage SQL security** page, select a built-in role or a custom role, and select **Manage access**.
    - To add role members:
        1. In the **Add people, groups or apps** field, type a name and select a user, group or an app from the search results. You can repeat that to add other people, groups, or apps.
        1. Select **Add**.
          :::image type="content" source="media/configure-sql-access-controls/add-role-members.png" alt-text="Screenshot from the Fabric portal of adding role members." lightbox="media/configure-sql-access-controls/add-role-members.png":::
        1. If some of the role members, you're adding, don't have the Read item permission for the database in Fabric, the **Share database** button is displayed. Select it to open the **Grant people access** dialog and select **Grant** to share the database. Granting shared permissions to the database will grant the Read item permission to the role members who don't have it yet. For more information about sharing a SQL database, see [Share your SQL database and manage permissions](share-sql-manage-permission.md).
       > [!IMPORTANT]
       > To connect to a database, a user or an application must have the Read item permission for the database in Fabric, independently from their membership in SQL database-level roles or SQL permissions inside the database.
    - To remove role members:
        1. Select role members, you want to remove.
        1. Select  **Remove**.
1. Select **Save** to save your changes to the list of role members.
   > [!NOTE]
   > When you add a new role member that has no user object in the database, the Fabric portal automatically creates a user object for the role member on your behalf (using [CREATE USER (Transact-SQL)](/sql/t-sql/statements/create-user-transact-sql?view=fabric&preserve-view=true)). The Fabric portal doesn't remove user objects from the database, when a role member is removed from a role.

## Configure SQL controls with Transact-SQL

To configure access for a user or an application using Transact SQL:

1. Share the database with the user/application, or with Microsoft Entra group the user/application belongs too. Sharing the database ensures the user/application has the Read item permission for the database in Fabric, which is required to connect to the database. For more information, see [Share your SQL database and manage permissions](share-sql-manage-permission.md).
1. Create a user object for the user, the application, or their group in the database, using [CREATE USER (Transact-SQL)](/sql/t-sql/statements/create-user-transact-sql?view=fabric&preserve-view=true). For more information, see [Create database users for Microsoft Entra identities](authentication.md#create-database-users-for-microsoft-entra-identities).
1. Configure the desired access controls:
    1. Define custom (user-defined) [database-level roles](/sql/relational-databases/security/authentication-access/database-level-roles?view=fabric&preserve-view=true). To manage definitions of custom roles, use [CREATE ROLE](/sql/t-sql/statements/create-role-transact-sql?view=fabric&preserve-view=true), [ALTER ROLE](/sql/t-sql/statements/alter-role-transact-sql?view=fabric&preserve-view=true), and [DROP ROLE](/sql/t-sql/statements/drop-role-transact-sql).
    1. Add the user object to custom or built-in (fixed) roles with the `ADD MEMBER` and `DROP MEMBER` options of the [ALTER ROLE](/sql/t-sql/statements/alter-role-transact-sql?view=fabric&preserve-view=true) statement.
    1. Configure granular [SQL permissions](/sql/relational-databases/security/permissions-database-engine?view=fabric&preserve-view=true) for the user object with the [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true) statements.
    1. Configure [row-level security (RLS)](/sql/relational-databases/security/row-level-security?view=fabric&preserve-view=true) to grant/deny access to specific rows in a table to the user object.

## Related content

- [Authorization in SQL database](authorization.md)
- [Share your SQL database and manage permissions](share-sql-manage-permission.md)
