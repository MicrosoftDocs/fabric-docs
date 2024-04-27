---
title: Add Azure IoT Hub as source in Real-Time hub
description: This article describes how to add an Azure IoT hub as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Add Azure IoT Hub as source in Real-Time hub
This article describes how to add an Azure IoT Hub as an event source in Fabric Real-Time hub. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- [Create an Azure IoT hub](/azure/iot-hub/iot-hub-create-through-portal) if you don't have one. 

## Get events from an Azure IoT hub
You can get events from an Azure IoT hub into Real-Time hub in one of the ways:

- Using the **Get events** experience
- Using the **Microsoft sources** tab

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Add an Azure IoT hub as a source](#add-an-azure-iot-hub-as-a-source) section. 

## Using the Microsoft sources tab

1. In Real-Time hub, switch to the **Microsoft sources** tab. 
1. In the **Source** drop-down list, select **Azure IoT Hub**. 
1. For **Subscription**, select an **Azure subscription** that has the resource group with your IoT hub. 
1. For **Resource group**, select a **resource group** that has your IoT hub.
1. For **Region**, select a location where your IoT hub is located. 
1. Now, move the mouse over the name of the IoT hub that you want to connect to Real-Time hub in the list of IoT hubs, and select the **Connect** button, or select **... (ellipsis)**, and then select the **Connect** button. 

    :::image type="content" source="./media/add-source-azure-iot-hub/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Microsoft sources tab with filters to show IoT hubs and the connect button for an IoT hub.":::

    To configure connection information, use steps from the [Add an Azure IoT hub as a source](#add-an-azure-iot-hub-as-a-source) section. Skip the first step of selecting Azure IoT Hub as a source type in the Get events wizard. 


## Add an Azure IoT hub as a source

[!INCLUDE [azure-iot-hub-source-connector](../real-time-intelligence/event-streams/includes/azure-iot-hub-source-connector.md)]



## View data stream details

1. On the **Review and create** page, if you select **Open eventstream**, the wizard opens the eventstream. To close the wizard, select **Close** at the bottom of the page. 

    :::image type="content" source="./media/add-source-azure-event-hubs/review-create-success.png" alt-text="Screenshot that shows the Review and create page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-event-hubs/review-create-success.png":::

2. In Real-Time hub, switch to the **Data streams** tab of Real-Time hub. Refresh the page. You should see the data stream created for you as shown in the following image.

    :::image type="content" source="./media/add-source-azure-event-hubs/verify-data-stream.png" alt-text="Screenshot that shows the Data streams tab of Real-Time hub with the stream you just created." lightbox="./media/add-source-azure-event-hubs/verify-data-stream.png":::

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

