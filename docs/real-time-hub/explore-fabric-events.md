---
title: Explore Fabric events in Fabric Real-Time hub
description: This article shows how to explore Fabric events in Fabric Real-Time hub. It provides details on the Fabric events page in the Real-Time hub user interface.
author: mystina
ms.author: majia
ms.topic: how-to
ms.custom:
ms.date: 07/22/2025
---

# Explore Fabric events in Fabric Real-Time hub

This article describes columns on the **Fabric events** page and actions available for each event. 

:::image type="content" source="./media/explore-fabric-events/fabric-events-page.png" alt-text="Screenshot that shows the Real-Time hub Fabric events page." lightbox="./media/explore-fabric-events/fabric-events-page.png":::

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## Columns

Fabric events have the following columns:

| Column | Description |
| ------ | ----------- |
| Name | Name of event type group. Currently, only **Fabric workspace item events** are supported.|
| Description | Description of event type group. |

:::image type="content" source="./media/explore-fabric-events/columns.png" alt-text="Screenshot that shows the selection of columns on the Fabric events page." lightbox="./media/explore-fabric-events/columns.png":::

## Actions

Here are the actions available on each event type group. When you move the mouse over an event group, you see three buttons to create an eventstream, create an alert, and an ellipsis (...). When you select ellipsis (...), you see the same actions: **Create eventstream** and **Set alert**.

| Action | Description |
| ------ | ----------- |
| Create eventstream | This action creates an eventstream on the selected event type group with all Event types selected. For more information, see [Get Fabric workspace item events](create-streams-fabric-workspace-item-events.md). |
| Set alert | This action sets an alert on the selected event type group. For more information, see [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md). |

:::image type="content" source="./media/explore-fabric-events/actions.png" alt-text="Screenshot that shows the actions on the Fabric events page." lightbox="./media/explore-fabric-events/actions.png":::

## Related content
- [Explore Fabric workspace item events](explore-fabric-workspace-item-events.md)
- [Explore Fabric OneLake events](explore-fabric-onelake-events.md)
- [Explore Fabric Job events](explore-fabric-job-events.md)
