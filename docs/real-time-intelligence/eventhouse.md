---
title: Eventhouse overview
description: Learn about eventhouse data storage in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: shsagir
author: shsagir
ms.topic: concept-article
ms.custom:
  - ignite-2024
ms.date: 11/19/2024
ms.search.form: Eventhouse
---
# Eventhouse overview

Eventhouses provide a solution for handling and analyzing large volumes of data, particularly in scenarios requiring real-time analytics and exploration. They're designed to handle real-time data streams efficiently, which lets organizations ingest, process, and analyze data in near real-time. These aspects make eventhouses useful for scenarios where timely insights are crucial. Eventhouses provide a scalable infrastructure that allows organizations to handle growing volumes of data, ensuring optimal performance and resource use. Eventhouses are the preferred engine for semistructured and free text analysis. An eventhouse is a workspace of databases, which might be shared across a certain project. It allows you to manage multiple databases at once, sharing capacity and resources to optimize performance and cost. Eventhouses provide unified monitoring and management across all databases and per database.

Eventhouses are tailored to time-based, streaming events with structured, semistructured, and unstructured data. You can get data from multiple sources, in multiple pipelines (For example, Eventstream, SDKs, Kafka, Logstash, data flows, and more) and multiple data formats. This data is automatically indexed and partitioned based on ingestion time.

## When do I create an eventhouse?

Use an eventhouse for any scenario that includes event-based data, for example, telemetry and log data, time series and IoT data, security and compliance logs, or financial records.

You can create a [KQL database](create-database.md) within an eventhouse. The KQL database can either be a standard database, or a [database shortcut](database-shortcut.md). An exploratory [query environment](create-database.md#explore-your-kql-database) is created for each KQL Database, which can be used for exploration and data management. [Data availability in OneLake](one-logical-copy.md) can be enabled on a database or table level.

## What information do I see in an eventhouse?

The system overview page of an eventhouse shows you the following information:

* Eventhouse details
* Running state of the eventhouse
* OneLake storage usage
* OneLake storage usage by database
* Compute usage
* Compute usage by user
* Most active databases
* Recent events

For more information, see [View system overview details for an eventhouse](manage-monitor-eventhouse.md#view-system-overview-details-for-an-eventhouse).

The databases page of an eventhouse shows you database information either in list or tile view. The following information about each database is displayed in tile view:

* Database name
* A graph of queries that were run over the past week
* Data size
* Caching policy
* Retention policy
* Last ingestion date

## Minimum consumption

Your eventhouse is designed to optimize cost by suspending the service when not in use. When reactivating the service, you might encounter a latency of a few seconds. If you have highly time-sensitive systems that can't tolerate this latency, use **Minimum consumption**. This setting enables the service to be always available, but at a selected minimum level. You pay for the minimum compute level you select, or your actual consumption when your compute level is above the minimum set. The specified compute is available to all the databases within the eventhouse. A limited premium storage is included in the service, and corresponds to the minimum consumption levels shown in the following table:

[!INCLUDE [capacity-eventhouse](includes/capacity-eventhouse.md)]

For instructions on how to enable minimum consumption, see [Enable minimum consumption](manage-monitor-eventhouse.md#enable-minimum-consumption).

## Next step

> [!div class="nextstepaction"]
> [Create an eventhouse](create-eventhouse.md)
