---
title: Add MQTT topic as source in Real-Time hub
description: This article describes how to add an MQTT topic as an event source in Fabric Real-Time hub.
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.date: 07/22/2025
---

# Add an MQTT topic as source in Real-Time hub (Preview)
This article describes how to add an MQTT topic as an event source in Fabric Real-Time hub. 

[!INCLUDE [mqtt-source-description-prerequisites](../real-time-intelligence/event-streams/includes/mqtt-source-description-prerequisites.md)]

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Select MQTT as data source type
On the **Data sources** page, search for **MQTT**, and select **Connect** on the **MQTT** tile. 

:::image type="content" source="./media/add-source-mqtt/select-connect-mqtt.png" alt-text="Screenshot that shows the Data sources page with Connect on the MQTT tile selected.":::

## Add MQTT topic as a source

[!INCLUDE [mqtt-source-connector](../real-time-intelligence/event-streams/includes/mqtt-source-connector.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected MQTT source. To close the wizard, select **Close** at the bottom of the page. 
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
 
## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
