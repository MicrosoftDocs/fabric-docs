---
title: Get Events from Azure Event Hubs into Real-Time hub
description: Stream events from Azure Event Hubs into Fabric Real-Time hub with ease. Discover how to set up the connector, configure your event hub, and verify your data stream.
ms.reviewer: anboisve
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 04/01/2026
author: spelluru
ms.author: spelluru
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-hubs-capabilities
---

# Get events from Azure Event Hubs into Real-Time hub

This article describes how to get events from an Azure event hub into Real-Time hub.

[!INCLUDE [azure-event-hubs-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/azure-event-hubs-source-connector-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

1. On the **Data sources** page, select the **Microsoft sources** category at the top, and then select **Connect** on the **Azure Event Hubs** tile. 

    :::image type="content" source="./media/add-source-azure-event-hubs/select-azure-event-hubs.png" alt-text="Screenshot that shows the selection of Azure Event Hubs as the source type in the Data sources page." lightbox="./media/add-source-azure-event-hubs/select-azure-event-hubs.png":::
    
    Now, follow the instructions in the [Connect to an Azure event hub](#configure-and-connect-to-the-azure-event-hub) section.

### Configure and connect to the Azure event hub

[!INCLUDE [azure-event-hubs-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/azure-event-hubs-source-connector-configuration.md)]    

## View data stream details
1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected event hub as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-event-hubs/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-event-hubs/review-create-success.png":::
1. You see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

    :::image type="content" source="./media/add-source-azure-event-hubs/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-event-hubs/verify-data-stream.png":::

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

