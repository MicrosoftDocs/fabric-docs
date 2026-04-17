---
title: Capacity Overview Events in Fabric Real-Time Hub
description: Fabric capacity overview events let you monitor capacity usage in Real-Time hub. Learn how to create eventstreams from capacity events step by step.
ms.reviewer: geguirgu
ms.topic: how-to
ms.date: 04/02/2026
author: spelluru
ms.author: spelluru
ms.custom: references_regions
---

# Get Fabric capacity overview events in Real-Time hub

This article describes how to get Fabric capacity overview events as an eventstream in Fabric Real-Time hub.

[!INCLUDE [fabric-capacity-overview-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/fabric-capacity-overview-connector-prerequisites.md)]

## Create streams for Fabric capacity overview events

You can create streams for Fabric capacity overview events in Real-Time hub using one of the ways:

- [Using the **Data sources** page](#data-sources-page)
- [Using the **Fabric events** page](#fabric-events-page)

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, select **Fabric events** category at the top, and then select **Connect** on the **Capacity overview events** tile.

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Fabric events page

1. In Real-Time hub, select **Fabric events** on the left navigation menu.
1. Move the mouse over **Capacity overview events**, and select the **+** (plus) link, or select **... (ellipsis)** and then select **Create Eventstream**.

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section, but skip the first step of using the **Add source** page.

## Configure and create an eventstream

[!INCLUDE [fabric-capacity-overview-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/fabric-capacity-overview-connector-configuration.md)]

## View stream from the Real-Time hub page
Select **Real-Time hub** on the left navigation menu, and confirm that you see the stream you created. Refresh the page if you don't see it. 

For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

