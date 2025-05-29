---
title: Capacity consumption for digital twin builder (preview)
description: This article contains information about how digital twin builder (preview) measures resource consumption that affects your billing.
author: baanders
ms.author: baanders
ms.date: 04/28/2025
ms.topic: conceptual
---

# Capacity consumption for digital twin builder (preview)

This article contains information about how digital twin builder (preview) capacity usage is billed and reported. Digital twin builder measures usage according to three metrics:
* The sum of the following counts per hour: the number of customer-defined entity types, the number of entity type relationships, the number of entity instances, and the number of entity instance relationships. 
    * Instances that are deleted or inactive aren't counted.
* The compute resources used to process mapping and contextualization operations in digital twin builder flows (on-demand or scheduled).
* The user-generated and system-generated queries for exploring, listing, and refreshing data. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Consumption rates

The following table defines how many capacity units (CU) are consumed when digital twin builder (preview) is used.

[!NOTE]
> The meters for digital twin builder are currently in preview and may be subject to change.

| Meter name | Operation name | Fabric consumption rate (CU hours) |
|---|---|---|
| Digital Twin Builder Operation Capacity Usage CU | Digital Twin Builder Operations | 4 |

The operations are defined as follows:
* Digital Twin Builder Operations: Usage for on-demand and scheduled digital twin builder flow operations.

The SQL endpoint query operation of [Fabric Data Warehouse](../../data-warehouse/usage-reporting.md) is used for reporting usage of user-generated and system-generated queries for listing, exploring, and refreshing data in digital twin builder. The same SQL endpoint query operation is used to report capacity units (CU) consumed for counting activities, like counting customer-defined entity types, entity type relationships, entity instances, and entity instance relationships. For more information about using the SQL endpoint query for counting, see [Counts require querying SQL endpoint](#counts-require-querying-sql-endpoint).

## Monitoring usage 

The [Microsoft Fabric Capacity Metrics](../../enterprise/metrics-app.md) app provides visibility into capacity usage for all Fabric workloads in one place. Administrators can use the app to monitor capacity, the performance of workloads, and their usage compared to purchased capacity. 

Initially, you must be a capacity admin to install the Microsoft Fabric Capacity Metrics app. Once the app is installed, anyone in the organization can be granted permissions to view the app. For more information about the app, see [Install the Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md#install-the-app). 

In the Fabric Capacity Metric app, you see operations for digital twin builder (preview) and digital twin builder flow. To see the operation details, select digital twin builder under the item type. All the data stored within Fabric storage incurs Fabric storage costs.

>[!NOTE]
> Digital twin builder also shows a second, non-billable meter, **Digital Twin Builder Capacity Usage CU**. It is currently not billable.

## Limits and considerations 

### Autoscale billing for Spark is not supported

Digital twin builder is currently not supported when [Autoscale Billing for Spark](../../data-engineering/autoscale-billing-for-spark-overview.md) is enabled in Microsoft Fabric for your Fabric capacity.

If autoscale is enabled for your Fabric capacity, attempts to create new digital twin builder items will fail. Any existing digital twin builder items might not function as expected while autoscaling is active. For example, digital twin builder flow doesn't execute (in either on-demand or scheduled mode) to map or contextualize data.

### Counts require querying SQL endpoint

Currently, digital twin builder (preview) queries the SQL endpoint of your lakehouse to determine the object count used for billing in the [Digital Twin Builder Capacity Usage CU](#consumption-rates) meter. This query incurs a small charge. 

For more information on Fabric query charges, see [Microsoft Fabric Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Subject to changes in Microsoft Fabric workload consumption rate 

Consumption rates are subject to change at any time. Microsoft provides notice of changes through email and in-product notifications. Changes are effective on the date stated in the release notes and the Microsoft Fabric blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.

