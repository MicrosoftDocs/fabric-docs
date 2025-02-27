---
title: Add Google Cloud Pub/Sub source to an eventstream
description: Learn how to add Google Cloud Pub/Sub source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 11/22/2024
ms.search.form: Source and Destination
---

# Add Google Cloud Pub/Sub source to an eventstream

This article shows you how to add a Google Cloud Pub/Sub source to an eventstream. 

Google Pub/Sub is a messaging service that enables you to publish and subscribe to streams of events. You can add Google Pub/Sub as a source to your eventstream to capture, transform, and route real-time events to various destinations in Fabric.

[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A Google Cloud account with the Pub/Sub service enabled and a role with the required permissions.
- Your Google Cloud Pub/Sub source must be publicly accessible and not be behind a firewall or secured in a virtual network.
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

## Add Google Cloud Pub/Sub as a source
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure Event Hubs** tile.

:::image type="content" source="media/add-source-google-cloud-pub-sub/select-google-cloud-pub-sub.png" alt-text="Screenshot that shows the selection of Google Cloud Pub/Sub as the source type in the Select a data source wizard." lightbox="media/add-source-google-cloud-pub-sub/select-google-cloud-pub-sub.png":::


## Configure and connect to Google Cloud Pub/Sub

>[!IMPORTANT]
>You can consume the Google Cloud Pub/Sub events in only one eventstream. Once you fetch the events into an eventstream, they can't be consumed by other eventstreams.

[!INCLUDE [google-cloud-pub-sub-connector](./includes/google-cloud-pub-sub-source-connector.md)]

You can see the Google Cloud Pub/Sub source added to your eventstream in **Edit mode**.

   :::image type="content" border="true" source="media/add-source-google-cloud-pub-sub/edit-mode.png" alt-text="A screenshot of the added Google Cloud Pub/Sub source in Edit mode with the Publish button highlighted.":::

Select **Publish** to publish the changes and begin streaming data from Google Cloud Pub/Sub to the eventstream.

   :::image type="content" border="true" source="media/add-source-google-cloud-pub-sub/live-view.png" alt-text="A screenshot of the published eventstream with Google Cloud Pub/Sub source in Live View.":::

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)
