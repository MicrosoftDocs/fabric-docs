---
title: Monitor Apache Spark capacity consumption
description: Learn how to monitor Apache Spark capacity consumption, including what operations are treated as billable activities.
ms.reviewer: jejiang
author: eric-urban
ms.author: eur
ms.topic: how-to
ms.custom:
ms.date: 11/11/2024
ms.search.form: Monitor Spark capacity consumption
---

# Monitor Apache Spark capacity consumption

The purpose of this article is to offer guidance for admins who want to monitor activities in the capacities they manage. By utilizing the Apache Spark capacity consumption reports available in the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md), admins can gain insights into the billable Spark capacity consumption for items, including Lakehouse, Notebook, and Apache Spark job definitions. Some Spark capacity consumption activities aren't reported in the app.

## Spark capacity consumption reported

The following operations from lakehouses, notebooks, and Spark job definitions are treated as billable activities.

| Operation name | Item | Comments |
|--|--|--|
| **Lakehouse operations** | Lakehouse | Users preview table in the Lakehouse explorer. |
| **Lakehouse table load** | Lakehouse | Users load delta table in the Lakehouse explorer. |
| **Notebook run** | Notebook | Notebook runs manually by users. |
| **Notebook HC run** |  Notebook | Notebook runs under the high concurrency Apache Spark session. |
| **Notebook scheduled run** | Notebook | Notebook runs triggered by notebook scheduled events. |
| **Notebook pipeline run** | Notebook | Notebook runs triggered by pipeline. |
| **Notebook VS Code run** | Notebook | Notebook runs in VS Code. |
| **Spark job run** | Spark Job Definition | Spark batch job runs initiated by user submission. |
| **Spark job scheduled run** | Spark Job Definition | Batch job runs triggered by notebook scheduled events. |
| **Spark job pipeline run** | Spark Job Definition | Batch job runs triggered by pipeline. |
| **Spark job VS Code run** | Spark Job Definition | Spark job definition submitted from VS Code. |

## Spark capacity consumption that isn't reported

There are some Spark capacity consumption activities that aren't reported in the metrics app. These activities include system Spark jobs for library management and certain system Spark jobs for Spark Live pool or live sessions.

* **Library management** - The capacity consumption associated with library management at the workspace level isn't reported in the metrics app.

* **System Spark jobs** - Spark capacity consumption that isn't associated with a notebook, a Spark job definition, or a lakehouse, isn't included in the capacity reporting.

## Capacity consumption reports

All Spark related operations are classified as [background operations](../enterprise/fabric-operations.md#background-operations). Capacity consumption from Spark is displayed under a notebook, a Spark job definition, or a lakehouse, and is aggregated by operation name and item.

:::image type="content" source="media\monitor-spark-capacity-consumption\items-report.png" alt-text="Screenshot showing items report." lightbox="media\monitor-spark-capacity-consumption\items-report.png":::

### Background operations report

Background operations are displayed for a specific [timepoint](../enterprise/metrics-app-timepoint-page.md). In the report's table, each row refers to a user operation. Review the **User** column to identify who performed a specific operation. If you need more information about a specific operation, you can use its **Operation ID** to look it up in the Microsoft Fabric [monitoring hub](../admin/monitoring-hub.md).

:::image type="content" source="media\monitor-spark-capacity-consumption\background-operations-report.png" alt-text="Screenshot showing background operations report." lightbox="media\monitor-spark-capacity-consumption\background-operations-report.png":::

## Related content

- [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
- [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)
