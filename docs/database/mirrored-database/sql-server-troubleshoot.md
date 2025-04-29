---
title: "Troubleshoot Fabric Mirrored Databases From SQL Server"
description: Troubleshooting mirrored databases From SQL Server in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajayj, anagha-todalbagi
ms.date: 05/19/2025
ms.topic: troubleshooting
ms.custom:
  - references_regions
---
# Troubleshoot Fabric mirrored databases From SQL Server

This article covers troubleshooting steps troubleshooting for mirroring a database in SQL server.

## Changes to Fabric capacity or workspace

Learn more from [Changes to Fabric capacity](troubleshooting.md#changes-to-fabric-capacity). 

In addition, note the following for SQL Server specifically:

| Cause    | Result | Recommended resolution     |
|:--|:--|:--|
| Workspace deleted | Mirroring stops automatically and disables the change feed in SQL Server | In case mirroring is still active on the SQL Server, execute the following stored procedure on your SQL Server: `exec sp_change_feed_disable_db;`. |
| Any other resource errors | Mirroring is disabled | To ensure your compute resources are not impacted and to minimize impact on the SQL Server, mirroring will be disabled on any persistent resource errors. |
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

1. If there aren't any issues reported, execute the following stored procedure to review the current configuration of the mirrored SQL Server. Confirm it was properly enabled.

    ```sql
    EXEC sp_help_change_feed;
    ```

    The key columns to look for here are the `table_name` and `state`. Any value besides `4` indicates a potential problem.

1. If replication is still not working, verify that the correct SAMI object has permissions.
    1. In the Fabric portal, select the "..." ellipses option on the mirrored database item.
    1. Select the **Manage Permissions** option.
    1. Confirm that the SQL Server instance name shows with Read, Write permissions.
    1. Ensure that AppId that shows up matches the ID of the SAMI of your SQL Server logical server.

1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

## SPN permissions

Do not remove SQL Server service principal name (SPN) contributor permissions on Fabric mirrored database item.

If you accidentally remove the SPN permission, Mirroring SQL Server will not function as expected. No new data can be mirrored from the source database.

If you remove SQL Server SPN permissions or permissions are not set up correctly, use the following steps.

1. Add the SPN as a user by selecting the `...` ellipses option on the mirrored database item.
1. Select the **Manage Permissions** option.
1. Enter the name of the SQL Server logical server name. Provide **Read** and **Write** permissions.

## Related content

- [Frequently asked questions for Mirroring SQL Server in Microsoft Fabric](sql-server-faq.yml)
