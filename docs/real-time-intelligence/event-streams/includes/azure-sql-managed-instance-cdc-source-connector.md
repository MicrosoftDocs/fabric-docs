---
title: SQL Server on Virtual Machine (VM) - database (DB) CDC connector for Fabric event streams
description: This include file has the common content for configuring a SQL Server on a Virtual Machine - database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.date: 09/02/2024
---

1. On the **Select a data source** screen, select **Azure SQL MI DB (CDC)** as the data source.

    :::image type="content" source="media/azure-sql-managed-instance-cdc-source-connector/select-external-source.png" alt-text="Screenshot that shows the selection of SQL Server on VM DB (CDC) connector." lightbox="media/azure-sql-managed-instance-cdc-source-connector/select-external-source.png":::
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="media/azure-sql-managed-instance-cdc-source-connector/new-connection.png" alt-text="Screenshot that shows the selection of New connection link on the Connect page." lightbox="media/azure-sql-managed-instance-cdc-source-connector/new-connection.png":::    
1. In the **Connection settings** section, enter the following values for your SQL Server on VM:
    - **Server:** Enter the Endpoint from the Azure portal, replacing the comma between the host and port with a colon. For example, if your Endpoint is `xxxxx.public.xxxxxx.database.windows.net,3342`, then you should enter `xxxxx.public.xxxxxx.database.windows.net:3342` in the **Server** field. 

        :::image type="content" source="media/azure-sql-managed-instance-cdc-source-connector/networking-endpoint.png" alt-text="Screenshot that shows the Networking page with Endpoint information." lightbox="media/azure-sql-managed-instance-cdc-source-connector/networking-endpoint.png":::    
    - **Database:** Enter the name of the database you want to connect to within your Azure SQL Managed Instance.
   
        :::image type="content" source="media/azure-sql-managed-instance-cdc-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section of the Connect page.":::        
1. Scroll down, and in the **Connection credentials** section, follow these steps.
    - For **Connection name**, enter a name for the connection.
    - For **Authentication kind**, select **Basic**.
    
        > [!NOTE]
        > Currently, Fabric event streams supports only **Basic** authentication.
    - Enter **Username** and **Password** for the SQL Server on VM.

1. Select **Connect** at the bottom of the page.
1. Now, on the **Connect** page, select **All tables**, or enter the **table names separated by commas**, such as: `dbo.table1, dbo.table2`.
1. Select **Next**.

    :::image type="content" source="media/azure-sql-managed-instance-cdc-source-connector/select-tables.png" alt-text="Screenshot that shows selection of All tables option." lightbox="media/azure-sql-managed-instance-cdc-source-connector/select-tables.png"::: 
1. On the **Review and create** screen, review the summary, and then select **Add**.

    :::image type="content" source="media/azure-sql-managed-instance-cdc-source-connector/review-add.png" alt-text="Screenshot that shows the selection of the Add button." lightbox="media/azure-sql-managed-instance-cdc-source-connector/review-add.png"::: 


