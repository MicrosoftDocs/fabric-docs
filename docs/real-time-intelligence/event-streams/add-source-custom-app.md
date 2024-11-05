---
title: Add a custom endpoint or custom app source to an eventstream
description: Learn how to add a custom endpoint or custom app source to an eventstream for sending real-time events with multiple protocols, like the Apache Kafka protocol.
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

# Add a custom endpoint or custom app source to an eventstream

If you want to connect your own application with an eventstream, you can add a custom endpoint or a custom app as a source. Then you can send real-time events to the eventstream from your own application with the connection endpoint exposed on the custom endpoint or custom app. Also, with the Apache Kafka protocol available as an option for custom endpoints or custom apps, you can send real-time events by using the Apache Kafka protocol.

This article shows you how to add a custom endpoint source or a custom app source to an eventstream in Microsoft Fabric event streams.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  

## Prerequisites

Before you start, you must get access to the Fabric premium workspace with Contributor or higher permissions.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add custom endpoint data as a source

1. Create a new eventstream:

   1. On the **Home** page, select **Eventstream**.

   1. In the **New Eventstream** dialog, enter a name, make sure the **Enhanced Capabilities (preview)** option is selected, and then select **Create**.

      ![Screenshot of the dialog for creating a new eventstream.](media/external-sources/new-eventstream.png)

1. To add a custom endpoint source, on the get-started page, select **Use custom endpoint**.

   ![Screenshot of the option to use a custom endpoint.](media/external-sources/use-custom-endpoint.png)

   Or, if you already have a published eventstream and you want to add custom endpoint data as a source, switch to edit mode. On the ribbon, select **Add source** > **Custom endpoint**.

   ![Screenshot of selecting a custom endpoint as a source for an existing eventstream.](media\add-source-custom-app-enhanced\add-custom-app.png)

1. In the **Custom endpoint** dialog, enter a name for the custom source under **Source name**, and then select **Add**.

   ![Screenshot of the dialog for adding a custom endpoint.](media\add-source-custom-app-enhanced\add.png)

1. After you create the custom endpoint source, it's added to your eventstream on the canvas in edit mode. To implement the newly added data from the custom app source, select **Publish**.

   ![Screenshot that shows the eventstream in edit mode, with the Publish button highlighted.](media\add-source-custom-app-enhanced\edit-mode.png)

## Get endpoint details on the Details pane to send events

After you create a custom endpoint source, its data is available for visualization in the live view.

![Screenshot that shows the eventstream in the live view.](media\add-source-custom-app-enhanced\live-view.png)

The **Details** pane has three protocol tabs: **Event Hub**, **AMQP**, and **Kafka**. Each protocol tab has three pages: **Basics**, **Keys**, and **Sample code**. These pages offer the endpoint details with the corresponding protocol for connecting.

**Basic** shows the name, type, and status of your custom endpoint.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-basic.png" alt-text="Screenshot that shows basic information on the Details pane of the eventstream live view.":::

**Keys** provides information about connection keys. **Sample code** provides the sample code, with the corresponding keys embedded, that you can use to stream the events to your eventstream. The information on these pages varies by protocol.

### Event hub

The **Keys** page on the **Event Hub** tab contains information related to an event hub's connection string. The information includes **Event hub name**, **Shared access key name**, **Primary key**, and **Connection string-primary key**.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-keys.png" alt-text="Screenshot that shows key information on the Details pane of the eventstream.":::

The event hub format is the default for the connection string, and it works with the Azure Event Hubs SDK. This format allows you to connect to your eventstream via the Event Hubs protocol.

The following example shows what the connection string looks like in event hub format:

> *Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxx*

The **Sample code** page on the **Event Hub** tab offers ready-to-use code that includes the required information about connection keys in the event hub. Simply copy and paste it into your application for use.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-sample.png" alt-text="Screenshot that shows sample code on the Details pane of the eventstream live view.":::

<a name="kafka-enhanced-capabilities"></a>

### Kafka

The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use the **Keys** and **Sample code** information for the Kafka protocol format to connect to your eventstream and stream the events.

:::image type="content" source="media\add-source-custom-app-enhanced\details-kafka-keys.png" alt-text="Screenshot that shows Kafka keys on the Details pane of the eventstream live view.":::

The **Sample code** page on the **Kafka** tab provides ready-made code, including the necessary connection keys in Kafka format. Simply copy it for your use.

:::image type="content" source="media\add-source-custom-app-enhanced\details-kafka-sample-code.png" alt-text="Screenshot that shows Kafka sample code on the Details pane of the eventstream live view.":::

### AMQP

The AMQP format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between various platforms and languages. You can use this format to connect to your eventstream by using the AMQP protocol.

