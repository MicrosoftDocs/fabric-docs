---
title: Copilot-Assisted Real-Time Data Exploration
description: Learn how to explore data with copilot in Real-Time dashboards for more insights about the information rendered in the visual.
ms.reviewer: mibar
ms.topic: how-to
ms.collection: ce-skilling-ai-copilot
ms.subservice: rti-dashboard
ms.date: 10/04/2026
ai-usage: ai-assisted
---

# Copilot-assisted real-time data exploration (Preview)

Real-Time dashboards help you monitor key metrics, detect anomalies, and make informed decisions. By using Copilot, you can explore the live data behind your dashboard by using natural language, without needing to write KQL queries.

Ask questions about your data, investigate trends, refine results, and generate visualizations. Copilot can explore data across an entire dashboard, a specific data source, or a particular visual. You can then save or share the resulting insights.

[!INCLUDE [Fabric feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A dashboard with visuals. For more information, see [Create a Real-Time dashboard](dashboard-real-time-create.md).

## Explore data with Copilot

Use Copilot to explore live dashboard data by using natural language. For example, you can:

* Change the time range.
* Filter by a column or value.
* Calculate averages, totals, or counts.
* Group results by a column.
* Summarize trends or anomalies across the data.

While Copilot analyzes your request, it provides progress updates so you can follow the exploration process. After the analysis finishes, Copilot summarizes the findings and suggests follow-up questions to help you continue exploring.

:::image type="content" source="media/dashboard-explore-copilot/dashboard-explore-copilot.png" alt-text="Screenshot of a real-time dashboard showing the Explore Data Copilot icon highlighted." lightbox="media/dashboard-explore-copilot/dashboard-explore-copilot.png":::

In your Fabric workspace, select a Real-Time dashboard, or [create](dashboard-real-time-create.md) a new dashboard, and ensure you're in **Viewing** mode.
Use the following steps to explore your data with Copilot:

[!INCLUDE [copilot-explore-data](../includes/copilot-explore-data.md)]

## Explore the entire dashboard

By default, Copilot explores data in the context of the entire dashboard. This approach lets you ask questions that span multiple visuals and uncover insights across all dashboard data.  
For example, you can ask:

* Which event types are increasing the most across all visuals?
* What unusual patterns appeared in the last 24 hours?
* How did overall performance change compared to the previous week?

## Explore a specific data source

In the Copilot side pane, select a specific data source when you want to focus your investigation on a particular dataset rather than the entire dashboard.

:::image type="content" source="media/dashboard-explore-copilot/select-data-source.png" alt-text="Screenshot of selecting a data source in the Copilot side pane." lightbox="media/dashboard-explore-copilot/select-data-source.png":::

Copilot considers the selected data source as the context for the conversation and generates example prompts tailored to that data source. This approach helps you ask relevant questions and quickly discover insights.

## Explore data from a specific visual

You can also begin an exploration from a specific visual. The selected visual provides context for your questions, so you can naturally refer to "this chart" or "these results." Copilot uses that context to understand your intent while analyzing the underlying dataset behind the visual, rather than only the data shown in the visual.

1. Select the Copilot icon on the visual to explore the data.

    :::image type="content" source="media/dashboard-explore-copilot/dashboard-tile-toolbar.png" alt-text="Screenshot of a dashboard visual showing the Copilot icon highlighted." lightbox="media/dashboard-explore-copilot/dashboard-tile-toolbar.png":::

1. A Copilot pop-up dialog opens with suggested prompts to help you get started exploring the visual's data.

    :::image type="content" source="media/dashboard-explore-copilot/tile-copilot-query.png" alt-text="Screenshot of the selected visual's Copilot dialog." lightbox="media/dashboard-explore-copilot/tile-copilot-query.png":::

1. In the side pane, follow Copilot's thought process as it analyzes the data and generates insights.

1. Review the results and any generated visuals.

    :::image type="content" source="media/dashboard-explore-copilot/copilot-side-pane.png" alt-text="Screenshot of the Copilot side pane showing the results of queries and generated visuals." lightbox="media/dashboard-explore-copilot/copilot-side-pane.png":::

1. Save or share the generated insights.

## Save and share Copilot insights

After discovering an insight with Copilot, you can save it to a dashboard or share it with others.

### Save insights to a dashboard

Select **Save to dashboard** to save the current visualization and query as a dashboard tile. You can save the tile to the current dashboard, an existing dashboard, or a new dashboard.

:::image type="content" source="media/dashboard-explore-copilot/tile-copilot-query-result.png" alt-text="Screenshot of the save to dashboard options in the Copilot pane.":::

Saved tiles stay connected to the underlying live data and continue updating as new data arrives.

### Share insights with others

You can share a link to the Copilot exploration with other users.

1. Select the **share** icon in the Copilot pane or in the expanded view.

    :::image type="content" source="media/dashboard-explore-copilot/share-icon.png" alt-text="Screenshot of the Copilot data results and visual.":::

1. In the share dialog, choose whether to include the visual in the shared insights, and then select **Copy link**.

    :::image type="content" source="media/dashboard-explore-copilot/share-dialog.png" alt-text="Screenshot of the Copilot share dialog.":::

1. Share the copied link with others. Recipients can view the results, rerun the query, save insights to a dashboard, and customize the visual when one is included.

## Related content

- [Create a real-time dashboard](dashboard-real-time-create.md)
- [Customize real-time dashboard visuals](dashboard-visuals-customize.md)
- [Use Copilot to edit tiles](dashboard-real-time-create.md#add-or-edit-tile)
