---
title: Measure-Based Modeling in Planning
description: Measure-based modeling organizes semantic model measures into a business hierarchy. Learn how to build measure models, run simulations, and compare scenarios.
ms.date: 08/04/2026
ms.topic: how-to
---

# Measure-based modeling

Use measure-based modeling to organize the measures you define in a semantic model into a hierarchical structure that reflects business performance. This type of modeling enables you to analyze how changes in one measure affect related measures. For example, if material costs change, you can see how those changes cascade up to the net profit level.

Typically, when you place measures in the value field, they appear as column items. It's difficult to create a hierarchy for measures and analyze the performance. A measure model addresses this limitation by allowing you to build a measure hierarchy that you can apply across all row category items.

By using a measure model, you can:

* Organize measures according to business requirements.
* Perform planning and simulations at the measure level.
* Analyze the cascading impact of changes across the hierarchy in a single view.

## Configure measure-based model

1. Create a planning model by assigning dimensions and measures. Consider the revenue model in the following image.

    :::image type="content" source="media/planning-how-to-create-measure-model/planning-sheet-field-assignment-panel.png" alt-text="Screenshot of a planning sheet with the Fields pane highlighting Rows, Columns, and Values assignments." lightbox="media/planning-how-to-create-measure-model/planning-sheet-field-assignment-panel.png":::

1. Go to the **Model** ribbon and select **Measure Model.**

    :::image type="content" source="media/planning-how-to-create-measure-model/model-ribbon-measure-model-button.png" alt-text="Screenshot of the Model ribbon with the measure model button highlighted." lightbox="media/planning-how-to-create-measure-model/model-ribbon-measure-model-button.png":::

    This action opens the measure model canvas, that displays all the measures assigned to the planning sheet.

    :::image type="content" source="media/planning-how-to-create-measure-model/measure-model-measures-list.png" alt-text="Screenshot of the measure model canvas with the measures list highlighted." lightbox="media/planning-how-to-create-measure-model/measure-model-measures-list.png":::

1. Create the required hierarchy using the measures list. Select **Add measure** > **Formula.**

1. In the side panel, enter the title and define the formula as shown in the following screenshot. Select **Create**.

    :::image type="content" source="media/planning-how-to-create-measure-model/formula-measure-panel-gross-revenue.png" alt-text="Screenshot of the Formula Measure panel with title *Gross Revenue*, formula [Sales Volume]*[Avg Selling Price], and Create button highlighted." lightbox="media/planning-how-to-create-measure-model/formula-measure-panel-gross-revenue.png":::

1. The newly created measure is added to the measures list. Drag the measure, in this example, *Gross Revenue*, to the top section of the canvas to create a hierarchy.

    :::image type="content" source="media/planning-how-to-create-measure-model/drag-gross-revenue-measure-to-canvas.png" alt-text="Screenshot of the measure model toolbar, Selected Measures panel, and arrow indicating dragging *Gross Revenue* onto the canvas." lightbox="media/planning-how-to-create-measure-model/drag-gross-revenue-measure-to-canvas.png":::

1. *Gross Revenue* is now available on the canvas screen. Select other measures such as *Sales Volume* and *Avg Selling Price* from the measure list. From the **Insert Measure** list, select the measure you created in the previous step, in this example, *Gross Revenue*, and select **Insert.**

    :::image type="content" source="media/planning-how-to-create-measure-model/select-measures.png" alt-text="Screenshot of measure model with Sales Volume and Avg Selling Price selected, *Gross Revenue* chosen in Insert Measure, and Insert highlighted." lightbox="media/planning-how-to-create-measure-model/select-measures.png":::

1. The measures are now placed as child rows under *Gross Revenue*. This creates a **Gross Revenue** measure hierarchy.

    :::image type="content" source="media/planning-how-to-create-measure-model/measure-model-gross-revenue-hierarchy.png" alt-text="Screenshot of the measures grid showing *Gross Revenue* formula row with Sales Volume and Avg Selling Price as child rows." lightbox="media/planning-how-to-create-measure-model/measure-model-gross-revenue-hierarchy.png":::

1. Drag another measure such as *Discount and Returns* to the **Drop from measure list** section. This measure is added outside the *Gross Revenue* hierarchy as a sibling of the *Gross Revenue* measure.

    :::image type="content" source="media/planning-how-to-create-measure-model/drag-discounts-returns-measure-drop-zone.png" alt-text="Screenshot of dragging Discounts and Returns from the measure list into the Drop from measure list section on the canvas." lightbox="media/planning-how-to-create-measure-model/drag-discounts-returns-measure-drop-zone.png":::

    The following image shows all the measures added to the canvas.

    :::image type="content" source="media/planning-how-to-create-measure-model/measure-model-all-measures-added.png" alt-text="Screenshot of measures grid showing Name, Type, Configuration, and Aggregation columns with all four measures on the canvas." lightbox="media/planning-how-to-create-measure-model/measure-model-all-measures-added.png":::

