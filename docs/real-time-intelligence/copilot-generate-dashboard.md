---
title: Generate Real-Time Dashboard Using Copilot
description: Learn how to create insightful Real-Time Dashboards from your data using Copilot
ms.reviewer: mibar
ms.date: 10/04/2026
ms.topic: how-to
ms.subservice: rti-dashboard
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
no-loc: [Copilot]
---

# Generate Real-Time dashboards with Copilot in Fabric in the Real-Time intelligence workload

Within an eventhouse, Copilot can generate a Real-Time Dashboard for a selected database based on the tables it contains. This capability helps you quickly start analyzing trends and anomalies in streaming data.

Describe the insights you want in natural language, and Copilot creates a dashboard tailored to your selected data and goal.

For billing information about Copilot, see [Announcing Copilot in Fabric pricing](https://blog.fabric.microsoft.com/blog/announcing-fabric-copilot-pricing-2/).

## Prerequisites

- A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Create a dashboard with Copilot from an eventhouse

1. Go to the home page of the eventhouse that contains the data you want to visualize.

1. In the upper ribbon, under **New Real-Time Dashboard**, select **Generate with Copilot**.

    :::image type="content" source="media/copilot-generate-dashboard/generate-with-copilot.png" alt-text="Screenshot of the Generate with Copilot option in the upper ribbon." lightbox="media/copilot-generate-dashboard/generate-with-copilot.png":::

1. In the Copilot pane, describe the dashboard you want. Include your goal, the data to prioritize, and how you want the dashboard organized. Use the data-specific example prompts to help you get started.

    :::image type="content" source="media/copilot-generate-dashboard/copilot-pane.png" alt-text="Screenshot of the Copilot pane with a prompt to generate a dashboard." lightbox="media/copilot-generate-dashboard/copilot-pane.png":::

1. When analyzing your request, Copilot provides its thought process in the pane. You can follow along to see how Copilot interprets your request.

1. After Copilot generates a response, you can refine your prompt with follow-up requests to adjust the scope or focus of the dashboard, or select **Start dashboard creation** to proceed.

    :::image type="content" source="media/copilot-generate-dashboard/start-creation.png" alt-text="Screenshot of the Start dashboard creation button in the Copilot pane." lightbox="media/copilot-generate-dashboard/start-creation.png":::

1. Enter a name and location for the dashboard, and then select **Create**.

1. Once generated, update the dashboard by adjusting visual types or modifying queries as needed. You can use Copilot to assist with [editing visuals](dashboard-real-time-create.md#add-or-edit-tile) or with [writing queries](copilot-writing-queries.md).

1. Save your changes when the dashboard reflects the insights you want to monitor.

## Create a dashboard with Copilot from a KQL Queryset

1. Go to the KQL Queryset that contains the data you want to visualize.

1. In the upper ribbon, select **Generate with Real-Time Dashboard**.

    :::image type="content" source="media/copilot-generate-dashboard/query-generate-with-copilot.png" alt-text="Screenshot of the Generate with Copilot option in the KQL Queryset upper ribbon." lightbox="media/copilot-generate-dashboard/query-generate-with-copilot.png":::

1. In the Copilot pane, describe the dashboard you want. Include your goal, the data to prioritize, and how you want the dashboard organized. Use the data-specific example prompts to help you get started.

    :::image type="content" source="media/copilot-generate-dashboard/copilot-pane.png" alt-text="Screenshot of the Copilot pane with a prompt to generate a dashboard." lightbox="media/copilot-generate-dashboard/copilot-pane.png":::

1. When analyzing your request, Copilot provides its thought process in the pane. You can follow along to see how Copilot interprets your request.

1. After Copilot generates a response, you can refine your prompt with follow-up requests to adjust the scope or focus of the dashboard, or select **Start dashboard creation** to proceed.

    :::image type="content" source="media/copilot-generate-dashboard/start-creation.png" alt-text="Screenshot of the Start dashboard creation button in the Copilot pane." lightbox="media/copilot-generate-dashboard/start-creation.png":::

1. Enter a name and location for the dashboard, and then select **Create**.

1. Once generated, update the dashboard by adjusting visual types or modifying queries as needed. You can use Copilot to assist with [editing visuals](dashboard-real-time-create.md#add-or-edit-tile) or with [writing queries](copilot-writing-queries.md).

1. Save your changes when the dashboard reflects the insights you want to monitor.

## Related content

- [Create a Real-Time Dashboard](dashboard-real-time-create.md)
- [Explore data with Copilot](dashboard-explore-data.md)
- [Customize dashboard visuals](dashboard-visuals-customize.md)
- [Privacy, security, and responsible use of Copilot for Real-Time Intelligence](../fundamentals/copilot-real-time-intelligence-privacy-security.md)
