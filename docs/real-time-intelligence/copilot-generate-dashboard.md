---
title: Generate Real-Time Dashboard Using Copilot
description: Learn how to create insightful Real-Time Dashboard from your data using Copilot
author: spelluru
ms.author: spelluru
ms.reviewer: mibar, maghan
ms.date: 08/21/2025
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
no-loc: [Copilot]
---

# Generate Real-Time dashboard with Copilot in Fabric in the Real-time intelligence workload

Copilot makes it easy to create dashboards by automating the initial setup. You don't need any technical expertise. The process includes selecting a data table in Real-Time Hub or KQL Queryset and using AI to generate a Real-Time Dashboard. The dashboard includes an insights page for a quick overview and a data profile page.

For billing information about Copilot, see [Announcing Copilot in Fabric pricing](https://blog.fabric.microsoft.com/en-us/blog/announcing-fabric-copilot-pricing-2/).

## Prerequisites

- A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

- Write access to a [KQL queryset](../real-time-intelligence/kusto-query-set.md) or [Real-Time Dashboard](../real-time-intelligence/dashboard-real-time-create.md)

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Creating a Real-Time Dashboard with Copilot

You can create a Real-Time Dashboard with Copilot in several ways:

- **From the Real-Time Hub**: Create a dashboard directly from the Real-Time Hub by selecting a data stream and then a table.
- **From the KQL Queryset**: Create a dashboard from a KQL Queryset by selecting a table.

1. Select the three dots next to the table name and select **Create Real-Time Dashboard**.

    :::image type="content" source="media/copilot-generate-dashboard/three-dots.png" alt-text="Screenshot of selecting the data source." lightbox="media/copilot-generate-dashboard/three-dots.png":::

1. In the dialog box, select **Get started** to proceed. You can stop the process at any time while the dashboard is being created.

    :::image type="content" source="media/copilot-generate-dashboard/dialog.png" alt-text="Screenshot of copilot dialog." lightbox="media/copilot-generate-dashboard/dialog.png":::

## Insights Page and Data Profile Page

Copilot automatically generates the Insights Page and Data Profile Page. The Insights Page provides a quick overview of the data, while the Data Profile Page offers detailed information about the data structure and statistics.

:::image type="content" source="media/copilot-generate-dashboard/insights.png" alt-text="Screenshot of the Insights page in Real-Time Dashboard." lightbox="media/copilot-generate-dashboard/insights.png":::

:::image type="content" source="media/copilot-generate-dashboard/profile.png" alt-text="Screenshot of the data profile page." lightbox="media/copilot-generate-dashboard/profile.png":::

## Related content

- [Privacy, security, and responsible use of Copilot for Real-Time Intelligence](../fundamentals/copilot-real-time-intelligence-privacy-security.md)
- [Copilot for Microsoft Fabric: FAQ](../fundamentals/copilot-faq-fabric.yml)
- [Copilot in Fabric](../fundamentals/copilot-fabric-overview.md)
- [Query data in a KQL queryset](../real-time-intelligence/kusto-query-set.md)
