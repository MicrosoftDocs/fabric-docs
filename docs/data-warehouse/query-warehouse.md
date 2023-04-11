---
title: Query the SQL Endpoint or Synapse Data Warehouse in Microsoft Fabric
description: Learn more about options to write TSQL queries on the SQL Endpoint or Synapse Data Warehouse in Microsoft Fabric.
ms.reviewer: wiassaf, kecona
ms.author: salilkanade
author: salilkanade
ms.topic: how-to
ms.date: 03/31/2023
---
# Query the SQL Endpoint or Synapse Data Warehouse

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

To get started with this tutorial, check the following prerequisites:

- You should have access to a [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md) within a premium per capacity workspace with contributor or above permissions.
- Connect to your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] via T-SQL connection string. For more information, see [Connectivity](connectivity.md).
- Choose your querying tool. This article provides examples in SQL Server Management Studio (SSMS).
    - [Download SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms).
    - [Download Azure Data Studio](https://aka.ms/azuredatastudio).
    - Use the [SQL query editor in the Fabric portal](sql-query-editor.md).
    - Use the [Query using the Visual Query editor](visual-query-editor.md).

> [!NOTE]
> Review the [T-SQL surface area](warehouse.md#t-sql-surface-area) for [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

## Run a new query on a connection in SSMS

1. Open a **New Query** window. For example, in SSMS **Object Explorer**.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\context-menu-new-query.png" alt-text="Screenshot showing where to select New Query in the context menu." lightbox="media\query-warehouse-sql-server-management-studio\context-menu-new-query.png":::

1. A new tab appears for you to write a SQL query.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\new-query-tab.png" alt-text="Screenshot of a new query tab." lightbox="media\query-warehouse-sql-server-management-studio\new-query-tab.png":::

## Write a cross-database SQL Query

Currently, you can write cross database queries to databases in the same workspaces in [!INCLUDE [product-name](../includes/product-name.md)].

There are several ways you can write cross-database queries within the same [!INCLUDE [product-name](../includes/product-name.md)] workspace, in this section we explore three examples.

1. Select the database. Using the `USE [database name]` statement, you can reference the table directly within your database and query another's database using three-part naming. In the following example, you are in the context of the database with the `Affiliation` table.

   ```sql
   SELECT * 
   FROM ContosoLakehouse.dbo.ContosoSalesTable AS Contoso
   INNER JOIN Affiliation
   ON Affiliation.AffiliationId = Contoso.RecordTypeID;
   ```

1. Using three-part naming to reference the databases/tables, you can join multiple databases.

   ```sql
   SELECT * 
   FROM ContosoLakehouse.dbo.ContosoSalesTable AS Contoso
   INNER JOIN My_lakehouse.dbo.Affiliation
   ON My_lakehouse.dbo.Affiliation.AffiliationId = Contoso.RecordTypeID;
   ```

1. For more efficient and longer queries, you can use aliases.

   ```sql
   SELECT * 
   FROM ContosoLakehouse.dbo.ContosoSalesTable AS Contoso
   INNER JOIN My_lakehouse.dbo.Affiliation as MyAffiliation
   ON MyAffiliation.AffiliationId = Contoso.RecordTypeID;
   ```

1. Using three-part naming to reference the database and tables, you can insert data from one database to another.

   ```sql
   INSERT INTO ContosoWarehouse.dbo.Affiliation
   SELECT * 
   FROM My_Lakehouse.dbo.Affiliation;
   ```

## SELECT Top 1000 Rows from Object Explorer in SSMS

1. After successfully connecting to SSMS via your T-SQL end-point, expand your database and tables folder in the **Object Explorer** to see all tables listed.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\object-explorer-connect.png" alt-text="Screenshot of where the Connect option appears on the Object Explorer ribbon." lightbox="media\query-warehouse-sql-server-management-studio\object-explorer-connect.png":::

1. Right-click on the table that you would like to query and select **SELECT Top 1000 Rows**.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\context-menu-select-top.png" alt-text="Screenshot showing where to select the Select Top 1000 Rows option in the right-click menu." lightbox="media\query-warehouse-sql-server-management-studio\context-menu-select-top.png":::

1. Once the script is automatically generated, select the **Execute** button to run the script and see the results.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\execute-button.png" alt-text="Screenshot showing where to find the Execute button." lightbox="media\query-warehouse-sql-server-management-studio\execute-button.png":::

## Known limitations

- Currently, we have not fully optimized warehouse performance to support large amounts of data. When running queries in the current version, limit the size of total data to be queried to 1 TB uncompressed.

   > [!NOTE]
   > Uncompressed data size should be calculated from a CSV representation of the data. Source data stored in parquet (or delta) format is already compressed anywhere from 2x to 10x (or more).

- At this time, there's limited T-SQL functionality. See [T-SQL surface area](warehouse.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.

## Next steps

- [SQL query editor in the Fabric portal](sql-query-editor.md)
- [Query using the Visual Query editor](visual-query-editor.md)
- [Transactions in Synapse Data Warehouse tables](transactions.md)