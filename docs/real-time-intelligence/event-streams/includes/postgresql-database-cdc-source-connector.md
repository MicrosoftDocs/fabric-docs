---
title: PostgreSQL CDC connector for Fabric event streams
description: The include file has the common content for configuring a PostgreSQL Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.reviewer: zhenxilin
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 10/31/2025
---

Ingest change data from PostgreSQL databases with automatic table schema registration via CDC into Eventstream.

> [!NOTE]
> **DeltaFlow (Preview)**: When you select **Analytics-ready events & auto-updated schema** in the schema handling step, DeltaFlow transforms raw Debezium CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow also automates destination table creation and schema evolution handling.

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="media/postgresql-database-cdc-source-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page for a PostgreSQL database with New connection link highlighted.":::
1. In the **Connection settings** section, enter the following information.

   - **Server**: The server address of your PostgreSQL database, for example *my-pgsql-server.postgres.database.azure.com*.
   - **Database**: The database name, for example *my_database*.

        :::image type="content" source="media/postgresql-database-cdc-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section for the PostgreSQL database connector.":::
    - **Connection name**: Enter a name for the connection.
    - **Authentication kind**, Select **Basic** and enter your **Username** and **Password** for the database.
        > [!NOTE]
        > Currently, Fabric event streams support only **Basic** authentication.
    - Select **Connect** to complete the connection settings.
        :::image type="content" source="media/postgresql-database-cdc-source-connector/connect.png" alt-text="Screenshot that shows the Connection credentials section for the PostgreSQL database connector.":::

1. **Port**: Enter the port number of your server. Default value is **5432**. If your selected cloud connection is configured in **Manage connections and gateways**, ensure that the port number matches the one set there. If they don't match, the port number in cloud connection in **Manage connections and gateways** take precedence.

1. You can choose between two options when capturing changes from database tables:
    - **All tables**: Capture changes from every table in the database.
    - **Enter table name(s)**: Allows you to specify a subset of tables using a comma-separated list. You can use either: full table identifiers in the format `schemaName.tableName` or valid regular expressions.
    Examples:
    - `dbo.test.*`: Select all tables whose names start with `test` in the `dbo` schema.
    - `dbo\.(test1|test2)`: Select `dbo.test1` and `dbo.test2`.

    You can combine both formats in the list. The total character limit for the entire entry is **102,400** characters.

1. **Slot name (optional)**: Enter the name of the PostgreSQL logical decoding slot that was created for streaming changes from a particular plug-in for a particular database/schema. The server uses this slot to stream events to Eventstream streaming connector. It must contain only lowercase letters, numbers, and underscores.
    - If not specified, a GUID is used to create the slot, requiring the appropriate database permissions.
    - If a specified slot name exists, the connector uses it directly.

