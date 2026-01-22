---
title: Limitations of Mirroring for SQL database
description: "Details on the limitations of mirroring for SQL database in Fabric."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac
ms.date: 11/10/2025
ms.topic: concept-article
ms.custom:
---
# Limitations for Fabric SQL database mirroring

Current limitations in the [Fabric SQL database mirroring](mirroring-overview.md) are listed in this page. This page is subject to change.

For troubleshooting, see:

- [Troubleshoot mirroring from Fabric SQL database](mirroring-troubleshooting.md)
- [Troubleshoot Fabric mirrored databases](../../mirroring/troubleshooting.md)
- [Troubleshoot Fabric mirrored databases from Azure SQL Database](../../mirroring/azure-sql-database-troubleshoot.md)

For general limitations for SQL database in Microsoft Fabric, see [Limitations in SQL database in Microsoft Fabric](limitations.md).

## Database level limitations

- Mirroring for SQL database in Fabric cannot be disabled currently.
- Mirroring for SQL database can only mirror to the workspace in which the Fabric SQL database resides.
- The maximum number of tables that can be mirrored from one database is 1000. You can have more tables but any tables created beyond 1000 are skipped from mirroring.

### Security features

- [Row-level security](/sql/relational-databases/security/row-level-security?view=fabric-sqldb&preserve-view=true) is supported for Fabric SQL database, but permissions are currently not propagated to the replicated data in Fabric OneLake.
- [Object-level permissions](/sql/t-sql/statements/grant-object-permissions-transact-sql?view=fabric-sqldb&preserve-view=true), for example granting permissions to certain columns, are currently not propagated to the replicated data in Fabric OneLake.
- [Dynamic data masking](/sql/relational-databases/security/dynamic-data-masking?view=fabric-sqldb&preserve-view=true) settings are currently not propagated to the replicated data in Fabric OneLake.
- Microsoft Purview Information Protection/sensitivity labels are not cascaded and mirrored to Fabric OneLake. For more information, see [Protect sensitive data in SQL database with Microsoft Purview protection policies](protect-databases-with-protection-policies.md).

## Table level

- A table cannot be mirrored if the primary key includes an [unsupported data type](#column-level).
- Source tables that have any of the following features in use cannot be mirrored to Fabric OneLake.
   - [Clustered columnstore indexes (CCI)](/sql/t-sql/statements/create-table-transact-sql?view=fabric-sqldb&preserve-view=true#index-index_name-clustered-columnstore) can be created on an existing table, but the table then cannot be mirrored to Fabric OneLake.
       - CCI are supported and mirrored when they are created at the same time the table is created. For example:

         ```sql
         CREATE TABLE [Sales].InvoiceLines (
          <... column list ... >,
         INDEX IDX_CS_Sales_InvoiceLines CLUSTERED COLUMNSTORE
         );
         ```

       - You can add a CCI to a table, if you first stop mirroring, add the CCI, then restart mirroring. If Mirroring is running (it usually is), it can be [stopped using the sqldatabase API](/rest/api/fabric/sqldatabase/mirroring/stop-mirroring) and then [re-started using the sqldatabase API](/rest/api/fabric/sqldatabase/mirroring/start-mirroring). For instructions on how to stop and start mirroring with an API call, see [Start and stop SQL database mirroring with the Fabric REST API](start-stop-mirroring-api.md).
   - Temporal history tables and ledger history tables
   - Always Encrypted
   - In-memory tables
   - Graph
   - External tables
- The following table-level data definition language (DDL) operations aren't allowed:
   - Switch/Split/Merge partition
   - Alter primary key
   - Altering tables to rebuild partitions with `DATA COMPRESSION = ROW` or `PAGE` is not allowed.
- When there is DDL change, a complete data snapshot is restarted for the changed table, and data is reseeded.
- Views are not mirrored to OneLake.
- Stored procedures are not mirrored to OneLake.
- `ALTER INDEX ALL` is not allowed on the table. Altering individual indexes referred to by name is allowed.
- For temporal tables, the data table is mirrored, but the history table is excluded from mirroring.
   - Upon adding system versioning (converting to Temporal) two existing tables, the existing history table is automatically excluded from mirroring (even if it was mirrored in the past).
   - Upon removing system versioning (splitting temporal data from its history table), the history table is treated as a standalone table and automatically added to mirroring.
- Full-text indexing is not supported and cannot be created in SQL database in Microsoft Fabric.
- The **NotSupported** replication status in the [Replication monitor](mirroring-monitor.md) page contains status information specific to the table, often caused by an unsupported data type.
- Currently, a table cannot be mirrored if it has the **json** or **vector** data type.
    - Currently, you cannot `ALTER` a column to the **vector** or **json** data type in SQL database in Fabric.

## Column level

- If the source table contains computed columns, these columns are skipped and cannot be mirrored.
- If the source table contains columns with one of these data types, these columns cannot be mirrored to Fabric OneLake. The following data types are unsupported for mirroring:
   - **image**
   - **text**/**ntext**
   - **xml**
   - **rowversion**/**timestamp**
   - **sql_variant**
   - User Defined Types (UDT)
   - **geometry**
   - **geography**
   - **hierarchyid**
- Delta lake supports only six digits of precision.
   - Columns of SQL type **datetime2**, with precision of 7 fractional second digits, do not have a corresponding data type with same precision in Delta files in Fabric OneLake. A precision loss happens if columns of this type are mirrored and seventh decimal second digit will be trimmed.
   - A table cannot be mirrored if the primary key is one of these data types: **datetime2(7)**, **datetimeoffset(7)**, **time(7)**, where `7` is seven digits of precision. 
   - The **datetimeoffset(7)** data type does not have a corresponding data type with same precision in Delta files in Fabric OneLake. A precision loss (loss of time zone and seventh time decimal) occurs if columns of this type are mirrored.
- Column names for a SQL table cannot contain spaces nor the following characters: `,` `;` `{` `}` `(` `)` `\n` `\t` `=`.
- If one or more columns in the table is of type Large Binary Object (LOB) with a size greater than 1 MB, the column data is truncated to size of 1 MB in Fabric OneLake.

## SQL analytics endpoint limitations

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It is the same read-only experience. See [SQL analytics endpoint limitations of the warehouse](../../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

## Related content

- [Limitations in SQL database in Microsoft Fabric](limitations.md)
