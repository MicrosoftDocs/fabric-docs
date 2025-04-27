---
title: "Data Warehouse Tutorial: Create a Cross-Warehouse Query in a Warehouse"
description: "In this tutorial, learn how to work with the SQL query editor to write cross-warehouse query."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: prlangad
ms.date: 04/06/2025
ms.topic: tutorial
---

# Tutorial: Create a cross-warehouse query in a warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, learn how to work with the SQL query editor to write cross-warehouse query.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse](tutorial-ingest-data.md)
> 1. [Analyze data with a notebook](tutorial-analyze-data-notebook.md)

## Add a warehouse to the Explorer pane

In this task, learn how to work with the SQL query editor to write cross-warehouse query.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. Select the `Wide World Importers` warehouse.

1. In the **Explorer** pane, select **+ Warehouses**.

    :::image type="content" source="media/tutorial-sql-cross-warehouse-query-editor/explorer-add-warehouses.png" alt-text="Screenshot of the Explorer pane, highlighting the + Warehouse button.":::

1. In the **OneLake catalog** window, select the `Shortcut_Exercise` SQL analytics endpoint.

1. Select **Confirm**.

1. In the **Explorer** pane, notice that the `Shortcut_Exercise` SQL analytics endpoint is available.

## Run the cross-warehouse query

In this task, learn how to run the cross-warehouse query. Specifically, you will run a query that joins the `Wide World Importers` warehouse to the `Shortcut_Exercise` SQL analytics endpoint.

> [!NOTE]
> A cross-database query uses three-part naming of _database.schema.table_ to reference objects.

1. On the **Home** ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-sql-cross-warehouse-query-editor/ribbon-new-sql-query.png" alt-text="Screenshot of the Home ribbon, highlighting the New SQL query option." lightbox="media/tutorial-sql-cross-warehouse-query-editor/ribbon-new-sql-query.png":::

1. In the query editor, paste the following code. The code retrieves an aggregate of quantity sold by stock item, description, and customer.

    ```sql
    --Retrieve an aggregate of quantity sold by stock item, description, and customer.
    SELECT
        Sales.StockItemKey,
        Sales.Description,
        c.Customer,
        SUM(CAST(Sales.Quantity AS int)) AS SoldQuantity
    FROM
        [dbo].[fact_sale] AS Sales
        INNER JOIN [Shortcut_Exercise].[dbo].[dimension_customer] AS c
            ON Sales.CustomerKey = c.CustomerKey
    GROUP BY
        Sales.StockItemKey,
        Sales.Description,
        c.Customer;
    ```

1. Run the query, and review the query result.

    :::image type="content" source="media/tutorial-sql-cross-warehouse-query-editor/query-result.png" alt-text="Screenshot of the query result of the cross-warehouse query.":::

1. When execution completes, rename the query as `Cross-warehouse Query`.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create a Direct Lake semantic model and Power BI report](tutorial-power-bi-report.md)
