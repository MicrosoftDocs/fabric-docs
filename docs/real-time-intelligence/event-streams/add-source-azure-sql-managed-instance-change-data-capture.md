---
title: Add Azure SQL Managed Instance Change Data Capture as a source to eventstream
description: Learn how to add an Azure SQL Managed Instance Change Data Capture (CDC) source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 11/18/2024
ms.search.form: Source and Destination
---

# Add Azure SQL Managed Instance CDC source to an eventstream

This article shows you how to add an Azure SQL Managed Instance Change Data Capture (CDC) source to an eventstream. 

The Azure SQL Managed Instance CDC source connector for Microsoft Fabric event streams allows you to capture a snapshot of the current data in a SQL Managed Instance database. The connector then monitors and records any future row-level changes to this data. Once the changes are captured in the eventstream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.

[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A running Azure SQL Managed Instance database. 
- Your Azure SQL Managed Instance must enable public endpoint and not be behind a firewall or secured in a virtual network. 
- CDC enabled in your Azure SQL Managed Instance by running the stored procedure `sys.sp_cdc_enable_db`. For details, see [Enable and disable change data capture](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server). 


## Enable public endpoint in your Azure SQL managed instance 

Go to the Azure portal, open your Azure SQL managed instance, select **Networking**, and enable public endpoint.

:::image type="content" source="./media/add-source-azure-sql-managed-instance-change-data-capture/enable-public-endpoint.png" alt-text="Screenshot that shows the Networking page with Public endpoint option enabled." lightbox="./media/add-source-azure-sql-managed-instance-change-data-capture/enable-public-endpoint.png" :::

## Enable CDC in your Azure SQL managed instance

1. Enable CDC for the database.     
        
   ```sql
   EXEC sys.sp_cdc_enable_db; 
   ```
2. Enable CDC for a table using a gating role option. In this example, `MyTable` is the name of the SQL table. 

    ```sql            
    EXEC sys.sp_cdc_enable_table 
       @source_schema = N'dbo', 
       @source_name   = N'MyTable', 
       @role_name     = NULL 
    GO 
    ```

    After the query executes successfully, you enabled CDC in your Azure SQL managed instance. 

   :::image type="content" border="true" source="media/add-source-azure-sql-managed-instance-change-data-capture/enable-cdc.png" alt-text="A screenshot of showing cdc has enabled.":::

## Add Azure SQL Managed Instance CDC as a source

1. In Fabric Real-Time Intelligence, select **Eventstream** to create a new eventstream.

   :::image type="content" border="true" source="media/external-sources/new-eventstream.png" alt-text="A screenshot of creating a new eventstream.":::

2. On the next screen, select **Add external source**.

   :::image type="content" border="true" source="media/external-sources/add-external-source.png" alt-text="A screenshot of selecting Add external source.":::

## Configure and connect to Azure SQL Managed Instance CDC

[!INCLUDE [azure-sql-managed-instance-cdc-source-connector](./includes/azure-sql-managed-instance-cdc-source-connector.md)]

## View updated eventstream
You can see the Azure SQL MI DB (CDC) source added to your eventstream in **Edit** mode.

:::image type="content" source="media/add-source-azure-sql-managed-instance-change-data-capture/edit-mode.png" alt-text="A screenshot of the added Azure SQL MI DB CDC source in Edit mode with the Publish button highlighted." lightbox="media/add-source-azure-sql-managed-instance-change-data-capture/edit-mode.png":::

To implement this newly added Azure SQL Managed Instance source, select **Publish**. After you complete these steps, your Azure SQL Managed Instance source is available for visualization in the **Live view**.

:::image type="content" source="media/add-source-azure-sql-managed-instance-change-data-capture/live-view.png" alt-text="A screenshot of the added Azure SQL MI DB CDC source in Live view mode." lightbox="media/add-source-azure-sql-managed-instance-change-data-capture/live-view.png":::


## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)
