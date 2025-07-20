---
title: SQL Server on Virtual Machine (VM) - database (DB) CDC connector for Fabric event streams
description: Provides the common content for configuring a SQL Server on a Virtual Machine - database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 10/23/2024
---

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="media/sql-server-on-virtual-machine-cdc-source-connector/new-connection.png" alt-text="Screenshot that shows the selection of New connection link on the Connect page." lightbox="media/sql-server-on-virtual-machine-cdc-source-connector/new-connection.png":::    
1. In the **Connection settings** section, enter the following values for your SQL Server on VM:
    - **Server:** Enter the publicly accessible IP address or domain name of your VM, and then add a colon and the port. For example, if your IP address is `xx.xxx.xxx.xxx` and the port is 1433, then you should enter `xx.xxx.xxx.xxx:1433` in the **Server** field. If the port isn't specified, the default port value `1433` is used.
    - **Database:** Enter the name of the database that you want to connect to on your SQL Server on VM.
   
        :::image type="content" source="media/sql-server-on-virtual-machine-cdc-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section of the Connect page.":::        
1. Scroll down, and in the Connection credentials section, follow these steps.
    - For **Connection name**, enter a name for the connection.
    - For **Authentication kind**, select **Basic**.
    
        > [!NOTE]
        > Currently, Fabric event streams supports only **Basic** authentication.
    - Enter **Username** and **Password** for the SQL Server on VM.

        > [!NOTE]
        > Don't select the option: **Use encrypted connection**. 

        :::image type="content" source="media/sql-server-on-virtual-machine-cdc-source-connector/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the Connect page."::: 
1. Select **Connect** at the bottom of the page.
1. Now, on the **Connect** page, select **All tables** or **Enter table name(s)**. If you select the latter, specify tables using a comma-separated list of full table identifiers (`schemaName.tableName`) or valid regular expressions. For example:  

    - Use `dbo.test.*` to select all tables whose names start with `dbo.test`.  
    - Use `dbo\.(test1|test2)` to select `dbo.test1` and `dbo.test2`.  

    You can mix both formats using commas. Up to 100 tables can be entered, with each table name (including the schema name) limited to 128 characters if using full table identifiers directly.
1. You may expand **Advanced settings** to configure the **Decimal handling mode**, which specifies how the connector handles `DECIMAL` and `NUMERIC` column values:

      - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
      - `Double`: Converts values to double-precision floating-point numbers. This improves usability and performance but may result in a loss of precision.
      - `String`: Encodes values as formatted strings. This makes them easy to consume in downstream systems but loses semantic information about the original numeric type.
1. Select **Next**.

    :::image type="content" source="media/sql-server-on-virtual-machine-cdc-source-connector/select-tables.png" alt-text="Screenshot that shows selection of All tables option." lightbox="media/sql-server-on-virtual-machine-cdc-source-connector/select-tables.png"::: 
1. On the **Review + create** screen, review the summary, and then select **Connect**.

    :::image type="content" source="media/sql-server-on-virtual-machine-cdc-source-connector/review-add.png" alt-text="Screenshot that shows the selection of the Add button." lightbox="media/sql-server-on-virtual-machine-cdc-source-connector/review-add.png"::: 
