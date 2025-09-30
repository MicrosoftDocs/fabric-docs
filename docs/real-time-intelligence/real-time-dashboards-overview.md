---
title: What is Real-Time Dashboards?
description: Learn about Real-Time Dashboard in Microsoft Fabric.
ms.reviewer: mibar
ms.author: v-hzargari
author: hzargari-ms
ms.topic: overview
ms.custom:
ms.date: 09/30/2025
ms.search.form: Overview
---

# What is Real-Time Dashboard?

Real-Time Dashboard in Microsoft Fabric provides a dynamic way to visualize and monitor data as it changes. This overview explains how Real-Time Dashboard works, its key features, and how you can use it to gain timely insights from your data. Whether you generate a dashboard manually or use Copilot, an AI-powered assistant, for automation, Real-Time Dashboards help you build data illustrations quickly and efficiently.
By using [slice and dice features](dashboard-parameters.md) and [advanced exploration tools](dashboard-explore-data.md), Real-Time Dashboard provides dynamic, up-to-the-minute insights so you can make informed decisions instantly.

:::image type="content" source="media/tutorial/final-dashboard.png" alt-text="Screenshot of a real-time dashboard in Fabric displaying sample bike data." lightbox="media/tutorial/final-dashboard.png":::

## Use cases and benefits of Real-Time Dashboard

Real-Time Dashboard can be used across industries to provide immediate insights and enable faster decision-making. For example, in finance, Real-Time Dashboard can help monitor stock prices and market trends in real time. In healthcare, it can track patient vitals and alert medical staff to critical changes. In manufacturing, Real-Time Dashboard can optimize production lines by identifying bottlenecks as they occur. By leveraging Real-Time Dashboard, industries can improve efficiency, enhance customer experiences, and respond proactively to dynamic situations.

The benefits of Real-Time Dashboard include increased agility, improved accuracy in decision-making, and the ability to respond proactively to changes or issues as they arise.

## Getting started

### How do I create a Real-Time Dashboard?

Create a Real-Time Dashboard to visualize and explore insights quickly with real-time changing data, in two ways:
1. [Manually create a dashboard:](dashboard-real-time-create.md)
    * Set up the Real-Time Dashboard step by step.
    * Manually select and configure data sources.
    * Write Kusto Query Language (KQL) queries to retrieve and visualize data in dashboard tiles.
    * Design and organize the layout of your dashboard.

1. Use [Copilot to automate dashboard creation:](../fundamentals/copilot-generate-dashboard.md)
    * Select a data source and Copilot automatically generates a Real-Time Dashboard.

### Supported data sources

Real-Time Dashboard can connect to various data sources, including:

* [Azure Data Explorer](dashboard-real-time-create.md#add-data-source)
* [Azure Monitor - Application Insights](dashboard-real-time-create.md#add-data-source)
* [Azure Monitor - Log Analytics](dashboard-real-time-create.md#add-data-source)
* [Eventhouse](dashboard-real-time-create.md#add-data-source)
* [KQL Database](dashboard-real-time-create.md#add-data-source)

## Key features

Key features and capabilities of Real-Time Dashboard include:

* **Live data monitoring:** dashboards update in real time with [autorefresh](dashboard-real-time-create.md#enable-auto-refresh) rates as low as 10 seconds or continuous updates.
* **No-code data exploration:** explore underlying data without writing queries using the [Explorer Data](dashboard-explore-data.md) feature.
* **Real-time alerts:** set [alerts](data-activator/activator-get-data-real-time-dashboard.md) on key metrics using Data Activator to trigger actions such as data changes.
* **Dynamic interactions:** support for [cross-filtering](dashboard-parameters.md#interact-with-your-data-using-cross-filter), [drill-through](dashboard-parameters.md#use-drillthroughs-as-dashboard-parameters), and [parameters](dashboard-parameters.md) for deeper insights.
* **Git integration:** sync dashboards with GitHub or Azure DevOps for version control and parallel development.
* **Permission separation:** dashboard access can be granted without exposing the underlying data, supporting [secure collaboration](dashboard-permissions.md).

## Related content

* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [Use Copilot to generate a Real-Time Dashboard](../fundamentals/copilot-generate-dashboard.md)
* [Use Copilot to write queries for Real-Time Dashboard](../fundamentals/copilot-for-writing-queries.md)  
