---
title: "Data warehouse tutorial: Clone a table with T-SQL in a Warehouse in Microsoft Fabric"
description: "In this tutorial, you will clone a table by using T-SQL."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajagadish, prlangad
ms.date: 11/10/2024
ms.topic: tutorial
ms.custom:
  - ignite-2023
  - build-2024
ms.search.form: Warehouse Clone table # This article's title should not change. If so, contact engineering.
---

# Tutorial: Clone a table with T-SQL in a Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this tutorial, you will clone a table by using T-SQL. Specifically, you will create a [table clone](clone-table.md) by using the [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true) T-SQL statement.

A cloned table provides several benefits:

- You can use the [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true) T-SQL statement to create a table clone at the _current point-in-time_ or at a _previous point-in-time_.
- You can clone tables in the Fabric portal. For examples, see [Tutorial: Clone tables in the Fabric portal](tutorial-clone-table-portal.md).
- You can query data in a warehouse as it appeared in the past by using a `SELECT` statement with the `OPTION` clause. For more information, see [Query data as it existed in the past](time-travel.md).

## Clone a table within the same schema

In this task, you will clone a table within the same schema in a warehouse.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. In the `Wide World Importers` warehouse, on the **Home** ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-clone-table/ribbon-new-sql-query.png" alt-text="Screenshot of the New SQL query option on the ribbon." border="false":::

1. In the query editor, paste the following code. The code creates a clone of the `dimension_city` table and the `fact_sale` table.

   ```sql
    --Create a clone of the dbo.dimension_city table.
    CREATE TABLE [dbo].[dimension_city1] AS CLONE OF [dbo].[dimension_city];
   
    --Create a clone of the dbo.fact_sale table.
    CREATE TABLE [dbo].[fact_sale1] AS CLONE OF [dbo].[fact_sale];
   ```

1. To execute the query, on the query designer ribbon, select **Run**.

   :::image type="content" source="media/tutorial-clone-table/run-to-execute.png" alt-text="Screenshot of the Run option on the query editor ribbon." border="false":::

1. When the execution completes, to preview the loaded data, in the **Explorer** pane, select `dimension_city1`.

   :::image type="content" source="media/tutorial-clone-table/explorer-select-table.png" alt-text="Screenshot of the Explorer pane, highlighting the dimension city 1 table." border="false":::

1. To create a table clone as of a _past point in time_, in the query editor, paste the following code **to replace the existing statements**. The code creates a clone of the `dimension_city` table and the `fact_sale` table at certain points in time.

   ```sql
    --Create a clone of the dbo.dimension_city table at a specific point in time.   
   CREATE TABLE [dbo].[dimension_city2] AS CLONE OF [dbo].[dimension_city] AT '2024-04-29T23:51:48.923';

    --Create a clone of the dbo.fact_sale table at a specific point in time.
   CREATE TABLE [dbo].[fact_sale2] AS CLONE OF [dbo].[fact_sale] AT '2024-04-29T23:51:48.923';
   ```

1. Run the query.

1. When execution completes, preview the data loaded into the `fact_sale2` table.

1. Rename the query as `Clone Tables`.

## Clone a table across schemas within the same warehouse

In this task, you will clone a table across schemas within the same warehouse.

1. To create a new query, on the **Home** ribbon, select **New SQL query**.

1. In the query editor, paste the following code. The code creates a schema, and then create a clone of the `fact_sale` table and the `dimension_city` table in the new schema.

   ```sql
    --Create a new schema within the warehouse named dbo1.
    CREATE SCHEMA dbo1;
    GO

    --Create a clone of dbo.fact_sale table in the dbo1 schema.
    CREATE TABLE [dbo1].[fact_sale1] AS CLONE OF [dbo].[fact_sale];
   
    --Create a clone of dbo.dimension_city table in the dbo1 schema.
    CREATE TABLE [dbo1].[dimension_city1] AS CLONE OF [dbo].[dimension_city];
   ```

1. Run the query.

1. When execution completes, preview the data loaded into the `dimension_city1` table in the `dbo1` schema.

1. To create a table clone as of a _previous point in time_, in the query editor, paste the following code **to replace the existing statements**. The code create a clone of the `dimension_city` table and the `fact_sale` table at certain points in time in the new schema.

    ```sql
    --Create a clone of the dbo.dimension_city table in the dbo1 schema.
    CREATE TABLE [dbo1].[dimension_city2] AS CLONE OF [dbo].[dimension_city] AT '2024-04-29T23:51:48.923';

    --Create a clone of the dbo.fact_sale table in the dbo1 schema.
    CREATE TABLE [dbo1].[fact_sale2] AS CLONE OF [dbo].[fact_sale] AT '2024-04-29T23:51:48.923';
   ```

1. Run the query.

1. When execution completes, preview the data loaded into the `fact_sale2` table in the `dbo1` schema.

1. Rename the query as `Clone Tables Across Schemas`.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Transform data with a stored procedure in a Warehouse in Microsoft Fabric](tutorial-transform-data.md)

## Related content

- [Clone table in Microsoft Fabric](clone-table.md)
- [Tutorial: Clone tables in the Fabric portal](tutorial-clone-table-portal.md)
- [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true)
