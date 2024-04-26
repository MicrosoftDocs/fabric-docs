---
title: Set alerts on streams in Real-Time hub
description: This article describes how to set alerts on streams in Real-Time hub.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Set alerts on streams in Real-Time hub
This article describes how to set alerts on streams in Real-Time hub.

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Launch Set alert page for a data stream

1. Navigate to the Real-Time hub.
1. Select a data stream whose parent is an eventstream. 

    :::image type="content" source="./media/set-alerts-data-streams/select-data-stream.png" alt-text="Screenshot that shows Real-Time hub with a data stream selected.":::
1. On the stream detail page, select **Set alert**. 

    :::image type="content" source="./media/set-alerts-data-streams/set-alert-button.png" alt-text="Screenshot that shows the selection of the Set alert button on the data stream detail page." lightbox="./media/set-alerts-data-streams/set-alert-button.png":::
    

## Set alert

On the **Set alert** page, follow these steps:

1. Confirm that **Source** set to the name of your eventstream. 
1. For **Condition**, select one of the following options:
    1. To monitor each event with no condition, select **On each event**. 
    1. To monitor events that satisfy a condition, select **On each event when**, select a field, select a condition, and a value. 
    1. To monitor events grouped by, select **On each event grouped by**, select a grouping field, a field for filtering, condition, and a value to be checked against. 
1. For **Action**, select one of the following options:
    1. To receive an email when the event occurs and the condition is met, select **Send me an email**. 
    1. To receive notification via Teams, select **Message me in Teams**.
    1. To run a Fabric item, select **Run a Fabric item**. 
1. In the **Save location** section, do these steps: 
    1. For **Workspace**, select the workspace where you want to save the alert. 
    1. For **Reflex item**, select an existing Reflex item or create a Reflex item for this alert. 

## Related content

- [Set alerts for Azure blob storage events](set-alerts-azure-blob-storage-events.md)
- [Set alerts for Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)



