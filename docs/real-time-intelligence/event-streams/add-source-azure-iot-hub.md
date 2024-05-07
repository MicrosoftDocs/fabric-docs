---
title: Add Azure IoT Hub source to an eventstream
description: Learn how to add an Azure IoT Hub source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 04/03/2024
ms.search.form: Source and Destination
---

# Add Azure IoT Hub source to an eventstream
This article shows you how to add an Azure IoT Hub source to an eventstream. If you want to use enhanced capabilities that are in preview, see the content in the **Enhanced Capabilities** tab. Otherwise, use the content in the **Standard Capabilities** tab. For information about enhanced capabilities that are in preview, see [Enhanced capabilities](new-capabilities.md).

# [Enhanced capabilities (preview)](#tab/enhancedcapabilities)

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located. 
- You need to have appropriate permission to get IoT hub's access keys. The IoT hub must be publicly accessible and not behind a firewall or secured in a virtual network. 

[!INCLUDE [enhanced-capabilities-preview-note](./includes/enhanced-capabilities-preview-note.md)]

## Add Azure IoT Hub as a source 
Follow these steps to add an Azure IoT hub as your eventstream source: 

1. Create an eventstream with enhanced capabilities. 
1. If you haven't added any source to your eventstream yet, select **Add external source** on the **Get started** page. 

    :::image type="content" source="./media/add-source-tile-menu/add-external-source-tile.png" alt-text="Screenshot that shows a new eventstream with Add External Source tile selected.":::

    If you're adding an Azure IoT hub as a source to an already published eventstream, switch to **Edit** mode, select **Add source** on the ribbon, and then select **External sources**. 

    :::image type="content" source="./media/add-source-tile-menu/add-source-external-sources-menu.png" alt-text="Screenshot that shows Add External Source menu for a published eventstream.":::

## Configure Azure IoT Hub connector

[!INCLUDE [azure-iot-hub-connector](./includes/azure-iot-hub-source-connector.md)]

You see that the Azure IoT Hub source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Azure IoT hub, select **Publish** on the ribbon.

:::image type="content" source="./media/add-source-azure-iot-hub-enhanced/publish.png" alt-text="Screenshot that shows the editor with Publish button selected.":::
    
After you complete these steps, the Azure IoT hub is available for visualization in the **Live view**. Select the **IoT hub** tile in the diagram to see the page similar to the following one.

:::image type="content" source="./media/add-source-azure-iot-hub-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)

# [Standard capabilities](#tab/standardcapabilities)

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- You need to have appropriate permission to get IoT hub's access keys. The IoT hub must be publicly accessible and not behind a firewall or secured in a virtual network.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

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

    1. Select **Create new connection** from the drop-down menu, fill in the **Connection settings** and **Connection credentials** of your Azure IoT Hub, and then select **Create**.

        :::image type="content" source="./media/add-iot-hub-source/add-new-cloud-connection.png" alt-text="Screenshot that shows where to configure a new cloud connection." lightbox="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png":::

    2. **IoT Hub**. Enter the name of the IoT Hub in the Azure portal.
    3. **Connection name**. Enter a name for the new cloud connection, such as **iothub-connection**.
    4. **Shared access key name** and **Shared access key**. Enter the connection credentials for your Azure IoT Hub. You can find it under **Shared access policies** in the Azure portal. You must have appropriate permissions to access any of the IoT Hub endpoints.

       :::image type="content" source="./media/add-iot-hub-source/shared-access-key.png" alt-text="Screenshot that shows where to find the shared access key in the Azure portal." lightbox="./media/add-iot-hub-source/shared-access-key.png":::

    5. Return to the Azure IoT Hub configuration pane and select **Refresh** to load the new cloud connection.

       :::image type="content" source="./media/add-iot-hub-source/refresh-iot-hub-connection.png" alt-text="Screenshot that shows where to refresh the cloud connection for Azure IoT Hub.":::

Once the Azure IoT Hub is added to your eventstream, select **Preview data** to verify successful configuration. You should be able to preview incoming data to your eventstream.

   :::image type="content" source="./media/add-iot-hub-source/preview-iot-hub-data.png" alt-text="Screenshot that shows where to preview IoT Hub data." lightbox="./media/add-iot-hub-source/shared-access-key.png":::


## Related content

To learn how to add other sources to an eventstream, see the following articles: 
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Sample data](add-source-sample-data.md)
- [Custom app](add-source-custom-app.md)

To add a destination to the eventstream, see the following articles: 
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
- [Create and manage an eventstream](./create-manage-an-eventstream.md)

---