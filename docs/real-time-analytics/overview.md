---
title: Overview of Real-time Analytics in Microsoft Fabric
description: Learn about Real-time Analytics in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.date: 03/26/2023
ms.search.form: product-kusto
---
# What is Real-time Analytics in Fabric?

The last few decades have seen a paradigm shift in the way we access and consume information, as users have become accustomed to data that is interactive, on demand, and accessible to all. This data shift has been powered by big data, streaming data ingestion, and indexed, keyword-based search, all together forming a simplified user experience in many consumer industries. With Microsoft Fabric Real-time Analytics, we enable organizations to focus and scale up their analytics solution while democratizing data from the citizen data scientist all the way to the advanced data engineer.

How? Real-time Analytics reduces complexity and simplifies data integration. Quick access to data insights is achieved through automatic data streaming, automatic indexing and data partitioning of any data source or format, and through the use of the on-demand query generation and visualizations. Real-time Analytics lets you focus on your analytics solutions by scaling up seamlessly with the service as your data and query needs grow.


## What makes Real-time Analytics unique?

* **Easy ingestion** of data from any source, in any data format.
* **No complex data modeling** means there's no need to build complex data models or for complex scripting to transform data before it's consumed.
* **By-default streaming** provides high performance, low latency, high freshness data analysis.
* **Default partitioning** - both time and hash-based partitioning, and by-default **indexing**.
* **Versatile data structures** so that you can query structured, semi-structured, or free text.
* **Query** raw data without transformation.
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

* A [KQL Database](create-database.md) for data storage and management. Data loaded into a KQL Database is automatically reflected in OneLake, and is available to other workloads.
* Event streams for data loading. 
* A [KQL Queryset](kusto-query-set.md) to run queries, view, and manipulate query results on data. The KQL Queryset allows you to save queries for future use, or export and share queries with others.

See how these items work together in the end-to-end streaming data consumption and analysis scenario: [Tutorial: Real-time Analytics](realtime-analytics-tutorial.md)

## Integration with other workloads

:::image type="content" source="media/real-time-analytics-overview/schematic-architecture.png" alt-text="Schematic image of architecture of Real-time Analytics integration with other workloads.":::

* Data in OneLake can be accessed by Real-time Analytics in several ways:
    * Data from OneLake can be [queried from Real-time Analytics as a shortcut](onelake-shortcut.md)
    * Data from [OneLake can be loaded](get-data-onelake.md) into Real-time Analytics
    * Data loaded into Real-time Analytics is reflected in OneLake as one logical copy
* Data loaded into Real-time Analytics can be used as the underlying data for [visualization in a PowerBI report](create-powerbi-report.md)
* Data loaded into Real-time Analytics can be used for analysis in [Jupyter](jupyter-notebook.md) or Spark Notebooks in Data Engineering
* Trigger data loading events in Data Factory using [pipelines](../data-factory/connector-overview.md#supported-data-stores-in-data-pipeline).
* Trigger data loading events using [Dataflows](../data-factory/connector-overview.md#supported-data-connectors-in-dataflows).

## See also

* [Get data from Azure Event Hubs](get-data-event-hub.md)
* [Get data from a blob](get-data-blob.md)
* [Query data in the KQL queryset](kusto-query-set.md)
