---
title: "Authentication in SQL database"
description: Learn about authentication in SQL database in Fabric.
author: jaszymas
ms.author: jaszymas
ms.reviewer: wiassaf
ms.date: 10/16/2024
ms.topic: conceptual
ms.custom:
  - ignite-2024
---
# Authentication in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article explains authentication for SQL databases.

Like other Microsoft Fabric item types, SQL databases rely on [Microsoft Entra authentication](/entra/identity/authentication/overview-authentication).

To successfully authenticate to a SQL database, a Microsoft Entra user, a [service principal](/entra/identity-platform/app-objects-and-service-principals), or their [group](/entra/fundamentals/concept-learn-about-groups), must have the Read item permission for the database in Fabric. For information on how to grant a Microsoft Entra identity access to a Fabric workspace or a specific database, see [Fabric access controls](authorization.md#fabric-access-controls).

To find the connection string to your SQL database in Fabric, see [Connect to your SQL database in Microsoft Fabric](connect.md).

> [!NOTE]
> To enable [service principals](/entra/identity-platform/app-objects-and-service-principals) to connect to Fabric and to SQL databases, you also need to enable the [Service principals can use Fabric APIs](../../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis) Fabric tenant setting. To learn how to enable tenant settings, see [Fabric Tenant settings](../../admin/about-tenant-settings.md).

## Connect to a SQL database using Microsoft Entra authentication

You can connect to a database using Microsoft Entra authentication with:

- SQL tools that support Microsoft Entra authentication, including [SQL Server Management Studio](connect.md#connect-with-sql-server-management-studio-manually) and [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true).
- Applications that use SQL client drivers supporting Microsoft Entra authentication, including [SqlClient](/sql/connect/ado-net/sql/azure-active-directory-authentication), [JDBC](/sql/connect/jdbc/connecting-using-azure-active-directory-authentication), [ODBC](/sql/connect/odbc/using-azure-active-directory), and [OLE DB](/sql/connect/oledb/features/using-azure-active-directory).

Applications and tools must upgrade drivers to versions that support Microsoft Entra authentication and add an authentication mode keyword in their [SQL connection string](connect.md), like `ActiveDirectoryInteractive`, `ActiveDirectoryServicePrincipal`, or `ActiveDirectoryPassword`.

## Create database users for Microsoft Entra identities

If you plan to [configure SQL access controls with Transact-SQL](configure-sql-access-controls.md#configure-sql-controls-with-transact-sql), you first need to create [database users](/sql/relational-databases/security/contained-database-users-making-your-database-portable) corresponding to your Microsoft Entra users, service principals, or their groups.

Creating database users isn't required if you use [Fabric access controls](authorization.md#fabric-access-controls) ([workspace roles](authorization.md#workspace-roles) or [item permissions](authorization.md#item-permissions)).

For more information about database user management, see:

- [CREATE USER (Transact-SQL)](/sql/t-sql/statements/create-user-transact-sql?view=fabric&preserve-view=true) ([WITH EXTERNAL PROVIDER](/sql/t-sql/statements/create-user-transact-sql?view=fabric&preserve-view=true#microsoft_entra_principal)), [ALTER USER (Transact-SQL)](/sql/t-sql/statements/alter-user-transact-sql?view=fabric&preserve-view=true), and [DROP USER (Transact-SQL)](/sql/t-sql/statements/drop-user-transact-sql?view=fabric&preserve-view=true)
- [Create a database user](/sql/relational-databases/security/authentication-access/create-a-database-user)
- [Microsoft Entra logins and users with nonunique display names (preview)](/azure/azure-sql/database/authentication-microsoft-entra-create-users-with-nonunique-names?view=fabricsql&preserve-view=true)

## Private links

To configure [private links](../../security/security-private-links-overview.md) in Fabric, see [Set up and use private links](../../security/security-private-links-use.md).

## Limitations

- Microsoft Entra ID is the only identity provider SQL database in Fabric supports. Specifically, SQL authentication isn't supported.
- Logins (server principals) aren't supported.
- Only Microsoft Entra users can create database user objects (with [CREATE USER (Transact-SQL)](/sql/t-sql/statements/create-user-transact-sql?view=fabric&preserve-view=true)) corresponding to Microsoft Entra identities - Microsoft Entra service principals can't.

## Related content

- [Authorization in SQL database in Microsoft Fabric](authorization.md)
- [Connect to your SQL database in Microsoft Fabric](connect.md)
- [Private links in Microsoft Fabric](../../security/security-private-links-overview.md)
