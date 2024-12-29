---
title: "Data warehouse tutorial: certain points in time."
description: "In this tutorial, you will use the SQL query editor to write cross-warehouse query."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: prlangad
ms.date: 11/10/2024
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
---

# Tutorial: Create a cross-warehouse query in Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, you will use the SQL query editor to write cross-warehouse query.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a Microsoft Fabric workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse in Microsoft Fabric](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse in Microsoft Fabric](tutorial-ingest-data.md)
> 1. [Analyze data with a notebook](tutorial-analyze-data-notebook.md)

## Add a warehouse to the Explorer pane

In this task, you will use the SQL query editor to write cross-warehouse query.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. Select the `Wide World Importers` warehouse.

1. In the **Explorer** pane, select **+ Warehouses**.

    :::image type="content" source="media/tutorial-sql-cross-warehouse-query-editor/explorer-add-warehouses.png" alt-text="Screenshot of the Explorer pane, highlighting the + Warehouse button." border="false":::

1. In the **OneLake catalog**, select the `Shortcut_Exercise` SQL analytics endpoint. The SQL analytics endpoint was created in the [Use a notebook to analyze data in a Warehouse in Microsoft Fabric](tutorial-analyze-data-notebook.md) tutorial.

    :::image type="content" source="media/tutorial-sql-cross-warehouse-query-editor/explorer-add-warehouses-select-sql-endpoint.png" alt-text="Screenshot of the OneLake catalog window, highlighting the SQL analytics endpoint." lightbox="media/tutorial-sql-cross-warehouse-query-editor/explorer-add-warehouses-select-sql-endpoint.png" border="false":::

1. Select **Confirm**.

1. In the **Explorer** pane, notice that the `Shortcut_Exercise` SQL analytics endpoint is available.

## Run the cross-warehouse query

In this task, you will run the cross-warehouse query. Specifically, you will run a query that joins the `Wide World Importers` warehouse to the `Shortcut_Exercise` SQL analytics endpoint.

> [!NOTE]
> A cross-database query uses three-part naming of _database.schema.table_ to reference objects.

1. On the **Home** ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-sql-cross-warehouse-query-editor/ribbon-new-sql-query.png" alt-text="Screenshot of the Home ribbon, highlighting the New SQL query option." border="false":::

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

    :::image type="content" source="media/tutorial-sql-cross-warehouse-query-editor/query-result.png" alt-text="Screenshot of the query result of the cross-warehouse query." border="false":::

1. When execution completes, rename the query as `Cross-warehouse Query`.

> [!NOTE]
> You can also run cross-warehouse queries that span data from a warehouse in a different workspace. However, cross-warehouse cross-workspace querying is only supported for queries _within the same region_.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create a Direct Lake semantic model and Power BI report in Microsoft Fabric](tutorial-power-bi-report.md)
