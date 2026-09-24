---
title: How to Back Up and Restore Power BI Premium Semantic Models
description: Learn about the backup and restore feature for semantic models with a Power BI Premium or Premium Per User license.
author: dknappettmsft
ms.author: daknappe
ms.service: powerbi
ms.subservice: powerbi-premium
ms.topic: how-to
ms.date: 06/24/2026
LocalizationGroup: Premium
---

# Back up and restore semantic models with Power BI Premium

If you have a Power BI Premium or Premium Per User (PPU) license, you can use the *Backup and Restore* feature with Power BI semantic models. This feature is similar to the backup and restore operations available in tabular models for Azure Analysis Services.

You can use [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), [Analysis Services cmdlets for PowerShell](https://www.powershellgallery.com/packages/Az.AnalysisServices), and other tools to perform backup and restore operations in Power BI by using [XMLA endpoints](service-premium-connect-tools.md). The following sections describe backup and restore concepts for Power BI semantic models, requirements, and considerations.

:::image type="content" source="media/service-premium-backup-restore-datasets/premium-backup-restore-datasets-01.png" alt-text="Screenshot of the SSMS window, back up is selected from the databases menu. The backup database dialog is open, OK is selected.":::

The ability to back up and restore Power BI semantic models provides a migration path from Azure Analysis Services workloads to Power BI Premium. Backup and restore also enables semantic model backups for multiple reasons, including corruption or loss, data retention requirements, and tenant movement.

## Using semantic model backup and restore

The Backup and Restore feature uses existing connections between Power BI and Azure, such as the ability to register an Azure Data Lake Storage Gen2 (ADLS Gen2) storage account at the tenant or workspace level to facilitate dataflow storage and operations. Since Backup and Restore uses the same connection, you don't need another storage account.

You can perform offline backups by downloading the files from your ADLS Gen2 storage account. To download, use the file system, Azure Storage Explorer, .NET tools, and PowerShell cmdlets, such as the `Get-AzDataLakeGen2ItemContent` cmdlet. The following image shows a workspace with three semantic models and their corresponding backup files in Azure Storage Explorer.

:::image type="content" source="media/service-premium-backup-restore-datasets/premium-backup-restore-datasets-02.png" alt-text="Screenshot of Azure Storage Explorer with a backup selected. A portion of the Power BI window shows the settings dialog.":::

To learn how to configure Power BI to use an ADLS Gen2 storage account, see [configuring dataflow storage to use Azure Data Lake Gen 2](/power-bi/transform-model/dataflows/dataflows-azure-data-lake-storage-integration).

### Multi-geo considerations

Backup and Restore relies on the Azure connections infrastructure in Power BI to register an Azure Data Lake Storage Gen2 (ADLS Gen2) storage account at the tenant or workspace level. You should provision the storage account in the region of your Power BI Premium capacity to avoid data transfer costs across regional boundaries. Check your data residency requirements before configuring your workspaces on a multi-geo Premium capacity with a storage account.

### Who can perform backup and restore

When you associate an ADLS Gen2 storage account with a workspace, workspace admins with write or admin permissions can back up the workspace. These permissions might come from being an admin, a member, or a contributor. You don't need to be part of the workspace roles if you have direct write permission to the semantic model. Here are some requirements:

* To restore an existing semantic model, you need write or admin permission to the dataset. To restore a new semantic model, you must be an admin of the workspace.

* To browse the backup and restore filesystem by using Azure Storage Explorer (the **Browse...** button in SSMS), you must be an admin, a member, or a contributor of the workspace.

Power BI associates workspaces with their backup directories based on the workspace name. With owner permissions at the storage account level, you can download backup files or copy them from their original location to the backup directory of a different workspace. You can restore them if you're a workspace admin in the target workspace.

Storage account owners have unrestricted access to the backup files, so set and maintain storage account permissions carefully.

### How to perform backup and restore

Backup and Restore requires using XMLA-based tools, such as [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms). The Power BI user interface doesn't have a backup or restore facility or option. Because of the XMLA dependency, Backup and Restore currently requires your semantic models to reside on a Premium or PPU capacity.

You can apply the storage account settings for Backup and Restore at either the **tenant** or the **workspace** level.

For Backup and Restore, Power BI creates a new container called `power-bi-backup` in your storage account. It creates a backup folder with the same name as your workspace in the `power-bi-backup` container. If you configure a storage account at the **tenant** level, Power BI only creates the `power-bi-backup` container. Power BI creates the backup folder when you attach the storage account to a workspace. If you configure a storage account at the **workspace** level, Power BI creates the `power-bi-backup` container and creates the backup folder.

During backup and restore, the following actions apply:

* Power BI places backup files into the backup folder in the `power-bi-backup` container.
* For restore, you must place the backup files (`.abf` files) into the folder before conducting a restore.

If you rename a workspace, Power BI automatically renames the backup folder in the `power-bi-backup` container to match. However, if you have an existing folder with the same name as the renamed workspace, the automatic renaming for the backup folder fails.

## Considerations and limitations

When you use the Backup and Restore feature with Power BI, keep the following considerations in mind.

* Power BI must be able to access your ADLS Gen2 directly. Your ADLS Gen2 can't be located in a VNet and you can't turn on the firewall.

* If your ADLS Gen2 already works with Backup and Restore and you disconnect and later reconfigure it to work with Backup and Restore again, you must first rename or move the previous backup folder. Otherwise, the attempt results in errors and failure.

* **Restore** only supports restoring the database as a **Large Model (Premium)** database.

* You can restore only the **enhanced format model (V3 model)**.

* When you [disable Shared Key authorization on your storage account](/azure/storage/common/shared-key-authorization-prevent#disable-shared-key-authorization), you might get this error: **Key based authentication is not permitted on this storage account**.

* The property, `ignoreIncompatibilities` for the `restore` command addresses Row-level security (RLS) incompatibilities between Azure Analysis Services (AAS) and Power BI Premium. Power BI Premium only supports the read permission for roles, but AAS supports all permissions. If you try to restore a backup file for which some roles don't have *read* permissions, you must specify the `ignoreIncompatibilities` property in the `restore` command. If you don't specify it, restore can fail. When you specify it, restore drops the role without the *read* permission. Currently, there's no setting in SSMS that supports the `ignoreIncompatibilities` property, however, you can specify it in a `restore` command by using Tabular Model Scripting Language (TMSL). For example:

   ```json
   {
     "restore": {
       "database": "DB",
       "file": "/Backup.abf",
       "allowOverwrite": true,
       "security": "copyAll",
       "ignoreIncompatibilities": true
     }
   }
   ```

* You can restore a corrupt database. As long as you back up the database periodically, restoring the database is the most robust way to recover it. Use the following `restore` command in an XMLA query to restore a database:

   ```xml
   <Restore xmlns="http://schemas.microsoft.com/analysisservices/2003/engine">
       <File>DatabaseBackup.abf</File>
       <DatabaseName>DatabaseName</DatabaseName>
       <AllowOverwrite>true</AllowOverwrite>
   </Restore>
   ```

* When you restore a database, you might get the following error: **We cannot restore the semantic model backup right now because there is not enough memory to complete this operation. Please use the /forceRestore option to restore the semantic model with the existing semantic model unloaded and offline.**

   In these cases, with the `restore` command, add the `forceRestore` property to trigger a forced restore operation. For example, when you use TMSL:

   ```json
   {
     "restore": {
       "database": "DB",
       "file": "/Backup.abf",
       "allowOverwrite": true,
       "security": "copyAll",
       "forceRestore": true
     }
   }
   ```

## Recover a semantic model loaded in metadata-only mode

When Power BI detects a schema error that prevents a semantic model from loading normally, it loads the model in **metadata-only mode**. This safe, degraded state lets you connect to and inspect the model definition, but you can't run queries or perform data operations.

You see this error when attempting queries or modifications: **The operation is not allowed because the database is corrupted and was loaded in metadata-only mode.**

### Option 1: Restore from version history (recommended)

If your semantic model has a saved version from before the issue occurred:

1. In the workspace, select **More options (...)** on the semantic model, and then select **Version history**.
1. Choose a version that predates the error.
1. Select **Restore**.

### Option 2: Script out and republish the model

If you have the source project (`.pbix` file):

1. **Connect** to the semantic model by using SSMS (use the XMLA endpoint, for example, `powerbi://api.powerbi.com/v1.0/myorg/<workspace>`).
1. **Script out the model** by right-clicking the database, and then selecting *Script Database as*, followed by *CREATE OR REPLACE To*, followed by *New Query Editor Window*.
1. **Save** the script to a file for safekeeping.
1. **Republish** the corrected model to the workspace. This step clears metadata-only mode and restores full functionality.
1. **Execute** the script saved in step 3 to restore any schema changes that republishing removed, and then address the original error that triggered metadata-only mode.

### Option 3: Script out and recreate the model

If you don't have the original source files:

1. **Connect** to the semantic model by using SSMS (use the XMLA endpoint, for example, `powerbi://api.powerbi.com/v1.0/myorg/<workspace>`).
1. **Script out the model** by right-clicking the database, and then selecting *Script Database as*, followed by *CREATE OR REPLACE To*, followed by *New Query Editor Window*.
1. **Save** the script to a file.
1. **Fix** the schema error in the JSON script.
1. **Change the database name** in the script to create a new semantic model.
1. **Execute** the corrected script against the workspace.
1. **Rebind** your reports to the new semantic model. The [semantic-link-labs](https://github.com/microsoft/semantic-link-labs/wiki/Code-Examples) library provides helper utilities for this task.
1. **Reconfigure** data source credentials and gateway settings on the new model.

## Related content

* [Analysis Services cmdlets for PowerShell](https://www.powershellgallery.com/packages/Az.AnalysisServices)

* [Semantic model connectivity with the XMLA endpoint](service-premium-connect-tools.md)

* [Configuring tenant and workspace storage](/power-bi/transform-model/dataflows/dataflows-azure-data-lake-storage-integration)
