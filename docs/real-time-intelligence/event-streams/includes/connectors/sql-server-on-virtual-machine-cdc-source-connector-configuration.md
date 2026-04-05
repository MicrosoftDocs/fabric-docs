---
title: SQL Server on Virtual Machine (VM) - database (DB) CDC connector for Fabric event streams
description: Provides the common content for configuring a SQL Server on a Virtual Machine - database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 04/03/2026
---

Ingest change data from SQL Server on VM databases with automatic table schema registration via CDC into Eventstream.

> [!NOTE]
> **DeltaFlow (Preview)**: When you select **Analytics-ready events & auto-updated schema** in the schema handling step, DeltaFlow transforms raw Debezium CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow also automates destination table creation and schema evolution handling.

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="media/sql-server-on-virtual-machine-cdc-source-connector/new-connection.png" alt-text="Screenshot that shows the selection of New connection link on the Connect page." lightbox="media/sql-server-on-virtual-machine-cdc-source-connector/new-connection.png":::    
1. In the **Connection settings** section, enter the following values for your SQL Server on VM:
    - **Server:** Enter the IP address or domain name of your VM, and then add a colon and the port. For example, if your IP address is `xx.xxx.xxx.xxx` and the port is 1433, then you should enter `xx.xxx.xxx.xxx:1433` in the **Server** field. If the port isn't specified, the default port value `1433` is used.
    - **Database:** Enter the name of the database that you want to connect to on your SQL Server on VM.
   
        :::image type="content" source="media/sql-server-on-virtual-machine-cdc-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section of the Connect page.":::        
1. Scroll down, and in the Connection credentials section, follow these steps.
    - For **Connection name**, enter a name for the connection.
    - For **Authentication kind**, select **Basic**.
    
        > [!NOTE]
        > Currently, Fabric Eventstream supports only **Basic** authentication.
    - Enter **Username** and **Password** for the SQL Server on VM.

        > [!NOTE]
        > Don't select the option: **Use encrypted connection**. 

        :::image type="content" source="media/sql-server-on-virtual-machine-cdc-source-connector/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the Connect page."::: 
1. Select **Connect** at the bottom of the page.
1. Now, on the **Connect** page, select **All tables**, or **Enter table name(s)**. If you select the latter, specify tables using a comma-separated list of full table identifiers (`schemaName.tableName`) or valid regular expressions. For example:  

    - Use `dbo.test.*` to select all tables whose names start with `dbo.test`.  
    - Use `dbo\.(test1|test2)` to select `dbo.test1` and `dbo.test2`.  

    You can mix both formats using commas. The total character limit for the entire entry is **102,400** characters.
1. You can expand **Advanced settings** to configure the **Decimal handling mode**, which specifies how the connector handles `DECIMAL` and `NUMERIC` column values:

      - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
      - `Double`: Converts values to double-precision floating-point numbers. This setting improves usability and performance but can result in a loss of precision.
      - `String`: Encodes values as formatted strings. This setting makes them easy to consume in downstream systems but loses semantic information about the original numeric type.
1. In the **Schema handling** step, choose one of the following options:

    - **Analytics-ready events & auto-updated schema (DeltaFlow Preview)**: The connector transforms raw CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow enriches events with metadata such as change type (insert, update, or delete) and timestamps, and automatically manages destination tables and schema evolution.
    - **Raw CDC events**: The connector ingests and makes available the raw CDC events. Optionally, the connector can autodiscover table schemas and register them in the schema registry. Use this option when you want schema awareness without DeltaFlow transformation.

    > [!NOTE]
    > The following screenshot shows Azure SQL Database CDC. The schema handling options are the same for all supported CDC source connectors.

    :::image type="content" source="media/azure-sql-database-cdc-source-connector/enable-schema-handling.gif" alt-text="Screenshot showing the schema handling step with DeltaFlow and Raw CDC event options for a CDC source connector." lightbox="media/azure-sql-database-cdc-source-connector/enable-schema-handling.gif":::

1. Enable **event schema association**.
1. For **Workspace**, select a Fabric workspace for the schema set.
1. For **Schema set**, **+ Create** is selected by default, which creates a new schema set. You can change it to select an existing event schema set.
1. If you selected the **+ Create** option in the previous step, enter a name for the schema set.
1. On the **Review + create** screen, review the summary, and select **Add** (Eventstream) or **Connect** (Real-Time hub).

    :::image type="content" source="media/sql-server-on-virtual-machine-cdc-source-connector/review-add.png" alt-text="Screenshot that shows the selection of the Add button." lightbox="media/sql-server-on-virtual-machine-cdc-source-connector/review-add.png"::: 

    For all tables or selected tables in the SQL Server on VM database, the connector autodiscovers and creates schemas, and registers them with the schema registry.

### DeltaFlow: Analytics-ready event transformation (Preview)

When you enable **Analytics-ready events & auto-updated schema** (DeltaFlow), the connector provides the following capabilities:

- **Analytics-ready event shape**: Raw Debezium CDC events are transformed into a tabular format that mirrors the source table structure. Events are enriched with metadata columns including the change type (`insert`, `update`, or `delete`) and the event timestamp.
- **Automatic destination table management**: When you route DeltaFlow-enabled streams to a supported destination like an eventhouse, destination tables are automatically created to match the source table schema. You don't need to manually create or configure destination tables.
- **Schema evolution handling**: When source database tables change (for example, new columns are added or tables are created), DeltaFlow automatically detects the changes, updates the registered schemas, and adjusts the destination tables accordingly. This feature minimizes manual intervention caused by schema changes.

> [!NOTE]
> DeltaFlow (Preview) is currently supported with Azure SQL Database CDC, Azure SQL Managed Instance CDC, SQL Server on VM CDC, and PostgreSQL CDC source connectors.

For details on how DeltaFlow transforms raw CDC events into analytics-ready output, including operation types and metadata columns, see [DeltaFlow output transformation](../../delta-flow-output-transformation.md).
