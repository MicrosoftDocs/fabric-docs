---
title: Add MySQL Database CDC as source in Real-Time hub
description: This article describes how to add MySQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
ms.date: 01/14/2026
---

# Add MySQL Database CDC as source in Real-Time hub

This article describes how to add MySQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.

The Azure MySQL Database Change Data Capture (CDC) connector allows you to capture a snapshot of the current data in an Azure MySQL database. You specify the tables to be monitored and get alerted when any subsequent row-level changes to the tables. Once the changes are captured in a stream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.



## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Created an instance of **Azure Database for MySQL – Flexible Server**.

### Set up MySQL database 

The Azure MySQL database connector uses the Debezium MySQL connector to capture changes in your MySQL Database. You must define a MySQL user with permissions on all databases that connector monitors. For step-by-step instructions, see [Set up MySQL Database (DB)](../real-time-intelligence/event-streams/add-source-mysql-database-change-data-capture.md#set-up-mysql-db).

### Enable the binlog

You must enable binary logging for MySQL replication. The binary logs record transaction updates for replication tools to propagate changes. For example, Azure Database for MySQL.

1. In the [Azure portal](https://portal.azure.com), navigate to your Azure MySQL database.
1. On the left navigation menu, select **Server parameters**.
1. Configure your MySQL server with the following properties.
    - **binlog_row_image**: Set the value to **full**.  
    - **binlog_expire_logs_seconds**: The number of seconds for automatic binlog file removal. Set the value to match the needs of your environment. For example, **86400**.
    
    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/server-parameters.png" alt-text="Screenshot that shows the Server parameters page for the Azure MySQL database." lightbox="./media/add-source-azure-mysql-database-cdc/server-parameters.png":::


## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, select **Database CDC** category at the top, and then select **Connect** on the **MySQL DB (CDC)** tile. 

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/select-mysql-db-cdc.png" alt-text="Screenshot that shows the selection of MySQL DB (CDC) on the Data sources page." lightbox="./media/add-source-azure-mysql-database-cdc/select-mysql-db-cdc.png":::

    Use instructions from the [Add Azure MySQL Database CDC as a source](#add-azure-mysql-database-cdc-as-a-source) section.


## Add Azure MySQL Database CDC as a source

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/new-connection-link.png" alt-text="Screenshot that shows the Connect page of the Add source wizard with the **New connection** link highlighted." lightbox="./media/add-source-azure-mysql-database-cdc/new-connection-link.png":::
1. In the **Connection settings** section, do these steps:
    1. For **Server**, enter the URI for your Azure MySQL server.
    1. For **Database**, enter the name of your database.
    
        :::image type="content" source="./media/add-source-azure-mysql-database-cdc/connection-settings.png" alt-text="Screenshot that shows the Connection settings section." ::: 
1. In the **Connection credentials** section, do these steps:
    1. For **Connection**, select if there's an existing connection to the MySQL database. If not, keep the default value: **Create new connection**.
    1. For **Authentication kind**, select **Basic**. Currently, only **Basic** authentication is supported.
    1. Enter values for **User name** and **Password**.
    1. Specify whether you want to **use an encrypted connection**.
    1. Select **Connect**.
    
        :::image type="content" source="./media/add-source-azure-mysql-database-cdc/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section." ::: 
1. Back on the **Connect** page, do these steps:
    1. Enter the **table name**.
    1. Enter the **server ID**.
    1. Enter the **port number** or keep the default value.
1. In the **Stream details** section to the right, do these steps:
    1. Select **Fabric workspace** where you want to save this connection and the eventstream that the wizard creates.
    1. Enter a **name for the eventstream**.
    1. The name of the stream in Real-Time hub is automatically created for you.
        
        :::image type="content" source="./media/add-source-azure-mysql-database-cdc/connection-page-filled.png" alt-text="Screenshot that shows the Connect page with all the required fields specified." lightbox="./media/add-source-azure-mysql-database-cdc/connection-page-filled.png"::: 
1. Now, select **Next** at the bottom of the page.
1. On the **Review + connect**, review settings, and select **Create source**.
    
    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/review-create-page.png" alt-text="Screenshot that shows the Review + connect page with all the required fields specified." lightbox="./media/add-source-azure-mysql-database-cdc/review-create-page.png"::: 

1. On the **Connect** page, select **Go to resource** to navigate to the Azure PostgreSQL database. Take a note of the server name on the **Overview** page. It's in the following format: `mysqlserver.mysql.database.azure.com`.

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/go-to-resource.png" alt-text="Screenshot that shows the Connect page with Go to resource link highlighted." lightbox="./media/add-source-azure-mysql-database-cdc/go-to-resource.png":::     


## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure MySQL DB CDC as a source. To close the wizard, select **Finish** or **X*** in the top-right corner of the page.

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/review-create-success.png" alt-text="Screenshot that shows the Review + connect page after successful creation of the source." lightbox="./media/add-source-azure-mysql-database-cdc/review-create-success.png":::
1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

. 
## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
