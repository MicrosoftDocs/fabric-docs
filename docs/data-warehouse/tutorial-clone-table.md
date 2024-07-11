---
title: Clone table using T-SQL
description: In this tutorial step, learn how to clone a table using T-SQL in a warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajagadish, prlangad
ms.date: 07/10/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: tutorial
ms.custom:
  - ignite-2023
  - build-2024
ms.search.form: Warehouse Clone table # This article's title should not change. If so, contact engineering.
---
# Tutorial: Clone a table using T-SQL in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This tutorial guides you through creating a [table clone](clone-table.md) in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], using the [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true) T-SQL syntax.

- You can use the [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true) T-SQL commands to create a table clone at the **current point-in-time** or at a **previous point-in-time**.
- You can also clone tables in the Fabric portal. For examples, see [Tutorial: Clone tables in the Fabric portal](tutorial-clone-table-portal.md).
- You can also query data in a warehouse as it appeared in the past, using the T-SQL `OPTION` syntax. For more information, see [Query data as it existed in the past](time-travel.md).

## Create a table clone within the same schema in a warehouse

1. In the Fabric portal, from the ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-clone-table/home-ribbon-select-new.png" alt-text="Screenshot of the Home screen ribbon, showing where to select New SQL query.":::

1. To create a table clone as of **current point in time**, in the query editor, paste the following code to create clones of the `dbo.dimension_city` and `dbo.fact_sale` tables.

   ```sql
   --Create a clone of the dbo.dimension_city table.
   CREATE TABLE [dbo].[dimension_city1] AS CLONE OF [dbo].[dimension_city];
   
   --Create a clone of the dbo.fact_sale table.
   CREATE TABLE [dbo].[fact_sale1] AS CLONE OF [dbo].[fact_sale];
   ```

1. Select **Run** to execute the query. The query takes a few seconds to execute.

   :::image type="content" source="media/tutorial-clone-table/create-clone-table.png" alt-text="Screenshot showing where to select Run to execute your query for table clone." lightbox="media/tutorial-clone-table/create-clone-table.png":::

   After the query is completed, the table clones `dimension_city1` and `fact_sale1` have been created.

1. Load the data preview to validate the data loaded successfully by selecting on the `dimension_city1` table in the **Explorer**.

   :::image type="content" source="media/tutorial-clone-table/explorer-select-table.png" alt-text="Screenshot of the Explorer, showing where to find and select the new cloned table dimension_city1." lightbox="media/tutorial-clone-table/explorer-select-table.png":::

1. To create a table clone as of a **past point in time**, use the `AS CLONE OF ... AT` T-SQL syntax. The following sample to create [clones from a past point in time](clone-table.md) of the `dbo.dimension_city` and `dbo.fact_sale` tables. Input the Coordinated Universal Time (UTC) for the point in timestamp at which the table is required to be cloned.  

   ```sql
   CREATE TABLE [dbo].[fact_sale2] AS CLONE OF [dbo].[fact_sale] AT '2024-04-29T23:51:48.923';
   
   CREATE TABLE [dbo].[dimension_city2] AS CLONE OF [dbo].[dimension_city] AT '2024-04-29T23:51:48.923';
   ```

1. Select **Run** to execute the query. The query takes a few seconds to execute.

    :::image type="content" source="media/tutorial-clone-table/create-clone-table-point-in-time.png" alt-text="Screenshot showing the T-SQL statements to execute for a table clone at a point in time." lightbox="media/tutorial-clone-table/create-clone-table-point-in-time.png":::

   After the query is completed, the table clones `dimension_city2` and `fact_sale2` have been created, with data as it existed in the past point in time.

1. Load the data preview to validate the data loaded successfully by selecting on the `fact_sale2` table in the Explorer.

    :::image type="content" source="media/tutorial-clone-table/explorer-select-cloned-table-point-in-time.png" alt-text="Screenshot of the Explorer, showing where to find and select the new cloned table fact_sale2." lightbox="media/tutorial-clone-table/explorer-select-cloned-table-point-in-time.png":::

1. Rename the query for reference later. Right-click on **SQL query 2** in the **Explorer** and select **Rename**.

   :::image type="content" source="media/tutorial-clone-table/right-click-rename-schema.png" alt-text="Screenshot of the Explorer pane in the Fabric portal, showing where to right-click on the query and select Rename.":::

