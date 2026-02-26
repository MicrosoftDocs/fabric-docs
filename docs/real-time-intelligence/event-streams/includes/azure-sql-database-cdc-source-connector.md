---
title: Azure SQL Database CDC connector for Fabric event streams
description: The include file has the common content for configuring an Azure SQL Database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 10/31/2025
---

::: zone pivot="basic-features"  
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
     > Currently, Fabric Eventstream supports only **Basic** authentication.
   - Enter **Username** and **Password** for the database.
1. Select **Connect**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the New connection page." :::
1. Now, on the **Connect** page, select **All tables**, or **Enter table name(s)**. If you select the latter, specify tables using a comma-separated list of full table identifiers (`schemaName.tableName`) or valid regular expressions. For example:  

      - Use `dbo.test.*` to select all tables whose names start with `dbo.test`.  
      - Use `dbo\.(test1|test2)` to select `dbo.test1` and `dbo.test2`.  

      You can mix both formats using commas. The total character limit for the entire entry is **102,400** characters.
1. You may expand **Advanced settings** to access additional configuration options for the Azure SQL Database CDC source:

    - **Decimal handling mode**: Defines how the connector handles `DECIMAL` and `NUMERIC` column values:
        - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
        - `Double`: Converts values to double-precision floating-point numbers. This setting improves usability and performance but might result in a loss of precision.
        - `String`: Encodes values as formatted strings. This setting makes it easy to consume in downstream systems but loses semantic information about the original numeric type.
    - **Snapshot mode**: Specify the criteria for performing a snapshot when the connector starts:
        - `Initial`: The connector runs a snapshot only when no offsets have been recorded for the logical server name, or if it detects that an earlier snapshot failed to complete. After the snapshot completes, the connector begins to stream event records for subsequent database changes.
        - `InitialOnly`: The connector runs a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It does not transition to streaming to read change events from the binlog.
        - `NoData`: The connector runs a snapshot that captures only the schema, but not any table data. Set this option if you do not need a consistent snapshot of the data, but you need only the changes happening since the connector starts.
    - **Column exclude list**: Specifies columns to exclude from change event values using fully qualified names (schemaName.tableName.columnName).
    - **Database applicationIntent**: Determines routing behavior in SQL Server Always On availability groups:
        - `ReadWrite`: Connects to the primary replica. Use this if the connection needs to perform both read and write operations.
        - `ReadOnly`: Allows routing to a readable secondary replica for read-only operations. Use it to enable CDC directly on replicas. It requires to set snapshot.isolation.mode to snapshot, which is the only one transaction isolation mode supported for read-only replicas.
    - **Snapshot select statement override**: Use the property if you want a snapshot to include only a subset of the rows in a table. This property affects snapshots only. It does not apply to events that the connector reads from the log.
1. Select **Next**.

   :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connect-page-filled.png" alt-text="Screenshot that shows the Connect page of the Get events wizard filled." lightbox="./media/azure-sql-database-cdc-source-connector/connect-page-filled.png":::
1. On the **Review and create** screen, review the summary, and then select **Add**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page of the Get events wizard filled." lightbox="./media/azure-sql-database-cdc-source-connector/review-create-page.png":::         
::: zone-end

::: zone pivot="extended-features"
Ingest change data from Azure SQL databases with automatic table schema registration via CDC into Eventstream.

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
     > Currently, Fabric Eventstream support only **Basic** authentication.
   - Enter **Username** and **Password** for the database.
1. Select **Connect**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the New connection page." :::
1. Now, on the **Connect** page, select **All tables**, or **Enter table name(s)**. If you select the latter, specify tables using a comma-separated list of full table identifiers (`schemaName.tableName`) or valid regular expressions. For example:  

      - Use `dbo.test.*` to select all tables whose names start with `dbo.test`.  
      - Use `dbo\.(test1|test2)` to select `dbo.test1` and `dbo.test2`.  

      You can mix both formats using commas. The total character limit for the entire entry is **102,400** characters.
1. You may expand **Advanced settings** to access additional configuration options for the Azure SQL Database CDC source:

    - **Decimal handling mode**: Defines how the connector handles `DECIMAL` and `NUMERIC` column values:
        - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
        - `Double`: Converts values to double-precision floating-point numbers. This setting improves usability and performance but might result in a loss of precision.
        - `String`: Encodes values as formatted strings. This setting makes it easy to consume in downstream systems but loses semantic information about the original numeric type.
    - **Snapshot mode**: Specify the criteria for performing a snapshot when the connector starts:
        - `Initial`: The connector runs a snapshot only when no offsets have been recorded for the logical server name, or if it detects that an earlier snapshot failed to complete. After the snapshot completes, the connector begins to stream event records for subsequent database changes.
        - `InitialOnly`: The connector runs a snapshot only when no offsets have been recorded for the logical server name. After the snapshot completes, the connector stops. It does not transition to streaming to read change events from the binlog.
        - `NoData`: The connector runs a snapshot that captures only the schema, but not any table data. Set this option if you do not need a consistent snapshot of the data, but you need only the changes happening since the connector starts.
    - **Column exclude list**: Specifies columns to exclude from change event values using fully qualified names (schemaName.tableName.columnName).
    - **Database applicationIntent**: Determines routing behavior in SQL Server Always On availability groups:
        - `ReadWrite`: Connects to the primary replica. Use this if the connection needs to perform both read and write operations.
        - `ReadOnly`: Allows routing to a readable secondary replica for read-only operations. Use it to enable CDC directly on replicas. It requires to set snapshot.isolation.mode to snapshot, which is the only one transaction isolation mode supported for read-only replicas.
    - **Snapshot select statement override**: Use the property if you want a snapshot to include only a subset of the rows in a table. This property affects snapshots only. It does not apply to events that the connector reads from the log.
1. Enable **event schema association**.
1. For **Workspace**, select a Fabric workspace for the schema set.
1. For **Schema set**, **+ Create** is selected by default, which creates a new schema set. You can change it to select an existing event schema set.
1. If you selected the **+ Create** option in the previous step, enter a name for the schema set.

    :::image type="content" source="./media/azure-sql-database-cdc-source-connector/azure-sql-database-enable-schema.png" alt-text="Screenshot that shows the schema setting for an Azure SQL Database CDC source." lightbox="./media/azure-sql-database-cdc-source-connector/azure-sql-database-enable-schema.png":::
1. On the **Review + connect** page, select **Add**.

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
::: zone-end
