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

Once you have created an eventstream, you can connect it to various data sources and destinations. If you want to use enhanced capabilities that are in preview, see the content in the **Enhanced Capabilities** tab. Otherwise, use the content in the **Standard Capabilities** tab. For information about enhanced capabilities that are in preview, see [Enhanced capabilities](new-capabilities.md).

# [Enhanced capabilities (Preview)](#tab/enhancedcapabilities)

Once you create an eventstream, you can connect it to various data sources and destinations.

Eventstream not only allows you to stream data from Microsoft sources, but also supports ingestion from third-party platforms like Google Cloud and Amazon Kinesis with new messaging connectors. This expanded capability offers seamless integration of external data streams into Fabric, providing greater flexibility and enabling you to gain real-time insights from multiple sources.

In this article, you learn about the event sources that you can add to an eventstream with enhanced capabilities that are in preview.

[!INCLUDE [enhanced-capabilities-preview-note](./includes/enhanced-capabilities-preview-note.md)]


## Prerequisites

- Access to the Fabric **premium workspace** for your workspace with **Contributor** or higher permissions.
- Prerequisites specific to each source that are documented in the following source-specific articles.

## Supported sources

Fabric event streams with enhanced capabilities support the following sources. Each article provides details and instructions for adding specific sources.

- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub-enhanced.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [Azure Cosmos DB CDC](add-source-azure-cosmos-db-change-data-capture.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md)
- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Confluent Cloud Kafka](add-source-confluent-kafka.md)
- [Fabric workspace events](add-source-fabric-workspace.md)
- [Azure blob storage events](add-source-azure-blob-storage.md)
- [Sample data](add-source-sample-data-enhanced.md)
- [Custom endpoint](add-source-custom-app-enhanced.md) 

## Related content

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations-enhanced.md)

# [Standard capabilities](#tab/standardcapabilities)

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- To add an Azure Event Hubs or Azure IoT Hub as eventstream source, you need to have appropriate permission to access its policy keys. They must be publicly accessible and not behind a firewall or secured in a virtual network.

## Supported sources

The following sources are supported by Fabric event streams. Use links in the table to navigate to articles that provide more details about adding specific sources.

| Sources          | Description |
| --------------- | ---------- |
| [Azure Event Hubs](add-source-azure-event-hubs.md) | If you have an Azure event hub, you can ingest event hub data into Microsoft Fabric using Eventstream.  |
| [Azure IoT Hub](add-source-azure-iot-hub.md) | If you have an Azure IoT hub, you can ingest IoT data into Microsoft Fabric using Eventstream.  |
| [Sample data](add-source-sample-data.md) | You can choose **Bicycles**, **Yellow Taxi**, or **Stock Market events** as a sample data source to test the data ingestion while setting up an eventstream. |
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

---