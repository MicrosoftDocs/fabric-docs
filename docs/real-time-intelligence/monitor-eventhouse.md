---
title: Eventhouse monitoring overview
description: Understand Eventhouse monitoring in Fabric and how it can help you to gain insights into the usage and performance.
author: shsagir
ms.author: shsagir
ms.topic: concept-article
ms.custom:
ms.date: 02/13/2025
#customer intent: As a admin I want to monitor my eventhouse to gain insights into the usage and performance that I can optimize my eventhouse and improve the user experience.
---

# Eventhouse monitoring

Eventhouse monitoring in Fabric offers comprehensive insights into the usage and performance of your eventhouse by collecting end-to-end metrics and logs for all aspects of an Eventhouse. It's part of [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) that allows you to monitor Fabric items in your workspace. Eventhouse monitoring provides a set of tables that you can query to get insights into the usage and performance of your eventhouse, which you can use to optimize your eventhouse and improve the user experience.

## Eventhouse monitoring tables

When monitoring your eventhouse, you can query the following tables:

* [Metrics](monitor-metrics.md)

* [Command logs](monitor-logs-command.md)
* [Data operation logs](monitor-logs-data-operation.md)
* [Ingestion results logs](monitor-logs-ingestion-results.md)
* [Query logs](monitor-logs-query.md)

## Sample queries

You can find sample queries in the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Eventhouse monitoring dashboard templates

You can download dashboard templates from the [workspace-monitoring-dashboards](https://github.com/microsoft/fabric-toolbox/tree/main/monitoring/workspace-monitoring-dashboards) Github repository.

The template allow users to create monitoring dashboards and to track workspace activities in real-time by connecting directly to the underlying monitoring Eventhouse cluster. In the dashboard, you can monitor operations, users, semantic models, database queries, and ingestion paterns.

There are two monitoring templates available:

* Real-Time Dashboard template
* Power BI Report template

:::image type="content" source="media/eventhouse/fwm_rtid_template.png" alt-text="Screenshot of the real-time intelligence dashboard based on the template":::

## Related content

* [Enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md)
