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
1. If there's an existing connection to your Azure IoT hub, select that existing connection as shown in the following image, and then move on to the step to configure **Data format** in the following steps.

    :::image type="content" source="./media/azure-iot-hub-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure IoT hub." lightbox="./media/azure-iot-hub-source-connector/existing-connection.png":::    
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-iot-hub-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/azure-iot-hub-source-connector/new-connection-button.png":::     
1. In the **Connection settings** section, for **IoT Hub**, specify the name of your Azure IoT hub.

    :::image type="content" source="./media/azure-iot-hub-source-connector/iot-hub-name.png" alt-text="Screenshot that shows the connection settings for the IoT hub with the name of the IoT hub." :::        
1. In the **Connection credentials** section, do these steps:
    1. If there's an existing connection, select it from the drop-down list. If not, confirm that **Create new connection** is selected for this option.
    1. For **Connection name**, enter a name for the connection to the IoT hub.
    1. For **Authentication method**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key. 
    1. For **Shared Access Key**, enter the value of the shared access key.
    1. Select **Connect** at the bottom of the page.1. 
        
        :::image type="content" source="./media/azure-iot-hub-source-connector/connection-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/connection-page-1.png":::

        To get the access key name and value, follow these steps: 
        1. Navigate to the IoT Hub page for your Azure IoT hub in the Azure portal. 
        1. On the **IoT Hub** page, select **Shared access policies** on the left navigation menu.
        1. Select a **policy name** from the list. Note down the policy name.
        1. Select the copy button next to the **Primary key**. 
    
            :::image type="content" source="./media/azure-iot-hub-source-connector/access-key-value.png" alt-text="Screenshot that shows the access key for an Azure IoT Hub." lightbox="./media/azure-iot-hub-source-connector/access-key-value.png":::                        
1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the IoT hub. 
1. For **Data format**, select a data format of the incoming real-time events that you want to get from your Azure IoT hub. You can select from JSON, Avro, and CSV data formats, and then select Connect.
1. Select **Next** at the bottom of the page. 
    
    :::image type="content" source="./media/azure-iot-hub-source-connector/connection-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/connection-page-2.png":::        
1. On the **Review and create** page, review settings, and select **Add**. 

    :::image type="content" source="./media/azure-iot-hub-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/review-create-page.png":::        

