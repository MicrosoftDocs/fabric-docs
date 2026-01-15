---
title: Add Amazon Managed Streaming for Apache Kafka as source in Real-Time hub
description: This article describes how to add Amazon Managed Streaming for Apache Kafka (MSK) as an event source in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
ms.date: 12/22/2025
---

# Add Amazon Managed Streaming for Apache Kafka (MSK) as source in Real-Time hub
This article describes how to add Amazon Streaming for Apache Kafka (MSK) as an event source in Fabric Real-Time hub. 

Amazon MSK Kafka is a fully managed Kafka service that simplifies the setup, scaling, and management. By integrating Amazon MSK Kafka as a source within your eventstream, you can seamlessly bring the real-time events from your MSK Kafka and process it before routing them to multiple destinations within Fabric.  

## Prerequisites 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- An Amazon MSK Kafka cluster in active status. 
- Your Amazon MSK Kafka cluster must be publicly accessible and not be behind a firewall or secured in a virtual network.

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Add Amazon Managed Streaming for Apache Kafka as a source

[!INCLUDE [amazon-managed-streaming-for-kafka-connector](../real-time-intelligence/event-streams/includes/amazon-managed-streaming-for-kafka-source-connector.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Amazon Managed Streaming for Apache Kafka source. To close the wizard, select **Close** at the bottom of the page. 
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
 
## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
