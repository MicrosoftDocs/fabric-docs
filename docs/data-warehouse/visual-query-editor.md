---
title: Query using the visual query editor
description: Learn how to use the visual query editor for a no-code experience to create your queries.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 01/22/2024
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Query editor # This article's title should not change. If so, contact engineering.
---
# Query using the visual query editor

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article describes how to use the visual query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal to quickly and efficiently write queries. You can use the visual query editor for a no-code experience to create your queries.

- You can also [query the data](query-warehouse.md) in your warehouse with multiple tools with a [SQL connection string](connectivity.md).
- You can use the [SQL query editor](sql-query-editor.md) to write T-SQL queries from the [!INCLUDE [product-name](../includes/product-name.md)] portal.
- You can quickly [view data in the Data preview](data-preview.md).

## Visual query editor in the Fabric portal

The visual query editor provides an easy visual interface to write queries against the data in your warehouse.

Once you've loaded data into your warehouse, you can use the visual query editor to create queries to analyze your data. There are two ways to get to the visual query editor:

In the ribbon, create a new query using the **New visual query** button, as shown in the following image.

:::image type="content" source="media\visual-query-editor\new-visual-query.png" alt-text="Screenshot showing where to find the New query menu in the Data preview view." lightbox="media\visual-query-editor\new-visual-query.png":::

To create a query, drag and drop tables from the **Object explorer** on the left onto the canvas. Once you drag one or more tables onto the canvas, you can use the visual experience to design your queries. The warehouse editor uses the Power Query diagram view experience to enable you to easily query and analyze your data. Learn more about [Power Query diagram view](/power-query/diagram-view).

As you work on your visual query, the queries are automatically saved every few seconds. A "saving indicator" appears in your query tab to indicate that your query is being saved. All workspace users can save their queries in **My queries** folder. However, users in viewer role of the workspace or shared recipients of the warehouse are restricted from moving queries to **Shared queries** folder.

The following animated gif shows the merging of two tables using a no-code visual query editor. 

:::image type="content" source="media\visual-query-editor\visual-query-editor.gif" alt-text="Animation of the results of a sample query to merge two tables using the visual query editor." lightbox="media\visual-query-editor\visual-query-editor.gif":::

The steps shown in the gif are:

1. First, the table `DimCity` is dragged from the **Explorer** into the blank new visual query editor.
1. Then, the table `FactSale` is dragged from the **Explorer** into the visual query editor. 
1. In the visual query editor, in the content menu of `DimCity`, the **Merge queries as new** Power Query operator is used to join them on a common key.
1. In the new **Merge** page, the `CityKey` column in each table is selected to be the common key. The **Join kind** is **Inner**.
1. The new **Merge** operator is added to the visual query editor.
1. When you see results, you can use **Download Excel file** to view results in Excel or **Visualize results** to create report on results.

#### Save as view

You can save your query as a view on which data load is enabled using the **Save as view** button. Select the schema name that you have access to create views, provide name of view and verify the SQL statement before confirming creating view. When view is successfully created, it appears in the **Explorer**.

   :::image type="content" source="media\visual-query-editor\save-as-view.png" alt-text="Screenshot showing how to use Save as view menu in visual query editor." lightbox="media\visual-query-editor\save-as-view.png":::

#### Save as table

You can use **Save as table** to save your query results into a table for the query with load enabled. Select the warehouse in which you would like to save results, select schema that you have access to create tables and provide table name to load results into the table using [CREATE TABLE AS SELECT](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) statement. When table is successfully created, it appears in the **Explorer**.

   :::image type="content" source="media\visual-query-editor\save-as-table.png" alt-text="Screenshot showing how to use Save as table menu in visual query editor." lightbox="media\visual-query-editor\save-as-table.png":::

## Create a cross-warehouse query in visual query editor

For more information on cross-warehouse querying, see [Cross-warehouse querying](query-warehouse.md#write-a-cross-database-query).

- To create a cross-warehouse query, drag and drop tables from added warehouses and add merge activity. For example, in the following image example, `store_sales` is added from `sales` warehouse and it's merged with `item` table from `marketing` warehouse.

:::image type="content" source="media\visual-query-editor\cross-warehouse-query-visual-query-editor.png" alt-text="Screenshot of sample cross-warehouse query between sales and marketing database and Power Query activities." lightbox="media\visual-query-editor\cross-warehouse-query-visual-query-editor.png":::

## Limitations with visual query editor

- In the visual query editor, you can only run DQL (Data Query Language) or read-only [SELECT](/sql/t-sql/queries/select-transact-sql?view=fabric&preserve-view=true) statements. DDL or DML statements are not supported.
- Only a subset of Power Query operations that support Query folding are currently supported.
- Visualize Results currently does not support SQL queries with an ORDER BY clause. 

## Related content

- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
- [Query using the SQL query editor](sql-query-editor.md)
- [Query insights in Fabric data warehousing](query-insights.md)
