---
title: Get data from Cribl Stream
description: Learn how to get data from Cribl Stream in a KQL database in Real-Time Intelligence.
ms.reviewer: akshayd
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 07/16/2024
---
# Get data from Cribl Stream

[!INCLUDE [ingest-data-cribl](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-cribl.md)]

For a complete list of data connectors, see [Data connectors overview](data-connectors/data-connectors.md).

## Prerequisites

* A [Cribl stream account](https://cribl.io)
* A [KQL database](/fabric/real-time-analytics/create-database)
* Access to the [Azure portal](https://portal.azure.com/)

[!INCLUDE [ingest-data-cribl-2](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-cribl-2.md)]

> [!NOTE]
> The **Azure Data Explorer** connection works for both Azure Data Explorer and Real-Time Intelligence.

[!INCLUDE [ingest-data-cribl-3](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-cribl-3.md)]

## Target URI

You'll need the database query URI for the **Cluster URI** value and the ingestion URI to use as the **Ingestion Service URI** value. For more information, see [Copy URI](access-database-copy-uri.md#copy-uri).

## Related content
* [Create a KQL database](create-database.md)
* [Create Azure Data Explorer and Real-Time Intelligence Destinations](https://docs.cribl.io/stream/destinations-azure-data-explorer/)
