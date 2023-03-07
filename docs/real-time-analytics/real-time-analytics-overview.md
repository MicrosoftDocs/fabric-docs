---
title: Overview of Real-time Analytics in Microsoft Fabric
description: Learn about Real-time Analytics in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.date: 03/07/2023
ms.search.form: product-kusto
---
# What is Real-time Analytics in Fabric?

Real-time Analytics is the Microsoft Fabric solution for managing logs, observability, telemetry, and IoT data. Real-time Analytics contains a set of [items](#items) that together provide an optimal solution for these scenarios. This

## When do you use it?

If any of these describe your data needs, this is the right solution for you:

* Do you have a service that needs to access data in real-time?
* Do you have complicated data like JSON data or arrays?
* Do you need to search or access free text?

## Example scenarios

There are a wide range of data-producing industries that benefit from analyzing data with Real-time Analytics. Some examples are transportation and logistics, smart cities/buildings/homes, manufacturing operations, automotive, and oil and gas.

* Financial data - time series analysis 
* Marketing campaign (look at learn example)
* Ops to manage data centers
* Smart cities
* Smart manufacturing
    * IoT devices used to manage production - temp, production times, production pass e.g. clothing production
* Utilization of machines
    * Optimization of single device to increase production, e.g. oil and gas machinery


## Specifics of use

Happy path architecture flow

## What are the key advantages?

* Unlimited Scale 1GB - 1 PB
* Unlimited scale on concurrent queries and concurrent users
* Any data source
* Any data format
* Structured, **semi-structured, free text**
* Transformation of complicated data structure
* Hi performance, low latency, high freshness
* Timeseries
* Automatic index and partitioning

## Items

* KQL Database
* KQL Queryset

## Architecture

Get image from Tzvia

## Integration with other workloads

PBI quick create
PBI for Kusto DB
Data Integration 
OneLake
Data Engineering - Notebook and Spark

### Unlimited scale

Real-time Analytics delivers high performance with an increasing volume of data or queries. You can begin with datasets as small as a few gigabytes and grow to as large as several petabytes. The Real-time Analytics service automatically scales your resources as your needs grow.

Some of the growth dimensions that can scale with you are:

* Concurrent queries
* Concurrent users
* Data storage
* Total queries

In general, scaling occurs in the background and does not affect performance.




SAAS solution that allows data democratization from citizen scientist to advanced engineer to consume data and explore data. From no code to complex code with advanced capabilities - scan, anomalies, python code.
Time-series database optimized for data that has a time component.

Tzvia's story about the way we've changed in the way we watch TV, listen to music.... how easy it is to use the data in a citizen way and find the song or show we want (Spotify, Netflix). 5 year old and saba in same tools. For enterprise- want to know about your stocks, finances, enterprise - you're waiting for some dude to build you a report. RTA wants to be able to give these tools to anyone in order to make data-based decisions.

Interactive, on demand, access to all
default index and partitioned

keyword-based search in human friendly language
don't need to know what your query is during the data engineering stage

don't need to wait for scheduled report generation

enable organizations to focus and scale up their analytics solution and democratize data to advanced and citizen data scientist. How? 
reduce complexity
* by-default streaming
* by-default indexing
* time and hash-based partitioning

Simplify integration
* other items in Fabric by default


the Data Explorer analytics runtime is optimized for efficient log analytics using powerful indexing technology to automatically index free-text and semi-structured data commonly found in telemetry data.