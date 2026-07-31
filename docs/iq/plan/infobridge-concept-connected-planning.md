---
title: Connected Planning with Infobridge in Fabric Plan
description: Connected planning consolidates data across multiple planning sheets to create enterprise-wide reports and dashboards. 
ms.date: 07/23/2026
ms.topic: concept-article
---

# Connected planning

Organizations often create separate planning sheets for different departments, business units, or functions. Then, they consolidate the data into enterprise-wide reports, financial statements, and executive dashboards. When you use connected planning in Infobridge, any changes you make to an individual sheet automatically reflect in the consolidated view. This feature ensures that reports and plans always stay up to date. For example, when a department updates its budget, the corresponding values immediately reflect in the corporate budget without requiring manual consolidation.

## Common scenarios

Common scenarios for connected planning include:

* **Enterprise budgeting:** Regional finance teams prepare budgets for individual regions or business units. They then consolidate the data into a corporate budget for executive review.
* **Workforce and expense planning:** Human Resources plans employee salaries and benefits at the individual employee level, while finance creates departmental operating expense (OPEX) budgets by using aggregated personnel costs.
* **Sales and financial reporting:** Sales teams forecast revenue and cost of goods sold (COGS) by product or SKU. They roll up the planned values into consolidated profit and loss (P&L) statements at the business unit or company level.
* **Manufacturing planning:** Production planners estimate demand and inventory requirements for individual materials or components. Operations managers review the results as summarized production volumes by plant, product line, or region.
* **Cost center budgeting:** Department managers prepare budgets for individual cost centers, including labor, travel, software, and facility expenses. Finance consolidates these budgets to produce company-wide expense reports and executive dashboards.
* **Capacity planning:** Operations teams forecast customer demand or production volumes in one planning sheet. They use the forecast to calculate staffing requirements, shift schedules, or equipment capacity in related planning sheets.

## Use case: Budget planning

Industries such as FMCG, retail, consumer goods, and pharmaceuticals often plan budgets by geography and then break them down by product portfolio.

### Regional budget planning

Regional finance teams maintain separate revenue budgets. They create and manage budgets for their respective regions, such as North America, Europe, and APAC. Each planning sheet contains customer-level planning data, including *Average Revenue per Customer* and *Gross Revenue Budget*.

:::image type="content" source="media/infobridge-concept-connected-planning/regional-budget-plan.png" alt-text="Screenshot of a budget plan created for each region." lightbox="media/infobridge-concept-connected-planning/regional-budget-plan.png":::

### Corporate budget planning

Corporate budgets provide a centralized planning sheet for creating and reviewing organization-wide financial plans. They combine key financial measures, such as revenue, cost of goods sold (COGS), and gross margin, to support financial planning and analysis.

:::image type="content" source="media/infobridge-concept-connected-planning/corporate-budget-planning.jpg" alt-text="Screenshot of budget plan at the enterprise or corporate level." lightbox="media/infobridge-concept-connected-planning/corporate-budget-planning.jpg":::

### Consolidate the regional plans within Infobridge

* Import each regional budget into the Infobridge sheet.
* Append the regional datasets to combine all regional records into a single consolidated dataset. The appended dataset contains the *Gross Revenue Budget* across all regions.

:::image type="content" source="media/infobridge-concept-connected-planning/consolidate-plans.png" alt-text="Screenshot of consolidating multiple plans at the same granularity." lightbox="media/infobridge-concept-connected-planning/consolidate-plans.png":::

After you upload a planning sheet to Infobridge, its measures and dimensions become available in the **Queries** section of the **Data** pane. You can then import them into other planning sheets and intelligence sheets.

In the *Corporate Budget* planning sheet, assign the consolidated *Gross Revenue Budget* from the **Queries** section to the **Values** data well. This action imports the measure from Infobridge.

:::image type="content" source="media/infobridge-concept-connected-planning/import-consolidated-planning-measure.jpg" alt-text="Screenshot of importing the consolidated budget measure into the corporate plan." lightbox="media/infobridge-concept-connected-planning/import-consolidated-planning-measure.jpg":::

Changes you make to the regional budgets automatically reflect in the *Corporate Budget*. For example, finance teams increase the EU regional revenue budget for Q1 from 2,611.69 million to 2,620 million.

:::image type="content" source="media/infobridge-concept-connected-planning/query-budget-change.png" alt-text="Screenshot of a budget increase in the EU query." lightbox="media/infobridge-concept-connected-planning/query-budget-change.png":::

The budget increase automatically reflects in the consolidated corporate budget.

:::image type="content" source="media/infobridge-concept-connected-planning/budget-change-consolidated-query.png" alt-text="Screenshot of the budget change made in regional budget propagated to the corporate budget." lightbox="media/infobridge-concept-connected-planning/budget-change-consolidated-query.png":::

With this workflow, regional teams plan independently, while corporate finance gets a single consolidated revenue budget for enterprise-wide reporting and planning.
