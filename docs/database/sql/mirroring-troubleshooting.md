---
title: "Troubleshoot mirroring from Fabric SQL database"
description: Troubleshooting scenarios, workarounds, and links for mirroring Fabric SQL database.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac
ms.date: 10/15/2024
ms.topic: troubleshooting
ms.custom:
---
# Troubleshoot mirroring from Fabric SQL database (preview)

This article covers troubleshooting steps for the automatically configured mirroring for Fabric SQL database.

For troubleshooting for mirroring Azure SQL Database, see [Troubleshoot Fabric mirrored databases from Azure SQL Database (preview)](../../mirroring/azure-sql-database-troubleshoot.md).

## Certain tables are not mirrored

In case you have a table that you expect mirrored, but you are not seeing it in OneLake:

1. Switch to the **Replication** tab on your Fabric SQL database.
1. Select **Monitor replication**.
1. You can see all the tables in your Fabric SQL database and the **Status** for each, indicating whether the table is mirrored or not. For tables that are not supported for mirroring, you'll see a "Not supported" message next to table name. See [Table-level limitations](mirroring-limitations.md#table-level).

For more information, see [Monitor Fabric mirrored Fabric SQL database replication](mirroring-monitor.md).

## Certain columns are not mirrored for my table

If OneLake does not contain all the columns for a table, check if your missing column is on the list of column level limitations for mirroring. See [Column-level limitations](mirroring-limitations.md#column-level).

## T-SQL queries for troubleshooting

Fabric SQL database automatically mirrors its transactional data to OneLake. If you are experiencing mirroring problems, perform the following database level checks using Dynamic Management Views (DMVs) and stored procedures to validate configuration.

1. Execute the following query to check if the changes properly flow:

    ```sql
    SELECT * FROM sys.dm_change_feed_log_scan_sessions;
    ```

1. If the `sys.dm_change_feed_log_scan_sessions` DMV doesn't show any progress on processing incremental changes, execute the following T-SQL query to check if there are any problems reported:

    ```sql
    SELECT * FROM sys.dm_change_feed_errors;
    ```

1. If there aren't any issues reported, execute the following stored procedure to review the mirroring configuration. Confirm it was properly enabled.

    ```sql
    EXEC sp_help_change_feed;
    ```

    The key columns to look for here are the `table_name` and `state`. Any value besides `4` indicates a potential problem.
1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

## Related content

- [Limitations and behaviors for Fabric SQL database mirroring (preview)](mirroring-limitations.md)
- [Mirroring Fabric SQL database (preview)](mirroring-overview.md)
- [Monitor Fabric mirrored Fabric SQL database replication](mirroring-monitor.md)
