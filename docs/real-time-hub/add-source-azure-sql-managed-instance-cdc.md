---
title: Add Azure SQL Managed Instance as source in Real-Time hub
description: This article describes how to add Azure SQL Managed Instance Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
ms.date: 01/14/2026
---

# Add Azure SQL Managed Instance (MI) database (DB) CDC as source in Real-Time hub

This article describes how to add Azure SQL Managed Instance CDC as an event source in Fabric Real-Time hub.

The Azure SQL Managed Instance CDC source connector allows you to capture a snapshot of the current data in a SQL Managed Instance database. The connector then monitors and records any future row-level changes to this data. Once the changes are captured in the eventstream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.



## Prerequisites 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A running Azure SQL Managed Instance database. 
- Your Azure SQL Managed Instance must enable public endpoint and not be behind a firewall or secured in a virtual network. 
- CDC enabled in your Azure SQL Managed Instance by running the stored procedure `sys.sp_cdc_enable_db`. For details, see [Enable and disable change data capture](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server). 

## Enable public endpoint in your Azure SQL managed instance 

Go to the Azure portal, open your Azure SQL managed instance, select **Networking**, and enable public endpoint.

:::image type="content" source="./media/add-source-azure-sql-managed-instance-cdc/enable-public-endpoint.png" alt-text="Screenshot that shows the Networking page with Public endpoint option enabled." lightbox="./media/add-source-azure-sql-managed-instance-cdc/enable-public-endpoint.png" :::


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

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Database CDC** category at the top, and then select **Connect** on the **Azure SQL MI DB (CDC)** tile. 

    :::image type="content" source="./media/add-source-azure-sql-managed-instance-cdc/select-azure-sql-managed-instance-cdc.png" alt-text="Screenshot that shows the selection of Azure SQL Managed Instance CDC as the source type in the Data sources page." lightbox="./media/add-source-azure-sql-managed-instance-cdc/select-azure-sql-managed-instance-cdc.png":::
    
    Use instructions from the [Add Azure SQL Managed Instance CDC as a source](#add-azure-sql-managed-instance-cdc-as-a-source) section. 

## Add Azure SQL Managed Instance CDC as a source

[!INCLUDE [azure-sql-managed-instance-cdc-source-connector](../real-time-intelligence/event-streams/includes/azure-sql-managed-instance-cdc-source-connector.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure SQL MI DB CDC as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.
1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
