---
title: Add custom app source to an eventstream
description: Learn how to add a custom app source to an eventstream for sending real-time events with multiple protocols, like the popular Apache Kafka protocol.
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

# Add custom endpoint source to an eventstream

If you want to connect your own application with an eventstream, you can add a custom endpoint (i.e., Custom App in standard capability) source. Then you can send real-time events to the eventstream from your own application with the connection endpoint exposed on the custom endpoint (i.e., Custom App in standard capability). Furthermore, with the Apache Kafka protocol available as an option for custom endpoints (i.e., Custom App in standard capability), you can send real-time events using the Apache Kafka protocol. This article shows you how to add a custom endpoint (i.e., Custom App in standard capability) source to an eventstream.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  


## Prerequisites

- Access to the Fabric **premium workspace** with **Contributor** or higher permissions.

 

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add custom endpoint data as a source

Follow these steps to add a custom endpoint source:

1. To create a new eventstream, select **Eventstream** from the **Home** screen. Make sure the **Enhanced capabilities** option is enabled.

   ![A screenshot of creating a new eventstream.](media/external-sources/new-eventstream.png)

1. To add custom endpoint source, on the get-started page, select **Use custom endpoint**.

   ![A screenshot of selecting Use custom endpoint.](media/external-sources/use-custom-endpoint.png)

   Or, if you already have a published eventstream and want to add custom endpoint data as a source, switch to **Edit** mode. Then select **Add source** in the ribbon, and select **Custom endpoint**.

   ![A screenshot of selecting Custom endpoint to add to an existing eventstream.](media\add-source-custom-app-enhanced\add-custom-app.png)

2. On the **Custom endpoint** screen, enter a name for the custom source under **Source name**, and then select **Add**.

   ![A screenshot showing the Custom endpoint screen with the Add button highlighted.](media\add-source-custom-app-enhanced\add.png)

3. After you create the custom endpoint source, you see it added to your eventstream on the canvas in **Edit mode**. To implement this newly added custom app source data, select **Publish**.

   ![A screenshot showing the eventstream in Edit mode, with the Publish button highlighted.](media\add-source-custom-app-enhanced\edit-mode.png)

Once you complete these steps, the custom endpoint data is available for visualization in **Live view**.

![A screenshot showing the eventstream in Live view.](media\add-source-custom-app-enhanced\live-view.png)

## Get endpoint details in Details pane to send events

The **Details** pane has three protocol tabs: **Event Hub**, **AMQP**, and **Kafka**. Each protocol tab has three pages: **Basics**, **Keys**, and **Sample code** which offer the endpoint details with the corresponding protocol for connecting. 

**Basic** shows the name, description, type, and status of your custom endpoint. 

 <img src="media\add-source-custom-app-enhanced\details-event-basic.png" alt="[A screenshot showing the Basic information in the Details pane of the eventstream Live view" width="600" />


**Keys** and **Sample code** pages provide you with the connection keys information and the sample code with the corresponding keys embedded that you can use to stream the events to your eventstream. The Keys and Sample code information varies by protocol.

### Event hub

The **Keys** in the Event hub protocol format contain information related to an event hub connection string, including the **Event hub name**, **Shared access key name**, **Primary key**, and **Connection string-primary key**. The Event hub format is the default for the connection string and works with Azure Event Hubs SDK. This format allows you to connect to your eventstream via the Event Hubs protocol.
The following example shows what the connection string looks like in **Event hub** format:

*Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxx*

<img src="media\add-source-custom-app-enhanced\details-event-keys.png" alt="[A screenshot showing the Keys information in the Details pane of the eventstream Live view]" width="900" />

The **Sample code** page in Event Hubs tab offers ready-to-use code with the required connection keys information in Event hub included. Simply copy and paste it into your application for use.

<img src="media\add-source-custom-app-enhanced\details-event-sample.png" alt="[A screenshot showing the Sample code in the Details pane of the eventstream Live view]" width="900" />

<a name="kafka-enhanced-capabilities"></a>

### Kafka

The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use the **Keys** and **Sample code** in Kafka protocol format to connect to your eventstream and stream the events.

<img src="media\add-source-custom-app-enhanced\details-kafka-keys.png" alt="[A screenshot showing the kafka keys in the Details pane of the eventstream Live view]" width="900" />

Likewise, the **Sample code** page in Kafka tab provides you with ready-made code, including the necessary connection keys in Kafka format. Simply copy it for your use.

<img src="media\add-source-custom-app-enhanced\details-kafka-sample-code.png" alt="[A screenshot showing the kafka sample code in the Details pane of the eventstream Live view]" width="900" />

### AMQP

The **AMQP** format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between different platforms and languages. You can use this format to connect to your eventstream using the AMQP protocol.

