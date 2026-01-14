---
title: Add Azure SQL Database CDC as source in Real-Time hub
description: This article describes how to add an Azure SQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 01/14/2026
---

# Add Azure SQL Database Change Data Capture (CDC) as source in Real-Time hub

This article describes how to get events from Azure SQL Database Change Data Capture (CDC) into Fabric Real-Time hub. 

The Azure SQL Database CDC source connector for Microsoft Fabric event streams allows you to capture a snapshot of the current data in an Azure SQL database. The connector then monitors and records any future row-level changes to this data. Once the changes are captured in the eventstream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.

[!INCLUDE [new-sources-regions-unsupported](../real-time-intelligence/event-streams/includes/new-sources-regions-unsupported.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A running Azure SQL server with an Azure SQL database.
- Your Azure SQL database must be publicly accessible and not be behind a firewall or secured in a virtual network.
- Enabled CDC in your Azure SQL database by running the stored procedure `sys.sp_cdc_enable_db`. For details, see [Enable and disable change data capture](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server).

>[!NOTE]
>- Mirroring shouldn't be enabled in your database.
>- Multiple tables CDC isn't supported.

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Microsoft sources** category at the top, and then select **Connect** on the **Azure SQL DB (CDC)** tile. 

    :::image type="content" source="./media/add-source-azure-sql-database-cdc/select-azure-sql-database-cdc.png" alt-text="Screenshot that shows the selection of Azure SQL Database (CDC) as the source type in the Data sources page." lightbox="./media/add-source-azure-sql-database-cdc/select-azure-sql-database-cdc.png":::
    
    Use instructions from the [Connect to an Azure SQL Database CDC source](#connect-to-an-azure-sql-database-cdc-source) section.


## Connect to an Azure SQL Database CDC source

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-sql-database-cdc/new-connection-link.png" alt-text="Screenshot that shows the Connect page of the Data sources page with the **New connection** link highlighted." lightbox="./media/add-source-azure-sql-database-cdc/new-connection-link.png":::

    If you have an **existing connection** to your Azure SQL Database CDC source, you can select it from the Connection drop-down list, and move on to configuring port and tables. 

    :::image type="content" source="./media/add-source-azure-sql-database-cdc/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection selected." lightbox="./media/add-source-azure-sql-database-cdc/existing-connection.png":::
1. In the **Connection settings** section, enter the following values for your Azure SQL database:

   - **Server:** Enter the Azure SQL server name from the Azure portal.
   - **Database:** Enter the Azure SQL database name from the Azure portal.

        :::image type="content" source="./media/add-source-azure-sql-database-cdc/connect.png" alt-text="Screenshot that shows the Connection settings section of the New connection page." :::
1. Scroll down, and in the **Connection credentials** section, follow these steps.
    1. For **Connection name**, enter a name for the connection.
    1. For **Authentication kind**, select **Basic**.
    
        > [!NOTE]
        > Currently, Fabric eventstreams supports only **Basic** authentication.
    1. Enter **Username** and **Password** for the database.
    1. Select **Connect**.

        :::image type="content" source="./media/add-source-azure-sql-database-cdc/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the New connection page." :::
1. Now, on the **Connect** page, do these steps:
    1. Select **All tables** or enter the table names separated by commas, such as: `dbo.table1, dbo.table2`.
    1. For **Port**, the default value is 1433 and can't be modified.
    1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create.
    1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected Azure SQL Database CDC as a source.
    1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You can see this stream on the Real-time hub **All data streams** page when the wizard finishes.
    1. Select **Next**.

        :::image type="content" source="./media/add-source-azure-sql-database-cdc/connect-page-filled.png" alt-text="Screenshot that shows the filled Add source wizard Connect page." lightbox="./media/add-source-azure-sql-database-cdc/connect-page-filled.png":::         
1. On the **Review + connect** screen, review the summary, and then select **Connect**.

      :::image type="content" source="./media/add-source-azure-sql-database-cdc/review-create-page.png" alt-text="Screenshot that shows the filled Add source wizard Review + connect page." lightbox="./media/add-source-azure-sql-database-cdc/review-create-page.png":::         

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure SQL Database CDC as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-sql-database-cdc/review-create-success.png" alt-text="Screenshot that shows the Review + connect page after successful creation of the source." lightbox="./media/add-source-azure-sql-database-cdc/review-create-success.png":::
1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
    

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
