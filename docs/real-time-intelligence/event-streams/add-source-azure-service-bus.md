---
title: Add Azure Service Bus source to an eventstream
description: Learn how to add an Azure Service Bus source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.search.form: Source and Destination
ms.custom: reference_regions
---

# Add Azure Service Bus source to an eventstream
This article shows you how to add an Azure Service Bus source to an eventstream.  

Azure Service Bus is a fully managed enterprise message broker with message queues and publish-subscribe topics. Microsoft Fabric event streams allow you to connect to Azure Service Bus, where messages in the Service Bus can be fetched into Fabric eventstream and routed to various destinations within Fabric. 

> [!NOTE]
> This source is not supported in the following regions of your workspace capacity: West US3, Switzerland West.  

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located. 
- You need to have appropriate permission to get access keys for the Service Bus namespace. The Service Bus namespace must be publicly accessible and not behind a firewall or secured in a virtual network. 

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


### Create an eventstream

[!INCLUDE [create-eventstream](./includes/create-eventstream.md)]
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]
    
## Configure Azure Service Bus connector
[!INCLUDE [azure-service-bus-connector](./includes/azure-service-bus-source-connector.md)]

You see that the Azure Service Bus source is added to your eventstream on the canvas in the **Edit** mode. To publish it to live, select **Publish** on the ribbon.

:::image type="content" source="./media/add-source-azure-service-bus/event-stream-publish.png" alt-text="Screenshot that shows the editor with Publish button selected." lightbox="./media/add-source-azure-service-bus/event-stream-publish.png":::
    
After you complete these steps, the Azure event hub is available for visualization in the **Live view**. Select the **Service Bus** tile in the diagram to see the page similar to the following one.

:::image type="content" source="./media/add-source-azure-service-bus/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

## Related content

To learn how to add other sources to an eventstream, see the following articles: 

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace events](add-source-fabric-workspace.md)


