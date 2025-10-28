---
title: Get data from Kafka
description: Learn how to get data from Kafka in a KQL database in Real-Time Intelligence.
ms.reviewer: akshayd
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
---
# Get data from Kafka

[!INCLUDE [ingest-data-kafka](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-kafka.md)]

## Prerequisites

* An Azure subscription. Create a [free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A KQL database in [Microsoft Fabric](create-database.md).
* Your database ingestion URI, and Query URI to use in the [configuration JSON file](#adx-sink-configjson). For more information, see [Copy URI](access-database-copy-uri.md#copy-uri).
* [Azure CLI](/cli/azure/install-azure-cli).
* [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install).

[!INCLUDE [ingest-data-kafka-2](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-kafka-2.md)]

### Review the files in the cloned repo

The following sections explain the important parts of the files in the file tree above.

#### adx-sink-config.json

This file contains the Kusto sink properties file where you'll update specific configuration details:

```json
{
    "name": "storm",
    "config": {
        "connector.class": "com.microsoft.azure.kusto.kafka.connect.sink.KustoSinkConnector",
        "flush.size.bytes": 10000,
        "flush.interval.ms": 10000,
        "tasks.max": 1,
        "topics": "storm-events",
        "kusto.tables.topics.mapping": "[{'topic': 'storm-events','db': '<enter database name>', 'table': 'Storms','format': 'csv', 'mapping':'Storms_CSV_Mapping'}]",
        "aad.auth.authority": "<enter tenant ID>",
        "aad.auth.appid": "<enter application ID>",
        "aad.auth.appkey": "<enter client secret>",
        "kusto.ingestion.url": "<ingestion URI per prerequisites>",
        "kusto.query.url": "<query URI per prerequisites>",
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "value.converter": "org.apache.kafka.connect.storage.StringConverter"
    }
}
```

[!INCLUDE [ingest-data-kafka-3](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-kafka-3.md)]

[!INCLUDE [ingest-data-kafka-4](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-kafka-4.md)]

## Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over your database and select the **More menu [...] > Delete**.

1. Select **Delete**. You can't recover deleted items.

[!INCLUDE [ingest-data-kafka-5](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-kafka-5.md)]

## Related content

* [Create a KQL database](create-database.md)
