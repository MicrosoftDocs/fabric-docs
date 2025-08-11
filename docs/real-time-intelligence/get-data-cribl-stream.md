---
title: Get data from Cribl Stream
description: Learn how to get data from Cribl Stream in a KQL database in Real-Time Intelligence.
ms.reviewer: akshayd
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
---
# Get data from Cribl Stream

[!INCLUDE [ingest-data-cribl](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-cribl.md)]

For a complete list of data connectors, see [Data connectors overview](data-connectors/data-connectors.md).

## Prerequisites

* A [Cribl Stream account](https://cribl.io)
* A [KQL database](/fabric/real-time-analytics/create-database)
* An Azure subscription. Create a [free Azure account](https://azure.microsoft.com/free/).<a id=ingestion-uri></a>
* Your database ingestion URI to use as the *TargetURI* value. For more information, see [Copy URI](access-database-copy-uri.md#copy-uri).

[!INCLUDE [ingest-data-cribl-2](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-cribl-2.md)]

> [!NOTE]
> The **Azure Data Explorer** connection works for both Azure Data Explorer and Real-Time Intelligence.

[!INCLUDE [ingest-data-cribl-3](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-cribl-3.md)]

## Related content

* [Create a KQL database](create-database.md)
* [Create Azure Data Explorer and Real-Time Intelligence Destinations](https://docs.cribl.io/stream/destinations-azure-data-explorer/)
