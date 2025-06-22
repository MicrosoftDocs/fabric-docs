---
title: Copilot for Real-Time Intelligence (nl2kql)
description: Learn how to use Copilot in Real-Time Dashboard transform your data into a Real-Time Dashboard and extract valuable insights.
author: v-hzargari
ms.author: v-hzargari
ms.reviewer: mibar
ms.topic: how-to
ms.custom:
ms.date: 06/19/2025
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Copilot for Real-Time Dashboard

Copilot for Real-Time Dashboard makes it easy to create dashboards by automating the inital setup, eliminating the need for technical expertise. The process includes selecting a data table in Real-Time Hub or KQL Queryset and using AI to generate a Real-Time Dashboard, that includes an insights page for a quick overview, and a data profile page.

For billing information about Copilot, see [Announcing Copilot in Fabric pricing](https://blog.fabric.microsoft.com/en-us/blog/announcing-fabric-copilot-pricing-2/).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Creating a Real-Time Dashboard with Copilot
1. Navigate to the Real-Time Hub in your workspace.
1. Choose a table from your KQL database that you want to visualize.
1. Click the three dots next to the table name and select **Create Real-Time Dashboard**.

:::image type="content" source="media/copilot-real-time-dashboard/three-dots.png" alt-text="Screenshot of selecting the data source." lightbox="media/copilot-real-time-dashboard/three-dots.png":::

1. In the dialog box, click **Get started** to proceed. You can stop the process at any time while the dashboard is being created.

:::image type="content" source="media/copilot-real-time-dashboard/dialog.png" alt-text="Screenshot of copilot dialog." lightbox="media/copilot-real-time-dashboard/dialog.png":::

## Dashboard Overview

### Insights Page

Split into 5 tiles, this page provides quick insights based on the selected table's metadata and general instructions for creating KQL queries.

:::image type="content" source="media/copilot-real-time-dashboard/insights.png" alt-text="Screenshot of the Insights page in Real-Time Dashboard." lightbox="media/copilot-real-time-dashboard/insights.png":::

### Data Profile Page
This page features six tiles, four base tables, and three parameters. You can choose any DateTime column or the Cross-filter function to filter the displayed data.  

:::image type="content" source="media/copilot-real-time-dashboard/profile.png" alt-text="Screenshot of the data profile page." lightbox="media/copilot-real-time-dashboard/profile.png":::

:::image type="content" source="media/copilot-real-time-dashboard/select-column.png" alt-text="Screenshot of the cross-filter function." lightbox="media/copilot-real-time-dashboard/select-column.png":::

## Related content

* [Privacy, security, and responsible use of Copilot for Real-Time Intelligence (preview)](copilot-real-time-intelligence-privacy-security.md)
* [Copilot for Microsoft Fabric: FAQ](copilot-faq-fabric.yml)
* [Overview of Copilot in Fabric (preview)](copilot-fabric-overview.md)
* [Query data in a KQL queryset](/real-time-intelligence/kusto-query-set.md)