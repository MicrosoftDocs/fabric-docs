---
title: Azure IoT Hub connector for Fabric event streams
description: This include files has the common content for configuring an Azure IoT Hub connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

1. On the **Select a data source** page, select **Azure IoT Hub**. 

    :::image type="content" source="./media/azure-iot-hub-source-connector/select-azure-iot-hub.png" alt-text="Screenshot that shows the selection of Azure IoT Hub as the source type in the Get events wizard." lightbox="./media/azure-iot-hub-source-connector/select-azure-iot-hub.png":::
1. On the **Connect** page, follow these steps:
    1. In the **Connection settings** section, for **IoT Hub**, specify the name of your Azure IoT hub.
    1. If there's an existing connection to the Azure IoT hub, you see the **Connect** page as shown in the following image. Otherwise, move on to the next step.

        :::image type="content" source="./media/azure-iot-hub-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure IoT hub." lightbox="./media/azure-iot-hub-source-connector/existing-connection.png":::        

        Select **Edit connection** to edit the connection settings to the Azure IoT hub. 
    1. In the **Connection credentials** section, do these steps:
        1. If there's an existing connection, select it from the drop-down list. If not, confirm that **Create new connection** is selected for this option.
        1. For **Connection name**, enter a name for the connection to the IoT hub.
        1. For **Authentication method**, confirm that **Shared Access Key** is selected.
        1. For **Shared Access Key Name**, enter the name of the shared access key. 
        1. For **Shared Access Key**, enter the value of the shared access key.
            
            :::image type="content" source="./media/azure-iot-hub-source-connector/connection-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/connection-page-1.png":::

            1. Select **Go to resource** link, which takes you to the IoT Hub page for your Azure IoT hub.
            1. On the **IoT Hub** page, select **Shared access policies** on the left navigation menu.
            1. Select a **policy name** from the list. Note down the policy name.
            1. Select the copy button next to the **Primary key**. 
        
                :::image type="content" source="./media/azure-iot-hub-source-connector/access-key-value.png" alt-text="Screenshot that shows the access key for an Azure IoT Hub." lightbox="./media/azure-iot-hub-source-connector/access-key-value.png":::                        
        1. For **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the IoT hub. 
        1. For **Data format**, select a data format of the incoming real-time events that you want to get from your Azure IoT hub. You can select from JSON, Avro, and CSV data formats, and then select Connect.
        
            :::image type="content" source="./media/azure-iot-hub-source-connector/connection-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/connection-page-2.png":::        
    1. Select **Connect** at the bottom of the page. 
    1. Once the connection is successful, select **Next**. 
1. On the **Review and create** page, review settings, and select **Create source**. 

    :::image type="content" source="./media/azure-iot-hub-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/review-create-page.png":::        
1. After the creation is successful, you can **Close** the wizard or **Open the eventstream** that was created. 

    :::image type="content" source="./media/azure-iot-hub-source-connector/review-create-success.png" alt-text="Screenshot that shows the Review and create page for Azure IoT Hub connector after the creation of source is successful." lightbox="./media/azure-iot-hub-source-connector/review-create-success.png":::            

### Existing connection


### Get the access key

