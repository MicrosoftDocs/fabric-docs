---
title: Eventhouse overview
description: Learn about eventhouse data storage in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.topic: concept-article
ms.subservice: rti-eventhouse
ms.custom:
ms.date: 06/15/2026
ms.search.form: Eventhouse
ai-usage: ai-assisted
---
# Eventhouse overview

Eventhouses are databases designed for storing and analyzing streaming data, so you can query billions of events in seconds. They're designed to handle real-time data streams efficiently, which lets organizations ingest, process, and analyze data in near real-time. These aspects make eventhouses useful for scenarios where timely insights are crucial. Eventhouses provide a scalable infrastructure that allows organizations to handle growing volumes of data, ensuring optimal performance and resource use. Eventhouses are the preferred engine for semistructured and free text analysis. An Eventhouse is a container that can hold multiple databases, making it easy to manage related data for a project. It allows you to manage multiple databases at once, sharing capacity and resources to optimize performance and cost. Eventhouses provide unified monitoring and management across all databases and per database.

Eventhouses are tailored to time-based, streaming events with structured, semistructured (For example, JSON, XML), and unstructured data (For example, free text analysis). You can get data from multiple sources, in multiple pipelines (For example, Eventstream, Software Development Kits, Kafka, Logstash, data flows, and more) and multiple data formats. This data is automatically organized for fast searching based on when it arrived. 

## Analyze data with integration

Eventhouse uses the same **Analyze data with** menu as other Fabric items, so you can start analysis from a unified entry point across workloads. From an Eventhouse or KQL database, you can use **SQL endpoint** and **Notebook** options directly where available.

> [!NOTE]
> The **Analyze data with** > **SQL endpoint** option appears for Eventhouse and KQL databases only when OneLake availability and schema synchronization are enabled on the database. This setup provides near-real-time access to KQL data through the SQL endpoint.

## When do I create an eventhouse?

Use an eventhouse for any scenario that includes event-based data. For example, telemetry and log data, time series and IoT data, security and compliance logs, or financial records.

You can create a [KQL database](create-database.md) within an eventhouse. The KQL database can either be a standard database, or a [database shortcut](database-shortcut.md). An exploratory [query environment](create-database.md#explore-your-kql-database-with-the-embedded-kql-queryset) is created for each KQL database, which can be used for exploration and data management. [Data availability in OneLake](one-logical-copy.md) can be enabled on a database or table level.

When you enable the Eventhouse endpoint from a Lakehouse or Data Warehouse, Fabric automatically creates an Eventhouse and KQL database as child items of that source item. These managed child items stay in the originating workspace, and backend schema synchronization keeps them aligned for near-real-time analysis.

## What information do I see in an eventhouse?

The system overview page of an eventhouse shows you the following information:

* Eventhouse details
* Advisory findings
* Eventhouse storage
* System resources
* Compute usage
* Activity in minutes by application
* Ingestion rate
* Top queried databases
* Top ingested databases
* Eventhouse schema changes

For more information, see [System overview details](manage-monitor-eventhouse.md#system-overview).

You can also launch a new or existing Spark notebook from **Analyze data with** > **Notebook** on a Lakehouse, Data Warehouse, Eventhouse, or KQL database item. The notebook opens with the corresponding database context attached automatically.

The databases page of an eventhouse shows you database information either in list or tile view. The following information about each database is displayed in tile view:

* Database name
* Database details
* Database Activity Tracker
* Database tables
* Data preview
* Query insights - top 100 queries

For more information, see [Database details](manage-monitor-database.md#database-details).

## Capacity Planner

Your eventhouse is designed to optimize cost by suspending the service when not in use. When reactivating the service, you might encounter a latency of a few seconds. If you have highly time-sensitive systems that can't tolerate this latency, configure [Capacity Planner](eventhouse-smart-capacity-control.md#enable-capacity-planner). When enabled, the eventhouse is always active, so you get 100% uptime without extra premium storage costs.

With Capacity Planner, you can also configure a 7-day recurring schedule in 60-minute blocks, setting a minimum capacity per block or no minimum, with autoscale remaining enabled. Eventhouse maintains the guaranteed baseline only during the scheduled windows and stays fully elastic at other times.

You can [configure a minimum capacity schedule](eventhouse-smart-capacity-control.md#schedule-minimum-capacity) for scenarios where you have unpredictable query or ingestion loads and need to ensure adequate performance during sudden high loads. Scheduled minimums prevent autoscale from scaling below the set baseline during those windows, but autoscale can still scale up as needed. If no minimum is set, the default minimum is 2 CUs.

The UI provides a weekly schedule view and surfaces warnings if scheduled minimums exceed available capacity, with an overview banner summarizing the next 24 hours. For detailed configuration steps, see [Configure Capacity Planner](eventhouse-smart-capacity-control.md#schedule-minimum-capacity).

## Share an eventhouse

When you [share a direct link to an Eventhouse](create-eventhouse.md#share-an-eventhouse), the recipient inherits the sender's permission level to all Eventhouse items including KQL databases and tables, and all related Eventhouse components including dashboards, functions, materialized views, and embedded querysets.

Individual KQL databases can be shared independently, although users with database-only access don't gain access to Eventhouse-level navigation elements like System overview or the list of KQL databases in the Eventhouse. To share an individual database, see [Share a KQL database link](access-database-copy-uri.md#share-a-kql-database-link).

## Related content

* [Create an eventhouse](create-eventhouse.md)
* [Manage and monitor an eventhouse](manage-monitor-eventhouse.md)
