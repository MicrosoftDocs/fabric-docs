---
title: Google Cloud Pub/Sub in Fabric Eventstream
description: Google Cloud Pub/Sub source lets you stream real-time events into a Fabric eventstream. Learn how to configure and connect Pub/Sub to capture, transform, and route events.
#customer intent: As a data engineer, I want to add Google Cloud Pub/Sub as a source to my Fabric eventstream so that I can capture and route real-time events to destinations in Fabric.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 04/01/2026
author: spelluru
ms.author: spelluru
ms.search.form: Source and Destination
---

# Add Google Cloud Pub/Sub source to an eventstream

This article shows you how to add a Google Cloud Pub/Sub source to an eventstream. 

Google Pub/Sub is a messaging service that enables you to publish and subscribe to streams of events. You can add Google Pub/Sub as a source to your eventstream to capture, transform, and route real-time events to various destinations in Fabric.

[!INCLUDE [google-cloud-pub-sub-connector-prerequisites](./includes/connectors/google-cloud-pub-sub-source-connector-prerequisites.md)]
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

## Add Google Cloud Pub/Sub as a source
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Google Cloud Pub/Sub** tile.

:::image type="content" source="media/add-source-google-cloud-pub-sub/select-google-cloud-pub-sub.png" alt-text="Screenshot that shows the selection of Google Cloud Pub/Sub as the source type in the Select a data source wizard." lightbox="media/add-source-google-cloud-pub-sub/select-google-cloud-pub-sub.png":::


## Configure and connect to Google Cloud Pub/Sub

>[!IMPORTANT]
>You can consume the Google Cloud Pub/Sub events in only one eventstream. Once you fetch the events into an eventstream, other eventstreams can't consume them.

[!INCLUDE [google-cloud-pub-sub-connector-configuration](./includes/connectors/google-cloud-pub-sub-source-connector-configuration.md)]

You can see the Google Cloud Pub/Sub source added to your eventstream in **Edit mode**.

   :::image type="content" border="true" source="media/add-source-google-cloud-pub-sub/edit-mode.png" alt-text="A screenshot of the added Google Cloud Pub/Sub source in Edit mode with the Publish button highlighted.":::

Select **Publish** to publish the changes and begin streaming data from Google Cloud Pub/Sub to the eventstream.

   :::image type="content" border="true" source="media/add-source-google-cloud-pub-sub/live-view.png" alt-text="A screenshot of the published eventstream with Google Cloud Pub/Sub source in Live View.":::

## Related content

A few other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
