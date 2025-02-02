---
title: "Limitations for SQL database (preview)"
description: A detailed list of limitations for SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac, antho, sukkaur
ms.date: 01/16/2025
ms.topic: conceptual
ms.custom:
  - ignite-2024
---
# Limitations in SQL database in Microsoft Fabric (preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Current limitations in the SQL database in Fabric are listed in this page. This page is subject to change.

These limitations apply to SQL database in Fabric only. For the warehouse and SQL analytics endpoint items in Fabric Data Warehouse, see [Limitations of Fabric Data Warehouse](../../data-warehouse/limitations.md).

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Database level limitations

- SQL database in Fabric does not support Change Data Capture (CDC) or Azure Synapse Link for SQL.
- SQL Audit is not currently supported in SQL database in Fabric.
- Transparent Data Encryption (TDE) is not supported. SQL database in Fabric uses storage encryption with service-managed keys to protect all customer data at rest. Customer-managed keys are not supported.

## Table level  

- A table primary key cannot be one of these data types: **hierarchyid**, **sql_variant**, **timestamp**.
- If one or more columns in the table is of type Large Binary Object (LOB) with a size > 1 MB, the column data is truncated to size of 1 MB in Fabric OneLake.
- Currently, tables cannot be in-memory tables.
- Full-text indexing is not supported and cannot be created in SQL database in Microsoft Fabric.
- The following table-level data definition language (DDL) operations aren't allowed:
    - Switch/Split/Merge partition
    - Partition compression

## Column level

- Column names for a SQL table cannot contain spaces nor the following characters: `,` `;` `{` `}` `(` `)` `\n` `\t` `=`.

### SQL analytics endpoint limitations  

- The SQL analytics endpoint of the SQL database in Fabric works just like the [Lakehouse SQL analytics endpoint](../../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It is the same read-only experience.

## Availability

SQL database in Fabric is available in most regions where Microsoft Fabric is available. For more information, see [Fabric availability](/azure/reliability/reliability-fabric#availability).

[!INCLUDE [tenant-region-availability-note](../../includes/tenant-region-availability-note.md)]

Mirroring of SQL database in Fabric is available in [Fabric regions that support mirroring](../mirrored-database/azure-sql-database-limitations.md#supported-regions).

## Limitations

For more limitations in specific areas, see:

- [Limitations and behaviors for Fabric SQL database mirroring (preview)](mirroring-limitations.md)
- [Limitations in Authentication in SQL database in Microsoft Fabric](authentication.md#limitations)
- [Limitations in backups in SQL database in Microsoft Fabric](backup.md#limitations)
- [Limitations in restore from a backup in SQL database in Microsoft Fabric](restore.md#limitations)
- [Limitations in share your SQL database and manage permission](share-sql-manage-permission.md#limitations).
- [Limitations of Copilot for SQL database](copilot.md#limitations-of-copilot-for-sql-database)

## Related content

- [SQL database in Microsoft Fabric](overview.md)
