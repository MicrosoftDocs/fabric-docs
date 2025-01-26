---
title: "Understand storage for Direct Lake semantic models"
description: "Learn about storage concepts for Direct Lake semantic models and how to optimize for reliable, fast query performance."
author: peter-myers
ms.author: phseamar
ms.reviewer: davidi
ms.date: 09/16/2024
ms.topic: conceptual
ms.custom: fabric-cat
---

# Understand storage for Direct Lake semantic models

This article introduces [Direct Lake](direct-lake-overview.md) storage concepts. It describes Delta tables and Parquet files. It also describes how you can optimize Delta tables for Direct Lake semantic models, and how you can maintain them to help deliver reliable, fast query performance.

## Delta tables

Delta tables exist in OneLake. They organize file-based data into rows and columns and are available to Microsoft Fabric compute engines such as [notebooks](../data-engineering/how-to-use-notebook.md), [Kusto](../real-time-analytics/kusto-query-set.md?tabs=kql-database&preserve-view=true), and the [lakehouse](../data-engineering/lakehouse-overview.md) and [warehouse](../data-warehouse/data-warehousing.md). You can query Delta tables by using Data Analysis Expressions (DAX), Multidimensional Expressions (MDX), T-SQL (Transact-SQL), Spark SQL, and even Python.

> [!NOTE]
> Delta—or _Delta Lake_—is an open-source storage format. That means Fabric can also query Delta tables created by other tools and vendors.

