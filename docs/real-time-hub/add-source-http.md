---
title: Add HTTP Source in Fabric Real-Time Hub
description: HTTP source for Real-Time hub lets you stream JSON API data in real time. Learn how to configure, connect, and publish an HTTP source in Microsoft Fabric.
#customer intent: As a data engineer, I want to add an HTTP source to my Real-Time hub so that I can stream data from an HTTP endpoint into Microsoft Fabric for real-time processing.
ms.topic: how-to
ms.date: 04/06/2026
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.search.form: Source and Destination
---

# Add HTTP source in Fabric Real-Time hub (preview)

This article shows you how to add an HTTP source as an event source in Fabric Real-Time hub.

[!INCLUDE [http-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/http-source-connector-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Select HTTP as a source

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

On the **Data sources** page, search for **HTTP**, and then select **HTTP**. 

:::image type="content" source="./media/add-source-http/select-http.png" alt-text="Screenshot that shows the selection of HTTP as the source type in the Data sources page." lightbox="./media/add-source-http/select-http.png":::

## Configure and connect to HTTP

[!INCLUDE [http-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/http-source-connector-configuration.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you. To close the wizard, select **Finish** at the bottom of the page.

1. You see the stream in the **Recent streaming data** section of the **Streaming data** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

[!INCLUDE [http-source-connector-limitations](../real-time-intelligence/event-streams/includes/connectors/http-source-connector-limitations.md)]

 

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
