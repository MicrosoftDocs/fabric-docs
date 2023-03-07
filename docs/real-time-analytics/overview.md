# What is Real-time Analytics in Fabric?

Real-time Analytics is the Microsoft Fabric solution for managing logs, observability, telemetry, and IoT data. Real-time Analytics is optimized for the capture and analysis of real-time or batch data that includes a time-series element, using the intuitive and powerful Kusto Query Language (KQL) to explore and visualize data, while seamlessly integrating with other Fabric workloads.

## When do I choose Real-time Analytics?

If any of these questions describe your data needs, Real-time Analytics is the right solution for you:

* Do I have a service that needs to access data in real-time?
* Do I have complicated data, such as JSON or other arrays?
* Do I need to search or access free text?

These needs can be found throughout a number of industries, for example: finance, transportation and logistics, smart cities, smart buildings, manufacturing operations, automotive, and oil and gas. 

Even within a single company, different teams can use Real-time Analytics in a variety of ways:

* Production analyzes product logs to manage their inventory and make manufacturing decisions, informed also by geospatial analytics.
* Warehouses are outfitted with IoT devices, some of which are used by security to manage warehouse entry/exit logs, while others are used by operations to monitor the environment inside the warehouse.
* Individual manufacturing devices use production data to optimize and increase production.
* Stores use time series analytics to identify sales anomalies and predict future inventory events.
* Marketing teams use clickstream data (a form of log analytics) to optimize and scan online both ad campaigns and the customer funnel.
* The customer success department uses text search to analyze user feedback on social media.

From citizen scientist to advanced engineer, a wide range of personas can use the tools in Real-time Analytics to quickly and easily make data-based decisions.

## What are the key advantages?

* Unlimited scale from as small as a few gigabytes to as large as several petabytes
* Unlimited scale on concurrent queries and concurrent users
* Ingest from any data source
* Ingest in any data format
* Query structured, semi-structured, or free text
* Transformation of complicated data structure
* High performance, low latency, high freshness
* Automatic indexing
* Automatic time and hash-based partitioning
* By-default streaming
* By-default indexing

## How do I use Real-time Analytics?

The items available in Real-time Analytics include:

* [KQL Database](create-database.md)
* [KQL Queryset](kusto-query-set.md)

See how these items work together in the following end-to-end scenario:

For more information, see [Tutorial: Real-time Analytics](realtime-analytics-tutorial.md)

## How does it integrate with other workloads?

:::image type="content" source="../../schematic-architecture.png" alt-text="Schematic image of architecture of Real-time Analytics integration with other workloads.":::

PBI quick create
PBI for Kusto DB
Data Integration 
OneLake
Data Engineering - Notebook and Spark