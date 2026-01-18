---
title: Add a real-time weather source
description: This article describes how to add a real-time weather source as an event source in Fabric Real-Time hub.
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.date: 01/18/2026
---

# Add a real-time weather source in Real-Time hub (Preview)
This article describes how to add a real-time weather event source in Fabric Real-Time hub. 

[!INCLUDE [real-time-weather-source-description-prerequisites](../real-time-intelligence/event-streams/includes/real-time-weather-source-description-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Select Real-time weather as data source type
On the **Data sources** page, search for **Real-time weather**, and select **Connect** on the **Real-time weather** tile. 

:::image type="content" source="./media/add-source-real-time-weather/select-real-time-weather.png" alt-text="Screenshot that shows the Data sources page with Connect on the Real-time weather tile.":::

## Add a Real-time weather source

[!INCLUDE [real-time-weather](../real-time-intelligence/event-streams/includes/real-time-weather.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected weather source. To close the wizard, select **Close** at the bottom of the page. 
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
 
## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
