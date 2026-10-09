---
title: Scenario Analysis with Tree Layout in Row Model
description: Use scenarios in a row model to evaluate upside and downside assumptions safely. Learn to enable tree layout, adjust drivers, and analyze simulation impact.
#customer intent: As an FP&A analyst and planning sheet user, I want to enable the tree layout on a planning sheet so that I can see how driver changes flow through dependent rows.
ms.date: 08/25/2026
ms.topic: how-to
---

# Perform scenario analysis in row model

Use scenarios with a row model to evaluate different assumptions without changing the base plan or forecast.&#x20;

A scenario can contain a single driver or multiple drivers simulated at the same time. Use the **tree layout** to visualize how simulated driver values flow through the row model and affect dependent rows. Each scenario provides a separate simulation layer, so changes in one scenario don't affect the base plan, forecast, or other scenarios.

In this example, use ***Forecast*** as the baseline series and ***PY Actuals*** as the comparison series to generate and assess different forecast assumptions against the previous year's actuals. You create three scenarios in the **tree layout** to evaluate upside, downside, and balanced business conditions. Then, you simulate different combinations of drivers in each scenario and compare their potential impact on the forecast.

## Prerequisites

Before you create a scenario, ensure that:

* You have a planning sheet with a [configured row model](how-to-create-row-model.md).
* You [created a forecast](how-to-create-row-model-forecasts.md) or have another series available to use as the **baseline** for scenario analysis.
* The row model includes the required measures and dimensions for the scenario.

## Create scenarios by using tree layout

In this section, you create and configure the tree layout to structure your data and simulate different scenarios by adjusting driver values.

### Enable tree layout

1. In the planning sheet, go to **Layout** > **Tree**.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/select-tree.png" alt-text="Screenshot of the Planning tab with the Layout menu open and the Tree option highlighted." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/select-tree.png":::

1. Select the **Baseline** and **Comparison** series. To create three forecasting scenarios for 2026, select *Forecast* as the baseline series and *PY Actuals* as the comparison series to compare against 2025 actuals.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/configure-tree-view.png" alt-text="Screenshot of the Configure Tree View dialog with Baseline set to Forecast, Comparison set to PY Actuals, and Save highlighted.":::

1. Select **Save**. The tree view appears as shown in the following image. This is the base scenario.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/created-tree-view.png" alt-text="Screenshot of the created tree view with Baseline set to Forecast and Comparison set to PY Actuals, showing node cards with sparklines." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/created-tree-view.png":::

1. The tree layout aggregates values across the entire period available in the planning sheet. Use the **time period selector** to select the year or period you want to include in the tree.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/time-range-selector.png" alt-text="Screenshot of the time period selector open in Tree View, showing 2026 month picker with Jan and Dec selected and a Clear option." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/time-range-selector.png":::

### Create a scenario

1. To create a scenario, select **Base** > **Create New Scenario**.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/create-new-scenario.png" alt-text="Screenshot of the Base dropdown in Tree View listing Base scenario and the highlighted Create New Scenario option." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/create-new-scenario.png":::

1. Enter a name for the scenario and choose the series to simulate. To simulate forecast values, select *Forecast* and then select **Create**.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/create-scenario-choose-series.png" alt-text="Screenshot of the Create Scenario window where a scenario name is entered and Forecast is selected for simulation." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/create-scenario-choose-series.png":::

## Create the best-case scenario

Create a scenario by following the steps in the previous section. Name the scenario *Best Case* and configure the driver values to simulate favorable business conditions.

1. Increase the **Revenue** values for the forecast by using the slider or by entering the simulation percentage (for example, 10%) in the text box.
1. Similarly, simulate a decrease in the **Purchase** values.
1. Review the resulting changes to **Profit**.

:::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/best-case-scenario.png" alt-text="Screenshot of Tree View showing Best Case scenario with Revenue up 10%, Purchase down 10%, and Profit increased 23%." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/best-case-scenario.png":::

The row model recalculates dependent values as you change the drivers, so you can see the cascading impact of the assumptions in the tree layout.&#x20;

## Create the worst-case scenario

Create another scenario named *Worst Case* to evaluate unfavorable business conditions.

:::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/create-worst-case-scenario.png" alt-text="Screenshot of the Create Scenario dialog with the name Worst Case Scenario, Forecast series selected, and the Create button highlighted.":::

1. Decrease the **Revenue** values.
1. Increase one or more **Expense** drivers such as **Purchase** and **Salaries**.
1. Review how the changes affect profit.

:::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/worst-case-scenario-result.png" alt-text="Screenshot of Tree View showing Worst Case Scenario with Revenue down 10%, Purchase and Salaries up 10%, and Profit down 23%." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/worst-case-scenario-result.png":::

The worst-case scenario remains separate from the best-case scenario and the base plan.

## Create a balanced-case scenario

Create a *Balanced Case* scenario by applying moderate changes to **Revenue** and **Expense** drivers to review their impact on the profit.

:::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/balanced-case-scenario.png" alt-text="Screenshot of Tree View showing Balanced Case Scenario with Revenue and Purchase down 5%, expenses up 5%, and Profit down 7%." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/balanced-case-scenario.png":::

## Analyze simulation impact

In the tree layout, select a node to analyze the impact of the simulation on that node. Use the available **Graph** and **Table** views to review the **trend**, **simulation** **details**, **simulation impact**, **variance**, and **dependents** for the selected node.

:::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/analyze-simulation-impact.png" alt-text="Screenshot of Tree View with Profit node selected and the Simulation tab showing a waterfall graph comparing Forecast to Balanced Case Scenario." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/analyze-simulation-impact.png":::

## Compare scenarios

After creating the scenarios, compare their outcomes to understand how the different assumptions affect the forecast.

1. Select **Compare scenario**.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/select-compare-scenario.png" alt-text="Screenshot of Tree View toolbar with the Compare scenario button highlighted." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/select-compare-scenario.png":::

1. In the **Scenario Comparison** screen, select the scenarios that you want to compare and analyze. You can select a scenario and compare it against one or more scenarios.

    Consider a scenario that focuses on cost optimization, and you name it *Cost Optimized.* The following image compares the *Cost Optimized* scenario with the *Balanced Case* and *Best Case* scenarios.

    :::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/scenario-comparison-window.png" alt-text="Screenshot of the Scenario Comparison screen comparing Cost Optimized with Balanced Case and Best Case scenarios, with the Compare and With selectors highlighted." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/scenario-comparison-window.png":::

1. Review the differences in drivers and KPIs across the selected periods.

The comparison displays the values for the selected scenarios and the variance between them. Positive and negative variances help you identify how the assumptions change the forecast outcome.&#x20;

## Copy to base scenario

After evaluating different scenarios, you can copy the assumptions and simulations from a specific scenario to the **base scenario**. This step makes the selected scenario the new baseline, so you continue to simulate additional changes from it.

To set a simulated scenario as the new baseline, select the vertical ellipsis next to the scenario name, and then select **Copy to Base**. This action copies the selected scenario's simulations to the base scenario.

:::image type="content" source="../media/planning-row-model/how-to-create-row-model-scenarios/copy-scenario-to-base.png" alt-text="Screenshot of the Tree View scenario menu with Copy to Base highlighted for the Cost Optimized scenario." lightbox="../media/planning-row-model/how-to-create-row-model-scenarios/copy-scenario-to-base.png":::

## How scenario analysis helps in row model

Scenario analysis in the row model helps you understand how different assumptions influence overall business outcomes. By simulating driver changes and tracing their impact through the row hierarchy, you can evaluate potential outcomes, compare alternatives, and make informed planning decisions without affecting the underlying plan.
