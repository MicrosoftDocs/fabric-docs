---
title: "Authentication in SQL database"
description: Learn about authentication in SQL database in Fabric.
author: jaszymas
ms.author: jaszymas
ms.reviewer: wiassaf
ms.date: 11/20/2024
ms.topic: concept-article
---
# Authentication in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article explains authentication for SQL databases.

Like other Microsoft Fabric item types, SQL databases rely on [Microsoft Entra authentication](/entra/identity/authentication/overview-authentication).

To successfully authenticate to a SQL database, a Microsoft Entra user, a [service principal](/entra/identity-platform/app-objects-and-service-principals), or their [group](/entra/fundamentals/concept-learn-about-groups), must have the Read item permission for the database in Fabric. For information on how to grant a Microsoft Entra identity access to a Fabric workspace or a specific database, see [Fabric access controls](authorization.md#fabric-access-controls).

To find the connection string to your SQL database in Fabric, see [Connect to your SQL database in Microsoft Fabric](connect.md).

> [!NOTE]
> To enable [service principals](/entra/identity-platform/app-objects-and-service-principals) to connect to Fabric and to SQL databases, you also need to enable the [Service principals can use Fabric APIs](../../admin/service-admin-portal-developer.md#service-principals-can-call-fabric-public-apis) Fabric tenant setting. To learn how to enable tenant settings, see [Fabric Tenant settings](../../admin/about-tenant-settings.md).

## Connect to a SQL database using Microsoft Entra authentication

You can connect to a database using Microsoft Entra authentication with:

- SQL tools that support Microsoft Entra authentication, including [SQL Server Management Studio](connect.md#connect-with-sql-server-management-studio-manually) and [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric-sqldb&preserve-view=true).
- Applications that use SQL client drivers supporting Microsoft Entra authentication, including [SqlClient](/sql/connect/ado-net/sql/azure-active-directory-authentication), [JDBC](/sql/connect/jdbc/connecting-using-azure-active-directory-authentication), [ODBC](/sql/connect/odbc/using-azure-active-directory), and [OLE DB](/sql/connect/oledb/features/using-azure-active-directory).

Applications and tools must upgrade drivers to versions that support Microsoft Entra authentication and add an authentication mode keyword in their [SQL connection string](connect.md), like `ActiveDirectoryInteractive`, `ActiveDirectoryServicePrincipal`, or `ActiveDirectoryPassword`.

## Create database users for Microsoft Entra identities

If you plan to [configure SQL access controls with Transact-SQL](configure-sql-access-controls.md#configure-sql-controls-with-transact-sql), you first need to create [database users](/sql/relational-databases/security/contained-database-users-making-your-database-portable) corresponding to your Microsoft Entra identities - users, service principals, or their groups - with [CREATE USER (Transact-SQL)](/sql/t-sql/statements/create-user-transact-sql?view=fabric-sqldb&preserve-view=true).

Creating database users isn't required if you use [Fabric access controls](authorization.md#fabric-access-controls) ([workspace roles](authorization.md#workspace-roles) or [item permissions](authorization.md#item-permissions)). You don't need to create users when you [manage SQL database-level roles from Fabric portal](configure-sql-access-controls.md#manage-sql-database-level-roles-from-fabric-portal) either - the portal automatically creates users when needed.

### Create database users when connected as a Microsoft Entra user

When you're connected to your database as a Microsoft Entra user, you should use `CREATE USER` with the [FROM EXTERNAL PROVIDER](/sql/t-sql/statements/create-user-transact-sql?view=fabric-sqldb&preserve-view=true#from-external-provider-) clause to create users for Microsoft Entra principals. `FROM EXTERNAL PROVIDER` validates the specified principal name with Microsoft Entra, retrieves the principal identifier (user's or group's object ID, application ID, or client ID), and stores the identifier as user's security identifier (SID) in SQL metadata. You must be a member of the [Directory Readers role](/entra/identity/role-based-access-control/permissions-reference#directory-readers) in Microsoft Entra when using the `FROM EXTERNAL PROVIDER` clause. The following sample T-SQL scripts use `FROM EXTERNAL PROVIDER` to create a user based on a Microsoft Entra user, a service principal in Microsoft Entra, or a group in Microsoft Entra.

```sql  
-- Create a user for a Microsoft Entra user
CREATE USER [alice@contoso.com] FROM EXTERNAL PROVIDER;
-- Create a user for a service principal in Microsoft Entra
CREATE USER [HRApp] FROM EXTERNAL PROVIDER;
-- Create a user for a group in Microsoft Entra
CREATE USER [HR] FROM EXTERNAL PROVIDER; 
```

### Create database users when connected as a Microsoft Entra service principal

When an application is connected to a database with a service principal, the application must issue `CREATE USER` with the [SID](/sql/t-sql/statements/create-user-transact-sql?view=fabric-sqldb&preserve-view=true#sid--sid) and [TYPE](/sql/t-sql/statements/create-user-transact-sql?view=fabric-sqldb&preserve-view=true#type---e--x-) clauses to create users for Microsoft Entra principals. The specified principal name isn't validated in Microsoft Entra. It's a responsibility of the application (application developer) to provide a valid name and a valid SID and a user object type.

If the specified principal is a user or a group in Microsoft Entra, the SID must be an object ID of that user or group in Microsoft Entra. If the specified principal is a service principal in Microsoft Entra, the SID must be an application ID (client ID) of the service principal in Microsoft Entra. Object IDs and application IDs (client IDs) obtained from Microsoft Entra must be converted to **binary(16)**.

The value of the `TYPE` argument must be:

- `E` - if the specified Microsoft Entra principal is a user or a service principal.
- `X` - if the specified Microsoft Entra principal is a group.

The following T-SQL example script creates a database user for the Microsoft Entra user, named `bob@contoso.com`, setting the SID of the new user to the object ID of the Microsoft Entra user. The unique identifier of the user's object ID is converted and then concatenated into a `CREATE USER` statement. Replace `<unique identifier sid>` with the user's object ID in Microsoft Entra.

```sql
DECLARE @principal_name SYSNAME = 'bob@contoso.com';
DECLARE @objectId UNIQUEIDENTIFIER = '<unique identifier sid>'; -- user's object ID in Microsoft Entra

-- Convert the guid to the right type
DECLARE @castObjectId NVARCHAR(MAX) = CONVERT(VARCHAR(MAX), CONVERT (VARBINARY(16), @objectId), 1);

-- Construct command: CREATE USER [@principal_name] WITH SID = @castObjectId, TYPE = E;
DECLARE @cmd NVARCHAR(MAX) = N'CREATE USER [' + @principal_name + '] WITH SID = ' + @castObjectId + ', TYPE = E;'
EXEC (@cmd);
```

The following example creates a database user for the Microsoft Entra service principal, named `HRApp`, setting the SID of the new user to the client ID of the service principal in Microsoft Entra.

```sql
DECLARE @principal_name SYSNAME = 'HRApp';
DECLARE @clientId UNIQUEIDENTIFIER = '<unique identifier sid>'; -- principal's client ID in Microsoft Entra

-- Convert the guid to the right type
DECLARE @castClientId NVARCHAR(MAX) = CONVERT(VARCHAR(MAX), CONVERT (VARBINARY(16), @clientId), 1);

-- Construct command: CREATE USER [@principal_name] WITH SID = @castClientId, TYPE = E;
DECLARE @cmd NVARCHAR(MAX) = N'CREATE USER [' + @principal_name + '] WITH SID = ' + @castClientId + ', TYPE = E;'
EXEC (@cmd);
```

The following example creates a database user for the Microsoft Entra group, named `HR`, setting the SID of the new user to the object ID of the group.

```sql
DECLARE @group_name SYSNAME = 'HR';
DECLARE @objectId UNIQUEIDENTIFIER = '<unique identifier sid>'; -- principal's object ID in Microsoft Entra

-- Convert the guid to the right type
DECLARE @castObjectId NVARCHAR(MAX) = CONVERT(VARCHAR(MAX), CONVERT (VARBINARY(16), @objectId), 1);

-- Construct command: CREATE USER [@groupName] WITH SID = @castObjectId, TYPE = X;
DECLARE @cmd NVARCHAR(MAX) = N'CREATE USER [' + @group_name + '] WITH SID = ' + @castObjectId + ', TYPE = X;'
EXEC (@cmd);
```

## Limitations

- Microsoft Entra ID is the only identity provider SQL database in Fabric supports. Specifically, SQL authentication isn't supported.
- Logins (server principals) aren't supported.
- Currently, the only supported connection policy for SQL database in Microsoft Fabric is **Default**. For more information, see [Connection policy](limitations.md#connection-policy).

## Related content

- [CREATE USER (Transact-SQL)](/sql/t-sql/statements/create-user-transact-sql?view=fabric-sqldb&preserve-view=true)
- [ALTER USER (Transact-SQL)](/sql/t-sql/statements/alter-user-transact-sql?view=fabric-sqldb&preserve-view=true)
- [DROP USER (Transact-SQL)](/sql/t-sql/statements/drop-user-transact-sql?view=fabric-sqldb&preserve-view=true)
- [Create a database user](/sql/relational-databases/security/authentication-access/create-a-database-user?view=fabric-sqldb&preserve-view=true)
- [Microsoft Entra logins and users with nonunique display names (preview)](/azure/azure-sql/database/authentication-microsoft-entra-create-users-with-nonunique-names?view=fabricsql&preserve-view=true)
- [Authorization in SQL database in Microsoft Fabric](authorization.md)
- [Connect to your SQL database in Microsoft Fabric](connect.md)
