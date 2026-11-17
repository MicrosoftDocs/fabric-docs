---
title: Add charts and tables to Fabric apps
description: Use Fabric visual components to have a coding agent build charts, KPI cards, tables, and filters in your Fabric app, and learn how to review what it builds.
ms.topic: how-to
ms.date: 11/06/2026
ai-usage: ai-assisted
---

# Add charts and tables to Fabric apps

Fabric visual components are the charts, KPI cards, tables, and filters that a coding agent uses to build analytical Fabric apps. You describe the visuals you want, the agent builds them with these components, and you review the result.

This article explains what the components give you, how to ask an agent for good visuals, and how to tell whether what it built is right. You don't need to write chart code yourself. If you build apps in Power BI Desktop for Apps, see [Create Fabric apps with Power BI Desktop for Apps](create-app-power-bi-desktop.md) instead.

## Why use Fabric visual components

Visual components are one of the reasons to [start from the data app template](data-apps-template.md#why-use-the-data-app-template). The agent writes a short description of each chart, and the components take care of the rest:

- **Consistent formatting from your data.** Display names and format strings from your semantic model appear on axes, column headers, tooltips, and labels. A chart and a table built from the same query show the same names and formats.
- **Your app's theme.** Colors, fonts, and spacing come from the app, and light and dark mode switch automatically.
- **Built-in best practices for charts.** Readable axis labels, compact numbers such as $10K, data labels where they help, scrolling when there are too many categories, and tooltips that show every series on a line chart.
- **Interaction.** People can select a bar, point, row, or filter value, and your app can respond, such as by filtering the other visuals on the page.
- **Accessibility.** People can explore charts with the keyboard and select data points without a mouse. On touch screens, a long press shows the tooltip.
- **Checks the agent can run.** The agent can validate chart definitions before you see them, so fewer broken or empty visuals reach your review.

## What you can ask for

| Visual | Use it for |
| --- | --- |
| Charts | Comparisons, trends, distributions, and parts of a whole: bar, column, line, area, scatter, pie, and more |
| KPI cards | A headline number, with an optional small trend chart or comparison value |
| Data grids | Detailed records, with sorting, filtering, and pagination |
| Slicers | Filters for a list of values, a dropdown, a date range, or a numeric range |

If you ask for something the components can't do, the agent tells you before it uses another library.

## Set up your app

<!-- TODO (Q2): confirm the setup routes. -->

Apps created from the data app template include the visual components and the agent skills that explain how to use them. For more information, see [Create an app connected to a semantic model](data-apps-template.md).

For an app created from another Fabric Apps template, add the visuals pack:

```bash
npm run pack:add -- visuals
```

This command installs the chart and data grid components, adds the **visuals** skill so your agent knows how to use them, and adds a `validate:visual` check for chart definitions.

## Ask for visuals

Describe what each visual is for, not only the chart type. The more the agent knows about the purpose, the better its choices about chart type, sorting, and formatting.

| Instead of | Try |
| --- | --- |
| "Add a bar chart." | "Add a chart that compares revenue by region for this fiscal year, highest first." |
| "Show the sales data." | "Add a table of the top 50 orders with customer, date, and amount. Make it sortable by amount." |
| "Make a dashboard." | "Add KPI cards for revenue, margin, and order count, then a line chart of monthly revenue. Selecting a month should filter the cards." |
| "Add filters." | "Add a date range slicer and a region dropdown at the top of the page. They should filter every visual on the page." |

Also mention:

- **Formats**, if the semantic model doesn't define them: currency, percentages, or decimal places.
- **Interaction:** what should happen when someone selects part of a visual.
- **Exceptions to the defaults**, such as "show full numbers on this axis."

## Review what the agent built

Check these items before you accept a visual:

- **The numbers are right.** Compare a value or two with the source, such as a total in the semantic model.
- **Names and formats come from your data.** Axis titles, column headers, and tooltips should show display names such as "Revenue", not column names such as `SumOfRevenue`, and use your formats.
- **It follows the theme.** Switch between light and dark mode. Nothing should keep a hard-coded color.
- **Interactions work.** Select a bar, row, or slicer value, and confirm that the rest of the page responds the way you asked.
- **It works with the keyboard.** Tab to the chart, press **Enter**, and move through the data with the arrow keys.
- **Validation passed.** Ask the agent for the `validate:visual` result. For charts built at runtime, the check reports `incomplete`; the agent then has to check those charts in the browser instead.

## Reference

For the complete API, see the package READMEs:

<!-- TODO (Q3): confirm the public links. -->

- [`@microsoft/fabric-visuals`](https://www.npmjs.com/package/@microsoft/fabric-visuals): charts and KPI cards
- [`@microsoft/fabric-datagrid`](https://www.npmjs.com/package/@microsoft/fabric-datagrid): data grids
- [`@microsoft/fabric-slicers`](https://www.npmjs.com/package/@microsoft/fabric-slicers): slicers
- [`@microsoft/fabric-visuals-core`](https://www.npmjs.com/package/@microsoft/fabric-visuals-core): the shared `DataTable` format and theme

The components are built for React, which all Fabric Apps templates use. Web Components and Angular versions of the chart and data grid are also available.

## Related content

- [Create an app connected to a semantic model](data-apps-template.md)
- [Develop apps with AI agents](ai-agent-development-for-apps.md)
- [Create Fabric apps with Power BI Desktop for Apps](create-app-power-bi-desktop.md)
- [Vega-Lite documentation](https://vega.github.io/vega-lite/docs/)
