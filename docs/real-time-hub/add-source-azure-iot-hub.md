---
title: Add Azure IoT Hub as source in Real-Time hub
description: This article describes how to add an Azure IoT hub as an event source in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 01/14/2026
---

# Add Azure IoT Hub as source in Real-Time hub

This article describes how to get events from an Azure IoT hub into Real-Time hub.

[!INCLUDE [azure-iot-hub-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/azure-iot-hub-source-connector-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Microsoft sources** category at the top, and then select **Connect** on the **Azure IoT Hub** tile. 

    :::image type="content" source="./media/add-source-azure-iot-hub/select-azure-iot-hub.png" alt-text="Screenshot that shows the selection of Azure IoT Hub as the source type in the Data sources page." lightbox="./media/add-source-azure-iot-hub/select-azure-iot-hub.png":::
    
    Now, follow instructions from the [Connect to an Azure iot hub](#connect-to-an-azure-iot-hub) section.

## Connect to an Azure iot hub

[!INCLUDE [azure-iot-hub-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/azure-iot-hub-source-connector-configuration.md)]


## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream with the selected Azure IoT hub as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-iot-hub/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-iot-hub/review-create-success.png":::
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

