---
title: Add Azure IoT Hub source to an eventstream
description: Learn how to add an Azure IoT Hub source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 05/21/2024
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add Azure IoT Hub source to an eventstream
This article shows you how to add an Azure IoT Hub source to an eventstream. 

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located. 
- You need to have appropriate permission to get IoT hub's access keys. The IoT hub must be publicly accessible and not behind a firewall or secured in a virtual network. 
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

## Launch Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure IoT Hub** tile.

:::image type="content" source="./media/add-source-azure-iot-hub-enhanced/select-azure-iot-hub.png" alt-text="Screenshot that shows the selection of Azure IoT Hub as the source type in the Get events wizard." lightbox="./media/add-source-azure-iot-hub-enhanced/select-azure-iot-hub.png":::


## Configure Azure IoT Hub connector

[!INCLUDE [azure-iot-hub-connector](./includes/azure-iot-hub-source-connector.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## View updated eventstream

1. You see that the Azure IoT Hub source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Azure IoT hub, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-iot-hub-enhanced/publish.png" alt-text="Screenshot that shows the editor with Publish button selected.":::
1. After you complete these steps, the Azure IoT hub is available for visualization in the **Live view**. Select the **IoT hub** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="./media/add-source-azure-iot-hub-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

## Related content

For a list of supported sources, see [Add an event source in an eventstream](add-manage-eventstream-sources.md)

