---
title: Eventhouse cost per GB ingested 
description: Discover how Eventhouse calculates cost per GB ingested, what drives costs, and how to optimize your cluster.
ms.reviewer: avnera
author: bwatts64
ms.author: bwatts
ms.topic: concept-article
ms.subservice: rti-eventhouse
ms.date: 09/08/2025
ms.search: Cost, pricing, Cost per GB, optimize, 

#CustomerIntent: As a Eventhouse admin, I want to understand what drives the costs and how to optimize the costs.
---

# Cost breakdown of Eventhouse

Eventhouse is a fully managed analytics platform for real-time analysis of large-scale telemetry and log data. This article explains how cost per GB ingested is calculated in Eventhouse, what factors drive it, and how you can optimize your compute for cost efficiency. Big data analytics platforms use different pricing models. Many platforms base pricing on factors like query volume, data ingestion, storage duration, and compute resources. This complexity makes it hard to compare pricing across products.

To help understand the cost of using Eventhouse, this article uses the metric **cost per GB ingested**. This metric is the **total cost** (capacity and storage) divided by the **total original sized data ingested** during that period.

A representative snapshot of Eventhouse in **July 2025** is used to ground the example analysis. The following sections show the main results from the [analysis](#cost-per-gb-ingested-use-cases), explain [what drives](#drivers-for-cost-per-gb-ingested) the cost variations, and how users can [optimize cost per GB ingested](#a-closer-look-at-key-cost-drivers) without compromising performance.

> [!NOTE]
>
> * All cost figures in this article show list prices and don't include discounts or commitment-based savings.
> * In this example analysis, cost per GB is expressed in Sample Cost Units (SCUs), where each SCU represents a generic cost unit, for example, one US cent.
> * An explanation of how **Capacity Units** are calculated for Eventhouse, can be found in [Eventhouse and KQL Database consumption](real-time-intelligence-consumption.md).
> * For list prices and how to calculate them, see [Fabric Capacity Estimator](https://www.microsoft.com/microsoft-fabric/capacity-estimator).

## Cost per GB ingested use cases
The cost per GB of your Fabric eventhouse varies based on the scenario and the settings that you configure. There are many scenarios where both the performance needs and cost requirements are exceeded. This article walks you through two different scenarios of production Eventhouses running in Microsoft Fabric.

### Scenario: Large On-Time ingestion with infrequent access
In this scenario, a customer ingested around 1 TB of data and ran around 600 queries in a 2 hour period. With activity being limited to those 2 hours, they used only 23 Capacity Unit (CU) hours on that day. Adding in the standard storage cost for that day (~0.4 SCUs) and the hot cache storage (23 SCUs), the cost per GB ingested ends up being around 0.57 SCUs per gigabytes (GB) ingested.  

In this scenario, the customer continues to pay for the storage cost but only has to pay for compute capacity when they run more queries or ingest more data, making it an extremely cost efficient option for customers.

### Scenario: Continuous Ingestion with continuous queries
In this scenario, a customer is ingesting around 2.5TB/day and running around 10,500 queries. This scenario can result in higher cost per GB ingested so lets first outline some of the decisions made that drove down their cost in this scenario:

- Because the cluster is continuously ingesting data the UpTime for the cluster is going to be 100%. If you don't enable always-on in these scenarios, you continue to pay for hot cache storage, which can drive up your cost. So enabling Always-on means that even if you don't have activity, you're charged for the compute capacity but it also means you aren't charged for the hot cache storage. So, you should enable Always-on for a very active Eventhouse.
- One of the factors that affect the size of your Eventhouse compute is how much hot cache you store. So only keeping the data you need for most your queries in hot cache can optimize the size of compute that you're charged for.
- With Always-On, you have the option to also set the minimum capacity. This setting is intended for handling unexpected load where you still need high performance at that moment. For steady workloads, allow our autoscale mechanism to run compute at the most optimal size by just enabling Always-On but not enabling Minimum Capacity.

For this scenario, these are the major factors that helped drive a very efficient workload in Eventhouse. For this Eventhouse, ingesting 2.5TB/day and running 10,500 queries, resulted in 817 CU hours on that day. Adding in standard storage cost of 100 SCUs for that day the cost per GB ingested ends up being around 6 SCUs per GB ingested.

## Scenario Summary
The two scenarios described earlier represent two completely different use-cases but also two common scenarios that we see in Eventhouse. These numbers come from real clusters in Microsoft Fabric and show that when tuned to your specific needs, cost per GB ingested in Eventhouse is more than competitive with similar data analytics products.

## Drivers for cost per GB ingested

These key factors are behind the variations in cost per GB ingested per cluster:

* **Storage duration**: The longer you store data, the higher the cost. See [retention policy](data-management.md#data-retention-policy).

* **High CPU usage**: Actions like heavy queries, data processing, or transformations cause high CPU usage.

* **Cache settings**: Caching more data boosts performance but can increase costs. See [cache policy](data-management.md#caching-policy).

* **Cold data usage**: Queries that access cold data trigger read transactions and add to cost. See [hot and cold cache](data-management.md#caching-policy).

* **Data transformation and optimization**: Features like Update Policies, Materialized Views, and Partitioning consume CPU resources and can raise cost. See [Update policies](table-update-policy.md), [Materialized views](materialized-view.md), and [partitions](/kusto/management/partitioning-policy).

* **Ingestion volume**: Clusters operate more cost-effectively at higher ingestion volumes.

* **Streaming vs. Queued ingestion**: Each has a different cost profile depending on the use case. See [streaming](/kusto/management/data-ingestion/streaming-ingestion-schema-changes) and [Queued](/kusto/management/data-ingestion/queued-ingestion-overview).

* **Schema design**: Wide tables with many columns need more compute and storage resources, which raises costs.

* **Advanced features**: Options like followers, private endpoints, and Python sandboxes consume more resources and can add to cost.

You can configure most of these factors to optimize both performance and cost.

## A closer look at key cost drivers

This section explores the key factors that influence the cost per GB ingested in Eventhouse, providing insights into how you can manage and optimize these costs.

### Data retention impact on cost

In Eventhouse, all ingested data is stored in persistent storage. Each table and materialized view has a **retention policy** that defines how long the data is kept. The longer the data is retained, the higher the cost, based on Fabric OneLake Storage pricing. When you need long-term storage, like for compliance, the cost per GB ingested increases because it includes ongoing storage expense.

### Compute size

* Compute size is the number of cores in the cluster. Each core adds cost when the Eventhouse is active. **Autoscale** adjusts the compute size based on CPU usage, so the system can optimize cost and performance by avoiding idle or redundant resources.

* Autoscale adjusts the compute size to ensure cached data fits within the available SSD space. As a result, a large cache can increase cluster size and if CPU usage is low, it might lead to a higher cost per GB. 

* Eventhouses that run many queries or do CPU-heavy tasks like Materialized Views, Update Policies, or Partitioning can scale the cluster, raising the cost per GB. These features can significantly increase query performance and reduce query CPU usage and thus improve overall efficiency.

> [!NOTE]
>
> * To learn more on optimizing your Eventhouse Compute, read through [Understanding Eventhouse computer usage](eventhouse-compute-observability.md)

### Volume of data ingested

As a cluster grows, more nodes are added, increasing total cost. That cost is spread across all ingested data, so the more data you ingest, the lower the cost per GB.

### Cold data usage

When queries frequently access cold data stored on disk, they cause read transactions that use more resources and can increase overall cluster cost.

### Streaming vs. queued Ingestion

Each ingestion method has different cost, latency, and functionality characteristics, so each is better for different scenarios. For cost, **streaming ingestion** is cheaper when you ingest many small tables with trickling data, while **queued ingestion** is more cost-effective for large tables.

> [!TIP]
>
> **Optimize Cost per GB Ingested**
>
> Check the configurations of the [key cost drivers](#a-closer-look-at-key-cost-drivers) to ensure they fit your cluster’s needs and service requirements for efficiency. In particular:
>
> - To reduce read transactions, minimize queries over cold data 
> - Enable autoscale to dynamically match cluster size to demand.


