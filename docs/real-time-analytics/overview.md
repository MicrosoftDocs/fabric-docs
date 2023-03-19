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

The constant flow of data emitted by devices, events, and users has radically expanded our ability to gain insights into scenarios behind data and to make data-based decisions. Real-time Analytics in Microsoft Fabric uses a combination of streaming data ingestion and a simple-to-understand query language to enable all users, from the citizen data scientist to advanced engineers, immediate access to analyze data and gain insights. 

Quick access to data insights is achieved through automatic data streaming, automatic indexing and data partitioning, and through the use of the Kusto Query Language for on-demand query generation and visualizations. Real-time Analytics lets you focus on your analytics solutions by scaling up seamlessly with the service as your data and query needs grow.

## Key advantages of Real-time Analytics

Real-time Analytics provides the following defining advantages:

* High performance, low latency, high freshness
* Unlimited scale from gigabytes to petabytes
* Unlimited scale on concurrent queries and concurrent users
* Ingest from any data source, in any data format
* Query structured, semi-structured, or free text
* By-default streaming
* Automatic time and hash-based partitioning
* By-default indexing

## When to choose Real-time Analytics

A number of industries use Real-time Analytics for their data needs, for example: finance, transportation and logistics, smart cities, smart buildings, manufacturing operations, automotive, and oil and gas. If any of these questions describe your data needs, Real-time Analytics is the right solution for you:

> [!div class="checklist"]
>
> * Do I have a service that needs to access data in real-time?
> * Do I have complicated data, such as JSON or other arrays?
> * Do I need to search or access free text?

## Items in Real-time Analytics

The main items available in Real-time Analytics include:

* Event streams <!-- which do what? -->
* A [KQL Database](create-database.md) for data storage and management. Data ingested into a KQL Database is automatically reflected in OneLake, and is available to other workloads.
* A [KQL Queryset](kusto-query-set.md) to run queries, view, and manipulate query results on data. The KQL Queryset allows you to save queries for future use, or export and share queries with others.

See how these items work together in the end-to-end streaming data consumption and analysis scenario: [Tutorial: Real-time Analytics](realtime-analytics-tutorial.md)

## Integration with other workloads

:::image type="content" source="media/real-time-analytics-overview/schematic-architecture.png" alt-text="Schematic image of architecture of Real-time Analytics integration with other workloads.":::

* Data in OneLake can be accessed by Real-time Analytics in several ways:
    * Data from OneLake can be [queried from Real-time Analytics as an external table](onelake-shortcut.md)
    * Data from [OneLake can be ingested](get-data-onelake.md) and indexed in Real-time Analytics
    * Data ingested into Real-time Analytics is reflected in OneLake as one logical copy
* Data ingested into Real-time Analytics can be used as the underlying data for [visualization in a PowerBI report](create-powerbi-report.md)
* Data ingested into Real-time Analytics can be used for analysis in [Jupyter](jupyter-notebook.md) or Spark Notebooks in Data Engineering

## See also

* [Get data from Azure Event Hubs](get-data-event-hub.md)
* [Get data from a blob](get-data-blob.md)
* [Query data in the KQL queryset](kusto-query-set.md)
