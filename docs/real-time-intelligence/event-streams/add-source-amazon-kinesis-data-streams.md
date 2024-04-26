---
title: Add Amazon Kinesis Data Streams source to an eventstream
description: Learn how to add Amazon Kinesis Data Streams source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 04/24/2024
ms.search.form: Source and Destination
---

# Add Amazon Kinesis Data Streams source to an eventstream

This article shows you how to add Amazon Kinesis Data Streams source to an eventstream.

[Amazon Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/) is a massively scalable, highly durable data ingestion and processing service optimized for streaming data. By integrating Amazon Kinesis Data Streams as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric.

## Prerequisites

- Access to the Fabric **premium workspace** with **Contributor** or higher permissions.
- An Amazon Web Services (AWS) account with the Kinesis Data Streams service enabled.

## Add Amazon Kinesis Data Streams as a source

1. Select **Eventstream** to create a new eventstream. Make sure the **Enhanced Capabilities (preview)** option is enabled.

   ![A screenshot of creating a new eventstream.](media/external-sources/new-eventstream.png)

1. On the next screen, select **Add external source**.

   ![A screenshot of selecting Add external source.](media/external-sources/add-external-source.png)

## Configure and connect to Amazon Kinesis Data Streams

[!INCLUDE [amazon-kinesis-data-streams-connector](includes/amazon-kinesis-data-streams-connector.md)]

You can see the Amazon Kinesis Data Stream source added to your eventstream in **Edit mode**.

To implement this newly added Amazon Kinesis Data Stream source, select **Publish**. After you complete these steps, your Amazon Kinesis Data Stream source is available for visualization in the **Live view**.

## Related content

Other connectors:

- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs-enhanced.md)
- [Azure IoT Hub](add-source-azure-iot-hub-enhanced.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app-enhanced.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data-enhanced.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)