---
title: Visualize Budgets, Forecasts, and Simulations in Fabric Plan
description: Visualize simulations, budgets, and forecasts on live data. Learn how to embed planning sheets and see charts update in real time.
ms.date: 08/05/2026
ms.topic: concept-article
---

# Visualize simulations, budgets, and forecasts

Plan, forecast, and visualize scenarios on live data sources without duplicating datasets, rebuilding models, or relying on technical teams. By unifying planning, budgeting, and forecasting data with visualizations, you can:

* Compare budgets, actuals, and forecasts
* Quickly identify and adjust variances that require action
* Evaluate multiple what-if scenarios
* Make real-time, strategic adjustments to budgets and forecasts based on visual insights

In this article, you learn how to integrate planning data in intelligence sheets and visualize plans, budgets, and forecasts in real-time.

## Understanding scenario analysis and real-time visualization

Visualizing simulations, budgets, and forecasts allows finance teams and operational stakeholders to move beyond static, historical reporting. By embedding live planning sheets directly into intelligence sheets, you build an interactive analysis environment where drivers can be manipulated on the fly and immediately reflected across your reports and dashboards.

**Live data binding vs. static snapshots**:

  Unlike traditional BI dashboards that require batch refreshes or data pipeline execution, intelligence sheets establish direct data bindings to embedded planning sheets. Any input change, scenario simulation, or formula update instantly flows through to charts and KPI cards.
  
**Semantic models vs. live sheet measures**:
  * Base model measures: Standard actuals, historical baselines, and locked budget versions reside within the underlying semantic model. Map these measures to the Values and Comparison data wells in intelligence visuals.
  * Live measures: Real-time variance drivers such as simulations, data inputs, and forecasts reside under the **From Sheets** section of the **Data** pane. Combining live measures with baseline measures allows side-by-side comparison between approved baselines and active "what-if" scenarios.

## Create and embed a planning sheet

1. Create a planning sheet that can contain manual data inputs, simulations, scenarios, and forecasts.

    :::image type="content" source="media/infobridge-concept-blend-measures/expense-budget-planning-sheet.png" alt-text="Screenshot of an expense budget planning sheet with a simulation measure." lightbox="media/infobridge-concept-blend-measures/expense-budget-planning-sheet.png":::

1. In a new intelligence sheet, select the **Planning** visual and choose the planning sheet to import data from.

    :::image type="content" source="media/infobridge-concept-blend-measures/select-embedded-planning-sheet-intelligence.jpg" alt-text="Screenshot of selecting the planning sheet to import into the current intelligence sheet." lightbox="media/infobridge-concept-blend-measures/select-embedded-planning-sheet-intelligence.jpg":::

    This action embeds the selected planning sheet into the intelligence sheet.

    :::image type="content" source="media/infobridge-concept-blend-measures/planning-sheet-imported-intelligence-sheet.jpg" alt-text="Screenshot of planning sheet imported into an intelligence sheet.":::

## Add visuals

Blend data from multiple sources by combining dimensions and measures from external files, semantic models, planning sheets, and PowerTable sheets into a single analysis.

1. Add a chart (or a visual that consumes the planning data).
1. Drag dimensions and measures from planning sheets and other data sources into the visualization to analyze them together in a single intelligence sheet.

    > [!NOTE]
    > Use the blend feature in Infobridge to integrate native measures, measures from external sources, simulations, data inputs, and forecasts from planning sheets. Visualize the combined data using charts or create reports with matrix visuals in intelligence sheets.

    After you embed a planning sheet, measures from the sheet, such as input values, formulas, simulations, and forecasts, appear under **From Sheets** in the **Data** pane.

    In this example, you combine the *Budget Simulation* measure from the planning sheet with dimensions and measures from a source file. You then use the integrated data to create a breakdown waterfall chart and a pie chart.

    :::image type="content" source="media/infobridge-concept-blend-measures/intelligence-sheet-blended-visuals-waterfall.png" alt-text="Screenshot of an intelligence sheet with a planning grid, breakdown waterfall chart, and pie chart, plus the Waterfall Assign Data pane." lightbox="media/infobridge-concept-blend-measures/intelligence-sheet-blended-visuals-waterfall.png":::

1. As you run simulations on the planning sheet, the charts on the intelligence sheet update in real time to reflect the changes. In this example, you increase the IT budget to 8.5m; the variances and bars in the breakdown waterfall automatically update in response to this change.

    :::image type="content" source="media/infobridge-concept-blend-measures/update-value-embedded-planning-chart-visualize.png" alt-text="Screenshot of updating a value in the planning sheet and the bars in the breakdown waterfall getting updated in real-time." lightbox="media/infobridge-concept-blend-measures/update-value-embedded-planning-chart-visualize.png":::

    Reduce the *Infrastructure* budget from 7M to 2M and observe how the pie chart proportions change.

    :::image type="content" source="media/infobridge-concept-blend-measures/update-value-planning-sheet-pie-chart-updated.png" alt-text="Screenshot of pie chart proportions changing in response to the decrease in Infrastructure budget." lightbox="media/infobridge-concept-blend-measures/update-value-planning-sheet-pie-chart-updated.png":::

## FAQ

Frequently asked questions about embedding planning sheets and visualizing budgets, forecasts, and simulations in intelligence sheets.

### Why is the Planning visualization option grayed out until a Planning Sheet exists in the workspace?

The planning visual embeds an existing planning sheet onto the intelligence canvas, so the Plan app needs at least one planning sheet.

### What happens if there's more than one Planning Sheet in the workspace when embedding?

The sheet picker, **Select an Existing Planning Sheet**, lists every planning sheet available, and you can choose the correct one.

### Once the Planning Sheet is embedded, is it a live, editable copy or a static snapshot?

It's live and editable. Adjusting any cell value in the embedded planning sheet updates charts, KPI cards, table, and matrix visuals in an intelligence sheet.

### What's the difference between mapping Comparison 1 / Comparison 2 from the semantic model versus adding a measure from the "From Sheets" section?

Comparison 1 and Comparison 2 pull directly from the semantic model's stored base measures (Plan, Actuals). **From Sheets** pull a live field from the embedded planning sheet which reflects the scenario values currently entered on that sheet.
