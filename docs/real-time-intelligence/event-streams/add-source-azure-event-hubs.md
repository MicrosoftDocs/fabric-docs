---
title: Add Azure Event Hubs source to an eventstream
description: Learn how to add an Azure Event Hubs source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 09/25/2025
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-hubs-capabilities
---

# Add Azure Event Hubs source to an eventstream
This article shows you how to add an Azure Event Hubs source to an eventstream. 

[!INCLUDE [select-view](./includes/select-view.md)]

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- You need to have appropriate permission to get event hub's access keys. If your event hub is within a protected network, [connect to it using a managed private endpoint](set-up-private-endpoint.md). Otherwise, ensure the event hub is publicly accessible and not behind a firewall.
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 


## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure Event Hubs** tile.

:::image type="content" source="./media/add-source-azure-event-hubs-enhanced/select-azure-event-hubs.png" alt-text="Screenshot that shows the selection of Azure Event Hubs as the source type in the Get events wizard." lightbox="./media/add-source-azure-event-hubs-enhanced/select-azure-event-hubs.png":::

## Configure Azure Event Hubs connector

[!INCLUDE [azure-event-hubs-source-connector](./includes/azure-event-hubs-source-connector.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## View updated eventstream

1. You see that the Event Hubs source is added to your eventstream on the canvas in the **Edit** mode. Select **Refresh** in the bottom pane, which shows you preview of the data in the event hub. To implement this newly added Azure event hub, select **Publish** on the ribbon. 

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/publish.png" alt-text="Screenshot that shows the editor with Publish button selected.":::
1. After you complete these steps, the Azure event hub is available for visualization in the **Live view**. Select the **Event hub** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::


## Related content

For a list of supported sources, see [Add an event source in an eventstream](add-manage-eventstream-sources.md)

