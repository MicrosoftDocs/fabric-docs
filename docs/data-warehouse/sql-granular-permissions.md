---
title: SQL granular permissions
description: Learn about providing granular permissions via SQL in the warehouse.
ms.reviewer: wiassaf
ms.author: kedodd
author: kedodd
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: Warehouse roles and permissions # This article's title should not change. If so, contact engineering.
---
# SQL granular permissions in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

When the out-of-the box permissions provided by assignment to workspace roles or granted through item permissions are insufficient, standard SQL constructs are available for more granular control.

For [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)]:

- Object-level-security can be managed using GRANT, REVOKE, and DENY syntax.
    - For more information, see T-SQL syntax for [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true).
- Users can be assigned to SQL roles, both custom and built-in database roles. 

### Notes:
- In order for a user to connect to the database, the user must be assigned to a Workspace role or assigned the item **Read** permission.  Without **Read** permission at a minimum, the connection fails.
- If you'd like to set up a user's granular permissions prior to allowing them to connect to the warehouse, permissions can first be set up within SQL. Then, they can be given access by assigning them to a Workspace role or granting item permissions.

### Limitations:
- CREATE USER cannot be explicitly executed currently. When GRANT or DENY is executed, the user will be created automatically.
- Row-level security is currently not supported.
- Dynamic data masking is currently not supported.

## View my permissions

When a user connects to the SQL connection string, they can view the permissions available to them using the [sys.fn_my_permissions](/sql/relational-databases/system-functions/sys-fn-my-permissions-transact-sql?view=fabric&preserve-view=true) function.

User's database scoped permissions:

   ```sql
   SELECT *
   FROM sys.fn_my_permissions(NULL, "Database")
   ```

User's schema scoped permissions:

   ```sql
   SELECT *
   FROM sys.fn_my_permissions("<schema-name>", "Schema")
   ```

User's object-scoped permissions:

   ```sql
   SELECT *
   FROM sys.fn_my_permissions("<schema-name>.<object-name>", "Object")
   ```


## View permissions granted explicitly to users

When connected via the SQL connection string, a user with elevated permissions can query the permissions that have been granted by using system views. This doesn't show the users or user permissions that are given to users by being assigned to workspace roles or assigned item permissions.

   ```sql
   SELECT DISTINCT pr.principal_id, pr.name, pr.type_desc, 
    pr.authentication_type_desc, pe.state_desc, pe.permission_name
   FROM sys.database_principals AS pr
   JOIN sys.database_permissions AS pe
    ON pe.grantee_principal_id = pr.principal_id;
   ```

## Restricting row access by using views

Row level security is currently not supported. As a workaround, views and system functions can be used to limit a user's access to the data. This can be achieved in the following way:

1. Provide the user with the Fabric Read permission only - This will grant them CONNECT permissions only for the Warehouse.
2. Optionally, create a custom role and add the user to the role, if you'd like to restrict access based on roles.

   ```sql
   CREATE ROLE PrivilegedRole
   
   ALTER ROLE PrivilegedRole ADD MEMBER [userOne@contoso.com]
   ```

3. Create a view that queries the table for which you'd like to restrict row access
4. Add a WHERE clause within the VIEW definition, using the SUSER_SNAME() or IS_ROLEMEMBER() system functions, to filter based on user name or role membership. Below is an example of providing access to certain rows to users based on region data within the row. The first condition provides access to rows, of a specific region, to one specific user, while the second condition provides access to rows, of a specific region, to any member of the PrivilegedRole custom role.

   ```sql
   CREATE VIEW dbo.RestrictedAccessTable as
   select *
   from dbo.SampleTable
   WHERE
   ( SUSER_SNAME() = 'userTwo@contoso.com' AND test_region = '<region_one_name>')
   OR
   ( IS_ROLEMEMBER('PrivilegedRole', SUSER_SNAME()) = 1 AND test_region = '<region_two_name')
   ```

5. Grant access to the view 

   ```sql
   GRANT SELECT ON dbo.RestrictedAccessTable TO [userOne@contoso.com]
   ```

## Next steps

- [Security for data warehousing in Microsoft Fabric](security.md)
- [Manage item permissions in Microsoft Fabric](item-permissions.md)
- [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true)