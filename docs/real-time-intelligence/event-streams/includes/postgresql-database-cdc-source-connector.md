---
title: PostgreSQL CDC connector for Fabric event streams
description: This include file has the common content for configuring a PostgreSQL Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom:
ms.date: 05/21/2024
---

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
        > Currently, Fabric event streams support only **Basic** authentication.
    1. Enter **Username** and **Password** for the database.   
    1. Select **Connect**.
   
        :::image type="content" source="media/postgresql-database-cdc-source-connector/connect.png" alt-text="Screenshot that shows the Connection credentials section for the Azure PostgreSQL database connector.":::
1. Now, on the **Connect** page, do these steps:
    1. For **Port**, enter the port number or leave the default value: 5432. If your selected cloud connection is configured in **Manage connections and gateways**, ensure that the port number matches the one set there. If they don't match, the port number in cloud connection in **Manage connections and gateways** take precedence. 
    1. For **table**, select **All tables** or **Enter table name(s)**. If you select the latter, specify tables using a comma-separated list of full table identifiers (`schemaName.tableName`) or valid regular expressions. For example:  

       - Use `dbo.test.*` to select all tables whose names start with `dbo.test`.  
       - Use `dbo\.(test1|test2)` to select `dbo.test1` and `dbo.test2`. You can enter up to 100 tables, and each table name (including the schema) can be up to 128 characters.

        You can mix both formats using commas. Up to 100 tables can be entered, with each table name (including the schema name) limited to 128 characters if using full table identifiers directly.

    1. **Slot name (optional)**: Enter the name of the PostgreSQL logical decoding slot that was created for streaming changes from a particular plug-in for a particular database/schema. The server uses this slot to stream events to Eventstream streaming connector. It must contain only lowercase letters, numbers, and underscores.
        
        - If not specified, a GUID is used to create the slot, requiring the appropriate database permissions.
        - If a specified slot name exists, the connector uses it directly.

1.You can optionally expand **Advanced settings** to configure more options for the PostgreSQL Database CDC source:
    1. **Publication name**: Specifies the name of the PostgreSQL logical replication publication to use. This must match an existing publication in the database, or it will be created automatically depending on the autocreate mode. Default value: `dbz_publication`.
        > [!NOTE]
        > The connector user must have superuser permissions to create the publication. It's recommended to create the publication manually before starting the connector for the first time to avoid permission-related issues.
    1. **Publication auto-create mode**：Controls whether and how the publication is automatically created. Options include:
        - `Filtered`(default): If the specified publication doesn't exist, the connector creates one that includes only the selected tables (as specified in the table include list).
        - `AllTables`: If the specified publication exists, the connector uses it. If it doesn't exist, the connector creates one that includes all tables in the database.
        - `Disabled`: The connector doesn't create a publication. If the specified publication is missing, the connector throws an exception and stops. In this case, the publication must be manually created in the database.

        For more information, see the [Debezium documentation on publication autocreate mode](https://debezium.io/documentation/reference/3.1/connectors/postgresql.html#postgresql-publication-autocreate-mode)
    1. **Decimal handling mode**: Specifies how the connector handles PostgreSQL `DECIMAL` and `NUMERIC` column values:
        - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
        - `Double`: Converts values to double-precision floating-point numbers. This improves usability and performance but may result in a loss of precision.
        - `String`: Encodes values as formatted strings. This makes them easy to consume in downstream systems but loses semantic information about the original numeric type.

1. Select **Next** at the bottom of the page.

    :::image type="content" source="media/postgresql-database-cdc-source-connector/connect-page-filled.png" alt-text="Screenshot that shows the Connect page filled for the Azure PostgreSQL database connector." lightbox="media/postgresql-database-cdc-source-connector/connect-page-filled.png":::
1. On the **Review + connect** page, review the summary, and then select **Add**.

    :::image type="content" source="media/postgresql-database-cdc-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page filled for the Azure PostgreSQL database connector." lightbox="media/postgresql-database-cdc-source-connector/review-create-page.png":::
