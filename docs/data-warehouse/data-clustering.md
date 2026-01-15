---
title: Data Clustering in Fabric Data Warehouse
description: Learn more about data clustering in Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha
ms.date: 11/11/2025
ms.topic: concept-article
---

# Data clustering in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Data clustering is a technique used to organize and store data based on similarity. Data clustering improves query performance and reduces compute and storage access costs for queries by grouping similar records together.

## How it works

Data clustering works by storing rows with similar values in adjacent locations on storage during ingestion. Data clustering uses a space-filling curve to organize data in a way that preserves locality across multiple dimensions, meaning rows with similar values across clustering columns are stored physically close together. This approach dramatically improves query performance by performing file skipping and reducing the number of files that are scanned.

Unlike conventional lexicographical ordering, data clustering uses a sophisticated algorithm to ingest, keeping rows with similar column values close together, even when a table is clustered by several columns. This makes data clustering ideal for range queries, high-cardinality filters, and large tables with skewed distributions, resulting in faster reads, reduced I/O, and more efficient resource usage.

Here's a simplified conceptual illustration of data clustering: 
 
:::image type="content" source="media/data-clustering/data-clustering-concept.png" alt-text="Diagram illustrating the concept of data clustering in a data warehouse." lightbox="media/data-clustering/data-clustering-concept.png":::

In this diagram, a table labeled `Source data` shows rows mixed and highlighted in different colors to represent clustering groupings on destination. An Ordered table is split into three file segments, each grouping rows by similar colors, demonstrating how clustering organizes data into optimized storage segments based on column values.

Data clustering metadata is embedded in the manifest during ingestion, allowing the warehouse engine to make intelligent decisions about which files to access during user queries. This metadata, combined with how rows with similar values are stored together ensures that queries with filter predicates can skip entire files and row groups that fall outside the predicate scope. For example: if a query targets only 10% of a table's data, clustering ensures that only files that contain the data within the filter's range are scanned, reducing I/O and compute consumption. Larger tables benefit more from data clustering, as the benefits of file skipping scale with data volume.

## When to use data clustering

When deciding if data clustering could be beneficial, investigate query patterns and table characteristics in the warehouse. Data clustering is most effective when queries repeatedly filter on specific columns and when the underlying tables are large and contain mid-to-high cardinality data. Some common scenarios include: 

- Repeated queries with `WHERE` filters: If the workload includes frequent queries filtering specific columns, data clustering ensures that only relevant files are scanned during read queries. This also applies when the filters are used repeatedly in dashboards, reports, or scheduled jobs and pushed down to the warehouse engine as SQL statements.
- Larger tables: data clustering is most effective when applied to large tables where scanning the full dataset is costly. By organizing rows with data clustering, the warehouse engine can skip entire files and row groups that don't match the query filter, which can reduce I/O and compute usage.
- Mid-to-high cardinality columns: columns with higher cardinality (for example: columns that have many distinct values, such as an ID, or a date) benefit more from data clustering because they allow the engine to isolate and colocate similar values. This enables efficient file skipping, especially for selective queries. Columns with low cardinality (for example: gender, region) by nature has its values spread across more files, therefore offering limited opportunities for file-skipping. 
- Selective queries with narrow scope: when queries typically target a small subset of data and are combined with a WHERE filter, data clustering ensures that only files that contain the relevant rows are read. 

Data clustering happens automatically during data ingestion, regardless of how rows were ingested. No user operations are required after data is ingested to apply data clustering.

## CLUSTER BY Syntax

Data clustering is defined during table creation, using the `CLUSTER BY` clause. The syntax is as follows: 

[CREATE TABLE (Transact-SQL)](/sql/t-sql/statements/create-table-transact-sql?view=fabric&preserve-view=true) syntax: 

```syntaxsql
CREATE TABLE { warehouse_name.schema_name.table_name | schema_name.table_name | table_name } (
 [ ,... n ] –- Column list
) WITH (CLUSTER BY [ ,... n ]);
```

[CREATE TABLE AS SELECT (Transact-SQL)](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) syntax: 

```syntaxsql
CREATE TABLE { warehouse_name.schema_name.table_name | schema_name.table_name | table_name } (
) WITH (CLUSTER BY[ ,... n ])
AS <select_statement>;
```

