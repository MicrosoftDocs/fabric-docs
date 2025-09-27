---
title: Add Azure SQL Database CDC source to an eventstream
description: Learn how to add an Azure SQL Database Change Data Capture (CDC) source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 11/18/2024
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-hubs-capabilities
---

# Add Azure SQL Database CDC source to an eventstream

This article shows you how to add an Azure SQL Database Change Data Capture (CDC) source to an eventstream.

The Azure SQL Database CDC source connector for Microsoft Fabric event streams allows you to capture a snapshot of the current data in an Azure SQL database. The connector then monitors and records any future row-level changes to this data. Once the changes are captured in the eventstream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.

[!INCLUDE [new-sources-regions-unsupported](./includes/new-sources-regions-unsupported.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A running Azure SQL server with an Azure SQL database.
- Your Azure SQL database must be publicly accessible and not be behind a firewall or secured in a virtual network.
- Enabled CDC in your Azure SQL database by running the stored procedure `sys.sp_cdc_enable_db`. For details, see [Enable and disable change data capture](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server).
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

Note that you must not enable mirroring in your Azure SQL database.

## Enable CDC in your Azure SQL Database

1. Go to the Azure portal, open your Azure SQL database, and select **Query editor**. Choose an authentication method to log in.

    :::image type="content" source="./media/add-source-azure-sql-database-change-data-capture/open-azure-sqldb.png" alt-text="A screenshot of opening Azure SQL database." lightbox="./media/add-source-azure-sql-database-change-data-capture/open-azure-sqldb.png":::

2. Run the following SQL commands to enable CDC in your database:

    ```sql
    -- Enable Database for CDC
    EXEC sys.sp_cdc_enable_db;
    
    -- Enable CDC for a table using a gating role option
    EXEC sys.sp_cdc_enable_table
        @source_schema = N'dbo',
        @source_name   = N'MyTable',
        @role_name     = NULL
    GO
    ```

## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure SQL DB (CDC)** tile.

:::image type="content" source="./media/add-source-azure-sql-database-change-data-capture/select-azure-sql-db-cdc.png" alt-text="Screenshot that shows the selection of Azure SQL DB CDC as the source type in the Get events wizard." lightbox="./media/add-source-azure-sql-database-change-data-capture/select-azure-sql-db-cdc.png":::


## Configure and connect to Azure SQL Database CDC

[!INCLUDE [azure-sql-database-cdc-connector](./includes/azure-sql-database-cdc-source-connector.md)]

## View updated eventstream

1. You can see the Azure SQL Database (CDC) source added to your eventstream in **Edit mode**.

    :::image type="content" source="media/add-source-azure-sql-database-change-data-capture/edit-view.png"     alt-text="Screenshot of streaming Azure SQL Database CDC source in Edit view." lightbox="media/add-source-azure-sql-database-change-data-capture/edit-view.png":::
1. To implement this newly added Azure SQL Database CDC source, select **Publish**. After you complete these steps, your Azure SQL Database CDC source is available for visualization in the **Live view**.

    :::image type="content" source="media/add-source-azure-sql-database-change-data-capture/live-view.png"     alt-text="Screenshot of streaming Azure SQL Database CDC source in Live view." lightbox="media/add-source-azure-sql-database-change-data-capture/live-view.png":::

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure Service Bus](add-source-azure-service-bus.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)
