---
title: Query the SQL Endpoint or Synapse Data Warehouse in Microsoft Fabric
description: Learn more about options to write TSQL queries on the SQL Endpoint or Synapse Data Warehouse in Microsoft Fabric.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf, kecona
ms.date: 04/12/2023
ms.topic: how-to
---
# Query the SQL Endpoint or Synapse Data Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

To get started with this tutorial, check the following prerequisites:

- You should have access to a [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md) within a premium per capacity workspace with contributor or above permissions.
- Choose your querying tool. 
    - Use the [SQL query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal](sql-query-editor.md).
    - Use the [Visual query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal](visual-query-editor.md).

- Alternatively, you can use any of the below tools to connect to your [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md) via T-SQL connection string. For more information, see [Connectivity](connectivity.md).
    - [Download SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms).
    - [Download Azure Data Studio](https://aka.ms/azuredatastudio).

> [!NOTE]
> Review the [T-SQL surface area](warehouse.md#t-sql-surface-area) for [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

## Run a new query in **SQL query editor**

1. Open a **New SQL query** window. 

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\context-menu-new-query.png" alt-text="Screenshot showing where to select New Query in the context menu." lightbox="media\query-warehouse-sql-server-management-studio\context-menu-new-query.png":::

2. A new tab appears for you to write a SQL query.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\new-query-tab.png" alt-text="Screenshot of a new query tab." lightbox="media\query-warehouse-sql-server-management-studio\new-query-tab.png":::

## Run a new query in **Visual query editor**

1. Open a **New visual query** window.

  :::image type="content" source="media\query-warehouse-sql-server-management-studio\context-menu-new-query.png" alt-text="Screenshot showing where to select New Query in the context menu." lightbox="media\query-warehouse-sql-server-management-studio\context-menu-new-query.png":::

2. A new tab appears for you to create a visual query.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\new-query-tab.png" alt-text="Screenshot of a new query tab." lightbox="media\query-warehouse-sql-server-management-studio\new-query-tab.png":::

3. Drag and drop tables from **Object explorer** to **Visual query editor** window to create a query.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\new-query-tab.png" alt-text="Screenshot of a new query tab." lightbox="media\query-warehouse-sql-server-management-studio\new-query-tab.png":::

## Write a cross-database query

You can write cross database queries to databases in the current active workspace in [!INCLUDE [product-name](../includes/product-name.md)].

There are several ways you can write cross-database queries within the same [!INCLUDE [product-name](../includes/product-name.md)] workspace, in this section we explore three examples.

1. Add [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md) from your current active workspace to object Explorer using **+ Warehouses** action. When you select [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md) from the dialog, it gets added into the **Object Explorer** for referencing when writing a SQL query or creating Visual query.

2. You can reference the table from added databases using three-part naming. In the following example, you are using three-part naming to refer `ContosoSalesTable` from added database `ContosoLakehouse`.

   ```sql
   SELECT * 
   FROM ContosoLakehouse.dbo.ContosoSalesTable AS Contoso
   INNER JOIN Affiliation
   ON Affiliation.AffiliationId = Contoso.RecordTypeID;
   ```

3. Using three-part naming to reference the databases/tables, you can join multiple databases.

   ```sql
   SELECT * 
   FROM ContosoLakehouse.dbo.ContosoSalesTable AS Contoso
   INNER JOIN My_lakehouse.dbo.Affiliation
   ON My_lakehouse.dbo.Affiliation.AffiliationId = Contoso.RecordTypeID;
   ```

4. For more efficient and longer queries, you can use aliases.

   ```sql
   SELECT * 
   FROM ContosoLakehouse.dbo.ContosoSalesTable AS Contoso
   INNER JOIN My_lakehouse.dbo.Affiliation as MyAffiliation
   ON MyAffiliation.AffiliationId = Contoso.RecordTypeID;
   ```

5. Using three-part naming to reference the database and tables, you can insert data from one database to another.

   ```sql
   INSERT INTO ContosoWarehouse.dbo.Affiliation
   SELECT * 
   FROM My_Lakehouse.dbo.Affiliation;
   ```

6. You can drag and drop tables from added databases to **Visual query editor** to create a cross-database query.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\new-query-tab.png" alt-text="Screenshot of a new query tab." lightbox="media\query-warehouse-sql-server-management-studio\new-query-tab.png":::

## SELECT Top 100 Rows from Object Explorer

1. After opening your warehouse from the workspace, expand your database, schema and tables folder in the **Object Explorer** to see all tables listed.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\object-explorer-connect.png" alt-text="Screenshot of where the Connect option appears on the Object Explorer ribbon." lightbox="media\query-warehouse-sql-server-management-studio\object-explorer-connect.png":::

1. Right-click on the table that you would like to query and select **SELECT Top 100 rows**.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\context-menu-select-top.png" alt-text="Screenshot showing where to select the Select Top 1000 Rows option in the right-click menu." lightbox="media\query-warehouse-sql-server-management-studio\context-menu-select-top.png":::

1. Once the script is automatically generated, select the **Run** button to run the script and see the results.

   :::image type="content" source="media\query-warehouse-sql-server-management-studio\execute-button.png" alt-text="Screenshot showing where to find the Execute button." lightbox="media\query-warehouse-sql-server-management-studio\execute-button.png":::

## Known limitations

- At this time, there's limited T-SQL functionality. See [T-SQL surface area](warehouse.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.

## Next steps

- [SQL query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal](sql-query-editor.md)
- [Query using the Visual Query editor](visual-query-editor.md)
- [Transactions in Synapse Data Warehouse tables](transactions.md)
