---
title: Troubleshoot Fabric Mirrored Databases from Azure Database for MySQL (preview)
description: Troubleshooting mirrored databases from Azure Database for MySQL in Microsoft Fabric.
ms.reviewer: vamehta, maghan
ms.date: 03/18/2026
ms.topic: troubleshooting
ms.custom:
  - references_regions
---

# Troubleshoot Fabric mirrored databases from Azure Database for MySQL (preview)

This article covers troubleshooting steps for mirroring Azure Database for MySQL.

## Troubleshoot error / warning messages during table selection for mirroring

When you create a new mirrored database, in the **Choose data** page you might receive some visual feedback regarding specific tables in source database. The following table provides a list of potential issues, including the displayed message and related description on how to solve the problem.

| Status Code | Status Type | Message | Description
| --- | --- | --- | --- |
| `SCHEMA_DOES_NOT_EXIST` | ERROR | Schema {} does not exist | Given schema does not exist. It could have been removed while Fabric was pulling relevant table info. Retry. |
| `TABLE_DOES_NOT_EXIST` | ERROR | In schema {}, table {} does not exist. | Given table does not exist. It could have been removed while Fabric was pulling relevant table info. Retry. |
| `FORBIDDEN_CHARS_IN_COLUMN_NAME` | ERROR | Table {}.{} contains forbidden characters in name of columns {} | Given column has unsupported character in name. <sup>1</sup> |
| `UNSUPPORTED_DATA_TYPE` | ERROR | Table {}.{} has unsupported data type in column {} | One (or more) of table's columns have currently unsupported data types. <sup>3</sup> |
| `FORBIDDEN_CHARS_IN_TABLE_NAME` | ERROR | Table {}.{} contains forbidden characters in name | Table name has unsupported characters. <sup>1</sup> |
| `NOT_REGULAR_TABLE` | ERROR | Table {}.{} is not a regular table | Table type is not supported for mirroring. <sup>2</sup> |
| `HAS_PRIMARY_KEY` | OK | Table {}.{} has a primary key | Table is a regular table and has a valid primary key used for mirroring. |
| `HAS_UNIQUE_INDEX` | OK | Table {}.{} has a suitable unique index | Table does not have a primary key, but has a **non-nullable** unique index which shall be used for mirroring. Nullable unique indexes will cause an error during replication phase and aren't supported. |
| `NO_INDEX_FULL_IDENTITY` | WARNING | Table {}.{} does not have a suitable unique index. Using full identity | Table does not have a primary key or a unique index, so `REPLICA IDENTITY FULL` is required to support mirroring, which can cause performance problems and additional binary log usage. |

<sup>1</sup> Object identifiers with a space (' ') character aren't supported.

<sup>2</sup> This table type isn't supported for mirroring. Currently, views, materialized views, foreign tables, and partitioned tables aren't supported.

