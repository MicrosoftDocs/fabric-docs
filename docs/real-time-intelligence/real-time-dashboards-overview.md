---
title: What is Real-Time Dashboard?
description: Learn about Real-Time Dashboard in Microsoft Fabric.
ms.reviewer: mibar, v-hzargari
ms.topic: overview
ms.date: 06/24/2026
ms.search.form: Overview
ai-usage: ai-assisted
---

# What is Real-Time Dashboard?

Real-Time Dashboard is Microsoft Fabric's solution for live monitoring and visualization. It helps you turn streaming data into actionable insights quickly, so you can monitor operational signals, spot changes as they happen, and respond without delay. Designed for operation managers, data analysts, and business users, Real-Time Dashboard enables users to monitor, analyze, and act on live data streams through interactive, continuously updating visualizations that surface insights and anomalies as they happen.

This overview explains what Real-Time Dashboard is, what it's used for, and the capabilities that make it useful for real-time decision-making.

:::image type="content" source="media/tutorial/final-dashboard.png" alt-text="Screenshot of a real-time dashboard in Fabric displaying sample bike data." lightbox="media/tutorial/final-dashboard.png":::

## Key features

* **Live data monitoring:** Real-Time Dashboard supports optional [live refresh](dashboard-live-refresh.md), so dashboards automatically update as new data is ingested or at configured intervals. Alternatively, you can keep dashboards static and trigger updates manually. This feature enables timely visibility into changing conditions, trends, and anomalies.

* **Interactive exploration:** Dashboards support analysis directly within visuals, so you can:
    * Slice and dice by time or other custom dimensions to focus on key metrics.
    * Apply [filters](dashboard-parameters.md#interact-with-your-data-by-using-cross-filter) or [drill down](dashboard-parameters.md#use-drillthroughs-as-dashboard-parameters) on chart elements to refine other visuals or dive deeper into the data.

    These capabilities let you explore and refine insights without leaving the dashboard experience.

* **Copilot-powered authoring and exploration:** Real-Time Dashboard leverages Copilot to streamline both dashboard creation and data analysis through natural language interactions.
    * Users can [generate dashboards](copilot-generate-dashboard.md) from a selected data source, [create and refine KQL queries](copilot-writing-queries.md) directly within the tile editor, and [explore and analyze data](dashboard-explore-data.md) to uncover insights - all without requiring deep technical expertise.
    * This feature enables both business users and advanced analysts to efficiently build, customize, and interact with real-time dashboards.

* **Proactive monitoring and automation:** Real-Time Dashboard integrates with Data Activator to support event-driven workflows, so you can:
    * Define thresholds for key metrics.
    * [Trigger alerts](data-activator/activator-get-data-real-time-dashboard.md) when conditions are met.
    * Initiate automated actions such as notifications or workflows. 

    This feature helps you move from passive monitoring to proactive management and response, so critical events are addressed promptly.

* **Version control and lifecycle management:** Integrate dashboards with Git-based workflows so you can:
    * Sync dashboards with [GitHub or Azure DevOps](git-real-time-dashboard.md) for version control and collaborative development.
    * Track changes and manage dashboard versions effectively.
    * Collaborate with team members while maintaining a clear history of modifications.

* **Data sharing and collaboration:** Use [safe collaboration](dashboard-permissions.md) to [share dashboards](dashboard-real-time-create.md#share-the-dashboard) securely without exposing the underlying data. This feature gives more people visibility while preserving data security and governance.

## Supported data sources

Real-Time Dashboard integrates with several data sources so you can monitor and visualize real-time data from multiple platforms. Supported sources include:

* **[Eventhouse](dashboard-real-time-create.md#add-data-source):** Ingest and process real-time event data efficiently.
* **[Azure Data Explorer](dashboard-real-time-create.md#add-data-source):** Query and analyze large volumes of log and telemetry data in real time.
* **[Azure Monitor - Application Insights](dashboard-real-time-create.md#add-data-source):** Monitor live application performance, identify bottlenecks, and diagnose issues.
* **[Azure Monitor - Log Analytics](dashboard-real-time-create.md#add-data-source):** Query and analyze log data from Azure resources to surface operational insights.

By connecting to these data sources, you can use streaming data to drive timely and informed decisions.

## Get started

To create a dashboard, start with one of these options:

1. [Manually create a dashboard](dashboard-real-time-create.md):
    * Set up the Real-Time Dashboard step by step.
    * Manually select and configure data sources.
    * Write Kusto Query Language (KQL) queries to retrieve and visualize data in dashboard tiles, or use Copilot directly in the tile editor to author or modify queries with natural language.
    * Design and organize the layout of your dashboard.

1. [Use Copilot to generate a dashboard](../fundamentals/copilot-generate-dashboard.md).
    * Select a data source, use natural language prompts, and Copilot automatically generates a Real-Time Dashboard as a starting point.
    * Customize the generated dashboard by modifying queries, adding or removing tiles, and adjusting the layout to fit your needs.

## Next steps

After you set up your dashboard and understand the basics, explore these resources to get more value from Real-Time Dashboard:

* [Explore data in Real-Time Dashboard](dashboard-explore-data.md)
* [Customize dashboard visuals](dashboard-visuals-customize.md)
* [Set alerts for Real-Time Dashboard](data-activator/activator-get-data-real-time-dashboard.md)
