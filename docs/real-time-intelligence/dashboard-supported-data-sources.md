---
title: Real-Time Dashboard supported data sources
description: Learn about the data sources supported in Real-Time Dashboard in Microsoft Fabric.
ms.reviewer: mibar, v-hzargari
ms.topic: concept-article
ms.date: 08/20/2026
ms.search.form: Overview
ai-usage: ai-assisted
---

# Real-Time Dashboard supported data sources

Real-Time Dashboard integrates with several data sources so you can monitor and visualize real-time data from multiple platforms. By connecting to these data sources, you can use streaming data to drive timely and informed decisions.

This article describes each data source supported by Real-Time Dashboard.

## Eventhouse

[Eventhouse](eventhouse.md) is the native Real-Time Intelligence store in Microsoft Fabric for ingesting and querying streaming and log-like data. Use it to efficiently ingest and process real-time event data, such as telemetry, logs, and IoT signals, and query it directly from your dashboard tiles.

To connect, select **Add data source** > **KQL Database** in your dashboard, and then choose a KQL database from the **OneLake Catalog**. For step-by-step instructions, see [Add data source](dashboard-real-time-create.md#add-data-source).

## Azure Data Explorer

[Azure Data Explorer](/azure/data-explorer/data-explorer-overview) is a fast and highly scalable data exploration service for log and telemetry data. Use it to query and analyze large volumes of data in near real time, such as application logs, security events, or IoT telemetry stored outside Fabric.

To connect, select **Add data source** > **Azure Data Explorer**, and then enter the connection URI for your cluster and select a database. For step-by-step instructions, see [Add data source](dashboard-real-time-create.md#add-data-source).

## Azure Monitor - Application Insights

[Application Insights](/azure/azure-monitor/app/app-insights-overview) is an Azure Monitor feature that monitors live applications. Use it to identify performance bottlenecks, track requests and dependencies, and diagnose issues in your applications directly from a Real-Time Dashboard tile.

To connect, select **Add data source** > **Azure Monitor** > **Application Insights**, and then provide your subscription, resource group, and app name, or enter a full connection URI. For step-by-step instructions, see [Add data source](dashboard-real-time-create.md#add-data-source).

## Azure Monitor - Log Analytics

[Log Analytics](/azure/azure-monitor/logs/log-analytics-overview) is an Azure Monitor feature that stores and lets you query log data collected from Azure resources. Use it to surface operational insights, such as resource health, diagnostics, and audit logs, alongside your other real-time signals.

To connect, select **Add data source** > **Azure Monitor** > **Log Analytics**, and then provide your subscription, resource group, and workspace name, or enter a full connection URI. For step-by-step instructions, see [Add data source](dashboard-real-time-create.md#add-data-source).

## Related content

* [Real-Time Dashboard overview](real-time-dashboards-overview.md)
* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [Real-Time Dashboard supported visuals](dashboard-supported-visuals.md)
