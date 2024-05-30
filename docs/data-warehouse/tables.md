---
title: Tables in data warehousing
description: Learn about tables in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: kecona
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Tables in data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article details key concepts for designing tables in [!INCLUDE [product-name](../includes/product-name.md)].

In tables, data is logically organized in a row-and-column format. Each row represents a unique record, and each column represents a field in the record.

- In [!INCLUDE [fabricdw](includes/fabric-dw.md)], tables are database objects that contain all the transactional data.

## Determine table category

A [star schema](/power-bi/guidance/star-schema) organizes data into fact and dimension tables. Some tables are used for integration or staging data before moving to a fact or dimension table. As you design a table, decide whether the table data belongs in a fact, dimension, or integration table. This decision informs the appropriate table structure.

- **Fact tables** contain quantitative data that are commonly generated in a transactional system, and then loaded into the data warehouse. For example, a retail business generates sales transactions every day, and then loads the data into a data warehouse fact table for analysis.

- **Dimension tables** contain attribute data that might change but usually changes infrequently. For example, a customer's name and address are stored in a dimension table and updated only when the customer's profile changes. To minimize the size of a large fact table, the customer's name and address don't need to be in every row of a fact table. Instead, the fact table and the dimension table can share a customer ID. A query can join the two tables to associate a customer's profile and transactions.

- **Integration tables** provide a place for integrating or staging data. For example, you can load data to a staging table, perform transformations on the data in staging, and then insert the data into a production table.

A table stores data in [OneLake](../onelake/onelake-overview.md) as part of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The table and the data persist whether or not a session is open.


## Tables in the Warehouse

To show the organization of the tables, you could use `fact`, `dim`, or `int` as prefixes to the table names. The following table shows some of the schema and table names for [WideWorldImportersDW](/sql/samples/wide-world-importers-dw-database-catalog?view=fabric&preserve-view=true) sample data warehouse. 

| WideWorldImportersDW Source Table Name  | Table Type | Data Warehouse Table Name |
|:-----|:-----|:------|:-----|
| City | Dimension | `wwi.DimCity` |
| Order | Fact | `wwi.FactOrder` |

- Table names are case sensitive. 
- Table names can't contain `/` or `\` or end with a `.`.

## Create a table

For [!INCLUDE [fabric-dw](includes/fabric-dw.md)], you can create a table as a new empty table. You can also create and populate a table with the results of a select statement. The following are the T-SQL commands for creating a table. 

| T-SQL Statement | Description |
|:----------------|:------------|
| [CREATE TABLE](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true) | Creates an empty table by defining all the table columns and options. |
| [CREATE TABLE AS SELECT](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) | Populates a new table with the results of a select statement. The table columns and data types are based on the select statement results. To import data, this statement can select from an external table. |

This example creates a table with two columns:

```sql
CREATE TABLE MyTable (col1 int, col2 int );  
```

### Schema names

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports the creation of custom schemas. Like in SQL Server, schemas are a good way to group together objects that are used in a similar fashion. The following code creates a [user-defined schema](/sql/t-sql/statements/create-schema-transact-sql?view=fabric&preserve-view=true) called `wwi`.

- Schema names are case sensitive. 
- Schema names can't contain `/` or `\` or end with a `.`.

```sql
CREATE SCHEMA wwi;
```

## Data types

[!INCLUDE [product-name](../includes/product-name.md)] supports the most commonly used T-SQL data types. 

- For more about data types, see [Data types in Microsoft Fabric](data-types.md).
- When you create a table in [!INCLUDE [fabric-dw](includes/fabric-dw.md)], review the [data types reference in CREATE TABLE (Transact-SQL)](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true#DataTypesFabric). 
- For a guide to create a table in [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Create tables](create-table.md).

## Collation

Currently, `Latin1_General_100_BIN2_UTF8` is the default and only supported collation for both tables and metadata.

## Statistics

The query optimizer uses column-level statistics when it creates the plan for executing a query. To improve query performance, it's important to have statistics on individual columns, especially columns used in query joins. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports automatic creation of statistics. 

Statistical updating doesn't happen automatically. Update statistics after a significant number of rows are added or changed. For instance, update statistics after a load. For more information, see [Statistics](statistics.md).

## Primary key, foreign key, and unique key

For [!INCLUDE [fabric-dw](includes/fabric-dw.md)], PRIMARY KEY and UNIQUE constraint are only supported when NONCLUSTERED and NOT ENFORCED are both used.

FOREIGN KEY is only supported when NOT ENFORCED is used.  

- For syntax, check [ALTER TABLE](/sql/t-sql/statements/alter-table-transact-sql?view=fabric&preserve-view=true). 
- For more information, see [Primary keys, foreign keys, and unique keys in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]](table-constraints.md).

## Align source data with the data warehouse

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] tables are populated by loading data from another data source. To achieve a successful load, the number and data types of the columns in the source data must align with the table definition in the data warehouse.

If data is coming from multiple data stores, you can port the data into the data warehouse and store it in an integration table. Once data is in the integration table, you can use the power of data warehouse to implement transformation operations. Once the data is prepared, you can insert it into production tables.

<a id="limitations"></a>

### Limitations

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports many, but not all, of the table features offered by other databases.

The following list shows some of the table features that aren't currently supported.  

- 1024 maximum columns per table
- Computed columns
- Indexed views
- Partitioned tables
- Sequence
- Sparse columns
- Surrogate keys on number sequences with Identity columns
- Synonyms
- Temporary tables
- Triggers
- Unique indexes
- User-defined types

## Related content

- [What is data warehousing in [!INCLUDE [product-name](../includes/product-name.md)]?](data-warehousing.md)
- [What is data engineering in [!INCLUDE [product-name](../includes/product-name.md)]?](../data-engineering/data-engineering-overview.md)
- [Create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)]](create-warehouse.md)
- [Query a warehouse](query-warehouse.md)
- [OneLake overview](../onelake/onelake-overview.md)
- [Create tables in [!INCLUDE[fabricdw](includes/fabric-dw.md)]](create-table.md)
- [Transactions and modify tables](transactions.md)
