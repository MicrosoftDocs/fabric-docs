---
title: Add and manage eventstream sources
description: This article describes how to add and manage an event source in an eventstream item with Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom: build-2023
ms.date: 09/04/2023
ms.search.form: Event streams
---

# Add and manage an event source in an eventstream

Once you have created an eventstream, you can connect it to various data sources and destinations. The types of event sources that you can add to your eventstream include Azure Event Hubs, Azure IoT Hub, Sample data, and Custom app.

[!INCLUDE [preview-note](../../includes/preview-note.md)]

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- To add an Azure Event Hubs or Azure IoT Hub as eventstream source, you need to have appropriate permission to access its policy keys. They must be publicly accessible and not behind a firewall or secured in a virtual network.

## Supported sources

The following sources are supported by Fabric Eventstream:

| Sources          | Description |
| --------------- | ---------- |
| Azure Event Hubs | If you have an Azure event hub, you can ingest event hub data into Microsoft Fabric using Eventstream.  |
| Azure IoT Hub | If you have an Azure IoT hub, you can ingest IoT data into Microsoft Fabric using Eventstream.  |
| Sample data | You can choose **Yellow Taxi** or **Stock Market events** as a sample data source to test the data ingestion while setting up an eventstream. |
| Custom App | The custom app feature allows your applications or Kafka clients to connect to Eventstream using a connection string, enabling the smooth ingestion of streaming data into Eventstream. |

> [!NOTE]
>
> - The total count of sources and destinations for one eventstream is **11**.
> - Event data retention in an eventstream is **1 day**, with the potential to extend it and make it configurable in the future.

## Add an Azure event hub as a source

If you have an Azure event hub created with streaming data, follow these steps to add an Azure event hub as your eventstream source:

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then **Azure Event Hubs**.

1. Enter a source name for the new source and select a cloud connection to your Azure event hub.

   :::image type="content" source="./media/event-streams-source/eventstream-sources-event-hub.png" alt-text="Screenshot showing the Azure Event Hubs source configuration.":::

1. If you don’t have a cloud connection, select **Create new connection** to create one. To create a new connection, fill in the information of your Azure event hub on the **New connection** page.

   :::image type="content" source="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png" alt-text="Screenshot showing the cloud connection in event hub source.":::

   - **Connection name**: Enter a name for the cloud connection.
   - **Connection type**: The default value is `EventHub`.
   - **Event Hub namespace**: Enter the name of your Azure event hub namespace.
   - **Authentication**: Go to your Azure event hub and create a policy with `Manage` or `Listen` permission under **Share access policies**. Then use **policy name** and **primary key** as the **Shared Access Key Name** and **Shared Access Key**.

       :::image type="content" source="./media/add-manage-eventstream-sources/azure-event-hub-policy-key.png" alt-text="Screenshot showing the Azure event hub policy key." lightbox="./media/add-manage-eventstream-sources/azure-event-hub-policy-key.png":::

   - **Privacy level**: Choose a privacy level for the cloud connection.

1. After you create a cloud connection, select the refresh button, and then select the cloud connection you created.

   :::image type="content" source="./media/add-manage-eventstream-sources/cloud-connection-refresh.png" alt-text="Screenshot showing the cloud connection refresh.":::

1. Select a **Data format** of the incoming real-time events that you want to get from your Azure event hub.

   > [!NOTE]
   > The event streams feature supports the ingestion of events from Azure Event Hubs in JSON, Avro, and CSV (with header) data formats.

1. Select a **Consumer group** that can read the event data from your Azure event hub and then select **Add**.

After you have created the event hub source, you see it added to your eventstream on the canvas.

:::image type="content" source="./media/add-manage-eventstream-sources/event-hub-source-completed.png" alt-text="Screenshot showing the event hub source." lightbox="./media/add-manage-eventstream-sources/event-hub-source-completed.png":::

## Add an Azure IoT hub as a source

Follow these steps to add an Azure IoT hub as your eventstream source:

1. In the Eventstream editor, expand the **New source** drop-down menu within the node and choose **Azure IoT Hub**.

   :::image type="content" source="./media/add-iot-hub-source/add-iot-hub-source.png" alt-text="Screenshot that shows where to add an Azure IoT Hub source in the eventstream.":::

2. On the **Azure IoT Hub** configuration pane, enter the following details:

   :::image type="content" source="./media/add-iot-hub-source/iot-hub-configuration-pane.png" alt-text="Screenshot that shows where to configure Azure IoT Hub in the eventstream.":::

    1. **Source name**: Enter a name for your Azure IoT Hub, such as **iothub-source**.
    2. **Cloud connection**: Select an existing cloud connection that links your Azure IoT Hub to Microsoft Fabric. If you don't have one, proceed to step 3 to create a new cloud connection.
    3. **Data format**. Choose a data format (AVRO, JSON, or CSV) for streaming your IoT Hub data into the eventstream.
    4. **Consumer group**. Choose a consumer group from your Azure IoT Hub, or leave it as **$Default**. Then select **Add** to finish the Azure IoT Hub configuration.
    5. Once it's added successfully, you can see an Azure IoT Hub source added to your eventstream in the editor.

       :::image type="content" source="./media/add-iot-hub-source/successfully-added-iot-hub.png" alt-text="Screenshot that shows the Azure IoT Hub source in the Eventstream editor.":::

