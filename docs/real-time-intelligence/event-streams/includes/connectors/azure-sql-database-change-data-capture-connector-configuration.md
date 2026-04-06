---
title: Azure SQL Database CDC connector for Fabric event streams
description: The include file has the common content for configuring an Azure SQL Database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 04/02/2026
---

Ingest change data from Azure SQL databases with automatic table schema registration via CDC into Eventstream.

> [!NOTE]
> **DeltaFlow (Preview)**: When you select **Analytics-ready events & auto-updated schema** in the schema handling step, DeltaFlow transforms raw Debezium CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow also automates destination table creation and schema evolution handling.

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/new-connection-link.png" alt-text="Screenshot that shows the Connect page of the Get events wizard with the New connection link highlighted." lightbox="./media/azure-sql-database-cdc-source-connector/new-connection-link.png"::: 
1. In the **Connection settings** section, enter the following values for your Azure SQL database:

   - **Server:** Enter the Azure SQL server name from the Azure portal. It's in this form: `mysqlservername.database.windows.net`. 
   - **Database:** Enter the Azure SQL database name from the Azure portal.

        :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connect.png" alt-text="Screenshot that shows the Connection settings section of the New connection page." :::
1. Scroll down, and in the **Connection credentials** section, follow these steps.
   - For **Connection name**, enter a name for the connection.
   - For **Authentication kind**, select **Basic**.

     > [!NOTE]
     > Currently, Fabric Eventstream supports only **Basic** authentication.
   - Enter **Username** and **Password** for the database.
1. Select **Connect**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the New connection page." :::
1. Now, on the **Connect** page, select **All tables**, or **Enter table name(s)**. If you select the latter, specify tables using a comma-separated list of full table identifiers (`schemaName.tableName`) or valid regular expressions. For example:  

      - Use `dbo.test.*` to select all tables whose names start with `dbo.test`.  
      - Use `dbo\.(test1|test2)` to select `dbo.test1` and `dbo.test2`.  

      You can mix both formats using commas. The total character limit for the entire entry is **102,400** characters.
1. You can expand **Advanced settings** to access more configuration options for the Azure SQL Database CDC source:

    - **Decimal handling mode**: Defines how the connector handles `DECIMAL` and `NUMERIC` column values:
        - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
        - `Double`: Converts values to double-precision floating-point numbers. This setting improves usability and performance but might result in a loss of precision.
        - `String`: Encodes values as formatted strings. This setting makes it easy to consume in downstream systems but loses semantic information about the original numeric type.
    - **Snapshot mode**: Specify the criteria for performing a snapshot when the connector starts:
        - `Initial`: The connector runs a snapshot only when no offsets have been recorded for the logical server name, or if it detects that an earlier snapshot failed to complete. After the snapshot completes, the connector begins to stream event records for subsequent database changes.
        - `InitialOnly`: The connector runs a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It doesn't transition to streaming to read change events from the binlog.
        - `NoData`: The connector runs a snapshot that captures only the schema, but not any table data. Set this option if you don't need a consistent snapshot of the data, but you need only the changes happening since the connector starts.
    - **Column exclude list**: Specifies columns to exclude from change event values using fully qualified names (schemaName.tableName.columnName).
    - **Database applicationIntent**: Determines the routing behavior in SQL Server Always On availability groups:
        - `ReadWrite`: Connects to the primary replica. Use this option if the connection needs to perform both read and write operations.
        - `ReadOnly`: Allows routing to a readable secondary replica for read-only operations. Use it to enable CDC directly on replicas. It requires to set snapshot.isolation.mode to snapshot, which is the only one transaction isolation mode supported for read-only replicas.
    - **Snapshot select statement override**: Use the property if you want a snapshot to include only a subset of the rows in a table. This property affects snapshots only. It doesn't apply to events that the connector reads from the log.

[!INCLUDE [stream-source-details](./stream-source-details.md)]