1. Type `Clone Table` to change the name of the query.

1. Press **Enter** on the keyboard or select anywhere outside the tab to save the change.

## Create a table clone across schemas within the same warehouse

1. From the ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-clone-table/home-ribbon-select-new.png" alt-text="Screenshot of the Home screen ribbon, showing where to select New SQL query.":::

1. Create a new schema within the `WideWorldImporter` warehouse named `dbo1`. Copy, paste, and run the following T-SQL code which creates table clones as of current point in time of `dbo.dimension_city` and `dbo.fact_sale` tables across schemas within the same data warehouse.

   ```sql
    --Create new schema within the warehouse named dbo1.
   CREATE SCHEMA dbo1;

   --Create a clone of dbo.fact_sale table in the dbo1 schema.
   CREATE TABLE [dbo1].[fact_sale1] AS CLONE OF [dbo].[fact_sale];
   
   --Create a clone of dbo.dimension_city table in the dbo1 schema.
   CREATE TABLE [dbo1].[dimension_city1] AS CLONE OF [dbo].[dimension_city];
   ```

1. Select **Run** to execute the query. The query takes a few seconds to execute.

   :::image type="content" source="media/tutorial-clone-table/select-run-cross-schema.png" alt-text="Screenshot from the Fabric portal query editor showing where to select Run to execute your query for table clone." lightbox="media/tutorial-clone-table/select-run-cross-schema.png":::

   After the query is completed, clones `dimension_city1` and `fact_sale1` are created in the `dbo1` schema.

1. Load the data preview to validate the data loaded successfully by selecting on the `dimension_city1` table under `dbo1` schema in the **Explorer**.

   :::image type="content" source="media/tutorial-clone-table/explorer-select-table-schema.png" alt-text="Screenshot of the Explorer, showing where to find and select the clone created in dbo1 schema." lightbox="media/tutorial-clone-table/explorer-select-table-schema.png":::

1. To create a table clone as of a **previous point in time**, in the query editor, paste the following code to create clones of the `dbo.dimension_city` and `dbo.fact_sale` tables in the `dbo1` schema. Input the Coordinated Universal Time (UTC) for the point in timestamp at which the table is required to be cloned.

    ```sql
   --Create a clone of the dbo.dimension_city table in the dbo1 schema.
   CREATE TABLE [dbo1].[dimension_city2] AS CLONE OF [dbo].[dimension_city] AT '2024-04-29T23:51:48.923';

   --Create a clone of the dbo.fact_sale table in the dbo1 schema.
   CREATE TABLE [dbo1].[fact_sale2] AS CLONE OF [dbo].[fact_sale] AT '2024-04-29T23:51:48.923';
   ```

1. Select **Run** to execute the query. The query takes a few seconds to execute.

   :::image type="content" source="media/tutorial-clone-table/select-run-cross-schema-point-in-time.png" alt-text="Screenshot from the Fabric portal query editor showing the query for a cross-schema table clone at a point in time." lightbox="media/tutorial-clone-table/select-run-cross-schema-point-in-time.png":::

   After the query is completed, table clones `fact_sale2` and `dimension_city2` are created in the `dbo1` schema, with data as it existed in the past point in time.

1. Load the data preview to validate the data loaded successfully by selecting on the `fact_sale2` table under `dbo1` schema in the **Explorer**.

   :::image type="content" source="media/tutorial-clone-table/explorer-cross-schema-clone-table-point-in-time.png" alt-text="Screenshot from the Fabric portal explorer showing all the new cloned tables created, including dbo1.fact_sale2." lightbox="media/tutorial-clone-table/explorer-cross-schema-clone-table-point-in-time.png":::

1. Rename the query for reference later. Right-click on **SQL query 3** in the **Explorer** and select **Rename**.

   :::image type="content" source="media/tutorial-clone-table/right-click-rename.png" alt-text="Screenshot of the Explorer pane, showing where to right-click on the query and select Rename.":::

1. Type `Clone Table in another schema` to change the name of the query.

1. Press **Enter** on the keyboard or select anywhere outside the tab to save the change.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Transform data using a stored procedure](tutorial-transform-data.md)

## Related content

- [Clone table in Microsoft Fabric](clone-table.md)
- [Tutorial: Clone tables in the Fabric portal](tutorial-clone-table-portal.md)
- [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true)
