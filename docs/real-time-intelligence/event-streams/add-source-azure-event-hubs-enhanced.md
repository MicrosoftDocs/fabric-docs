---
title: Add Azure Event Hubs source to an eventstream (Preview)
description: Learn how to add an Azure Event Hubs source to an eventstream with enhanced capabilities.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 04/03/2024
ms.search.form: Source and Destination
---

# Add Azure Event Hubs source to an eventstream with enhanced capabilities
This article shows you how to add an Azure Event Hubs source to an eventstream with enhanced capabilities. 

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located. 
- You need to have appropriate permission to get event hub's access keys. The event hub must be publicly accessible and not behind a firewall or secured in a virtual network. 

## Add Azure Event Hubs as a source 
If you have an Azure event hub created with streaming data, follow these steps to add an Azure event hub as your eventstream source: 

1. Create an eventstream with enhanced capabilities. 
1. If you haven't added any source to your eventstream yet, select **Add external source** on the **Get started** page. 

    :::image type="content" source="./media/add-source-tile-menu/add-external-source-tile.png" alt-text="Screenshot that shows a new eventstream with Add External Source tile selected.":::

    If you're adding an Azure event hub as a source to an already published eventstream, switch to **Edit** mode, select **Add source** on the ribbon, and then select **External sources**. 

    :::image type="content" source="./media/add-source-tile-menu/add-source-external-sources-menu.png" alt-text="Screenshot that shows Add External Source menu for a published eventstream.":::

## Configure Azure Event Hubs connector
[!INCLUDE [azure-event-hubs-connector](./includes/azure-event-hubs-source-connector.md)]

You see that the Event Hubs source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Azure event hub, select **Publish** on the ribbon.

:::image type="content" source="./media/add-source-azure-event-hubs-enhanced/publish.png" alt-text="Screenshot that shows the editor with Publish button selected.":::
    
After you complete these steps, the Azure event hub is available for visualization in the **Live view**. 

:::image type="content" source="./media/add-source-azure-event-hubs-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure SQL Database CDC](add-source-azure-sql-database-change-data-capture.md)
- [Azure IoT Hub](add-source-azure-iot-hub-enhanced.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app-enhanced.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data-enhanced.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)