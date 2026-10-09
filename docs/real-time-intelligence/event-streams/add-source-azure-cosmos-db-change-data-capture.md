---
title: Add Azure Cosmos DB CDC source to an eventstream
description: Learn how to add an Azure Cosmos DB Change Data Capture (CDC) source to an eventstream.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 11/18/2024
ms.search.form: Source and Destination
---

# Add Azure Cosmos DB CDC source to an eventstream

This article shows you how to add an Azure Cosmos DB (**Azure Cosmos DB for NoSQL**) Change Data Capture source to an eventstream. 

[!INCLUDE [azure-cosmos-db-cdc-source-connector-prerequisites](./includes/connectors/azure-cosmos-db-cdc-source-connector-prerequisites.md)]

## Add Azure Cosmos DB (CDC) as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure Cosmos DB (CDC)** tile.

:::image type="content" source="./media/add-source-azure-cosmos-db-change-data-capture/select-azure-cosmos-db.png" alt-text="Screenshot that shows the selection of Azure Cosmos DB (CDC) as the source type in the Select a data source wizard." lightbox="./media/add-source-azure-cosmos-db-change-data-capture/select-azure-cosmos-db.png":::

## Configure and connect to Azure Cosmos DB (CDC)

[!INCLUDE [azure-cosmos-db-cdc-source-connector-configuration](./includes/connectors/azure-cosmos-db-cdc-source-connector-configuration.md)]

## View updated eventstream
1. You see the Azure Cosmos DB (CDC) source added to your eventstream in **Edit mode**. Select **Publish** to publish the changes and begin streaming Azure Cosmos DB CDC data to the eventstream.

    :::image type="content" source="media/add-source-azure-cosmos-db-change-data-capture/edit-mode.png" alt-text="A screenshot of the added Azure Cosmos DB CDC source in Edit mode with the Publish button highlighted.":::
1. You see the eventstream in Live mode. Select **Edit** on the ribbon to get back to the Edit mode to update the eventstream. 

    :::image type="content" source="media/add-source-azure-cosmos-db-change-data-capture/live-view.png" alt-text="A screenshot of the published eventstream with Azure Cosmos DB source in Live View.":::

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
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


