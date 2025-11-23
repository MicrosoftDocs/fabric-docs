---
title: Copilot-Assisted Real-time Data Exploration
description: Learn how to explore data with copilot in Real-Time Intelligence dashboards for more insights about the information rendered in the visual.
ms.reviewer: mibar
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.collection: ce-skilling-ai-copilot
ms.custom:
ms.date: 11/23/2025
---
# Copilot-assisted real-time data exploration

Real-time dashboards show key metrics, help you spot anomalies, and let you make fast, informed decisions. With Copilot, use natural language to explore the live data behind your real-time dashboard, each tile, or in KQL tables. Ask questions, refine visuals, and uncover insights without needing to use query language.

After exploring data with Copilot, save insights to the dashboard for quick access, view streaming or near real-time updates, and share them with your team.

Explore real-time data at the [dashboard](#explore-dashboards-with-copilot) or [tile](#explore-tiles-with-copilot) level.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A dashboard with visuals. Learn more in [Create a real-time dashboard](dashboard-real-time-create.md).

## Explore dashboards with Copilot

Use Copilot to explore data in the context of the entire dashboard. Ask questions about the overall data, request summaries, or seek insights that span multiple tiles.

1. In your Fabric workspace, select a real-time dashboard. By default, the Copilot pane opens in the context of the entire dashboard.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot.png" alt-text="Screenshot of a real-time dashboard showing the Explore Data Copilot icon highlighted." lightbox="media/dashboard-explore-copilot/dashboard-explore-copilot.png":::

1. In the Copilot pane, ask a question or make a request about the data in the dashboard. For example, "Show me the total sales by region" or "What are the top five products by revenue?"

1. Continue exploring and drill through the data by asking follow-up questions or making additional requests. Save your insights to the dashboard by selecting **Save to dashboard**. This action saves the current view and query as a new tile on the dashboard. Each saved tile stays connected to your live data, so as the data updates, your visual does too.

1. Optionally, adjust the visual options manually using the **Visual Options** pane to fine-tune chart types, columns, or formatting to match your preferences.

## Explore tiles with Copilot

The **Explore Data** icon in each tile opens the Copilot pane so you can ask questions to explore the data in the specific tile.

For example, you can change the time frame, filter by a column or value, calculate an average or total, or group by a column. Each time you explore the data with Copilot, the tile data updates, and you can save the insights as a new tile in the dashboard.

These instructions explain how to explore tile data using Copilot with the storm events sample data as an example.

1. In your Fabric workspace, select a real-time dashboard.

1. Select the **Explore Data** icon on the tile to explore the data.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-toolbar.png" alt-text="Screenshot of a Real-Time Dashboard tile showing the explore data copilot icon highlighted.":::

1. Enter your request in the Copilot dialog box.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-toolbar-dialog.png" alt-text="Screenshot of a Real-Time Dashboard tile showing the explore data copilot dialog highlighted. This is where you enter your question to Copilot.":::

1. For this example, enter "Show me data for Texas only," and select the **Submit** icon.

    :::image type="content" source="media/copilot-data-explore/dashboard-tile-copilot-ask.png" alt-text="Screenshot of a Real-Time Dashboard tile showing the explore data copilot dialog with a question typed and the submit button activated.":::

[!INCLUDE [copilot-explore-data](../includes/copilot-explore-data.md)]

### Configure visual options manually

Manually change the display using the **Visual Options** pane.

1. Select the Visual tab and expand **Visual Options**.

1. In the **Visual Options** pane, change the visual type, add or remove columns, and adjust the legend's location.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-visual-options.png" alt-text="Screenshot of the visual pane, showing the dropdown selector options.":::

    The options available depend on the type of visual you use. For example, with a bar chart, change the orientation, adjust axis labels, and more. With a table visual, add or remove columns, change column order, and apply sorting.
