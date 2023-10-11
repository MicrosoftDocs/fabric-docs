---
title: Clone table
description: Learn about table clones in Microsoft Fabric.
author: ajagadish-24
ms.author: ajagadish
ms.reviewer: wiassaf
ms.date: 06/21/2023
ms.topic: conceptual
ms.search.form: Warehouse Clone table # This article's title should not change. If so, contact engineering.
---
# Clone table in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [product-name](../includes/product-name.md)] offers the capability to create near-instantaneous zero-copy clones with minimal storage costs.

- Table clones facilitate development and testing processes by creating copies of tables in lower environments.
- Table clones provide consistent reporting and zero-copy duplication of datasets for analytical workloads and machine learning modeling and testing.
- Table clones provide the capability of data recovery in the event of a failed release or data corruption by retaining the previous state of data.

You can use the [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true) T-SQL commands to create a table clone. For a tutorial, see [Tutorial: Clone table using T-SQL](tutorial-clone-table.md).

[!INCLUDE [preview-note](../includes/preview-note.md)]

## What is zero-copy clone?

A zero-copy clone creates a replica of the table by copying the metadata, while still referencing the same data files in OneLake. The metadata is copied while the underlying data of the table stored as parquet files is not copied. The creation of a clone is similar to creating a table within a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

## Table clone in Synapse Data Warehouse

### Creation of a table clone

Within a warehouse, a clone of a table can be created near-instantaneously using simple T-SQL, based on the current data in the table. A clone of a table can be created within or across schemas in a warehouse.

There is no limit on the number of clones created both within and across schemas.

### Separate and independent

Upon creation, a table clone is an independent and separate copy of the data from its source. Changes made to the source table, such as adding new attributes or data, are not reflected in the cloned table.

Similarly, any new attributes or data added to the cloned table are not applied to the source table.

### Deletion of a table clone

Due to its autonomous existence, both the original source and the clones can be deleted without any constraints or limitations. Once a clone is created, it remains in existence until deleted by the user.

### Permissions to create a table clone

The following permissions are required to create a table clone:

- Users with Admin, Member, or Contributor [workspace roles](workspace-roles.md) can clone the tables within the workspace. The Viewer workspace role cannot create a clone.

- [SELECT](/sql/t-sql/queries/select-transact-sql?view=fabric&preserve-view=true) permission on all the rows and columns of the source of the table clone is required.

- User must have [CREATE TABLE](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true) permission in the schema where the table clone will be created.

### Table clone inheritance

The objects described here are included in the table clone:

- The object-level security on the source of the clone is automatically inherited by the cloned table. As the [workspace roles](workspace-roles.md) provide read access by default, [DENY](/sql/t-sql/statements/deny-transact-sql?view=fabric&preserve-view=true) permission can be set on the table clone if desired.

- All attributes that exist at the source table are inherited by the table clone, whether the clone was created within the same schema or across different schemas in a warehouse.

- The primary and unique key constraints defined in the source table are inherited by the table clone.

- A read-only delta log is created for every table clone that is created within the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The data files stored as delta parquet files are read-only. This ensures that the data stays always protected from corruption.

## Table clone scenarios

Consider the ability to clone tables near instantaneously and with minimal storage costs in the following beneficial scenarios:

### Development and testing

   Table clones allow developers and testers to experiment, validate, and refine the tables without impacting the tables in production environment. The clone provides a safe and isolated space to conduct development and testing activities of new features, ensuring the integrity and stability of the production environment. Use a table clone to quickly spin up a copy of production-like environment for troubleshooting, experimentation, development and testing purposes.

### Consistent reporting, data exploration, and machine learning modeling

   To keep up with the ever-changing data landscape, frequent execution of ETL jobs is essential. Table clones support this goal by ensuring data integrity while providing the flexibility to generate reports based on the cloned tables, while background processing is ongoing. Additionally, table clones enable the reproducibility of earlier results for machine learning models. They also facilitate valuable insights by enabling historical data exploration and analysis.

### Low-cost, near-instantaneous recovery

   In the event of accidental data loss or corruption, existing table clones can be leveraged to recover the table to its previous state.

## Limitations

- Table clones across warehouses in a workspace are not currently supported.
- Table clones across workspaces are not currently supported.
- The tables present in [!INCLUDE [fabric-se](includes/fabric-se.md)] cannot be cloned through T-SQL.
- Clone creation as of a previous point in time is not currently supported.
- Clone of a warehouse or schema is currently not supported.

## Next steps

- [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true)
- [Tutorial: Clone table using T-SQL](tutorial-clone-table.md)
- [Query the Warehouse](query-warehouse.md)