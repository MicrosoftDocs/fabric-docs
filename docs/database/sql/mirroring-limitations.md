---
title: Limitations of Mirroring for SQL database (preview)
description: "Details on the limitations of mirroring for SQL database in Fabric."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac
ms.date: 10/14/2024
ms.topic: conceptual
---
# Limitations and behaviors for Fabric SQL database mirroring (preview)

Current limitations in the Fabric SQL database mirroring are listed in this page. This page is subject to change.

For troubleshooting, see:

- [Troubleshoot mirroring from Fabric SQL database](mirroring-troubleshooting.md)
- [Troubleshoot Fabric mirrored databases](../mirrored-database/troubleshooting.md)
- [Troubleshoot Fabric mirrored databases from Azure SQL Database (preview)](../mirrored-database/azure-sql-database-troubleshoot.md)

For general limitations for SQL database in Microsoft Fabric, see [Limitations in SQL database in Microsoft Fabric (preview)](limitations.md).

## Active transactions, workloads, and replicator engine behaviors

- Each user workload varies. During initial snapshot, there might be more resource usage on the Fabric SQL database, for both CPU and IOPS (input/output operations per second, to read the pages). Table updates/delete operations can lead to increased log generation.

- The replicator engine monitors each table for changes independently. If there are no updates in a source table, the replicator engine starts to back off with an exponentially increasing duration for that table, up to an hour. The same can occur if there's a transient error, preventing data refresh. The replicator engine will automatically resume regular polling after updated data is detected.

## Database level limitations

- Mirroring for SQL database in Fabric cannot be disabled currently.
- Mirroring for SQL database can only mirror to the workspace in which the Fabric SQL database resides.
- SQL database cannot be mirrored if the database has: enabled Change Data Capture (CDC).
- The maximum number of tables that can be mirrored from one database is 500. You can have more tables but some are skipped from mirroring.
- Fabric SQL database is a serverless product and will automatically pause if there is no user activity for a while. Mirroring activity will not prevent database from pausing. If the database goes to pause, any mirroring activity that is still pending, will also be paused. Mirroring resumes where it stopped once the database is resumed.

### Security features

- [Row-level security](/sql/relational-databases/security/row-level-security?view=fabric&preserve-view=true) is not currently supported for Fabric SQL database mirroring to Fabric OneLake.
- [Object-level permissions](/sql/t-sql/statements/grant-object-permissions-transact-sql?view=fabric&preserve-view=true), for example granting permissions to certain columns, are not
    currently propagated from the Fabric SQL database into Fabric mirrored replica in OneLake.
- [Dynamic data masking](/sql/relational-databases/security/dynamic-data-masking?view=fabric&preserve-view=true) settings are not propagated from the Fabric SQL database into Fabric OneLake.
- Microsoft Purview Information Protection/sensitivity labels are not cascaded and mirrored to Fabric OneLake.

## Table level

- A table cannot be mirrored with the following attributes:
   - A table cannot be mirrored if the primary key is any of the [data types that are unsupported](#column-level).
- Source tables that have any of the following features in use cannot be mirrored to Fabric OneLake.
   - Clustered columnstore indexes can be created but the table then cannot not be mirrored to Fabric OneLake.
   - Temporal history tables and ledger history tables
   - Always Encrypted
   - In-memory tables
   - Graph
   - External tables
- The following table-level data definition language (DDL) operations aren't allowed on source tables when enabled for Fabric SQL database mirroring.
   - Switch/Split/Merge partition
   - Alter primary key
- When there is DDL change, a complete data snapshot is restarted for the changed table, and data is reseeded.
- Views are not mirrored to OneLake.
- Stored procedures are not mirrored to OneLake.
- `ALTER TABLE SWITCH PARTITION` is not allowed.
- Altering tables to rebuild partitions with `DATA COMPRESSION = ROW` or `PAGE` is not allowed.
- `ALTER INDEX ALL` is not allowed on the table. Altering individual indexes referred to by name is allowed.
- For temporal tables, the data table is mirrored, but the history table is excluded from mirroring.
   - Upon adding system versioning (converting to Temporal) two existing tables, the existing history table is automatically excluded from mirroring (even if it was mirrored in the past).
   - Upon removing system versioning (splitting temporal data from its history table), the history table is treated as a standalone table and automatically added to mirroring.
- Full-text indexing is not supported and cannot be created in SQL database in Microsoft Fabric.

## Column level

- If the source table contains computed columns, these columns are skipped and cannot be mirrored.
- If the source table contains columns with unsupported data types, these columns cannot be mirrored to Fabric OneLake and are skipped from mirroring. The following data types are
    **unsupported**:
   - **image**
   - **text**/**ntext**
   - **xml**
   - **json**
   - **rowversion**/**timestamp**
   - **sql_variant**
   - User Defined Types (UDT)
   - **geometry**
   - **geography**
   - **hierarchyid**
- Columns of SQL type **datetime2**, with precision of 7 fractional second digits, do not have a corresponding data type with same precision in Delta files in Fabric OneLake. A precision loss happens if columns of this type are mirrored and seventh decimal second digit will be trimmed.
   - Columns of SQL type **datetime2** or **time** with precision 7 cannot be primary keys for tables.
- The **datetimeoffset(7)** data type does not have a corresponding data type with same precision in Delta files in Fabric OneLake. A precision loss (loss of time zone and seventh time decimal) occurs if columns of this type are mirrored.
- Column names for a SQL table cannot contain spaces nor the following characters: space `,` `;` `{` `}` `(` `)` `\n` `\t` `=`.
- If one or more columns in the table is of type Large Binary Object (LOB) with a size greater than 1 MB, the column data is truncated to size of 1 MB in Fabric OneLake.

## SQL analytics endpoint limitations

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It is the same read-only experience. See [SQL analytics endpoint limitations](../../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

## Related content

- [Mirroring Fabric SQL database (preview)](mirroring-overview.md)
