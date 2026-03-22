---
title: Add SQL Server Change Data Capture as a source to eventstream
description: Learn how to add a SQL Server on virtual machine (VM) database (DB)'s Change Data Capture (CDC) feed as a source to an eventstream.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 5/23/2025
ms.search.form: Source and Destination
---

# Add SQL Server on VM DB (CDC) source to an eventstream

This article shows you how to add a SQL Server on VM DB Change Data Capture (CDC) source to an eventstream.

The SQL Server on VM DB (CDC) source connector for Fabric event streams allows you to capture a snapshot of the current data in a SQL Server database on VM. Currently, SQL Server on VM DB (CDC) is supported from the following services where the databases can be accessed publicly:
- [SQL Server on Azure Virtual Machines](/azure/azure-sql/virtual-machines/windows/sql-vm-create-portal-quickstart)
- **Amazon Relational Database Service (RDS) for SQL Server**
- **Amazon RDS Custom for SQL Server**
- **Google Cloud SQL for SQL Server**

> [!NOTE]
> Amazon Web Services (AWS) RDS SQL Server, AWS RDS Custom SQL Server, and Google Cloud SQL SQL Server don't support the Express version. Make sure you're using an appropriate edition of SQL Server for CDC.

Once the SQL Server on VM DB (CDC) source is added to the eventstream, it monitors and records future row-level changes, which can then be processed in real-time and sent to various destinations for further analysis.

> [!NOTE]
> With **DeltaFlow (Preview)**, you can transform raw Debezium CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow automates schema registration, destination table management, and schema evolution handling. To use DeltaFlow, choose **Analytics-ready events & auto-updated schema** during the schema handling step. For more information, see the [extended features](#configure-and-connect-to-sql-server-on-vm-database) section in this article.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A running SQL Server on VM database. 
- Your SQL Server on VM database must be configured to allow public access. If it resides in a protected network, connect to it by using [Eventstream connector virtual network injection](./streaming-connector-private-network-support-guide.md).
- Enable CDC in your SQL Server on VM database by running the stored procedure `sys.sp_cdc_enable_db`. For details, see [Enable and disable change data capture](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server). 

## Enable CDC in your SQL Server on VM database

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

    After the query executes successfully, you enabled CDC in your SQL Server on VM database. 

   :::image type="content" border="true" source="media/add-source-sql-server-change-data-capture/enable-cdc.png" alt-text="A screenshot showing CDC is enabled.":::

## Add SQL Server on VM database as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **SQL Server on VM DB (CDC)** tile.

## Configure and connect to SQL Server on VM database

[!INCLUDE [sql-server-on-virtual-machine-cdc-source-connector](./includes/sql-server-on-virtual-machine-cdc-source-connector.md)]

## View updated eventstream

You can see the SQL Server on VM DB CDC source added to your eventstream in **Edit** mode.

:::image type="content" source="media/add-source-sql-server-change-data-capture/edit-mode.png" alt-text="A screenshot of the added SQL Server on VM DB CDC source in Edit mode with extended features." lightbox="media/add-source-sql-server-change-data-capture/edit-mode.png":::

To implement this newly added SQL Server on VM DB CDC source, select **Publish**. After you complete these steps, your SQL Server on VM DB CDC source is available for visualization in the **Live view**.

:::image type="content" source="media/add-source-sql-server-change-data-capture/live-view.png" alt-text="A screenshot of the added SQL Server on VM DB CDC source in Live view mode with extended features." lightbox="media/add-source-sql-server-change-data-capture/live-view.png":::

[!INCLUDE [configure-destintions-schema-enabled-sources](./includes/configure-destinations-schema-enabled-sources.md)]

### View DeltaFlow analytics-ready output (Preview)

If you enabled **Analytics-ready events & auto-updated schema** (DeltaFlow), the destination tables are automatically created in a shape that mirrors your source database tables. Each table includes the original columns along with metadata columns for the change type and timestamp.

> [!NOTE]
> The following screenshot shows Azure SQL Database CDC. The DeltaFlow destination table output is the same for all supported CDC source connectors.

:::image type="content" source="includes/media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif" alt-text="Screenshot showing the Eventhouse destination tables created by DeltaFlow in analytics-ready shape." lightbox="includes/media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif":::

You can query these tables using KQL or other analytics tools without needing to parse raw Debezium CDC payloads.


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


