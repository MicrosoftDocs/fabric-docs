---
title: "Create a SQL database in the Fabric portal"
description: Learn how to create a SQL database in Microsoft Fabric in the Fabric portal.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, sukkaur, dlevy
ms.date: 01/16/2025
ms.topic: how-to
ms.search.form: product-databases, Get Started, Databases Get Started for SQL
---
# Create a SQL database in the Fabric portal

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, create a new [SQL database in Fabric](overview.md).

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
    - Make sure that you [Enable SQL database in Fabric using Admin Portal tenant settings](enable.md). If you don't, you receive an error message "SQL database failed to create."
- You can use an existing workspace or [create a new Fabric workspace](../../fundamentals/workspaces.md).
- You must be a member of the [Admin or Member roles for the workspace](../../fundamentals/give-access-workspaces.md) to create a SQL database. 

## Create new SQL database in Fabric

1. In the Fabric portal, select **Databases**.
1. Under **New**, select the tile for **SQL database**.
1. Provide a name for the **New Database**. Select **Create**.
1. When the new database is provisioned, on the **Home** page for the database, notice the **Explorer** pane showing database objects.
1. Under **Build your database**, three useful tiles can help you get your newly created database up and running.
   - **Sample data** option lets you import a sample data into your **Empty** database.
   - **T-SQL** option gives you a web-editor that can be used to write T-SQL to create database object like schema, tables, views, and more. For users who are looking for code snippets to create objects, they can look for available samples in **Templates** drop down list at the top of the menu.
   - **Connection strings** option shows the SQL database connection string that is required when you want to [connect](connect.md) using [SQL Server Management Studio](https://aka.ms/ssms), [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), or other external tools.
1. Consider adding your new database to source control. For more information, see [SQL database source control integration in Microsoft Fabric](source-control.md#add-the-fabric-sql-database-to-source-control).

## Next step

> [!div class="nextstepaction"]
> [Load AdventureWorks sample data in your SQL database](load-adventureworks-sample-data.md)

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
- [Ingest data into SQL database via pipelines](load-data-pipelines.md)
- [Options to create a SQL database in the Fabric portal](create-options.md)