---
title: Eventhouse overview (Preview)
description: Learn about Eventhouse data storage in Real-Time Analytics.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: Conceptual
ms.date: 01/15/2024
ms.search.form: Eventhouse
---
# Eventhouse overview (Preview)

Eventhouses are the storage solution for streaming data in Fabric, and for semistructured and free text analysis. An Eventhouse is a workspace of databases, which might be shared across a certain project. An Eventhouse allows you to manage multiple databases at once, sharing capacity and resources to optimize performance and cost. It provides unified monitoring and management across all databases and per database.

Eventhouses are specifically tailored to time-based, streaming events with structured, semistructured, and unstructured data. You can get data from multiple sources, in multiple pipelines (For example, Eventstream, SDKs, Kafka, Logstash, data flows, and more) and multiple data formats. This data is automatically indexed and partitioned based on ingestion time.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## When do I create an Eventhouse?

Use an Eventhouse for any scenario that includes event-based data, for example system and human logs, IoT events, or financial transactions.

While Eventhouse is in preview, you can create a standalone [KQL database](create-database.md), or a KQL database within an Eventhouse. The KQL database can either be a standard database, or a [database shortcut](database-shortcut.md). [Data availability in OneLake](one-logical-copy.md) is enabled on a database or table level.

## What information do I see in an Eventhouse?

The details page of an Eventhouse shows you database information either in list or tile mode.

The following information about each database is displayed in tile mode:

* Database name
* A graph of queries run over the past week
* Data size
* Caching policy
* Retention policy
* Last ingestion date

## Guaranteed availability

Your Eventhouse is designed to optimize cost by suspending the service when not in use. To reactivate the service, you might encounter a latency of a few seconds. If you have highly time-sensitive systems that can’t tolerate this latency, use **Guaranteed availability**.  When activated, the service is always available at the selected minimum level, and you pay at least the minimum compute selected (or actual use) while no longer paying for premium storage. The specified compute is available to all the databases within the Eventhouse.

For instructions on how to enable guaranteed availability, see [Enable guaranteed availability](create-eventhouse.md#enable-guaranteed-availability).

## Next step

> [!div class="nextstepaction"]
> [Create an Eventhouse](create-eventhouse.md)
