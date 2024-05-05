---
title: PostgreSQL CDC connector for Fabric event streams
description: This include file has the common content for configuring a PostgreSQL Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

1. On the **Select a data source** screen, select **Azure DB for PostgreSQL (CDC)**.

    :::image type="content" source="media/postgresql-database-cdc-source-connector/select-external-source.png" alt-text="A screenshot of selecting PostgreSQL DB (CDC).":::
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="media/postgresql-database-cdc-source-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page for an Azure PostgreSQL database with New connection link highlighted.":::
1. In the **Connection settings** section, enter the following information.

   - **Server**: The server address of your PostgreSQL database, for example *my-pgsql-server.postgres.database.azure.com*.
   - **Database**: The database name, for example *my_database*.

        :::image type="content" source="media/postgresql-database-cdc-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section for the Azure PostgreSQL database connector.":::
1. Scroll down, and in the **Connection credentials** section, follow these steps.
    1. For **Connection name**, enter a name for the connection. 
    1. For **Authentication kind**, select **Basic**. 
    
        > [!NOTE]
        > Currently, Fabric event streams supports only **Basic** authentication.
    1. Enter **Username** and **Password** for the database.   
    1. Select **Connect**.
   
        :::image type="content" source="media/postgresql-database-cdc-source-connector/connect.png" alt-text="Screenshot that shows the Connection credentials section for the Azure PostgreSQL database connector.":::
1. Now, on the **Connect** page, do these steps:
    1. For **table**, Enter a table name.
    1. For **Port**, enter the port number or leave the default value: 5432. 
    1. Select **Next** at the bottom of the page.

        :::image type="content" source="media/postgresql-database-cdc-source-connector/connect-page-filled.png" alt-text="Screenshot that shows the Connect page filled for the Azure PostgreSQL database connector." lightbox="media/postgresql-database-cdc-source-connector/connect-page-filled.png":::
1. On the **Review and create** screen, review the summary, and then select **Add**.

    :::image type="content" source="media/postgresql-database-cdc-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page filled for the Azure PostgreSQL database connector." lightbox="media/postgresql-database-cdc-source-connector/review-create-page.png":::