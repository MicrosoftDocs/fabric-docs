---
title: Fabric Workspace Item Events in Real-Time Hub
description: Fabric workspace item events let you track changes in Real-Time hub. Learn how to create eventstreams from the Data sources or Fabric events page step by step.
#customer intent: As a Fabric developer, I want to create a stream for Fabric workspace item events in Real-Time hub so that I can track changes happening in my workspace.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 04/02/2026
author: spelluru
ms.author: spelluru
---

# Get Fabric workspace item events in Real-Time hub

This article describes how to get Fabric workspace item events as an eventstream in Fabric Real-Time hub.

[!INCLUDE [fabric-workspace-source-connector-prerequisites](../real-time-intelligence//event-streams/includes/connectors/fabric-workspace-source-connector-prerequisites.md)]


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

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/fabric-events-menu.png" alt-text="Screenshot that shows the Real-Time hub Fabric events page." lightbox="./media/create-streams-fabric-workspace-item-events/fabric-events-menu.png":::

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section, but skip the first step of using the **Add source** page.

## Configure and create an eventstream

[!INCLUDE [fabric-workspace-source-connector-configuration](../real-time-intelligence//event-streams/includes/connectors/fabric-workspace-source-connector-configuration.md)]


## View stream from the Real-Time hub page

1. When the wizard succeeds in creating a stream, on the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open the eventstream." lightbox="./media/create-streams-fabric-workspace-item-events/review-create-success.png":::

1. Select **Real-Time hub** on the left navigation menu, and confirm that you see the stream you created. Refresh the page if you don't see it. 

    :::image type="content" source="./media/create-streams-fabric-workspace-item-events/verify-data-stream.png" alt-text="Screenshot that shows the All data streams page with the generated stream." lightbox="./media/create-streams-fabric-workspace-item-events/verify-data-stream.png":::

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

