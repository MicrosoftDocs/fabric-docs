---
title: What is Real-Time Dashboard?
description: Learn about Real-Time Dashboard in Microsoft Fabric.
ms.reviewer: mibar
ms.author: v-hzargari
author: hzargari-ms
ms.topic: overview
ms.custom:
ms.date: 11/12/2025
ms.search.form: Overview
---

# What is Real-Time Dashboard?

Real-Time Dashboard is Microsoft Fabric’s solution for real-time monitoring and visualization, enabling organizations to act on live data streams without delay. Whether you’re an operations analyst, data engineer, or business user, Real-Time Dashboard offers integrated tools to ingest, query, and visualize streaming data in seconds. It transforms data in motion into actionable intelligence, bridging the gap between monitoring and decision-making. Unlike traditional BI tools, it’s optimized for live operational scenarios, making it indispensable for industries where speed and accuracy drive outcomes.

This overview explains how Real-Time Dashboard works, highlights its key features, and provides guides and helpful references to help you get started and gain timely insights from your data.

:::image type="content" source="media/tutorial/final-dashboard.png" alt-text="Screenshot of a real-time dashboard in Fabric displaying sample bike data." lightbox="media/tutorial/final-dashboard.png":::

## Core Components of Real-Time Dashboard

1. Real-Time Hub: The centralized entrypoint for streaming data sources, enabling quick setup and management of real-time data pipelines.
1. KQL Querysets: The engine behind Real-Time Dashboard, allowing users to write and execute Kusto Query Language (KQL) queries against live data streams for dynamic insights.
1. Eventhouse: High-performance storage for streaming data, supporting massive scale and low-latency queries.
1. Copilot Integration: AI-powered assistance to help users create dashboards, write queries, and explore data without deep technical expertise.
1. Integrated Visualizations: A rich set of visualization options to create interactive and informative dashboard tiles that update in real time.

## Key features

Key features and capabilities of Real-Time Dashboard include:

* **Live data monitoring:** dashboards update in real time with [autorefresh](dashboard-real-time-create.md#enable-auto-refresh) rates as low as 10 seconds or continuous updates.
* **No-code data exploration:** explore underlying data without writing queries using the [Explorer Data](dashboard-explore-data.md) feature.
* **Real-time alerts:** set [alerts](data-activator/activator-get-data-real-time-dashboard.md) on key metrics using Data Activator to trigger actions such as data changes.
* **Dynamic interactions:** support for [cross-filtering](dashboard-parameters.md#interact-with-your-data-using-cross-filter), [drill-through](dashboard-parameters.md#use-drillthroughs-as-dashboard-parameters), and [parameters](dashboard-parameters.md) for deeper insights.
* **Git integration:** sync dashboards with GitHub or Azure DevOps for version control and parallel development.
* **Permission separation:** dashboard access can be granted without exposing the underlying data, supporting [secure collaboration](dashboard-permissions.md).

## Getting started

### How do I create a Real-Time Dashboard?

Create a Real-Time Dashboard to visualize and explore insights quickly with real-time changing data, in two ways:
1. [Manually create a dashboard:](dashboard-real-time-create.md)
    * Set up the Real-Time Dashboard step by step.
    * Manually select and configure data sources.
    * Write Kusto Query Language (KQL) queries to retrieve and visualize data in dashboard tiles.
    * Design and organize the layout of your dashboard.

1. Use [Copilot to automate dashboard creation:](../fundamentals/copilot-generate-dashboard.md)
    * Select a data source, and Copilot automatically generates a Real-Time Dashboard as a starting point.
    * Customize the generated dashboard by modifying queries, adding or removing tiles, and adjusting the layout to fit your needs.

### Supported data sources

Real-Time Dashboard can connect to various data sources, including:

* [Eventhouse](dashboard-real-time-create.md#add-data-source)
* [Azure Data Explorer](dashboard-real-time-create.md#add-data-source)
* [Azure Monitor - Application Insights](dashboard-real-time-create.md#add-data-source)
* [Azure Monitor - Log Analytics](dashboard-real-time-create.md#add-data-source)


## Related content

* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [Use Copilot to generate a Real-Time Dashboard](../fundamentals/copilot-generate-dashboard.md)
* [Use Copilot to write queries for Real-Time Dashboard](../fundamentals/copilot-for-writing-queries.md)  
