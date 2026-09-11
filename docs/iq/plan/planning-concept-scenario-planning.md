---
title: Scenario Planning in Microsoft Fabric
description: "Learn how to use scenarios to create, evaluate, compare, and apply alternative planning outcomes without changing the committed Base plan."
ms.topic: concept-article
ms.date: 08/19/2026
---

# Scenario planning in Microsoft Fabric

Scenarios let you create and evaluate alternative versions of a plan without changing the committed **Base** plan. Use scenarios to test business assumptions, compare outcomes, and understand the impact of potential changes in planning drivers before you apply them to the Base plan.

Each scenario provides an independent simulation layer. Changes in one scenario don't affect the Base plan or other scenarios.

## Base and scenarios

**Base** represents the current committed plan and serves as the reference point for scenario analysis.

A scenario starts from the Base values and lets you simulate different assumptions. Each scenario remains independent, so you can evaluate multiple alternatives without one scenario affecting another.

For example, you can create **Best Case**, **Worst Case**, and **Cost Reduction** scenarios to evaluate different business outcomes.

## Simulate planning changes

You can adjust values in a scenario and see how the changes affect related measures. Changes to leaf-level values can flow through the planning hierarchy and update dependent parent and calculated measures.

Scenarios support two primary ways to apply changes:

- **Simulation:** Adjust individual values to test a specific change.
- **Distribution:** Apply values across multiple rows or columns, either consistently or based on an existing trend.

These capabilities let you model both targeted changes and broader planning assumptions.

## Compare scenario outcomes

Scenario comparison helps you evaluate different planning alternatives across measures, dimensions, and time periods. You can compare scenarios with each other or review how a scenario differs from the Base plan.

**Scenario variance** highlights increases and decreases between the selected scenario and Base plan, helping you identify the areas with the greatest impact.

## Manage scenarios

You can manage scenarios throughout the planning cycle:

- **Lock** a scenario to prevent further changes after you finalize its assumptions.
- **Reset** a scenario to remove simulated changes without affecting Base.
- **Bulk edit** values to apply changes across multiple planning dimensions or periods.
- **Pivot** scenario data to analyze it from different perspectives.

These capabilities help you refine and analyze scenarios while keeping the Base plan unchanged.

## Apply scenario values to Base

After you evaluate a scenario, you can copy its simulated values to the Base plan when you're ready to adopt the changes.

Only simulated values are copied to Base. Native measures remain unchanged. This separation lets you experiment with alternative plans while protecting the committed plan until you decide to apply a scenario.

## Persist and secure scenario data

You can use **Writeback** to persist scenario data to the underlying data source when a destination is configured. Writeback logs let you review scenario writeback activity.

**Scenario security** controls who can access and work with scenario data. This helps protect planning assumptions and restrict scenarios to the appropriate users or teams.

## Scenario planning process

Use the following planning process to evaluate and adopt a scenario:

1. **Create** — Define an alternative planning scenario based on Base.
1. **Model** — Apply assumptions and changes to the scenario.
1. **Analyze** — Evaluate the results and compare them with other scenarios or the Base plan.
1. **Review** — Assess the scenario with relevant stakeholders.
1. **Finalize** — Select the scenario that best supports the planning objective.
1. **Apply** — If appropriate, apply the selected scenario to the Base plan.

This process helps separate **scenario analysis from committed planning**. You can explore different assumptions, evaluate their potential impact, and decide whether to apply the results to Base.

## When to use scenarios

Use scenarios when you need to:

- Test alternative budgets, forecasts, or business assumptions.
- Evaluate best-case and worst-case outcomes.
- Understand the impact of changes before committing them.
- Compare alternative planning outcomes.
- Model changes across multiple dimensions or periods.
- Keep alternative plans separate from the committed Base plan.

## Key benefits

Scenarios help you:

- **Explore alternatives** without changing the Base.
- **Identify risks and opportunities** through what-if analysis.
- **Improve decision-making** by evaluating potential outcomes.
- **Maintain governance** by separating simulated values from committed planning values.

## Key takeaway

Scenarios provide a controlled way to **explore, compare, and evaluate alternative plans** without changing the Base plan. You can simulate and distribute changes, compare outcomes, analyze variances, and refine scenarios before deciding whether to apply the scenario values to the Base plan.
