---
title: Microsoft Fabric event streams overview
description: Learn about eventstreams and its capability of capturing, transforming, and routing real-time events to various destinations in Microsoft Fabric.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: overview
ms.custom: sfi-image-nochange
ms.date: 2/05/2025
ms.search.form: Eventstream Overview
---

# Fabric Eventstream - overview
The eventstreams feature in the Microsoft Fabric **Real-Time Intelligence** experience lets you bring real-time events into Fabric, transform them, and then route them to various destinations without writing any code (no-code). You create an eventstream, which is an instance of the **Eventstream** item in Fabric, add event data sources to the stream, optionally add transformations to transform the event data, and then route the data to supported destinations. Additionally, with Apache Kafka endpoints available on the Eventstream item, you can send or consume real-time events using the Kafka protocol.

## Bring events into Fabric
The eventstreams feature provides you with various source connectors to fetch event data from the various sources. There are more sources available when you enable **Enhanced capabilities** at the time of creating an eventstream. 

# [Enhanced capabilities](#tab/enhancedcapabilities)

[!INCLUDE [supported-sources-enhanced](./includes/supported-sources-enhanced.md)]

# [Standard capabilities](#tab/standardcapabilities)

[!INCLUDE [supported-sources](./includes/supported-sources-standard.md)]

---

## Process events using no-code experience
The drag and drop experience gives you an intuitive and easy way to create your event data processing, transforming, and routing logic without writing any code. An end-to-end data flow diagram in an eventstream can provide you with a comprehensive understanding of the data flow and organization. The event processor editor is a no-code experience that allows you to drag and drop to design the event data processing logic. 

[!INCLUDE [supported-transformations-enhanced](./includes/supported-transformations-enhanced.md)]

If you enabled **Enhanced capabilities** while creating an eventstream, the transformation operations are supported for all destinations (with derived stream acting as an intermediate bridge for some destinations, like Custom endpoint, Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]). If you didn't, the transformation operations are available only for the Lakehouse and Eventhouse (event processing before ingestion) destinations.

## Route events to destinations
The Fabric event streams feature supports sending data to the following supported destinations. 

# [Enhanced capabilities](#tab/enhancedcapabilities)

[!INCLUDE [supported-destinations-enhanced](./includes/supported-destinations-enhanced.md)]

You can attach multiple destinations in an eventstream to simultaneously receive data from your eventstreams without interfering with each other.

:::image type="content" source="./media/overview/multiple-destinations-enhanced.png" alt-text="Screenshot showing an Eventstream item overview." lightbox="./media/overview/multiple-destinations-enhanced.png" :::

# [Standard capabilities](#tab/standardcapabilities)

[!INCLUDE [supported-destinations](./includes/supported-destinations-standard.md)]

You can attach multiple destinations in an eventstream to simultaneously receive data from your eventstreams without interfering with each other.

:::image type="content" source="./media/overview/eventstream-overview.png" alt-text="Screenshot showing an Eventstream item overview." lightbox="./media/overview/eventstream-overview.png" :::

---

> [!NOTE]
> We recommend that you use the Microsoft Fabric event streams feature with at least four capacity units ([SKU](../../enterprise/licenses.md#capacity): F4)

## Apache Kafka on Fabric event streams 
The Fabric event streams feature offers an Apache Kafka endpoint on the Eventstream item, enabling users to connect and consume streaming events through the Kafka protocol. If your application already uses the Apache Kafka protocol to send or receive streaming events with specific topics, you can easily connect it to your Eventstream. Just update your connection settings to use the Kafka endpoint provided in your Eventstream.

Fabric event streams feature is powered by Azure Event Hubs, a fully managed cloud-native service. When an eventstream is created, an event hub namespace is automatically provisioned, and an event hub is allocated to the default stream without requiring any provisioning configurations. To learn more about the Kafka-compatible features in Azure Event Hubs service, see [Azure Event Hubs for Apache Kafka](/azure/event-hubs/azure-event-hubs-kafka-overview).

To learn more about how to obtain the Kafka endpoint details for sending events to eventstream, see [Add custom endpoint source to an eventstream](./add-source-custom-app.md); and for consuming events from eventstream, see [Add a custom endpoint destination to an eventstream](./add-destination-custom-app.md).

## Limitations

Fabric Eventstream has the following general limitations. Before working with Eventstream, review these limitations to ensure they align with your requirements.

| Limit | Value |
| ----- | --------- |
| Maximum message size |  1 MB |
| Maximum retention period of event data | 90 days |
| Event delivery guarantees | At-least-once |

## Related content

- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
