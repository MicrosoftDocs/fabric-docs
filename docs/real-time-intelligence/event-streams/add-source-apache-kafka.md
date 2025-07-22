---
title: Add Apache Kafka source to a Fabric eventstream
description: Learn how to add an Apache Kafka topic as a source to an eventstream. This feature is currently in preview.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 11/18/2024
ms.search.form: Source and Destination
ms.custom: references_regions
# Customer intent: I want to learn how to add an Apache Kafka topic as an event source to a Fabric eventstream. 
---

# Add Apache Kafka source to a Fabric eventstream (preview)
This article shows you how to add Apache Kafka source to a Fabric eventstream. 

Apache Kafka is an open-source, distributed platform for building scalable, real-time data systems. By integrating Apache Kafka as a source within your eventstream, you can seamlessly bring real-time events from your Apache Kafka and process them before routing to multiple destinations within Fabric.

[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites 

- Access to the Fabric workspace with Contributor or above permissions.
- An Apache Kafka cluster running. 
- Your Apache Kafka must be publicly accessible and not be behind a firewall or secured in a virtual network.  


## Add Apache Kafka as a source 

1. In Fabric Real-Time Intelligence, select **Eventstream** to create a new eventstream.

   :::image type="content" border="true" source="media/external-sources/new-eventstream.png" alt-text="A screenshot of creating a new eventstream.":::

2. On the next screen, select **Add external source**.

   :::image type="content" border="true" source="media/external-sources/add-external-source.png" alt-text="A screenshot of selecting Add external source.":::

## Configure and connect to Apache Kafka

[!INCLUDE [apache-kafka-connector](./includes/apache-kafka-source-connector.md)]

## View updated eventstream
You can see the Apache Kafka source added to your eventstream in **Edit mode**.  

:::image type="content" source="./media/add-source-apache-kafka/edit-view.png" alt-text="Screenshot that shows Apache Kafka source in Edit view." lightbox="./media/add-source-apache-kafka/edit-view.png":::

After you complete these steps, the Apache Kafka source is available for visualization in **Live view**.

:::image type="content" source="./media/add-source-apache-kafka/live-view.png" alt-text="Screenshot that shows Apache Kafka source in Live view." lightbox="./media/add-source-apache-kafka/live-view.png":::

> [!NOTE]
> To preview events from this Apache Kafka source, ensure that the key used to create the cloud connection has **read permission** for consumer groups prefixed with **"preview-"**.
> 
> For Apache Kafka source, only messages in **JSON** format can be previewed.

:::image type="content" source="./media/add-source-apache-kafka/data-preview.png" alt-text="Screenshot that shows Apache Kafka source data preview." lightbox="./media/add-source-apache-kafka/data-preview.png":::


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
