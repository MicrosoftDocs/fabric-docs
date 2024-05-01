---
title: Add and manage eventstream sources
description: Learn how to add and manage an event source in an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Source and Destination
---

# Add and manage an event source in an eventstream

Once you have created an eventstream, you can connect it to various data sources and destinations. The types of event sources that you can add to your eventstream include Azure Event Hubs, Azure IoT Hub, Sample data, and Custom app.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- To add an Azure Event Hubs or Azure IoT Hub as eventstream source, you need to have appropriate permission to access its policy keys. They must be publicly accessible and not behind a firewall or secured in a virtual network.

## Supported sources

The following sources are supported by Fabric eventstreams. Use links in the table to navigate to articles that provide more details about adding specific sources.

| Sources          | Description |
| --------------- | ---------- |
| [Azure Event Hubs](add-source-azure-event-hubs.md) | If you have an Azure event hub, you can ingest event hub data into Microsoft Fabric using Eventstream.  |
| [Azure IoT Hub](add-source-azure-iot-hub.md) | If you have an Azure IoT hub, you can ingest IoT data into Microsoft Fabric using Eventstream.  |
| [Sample data](add-source-sample-data.md) | You can choose **Bicycles**, **Yellow Taxi** or **Stock Market events** as a sample data source to test the data ingestion while setting up an eventstream. |
| [Custom App](add-source-custom-app.md) | The custom app feature allows your applications or Kafka clients to connect to Eventstream using a connection string, enabling the smooth ingestion of streaming data into Eventstream. |

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Manage a source

- **Edit/remove**: You can select an eventstream source to edit or remove either through the navigation pane or canvas. When you select **Edit**, the edit pane opens in the right of the main editor.

   :::image type="content" source="./media/add-manage-eventstream-sources/source-modification-deletion.png" alt-text="Screenshot showing the source modification and deletion." lightbox="./media/add-manage-eventstream-sources/source-modification-deletion.png" :::

- **Regenerate key for a custom app**: If you want to regenerate a new connection key for your application, select one of your custom app sources on the canvas and select **Regenerate** to get a new connection key.

   :::image type="content" source="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" alt-text="Screenshot showing how to regenerate a key." lightbox="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" :::

## Related content

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