## Create measure hierarchy

1. Create a new calculated measure. Select **Add measure** and select **Formula**. Enter the title and define the formula. Select **Create**. In this example, the title is *Net Revenue* and the formula is **Gross Revenue* - Discount and Returns.*

1. Drag the *Net Revenue* measure onto the canvas. Drag the *Gross Revenue** measure below *Net Revenue* until it snaps into place as its child. Repeat this step for the *Discount and Returns* measure so that both measures appear as children of *Net Revenue*.

    :::image type="content" source="media/planning-how-to-create-measure-model/measure-model-net-revenue-hierarchy.png" alt-text="Screenshot of measure model grid highlighting the *Net Revenue* hierarchy with *Gross Revenue*, Sales Volume, Avg Selling Price, and Discounts and Returns rows." lightbox="media/planning-how-to-create-measure-model/measure-model-net-revenue-hierarchy.png":::

1. After the measure hierarchy is created, select **Back to Home** in the toolbar.

1. To display the measures in rows, in the **Planning** ribbon, go to  **Layout** > **Measures**.  Select **In Rows**. This option displays the measures in a hierarchical structure under each row category.

    :::image type="content" source="media/planning-how-to-create-measure-model/measure-model-grid-measures-rows-layout.png" alt-text="Screenshot of a measure model grid with Year, Quarter, and Month columns and the measure hierarchy highlighted." lightbox="media/planning-how-to-create-measure-model/measure-model-grid-measures-rows-layout.png":::

A measure model automatically cascades simulation impacts through both the measure hierarchy and the row hierarchy. This cascading effect enables users to understand how changes in business drivers affect overall performance. For example, suppose the sales volume of *Brazil* is increased through simulation; the impact is reflected in *Brazil*'s *Gross Revenue* and *Net Revenue*. The impact can also be seen on its parent *Latin America* up till the top level.

You can create multiple scenarios and perform simulations. You can compare these scenarios to understand which driver yields better performance for the business.

## Creating scenarios and performing simulations

This section explains how to create a scenario and perform simulations in a measure model to understand the impact on the overall business performance.

1. After you create the measure model, in the **Planning** ribbon, go to **Layout** and select **Tree**.

1. The model is displayed in a tree structure expanding from the grand total through regions and the measure hierarchy.

    :::image type="content" source="media/planning-how-to-create-measure-model/tree-view-measure-model-hierarchy.png" alt-text="Screenshot of Tree View tab displaying hierarchical measure cards and toolbar options like Create scenario and Compare scenario." lightbox="media/planning-how-to-create-measure-model/tree-view-measure-model-hierarchy.png":::

1. In the **Tree View** ribbon, select **Display** and toggle off **Show Header KPI** for a cleaner view.

    :::image type="content" source="media/planning-how-to-create-measure-model/tree-view-toggle-header-kpi.png" alt-text="Screenshot of Tree View ribbon with  Show Header KPI toggled off in Display Settings panel." lightbox="media/planning-how-to-create-measure-model/tree-view-toggle-header-kpi.png":::

1. Select **Create New Scenario** from the ribbon. Enter the **Scenario name**, in this example, *Best Case*.

    :::image type="content" source="media/planning-how-to-create-measure-model/create-scenario-dialog-tree-view.png" alt-text="Screenshot of Create Scenario dialog with Scenario name field and series tags." lightbox="media/planning-how-to-create-measure-model/create-scenario-dialog-tree-view.png":::

1. Select any node in the tree. The simulation panel appears on the side. You can perform simulation by either entering a simulation percentage or using a slider.
   For example, for the *United States* node, apply the following changes:

    * Sales Volume: 5%
    * Avg Selling price: 3%
    * Discount and Returns: -2%

    > [!TIP]
    > You can either enter a simulation percentage or simulation value by selecting the value.

    :::image type="content" source="media/planning-how-to-create-measure-model/measure-simulation-panel.png" alt-text="Screenshot of the United States node with Measure simulation panel showing sliders for Sales Volume +5%, Avg Selling Price +3%, and Discounts and Returns -2%." lightbox="media/planning-how-to-create-measure-model/measure-simulation-panel.png":::