1. Select **Next** at the bottom of the page.
1. In the **Schema handling** page, choose one of the following options:

    - **Analytics-ready events & auto-updated schema (DeltaFlow Preview)**: The connector transforms raw CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow enriches events with metadata such as change type (insert, update, or delete) and timestamps, and automatically manages destination tables and schema evolution.
    - **Raw CDC events**: The connector ingests and makes available the raw CDC events. Optionally, the connector can autodiscover table schemas and register them in the schema registry. Use this option when you want schema awareness without DeltaFlow transformation.

    > [!NOTE]
    > The following screenshot shows Azure SQL Database CDC. The schema handling options are the same for all supported CDC source connectors.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/enable-schema-handling.gif" alt-text="Screenshot showing the schema handling step with DeltaFlow and Raw CDC event options for a CDC source connector." lightbox="./media/azure-sql-database-cdc-source-connector/enable-schema-handling.gif":::

1. Enable **event schema association**.
1. For **Workspace**, select a Fabric workspace for the schema set.
1. For **Schema set**, **+ Create** is selected by default, which creates a new schema set. You can change it to select an existing event schema set.
1. If you selected the **+ Create** option in the previous step, enter a name for the schema set.
1. On the **Review + connect** page, select **Add** (Eventstream) or **Connect** (Real-Time hub)..

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/sql-database-review-connect.png" alt-text="Screenshot that shows the review + connect page for the Azure SQL Database CDC source." lightbox="./media/azure-sql-database-cdc-source-connector/sql-database-review-connect.png":::

    For all tables or selected tables in the Azure SQL database, the connector autodiscovers and creates schemas, and registers them with the schema registry.
1. Select the **eventstream** node in the middle, and switch to the **Associated schemas** tab in the bottom pane. 

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/generated-schemas.png" alt-text="Screenshot that shows the Associated schema window in the bottom pane." lightbox="./media/azure-sql-database-cdc-source-connector/generated-schemas.png":::

### Schema set

1. Navigate to the workspace you selected in the previous step. In the following example, it's **My workspace**.

1. Select the schema set that the Azure SQL Database (CDC) connector created.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/schema-set.png" alt-text="Screenshot that shows the generated schema set in the My workspace page." lightbox="./media/azure-sql-database-cdc-source-connector/schema-set.png":::
1. You see the schemas in the schema set as shown in the following image.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/schemas.png" alt-text="Screenshot that shows schemas in the generated schema set." lightbox="./media/azure-sql-database-cdc-source-connector/schemas.png":::
1. To see the JSON version of the schema, switch to the **JSON schema** view.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/json-schema.png" alt-text="Screenshot that shows the JSON schema view." lightbox="./media/azure-sql-database-cdc-source-connector/json-schema.png":::

    Don't change these discovered schemas using this editor as it becomes nonconfirmant with the schema of tables in the Azure SQL database source.

### DeltaFlow: Analytics-ready event transformation (Preview)

When you enable **Analytics-ready events & auto-updated schema** (DeltaFlow), the connector provides the following capabilities:

- **Analytics-ready event shape**: Raw Debezium CDC events are transformed into a tabular format that mirrors the source table structure. Events are enriched with metadata columns including the change type (`insert`, `update`, or `delete`) and the event timestamp.
- **Automatic destination table management**: When you route DeltaFlow-enabled streams to a supported destination like an eventhouse, destination tables are automatically created to match the source table schema. You don't need to manually create or configure destination tables.
- **Schema evolution handling**: When source database tables change (for example, new columns are added or tables are created), DeltaFlow automatically detects the changes, updates the registered schemas, and adjusts the destination tables accordingly. This option minimizes manual intervention caused by schema changes.

    :::image type="content" source="../media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif" alt-text="Screenshot showing Eventhouse destination tables in analytics-ready shape created by DeltaFlow." lightbox="../media/configure-destinations-schema-enabled-sources/delta-flow-destination-tables.gif":::

> [!NOTE]
> DeltaFlow (Preview) is currently supported with Azure SQL Database CDC, Azure SQL Managed Instance CDC, SQL Server on VM CDC, and PostgreSQL CDC source connectors.

For details on how DeltaFlow transforms raw CDC events into analytics-ready output, including operation types and metadata columns, see [DeltaFlow output transformation](../../delta-flow-output-transformation.md).

