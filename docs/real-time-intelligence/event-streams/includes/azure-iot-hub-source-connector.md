---
title: Azure IoT Hub connector for Fabric eventstreams
description: This include file has the common content for configuring an Azure IoT Hub connector for Fabric eventstreams and real-time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 11/18/2024
---

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-iot-hub-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page with the link for a new connection highlighted." lightbox="./media/azure-iot-hub-source-connector/new-connection-button.png":::

    If there's an existing connection to your IoT hub, select that existing connection, and then move on to configuring **Data format** in the following steps.

    :::image type="content" source="./media/azure-iot-hub-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an IoT hub." lightbox="./media/azure-iot-hub-source-connector/existing-connection.png":::

1. In the **Connection settings** section, for **IoT Hub**, specify the name of your IoT hub.

    :::image type="content" source="./media/azure-iot-hub-source-connector/iot-hub-name.png" alt-text="Screenshot that shows connection settings with the name of an IoT hub." :::

1. In the **Connection credentials** section, follow these steps:

    1. If there's an existing connection, select it from the dropdown list. If not, confirm that **Create new connection** is selected for this option.

    1. For **Connection name**, enter a name for the connection to the IoT hub.

    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.

    1. For **Shared Access Key Name**, enter the name of the shared access key.

    1. For **Shared Access Key**, enter the value of the shared access key.

        To get the name and value of the shared access key, follow these steps:

        1. Go to the page for your IoT hub in the Azure portal.
        1. On the left pane, under **Security settings**, select **Shared access policies**.
        1. Select a policy name from the list. Note down the policy name.
        1. Select the copy button next to the **Primary key**.

        :::image type="content" source="./media/azure-iot-hub-source-connector/access-key-value.png" alt-text="Screenshot that shows the access key for an IoT hub." lightbox="./media/azure-iot-hub-source-connector/access-key-value.png":::

1. Select **Connect**.

    :::image type="content" source="./media/azure-iot-hub-source-connector/connection-page-1.png" alt-text="Screenshot that shows the Connect button under connection credentials for an Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/connection-page-1.png":::

1. For **Consumer group**, enter the name of the consumer group. The default consumer group for the IoT hub is **$Default**.

1. For **Data format**, select a data format for the incoming real-time events that you want to get from your IoT hub. You can select from JSON, Avro, and CSV data formats. Then select **Connect**.

1. In the **Stream details** section on the right, select the pencil icon under **Source name**, and then enter a name for the source. This step is optional.

1. Select **Next** at the bottom of the page.

    :::image type="content" source="./media/azure-iot-hub-source-connector/connection-page-2.png" alt-text="Screenshot that shows configuration settings and stream details for an Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/connection-page-2.png":::

1. On the **Review and create** page, review your settings, and then select **Add**.

    :::image type="content" source="./media/azure-iot-hub-source-connector/review-create-page.png" alt-text="Screenshot that shows the page for reviewing settings and adding an Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/review-create-page.png":::

