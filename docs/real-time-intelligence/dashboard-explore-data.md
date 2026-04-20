---
title: Copilot-Assisted Real-Time Data Exploration
description: Learn how to explore data with copilot in Real-Time dashboards for more insights about the information rendered in the visual.
ms.reviewer: mibar
ms.topic: how-to
ms.collection: ce-skilling-ai-copilot
ms.subservice: rti-dashboard
ms.date: 04/15/2026
ai-usage: ai-assisted
---

# Copilot-assisted real-time data exploration (preview)

Real-time dashboards show key metrics, help you spot anomalies, and let you make fast, informed decisions. By using Copilot, you can use natural language to explore the live data behind your real-time dashboard, each tile, or in KQL tables. Ask questions, refine visuals, and uncover and share insights without needing to use KQL query language.

After exploring data by using Copilot, save insights to the dashboard for quick access, view streaming or near real-time updates, and [share them with your team](#share-copilot-exploration-insights).

 [!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

>[!NOTE]
>
> Currently, Copilot-assisted data exploration in real-time dashboards supports dashboards with a *single* data source and *View mode* only.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A dashboard with visuals. Learn more in [Create a real-time dashboard](dashboard-real-time-create.md).

## Explore dashboards with Copilot

Use Copilot to explore data in the context of the entire dashboard or of a specific tile. Ask questions about the overall data, request summaries, or seek insights that span multiple tiles. For example, you can change the time frame, filter by a column or value, calculate an average or total, or group by a column. Each time you explore the data with Copilot, you can view the data updates in Copilot, and when ready you can save the insights as a new tile in the dashboard or [share them with others](#share-copilot-exploration-insights).

1. In your Fabric workspace, select a real-time dashboard, or [create](dashboard-real-time-create.md) a new dashboard.

    By default, the Copilot pane opens in the context of the entire dashboard. Ensure that you are in **Viewing** mode.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot.png" alt-text="Screenshot of a real-time dashboard showing the Explore Data Copilot icon highlighted." lightbox="media/dashboard-explore-copilot/dashboard-explore-copilot.png":::

[!INCLUDE [copilot-explore-data](../includes/copilot-explore-data.md)]

## Contextual Copilot data exploration

In addition to exploring data in the context of the entire dashboard, you can also explore data in the context of a specific tile. When you use this feature, you can ask questions and get insights specific to the data behind that tile. You can then save those insights as a new tile on the dashboard or [share them with others](#share-copilot-exploration-insights).

1. Select the Copilot icon on the tile to explore the data.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-toolbar.png" alt-text="Screenshot of a dashboard tile showing the Copilot icon highlighted.":::

1. A Copilot dialog opens, so you can ask questions and explore insights specific to that tile's data. To help you get started, the dialog includes suggested queries.

    :::image type="content" source="media/dashboard-explore-copilot/tile-copilot-query.png" alt-text="Screenshot of the selected tile's Copilot dialog.":::

1. After asking questions and exploring the data, select **Save to dashboard** to save the insights as a new tile on the dashboard. You can also save the tile to a different existing dashboard or create a new dashboard for the tile.

    :::image type="content" source="media/dashboard-explore-copilot/tile-copilot-query-result.png" alt-text="Screenshot of the Copilot pane showing the save to dashboard options.":::

## Share Copilot exploration insights

After you explore data and find insights by using Copilot, share those insights with others by sharing a link to the Copilot pane. When others open the link, they see the same Copilot pane with the question and results you have. You can optionally include the visual in the shared insights.

1. Select the **share** icon in the Copilot pane or in the expanded view.

    :::image type="content" source="media/dashboard-explore-copilot/copilot-data-pane.png" alt-text="Screenshot of the Copilot data results and visual.":::

1. In the share dialog, choose whether to include the visual in the shared insights, and then select **Copy link**.

    :::image type="content" source="media/dashboard-explore-copilot/share-dialog.png" alt-text="Screenshot of the Copilot share dialog.":::

1. Share the copied link with others. When they open the link, they see a read-only view of the results and visual, if included. They can do the following tasks with the shared insights:
    1. Save the query to an existing or new KQL Queryset.
    1. Run the query, share it again, save to either a new or existing dashboard, and more.
    1. If the visual is included, they can modify the visual type and customize it.

    :::image type="content" source="media/dashboard-explore-copilot/shared-query.png" alt-text="Screenshot of the shared Copilot query with visual customization options.":::

## Related content

- [Create a real-time dashboard](dashboard-real-time-create.md)
- [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md)
