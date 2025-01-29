---
title: "Connect to your SQL database"
description: Learn about options to connect to your SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, sukkaur
ms.date: 01/16/2025
ms.topic: how-to
ms.custom:
  - ignite-2024
ms.search.form: product-databases
---
# Connect to your SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

You can connect to and query your [SQL database in Fabric](overview.md) in all the same ways as [Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview?view=azuresqldb-current&preserve-view=true).

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Create or use an existing SQL database in Fabric.
    - If you don't have one already, [create a new SQL database in Fabric](create.md).
<!--    - During the current preview, we recommend using a copy of one of your existing databases or any existing test or development database that you can recover quickly from a backup. If you want to use a database from an existing backup, see [Restore a database from a backup in Azure SQL Database](/azure/azure-sql/database/recovery-using-backups). -->

## Query editor in the Fabric portal

You can connect to the SQL database using the [web-based editor in the Fabric portal](query-editor.md).

The web-based editor for SQL database in Fabric provides a foundational object explorer and query execution interface. The integrated **Explorer** menu lists all database objects.

A new SQL database in Fabric will automatically open into the web editor and an existing database can be opened in the web editor by selecting it in Fabric.

## Find SQL connection string

In [!INCLUDE [product-name](../../includes/product-name.md)], the SQL analytics endpoint and SQL database are accessible through a Tabular Data Stream, or TDS endpoint, familiar to all modern web applications that interact with [a SQL Server TDS endpoint](/sql/relational-databases/security/networking/tds-8). This is referred to as the SQL connection string within the [!INCLUDE [product-name](../../includes/product-name.md)] user interface.

To find the SQL connection string for your **Fabric SQL database**:

- Go to the settings of your SQL database item. 
- Or, in the item list, select the `...` menu, select **Settings** then **Connection strings**. Fabric provides complete connection strings for providers including ADO.NET, JDBC, ODBC, PHP, and Go.
- Or, select the **Open in** button and **SQL Server Management Studio**. The server connection information is displayed.

To find the SQL connection string for the **SQL analytics endpoint** of your Fabric SQL database:

- Go to the settings of your SQL database item, then select **SQL endpoint**.
- Or, select the `...` menu, then select **Copy SQL connection string**.

## Open in button to connect

You can easy connect to your SQL database with the **Open in** button in the Fabric portal [query editor](query-editor.md). Choose [SQL Server Management Studio](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true).

:::image type="content" source="media/connect/open-in-connect-button.png" alt-text="Screenshot from the Fabric portal query editor showing the Open in button for easy connections with SSMS or the mssql extension in VS Code.":::

## Connect with SQL Server Management Studio manually

In [SQL Server Management Studio (SSMS)](https://aka.ms/ssms):

1. From your workspace area in the **Database** workload of Fabric, select the `...` next to your SQL database.
1. Select **Settings**.
1. Select **Connection strings**. Look for [the connection string to your SQL database](#find-sql-connection-string), including the `Data Source=`. For example, `tcp:<servername>.database.fabric.microsoft.com,1433`. The `Initial Catalog=` is the database name.
1. In SSMS, open a **New connection**.
1. Copy and paste the value from `Data Source=` into the **Server name**.
1. Choose **Authentication** type: **Microsoft Entra ID - Universal with MFA support**.
1. Select **Options<<**.
1. Copy and paste the value from `Initial Catalog=` into the **Connect to database** text box.
1. Select **Connect**.
1. Sign in using **Microsoft Entra ID - Universal with MFA support**.

## Connect with sqlcmd

You can connect to your SQL database in Fabric with [sqlcmd](/sql/tools/sqlcmd/sqlcmd-utility?view=fabric&preserve-view=true), just like any other SQL Database Engine product. [Use Microsoft Entra ID authentication](/sql/tools/sqlcmd/sqlcmd-authentication?view=fabric&preserve-view=true) with the `G` option. The Microsoft Entra authentication (`-G`) require at least version 13.1.

In the following example, replace `<server name>` with the long string of unique text that represents your SQL database in Fabric.

```cmd
sqlcmd -S <your_server>.database.fabric.microsoft.com;1433 -G -d <your_database> -i ./script.sql
```

## Connect with bcp utility

You can connect to your SQL database in Fabric with the [bcp utility](/sql/tools/bcp-utility?view=fabric&preserve-view=true), just like any other SQL Database Engine product. Use Microsoft Entra ID authentication with the `-G` option.

In the following example, replace `<server name>` with the long string of unique text that represents your SQL database in Fabric.

```cmd
bcp bcptest in "c:\temp\sample.dat" -S <your_server>.database.fabric.microsoft.com;1433 -d testdb -G -c
```

## Related content

- [Authentication in SQL database in Microsoft Fabric](authentication.md)
- [Authorization in SQL database in Microsoft Fabric](authorization.md)
- [SQL database in Microsoft Fabric](overview.md)
- [Private links in Microsoft Fabric](../../security/security-private-links-overview.md)
- [Ingest data into SQL database via data pipelines](load-data-pipelines.md)
