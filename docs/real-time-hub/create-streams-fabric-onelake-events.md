---
title: Fabric OneLake Events in Fabric Real-Time Hub
description: This article describes how to get OneLake events as a Fabric eventstream in Real-Time hub. You can transform the events and send them to supported destinations.
ms.reviewer: robece
ms.topic: how-to
ms.date: 04/02/2026
author: spelluru
ms.author: spelluru
#customer intent: I want to know how to create eventstreams for OneLake events in Fabric Real-Time hub.
---

# Get OneLake events in Fabric Real-Time hub
This article describes how to get OneLake events as an eventstream in Fabric Real-Time hub.

Real-Time hub allows you to discover and subscribe to changes in files and folders in OneLake, and then react to those changes in real-time. For example, you can react to changes in files and folders in Lakehouse and use Activator alerting capabilities to set up alerts based on conditions and specify actions to take when the conditions are met. This article explains how to explore OneLake events in Real-Time hub.


[!INCLUDE [fabric-onelake-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/fabric-onelake-source-connector-prerequisites.md)]
For more information, see [Explore OneLake events](explore-fabric-onelake-events.md).

## Create streams for OneLake events
You can create streams for OneLake events in Real-Time hub using one of the ways:

- [Using the **Data sources** page](#data-sources-page)
- [Using the **Fabric events** page](#fabric-events-page)

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, select **OneLake events** category at the top, and then select **Connect** on the **OneLake events** tile. You can also use the search bar to search for OneLake events. 

    :::image type="content" source="./media/create-streams-onelake-events/select-onelake-events.png" alt-text="Screenshot that shows the Get events page with OneLake events selected." lightbox="./media/create-streams-onelake-events/select-onelake-events.png":::

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Fabric events page
In Real-Time hub, select **Fabric events** on the left menu. You can use either the list view of Fabric events or the detail view of OneLake events to create an eventstream for OneLake events. 
 
### Using the list view
Move the mouse over **OneLake events**, and select the **Create Eventstream** link or select ... (Ellipsis) and then select **Create Eventstream**.

:::image type="content" source="./media/create-streams-onelake-events/fabric-events-menu.png" alt-text="Screenshot that shows the Real-Time hub Fabric events page." lightbox="./media/create-streams-onelake-events/fabric-events-menu.png":::

### Using the detail view
1. On the **Fabric events** page, select **OneLake events** from the list of Fabric events supported. 
1. On the **Detail** page, select **+ Create eventstream** from the menu. 

    :::image type="content" source="./media/create-streams-onelake-events/onelake-events-detail-page.png" alt-text="Screenshot that shows the detail page for OneLake events." lightbox="./media/create-streams-onelake-events/onelake-events-detail-page.png":::    

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section, but skip the first step of using the **Add source** page.

## Configure and create an eventstream

[!INCLUDE [fabric-onelake-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/fabric-onelake-source-connector-configuration.md)]


## View stream from the Real-Time hub page

1. When the wizard succeeds in creating a stream, use **Open eventstream** link to open the eventstream that was created for you. Select **Finish** to close the wizard. 

    :::image type="content" source="./media/create-streams-onelake-events/review-create-success.png" alt-text="Screenshot that shows the Review and create page with links to open the eventstream." lightbox="./media/create-streams-onelake-events/review-create-success.png":::

1. Select **Real-Time hub** on the left navigation menu, and confirm that you see the stream you created. Refresh the page if you don't see it. 

    :::image type="content" source="./media/create-streams-onelake-events/verify-data-stream.png" alt-text="Screenshot that shows data stream in the My data streams page." lightbox="./media/create-streams-onelake-events/verify-data-stream.png":::

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

