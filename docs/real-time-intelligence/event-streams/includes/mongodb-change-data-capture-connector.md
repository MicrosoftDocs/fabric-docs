---
title: MongoDB CDC connector for Fabric event streams
description: This include file has the common content for configuring a Mongo Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: WenyangShi
ms.topic: include
ms.custom:
ms.date: 09/22/2025
---

1. Select **MongoDB instance type**: either **MongoDB Atlas** or **MongoDB (Self-managed)**.

1. **Connection**:
    1. If you choose **MongoDB Atlas**:

        1. On the **Connect** screen, under **Connection**, select **New connection** to create a cloud connection.

            :::image type="content" source="media/mongodb-change-data-capture-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page." lightbox="media/mongodb-change-data-capture-connector/new-connection-link.png":::

        1. Enter the following **Connection settings** and **Connection credentials**:

        - **Server**: The connection string for your Atlas cluster, for example `cluster0.example.mongodb.net`.
        - **Cluster**: This field is optional. The cluster name is already part of the Server, so you can leave this blank.
        - **Connection name**: Automatically generated, or you can enter a new name for this connection.
        - **Username** and **Password**: Credentials for a user with at least the `read` role. Make sure the user has access to the target database and collections.

            :::image type="content" source="media/mongodb-change-data-capture-connector/connect-atlas.png" alt-text="A screenshot of the connection settings for MongoDB Atlas." lightbox="media/mongodb-change-data-capture-connector/connect-atlas.png":::

    1. If you choose **MongoDB (Self-managed)**:

        1. On the **Connect** screen, under **Connection**, select **New connection** to create a cloud connection.

            :::image type="content" source="media/mongodb-change-data-capture-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page." lightbox="media/mongodb-change-data-capture-connector/new-connection-link.png":::

        1. Enter the following **Connection settings** and **Connection credentials**:

        - **Server**: The connection string for your self-managed MongoDB server, for example `mongodb0.example.com:27017`.
        - **Connection name**: Automatically generated, or you can enter a new name for this connection.
        - **Username** and **Password**: Use a user with read or higher permissions to access the target database and collections.

            :::image type="content" source="media/mongodb-change-data-capture-connector/connect.png" alt-text="A screenshot of the connection settings for MongoDB (Self-managed)." lightbox="media/mongodb-change-data-capture-connector/connect.png":::

1. Enter the following information to configure the MongoDB CDC data source, and then select **Next**.

    - **Databases**: Choose  **All (Default)** or **Enter database name(s)**. If you choose the latter, provide an optional comma-separated list of regular expressions that match the database names to monitor.
    - **Collections**: Select **All (Default)** or **Enter collection name(s)**. If you choose the latter, provide a comma-separated list of regular expressions that match fully qualified namespaces (for example `dbName.collectionName`) of the MongoDB collections to monitor.

1. You may expand **Advanced settings** to access more configuration options for the MongoDB CDC source:
   - **Snapshot mode**: Options are: 
     - **initial (default)**: Specifies that the connector reads a snapshot when either no offset is found or if the oplog/change stream no longer contains the previous offset. 
     - **initial_only**: The connector performs a database snapshot. After the snapshot completes, the connector stops, and doesn't stream event records for subsequent database changes.
     - **no_data**: The connector captures the structure of all relevant tables, but it doesn't create READ events to represent the data set at the point of the connector’s start-up.

   You can also edit source name by selecting the **Pencil button** for **Source name** in the **Stream details** section to the right.

   :::image type="content" source="media/mongodb-change-data-capture-connector/table.png" alt-text="A screenshot of selecting Tables, Server ID, and Port for the MongoDB (CDC) connection." lightbox="media/mongodb-change-data-capture-connector/table.png":::
    
1. On the **Review + connect** page, after reviewing the summary for MongoDB CDC source, select **Add** to complete the configuration.

      :::image type="content" source="media/mongodb-change-data-capture-connector/review-connect.png" alt-text="Screenshot that shows the Review + connect page with the Add button selected." lightbox="media/mongodb-change-data-capture-connector/review-connect.png":::
