---
title: Add Confluent Cloud Kafka as source in Real-Time hub
description: This article describes how to add Confluent Cloud Kafka as an event source in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 01/14/2026
---

# Add Confluent Cloud Kafka as source in Real-Time hub

This article describes how to add Confluent Cloud Kafka as an event source in Fabric Real-Time hub.

[!INCLUDE [confluent-source-description-prerequisites](../real-time-intelligence/event-streams/includes/connectors/confluent-kafka-source-description-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Add Confluent Cloud Kafka as a source

On the **Select a data source** page, select **Confluent**.

:::image type="content" source="./media/add-source-confluent-kafka/select-confluent.png" alt-text="Screenshot that shows the selection of Confluent as the source type in the Add source wizard.":::

## Configure Confluent Kafka source connection

[!INCLUDE [confluent-kafka-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/confluent-kafka-source-connector-configuration.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Confluent Cloud Kafka source. To close the wizard, select **Close** at the bottom of the page.
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
 
 
## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

