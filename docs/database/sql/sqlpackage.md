---
title: "SqlPackage for SQL database "
description: Learn how to work with SqlPackage in your SQL database with Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: drskwier, antho, sukkaur
ms.date: 08/08/2025
ms.topic: how-to
ms.custom: sfi-image-nochange, sfi-ropc-nochange
ms.search.form:
---
# SqlPackage for SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, you learn how to work with SqlPackage in your [SQL database in Fabric](overview.md).

[SqlPackage](/sql/tools/sqlpackage/sqlpackage) is a CLI providing *database portability* and *database deployments*.

- The portability (import/export) of a database managed in Azure or in Fabric ensures your data is portable to other platforms should you want to migrate later on.
   - Portability includes movement to and from SQL Server, Azure SQL Database, Azure SQL Managed Instance, and SQL database in Fabric through self-contained database copies (`.bacpac` or `.dacpac` files).

SqlPackage can also enable easy database deployments of incremental changes to database objects (new columns in tables, alterations to existing stored procedures, etc.).

 - SqlPackage can extract a `.dacpac` file containing the definitions of objects in a database, and publish a `.dacpac` file to apply that object state to a new or existing database.
 - The publish operation also integrates with SQL projects, which enables offline and more dynamic development cycles for SQL databases.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Create a new workspace or use an existing Fabric workspace.
- Create or use an existing SQL database in Fabric. If you don't have one already, [create a new SQL database in Fabric](create.md).
- Install the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).

## Setup

SqlPackage is available for Windows, macOS, and Linux as a dotnet tool. You can install it using the following command:

```bash
dotnet tool install --global Microsoft.SqlPackage
```

As a global dotnet tool, SqlPackage is available in your terminal as `sqlpackage` from any folder.

## Import a database with SqlPackage

A `.bacpac` is a portable copy of a database, useful for some migration and testing scenarios. You can **import** that `.bacpac` into an empty SQL database with [SqlPackage import](/sql/tools/sqlpackage/sqlpackage-import).

> [!NOTE]
> A `.bacpac` isn't a backup or a replacement for backup/restore capabilities. For more information about backups for SQL database in Fabric, see [Automatic backups in SQL database in Microsoft Fabric](backup.md) and [Restore from a backup in SQL database in Microsoft Fabric](restore.md).

