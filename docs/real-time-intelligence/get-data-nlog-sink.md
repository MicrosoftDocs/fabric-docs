---
title: Get data with the NLog sink
description: Learn how to get data with the NLog sink in a KQL database in Real-Time Intelligence.
ms.reviewer: akshayd
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
---
# Get data with the NLog sink

[!INCLUDE [ingest-nlog-sink-1](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-nlog-sink-1.md)]

In this article you'll learn how to get data with nLog sink.

For a complete list of data connectors, see [Data connectors overview](/azure/data-explorer/integrate-data-overview).
<!-- Update this link to the RTI Get data overview, once it is created and merged -->

## Prerequisites

* .NET SDK 6.0 or later
* An Azure subscription. Create a [free Azure account](https://azure.microsoft.com/free/).
* A [KQL database in Microsoft Fabric](create-database.md). Copy the URI of this database using the instructions in [Access an existing KQL database](access-database-copy-uri.md).
* A [KQL queryset](kusto-query-set.md). This will be referred to as your query environment.

[!INCLUDE [ingest-nlog-sink-2](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-nlog-sink-2.md)]

### Create a table and ingestion mapping

Create an [empty table](create-empty-table.md) as the target table for the incoming data.

[!INCLUDE [ingest-nlog-sink-3](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-nlog-sink-3.md)]

## Related content

* [Kusto Query Language (KQL) overview](/azure/data-explorer/kusto/query/index)

