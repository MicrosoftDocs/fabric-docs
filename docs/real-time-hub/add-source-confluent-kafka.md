---
title: Add Confluent Cloud Kafka as source in Real-Time hub
description: This article describes how to add Confluent Cloud Kafka as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Add Confluent Cloud Kafka as source in Real-Time hub
This article describes how to add Confluent Kafka as an event source in Fabric Real-Time hub. 

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- A Confluent Cloud Kafka cluster and an API Key. 

## Launch the Get events experience

1. In Fabric Real-Time hub, select **Get events** button in the top-right corner. 
1. On the **Select a data source** page of the **Get events** wizard, select **Confluent**. 

    :::image type="content" source="./media/add-source-confluent-kafka/select-confluent.png" alt-text="Screenshot that shows the selection of Confluent as the source type in the Get events wizard.":::

## Add Confluent Cloud Kafka as a source

[!INCLUDE [confluent-kafka-source-connector](../real-time-intelligence/event-streams/includes/confluent-kafka-source-connector.md)]

## Related content

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB Change Data Capture (CDC)](add-source-azure-cosmos-db-cdc.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database CDC](add-source-azure-sql-database-cdc.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md)
- [MySQL Database CDC](add-source-mysql-database-cdc.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-cdc.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](get-azure-blob-storage-events.md)
- [Fabric workspace event](get-fabric-workspace-item-events.md)

