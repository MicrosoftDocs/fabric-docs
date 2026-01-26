---
title: Add SQL Server on VM DB (CDC) as source in Real-Time hub
description: This article describes how to add SQL Server on Virtual Machine (VM) Database (DB) Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
ms.date: 01/18/2026
---

# Add SQL Server on VM DB (CDC) as source in Real-Time hub

This article describes how to add SQL Server on VM DB (CDC) as an event source in Fabric Real-Time hub.

The SQL Server on VM DB (CDC) source connector for Fabric eventstreams allows you to capture a snapshot of the current data in a SQL Server database on VM. The connector then monitors and records any future row-level changes to the data. Once these changes are captured in the eventstream, you can process this data in real-time and send it to various destinations for further processing or analysis.



## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A running SQL Server on VM database.
- Your SQL Server on VM database must be configured to allow public access.  
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

## Get events from SQL Server on VM DB (CDC)

You can get events from a SQL Server on VM DB (CDC) into Real-Time hub using the [**Data sources**](#data-sources-page) page.

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, select **Database CDC** category at the top, and then select **Connect** on the **Azure SQL MI DB (CDC)** tile. 

    :::image type="content" source="./media/add-source-sql-server-on-vm-db-cdc/select-sql-server-on-vm-db-cdc.png" alt-text="Screenshot that shows the selection of SQL Server on VM DB (CDC) as the source type in the Data sources page." lightbox="./media/add-source-sql-server-on-vm-db-cdc/select-sql-server-on-vm-db-cdc.png" :::
   
    Use instructions from the [Add SQL Server on VM DB CDC as a source](#add-sql-server-on-vm-db-cdc-as-a-source) section.  


## Add SQL Server on VM DB CDC as a source

[!INCLUDE [sql-server-on-virtual-machine-cdc-source-connector](../real-time-intelligence/event-streams/includes/sql-server-on-virtual-machine-cdc-source-connector.md)] 

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected SQL Server on VM DB (CDC) as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.
1. In Real-Time hub, select **All data streams**. To see the new data stream, refresh the **All data streams** page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
