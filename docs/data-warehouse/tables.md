---
title: Tables in data warehousing
description: Learn about tables in Microsoft Fabric.
author: KevinConanMSFT
ms.author: kecona
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: how-to
ms.search.form: Warehouse design and development
---

# Tables in data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]
 
This article details key concepts for designing tables in [!INCLUDE [product-name](../includes/product-name.md)].

In tables, data is logically organized in a row-and-column format. Each row represents a unique record, and each column represents a field in the record.

- In [!INCLUDE[fabricdw](includes/fabric-dw.md)], tables are database objects that contain all the transactional data. 
- In [!INCLUDE[fabricdw](includes/fabric-dw.md)], tables reflect the contents of delta tables in the [Lakehouse](../data-engineering/lakehouse-overview.md).

## Determine table category

A [star schema](/power-bi/guidance/star-schema) organizes data into fact and dimension tables. Some tables are used for integration or staging data before moving to a fact or dimension table. As you design a table, decide whether the table data belongs in a fact, dimension, or integration table. This decision informs the appropriate table structure.

- **Fact tables** contain quantitative data that are commonly generated in a transactional system, and then loaded into the data warehouse. For example, a retail business generates sales transactions every day, and then loads the data into a data warehouse fact table for analysis.

- **Dimension tables** contain attribute data that might change but usually changes infrequently. For example, a customer's name and address are stored in a dimension table and updated only when the customer's profile changes. To minimize the size of a large fact table, the customer's name and address don't need to be in every row of a fact table. Instead, the fact table and the dimension table can share a customer ID. A query can join the two tables to associate a customer's profile and transactions.

- **Integration tables** provide a place for integrating or staging data. For example, you can load data to a staging table, perform transformations on the data in staging, and then insert the data into a production table.

A table stores data in [OneLake overview](../onelake/onelake-overview.md) as part of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The table and the data persist whether or not a session is open.


## Tables in Synapse Data Warehouse

To show the organization of the tables, you could use `fact`, `dim`, or `int` as prefixes to the table names. The following table shows some of the schema and table names for [WideWorldImportersDW](/sql/samples/wide-world-importers-dw-database-catalog?view=fabric&preserve-view=true) sample data warehouse. 

| WideWorldImportersDW Source Table Name  | Table Type | Data Warehouse Table Name |
|:-----|:-----|:------|:-----|
| City | Dimension | `wwi.DimCity` |
| Order | Fact | `wwi.FactOrder` |

- Table names are not case sensitive. 
- Table names cannot contain `/` or `\`.

## Tables in the SQL Endpoint of the Lakehouse

The [!INCLUDE [fabric-se](includes/fabric-se.md)] manages the automatically generated tables so the workspace users can't modify them. The workspace users can enrich the database model by adding their own SQL schemas, views, procedures, and other database objects.

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

```sql
CREATE SCHEMA wwi;
```

## Data types

[!INCLUDE [product-name](../includes/product-name.md)] supports the most commonly used T-SQL data types. 

- For more about data types, see [Data types in Microsoft Fabric](data-types.md).
- When you create a table in [!INCLUDE [fabric-dw](includes/fabric-dw.md)], review the [data types reference in CREATE TABLE (Transact-SQL)](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true#DataTypesFabric). 
- Table data types are automatically chosen in the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse, see [Autogenerated data types](data-types.md#autogenerated-data-types-in-the-sql-endpoint).
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

## Automatically generated schema

For every Delta table in your [Lakehouse](../data-engineering/lakehouse-overview.md), the [!INCLUDE [fabric-se](includes/fabric-se.md)] automatically generates one table. 

Tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)] are created with a delay. Once you create or update Delta Lake folder/table in the lake, the warehouse table that references the lake data won't be immediately created/refreshed. The changes will be applied in the warehouse after 5-10 seconds.

For autogenerated schema data types for the [!INCLUDE [fabric-se](includes/fabric-se.md)], see [Data types in Microsoft Fabric](data-types.md).

## Limitations

- You can't query tables with renamed columns.

- You can't load case sensitive tables to data warehouse (for example, "Cat", "cat", and "CAT" are all read as the same table name by SQL). Duplicate table names can cause the data warehouse to fail. Use unique table and file names for all items in a warehouse.

- Non-delta tables (Parquet, CSV, AVRO) aren't supported in the Lakehouse. Data should be in delta format. [Delta Lake is an open-source storage framework](https://delta.io/) that enables building Lakehouse architecture.

   If you don't see a Lakehouse table in the [!INCLUDE [fabric-se](includes/fabric-se.md)], check the data format. Only the tables in Delta Lake format are available in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Parquet, CSV, and other formats can't be queried using the [!INCLUDE [fabric-se](includes/fabric-se.md)]. If you don't see your table, convert it to Delta Lake format. 
 
- Tables with renamed columns aren't supported in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Don't rename the columns in the lake because the renamed columns aren't available. If you rename the columns, you need to recreate the table in the lake.

- Delta tables created outside of the `/tables` folder aren't available in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

   If you don't see a Lakehouse table in the warehouse, check the location of the table. Only the tables that are referencing data in the `/tables` folder are available in the warehouse. The tables that reference data in the `/files` folder in the lake aren't exposed in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. As a workaround, move your data to the `/tables` folder.

- Some columns that exist in the Spark Delta tables might not be available in the tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Only the columns with the following types are available in the warehouse tables: boolean, short, small, int, long, date, timestamp, float, double, decimal, varchar/char(truncated to 8 KB), binary (limited to 8 KB). The columns of the other types aren't be exposed in the warehouse tables. Unsupported data types should be converted. For example, the following types aren't available:

   - Complex types (arrays, struct, maps)
   - Binary/BSON
   - Long string (longer than 8 KB). All strings are limited to varchar(8000).

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
- [Create a [!INCLUDE [fabric-dw](includes/fabric-dw.md)]](create-warehouse.md)
- [Query a warehouse](query-warehouse.md)
- [OneLake overview](../onelake/onelake-overview.md)
- [Getting Workspace and OneLake path](get-workspace-onelake-path.md)
- [Create tables in [!INCLUDE[fabricdw](includes/fabric-dw.md)]](create-table.md)
- [Transactions and modify tables](transactions.md)