1. If using a `.bacpac` from an Azure or SQL Server environment, you might need to alter the source database to meet the [SQL database in Fabric T-SQL surface area](limitations.md). See [extract and publish portability](#extract-and-publish-portability) for an alternative method that enables SqlPackage properties to skip some unsupported objects.
1. [Create your new SQL database in Fabric](create.md) as usual through the Fabric interface.
1. Copy the connection string from settings.

    :::image type="content" source="media/sqlpackage/connection-strings.png" alt-text="Screenshot from the Fabric portal showing the Connection strings page of the SQL database." lightbox="media/sqlpackage/connection-strings.png":::

1. Use the import command from terminal in the sqlpackage folder. Provide your owner `<servername>` and `<database_name>`.

    ```bash
    sqlpackage /action:import /sourcefile:"C:\DatabaseName.bacpac" /targetconnectionstring:"Data Source=tcp:<server_name>.database.fabric.microsoft.com,1433;Initial Catalog=<database_name>;MultipleActiveResultSets=False;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ConnectRetryCount=6;ConnectRetryInterval=10;Authentication=Active Directory Interactive"
    ```

    - Replace your connection string from the SQL database settings dialog.
    - Replace the `sourcefile` value with the `.bacpac` name (`DatabaseName`) and `location` on your local machine.

1. Follow the import with a [Copy job](../../data-factory/what-is-copy-job.md) in Data Factory in Microsoft Fabric. To get started, see [Quickstart: Create a Copy job](../../data-factory/quickstart-copy-job.md).

## Export a database with SqlPackage

Exporting a `.bacpac` is the reverse operation, where your `targetfile` is a `.bacpac` and your `sourceconnectionstring` can be found in the SQL database settings dialog, as in the previous example. Provide your owner `<servername>` and `<database_name>`. For example:

```bash
sqlpackage /action:export /targetfile:"C:\DatabaseName.bacpac" /sourceconnectionstring:"Data Source=tcp:<server_name>.database.fabric.microsoft.com,1433;Initial Catalog=<database_name>;MultipleActiveResultSets=False;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ConnectRetryCount=6;ConnectRetryInterval=10;Authentication=Active Directory Interactive"
```

For more information on export, see [SqlPackage export](/sql/tools/sqlpackage/sqlpackage-export).

## Extract and publish

:::image type="content" source="media/sqlpackage/sql-database-project-diagram.png" alt-text="Diagram of how SQL database projects can move schema changes.":::

A `.dacpac` is a database schema model file, containing definitions for the tables, stored procedures, and other objects in the source database. This file can be created from an existing database with SqlPackage or from a [SQL database project](/sql/tools/sql-database-projects/sql-database-projects).

SqlPackage is capable of deploying a `.dacpac` to a new (empty) database or incrementally updating an existing database to match the desired `.dacpac` state.

- **Extract** creates a `.dacpac` or sql files from an existing database.
- **Publish** deploys a `.dacpac` to a database.

The SqlPackage [publish](/sql/tools/sqlpackage/sqlpackage-publish) and [extract](/sql/tools/sqlpackage/sqlpackage-extract) syntax is similar to the import/export commands.

> [!WARNING]
> Using SqlPackage to deploy a SQL project or `.dacpac` to SQL database in Fabric is recommended. Deploying a `.dacpac` from Visual Studio may be unsuccessful.

To deploy a `.dacpac` that was created from Azure SQL Database, SQL Server, or a SQL project targeting a platform other than SQL database in Fabric, append the property `/p:AllowIncompatiblePlatform=true` to the SqlPackage publish command.

## Extract and publish portability

While the SqlPackage import/export commands are focused on data portability with the `.bacpac` format, the extract and publish commands are capable of data portability with the `.dacpac` format.  Extract and publish properties can be used to control the behavior of the extract and publish operations and provide more flexibility for conversions between platforms.

To **extract** a `.dacpac` and include the data, use the `/p:ExtractAllTableData=true` property. The extract operation creates a `.dacpac` that contains both the schema and the data from the source database. The property `/p:ExtractReferencedServerScopedElements=false` excludes server-scoped elements, which aren't supported in SQL database in Fabric. The following command extracts a `.dacpac` with data from an existing SQL database in Fabric:

```bash
sqlpackage /action:extract /sourceconnectionstring:"Data Source=tcp:<server_name>.database.fabric.microsoft.com,1433;Initial Catalog=<database_name>;MultipleActiveResultSets=False;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ConnectRetryCount=6;ConnectRetryInterval=10;Authentication=Active Directory Interactive" /targetfile:"C:\extracted.dacpac" /p:ExtractAllTableData=true  /p:ExtractReferencedServerScopedElements=false
```

To **publish** a `.dacpac` that was extracted with the data, no extra properties are required. However, several properties can be used to control the behavior of the publish operation:

- `/p:AllowIncompatiblePlatform=true` allows the deployment of a `.dacpac` that was extracted from a different platform (for example, Azure SQL Database, SQL Server).
- `/p:ExcludeObjectTypes=Logins;Users` excludes object types that may experience compatibility problems when publishing to SQL database in Fabric. For a complete list of object types that can be excluded, see [SqlPackage publish](/sql/tools/sqlpackage/sqlpackage-publish#properties-specific-to-the-publish-action).

Similarly to the SqlPackage import command, before publishing a `.dacpac` to SQL database in Fabric, you need to create the database in Fabric. You can create the database through the Fabric portal or other Fabric interface. The following command publishes the extracted `.dacpac` to an empty SQL database in Fabric:

```bash
sqlpackage /action:publish /sourcefile:"C:\extracted.dacpac" /targetconnectionstring:"Data Source=tcp:<server_name>.database.fabric.microsoft.com,1433;Initial Catalog=<database_name>;MultipleActiveResultSets=False;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ConnectRetryCount=6;ConnectRetryInterval=10;Authentication=Active Directory Interactive" /p:AllowIncompatiblePlatform=true /p:ExcludeObjectTypes=Logins;Users
```

## Related content

- [SQL database in Microsoft Fabric](overview.md)
- [Tutorial: Lifecycle management in Fabric](../../cicd/cicd-tutorial.md)
- [SQL projects overview](/sql/tools/sql-database-projects/sql-database-projects)
- [SQL database source control integration](source-control.md)
- [Microsoft Fabric Migration Overview](../../fundamentals/migration.md)
