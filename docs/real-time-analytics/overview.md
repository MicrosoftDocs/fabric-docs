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

The constant flow of data emitted by devices, events, and users has radically expanded our ability to gain insights into scenarios behind data and to make data-based decisions. Real-time Analytics in Microsoft Fabric uses a combination of streaming data ingestion and a simple-to-understand query language to enable all users, from the citizen data scientist to advanced engineers, immediate access to analyze data and gain insights. This quick access to data insights is achieved through automatic data streaming, automatic indexing and data partitioning, and through the use of the Kusto Query Language for on-demand query generation and visualizations. Real-time Analytics lets you focus on your analytics solutions by scaling up seamlessly with the service as your data and query needs grow.

The main items available in Real-time Analytics include:

* A [KQL Database](create-database.md) for data storage and management. Data ingested into a KQL Database is automatically reflected in OneLake, and is available to other workloads.
* A [KQL Queryset](kusto-query-set.md) to run queries, view, and manipulate query results on data. The KQL Queryset allows you to save queries for future use, or export and share queries with others.

See how these items work together in the end-to-end streaming data consumption scenario: [Tutorial: Real-time Analytics](realtime-analytics-tutorial.md)

## When do I choose Real-time Analytics?

If any of these questions describe your data needs, Real-time Analytics is the right solution for you:

> [!div class="checklist"]
>
> * Do I have a service that needs to access data in real-time?
> * Do I have complicated data, such as JSON or other arrays?
> * Do I need to search or access free text?

A number of industries use Real-time Analytics for their data needs, for example: finance, transportation and logistics, smart cities, smart buildings, manufacturing operations, automotive, and oil and gas.

:::image type="content" source="media/real-time-analytics-overview/schematic-single-company.png" alt-text="Schematic image of single company architecture.":::

Even within a single company, different teams can use Real-time Analytics in a variety of ways:

* Production analyzes product logs to manage their inventory and make manufacturing decisions, informed also by geospatial analytics.
* Warehouses are outfitted with IoT devices, some of which are used by security to manage warehouse entry/exit logs, while others are used by operations to monitor the environment inside the warehouse.
* Individual manufacturing devices use production data to optimize and increase production.
* Store sites use time series analytics to identify sales anomalies and predict future inventory events.
* Marketing teams use clickstream data (a form of log analytics) to optimize and scan online both ad campaigns and the customer funnel.
* The customer success department uses text search to analyze user feedback on social media.

From citizen scientist to advanced engineer, a wide range of personas can use the tools in Real-time Analytics to quickly and easily make data-based decisions.

## What are the key advantages of Real-time Analytics?

Real-time Analytics provides the following defining advantages:

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

## How does Real-time Analytics integrate with other workloads?

:::image type="content" source="media/real-time-analytics-overview/schematic-architecture.png" alt-text="Schematic image of architecture of Real-time Analytics integration with other workloads.":::


PBI quick create
PBI for Kusto DB
Data Integration 
OneLake
Data Engineering - Notebook and Spark