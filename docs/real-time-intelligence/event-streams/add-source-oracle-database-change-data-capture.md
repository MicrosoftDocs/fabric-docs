---
title: Add Oracle Database CDC source to an eventstream (preview)
description: Learn how to add an Oracle Database Change Data Capture (CDC) source to an eventstream.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/20/2026
ms.search.form: Source and Destination
ai-usage: ai-assisted
---

# Add Oracle Database CDC source to an eventstream (preview)

This article shows you how to add an Oracle Database Change Data Capture (CDC) source to an eventstream.

The Oracle Database CDC source connector for Microsoft Fabric eventstream allows you to capture a snapshot of the current data in an Oracle database. The connector then monitors and records any future row-level changes to this data. After the changes are captured in the eventstream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis. The connector supports Oracle databases whether they're on-premises or in the cloud.

[!INCLUDE [oracle-database-cdc-connector-prerequisites](./includes/connectors/oracle-database-change-data-capture-source-connector-prerequisites.md)]
- If you don't have an eventstream, [create an eventstream](./create-manage-an-eventstream.md).

## Supported Oracle versions

The Oracle Database CDC connector supports the following Oracle database versions:

- Oracle Database 12c (12.1) and later
- Oracle Database 19c
- Oracle Database 21c
- Oracle Autonomous Database

## Enable CDC in your Oracle Database

To capture change data from Oracle, you need to enable supplemental logging and configure LogMiner.

### Enable supplemental logging

1. Connect to your Oracle database as a user with DBA privileges.

1. Enable supplemental logging at the database level by running the following SQL commands:

    ```sql
    -- Enable minimal supplemental logging at the database level
    ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
    
    -- Enable supplemental logging for all columns (recommended for CDC)
    ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
    ```

1. Verify that supplemental logging is enabled:

    ```sql
    SELECT SUPPLEMENTAL_LOG_DATA_MIN, SUPPLEMENTAL_LOG_DATA_ALL FROM V$DATABASE;
    ```

    The query should return `YES` for both columns.

### Enable archivelog mode

For CDC to work properly, the database must be in ARCHIVELOG mode.

1. Check the current archive log mode:

    ```sql
    SELECT LOG_MODE FROM V$DATABASE;
    ```

1. If not already in ARCHIVELOG mode, enable it:

    ```sql
    -- Shut down the database
    SHUTDOWN IMMEDIATE;
    
    -- Start in mount mode
    STARTUP MOUNT;
    
    -- Enable archivelog mode
    ALTER DATABASE ARCHIVELOG;
    
    -- Open the database
    ALTER DATABASE OPEN;
    ```

### Create a CDC user with required privileges

Create a dedicated user for the CDC connector with the necessary permissions:

```sql
-- Create a user for CDC
CREATE USER fabric_cdc IDENTIFIED BY <your_password>;

-- Grant basic privileges
GRANT CREATE SESSION TO fabric_cdc;
GRANT SELECT ON V_$DATABASE TO fabric_cdc;
GRANT SELECT ON V_$LOG TO fabric_cdc;
GRANT SELECT ON V_$LOGFILE TO fabric_cdc;
GRANT SELECT ON V_$ARCHIVED_LOG TO fabric_cdc;
GRANT SELECT ON V_$ARCHIVE_DEST_STATUS TO fabric_cdc;

-- Grant LogMiner privileges
GRANT EXECUTE ON DBMS_LOGMNR TO fabric_cdc;
GRANT EXECUTE ON DBMS_LOGMNR_D TO fabric_cdc;
GRANT SELECT ANY TRANSACTION TO fabric_cdc;
GRANT LOGMINING TO fabric_cdc;

-- Grant SELECT on tables you want to capture
GRANT SELECT ON <schema>.<table_name> TO fabric_cdc;
```

Replace `<your_password>`, `<schema>`, and `<table_name>` with your actual values.

## Launch the Select a data source wizard

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Oracle DB (CDC)** tile.

:::image type="content" source="./media/add-source-oracle-cdc/select-oracle-database-change-data-capture.png" alt-text="Screenshot that shows the selection of Oracle Database (CDC) as the source type in the Get events wizard." lightbox="./media/add-source-oracle-cdc/select-oracle-database-change-data-capture.png":::

## Configure and connect to Oracle Database CDC

[!INCLUDE [oracle-database-cdc-connector-configuration](./includes/connectors/oracle-database-change-data-capture-source-connector-configuration.md)]

## View updated eventstream

1. You can see the Oracle Database CDC source added to your eventstream in **Edit mode**.

    :::image type="content" source="media/add-source-oracle-cdc/edit-view.png" alt-text="Screenshot of streaming Oracle Database CDC source in Edit view." lightbox="media/add-source-oracle-cdc/edit-view.png":::

1. To implement this newly added Oracle Database CDC source, select **Publish**. After you complete these steps, your Oracle Database CDC source is available for visualization in the **Live view**.

    :::image type="content" source="media/add-source-oracle-cdc/live-view.png" alt-text="Screenshot of streaming Oracle Database CDC source in Live view." lightbox="media/add-source-oracle-cdc/live-view.png":::

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure Service Bus](add-source-azure-service-bus.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md)
- [MySQL Database CDC](add-source-mysql-database-change-data-capture.md)
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)
