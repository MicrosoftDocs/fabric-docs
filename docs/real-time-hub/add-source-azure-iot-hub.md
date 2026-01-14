---
title: Add Azure IoT Hub as source in Real-Time hub
description: This article describes how to add an Azure IoT hub as an event source in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 01/14/2026
---

# Add Azure IoT Hub as source in Real-Time hub

This article describes how to get events from an Azure IoT hub into Real-Time hub.



## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- [Create an Azure IoT hub](/azure/iot-hub/iot-hub-create-through-portal) if you don't have one. 
- You need to have appropriate permission to get IoT hub's access keys. The IoT hub must be publicly accessible and not behind a firewall or secured in a virtual network.

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Microsoft sources** category at the top, and then select **Connect** on the **Azure IoT Hub** tile. 

    :::image type="content" source="./media/add-source-azure-iot-hub/select-azure-iot-hub.png" alt-text="Screenshot that shows the selection of Azure IoT Hub as the source type in the Data sources page." lightbox="./media/add-source-azure-iot-hub/select-azure-iot-hub.png":::
    
    Now, follow instructions from the [Connect to an Azure iot hub](#connect-to-an-azure-iot-hub) section.

## Connect to an Azure iot hub

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-iot-hub/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/add-source-azure-iot-hub/new-connection-button.png":::   

    If there's an existing connection to your Azure iot hub, you select that existing connection as shown in the following image, and then move on to the step to configure the **data format**.

    :::image type="content" source="./media/add-source-azure-iot-hub/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure IoT hub." lightbox="./media/add-source-azure-iot-hub/existing-connection.png":::         
1. In the **Connection settings** section, for **IoT Hub**, specify the name of your Azure IoT hub.

    :::image type="content" source="./media/add-source-azure-iot-hub/iot-hub-name.png" alt-text="Screenshot that shows the connection settings for the IoT hub with the name of the IoT hub." :::        
1. In the **Connection credentials** section, do these steps:
    1. If there's an existing connection, select it from the drop-down list. If not, confirm that **Create new connection** is selected for this option.
    1. For **Connection name**, enter a name for the connection to the IoT hub.
    1. For **Authentication method**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key.
    1. For **Shared Access Key**, enter the value of the shared access key.
    1. Select **Connect** at the bottom of the page.
        
        :::image type="content" source="./media/add-source-azure-iot-hub/connection-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure IoT Hub connector." lightbox="./media/add-source-azure-iot-hub/connection-page-1.png":::
1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the IoT hub.
1. For **Data format**, select a data format of the incoming real-time events that you want to get from your Azure IoT hub. You can select from JSON, Avro, and CSV data formats, and then select Connect.
1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create.
1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected Azure IoT hub as a source.
1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You can see this stream on the Real-time hub **All data streams** page and on the **My data streams** page when the wizard finishes.
1. Select **Next** at the bottom of the page.
    
    :::image type="content" source="./media/add-source-azure-iot-hub/connection-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure IoT Hub connector." lightbox="./media/add-source-azure-iot-hub/connection-page-2.png":::        
1. On the **Review + connect** page, review settings, and select **Connect**.

    :::image type="content" source="./media/add-source-azure-iot-hub/review-create-page.png" alt-text="Screenshot that shows the Review + connect page for Azure IoT Hub connector." lightbox="./media/add-source-azure-iot-hub/review-create-page.png":::        

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream with the selected Azure IoT hub as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-iot-hub/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-iot-hub/review-create-success.png":::
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
