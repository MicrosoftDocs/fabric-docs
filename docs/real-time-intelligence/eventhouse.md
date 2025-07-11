---
title: Eventhouse overview
description: Learn about eventhouse data storage in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 02/12/2025
ms.search.form: Eventhouse
---
# Eventhouse overview

Eventhouses provide a solution for handling and analyzing large volumes of data, particularly in scenarios requiring real-time analytics and exploration. They're designed to handle real-time data streams efficiently, which lets organizations ingest, process, and analyze data in near real-time. These aspects make eventhouses useful for scenarios where timely insights are crucial. Eventhouses provide a scalable infrastructure that allows organizations to handle growing volumes of data, ensuring optimal performance and resource use. Eventhouses are the preferred engine for semistructured and free text analysis. An eventhouse is a workspace of databases, which might be shared across a certain project. It allows you to manage multiple databases at once, sharing capacity and resources to optimize performance and cost. Eventhouses provide unified monitoring and management across all databases and per database.

Eventhouses are tailored to time-based, streaming events with structured, semistructured, and unstructured data. You can get data from multiple sources, in multiple pipelines (For example, Eventstream, Software Development Kits, Kafka, Logstash, data flows, and more) and multiple data formats. This data is automatically indexed and partitioned based on ingestion time.

## When do I create an eventhouse?

Use an eventhouse for any scenario that includes event-based data. For example, telemetry and log data, time series and IoT data, security and compliance logs, or financial records.

You can create a [KQL database](create-database.md) within an eventhouse. The KQL database can either be a standard database, or a [database shortcut](database-shortcut.md). An exploratory [query environment](create-database.md#explore-your-kql-database) is created for each KQL database, which can be used for exploration and data management. [Data availability in OneLake](one-logical-copy.md) can be enabled on a database or table level.

## What information do I see in an eventhouse?

The system overview page of an eventhouse shows you the following information:

* Eventhouse details
* Eventhouse storage
* System resources
* Compute usage
* Top user activity in minutes
* Ingestion rate
* Top queried databases
* Top ingested databases
* What's new

For more information, see [View system overview details for an eventhouse](manage-monitor-eventhouse.md#view-system-overview).

The databases page of an eventhouse shows you database information either in list or tile view. The following information about each database is displayed in tile view:

* Database name
* Database details
* Database Activity Tracker
* Database tables
* Data preview
* Query insights - top 100 queries

For more information, see [Database details](manage-monitor-database.md#database-details).

## Always-On
Your eventhouse is designed to optimize cost by suspending the service when not in use. When reactivating the service, you might encounter a latency of a few seconds. If you have highly time-sensitive systems that can't tolerate this latency, use **Always-On**. This setting enables the service to be always available, scaling according to our autoscale mechanism. With Always-On enabled, you see 100% EventHouse UpTime and you don't pay for cache storage as it's included in the capacity charges.

### Minimum consumption
As part of the Always-On feature, you can additionally configure your minimum consumption. This step is useful in scenarios where you have unpredictable query or ingestion loads and need to ensure adequate performance during sudden high loads. This setting allows you to prevent our autoscale mechanism from scaling below a certain size, while still allowing it to scale to a larger size if the workload requires it. A limited amount of premium storage is included in the service, and if your cache utilization approaches this limit, autoscale adjusts to the next larger size.

[!INCLUDE [capacity-eventhouse](includes/capacity-eventhouse.md)]

For instructions on how to enable always-on, see [Enable always-on](manage-monitor-eventhouse.md#enable-always-on).

## Related content

> [!div class="nextstepaction"]
> [Create an eventhouse](create-eventhouse.md)