<sup>3</sup> For a list of unsupported data types, see [Limitations](azure-database-mysql-limitations.md#table-level). Only columns with following types are supported:

- `bigint`
- `binary`
- `bit`
- `blob`
- `char`
- `date`
- `datetime`
- `decimal`
- `double`
- `enum`
- `float`
- `int`
- `integer`
- `longblob`
- `longtext`
- `mediumblob`
- `mediumint`
- `mediumtext`
- `numeric`
- `set`
- `smallint`
- `text`
- `time`
- `timestamp`
- `tinyblob`
- `tinyint`
- `tinytext`
- `varbinary`
- `varchar`
- `year`

In MySQL, time values are stored in the server's time zone. Ensure consistent time zone handling for accurate data representation.

## Data definition language (DDL) operations supported on source database

- **Rename column**: a column with the new name is added to the mirrored table in Fabric and contains data for newly inserted rows (for existing rows will be NULL). Old column is still maintained with values for the existing rows (for new rows are NULL).
- **Add column**: added column is visible in the mirrored table and contains data for newly inserted rows (for existing rows are NULL).
- **Remove column**: removed column remains visible in the mirrored table and contains data for existing rows (for new rows are NULL).
- **Change primary key**: mirroring session continues regularly.

Any other DDL operation on source tables is currently not supported and can cause replication failures.

## Changes to Fabric capacity or workspace

| Cause | Result | Recommended resolution |
| --- | --- | --- |
| Fabric capacity paused/deleted | Mirroring stops | 1. Resume or assign capacity from the Azure portal<br />2. Go to Fabric mirrored database item. From the toolbar, select **Stop replication**.<br />3. Start replication by selecting **Mirror database** for the mirrored item in the Fabric portal. |
| Fabric capacity resumed | Mirroring will not be resumed | 1. Go to Fabric mirrored database item. From the toolbar, select **Stop replication**.<br />2. Start replication by selecting **Mirror database** for the mirrored item in the Fabric portal. |
| Workspace deleted | Mirroring stops automatically | If mirroring is still active on the Azure Database for MySQL, connect using a server admin and stop the mirroring replication process through the MySQL administrative tools or by disabling the mirroring configuration in the Fabric portal. |
| Fabric trial capacity expired | Mirroring stops automatically | See [Fabric trial capacity expires](../../fundamentals/fabric-trial.md#the-trial-expires). |
| Fabric capacity exceeded | Mirroring pauses | Wait until the overload state is over or update your capacity. Learn more from [Actions you can take to recover from overload situations](../../enterprise/throttling.md#how-to-stop-throttling-when-it-occurs). Mirroring continues once the capacity is recovered. |
| Any other resource errors | Mirroring is disabled | To ensure your compute resources are not affected and to minimize impact on the Azure Database for MySQL, mirroring disables on any persistent resource errors. |
| "Users can access data stored in OneLake with apps external to Fabric" setting disabled | "Replicator - Tables Cannot Reach Replicating Status" | Enable the Tenant setting [Users can access data stored in OneLake with apps external to Fabric](../../admin/tenant-settings-index.md#onelake-settings). |

## SQL queries for troubleshooting

If you're experiencing mirroring problems, perform the following server level checks using system views and functions to validate configuration.

1. Execute the following query to check if binary logging is enabled and properly configured:

   ```sql
   SHOW VARIABLES LIKE 'log_bin%';
   ```
   Check if binary logging is ON and the binary log format is set to ROW. You can also check the binary log files by querying:

   ```sql
   SHOW BINARY LOGS;
   ```

1. If binary logging doesn't show expected activity, execute the following SQL query to check for active replication connections:

   ```sql
   SHOW PROCESSLIST;
   ```

1. If there aren't any issues reported, execute the following command to review the current replication configuration of the mirrored MySQL database. Confirm it was properly enabled.

   ```sql
   SHOW REPLICA STATUS\G
   ```

   Review the output for any errors or warnings in the replication status.

1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

## Managed identity

The System Assigned Managed Identity (SAMI) of the Azure Database for MySQL needs to be enabled, and must be the primary identity.

After enablement, if SAMI setting status is later disabled then enabled again, the mirroring of Azure Database for MySQL to Fabric OneLake fails.

Verify the SAMI is enabled through the Azure portal by checking the Identity settings for your Azure Database for MySQL server.

## SAMI permissions

Do not remove Azure Database for MySQL System Assigned Managed Identity (SAMI) contributor permissions on Fabric mirrored database item.

If you accidentally remove SAMI permissions, Mirroring Azure Database for MySQL does not function as expected. No new data can be mirrored from the source database.

If you remove Azure Database for MySQL SAMI permissions or permissions are not set up correctly, use the following steps.

1. Add the server SAMI as a user by selecting the `...` ellipses option on the mirrored database item.
1. Select the **Manage Permissions** option.
1. Enter the name of the Azure Database for MySQL server. Provide **Read** and **Write** permissions.

## Related content

- [Microsoft Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql.md)
- [Microsoft Fabric mirrored databases from Azure Database for MySQL limitations](azure-database-mysql-limitations.md)
