---
title: "Troubleshoot Fabric Mirrored Databases From Azure Database for PostgreSQL flexible server"
description: Troubleshooting mirrored databases from Azure Database for PostgreSQL flexible server in Microsoft Fabric.
ms.reviewer: scoriani
ms.date: 11/17/2025
ms.topic: troubleshooting
ms.custom:
  - references_regions
---
# Troubleshoot Fabric mirrored databases from Azure Database for PostgreSQL flexible server

This article covers troubleshooting steps for mirroring Azure Database for PostgreSQL flexible server.

## Troubleshoot error / warning messages during table selection for mirroring

When you create a new mirrored database, in the **Choose data** page you might receive some visual feedback regarding specific tables in source database. The following table provides a list of potential issues, including the displayed message and related description on how to solve the problem.

| Status Code | Status Type | Message | Description
|:--|:--|:--|:--|
| `SCHEMA_DOES_NOT_EXIST` | ERROR | Schema {} does not exist | Given schema does not exist. It could have been removed while Fabric was pulling relevant table info. Retry. |
| `TABLE_DOES_NOT_EXIST` | ERROR | In schema {}, table {} does not exist. | Given table does not exist. It could have been removed while Fabric was pulling relevant table info. Retry. |
| `FORBIDDEN_CHARS_IN_COLUMN_NAME` | ERROR | Table {}.{} contains forbidden characters in name of columns {} | Given column has unsupported character in name. <sup>1</sup> |
| `UNSUPPORTED_DATA_TYPE` | ERROR | Table {}.{} has unsupported data type in column {} | One (or more) of table's columns have currently unsupported data types. <sup>3</sup> |
| `FORBIDDEN_CHARS_IN_TABLE_NAME` | ERROR | Table {}.{} contains forbidden characters in name | Table name has unsupported characters. <sup>1</sup> |
| `NOT_REGULAR_TABLE` | ERROR | Table {}.{} is not a regular table | Table type is not supported for mirroring. <sup>2</sup> |
| `HAS_PRIMARY_KEY` | OK | Table {}.{} has a primary key | Table is a regular table and has a valid primary key used for mirroring. |
| `HAS_UNIQUE_INDEX` | OK | Table {}.{} has a suitable unique index | Table does not have a primary key, but has a **non-nullable** unique index which shall be used for mirroring. Nullable unique indexes will cause an error during replication phase and aren't supported. |
| `NO_INDEX_FULL_IDENTITY` | WARNING | Table {}.{} does not have a suitable unique index. Using full identity | Table does not have a primary key or a unique index, so `REPLICA IDENTITY FULL` is required to support mirroring, which can cause performance problems and additional WAL usage. |

<sup>1</sup> Object identifiers with a space (' ') character aren't supported. 

<sup>2</sup> This table type isn't supported for mirroring. Currently, views, materialized views, foreign tables, and partitioned tables aren't supported. TimescaleDB hypertables are also not supported for Fabric Mirroring.

