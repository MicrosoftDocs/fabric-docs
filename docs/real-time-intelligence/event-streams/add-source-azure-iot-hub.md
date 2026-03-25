---
title: Add an Azure IoT Hub Source to an Eventstream
description: Learn how to add an Azure IoT Hub source to an eventstream.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 12/05/2025
ms.search.form: Source and Destination
---

# Add Azure IoT Hub source to an eventstream

This article shows you how to add an Azure IoT Hub source to a Microsoft Fabric eventstream.

[!INCLUDE [select-view](./includes/select-view.md)]

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

1. The IoT hub is available for visualization in the **Live** view. Select the **IoT hub** tile in the diagram to display a page similar to the following example.

    :::image type="content" source="./media/add-source-azure-iot-hub-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

## Related content

- For a list of supported sources, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).




