---
title: Event house and KQL Database consumption
description: Learn how event houses and KQL databases consume capacity units in Real-Time Intelligence.
ms.reviewer: bwatts
ms.author: shsagir
author: shsagir
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 04/21/2024
ms.search.form: Event house,KQL Database, Overview
---
# Event house and KQL Database consumption

[Event houses](create-eventhouse.md) and [KQL databases](create-database.md) operate on a fully managed Kusto engine. With an Event house or KQL database, you can expect available compute for your analytics within 5 to 10 seconds. The compute resources grow with your data analytic needs. This article explains compute usage reporting of the KQL databases in Microsoft Fabric, including [KustoUpTime](#kustouptime) and [storage](#monitor-onelake-storage).

When you use a Fabric capacity, your usage charges appear in the Azure portal under your subscription in [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview). To understand your Fabric billing, visit [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing.md).

> [!IMPORTANT]
> **Changes to Microsoft Fabric Workload Consumption Rate**
>
> Consumption rates are subject to change at any time. Microsoft will use reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in [Microsoft's Release Notes](/fabric/release-plan) or [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/en-US/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.  

## Capacity

Based on the Capacity SKU that was purchased in Fabric, you're entitled to a set of Capacity Units (CUs) that are shared across all Fabric workloads. For more information on licenses supported, see [Microsoft Fabric licenses](../enterprise/licenses.md).

Capacity is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different resources consume CUs at different times. The amount of capacity that used by a KQL database is based on the **KustoUpTime** operation.

## KustoUpTime

**KustoUpTime for an event house** is the number of seconds that your event house is active in relation to the number of virtual cores used by your event house. An autoscale mechanism is used to determine the size of your event house. This mechanism ensures cost and performance optimization based on your usage pattern. An event house with multiple KQL databases attached to it only shows KustoUpTime for the event house item. You will not see usage for the KQL database sub-item.

> For example, an event house with 4 KQL databases using 4 virtual cores that is active for 30 seconds will use 120 seconds of Capacity Units.

**KustoUpTime for a KQL database** is the number of seconds that your KQL database is active in relation to the number of virtual cores used by your database. An autoscale mechanism is used to determine the size of your KQL database. This mechanism ensures cost and performance optimization based on your usage pattern.

> For example, a database using 4 virtual cores that is active for 30 seconds will use 120 seconds of Capacity Units.

> [!NOTE]
> If your KQL database is a sub-item of an event house, the KustoUpTime is relfected in the event house item and the database item isn't shown in the list.

### Monitor KustoUpTime

You can monitor **KustoUpTime** with the [Microsoft Fabric Capacity Metric app](../enterprise/metrics-app.md). Learn how to understand the Metrics app compute page in [Understand the metrics app compute page](../enterprise/metrics-app-compute-page.md). This example shows information specific to monitoring **KustoUpTime**.

> [!NOTE]
> You must be a capacity administrator to monitor capacity usage. For more information, see [Understand Microsoft Fabric admin roles](../admin/roles.md).

The following image shows a sample compute page from monitoring capacity in the Fabric Capacity Metric app:

:::image type="content" source="media/real-time-intelligence-consumption/kusto-up-time.png" alt-text="Screenshot of uptime in Microsoft Fabric Capacity Metric app." lightbox="media/real-time-intelligence-consumption/kusto-up-time.png":::

Here are some insights you can take from the example:

* The capacity being examined is called *rtafielddemo*.
* The capacity units for the selected day were used by a single workspace called *RTA Field Demo*.
* The *Items* view has been filtered to show both *Event house* and *KQL Database*.
* Selecting a single item, such as an *Event house item*, breaks down the CU usage by operations.
* The utilization graph, on the right side of the app, shows nearly 100% CU usage over time. This high utilization can explain query throttling experienced by users and indicates a need to increase the capacity units.

## Storage billing

Storage is billed separately from your Fabric or Power BI Premium Capacity units. Data ingested into a KQL database is stored in two tiers of storage: OneLake Cache Storage, and OneLake Standard Storage.

* **OneLake Cache Storage** is premium storage that is utilized to provide the fastest query response times. When you set the [cache policy](/azure/data-explorer/kusto/management/cachepolicy?context=/fabric/context/context-rti&pivots=fabric), you affect this storage tier. For instance, if you typically query back seven days then you can set the cache retention to seven days for best performance. This storage tier is comparable to the Azure ADLS (Azure Data Lake Storage) premium tier.

> [!NOTE]
> Enabling [minimum consumption](manage-monitor-eventhouse.md#enable-minimum-consumption) means that you aren't charged for *OneLake Cahce Storage*. When minimum capacity is set, the event house is always active resulting in 100% KustoUpTime.

* **OneLake Standard Storage** is standard storage that is used to persist and store all queryable data. When you set the [retention policy](data-policies.md#data-retention-policy), you affect this storage tier. For instance, if you need to maintain 365 days of queryable data you can set the retention to 365 days. This storage tier is comparable to the Azure ADLS (Azure Data Lake Storage) hot tier.

### Monitor OneLake Storage

The [Microsoft Fabric Capacity Metric app](../enterprise/metrics-app.md) allows any capacity administrator to monitor OneLake Storage. Learn how to understand the Metrics app storage page in [Understand the metrics app storage page](../enterprise/metrics-app-storage-page.md).

The following image shows a sample storage page from monitoring a KQL database in the Fabric Capacity Metric app:

:::image type="content" source="media/real-time-intelligence-consumption/fabric-capacity-metrics.png" alt-text="Screenshot of Fabric capacity metrics app with data from Real-Time Intelligence.":::

## Related content

* [Microsoft Fabric concepts and licenses](../enterprise/licenses.md)
* [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
* [Create a KQL database](create-database.md)
