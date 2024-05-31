---
title: Sources supported by Fabric event streams (enhanced)
description: This include file has the list of sources supported by Fabric event streams with enhanced capabilities.
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

| Sources          | Description |
| --------------- | ---------- |
| [Azure Event Hubs](../add-source-azure-event-hubs.md) | If you have an Azure event hub, you can ingest event hub data into Microsoft Fabric using Eventstream.  |
| [Azure IoT Hub](../add-source-azure-iot-hub.md) | If you have an Azure IoT hub, you can ingest IoT data into Microsoft Fabric using Eventstream.  |
| [Azure SQL Database Change Data Capture (CDC)](../add-source-azure-sql-database-change-data-capture.md) | The Azure SQL Database CDC source connector allows you to capture a snapshot of the current data in an Azure SQL database. The connector then monitors and records any future row-level changes to this data. |
| [PostgreSQL Database CDC](../add-source-postgresql-database-change-data-capture.md) | The PostgreSQL Database Change Data Capture (CDC) source connector allows you to capture a snapshot of the current data in a PostgreSQL database. The connector then monitors and records any future row-level changes to this data. |
| [MySQL Database CDC](../add-source-mysql-database-change-data-capture.md) | The Azure MySQL Database Change Data Capture (CDC) Source connector allows you to capture a snapshot of the current data in an Azure Database for MySQL database. You can specify the tables to monitor, and the eventstream records any future row-level changes to the tables. |
| [Azure Cosmos DB CDC](../add-source-azure-cosmos-db-change-data-capture.md) | The Azure Cosmos DB Change Data Capture (CDC) source connector for Microsoft Fabric event streams lets you capture a snapshot of the current data in an Azure Cosmos DB database. The connector then monitors and records any future row-level changes to this data. |
| [Google Cloud Pub/Sub](../add-source-google-cloud-pub-sub.md) | Google Pub/Sub is a messaging service that enables you to publish and subscribe to streams of events. You can add Google Pub/Sub as a source to your eventstream to capture, transform, and route real-time events to various destinations in Fabric. | 
| [Amazon Kinesis Data Streams](../add-source-amazon-kinesis-data-streams.md) | Amazon Kinesis Data Streams is a massively scalable, highly durable data ingestion, and processing service optimized for streaming data. By integrating Amazon Kinesis Data Streams as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric. |
| [Confluent Cloud Kafka](../add-source-confluent-kafka.md) | Confluent Cloud Kafka is a streaming platform offering powerful data streaming and processing functionalities using Apache Kafka. By integrating Confluent Cloud Kafka as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric. |
| [Azure Blob Storage events](../add-source-azure-blob-storage.md) | Azure Blob Storage events are triggered when a client creates, replaces, or deletes a blob. The connector allows you to link Blob Storage events to Fabric events in Real-Time hub. You can convert these events into continuous data streams and transform them before routing them to various destinations in Fabric.|
| [Fabric Workspace Item events](../add-source-fabric-workspace.md) | Fabric Workspace Item events are discrete Fabric events that occur when changes are made to your Fabric Workspace. These changes include creating, updating, or deleting a Fabric item. With Fabric event streams, you can capture these Fabric workspace events, transform them, and route them to various destinations in Fabric for further analysis. |
| [Sample data](../add-source-sample-data.md) | You can choose **Bicycles**, **Yellow Taxi**, or **Stock Market events** as a sample data source to test the data ingestion while setting up an eventstream. |
| [Custom endpoint (former custom app)](../add-source-custom-app.md) | The custom endpoint feature allows your applications or Kafka clients to connect to Eventstream using a connection string, enabling the smooth ingestion of streaming data into Eventstream. |
