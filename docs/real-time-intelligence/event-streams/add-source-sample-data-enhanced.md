---
title: Add a sample data source to an eventstream
description: Learn how to add a sample data source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 05/01/2024
ms.search.form: Source and Destination
---

# Add a sample data source to an eventstream

To get a better understanding of how an eventstream works, you can use the out-of-box sample data provided and send the data to the eventstream. This article shows you how to add the sample data source to an eventstream. 

## Prerequisites

- Access to the Fabric **premium workspace** with **Contributor** or higher permissions.

## Add sample data as a source

Follow these steps to add a sample data source:

1. To create a new eventstream, select **Eventstream** from the **Home** screen. Make sure the **Enhanced Capabilities (preview)** option is enabled.

   ![A screenshot of creating a new eventstream.](media/external-sources/new-eventstream.png)

1. To add sample data source, on the get-started page, select **Use sample data**.

   ![A screenshot of selecting Use sample data.](media/external-sources/use-sample-data.png)

   Or, if you already have a published eventstream and want to add sample data as a source, switch to **Edit** mode. Then select **Add source** in the ribbon, and select **Sample data**.

   ![A screenshot of selecting Sample data to add to an existing eventstream.](media\add-source-sample-data-enhanced\add-sample-data.png)

## Configure and connect to sample data

[!INCLUDE [sample-data-source-connector](./includes/sample-data-source-connector.md)]

## Publish and visualize sample data

After you create the sample data source, you see it added to your eventstream on the canvas in **Edit mode**. To implement this newly added sample data, select **Publish**.

![A screenshot showing the eventstream in Edit mode, with the Publish button highlighted.](media\add-source-sample-data-enhanced\edit-mode.png)

Once you complete these steps, sample data is available for visualization in **Live view**.

![A screenshot showing the eventstream in Edit mode, with the Publish button highlighted.](media\add-source-sample-data-enhanced\live-view.png)

## Related content 

To learn how to add other sources to an eventstream, see the following articles:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app-enhanced.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md) 

To add a destination to an eventstream, see the following articles:

- [Route events to destinations ](add-manage-eventstream-destinations-enhanced.md)
- [Custom app destination](add-destination-custom-app-enhanced.md)
- [Derived stream destination](add-destination-derived-stream.md)
- [KQL Database destination](add-destination-kql-database-enhanced.md
- [Lakehouse destination](add-destination-lakehouse-enhanced.md)
- [Reflex destination](add-destination-reflex-enhanced.md)
- [Create an eventstream](create-manage-an-eventstream.md)
