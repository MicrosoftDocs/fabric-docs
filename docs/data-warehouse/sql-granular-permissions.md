---
title: SQL granular permissions
description: Learn about providing granular permissions via SQL in the warehouse.
ms.reviewer: wiassaf
ms.author: kedodd
author: kedodd
ms.topic: conceptual
ms.date: 04/17/2023
ms.search.form: Warehouse SQL permissions, Workspace permissions
---

# SQL granular permissions

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

When the out-of-the box permissions provided by assignment to workspace roles or granted through item permissions are insufficient, standard SQL constructs are available for more granular control.

For [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)]:

- Object-level-security can be managed using GRANT, REVOKE, and DENY syntax.
    - For more information, see T-SQL syntax for [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true).
- Users can be assigned to SQL roles, both custom and built-in database roles. 

### Notes:
- In order for a user to connect to the database, the user must be assigned to a Workspace role or assigned the item READ permission.  Without Read permission at a minimum, the connection fails.
- If you'd like to set up a user's granular permissions, prior to allowing them to connect to the warehouse, permissions can be set up within SQL first and then they can be given access by assigning them to a Workspace role or granting item permissions.

### Limitations:
- CREATE USER cannot be explicitly executed currently. When GRANT or DENY is executed, the user will be created automatically.
- Row-level security is currently not supported.
- Dynamic data masking is currently not supported.

## View my permissions

When a user connects to the SQL connection string, they can view the permissions available to them using the [sys.fn_my_permissions](/sql/relational-databases/system-functions/sys-fn-my-permissions-transact-sql?view=fabric&preserve-view=true) function.

   ```sql
   SELECT *
   FROM sys.fn_my_permissions(NULL, "Database")
   ```

## View permissions granted explicitly to users

When connected via the SQL connection string, a user with elevated permissions can query the permissions that have been granted by using system views. Note that this will not show the users or user permissions that are given to users by being assigned to workspace roles or assigned artifact permissions.

   ```sql
   SELECT DISTINCT pr.principal_id, pr.name, pr.type_desc, 
    pr.authentication_type_desc, pe.state_desc, pe.permission_name
   FROM sys.database_principals AS pr
   JOIN sys.database_permissions AS pe
    ON pe.grantee_principal_id = pr.principal_id;
   ```

## Next steps

- [Security for data warehousing in Microsoft Fabric](security.md)
- [Manage item permissions in Microsoft Fabric](item-permissions.md)
- [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true)