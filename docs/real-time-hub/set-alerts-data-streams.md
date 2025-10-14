---
title: Set alerts on streams in Real-Time hub
description: This article describes how to set alerts on streams in Real-Time hub.
author: mystina
ms.author: majia
ms.topic: how-to
ms.custom:
ms.date: 07/25/2025
ms.search.form: Data Activator Eventstream Onramp
---

# Set alerts on streams in Real-Time hub
This article describes how to set alerts on streams in Real-Time hub.

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Launch Set alert page

1. In the **Recent streaming data** section at the bottom, select a data stream whose parent is an eventstream.

    :::image type="content" source="./media/set-alerts-data-streams/select-data-stream.png" alt-text="Screenshot that shows Real-Time hub with a data stream selected.":::
1. On the stream detail page, select **Set alert**. 

    :::image type="content" source="./media/set-alerts-data-streams/set-alert-button.png" alt-text="Screenshot that shows the selection of the Set alert button on the data stream detail page." lightbox="./media/set-alerts-data-streams/set-alert-button.png":::
    
[!INCLUDE [rule-details](./includes/rule-details.md)]

## Monitor section

For **Condition**, select one of the following options:

- To monitor each event with no condition, select **On each event**.
- To monitor events that satisfy a condition, select **On each event when**, select a field, select a condition, and a value. 

    :::image type="content" source="./media/set-alerts-data-streams/event-condition.png" alt-text="Screenshot that shows the condition for an alert." lightbox="./media/set-alerts-data-streams/event-condition.png":::
- To monitor events grouped by, select **On each event grouped by**, select a grouping field, a field for filtering, condition, and a value to be checked against. 

[!INCLUDE [rule-action](./includes/rule-action.md)]

[!INCLUDE [rule-save-location](./includes/rule-save-location.md)]


## Related content

- [Set alerts for Azure blob storage events](set-alerts-azure-blob-storage-events.md)
- [Set alerts for Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)
