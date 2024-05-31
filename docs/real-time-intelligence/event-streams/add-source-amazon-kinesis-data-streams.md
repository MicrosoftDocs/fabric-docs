---
title: Add Amazon Kinesis Data Streams source to an eventstream
description: Learn how to add Amazon Kinesis Data Streams source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Source and Destination
---

# Add Amazon Kinesis Data Streams source to an eventstream (preview)

This article shows you how to add Amazon Kinesis Data Streams source to an eventstream.

[Amazon Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/) is a massively scalable, highly durable data ingestion and processing service optimized for streaming data. By integrating Amazon Kinesis Data Streams as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric.

[!INCLUDE [enhanced-capabilities-preview-note](./includes/enhanced-capabilities-preview-note.md)]

[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites

- Access to the Fabric **premium workspace** with **Contributor** or higher permissions.
- An Amazon Web Services (AWS) account with the Kinesis Data Streams service enabled.
- Your Amazon Kinesis data stream must be publicly accessible and not be behind a firewall or secured in a virtual network.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Add Amazon Kinesis Data Streams as a source

1. Select **Eventstream** to create a new eventstream. Make sure the **Enhanced Capabilities (preview)** option is enabled.

   ![A screenshot of creating a new eventstream.](media/external-sources/new-eventstream.png)

1. On the next screen, select **Add external source**.

   ![A screenshot of selecting Add external source.](media/external-sources/add-external-source.png)

## Configure and connect to Amazon Kinesis Data Streams

[!INCLUDE [amazon-kinesis-data-streams-connector](includes/amazon-kinesis-data-streams-connector.md)]

You can see the Amazon Kinesis Data Stream source added to your eventstream in **Edit mode**.

:::image type="content" source="./media/add-source-amazon-kinesis-data-streams/edit-view.png" alt-text="Screenshot that shows Amazon Kinesis Data Streams source in Edit view." lightbox="./media/add-source-amazon-kinesis-data-streams/edit-view.png":::

To implement this newly added Amazon Kinesis Data Stream source, select **Publish**. After you complete these steps, your Amazon Kinesis Data Stream source is available for visualization in the **Live view**.

:::image type="content" source="./media/add-source-amazon-kinesis-data-streams/live-view.png" alt-text="Screenshot that shows Amazon Kinesis Data Streams source in Live view." lightbox="./media/add-source-amazon-kinesis-data-streams/live-view.png":::


## Related content

Other connectors:

- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)
