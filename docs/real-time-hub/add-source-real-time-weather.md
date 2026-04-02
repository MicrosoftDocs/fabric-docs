---
title: Real-Time Weather Source in Fabric Real-Time Hub
description: Real-time weather data in Fabric Real-Time hub lets you stream live weather events. Learn how to add, configure, and view a real-time weather source step by step.
#customer intent: As a data engineer, I want to add a real-time weather source in Fabric Real-Time hub so that I can ingest live weather data into my event streams.
ms.topic: how-to
ms.date: 04/01/2026
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
---

# Add a real-time weather source in Real-Time hub (Preview)
This article describes how to add a real-time weather event source in Fabric Real-Time hub. 

[!INCLUDE [real-time-weather-connector-prerequisites](../real-time-intelligence/event-streams//includes/connectors/real-time-weather-connector-prerequisites.md)] 

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Select Real-time weather as data source type
On the **Data sources** page, search for **Real-time weather**, and select **Connect** on the **Real-time weather** tile. 

:::image type="content" source="./media/add-source-real-time-weather/select-real-time-weather.png" alt-text="Screenshot that shows the Data sources page with Connect on the Real-time weather tile.":::

## Add a Real-time weather source

[!INCLUDE [real-time-weather-connector-configuration](../real-time-intelligence/event-streams//includes/connectors/real-time-weather-connector-configuration.md)] 

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected weather source. To close the wizard, select **Close** at the bottom of the page. 
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

[!INCLUDE [real-time-weather-connector-fields](../real-time-intelligence/event-streams//includes/connectors/real-time-weather-connector-fields.md)]

## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
