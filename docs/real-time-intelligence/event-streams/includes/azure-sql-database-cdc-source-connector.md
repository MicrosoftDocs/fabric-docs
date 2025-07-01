---
title: Azure SQL Database CDC connector for Fabric event streams
description: This include file has the common content for configuring an Azure SQL Database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.author: zhenxilin
author: alexlzx
ms.topic: include
ms.custom:
ms.date: 11/18/2024
---

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page of the Get events wizard with the **New connection** link highlighted." lightbox="./media/azure-sql-database-cdc-source-connector/new-connection-link.png"::: 
1. In the **Connection settings** section, enter the following values for your Azure SQL database:

   - **Server:** Enter the Azure SQL server name from the Azure portal. It's in this form: `mysqlservername.database.windows.net`. 
   - **Database:** Enter the Azure SQL database name from the Azure portal.

        :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connect.png" alt-text="Screenshot that shows the Connection settings section of the New connection page." :::
1. Scroll down, and in the **Connection credentials** section, follow these steps.
   - For **Connection name**, enter a name for the connection.
   - For **Authentication kind**, select **Basic**.

     > [!NOTE]
     > Currently, Fabric event streams supports only **Basic** authentication.
   - Enter **Username** and **Password** for the database.
1. Select **Connect**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the New connection page." :::
1. Now, on the **Connect** page, select **All tables** or **Enter table name(s)**. If you select the latter, specify tables using a comma-separated list of full table identifiers (`schemaName.tableName`) or valid regular expressions. For example:  

      - Use `dbo.test.*` to select all tables whose names start with `dbo.test`.  
      - Use `dbo\.(test1|test2)` to select `dbo.test1` and `dbo.test2`.  

      You can mix both formats using commas. Up to 100 tables can be entered, with each table name (including the schema name) limited to 128 characters if using full table identifiers directly.
1. You may expand **Advanced settings** to configure the **Decimal handling mode**, which specifies how the connector handles `DECIMAL` and `NUMERIC` column values:

      - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
      - `Double`: Converts values to double-precision floating-point numbers. This improves usability and performance but may result in a loss of precision.
      - `String`: Encodes values as formatted strings. This makes them easy to consume in downstream systems but loses semantic information about the original numeric type.
1. Select **Next**.

   :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connect-page-filled.png" alt-text="Screenshot that shows the Connect page of the Get events wizard filled." lightbox="./media/azure-sql-database-cdc-source-connector/connect-page-filled.png":::
1. On the **Review and create** screen, review the summary, and then select **Add**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page of the Get events wizard filled." lightbox="./media/azure-sql-database-cdc-source-connector/review-create-page.png":::         
