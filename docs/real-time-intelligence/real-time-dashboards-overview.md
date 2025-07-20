---
title: What is Real-Time Dashboards?
description: Learn about Real-Time Dashboards in Microsoft Fabric.
ms.reviewer: mibar
ms.author: v-hzargari
author: hzargari-ms
ms.topic: overview
ms.custom:
ms.date: 07/17/2025
ms.search.form: Overview
---

# What is Real-Time Dashboards?

Real-Time Dashboards in Microsoft Fabric provide a dynamic way to visualize and monitor data as it changes. This overview explains how Real-Time Dashboards work, their key features, and how you can use them to gain timely insights from your data. Whether you generate dashboards manually or use Copilot, an AI-powered assistant, for automation, Real-Time Dashboards help you build data illustrations quickly and efficiently.
Each real-time dashboard organizes tiles into pages, with each tile displaying data from a query and a visual. By [exploring the dashboard's data](dashboard-explore-data.md) using slice and dice features and advanced exploration tools, real-time dashboards provide dynamic, up-to-the-minute insights so you can make informed decisions instantly.

:::image type="content" source="media/tutorial/final-dashboard.png" alt-text="Screenshot of a real-time dashboard in Fabric displaying sample bike data." lightbox="media/tutorial/final-dashboard.png":::

Key capabilities of real-time dashboards include:

* **Lifecycle management**: Support for continuous integration and continuous deployment, along with [Git integration](git-deployment-pipelines.md), lets you streamline development and version control.

* **Secure collaboration**: Share dashboards without giving access to the underlying database.

* **Data source management**: Connect real-time dashboards to different data sources, like Azure Data Explorer clusters, Eventhouses, and other data stores, for seamless integration of real-time data into dashboards.

## How do I use Real-Time Dashboards?

Create a Real-Time Dashboard to visualize and explore insights quickly with real-time changing data, in two ways:
1. [Manually create dashboards:](dashboard-real-time-create.md)
    * You set up the Real-Time Dashboard step by step yourself.
    * You manually select and configure data sources.
    * You write Kusto Query Language (KQL) queries to retrieve and visualize data in dashboard tiles.
    * You design and organize the layout of your dashboard.

1. Use [Copilot to automate dashboard creation:](../fundamentals/copilot-generate-dashboard.md)
    * You use Copilot to automatically generate a Real-Time Dashboard.
    * Copilot can suggest and set up data sources for you.
    * Copilot can help write KQL queries or [generate](../fundamentals/copilot-for-writing-queries.md) them based on your natural language prompts.
    * Copilot simplifies and accelerates dashboard creation, requiring less technical effort and allowing you to focus on the insights.

## Managing Real-Time Dashboards:

- [Use parameters in Real-Time Dashboards](dashboard-parameters.md) to filter data dynamically.
- [Real-Time Dashboard permissions](dashboard-permissions.md) to control who can view or edit your dashboards.
- [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md) to suit your needs, including charts, graphs, and tables. The tiles are interactive, so you can drill down into data and explore specific data points in detail.
- [Apply conditional formatting](dashboard-conditional-formatting.md) to highlight important data trends or anomalies.
- [Create alerts for Real-Time Dashboards](data-activator/activator-get-data-real-time-dashboard.md) to trigger notifications when specific rule conditions are met.

## Related content

* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [Use Copilot to generate a Real-Time Dashboard](../fundamentals/copilot-generate-dashboard.md)
* [Use Copilot to write queries for Real-Time Dashboards](../fundamentals/copilot-for-writing-queries.md)    
