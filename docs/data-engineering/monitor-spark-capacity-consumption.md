---
title: Monitor Spark capacity consumption
description: Learn how to monitor Spark capacity consumption.
ms.reviewer: snehagunda
author: jejiang
ms.author: jejiang
ms.topic: how-to 
ms.date: 05/09/2023
ms.search.form: Monitor Spark capacity consumption
---

# Monitor Spark capacity consumption

[!INCLUDE [preview-note](../includes/preview-note.md)]

The purpose of this article is to offer guidance for admins who want to monitor activities in the capacities they manage. By utilizing the Spark capacity consumption reports available in the Microsoft Fabric utilization and metrics app, admins can gain insights into the billable Spark capacity consumption for Spark experience items, including Lakehouse, Notebook, and Spark job definitions. Nonbillable Spark capacity consumption activities aren't reported in the app.

## Spark capacity consumption reported 

The following operations from Lakehouse, Notebook, and Spark job definitions will be treated as billable activities once we move out of the preview status. During the public preview, the capacity consumption from these operations will be displayed as **Preview** in the metrics app. 

| Item | Operation name | Timeline | Comments |
| --- |  ---  |  ---  |  ---  |
| **Lakehouse** |  Lakehouse operations  |  Public preview  |  Users preview table in the Lakehouse explorer. |
| **Lakehouse** |  Lakehouse table load  |  Public preview  |  Users load delta table in the Lakehouse explorer. |
| **Synapse Notebook** |  Notebook run  |  Public preview  |  Synapse Notebook runs manually by users. |
| **Synapse Notebook** |  Notebook HC run  |  Public preview  | Synapse Notebook runs under the high concurrency Spark session. |
| **Synapse Notebook** |  Notebook scheduled run  |  Public preview  | Synapse Notebook runs triggered by notebook scheduled events. |
| **Synapse Notebook** |  Notebook pipeline run  |  Public preview  | Synapse Notebook runs triggered by pipeline. |
| **Synapse Notebook** |  Notebook VS Code run  |  Public preview  |  Synapse Notebook runs in VS Code. |
| **Spark Job Definition** |  Spark job run  |  Public preview  | Spark batch job runs initiated by user submission. |
| **Spark Job Definition** |  Spark job scheduled run  |  Public preview  | Synapse batch job runs triggered by notebook scheduled events. |
| **Spark Job Definition** |  Spark job pipeline run  |  Public preview  | Synapse batch job runs triggered by pipeline. |
| **Spark Job Definition** |  Spark job VS Code run  |  Public preview  | Synapse Spark job definition submitted from VS Code. |

## Spark capacity consumption that isn’t reported 

There are some nonbillable Spark capacity consumption activities that aren't reported in the metrics app. These activities include system Spark jobs for Library Management and certain system Spark jobs for Spark Live pool or live sessions. 

**Library Management**: The capacity consumption associated with Library Management at the workspace level and environment-level Library Management isn't reported in the metrics app.

**System Spark jobs**: Any Spark capacity consumption that isn't associated with a Notebook, a Spark Job Definition, or a Lakehouse won't be included or reported in the capacity reporting. 

## Capacity consumption reports

All Spark-related operations are classified as [background operations](/power-bi/enterprise/service-premium-smoothing).

:::image type="content" source="media\monitor-spark-capacity-consumption\items-report.png" alt-text="Screenshot showing items report." lightbox="media\monitor-spark-capacity-consumption\items-report.png":::

> [!NOTE]
> - Capacity consumption from Spark is displayed under a Notebook, a Spark Job Definition, or a Lakehouse.  
> - All Spark related operations are classified as background operations. 
> - The capacity consumption is aggregated by operation name and by item.   

**Background Operations report** (at a Timepoint):

:::image type="content" source="media\monitor-spark-capacity-consumption\background-operations-report.png" alt-text="Screenshot showing background operations report." lightbox="media\monitor-spark-capacity-consumption\background-operations-report.png":::

> [!NOTE]
>- Each row refers to a user operation. 
>- Refer to the "User" column to identify who performed a specific operation.
>- Use the "Operation ID" column to look up an operation in the Trident monitoring hub for more information if needed.

## Next steps

To learn more information about capacity reporting in the premium metrics app:  

- [Install the Premium metrics app](/power-bi/enterprise/service-premium-install-app)
- [Use the Premium metrics app](/power-bi/enterprise/service-premium-metrics-app)

