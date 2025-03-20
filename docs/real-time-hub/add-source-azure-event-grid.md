---
title: Get events from Azure Event Grid namespace
description: This article describes how to get events from an Azure Event Grid namespace into Fabric Real-Time hub. 
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 03/19/2025
---

# Get events from Azure Event Grid namespace
This article describes how to get events from an Azure Event Grid namespace into Real-Time hub.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Enable [managed identity](/azure/event-grid/event-grid-namespace-managed-identity) on the Event Grid namespace. 
- If you want to receive Message Queueing Telemetry Transport (MQTT) data, enable [MQTT](/azure/event-grid/mqtt-publish-and-subscribe-portal) and [routing](/azure/event-grid/mqtt-routing) on the Event Grid namespace. 


## Get events from an Azure Event Grid namespace
You can get events from an Azure Event Grid namespace into Real-Time hub using the [**Data sources** page](#data-sources-page)

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, search for **Azure Event Grid namespace**, and then select **Connect** on the **Azure Event Grid Namespace** tile. 

    :::image type="content" source="./media/add-source-azure-event-grid/select-azure-event-grid.png" alt-text="Screenshot that shows the selection of Azure Event Grid namespace as the source type in the Data sources page.":::
    
    Now, follow instructions from the [Connect to an Azure Event Grid namespace](#configure-and-connect-to-the-azure-event-grid-namespace) section.

## Configure and connect to the Azure Event Grid namespace
[!INCLUDE [azure-event-grid-source-connector](./includes/azure-event-grid-source-connector.md)]

## View data stream details
1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Event Grid namespace as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-event-grid/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-event-grid/review-create-success.png":::
2. You should see the stream on the **All data streams** and **My data streams** pages. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

    :::image type="content" source="./media/add-source-azure-event-grid/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-event-grid/verify-data-stream.png":::

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
