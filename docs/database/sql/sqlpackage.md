---
title: "SqlPackage for SQL database "
description: Learn how to work with SqlPackage in your SQL database with Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: drskwier, antho, sukkaur
ms.date: 10/07/2024
ms.topic: how-to
ms.custom:
  - ignite-2024
ms.search.form:
---
# SqlPackage for SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, you learn how to work with SqlPackage in your [SQL database in Fabric](overview.md).

[SqlPackage](/sql/tools/sqlpackage/sqlpackage) is a CLI providing *database portability* and *database deployments*.

- The portability (import/export) of a database managed in Azure or in Fabric ensures that your data is portable to other platforms, including SQL Server or Azure SQL Managed Instance, should you want to migrate later on.
- The same portability also enables certain migration scenarios through self-contained database copies (`.bacpac`) with import/export operations.

SqlPackage can also enable easy database deployments of incremental changes to database objects (new columns in tables, alterations to existing stored procedures, etc.).

 - SqlPackage can extract a `.dacpac` file containing the definitions of objects in a database, and publish a `.dacpac` file to apply that object state to a new or existing database.
 - The publish operation also integrates with SQL projects, which enables offline and more dynamic development cycles for SQL databases.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Make sure that you [Enable SQL database in Fabric tenant settings](enable.md).
- Create a new workspace or use an existing Fabric workspace.
- Create or use an existing SQL database in Fabric. If you don't have one already, [create a new SQL database in Fabric](create.md).
- Install the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).

## Setup

SqlPackage is available for Windows, macOS, and Linux as a dotnet tool. You can install it using the following command:

```cmd
dotnet tool install --global Microsoft.SqlPackage
```

As a global dotnet tool, SqlPackage is available in your terminal as `sqlpackage` from any folder.

## Import a database with SqlPackage

A `.bacpac` is a portable copy of a database, useful for some migration and testing scenarios. You can **import** that `.bacpac` into an empty SQL database.

> [!NOTE]
> A `.bacpac` is not a backup or a replacement for backup/restore capabilities. For more information about backups in Fabric SQL database, see [Automatic backups in SQL database in Microsoft Fabric](backup.md) and [Restore from a backup in SQL database in Microsoft Fabric](restore.md).

1. If using a `.bacpac` from your Azure SQL Database environment, you might need to alter the source database to meet the [Fabric SQL database T-SQL surface area](feature-comparison-sql-database-fabric.md).
1. [Create your new SQL database in Fabric](create.md) as usual through the Fabric interface.
1. Copy the connection string from settings.

    :::image type="content" source="media/sqlpackage/connection-strings.png" alt-text="Screenshot from the Fabric portal showing the Connection strings page of the SQL database." lightbox="media/sqlpackage/connection-strings.png":::

1. Use the import command from terminal in the sqlpackage folder. Provide your owner `<servername>` and `<database_name>`.

    ```cmd
    sqlpackage /action:import /sourcefile:"C:\DatabaseName.bacpac" /targetconnectionstring:"Data Source=tcp:<server_name>.database.fabric.microsoft.com,1433;Initial Catalog=<database_name>;MultipleActiveResultSets=False;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ConnectRetryCount=6;ConnectRetryInterval=10;Authentication=Active Directory Interactive"
    ```

    - Replace your connection string from the SQL database settings dialog.
    - Replace the `sourcefile` value with the `.bacpac` name (`DatabaseName`) and `location` on your local machine.

For more information on import, see [SqlPackage import](/sql/tools/sqlpackage/sqlpackage-import).

## Export a database with SqlPackage

Exporting a `.bacpac` is the reverse operation, where your `targetfile` is a `.bacpac` and your `sourceconnectionstring` can be found in the SQL database settings dialog, as in the previous example. Provide your owner `<servername>` and `<database_name>`. For example:

```cmd
sqlpackage.exe /action:export /targetfile:"C:\DatabaseName.bacpac" /sourceconnectionstring:"Data Source=tcp:<server_name>.database.fabric.microsoft.com,1433;Initial Catalog=<database_name>;MultipleActiveResultSets=False;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ConnectRetryCount=6;ConnectRetryInterval=10;Authentication=Active Directory Interactive"
```

For more information on export, see [SqlPackage export](/sql/tools/sqlpackage/sqlpackage-export).

## Extract and publish

:::image type="content" source="media/sqlpackage/sql-database-project-diagram.png" alt-text="Diagram of how SQL database projects can move schema changes.":::

A `.dacpac` is a database schema model file, containing definitions for the tables, stored procedures, and other objects in the source database. This file is can be created from an existing database with SqlPackage or from a [SQL database project](/sql/tools/sql-database-projects/sql-database-projects).

SqlPackage is capable of deploying a `.dacpac` to a new (empty) database or incrementally updating an existing database to match the desired `.dacpac` state.

- **Extract** creates a `.dacpac` or sql files from an existing database.
- **Publish** deploys a `.dacpac` to a database.

The SqlPackage [publish](/sql/tools/sqlpackage/sqlpackage-publish) and [extract](/sql/tools/sqlpackage/sqlpackage-extract) syntax is similar to the import/export commands.

> [!WARNING]
> Using SqlPackage to deploy a SQL project or `.dacpac` to SQL database in Fabric is recommended. Deploying a `.dacpac` from Visual Studio may be unsuccessful.

To deploy a `.dacpac` that was created from Azure SQL Database, SQL Server, or a SQL project targeting a platform other than SQL database in Fabric, append the property `/p:AllowIncompatiblePlatform=true` to the SqlPackage publish command.

## Related content

- [SQL database in Microsoft Fabric](overview.md)
- [Tutorial: Lifecycle management in Fabric](../../cicd/cicd-tutorial.md)
- [SQL projects overview](/sql/tools/sql-database-projects/sql-database-projects)
- [SQL database source control integration](source-control.md)
