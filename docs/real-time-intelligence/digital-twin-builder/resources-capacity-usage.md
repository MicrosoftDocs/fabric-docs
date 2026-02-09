---
title: Capacity consumption for digital twin builder (preview)
description: This article contains information about how digital twin builder (preview) measures resource consumption that affects your billing.
author: baanders
ms.author: baanders
ms.date: 06/06/2025
ms.topic: concept-article
---

# Capacity consumption for digital twin builder (preview)

This article contains information about how digital twin builder (preview) capacity usage is billed and reported.

Digital twin builder currently measures usage according to one active metric: The compute resources used to process mapping and contextualization operations in digital twin builder flows (on-demand or scheduled).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

>[!NOTE]
> The meters for digital twin builder are currently in preview and may be subject to change.

## Consumption rates

The following table defines how many capacity units (CU) are consumed when digital twin builder (preview) is used.

| Meter name | Operation name | Fabric consumption rate (CU hours) | Description |
|---|---|---|
| Digital Twin Builder Operation Capacity Usage CU | Digital Twin Builder Operation | 4 | Usage for on-demand and scheduled digital twin builder flow operations |

## Monitoring usage 

The [Microsoft Fabric Capacity Metrics](../../enterprise/metrics-app.md) app provides visibility into capacity usage for all Fabric workloads in one place. Administrators can use the app to monitor capacity, the performance of workloads, and their usage compared to purchased capacity. 

Initially, you must be a capacity admin to install the Microsoft Fabric Capacity Metrics app. Once the app is installed, anyone in the organization can be granted permissions to view the app. For more information about the app, see [Install the Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md#install-the-app). 

In the Fabric Capacity Metric app, you see operations for digital twin builder (preview) and digital twin builder flow. To see the operation details, select digital twin builder under the item type. All the data stored within Fabric storage incurs Fabric storage costs.

## Limits and considerations 

### Autoscale billing for Spark is not supported

Digital twin builder is currently not supported when [Autoscale Billing for Spark](../../data-engineering/autoscale-billing-for-spark-overview.md) is enabled in Microsoft Fabric for your Fabric capacity.

If autoscale is enabled for your Fabric capacity, attempts to create new digital twin builder items will fail. Any existing digital twin builder items might not function as expected while autoscaling is active. For example, digital twin builder flow doesn't execute (in either on-demand or scheduled mode) to map or contextualize data.

## Subject to changes in Microsoft Fabric workload consumption rate 

Consumption rates are subject to change at any time. Microsoft provides notice of changes through email and in-product notifications. Changes are effective on the date stated in the release notes and the Microsoft Fabric blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.
