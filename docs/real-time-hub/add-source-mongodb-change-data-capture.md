---
title: Add MongoDB CDC Source in Fabric Real-Time Hub
description: Learn how to add MongoDB CDC source in Fabric Real-Time Hub. Learn how to configure, connect, and publish a MongoDB CDC source in Microsoft Fabric.
ms.reviewer: xujiang1
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 09/22/2025
ms.search.form: Source and Destination
---

# Add MongoDB CDC Source in Fabric Real-Time Hub (preview)

This article shows you how to add a MongoDB Change Data Capture(CDC) source in Fabric Real-Time Hub.

[!INCLUDE [mongodb-change-data-capture-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/mongodb-change-data-capture-connector-prerequisites.md)]


## Add MongoDB (CDC) as a source

[!INCLUDE [launch-connect-external-source](../real-time-intelligence/event-streams/includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **MongoDB (CDC)** tile.

:::image type="content" source  ="./media/add-source-mongodb-change-data-capture/select-mongodb.png" alt-text="Screenshot that shows the selection of MongoDB (CDC) as the source type in the Get events wizard." lightbox="./media/add-source-mongodb-change-data-capture/select-mongodb.png":::

## Configure and connect to MongoDB (CDC) 

[!INCLUDE [mongodb-change-data-capture-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/mongodb-change-data-capture-connector-configuration.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you. To close the wizard, select **Finish** at the bottom of the page.

1. You see the stream in the **Recent streaming data** section of the **Streaming data** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)