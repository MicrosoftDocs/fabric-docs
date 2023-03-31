---
title: Query a warehouse using SSMS
description: Follow steps to query a warehouse with SSMS.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/15/2023
---

# Query a warehouse using SQL Server Management Studio (SSMS)

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

To get started, you must complete the following prerequisites:

- [Download SSMS](/sql/ssms/download-sql-server-management-studio-ssms) (use the latest version available)
- Have access to a warehouse item within a premium per capacity workspace with contributor or above permissions
- Have a warehouse connected to SSMS via T-SQL connection string. For more information, see [Connectivity](connectivity.md).

The following steps detail how to execute a variety of simple and complex SQL queries in SSMS when connected to a warehouse. See [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a listing of unsupported T-SQL commands.

## Run a SELECT Top 1000 Rows from Object Explorer

1. After successfully connecting to SSMS via your T-SQL end-point, expand your database and tables folder in the **Object Explorer** to see all tables listed.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\object-explorer-connect.png" alt-text="Screenshot of where the Connect option appears on the Object Explorer ribbon." lightbox="media\query-warehouse-sql-server-management-studio\object-explorer-connect.png":::

1. Right-click on the table that you would like to query and select **SELECT Top 1000 Rows**.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\context-menu-select-top.png" alt-text="Screenshot showing where to select the Select Top 1000 Rows option in the right-click menu." lightbox="media\query-warehouse-sql-server-management-studio\context-menu-select-top.png":::

1. Once the script is automatically generated, select the **Execute** button to run the script and see the results.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\execute-button.png" alt-text="Screenshot showing where to find the Execute button." lightbox="media\query-warehouse-sql-server-management-studio\execute-button.png":::

## Run a new query based on a warehouse connection

1. To open a tab to write a new query, locate the warehouse, and right-click to select **New Query**.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\context-menu-new-query.png" alt-text="Screenshot showing where to select New Query in the context menu." lightbox="media\query-warehouse-sql-server-management-studio\context-menu-new-query.png":::

1. A new tab appears for you to write a SQL query.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\new-query-tab.png" alt-text="Screenshot of a new query tab." lightbox="media\query-warehouse-sql-server-management-studio\new-query-tab.png":::

## Write a cross-database SQL Query

There are several ways you can write cross-database queries within the same [!INCLUDE [product-name](../includes/product-name.md)] workspace, in this section we explore three examples.

1. Select the database. Using the `USE [database name]` statement, you can reference the table directly within your database and query another's database using three-part naming. In the following example, you are in the context of the database with the Affiliation table.

   ```sql
   SELECT * 
   FROM ContosoLakehouse.dbo.ContosoSalesTable AS Contoso
   JOIN Affiliation
   ON Affiliation.AffiliationId = Contoso.RecordTypeID;
   ```

1. Using three-part naming to reference the databases/tables, you can join multiple databases.

   ```sql
   SELECT * 
   FROM ContosoLakehouse.dbo.ContosoSalesTable AS Contoso
   JOIN My_lakehouse.dbo.Affiliation
   ON My_lakehouse.dbo.Affiliation.AffiliationId = Contoso.RecordTypeID;
   ```

1. For more efficient and longer queries, you can use aliases

   ```sql
   SELECT * 
   FROM ContosoLakehouse.dbo.ContosoSalesTable AS Contoso
   JOIN My_lakehouse.dbo.Affiliation as MyAffiliation
   ON MyAffiliation.AffiliationId = Contoso.RecordTypeID;
   ```

1. Using three-part naming to reference the database and tables, you can insert data from one database to another.

   ```sql
   INSERT INTO ContosoWarehouse.dbo.Affiliation
   SELECT * 
   FROM My_Lakehouse.dbo.Affiliation;
   ```

## Known limitations

- Currently, we have not fully optimized warehouse performance to support large amounts of data. When running queries in the current version, limit the size of total data to be queried to 1 TB uncompressed.

   > [!NOTE]
   > Uncompressed data size should be calculated from a CSV representation of the data. Source data stored in parquet (or delta) format is already compressed anywhere from 2x to 10x (or more).

- At this time, there's limited T-SQL functionality in the warehouse. See [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.

## Next steps

- [Statistics](statistics.md)
