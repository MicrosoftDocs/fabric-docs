---
title: Add Azure IoT Hub source to an eventstream
description: Learn how to add an Azure IoT Hub source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 11/18/2024
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add Azure IoT Hub source to an eventstream
This article shows you how to add an Azure IoT Hub source to an eventstream. 

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  


## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- You need to have appropriate permission to get IoT hub's access keys. If your Iot hub is within a protected network, [connect to it using a managed private endpoint](set-up-private-endpoint.md). Otherwise, ensure the Iot hub is publicly accessible and not behind a firewall.
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

## Launch the Select a data source wizard
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

::: zone-end

::: zone pivot="standard-capabilities"



## Prerequisites

Before you start, you must complete the following prerequisites:

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- You need to have appropriate permission to get IoT hub's access keys. The IoT hub must be publicly accessible and not behind a firewall or secured in a virtual network.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add an Azure IoT hub as a source

Follow these steps to add an Azure IoT hub as your eventstream source:

1. In the Eventstream editor, expand the **New source** dropdown menu within the node and choose **Azure IoT Hub**.

   :::image type="content" source="./media/add-iot-hub-source/add-iot-hub-source.png" alt-text="Screenshot that shows where to add an Azure IoT Hub source in the eventstream.":::

2. On the **Azure IoT Hub** configuration pane, enter the following details:

   :::image type="content" source="./media/add-iot-hub-source/iot-hub-configuration-pane.png" alt-text="Screenshot that shows where to configure Azure IoT Hub in the eventstream.":::

    1. **Source name**: Enter a name for your Azure IoT Hub, such as **iothub-source**.
    1. **Cloud connection**: Select an existing cloud connection that links your Azure IoT Hub to Microsoft Fabric. If you don't have one, proceed to step 3 to create a new cloud connection.
    1. **Data format**. Choose a data format (AVRO, JSON, or CSV) for streaming your IoT Hub data into the eventstream.
    1. **Consumer group**. Choose a consumer group from your Azure IoT Hub, or leave it as **$Default**. Then select **Add** to finish the Azure IoT Hub configuration.
    1. Once it adds successfully, you can see an Azure IoT Hub source added to your eventstream in the editor.

       :::image type="content" source="./media/add-iot-hub-source/successfully-added-iot-hub.png" alt-text="Screenshot that shows the Azure IoT Hub source in the Eventstream editor.":::

3. To create a new cloud connection for your Azure IoT Hub, follow these steps:

   :::image type="content" source="./media/add-iot-hub-source/create-new-cloud-connection.png" alt-text="Screenshot that shows where to create a new cloud connection.":::

    1. Select **Create new connection** from the dropdown menu, fill in the **Connection settings** and **Connection credentials** of your Azure IoT Hub, and then select **Create**.

        :::image type="content" source="./media/add-iot-hub-source/add-new-cloud-connection.png" alt-text="Screenshot that shows where to configure a new cloud connection." lightbox="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png":::

    2. **IoT Hub**. Enter the name of the IoT Hub in the Azure portal.
    3. **Connection name**. Enter a name for the new cloud connection, such as **iothub-connection**.
    4. **Shared access key name** and **Shared access key**. Enter the connection credentials for your Azure IoT Hub. You can find it under **Shared access policies** in the Azure portal. You must have appropriate permissions to access any of the IoT Hub endpoints.

       :::image type="content" source="./media/add-iot-hub-source/shared-access-key.png" alt-text="Screenshot that shows where to find the shared access key in the Azure portal." lightbox="./media/add-iot-hub-source/shared-access-key.png":::

    5. Return to the Azure IoT Hub configuration pane and select **Refresh** to load the new cloud connection.

       :::image type="content" source="./media/add-iot-hub-source/refresh-iot-hub-connection.png" alt-text="Screenshot that shows where to refresh the cloud connection for Azure IoT Hub.":::

Once the Azure IoT Hub is added to your eventstream, select **Preview data** to verify successful configuration. You should be able to preview incoming data to your eventstream.

   :::image type="content" source="./media/add-iot-hub-source/preview-iot-hub-data.png" alt-text="Screenshot that shows where to preview IoT Hub data." lightbox="./media/add-iot-hub-source/shared-access-key.png":::


## Related content

To learn how to add other sources to an eventstream, see the following articles: 
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Sample data](add-source-sample-data.md)
- [Custom app](add-source-custom-app.md)

::: zone-end
