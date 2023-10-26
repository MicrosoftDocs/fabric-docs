---
title: Database consumption
description: Learn how to manage your data in Real-Time Analytics.
ms.reviewer: bwatts
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.date: 10/26/2023
ms.search.form: KQL Database, Overview
---

KQL databases operate on a fully managed Kusto engine. With a KQL Database, you can expect available compute for your analytics within 5 to 10 seconds. The compute resources grow with your data analytic needs.

When you use a Fabric capacity, your usage charges appear in the Azure portal under your subscription in [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview). To understand your Fabric billing, visit [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing).

This article explains compute usage reporting of the KQL databases in Microsoft Fabric, which includes .

## KQL and Capacity Units

In Fabric, based on the Capacity SKU purchased, you're entitled to a set of Capacity Units (CUs) that are shared across all Fabric workloads. For more information on licenses supported, see [Microsoft Fabric licenses](../enterprise/licenses).

Capacity is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different resources consume CUs at different times. The amount of capacity that used by a KQL database is based on the **KustoUpTime** operation.

### KustoUpTime

KustoUpTime is the number of seconds that your KQL database is active in relation to the number of virtual cores used by your database. For example, if a database is using 4 virtual cores and is active for 30 seconds then you will utilize 120 seconds of Capacity Units. An auto-scale mechanism is utilized to determine the size of your KQL database. This ensures the most cost optimized and best performance based on your usage pattern. 

### Monitor KustoUpTime

The [Microsoft Fabric Capacity Metric app](../enterprise/metrics-app) allows any capacity administrator to monitor capacity usage.

:::image type="content" source="media/database-consumption/kusto-up-time.png" alt-text="Screenshot of uptime in Microsoft Fabric Capacity Metric app.":::

## KQL and Storage

Data ingested into a KQL database is stored in two tiers of storage. This does not affect Fabric or Power BI Premium Capacity units and will be billed separately.

### OneLake Cache Storage

This is premium storage that is utilized to provide the fastest query response times. For instance, if you typically query back 7 days then you can set the cache retention to 7 days for best performance. This will be comparable to Azure ADLS (Azure Data Lake Storage) premium tier.

### OneLake Standard Storage

This is standard storage that is used to persist and store all queryable data. For instance, if you need to maintain 365 days of queryable data you can set the retention to 365 days. This will be comparable to Azure ADLS (Azure Data Lake Storage) hot tier.

### Monitor OneLake Storage

The “Microsoft Fabric Capacity Metric” app allows any capacity administrator to monitor OneLake Storage. 

### 

:::image type="content" source="media/database-consumption/fabric-capacity-metrics.png" alt-text="Screenshot of Fabric capacity metrics app with data from Real-Time Analytics.":::

## Related content

* [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
* [Create a KQL database](create-database.md)