---
title: Overview of Real-time Analytics in Microsoft Fabric
description: Learn about Real-time Analytics in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.date: 03/09/2023
ms.search.form: product-kusto
---
# What is Real-time Analytics in Fabric?

Real-time Analytics is the Microsoft Fabric solution for managing logs, observability, telemetry, and IoT data. Real-time Analytics is optimized for the capture and analysis of data that includes a time-series element, by using the intuitive and powerful Kusto Query Language (KQL) to explore and visualize data, and by seamlessly integrating with other Fabric workloads.

## When do I choose Real-time Analytics?

If any of these questions describe your data needs, Real-time Analytics is the right solution for you:

> [!div class="checklist"]
>
> * Do I have a service that needs to access data in real-time?
>* Do I have complicated data, such as JSON or other arrays?
>* Do I need to search or access free text?

:::image type="content" source="media/real-time-analytics-overview/schematic-single-company.png" alt-text="Schematic image of single company architecture.":::

These needs can be found throughout a number of industries, for example: finance, transportation and logistics, smart cities, smart buildings, manufacturing operations, automotive, and oil and gas. 

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

## How do I use Real-time Analytics?

The main items available in Real-time Analytics include:

* A [KQL Database](create-database.md) is the entity for data storage and management. Data ingested into a KQL Database is automatically reflected in OneLake, and available to other workloads.
* A [KQL Queryset](kusto-query-set.md) is the item used to run queries, and view and manipulate query results on data from your Data Explorer database. The KQL Queryset allows you to save queries for future use, or export and share queries with others.

See how these items work together in the following end-to-end scenario:

For more information, see [Tutorial: Real-time Analytics](realtime-analytics-tutorial.md)

## How does Real-time Analytics integrate with other workloads?

:::image type="content" source="media/real-time-analytics-overview/schematic-architecture.png" alt-text="Schematic image of architecture of Real-time Analytics integration with other workloads.":::

PBI quick create
PBI for Kusto DB
Data Integration 
OneLake
Data Engineering - Notebook and Spark