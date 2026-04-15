---
title: Google Cloud Pub/Sub in Real-Time Hub
description: Connect Google Cloud Pub/Sub to Fabric Real-Time hub and start streaming events in minutes. Follow this step-by-step guide to configure your event source today.
#customer intent: As a data engineer, I want to connect Google Cloud Pub/Sub to Fabric Real-Time hub so that I can ingest streaming events from Google Cloud into my Fabric environment.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 04/01/2026
author: spelluru
ms.author: spelluru
---

# Get events from Google Cloud Pub/Sub into Real-Time hub

This article describes how to add Google Cloud Pub/Sub as an event source in Fabric Real-Time hub. Google Pub/Sub is a messaging service that enables you to publish and subscribe to streams of events.



[!INCLUDE [google-cloud-pub-sub-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/google-cloud-pub-sub-source-connector-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]


On the **Data sources** page, select **Google Cloud Pub/Sub**.

:::image type="content" source="./media/add-source-google-cloud-pub-sub/select-google-cloud-pub-sub.png" alt-text="Screenshot that shows the Select a data source page with Google Cloud Pub/Sub selected.":::

## Configure Google Cloud Pub/Sub source

[!INCLUDE [google-cloud-pub-sub-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/google-cloud-pub-sub-source-connector-configuration.md)]


## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Google Cloud Pub/Sub as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