The `CLUSTER BY` clause requires at least one column to be specified for data clustering, and a maximum of four columns. 

Creating a table that uses data clustering with `SELECT INTO` isn't supported.

## Data type support

The following table summarizes column types that can be used in the `CLUSTER BY` clause: 

| Category | Data type | Data clustering supported |
|----------------|------------------------------------------------|----------------------------|
| Exact numerics | **bit** | No |
| Exact numerics | **bigint**, **int**, **smallint**, **decimal**<sup>2</sup>, **numeric** | Yes |
| Approximate numerics | **float**, **real** | Yes |
| Date and time | **date**, **datetime2**, **time** | Yes |
| Character strings<sup>1</sup>  | **char** | Yes |
| Character strings<sup>1</sup>  | **varchar** | Yes |
| LOB types | **varchar(max)**, **varbinary(max)** | No | 
| Binary strings | **varbinary**, **uniqueidentifier** | No |

<sup>1</sup> For string types (**char**/**varchar**), only the first 32 characters are used when column statistics are produced. As a result, columns with values that contain long prefixes might have limited benefits with data clustering. 

<sup>2</sup> For **decimal** types with precision greater than 18, predicates aren't pushdown to storage during query execution. If using **decimal** types with data clustering, favor columns with smaller precision.

Columns with unsupported data types can still exist in a table that uses data clustering, but can't be used with `CLUSTER BY`. 

## Best practices with data clustering

Data clustering is more effective when clustering columns are chosen based on actual query patterns, particularly those with mid-to-high cardinality and when range predicates are used during queries. 

Consider the following best practices when using data clustering: 

- Data clustering is more effective on large tables. 
- Whenever possible, batch ingestion and updates to process a larger number of rows at once, rather than using smaller tasks. For optimal performance, DML operations should have at least 1 million rows to benefit from data clustering. After consecutive inserts, updates, and deletes, data compaction can consolidate rows from smaller files into optimally sized ones.
- Choose columns with mid-to-high cardinality for data clustering, as they yield better results due to their distinct value distribution. Columns with low cardinality might offer limited opportunities for file pruning. 
- Select columns based on frequent usage of `WHERE` predicates in dashboards, reports, scheduled jobs, or user queries. Equality join conditions don't benefit from data clustering. For an overview of how to use Query Insights to help pick columns for data clustering based on your current workload, refer to [Tutorial: Using Data Clustering in Fabric Data Warehouse](tutorial-data-clustering.md).
- Don't use data clustering by more columns than strictly necessary. Multi-column clustering adds complexity to storage, adds overhead, and might not offer benefits unless all the columns are used together in queries with predicates.
- The column order used in `CLUSTER BY` isn't important and doesn't change how rows are stored.
- When creating a table with data clustering using `CREATE TABLE AS SELECT` (CTAS) or ingesting data with `INSERT INTO ... SELECT`, keep the select portion of these statements as simple as possible for optimal data clustering quality.

Data clustering can significantly reduce the costs during queries, if well aligned with query predicates. However, data ingestion incurs more time and capacity units (CU) on a table that uses data clustering when compared with an equivalent table with the same data without data clustering. This happens because the warehouse engine needs to order data during ingestion. Since data that is ingested is read multiple times, data clustering can reduce the overall compute consumption of a given workload.

## System views

Data clustering metadata can be queried using `sys.index_columns`. It shows all columns used in data clustering, including the column ordinal used in the `CLUSTER BY` clause.

The following query lists all columns used in data clustering on the current warehouse, and their tables: 

```sql
SELECT
    t.name AS table_name,
    c.name AS column_name,
    ic.data_clustering_ordinal AS clustering_ordinal
FROM sys.tables t
JOIN sys.columns c
    ON t.object_id = c.object_id
JOIN sys.index_columns ic
    ON c.object_id = ic.object_id
   AND c.column_id = ic.column_id
WHERE ic.data_clustering_ordinal > 0
ORDER BY
    t.name,
    ic.data_clustering_ordinal;
```

> [!NOTE]
> The column ordinal is displayed for reference only as the order used in `CLUSTER BY` when the table was defined. As discussed in [Best practices](#best-practices-with-data-clustering), the column order doesn't affect performance.

## Limitations and Remarks

- Data ingestion performance might degrade when tables contain large **varchar** columns with highly variable data sizes.
  - For example, consider a table with a **varchar(200)** column: if some rows contain only a few characters while others approach the maximum length, the significant variance in data size can negatively impact ingestion speed.
  - This issue is known and will be addressed in an upcoming release.
- `IDENTITY` columns can't be used with `CLUSTER BY`. Tables that contain an `IDENTITY` column can still be used for data clustering, given that it uses different columns with `CLUSTER BY`.
- Data clustering must be defined at table creation. Converting a regular table into one with `CLUSTER BY` isn't supported. Similarly, modifying the clustering columns after a table has been created isn't allowed. If different clustering columns are needed, optionally use `CREATE TABLE AS SELECT` (CTAS) to create a new table with the desired clustering columns. 
- In some cases, data clustering might be applied asynchronously. In such cases, data is reorganized with a background task, and the table might not be fully optimized when ingestion finishes. This can happen under the following conditions:
  - When using `INSERT INTO ... SELECT` or `CREATE TABLE AS SELECT (CTAS)` and the collation of the source and target tables are different.
  - When ingesting from external data that is of a compressed CSV format.
  - When an ingestion statement has fewer than 1 million rows. 
- Data ingestion on data clustering tables incurs an overhead when compared with a table with the same schema that doesn't use data clustering. This happens due to extra computation needed to optimize storage. When the clustering column has a case insensitive collation, more overhead is also expected. 
- Data clustering can benefit query response time, capacity unit (CU) consumption, or both.

## Examples

### A. Create a clustered table for sales data

This example creates a simple `Sales` table and uses the `CustomerID` and `SaleDate` columns for data clustering.

```sql
CREATE TABLE Sales (
    SaleID INT,
    CustomerID INT,
    SaleDate DATE,
    Amount DECIMAL(10,2)
) WITH (CLUSTER BY (CustomerID, SaleDate))
```

### B. Create a clustered table using CREATE TABLE AS SELECT

This example uses `CREATE TABLE AS SELECT` to create a copy of the `Sales` existing table, with `CLUSTER BY` the `SaleDate` column.

```sql
CREATE TABLE Sales_CTAS 
WITH (CLUSTER BY (SaleDate)) 
AS SELECT * FROM Sales
```

### C. View the columns used for Data Clustering on a given table

This example lists the columns used for data clustering in the `Sales` table.

```sql
SELECT
    c.name AS column_name,
    ic.data_clustering_ordinal AS clustering_ordinal
FROM sys.tables t
JOIN sys.columns c
    ON t.object_id = c.object_id
JOIN sys.index_columns ic
    ON c.object_id = ic.object_id
   AND c.column_id = ic.column_id
WHERE 
    ic.data_clustering_ordinal > 0
   AND t.name = 'Sales'
ORDER BY
    t.name,
    ic.data_clustering_ordinal;
```

Results:

:::image type="content" source="media/data-clustering/clustering-columns.png" alt-text="Table showing clustering columns and their ordinal positions. The first row lists CustomerID with clustering ordinal 1. The second row lists SaleDate with clustering ordinal 2." lightbox="media/data-clustering/clustering-columns.png":::

### D. Check the effectiveness of the column choices for data clustering

Query Insights can help evaluate the effect of data clustering on your workload by comparing CPU time and data scanned between a given query and its equivalent run on a clustered copy of the original table. The following example illustrates how to retrieve the allocated CPU time and the volume of data scanned across disk, memory, and remote storage for a specific query.

```sql
SELECT 
    allocated_cpu_time_ms, 
    data_scanned_disk_mb, 
    data_scanned_memory_mb, 
    data_scanned_remote_storage_mb
FROM 
    queryinsights.exec_requests_history 
WHERE 
     distributed_statement_id = '<Query_Statement_ID>'
```

Where `<Query_Statement_ID>` is the distributed statement ID of the query you want to evaluate.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Using Data Clustering in Fabric Data Warehouse](tutorial-data-clustering.md)

## Related content

- [Performance guidelines in Fabric Data Warehouse](guidelines-warehouse-performance.md)
- [Monitor Fabric Data warehouse](monitoring-overview.md)
