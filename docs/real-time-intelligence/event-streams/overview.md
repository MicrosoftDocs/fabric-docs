---
title: Microsoft Fabric Eventstreams Overview
description: Learn how eventstreams can help you capture, transform, and route real-time events to various destinations in Microsoft Fabric.
ms.reviewer: zhenxilin
ms.topic: concept-article
ms.custom: sfi-image-nochange
ms.date: 02/18/2026
ms.search.form: Eventstream Overview
ai-usage: ai-assisted
---

# Overview of Microsoft Fabric eventstreams

You can use the eventstreams feature in Microsoft Fabric Real-Time Intelligence to bring real-time events into Fabric, transform them, and then route them to various destinations without writing any code. You create an eventstream, add event data sources to the stream, optionally add transformations to transform the event data, and then route the data to supported destinations.

Also, with Apache Kafka endpoints available for eventstreams, you can send or consume real-time events by using the Kafka protocol.

## Bring events into Fabric

Eventstreams provide you with source connectors to fetch event data from the various sources. More sources are available when you enable **Enhanced capabilities** at the time of creating an eventstream.

# [Enhanced capabilities](#tab/enhancedcapabilities)

[!INCLUDE [supported-sources-enhanced](./includes/supported-sources-enhanced.md)]

# [Standard capabilities](#tab/standardcapabilities)

[!INCLUDE [supported-sources](./includes/supported-sources-standard.md)]

---

## Process events

An end-to-end data flow diagram in an eventstream can give you a comprehensive understanding of the data flow and organization.

The event processor editor is a drag-and-drop experience. It's an intuitive way to create your event data processing, transforming, and routing logic without writing any code.

[!INCLUDE [supported-transformations-enhanced](./includes/supported-transformations-enhanced.md)]

In addition to the no-code transformations, eventstreams support a [SQL operator (preview)](process-events-using-sql-code-editor.md) for code-first stream processing. Use the SQL operator to define custom transformation logic by using SQL expressions, including windowing, joins, and aggregations. You can choose between no-code transformations and SQL-based authoring within an eventstream to build complex streaming logic.

If you enabled **Enhanced capabilities** while creating an eventstream, the transformation operations are supported for all destinations. The derived stream acts as an intermediate bridge for some destinations, like a custom endpoint or Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]). If you didn't enable **Enhanced capabilities**, the transformation operations are available only for the lakehouse and eventhouse (event processing before ingestion) destinations.

## Route events to destinations

The Fabric eventstreams feature supports sending data to the following supported destinations.

# [Enhanced capabilities](#tab/enhancedcapabilities)

[!INCLUDE [supported-destinations-enhanced](./includes/supported-destinations-enhanced.md)]

You can attach multiple destinations in an eventstream to simultaneously receive data from your eventstreams without the eventstreams interfering with each other.

:::image type="content" source="./media/overview/multiple-destinations-enhanced.png" alt-text="Screenshot that shows an overview of an eventstream item with enhanced capabilities." lightbox="./media/overview/multiple-destinations-enhanced.png" :::

# [Standard capabilities](#tab/standardcapabilities)

[!INCLUDE [supported-destinations](./includes/supported-destinations-standard.md)]

You can attach multiple destinations in an eventstream to simultaneously receive data from your eventstreams without the eventstreams interfering with each other.

:::image type="content" source="./media/overview/eventstream-overview.png" alt-text="Screenshot that shows an overview of an eventstream item." lightbox="./media/overview/eventstream-overview.png" :::

---

## Schema management

Eventstreams provide schema management capabilities to help you govern and validate the structure of your streaming data:

- **Schema Registry (preview)**: Register and version schemas centrally by using the Fabric Schema Registry to manage schema evolution across your eventstreams. For more information, see [Use event schemas in eventstreams](../schema-sets/use-event-schemas.md).
- **Multiple schema inferencing (preview)**: Infer and work with multiple schemas within a single eventstream. Design diverse transformation paths by selecting the appropriate inferred schema for each path. For more information, see [Enhance event processing by using multiple schema inferencing](process-events-with-multiple-schemas.md).
- **Confluent Schema Registry–based deserialization (preview)**: When you ingest data from Confluent Cloud for Apache Kafka, eventstreams can use Confluent Schema Registry to deserialize schema-encoded messages, improving interoperability with Confluent-based streaming ecosystems.

These features improve schema governance and interoperability when you consume varied streams in your eventstreams.

> [!NOTE]
> We recommend that you use the Fabric eventstreams feature with at least four capacity units ([SKU](../../enterprise/licenses.md#capacity): F4).

## Apache Kafka on Fabric eventstreams

The Fabric eventstreams feature offers an Apache Kafka endpoint, so you can connect and consume streaming events through the Kafka protocol. If your application already uses the Apache Kafka protocol to send or receive streaming events with specific topics, you can easily connect it to your eventstream. Just update your connection settings to use the Kafka endpoint provided in your eventstream.

The Fabric eventstreams feature is associated with Azure Event Hubs, a fully managed cloud-native service. When you create an eventstream, an event hub namespace is automatically provisioned. An event hub is allocated to the default stream without requiring any provisioning configurations. To learn more about the Kafka-compatible features in Azure Event Hubs, see [What is Azure Event Hubs for Apache Kafka?](/azure/event-hubs/azure-event-hubs-kafka-overview).

To learn more about how to obtain the Kafka endpoint details for sending events to an eventstream, see [Add a custom endpoint or custom app source to an eventstream](./add-source-custom-app.md). For information about consuming events from an eventstream, see [Add a custom endpoint or custom app destination to an eventstream](./add-destination-custom-app.md).

## Operational and security capabilities

Eventstreams provide controls for operational management and secure connectivity:

- **Pause and resume controls**: Derived eventstreams support pause and resume controls, so you can temporarily halt processing without affecting other inputs or outputs in your eventstream and then resume later. For more information, see [Pause and resume data streams](pause-resume-data-streams.md).
- **Workspace Private Link (preview)**: Select sources and destinations support Workspace Private Link for private network access, which helps you secure inbound connections to your eventstreams. For more information, see [Secure inbound connections with Tenant and Workspace Private Links](set-up-tenant-workspace-private-links.md).

## Limitations

Fabric eventstreams have the following general limitations. Before you work with eventstreams, review these limitations to ensure that they align with your requirements.

| Limit | Value |
| ----- | --------- |
| Maximum message size | 1 MB |
| Maximum retention period of event data | 90 days |
| Event delivery guarantees | At least once |

## Related content

- [Create an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)


