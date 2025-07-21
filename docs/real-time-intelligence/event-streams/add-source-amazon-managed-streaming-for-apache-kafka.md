---
title: Add Amazon MSK Kafka source to an eventstream
description: Provides information on adding an Amazon Managed Streaming for Apache Kafka (MSK) source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 11/18/2024
ms.search.form: Source and Destination
ms.custom: references_regions
#Customer intent: I want to learn how to bring events from an Amazon Managed Streaming for Apache Kafka source into Microsoft Fabric.
---

# Add Amazon MSK Kafka source to an eventstream
This article shows you how to add an Amazon MSK Kafka source to an eventstream.  

Amazon MSK Kafka is a fully managed Kafka service that simplifies the setup, scaling, and management. By integrating Amazon MSK Kafka as a source within your eventstream, you can seamlessly bring the real-time events from your MSK Kafka and process it before routing them to multiple destinations within Fabric.  



[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- An Amazon MSK Kafka cluster in active status. 
- Your Amazon MSK Kafka cluster must be publicly accessible and not be behind a firewall or secured in a virtual network.  

## Add Amazon MSK Kafka as a source  

1. In Fabric Real-Time Intelligence, select **Eventstream** to create a new eventstream.
1. On the next screen, select **Add external source**.

## Configure and connect to Amazon MSK Kafka 

[!INCLUDE [amazon-managed-streaming-for-kafka-connector](./includes/amazon-managed-streaming-for-kafka-source-connector.md)]

## View updated eventstream
You can see the Amazon MSK Kafka source added to your eventstream in **Edit mode**.  

:::image type="content" source="./media/add-source-amazon-msk-kafka/edit-view.png" alt-text="Screenshot that shows Amazon MSK Kafka source in Edit view." lightbox="./media/add-source-apache-kafka/edit-view.png":::

After you complete these steps, the Amazon MSK Kafka source is available for visualization in **Live view**.

:::image type="content" source="./media/add-source-amazon-msk-kafka/live-view.png" alt-text="Screenshot that shows Amazon MSK Kafka source in Live view." lightbox="./media/add-source-apache-kafka/live-view.png":::

> [!NOTE] 
> To preview events from this Amazon MSK Kafka source, ensure that the key used to create the cloud connection has **read permission** for consumer groups prefixed with **"preview-"**.
>
> For Amazon MSK Kafka source, only messages in **JSON** format can be previewed.

:::image type="content" source="./media/add-source-amazon-msk-kafka/data-preview.png" alt-text="Screenshot that shows Amazon MSK Kafka source data preview." lightbox="./media/add-source-apache-kafka/data-preview.png":::

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