1. Expand **Advanced settings** to access more configuration options for the PostgreSQL Database CDC source:
    - **Publication name**: Specifies the name of the PostgreSQL logical replication publication to use. This value must match an existing publication in the database, or it will be created automatically depending on the autocreate mode. Default value: `dbz_publication`.

        > [!NOTE]
        > The connector user must have superuser permissions to create the publication. We recommend that you create the publication manually before starting the connector for the first time to avoid permission-related issues.

    - **Publication auto-create mode**: Controls whether and how the publication is automatically created. Options include:
        - `Filtered` (default): If the specified publication doesn't exist, the connector creates one that includes only the selected tables (as specified in the table include list).
        - `AllTables`: If the specified publication exists, the connector uses it. If it doesn't exist, the connector creates one that includes all tables in the database.
        - `Disabled`: The connector doesn't create a publication. If the specified publication is missing, the connector throws an exception and stops. In this case, the publication must be manually created in the database.

        For more information, see the [Debezium documentation on publication autocreate mode](https://debezium.io/documentation/reference/3.1/connectors/postgresql.html#postgresql-publication-autocreate-mode)

    - **Decimal handling mode**: Specifies how the connector handles PostgreSQL `DECIMAL` and `NUMERIC` column values:
        - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
        - `Double`: Converts values to double-precision floating-point numbers. This option improves usability and performance but can result in a loss of precision.
        - `String`: Encodes values as formatted strings. This option makes them easy to consume in downstream systems but loses semantic information about the original numeric type.
    - **Snapshot mode**: Specify the criteria for performing a snapshot when the connector starts:
        - `Initial`: The connector runs a snapshot only when no offsets have been recorded for the logical server name, or if it detects that an earlier snapshot failed to complete. After the snapshot completes, the connector begins to stream event records for subsequent database changes.
        - `InitialOnly`: The connector runs a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It doesn't transition to streaming to read change events from the binlog.
        - `NoData`: The connector runs a snapshot that captures only the schema, but not any table data. Set this option if you don't need a consistent snapshot of the data, but you need only the changes happening since the connector starts.
    - **Heartbeat action query**： Specifies a query that the connector executes on the source database when the connector sends a heartbeat message.
    - **Snapshot select statement override**： Specifies the table rows to include in a snapshot. Use the property if you want a snapshot to include only a subset of the rows in a table. This property affects snapshots only. It doesn't apply to events that the connector reads from the log.

1. In the **Schema handling** step, choose one of the following options:

    - **Analytics-ready events & auto-updated schema (DeltaFlow Preview)**: The connector transforms raw CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow enriches events with metadata such as change type (insert, update, or delete) and timestamps, and automatically manages destination tables and schema evolution.
    - **Raw CDC events**: The connector ingests and makes available the raw CDC events. Optionally, the connector can autodiscover table schemas and register them in the schema registry. Use this option when you want schema awareness without DeltaFlow transformation.

    > [!NOTE]
    > The following screenshot shows Azure SQL Database CDC. The schema handling options are the same for all supported CDC source connectors.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/enable-schema-handling.gif" alt-text="Screenshot showing the schema handling step with DeltaFlow and Raw CDC event options for a CDC source connector." lightbox="./media/azure-sql-database-cdc-source-connector/enable-schema-handling.gif":::

1. Enable **event schema association**.
1. For **Workspace**, select a Fabric workspace for the schema set.
1. For **Schema set**, **+ Create** is selected by default, which creates a new schema set. You can change it to select an existing event schema set.
1. If you selected the **+ Create** option in the previous step, enter a name for the schema set.
1. On the **Review + connect** page, review the summary, and then select **Add**.

    :::image type="content" source="media/postgresql-database-cdc-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page for the PostgreSQL database connector with extended features." lightbox="media/postgresql-database-cdc-source-connector/review-create-page.png":::

    For all tables or selected tables in the PostgreSQL database, the connector autodiscovers and creates schemas, and registers them with the schema registry.

### DeltaFlow: Analytics-ready event transformation (Preview)

When you enable **Analytics-ready events & auto-updated schema** (DeltaFlow), the connector provides the following capabilities:

- **Analytics-ready event shape**: Raw Debezium CDC events are transformed into a tabular format that mirrors the source table structure. Events are enriched with metadata columns including the change type (`insert`, `update`, or `delete`) and the event timestamp.
- **Automatic destination table management**: When you route DeltaFlow-enabled streams to a supported destination like an eventhouse, destination tables are automatically created to match the source table schema. You don't need to manually create or configure destination tables.
- **Schema evolution handling**: When source database tables change (for example, new columns are added or tables are created), DeltaFlow automatically detects the changes, updates the registered schemas, and adjusts the destination tables accordingly. This minimizes manual intervention caused by schema changes.

> [!NOTE]
> DeltaFlow (Preview) is currently supported with Azure SQL Database CDC, Azure SQL Managed Instance CDC, SQL Server on VM CDC, and PostgreSQL CDC source connectors.

For details on how DeltaFlow transforms raw CDC events into analytics-ready output, including operation types and metadata columns, see [DeltaFlow output transformation](../deltaflow-output-transformation.md).
