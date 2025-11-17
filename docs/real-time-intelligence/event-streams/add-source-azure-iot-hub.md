---
title: Add an Azure IoT Hub Source to an Eventstream
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

This article shows you how to add an Azure IoT Hub source to a Microsoft Fabric eventstream.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or trial license mode with Contributor or higher permissions.  
- Appropriate permission to get your IoT hub's access keys. If your IoT hub is within a protected network, [connect to it by using a managed private endpoint](set-up-private-endpoint.md). Otherwise, ensure that the IoT hub is publicly accessible and not behind a firewall.
- An eventstream. If you don't have an eventstream, [create one](create-manage-an-eventstream.md).

## Start the wizard for selecting a data source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for **Azure IoT Hub**. On the **Azure IoT Hub** tile, select **Connect**.

:::image type="content" source="./media/add-source-azure-iot-hub-enhanced/select-azure-iot-hub.png" alt-text="Screenshot that shows the selection of Azure IoT Hub as the source type in the wizard for getting events." lightbox="./media/add-source-azure-iot-hub-enhanced/select-azure-iot-hub.png":::

## Configure an Azure IoT Hub connector

[!INCLUDE [azure-iot-hub-connector](./includes/azure-iot-hub-source-connector.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## View an updated eventstream

1. Confirm that the Azure IoT Hub source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added IoT hub, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-iot-hub-enhanced/publish.png" alt-text="Screenshot that shows the editor with the Publish button selected.":::

1. After you complete these steps, the IoT hub is available for visualization in the **Live** view. Select the **IoT hub** tile in the diagram to display a page similar to the following example.

    :::image type="content" source="./media/add-source-azure-iot-hub-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

## Related content

- For a list of supported sources, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).

::: zone-end

::: zone pivot="standard-capabilities"

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or trial license mode with Contributor or higher permissions.
- Appropriate permission to get your IoT hub's access keys. The IoT hub must be publicly accessible and not behind a firewall or secured in a virtual network.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add an IoT hub as a source

Follow these steps to add an IoT hub as your eventstream source:

1. In the eventstream editor, expand the **New source** dropdown menu within the node and select **Azure IoT Hub**.

   :::image type="content" source="./media/add-iot-hub-source/add-iot-hub-source.png" alt-text="Screenshot that shows where to add an Azure IoT Hub source in an eventstream.":::

2. On the **Azure IoT Hub** configuration pane, enter the following details. Then select **Add** to finish the configuration.

    1. **Source name**: Enter a name for your IoT hub, such as **iothub-source**.
    1. **Cloud connection**: Select an existing cloud connection that links your IoT hub to Microsoft Fabric. If you don't have one, proceed to step 4 to create a new cloud connection.
    1. **Consumer group**: Choose a consumer group from your IoT hub, or leave it as **$Default**.
    1. **Data format**: Choose a data format (AVRO, JSON, or CSV) for streaming your IoT hub data into the eventstream.

    :::image type="content" source="./media/add-iot-hub-source/iot-hub-configuration-pane.png" alt-text="Screenshot that shows configuration details for Azure IoT Hub in an eventstream.":::

3. Confirm that an Azure IoT Hub source is added to your eventstream in the editor.

    :::image type="content" source="./media/add-iot-hub-source/successfully-added-iot-hub.png" alt-text="Screenshot that shows an Azure IoT Hub source in the eventstream editor.":::

4. To create a new cloud connection for your IoT hub, follow these steps:

    1. On the dropdown menu, select **Create new**.

        :::image type="content" source="./media/add-iot-hub-source/create-new-cloud-connection.png" alt-text="Screenshot that shows the link for creating a new cloud connection.":::

    1. Fill in the **Connection settings** and **Connection credentials** values for your IoT hub, and then select **Create**.

        :::image type="content" source="./media/add-iot-hub-source/add-new-cloud-connection.png" alt-text="Screenshot that shows connection settings and connection credentials for a new cloud connection." lightbox="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png":::

    1. For **IoT Hub**, enter the name of the IoT hub in the Azure portal.

    1. For **Connection name**, enter a name for the new cloud connection, such as **iothub-connection**.

    1. For **Shared access key name** and **Shared access key**, enter the connection credentials for your IoT hub. You can find them under **Shared access policies** in the Azure portal. You must have appropriate permissions to access any of the Azure IoT Hub endpoints.

       :::image type="content" source="./media/add-iot-hub-source/shared-access-key.png" alt-text="Screenshot that shows where to find a shared access key in the Azure portal." lightbox="./media/add-iot-hub-source/shared-access-key.png":::

    1. Return to the Azure IoT Hub configuration pane and select **Refresh** to load the new cloud connection.

       :::image type="content" source="./media/add-iot-hub-source/refresh-iot-hub-connection.png" alt-text="Screenshot that shows the button for refreshing the cloud connection for Azure IoT Hub.":::

After the IoT hub is added to your eventstream, select **Preview data** to verify successful configuration. You should be able to preview incoming data to your eventstream.

:::image type="content" source="./media/add-iot-hub-source/preview-iot-hub-data.png" alt-text="Screenshot that shows a preview of Azure IoT Hub data." lightbox="./media/add-iot-hub-source/shared-access-key.png":::

## Related content

To learn how to add other sources to an eventstream, see the following articles:

- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Sample data](add-source-sample-data.md)
- [Custom app](add-source-custom-app.md)

::: zone-end
