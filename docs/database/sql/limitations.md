---
title: "Limitations for SQL database (preview)"
description: A detailed list of limitations for SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac, antho, sukkaur
ms.date: 10/31/2024
ms.topic: conceptual
---
# Limitations in SQL database in Microsoft Fabric (preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Current limitations in the SQL database in Fabric are listed in this page. This page is subject to change.

These limitations apply to SQL database in Fabric only. For the warehouse and SQL analytics endpoint items in Fabric Data Warehouse, see [Limitations in Microsoft Fabric](../../data-warehouse/limitations.md).

## Database level limitations

- SQL database in Fabric does not support: Change Data Capture (CDC) or Azure Synapse Link for SQL.
- Active transactions continue to hold the transaction log truncation until the transaction commits. Long-running transactions might result in the transaction log filling up more than usual.
- Each user workload varies. Table updates/delete operations can lead to increased log generation.
- The replicator engine monitors each table for changes independently. If there are no updates in a source table, the replicator engine starts to back off with an exponentially increasing duration for that table, up to an hour. The same can occur if there is a transient error, preventing data refresh. The replicator engine will automatically resume regular polling after updated data is detected.
- The maximum number of tables is 500 tables.

## Permissions in the source database

- [Row-level security](/sql/relational-databases/security/row-level-security) is not currently supported for SQL database in Fabric.

## Table level  

- Tables must have a primary key rowstore clustered index.
    - A table primary key cannot be one of these data types: **hierarchyid**, **sql_variant**, **timestamp**.
- If one or more columns in the table is of type Large Binary Object (LOB) with a size > 1 MB, the column data is truncated to size of 1 MB in Fabric OneLake.
- Currently, tables cannot have any of the following features in use:
    - Temporal history tables and ledger history tables  
    - Always Encrypted
    - In-memory tables
    - Graph
    - External tables
- Full-text indexing is not supported and cannot be created in SQL database in Microsoft Fabric.

The following table-level data definition language (DDL) operations aren't allowed:
    - Switch/Split/Merge partition, and partition compression
    - Alter Primary Key  
    - `DROP TABLE`
    - `TRUNCATE` table
    - Rename Table (`sp_rename`)

## Column level  

- Computed columns are not supported.
- These column data types are unsupported:
    - **image**
    - **text**/**ntext**
    - **xml**
    - **rowversion**/**timestamp**
    - **sql_variant**
    - **geometry**
    - **geography**
    - User Defined Types (UDT)
- Column names for a SQL table cannot contain spaces nor the following characters: `space` `,` `;` `{` `}` `(` `)` `\n` `\t` `=`.

The following column level data definition language (DDL) operations aren't supported on source tables.
    - `ALTER ... COLUMN`
    - Rename column (`sp_rename`)

### SQL analytics endpoint limitations  

- The SQL analytics endpoint of the SQL database in Fabric is the same as [the Lakehouse SQL analytics endpoint](../../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It is the same read-only experience. 

## Limitations

For more limitations in specific areas, see:

- [Share your SQL database and manage permissions limitations](share-sql-manage-permission.md#limitations).
- [Limitations and behaviors for Fabric SQL database mirroring (preview)](mirroring-limitations.md)
- [Limitations of Copilot for SQL database](copilot.md#limitations-of-copilot-for-sql-database)
- [Limitations in Authentication in SQL database in Microsoft Fabric](authentication.md#limitations)

## Related content

- [SQL database in Microsoft Fabric](overview.md)
