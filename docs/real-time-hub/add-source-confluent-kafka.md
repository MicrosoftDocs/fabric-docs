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

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- A Confluent Cloud Kafka cluster and an API Key. 

## Launch the Get events experience
In Fabric Real-Time hub, select **Get events** button in the top-right corner. 

## Add Confluent Cloud Kafka as a source

[!INCLUDE [confluent-kafka-source-connector](../real-time-intelligence/event-streams/includes/confluent-kafka-source-connector.md)]

## Related content

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB Change Data Capture (CDC)](add-source-azure-cosmos-db-cdc.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database CDC](add-source-azure-sql-database-cdc.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md)
- [MySQL Database CDC](add-source-mysql-database-cdc.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-cdc.md)
- [Azure Blob Storage events](get-azure-blob-storage-events.md)
- [Fabric workspace event](create-streams-fabric-workspace-item-events.md)