Delta tables store their data in Parquet files, which are typically stored in a lakehouse that a Direct Lake semantic model uses to load data. However, Parquet files can also be stored externally. External Parquet files can be referenced by using a [OneLake shortcut](../onelake/onelake-shortcuts.md), which points to a specific storage location, such as [Azure Data Lake Storage (ADLS) Gen2](/azure/storage/blobs/data-lake-storage-introduction), Amazon S3 storage accounts, or [Dataverse](/power-apps/maker/data-platform/data-platform-intro). In almost all cases, compute engines access the Parquet files by querying Delta tables. However, typically Direct Lake semantic models load column data directly from optimized Parquet files in OneLake by using a process known as [transcoding](direct-lake-overview.md#column-loading-transcoding).

### Data versioning

Delta tables comprise one or more Parquet files. These files are accompanied by a set of JSON-based link files, which track the order and nature of each Parquet file that's associated with a Delta table.

It's important to understand that the underlying Parquet files are incremental in nature. Hence the name _Delta_ as a reference to incremental data modification. Every time a write operation to a Delta table takes place—such as when data is inserted, updated, or deleted—new Parquet files are created that represent the data modifications as a _version_. Parquet files are therefore _immutable_, meaning they're never modified. It's therefore possible for data to be duplicated many times across a set of Parquet files for a Delta table. The Delta framework relies on link files to determine which physical Parquet files are required to produce the correct query result.

Consider a simple example of a Delta table that this article uses to explain different data modification operations. The table has two columns and stores three rows.

| ProductID | StockOnHand |
| --- | --: |
| A | 1 |
| B | 2 |
| C | 3 |

The Delta table data is stored in a single Parquet file that contains all data, and there's a single link file that contains metadata about when the data was inserted (appended).

- Parquet file 1:
  - **ProductID**: A, B, C
  - **StockOnHand**: 1, 2, 3
- Link file 1:
  - Contains the timestamp when `Parquet file 1` was created, and records that data was appended.

#### Insert operations

Consider what happens when an insert operation occurs: A new row for product `C` with a stock on hand value of `4` is inserted. This operations results in the creation of a new Parquet file and link file, so there's now two Parquet files and two link files.

- Parquet file 1:
  - **ProductID**: A, B, C
  - **StockOnHand**: 1, 2, 3
- Parquet file 2:
  - **ProductID**: D
  - **StockOnHand**: 4
- Link file 1:
  - Contains the timestamp when `Parquet file 1` was created, and records that data was appended.
- Link file 2:
  - Contains the timestamp when `Parquet file 2` was created, and records that data was appended.

At this point, a query of the Delta table returns the following result. It doesn't matter that the result is sourced from multiple Parquet files.

| ProductID | StockOnHand |
| --- | --: |
| A | 1 |
| B | 2 |
| C | 3 |
| D | 4 |

Every subsequent insert operation creates new Parquet files and link files. That means the number of Parquet files and link files grows with every insert operation.

#### Update operations

Now consider what happens when an update operation occurs: The row for product `D` has its stock on hand value changed to `10`. This operations results in the creation of a new Parquet file and link file, so there are now three Parquet files and three link files.

- Parquet file 1:
  - **ProductID**: A, B, C
  - **StockOnHand**: 1, 2, 3
- Parquet file 2:
  - **ProductID**: D
  - **StockOnHand**: 4
- Parquet file 3:
  - **ProductID**: C
  - **StockOnHand**: 10
- Link file 1:
  - Contains the timestamp when `Parquet file 1` was created, and records that data was appended.
- Link file 2:
  - Contains the timestamp when `Parquet file 2` was created, and records that data was appended.
- Link file 3:
  - Contains the timestamp when `Parquet file 3` was created, and records that data was updated.

At this point, a query of the Delta table returns the following result.

| ProductID | StockOnHand |
| --- | --: |
| A | 1 |
| B | 2 |
| C | 10|
| D | 4 |

Data for product `C` now exists in multiple Parquet files. However, queries to the Delta table combine the link files to determine what data should be used to provide the correct result.

#### Delete operations

Now consider what happens when a delete operation occurs: The row for product `B` is deleted. This operation results in a new Parquet file and link file, so there are now four Parquet files and four link files.

- Parquet file 1:
  - **ProductID**: A, B, C
  - **StockOnHand**: 1, 2, 3
- Parquet file 2:
  - **ProductID**: D
  - **StockOnHand**: 4
- Parquet file 3:
  - **ProductID**: C
  - **StockOnHand**: 10
- Parquet file 4:
  - **ProductID**: A, C, D
  - **StockOnHand**: 1, 10, 4
- Link file 1:
  - Contains the timestamp when `Parquet file 1` was created, and records that data was appended.
- Link file 2:
  - Contains the timestamp when `Parquet file 2` was created, and records that data was appended.
- Link file 3:
  - Contains the timestamp when `Parquet file 3` was created, and records that data was updated.
- Link file 4:
  - Contains the timestamp when `Parquet file 4` was created, and records that data was deleted.

Notice that `Parquet file 4` no longer contains data for product `B`, but it does contain data for all other rows in the table.

At this point, a query of the Delta table returns the following result.

| ProductID | StockOnHand |
| --- | --: |
| A | 1 |
| C | 10|
| D | 4 |

> [!NOTE]
> This example is simple because it involves a small table, just a few operations, and only minor modifications. Large tables that experience many write operations and that contain many rows of data will generate more than one Parquet file per version.

> [!IMPORTANT]
> Depending on how you define your Delta tables and the frequency of data modification operations, it might result in many Parquet files. Be aware that each Fabric capacity license has [guardrails](direct-lake-overview.md#fabric-capacity-guardrails-and-limitations). If the number of Parquet files for a Delta table exceeds the limit for your SKU, queries will [fall back to DirectQuery](direct-lake-overview.md#directquery-fallback), which might result in slower query performance.
>
> To manage the number of Parquet files, see [Delta table maintenance](#delta-table-maintenance) later in this article.

#### Delta time travel

Link files enable querying data as of an earlier point in time. This capability is known as _Delta time travel_. The earlier point in time could be a timestamp or version.

Consider the following query examples.

```sql
SELECT * FROM Inventory TIMESTAMP AS OF '2024-04-28T09:15:00.000Z';
SELECT * FROM Inventory AS OF VERSION 2;
```

> [!TIP]
> You can also query a table by using the `@` shorthand syntax to specify the timestamp or version as part of the table name. The timestamp must be in `yyyyMMddHHmmssSSS` format. You can specify a version after `@` by prepending a `v` to the version.

Here are the previous query examples rewritten with shorthand syntax.

```sql
SELECT * FROM Inventory@20240428091500000;
SELECT * FROM Inventory@v2;
```

> [!IMPORTANT]
> Table versions accessible with time travel are determined by a combination of the retention threshold for transaction log files and the frequency and specified retention for VACUUM operations (described later in the [Delta table maintenance](#delta-table-maintenance) section). If you run VACUUM daily with the default values, seven days of data will be available for time travel.

#### Framing

_Framing_ is a Direct Lake operation that sets the version of a Delta table that should be used to load data into a semantic model column. Equally important, the version also determines what should be excluded when data is loaded.

A framing operation stamps the timestamp/version of each Delta table into the semantic model tables. From this point, when the semantic model needs to load data from a Delta table, the timestamp/version associated with the most recent framing operation is used to determine what data to load. Any subsequent data modifications that occur for the Delta table since the latest framing operation are ignored (until the next framing operation).

> [!IMPORTANT]
> Because a framed semantic model references a particular Delta table version, the source must ensure it keeps that Delta table version until framing of a new version is completed. Otherwise, users will encounter errors when the Delta table files need to be accessed by the model and have been vacuumed or otherwise deleted by the producer workload.

For more information about framing, see [Direct Lake overview](direct-lake-overview.md#framing).

### Table partitioning

Delta tables can be partitioned so that a subset of rows are stored together in a single set of Parquet files. Partitions can speed up queries as well as write operations.

Consider a Delta table that has a billion rows of sales data for a two-year period. While it's possible to store all the data in a single set of Parquet files, for this data volume it's not optimal for read and write operations. Instead, performance can be improved by spreading the billion rows of data across multiple series of Parquet files.

A _partition key_ must be defined when setting up table partitioning. The partition key determines which rows to store in which series. For Delta tables, the partition key can be defined based on the distinct values of a specified column (or columns), such as a month/year column of a date table. In this case, two years of data would be distributed across 24 partitions (2 years x 12 months).

Fabric compute engines are unaware of table partitions. As they insert new partition key values, new partitions are created automatically. In OneLake, you'll find one subfolder for each unique partition key value, and each subfolder stores its own set of Parquet files and link files. At least one Parquet file and one link file must exist, but the actual number of files in each subfolder can vary. As data modification operations take place, each partition maintains its own set of Parquet files and link files to keep track of what to return for a given timestamp or version.

If a query of a partitioned Delta table is filtered to only the most recent three months of sales data, the subset of Parquet files and link files that need to be accessed can be quickly identified. That then allows skipping many Parquet files altogether, resulting in better read performance.

However, queries that don't filter on the partition key might not always perform better. That can be the case when a Delta table stores all data in a single large set of Parquet files and there's file or row group fragmentation. While it's possible to parallelize the data retrieval from multiple Parquet files across multiple cluster nodes, many small Parquet files can adversely affect file I/O and therefore query performance. For this reason, it's best to avoid partitioning Delta tables in most cases—unless write operations or extract, transform, and load (ETL) processes would clearly benefit from it.

Partitioning benefits insert, update, and delete operations too, because file activity only takes place in subfolders matching the partition key of the modified or deleted rows. For example, if a batch of data is inserted into a partitioned Delta table, the data is assessed to determine what partition key values exist in the batch. Data is then directed only to the relevant folders for the partitions.

Understanding how Delta tables use partitions can help you design optimal ETL scenarios that reduce the write operations that need to take place when updating large Delta tables. Write performance improves by reducing the number and size of any new Parquet files that must be created. For a large Delta table partitioned by month/year, as described in the previous example, new data only adds new Parquet files to the latest partition. Subfolders of previous calendar months remain untouched. If any data of previous calendar months must be modified, only the relevant partition folders receive new partition and link files.

> [!IMPORTANT]
> If the main purpose of a Delta table is to serve as a data source for semantic models (and secondarily, other query workloads), it's usually better to avoid partitioning in preference for optimizing the [load of columns into memory](direct-lake-overview.md#column-loading-transcoding).

For Direct Lake semantic models or the [SQL analytics endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md), the best way to optimize Delta table partitions is to let Fabric automatically manage the Parquet files for each version of a Delta table. Leaving the management to Fabric should result in high query performance through parallelization, however it might not necessarily provide the best write performance.

If you must optimize for write operations, consider using partitions to optimize write operations to Delta tables based on the partition key. However, be aware that over partitioning a Delta table can negatively impact on read performance. For this reason, we recommend that you test the read and write performance carefully, perhaps by creating multiple copies of the same Delta table with different configurations to compare timings.

> [!WARNING]
> If you partition on a high cardinality column, it can result in an excessive number of Parquet files. Be aware that every Fabric capacity license has [guardrails](direct-lake-overview.md#fabric-capacity-guardrails-and-limitations). If the number of Parquet files for a Delta table exceeds the limit for your SKU, queries will [fall back to DirectQuery](direct-lake-overview.md#directquery-fallback), which might result in slower query performance.

### Parquet files

The underlying storage for a Delta table is one or more Parquet files. Parquet file format is generally used for _write-once, read-many_ applications. New Parquet files are created every time data in a Delta table is modified, whether by an insert, update, or delete operation.

> [!NOTE]
> You can access Parquet files that are associated with Delta tables by using a tool, like [OneLake file explorer](../onelake/onelake-file-explorer.md). Files can be downloaded, copied, or moved to other destinations as easily as moving any other files. However, it's the combination of Parquet files and the JSON-based link files that allow compute engines to issue queries against the files as a Delta table.

#### Parquet file format

The internal format of a Parquet file differs from other common data storage formats, such as CSV, TSV, XMLA, and JSON. These formats organize data _by rows_, while Parquet organizes data _by columns_. Also, Parquet file format differs from these formats because it organizes rows of data into one or more _row groups_.

The internal data structure of a Power BI semantic model is column-based, which means Parquet files share a lot in common with Power BI. This similarity means that a Direct Lake semantic model can efficiently load data from the Parquet files directly into memory. In fact, very large volumes of data can be loaded in seconds. Contrast this capability with the refresh of an Import semantic model which must retrieve blocks or source data, then process, encode, store, and then load it into memory. An Import semantic model refresh operation can also consume significant amounts of compute (memory and CPU) and take considerable time to complete. However, with Delta tables, most of the effort to prepare the data suitable for direct loading into a semantic model takes place when the Parquet file is generated.

#### How Parquet files store data

Consider the following example set of data.

| Date | ProductID | StockOnHand |
| --- | --- | --: |
| 2024-09-16 | A | 10|
| 2024-09-16 | B | 11|
| 2024-09-17 | A | 13|
| … | | |

When stored in Parquet file format, conceptually, this set of data might look like the following text.

```html
Header:
RowGroup1:
    Date: 2024-09-16, 2024-09-16, 2024-09-17…
    ProductID: A, B, A…
    StockOnHand: 10, 11, 13…
RowGroup2:
    …
Footer:
```

Data is compressed by substituting dictionary keys for common values, and by applying _run-length encoding (RLE)_. RLE strives to compress a series of same values into a smaller representation. In the following example, a dictionary mapping of numeric keys to values is created in the header, and the smaller key values are used in place of the data values.

```html
Header:
    Dictionary: [
        (1, 2024-09-16), (2, 2024-09-17),
        (3, A), (4, B),
        (5, 10), (6, 11), (7, 13)
        …
    ]
RowGroup1:
    Date: 1, 1, 2…
    ProductID: 3, 4, 3…
    StockOnHand: 5, 6, 7…
Footer:
```

When the Direct Lake semantic model needs data to compute the sum of the `StockOnHand` column grouped by `ProductID`, only the dictionary and data associated with the two columns is required. In large files that contain many columns, substantial portions of the Parquet file can be skipped to help speed up the read process.

> [!NOTE]
> The contents of a Parquet file aren't human readable and so it isn't suited to opening in a text editor. However, there are many open-source tools available that can open and reveal the contents of a Parquet file. These tools can also let you inspect metadata, such as the number of rows and row groups contained in a file.

#### V-Order

Fabric supports an additional optimization called _[V-Order](../data-engineering/delta-optimization-and-v-order.md?tabs=sparksql&preserve-view=true)_. V-Order is a write-time optimization to the Parquet file format. Once V-Order is applied, it results in a smaller and therefore faster file to read. This optimization is especially relevant for a Direct Lake semantic model because it prepares the data for fast loading into memory, and so it makes less demands on capacity resources. It also results in faster query performance because less memory needs to be scanned.

Delta tables created and loaded by Fabric items such as [data pipelines](../data-factory/data-factory-overview.md#data-pipelines), [dataflows](../data-factory/data-factory-overview.md#dataflows), and [notebooks](../data-engineering/data-engineering-overview.md#notebook) automatically apply V-Order. However, Parquet files uploaded to a Fabric lakehouse, or that are referenced by a [shortcut](../onelake/onelake-shortcuts.md), might not have this optimization applied. While non-optimized Parquet files can still be read, the read performance likely won't be as fast as an equivalent Parquet file that's had V-Order applied.

> [!NOTE]
> Parquet files that have V-Order applied still conform to the open-source Parquet file format. Therefore, they can be read by non-Fabric tools.

For more information, see [Delta Lake table optimization and V-Order](../data-engineering/delta-optimization-and-v-order.md?tabs=sparksql&preserve-view=true).

## Delta table optimization

This section describes various topics for optimizing Delta tables for semantic models.

### Data volume

While Delta tables can grow to store extremely large volumes of data, [Fabric capacity guardrails](direct-lake-overview.md#fabric-capacity-guardrails-and-limitations) impose limits on semantic models that query them. When those limits are exceeded, queries will [fall back to DirectQuery](direct-lake-overview.md#directquery-fallback), which might result in slower query performance.

Therefore, consider limiting the row count of a large [fact table](../data-warehouse/dimensional-modeling-fact-tables.md) by raising its granularity (store summarized data), reducing dimensionality, or storing less history.

Also, ensure that [V-Order](#v-order) is applied because it results in a smaller and therefore faster file to read.

### Column data type

Strive to reduce cardinality (the number of unique values) in every column of each Delta table. That's because all columns are compressed and stored by using _hash encoding_. Hash encoding requires V-Order optimization to assign a numeric identifier to each unique value contained in the column. It's the numeric identifier, then, that's stored, requiring a hash lookup during storage and querying.

When you use [approximate numeric data types](../data-warehouse/data-types.md#data-types-in-warehouse) (like **float** and **real**), consider rounding values and using a lower precision.

### Unnecessary columns

As with any data table, Delta tables should only store columns that are required. In the context of this article, that means required by the semantic model, though there could be other analytic workloads that query the Delta tables.

Delta tables should include columns required by the semantic model for filtering, grouping, sorting, and summarizing, in addition to columns that support model relationships. While unnecessary columns don't affect semantic model query performance (because they won't be loaded into memory), they result in a larger storage size and so require more compute resources to load and maintain.

Because Direct Lake semantic models don't support calculated columns, you should materialize such columns in the Delta tables. Note that this design approach is an anti-pattern for Import and DirectQuery semantic models. For example, if you have `FirstName` and `LastName` columns, and you need a `FullName` column, materialize the values for this column when inserting rows into the Delta table.

Consider that some semantic model summarizations might depend on more than one column. For example, to calculate sales, the measure in the model sums the product of two columns: `Quantity` and `Price`. If neither of these columns is used independently, it would be more efficient to materialize the sales calculation as a single column than store its component values in separate columns.

### Row group size

Internally, a Parquet file organizes rows of data into multiple row groups within each file. For example, a Parquet file that contains 30,000 rows might chunk them into three row groups, each having 10,000 rows.

The number of rows in a row group influences how quickly Direct Lake can read the data. A higher number of row groups with fewer rows is likely to negatively impact loading column data into a semantic model due to excessive I/O.

Generally, we don't recommend that you change the default row group size. However, you might consider changing the row group size for large Delta tables. Be sure to test the read and write performance carefully, perhaps by creating multiple copies of the same Delta tables with different configurations to compare timings.

> [!IMPORTANT]
> Be aware that every Fabric capacity license has [guardrails](direct-lake-overview.md#fabric-capacity-guardrails-and-limitations). If the number of row groups for a Delta table exceeds the limit for your SKU, queries will [fall back to DirectQuery](direct-lake-overview.md#directquery-fallback), which might result in slower query performance.

## Delta table maintenance

Over time, as write operations take place, Delta table versions accumulate. Eventually, you might reach a point at which a negative impact on read performance becomes noticeable. Worse, if the number of Parquet files per table, or row groups per table, or rows per table exceeds the [guardrails for your capacity](direct-lake-overview.md#fabric-capacity-guardrails-and-limitations), queries will [fall back to DirectQuery](direct-lake-overview.md#directquery-fallback), which might result in slower query performance. It's therefore important that you maintain Delta tables regularly.

### OPTIMIZE

You can use [OPTIMIZE](/azure/databricks/sql/language-manual/delta-optimize) to optimize a Delta table to coalesce smaller files into larger ones. You can also set the `WHERE` clause to target only a filtered subset of rows that match a given partition predicate. Only filters involving partition keys are supported. The `OPTIMIZE` command can also apply V-Order to compact and rewrite the Parquet files.

We recommend that you run this command on large, frequently updated Delta tables on a regular basis, perhaps every day when your ETL process completes. Balance the trade-off between better query performance and the cost of resource usage required to optimize the table.

### VACUUM

You can use [VACUUM](/azure/databricks/sql/language-manual/delta-vacuum) to remove files that are no longer referenced and/or that are older than a set retention threshold. Take care to set an appropriate retention period, otherwise you might lose the ability to [time travel](#delta-time-travel) back to a version older than the frame stamped into semantic model tables.

> [!IMPORTANT]
> Because a framed semantic model references a particular Delta table version, the source must ensure it keeps that Delta table version until framing of a new version is completed. Otherwise, users will encounter errors when the Delta table files need to be accessed by the model and have been vacuumed or otherwise deleted by the producer workload.

### REORG TABLE

You can use [REORG TABLE](/azure/databricks/sql/language-manual/delta-reorg-table) to reorganize a Delta table by rewriting files to purge soft-deleted data, such as when you drop a column by using [ALTER TABLE DROP COLUMN](/azure/databricks/sql/language-manual/sql-ref-syntax-ddl-alter-table-manage-column).

### Automate table maintenance

To automate table maintenance operations, you can use the Lakehouse API. For more information, see [Manage the Lakehouse with Microsoft Fabric REST API](../data-engineering/lakehouse-api.md).

> [!TIP]
> You can also use the lakehouse [Table maintenance feature](../data-engineering/lakehouse-table-maintenance.md) in the Fabric portal to simplify management of your Delta tables.

## Related content

- [Direct Lake overview](direct-lake-overview.md)
- [Develop Direct Lake semantic models](direct-lake-develop.md)
- [Manage Direct Lake semantic models](direct-lake-manage.md)
- [Delta Lake table optimization and V-Order](/fabric/data-engineering/delta-optimization-and-v-order?tabs=sparksql&preserve-view=true)
