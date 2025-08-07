---
title: Explore Data with Copilot in Real-Time Dashboard tiles
description: Learn how to explore data with copilot in Real-Time Intelligence dashboard tiles for more insights about the information rendered in the visual.
ms.reviewer: mibar
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 08/07/2025
---
# Explore data in real-time dashboards with Copilot

Real-Time Dashboard tiles show key metrics, help you spot anomalies, and let you make fast, informed decisions. Exploring tile data with Copilot gives you a natural language interface to explore real-time data, ask questions, and get insights from the visualizations.

You explore and act on data without knowing the query language or other technical skills. After you explore data with Copilot, pin insights to the dashboard for quick access, view streaming or near real-time updates, and share with your team.

:::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot.png" alt-text="Screenshot of a Real-Time Dashboard showing the explore data copilot icon highlighted.":::

You explore data from each tile in the dashboard. Select the **Explore Data** icon on the tile toolbar to open the tile visual next to a Copilot pane. Copilot gives you a natural language interface to interact with the data behind the visual. You can also interact with the visual, set options, view data in a table, and see the underlying query.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A dashboard with visuals. For more information, see [Create a real-time dashboard](dashboard-real-time-create.md).

## Explore data with Copilot

From the dashboard, you can [explore the data](#explore-data-with-copilot) in the tile using Copilot, [interact](#interact-with-the-diagram) with the visual, manually set up the [visual options](#configure-visual-options), view the [tabular results](#view-the-tablur-results), and see the [underlying query](#view-the-underlying-query).

:::image type="content" source="media/dashboard-explore-copilot/dashboard-data-explore-tile.png" alt-text="Screenshot of a Real-Time Dashboard explore data window.":::

1. In your Fabric workspace, select a Real-Time Dashboard.

1. On the tile you want to explore, select the **Explore Data** icon.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-toolbar.png" alt-text="Screenshot of a Real-Time Dashboard tile showing the explore data copilot icon highlighted.":::

1. In the Copilot pane, enter a question or request about the data in the tile. For example, request "Show me data for Texas only" or "Show me the top five products by revenue."

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot-request.png" alt-text="Screenshot of the explore data copilot frame with a request highlighted.":::

1. Copilot shows a response with a KQL query version of your request or question. Select **View results**.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot-response.png" alt-text="Screenshot of the explore data copilot frame with a response highlighted.":::

1. Ask Copilot more questions to refine your results or explore different aspects of the data. For example, ask "What is the trend over the last 30 days?"

1. In the **Visual** tab, interact with the resulting data. Hover over data points to see details, zoom in on specific areas, and select elements to filter or highlight related data.

1. Select the **Table** tab to view the tabular results of the query.  

1. Select the **Query** tab to view the underlying query for the response.

   For more technical users that prefer to use the underlying Kusto Query Language (KQL) to further analyze the data, change from **Viewing** to **Editing** mode. Permissions are required. For more information about how to create custom queries, and build more complex visualizations, see [Use KQL in Real-Time Dashboards](dashboard-kql.md).

1. When you're ready to pin your insights to the dashboard, select **Pin to dashboard**. This action saves the current view and query as a new tile on the dashboard.

### Configure visual options manually

Make manual display changes using the **Visual Options** pane.

1. Expand **Visual Options**.

1. In the **Visual Options** pane, change the visual type, add or remove columns, and change the legend location.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-visual-options.png" alt-text="Screenshot of the visual pane, showing the dropdown selector options.":::

    The options available depend on the type of visual you use. For example, with a bar chart, change the bar orientation, adjust axis labels, and more. With a table visual, add or remove columns, change column order, and apply sorting.

## Related content

* [Create a real-time dashboard](dashboard-real-time-create.md)
* [Customize real-time dashboard visuals](dashboard-visuals-customize.md)
* [Apply conditional formatting in real-time dashboard visuals](dashboard-conditional-formatting.md)
* [Use parameters in real-time dashboards](dashboard-parameters.md)
* [Real-time dashboard-specific visuals](dashboard-visuals.md)
