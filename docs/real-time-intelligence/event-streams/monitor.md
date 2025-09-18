---
title: Monitor the Status and Performance of an Eventstream
description: Learn how to monitor the status and performance of an eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
ms.date: 11/25/2024
ms.search.form: Data Preview and Insights
---

# Monitor the status and performance of an eventstream

You can use the Microsoft Fabric eventstreams feature to monitor streaming event data, ingestion status, and ingestion performance. This article explains how to use metrics to monitor the eventstream status and check logs, errors, and data insights.

An eventstream has two types of monitoring experiences: **Data insights** and **Runtime logs**. You see one or both views, depending on the source or destination that you select.

## Prerequisites

- Access to a workspace with Viewer or higher permissions where your eventstream item is located.
- An Azure event hub source or lakehouse destination added to your eventstream.

## Data insights

The **Data insights** tab appears on the lower pane of the main editor. The tab provides metrics that you can use to monitor the status and performance of the eventstream, sources, and destinations. Different sources and destinations have different metrics.

When you select a node in the main editor canvas, the metrics for that specific node appear on the **Data insights** tab.

### Data insights for an eventstream node

The following metrics appear for an eventstream node on the **Data insights** tab:

| Metric | Unit | Description |
|--|--|--|
| **IncomingMessages** | Count | Number of events or messages sent to an eventstream over a specified period. |
| **OutgoingMessages** | Count | Number of events or messages sent from an eventstream over a specified period. |
| **IncomingBytes** | Bytes | Incoming bytes for an eventstream over a specified period. |
| **OutgoingBytes** | Bytes | Outgoing bytes for an eventstream over a specified period. |

To view data insights for an eventstream:

1. On the main editor canvas, select the eventstream node.

1. On the lower pane, select the **Data insights** tab.

   If data is inside the eventstream, the metrics chart appears.

1. On the right side of the tab, select the checkboxes next to the metrics that you want to display.

:::image type="content" source="./media/monitor/eventstream-metrics.png" alt-text="Screenshot that shows eventstream metrics." lightbox="./media/monitor/eventstream-metrics.png" :::

### Data insights for Azure Event Hubs, Azure IoT Hub, lakehouse, eventhouse, derived stream, and Fabric Activator nodes

The following metrics are available on the **Data insights** tab for Azure Event Hubs, Azure IoT Hub, lakehouse, eventhouse (**Event processing before ingestion** mode), derived stream, and Fabric Activator nodes:

| Metric | Unit | Description |
|--|--|--|
| **Input events** | Count | Number of event data items that the eventstream engine pulls from an eventstream (in a lakehouse, eventhouse, derived stream, or Fabric Activator destination) or from an event source (in an Azure Event Hubs or Azure IoT Hub source). |
| **Input event bytes** | Bytes | Amount of event data that the eventstream engine pulls from an eventstream (in a lakehouse, eventhouse, derived stream, or Fabric Activator destination) or from an event source (in an Azure Event Hubs or Azure IoT Hub source). |
| **Output events** | Count | Number of event data items that the eventstream engine sends to a lakehouse or eventhouse (in a lakehouse, eventhouse, derived stream, or Fabric Activator destination) or from an event source (in an Azure Event Hubs or Azure IoT Hub source). |
| **Backlogged input events** | Count | Number of input events that are backlogged in the eventstream engine. |
| **Runtime errors** | Count | Total number of errors related to event processing. |
| **Data conversion errors** | Count | Number of output events that couldn't be converted to the expected output schema. |
| **Deserialization errors** | Count | Number of input events that couldn't be deserialized inside the eventstream engine. |
| **Watermark delay** | Second | Maximum watermark delay across all partitions of all outputs for this source or destination. It's computed as the wall clock time minus the largest watermark. |

To view the data insights for an Azure event hub, Azure IoT hub, lakehouse, eventhouse (**Event processing before ingestion** mode), derived stream, and Fabric activator:

1. In the main editor canvas, select the Azure Event Hubs, Azure IoT Hub, lakehouse, eventhouse, derived stream, or Fabric Activator node.

1. On the lower pane, select the **Data insights** tab.

   If data is inside the event hub, IoT hub, lakehouse, eventhouse, derived stream, or Fabric activator, the metrics chart appears.

1. On the right side of the tab, select the checkboxes next to the metrics that you want to display.

:::image type="content" source="./media/monitor/source-destination-metrics.png" alt-text="Screenshot that shows source and destination metrics." lightbox="./media/monitor/source-destination-metrics.png" :::

### Data insights for streaming connector source nodes

Streaming connector source nodes include the following sources:

- Azure SQL Database Change Data Capture (CDC)
- Azure Service Bus
- PostgreSQL database CDC
- MySQL database CDC
- Azure Cosmos DB CDC
- SQL Server on virtual machine (VM) database (DB) CDC
- Azure SQL Managed Instance CDC
- Google Cloud Pub/Sub
- Amazon Kinesis Data Streams
- Confluent Cloud Kafka
- Apache Kafka
- Amazon MSK Kafka

The following metrics are available on the **Data insights** tab for streaming connector source nodes:

| Metric                        | Unit  | Description                                                                      |
|-------------------------------|-------|----------------------------------------------------------------------------------|
| **Source Outgoing Events**        | Count | Number of records sent from the transformations (if any) and written to an eventstream for the task that belongs to the named source connector in the worker (since the task was last restarted). |
| **Source Incoming Events**        | Count | Before transformations are applied, this is the number of records produced or polled by the task that belongs to the named source connector in the worker (since the task was last restarted). |
| **Connector Errors Logged**       | Count | Number of errors that were logged for these connector tasks.                |
| **Connector Processing Errors**   | Count | Number of record processing errors in these connector tasks.                |
| **Connector Processing Failures** | Count | Number of record processing failures in these connector tasks, including retry failures. |
| **Connector Events Skipped**      | Count | Number of records skipped due to errors within these connector tasks.       |

To view the data insights for a streaming connector source:

1. Select **Use external source**, and then choose a streaming connector source.

1. Configure and publish the streaming connector source.

1. On the lower pane in live view, select the **Data insights** tab.

   If data is inside the streaming connector source, the metrics chart appears.

1. On the right side of the tab, select the checkboxes next to the metrics that you want to display.

:::image type="content" source="./media/monitor/connector-source-metrics.png" alt-text="Screenshot that shows connector source metrics." lightbox="./media/monitor/connector-source-metrics.png" :::

## Runtime logs

Use the **Runtime logs** tab to check the detailed logs that occur in the eventstream engine. Runtime logs have three severity levels: warning, error, and information.

To view the runtime logs for an Azure event hub, Azure IoT hub, streaming connector source, lakehouse, eventhouse (**Event processing before ingestion** mode), or Fabric activator:

1. In the main editor canvas, select the node.

1. On the lower pane, select the **Runtime logs** tab.

   If data is inside the Azure event hub, Azure IoT hub, streaming connector source, lakehouse, eventhouse, or Fabric activator, the logs appear.

1. Search the logs by using the **Filter by keyword** option, or filter the list by changing the severity or type.

1. To see the most current logs, select **Refresh**.

:::image type="content" source="./media/monitor/source-destination-runtime-logs.png" alt-text="Screenshot that shows source and destination runtime logs." lightbox="./media/monitor/source-destination-runtime-logs.png" :::

## Related content

- [Preview data in an eventstream item](./preview-data.md)
