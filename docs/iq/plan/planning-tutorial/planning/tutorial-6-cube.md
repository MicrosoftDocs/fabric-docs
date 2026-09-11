---
title: Multidimensional Allocation with Cubes in Fabric Planning 
description: Consolidate plans across dimensions with cubes in Fabric planning. Build sales, cost, and profitability sheets that stay synced in real time.
ms.date: 09/09/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Fabric planning tutorial part 6: Consolidate plans across dimensions using cubes

In this tutorial, you plan sales at the geography level and costs at the product level, with *Cube* enabled at plan creation. Both plans consolidate into a single profitability sheet despite their different granularities. Cubes keep all three sheets synced in real time as changes flow in either direction.

## Prerequisites

Before you start this tutorial, ensure you complete the first tutorial: [Introduction to Fabric Planning](./tutorial-0-introduction.md)

## Create a sales plan

In this section, you create a sales plan sheet at the region level and enable multidimensional allocation. Multidimensional allocation automatically allocates sales values you enter by region across category and subcategory.

1. In the *Northwind_FMCG_Plan*, select **New Planning Sheet** in the **Home** ribbon. Enter *Sales Plan* and select **Create**.
1. Configure the field assignments as follows from the **Measures Table**, **Date**, and **Geography** tables:

    | Field   | Value                                 |
    | ------- | ------------------------------------- |
    | Rows    | Region > Sub Region > City            |
    | Columns | Date hierarchy > Year, Quarter, Month |
    | Values  | 2025 Gross Revenue                    |

1. Select **Insert Column** > **Number** > **Copy from another series** > **2025 Gross Revenue**. 
1. Enter *Sales Plan* as the **Title**. In the **Enable Multi-Dimension Allocation** section, select **Add Breakdown**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/create-measure-add-breakdown-option.png" alt-text="Screenshot of the Add Breakdown option in the Data Input side pane." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/create-measure-add-breakdown-option.png":::

1. In the **Add Breakdown** window, *2025 Gross Revenue* is automatically used as the reference measure. A default breakdown already exists with *Region*, *Sub Region,* and *City*. Edit it to add *Category* and *Sub Category* as additional dimensions. Select **Create**.

   :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/add-breakdown-reference-measure-dimensions.png" alt-text="Screenshot of the Add Breakdown window with the 2025 Gross Revenue reference measure and region and category dimensions." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/add-breakdown-reference-measure-dimensions.png":::

1. In the **Data Input** side panel, confirm the breakdown is added and select **Create**.
1. In the **Planning** ribbon, select **Totals** and enable **Column SubTotal** on the left. Expand the column hierarchy to show the quarters, and hide the *2025 Gross Revenue* column.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/enable-totals-hide-native-revenue-measure.png" alt-text="Screenshot of enabling the totals column and hiding the Gross Revenue native measure." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/enable-totals-hide-native-revenue-measure.png":::

## Create a cost plan

In this section, you create a cost plan sheet at the category level and enable multidimensional allocation. You enter cost values at the *Category* level, and the cube automatically allocates across *Region*, *Subregion*, and *City*.

1. In the *Northwind_FMCG_Plan*, select **New Planning Sheet** in the **Home** ribbon. Enter *Cost Plan* and select **Create**.
1. Configure the field assignments as follows:

    | Field   | Value                               |
    | ------- | ----------------------------------- |
    | Rows    | Category >Sub-Category              |
    | Columns | Date hierarchy—Year, Quarter, Month |
    | Values  | 2025 COGS                           |

1. Select **Insert Column** > **Number** > **Copy from another series** > **2025 Gross Revenue**. 
1. Enter *Cost Plan* as the Title. In the **Enable Multi-Dimension Allocation** section, select **Add Breakdown**.
1. Create the breakdown as shown in the following image:

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/create-multidimensional-cost-breakdown.png" alt-text="Screenshot of creating a region and product breakdown and using COGS as the reference measure." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/create-multidimensional-cost-breakdown.png":::

1. In the **Planning** ribbon, select **Totals** and enable **Column SubTotal** on the left. Expand the column hierarchy to show the quarters, and hide the *2025 COGS* column.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/cost-plan-totals-enabled.png" alt-text="Screenshot of the totals column enabled and COGS native measure hidden in the cost plan." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/cost-plan-totals-enabled.png":::

## Create a profitability sheet

