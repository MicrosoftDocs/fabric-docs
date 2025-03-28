---
title: "Data warehouse tutorial: Analyze data in a notebook"
description: "In this tutorial, learn how to analyze data with notebooks in a Warehouse."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: prlangad
ms.date: 12/29/2024
ms.topic: tutorial
ms.custom:
---

# Tutorial: Analyze data in a notebook

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, learn how to analyze data with notebooks in a Warehouse.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse](tutorial-ingest-data.md)

## Create a T-SQL notebook

In this task, learn how to create a T-SQL notebook.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. On the **Home** ribbon, open the **New SQL query** dropdown, and then select **New SQL query in notebook**.

   :::image type="content" source="media/tutorial-analyze-data-notebook/ribbon-new-sql-query-notebook.png" alt-text="Screenshot of the New SQL query in notebook option on the ribbon." border="false":::

1. In the **Explorer** pane, select **Warehouses** to reveal the objects of the `Wide World Importers` warehouse.

1. To generate a SQL template to explore data, to the right of the `dimension_city` table, select the ellipsis (…), and then select **SELECT TOP 100**.

   :::image type="content" source="media/tutorial-analyze-data-notebook/tsql-notebook-select-top-100.png" alt-text="Screenshot of Explorer pane, highlighting the selection of the SELECT TOP 100 option." lightbox="media/tutorial-analyze-data-notebook/tsql-notebook-select-top-100.png" border="false":::

1. To run the T-SQL code in this cell, select the **Run cell** button for the code cell.

   :::image type="content" source="media/tutorial-analyze-data-notebook/run-tsql-code-cell.png" alt-text="Screenshot of the notebook, highlighting the Run cell button for the code cell." lightbox="media/tutorial-analyze-data-notebook/run-tsql-code-cell.png" border="false":::

1. Review the query result in the results pane.

## Create a lakehouse shortcut and analyze data with a notebook

In this task, learn how to create a lakehouse shortcut and analyze data with a notebook.

1. Open the `Data Warehouse Tutorial` workspace landing page.

1. Select **+ New Item** to display the full list of available item types.

1. From the list, in the **Store data** section, select the **Lakehouse** item type.

1. In the **New lakehouse** window, enter the name `Shortcut_Exercise`.

    :::image type="content" source="media/tutorial-analyze-data-notebook/create-new-lakehouse.png" alt-text="Screenshot of the New lakehouse window, highlighting the entered name." border="false":::

1. Select **Create**.

1. When the new lakehouse opens, in the landing page, select the **New shortcut** option.

    :::image type="content" source="media/tutorial-analyze-data-notebook/lakehouse-new-shortcut.png" alt-text="Screenshot of lakehouse landing page, highlighting the New shortcut button." lightbox="media/tutorial-analyze-data-notebook/lakehouse-new-shortcut.png" border="false":::

1. In the **New shortcut** window, select the **Microsoft OneLake** option.

    :::image type="content" source="media/tutorial-analyze-data-notebook/lakehouse-new-shortcut-microsoft-onelake.png" alt-text="Screenshot of the New shortcut window, highlighting the Microsoft OneLake internal source." lightbox="media/tutorial-analyze-data-notebook/lakehouse-new-shortcut-microsoft-onelake.png" border="false":::

1. In the **Select a data source type** window, select the `Wide World Importers` warehouse that you created in the [Create a Warehouse](tutorial-create-warehouse.md) tutorial, and then select **Next**.

1. In the OneLake object browser, expand **Tables**, expand the `dbo` schema, and then select the checkbox for the `dimension_customer` table.

    :::image type="content" source="media/tutorial-analyze-data-notebook/new-shortcut-select-dimension-customer.png" alt-text="Screenshot of the New shortcut window, highlighting the selection of the dimension customer table." border="false":::

1. Select **Next**.

1. Select **Create**.

1. In the **Explorer** pane, select the `dimension_customer` table to preview the data, and then review the data retrieved from the `dimension_customer` table in the warehouse.

1. To create a notebook to query the `dimension_customer` table, on the **Home** ribbon, in the **Open notebook** dropdown, select **New notebook**.

    :::image type="content" source="media/tutorial-analyze-data-notebook/create-new-notebook.png" alt-text="Screenshot of the New notebook option on the ribbon." border="false":::

1. In the **Explorer** pane, select **Lakehouses**.

1. Drag the `dimension_customer` table to the open notebook cell.

    :::image type="content" source="media/tutorial-analyze-data-notebook/drag-customer-dimension-table-notebook-cell.png" alt-text="Screenshot of the Explorer pane, highlighting the dimension customer table drag to the notebook cell." border="false":::

1. Notice the PySpark query that was added to the notebook cell. This query retrieves the first 1,000 rows from the `Shortcut_Exercise.dimension_customer` shortcut. This notebook experience is similar to Visual Studio Code Jupyter notebook experience. You can also open the notebook in VS Code.

    :::image type="content" source="media/tutorial-analyze-data-notebook/notebook-query.png" alt-text="Screenshot of the notebook query, showing the automatically generated PySpark query." border="false":::

1. On the **Home** ribbon, select the **Run all** button.

    :::image type="content" source="media/tutorial-analyze-data-notebook/ribbon-run-all.png" alt-text="Screenshot of the Home ribbon, highlighting the Run all button." border="false":::

1. Review the query result in the results pane.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create a cross-warehouse query in a Warehouse](tutorial-sql-cross-warehouse-query-editor.md)