3. To create a new cloud connection for your Azure IoT Hub, follow these steps:

   :::image type="content" source="./media/add-iot-hub-source/create-new-cloud-connection.png" alt-text="Screenshot that shows where to create a new cloud connection.":::

    1. Select **Create new connection** from the drop down menu, and you're directed to the **Manage connections and gateway** page for creating a new cloud connection.

        :::image type="content" source="./media/add-iot-hub-source/add-new-cloud-connection.png" alt-text="Screenshot that shows where to configure a new cloud connection.":::

    2. **Connection name**. Enter a name for the new cloud connection, such as **iothub-connection**.
    3. **IoT Hub** and **Authentication**. Enter the authentication information for your Azure IoT Hub. You can find it under **Shared access policies** in the Azure portal. You must have appropriate permissions to access any of the IoT Hub endpoints.

       :::image type="content" source="./media/add-iot-hub-source/shared-access-key.png" alt-text="Screenshot that shows where to find the shared access key in the Azure portal.":::

    4. **General**. Keep **Organizational** as the Privacy level, and then select **Create** to create the new connection.
    5. Return to the Azure IoT Hub configuration pane and select **Refresh** to load the new cloud connection.

       :::image type="content" source="./media/add-iot-hub-source/refresh-iot-hub-connection.png" alt-text="Screenshot that shows where to refresh the cloud connection for Azure IoT Hub.":::

Once the Azure IoT Hub is added to your eventstream, select **Preview data** to verify successful configuration. You should be able to preview incoming data to your eventstream.

:::image type="content" source="./media/add-iot-hub-source/preview-iot-hub-data.png" alt-text="Screenshot that shows where to preview IoT Hub data.":::

## Add a sample data as a source

To get a better understanding of how an eventstream works, you can use the out-of-box sample data provided and send data to the eventstream. Follow these steps to add a sample data source:

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then **Sample data**.

1. On the right pane, enter a source name to appear on the canvas, select the sample data you want to add to your eventstream, and then select **Add**.
   - **Yellow Taxi**: sample taxi data with a preset schema that includes fields such as pickup time, drop-off time, distance, total fee, and more.
   - **Stock Market**: sample data of a stock exchange with a preset schema column such as time, symbol, price, volume and more.

       :::image type="content" source="./media/event-streams-source/eventstream-sources-sample-data.png" alt-text="Screenshot showing the sample data source configuration.":::

1. When the sample data source is added successfully, you can find it on the canvas and navigation pane.

To verify if the sample data is added successfully, select **Data preview** in the bottom pane.

:::image type="content" source="./media/add-manage-eventstream-sources/sample-data-source-completed.png" alt-text="Screenshot showing the sample data source." lightbox="./media/add-manage-eventstream-sources/sample-data-source-completed.png":::

## Add custom application as a source

If you want to connect your own application with an eventstream, you can add a custom app source. Then, send data to the eventstream with your own application with the connection endpoint exposed in the custom app. Follow these steps to add a custom app source:

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then **Custom App**.

1. Enter a **Source name** for the custom app and select **Add**.

   :::image type="content" source="./media/event-streams-source/eventstream-sources-custom-app.png" alt-text="Screenshot showing the custom app source configuration.":::

Once you've successfully added the custom app, you can view the information of the custom app such as connection string and use it in your application.

The endpoint exposed by the custom app is in the connection string, which is an **event hub compatible connection string**. You can use it in your application to send events to your eventstream. The following example shows what the connection string looks like:

*`Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx`*

:::image type="content" source="./media/add-manage-eventstream-sources/custom-app-source-completed.png" alt-text="Screenshot showing the custom app source." lightbox="./media/add-manage-eventstream-sources/custom-app-source-completed.png" :::

## Manage source

- **Edit/remove**: You can select an eventstream source to edit or remove either through the navigation pane or canvas. When you select **Edit**, the edit pane opens in the right of the main editor.

   :::image type="content" source="./media/add-manage-eventstream-sources/source-modification-deletion.png" alt-text="Screenshot showing the source modification and deletion." lightbox="./media/add-manage-eventstream-sources/source-modification-deletion.png" :::

- **Regenerate key for a custom app**: If you want to regenerate a new connection key for your application, select one of your custom app sources on the canvas and select **Regenerate** to get a new connection key.

   :::image type="content" source="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" alt-text="Screenshot showing how to regenerate a key." lightbox="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" :::

## Next steps

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
