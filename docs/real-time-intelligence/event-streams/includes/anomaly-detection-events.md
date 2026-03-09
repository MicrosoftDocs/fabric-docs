---
title: Anomaly detection events for Fabric event streams
description: This include file contains common steps for configuring anomaly detection events for Fabric event streams and the Real-Time Hub.
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 03/09/2026
---

1. On the **Connect** page, for **Event types**, the default value is set to **Microsoft.Fabric.AnomalyEvents.AnomalyDetected**.

1. This step is optional. To see the [Schemas](../add-source-anomaly-events.md#schemas) for event types,  select **View selected event type schemas**. If you select it, browse through schemas for the events, and then navigate back to previous page by selecting the backward arrow button at the top. 

    :::image type="content" source="./media/anomaly-detection-events/select-event-types.png" alt-text="Screenshot that shows the selection of Anomaly detection events types on the Connect page." lightbox="./media/anomaly-detection-events/select-event-types.png":::

1. Select a workspace under **Event scope**. 

    :::image type="content" source="./media/anomaly-detection-events/select-event-scope.png" alt-text="Screenshot that shows the selection the event scope." lightbox="./media/anomaly-detection-events/select-event-scope.png":::    
1. Select an Anomaly detector **Item** and **Configuration**.

    :::image type="content" source="./media/anomaly-detection-events/configuration.png" alt-text="Screenshot that shows how to select the configuration." lightbox="./media/anomaly-detection-events/configuration.png":::  
1. On the **Configure connection settings** page, optionally add filters to filter incoming anomaly detection events. To add a filter:
    1. Select **+ Filter**. 
    1. Select a field.
    1. Select an operator.
    1. Select one or more values to match. 
 
        :::image type="content" source="./media/anomaly-detection-events/set-filters.png" alt-text="Screenshot that shows the addition of a filter." lightbox="./media/anomaly-detection-events/set-filters.png":::       
1. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/anomaly-detection-events/next-button.png" alt-text="Screenshot that shows the selection of the Next button." lightbox="./media/anomaly-detection-events/next-button.png":::
1. On the **Review + connect** page, review settings, and select **Add**.

    :::image type="content" source="./media/anomaly-detection-events/review-create-page.png" alt-text="Screenshot that shows the Review and create page." lightbox="./media/anomaly-detection-events/review-create-page.png":::
