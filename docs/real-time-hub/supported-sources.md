---
title: Get events from Microsoft sources in to Real-Time hub
description: This article describes how to get events from Microsoft sources such as Azure Event Hubs and Azure IoT Hub into Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Get events from Microsoft sources into Fabric Real-Time hub
This article provides a list of sources that Real-Time hub supports. The Real-Time hub enables you to get events from these sources and create data streams in Fabric. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Microsoft sources

- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-cdc.md)
- [Azure Database for PostgreSQL CDC](add-source-postgresql-database-cdc.md)
- [Azure Database for MySQL CDC](add-source-mysql-database-cdc.md)
- [Azure Cosmos DB CDC](add-source-mysql-database-cdc.md)

## External sources

- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md)
- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Confluent Cloud Kafka](add-source-confluent-kafka.md)

## Discrete events
**Discrete events**, often referred to as notification events, are individual occurrences that happen at specific points in time. Each event is independent of others and has a clear start and end point. Examples of discrete events include users placing orders on a website or making changes to a database.

Real-Time hub supports the following types of discrete events:

|Discrete events|Description|
|----|---------|
|[Azure Blob Storage events](get-azure-blob-storage-events.md)|Generated upon any change made to Azure Blob Storage, such as creation, modification, or deletion of records or files.|
|[Fabric Workspace Item events](create-streams-fabric-workspace-item-events.md)|Generated upon any change made to a Fabric workspace, including creation, update, or deletion of items.|

## Related content
Real-Time hub also allows you to set alerts based on events and specify actions to take when the events happen. 

- [Set alerts on data streams](set-alerts-data-streams.md)
- [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md)
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)