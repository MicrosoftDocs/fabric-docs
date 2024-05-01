---
title: Azure SQL Database CDC connector for Fabric eventstreams
description: This include file has the common content for configuring an Azure SQL Database Change Data Capture (CDC) connector for Fabric eventstreams and Real-time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

1. On the **Select a data source** screen, select **Azure SQL DB (CDC)**.

   ![A screenshot of selecting Azure SQL DB (CDC).](media/azure-sql-database-cdc-source-connector/select-external-source.png)
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page of the Get events wizard with the **New connection** link highlighted." lightbox="./media/azure-sql-database-cdc-source-connector/new-connection-link.png"::: 
1. In the **Connection settings** section, enter the following values for your Azure SQL database:

   - **Server:** Enter the Azure SQL server name from the Azure portal.
   - **Database:** Enter the Azure SQL database name from the Azure portal.

        :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connect.png" alt-text="Screenshot that shows the Connection settings section of the New connection page." ::: 
1. Scroll down, and in the **Connection credentials** section, follow these steps.
   - For **Connection name**, enter a name for the connection. 
   - For **Authentication kind**, select **Basic**. 

     > [!NOTE]
     > Currently, Fabric eventstreams supports only **Basic** authentication.

   - Enter **Username** and **Password** for the database.

1. Select **Connect**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the New connection page." ::: 

1. Now, on the **Connect** page, enter the following information:

   - Enter the name of the SQL **table(s)**.
   - For **Port**, enter the port number or leave the default value of 1433.

1. Select **Next**. 

   :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connect-page-filled.png" alt-text="Screenshot that shows the Connect page of the Get events wizard filled." lightbox="./media/azure-sql-database-cdc-source-connector/connect-page-filled.png":::

1. On the **Review and create** screen, review the summary, and then select **Add**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page of the Get events wizard filled." lightbox="./media/azure-sql-database-cdc-source-connector/review-create-page.png":::         