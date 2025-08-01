---
title: Add Amazon Kinesis Data Streams source to an eventstream
description: Learn how to add Amazon Kinesis Data Streams source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 11/18/2024
ms.search.form: Source and Destination
---

# Add Amazon Kinesis Data Streams source to an eventstream

This article shows you how to add Amazon Kinesis Data Streams source to an eventstream.

[Amazon Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/) is a massively scalable, highly durable data ingestion and processing service optimized for streaming data. By integrating Amazon Kinesis Data Streams as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric.

[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- An Amazon Web Services (AWS) account with the Kinesis Data Streams service enabled.
- Your Amazon Kinesis data stream must be publicly accessible and not be behind a firewall or secured in a virtual network.


## Add Amazon Kinesis Data Streams as a source

1. Select **Eventstream** to create a new eventstream.

   :::image type="content" border="true" source="media/external-sources/new-eventstream.png" alt-text="A screenshot of creating a new eventstream.":::

2. On the next screen, select **Add external source**.

   :::image type="content" border="true" source="media/external-sources/add-external-source.png" alt-text="A screenshot of selecting Add external source.":::

## Configure and connect to Amazon Kinesis Data Streams

[!INCLUDE [amazon-kinesis-data-streams-connector](includes/amazon-kinesis-data-streams-connector.md)]

You can see the Amazon Kinesis Data Stream source added to your eventstream in **Edit mode**.

:::image type="content" source="./media/add-source-amazon-kinesis-data-streams/edit-view.png" alt-text="Screenshot that shows Amazon Kinesis Data Streams source in Edit view." lightbox="./media/add-source-amazon-kinesis-data-streams/edit-view.png":::

To implement this newly added Amazon Kinesis Data Stream source, select **Publish**. After you complete these steps, your Amazon Kinesis Data Stream source is available for visualization in the **Live view**.

:::image type="content" source="./media/add-source-amazon-kinesis-data-streams/live-view.png" alt-text="Screenshot that shows Amazon Kinesis Data Streams source in Live view." lightbox="./media/add-source-amazon-kinesis-data-streams/live-view.png":::

> [!NOTE]
> To preview events from this Amazon Kinesis Data Stream source, ensure that the Access key used to create the cloud connection has **read permission** for consumer groups prefixed with **"preview-"**.
>
> For Amazon Kinesis Data Stream source, only messages in **JSON** format can be previewed.

:::image type="content" source="./media/add-source-amazon-kinesis-data-streams/data-preview.png" alt-text="Screenshot that shows Amazon Kinesis Data Streams source data preview." lightbox="./media/add-source-amazon-kinesis-data-streams/data-preview.png":::

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
