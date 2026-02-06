---
title: Add Solace PubSub+ as source in Real-Time hub
description: This article describes how to add a Solace PubSub+ queue or topic as an event source in Fabric Real-Time hub.
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.date: 01/18/2026
---

# Add a Solace PubSub+ queue or topic as source in Real-Time hub (Preview)
This article describes how to add a Solace PubSub+ queue or topic as an event source in Fabric Real-Time hub. 

[!INCLUDE [solace-pub-sub-source-description-prerequisites](../real-time-intelligence/event-streams/includes/solace-pub-sub-source-description-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Select Solace PubSub+ as data source type
On the **Data sources** page, search for **Solace PubSub+**, and select **Connect** on the **Solace PubSub+** tile. 

:::image type="content" source="./media/add-source-solace-pub-sub/select-connect.png" alt-text="Screenshot that shows the Data sources page with Connect on the Solace PubSub+ tile selected.":::

## Add Solace PubSub queue or topic as a source
[!INCLUDE [solace-pub-sub-source-connector](../real-time-intelligence/event-streams/includes/solace-pub-sub-source-connector.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Solace PubSub+ source. To close the wizard, select **Close** at the bottom of the page. 
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
 
## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
