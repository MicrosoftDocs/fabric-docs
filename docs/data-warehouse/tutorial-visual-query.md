---
title: Data warehouse tutorial - create a query with the visual query builder
description: In this eighth tutorial step, learn how to create and save a specific query with the visual query builder.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.date: 5/23/2023
---

# Tutorial: Create a query with the visual query builder

Create and save a query with the visual query builder.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Using the visual query builder

1. From the **Home** tab of the ribbon, select **New visual query**.

   :::image type="content" source="media\tutorial-visual-query\select-new-visual.png" alt-text="Screenshot of the ribbon, showing where to select New visual query.":::

1. Drag the `fact_sale` table from the explorer to the query design pane.

   :::image type="content" source="media\tutorial-visual-query\drag-drop-table.png" alt-text="Screenshot of the explorer pane next to the query design pane, showing where to drag the table.":::

1. Limit the dataset size by selecting **Reduce rows** > **Keep top rows** from the transformations ribbon.

   :::image type="content" source="media\tutorial-visual-query\keep-top-rows-option.png" alt-text="Screenshot of the Reduce rows drop-down menu, showing where to select the Keep top rows option.":::

1. In the **Keep top rows** dialog, enter **10,000**.

1. Select **OK**.

1. Drag the `dimension_city` table from the explorer to the query design pane.

1. From the transformations ribbon, select the dropdown next to **Combine** and select **Merge queries as new**.

   :::image type="content" source="media\tutorial-visual-query\merge-queries-new.png" alt-text="Screenshot of the transformations ribbon with the Combine drop-down menu open, showing where to select Merge queries as new.":::

1. On the **Merge** settings page:

   1. **Left table for merge**: `dimension_city`

   1. **Right table for merge**: `fact_sale`

   1. Select the **CityKey** field in the `dimension_city` table by clicking on the column name in the header row to indicate the join column.

   1. Select the **CityKey** field in the `fact_sale` table by clicking on the column name in the header row to indicate the join column.

   1. **Join kind**: Inner

   :::image type="content" source="media\tutorial-visual-query\merge-settings-details.png" alt-text="Screenshot of the Merge dialog box, showing where to find table names and CityKey fields.":::

1. Select **OK**.

1. With the **Merge** step selected, select the **Expand** button next to `fact_sale` on the header of the data grid then select only **TaxAmount, Profit,** and **TotalIncludingTax.**

   :::image type="content" source="media\tutorial-visual-query\table-expand-selected.png" alt-text="Screenshot of the table with Merge selected and TaxAmount, Profit, and TotalIncludingTax selected.":::

1. Select **OK**.

1. Select **Transform** > **Group by** from the transformations ribbon.

   :::image type="content" source="media\tutorial-visual-query\transform-group-by.png" alt-text="Screenshot of the transformations ribbon, showing where to select Group by from the Transform drop-down menu.":::

1. On the **Group by** settings page:

   1. Change to **Advanced**.

   1. **Group by** (if necessary, select **Add grouping** to add more group by columns):
       1. Country
       1. StateProvince
       1. City

   1. **New column name** (if necessary, select **Add aggregation** to add more aggregate columns and operations):
       1. **SumOfTaxAmount** with **Operation** of **Sum** and **Column** of **TaxAmount**
       1. **SumOfProfit with** **Operation of** **Sum and** **Column** **of** **Profit**
       1. **SumOfTotalIncludingTax** with **Operation** of **Sum** and **Column** of **TotalIncludingTax**

   :::image type="content" source="media\tutorial-visual-query\group-by-settings.png" alt-text="Screenshot of the Group by settings page with the correct values entered and selected.":::

1. Select **OK**.

1. Right-click on **Visual query 1** in the explorer and select **Rename**.

   :::image type="content" source="media\tutorial-visual-query\rename-visual-query.png" alt-text="Screenshot showing where to right click on the new visual query in the Explorer pane, and where to select Rename.":::

1. Type **Sales Summary** to change the name of the query.

1. Press **Enter** on the keyboard or click anywhere outside the tab to save the change.

## Next steps

> [!div class="nextstepaction"]
> [Tutorial: Create a Power BI report](tutorial-power-bi-report.md)
