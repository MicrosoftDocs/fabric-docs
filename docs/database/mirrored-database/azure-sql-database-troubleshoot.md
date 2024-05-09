---
title: "Troubleshoot Fabric mirrored databases from Azure SQL Database (Preview)"
description: Troubleshooting topics for mirrored databases from Azure SQL Database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala
ms.date: 05/09/2024
ms.service: fabric
ms.topic: troubleshooting
ms.custom:
  - references_regions
---
# Troubleshoot Fabric mirrored databases from Azure SQL Database (Preview)

If you're experiencing mirroring problems, perform the following database level checks using Dynamic Management Views (DMVs) and stored procedures to validate configuration. 

1. Execute the following query to check if the changes properly flow:

    ```sql
    SELECT * FROM sys.dm_change_feed_log_scan_sessions 
    ```

1. If the `sys.dm_change_feed_log_scan_sessions` DMV doesn't show any progress on processing incremental changes, execute the following T-SQL query to check if there are any problems reported:

    ```sql
    SELECT * FROM sys.dm_change_feed_errors;
    ```

1. If there aren't any issues reported, execute the following stored procedure to review the current configuration of the mirrored Azure SQL Database. Confirm it was properly enabled.

    ```sql
    exec sp_help_change_feed;
    ```

    The key columns to look for here are the `table_name` and `state`. Any value besides `4` indicates a potential problem. 

1. If replication is still not working, verify that the correct SAMI object has permissions.
    1. In the Fabric portal, select the "..." ellipses option on the mirrored database item.
    1. Select the **Manage Permissions** option.
    1. Confirm that the Azure SQL logical server name shows with Read, Write permissions.
    1. Ensure that AppId that shows up matches the id of the SAMI of the logical SQL server.

1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

## Related content

- [What is Mirroring in Fabric?](overview.md)
- [Monitor Fabric mirrored database replication](monitor.md)
- [Troubleshoot Fabric mirrored databases](troubleshooting.md)
- [Model data in the default Power BI semantic model in Microsoft Fabric](/fabric/data-warehouse/model-default-power-bi-dataset)
- [Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Database (Preview)](azure-sql-database-tutorial.md)
