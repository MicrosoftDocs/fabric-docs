---
title: SQL granular permissions in Fabric Data Warehouse
description: Learn how to use T-SQL GRANT, REVOKE, and DENY statements and SQL roles to provide granular permissions in a Fabric warehouse or SQL analytics endpoint.
ms.reviewer: dhsundar
ms.date: 06/25/2026
ms.topic: concept-article
ms.search.form: Warehouse roles and permissions # This article's title should not change. If so, contact engineering.
ai-usage: ai-assisted

#customer intent: As a data warehouse administrator, I want to understand the SQL constructs that provide granular permissions in a Fabric warehouse so that I can grant users only the access they need.
---

# SQL granular permissions in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

When the default permissions from workspace role assignment or item permissions don't give you the level of control you need, use standard SQL constructs in a Fabric warehouse or SQL analytics endpoint for finer-grained access control.

For the [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in Microsoft Fabric:

- Manage object-level security with the [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true) T-SQL statements.
- Assign users to SQL roles, both custom database roles and built-in database roles.

<a id="user-granular-permissions"></a>

## Configure user granular permissions in a Fabric warehouse

- For a user to connect to a Fabric warehouse or SQL analytics endpoint, you must assign them to a workspace role or grant them the item **Read** permission. Without **Read** permission at a minimum, the connection fails.
- To set up a user's granular permissions before they connect to the warehouse, define the permissions in SQL first. Then give them access by assigning a workspace role or granting item permissions.

<a id="limitations"></a>

### CREATE USER limitation

- You can't explicitly run `CREATE USER` in a Fabric warehouse or SQL analytics endpoint. When you run `GRANT` or `DENY`, Fabric creates the database user automatically. The user can't connect until they also have sufficient workspace-level rights.

## View my permissions

After a user connects to a Fabric warehouse or SQL analytics endpoint through the SQL connection string, they can view the permissions available to them by using the [sys.fn_my_permissions](/sql/relational-databases/system-functions/sys-fn-my-permissions-transact-sql?view=fabric&preserve-view=true) function.

Database-scoped permissions for the current user:

```sql
SELECT *
FROM sys.fn_my_permissions(NULL, 'Database');
```

Schema-scoped permissions for the current user:

```sql
SELECT *
FROM sys.fn_my_permissions('<schema-name>', 'Schema');
```

Object-scoped permissions for the current user:

```sql
SELECT *
FROM sys.fn_my_permissions('<schema-name>.<object-name>', 'Object');
```

<a id="view-permissions-granted-explicitly-to-users"></a>

## View permissions granted explicitly to users in a Fabric warehouse

When connected to a Fabric warehouse or SQL analytics endpoint through the SQL connection string, a user with elevated permissions can query granted permissions by using system views. This query doesn't return permissions that users receive through a Fabric workspace role or item.

```sql
SELECT DISTINCT pr.principal_id, pr.name, pr.type_desc,
    pr.authentication_type_desc, pe.state_desc, pe.permission_name
FROM sys.database_principals AS pr
INNER JOIN sys.database_permissions AS pe
    ON pe.grantee_principal_id = pr.principal_id;
```

<a id="data-protection-features"></a>

## Data protection features in a Fabric warehouse

In the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)], you can restrict access to specific columns and to specific rows in a table, and mask sensitive data from nonadministrators.

- [Row-level security in Fabric data warehousing](row-level-security.md)
- [Column-level security in Fabric data warehousing](column-level-security.md)
- [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md)

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
- [Share your data and manage permissions](share-warehouse-manage-permissions.md)
- [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true)