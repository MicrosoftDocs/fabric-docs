---
title: KQL Database consumption
description: Learn how to KQL databases consume capacity units in Real-Time Analytics.
ms.reviewer: bwatts
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.date: 10/26/2023
ms.search.form: KQL Database, Overview
---
# KQL Database consumption

[KQL databases](create-database.md) operate on a fully managed Kusto engine. With a KQL database, you can expect available compute for your analytics within 5 to 10 seconds. The compute resources grow with your data analytic needs. This article explains compute usage reporting of the KQL databases in Microsoft Fabric, including [KustoUpTime](#kustouptime) and [storage](#monitor-onelake-storage).

When you use a Fabric capacity, your usage charges appear in the Azure portal under your subscription in [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview). To understand your Fabric billing, visit [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing.md).

## Capacity

Based on the Capacity SKU that was purchased in Fabric, you're entitled to a set of Capacity Units (CUs) that are shared across all Fabric workloads. For more information on licenses supported, see [Microsoft Fabric licenses](../enterprise/licenses.md).

Capacity is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different resources consume CUs at different times. The amount of capacity that used by a KQL database is based on the **KustoUpTime** operation.

## KustoUpTime

**KustoUpTime** is the number of seconds that your KQL database is active in relation to the number of virtual cores used by your database. An autoscale mechanism is used to determine the size of your KQL database. This mechanism ensures cost and performance optimization based on your usage pattern.

> For example, a database using 4 virtual cores that is active for 30 seconds will use 120 seconds of Capacity Units.

### Monitor KustoUpTime

You can monitor KustoUpTime with the [Microsoft Fabric Capacity Metric app](../enterprise/metrics-app.md).

> [!NOTE]
> You must be a capacity administrator to monitor capacity usage. For more information, see [Understand Microsoft Fabric admin roles](../admin/roles.md).

:::image type="content" source="media/database-consumption/kusto-up-time.png" alt-text="Screenshot of uptime in Microsoft Fabric Capacity Metric app.":::

## Storage billing

Storage is billed separately from your Fabric or Power BI Premium Capacity units. Data ingested into a KQL database is stored in two tiers of storage: OneLake Cache Storage, and OneLake Standard Storage.

* **OneLake Cache Storage** is premium storage that is utilized to provide the fastest query response times. For instance, if you typically query back seven days then you can set the cache retention to seven days for best performance. This storage tier is comparable to the Azure ADLS (Azure Data Lake Storage) premium tier.

* **OneLake Standard Storage** is standard storage that is used to persist and store all queryable data. For instance, if you need to maintain 365 days of queryable data you can set the retention to 365 days. This storage tier is comparable to the Azure ADLS (Azure Data Lake Storage) hot tier.

### Monitor OneLake Storage

The [Microsoft Fabric Capacity Metric app](../enterprise/metrics-app.md) allows any capacity administrator to monitor OneLake Storage.

:::image type="content" source="media/database-consumption/fabric-capacity-metrics.png" alt-text="Screenshot of Fabric capacity metrics app with data from Real-Time Analytics.":::

## Related content

* [Microsoft Fabric concepts and licenses](../enterprise/licenses.md)
* [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
* [Create a KQL database](create-database.md)