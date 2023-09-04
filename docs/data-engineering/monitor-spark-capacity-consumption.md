---
title: Monitor Spark capacity consumption
description: Learn how to monitor Spark capacity consumption.
ms.reviewer: snehagunda
author: jejiang
ms.author: jejiang
ms.topic: how-to 
ms.custom: build-2023
ms.date: 05/09/2023
ms.search.form: Monitor Spark capacity consumption
---

# Monitor Spark capacity consumption

[!INCLUDE [preview-note](../includes/preview-note.md)]

The purpose of this article is to offer guidance for admins who want to monitor activities in the capacities they manage. By utilizing the Spark capacity consumption reports available in the [Microsoft Fabric utilization and metrics app](../enterprise/metrics-app.md), admins can gain insights into the billable Spark capacity consumption for items, including Lakehouse, Notebook, and Spark job definitions. Some Spark capacity consumption activities aren't reported in the app.

## Spark capacity consumption reported

The following operations from Lakehouse, Notebook, and Spark job definitions will be treated as billable activities once we move out of the preview status. During public preview, the capacity consumption from these operations will be displayed as *Preview* in the metrics app.

| Operation name | Item | Timeline | Comments |
|--|--|--|--|
| **Lakehouse operations** | Lakehouse | Public preview | Users preview table in the Lakehouse explorer. |
| **Lakehouse table load** | Lakehouse | Public preview | Users load delta table in the Lakehouse explorer. |
| **Notebook run** | Synapse Notebook | Public preview | Synapse Notebook runs manually by users. |
| **Notebook HC run** | Synapse Notebook | Public preview | Synapse Notebook runs under the high concurrency Spark session. |
| **Notebook scheduled run** | Synapse Notebook | Public preview | Synapse Notebook runs triggered by notebook scheduled events. |
| **Notebook pipeline run** | Synapse Notebook | Public preview | Synapse Notebook runs triggered by pipeline. |
| **Notebook VS Code run** | Synapse Notebook | Public preview | Synapse Notebook runs in VS Code. |
| **Spark job run** | Spark Job Definition | Public preview | Spark batch job runs initiated by user submission. |
| **Spark job scheduled run** | Spark Job Definition | Public preview | Synapse batch job runs triggered by notebook scheduled events. |
| **Spark job pipeline run** | Spark Job Definition | Public preview | Synapse batch job runs triggered by pipeline. |
| **Spark job VS Code run** | Spark Job Definition | Public preview | Synapse Spark job definition submitted from VS Code. |

## Spark capacity consumption that isn’t reported

There are some Spark capacity consumption activities that aren't reported in the metrics app. These activities include system Spark jobs for Library Management and certain system Spark jobs for Spark Live pool or live sessions.

* **Library Management** - The capacity consumption associated with Library Management at the workspace level isn't reported in the metrics app.

* **System Spark jobs** - Spark capacity consumption that isn't associated with a Notebook, a Spark Job Definition, or a Lakehouse, isn't included in the capacity reporting.

## Capacity consumption reports

All Spark related operations are classified as [background operations](/power-bi/enterprise/service-premium-smoothing). Capacity consumption from Spark is displayed under a Notebook, a Spark Job Definition, or a Lakehouse, and is aggregated by operation name and item.

:::image type="content" source="media\monitor-spark-capacity-consumption\items-report.png" alt-text="Screenshot showing items report." lightbox="media\monitor-spark-capacity-consumption\items-report.png":::

### Background Operations report

Background operations are displayed for a specific [timepoint](../enterprise/metrics-app-timepoint-page.md). In the report's table, each row refers to a user operation. Review the *User* column to identify who performed a specific operation. If you need more information about a specific operation, you can use its *Operation ID* to look it up in the Microsoft Fabric [monitoring hub](../admin/monitoring-hub.md).

:::image type="content" source="media\monitor-spark-capacity-consumption\background-operations-report.png" alt-text="Screenshot showing background operations report." lightbox="media\monitor-spark-capacity-consumption\background-operations-report.png":::

## Next steps 

- [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
- [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)