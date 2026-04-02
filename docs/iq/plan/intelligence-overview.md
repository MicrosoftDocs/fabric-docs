---
title: Intelligence sheets in plan (preview)
description: Learn about the Intelligence sheets component of the plan (preview) item for a no-code reporting experience. Build reports, visualize data, and get real-time insights across plans and budgets.
ms.date: 03/11/2026
ms.topic: overview
#customer intent: As a user, I want visualize my plans, budgets, and forecasts.
---

# What are Intelligence sheets in plan (preview)?

The *Intelligence sheets* component of plan (preview) provides a powerful no-code reporting experience that enables teams to collaboratively build reports, generate fully formatted exports, visualize data, and manage project plans from a single platform in Microsoft Fabric. It couples seamlessly with the Planning sheet to provide real-time insights across your plans, budgets, and what-if scenarios.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Intelligence sheets bring single-click, flexible IBCS formatting for charts, cards, and tabular reports, with pixel-perfect exports.

With their intuitive, no-code user experience (UX), Intelligence sheets enable even casual users to build dashboards and storyboards in minutes. They integrate over 100 charts, Gantt charts, cards, and tables for an end-to-end reporting solution.

Capture additional context by adding annotations to your reports. Intelligence sheets support annotations at both the canvas and data point levels in charts. You can create threaded comments to track action items and tag collaborators using `@mentions`. You can also write comments back to the database for tracking and reference.

## Why use Intelligence sheets?

* **Centralized analysis**: Consolidate financial, operational, and performance data in a single sheet for easy review.
* **Presentation-ready reports**: Apply layouts, templates, and formatting to create clear, professional reports.
* **Enhanced calculations**: Use measures, totals, subtotals, and custom formulas to support advanced analysis.
* **Visual insights**: Build tables and charts that make trends, patterns, and anomalies easy to identify.
* **Compare actuals versus plans**: Evaluate performance by comparing actual results with projections or budgets.
* **Reusable measures**: Import or reuse measures across sheets to maintain consistency and save time.
* **Supports decision-making**: Provides actionable insights for planning, forecasting, and operational decisions.

### Where to use Intelligence sheets

Intelligence sheets are used for:

* **Reporting and analysis**: Create tabular reports to monitor key metrics.
* **Financial reporting**: Display metrics like revenue, expenses, COGS, and profitability in a clear, structured format.
* **Operational insights**: Analyze sales, headcount, and other operational metrics across teams or departments.
* **Forecasting and planning support**: Visualize projections and analyze variances.
* **Dashboards and presentations**: Use structured layouts, templates, and formatting to create presentation-ready reports for stakeholders.

## Key capabilities

The following table lists the core capabilities of Intelligence sheets.

| Capability | Description |
|---|---|
| **Financial reporting** | - Apply number formatting and scaling options <br>- Click and drag to reorder row and column dimensions <br>- Configure row and column totals and subtotals <br>- Insert calculated columns <br>- Apply borders, font, and background colors at column header, cell, and row category levels |
| **Paginated reporting** | - Create reports with First-Previous-Next-Last navigation <br>- Customize report header/footer; upload logos and add KPI cards <br>- Choose from predefined header and footer presets |
| **Commenting & collaboration** | - Add context to reports with cell, row, measure, and category level notes <br>- Create multi-threaded comments with task assignments and `@mentions` |
| **Excel, PDF, PNG export** | - Export reports as high-quality files with fully preserved layout and formatting. |
| **100+ charts** | - Brings over 100 business and storytelling charts. <br>- Includes special charts like marimekko, radar/polar, network graphs, sankey, multi axis charts, and lollipop, that are not available natively on Power BI |
| **Real-time intelligence** | - Connect to Planning sheets to visualize plans, budgets, forecasts, and simulations in real time |
| **Gantt chart** | - Best-in-class solution for project planning and resource allocation |

## Overview of Intelligence sheet steps

### Prerequisites

Before you create an Intelligence sheet, make sure that you have the following prerequisites in place:

* A **Fabric SQL database** to store the app metadata.
* [Connections or data sources](../../data-factory/data-source-management.md) to connect to **Fabric SQL databases** and **semantic models**.
* A **plan (preview)** item in your Fabric workspace.

### Create an Intelligence sheet

Follow these steps to get started with Intelligence sheets:

1. **Create an Intelligence sheet**
1. **Add a Matrix visual**: Map row and column dimensions and measures from semantic models, Excel/CSV files, or Planning sheets to create a tabular report.
1. **Add calculations and logic to the table**: Insert formulas, calculated measures, or manual input columns.
1. **Customize the table**: Change the layout, add headers and footers, format cells to customize the table.
1. **Insert charts**: Select the chart type most suited to the business case and assign the measures and dimensions to visualize.
1. **Add KPI cards**: Use KPI cards to highlight key metrics and variances.
1. **Collaborate and review**: Use comments, annotations, and notes to include additional perspective and insights in reports.
1. **Write back data**: Save your reports to configured destinations.

## Next steps

To create your first Intelligence sheet, see [Get started with Intelligence sheets](intelligence-how-to-get-started.md).