:::image type="content" source="media\add-source-custom-app-enhanced\details-amqp-keys.png" alt-text="Screenshot that shows AMQP keys on the Details pane of the eventstream live view.":::

The **Sample code** page on the **AMQP** tab provides ready-to-use code with connection key information in AMQP format.

:::image type="content" source="media\add-source-custom-app-enhanced\details-amqp-sample-code.png" alt-text="Screenshot that shows AMQP sample code on the Details pane of the eventstream live view.":::

You can choose the protocol format that suits your application needs and preferences, and then copy and paste the connection string into your application. You can also refer to or copy the sample code on the **Sample code** page, which shows how to send or receive events by using various protocols.

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

Before you start, you must get access to a premium workspace with Contributor or higher permissions where your eventstream is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add a custom app as a source

If you want to connect your own application with an eventstream, you can add a custom app source. Then, send data to the eventstream from your own application with the connection endpoint exposed in the custom app.

To add a custom app source:

1. Select **New source** on the ribbon or the plus sign (**+**) in the main editor canvas, and then select **Custom App**.

1. On the **Custom App** pane, enter a source name for the custom app, and then select **Add**.

   :::image type="content" source="./media/event-streams-source\eventstream-sources-custom-app.png" alt-text="Screenshot that shows the pane for configuring a custom app as a source." lightbox="./media/event-streams-source/eventstream-sources-custom-app.png":::

## Get endpoint details on the Details pane to send events

After you successfully create the custom application as a source, you can view the information on the **Details** pane.

The **Details** pane has three protocol tabs: **Event Hub**, **AMQP**, and **Kafka**. Each protocol tab has three pages: **Basics**, **Keys**, and **Sample code**. These pages offer the endpoint details with the corresponding protocol for connecting.

:::image type="content" source="./media/add-manage-eventstream-sources/custom-app-source.png" alt-text="Screenshot that shows a custom app source." lightbox="./media/add-manage-eventstream-sources/custom-app-source.png":::

**Basic** shows the name, type, and status of your custom app.

:::image type="content" source="media\add-source-custom-app-enhanced\custom-app-details-event-basic.png" alt-text="Screenshot that shows basic information for a custom app on the Details pane of an eventstream.":::

**Keys** provides information about connection keys. **Sample code** provides the sample code, with the corresponding keys embedded, that you can use to stream the events to your eventstream. The information on these pages varies by protocol.

### Event hub

The **Keys** page on the **Event Hub** tab contains information related to an event hub's connection string. The information includes **Event hub name**, **Shared access key name**, **Primary key**, and **Connection string-primary key**.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-keys.png" alt-text="Screenshot that shows key information on the Details pane of the eventstream.":::

The event hub format is the default for the connection string, and it works with the Azure Event Hubs SDK. This format allows you to connect to your eventstream via the Event Hubs protocol.

The following example shows what the connection string looks like in event hub format:

> *Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxx*

The **Sample code** page on the **Event Hub** tab offers ready-to-use code that includes the required information about connection keys in the event hub. Simply copy and paste it into your application for use.

:::image type="content" source="media\add-source-custom-app-enhanced\details-event-sample.png" alt-text="Screenshot that shows sample code on the Details pane of the eventstream.":::

### Kafka

The Kafka format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use the **Keys** and **Sample code** information for the Kafka protocol format to connect to your eventstream and stream the events.

:::image type="content" source="media\add-source-custom-app-enhanced\details-kafka-keys.png" alt-text="Screenshot that shows Kafka keys on the Details pane of the eventstream.":::

The **Sample code** page on the **Kafka** tab provides ready-made code, including the necessary connection keys in Kafka format. Simply copy it for your use.

:::image type="content" source="media\add-source-custom-app-enhanced\details-kafka-sample-code.png" alt-text="Screenshot that shows Kafka sample code on the Details pane of the eventstream.":::

### AMQP

The AMQP format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between various platforms and languages. You can use this format to connect to your eventstream by using the AMQP protocol.

:::image type="content" source="media\add-source-custom-app-enhanced\details-amqp-keys.png" alt-text="Screenshot that shows AMQP keys on the Details pane of the eventstream.":::

The **Sample code** page on the **AMQP** tab provides ready-to-use code with connection key information in AMQP format.

:::image type="content" source="media\add-source-custom-app-enhanced\details-amqp-sample-code.png" alt-text="Screenshot that shows AMQP sample code on the Details pane of the eventstream.":::

You can choose the protocol format that suits your application needs and preferences, and then copy and paste the connection string into your application. You can also refer to or copy the sample code on the **Sample code** page, which shows how to send or receive events by using various protocols.

## Related content

To learn how to add other sources to an eventstream, see the following articles:

- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Sample data](add-source-sample-data.md)

::: zone-end