<sup>3</sup> For a list of unsupported data types, see [Limitations](azure-database-postgresql-limitations.md#column-level). Only columns with following types are supported: 

   - `bigint`
   - `bigserial` 
   - `boolean` 
   - `bytea`
   - `character` 
   - `character varying` 
   - `date` 
   - `double precision`
   - `integer`
   - `numeric` 
   - `real` 
   - `serial`
   - `oid`
   - `money` 
   - `smallint` 
   - `smallserial` 
   - `text`
   - `time without time zone` 
   - `time with time zone` (* not as a primary key)
   - `timestamp without time zone`
   - `timestamp with time zone` 
   - `uuid` 

   In Postgres, two 'time with time zone' values that correspond to exactly the same moment, but in different time zones, are considered different. For example: `06:24:00.59+05` and `05:24:00.59+04` correspond to the same epoch time, but Postgres treats them differently.

## Data definition language (DDL) operations supported on source database

- **Rename column**: a column with the new name is added to the mirrored table in Fabric and contains data for newly inserted rows (for existing rows will be NULL). Old column is still maintained with values for the existing rows (for new rows are NULL).
- **Add column**: added column is visible in the mirrored table and contains data for newly inserted rows (for existing rows are NULL).
- **Remove column**: removed column remains visible in the mirrored table and contains data for existing rows (for new rows are NULL).
- **Change primary key**: mirroring session continues regularly.

Any other DDL operation on source tables is currently not supported and can cause replication failures.


## Changes to Fabric capacity or workspace

| Cause    | Result | Recommended resolution     |
|:--|:--|:--|
| Fabric capacity paused/deleted | Mirroring stops | 1. Resume or assign capacity from the Azure portal <br> 2. Go to Fabric mirrored database item. From the toolbar, select **Stop replication**.<br> 3. Start replication by selecting **Mirror database** for the mirrored item in the Fabric portal. |
| Fabric capacity resumed | Mirroring will not be resumed | 1. Go to Fabric mirrored database item. From the toolbar, select **Stop replication**. <br> 2. Start replication by selecting **Mirror database** for the mirrored item in the Fabric portal. |
| Workspace deleted | Mirroring stops automatically | If mirroring is still active on the Azure Database for PostgreSQL flexible server, connect using a server admin and  execute the following commands on your PostgreSQL server: `select azure_cdc.list_tracked_publications();`, then use the returned publication name and execute `select azure_cdc.stop_publication(<publication_name>);` |
| Fabric trial capacity expired |  Mirroring stops automatically | See [Fabric trial capacity expires](../fundamentals/fabric-trial.md#the-trial-expires). |
| Fabric capacity exceeded | Mirroring pauses | Wait until the overload state is over or update your capacity. Learn more from [Actions you can take to recover from overload situations](../enterprise/throttling.md#how-to-stop-throttling-when-it-occurs). Mirroring continues once the capacity is recovered. |
| Any other resource errors | Mirroring is disabled | To ensure your compute resources are not impacted and to minimize impact on the Azure Database for PostgreSQL flexible server, mirroring disables on any persistent resource errors. | 
| "Users can access data stored in OneLake with apps external to Fabric" setting disabled | "Replicator - Tables Cannot Reach Replicating Status" | Enable the Tenant setting [Users can access data stored in OneLake with apps external to Fabric](../admin/tenant-settings-index.md#onelake-settings).|

## SQL queries for troubleshooting

If you're experiencing mirroring problems, perform the following server level checks using system views and functions to validate configuration.

1. Execute the following query to check if the changes properly flow:

    ```sql
    select * from azure_cdc.tracked_publications;
    ```
    Check if the publication is active and snapshot has been generated. You can also check if subsequent change batches have been generated by querying:

    ```sql
    select * from azure_cdc.tracked_batches;
    ```

1. If the `azure_cdc.tracked_publications` view doesn't show any progress on processing incremental changes, execute the following SQL query to check if there are any problems reported:

    ```sql
    SELECT * FROM pg_stat_activity WHERE state = 'idle in transaction';
    ```

1. If there aren't any issues reported, execute the following command to review the current configuration of the mirrored PostgreSQL database. Confirm it was properly enabled.

    ```sql
    SELECT * FROM pg_replication_slots;
    ```

    The key columns to look for here are the `slot_name` and `active`. Any value besides `t` (true) indicates a potential problem.

1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

## Managed identity

The System Assigned Managed Identity (SAMI) of the Azure Database for PostgreSQL flexible server needs to be enabled, and must be the primary identity. For more information, see [System assigned managed identity for PostgreSQL flexible server](/azure/postgresql/flexible-server/how-to-configure-managed-identities-system-assigned).

After enablement, if SAMI setting status is later disabled then enabled again, the mirroring of Azure Database for PostgreSQL flexible server to Fabric OneLake fails.

Verify the SAMI is enabled with the following query: `show azure.service_principal_id;`

## SAMI permissions

Do not remove Azure Database for PostgreSQL flexible server System Assigned Managed Identity (SAMI) contributor permissions on Fabric mirrored database item.

If you accidentally remove SAMI permissions, Mirroring Azure Database for PostgreSQL flexible server does not function as expected. No new data can be mirrored from the source database.

If you remove Azure Database for PostgreSQL flexible server SAMI permissions or permissions are not set up correctly, use the following steps.

1. Add the flexible server SAMI as a user by selecting the `...` ellipses option on the mirrored database item.
1. Select the **Manage Permissions** option.
1. Enter the name of the Azure Database for PostgreSQL flexible server. Provide **Read** and **Write** permissions.

## Related content

- [Limitations of Microsoft Fabric Data Warehouse](../data-warehouse/limitations.md)
- [Frequently asked questions for Mirroring Azure Database for PostgreSQL flexible server in Microsoft Fabric](../mirroring/azure-database-postgresql-mirroring-faq.yml)
