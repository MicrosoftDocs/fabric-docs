---
title: "Data Warehouse Tutorial: Create a Query with the Visual Query Builder in a Warehouse"
description: "In this tutorial, learn how to create a query with the visual query builder."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 04/06/2025
ms.topic: tutorial
---

# Tutorial: Create a query with the visual query builder in a Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, learn how to create a query with the visual query builder.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse](tutorial-ingest-data.md)

## Use the visual query builder

In this task, learn how to create a query with the visual query builder.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. On the **Home** ribbon, open the **New SQL query** dropdown list, and then select **New visual query**.

   :::image type="content" source="media/tutorial-visual-query/ribbon-new-visual-query.png" alt-text="Screenshot of the Home ribbon, highlighting the New visual query option." lightbox="media/tutorial-visual-query/ribbon-new-visual-query.png":::

1. From the **Explorer** pane, from the `dbo` schema **Tables** folder, drag the `fact_sale` table to the visual query canvas.

   :::image type="content" source="media/tutorial-visual-query/drag-drop-table.png" alt-text="Screenshot of the Explorer pane, highlighting the fact sale table to drag to the visual query canvas.":::

1. To limit the dataset size, on the query designer ribbon, select **Reduce rows** > **Keep top rows**.

   :::image type="content" source="media/tutorial-visual-query/keep-top-rows.png" alt-text="Screenshot of the Reduce rows dropdown, highlighting the Keep top rows option.":::

1. In the **Keep top rows** window, enter `10000`, and then select **OK**.

1. From the **Explorer** pane, from the `dbo` schema **Tables** folder, drag the `dimension_city` table to the visual query canvas.

1. To join the tables, on the query designer ribbon, select **Combine** > **Merge queries as new**.

   :::image type="content" source="media/tutorial-visual-query/merge-queries-new.png" alt-text="Screenshot of the Combine dropdown, highlighting the Merge queries as new option.":::

1. In the **Merge** dialog, complete the following settings:

   1. In the **Left table for merge** dropdown list, select `dimension_city`.

   1. In the following grid, select the `CityKey` column.

   1. In the **Right table for merge** dropdown list, select `fact_sale`.

   1. In the following grid, select the `CityKey` column.

   1. In the **Join kind** section, select **Inner**.

   :::image type="content" source="media/tutorial-visual-query/merge-settings.png" alt-text="Screenshot of the Merge dialog, highlighting the settings.":::

1. Select **OK**.

1. In the data preview pane, locate the `fact_sale` column (the last column).

   :::image type="content" source="media/tutorial-visual-query/data-preview-fact-sale-column.png" alt-text="Screenshot of the data preview pane, highlighting the fact sale column.":::

1. In the `fact_sale` column header, select the **Expand** button.

   :::image type="content" source="media/tutorial-visual-query/data-preview-fact-sale-column-expand.png" alt-text="Screenshot of the data preview pane, highlighting the fact sale column expand button.":::

1. In the column selector dialog, select only these three columns: `TaxAmount`, `Profit`, and `TotalIncludingTax`.

   :::image type="content" source="media/tutorial-visual-query/merge-column-selection.png" alt-text="Screenshot of the merge column selection, highlighting the selection of Tax Amount, Profit, and Total Including Tax.":::

1. Select **OK**.

1. To aggregate the dataset, on the ribbon, select **Transform** > **Group by**.

   :::image type="content" source="media/tutorial-visual-query/transform-group-by.png" alt-text="Screenshot of the Transform dropdown, highlighting the Group by option.":::

1. In the **Group by** dialog, complete the following settings:

    1. In the three **Group by** dropdowns, set the following options:
        1. `Country`
        1. `StateProvince`
        1. `City`

    1. In the **New column name** box, enter the name `SumOfTaxAmount`.
        1. In the **Operation** dropdown list, select **Sum**.
        1. In the **Column** dropdown list, select `TaxAmount`.

    1. Select **Add aggregation**.

    1. Set the aggregation as follows:
       1. **New column name**: `SumOfProfit`
       1. **Operation**: **Sum**
       1. **Column**: `Profit`

    1. Add another aggregation, and set the aggregation as follows:
       1. **New column name**: `SumOfTotalIncludingTax`
       1. **Operation**: **Sum**
       1. **Column**: `TotalIncludingTax`

   :::image type="content" source="media/tutorial-visual-query/group-by-settings.png" alt-text="Screenshot of the Group by dialog, highlighting the settings.":::

1. Select **OK**.

1. Review the query result in the data preview pane.

   :::image type="content" source="media/tutorial-visual-query/data-preview-final-result.png" alt-text="Screenshot of the final query result, showing three grouping columns, and three summarized columns." lightbox="media/tutorial-visual-query/data-preview-final-result.png":::

1. Rename the query, right-click on the query tab, and then select **Rename**.

   :::image type="content" source="media/tutorial-create-tables/rename-query-option.png" alt-text="Screenshot of the Refresh option available when right-clicking the query editor tab." border="false":::

1. In the **Rename** window, replace the name with `Sales Summary`, and then select **Rename**.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Analyze data in a notebook](tutorial-analyze-data-notebook.md)
