---
title: Build a P&L Hierarchy with Row Model Builder in Fabric Planning
description: Row Model Builder lets you build a P&L hierarchy in Microsoft Fabric planning sheets. Follow this tutorial to define Net Profit, add child nodes, and apply formulas.
ms.date: 09/08/2026
ms.topic: tutorial
---

# Fabric planning tutorial part 5: Build a P&L hierarchy using row model builder

In this tutorial, you build and configure a row-based P&L model using the Row Model Builder by defining Net Profit as the root, organizing Gross Revenue, Net Revenue, COGS, and Operating Expenses into a connected hierarchy, and configuring formula and aggregate relationships to see how driver-level inputs roll up to Net Profit in real time.

## Prerequisites

Before you start this tutorial, ensure you complete the first tutorial: [Introduction to Fabric Planning](./tutorial-0-introduction.md).

## Configure a row model

In this section, you build a P&L hierarchy from scratch using Row Model Builder, starting from Net Profit and adding Gross Profit, Net Revenue, COGS, and Operating Expenses as connected nodes. Formula and data source rows define how each level calculates from the ones beneath it.

1. In *Northwind_FMCG_Plan*, select **New Planning Sheet** in the **Home** ribbon. Enter P&L – Row model and select **Create**.
1. Configure the field assignments from the P&L Rows as follows:

    | Field   | Value                               |
    | ------- | ----------------------------------- |
    | Rows    | Account                             |
    | Columns | Date hierarchy—Year, Quarter, Month |
    | Values  | Value                               |

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/row-model-data-assignments.png" alt-text="Screenshot of dimension and measure assignments from the P&L Rows table." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/row-model-data-assignments.png":::

1. Go to the **Model** ribbon and select **Row Model**. The **Model Builder** dialog appears. Select **Enable**.
1. In the **Row Model** window, select the box corresponding to **Row Name**. Retain only the root node that is the *All* row, and delete the rest of the rows. Deselect the **All** row. Select **Delete**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/row-model-delete-rows-except-all-node.png" alt-text="Screenshot of the Row Model interface and selecting the rows to delete." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/row-model-delete-rows-except-all-node.png":::

    A warning message appears asking for confirmation. Select **Delete**. The canvas is now ready to build a new row model.

1. Select the *All* row and select the edit icon. In the side pane, set the **Row Name** to *Net Profit*. In the **Configure as** dropdown, select **Formula**. Select **Apply**.

    > [!NOTE]
    > You enter the formula for *Net Profit* after creating all the other nodes in the row model.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/add-net-profit-root-row-formula.png" alt-text="Screenshot of configuring the root row as a formula row named Net Profit in the side pane." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/add-net-profit-root-row-formula.png":::

    This action replaces the root node (*All* row) with *Net Profit*.

1. Select the *Net Profit* row. Select **Add Child** > **Formula**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/select-net-profit-add-child.png" alt-text="Screenshot of selecting the Net Profit row and using the Add Child option." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/select-net-profit-add-child.png":::

1. Select the edit icon, name it *Gross Profit*, and select **Apply** to add *Gross Profit* as a child under *Net Profit*.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/gross-profit-added-child-row.png" alt-text="Screenshot of Gross Profit added as a child row under Net Profit." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/gross-profit-added-child-row.png":::

1. Select *Gross Profit*. Select **Add Child** > **Formula**. A new child row is added under *Gross Profit*. Select the edit icon, name it *Net Revenue*, and select **Apply**.
1. Select *Net Revenue*. Select **Add Child** > **Data Source**. Select the edit icon, name it *Gross Revenue*.
1. In **Choose Close Period Source Row**, select the corresponding source row from the semantic model. In this case, search for and select *Gross Revenue*. Select **Apply**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/side-pane-gross-revenue-data-source.png" alt-text="Screenshot of the configuration to create a Gross Revenue row by selecting the Choose Close Period Source Row." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/side-pane-gross-revenue-data-source.png":::

    This action adds *Gross Revenue* as a child node under *Net Revenue.*

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/net-revenue-data-source-gross-revenue.png" alt-text="Screenshot of the Gross Revenue data source row added as a child node under Net Revenue in the row model." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/net-revenue-data-source-gross-revenue.png":::

1. Select *Gross Revenue*. Select **Add Sibling** > **Data Source**. Select the edit icon, and name the row *Returns and Breakage.*
1. Select **Choose Close Period Source Row,** search for and select *Returns and Breakage* from the semantic model. Select **Apply**.
1. In the same way, add *Distribution Allowance & Rebates* and *Federal & State Excise Taxes* as siblings to *Gross Revenue* under *Net Revenue*.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/insert-sibling-rows-net-revenue.png" alt-text="Screenshot of inserting sibling rows for the Gross Revenue row." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/insert-sibling-rows-net-revenue.png":::

1. Select the **Configure Formula** box on the *Net Revenue* row. Enter the following formula: `[Gross Revenue] -[Returns and Breakage] - [Distribution Allowance & Rebates] - [Federal & State Excise Taxes]` . Select **Apply**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/enter-net-revenue-formula.png" alt-text="Screenshot of entering the formula for net revenue." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/enter-net-revenue-formula.png":::

1. Select *Net Revenue*. Select **Add Sibling** > **Aggregate**. Select the edit icon, name the row *COGS*, and select **Apply**.
1. In the same way you created Gross Revenue in step 10, to create children under the COGS row, select **Add Child** > **Data Source** and create rows for the following categories:

    * Brewing Materials
    * Packaging, Plant Overhead and Maintenance
    * Water & Utilities

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/create-cogs-hierarchy.png" alt-text="Screenshot of creating a hierarchy with child data source rows under the COGS row in the row model." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/create-cogs-hierarchy.png":::

1. Enter the formula for *Gross Profit* as shown in the following image:

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/gross-profit-formula.png" alt-text="Screenshot of entering the formula for Gross Profit." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/gross-profit-formula.png":::

1. Create a hierarchy for *Operating Expenses* by using the **Add Child** > **Data Source** option.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/create-operating-expenses-hierarchy.png" alt-text="Screenshot of creating a hierarchy for Operating Expenses using the Add Child data source option." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/create-operating-expenses-hierarchy.png":::

1. Finally, enter the formula for *Net Profit:* `[Gross Profit]-[Operating Expenses]`

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/enter-net-profit-formula.png" alt-text="Screenshot of entering the formula for net profit." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/enter-net-profit-formula.png":::

1. Select **Back to Home**. Observe that the planning sheet now displays the full P&L hierarchy — *Net Profit* at the root, with *Gross Profit*, *Net Revenue*, *COGS*, and *Operating Expenses* as connected nodes. Expanding any node shows its contributing data source rows.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-5-row-model/view-profit-loss-hierarchy-planning-sheet.png" alt-text="Screenshot of the planning sheet showing the full profit and loss hierarchy with Net Profit at the root." lightbox="../../media/planning-tutorial/planning/tutorial-5-row-model/view-profit-loss-hierarchy-planning-sheet.png":::
