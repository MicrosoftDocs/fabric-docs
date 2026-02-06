---
title: Add PostgreSQL Database CDC as source in Real-Time hub
description: This article describes how to add PostgreSQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
- references_regions
- sfi-image-nochange
ms.date: 01/18/2026
---

# Add PostgreSQL Database CDC as source in Real-Time hub

This article describes how to add PostgreSQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.

The PostgreSQL Database Change Data Capture (CDC) source connector for Microsoft Fabric eventstreams allows you to capture a snapshot of the current data in a PostgreSQL database. The connector then monitors and records any future row-level changes to this data. 



## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- Registered user access in the PostgreSQL database.
- CDC enabled in the PostgreSQL database.

  If you have Azure Database for PostgreSQL, follow the steps in the next section to enable CDC. For detailed information, see [Logical replication and logical decoding - Azure Database for PostgreSQL - Flexible Server](/azure/postgresql/flexible-server/concepts-logical).

  For other PostgreSQL databases, see [Debezium connector for PostgreSQL :: Debezium Documentation](https://debezium.io/documentation/reference/stable/connectors/postgresql.html#setting-up-postgresql).

>[!NOTE]
>Multiple tables CDC isn't supported.

## Enable CDC in your Azure Database for PostgreSQL

To enable CDC in your Azure Database for PostgreSQL, follow these steps based on your deployment type.

### Azure Database for PostgreSQL single server

1. Go to the **Replication** page on the Azure portal.
1. Change the replication rule to **Logical**.

    :::image type="content" source="media/add-source-postgresql-database-cdc/enable-cdc-single.png" alt-text="A screenshot of enabling CDC for a single server deployment.":::

### Azure Database for PostgreSQL flexible server

1. On your Azure Database for PostgreSQL flexible server page in the Azure portal, select **Server parameters** in the navigation menu.
1. On the **Server parameters** page:

   - Set **wal_level** to **logical**.
   - Update the **max_worker_processes** to at least **16**.

        :::image type="content" source="media/add-source-postgresql-database-cdc/enable-cdc-flexible.png" alt-text="A screenshot of enabling CDC for a flexible server deployment.":::
1. Save the changes and restart the server.
1. Confirm that your Azure Database for PostgreSQL flexible server instance allows public network traffic.
1. Grant the admin user replication permissions by running the following SQL statement.

   ```sql
   ALTER ROLE <admin user> WITH REPLICATION;
   ```

## Get events from an Azure Database for PostgreSQL CDC 

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, select **Microsoft sources** category at the top, and then select **Connect** on the **Azure DB for PostgreSQL (CDC)** tile. 

    :::image type="content" source="./media/add-source-postgresql-database-cdc/select-postgresql-cdc.png" alt-text="Screenshot that shows the selection of Azure Database (DB) for PostgreSQL (CDC) as the source type in the Data sources page." lightbox="./media/add-source-postgresql-database-cdc/select-postgresql-cdc.png":::

    Use instructions from the [Add PostgreSQL Database CDC as a source](#add-azure-database-for-postgresql-cdc-as-a-source) section.

## Add Azure Database for PostgreSQL CDC as a source

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="media/add-source-postgresql-database-cdc/new-connection-link.png" alt-text="Screenshot that shows the Connect page for an Azure PostgreSQL database with New connection link highlighted.":::

    If you have an **existing connection** to your Azure Database for PostgreSQL CDC source, you can select it from the Connection drop-down list, and move on to configuring port and tables. 

    :::image type="content" source="./media/add-source-postgresql-database-cdc/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection selected." lightbox="./media/add-source-postgresql-database-cdc/existing-connection.png":::
1. In the **Connection settings** section, enter the following information.

   - **Server**: The server address of your PostgreSQL database, for example *my-pgsql-server.postgres.database.azure.com*.
   - **Database**: The database name, for example *my_database*.

        :::image type="content" source="media/add-source-postgresql-database-cdc/connection-settings.png" alt-text="Screenshot that shows the Connection settings section for the Azure PostgreSQL database connector.":::
1. Scroll down, and in the **Connection credentials** section, follow these steps.
    1. For **Connection name**, enter a name for the connection.
    1. For **Authentication kind**, select **Basic**.
    
        > [!NOTE]
        > Currently, Fabric eventstreams supports only **Basic** authentication.
    1. Enter **Username** and **Password** for the database.   
    1. Select **Connect**.
   
        :::image type="content" source="media/add-source-postgresql-database-cdc/connect.png" alt-text="Screenshot that shows the Connection credentials section for the Azure PostgreSQL database connector.":::
1. Now, on the **Connect** page, do these steps:
    1. For **table**, Enter a table name.
    1. For **Port**, enter the port number or leave the default value: 5432. 
    1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected PostgreSQL Database CDC as a source.
    1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You see this stream on the **All data streams** page when the wizard finishes. 
    1. Select **Next** at the bottom of the page.

        :::image type="content" source="media/add-source-postgresql-database-cdc/connect-page-filled.png" alt-text="Screenshot that shows the Connect page filled for the Azure PostgreSQL database connector." lightbox="media/add-source-postgresql-database-cdc/connect-page-filled.png":::
1. On the **Review + connect** page, review the summary, and then select **Connect**.

    :::image type="content" source="media/add-source-postgresql-database-cdc/review-create-page.png" alt-text="Screenshot that shows the Review + connect page filled for the Azure PostgreSQL database connector." lightbox="media/add-source-postgresql-database-cdc/review-create-page.png":::


## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected PostgreSQL Database CDC as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-postgresql-database-cdc/review-create-success.png" alt-text="Screenshot that shows the Review + connect success page." lightbox="./media/add-source-postgresql-database-cdc/review-create-success.png":::
1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
