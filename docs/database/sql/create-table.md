---
title: "Create a table in SQL database"
description: Learn how to create a table in SQL database in Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 11/01/2024
ms.topic: how-to
ms.search.form: Ingesting data into SQL database
---
# Create a table in SQL database in Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

There are many ways to create a table in Fabric SQL database. The primary choices in Fabric include using the SQL editor to create a table, creating a table on load using Fabric Data Flows, or Fabric pipelines. For this walkthrough, we use the Fabric portal's query editor for Fabric SQL database.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Make sure that you [Enable SQL database in Fabric using Admin Portal tenant settings](enable.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database](create.md) or use an existing SQL database.

## Creating a table with T-SQL queries

1. Open your SQL database.
1. Select the **New Query** button in the main ribbon.
1. Create the definition of your table in T-SQL with the help of intellisense, or use this sample:

    ```sql
    CREATE TABLE dbo.products ( 
    product_id INT IDENTITY(1000,1) PRIMARY KEY, 
    product_name VARCHAR(256), 
    create_date DATETIME2 
    ) 
    ```

1. Once you have a table design you like, select **Run** in the toolbar of the query window.
1. If the **Object Explorer** is already expanded to show tables, it will automatically refresh to show the new table upon create. If not, expand the tree to see the new table.

### Creating a table with Copilot

1. Open your SQL database.
1. Select the **New Query** button in the main ribbon.
1. Type in the following text as a T-SQL comment into the query window and press **Tab** on your keyboard:

    ```sql 
    --create a new table that to store information about products with some typical columns and a monotonistically increasing primary key called ProductID 
    ``` 

1. After a few seconds, Copilot will generate a suggested T-SQL script based on the prompt. 
1. Press the **Tab** key again to accept Copilot's suggestion. It should look something like this:

    ```sql
    --create a new table that to store information about products with some typical columns and a monotonistically increasing primary key called ProductID 
    CREATE TABLE [dbo].[ProductInformation] ( 
    -- Primary Key for the ProductInformation table 
    [ProductID] INT IDENTITY(1,1) PRIMARY KEY, 
    -- Name of the product 
    [ProductName] VARCHAR(100) NOT NULL, 
    -- Description of the product 
    [Description] VARCHAR(MAX), 
    -- Brand of the product 
    [Brand] VARCHAR(50), 
    -- List price of the product 
    [ListPrice] DECIMAL(10, 2), 
    -- Sale price of the product 
    [SalePrice] DECIMAL(10, 2), 
    -- Item number of the product 
    [ItemNumber] VARCHAR(20), 
    -- Global Trade Item Number of the product 
    [GTIN] VARCHAR(20), 
    -- Package size of the product 
    [PackageSize] VARCHAR(50), 
    -- Category of the product 
    [Category] VARCHAR(50), 
    -- Postal code related to the product 
    [PostalCode] VARCHAR(10), 
    -- Availability of the product 
    [Available] BIT, 
    -- Embedding data of the product 
    [Embedding] VARBINARY(MAX), 
    -- Timestamp when the product was created 
    [CreateDate] DATETIME 
    );
    ``` 

1. Review and edit Copilot's suggested T-SQL to better fit your needs.
1. Once you have a table design you like, select **Run** in the toolbar of the query window.
1. If the **Object Explorer** is already expanded to show tables, it will automatically refresh to show the new table upon create. If not, expand the tree to see the new table.
 
## Next step

> [!div class="nextstepaction"]
> [Query your SQL database in Fabric](query.md)

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
