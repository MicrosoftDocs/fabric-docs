---
title: Migrate SQL Server to SQL Database in Fabric by using the Fabric Migration Assistant
description: Learn how the Fabric Migration Assistant migrates schema and data from SQL Server–based sources to a SQL database in Microsoft Fabric using a DACPAC file.
ms.reviewer: randolphwest, subasak, niball, antho
ms.date: 04/07/2026
ms.topic: how-to
---
# Migrate to SQL database in Fabric with the Migration Assistant by using DACPAC

**Applies to**: [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

The Fabric Migration Assistant can import schema metadata from a DACPAC file and guide you through copying data into the target SQL database in Fabric.

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Prerequisites

Before you start, make sure the following prerequisites are met.

### Fabric prerequisites

- You need [a Microsoft Fabric workspace](../../fundamentals/workspaces.md) with active capacity.
- For communication between your source SQL Server instance and Microsoft Fabric, you need to install an [on-premises data gateway](/data-integration/gateway/service-gateway-install).
    - For more information, see [Access on-premises data sources in Data Factory for Microsoft Fabric](../../data-factory/how-to-access-on-premises-data.md).
    - Register the data gateway on a machine that's geographically closest to the source database.
    - Verify that the gateway is available in the Fabric portal by navigating to **Settings** > **Manage connections and gateways** > **On-premises data gateways**.
    - Confirm that the newly registered gateway appears in the list and is in a ready state before starting data migration.
- A Fabric SQL connection created and enabled for gateway usage. Migration copy operations run through a gateway runtime. If gateway usage isn't enabled on the Fabric SQL connection, data copy operations will fail.

### Source database prerequisites

- A DACPAC file generated from the source SQL Server database. For information about how to generate a `.dacpac` file, see [Extract a DACPAC from a database](/sql/tools/sql-database-projects/concepts/data-tier-applications/extract-dacpac-from-database). 

## Create a SQL database in Fabric connection

After registering an on-premises data gateway, create a Fabric SQL connection and enable it for gateway usage.

:::image type="content" source="media/migrate-with-migration-assistant/new-connection.png" alt-text="Screenshot of the SQL database in Fabric connection in data factory." lightbox="media/migrate-with-migration-assistant/new-connection.png":::

### Steps

1. In the Microsoft Fabric portal, select **Settings**. 1. Select **Manage connections and gateways**, and then select **New**.
1. In the **New Connection** pane, choose **Cloud**.
1. Enter a connection name.
1. Select **SQL database in Fabric** as the connection type.
1. Configure authentication, such as **OAuth 2.0**.
1.  Under the connection settings, select **Allow this connection to be utilized with either on-premises data gateways or VNet data gateways**. This setting is required because migration copy operations run through a gateway runtime. If you don't enable the Fabric SQL connection for gateway usage, data copy operations fail.
1. Select **Create** to create the connection.

## Launch the Migration Assistant

After you configure the on-premises data gateway and create the Fabric SQL connection, you're ready to start the Migration Assistant.

:::image type="content" source="media/migrate-with-migration-assistant/choose-source.png" alt-text="Screenshot showing SQL Server (Preview) as the migration source." lightbox="media/migrate-with-migration-assistant/choose-source.png":::

1. In the Fabric portal, go to your workspace. From the toolbar, select **Migrate** to launch the Migration Assistant.
1. In the **Migrate to Fabric** pane, under **Migrate to a database**, select **SQL Server (Preview)**.
1. On the **Overview** page, review the **What to expect when you migrate** information, and select **Next**.

### Step 1: Copy schema

On the **Select the source** page, upload the DACPAC file from the source SQL Server environment.

:::image type="content" source="media/migrate-with-migration-assistant/upload-file.png" alt-text="Screenshot showing how to upload a DACPAC file." lightbox="media/migrate-with-migration-assistant/upload-file.png":::

When this step completes:

- A migration session is created.
- Schema analysis begins automatically.

### Step 2: Fix script errors

The Migration Assistant analyzes the schema objects in the DACPAC and categorizes them based on compatibility with SQL database in Fabric.

:::image type="content" source="media/migrate-with-migration-assistant/analysis-results.png" alt-text="Screenshot of an example of migration analysis results.":::

You now have a clear picture of what you can migrate as-is and what requires attention. You must resolve primary objects before dependent objects can be migrated. For database objects that fail the initial schema migration:

1. View migrated and failed objects. Review suggested fixes in the assistant.
1. Review reasons for incompatibility. Apply supported changes to incompatible objects.
1. Revalidate objects after applying fixes.

For example, you might see identified syntax incompatibilities and the **Fix query errors** button to provide a T-SQL script fix or workaround.

:::image type="content" source="media/migrate-with-migration-assistant/fix-problems.png" alt-text="Screenshot of the schema incompatibilities properties." lightbox="media/migrate-with-migration-assistant/fix-problems.png":::

### Step 3: Prepare for copy

The **Prepare for copy** step prepares the database schema in the new SQL database. The schema is ready for data movement in the Fabric Copy Job. This step reduces copy failures and improves performance during data migration.

1. Copy the generated preparation script.
1. Run the script in the Query Editor against the target SQL database.

### Step 4: Copy data

1. Select **4. Copy data** in Migration Assistant.
1. Choose **Use a copy job**. Name the job, and then select **Create** to open the Copy Job wizard.
1. Source configuration:

   In **Choose data source**, complete the following information.

   1. Choose **SQL Server database** as the source type.
   1. Select or create the source connection.
   1. Enter the SQL Server instance and database details.
   1. Select the on-premises data gateway used to connect to the source SQL Server instance.
   1. Select authentication. Use the Organization account option.
   1. If encryption isn't enabled on the source SQL Server instance, disable encryption in settings.
   1. Select **Next**.

1. Select tables:

   1. In **Choose data**, select the tables to migrate.
   1. Confirm the target schema already exists (from schema migration), and select **Next**.

1. Review + run:

   1. Review column mappings.
   1. Select **Copy mode**.
   1. Review the summary.
   1. Select **Save + Run**.

1. Monitor:

   To monitor the progress of the Copy Job, check the following values:

   - Rows read and written
   - Per-table status
   - Migration errors, if any

   Resolve failures and rerun tables as needed.

1. After the copy job finishes successfully, return to the **Migration Assistant**, and mark the copy data step complete.

### Step 5: Finalize copy

The **5. Finalize Copy** step completes the data migration and enables remaining items such as constraints, triggers, and indexes, to bring the database to the desired state.

Copy the query from the Finalize Copy window and run it in query editor.

At the end of this step, the guided migration experience is complete.

## Post-migration considerations

After you complete the migration:

- Validate application queries and workloads.
- Update application connection strings.
- Review performance and compatibility with SQL database in Fabric features.

## Related content

- [Fabric Migration Assistant for SQL database (Preview)](migration-assistant.md)
- [Microsoft Fabric Migration Overview](../../fundamentals/migration.md)