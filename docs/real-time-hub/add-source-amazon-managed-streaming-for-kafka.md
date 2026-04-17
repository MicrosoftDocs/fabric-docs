---
title: Add Amazon Managed Streaming for Apache Kafka as source in Real-Time hub
description: This article describes how to add Amazon Managed Streaming for Apache Kafka (MSK) as an event source in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 12/22/2025
---

# Add Amazon Managed Streaming for Apache Kafka (MSK) as source in Real-Time hub
This article describes how to add Amazon Streaming for Apache Kafka (MSK) as an event source in Fabric Real-Time hub. 

Amazon MSK Kafka is a fully managed Kafka service that simplifies the setup, scaling, and management. By integrating Amazon MSK Kafka as a source within your eventstream, you can seamlessly bring the real-time events from your MSK Kafka and process it before routing them to multiple destinations within Fabric.  

[!INCLUDE [amazon-managed-streaming-for-kafka-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/amazon-managed-streaming-for-kafka-source-connector-prerequisites.md)]


## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Select Amazon MSK Kafka as data source type

On the **Data sources** page, search for **Amazon MSK Kafka**, and select **Connect** on the **Amazon MSK Kafka** tile. 

:::image type="content" border="true" source="media/add-source-amazon-kafka/add-amazon-kafka.png" alt-text="A screenshot of selecting Amazon MSK Kafka.":::

## Configure Amazon Managed Streaming for Apache Kafka source

[!INCLUDE [amazon-managed-streaming-for-kafka-connector](../real-time-intelligence/event-streams/includes/connectors/amazon-managed-streaming-for-kafka-source-connector-configuration.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Amazon Managed Streaming for Apache Kafka source. To close the wizard, select **Close** at the bottom of the page. 
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
 
## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