<img src="media\add-source-custom-app-enhanced\details-amqp-keys.png" alt="[A screenshot showing the amqp keys in the Details pane of the eventstream Live view]" width="900" />

The **Sample code** page in AMQP tab also provides you with the ready-to-use code with connection keys information in AMQP format. 

<img src="media\add-source-custom-app-enhanced\details-amqp-sample-code.png" alt="[A screenshot showing the amqp sample code in the Details pane of the eventstream Live view]" width="900" />

You can choose the protocol format that suits your application needs and preferences and copy and paste the connection string into your application. You can also refer to or copy the sample code that we provide in the Sample code tab, which shows how to send or receive events using different protocols.

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
- [Sample data](add-source-sample-data.md)

::: zone-end

::: zone pivot="standard-capabilities"



## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add a custom app  as a source

If you want to connect your own application with an eventstream, you can add a custom app source. Then, send data to the eventstream with your own application with the connection endpoint exposed in the custom app. Follow these steps to add a custom app source:

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then **Custom App**.

1. Enter a **Source name** for the custom app and select **Add**.

   :::image type="content" source="./media/event-streams-source\eventstream-sources-custom-app.png" alt-text="Screenshot showing the custom app source configuration." lightbox="./media/event-streams-source/eventstream-sources-custom-app.png":::

1. After you have successfully created the custom application source, you can switch and view the following information in the **Details** tab in the lower pane:

   :::image type="content" source="./media/add-manage-eventstream-sources/custom-app-source.png" alt-text="Screenshot showing the custom app source." lightbox="./media/add-manage-eventstream-sources/custom-app-source.png":::

## Get endpoint details in Details pane to send events

The **Details** pane has three protocol tabs: **Event Hub**, **AMQP**, and **Kafka**. Each protocol tab has three pages: **Basics**, **Keys**, and **Sample code** which offer the endpoint details with the corresponding protocol for connecting. 

**Basic** shows the name, description, type, and status of your custom app. 

<img src="media\add-source-custom-app-enhanced\custom-app-details-event-basic.png" alt="[A screenshot showing the customapp Basic information in the Details pane of the eventstream.]" width="900" />

**Keys** and **Sample code** pages provide you with the connection keys information and the sample code with the corresponding keys embedded that you can use to stream the events to your eventstream. The Keys and Sample code information varies by protocol.

### Event hub

The **Keys** in the Event hub protocol format contain information related to an event hub connection string, including the **Event hub name**, **Shared access key name**, **Primary key**, and **Connection string-primary key**. The Event hub format is the default for the connection string and works with Azure Event Hubs SDK. This format allows you to connect to your eventstream via the Event Hubs protocol.
The following example shows what the connection string looks like in **Event hub** format:

*Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxx*

<img src="media\add-source-custom-app-enhanced\details-event-keys.png" alt="[A screenshot showing the Keys information in the Details pane of the eventstream.]" width="900" />

The **Sample code** page in Event Hubs tab offers ready-to-use code with the required connection keys information in Event hub included. Simply copy and paste it into your application for use.

<img src="media\add-source-custom-app-enhanced\details-event-sample.png" alt="[A screenshot showing the Sample code in the Details pane of the eventstream.]" width="900" />


### Kafka

The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use the **Keys** and **Sample code** in Kafka protocol format to connect to your eventstream and stream the events.

<img src="media\add-source-custom-app-enhanced\details-kafka-keys.png" alt="[A screenshot showing the kafka keys in the Details pane of the eventstream.]" width="900" />

Likewise, the **Sample code** page in Kafka tab provides you with ready-made code, including the necessary connection keys in Kafka format. Simply copy it for your use.

<img src="media\add-source-custom-app-enhanced\details-kafka-sample-code.png" alt="[A screenshot showing the kafka sample code in the Details pane of the eventstream.]" width="900" />

### AMQP

The **AMQP** format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between different platforms and languages. You can use this format to connect to your eventstream using the AMQP protocol.

<img src="media\add-source-custom-app-enhanced\details-amqp-keys.png" alt="[A screenshot showing the amqp keys in the Details pane of the eventstream.]" width="900" />

The **Sample code** page in AMQP tab also provides you with the ready-to-use code with connection keys information in AMQP format. 

<img src="media\add-source-custom-app-enhanced\details-amqp-sample-code.png" alt="[A screenshot showing the amqp sample code in the Details pane of the eventstream.]" width="900" />

You can choose the protocol format that suits your application needs and preferences and copy and paste the connection string into your application. You can also refer to or copy the sample code that we provide in the Sample code tab, which shows how to send or receive events using different protocols.

## Related content 

To learn how to add other sources to an eventstream, see the following articles:

- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Sample data](add-source-sample-data.md)

::: zone-end

