---
title: Amazon Kinesis Data Streams Source in Real-Time Hub
description: Amazon Kinesis Data Streams can be added as an event source in Fabric Real-Time hub. Learn how to configure, connect, and view your data stream details.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 03/31/2026
author: spelluru
ms.author: spelluru
---

# Add Amazon Kinesis Data Streams as source in Real-Time hub

This article describes how to add Amazon Kinesis Data Streams as an event source in Fabric Real-Time hub.

[!INCLUDE [amazon-kinesis-data-streams-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/amazon-kinesis-data-streams-connector-prerequisites.md)]

## Data sources page
[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Select Amazon Kinesis Data Streams as data source type

On the **Data sources** page, search for **Amazon Kinesis Data Streams**, and select **Connect** on the **Amazon Kinesis Data Streams** tile. 

:::image type="content" border="true" source="media/add-source-amazon-kinesis-data-streams/add-data-amazon.png" alt-text="A screenshot of selecting Kinesis Data Streams.":::

## Configure and connect to Amazon Kinesis Data Streams

[!INCLUDE [amazon-kinesis-data-streams-connector](../real-time-intelligence/event-streams/includes/connectors/amazon-kinesis-data-streams-connector-configuration.md)]


## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Confluent Cloud Kafka source. To close the wizard, select **Close** at the bottom of the page.
1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

