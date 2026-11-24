---
title: Migrate by uploading a file with the Migration Assistant
description: Learn how to migrate source metadata to Fabric Data Warehouse by uploading a DACPAC file or a zip archive of SQL or BTEQ files.
ms.reviewer: anphil, pvenkat, prlangad
ms.date: 10/13/2026
ms.topic: how-to
ms.search.form: Migration Assistant
ai-usage: ai-assisted
---
# Migrate by uploading a file with the Fabric Migration Assistant

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

The [Fabric Migration Assistant](migration-assistant.md) provides a guided experience for migrating source metadata and data to Fabric Data Warehouse. This guide explains how to migrate metadata from:

- Azure Synapse Analytics or SQL Server by using a DACPAC file
- Teradata by using a .zip archive of `.sql` and/or `.bteq` files

> [!TIP]
> For source-specific planning, see:
> - [Plan migration from Azure Synapse Analytics](migration-synapse-dedicated-sql-pool-planning.md)
> - [Plan migration from SQL Server](migration-sql-server-planning.md)
> - [Plan migration from Teradata](migration-teradata-planning.md)

## Prerequisites

Before you begin, make sure you have the following ready:

- A Fabric workspace with an active capacity or trial capacity.
- [Create a workspace](../fundamentals/create-workspaces.md) or select an existing workspace you want to migrate into. The Migration Assistant creates a new warehouse for you.
- A source metadata file in one of these formats:
   - A DACPAC file extracted from Azure Synapse Analytics or SQL Server. A [DACPAC](/sql/tools/sql-database-projects/concepts/data-tier-applications/overview) contains metadata for database objects, including tables, views, stored procedures, and functions.
      - To create a DACPAC from Azure Synapse Analytics, see [Extract a Data-tier Application (DAC) from an Azure Synapse dedicated SQL pool in Visual Studio 2022](extract-data-tier-application-synapse-dedicated-sql-pool.md).
      - You can also use the [Generate Scripts Wizard in SQL Server Management Studio (SSMS)](/ssms/scripting/generate-and-publish-scripts-wizard), [SDK-style database projects](https://marketplace.visualstudio.com/items?itemName=ms-mssql.sql-database-projects-vscode) with Visual Studio Code, or the [SqlPackage command-line utility](/sql/tools/sqlpackage/sqlpackage-extract).
   - A zip archive of Teradata `.sql` and/or `.bteq` files that contains the object definitions and dependencies for the migration.

To use the AI-assisted migration features of the Migration Assistant to fix migration problems, you need to activate Copilot:

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

### Copy metadata

1. In your Fabric workspace, select the **Migrate** button on the item action deck.

    :::image type="content" source="media/migrate-using-upload-file/migrate-button.png" alt-text="Screenshot from the Fabric portal of the Migrate button in the item action deck.":::

1. In the **Migrate to Fabric** source menu, under **Migrate to a warehouse**, select the source system tile:
   - For Azure Synapse Analytics, select **Azure Synapse Analytics dedicated SQL pool**.
   - For SQL Server, Azure SQL Database, or Azure SQL Managed Instance, select **SQL Server database**.
   - For Teradata, select **Teradata (Preview)**.

   :::image type="content" source="media/migrate-using-upload-file/source-system-tile.png" alt-text="Screenshot from the Fabric portal of the source system tiles." lightbox="media/migrate-using-upload-file/source-system-tile.png":::

1. If the **Choose your method** page appears, select **Upload a file with the source metadata**, and then select **Next**.

   :::image type="content" source="media/migrate-using-upload-file/choose-your-method-upload-file.png" alt-text="Screenshot from the Fabric portal, showing how to upload a file for migration.":::

1. On **Set the source**, select **Choose file**, select the source file, and then select **Next**.

   :::image type="content" source="media/migrate-using-upload-file/upload-dacpac-choose-file.png" alt-text="Screenshot from the Fabric portal of the source metadata file upload step in Migration Assistant." lightbox="media/migrate-using-upload-file/upload-dacpac-choose-file.png":::

1. In the **Choose objects to migrate** page, select objects to migrate.

   :::image type="content" source="media/migrate-using-upload-file/choose-objects.png" alt-text="Screenshot from the Fabric portal, showing object selection step.":::

1. In the **Set the destination** page, provide the name of the Fabric workspace and new warehouse item you want to migrate into. Select **Next**.

1. Review your inputs and select **Migrate**. The Migration Assistant creates a new warehouse item and starts the metadata migration.

   > [!NOTE]
   > When using the Migration Assistant, the new warehouse has **case insensitive collation**, regardless of the [default warehouse collation setting](collation.md).

   :::image type="content" source="media/migrate-using-upload-file/review-upload-dacpac.png" alt-text="Screenshot from the Fabric portal of the Review page of the Migration Assistant. The source is a DACPAC file and the Destination is a new warehouse item named AdventureWorks." lightbox="media/migrate-using-upload-file/review-upload-dacpac.png":::

   During this step, the Migration Assistant translates T-SQL metadata to supported T-SQL syntax in Fabric Data Warehouse. After the metadata migration finishes, the Migration Assistant opens. You can access the Migration Assistant at any time by using the **Migration** button in the Home tab of the warehouse ribbon.

1. Review the metadata migration summary in the Migration Assistant. You see the count of migrated objects and the objects that need to be fixed before they can be migrated.

   :::image type="content" source="media/migrate-using-upload-file/show-migrated-objects.png" alt-text="Screenshot from the Fabric portal of the Migration Assistant's metadata migration summary. The Show migrated objects option is highlighted.":::

1. Select **Show migrated objects** to expand the section and see a list of objects that you successfully migrated to your Fabric warehouse.

   :::image type="content" source="media/migrate-using-upload-file/show-migrated-objects-list.png" alt-text="Screenshot from the Fabric portal of the Migration Assistant's metadata migration summary and the list of migrated objects." lightbox="media/migrate-using-upload-file/show-migrated-objects-list.png":::

   The **State** column indicates if the Migration Assistant adjusted the object's metadata during the translation to Fabric Data Warehouse. For example, you might see that certain column datatypes or T-SQL language constructs are automatically converted to the ones that are supported in Fabric. The **Details** column shows the information about the adjustments that the Migration Assistant made to the objects.  

1. Select any object to see the adjustments that the Migration Assistant made during migration.

1. Open the metadata migration summary in full screen view for better readability. Apply filters to view specific object types.

   :::image type="content" source="media/migrate-using-upload-file/show-migrated-objects-full-screen.png" alt-text="Screenshot of the full screen view of the Migration Assistant's metadata migration summary of migrated objects." lightbox="media/migrate-using-upload-file/show-migrated-objects-full-screen.png":::

### Fix problems by using Migration Assistant

Some database object metadata might fail to migrate. Commonly, this failure occurs because the Migration Assistant couldn't translate the T-SQL metadata into those that are supported in Fabric Data Warehouse or the translated code failed to apply to T-SQL.  

Let's fix these scripts with help from the Migration Assistant.

1. Select the **Fix problems** step in the Migration Assistant to see the scripts that failed to migrate.

   :::image type="content" source="media/migrate-using-upload-file/fix-problems.png" alt-text="Screenshot from the Fabric portal of the Migration Assistant's Fix Problems list.":::

1. Select a database object that failed to migrate. A new query opens under the **Shared queries** in the **Explorer**. This new query shows the metadata definition and the adjustments that were made to it as automatic comments added to the T-SQL code.
1. Review the comments in the beginning of the script to see the adjustments that were made to the script.
1. Review and fix the broken scripts by using the error information and documentation.
1. To use Copilot for AI-powered assistance in fixing the errors, select **Fix query errors** in the **Suggested action** section. Copilot updates the script with suggestions. Mistakes can happen as Copilot uses AI, so verify code suggestions and make any adjustments you need.

   :::image type="content" source="media/migrate-using-upload-file/fix-query-errors.png" alt-text="Screenshot from the Fabric portal of the Query editor showing T-SQL queries that failed to migrate, and the comments and fixes suggested by Copilot." lightbox="media/migrate-using-upload-file/fix-query-errors.png":::

1. Select **Run** to validate and create the object.
1. The next script to fix opens.
1. Continue to fix the rest of the scripts. You can choose to skip fixing scripts that you don't need during this step.
1. When all desired metadata is ready for migration, select the back button in the **Fix problems** pane to return the top-level view of the Migration Assistant. Check the **2. Fix problems** step in the Migration Assistant. 

### Get more objects to migrate

Use incremental migration to add or update objects in an existing Fabric warehouse. Provide new source input, select only the objects you need, and choose how to handle objects that already exist in the destination. For example, migrate one group of schemas, validate the result, and then return later to migrate more objects or updated definitions.

1. Start the incremental migration from either of the following locations:
   - Open the warehouse, select the **Migration** tab on the ribbon, and then select **Get more objects**.

      :::image type="content" source="media/migrate-using-upload-file/get-more-objects-ribbon-menu.png" alt-text="Screenshot of Get more objects on the Migration tab of a warehouse.":::

   - In the migration summary, expand **Copy metadata**, and then select **Get more objects**.

      :::image type="content" source="media/migrate-using-upload-file/get-more-objects-copy-metadata.png" alt-text="Screenshot of Get more objects on the completed Copy metadata page.":::

1. Select the source, choose an input method, and continue to the **Choose more objects to migrate** step.

   :::image type="content" source="media/migrate-using-upload-file/choose-more-objects-to-migrate.png" alt-text="Screenshot of the Migration Assistant's Choose more objects to migrate page.":::

1. On **Choose more objects to migrate**, select the objects to migrate:
   - Use the filter to view all source objects, objects with naming conflicts, or objects without naming conflicts.

      :::image type="content" source="media/migrate-using-upload-file/choose-objects-filter.png" alt-text="Screenshot of the naming conflict filter on the Choose more objects to migrate page.":::

   - Objects whose names already exist in the warehouse display a warning icon. If you select one of these objects, you resolve the naming conflict later in the migration.

      :::image type="content" source="media/migrate-using-upload-file/choose-more-objects-existing-objects.png" alt-text="Screenshot of the warning icon and tooltip for an object whose name already exists in the warehouse.":::

   - By default, Migration Assistant includes direct dependencies when you select an object. Select an object name to view its direct dependencies in the right pane.

      :::image type="content" source="media/migrate-using-upload-file/view-dependent-objects.png" alt-text="Screenshot of the direct dependencies for a selected object.":::

   - If an object in the input file doesn't have a schema name, Migration Assistant assigns the object to the default `dbo` schema.
1. On **Review**, verify the source, destination, and object migration summary.

   :::image type="content" source="media/migrate-using-upload-file/review-migration-assistant.png" alt-text="Screenshot of the source, destination, and object migration summary on the Review page.":::

1. Select **Migrate**. Migration Assistant translates the selected objects and creates objects that don't have naming conflicts. Objects with naming conflicts remain pending until you resolve each conflict.

### Resolve conflicts and fix objects

When you update an existing warehouse through incremental migration, conflict resolution lets you choose which object definition to keep.

1. In the Migration Assistant summary, review the **Conflicts to resolve** count. Expand **2. Resolve conflicts and fix objects**.

   :::image type="content" source="media/migrate-using-upload-file/summary-conflicts-to-resolve.png" alt-text="Screenshot of the Conflicts to resolve count and the Resolve conflicts and fix objects step.":::

1. On the **Conflicts** tab, review the objects that have naming conflicts.

   :::image type="content" source="media/migrate-using-upload-file/conflicts.png" alt-text="Screenshot of the objects on the Conflicts tab.":::

1. Select an object to compare its SQL definitions. The existing definition appears on the left, and the incoming translated definition appears on the right.

   :::image type="content" source="media/migrate-using-upload-file/existing-incoming-script-view.png" alt-text="Screenshot comparing the existing and incoming SQL definitions for an object.":::

1. Choose one of the following actions for the object:
   - **Keep existing**: Retain the existing object definition and discard the incoming translated definition.
   - **Keep incoming**: Replace the existing object definition with the incoming translated definition. Confirm the action when prompted.
   - **Rename incoming**: Create the incoming object with a different name and retain the existing object.

   :::image type="content" source="media/migrate-using-upload-file/conflict-resolution-actions.png" alt-text="Screenshot of the Keep incoming, Keep existing, and Rename incoming actions for an object.":::

   If you select **Rename incoming**, enter the schema and object name, and then select **Rename**.

   :::image type="content" source="media/migrate-using-upload-file/rename-object.png" alt-text="Screenshot of the Rename migrated object dialog.":::

1. Optional: Edit the incoming script before you keep it. To discard your edits and restore the translated script, select **Reset incoming**.

   :::image type="content" source="media/migrate-using-upload-file/reset-incoming.png" alt-text="Screenshot of Reset incoming above an edited incoming SQL definition.":::

1. To apply the incoming definition, select **Keep incoming (overwrite existing)**. If you edited the incoming script, select **Overwrite existing** instead.

   > [!WARNING]
   > For a table, **Keep incoming** drops and re-creates the existing table. If the table contains data, this action causes data loss, and you must load the data again. If Migration Assistant can't apply the incoming script, it restores the previous object definition, but it doesn't recover dropped data.

   For a table, select **Replace table** to confirm the action.

   :::image type="content" source="media/migrate-using-upload-file/confirmation-replace-existing.png" alt-text="Screenshot of the confirmation dialog for replacing an existing table.":::

1. When the script runs successfully, Migration Assistant marks the conflict as resolved.

   :::image type="content" source="media/migrate-using-upload-file/conflict-resolved.png" alt-text="Screenshot showing that an object's conflict is resolved.":::

1. Repeat these steps for each object with a naming conflict. To apply the same action to multiple objects, select the objects, and then select **Keep existing** or **Keep incoming**.

   :::image type="content" source="media/migrate-using-upload-file/bulk-actions.png" alt-text="Screenshot of the bulk Keep incoming and Keep existing actions.":::

1. Confirm that each successfully processed object is marked as resolved. If an object needs more changes, review the information in the right pane.

### Copy data by using Migration Assistant

Copy data helps with migrating data used by the objects you migrate. You can use a [Fabric Data Factory copy job](../data-factory/create-copy-job.md) to do it manually, or follow these steps for the copy job integration in the Migration Assistant.

1. Select the **Copy data** step in the Migration Assistant.
1. Select **Use a copy job**.
1. Assign a name to the new job, then select **Create**. 
1. On the **Connect to data source** page, provide the connection credentials for your source system. Select **Next**.
1. On the **Choose data** page, select the tables you want to migrate. Select **Next**.

   :::image type="content" source="media/migrate-using-upload-file/choose-data.png" alt-text="Screenshot from the Fabric portal of the Choose data pane, with some tables selected." lightbox="media/migrate-using-upload-file/choose-data.png":::

1. In the **Choose data destination** page, choose your new Fabric warehouse item from the **OneLake catalog**. Select **Next**.
1. In the **Map to destination** page, configure each table's column mappings. Select **Next**.
1. In the **Copy job mode** page, choose the copy mode. Choose a one-time full data copy (recommended for migration), or a continuous incremental copying. Select **Next**.
1. Review the job summary. Select **Save + Run**.
1. When the copy job finishes, check the **3. Copy data** step in the Migration Assistant. Select the back button at the top to return to the top-level view of the Migration Assistant.

### Reroute connections

In the final step, reconnect the data loading and reporting platforms so that their connections point to your new Fabric warehouse.

1. Identify connections on your existing source warehouse. 
   - On a SQL Server instance, you can use dynamic management views, for example:

   ```sql
   SELECT 
       s.program_name
   , s.login_name
   , c.client_net_address
   FROM sys.dm_exec_sessions AS s 
   INNER JOIN sys.dm_exec_connections AS c 
   ON s.session_id = c.session_id
   WHERE s.session_id >= 50 --retrieve only user spids
   and s.session_id <> @@SPID; --ignore myself
   ```
   
   - In Azure Synapse Analytics dedicated SQL pools, you can find session information, including the source application, connected user, connection origin, and authentication method:
   ```sql
   SELECT DISTINCT CASE 
            WHEN len(tt) = 0
                THEN app_name
            ELSE tt
            END AS application_name
        ,login_name
        ,ip_address
   FROM (
        SELECT DISTINCT app_name
            ,substring(client_id, 0, CHARINDEX(':', ISNULL(client_id, '0.0.0.0:123'))) AS ip_address
            ,login_name
            ,isnull(substring(app_name, 0, CHARINDEX('-', ISNULL(app_name, '-'))), 'h') AS tt
        FROM sys.dm_pdw_exec_sessions
        ) AS a;
   ```
1. Update the connections to your reporting platforms to point to your Fabric warehouse. 
1. Test the Fabric warehouse with some reporting before rerouting. Perform comparison and data validation tests in your reporting platforms.
1. Update the connections for data loading (ETL/ELT) platforms to point to your Fabric warehouse.
   - For Power BI/Fabric pipelines:
      1. Use the [List Connections REST API](/rest/api/fabric/core/connections/list-connections?tabs=HTTP) to find connections to your old data source, the Azure Synapse Analytics dedicated SQL pool.
      1. Update the connections to the new warehouse by using the **Manage Connections and Gateways** page in **Settings**.
1. When you finish, check the **Reroute connections** step in the Migration Assistant.

Congratulations! You're now ready to start using your new warehouse.

   :::image type="content" source="media/migrate-using-upload-file/migration-complete.png" alt-text="Screenshot from the Fabric portal Migration Assistant showing all four job steps complete and a congratulations popup." lightbox="media/migrate-using-upload-file/migration-complete.png":::

## Related content

- [Fabric Migration Assistant for Data Warehouse](migration-assistant.md)
- [Microsoft Fabric Migration Overview](../fundamentals/migration.md)
