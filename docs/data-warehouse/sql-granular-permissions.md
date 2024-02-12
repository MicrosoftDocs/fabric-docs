---
title: SQL granular permissions
description: Learn about providing granular permissions via SQL in the warehouse.
ms.author: cynotebo
author: cynotebo
ms.reviewer: wiassaf, stwynant
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Warehouse roles and permissions # This article's title should not change. If so, contact engineering.
---

# SQL granular permissions in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

When the default permissions provided by assignment to workspace roles or granted through item permissions are insufficient, standard SQL constructs are available for more granular control.

For [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)]:

- Object-level-security can be managed using GRANT, REVOKE, and DENY syntax.
    - For more information, see T-SQL syntax for [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true).
- Users can be assigned to SQL roles, both custom and built-in database roles.

## User granular permissions

- In order for a user to connect to the database, the user must be assigned to a Workspace role or assigned the item **Read** permission.  Without **Read** permission at a minimum, the connection fails.
- If you'd like to set up a user's granular permissions prior to allowing them to connect to the warehouse, permissions can first be set up within SQL. Then, they can be given access by assigning them to a Workspace role or granting item permissions.

### Limitations

- CREATE USER cannot be explicitly executed currently. When GRANT or DENY is executed, the user is created automatically. The user will not be able to connect until sufficient workspace level rights are given. 
## View my permissions

When a user connects to the SQL connection string, they can view the permissions available to them using the [sys.fn_my_permissions](/sql/relational-databases/system-functions/sys-fn-my-permissions-transact-sql?view=fabric&preserve-view=true) function.

User's database scoped permissions:

```sql
SELECT *
FROM sys.fn_my_permissions(NULL, 'Database');
```

User's schema scoped permissions:

```sql
SELECT *
FROM sys.fn_my_permissions('<schema-name>', 'Schema');
```

User's object-scoped permissions:

```sql
SELECT *
FROM sys.fn_my_permissions('<schema-name>.<object-name>', 'Object');
```

## View permissions granted explicitly to users

When connected via the SQL connection string, a user with elevated permissions can query the permissions that have been granted by using system views. This doesn't show the users or user permissions that are given to users by being assigned to workspace roles or assigned item permissions.

```sql
SELECT DISTINCT pr.principal_id, pr.name, pr.type_desc, 
 pr.authentication_type_desc, pe.state_desc, pe.permission_name
FROM sys.database_principals AS pr
INNER JOIN sys.database_permissions AS pe
 ON pe.grantee_principal_id = pr.principal_id;
```

## Data protection features

You can secure column filters and predicate-based row filters on tables in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] to roles and users in Microsoft Fabric. You can also mask sensitive data from non-admins using dynamic data masking.

- [Row-level security in Fabric data warehousing](row-level-security.md)
- [Column-level security in Fabric data warehousing](column-level-security.md)
- [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md)

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
- [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true)
- [How to share your warehouse and manage permissions](share-warehouse-manage-permissions.md)

