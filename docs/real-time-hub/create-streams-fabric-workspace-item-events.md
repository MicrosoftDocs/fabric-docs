---
title: Get Fabric workspace item events in Real-Time hub
description: This article describes how to get Fabric workspace item events as an eventstream in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
ms.date: 01/14/2026
---

# Get Fabric workspace item events in Real-Time hub

This article describes how to get Fabric workspace item events as an eventstream in Fabric Real-Time hub.

Fabric workspace item events are discrete Fabric events that occur when changes are made to your Fabric Workspace. These changes include creating, updating, or deleting a Fabric item.

Fabric workspace item events are discrete Fabric events that occur when contents of your Fabric Workspace is changed. These changes include creating, updating, or deleting of Fabric items except for the item types listed in the following note.
[!INCLUDE [unsupported-itemtypes-in-workspaceevents](./includes/unsupported-itemtypes-in-workspaceevents.md)]

With Fabric eventstreams, you can capture these Fabric workspace events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of Fabric workspace events within Fabric eventstreams gives you greater flexibility for monitoring and analyzing activities in your Fabric workspace.

Here are the supported Fabric workspace events:

- Microsoft.Fabric.ItemCreateSucceeded
- Microsoft.Fabric.ItemCreateFailed
- Microsoft.Fabric.ItemUpdateSucceeded
- Microsoft.Fabric.ItemUpdateFailed
- Microsoft.Fabric.ItemDeleteSucceeded
- Microsoft.Fabric.ItemDeleteFailed

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

[!INCLUDE [deprecated-fabric-workspace-events](./includes/deprecated-fabric-workspace-events.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- A Fabric workspace with events you want to track.

## Create streams for Fabric workspace item events

You can create streams for Fabric workspace item events in Real-Time hub using one of the ways:

- [Using the **Data sources** page](#data-sources-page)
- [Using the **Fabric events** page](#fabric-events-page)

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Fabric events** category at the top, and then select **Connect** on the **Fabric Workspace Item events** tile. 

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/select-fabric-workspace-item-events.png" alt-text="Screenshot that shows the selection of Fabric Workspace Item events as the source type in the Data sources page." lightbox="./media/create-streams-fabric-workspace-item-events/select-fabric-workspace-item-events.png":::

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Fabric events page

1. In Real-Time hub, select **Fabric events** on the left navigation menu.
1. Move the mouse over **Workspace item events**, and select the **+** (plus) link, or select **... (ellipsis)** and then select **Create Eventstream**.

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/fabric-events-menu.png" alt-text="Screenshot that shows the Real-Time hub Fabric events page.":::

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section, but skip the first step of using the **Add source** page.

## Configure and create an eventstream

1. On the **Connect** page, for **Event types**, select the event types that you want to monitor.

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/select-event-types.png" alt-text="Screenshot that shows the selection of Fabric event types on the Connect page." lightbox="./media/create-streams-fabric-workspace-item-events/select-event-types.png":::
1. This step is optional. To see the schemas for event types,  select **View selected event type schemas**.
1. For **Event source**, there's an option between choosing to stream all workspace item events in the tenant by selecting the source option as **Across this tenant** or restricting it to specific workspace by choosing **By workspace** option. To select a **workspace** for which a user want to stream workspace item events, the user must be a workspace admin, member, or a contributor of that workspace. To receive workspace item events across the tenant, users must be a Fabric tenant admin
1. If **By workspace** was chosen,  select the **workspace** for which you want to receive the events.
1. In the **Stream details** section, follow these steps.
    1. Select the **workspace** where you want to save the eventstream.
    1. Enter a **name for the eventstream**. The **Stream name** is automatically generated for you.
1. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/connect-page-filled.png" alt-text="Screenshot that shows the Connect page with all the fields filled." lightbox="./media/create-streams-fabric-workspace-item-events/connect-page-filled.png":::
1. On the **Review + connect** page, review settings, and select **Create source**.

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/review-create-page.png" alt-text="Screenshot that shows the Review + connect page." lightbox="./media/create-streams-fabric-workspace-item-events/review-create-page.png":::
1. When the wizard succeeds in creating a stream, on the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open the eventstream." lightbox="./media/create-streams-fabric-workspace-item-events/review-create-success.png":::

## View stream from the Real-Time hub page
Select **Real-Time hub** on the left navigation menu, and confirm that you see the stream you created. Refresh the page if you don't see it. 

:::image type="content" source="./media/create-streams-fabric-workspace-item-events/verify-data-stream.png" alt-text="Screenshot that shows the All data streams page with the generated stream." lightbox="./media/create-streams-fabric-workspace-item-events/verify-data-stream.png":::

For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
