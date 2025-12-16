---
title: Copilot-Assisted Real-time Data Exploration
description: Learn how to explore data with copilot in Real-Time Intelligence dashboards for more insights about the information rendered in the visual.
ms.reviewer: mibar
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.collection: ce-skilling-ai-copilot
ms.subservice: rti-dashboard
ms.custom:
ms.date: 12/15/2025
---
# Copilot-assisted real-time data exploration (preview)

Real-time dashboards show key metrics, help you spot anomalies, and let you make fast, informed decisions. With Copilot, you can use natural language to explore the live data behind your real-time dashboard, each tile, or in KQL tables. Ask questions, refine visuals, and uncover and share insights without needing to use KQL query language.

After exploring data with Copilot, save insights to the dashboard for quick access, view streaming or near real-time updates, and share them with your team.

 [!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

>[!NOTE]
>
> Currently, Copilot-assisted data exploration in Real-Time Intelligence dashboards supports the following scenarios:
>
> - A single-data source
> - View mode

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A dashboard with visuals. Learn more in [Create a real-time dashboard](dashboard-real-time-create.md).

## Explore dashboards with Copilot

Use Copilot to explore data in the context of the entire dashboard or of a specific tile. Ask questions about the overall data, request summaries, or seek insights that span multiple tiles. For example, you can change the time frame, filter by a column or value, calculate an average or total, or group by a column. Each time you explore the data with Copilot, you can view the data updates in Copilot, and when ready you can save the insights as a new tile in the dashboard.

These instructions explain how to explore data using Copilot with the storm events sample data as an example.

1. In your Fabric workspace, select a real-time dashboard, or [create](dashboard-real-time-create.md) a new dashboard.

    By default, the Copilot pane opens in the context of the entire dashboard. Ensure that you are in **Viewing** mode.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot.png" alt-text="Screenshot of a real-time dashboard showing the Explore Data Copilot icon highlighted." lightbox="media/dashboard-explore-copilot/dashboard-explore-copilot.png":::

1. Start exploring the real-time data using Copilot. Select one of the following options:

    1. **To explore all dashbaord data:** In the Copilot pane, ask a question or make a request about the data in the dashboard. For example, "Show me the total sales by region" or "What are the top five products by revenue?".

        :::image type="content" source="media/dashboard-explore-copilot/dashboard-copilot-results.png" alt-text="Screenshot of a Real-Time Dashboard showing the copilot pane with a question typed and the tabular data returned inside the copilot pane.":::

    1. **To explore data in a specific tile:** Select the **Explore Data** icon on the tile to explore the data.

        :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-toolbar.png" alt-text="Screenshot of a Real-Time Dashboard tile showing the explore data copilot icon highlighted.":::

        A promt appears to help you ask questions about the data in that tile.

        :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-prompt.png" alt-text="Screenshot of a Real-Time Dashboard tile showing the explore data copilot prompt expanded.":::

    1. For this example, enter "Show me data for Texas only," and select the **Submit** arrow.

        In the Copilot pane, you see your query and the response to your query including a preview of the new data. You can also toggle between the **Visual**, **Table**, and **Query** tabs to see different representations of the data inside the Copilot pane.

        :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-copilot-ask.png" alt-text="Screenshot of a Real-Time Dashboard tile showing the explore data copilot dialog with a question typed and the query results. The question, tabs, and expand buttons are highlighted":::

### Continue data exploration

[!INCLUDE [copilot-explore-data](../includes/copilot-explore-data.md)]

### Configure visual options manually

Manually change the display using the **Visual Options** pane.

1. Select the Visual tab and expand **Visual Options**.

1. In the **Visual Options** pane, change the visual type, add or remove columns, and adjust the legend's location.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-visual-options.png" alt-text="Screenshot of the visual pane, showing the dropdown selector options.":::

    The options available depend on the type of visual you use. For example, with a bar chart, change the orientation, adjust axis labels, and more. With a table visual, add or remove columns, change column order, and apply sorting.
