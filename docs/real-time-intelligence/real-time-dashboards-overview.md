---
title: What is Real-Time Dashboard?
description: Learn about Real-Time Dashboard in Microsoft Fabric.
ms.reviewer: mibar
ms.author: v-hzargari
author: hzargari-ms
ms.topic: overview
ms.custom:
ms.date: 12/07/2025
ms.search.form: Overview
---

# What is Real-Time Dashboard?

Real-Time Dashboard is Microsoft Fabric’s solution for live monitoring and visualization. It empowers users to act on streaming data instantly, transforming information in motion into actionable insights. Designed for operations analysts, data engineers, and business users alike, Real-Time Dashboard provides integrated tools to ingest, query, and visualize granular data in seconds. Unlike traditional BI tools, Real-Time Dashboard is purpose-built for real-time operational scenarios, making it essential for industries where speed and accuracy drive outcomes.

This overview explains how Real-Time Dashboard works, highlights its key features, and provides guides and helpful references to help you get started and gain timely insights from your data.

:::image type="content" source="media/tutorial/final-dashboard.png" alt-text="Screenshot of a real-time dashboard in Fabric displaying sample bike data." lightbox="media/tutorial/final-dashboard.png":::

## Key features

* **Live data monitoring:** Dashboards update continuously or at [refresh intervals](dashboard-real-time-create.md#enable-auto-refresh) as low as 10 seconds, ensuring continuous access to the most current data.
* **Interactive exploration:** Engage with real-time data through interactive dashboards that allow you to:
    * Slice and dice by time other custom dimensions to focus on key metrics.
    * Apply [filters](dashboard-parameters.md#interact-with-your-data-using-cross-filter) or [drill down](dashboard-parameters.md#use-drillthroughs-as-dashboard-parameters) on chart elements to refine other visuals or dive deeper into the data.
* **No-code experience:** Empower users to create dashboards and explore their underlying data through an intuitive, no-code interface. This includes:
    * Quickly build [dashboards](../fundamentals/copilot-generate-dashboard.md) with Copilot assistance.
    * [Create KQL queries using Copilot](copilot-writing-queries.md) to retrieve and visualize data without needing deep technical expertise.
    * Use the [Explorer Data](dashboard-explore-data.md) feature to analyze underlying data without writing queries.
* **Proactive monitoring with alerts:** Integrated with Data Activator to enable real-time monitoring and alerting based on data changes. It allows you to:
    * Define thresholds for key metrics displayed on your Real-Time dashboard.
    * [Trigger alerts](data-activator/activator-get-data-real-time-dashboard.md) when metrics exceed defined limits, ensuring timely responses to critical events.
    * Automate actions such as sending notifications via email or Microsoft Teams, or initiating Power Automate flows.
* **Git integration:** Sync dashboards with [GitHub or Azure DevOps](git-real-time-dashboard.md) for version control and collaborative development.
* **Permission separation:** Share dashboards securely without exposing the underlying data, enabling [safe collaboration](dashboard-permissions.md).

### Why it matters

* **Speed:** Decisions are based on the most current data, reducing latency between insight and action.
* **Accuracy:** Eliminates reliance on static reports, ensuring operational precision.
* **Scalability:** Handles high-velocity telemetry and transactional data streams efficiently.

## Getting started

### Supported data sources

Real-Time Dashboard can connect to various data sources, including:

* [Eventhouse](dashboard-real-time-create.md#add-data-source)
* [Azure Data Explorer](dashboard-real-time-create.md#add-data-source)
* [Azure Monitor - Application Insights](dashboard-real-time-create.md#add-data-source)
* [Azure Monitor - Log Analytics](dashboard-real-time-create.md#add-data-source)

### How do I create a Real-Time Dashboard?

Create a Real-Time Dashboard to visualize and explore insights quickly with real-time changing data, in two ways:

1. [Manually create a dashboard:](dashboard-real-time-create.md)
    * Set up the Real-Time Dashboard step by step.
    * Manually select and configure data sources.
    * Write Kusto Query Language (KQL) queries to retrieve and visualize data in dashboard tiles.
    * Design and organize the layout of your dashboard.

1. Use [Copilot to automate dashboard creation:](../fundamentals/copilot-generate-dashboard.md)
    * Select a data source, use natural language prompts, and Copilot automatically generates a Real-Time Dashboard as a starting point.
    * Customize the generated dashboard by modifying queries, adding or removing tiles, and adjusting the layout to fit your needs.

## Next steps

After understanding the basics of Real-Time Dashboard and setting up your first dashboard, explore these resources to enhance your skills and make the most of Real-Time Dashboard:

* [Explore data in Real-Time Dashboard](dashboard-explore-data.md)
* [Set alert for Real-Time Dashboard](data-activator/activator-get-data-real-time-dashboard.md)
 