In this section, you create a *Profitability* sheet that pulls in the *Sales Plan* and *Cost Plan* measures. This sheet consolidates both plans at their common grain and calculates *Gross Profit*.

1. In *Northwind_FMCG_Plan*, select **New Planning Sheet** in the **Home** ribbon. Enter *Profitability Sheet* and select **Create**.
1. Configure the field assignments as follows:

    | Field   | Value                                                           |
    | ------- | ----------------------------------------------------------------|
    | Rows    | Region > Sub Region > City Category > Sub Category              |
    | Columns | Date hierarchy—Year, Quarter, Month                             |
    | Values  | Sales Plan and Cost Plan from “From Sheets”                     |

   > [!NOTE]
   > To import the *Sales Plan* and *Cost Plan* you created in the previous sections, open the **Data** side pane, expand **From Sheets** > **Cube**. Select *Sales Plan* and *Cost Plan* and select **Insert as measure**.

1. Open the **Filter** side pane and set the year filter to 2025. Enable column subtotal on the left, and expand the column hierarchy to show the quarters. Observe that both measures are populated at the common Region > Sub Region > City > Category > Sub Category grain. The cube breakdown handles the allocation automatically.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/import-sales-cost-allocate-values.png" alt-text="Screenshot of importing the Sales and Cost plans into the profitability sheet with values allocated automatically by the cube." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/import-sales-cost-allocate-values.png":::

1. In the **Planning** ribbon, select **Insert Column** > **Formula**. Configure the following options and select **Create**:

   * **Title**: Planned Gross Profit
   * **Formula**: `[Sales Plan] − [Cost Plan]`
   * **Row aggregation**: Formula
   * **Column aggregation**: Formula

   Gross Profit now shows at every Region > Sub Region > City > Category > Sub Category combination and gets data from two measures that are at different dimensional levels.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/sales-plan-update-flows-profitability-sheet.png" alt-text="Screenshot showing the Sales Plan grand total for Americas increased by 10 percent and reflected in the Profitability sheet." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/sales-plan-update-flows-profitability-sheet.png":::

## Real-time plan alignment

In this section, you see the three sheets working live and connected. You update a sales assumption in the *Sales Plan* sheet and watch it reflect instantly in the *Profitability* sheet, then update a cost value directly in the *Profitability* sheet and watch it flow back to the *Cost Plan* sheet with no reconciliation step, no re-entry, and no risk of the sheets falling out of sync.

1. Open the *Sales Plan* sheet. Double-click the *Americas* grand total cell in the *Sales Plan* column. Increase it by 10%, and press **Enter**. This action updates the *Sales Plan* grand total value to 26,581 thousand.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/increase-sales-plan-value-ten-percent.png" alt-text="Screenshot of increasing the total Sales Plan value by ten percent." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/increase-sales-plan-value-ten-percent.png":::

1. Open the *Profitability* sheet. The cube updates the *Sales Plan* and the *Gross Profit* across all *Americas* categories and subcategories; a single assumption change at the region level is immediately reflected at every category and subcategory intersection. The *Sales Plan* grand total now matches the 26,581 thousand entered in the *Sales Plan* sheet.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/sales-plan-value-updated-profitability-sheet.png" alt-text="Screenshot of the Sales Plan value getting automatically updated in the Profitability sheet." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/sales-plan-value-updated-profitability-sheet.png":::

1. In the *Profitability* sheet, under *Americas >* *Latin America* > *Curitiba* > *Beverages*, double-click the beverages grand total cell in the *Cost Plan* column. Increase it by 15% and press **Enter**. The *Cost Plan* grand total is updated to 14,174 thousand.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/update-cost-plan-profitability-sheet.png" alt-text="Screenshot of updating the Cost Plan value in the profitability sheet." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/update-cost-plan-profitability-sheet.png":::

1. Open the *Cost Plan* sheet. Observe that the *Cost Plan* for *Beverages* is updated to 14,174 thousand. A revision made in the consolidated view flows back to the source plan. Planners can work at whichever level is most convenient, and the model stays aligned.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-6-cube/cost-plan-sheet-updated-beverages-total.png" alt-text="Screenshot of the Cost Plan update from the Profitability sheet being automatically reflected in the Cost Plan sheet." lightbox="../../media/planning-tutorial/planning/tutorial-6-cube/cost-plan-sheet-updated-beverages-total.png":::
