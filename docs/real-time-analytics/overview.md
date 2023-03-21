---
title: Overview of Real-time Analytics in Microsoft Fabric
description: Learn about Real-time Analytics in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.date: 03/16/2023
ms.search.form: product-kusto
---
# What is Real-time Analytics in Fabric?

The last few decades have seen a paradigm shift in the way we access and consume information, as users have become accustomed to data that is interactive, on demand, and accessible to all. This data shift has been powered by big data, streaming data ingestion, and indexed, keyword-based search, all together forming a simplified user experience in many consumer industries. However, real-time data consumption in the enterprise world has lagged behind with systems of high complexity, requiring high costs, and highly skilled data scientists. As a result, many enterprise solutions still depend on one or two experts for the creation of consumable reports.  With Microsoft Fabric Real-time Analytics, we enable organizations to focus and scale up their analytics solution while democratizing data.

How? Real-time Analytics reduces complexity and simplifies data integration. Quick access to data insights is achieved through automatic data streaming, automatic indexing and data partitioning, and through the use of the on-demand query generation and visualizations. Real-time Analytics lets you focus on your analytics solutions by scaling up seamlessly with the service as your data and query needs grow.

## What makes Real-time Analytics unique?

* **Easy ingestion** of data from any source, in any data format.
* **No complex data modeling** means there's no need to build complex data models or for complex scripting to transform data before it's consumed.
* **By-default streaming** provides high performance, low latency, high freshness data analysis.
* **Default partitioning** - both time and hash-based partitioning, and by-default **indexing**.
* **Versatile data structures** so that you can query structured, semi-structured, or free text.
* **Unlimited scale** from gigabytes to petabytes, with unlimited scale on concurrent queries and concurrent users.
* **Integrated** seamlessly with other workloads and items in Microsoft Fabric.

## When to use Real-time Analytics?

A number of industries use Real-time Analytics for their data needs, for example: finance, transportation and logistics, smart cities, smart buildings, manufacturing operations, automotive, and oil and gas. If any one of these questions describe your data needs, Real-time Analytics is the right solution for you:

> [!div class="checklist"]
>
> * Do I have a service that needs to access data in real-time?
> * Do I have complicated data, such as JSON or other arrays?
> * Do I need to search or access free text?

## How to work in Real-time Analytics?

The main items available in Real-time Analytics include:

* Event streams <!-- which do what? -->
* A [KQL Database](create-database.md) for data storage and management. Data ingested into a KQL Database is automatically reflected in OneLake, and is available to other workloads.
* A [KQL Queryset](kusto-query-set.md) to run queries, view, and manipulate query results on data. The KQL Queryset allows you to save queries for future use, or export and share queries with others.

See how these items work together in the end-to-end streaming data consumption and analysis scenario: [Tutorial: Real-time Analytics](realtime-analytics-tutorial.md)

## Integration with other workloads

:::image type="content" source="media/real-time-analytics-overview/schematic-architecture.png" alt-text="Schematic image of architecture of Real-time Analytics integration with other workloads.":::

* Data in OneLake can be accessed by Real-time Analytics in several ways:
    * Data from OneLake can be [queried from Real-time Analytics as a shortcut](onelake-shortcut.md)
    * Data from [OneLake can be ingested](get-data-onelake.md) into Real-time Analytics
    * Data ingested into Real-time Analytics is reflected in OneLake as one logical copy
* Data ingested into Real-time Analytics can be used as the underlying data for [visualization in a PowerBI report](create-powerbi-report.md)
* Data ingested into Real-time Analytics can be used for analysis in [Jupyter](jupyter-notebook.md) or Spark Notebooks in Data Engineering

## See also

* [Get data from Azure Event Hubs](get-data-event-hub.md)
* [Get data from a blob](get-data-blob.md)
* [Query data in the KQL queryset](kusto-query-set.md)
