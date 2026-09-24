---
title: Add MongoDB CDC source to an eventstream
description: Learn how to add MongoDB CDC source to an eventstream.
ms.reviewer: xujiang1
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 09/22/2025
ms.search.form: Source and Destination
---

# Add MongoDB CDC source to an eventstream (preview)

This article shows you how to add a MongoDB Change Data Capture(CDC) source to an eventstream.

[!INCLUDE [mongodb-change-data-capture-connector-prerequisites](./includes/connectors/mongodb-change-data-capture-connector-prerequisites.md)]


## Add MongoDB (CDC) as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **MongoDB (CDC)** tile.

:::image type="content" source  ="./media/add-source-mongodb-change-data-capture/select-mongodb.png" alt-text="Screenshot that shows the selection of MongoDB (CDC) as the source type in the Get events wizard." lightbox="./media/add-source-mongodb-change-data-capture/select-mongodb.png":::

## Configure and connect to MongoDB (CDC) 

[!INCLUDE [mongodb-change-data-capture-connector-configuration](./includes/connectors/mongodb-change-data-capture-connector-configuration.md)]

## View updated eventstream
You see the MongoDB (CDC) source added to your eventstream in **Edit mode**.

:::image type="content" source="media/add-source-mongodb-change-data-capture/edit-mode.png" alt-text="A screenshot of the added MongoDB CDC source in Edit mode with the Publish button highlighted." lightbox="media/add-source-mongodb-change-data-capture/edit-mode.png":::

You see the eventstream in Live mode. Select **Edit** on the ribbon to get back to the Edit mode to update the eventstream.

:::image type="content" source="media/add-source-mongodb-change-data-capture/live-view.png" alt-text="A screenshot of the added MongoDB CDC source in Live mode." lightbox="media/add-source-mongodb-change-data-capture/live-view.png":::

## Limitation
* The MongoDB CDC source currently does not support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository may result in errors.    


## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)


