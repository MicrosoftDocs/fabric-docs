---
title: Get Fabric workspace item events in Real-Time hub
description: This article describes how to get Fabric workspace item events as an eventstream in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

# Get Fabric workspace item events in Real-Time hub (preview)
This article describes how to get Fabric workspace item events as an eventstream in Fabric Real-Time hub.

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

> [!NOTE]
> - Consuming Fabric events via eventstream isn't supported if the capacity region of the eventstream is in the following regions: Germany West Central, South-Central US, West US2, West US3 or West Europe. 
> - While consuming Fabric workspace item events, make sure that the capacity region of consuming eventstream is the same as the Tenant home region. 

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- A Fabric workspace with events you want to track.

## Create streams for Fabric workspace item events
You can create streams for Fabric workspace item events in Real-Time hub using one of the ways:

- [Using the **Get events** experience](#launch-get-events-experience)
- [Using the **Fabric events** tab](#fabric-events-tab)


[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Fabric events tab

1. In Real-Time hub, switch to the **Fabric events** tab. 
1. Move the mouse over **Fabric workspace item events**, and select the **Create stream** link or select ... (ellipsis) and then select **Create stream**. 

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/fabric-events-tab.png" alt-text="Screenshot that shows the Fabric events tab of the Real-Time hub.":::

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section, but skip the first step of using the **Get events** page. 

## Configure and create an eventstream

1. On the **Get events** page, select **Fabric Workspace item events**.

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/select-fabric-workspace-item-events.png" alt-text="Screenshot that shows the Get events page with Fabric workspace item events selected.":::
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

1. In **Real-Time hub**, switch to the **Data streams** tab. 
1. Confirm that you see the stream you created. 

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/verify-data-stream.png" alt-text="Screenshot that shows the Data streams tab with the generated stream." lightbox="./media/create-streams-fabric-workspace-item-events/verify-data-stream.png":::

## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
