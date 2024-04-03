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
This article shows you how to add an Azure Event Hubs source to an eventstream. 

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- You need to have appropriate permission to get event hub's access keys. The event hub must be publicly accessible and not behind a firewall or secured in a virtual network.

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
