---
title: Add Azure Event Hubs source to an eventstream
description: Learn how to add an Azure Event Hubs source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 04/03/2024
ms.search.form: Source and Destination
---

# Add Azure Event Hubs source to an eventstream
This article shows you how to add an Azure Event Hubs source to an eventstream.  If you want to use enhanced capabilities that are in preview, see the content in the **Enhanced Capabilities** tab. Otherwise, use the content in the **Standard Capabilities** tab. For information about enhanced capabilities that are in preview, see [Enhanced capabilities](new-capabilities.md).

# [Enhanced capabilities (Preview)](#tab/enhancedcapabilities)

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located. 
- You need to have appropriate permission to get event hub's access keys. The event hub must be publicly accessible and not behind a firewall or secured in a virtual network. 

## Add Azure Event Hubs as a source 
If you have an Azure event hub created with streaming data, follow these steps to add an Azure event hub as your eventstream source: 

1. Create an eventstream with enhanced capabilities. 
1. If you haven't added any source to your eventstream yet, select **Add external source** on the **Get started** page. 

    :::image type="content" source="./media/add-source-tile-menu/add-external-source-tile.png" alt-text="Screenshot that shows a new eventstream with Add External Source tile selected.":::

    If you're adding an Azure event hub as a source to an already published eventstream, switch to **Edit** mode, select **Add source** on the ribbon, and then select **External sources**. 

    :::image type="content" source="./media/add-source-tile-menu/add-source-external-sources-menu.png" alt-text="Screenshot that shows Add External Source menu for a published eventstream.":::

## Configure Azure Event Hubs connector
[!INCLUDE [azure-event-hubs-connector](./includes/azure-event-hubs-source-connector.md)]

You see that the Event Hubs source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Azure event hub, select **Publish** on the ribbon.

:::image type="content" source="./media/add-source-azure-event-hubs-enhanced/publish.png" alt-text="Screenshot that shows the editor with Publish button selected.":::
    
After you complete these steps, the Azure event hub is available for visualization in the **Live view**. Select the **Event hub** tile in the diagram to see the page similar to the following one.

:::image type="content" source="./media/add-source-azure-event-hubs-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app-enhanced.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data-enhanced.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)

# [Standard capabilities](#tab/standardcapabilities)

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- You need to have appropriate permission to get event hub's access keys. The event hub must be publicly accessible and not behind a firewall or secured in a virtual network.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add an Azure event hub as a source

If you have an Azure event hub created with streaming data, follow these steps to add an Azure event hub as your eventstream source:

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then **Azure Event Hubs**.

1. Enter a source name for the new source and select a cloud connection to your Azure event hub.

   :::image type="content" source="./media/event-streams-source/eventstream-sources-event-hub.png" alt-text="Screenshot showing the Azure Event Hubs source configuration.":::

1. If you don’t have a cloud connection, select **Create new connection** to create one. To create a new connection, fill in the **Connection settings** and **Connection credentials** of your Azure event hub, and then select **Create**.

   :::image type="content" source="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png" alt-text="Screenshot showing the cloud connection in event hub source." lightbox="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png":::

   - **Event Hub namespace**: Enter the name of your Azure event hub namespace.
   - **Event Hub**: Enter the name of your Azure event hub in the Azure portal.
   - **Connection name**: Enter a name for the cloud connection.
   - **Shared access key name** and **Shared access key**: Go to your Azure event hub and create a policy with `Manage` or `Listen` permission under **Share access policies**. Then use **policy name** and **primary key** as the **Shared Access Key Name** and **Shared Access Key**.

       :::image type="content" source="./media/add-manage-eventstream-sources/azure-event-hub-policy-key.png" alt-text="Screenshot showing the Azure event hub policy key." lightbox="./media/add-manage-eventstream-sources/azure-event-hub-policy-key.png":::

1. After you create a cloud connection, select the refresh button, and then select the cloud connection you created.

   :::image type="content" source="./media/add-manage-eventstream-sources/cloud-connection-refresh.png" alt-text="Screenshot showing the cloud connection refresh.":::

1. Select a **Data format** of the incoming real-time events that you want to get from your Azure event hub.

   > [!NOTE]
   > The event streams feature supports the ingestion of events from Azure Event Hubs in JSON, Avro, and CSV (with header) data formats.

1. Select a **Consumer group** that can read the event data from your Azure event hub and then select **Add**.

After you have created the event hub source, you see it added to your eventstream on the canvas.

:::image type="content" source="./media/add-manage-eventstream-sources/event-hub-source-completed.png" alt-text="Screenshot showing the event hub source." lightbox="./media/add-manage-eventstream-sources/event-hub-source-completed.png":::

## Related content

To learn how to add other sources to an eventstream, see the following articles: 
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Sample data](add-source-sample-data.md)
- [Custom app](add-source-custom-app.md)

To add a destination to the eventstream, see the following articles: 
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
- [Create and manage an eventstream](./create-manage-an-eventstream.md)

---