---
title: Add Azure Event Hubs source to an eventstream
description: Learn how to add an Azure Event Hubs source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 10/27/2024
ms.search.form: Source and Destination
---

# Add Azure Event Hubs source to an eventstream
This article shows you how to add an Azure Event Hubs source to an eventstream. 

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located. 
- You need to have appropriate permission to get event hub's access keys. The event hub must be publicly accessible and not behind a firewall or secured in a virtual network. 
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Launch Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure Event Hubs** tile.

:::image type="content" source="./media/add-source-azure-event-hubs-enhanced/select-azure-event-hubs.png" alt-text="Screenshot that shows the selection of Azure Event Hubs as the source type in the Get events wizard." lightbox="./media/add-source-azure-event-hubs-enhanced/select-azure-event-hubs.png":::

## Configure Azure Event Hubs connector
[!INCLUDE [azure-event-hubs-connector](./includes/azure-event-hubs-source-connector.md)]

## View updated eventstream

1. You see that the Event Hubs source is added to your eventstream on the canvas in the **Edit** mode. Select **Refresh** in the bottom pane, which shows you preview of the data in the event hub. To implement this newly added Azure event hub, select **Publish** on the ribbon. 

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/publish.png" alt-text="Screenshot that shows the editor with Publish button selected.":::
1. After you complete these steps, the Azure event hub is available for visualization in the **Live view**. Select the **Event hub** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

## Related content

For a list of sources supported, see [Add an event source in an eventstream](add-manage-eventstream-sources.md)
