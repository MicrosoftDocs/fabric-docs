---
title: Query the SQL analytics endpoint or Warehouse
description: Learn more about options to write TSQL queries on the SQL analytics endpoint or Warehouse in Microsoft Fabric.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf, kecona
ms.date: 11/15/2023
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.search.form: Query editor # This article's title should not change. If so, contact engineering.
---
# Query the SQL analytics endpoint or Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw-and-mirrored-db](includes/applies-to-version/fabric-se-and-dw-and-mirrored-db.md)]

To get started with this tutorial, check the following prerequisites:

- You should have access to a [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#synapse-data-warehouse) within a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace with contributor or higher permissions.
- Choose your querying tool.
    - Use the [SQL query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal](sql-query-editor.md).
    - Use the [Visual query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal](visual-query-editor.md).

- Alternatively, you can use any of these tools to connect to your [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#synapse-data-warehouse) via a T-SQL connection string. For more information, see [Connectivity](connectivity.md).
    - [Download SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms).
    - [Download Azure Data Studio](https://aka.ms/azuredatastudio).

> [!NOTE]
> Review the [T-SQL surface area](tsql-surface-area.md) for [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

## Run a new query in SQL query editor

1. Open a **New SQL query** window. 

   :::image type="content" source="media\query-warehouse\new-sql-query.png" alt-text="Screenshot showing where to select New SQL query in the ribbon." lightbox="media\query-warehouse\new-sql-query.png":::

1. A new tab appears for you to write a SQL query.

   :::image type="content" source="media\query-warehouse\sql-query-tab.png" alt-text="Screenshot of a new query tab in the SQL query editor the Fabric portal." lightbox="media\query-warehouse\sql-query-tab.png":::

1. Write a SQL query and run it.

   :::image type="content" source="media\query-warehouse\write-sql-query.png" alt-text="Screenshot of a writing a SQL query." lightbox="media\query-warehouse\write-sql-query.png":::

## Run a new query in Visual query editor

1. Open a **New visual query** window.

   :::image type="content" source="media\query-warehouse\new-visual-query.png" alt-text="Screenshot showing where to select New visual query in the ribbon." lightbox="media\query-warehouse\new-visual-query.png":::

1. A new tab appears for you to create a visual query.

   :::image type="content" source="media\query-warehouse\visual-query-tab.png" alt-text="Screenshot of a new query tab in the visual query editor of the Fabric portal." lightbox="media\query-warehouse\visual-query-tab.png":::

1. Drag and drop tables from the object **Explorer** to **Visual query editor** window to create a query.

   :::image type="content" source="media\query-warehouse\drag-drop-visual-query.png" alt-text="Screenshot of a creating a new visual query." lightbox="media\query-warehouse\drag-drop-visual-query.png":::

## Write a cross-database query

You can write cross database queries to databases in the current active workspace in [!INCLUDE [product-name](../includes/product-name.md)].

There are several ways you can write cross-database queries within the same [!INCLUDE [product-name](../includes/product-name.md)] workspace, in this section we explore examples. You can join tables or views to run cross-warehouse queries within current active workspace.  

1. Add [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#synapse-data-warehouse) from your current active workspace to object **Explorer** using **+ Warehouses** action. When you select [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#synapse-data-warehouse) from the dialog, it gets added into the object **Explorer** for referencing when writing a SQL query or creating Visual query.

   :::image type="content" source="media\query-warehouse\add-warehouses.png" alt-text="Screenshot showing how to use add warehouses in object explorer." lightbox="media\query-warehouse\add-warehouses.png":::

1. You can reference the table from added databases using three-part naming. In the following example, use the three-part name to refer to `ContosoSalesTable` in the added database `ContosoLakehouse`.

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

1. You can drag and drop tables from added databases to **Visual query editor** to create a cross-database query.

   :::image type="content" source="media\query-warehouse\cross-warehouse-query-visual-query-editor.png" alt-text="Screenshot of a cross-database query in visual query editor." lightbox="media\query-warehouse\cross-warehouse-query-visual-query-editor.png":::

## Select Top 100 Rows from the Explorer

1. After opening your warehouse from the workspace, expand your database, schema and tables folder in the object **Explorer** to see all tables listed.

1. Right-click on the table that you would like to query and select **Select TOP 100 rows**.

   :::image type="content" source="media\query-warehouse\select-top-100-rows.png" alt-text="Screenshot showing where to select the Select Top 100 Rows option in the right-click menu." lightbox="media\query-warehouse\select-top-100-rows.png":::

1. Once the script is automatically generated, select the **Run** button to run the script and see the results.

   :::image type="content" source="media\query-warehouse\select-top-run.png" alt-text="Screenshot showing results of select top 100 rows." lightbox="media\query-warehouse\select-top-run.png":::

> [!NOTE]
> At this time, there's limited T-SQL functionality. See [T-SQL surface area](tsql-surface-area.md) for a list of T-SQL commands that are currently not available.

## Next step

> [!div class="nextstepaction"]
> [Create reports on data warehousing in Microsoft Fabric](create-reports.md)
