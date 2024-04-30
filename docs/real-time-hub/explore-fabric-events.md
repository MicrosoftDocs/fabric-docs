---
title: Explore Fabric events in Fabric Real-Time hub
description: This article shows how to explore Fabric events in Fabric Real-Time hub. It provides details on the Fabric events tab in the Real-time Hub user interface.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Explore Fabric events in Fabric Real-Time hub
When you navigate to Real-Time hub in Fabric, you see the following three tabs in the user interface (UI). This article covers the **Fabric events** tab. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

| Tab | Description |
| --- | ----------- | 
| Data streams | You see all data streams that are actively running in Fabric that you have access to. The list includes streams from Fabric eventstreams and KQL tables that you have access to. | 
| Microsoft sources | You see all Microsoft sources that you have access to and connect to Fabric. The current supported Microsoft sources are: <ul><li>Azure Event Hubs</li><li>Azure IoT Hub</li><li>Azure SQL DB Change Data Capture (CDC)</li><li>Azure Cosmos DB CDC</li><li>PostgreSQL DB CDC</li><li>MySQL Database CDC</li></ul> |
| Fabric events | You can monitor and react to the following events: <ul><li>Fabric Workspace Item events</li><li>Azure Blob Storage events</li></ul><p>These events can be used to trigger other actions or workflows, such as invoking a data pipeline or sending a notification via email. You can also send these events to other destinations via eventstreams.</p> |

## Fabric events tab

:::image type="content" source="./media/explore-data-streams/real-time-hub-fabric-events-tab.png" alt-text="Screenshot that shows the Fabric events tab of the Real-Time hub." lightbox="./media/explore-data-streams/real-time-hub-fabric-events-tab.png":::


### Columns
Fabric events have the following columns: 

| Column | Description | 
| ------ | ----------- | 
| Name | Name of event type group. There are two types of event groups: <ul><li>Azure blob storage events</li><li>Fabric workspace item events</li></ul>|
| Description | Description of event type group. |


:::image type="content" source="./media/explore-data-streams/real-time-hub-fabric-events-columns.png" alt-text="Screenshot that shows the Fabric events tab of the Real-Time hub with columns highlighted." lightbox="./media/explore-data-streams/real-time-hub-fabric-events-columns.png":::


### Actions
Here are the actions available on each event type group. When you move the mouse over an event group, you see three buttons to create an eventstream, create an alert, and an ellipsis (...). When you click ellipsis (...), you see the same actions: **Create eventstream** and **Set alert**. 

| Action | Description | 
| ------ | ----------- | 
| Create eventstream | This action creates an eventstream on the selected event type group with all Event types selected. |
| Set alert | This action sets an alert on the selected event type group. |

:::image type="content" source="./media/explore-data-streams/real-time-hub-fabric-events-actions.png" alt-text="Screenshot that shows the Fabric events tab of the Real-Time hub with actions highlighted." lightbox="./media/explore-data-streams/real-time-hub-fabric-events-actions.png":::

## Related content

- [Explore Azure blob storage events](explore-azure-blob-storage-events.md)
- [Explore Fabric workspace item events](explore-fabric-workspace-item-events.md)
- [Get Fabric workspace item events](create-streams-fabric-workspace-item-events.md)


