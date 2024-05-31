---
title: Add Confluent Kafka source to an eventstream
description: Learn how to add Confluent Kafka source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Source and Destination
---

# Add Confluent Kafka source to an eventstream (preview)
This article shows you how to add Confluent Kafka source to an eventstream. 

Confluent Cloud Kafka is a streaming platform offering powerful data streaming and processing functionalities using Apache Kafka. By integrating Confluent Cloud Kafka as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric. 

[!INCLUDE [enhanced-capabilities-preview-note](./includes/enhanced-capabilities-preview-note.md)]

[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites 

- Access to the Fabric premium workspace with Contributor or above permissions. 
- A Confluent Cloud Kafka cluster and an API Key. 
- Your Confluent Cloud Kafka cluster must be publicly accessible and not be behind a firewall or secured in a virtual network.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Add Confluent Cloud Kafka as a source 

1. Create an eventstream with selecting the preview toggle.
1. Select **Add external source**.

## Configure and connect to Confluent Kafka

[!INCLUDE [confluent-kafka-connector](./includes/confluent-kafka-source-connector.md)]

You see that the Confluent Cloud Kafka source is added to your eventstream on the canvas in **Edit mode**. To implement this newly added Confluent Cloud Kafka source, select **Publish** on the ribbon. 

:::image type="content" source="./media/add-source-confluent-kafka/edit-view.png" alt-text="Screenshot that shows Confluent Kafka source in Edit view." lightbox="./media/add-source-confluent-kafka/edit-view.png":::

After you complete these steps, the Confluent Cloud Kafka source is available for visualization in **Live view**.

:::image type="content" source="./media/add-source-confluent-kafka/live-view.png" alt-text="Screenshot that shows Confluent Kafka source in Live view." lightbox="./media/add-source-confluent-kafka/live-view.png":::


## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)
