---
title: "Troubleshoot Fabric Mirrored Databases From Azure SQL Database"
description: Troubleshooting mirrored databases from Azure SQL Database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, anagha-todalbagi
ms.date: 03/14/2025
ms.topic: troubleshooting
ms.custom:
  - references_regions
---
# Troubleshoot Fabric mirrored databases from Azure SQL Database

This article covers troubleshooting steps troubleshooting for mirroring Azure SQL Database.

For troubleshooting the automatically configured mirroring for Fabric SQL database, see [Troubleshoot mirroring from Fabric SQL database (preview)](../sql/mirroring-troubleshooting.md).

## Changes to Fabric capacity or workspace

Learn more from [Changes to Fabric capacity](troubleshooting.md#changes-to-fabric-capacity). 

In addition, note the following for Azure SQL Database specifically:

| Cause    | Result | Recommended resolution     |
|:--|:--|:--|
| Workspace deleted | Mirroring stops automatically and disables the change feed in Azure SQL Database | In case mirroring is still active on the Azure SQL Database, execute the following stored procedure on your Azure SQL Database: `exec sp_change_feed_disable_db;`. |
| Any other resource errors | Mirroring is disabled | To ensure your compute resources are not impacted and to minimize impact on the Azure SQL Database, mirroring will be disabled on any persistent resource errors. |
| "Users can access data stored in OneLake with apps external to Fabric" setting disabled | "Replicator - Tables Cannot Reach Replicating Status" | Enable the Tenant setting [Users can access data stored in OneLake with apps external to Fabric](../../admin/tenant-settings-index.md#onelake-settings).|

## T-SQL queries for troubleshooting

If you're experiencing mirroring problems, perform the following database level checks using Dynamic Management Views (DMVs) and stored procedures to validate configuration.

1. Execute the following query to check if the changes properly flow:

    ```sql
    SELECT * FROM sys.dm_change_feed_log_scan_sessions;
    ```

1. If the `sys.dm_change_feed_log_scan_sessions` DMV doesn't show any progress on processing incremental changes, execute the following T-SQL query to check if there are any problems reported:

    ```sql
    SELECT * FROM sys.dm_change_feed_errors;
    ```

1. If there aren't any issues reported, execute the following stored procedure to review the current configuration of the mirrored Azure SQL Database. Confirm it was properly enabled.

    ```sql
    EXEC sp_help_change_feed;
    ```

    The key columns to look for here are the `table_name` and `state`. Any value besides `4` indicates a potential problem.

1. If replication is still not working, verify that the correct SAMI object has permissions.
    1. In the Fabric portal, select the "..." ellipses option on the mirrored database item.
    1. Select the **Manage Permissions** option.
    1. Confirm that the Azure SQL logical server name shows with Read, Write permissions.
    1. Ensure that AppId that shows up matches the ID of the SAMI of your Azure SQL Database logical server.

1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

## Managed identity

The System Assigned Managed Identity (SAMI) of the Azure SQL logical server needs to be enabled, and must be the primary identity. For more information, see [Create an Azure SQL Database server](/azure/azure-sql/database/authentication-azure-ad-user-assigned-managed-identity-create-server?view=azuresql-db&preserve-view=true&tabs=azure-portal). Enable the SAMI in the Azure portal, in the resource menu under **Security**, in the **Identity** page.

After enablement, if SAMI setting status is either turned Off or initially enabled, then disabled, and then enabled again, the mirroring of Azure SQL Database to Fabric OneLake will fail.

The SAMI must be the primary identity. Verify the SAMI is the primary identity with the following: `SELECT * FROM sys.dm_server_managed_identities;`

User Assigned Managed Identity (UAMI) is not supported. If you add a UAMI, it becomes the primary identity, replacing the SAMI as primary. This causes replication to fail. To resolve:
- Remove all UAMIs. Verify that the SAMI is enabled.
<!-- - Use the [REST API to change the SAMI to be the primary identity](/azure/azure-sql/database/authentication-azure-ad-user-assigned-managed-identity-create-server?view=azuresql-db&preserve-view=true&tabs=rest-api). -->

## SAMI permissions

The System Assigned Managed Identity (SAMI) of the Azure SQL logical server needs to have **Read** and **Write** permissions on the mirrored database item in Microsoft Fabric. When you create the mirrored database from the Fabric portal, the permission is granted automatically. If you encounter error `Unable to grant required permission to the source server. User does not have permission to reshare` during the setup, ensure you have a member or admin role in the workspace with sufficient privilege. When you [use API](mirrored-database-rest-api.md) to create the mirrored database, make sure you grant the permission explicitly.

Do not remove SAMI **Read** and **Write** permissions on Fabric mirrored database item. If you accidentally remove the permissions, mirroring Azure SQL Database will not function as expected. No new data can be mirrored from the source database.

If you remove Azure SQL Database SAMI permissions or permissions are not set up correctly, use the following steps.

1. Add the SAMI as a user by selecting the `...` ellipses option on the mirrored database item.
1. Select the **Manage Permissions** option.
1. Enter the name of the Azure SQL Database logical server name. Provide **Read** and **Write** permissions.

## Related content

- [Limitations of Microsoft Fabric Data Warehouse](../../data-warehouse/limitations.md)
- [Frequently asked questions for Mirroring Azure SQL Database in Microsoft Fabric](azure-sql-database-mirroring-faq.yml)
