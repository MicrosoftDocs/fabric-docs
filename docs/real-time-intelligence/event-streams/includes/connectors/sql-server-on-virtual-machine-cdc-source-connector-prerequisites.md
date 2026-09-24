---
title: SQL Server on Virtual Machine (VM) - database (DB) CDC connector - prerequisites
description: Provides the prerequisites for using a SQL Server on a Virtual Machine - database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 04/03/2026
---

The SQL Server on VM DB (CDC) source connector for Fabric event streams allows you to capture a snapshot of the current data in a SQL Server database on VM. Currently, SQL Server on VM DB (CDC) is supported from the following services where the databases can be accessed publicly:

- [SQL Server on Azure Virtual Machines](/azure/azure-sql/virtual-machines/windows/sql-vm-create-portal-quickstart)
- **Amazon Relational Database Service (RDS) for SQL Server**
- **Amazon RDS Custom for SQL Server**
- **Google Cloud SQL for SQL Server**

> [!NOTE]
> Amazon Web Services (AWS) RDS SQL Server, AWS RDS Custom SQL Server, and Google Cloud SQL SQL Server don't support the Express version. Make sure you're using an appropriate edition of SQL Server for CDC.

Once the SQL Server on VM DB (CDC) source is added to the eventstream, it monitors and records future row-level changes, which can then be processed in real-time and sent to various destinations for further analysis.

> [!NOTE]
> With **DeltaFlow (Preview)**, you can transform raw Debezium CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow automates schema registration, destination table management, and schema evolution handling. To use DeltaFlow, choose **Analytics-ready events & auto-updated schema** during the schema handling step. 

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A running SQL Server on VM database. 
- Your SQL Server on VM database must be configured to allow public access. If it resides in a protected network, connect to it by using [Eventstream connector virtual network injection](../../streaming-connector-private-network-support-guide.md).
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

   :::image type="content" border="true" source="media/sql-server-on-virtual-machine-cdc-source-connector/enable-cdc.png" alt-text="A screenshot showing CDC is enabled.":::
