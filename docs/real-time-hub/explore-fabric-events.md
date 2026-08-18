---
title: Explore Fabric events in Fabric Real-Time hub
description: This article shows how to explore Fabric events in Fabric Real-Time hub. It provides details on the Fabric events page in the Real-Time hub user interface.
ms.reviewer: majia
ms.topic: how-to
ms.date: 08/18/2026
ai-usage: ai-assisted
---

# Explore Fabric events in Fabric Real-Time hub

This article describes columns on the **Fabric events** page and actions available for each event. 

:::image type="content" source="./media/explore-fabric-events/fabric-events.png" alt-text="Screenshot that shows the Real-Time hub Fabric events page." lightbox="./media/explore-fabric-events/fabric-events.png":::

[!INCLUDE [consume-fabric-events-regions](../real-time-intelligence/event-streams/includes/connectors/consume-fabric-events-regions.md)]

## Columns

Fabric events have the following columns:

| Column | Description |
| ------ | ----------- |
| Name | Name of the event type group. Fabric supports multiple event groups, including capacity overview events, workspace item events, OneLake events, job events, and anomaly detection events. |
| Description | Description of event type group. |

:::image type="content" source="./media/explore-fabric-events/columns.png" alt-text="Screenshot that shows the selection of columns on the Fabric events page." lightbox="./media/explore-fabric-events/columns.png":::

## Actions

Each event type group offers the following actions. When you point to an event group, you see three buttons to create an eventstream, create an alert, and an ellipsis (...). When you select the ellipsis (...), you see the same actions: **Create eventstream** and **Set alert**.

| Action | Description |
| ------ | ----------- |
| Create eventstream | Creates an eventstream on the selected event group with all event types selected. |
| Set alert | Sets an alert on the selected event group. |

:::image type="content" source="./media/explore-fabric-events/actions.png" alt-text="Screenshot that shows the actions on the Fabric events page." lightbox="./media/explore-fabric-events/actions.png":::

## Related content
- [Explore Fabric capacity overview events](explore-fabric-capacity-overview-events.md)
- [Explore Fabric workspace item events](explore-fabric-workspace-item-events.md)
- [Explore Fabric OneLake events](explore-fabric-onelake-events.md)
- [Explore Fabric Job events](explore-fabric-job-events.md)
- [Explore anomaly detection events](explore-anomaly-detection.md)

