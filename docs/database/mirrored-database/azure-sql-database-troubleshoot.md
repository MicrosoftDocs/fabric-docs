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
    1. Ensure that AppId that shows up matches the ID of the SAMI of your Azure SQL Database logical server.

1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

## Managed identity

The System Assigned Managed Identity (SAMI) of the Azure SQL logical server needs to be enabled, and must be the primary identity. For more information, see [Create an Azure SQL Database server with a user-assigned managed identity](/azure/azure-sql/database/authentication-azure-ad-user-assigned-managed-identity-create-server?view=azuresql-db&preserve-view=true&tabs=azure-portal).

After enablement, if SAMI is disabled or removed, the mirroring of Azure SQL Database to Fabric OneLake will fail.

The SAMI must be the primary identity. Verify the SAMI is the primary identity with the following: `SELECT * FROM sys.dm_server_managed_identities;`

User Assigned Managed Identity (UAMI) is not supported. If you add a UAMI, it becomes the primary identity, replacing the SAMI as primary. This causes replication to fail. To resolve:
- Remove all UAMIs. Verify that the SAMI is enabled.
<!-- - Use the [REST API to change the SAMI to be the primary identity](/azure/azure-sql/database/authentication-azure-ad-user-assigned-managed-identity-create-server?view=azuresql-db&preserve-view=true&tabs=rest-api). -->

## SPN permissions

Do not remove Azure SQL Database service principal name (SPN) contributor permissions on Fabric mirrored database item.

If you accidentally remove the SPN permission, Mirroring Azure SQL database will not function as expected. No new data can be mirrored from the source database.

If you remove Azure SQL database SPN permissions or permissions are not set up correctly, use the following steps.

1. Add the SPN as a user by selecting the "..." ellipses option on the mirrored database item.
1. Select the **Manage Permissions** option.
1. Enter the name of the Azure SQL Database logical server name. Provide **Read** and **Write** permissions.

## Related content

- [Limitations in Microsoft Fabric](../../data-warehouse/limitations.md)
- [Frequently asked questions for Mirroring Azure SQL Database in Microsoft Fabric (Preview)](azure-sql-database-mirroring-faq.yml)
