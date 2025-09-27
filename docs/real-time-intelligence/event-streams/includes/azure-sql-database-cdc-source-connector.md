---
title: Azure SQL Database CDC connector for Fabric event streams
description: The include file has the common content for configuring an Azure SQL Database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.author: zhenxilin
author: alexlzx
ms.topic: include
ms.custom:
ms.date: 11/18/2024
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
1. You can expand **Advanced settings** to configure the **Decimal handling mode**, which specifies how the connector handles `DECIMAL` and `NUMERIC` column values:

      - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
      - `Double`: Converts values to double-precision floating-point numbers. This setting improves usability and performance but might result in a loss of precision.
      - `String`: Encodes values as formatted strings. This setting makes it easy to consume in downstream systems but loses semantic information about the original numeric type.
1. Select **Next**.

   :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connect-page-filled.png" alt-text="Screenshot that shows the Connect page of the Get events wizard filled." lightbox="./media/azure-sql-database-cdc-source-connector/connect-page-filled.png":::
1. On the **Review and create** screen, review the summary, and then select **Add**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page of the Get events wizard filled." lightbox="./media/azure-sql-database-cdc-source-connector/review-create-page.png":::         
::: zone-end

::: zone pivot="extended-features"
Ingest change data from Azure SQL databases with automatic table schema registration via CDC into Eventstream.

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
     > Currently, Fabric Eventstream support only **Basic** authentication.
   - Enter **Username** and **Password** for the database.
1. Select **Connect**.

      :::image type="content" source="./media/azure-sql-database-cdc-source-connector/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the New connection page." :::
1. Now, on the **Connect** page, select **All tables**, or **Enter table name(s)**. If you select the latter, specify tables using a comma-separated list of full table identifiers (`schemaName.tableName`) or valid regular expressions. For example:  

      - Use `dbo.test.*` to select all tables whose names start with `dbo.test`.  
      - Use `dbo\.(test1|test2)` to select `dbo.test1` and `dbo.test2`.  

      You can mix both formats using commas. The total character limit for the entire entry is **102,400** characters.
1. You might expand **Advanced settings** to configure the **Decimal handling mode**, which specifies how the connector handles `DECIMAL` and `NUMERIC` column values:

      - `Precise`: Represents values using exact decimal types (for example, Java `BigDecimal`) to ensure full precision and accuracy in data representation.
      - `Double`: Converts values to double-precision floating-point numbers. This setting improves usability and performance but might result in a loss of precision.
      - `String`: Encodes values as formatted strings. This setting makes it easy to consume in downstream systems but loses semantic information about the original numeric type.
1. Enable **event schema association**.
1. For **Workspace**, select a Fabric workspace for the schema set.
1. For **Schema set**, **+ Create** is selected by default, which creates a new schema set. You can change it to select an existing event schema set.
1. If you selected the **+ Create** option in the previous step, enter a name for the schema set.

    :::image type="content" source="../../schema-sets/media/use-event-schemas/azure-sql-database-enable-schema.png" alt-text="Screenshot that shows the schema setting for an Azure SQL Database CDC source." lightbox="../../schema-sets/media/use-event-schemas/azure-sql-database-enable-schema.png":::
1. On the **Review + connect** page, select **Add**.

    :::image type="content" source="../../schema-sets/media/use-event-schemas/sql-database-review-connect.png" alt-text="Screenshot that shows the review + connect page for the Azure SQL Database CDC source." lightbox="../../schema-sets/media/use-event-schemas/sql-database-review-connect.png":::

    For all tables or selected tables in the Azure SQL database, the connector autodiscovers and creates schemas, and registers them with the schema registry.
1. Select the **eventstream** node in the middle, and switch to the **Associated schemas** tab in the bottom pane. 

    :::image type="content" source="../../schema-sets/media/use-event-schemas/generated-schemas.png" alt-text="Screenshot that shows the Associated schema window in the bottom pane." lightbox="../../schema-sets/media/use-event-schemas/generated-schemas.png":::

### Schema set

1. Navigate to the workspace you selected in the previous step. In the following example, it's **My workspace**.

1. Select the schema set that the Azure SQL Database (CDC) connector created.

    :::image type="content" source="../../schema-sets/media/use-event-schemas/schema-set.png" alt-text="Screenshot that shows the generated schema set in the My workspace page." lightbox="../../schema-sets/media/use-event-schemas/schema-set.png":::
1. You see the schemas in the schema set as shown in the following image.

    :::image type="content" source="../../schema-sets/media/use-event-schemas/schemas.png" alt-text="Screenshot that shows schemas in the generated schema set." lightbox="../../schema-sets/media/use-event-schemas/schemas.png":::
1. To see the JSON version of the schema, switch to the **JSON schema** view.

    :::image type="content" source="../../schema-sets/media/use-event-schemas/json-schema.png" alt-text="Screenshot that shows the JSON schema view." lightbox="../../schema-sets/media/use-event-schemas/json-schema.png":::

    Don't change these discovered schemas using this editor as it becomes nonconfirmant with the schema of tables in the Azure SQL database source.
::: zone-end