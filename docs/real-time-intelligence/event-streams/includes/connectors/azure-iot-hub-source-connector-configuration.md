---
title: Azure IoT Hub connector for Fabric eventstreams
description: This file has the common content for configuring an Azure IoT Hub connector for Fabric eventstreams and real-time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 04/22/2026
ai-usage: ai-assisted
---

::: zone pivot="basic-features"
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

### Stream or source details

[!INCLUDE [stream-source-details](./stream-source-details.md)]

### Review and connect

On the **Review + connect** screen, review the summary, and select **Add** (Eventstream) or **Connect** (Real-Time hub).
::: zone-end

::: zone pivot="extended-features"
1. On the **Connect** page, for **Feature level**, select **Extended features (Preview)**.

    :::image type="content" source="./media/azure-iot-hub-source-connector/extended-new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/azure-iot-hub-source-connector/extended-new-connection-button.png":::

    If there's an existing connection to your Azure IoT Hub, select that existing connection, and then move on to the step to configure Azure IoT Hub data source.

1. In the **Connection settings** section, enter the name of your Azure IoT Hub:

    :::image type="content" source="./media/azure-iot-hub-source-connector/extended-iot-hub-name.png" alt-text="Screenshot that shows the connection settings for the IoT Hub with the name of the IoT Hub." :::
1. In the **Connection credentials** section, do these steps:
    1. If there's an existing connection, select it from the dropdown list. If not, confirm that **Create new connection** is selected for this option.
    1. For **Connection name**, enter a name for the connection to the IoT Hub.
    1. For **Data gateway**, select the appropriate option based on your IoT Hub network configuration:
       - If your IoT Hub is public, select **none**.
       - If your IoT Hub is under a private network and you want to connect through a streaming virtual network data gateway, select the streaming vNet data gateway (prefixed with **[Streaming vNet]**). You can select the refresh icon to get the newly created gateway listed.

       > [!NOTE]
       > If a data gateway is selected, skip the test connection step in this connection creation wizard.

    1. For **Authentication kind**, the default value is **Shared Access Key**.
    1. For **Shared Access Key Name**, enter the name of the shared access key.
    1. For **Shared Access Key**, enter the value of the shared access key.
    1. Select **Connect** at the bottom of the page.

        :::image type="content" source="./media/azure-iot-hub-source-connector/extended-connection-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/extended-connection-page-1.png":::

        To get the access key name and value, follow these steps:
        1. Navigate to the IoT Hub page for your Azure IoT Hub in the Azure portal.
        1. On the **IoT Hub** page, select **Shared access policies** under **Security settings** on the left navigation menu.
        1. Select a **policy name** from the list. Note down the policy name.
        1. Select the copy button next to the **Primary key**.

            :::image type="content" source="./media/azure-iot-hub-source-connector/extended-access-key-value.png" alt-text="Screenshot that shows the access key for an Azure IoT Hub." lightbox="./media/azure-iot-hub-source-connector/extended-access-key-value.png":::
1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the IoT Hub.
1. For **Starting position**, select where in the stream to start reading records.
1. (Optional) Expand **Advanced settings** to choose how to handle source data before it's streamed to Fabric:
    - Select **Yes** to serialize the data into a standardized format.
    - Select **No** to keep the data in its original format and pass it through without modification.

    Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/azure-iot-hub-source-connector/extended-stream-details.png" alt-text="Screenshot that shows the Stream details section for Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/extended-stream-details.png":::

1. On the **Review + connect** page, select **Add** now.

    :::image type="content" source="./media/azure-iot-hub-source-connector/extended-review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure IoT Hub connector." lightbox="./media/azure-iot-hub-source-connector/extended-review-create-page.png":::

### Stream or source details

[!INCLUDE [stream-source-details](./stream-source-details.md)]
::: zone-end


