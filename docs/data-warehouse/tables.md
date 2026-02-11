---
title: Tables in Fabric Data Warehouse
description: Learn how to design and use tables in Microsoft Fabric Data Warehouse, including temporary tables.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: xiaoyul, randolphwest
ms.date: 09/24/2025
ms.topic: how-to
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Tables in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article details key concepts for designing tables in [!INCLUDE [product-name](../includes/product-name.md)].

In tables, data is logically organized in a row-and-column format. Each row represents a unique record, and each column represents a field in the record.

## Determine table category

A [star schema](dimensional-modeling-overview.md#star-schema-design) organizes data into [fact tables](dimensional-modeling-fact-tables.md) and [dimension tables](dimensional-modeling-dimension-tables.md). Some tables are used for integration or staging data before moving to a fact or dimension table. As you design a table, decide whether the table data belongs in a fact, dimension, or integration table. This decision informs the appropriate table structure.

- **Fact tables** contain quantitative data that are commonly generated in a transactional system, and then loaded into the data warehouse. For example, a retail business generates sales transactions every day, and then loads the data into a data warehouse fact table for analysis.

- **Dimension tables** contain attribute data that might change but usually changes infrequently. For example, a customer's name and address are stored in a dimension table and updated only when the customer's profile changes. To minimize the size of a large fact table, the customer's name and address don't need to be in every row of a fact table. Instead, the fact table and the dimension table can share a customer ID. A query can join the two tables to associate a customer's profile and transactions.

- **Integration tables** provide a place for integrating or staging data. For example, you can load data to a staging table, perform transformations on the data in staging, and then insert the data into a production table.

A table stores data in [OneLake](../onelake/onelake-overview.md) as part of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The table and the data persist whether or not a session is open.

## Tables in the warehouse

To show the organization of the tables, you could use `fact`, `dim`, or `int` as prefixes to the table names. The following table shows some of the schema and table names for [WideWorldImportersDW](/sql/samples/wide-world-importers-dw-database-catalog?view=fabric&preserve-view=true) sample data warehouse.

| WideWorldImportersDW Source Table Name  | Table Type | Data Warehouse Table Name |
|:-----|:-----|:------|:-----|
| City | Dimension | `wwi.DimCity` |
| Order | Fact | `wwi.FactOrder` |

- Table names can't contain `/` or `\` or end with a `.`.

## Create a table

For [!INCLUDE [fabric-dw](includes/fabric-dw.md)], you can create a table as a new empty table. You can also create and populate a table with the results of a select statement. The following are the T-SQL commands for creating a table.  

| T-SQL statement | Description |
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

- For more about data types, see [Data types in Fabric Data Warehouse](data-types.md).
- When you create a table in [!INCLUDE [fabric-dw](includes/fabric-dw.md)], review the [data types reference in CREATE TABLE (Transact-SQL)](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true#DataTypesFabric).
- For a guide to create a table in [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Create tables](create-table.md).

## Collation

Fabric warehouses are configured based on the workspace's collation setting, which by default is the case-sensitive (CS) collation `Latin1_General_100_BIN2_UTF8`. When creating a [new warehouse](create-warehouse.md), the collation of the workspace will be used. For more information, see [Data Warehouse collation](collation.md).

Supported warehouse collations are:

- `Latin1_General_100_BIN2_UTF8` (default)
- `Latin1_General_100_CI_AS_KS_WS_SC_UTF8`

You can create a warehouse with a non-default collation using the REST API. For more information, see [How to: Create a warehouse with case-insensitive (CI) collation](collation.md#create-a-warehouse-with-a-non-default-collation-with-rest-api).

Once the collation is set during database creation, all subsequent objects (tables, columns, etc.) will inherit this default collation. Once a warehouse is created, the collation setting cannot be changed.

## Statistics

The query optimizer uses column-level statistics when it creates the plan for executing a query. To improve query performance, it's important to have statistics on individual columns, especially columns used in query joins. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports automatic creation of statistics.

Statistical updating doesn't happen automatically. Update statistics after a significant number of rows are added or changed. For instance, update statistics after a load. For more information, see [Statistics in Fabric Data Warehouse](statistics.md).

## Primary key, foreign key, and unique key

For [!INCLUDE [fabric-dw](includes/fabric-dw.md)], `PRIMARY KEY` and `UNIQUE` constraints are only supported when `NONCLUSTERED` and `NOT ENFORCED` are both used.

`FOREIGN KEY` is only supported when `NOT ENFORCED` is used.

- For syntax, check [ALTER TABLE](/sql/t-sql/statements/alter-table-transact-sql?view=fabric&preserve-view=true).
- For more information, see [Primary keys, foreign keys, and unique keys](table-constraints.md).

<a id="temp-tables-in-fabric-data-warehouse"></a>

## #temp tables

Session-scoped temporary (`#temp`) tables can be created in Fabric Data Warehouse.

These tables exist only within the session in which they are created and last for the duration of that session. They are not visible to other users or sessions and are automatically dropped from the system once the session ends or the #temp table is dropped. These tables are accessible to all users without requiring specific item-level permission.

Two types of #temp tables can be created based on specific use cases, non-distributed and distributed.

- A non-distributed #temp table (mdf-backed) is the default type. The syntax for creating and using non-distributed #temp tables in Fabric Data Warehouse is similar to user tables, but you need to prefix the temp table name with `#`.

    ```sql
     CREATE TABLE #table_name (
       Col1 data_type1,
       Col2 data_type2
     );
    ```

- Distributed temp tables (Parquet-backed) can be created with the `DISTRIBUTION=ROUND_ROBIN` keyword:

    ```sql
    CREATE TABLE #table_name (
    Col1 data_type1,
    Col2 data_type2
    ) WITH (DISTRIBUTION=ROUND_ROBIN);
    ```

In the previous script, `data_type1` and `data_type2` are placeholders for supported [Data types in Fabric Data Warehouse](data-types.md).

Distributed #temp tables are recommended, as they align with normal user tables; they have unlimited storage, data type support, and T-SQL operations. The syntax for data manipulation and definition is identical to user tables in Fabric Data Warehouse, with prefix `#` added to the table name.

In Fabric Data Warehouse, temp tables are not affected by [time travel](time-travel.md) query hints and always return the latest data in the table.

## Align source data with the data warehouse

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] tables are populated by loading data from another data source. To achieve a successful load, the number and data types of the columns in the source data must align with the table definition in the warehouse.

If data is coming from multiple data stores, you can port the data into the warehouse and store it in an integration table. Once data is in the integration table, you can use the power of warehouse to implement transformation operations. Once the data is prepared, you can insert it into production tables.

## Limitations

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports many, but not all, of the table features offered by other databases.

- Global temporary tables are currently not supported.

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

- Warehouse object metadata is cached by Fabric Data Warehouse to provide fast access to objects and their definitions. For very large warehouses with more than 750,000 objects (for example, tables, views, stored procedures, and functions), metadata is no longer cached by the system. Instead, schema operations query the metadata store directly. This ensures system stability and prevents cache starvation in extremely large databases. However, schema refresh operations can take longer compared to smaller warehouses where metadata caching is enabled.

> [!IMPORTANT]
> There are limitations with adding table constraints or columns when using [Source Control with Warehouse](source-control.md#limitations-in-source-control).

## Related content

- [What is Data warehousing in Microsoft Fabric?](data-warehousing.md)
- [What is Data engineering in Microsoft Fabric?](../data-engineering/data-engineering-overview.md)
- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
- [OneLake, the OneDrive for data](../onelake/onelake-overview.md)
- [Create tables in the Warehouse in Microsoft Fabric](create-table.md)
- [Transactions in Warehouse tables in Microsoft Fabric](transactions.md)
