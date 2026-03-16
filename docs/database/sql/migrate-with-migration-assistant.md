---
title: Migrate SQL Server to SQL Database in Microsoft Fabric Using Fabric Migration Assistant
description: Learn how the Fabric Migration Assistant migrates schema and data from SQL Server–based sources to a SQL database in Microsoft Fabric.
ms.reviewer: randolphwest, subasak
ms.date: 03/15/2026
ms.topic: how-to
---

# Fabric Migration Assistant for SQL database (Preview)

**Applies to**: [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

The Fabric Migration Assistant is a native Fabric experience that helps you move databases from an on-premises SQL Server to a SQL database in Microsoft Fabric.

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

It imports schema metadata from a DACPAC file generated from the source database. The Migration Assistant then identifies incompatibilities and guides you through supported fixes before you copy data into the target SQL database in Fabric.

## Prerequisites

- When you migrate data from an on-premises SQL Server instance to a SQL database in Fabric, you must configure both an on-premises data gateway and a Fabric SQL connection. The Fabric SQL connection must explicitly allow usage with gateways for migration copy operations to succeed.

- You must be a member of the **Contributor** role or higher permission in the Fabric workspace to start the migration and create the new SQL database.
- To read from the source SQL Server database, `SELECT` permissions or membership in the `db_datareader` database role are required.

Before you start the migration, make sure the following prerequisites are met.

### Source database prerequisites

A DACPAC file generated from the source SQL Server database. For information about how to generate a `.dacpac` file, see [Extract a DACPAC from a database](/sql/tools/sql-database-projects/concepts/data-tier-applications/extract-dacpac-from-database). 

### Fabric prerequisites

- [A Microsoft Fabric workspace](../../fundamentals/workspaces.md) with active capacity.

- [An on-premises data gateway](/data-integration/gateway/service-gateway-install).

   1. Follow the steps in the wizard to install the data gateway.
   1. Register the data gateway on the machine that's geographically closest to the source database.
   1. Create a connection to SQL database in Fabric. For details, see [Create a SQL database in Fabric connection](#create-a-sql-database-in-fabric-connection) in the following section.
   1. Verify that the gateway is available in the Fabric portal by navigating to **Settings** > **Manage connections and gateways** > **On-premises data gateways**.
   1. Confirm that the newly registered gateway appears in the list and is in a ready state before starting data migration.

For more information, see [Access on-premises data sources in Data Factory for Microsoft Fabric](../../data-factory/how-to-access-on-premises-data.md).

#### Create a SQL database in Fabric connection

After you register a data gateway, you must create a Fabric SQL connection for the migration destination and enable it for gateway usage.

:::image type="content" source="media/migrate-with-migration-assistant/new-connection.png" alt-text="Screenshot of the SQL database in Fabric connection in data factory." lightbox="media/migrate-with-migration-assistant/new-connection.png":::

1. In the Microsoft Fabric portal, select **Settings**.

1. Select **Manage connections and gateways**, and then select **New connection**.

1. Choose **Cloud**.

1. Enter a connection name.

1. Select connection type: **SQL database in Fabric**.

1. Configure authentication, such as **OAuth 2.0**.

1. Under the connection settings, select **Allow this connection to be utilized with either on-premises data gateways or VNet data gateways**. This setting is required because migration copy operations run through a gateway runtime. If you don't enable the Fabric SQL connection for gateway usage, data copy operations fail.

1. Select **Create** to create the connection.

## Migration workflow

When you migrate by using the Fabric Migration Assistant, complete each step before moving to the next step.

:::image type="content" source="media/migrate-with-migration-assistant/choose-source.png" alt-text="Screenshot showing SQL Server (Preview) as the migration source." lightbox="media/migrate-with-migration-assistant/choose-source.png":::

### Launch the Migration Assistant

1. In the Fabric portal, navigate to your workspace.
1. In your workspace, from the toolbar, select **Migrate** to launch the Migration Assistant.
1. In the **Migrate to Fabric** pane, under **Migrate to a database**, select **SQL Server (Preview)**.
1. On the **Overview** page, review the **What to expect when you migrate** information, and select **Next**.

### Step 1: Copy schema

Upload the DACPAC file from the source SQL environment.

:::image type="content" source="media/migrate-with-migration-assistant/upload-file.png" alt-text="Screenshot showing how to upload a DACPAC file." lightbox="media/migrate-with-migration-assistant/upload-file.png":::

At this end up this step, the migration session is created, and you can begin the schema analysis.

### Step 2: Fix script errors

The Migration Assistant analyzes the schema objects in the DACPAC and categorizes them based on compatibility with SQL database in Fabric.

:::image type="content" source="media/migrate-with-migration-assistant/analysis-results.png" alt-text="Screenshot of the migration analysis results.":::

You now have a clear picture of what you can migrate as-is and what requires attention. For database objects that fail the initial schema migration:

1. View migrated and failed objects. Review suggested fixes in the assistant.
1. Review reasons for incompatibility. Apply supported changes to incompatible objects.
1. Revalidate objects after applying fixes.

:::image type="content" source="media/migrate-with-migration-assistant/fix-problems.png" alt-text="Screenshot of the schema incompatibilities properties." lightbox="media/migrate-with-migration-assistant/fix-problems.png":::

You must resolve primary objects before you can migrate dependent objects. Then, you can correct previously incompatible objects and prepare them for deployment.

### Step 3: Prepare for copy

The **Prepare for copy** step gets the database schema ready in the new SQL database. It's then ready for data movement in the Fabric Copy Job. This step reduces copy failures and improves performance during data migration.

Copy the query from the **Prepare database for data copy** window and run it in Query Editor.

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

1. After the copy job finishes successfully, return to Migration Assistant, and mark the copy data step complete.

### Step 5: Finalize copy

The **5. Finalize Copy** step completes the data migration and enables remaining items such as constraints, triggers, and indexes, to bring the database to the desired state.

Copy the query from the Finalize Copy window and run it in query editor.

At the end of this step, the guided migration experience is complete.

## Post-migration considerations

After you complete the migration:

- Validate application queries and workloads.
- Update application connection strings.
- Review performance and compatibility with SQL database in Fabric features.

For more information, see [Microsoft Fabric migration overview](../../fundamentals/migration.md).

## Limitations

- The maximum supported size for a DACPAC file upload is 20 MB.
- Only on-premises data gateways are supported. Virtual network data gateways aren't supported.
- Private link isn't supported.

### Data copy using on-premises data gateways

**Issue**: When you migrate data by using Fabric Copy jobs with an on-premises data gateway, copy operations can fail in some environments if you autoselect the target SQL database in Fabric from the OneLake catalog.

This behavior occurs because of autobound target connections that can expire or become hidden. You can't edit or refresh these connections.

**Workaround**: Instead of selecting the target SQL database from the OneLake catalog, configure the target explicitly as an Azure SQL connection when you create the copy job. Data copy succeeds when you define the target explicitly.

## Related content

- [Microsoft Fabric Migration Overview](../../fundamentals/migration.md)
- [SQL database in Microsoft Fabric](overview.md)
