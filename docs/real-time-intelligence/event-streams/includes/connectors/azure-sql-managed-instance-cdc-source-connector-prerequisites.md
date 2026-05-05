---
title: SQL Server on Virtual Machine (VM) - database (DB) CDC connector - prerequisites
description: Provides the prerequisites for using a SQL Server on a Virtual Machine - database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.reviewer: xujiang1
ms.topic: include
ms.date: 04/03/2026
---

The Azure SQL Managed Instance CDC source connector for Microsoft Fabric event streams allows you to capture a snapshot of the current data in a SQL Managed Instance database. The connector then monitors and records any future row-level changes to this data. Once the changes are captured in the eventstream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.

> [!NOTE]
> With **DeltaFlow (Preview)**, you can transform raw Debezium CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow automates schema registration, destination table management, and schema evolution handling. To use DeltaFlow, choose **Analytics-ready events & auto-updated schema** during the schema handling step.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A running Azure SQL Managed Instance database. 
- Your Azure SQL Managed Instance should enable public endpoint and not be behind a firewall or secured in a virtual network. If it doesn't enable public endpoint and is in a protected network, connect to it by using [Eventstream connector virtual network injection](../../streaming-connector-private-network-support-guide.md).
- CDC enabled in your Azure SQL Managed Instance by running the stored procedure `sys.sp_cdc_enable_db`. For details, see [Enable and disable change data capture](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server). 


## Enable public endpoint in your Azure SQL managed instance 

Go to the Azure portal, open your Azure SQL managed instance, select **Networking**, and enable public endpoint.

:::image type="content" source="./media/azure-sql-managed-instance-cdc-source-connector/enable-public-endpoint.png" alt-text="Screenshot that shows the Networking page with Public endpoint option enabled." lightbox="./media/azure-sql-managed-instance-cdc-source-connector/enable-public-endpoint.png" :::

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

   :::image type="content" border="true" source="media/azure-sql-managed-instance-cdc-source-connector/enable-cdc.png" alt-text="A screenshot of showing cdc enabled." lightbox="media/azure-sql-managed-instance-cdc-source-connector/enable-cdc.png":::

