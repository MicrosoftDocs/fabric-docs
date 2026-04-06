---
title: Anomaly detection events for Fabric event streams
description: This file contains common steps for configuring anomaly detection events for Fabric event streams and the Real-Time Hub.
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 03/31/2026
---

1. On the **Connect** page, for **Event types**, only **Microsoft.Fabric.AnomalyEvents.AnomalyDetected** is currently supported.

1. If you want to review the [Schemas](../../../../real-time-hub/explore-anomaly-detection.md#schemas) for the event types before proceeding, select **View selected event type schemas**. You can browse the schemas for the events, and then return to the previous page by selecting the back arrow at the top.

    :::image type="content" source="./media/anomaly-detection-events/select-event-types.png" alt-text="Screenshot that shows the selection of Anomaly detection events types on the Connect page." lightbox="./media/anomaly-detection-events/select-event-types.png":::

1. For **Event scope**, only **By configuration** is supported. After you select this option, select a workspace.

    :::image type="content" source="./media/anomaly-detection-events/select-event-scope.png" alt-text="Screenshot that shows the selection the event scope." lightbox="./media/anomaly-detection-events/select-event-scope.png":::    
1. Select an Anomaly detector **Item** and **Configuration**. Make sure that you published the configuration in the Anomaly Detector item.

    :::image type="content" source="./media/anomaly-detection-events/configuration.png" alt-text="Screenshot that shows how to select the configuration." lightbox="./media/anomaly-detection-events/configuration.png":::  
1. On the **Configure connection settings** page, optionally add filters to filter incoming anomaly detection events. To add a filter:
    1. Select **+ Filter**. 
    1. Select a field.
    1. Select an operator.
    1. Select one or more values to match. 
 
        :::image type="content" source="./media/anomaly-detection-events/set-filters.png" alt-text="Screenshot that shows the addition of a filter." lightbox="./media/anomaly-detection-events/set-filters.png":::       

[!INCLUDE [stream-source-details](./stream-source-details.md)]

1. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/anomaly-detection-events/next-button.png" alt-text="Screenshot that shows the selection of the Next button." lightbox="./media/anomaly-detection-events/next-button.png":::
1. On the **Review + connect** page, review settings, and select **Add** (Eventstream) or **Connect** (Real-Time hub).

    :::image type="content" source="./media/anomaly-detection-events/review-create-page.png" alt-text="Screenshot that shows the Review and create page." lightbox="./media/anomaly-detection-events/review-create-page.png":::