1. The simulation results automatically cascade through **Gross Revenue** and **Net Revenue** at the measure level and to *North America* at the parent level. Select the caret icon to expand and see all the measures listed for each node in a hierarchical format.

    :::image type="content" source="media/planning-how-to-create-measure-model/simulation-impact-cascade-measure.png" alt-text="Screenshot of simulation results cascading through *Gross Revenue* and *Net Revenue* nodes." lightbox="media/planning-how-to-create-measure-model/simulation-impact-cascade-measure.png":::

1. Repeat the process to create multiple scenarios and compare them to determine which business drivers produce the best performance. For more information about comparing scenarios, see [Compare scenarios](./planning-how-to-set-up-scenarios.md#compare-scenarios).

    :::image type="content" source="media/planning-how-to-create-measure-model/scenario-comparison-base-versus-best-case.png" alt-text="Screenshot of the Scenario Comparison page comparing Base Scenario with Best Case across regions and measures." lightbox="media/planning-how-to-create-measure-model/scenario-comparison-base-versus-best-case.png":::

## FAQ

Frequently asked questions about measure-based modeling.

### What is the difference between a native/DAX measure and a formula measure?

Native/DAX measures come directly from the semantic model, such as Sales Volume or Raw Material Cost. A formula measure is calculated by combining other measures using an expression in the planning sheet, such as *Gross Revenue* being calculated as Sales Volume multiplied by Avg Selling Price. Formula measures can reference other formula measures too, which is how Net Profit ultimately rolls all the way down to native measures like Discounts and Returns.

### Why do I assign all the fact transaction measures to **Values** before I configure the measure model?

You must place every native/DAX measure used in the measure model in the **Values** field on the planning sheet. The measure model canvas only lists native/DAX measures that are already in the **Values** field, so you need to assign them upfront before you can build any hierarchy.

### What is the main purpose of the measure model?

When semantic model measures are the foundation of a planning model, the measure model provides a way to organize them into a meaningful hierarchy, such as a P&L structure, so teams can plan, simulate, and analyze the cascade of impacts across the full model in a single structured view.

### Does the order in which I drag measures onto the canvas affect whether the calculations are correct?

Canvas placement doesn't affect calculation accuracy, since the formulas themselves are independent of hierarchy positioning. What matters is the formula dependency order. COGS's formula must exist in the planning sheet before Gross Profit's formula can reference it, regardless of when either is dragged into the tree visually.

### If I nest a measure under the wrong parent by mistake, does that break its formula?

No. Nesting only controls where a measure displays in the hierarchy, not what it calculates. If Labor Cost were accidentally nested under Operating Expenses instead of COGS, its own value would stay correct, but COGS's total would be wrong since it would no longer include Labor Cost in its formula.

### If I place a measure under the wrong parent by mistake, how can I correct it?

You can unstage and reposition it rather than delete and rebuild it. In the Hierarchy Builder canvas, each measure has a small cross/remove icon available directly next to it. By selecting it, you unstage that measure from its current parent without deleting it. Once unstaged, you can drag it again into the correct position under the intended parent.

## What is the difference between nesting a measure under a parent in the canvas and adding a measure to the **Values** field on the planning sheet?

Nesting in the canvas defines the hierarchy structure - how measures roll up under Net Profit for display in Measures in Rows or Tree layout. Adding a measure to the **Values** data well on the planning sheet is what makes it appear as an editable or viewable column on that sheet. A measure can exist in the **Values** data well without being part of the hierarchy.

### Does every measure need to be dragged into the canvas individually?

Both approaches are used across the article - *Gross Revenue* and *Net Revenue* are dragged individually, while three children under *COGS* and four children under *Operating Expenses* are added using **Select All** and **Insert Measure**. The method you use depends on how many measures you're nesting under the same parent at once.

### Does switching to Measures in Rows change anything functionally, or is it purely visual?

It's a display change only. The same underlying measures, formulas, and data are shown, arranged so that each measure appears as a row rather than a column. It doesn't alter the measure model structure or its **Values** - it simply makes the P&L hierarchy easier to read.

### Is the measure model tied to the Simple P&L Model sheet specifically, or can the same structure be reused on other planning sheets?

You build and apply the measure model on the specific planning sheet on which you configure it. To reuse the same P&L logic on another sheet, you need to build or reference the structure on that sheet separately.

### Does switching to Tree layout change anything functionally?

It's a display change only - the same underlying nodes, formulas, and data are shown, rendered as connected branches instead of a flat hierarchy. It doesn't alter the **Measure Model** structure or its values.
