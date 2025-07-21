---
title: Add Confluent Cloud for Apache Kafka source to an eventstream
description: Provides information on adding a Confluent Cloud for Apache Kafka source to an eventstream in Microsoft Fabric along with limitations.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 05/06/2025
ms.search.form: Source and Destination
#Customer intent: I want to learn how to bring events from a Confluent Cloud for Apache Kafka source into Microsoft Fabric.
---

# Add Confluent Cloud for Apache Kafka source to an eventstream
This article shows you how to add Confluent Cloud for Apache Kafka source to an eventstream. 

Confluent Cloud for Apache Kafka is a streaming platform offering powerful data streaming and processing functionalities using Apache Kafka. By integrating Confluent Cloud for Apache Kafka as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric. 



[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A Confluent Cloud for Apache Kafka cluster and an API Key. 
- Your Confluent Cloud for Apache Kafka cluster must be publicly accessible and not be behind a firewall or secured in a virtual network.
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 


## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

## Configure and connect to Confluent Cloud for Apache Kafka

[!INCLUDE [confluent-kafka-connector](./includes/confluent-kafka-source-connector.md)]

You see that the Confluent Cloud for Apache Kafka source is added to your eventstream on the canvas in **Edit mode**. To implement this newly added Confluent Cloud for Apache Kafka source, select **Publish** on the ribbon. 

:::image type="content" source="./media/add-source-confluent-kafka/edit-view.png" alt-text="Screenshot that shows Confluent Cloud for Apache Kafka source in Edit view." lightbox="./media/add-source-confluent-kafka/edit-view.png":::

After you complete these steps, the Confluent Cloud for Apache Kafka source is available for visualization in **Live view**.

:::image type="content" source="./media/add-source-confluent-kafka/live-view.png" alt-text="Screenshot that shows Confluent Cloud for Apache Kafka source in Live view." lightbox="./media/add-source-confluent-kafka/live-view.png":::

> [!NOTE]
> To preview events from this Confluent Cloud for Apache Kafka source, ensure that the API key used to create the cloud connection has **read permission** for consumer groups prefixed with **"preview-"**. If the API key was created using a **user account**, no additional steps are required, as this type of key already has full access to your Confluent Cloud for Apache Kafka resources, including read permission for consumer groups prefixed with **"preview-"**. However, if the key was created using a **service account**, you need to manually **grant read permission** to consumer groups prefixed with **"preview-"** in order to preview events.
>
> For Confluent Cloud for Apache Kafka sources, preview is supported for messages in Confluent **AVRO** format when the data is encoded using Confluent Schema Registry. If the data is not encoded using Confluent Schema Registry, only **JSON** formatted messages can be previewed.

:::image type="content" source="./media/add-source-confluent-kafka/data-preview.png" alt-text="Screenshot that shows Confluent Cloud for Apache Kafka source data preview." lightbox="./media/add-source-confluent-kafka/data-preview.png":::

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
