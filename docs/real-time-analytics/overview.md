---
title: Overview of Real-time Analytics in Microsoft Fabric
description: Learn about Real-time Analytics in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.date: 03/29/2023
ms.search.form: product-kusto
---
# What is Real-time Analytics in Fabric?

The last few decades have seen a paradigm shift in the way we access and consume information, as users have become used to data that is interactive, on demand, and accessible to all. This data shift has been powered by big data, streaming data ingestion, and indexed, keyword-based search, all together forming a simplified user experience. With Microsoft Fabric Real-time Analytics, we enable organizations to focus and scale up their analytics solution while democratizing data for the needs of both the citizen data scientist all the way to the advanced data engineer.

How? Real-time Analytics reduces complexity and simplifies data integration. Quick access to data insights is achieved through automatic data streaming, automatic indexing and data partitioning of any data source or format, and through the use of the on-demand query generation and visualizations. This user process is simplified while preserving powerful analytical capabilities. Real-time Analytics lets you focus on your analytics solutions by scaling up seamlessly with the service as your data and query needs grow.

:::image type="content" source="media/real-time-analytics-overview/product-view.png" alt-text="Screenshot of Real-time Analytics product showing database homepage with a quick query pane showing binned ingestion results." lightbox="media/real-time-analytics-overview/product-view.png":::

Real-time Analytics is a fully managed big data analytics platform optimized for streaming, time-series data. It contains a dedicated query language and engine with exceptional performance for searching structured, semi-structured, and unstructured data with high performance. Real-time Analytics is fully integrated with the entire suite of Fabric products, for both data loading and advanced visualization scenarios.

## What makes Real-time Analytics unique?

* **Easily ingest** data from any source, in any data format.
* Run analytical queries **directly on raw data** without the need to build complex data models or create scripting to transform the data.
* Import data with **by-default streaming** that provides high performance, low latency, high freshness data analysis.
* Imported data undergoes **default partitioning** - both time and hash-based partitioning, and by-default **indexing**.
* Work with **versatile data structures** and query structured, semi-structured, or free text.
* **Query** raw data without transformation, with high performance, incredibly low response time, and using a wide variety of available [operators](/azure/data-explorer/kusto/query/index?context=/fabric/context/context). 
* **Scale to an unlimited** amount of data, from gigabytes to petabytes, with unlimited scale on concurrent queries and concurrent users.
* **Integrate** seamlessly with other workloads and items in Microsoft Fabric.

## When to use Real-time Analytics?

If any one of these questions describes your data needs, Real-time Analytics is the right solution for you:

> [!div class="checklist"]
> * Do I need high freshness from data ingestion to query?
> * Do I have a service that needs to access data with low query latency (in a matter of seconds)?
> * Does I need to search or access data in different formats, like structured data, semistructured data (including complicated data such as JSON or other arrays), or unstructured data (for example, free text)?
> * Do I want the ability to query large amounts of data?
> * Does my data have a time component that can benefit from the time series-optimized database structure?
> * Do I want the ability to create ad hoc queries on any field or row without prior optimization?

The types of industries which benefit from data analysis in Real-time Analytics is quite varied, for example: finance, transportation and logistics, smart cities, smart buildings, manufacturing operations, automotive, and oil and gas.

## How to work in Real-time Analytics?

The main items available in Real-time Analytics include:

* A [KQL Database](create-database.md) for data storage and management. Data loaded into a KQL Database is automatically reflected in OneLake, and is available to other workloads.
* Event streams for data loading. 
* A [KQL Queryset](kusto-query-set.md) to run queries, view, and manipulate query results on data. The KQL Queryset allows you to save queries for future use, or export and share queries with others.

See how these items work together in the end-to-end streaming data consumption and analysis scenario: [Tutorial: Real-time Analytics](realtime-analytics-tutorial.md)

## Integration with other workloads

:::image type="content" source="media/real-time-analytics-overview/schematic-architecture.png" alt-text="Schematic image of architecture of Real-time Analytics integration with other workloads.":::

* Create [Event Hubs cloud connections](get-data-event-hub.md) to stream data into Real-time Analytics
* Data in OneLake can be accessed by Real-time Analytics in several ways:
    * Data from OneLake can be [queried from Real-time Analytics as a shortcut](onelake-shortcut.md)
    * Data from [OneLake can be loaded](get-data-onelake.md) into Real-time Analytics
    * Data loaded into Real-time Analytics is reflected in OneLake as one logical copy
* Data loaded into Real-time Analytics can be used as the underlying data for [visualization in a Power BI report](create-powerbi-report.md)
* Data loaded into Real-time Analytics can be used for analysis in [Jupyter](jupyter-notebook.md) or Spark Notebooks in Data Engineering
* Trigger data loading events in Data Factory using [pipelines](../data-factory/connector-overview.md#supported-data-stores-in-data-pipeline).
* Trigger data loading events using [Dataflows](../data-factory/connector-overview.md#supported-data-connectors-in-dataflows).

## See also

* Compare Real-time Analytics to Azure Data Explorer
* [Tutorial: Real-time Analytics](realtime-analytics-tutorial.md)
* [Query data in the KQL Queryset](kusto-query-set.md)
* [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context)
