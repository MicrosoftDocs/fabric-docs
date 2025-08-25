---
title: MySQL Database CDC connector for Fabric event streams
description: This include file has the common content for configuring a MySQL Database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom:
ms.date: 10/28/2024
---


1. On the **Connect** screen, under **Connection**, select **New connection** to create a cloud connection.

    :::image type="content" source="media/mysql-database-cdc-source-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page." lightbox="media/mysql-database-cdc-source-connector/new-connection-link.png":::
1. Enter the following **Connection settings** and **Connection credentials** for your MySQL DB, and then select **Connect**.

   - **Server:** The server address of your MySQL database, for example *my-mysql-server.mysql.database.azure.com*.
   - **Database:** The database name, for example *my_database*.
   - **Connection name**: Automatically generated, or you can enter a new name for this connection.
   - **Username** and **Password**: Enter the credentials for your MySQL database. Make sure you enter the **server admin  account** or the [**user account created with required privileges granted**](../add-source-mysql-database-change-data-capture.md#set-up-mysql-db).

        :::image type="content" source="media/mysql-database-cdc-source-connector/connect.png" alt-text="A screenshot of the connection settings for Azure MySQL DB (CDC)." lightbox="media/mysql-database-cdc-source-connector/connect.png":::
1. Enter the following information to configure the MySQL DB CDC data source, and then select **Next**.

   - **Port**: The default value is 3306. If your selected cloud connection is configured in **Manage connections and gateways**, ensure that the port number matches the one set there. If they don't match, the port number in the cloud connection in **Manage connections and gateways** take precedence. 
   - **table**: Select **All tables** or **Enter table name(s)**. If you select the latter, specify tables using a comma-separated list of full table identifiers (`databaseName.tableName`) or valid regular expressions. For example:  

      - Use `databaseName.test.*` to select all tables whose names start with `databaseName.test`.  
      - Use `databaseName\.(test1|test2)` to select `databaseName.test1` and `databaseName.test2`.

      You can mix both formats using commas. The total character limit for the entire entry is **102,400** characters.
   - **Server ID**: Enter a unique value for each server and replication client in the MySQL cluster. The default value is 1000.
   
   > [!NOTE]
   > **Set a different Server ID for each reader**. Every MySQL database client for reading binlog should have a unique ID, called Server ID. MySQL Server uses this ID to maintain the network connection and the binlog position. Different jobs sharing the same Server ID can result in reading from the wrong binlog position. Therefore, it's recommended to set a different Server ID for each reader.
1. You may expand **Advanced settings** to access additional configuration options for the MySQL Database CDC source:
   - **Snapshot locking mode**: Options are: 
     - **Minimal (default)**: Holds a global read lock only during the initial phase to capture schema and metadata. The rest of the snapshot uses a REPEATABLE READ transaction, allowing updates while data is being read.
     - **Extended**: Maintains a global read lock for the entire snapshot duration, blocking all writes. Use for full consistency if write blocking is acceptable.
     - **None**: Skips acquiring table locks during the snapshot. Safe only if no schema changes occur during the process.
   - **Decimal handling mode**: Specifies how the connector handles `DECIMAL` and `NUMERIC` column values:
      - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
      - `Double`: Converts values to double-precision floating-point numbers. This improves usability and performance but may result in a loss of precision.
      - `String`: Encodes values as formatted strings. This makes them easy to consume in downstream systems but loses semantic information about the original numeric type.

   You can also edit source name by selecting the **Pencil button** for **Source name** in the **Stream details** section to the right.

   :::image type="content" source="media/mysql-database-cdc-source-connector/table.png" alt-text="A screenshot of selecting Tables, Server ID, and Port for the Azure MySQL DB (CDC) connection." lightbox="media/mysql-database-cdc-source-connector/table.png":::
    
1. On the **Review + connect** page, after reviewing the summary for MySQL DB CDC source, select **Add** to complete the configuration.

      :::image type="content" source="media/mysql-database-cdc-source-connector/review-connect.png" alt-text="Screenshot that shows the Review + connect page with the Add button selected." lightbox="media/mysql-database-cdc-source-connector/review-connect.png":::
