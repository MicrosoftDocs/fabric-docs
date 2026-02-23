---
title: Eventhouse monitoring overview
description: Understand Eventhouse monitoring in Fabric and how it can help you to gain insights into the usage and performance.
ms.topic: concept-article
ms.subservice: rti-eventhouse
ms.date: 11/16/2025
#customer intent: As a admin I want to monitor my eventhouse to gain insights into the usage and performance that I can optimize my eventhouse and improve the user experience.
---

# Eventhouse monitoring

Eventhouse monitoring in Fabric offers comprehensive insights into the usage and performance of your eventhouse by collecting end-to-end metrics and logs for all aspects of an Eventhouse. It's part of [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) that allows you to monitor Fabric items in your workspace. Eventhouse monitoring provides a set of tables that you can query to get insights into the usage and performance of your eventhouse. Use these queries to optimize your eventhouse and improve the user experience.

## Eventhouse monitoring tables

When monitoring your eventhouse, you can query the following tables:

* [Metrics](monitor-metrics.md)
* [Command logs](monitor-logs-command.md)
* [Data operation logs](monitor-logs-data-operation.md)
* [Ingestion results logs](monitor-logs-ingestion-results.md)
* [Query logs](monitor-logs-query.md)

## Sample queries

You can find sample queries in the [workspace-monitoring](https://github.com/microsoft/fabric-samples/tree/main/workspace-monitoring) folder of the *fabric-samples* GitHub repository.

## Eventhouse monitoring templates

The templates let you create monitoring dashboards that track workspace activities in real-time by connecting directly to the underlying monitoring Eventhouse. In the dashboard, you can monitor semantic models, KQL database queries, and ingestions.

Follow the [Visualize your Workspace Monitoring Data](../fundamentals/sample-gallery-workspace-monitoring.md) guide to create the templates or download the templates from the [workspace-monitoring-dashboards](https://github.com/microsoft/fabric-toolbox/tree/main/monitoring/workspace-monitoring-dashboards) GitHub repository or from the links in the following section. 

The repository contains instructions on how to prepare the environment and how to use the templates.

Two monitoring templates are available:

* [Real-Time Dashboard template](https://github.com/microsoft/fabric-toolbox/blob/main/monitoring/workspace-monitoring-dashboards/Fabric%20Workspace%20Monitoring%20Dashboard.json)

:::image type="content" source="media/eventhouse/eventhouse-dashboard.png" alt-text="Screenshot of the real-time intelligence dashboard based on the template." lightbox="media/eventhouse/eventhouse-dashboard.png":::

* [Power BI report template](https://github.com/microsoft/fabric-toolbox/blob/main/monitoring/workspace-monitoring-dashboards/)

:::image type="content" source="media/eventhouse/eventhouse-dashboard-power-bi.png" alt-text="Screenshot of the Power BI dashboard based on the template." lightbox="media/eventhouse/eventhouse-dashboard-power-bi.png":::

## Related content
* [Workspace monitoring overview](../fundamentals/workspace-monitoring-overview.md)
* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
* [Manage and monitor an eventhouse](manage-monitor-eventhouse.md)
* [End-to-end monitoring in Real-Time Intelligence](../real-time-intelligence/sample-end-to-end.md)
* [Visualize workspace monitoring data](../fundamentals/sample-gallery-workspace-monitoring.md)