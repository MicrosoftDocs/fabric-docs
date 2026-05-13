---
title: Get Azure Blob Storage events in Real-Time hub
description: This article describes how to get Azure Blob Storage events as an eventstream in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 03/31/2026
---

# Get Azure Blob Storage events into Real-Time hub

This article describes how to get Azure Blob Storage events into Fabric Real-Time hub.

An event is the smallest amount of information that fully describes that something happened in a system. Azure Blob Storage events are triggered when a client creates, replaces, deletes a blob, etc. By using the Real-Time hub, you can convert these events into continuous data streams and transform them before routing them to various destinations in Fabric.

[!INCLUDE [azure-blob-storage-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/azure-blob-storage-source-connector-prerequisites.md)]


## Create streams for Azure Blob Storage events

You can create streams for Azure Blob Storage events in Real-Time hub using one of the ways:

- [Using the **Data sources** page](#data-sources-page)
- [Using the **Azure events** page](#azure-events-page)

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Azure events** category at the top, and then select **Connect** on the **Azure Blob Storage events** tile. 

    :::image type="content" source="./media/get-azure-blob-storage-events/azure-blob-events.png" alt-text="Screenshot that shows the selection of Azure Blob Storage events as the source type in the Data sources page." lightbox="./media/get-azure-blob-storage-events/azure-blob-events.png":::

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Azure events page

1. In Real-Time hub, select **Azure events** on the left navigation menu.
1. Move the mouse over **Azure Blob Storage**, and select the **+** (plus) link, or select **... (ellipsis)** and then select **Create Eventstream**.

    :::image type="content" source="./media/get-azure-blob-storage-events/azure-events-create.png" alt-text="Screenshot that shows the Real-Time hub Azure events page.":::
    
    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Configure and create an eventstream

[!INCLUDE [azure-blob-storage-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/azure-blob-storage-source-connector-configuration.md)]

## View stream from the Real-Time hub page

1. When the wizard succeeds in creating a stream, on the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/get-azure-blob-storage-events/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open the eventstream." lightbox="./media/get-azure-blob-storage-events/review-create-success.png":::

1. Select **Real-Time hub** on the left navigation menu, and confirm that you see the stream you created. Refresh the page if you don't see it. 

    :::image type="content" source="./media/get-azure-blob-storage-events/azure-blob-stream.png" alt-text="Screenshot that shows the All data streams page with the generated stream." lightbox="./media/get-azure-blob-storage-events/azure-blob-stream.png":::

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

