---
title: Add a sample data source to an eventstream
description: Learn how to add a sample data source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add a sample data source to an eventstream

To get a better understanding of how an eventstream works, you can use the out-of-box sample data provided and send the data to the eventstream. This article shows you how to add the sample data source to an eventstream. 

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  

## Prerequisites

- Access to the Fabric **premium workspace** with **Contributor** or higher permissions.

[!INCLUDE [enhanced-capabilities-preview-note](./includes/enhanced-capabilities-preview-note.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Add sample data as a source

Follow these steps to add a sample data source:

1. To create a new eventstream, select **Eventstream** from the **Home** screen. Make sure the **Enhanced Capabilities (preview)** option is enabled.

   ![A screenshot of creating a new eventstream.](media/external-sources/new-eventstream.png)

1. To add sample data source, on the get-started page, select **Use sample data**.

   ![A screenshot of selecting Use sample data.](media/external-sources/use-sample-data.png)

   Or, if you already have a published eventstream and want to add sample data as a source, switch to **Edit** mode. Then select **Add source** in the ribbon, and select **Sample data**.

   ![A screenshot of selecting Sample data to add to an existing eventstream.](media\add-source-sample-data-enhanced\add-sample-data.png)

1. On the **TridentStreaming_SampleData** screen, enter a **Source name**, select the source data you want under **Sample data**, and then select **Add**.

   - **Bicycles**: Sample bicycles data with a preset schema that includes fields such as BikepointID, Street, Neighborhood, and Latitude.
   - **Yellow Taxi**: Sample taxi data with a preset schema that includes fields such as pickup time, drop-off time, distance, and total fee.
   - **Stock Market**: Sample data of a stock exchange with preset schema columns such as time, symbol, price, and volume.

   ![A screenshot showing the choices on the Sample data screen.](media\add-source-sample-data-enhanced\sample-sources.png)

1. After you create the sample data source, you see it added to your eventstream on the canvas in **Edit mode**. To implement this newly added sample data, select **Publish**.

   ![A screenshot showing the eventstream in Edit mode, with the Publish button highlighted.](media\add-source-sample-data-enhanced\edit-mode.png)

Once you complete these steps, the sample data is available for visualization in **Live view**.

![A screenshot showing the eventstream in Live view.](media\add-source-sample-data-enhanced\live-view.png)

## Related content 

To learn how to add other sources to an eventstream, see the following articles:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md) 


::: zone-end

::: zone pivot="standard-capabilities"



## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add sample data as a source

To get a better understanding of how an eventstream works, you can use the out-of-box sample data provided and send data to the eventstream. Follow these steps to add a sample data source:

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then **Sample data**.

1. On the right pane, enter a source name to appear on the canvas, select the sample data you want to add to your eventstream, and then select **Add**.
   - **Bicycles**: sample bicycles data with a preset schema that includes fields such as BikepointID, Street, Neighborhood, Latitude, and more.
   - **Yellow Taxi**: sample taxi data with a preset schema that includes fields such as pickup time, drop-off time, distance, total fee, and more.
   - **Stock Market**: sample data of a stock exchange with a preset schema column such as time, symbol, price, volume, and more.

       :::image type="content" source="./media/event-streams-source/eventstream-sources-sample-data.png" alt-text="Screenshot showing the sample data source configuration." lightbox="./media/event-streams-source/eventstream-sources-sample-data.png":::

1. When the sample data source is added successfully, you can find it on the canvas and navigation pane.

To verify if the sample data is added successfully, select **Data preview** in the bottom pane.

:::image type="content" source="./media/add-manage-eventstream-sources/sample-data-source-completed.png" alt-text="Screenshot showing the sample data source." lightbox="./media/add-manage-eventstream-sources/sample-data-source-completed.png":::

## Related content 

To learn how to add other sources to an eventstream, see the following articles:

- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Custom endpoint](add-source-custom-app.md)

::: zone-end