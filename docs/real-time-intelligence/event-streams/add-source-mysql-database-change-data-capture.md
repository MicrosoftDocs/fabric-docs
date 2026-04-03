---
title: MySQL Database CDC Source in Fabric Eventstream
description: Stream MySQL change data into your eventstream with CDC. Learn how to configure, connect, and publish a MySQL DB CDC source in just a few steps. Try it today.
#customer intent: As a data engineer, I want to add a MySQL CDC source to my eventstream so that I can capture real-time database changes in Microsoft Fabric.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 04/03/2026
author: spelluru
ms.author: spelluru
ms.search.form: Source and Destination
---

# Add MySQL Database CDC source to an eventstream

This article shows you how to add a MySQL Change Data Capture source to an eventstream. 

[!INCLUDE [mysql-database-cdc-connector-prerequisites](./includes/connectors/mysql-database-cdc-source-connector-prerequisites.md)]

## Add MySQL Database (DB) Change Data Capture (CDC) as a source
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **MySQL DB (CDC)** tile.

:::image type="content" source="./media/add-source-mysql-database-change-data-capture/select-mysql-database.png" alt-text="Screenshot that shows the selection of MySQL DB (CDC) as the source type in the Get events wizard." lightbox="./media/add-source-mysql-database-change-data-capture/select-mysql-database.png":::

## Configure and connect to MySQL DB (CDC) 

[!INCLUDE [mysql-database-cdc-connector-configuration](./includes/connectors/mysql-database-cdc-source-connector-configuration.md)]

## View updated eventstream
1. You see the MySQL DB (CDC) source added to your eventstream in **Edit mode**.

    :::image type="content" source="media/add-source-mysql-database-change-data-capture/edit-mode.png" alt-text="A screenshot of the added Azure MySQL DB CDC source in Edit mode with the Publish button highlighted." lightbox="media/add-source-mysql-database-change-data-capture/edit-mode.png":::
1. Select **Publish** to publish the changes and begin streaming MySQL DB CDC data to the eventstream.

    :::image type="content" source="media/add-source-mysql-database-change-data-capture/live-view.png" alt-text="A screenshot of the added Azure MySQL DB CDC source in Live mode." lightbox="media/add-source-mysql-database-change-data-capture/live-view.png":::

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


