---
title: Add Azure Event Grid namespace as a source
description: Learn how to add an Azure Event Grid namespace as a source to an eventstream.
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 03/19/2025
---

# Add Azure Event Grid Namespace source to an eventstream
This article shows you how to add an Azure Event Grid Namespace source to an eventstream. 

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Enable [managed identity](/azure/event-grid/event-grid-namespace-managed-identity) on the Event Grid namespace. 
- If you want to receive Message Queuing Telemetry Transport (MQTT) data, enable [MQTT](/azure/event-grid/mqtt-publish-and-subscribe-portal) and [routing](/azure/event-grid/mqtt-routing) on the Event Grid namespace. 
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure Event Grid Namespace** tile.

:::image type="content" source="./media/add-source-azure-event-grid/select-azure-event-grid.png" alt-text="Screenshot that shows the selection of Azure Event Grid Namespace as the source type in the Get events wizard." lightbox="./media/add-source-azure-event-grid/select-azure-event-grid.png":::


## Configure Azure Event Grid connector
[!INCLUDE [azure-event-grid-source-connector](./includes/azure-event-grid-source-connector.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## View updated eventstream

1. On the **Review + connect** page, select **Add**. 
1. You see that the Event Grid source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Azure Event Grid namespace, select **Publish** on the ribbon. 

    :::image type="content" source="./media/add-source-azure-event-grid/publish.png" alt-text="Screenshot that shows the editor with Publish button selected." lightbox="./media/add-source-azure-event-grid/publish.png":::
1. After you complete these steps, the Azure Event Grid namespace is available for visualization in the **Live view**. Select the **Event Grid Namespace** tile in the diagram to see details about the source.


## Related content
To learn how to add other sources to an eventstream, see the following article: [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).
