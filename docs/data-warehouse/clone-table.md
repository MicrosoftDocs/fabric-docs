---
title: Clone table
description: Learn about table clones in Microsoft Fabric.
author: ajagadish-24
ms.author: ajagadish
ms.reviewer: wiassaf
ms.date: 03/04/2024
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.search.form: Warehouse Clone table # This article's title should not change. If so, contact engineering.
---
# Clone table in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [product-name](../includes/product-name.md)] offers the capability to create near-instantaneous zero-copy clones with minimal storage costs.

- Table clones facilitate development and testing processes by creating copies of tables in lower environments.
- Table clones provide consistent reporting and zero-copy duplication of data for analytical workloads and machine learning modeling and testing.
- Table clones provide the capability of data recovery in the event of a failed release or data corruption by retaining the previous state of data.
- Table clones help to create historical reports that reflect the state of data as it existed as of a specific point-in-time in the past.

You can use the [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true) T-SQL commands to create a table clone. For a tutorial, see [Tutorial: Clone table using T-SQL](tutorial-clone-table.md) or [Tutorial: Clone tables in the Fabric portal](tutorial-clone-table-portal.md).

## What is zero-copy clone?

A zero-copy clone creates a replica of the table by copying the metadata, while still referencing the same data files in OneLake. The metadata is copied while the underlying data of the table stored as parquet files is not copied. The creation of a clone is similar to creating a table within a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

## Table clone in Synapse Data Warehouse

### Creation of a table clone

Within a warehouse, a clone of a table can be created near-instantaneously using simple T-SQL. A clone of a table can be created within or across schemas in a warehouse.

Clone of a table can be created based on either:

- **Current point-in-time:** The clone is based on the present state of the table.

- **Previous point-in-time:** The clone is based on a point-in-time up to seven days in the past. The table clone contains the data as it appeared at a desired past point in time. The new table is created with a timestamp based on UTC.

For examples, see [Clone table as of past point-in-time](tutorial-clone-table-portal.md#clone-table-as-of-past-point-in-time) or [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true).

There is no limit on the number of clones created both within and across schemas.

You can also clone a group of tables at once. This can be useful for cloning a group of related tables at the same past point in time. For an example, see [Clone multiple tables at once](tutorial-clone-table-portal.md#clone-multiple-tables-at-once).

### Retention of data history

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] automatically preserves and maintains the data history for seven calendar days, allowing for clones to be made at a point in time. All inserts, updates, and deletes made to the data warehouse are retained for seven calendar days.

### Separate and independent

Upon creation, a table clone is an independent and separate copy of the data from its source.

- Any changes made through DML or DDL on the source of the clone table are not reflected in the clone table.
- Similarly, any changes made through DDL or DML on the table clone are not reflected on the source of the clone table.

### Permissions to create a table clone

The following permissions are required to create a table clone:

- Users with Admin, Member, or Contributor [workspace roles](workspace-roles.md) can clone the tables within the workspace. The Viewer workspace role cannot create a clone.
- [SELECT](/sql/t-sql/queries/select-transact-sql?view=fabric&preserve-view=true) permission on all the rows and columns of the source of the table clone is required.
- User must have [CREATE TABLE](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true) permission in the schema where the table clone will be created.

### Deletion of a table clone

Due to its autonomous existence, both the original source and the clones can be deleted without any constraints. Once a clone is created, it remains in existence until deleted by the user.

- Users with Admin, Member, or Contributor [workspace roles](workspace-roles.md) can delete the table clone within the workspace.
- Users who have [ALTER SCHEMA](/sql/t-sql/statements/alter-schema-transact-sql?view=fabric&preserve-view=true) permissions on the schema in which the table clone resides can delete the table clone.

### Table clone inheritance

The objects described here are included in the table clone:

- The clone table inherits object-level SQL security from the source table of the clone. As the [workspace roles](workspace-roles.md) provide read access by default, [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true) permission can be set on the table clone if desired.
  
- The clone table inherits the [row-level security (RLS)](row-level-security.md) and [dynamic data masking](dynamic-data-masking.md) from the source of the clone table.

- The clone table inherits all attributes that exist at the source table, whether the clone was created within the same schema or across different schemas in a warehouse.

- The clone table inherits the primary and unique key constraints defined in the source table.

- A read-only delta log is created for every table clone that is created within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The data files stored as delta parquet files are read-only. This ensures that the data stays always protected from corruption.

## Table clone scenarios

Consider the ability to clone tables near instantaneously and with minimal storage costs in the following beneficial scenarios:

### Development and testing

Table clones allow developers and testers to experiment, validate, and refine the tables without affecting the tables in production environment. The clone provides a safe and isolated space to conduct development and testing activities of new features, ensuring the integrity and stability of the production environment. Use a table clone to quickly spin up a copy of production-like environment for troubleshooting, experimentation, development and testing purposes.

### Consistent reporting, data exploration, and machine learning modeling

To keep up with the ever-changing data landscape, frequent execution of ETL jobs is essential. Table clones support this goal by ensuring data integrity while providing the flexibility to generate reports based on the cloned tables, while background processing is ongoing. Additionally, table clones enable the reproducibility of earlier results for machine learning models. They also facilitate valuable insights by enabling historical data exploration and analysis.

### Low-cost, near-instantaneous recovery

In the event of accidental data loss or corruption, existing table clones can be used to recover the table to its previous state.

### Data archiving

For auditing or compliance purposes, zero copy clones can be easily used to create copies of data as it existed at a particular point in time in the past. Some data might need to be archived for long-term retention or legal compliance. Cloning the table at various historical points ensures that data is preserved in its original form.

## Limitations

- Table clones across warehouses in a workspace are not currently supported.
- Table clones across workspaces are not currently supported.
- Clone table is not supported on the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse.
- Clone of a warehouse or schema is currently not supported.
- Table clones submitted before the retention period of seven days cannot be created.
- Changes to the table schema prevent a clone from being created prior to the table schema change.

## Related content

- [Tutorial: Clone a table using T-SQL in Microsoft Fabric](tutorial-clone-table.md)
- [Tutorial: Clone tables in the Fabric portal](tutorial-clone-table-portal.md)
- [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true)
- [Query the [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in Microsoft Fabric](query-warehouse.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Clone tables in the Fabric portal](tutorial-clone-table-portal.md)
