---
title: Get Fabric workspace item events in Real-time hub
description: This article describes how to get Fabric workspace item events as an eventstream in Fabric Real-time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 05/21/2024
---

# Get Fabric workspace item events in Real-time hub
This article describes how to get Fabric workspace item events as an eventstream in Fabric Real-time hub.

[!INCLUDE [preview-note](./includes/preview-note.md)]

Fabric workspace item events are discrete Fabric events that occur when changes are made to your Fabric Workspace. These changes include creating, updating, or deleting a Fabric item.

With Fabric event streams, you can capture these Fabric workspace events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of Fabric workspace events within Fabric event streams gives you greater flexibility for monitoring and analyzing activities in your Fabric workspace.

Here are the supported Fabric workspace events:

- Microsoft.Fabric.ItemCreateSucceeded
- Microsoft.Fabric.ItemCreateFailed
- Microsoft.Fabric.ItemUpdateSucceeded
- Microsoft.Fabric.ItemUpdateFailed
- Microsoft.Fabric.ItemDeleteSucceeded
- Microsoft.Fabric.ItemDeleteFailed
- Microsoft.Fabric.ItemReadSucceeded
- Microsoft.Fabric.ItemReadFailed


## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- A Fabric workspace with events you want to track.

## Create streams for Fabric workspace item events
You can create streams for Fabric workspace item events in Real-time hub using one of the ways:

- Using the **Get events** experience
- Using the **Fabric events** tab

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section after you do the following step:

On the **Get events** page, select **Fabric Workspace item events**.

:::image type="content" source="./media/create-streams-fabric-workspace-item-events/select-fabric-workspace-item-events.png" alt-text="Screenshot that shows the Get events page with Fabric workspace item events selected.":::


## Fabric events tab

1. In Real-time hub, switch to the **Fabric events** tab. 
1. Move the mouse over **Fabric workspace item events**, and select the **Create stream** link or select ... (ellipsis) and then select **Create stream**. 

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/fabric-events-tab.png" alt-text="Screenshot that shows the Fabric events tab of the Real-time hub.":::

## Configure and create an eventstream

1. On the **Connect** page, for **Event types**, select the event types that you want to monitor. 

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/select-event-types.png" alt-text="Screenshot that shows the selection of Fabric event types on the Connect page." lightbox="./media/create-streams-fabric-workspace-item-events/select-event-types.png":::
1. This step is optional. To see the schemas for event types,  select **View selected event type schemas**. 
1. For **Event source**, confirm that **By workspace** is selected.
1. For **Workspace**, select the workspace for which you want to receive the events. 
1. In the **Stream details** section, follow these steps.
    1. Select the **workspace** where you want to save the eventstream.
    1. Enter a **name for the eventstream**. The **Stream name** is automatically generated for you. 
1. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/connect-page-filled.png" alt-text="Screenshot that shows the Connect page with all the fields filled." lightbox="./media/create-streams-fabric-workspace-item-events/connect-page-filled.png":::
1. On the **Review and create** page, review settings, and select **Create source**. 

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/review-create-page.png" alt-text="Screenshot that shows the Review and create page." lightbox="./media/create-streams-fabric-workspace-item-events/review-create-page.png":::
1. When the wizard succeeds in creating a stream, you see a link to **open the eventstream** and **close** the wizard.

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/review-create-success.png" alt-text="Screenshot that shows the Review and create page with links to open the eventstream." lightbox="./media/create-streams-fabric-workspace-item-events/review-create-success.png":::

## View stream on the Data streams tab

1. In **Real-time hub**, switch to the **Data streams** tab. 
1. Confirm that you see the stream you created. 

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/verify-data-stream.png" alt-text="Screenshot that shows the Data streams tab with the generated stream." lightbox="./media/create-streams-fabric-workspace-item-events/verify-data-stream.png":::
