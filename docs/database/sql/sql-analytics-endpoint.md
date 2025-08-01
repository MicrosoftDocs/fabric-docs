---
title: What is the SQL analytics endpoint for SQL database in Fabric?
description: Learn about the SQL analytics endpoint and how to run SQL queries directly on Fabric SQL database in Fabric tables.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala
ms.topic: conceptual
ms.date: 04/28/2025
---
# What is the SQL analytics endpoint for a SQL database in Fabric?

**Applies to:** [!INCLUDE [fabric-sqldb-se](../includes/applies-to-version/fabric-sqldb-se.md)]

Microsoft Fabric provides a SQL-based experience for SQL database in Fabric data [automatically replicated into the OneLake](mirroring-overview.md). This SQL-based experience is called the SQL analytics endpoint. You can analyze OneLake data in Delta tables using T-SQL language, save functions, generate views, and apply SQL security. 

To access SQL analytics endpoint, you select a corresponding item in the workspace view or switch to SQL analytics endpoint mode in SQL database in Fabric explorer.

Creating a SQL database in Fabric creates a SQL analytics endpoint, which points to the SQL database in Fabric Delta table storage. Once you create a transactional table in the SQL database in Fabric, it's available for querying using the SQL analytics endpoint. Using similar technology, a database, [warehouse](../../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse), and [Fabric OneLake](../../data-engineering/lakehouse-sql-analytics-endpoint.md) all automatically provision a SQL analytics endpoint when created.

:::image type="content" source="media\sql-analytics-endpoint\workspace.png" alt-text="Screenshot of SQL database in Fabric SQL analytics endpoint workspace.":::

## SQL analytics endpoint is read-only

The SQL analytics endpoint operates in read-only mode over SQL database in Fabric Delta tables. With the SQL analytics endpoint, T-SQL commands can define and query data objects but not manipulate or modify the data. You can create functions, views, and implement SQL object-level security to manage access and structure your data effectively. To modify data in SQL database directly in Fabric Delta tables in the OneLake, use Apache Spark.

External Delta tables created with Spark code won't be visible to the SQL analytics endpoint. Use shortcuts in Table space to make external Delta tables visible to the SQL analytics endpoint. To learn how to create a shortcut, see [OneLake shortcuts](../../onelake/onelake-shortcuts.md).

## Connect to the SQL analytics endpoint

You can connect to the SQL analytics endpoint via Power BI desktop or client tools such as [SQL Server Management Studio](https://aka.ms/ssms) or [the mssql extension for Visual Studio Code](/sql/tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code). The SQL analytics endpoint connection string looks like `<server-unique-identifier>.<tenant>.fabric.microsoft.com` as opposed to the connection string of the SQL database itself, which looks like `<server-unique-identifer>.database.windows.net`. To find the connection string of the SQL analytics endpoint in the workspace, select the `...` menu and then **Copy SQL connection string**, or find the connection string in **Settings** in the **SQL endpoint** page.

You can also query the SQL analytics endpoint in the [SQL query editor in the Fabric portal](query-editor.md) by selecting the **SQL analytics endpoint** from drop-down list, as shown in the following screenshot:

:::image type="content" source="media/sql-analytics-endpoint/sql-analytics-endpoint-selector.png" alt-text="Screenshot from the Fabric portal of the drop-down list selector of SQL database or SQL analytics endpoint.":::

For more information on connecting to your SQL database data, see [Connect to your SQL database in Microsoft Fabric](connect.md).

## Access control using SQL security

You can set object-level security for database users or database roles using ([workspace roles](authorization.md#workspace-roles) or [item permissions](authorization.md#item-permissions)) in the Fabric portal, or by using [GRANT](/sql/t-sql/statements/grant-transact-sql?view=fabric&preserve-view=true), [REVOKE](/sql/t-sql/statements/revoke-transact-sql?view=fabric&preserve-view=true), and [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true) Transact-SQL statements. These security rules will only apply for accessing data via SQL analytics endpoint. 

## Related content

- [What is the SQL analytics endpoint for a lakehouse?](../../data-engineering/lakehouse-sql-analytics-endpoint.md)
- [Authorization in SQL database in Microsoft Fabric](authorization.md)
