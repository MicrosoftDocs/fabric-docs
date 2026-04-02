---
title: Azure SQL Database Change Data Capture (CDC) - Prerequisites
description: This file has the prerequisites for using the Azure SQL Database CDC connector for Fabric eventstreams and real-time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 04/01/2026
---


The Azure SQL Database CDC source connector for Microsoft Fabric event streams allows you to capture a snapshot of the current data in an Azure SQL database. The connector then monitors and records any future row-level changes to this data. Once the changes are captured in the eventstream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.

> [!NOTE]
> With **DeltaFlow (Preview)**, you can transform raw Debezium CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow automates schema registration, destination table management, and schema evolution handling. To use DeltaFlow, choose **Analytics-ready events & auto-updated schema** during the schema handling step. 

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the Trial license mode with Contributor or higher permissions. 
- A running Azure SQL server with an Azure SQL database.
- Your Azure SQL database should be publicly accessible and not be behind a firewall or secured in a virtual network. If it resides in a protected network, connect to it by using [Eventstream connector virtual network injection](../../streaming-connector-private-network-support-guide.md).
- Enabled CDC in your Azure SQL database by running the stored procedure `sys.sp_cdc_enable_db`. For details, see [Enable and disable change data capture](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server).

> [!NOTE]
> Don't enable mirroring in your Azure SQL database.

## Enable CDC in your Azure SQL Database

1. Go to the Azure portal, open your Azure SQL database, and select **Query editor**. Choose an authentication method to sign in.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/open-azure-sqldb.png" alt-text="A screenshot of opening Azure SQL database." lightbox="./media/azure-sql-database-cdc-source-connector/open-azure-sqldb.png":::

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
