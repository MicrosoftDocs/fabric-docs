---
title: PostgreSQL CDC connector for Fabric event streams
description: This include file has the common content for configuring a PostgreSQL Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.author: zhenxilin
author: alexlzx
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 10/31/2025
---

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="media/postgresql-database-cdc-source-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page for an Azure PostgreSQL database with New connection link highlighted.":::
1. In the **Connection settings** section, enter the following information.

   - **Server**: The server address of your PostgreSQL database, for example *my-pgsql-server.postgres.database.azure.com*.
   - **Database**: The database name, for example *my_database*.

        :::image type="content" source="media/postgresql-database-cdc-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section for the Azure PostgreSQL database connector.":::
    - **Connection name**: Enter a name for the connection.
    - **Authentication kind**, Select **Basic** and enter your **Username** and **Password** for the database.
        > [!NOTE]
        > Currently, Fabric event streams support only **Basic** authentication.
    - Select **Connect** to complete the connection settings.
        :::image type="content" source="media/postgresql-database-cdc-source-connector/connect.png" alt-text="Screenshot that shows the Connection credentials section for the Azure PostgreSQL database connector.":::

1. **Port**: Enter the port number of your server. Default value is **5432**. If your selected cloud connection is configured in **Manage connections and gateways**, ensure that the port number matches the one set there. If they don't match, the port number in cloud connection in **Manage connections and gateways** take precedence.

1. You can choose between two options when capturing changes from database tables:
    - **All tables**: Capture changes from every table in the database.
    - **Enter table name(s)**: Allows you to specify a subset of tables using a comma-separated list. You may use either: full table identifiers in the format `schemaName.tableName` or valid regular expressions.
    Examples:
    - `dbo.test.*`: Select all tables whose names start with `test` in the `dbo` schema.
    - `dbo\.(test1|test2)`: Select `dbo.test1` and `dbo.test2`.

    You can combine both formats in the list. The total character limit for the entire entry is **102,400** characters.

1. **Slot name (optional)**: Enter the name of the PostgreSQL logical decoding slot that was created for streaming changes from a particular plug-in for a particular database/schema. The server uses this slot to stream events to Eventstream streaming connector. It must contain only lowercase letters, numbers, and underscores.
    - If not specified, a GUID is used to create the slot, requiring the appropriate database permissions.
    - If a specified slot name exists, the connector uses it directly.

1. You may expand **Advanced settings** to access more configuration options for the PostgreSQL Database CDC source:
    - **Publication name**: Specifies the name of the PostgreSQL logical replication publication to use. This must match an existing publication in the database, or it will be created automatically depending on the autocreate mode. Default value: `dbz_publication`.

        > [!NOTE]
        > The connector user must have superuser permissions to create the publication. It's recommended to create the publication manually before starting the connector for the first time to avoid permission-related issues.

    - **Publication auto-create mode**: Controls whether and how the publication is automatically created. Options include:
        - `Filtered` (default): If the specified publication doesn't exist, the connector creates one that includes only the selected tables (as specified in the table include list).
        - `AllTables`: If the specified publication exists, the connector uses it. If it doesn't exist, the connector creates one that includes all tables in the database.
        - `Disabled`: The connector doesn't create a publication. If the specified publication is missing, the connector throws an exception and stops. In this case, the publication must be manually created in the database.

        For more information, see the [Debezium documentation on publication autocreate mode](https://debezium.io/documentation/reference/3.1/connectors/postgresql.html#postgresql-publication-autocreate-mode)

    - **Decimal handling mode**: Specifies how the connector handles PostgreSQL `DECIMAL` and `NUMERIC` column values:
        - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
        - `Double`: Converts values to double-precision floating-point numbers. This improves usability and performance but may result in a loss of precision.
        - `String`: Encodes values as formatted strings. This makes them easy to consume in downstream systems but loses semantic information about the original numeric type.
    - **Snapshot mode**: Controls snapshot behavior when the connector starts:
        - `Initial`: The connector performs a snapshot only when no offsets have been recorded for the logical server name.
        - `Initial_only`: The connector performs an initial snapshot and then stops, without processing any subsequent changes.
        - `No_data`: The connector never performs snapshots. When a connector is configured this way, after it starts, it behaves as follows: If there's a previously stored LSN in the Kafka offsets topic, the connector continues streaming changes from that position. If no LSN is stored, the connector starts streaming changes from the point in time when the PostgreSQL logical replication slot was created on the server. Use this snapshot mode only when you know all data of interest is still reflected in the WAL.
    - **Heartbeat action query**：Specifies a query that the connector executes on the source database when the connector sends a heartbeat message.
    - **Snapshot select statement override**：Specifies the table rows to include in a snapshot. Use the property if you want a snapshot to include only a subset of the rows in a table. This property affects snapshots only. It doesn't apply to events that the connector reads from the log.

1. On the **Review + connect** page, review the summary, and then select **Add**.

    :::image type="content" source="media/postgresql-database-cdc-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page filled for the Azure PostgreSQL database connector." lightbox="media/postgresql-database-cdc-source-connector/review-create-page.png":::
