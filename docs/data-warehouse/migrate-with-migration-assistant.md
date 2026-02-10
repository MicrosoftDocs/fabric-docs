---
title: Migrate Data with the Migration Assistant for Fabric Data Warehouse
description: This tutorial provides a step-by-step guide for the Migration Assistant experience for Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: anphil, pvenkat, prlangad, chweb
ms.date: 02/06/2026
ms.topic: how-to
ms.search.form: Migration Assistant
---
# Migrate with the Fabric Migration Assistant for Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

The Fabric Migration Assistant is a migration experience to copy dedicated SQL pools in Azure Synapse Analytics, SQL Server, and other SQL database platforms seamlessly into Microsoft Fabric Data Warehouse.

This guide walks you through the steps to migrate from an Azure Synapse Analytics dedicated SQL pool to Fabric warehouse using a DACPAC file. 

> [!TIP]
> For more information on the Migration Assistant's features and capabilities, see [Fabric Migration Assistant for Data Warehouse](migration-assistant.md).
>
> For more information on strategy and planning your migration, see [Migration​ planning: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-warehouse.md).

## Prerequisites

Before you begin, make sure you have the following ready:

- A Fabric workspace with an active capacity or trial capacity.
- [Create a workspace](../fundamentals/create-workspaces.md) or select an existing workspace you want to migrate into. The Migration Assistant will create a new warehouse for you.
- DACPAC file extracted from Azure Synapse Analytics dedicated SQL pool. A [DACPAC](/sql/tools/sql-database-projects/concepts/data-tier-applications/overview#dacpac-operations) (data-tier application package) file is built from SQL database projects and contains the metadata of database objects, including the schema of tables, views, stored procedures, functions, and more. 
    - To create a DAC in Visual Studio 2022 with SQL Server Data Tools, see [Extract a Data-tier Application (DAC) from an Azure Synapse dedicated SQL pool in Visual Studio 2022](extract-data-tier-application-synapse-dedicated-sql-pool.md).
    - You can also use [SDK-style database projects](/dotnet/core/project-sdk/overview) with VS Code or the [SqlPackage command-line utility](/sql/tools/sqlpackage/sqlpackage-extract).

The AI-assisted migration features of the Migration Assistant to fix migration issues require Copilot to be activated:

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

### Copy metadata

1. In your Fabric workspace, select the **Migrate** button on the item action deck.

   :::image type="content" source="media/migrate-with-migration-assistant/migrate-button.png" alt-text="Screenshot from the Fabric portal of the Migrate button in the item action deck.":::

1. In the **Migrate to Fabric** source menu, under **Migrate to a warehouse**, select the **Analytical T-SQL warehouse or database** tile.

   :::image type="content" source="media/migrate-with-migration-assistant/dacpac-tile.png" alt-text="Screenshot from the Fabric portal of the Analytical T-SQL warehouse or database tile.":::

1. On the **Overview**, review the information and select **Next**.

1. Select **Choose file** and upload the DACPAC file of your source data warehouse. When the upload is complete, select **Next**.

   :::image type="content" source="media/migrate-with-migration-assistant/upload-dacpac-choose-file.png" alt-text="Screenshot from the Fabric portal of the Upload DACPAC file step in the Migration Assistant." lightbox="media/migrate-with-migration-assistant/upload-dacpac-choose-file.png":::

1. In the **Set the destination** page, provide the name of the new Fabric workspace and new warehouse item you would like to migrate into. Select **Next**.

1. Review your inputs and select **Migrate**. A new warehouse item is created and the metadata migration begins.

   > [!NOTE]
   > When using the Migration Assistant, the new warehouse has **case insensitive collation**, regardless of the [default warehouse collation setting](collation.md).

   :::image type="content" source="media/migrate-with-migration-assistant/review.png" alt-text="Screenshot from the Fabric portal of the Review page of the Migration Assistant. The source is a DACPAC file and the Destination is a new warehouse item named AdventureWorks." lightbox="media/migrate-with-migration-assistant/review.png":::

   During this step, the Migration Assistant translates T-SQL metadata to supported T-SQL syntax in Fabric data warehouse. Once the metadata migration is complete, the Migration assistant opens. You can access the Migration Assistant at any time using the **Migration** button in the Home tab of the warehouse ribbon.

1. Review the metadata migration summary in the Migration Assistant. You'll see the count of migrated objects and the objects that need to be fixed before they can be migrated.

   :::image type="content" source="media/migrate-with-migration-assistant/show-migrated-objects.png" alt-text="Screenshot from the Fabric portal of the Migration Assistant's metadata migration summary. The Show migrated objects option is highlighted.":::

1. Select **Show migrated objects** to expand the section and see a list of objects that have been successfully migrated to your Fabric warehouse.

   :::image type="content" source="media/migrate-with-migration-assistant/show-migrated-objects-list.png" alt-text="Screenshot from the Fabric portal of the Migration Assistant's metadata migration summary and the list of migrated objects." lightbox="media/migrate-with-migration-assistant/show-migrated-objects-list.png":::

   The **State** column indicates if the object's metadata was adjusted during the translation to be supported in Fabric Warehouse. For example, you might see that certain column datatypes or T-SQL language constructs are automatically converted to the ones that are supported in Fabric. The **Details** column shows the information about the adjustments that were made to the objects. 

1. Select any object to see the adjustments that were made during migration.

1. Open the metadata migration summary in full screen view for better readability. Apply filters to view specific object types.

   :::image type="content" source="media/migrate-with-migration-assistant/show-migrated-objects-full-screen.png" alt-text="Screenshot of the full screen view of the Migration Assistant's metadata migration summary of migrated objects." lightbox="media/migrate-with-migration-assistant/show-migrated-objects-full-screen.png":::
   
1. Optionally, select the **Export** menu to download a migration summary as an Excel file or a CSV. 

   - The downloaded Excel file is a fully structured workbook with two worksheets: **Migrated Objects** and **Objects To Fix**. It is MIP-compliant and aligned with your organization's sensitivity labels.
   - The CSV is lightweight and tool-friendly.

   :::image type="content" source="media/migrate-with-migration-assistant/export-download.png" alt-text="Screenshot from the Fabric portal showing the Export and Download As options.":::
   
   Each exported file provides a structured, comprehensive view of your migration results, including:
   
   |Field name|Description|Sample values|
   | :-------- | :-------- | :------------ |
   |**Object name**|Name of SQL object| |
   |**Object type**|SQL object types| Table, view, stored procedure, function |
   |**State**|Translation state | Adjusted: Fabric Data Warehouse compatible updates are applied<br><br>Not adjusted: No change in the original script|
   |**Details**|List of adjustments applied or error messages||
   |**Type of error**|Type of translation error| Translation message, Translation error, Translation apply error |
   
### Fix problems using Migration Assistant

Some database object metadata might fail to migrate. Commonly, this is because the Migration Assistant couldn't translate the T-SQL metadata into those that are supported in a Fabric warehouse or the translated code failed to apply to T-SQL. 

Let's fix these scripts with help from the Migration Assistant.

1. Select the **Fix problems** step in the Migration Assistant to see the scripts that failed to migrate.

   :::image type="content" source="media/migrate-with-migration-assistant/fix-problems.png" alt-text="Screenshot from the Fabric portal of the Migration Assistant's Fix Problems list.":::

1. Select a database object that failed to migrate. A new query opens under the **Shared queries** in the **Explorer**. This new query shows the metadata definition and the adjustments that were made to it as automatic comments added to the T-SQL code.
1. Review the comments in the beginning of the script to see the adjustments that were made to the script.
1. Review and fix the broken scripts using the error information and documentation.
1. To use Copilot for AI-powered assistance in fixing the errors, select **Fix query errors** in the **Suggested action** section. Copilot updates the script with suggestions. Mistakes can happen as Copilot uses AI, so verify code suggestions and make any adjustments you need.

   :::image type="content" source="media/migrate-with-migration-assistant/fix-query-errors.png" alt-text="Screenshot from the Fabric portal of the Query editor showing T-SQL queries that failed to migrate, and the comments and fixes suggested by Copilot." lightbox="media/migrate-with-migration-assistant/fix-query-errors.png":::

1. Select **Run** to validate and create the object.
1. The next script to be fixed opens.
1. Continue to fix the rest of the scripts. You can choose to skip fixing scripts that you don't need during this step.
1. When all desired metadata is ready for migration, select the back button in the **Fix problems** pane to return the top-level view of the Migration assistant. Check the **2. Fix problems** step in the Migration assistant. 

### Copy data using Migration Assistant

Copy data helps with migrating data used by the objects you migrate. You can use a [Fabric Data Factory copy job](../data-factory/create-copy-job.md) to do it manually, or follow these steps for the copy job integration in the Migration assistant.

1. Select the **Copy data** step in the Migration Assistant.
1. Select **Use a copy job** button.
1. Assign a name to the new job, then select **Create**. 
1. In **Connect to data source** page, provide **Connection credentials** the source Azure Synapse Analytics (SQL DW) warehouse. Select **Next**.
1. In the **Choose data** page, select the tables you want to migrate. The object metadata should already exist in the target warehouse. Select **Next**.

   :::image type="content" source="media/migrate-with-migration-assistant/choose-data.png" alt-text="Screenshot from the Fabric portal of the Choose data pane, with some tables selected." lightbox="media/migrate-with-migration-assistant/choose-data.png":::

1. In the **Choose data destination** page, choose your new Fabric warehouse item from the **OneLake catalog**. Select **Next**.
1. In the **Map to destination** page, configure each table's column mappings. Select **Next**.
1. In the **Copy job mode** page, choose the copy mode. Choose a one-time full data copy (recommended for migration), or a continuous incremental copying. Select **Next**.
1. Review the job summary. Select **Save + Run**.
1. Once copy job is complete, check the **3. Copy data** step in the Migration assistant. Select the back button on the top to return the top-level view of the Migration assistant.

### Reroute connections

In the final step, the data loading/reporting platforms that are connected to your source need to be reconnected to your new Fabric warehouse.

1. Identify connections on your existing source warehouse. 
   - For example, in Azure Synapse Analytics dedicated SQL pools, you can find session information including source application, who is connected in, where the connection is coming from, and if its using Microsoft Entra ID or SQL authentication: 
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
      - Use the [List Connections REST API](/rest/api/fabric/core/connections/list-connections?tabs=HTTP) to find connections to your old data source, the Azure Synapse Analytics dedicated SQL pool.
      - Update the connections to the new Fabric data warehouse using **Manage Connections and Gateways** experience under the **Settings** gear.
1. Once complete, check the **Reroute connections** step in the Migration assistant.

Congratulations! You're now ready to start using the warehouse.

   :::image type="content" source="media/migrate-with-migration-assistant/migration-complete.png" alt-text="Screenshot from the Fabric portal Migration Assistant showing all four job steps complete and a congratulations popup." lightbox="media/migrate-with-migration-assistant/migration-complete.png":::

## Related content

- [Fabric Migration Assistant for Data Warehouse](migration-assistant.md)
- [Microsoft Fabric Migration Overview](../fundamentals/migration.md)
