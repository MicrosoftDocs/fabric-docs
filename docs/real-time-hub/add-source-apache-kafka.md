---
title: Add Apache Kafka as source in Fabric Real-Time hub
description: This article describes how to add an Apache Kafka topic as an event source in Fabric Real-Time hub using an API key.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
  - references_regions
ms.date: 12/22/2025
# Customer intent: I want to learn how to add an Apache Kafka topic as a source in Fabric Real-Time hub.
---

# Add Apache Kafka as source in Fabric Real-Time hub (preview)
This article describes how to add Apache Kafka as an event source in Fabric Real-Time hub. 

## Prerequisites 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- An Apache Kafka cluster running. 
- Your Apache Kafka must be publicly accessible and not be behind a firewall or secured in a virtual network.  

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Add Apache Kafka as a source
On the **Add data** page, type in the search bar and select **Apache Kafka**.

:::image type="content" border="true" source="media/add-source-apache-kafka/apache.png" alt-text="A screenshot of selecting Apache Kafka.":::

## Configure Apache Kafka connector

[!INCLUDE [apache-kafka-connector](../real-time-intelligence/event-streams/includes/apache-kafka-source-connector.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Apache Kafka source. To close the wizard, select **Close** at the bottom of the page. 
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
 
## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
