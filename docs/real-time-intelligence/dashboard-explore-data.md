---
title: Explore Data with Copilot in Real-Time Dashboard tiles
description: Learn how to explore data with copilot in Real-Time Intelligence dashboard tiles for more insights about the information rendered in the visual.
ms.reviewer: mibar
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 08/11/2025
---
# Explore data in real-time dashboards with Copilot

Real-Time Dashboard tiles show key metrics, help you spot anomalies, and let you make fast, informed decisions. Exploring tile data with Copilot gives you a natural language interface to explore real-time data, ask questions, and get insights from the visualizations.

You explore and act on data without knowing the query language or other technical skills. After you explore data with Copilot, pin insights to the dashboard for quick access, view streaming or near real-time updates, and share with your team.

:::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot.png" alt-text="Screenshot of a Real-Time Dashboard showing the explore data copilot icon highlighted.":::

You explore data from each tile in the dashboard. Select the **Explore Data** icon on the tile toolbar to open the tile visual next to a Copilot pane. Copilot gives you a natural language interface to interact with the data behind the visual. You can also interact with the visual, set [visual options](#configure-visual-options), view data in a table, and see the underlying query.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A dashboard with visuals. For more information, see [Create a real-time dashboard](dashboard-real-time-create.md).

## Explore data with Copilot

Explore a tile's data using Copilot, for example, to change the time frame, filter by a column or value, calculate an average or total, or group by a column. Each time you explore the data with Copilot, the results of the visual, table, and underlying query update and you can save the insights as a new tile in the dashboard. Using the storm events sample data as an example, the following instructions show you how to explore data in a tile using Copilot.

1. In your Fabric workspace, select a Real-Time Dashboard.

1. On the tile you want to explore, select the **Explore Data** icon.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-toolbar.png" alt-text="Screenshot of a Real-Time Dashboard tile showing the explore data copilot icon highlighted.":::

    The tile visual opens next to the Copilot pane. The visual shows the storm event types in the United States, and the Copilot pane is ready for your request.

    ### [Visual](#tab/visual)

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-data-explore-tile.png" alt-text="Screenshot of the visual tab showing a pie chart of the storm event types.":::

    ### [Table](#tab/table)

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-data-explore-table.png" alt-text="Screenshot of the table tab showing the storm even types in tabular format.":::

    ### [Query](#tab/query)

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-data-explore-query.png" alt-text="Screenshot of the visual tab showing the KQL query that is run to display the visual and table results.":::

    ---

1. In the Copilot pane, enter a question or a request about the data in the tile. For example, "Show me data for Texas only" or "Show me the top five products by revenue."

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot-request.png" alt-text="Screenshot of the explore data copilot frame with a request highlighted.":::

1. Click the :::image type="icon" source="media/dashboard-explore-copilot/dashboard-explore-copilot-enter-button.png" border="false"::: enter button. Copilot shows a response with a KQL query version of your request or question.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot-response.png" alt-text="Screenshot of the explore data copilot frame with a response highlighted.":::

1. Select **View results**. (replace images)

    The results now display data for Texas only in the **Visual** tab and in the table of results in the **Table** tab. In the **Query** tab, you can see the modified underlying.

    ### [Visual](#tab/visual)

    The visual tab shows the pie chart for Texas data only.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-data-explore-visual-texas.png" alt-text="Screenshot of the visual tab showing a pie chart of the storm event types in Texas.":::

    ### [Table](#tab/table)

    The table tab shows the tabular data for Texas data only.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-data-explore-table-texas.png" alt-text="Screenshot of the table tab showing the storm even types in Texas in tabular format.":::

    # [Query](#tab/query)

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-data-explore-query-texas.png" alt-text="Screenshot of the visual tab showing the KQL query that is run to display the visual and table results.":::

    ---

1. Ask Copilot more questions to refine your results or explore different aspects of the data. For example, you can ask "What are the top five storm event types in Texas?" or "Show me the storm events by month."

1. When you're ready to save your insights to the dashboard, select **Save to dashboard**. This action saves the current view and query as a new tile on the dashboard.

### Configure visual options manually

Make manual display changes using the **Visual Options** pane.

1. Expand **Visual Options**.

1. In the **Visual Options** pane, change the visual type, add or remove columns, and change the legend location.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-visual-options.png" alt-text="Screenshot of the visual pane, showing the dropdown selector options.":::

    The options available depend on the type of visual you use. For example, with a bar chart, change the bar orientation, adjust axis labels, and more. With a table visual, add or remove columns, change column order, and apply sorting.
