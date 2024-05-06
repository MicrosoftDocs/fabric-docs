---
title: Add Azure IoT Hub as source in Real-Time hub
description: This article describes how to add an Azure IoT hub as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 05/21/2024
---

# Add Azure IoT Hub as source in Real-Time hub
This article describes how to get events from an Azure IoT hub into Real-Time hub. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- [Create an Azure IoT hub](/azure/iot-hub/iot-hub-create-through-portal) if you don't have one. 
- You need to have appropriate permission to get IoT hub's access keys. The IoT hub must be publicly accessible and not behind a firewall or secured in a virtual network. 

## Get events from an Azure IoT hub
You can get events from an Azure IoT hub into Real-Time hub in one of the ways:

- Using the **Get events** experience
- Using the **Microsoft sources** tab

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Add an Azure IoT hub as a source](#add-an-azure-iot-hub-as-a-source) section. 

## Microsoft sources tab

1. In Real-Time hub, switch to the **Microsoft sources** tab. 
1. In the **Source** drop-down list, select **Azure IoT Hub**. 
1. For **Subscription**, select an **Azure subscription** that has the resource group with your IoT hub. 
1. For **Resource group**, select a **resource group** that has your IoT hub.
1. For **Region**, select a location where your IoT hub is located. 
1. Now, move the mouse over the name of the IoT hub that you want to connect to Real-Time hub in the list of IoT hubs, and select the **Connect** button, or select **... (ellipsis)**, and then select the **Connect** button. 

    :::image type="content" source="./media/add-source-azure-iot-hub/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Microsoft sources tab with filters to show IoT hubs and the connect button for an IoT hub.":::

    To configure connection information, use steps from the [Add an Azure IoT hub as a source](#add-an-azure-iot-hub-as-a-source) section. Skip the first step of selecting Azure IoT Hub as a source type in the Get events wizard. 


## Add an Azure IoT hub as a source


1. On the **Select a data source** page, select **Azure IoT Hub**. 

    :::image type="content" source="./media/add-source-azure-iot-hub/select-azure-iot-hub.png" alt-text="Screenshot that shows the selection of Azure IoT Hub as the source type in the Get events wizard." lightbox="./media/add-source-azure-iot-hub/select-azure-iot-hub.png":::
1. If there's an existing connection to your Azure IoT hub, select that existing connection as shown in the following image, and then move on to the step to configure **Data format** in the following steps.

    :::image type="content" source="./media/add-source-azure-iot-hub/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure IoT hub." lightbox="./media/add-source-azure-iot-hub/existing-connection.png":::    
1. On the **Connect** page, select **Go to resource** to navigate to the Azure IoT hub. Take a note of the access key name and its value. 

    :::image type="content" source="./media/add-source-azure-iot-hub/go-to-resource.png" alt-text="Screenshot that shows the Connect page with Go to resource link highlighted." lightbox="./media/add-source-azure-iot-hub/go-to-resource.png":::     

    To get the access key name and value, follow these steps: 
    1. Navigate to the IoT Hub page for your Azure IoT hub in the Azure portal. 
    1. On the **IoT Hub** page, select **Shared access policies** on the left navigation menu.
    1. Select a **policy name** from the list. Note down the policy name.
    1. Select the copy button next to the **Primary key**. 
    
        :::image type="content" source="./media/add-source-azure-iot-hub/access-key-value.png" alt-text="Screenshot that shows the access key for an Azure IoT Hub." lightbox="./media/add-source-azure-iot-hub/access-key-value.png":::                            
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-iot-hub/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/add-source-azure-iot-hub/new-connection-button.png":::     
1. In the **Connection settings** section, for **IoT Hub**, specify the name of your Azure IoT hub.

    :::image type="content" source="./media/add-source-azure-iot-hub/iot-hub-name.png" alt-text="Screenshot that shows the connection settings for the IoT hub with the name of the IoT hub." :::        
1. In the **Connection credentials** section, do these steps:
    1. If there's an existing connection, select it from the drop-down list. If not, confirm that **Create new connection** is selected for this option.
    1. For **Connection name**, enter a name for the connection to the IoT hub.
    1. For **Authentication method**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key. 
    1. For **Shared Access Key**, enter the value of the shared access key.
    1. Select **Connect** at the bottom of the page.1. 
        
        :::image type="content" source="./media/add-source-azure-iot-hub/connection-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure IoT Hub connector." lightbox="./media/add-source-azure-iot-hub/connection-page-1.png":::
1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the IoT hub. 
1. For **Data format**, select a data format of the incoming real-time events that you want to get from your Azure IoT hub. You can select from JSON, Avro, and CSV data formats, and then select Connect.
1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create. 
1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected Azure IoT hub as a source.
1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You see this stream on the **Data streams** tab of Real-Time hub when the wizard finishes. 
1. Select **Next** at the bottom of the page. 
    
    :::image type="content" source="./media/add-source-azure-iot-hub/connection-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure IoT Hub connector." lightbox="./media/add-source-azure-iot-hub/connection-page-2.png":::        
1. On the **Review and create** page, review settings, and select **Create source**. 

    :::image type="content" source="./media/add-source-azure-iot-hub/review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure IoT Hub connector." lightbox="./media/add-source-azure-iot-hub/review-create-page.png":::        

## View data stream details

1. On the **Review and create** page, if you select **Open eventstream**, the wizard opens the eventstream with the selected Azure IoT hub as a source. To close the wizard, select **Close** at the bottom of the page. 

    :::image type="content" source="./media/add-source-azure-iot-hub/review-create-success.png" alt-text="Screenshot that shows the Review and create page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-iot-hub/review-create-success.png":::

2. In Real-Time hub, switch to the **Data streams** tab of Real-Time hub. Refresh the page. You should see the data stream created for you as shown in the following image.

    :::image type="content" source="./media/add-source-azure-iot-hub/verify-data-stream.png" alt-text="Screenshot that shows the Data streams tab of Real-Time hub with the stream you just created." lightbox="./media/add-source-azure-iot-hub/verify-data-stream.png":::

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Next step
The eventstream has a stream output on which you can [set alerts](set-alerts-data-streams.md). After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md?branch=release-build-fabric#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. For more information, see [Consume data streams](consume-data-streams.md).