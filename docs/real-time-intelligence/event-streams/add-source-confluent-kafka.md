---
title: Add Confluent Kafka source to an eventstream
description: Learn how to add Confluent Kafka source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 04/03/2024
ms.search.form: Source and Destination
---

# Add Confluent Kafka source to an eventstream
This article shows you how to add Confluent Kafka source to an eventstream. 

Confluent Cloud Kafka is a streaming platform offering powerful data streaming and processing functionalities using Apache Kafka. By integrating Confluent Cloud Kafka as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric. 

## Prerequisites 

- Get access to the Fabric premium workspace with Contributor or above permissions. 
- A Confluent Cloud Kafka cluster and an API Key. 

## Add Confluent Cloud Kafka as a source 

1. Create an eventstream with selecting the preview toggle.
1. Select **Add source** and select **Get event** option, or select the **Get events** card on the eventstream homepage.

## Configure and connect to Confluent Kafka

[!INCLUDE [confluent-kafka-connector](./includes/confluent-kafka-source-connector.md)]

You should see a Confluent Cloud Kafka source added to your eventstream in the editor.

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-surce-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs-enhanced.md)
- [Azure IoT Hub](add-source-azure-iot-hub-enhanced.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Custom endpoint](add-source-custom-app-enhanced.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-msql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data-enhanced.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)