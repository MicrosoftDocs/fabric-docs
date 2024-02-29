---
title: Eventhouse overview (preview)
description: Learn about Eventhouse data storage in Real-Time Analytics.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: Conceptual
ms.date: 02/08/2024
ms.search.form: Eventhouse
---
# Eventhouse overview (preview)

Eventhouses provide a solution for handling and analyzing large volumes of data, particularly in scenarios requiring real-time analytics and exploration. They are designed to handle real-time data streams efficiently, which lets organizations ingest, process, and analyze data in near real-time. These aspects make Eventhouses particularly useful for scenarios where timely insights are crucial. Eventhouses provide a scalable infrastructure that allows organizations to handle growing volumes of data, ensuring optimal performance and resource use. Eventhouses are the storage solution for streaming data in Fabric, and for semistructured and free text analysis. An Eventhouse is a workspace of databases, which might be shared across a certain project. An Eventhouse allows you to manage multiple databases at once, sharing capacity and resources to optimize performance and cost. It provides unified monitoring and management across all databases and per database.

Eventhouses are specifically tailored to time-based, streaming events with structured, semistructured, and unstructured data. You can get data from multiple sources, in multiple pipelines (For example, Eventstream, SDKs, Kafka, Logstash, data flows, and more) and multiple data formats. This data is automatically indexed and partitioned based on ingestion time.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## When do I create an Eventhouse?

Use an Eventhouse for any scenario that includes event-based data, for example, telemetry and log data, time series and IoT data, security and compliance logs, or financial records.

While Eventhouse is in preview, you can create a standalone [KQL database](create-database.md), or a KQL database within an Eventhouse. The KQL database can either be a standard database, or a [database shortcut](database-shortcut.md). [Data availability in OneLake](one-logical-copy.md) is enabled on a database or table level.

## What information do I see in an Eventhouse?

The details page of an Eventhouse shows you database information either in list or tile view.

The following information about each database is displayed in tile view:

* Database name
* A graph of queries run over the past week
* Data size
* Caching policy
* Retention policy
* Last ingestion date

## Minimum consumption

Your Eventhouse is designed to optimize cost by suspending the service when not in use. To reactivate the service, you might encounter a latency of a few seconds. If you have highly time-sensitive systems that can’t tolerate this latency, use **Minimum consumption**.  When activated, the service is always available at the selected minimum level, and you pay at least the minimum compute selected (or actual use) while no longer paying for premium storage. The specified compute is available to all the databases within the Eventhouse.

For instructions on how to enable minimum consumption, see [Enable minimum consumption](create-eventhouse.md#enable-minimum-consumption).

## Next step

> [!div class="nextstepaction"]
> [Create an Eventhouse](create-eventhouse.md)
