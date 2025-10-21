---
title: "Load AdventureWorks sample data in your SQL database"
description: Learn how to load the AdventureWorks sample database in your Fabric SQL database with the Fabric portal.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 10/07/2024
ms.topic: how-to
ms.search.form: Ingesting data into SQL database
---
# Load AdventureWorks sample data in your SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, learn how to load the sample AdventureWorks data into a [SQL database in Fabric](overview.md).

SQL database in Fabric enables you to get started quickly with sample data by loading the `AdventureWorksLT` sample schema. This easy sample data load is only available in a brand new database. Once any objects are created in the database, the option disappears.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database](create.md) or use an existing SQL database.

## Load AdventureWorks sample data in the Fabric portal

Here are the steps to load the AdventureWorks sample data: 

1. Once the new database is created, open the database's home page. Select **Sample Data**.
1. You'll see a **Loading Sample Data** notification.
    - Don't modify the database while the import is in process.
1. Once complete, there's a notification. The object explorer also refreshes to show the new `SalesLT` schema. You're now ready to get started with the `AdventureWorksLT` sample database.
1. Expand the `SalesLT` schema in the **Object Explorer** to see the objects that were created. Select on any of the tables to quickly view the data. 
   - For more options, like select top 100 rows or to script an object out, right-click or select the context menu (`...`) of the object name.

## Next step

> [!div class="nextstepaction"]
> [Create a table in SQL database](create-table.md)

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
- [Ingest data into SQL database via pipelines](load-data-pipelines.md)
