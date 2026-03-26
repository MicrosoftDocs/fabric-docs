---
title: Migrate with a Direct Connection
description: This tutorial provides a step-by-step guide for the Migration Assistant for Fabric Data Warehouse using a direct connection to the source.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: anphil, pvenkat, prlangad
ms.date: 03/12/2026
ms.topic: how-to
ms.search.form: Migration Assistant
ai-usage: ai-assisted
---
# Migrate with a direct connection

**Applies to**: [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

The Fabric Migration Assistant provides a migration experience that helps you copy dedicated SQL pools in Azure Synapse Analytics, SQL Server, and other SQL database platforms seamlessly into Microsoft Fabric Data Warehouse.

This guide walks you through the steps to migrate to a Fabric warehouse from an Azure Synapse Analytics dedicated SQL pool or SQL Server database by connecting to the source system. 

> [!TIP]
> For more information about the Migration Assistant's features and capabilities, see [Fabric Migration Assistant for Data Warehouse](migration-assistant.md).
>
> For more information about strategy and planning your migration, see [Migration​ planning: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-warehouse.md).

## Prerequisites

Before you begin, make sure you have the following ready:

- A Fabric workspace with an active capacity or trial capacity.
- [Create a workspace](../fundamentals/create-workspaces.md) or select an existing workspace you want to migrate into. The Migration Assistant can create a new warehouse for you.
- The connection information for your source system, such as server name, database name, and authentication method. 

The AI-assisted migration features of the Migration Assistant that fix migration problems require Copilot to be activated:

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

### Copy metadata

1. In your Fabric workspace, select the **Migrate** button on the item action deck.

   :::image type="content" source="media/migrate-using-connection-to-source-system/migrate-button.png" alt-text="Screenshot from the Fabric portal of the Migrate button in the item action deck.":::

1. In the **Migrate to Fabric** source menu, under **Migrate to a warehouse**, select the source system tile. 
   - If you're migrating from an Azure Synapse Analytics dedicated SQL pool, select the **Azure Synapse Analytics dedicated SQL pool** tile. 
   - If you're migrating from any other T-SQL database, such as a database in SQL Server, Azure SQL Database, or Azure SQL Managed Instance, select the **SQL Server database** tile.

   :::image type="content" source="media/migrate-using-connection-to-source-system/source-system-tile.png" alt-text="Screenshot from the Fabric portal of the source system tiles." lightbox="media/migrate-using-connection-to-source-system/source-system-tile.png":::

1. On the **Choose your method**, select **Connect directly to the source system (preview)**. Select **Next**.

1. On **Set the source** page, provide the server name, database name, and authentication details. Select **Next**.

1. In the **Set the destination** page, select the name of the Fabric workspace and new warehouse item you want to migrate into. Select **Next**.

1. Review your inputs and select **Migrate**. The Migration Assistant creates a new warehouse item and starts the metadata migration.

   > [!NOTE]
   > When you use the Migration Assistant, the new warehouse has **case insensitive collation**, regardless of the [default warehouse collation setting](collation.md).

   :::image type="content" source="media/migrate-using-connection-to-source-system/review-live-connectivity.png" alt-text="Screenshot from the Fabric portal of the Review page of the Migration Assistant. The source is your database and the destination is a new warehouse item named AdventureWorks." lightbox="media/migrate-using-connection-to-source-system/review-live-connectivity.png":::

   During this step, the Migration Assistant translates T-SQL metadata to supported T-SQL syntax in Fabric Data Warehouse. Once the metadata migration is complete, the Migration Assistant opens. You can access the Migration Assistant at any time by using the **Migration** button in the Home tab of the warehouse ribbon.

1. Review the metadata migration summary in the Migration Assistant. You see the count of migrated objects and the objects that need to be fixed before they can be migrated.

   :::image type="content" source="media/migrate-using-connection-to-source-system/show-migrated-objects.png" alt-text="Screenshot from the Fabric portal of the Migration Assistant's metadata migration summary. The Show migrated objects option is highlighted.":::

1. Select **Show migrated objects** to expand the section and see a list of objects that have been successfully migrated to your Fabric warehouse.

   :::image type="content" source="media/migrate-using-connection-to-source-system/show-migrated-objects-list.png" alt-text="Screenshot from the Fabric portal of the Migration Assistant's metadata migration summary and the list of migrated objects." lightbox="media/migrate-using-connection-to-source-system/show-migrated-objects-list.png":::

   The **State** column indicates if the Migration Assistant adjusted the object's metadata during the translation to Fabric Data Warehouse. For example, you might see that certain column datatypes or T-SQL language constructs are automatically converted to the ones that are supported in Fabric. The **Details** column shows the information about the adjustments that the portal made to the objects. 

1. Select any object to see the adjustments that were made during migration.

1. Open the metadata migration summary in full screen view for better readability. Apply filters to view specific object types.

   :::image type="content" source="media/migrate-using-connection-to-source-system/show-migrated-objects-full-screen.png" alt-text="Screenshot of the full screen view of the Migration Assistant's metadata migration summary of migrated objects." lightbox="media/migrate-using-connection-to-source-system/show-migrated-objects-full-screen.png":::

### Fix problems by using Migration Assistant

Some database object metadata might fail to migrate. Commonly, this failure occurs because the Migration Assistant can't translate the T-SQL metadata into those that are supported in a Fabric warehouse or the translated code can't apply to T-SQL. 

Fix these scripts by using the Migration Assistant.

1. Select the **Fix problems** step in the Migration Assistant to see the scripts that failed to migrate.

   :::image type="content" source="media/migrate-using-connection-to-source-system/fix-problems.png" alt-text="Screenshot from the Fabric portal of the Migration Assistant's Fix Problems list.":::

1. Select a database object that failed to migrate. A new query opens under the **Shared queries** in the **Explorer**. This new query shows the metadata definition and the adjustments that the Migration Assistant made as automatic comments added to the T-SQL code.
1. Review the comments at the beginning of the script to see the adjustments that the Migration Assistant made to the script.
1. Review and fix the broken scripts by using the error information and documentation.
1. To use Copilot for AI-powered assistance in fixing the errors, select **Fix query errors** in the **Suggested action** section. Copilot updates the script with suggestions. Mistakes can happen as Copilot uses AI, so verify code suggestions and make any adjustments you need.
1. Select **Run** to validate and create the object.
1. The next script to be fixed opens.
1. Continue to fix the rest of the scripts. You can choose to skip fixing scripts that you don't need during this step.
1. When all desired metadata is ready for migration, select the back button in the **Fix problems** pane to return the top-level view of the Migration Assistant. Check the **2. Fix problems** step in the Migration Assistant. 

### Copy data by using Migration Assistant

Copy data helps you migrate data used by the objects you migrate. You can use a [Fabric Data Factory copy job](../data-factory/create-copy-job.md) to do it manually, or follow these steps for the copy job integration in the Migration Assistant.

1. Select the **Copy data** step in the Migration Assistant.
1. Select **Use a copy job** button.
1. Assign a name to the new job, then select **Create**. 
1. In the **Connect to data source** page, provide **Connection credentials** for the source Azure Synapse Analytics (SQL DW) dedicated SQL pool. Select **Next**.
1. In the **Choose data** page, select the tables you want to migrate. The object metadata should already exist in the target warehouse. Select **Next**.

   :::image type="content" source="media/migrate-using-connection-to-source-system/choose-data.png" alt-text="Screenshot from the Fabric portal of the Choose data pane, with some tables selected." lightbox="media/migrate-using-connection-to-source-system/choose-data.png":::

1. In the **Choose data destination** page, choose your new Fabric warehouse item from the **OneLake catalog**. Select **Next**.
1. In the **Map to destination** page, configure each table's column mappings. Select **Next**.
1. In the **Copy job mode** page, choose the copy mode. Choose a one-time full data copy (recommended for migration), or a continuous incremental copying. Select **Next**.
1. Review the job summary. Select **Save + Run**.
1. When the copy job finishes, check the **3. Copy data** step in the Migration Assistant. Select the back button at the top to return to the top-level view of the Migration Assistant.

### Reroute connections

In the final step, reconnect the data loading and reporting platforms so that their connections point to your new Fabric warehouse.

1. Identify connections on your existing source warehouse. 
   - For example, in Azure Synapse Analytics dedicated SQL pools, you can find session information including source application, who is connected, where the connection is coming from, and if it's using Microsoft Entra or SQL authentication: 
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
      - Update the connections to the new warehouse by using the **Manage Connections and Gateways** experience under the **Settings** gear.
1. When you finish, select the **Reroute connections** step in the Migration Assistant.

Congratulations! You're now ready to start using your new warehouse.

   :::image type="content" source="media/migrate-using-connection-to-source-system/migration-complete.png" alt-text="Screenshot from the Fabric portal Migration Assistant showing all four job steps complete and a congratulations popup." lightbox="media/migrate-using-connection-to-source-system/migration-complete.png":::

## Related content

- [Fabric Migration Assistant for Data Warehouse](migration-assistant.md)
- [Microsoft Fabric Migration Overview](../fundamentals/migration.md)
- [Upgrade your Azure Data Factory pipelines to Fabric](/azure/data-factory/how-to-upgrade-your-azure-data-factory-pipelines-to-fabric-data-factory)