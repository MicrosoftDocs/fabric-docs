---
title: Tables in Synapse Data Warehouses
description: Learn about tables in your Synapse Data Warehouse in Microsoft Fabric.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/29/2023
---

# Tables in [!INCLUDE[fabricdw](includes/fabric-dw.md)]

**Applies to:** [!INCLUDE[fabric-se](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]
 
This article details key concepts for designing tables for a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]. For more information, see [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md).

Tables are database objects that contain all the data in a [!INCLUDE[fabricdw](includes/fabric-dw.md)]. In tables, data is logically organized in a row-and-column format. Each row represents a unique record, and each column represents a field in the record.

## Determine table category

A [star schema](/power-bi/guidance/star-schema) organizes data into fact and dimension tables. Some tables are used for integration or staging data before moving to a fact or dimension table. As you design a table, decide whether the table data belongs in a fact, dimension, or integration table. This decision informs the appropriate table structure.

- **Fact tables** contain quantitative data that are commonly generated in a transactional system, and then loaded into the data warehouse. For example, a retail business generates sales transactions every day, and then loads the data into a data warehouse fact table for analysis.

- **Dimension tables** contain attribute data that might change but usually changes infrequently. For example, a customer's name and address are stored in a dimension table and updated only when the customer's profile changes. To minimize the size of a large fact table, the customer's name and address don't need to be in every row of a fact table. Instead, the fact table and the dimension table can share a customer ID. A query can join the two tables to associate a customer's profile and transactions.

- **Integration tables** provide a place for integrating or staging data. For example, you can load data to a staging table, perform transformations on the data in staging, and then insert the data into a production table.

## Schema names

Schemas are a good way to group together objects that are used in a similar fashion. The following code creates a [user-defined schema](/sql/t-sql/statements/create-schema-transact-sql?view=fabric&preserve-view=true) called `wwi`.

```sql
CREATE SCHEMA wwi;
```

## Table names

> [!NOTE]
> Table names cannot contain `/` or `\`.

To show the organization of the tables, you could use `fact`, `dim`, or `int` as prefixes to the table names. The following table shows some of the schema and table names for [WideWorldImportersDW](/sql/samples/wide-world-importers-dw-database-catalog?view=fabric&preserve-view=true) sample data warehouse.  

| WideWorldImportersDW Source Table Name  | Table Type | Data Warehouse Table Name |
|:-----|:-----|:------|:-----|
| City | Dimension | `wwi.DimCity` |
| Order | Fact | `wwi.FactOrder` |

### Regular table

A regular table stores data in OneLake as part of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The table and the data persist whether or not a session is open.  This example creates a regular table with two columns:

```sql
CREATE TABLE MyTable (col1 int, col2 int );  
```

For more information about OneLake, see the [OneLake overview](../onelake/onelake-overview.md) and [Getting Workspace and OneLake path](get-workspace-onelake-path.md).

## Data types

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports the most commonly used T-SQL data types. For a list of the supported data types, see [data types in CREATE TABLE reference](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric#DataTypes&preserve-view=true) in the CREATE TABLE statement. 

## Collation

Currently, `Latin1_General_100_BIN2_UTF8` is the default and only supported collation for [!INCLUDE [fabric-dw](includes/fabric-dw.md)] tables.

## Statistics

The query optimizer uses column-level statistics when it creates the plan for executing a query. To improve query performance, it's important to have statistics on individual columns, especially columns used in query joins. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports automatic creation of statistics. 

Statistical updating doesn't happen automatically. Update statistics after a significant number of rows are added or changed. For instance, update statistics after a load. For more information, see [Statistics](statistics.md).

## Primary key, foreign key and unique key

For [!INCLUDE [fabric-dw](includes/fabric-dw.md)], PRIMARY KEY and UNIQUE constraint are only supported when NONCLUSTERED and NOT ENFORCED are both used.

FOREIGN KEY is only supported when NOT ENFORCED is used.  

- For syntax, check [ALTER TABLE](/sql/t-sql/statements/alter-table-transact-sql?view=fabric#DataTypes&preserve-view=true) and [CREATE TABLE](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric#DataTypes&preserve-view=true). 
- For more information, see [Primary keys, foreign keys, and unique keys in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]](table-constraints.md).

## Commands for creating tables

For [!INCLUDE [fabric-dw](includes/fabric-dw.md)], you can create a table as a new empty table. You can also create and populate a table with the results of a select statement. The following are the T-SQL commands for creating a table.

| T-SQL Statement | Description |
|:----------------|:------------|
| [CREATE TABLE](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true) | Creates an empty table by defining all the table columns and options. |
| [CREATE TABLE AS SELECT](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) | Populates a new table with the results of a select statement. The table columns and data types are based on the select statement results. To import data, this statement can select from an external table. |

## Align source data with the data warehouse

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] tables are populated by loading data from another data source. To achieve a successful load, the number and data types of the columns in the source data must align with the table definition in the data warehouse.

If data is coming from multiple data stores, you can port the data into the data warehouse and store it in an integration table. Once data is in the integration table, you can use the power of data warehouse to implement transformation operations. Once the data is prepared, you can insert it into production tables.

## Known limitations

At this time, there's limited T-SQL functionality in the warehouse. See [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.

### Unsupported table features

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports many, but not all, of the table features offered by other databases.

The following list shows some of the table features that aren't currently supported:

- Computed columns
- Indexed views
- Sequence
- Sparse columns
- Surrogate keys on number sequences with Identity columns
- Synonyms
- Triggers
- Unique indexes
- User-defined types

## Next steps

- [What is data warehousing in [!INCLUDE [product-name](../includes/product-name.md)]?](data-warehousing.md)
- [What is data engineering in [!INCLUDE [product-name](../includes/product-name.md)]?](../data-engineering/data-engineering-overview.md)
- [[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]](warehouse.md)
- [Create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)]](create-warehouse.md)
- [Query a warehouse](query-warehouse.md)
- [OneLake overview](../onelake/onelake-overview.md)
- [Getting Workspace and OneLake path](get-workspace-onelake-path.md)
- [Create tables in [!INCLUDE[fabricdw](includes/fabric-dw.md)] using SQL Server Management Studio (SSMS)](create-table-sql-server-management-studio.md)
- [Transactions and modify tables with SSMS](transactions.md)