---
title: Tables in Fabric Data Warehouse
description: Learn how to design and use tables in Microsoft Fabric Data Warehouse.
ms.reviewer: xiaoyul, randolphwest
ms.date: 10/13/2026
ms.topic: concept-article
ai-usage: ai-assisted
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Tables in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article explains key concepts for designing tables in [!INCLUDE [product-name](../includes/product-name.md)].

In tables, you logically organize data in a row-and-column format. Each row represents a unique record, and each column represents a field in the record.

## Determine table category

A [star schema](dimensional-modeling-overview.md#star-schema-design) organizes data into [fact tables](dimensional-modeling-fact-tables.md) and [dimension tables](dimensional-modeling-dimension-tables.md). Some tables are used for integration or staging data before moving to a fact or dimension table. As you design a table, decide whether the table data belongs in a fact, dimension, or integration table. This decision informs the appropriate table structure.

- **Fact tables** contain quantitative data that transactional systems commonly generate, and then load into the data warehouse. For example, a retail business generates sales transactions every day, and then loads the data into a data warehouse fact table for analysis.

- **Dimension tables** contain attribute data that might change but usually changes infrequently. For example, store a customer's name and address in a dimension table and update it only when the customer's profile changes. To minimize the size of a large fact table, the customer's name and address don't need to be in every row of a fact table. Instead, the fact table and the dimension table can share a customer ID. A query can join the two tables to associate a customer's profile and transactions.

- **Integration tables** provide a place for integrating or staging data. For example, you can load data to a staging table, perform transformations on the data in staging, and then insert the data into a production table.

A table stores data in [OneLake](../onelake/onelake-overview.md) as part of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The table and the data persist whether or not a session is open.

<a id="temp-tables-in-fabric-data-warehouse"></a>

## Tables in the warehouse

To show the organization of the tables, use `fact`, `dim`, or `int` as prefixes to the table names. The following table shows some of the schema and table names for the [WideWorldImportersDW](/sql/samples/wide-world-importers-dw-database-catalog?view=fabric&preserve-view=true) sample data warehouse.

| WideWorldImportersDW Source Table Name  | Table Type | Data Warehouse Table Name |
|:-----|:-----|:------|
| City | Dimension | `wwi.DimCity` |
| Order | Fact | `wwi.FactOrder` |

- Table names can't contain `/` or `\` or end with a `.`.
- You can create session-scoped temporary (`#temp`) tables in Fabric Data Warehouse. For more information, see [Temp tables in Fabric Data Warehouse](temp-tables.md).

## Create a table

For [!INCLUDE [fabric-dw](includes/fabric-dw.md)], you can create a table as a new empty table. You can also create and populate a table with the results of a select statement. The following table shows the T-SQL commands for creating a table.  

| T-SQL statement | Description |
|:----------------|:------------|
| [CREATE TABLE](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true) | Creates an empty table by defining all the table columns and options. |
| [CREATE TABLE AS SELECT](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) | Populates a new table with the results of a select statement. The table columns and data types are based on the select statement results. To import data, this statement can select from an external table. |

This example creates a table with two columns:

```sql
CREATE TABLE MyTable (col1 int, col2 int );
```

Fabric Data Warehouse supports [IDENTITY columns](identity.md) in tables to automatically insert an incrementing number sequence. To get started, see [Use IDENTITY columns in Fabric Data Warehouse](tutorial-identity.md).

Similarly, you can modify existing tables with the [ALTER TABLE (Transact-SQL)](/sql/t-sql/statements/alter-table-transact-sql?view=fabric&preserve-view=true) T-SQL syntax.

Metadata for views in the warehouse can become outdated because of changes to the underlying tables upon which the view depends. To refresh a view's metadata, use [sys.sp_refreshview (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-refreshview-transact-sql.md?view=fabric&preserve-view=true).  Views created with `SCHEMABINDING` block changes to underlying objects when those changes affect the view definition. If you don't create a view with `SCHEMABINDING`, run `sp_refreshview` when you make changes to the objects underlying the view that affect the definition of the view. Otherwise, the view might return unexpected results when you query it.

### Schema names

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports the creation of custom schemas. Like in SQL Server, schemas are a good way to group together objects that are used in a similar fashion. The following code creates a [user-defined schema](/sql/t-sql/statements/create-schema-transact-sql?view=fabric&preserve-view=true) called `wwi`.

- Schema names can't contain `/` or `\` or end with a `.`.

```sql
CREATE SCHEMA wwi;
```

## Data types

[!INCLUDE [product-name](../includes/product-name.md)] supports the most commonly used T-SQL data types.

- For more about data types, see [Data types in Fabric Data Warehouse](data-types.md).
- When you create a table in [!INCLUDE [fabric-dw](includes/fabric-dw.md)], review the [data types reference in CREATE TABLE (Transact-SQL)](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true#DataTypesFabric).
- For a guide to create a table in [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Create tables](create-table.md).

## Collation

Fabric warehouses are configured based on the workspace's collation setting, which by default is the case-sensitive (CS) collation `Latin1_General_100_BIN2_UTF8`. When creating a [new warehouse](create-warehouse.md), the collation of the workspace is used. For more information, see [Data Warehouse collation](collation.md).

Supported warehouse collations are:

- `Latin1_General_100_BIN2_UTF8` (default)
- `Latin1_General_100_CI_AS_KS_WS_SC_UTF8`

You can create a warehouse with a non-default collation by using the REST API. For more information, see [How to: Create a warehouse with case-insensitive (CI) collation](collation.md#create-a-warehouse-with-a-non-default-collation-with-rest-api).

After you set the collation during database creation, all subsequent objects (tables, columns, and so on) inherit this default collation. After you create a warehouse, you can't change the collation setting.

## Statistics

The query optimizer uses column-level statistics when it creates the plan for executing a query. To improve query performance, it's important to have statistics on individual columns, especially columns used in query joins. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports automatic creation of statistics.

Statistical updating doesn't happen automatically. Update statistics after a significant number of rows are added or changed. For example, update statistics after a load. For more information, see [Statistics in Fabric Data Warehouse](statistics.md).

## Primary key, foreign key, and unique key

For [!INCLUDE [fabric-dw](includes/fabric-dw.md)], you can use `PRIMARY KEY` and `UNIQUE` constraints only when you use both `NONCLUSTERED` and `NOT ENFORCED`.

You can use `FOREIGN KEY` only when you use `NOT ENFORCED`.

- For syntax, see [ALTER TABLE](/sql/t-sql/statements/alter-table-transact-sql?view=fabric&preserve-view=true).
- For more information, see [Primary keys, foreign keys, and unique keys](table-constraints.md).

## Align source data with the data warehouse

You can populate [!INCLUDE [fabric-dw](includes/fabric-dw.md)] tables by loading data from another data source. To successfully load data, the number and data types of the columns in the source data must align with the table definition in the warehouse.

If data comes from multiple data stores, you can port the data into the warehouse and store it in an integration table. When the data is in the integration table, you can use the power of the warehouse to implement transformation operations. When the data is prepared, you can insert it into production tables.

## Limitations

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports many, but not all, of the table features offered by other databases.

- Global temporary tables aren't currently supported.

The following list shows some of the table features that aren't currently supported.

- 1,024 maximum columns per table
- Computed columns
- Indexed views
- Partitioned tables
- Sequence
- Sparse columns
- Synonyms
- Triggers
- Unique indexes
- User-defined types
- External tables

Fabric Data Warehouse caches warehouse object metadata to provide fast access to objects and their definitions. For very large warehouses with more than 750,000 objects (for example, tables, views, stored procedures, and functions), the system no longer caches metadata. Instead, schema operations query the metadata store directly. This design ensures system stability and prevents cache starvation in extremely large databases. However, schema refresh operations can take longer compared to smaller warehouses where metadata caching is enabled.

> [!IMPORTANT]
> There are limitations with adding table constraints or columns when using [Git Integration for Fabric Warehouse Development](git-integration.md#limitations-in-git-integration).

## Related content

- [Temp tables in Fabric Data Warehouse](temp-tables.md)
- [Data types in Fabric Data Warehouse](data-types.md)
- [Query using the SQL query editor](sql-query-editor.md)