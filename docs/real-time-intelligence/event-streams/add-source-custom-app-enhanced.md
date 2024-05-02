---
title: Add custom app source to an eventstream
description: Learn how to add a custom app source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 05/01/2024
ms.search.form: Source and Destination
---

# Add custom app source to an eventstream

If you want to connect your own application with an eventstream, you can add a custom endpoint source. Then you can send data to the eventstream from your own application with the connection endpoint displayed as the custom endpoint. This article shows you how to add a custom app source to an eventstream.

## Prerequisite

Access to the Fabric **premium workspace** with **Contributor** or higher permissions.

## Add custom app data as a source

Follow these steps to add a sample data source:

1. To create a new eventstream, select **Eventstream** from the **Home** screen. Make sure the **Enhanced Capabilities (preview)** option is enabled.

   ![A screenshot of creating a new eventstream.](media/external-sources/new-eventstream.png)

1. To add custom app source, on the get-started page, select **Use custom endpoint**.

   ![A screenshot of selecting Use custom endpoint.](media/external-sources/use-custom-endpoint.png)

   Or, if you already have a published eventstream and want to add custom app data as a source, switch to **Edit** mode. Then select **Add source** in the ribbon, and select **Custom endpoint**.

   ![A screenshot of selecting Custom endpoint to add to an existing eventstream.](media\add-source-custom-app-enhanced\add-custom-app.png)

## Configure and connect to custom app source

[!INCLUDE [custom-app-source connector](./includes/custom-app-source-connector.md)]

## Publish and visualize custom app data

After you create the custom app source, you see it added to your eventstream on the canvas in **Edit mode**. To implement this newly added custom app source data, select **Publish**.

![A screenshot showing the eventstream in Edit mode, with the Publish button highlighted.](media\add-source-custom-app-enhanced\edit-mode.png)

Once you complete these steps, the custom app data is available for visualization in **Live view**.

![A screenshot showing the eventstream in Edit mode, with the Publish button highlighted.](media\add-source-custom-app-enhanced\live-view.png)

## Get connection strings and sample code

In the Live view **Details** pane, you can see three categories: **Basic**, **Keys**, and **Sample code**, and select from three protocol tabs: **Event hub**, **AMQP**, and **Kafka**. The **Keys** and **Sample code** information varies by protocol.

- **Basic** shows the name, description, type, and status of your custom endpoint.
  ![A screenshot showing the Basic information in the Details pane of the eventstream Live view.](media\add-source-custom-app-enhanced\details-event-basic.png)
- **Keys** shows connection strings for your custom endpoint, which you can copy and paste into your application.
  ![A screenshot showing the Keys information in the Details pane of the eventstream Live view.](media\add-source-custom-app-enhanced\details-event-keys.png)
- **Sample code** shows sample code you can refer to or copy and paste into your application, to push or pull event data to or from this eventstream.
  ![A screenshot showing the Sample code in the Details pane of the eventstream Live view.](media\add-source-custom-app-enhanced\details-event-sample.png)

The connection string is an event hub-compatible connection string you can use in your application to receive events from this eventstream. The **Event hub** format is the default format for the connection string, and is compatible with the Azure Event Hubs SDK. You can use this format to connect to eventstreams by using the Event Hubs protocol.

The following example shows what the connection string looks like in **Event hub** format:

*Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx*

The other two protocol formats you can select are **AMQP** and **Kafka**. Select these tabs in the **Details** pane to get customized **Keys** and **Sample code** for these protocols.

- The **AMQP** format is compatible with the AMQP 1.0 protocol, a standard messaging protocol that supports interoperability between different platforms and languages. You can use this format to connect to eventstreams by using the AMQP protocol.

- The **Kafka** format is compatible with the Apache Kafka protocol, a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use this format to connect to eventstreams by using the Kafka protocol.

You can choose the protocol format that suits your application needs and preferences, and copy and paste the connection string into your application. The provided sample code demonstrates how to send or receive events by using different protocols.

## Related content 

To learn how to add other sources to an eventstream, see the following articles:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Fabric workspace event](add-source-fabric-workspace.md) 
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data-enhanced.md)

To add a destination to an eventstream, see the following articles:

- [Route events to destinations ](add-manage-eventstream-destinations-enhanced.md)
- [Custom app destination](add-destination-custom-app-enhanced.md)
- [Derived stream destination](add-destination-derived-stream.md)
- [KQL Database destination](add-destination-kql-database-enhanced.md
- [Lakehouse destination](add-destination-lakehouse-enhanced.md)
- [Reflex destination](add-destination-reflex-enhanced.md)
- [Create an eventstream](create-manage-an-eventstream.md)
