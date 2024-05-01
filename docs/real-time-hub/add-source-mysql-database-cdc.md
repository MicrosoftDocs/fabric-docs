---
title: Add MySQL Database CDC as source in Real-Time hub
description: This article describes how to add MySQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Add MySQL Database CDC as source in Real-Time hub
This article describes how to add MySQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub. 

The Azure MySQL Database Change Data Capture (CDC) connector allows you to capture a snapshot of the current data in an Azure MySQL database. You specify the tables to be monitored and get alerted when any subsequent row-level changes to the tables. Once the changes are captured in a stream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- Created an instance of **Azure Database for MySQL – Flexible Server**.

 ### Set up MySQL database 

The Azure MySQL DB connector uses the Debezium MySQL connector to capture changes in your MySQL Database. You must define a MySQL user with permissions on all databases that connector monitors. For information about granting the required permissions (`SHOW DATABASE` and `REPLICATION`) to the user, see [Debezium connector for MySQL :: Debezium Documentation](https://debezium.io/documentation/reference/1.9/connectors/mysql.html#mysql-creating-user).

### Enable the binlog 
You must enable binary logging for MySQL replication. The binary logs record transaction updates for replication tools to propagate changes. For example, Azure Database for MySQL. 

1. In the [Azure portal](https://portal.azure.com), navigate to your Azure MySQL database. 
1. On the left navigation menu, select **Server parameters**. 
1. Configure your MySQL server with the following properties. 
    - **binlog_row_image**: Set the value to **full**.  
    - **binlog_expire_logs_seconds**: The number of seconds for automatic binlog file removal. Set the value to match the needs of your environment. For example, **86400**.
    
    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/server-parameters.png" alt-text="Screenshot that shows the Server parameters page for the Azure MySQL database." lightbox="./media/add-source-azure-mysql-database-cdc/server-parameters.png":::

## Get events from Azure MySQL Database (CDC)
You can get events from an Azure MySQL Database CDC into Real-Time hub in one of the ways:

- Using the **Get events** experience
- Using the **Microsoft sources** tab

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Add Azure MySQL Database CDC as a source](#add-azure-mysql-database-cdc-as-a-source) section. 

## Microsoft sources tab

1. In Real-Time hub, switch to the **Microsoft sources** tab. 
1. In the **Source** drop-down list, select **Azure MySQL DB (CDC)**. 
1. For **Subscription**, select an **Azure subscription** that has the resource group with your Azure MySQL Database account. 
1. For **Resource group**, select a **resource group** that has the database.
1. For **Region**, select a location where your database is located. 
1. Now, move the mouse over the name of the Azure MySQL DB CDC source that you want to connect to Real-Time hub in the list of databases, and select the **Connect** button, or select **... (ellipsis)**, and then select the **Connect** button. 

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Microsoft sources tab with filters to show Azure MySQL CDC and the connect button." lightbox="./media/add-source-azure-mysql-database-cdc/microsoft-sources-connect-button.png":::

    To configure connection information, use steps from the [Add Azure MySQL DB CDC as a source](#add-azure-mysql-database-cdc-as-a-source) section. Skip the first step of selecting Azure MySQL DB CDC as a source type in the Get events wizard. 

## Add Azure MySQL Database CDC as a source

1. On the **Select a data source** screen, select **MySQL DB (CDC)**.

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/select-mysql-db-cdc.png" alt-text="Screenshot that shows the Select a data source page with Azure MySQL DB (CDC) selected." lightbox="./media/add-source-azure-mysql-database-cdc/select-mysql-db-cdc.png":::
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/new-connection-link.png" alt-text="Screenshot that shows the Connect page of the Get events wizard with the **New connection** link highlighted." lightbox="./media/add-source-azure-mysql-database-cdc/new-connection-link.png"::: 
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
1. On the **Review and create**, review settings, and select **Create source**.
    
    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/review-create-page.png" alt-text="Screenshot that shows the Review and create page with all the required fields specified." lightbox="./media/add-source-azure-mysql-database-cdc/review-create-page.png"::: 

## View data stream details

1. On the **Review and create** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure MySQL DB CDC as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/review-create-success.png" alt-text="Screenshot that shows the Review and create page after successful creation of the source." lightbox="./media/add-source-azure-mysql-database-cdc/review-create-success.png":::
1. In Real-Time hub, switch to the **Data streams** tab of Real-Time hub. Refresh the page. You should see the data stream created for you. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
