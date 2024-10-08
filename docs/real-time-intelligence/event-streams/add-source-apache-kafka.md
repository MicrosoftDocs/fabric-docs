---
title: Add Apache Kafka source to an eventstream
description: Learn how to add Apache Kafka source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 09/27/2024
ms.search.form: Source and Destination
ms.custom: references_regions
---

# Add Apache Kafka source to an eventstream (preview)
This article shows you how to add Apache Kafka source to an eventstream. 

Apache Kafka is an open-source, distributed platform for building scalable, real-time data systems. By integrating Apache Kafka as a source within your eventstream, you can seamlessly bring real-time events from your Apache Kafka and process them before routing to multiple destinations within Fabric.

[!INCLUDE [enhanced-capabilities-preview-note](./includes/enhanced-capabilities-preview-note.md)]

[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites 

- Access to the Fabric **premium workspace** with **Contributor** or above permissions.
- An Apache Kafka cluster running. 
- Your Apache Kafka must be publicly accessible and not be behind a firewall or secured in a virtual network.  

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Add Apache Kafka as a source 

1. In Fabric Real-Time Intelligence, select **Eventstream** to create a new eventstream. Make sure the **Enhanced Capabilities (preview)** option is enabled.

   ![A screenshot of creating a new eventstream.](media/external-sources/new-eventstream.png)

2. On the next screen, select **Add external source**.

   ![A screenshot of selecting Add external source.](media/external-sources/add-external-source.png)

## Configure and connect to Apache Kafka

[!INCLUDE [apache-kafka-connector](./includes/apache-kafka-source-connector.md)]

You can see the Apache Kafka source added to your eventstream in **Edit mode**.  

:::image type="content" source="./media/add-source-apache-kafka/edit-view.png" alt-text="Screenshot that shows Apache Kafka source in Edit view." lightbox="./media/add-source-apache-kafka/edit-view.png":::

After you complete these steps, the Apache Kafka source is available for visualization in **Live view**.

:::image type="content" source="./media/add-source-apache-kafka/live-view.png" alt-text="Screenshot that shows Apache Kafka source in Live view." lightbox="./media/add-source-apache-kafka/live-view.png":::


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
