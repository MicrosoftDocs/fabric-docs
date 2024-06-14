---
title: Explore Fabric events in Fabric Real-Time hub
description: This article shows how to explore Fabric events in Fabric Real-Time hub. It provides details on the Fabric events tab in the Real-Time hub user interface.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

# Explore Fabric events in Fabric Real-Time hub (preview)

[!INCLUDE [preview-note](./includes/preview-note.md)]
When you navigate to Real-Time hub in Fabric, you see the following three tabs in the user interface (UI). This article covers the **Fabric events** tab. 

:::image type="content" source="./media/explore-data-streams/real-time-hub-fabric-events-tab.png" alt-text="Screenshot that shows the Fabric events tab of the Real-Time hub." lightbox="./media/explore-data-streams/real-time-hub-fabric-events-tab.png":::


[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

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
| Create eventstream | This action creates an eventstream on the selected event type group with all Event types selected. For more information, see [Get Azure Blob Storage events into Real-Time hub](get-azure-blob-storage-events.md). |
| Set alert | This action sets an alert on the selected event type group. For more information, see [Set alerts on Azure Blob Storage accounts](set-alerts-azure-blob-storage-events.md). |

:::image type="content" source="./media/explore-data-streams/real-time-hub-fabric-events-actions.png" alt-text="Screenshot that shows the Fabric events tab of the Real-Time hub with actions highlighted." lightbox="./media/explore-data-streams/real-time-hub-fabric-events-actions.png":::

## Related content

- [Explore Azure blob storage events](explore-azure-blob-storage-events.md)
- [Explore Fabric workspace item events](explore-fabric-workspace-item-events.md)
- [Get Fabric workspace item events](create-streams-fabric-workspace-item-events.md)
