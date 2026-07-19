---
title: Get visual responses from a Fabric data agent (preview)
description: Learn how to get visual responses such as charts and graphs from a Fabric data agent.
ms.author: scottpolly
author: s-polly
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 05/08/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
#customer intent: As an Analyst, I want to get visual responses from a Fabric data agent so that I can explore data insights through charts and graphs.
---

# Get visual responses from a Fabric data agent (preview)

The Fabric data agent can return interactive visual responses, such as charts and graphs, in addition to text and table-based answers. Visual responses help you quickly identify trends, patterns, and outliers in your data without leaving the conversational interface.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

## How to generate visuals

The Fabric data agent can generate a visualization as part of its response in the following scenarios:
- The user explicitly requests a visual (for example, "create a bar chart of sales by region")
- The user implicitly requests a visual (for example, "show me sales by region")
- The agent infers the user would benefit from a visual based on the data or query (for example, "what are the sales trends over the past year?")

### Example questions to generate visuals

- "Show me a chart of monthly sales for 2025."
- "Compare revenue across regions in a bar chart."
- "What's the trend of customer signups over the last 12 months?"
- "Show the distribution of order values."

The agent determines the most appropriate chart type based on your question and the data returned. If you want a specific chart type, include it in your question (for example, "as a line chart" or "as a bar chart").

:::image type="content" source="media/data-agent-visuals/data-agent-visual.png" lightbox="media/data-agent-visuals/data-agent-visual.png" alt-text="Screenshot of a Data Agent chat interface. The user prompt reads 'Show revenue and profit by customer segment.' The agent provides a text response along with a multi-column bar chart.":::

> [!TIP]
> Hover over the chart to view tooltips with additional information.

## Supported data sources

The Fabric data agent supports visual responses for data from all supported data source types, including lakehouses, warehouses, Power BI semantic models, and more.

## Supported visual types

The following visual types are currently supported:
   - Line chart
   - Multi-line chart
   - Column chart
   - Multi-column chart
   - Stacked column chart
   - Pie chart
   - Scatter plot
   - Area chart
   - Stacked area chart

## Customization
Agent instructions can be used to guide the agent's use of visuals. For example, you can instruct the agent to always include a visual for certain types of questions, or to prefer specific chart types for certain data patterns. For more information on agent instructions, see [Best practices for configuring data agents](data-agent-configuration-best-practices.md).

The colors, font sizes, title, and labels are preset and currently can't be customized.

> [!TIP]
> Visuals are enabled by default. To avoid generating visuals or specify the behavior, you can use agent instructions to instruct the agent to avoid using visuals. For more information on agent instructions, see [Best practices for configuring data agents](data-agent-configuration-best-practices.md).

## Limitations

- The quality and type of visualization depends on the nature of the data returned by the underlying query.
- Visuals currently support up to 200 rows of data. When a query returns more than 200 rows, only the first 200 are charted, so the visualization represents a truncated result set.
- Chart types are limited to the [Supported visual types](#supported-visual-types).
- The colors, font sizes, title, and labels are preset and currently can't be customized.
- These visuals are currently only supported in the data agent experience in Fabric and not in other clients like SDK, M365 Copilot, Teams, or Foundry.
    - When you consume a Fabric data agent through Microsoft 365 Copilot, you can use code interpreter to generate visualizations from the results returned by the data agent.

## Related content

- [Data agent concepts](concept-data-agent.md)
- [Data agent configurations](data-agent-configurations.md)
- [Consume a data agent from Microsoft 365 Copilot](data-agent-microsoft-365-copilot.md)
- [How to create a Fabric data agent](how-to-create-data-agent.md)
- [Best practices for configuring data agents](data-agent-configuration-best-practices.md)
