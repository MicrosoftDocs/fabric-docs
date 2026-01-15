---
title: Performance Guidelines
description: Get performance guidelines for Microsoft Fabric Data Warehouse to optimize queries, ingestion, table design, statistics, caching, and more.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: xiaoyul, procha, fipopovi, twcyril
ms.date: 01/14/2026
ms.topic: best-practice
ms.custom:
---
# Performance guidelines in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article contains best practices for data ingestion, table management, data preparation, statistics, and querying in warehouses and SQL analytics endpoints. Performance tuning and optimization can present unique challenges, but they also offer valuable opportunities to maximize the capabilities of your data solutions.

To monitor performance on your warehouse, see [Monitor Fabric Data warehouse](monitoring-overview.md).

## Query performance

### Statistics 

Statistics are persisted objects that represent data in your tables' columns. The Query Optimizer uses statistics to pick and estimate the cost of a query plan. Fabric Data Warehouse and Lakehouse SQL analytics endpoint use and automatically maintain histogram statistics, average column length statistics, and table cardinality statistics. For more information, see [Statistics in Fabric Data Warehouse](statistics.md).

- The [CREATE STATISTICS](/sql/t-sql/statements/create-statistics-transact-sql?view=fabric&preserve-view=true) and [UPDATE STATISTICS](/sql/t-sql/statements/update-statistics-transact-sql?view=fabric&preserve-view=true) T-SQL commands are supported for single-column histogram statistics. You can leverage these if there's a large enough window between your table transformations and your query workload, such as during a maintenance window or other downtime. This reduces the likelihood of your `SELECT` queries having to first update statistics.
- Try to define table schema that maintains data type parity in common column comparisons. For example, if you know columns will be often compared to each other in a `WHERE` clause, or used as the `JOIN ... ON` predicate, make sure the data types match. If not possible to use exact same data types, use similar data types compatible for implicit conversion. Avoid explicit data conversions. For more information, see [Data type conversion](/sql/t-sql/data-types/data-type-conversion-database-engine?view=fabric&preserve-view=true).

> [!TIP]
> For Lakehouse users, the ACE-Cardinality statistic can use information from your tables' Delta log files to be more accurate. Ensure your Spark generated Delta tables include table row-counts with: `spark.conf.set("spark.databricks.delta.stats.collect", "true")`. For more information, see [Configure and manage Automated Table Statistics in Fabric Spark](../data-engineering/automated-table-statistics.md).

When filtering lakehouse tables on timestamp column before Apache Spark runtime 3.5.0, rowgroup-level statistics for timestamp columns aren't generated. This lack of statistics makes it difficult for systems, like Fabric Warehouse, to apply rowgroup elimination (also known as data skipping or predicate pushdown), which is performance optimization that skips irrelevant rowgroups during query execution. Without these statistics, filtering queries that involve timestamp columns might need to scan more data, leading to significant performance degradation. You can upgrade [the Apache Spark runtime in Fabric](../data-engineering/runtime.md). Apache Spark 3.5.0 and higher versions can generate rowgroup-level statistics for timestamp columns. You then need to recreate the table and ingest the data to have rowgroup level statistics generated.

### Cold cache performance

The *first execution* of a query in Fabric Data Warehouse can be unexpectedly slower than subsequent runs. This is known as a *cold start*, caused by system initialization or scaling activities that prepare the environment for processing. 

Cold starts typically occur when: 

- Data is loaded from OneLake into memory because it's being accessed for the first time, and isn't yet cached.
- If data is accessed for the first time, query execution is delayed until the necessary [statistics](statistics.md) are automatically generated.
- Fabric Data Warehouse automatically pauses nodes after some period of inactivity to reduce cost, and adds nodes as part of autoscaling. Resuming or creating nodes typically takes less than one second.

These operations can increase query duration. Cold starts can be partial. Some compute nodes, data, or statistics might already be available or cached in memory, while the query waits for others to come available. 

In-memory and disk caching in Fabric Data Warehouse is fully transparent and automatically enabled. Caching intelligently minimizes the need for remote storage reads by leveraging local caches. Fabric Data Warehouse employs refined access patterns to enhance data reads from storage and elevate query execution speed. For more information, see [Caching in Fabric data warehousing](caching.md).

You can detect cold start effects caused by fetching data from remote storage into memory by querying the [queryinsights.exec_requests_history](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true) view. Check the `data_scanned_remote_storage_mb` column: 

- The non-zero value in `data_scanned_remote_storage_mb` indicates a cold start. Data was fetched from OneLake during the query execution. Subsequent views should be provably faster in `queryinsights.exec_requests_history`.
- A zero value in `data_scanned_remote_storage_mb` is the perfect state where all data is cached. No node changes or data from OneLake was needed to serve the query results.

> [!IMPORTANT]
> Don't judge query performance based on the **first** execution. Always check `data_scanned_remote_storage_mb` to determine if the query was impacted by cold start. Subsequent executions are often significantly faster and are representative of actual performance, which will lower the average execution time. 

#### Result set caching (preview)

Distinct from in-memory and disk caching, result set caching is a built-in optimization for warehouses and Lakehouse SQL analytics endpoints in Fabric that reduces query read latency. It stores the final result of eligible `SELECT` statements so subsequent cache hits can skip compilation and data processing, returning results faster.

During the current preview, result set caching is off by default for all items. For more information on enabling, see [Result set caching (preview)](result-set-caching.md).

### Queries on tables with string columns  

Use the smallest string column length that can accommodate values. Fabric Warehouse is constantly improving; however, you might experience suboptimal performance if using large string data types, particularly large objects (LOBs). For example, for a `customer_name` column's data type, consider your business requirements and expected data, and use an appropriate length `n` when declaring `varchar(n)`, such as **varchar(100)**, instead of **varchar(8000)** or **varchar(max)**. Statistics and query cost estimation are more accurate when the data type length is more precise to the actual data.

- In Fabric Data Warehouse T-SQL, see [guidance for choosing the appropriate length for string data types](#consider-when-to-use-varchar-over-char).
- Lakehouse table string columns without defined length in Spark are recognized by Fabric Warehouse as **varchar(8000)**. For optimal performance, use the `CREATE TABLE` statement in SparkSQL to define string column as `varchar(n)`, where `n` is maximum column length that can accommodate values.

### Transactions and concurrency

Fabric Data Warehouse is built on a modern, cloud-native architecture that combines transactional integrity, snapshot isolation, and distributed compute to deliver high concurrency and consistency at scale. For more information, see [Transactions in Warehouse Tables](transactions.md).

Fabric Data Warehouse supports ACID-compliant transactions using snapshot isolation. This means:

- Read and write operations can be grouped into a single transaction using standard T-SQL (`BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`)
- All-or-nothing semantics: If a transaction spans multiple tables and one operation fails, the entire transaction is rolled back.
- Read consistency: `SELECT` queries within a transaction see a consistent snapshot of the data, unaffected by concurrent writes.

Fabric Warehouse transactions support: 

- **Data Definition Language (DDL) inside transactions:** You can include `CREATE TABLE` within a transaction block.
- **Cross-database transactions:** Supported within the same workspace, including reads from SQL analytics endpoints.
- **Parquet-based rollback:** Since Fabric Data Warehouse stores data in immutable Parquet files, rollbacks are fast. Rollbacks simply revert to previous file versions.
- **Automatic data compaction and checkpointing:** [Data compaction](#data-compaction) optimizes storage and read performance by merging small Parquet files and removing logically deleted rows.
- **Automatic checkpointing:** Every write operation (`INSERT`, `UPDATE`, `DELETE`) appends a new JSON log file to [the Delta Lake transaction log](query-delta-lake-logs.md). Over time, this can result in hundreds or thousands of log files, especially in streaming or high-frequency ingestion scenarios. Automatic checkpointing improves metadata read efficiency by summarizing transaction logs into a single checkpoint file. Without checkpointing, every read must scan the entire transaction log history. With checkpointing, the only logs read are the latest checkpoint file and the logs after it. This drastically reduces I/O and metadata parsing, especially for large or frequently updated tables.

Both compaction and checkpointing are critical for table health, especially in long-running or high-concurrency environments.

#### Concurrency control and isolation

Fabric Data Warehouse uses snapshot isolation exclusively. Attempts to change the isolation level via T-SQL are ignored.

#### Best practices with transactions

- Use explicit transactions wisely. Always `COMMIT` or `ROLLBACK`. Don't leave transactions open.
   - Keep transactions short-lived. Avoid long-running transactions that hold locks unnecessarily, especially for explicit transactions containing DDLs. This can cause contention with `SELECT` statements on system catalog views (like `sys.tables`) and can cause issues with the Fabric portal that rely on system catalog views.
- Add retry logic  with delay in pipelines or apps to handle transient conflicts. 
   - Use exponential backoff to avoid retry storms that worsen transient network interruptions.
   - For more information, see [Retry pattern](/azure/architecture/patterns/retry).
-  Monitor locks and conflicts in the warehouse.
   - Use [sys.dm_tran_locks](/sql/relational-databases/system-dynamic-management-views/sys-dm-tran-locks-transact-sql?view=fabric&preserve-view=true) to inspect current locks.

### Reduce returned data set sizes  

Queries with large data size in intermediate query execution or in final query result could experience more query performance issue. To reduce the returned data set size, consider following strategies:

- Partition large tables in Lakehouse.
- Limit the number of columns returned. `SELECT *` can be costly.
- Limit the number of rows returned. Perform as much data filtering in the warehouse as possible, not in client applications.
   - Try to filter before joining to reduce the dataset early in query execution. 
   - Filter on low-cardinality columns to reduce large dataset early before JOINs.
   - Columns with high cardinality are ideal for filtering and JOINs. These are often used in `WHERE` clauses and benefit from predicate being applied at earlier stage in query execution to filter out data.
- In Fabric Data Warehouse, since primary key and unique key constraints aren't enforced, columns with these constraints aren't necessarily good candidates for JOINs.

### Query plans and query hints

In Fabric Data Warehouse, the query optimizer generates a query execution plan to determine the most efficient way to execute a SQL query. Advanced users could consider investigating query performance issues with the query plan or by adding query hints.

- Users can use [SHOWPLAN_XML](/sql/t-sql/statements/set-showplan-xml-transact-sql?view=fabric&preserve-view=true) in [SQL Server Management Studio](https://aka.ms/ssms) to view the plan without executing the query.
- Optional [query hints](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true#query-hint-support-in-fabric-data-warehouse) can be added to a SQL statement to provide more instructions to the query optimizer before plan generation. Adding query hints requires advanced knowledge of query workloads, therefore are typically used after other best practices have been implemented but the problem persists.

### Non-scalable operations

Fabric Data Warehouse is built on a massively parallel processing (MPP) architecture, where queries are executed across multiple compute nodes. In some scenarios, single-node execution is justified:

- The entire query plan execution requires only one compute node.
- A plan subtree can fit within one compute node. 
- The entire query or part of the query *must* be executed on a single node to satisfy the query semantics. For example, `TOP` operations, global sorting, queries that require sorting results from parallel executions to produce a single result, or joining results for the final step.

In these cases, users can receive a warning message "One or more non-scalable operation is detected", and the query might run slowly or fail after a long execution. 

- Consider reducing the size of query's filtered dataset. 
- If the query semantics doesn't require single-node execution, try forcing a distributed query plan with [FORCE DISTRIBUTED PLAN](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true#force--single-node--distributed--plan), for example `OPTION (FORCE DISTRIBUTED PLAN);`.

### Query the SQL analytics endpoint

You can use the SQL analytics endpoint to query Lakehouse tables that were populated with Spark SQL, without copying or ingesting data into the Warehouse.

Following best practices apply to querying warehouse data in the Lakehouse via the SQL analytics endpoint. For more information on SQL analytics endpoint performance, see [SQL analytics endpoint performance considerations](sql-analytics-endpoint-performance.md).

> [!TIP]
> The following best practices apply to using Spark to process data into a lakehouse that can be queried by the SQL analytics endpoint.

#### Perform regular table maintenance for Lakehouse tables

In Microsoft Fabric, the Warehouse automatically optimizes data layouts, and performs garbage collection and compaction. For a Lakehouse you have more control over [table maintenance](../data-engineering/lakehouse-table-maintenance.md). Table optimization and vacuuming are necessary and can significantly reduce the scan time required for large datasets. Table maintenance in the Lakehouse also extends to shortcuts and can help you improve performance there significantly.

#### Optimize lakehouse tables or shortcuts with many small files

Having many small files creates overhead for reading file metadata. Use the [OPTIMIZE command](../data-engineering/lakehouse-table-maintenance.md#table-maintenance-operations) in the Fabric portal or a Notebook to combine small files into larger ones. Repeat this process when the number of files changes significantly.

To optimize a table in a Fabric Lakehouse, open the Lakehouse in the Fabric portal. In the **Explorer**, right-click on the table, select **Maintenance**. Choose options from the **Run maintenance commands** page, then select **Run now**.

#### Query lakehouse tables or shortcuts located in the same region

Fabric uses compute where the Fabric capacity is located. Querying data, such as in your own Azure Data Lake Storage or in OneLake, in another region results in performance overhead due to network latency. Make sure data is in the same region. Depending on your performance requirements, consider keeping only small tables like dimension tables in a remote region.

#### Filter lakehouse tables and shortcuts on the same columns

If you often filter table rows on specific columns, consider partitioning the table.

Partitioning works well for low cardinality columns or columns with predictable cardinality like years or dates. For more information, see [Lakehouse tutorial - Prepare and transform lakehouse data](../data-engineering/tutorial-lakehouse-data-preparation.md) and [Load data to Lakehouse using partition](../data-factory/tutorial-lakehouse-partition.md).

Clustering works well for high selectivity columns. If you have other columns that you often use for filtering, other than partitioning columns, consider clustering the table using optimize with the Spark SQL syntax `ZORDER BY`. For more information, see [Delta Lake table optimization](../data-engineering/delta-optimization-and-v-order.md).

## Data clustering

You can also accomplish data clustering on specific columns in the `CREATE TABLE` and `CREATE TABLE AS SELECT` (CTAS) T-SQL statements. Data clustering works by storing rows with similar values in adjacent locations on storage during ingestion. 

- Data clustering uses a space-filling curve to organize data in a way that preserves locality across multiple dimensions, meaning rows with similar values across clustering columns are stored physically close together. This approach dramatically improves query performance by performing file skipping and reducing the number of files that are scanned.
- Data clustering metadata is embedded in the manifest during ingestion, allowing the warehouse engine to make intelligent decisions about which files to access during user queries. This metadata, combined with how rows with similar values are stored together, ensures that queries with filter predicates can skip entire files and row groups that fall outside the predicate scope. 

For example: if a query targets only 10% of a table's data, clustering ensures that only files that contain the data within the filter's range are scanned, reducing I/O and compute consumption. Larger tables benefit more from data clustering, as the benefits of file skipping scale with data volume.

- For complete information on data clustering, see [Data clustering in Fabric Data Warehouse](data-clustering.md).
- For a tutorial of data clustering and how to measure its positive effect on performance, see [Use data clustering in Fabric Data Warehouse](tutorial-data-clustering.md).


## Data type optimization

Choosing the right data types is essential for performance and storage efficiency in your warehouse. The following guidelines help ensure your schema design supports fast queries, efficient storage, and maintainability. 

For more information on data types supported by Fabric Data Warehouse, see [Data types in Fabric Data Warehouse](data-types.md).

> [!TIP]
> If you're using external tools to generate tables or queries, such as with a code-first deployment methodology, carefully review the column data types. Character data type lengths and queries should follow these best practices.

### Match data types to data semantics

To ensure both clarity and performance, it's important to align each column's data type with the actual nature and behavior of the data it stores.

- Use **date**, **time**, or **datetime2(n)** for temporal values instead of storing them as strings.
- Use integer types for numeric values, unless formatting (for example, leading zeroes) is required.
- Use character types (**char**, **varchar**) when preserving formatting is essential (for example, numbers that can begin with zero, product codes, numbers with dashes).

### Use integer types for whole numbers

When storing values such as identifiers, counters, or other whole numbers, prefer integer types (**smallint**, **int**, **bigint**) over **decimal**/**numeric**. Integer types require less storage than data types that allow for digits to the right of the decimal point. As a result, they allow faster arithmetic and comparison operations and improve indexing and query performance.

Be aware of the value ranges for each integer data type supported by Fabric Data Warehouse. For more information, [int, bigint, smallint (Transact-SQL)](/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql?view=fabric&preserve-view=true).

### Consider the use of decimal and numeric precision and scale

If you must use **decimal**/**numeric**, when creating the column choose the smallest [precision and scale](/sql/t-sql/data-types/precision-scale-and-length-transact-sql?view=fabric&preserve-view=true) that can accommodate your data. Over-provisioning precision increases storage requirements and can degrade performance as data grows. 

- Anticipate your warehouse's expected growth and needs. For example, if you plan to store no more than four digits to the right of the decimal point, use **decimal(9,4)** or **decimal(19,4)** for most efficient storage. 
- Always specify precision and scale when creating a **decimal**/**numeric** column. When created in a table defined as just `decimal`, without specifying `(p,s)` for [precision and scale](/sql/t-sql/data-types/precision-scale-and-length-transact-sql?view=fabric&preserve-view=true), a **decimal**/**numeric** column is created as `decimal(18,0)`. A [decimal](/sql/t-sql/data-types/decimal-and-numeric-transact-sql?view=fabric&preserve-view=true#p-precision) with a precision of 18 consumes 9 bytes of storage per row. A scale of `0` doesn't store data to the right of the decimal point. For many business whole numbers, **smallint**, **int**, **bigint** are much more efficient than `decimal(18,0)`. For example, any nine-digit whole number can be stored as an **integer** data type for 4 bytes of storage per row.

For complete information, see [decimal and numeric (Transact-SQL)](/sql/t-sql/data-types/decimal-and-numeric-transact-sql?view=fabric&preserve-view=true).

### Consider when to use varchar over char

Use **varchar(n)** instead of **char(n)** for string columns, unless fixed-length padding is explicitly required. A **varchar** column stores only the actual string length per row, plus a small overhead, and reduces wasted space, which improves I/O efficiency.

- Use **varchar(n)** for values like names, addresses, and descriptions, as they have widely variable values. Statistics and query cost estimation are more accurate when the data type length is more precise to the actual data.
- Use **char(n)** when you know the string will be a fixed length each time. For example, storing the string `000000000` as a **char(9)** makes sense if the string is always exactly 9 numeric characters that can start with a zero.
- The length `n` in the column data type declaration is the storage bytes. For multibyte encoding character sets such as UTF-8, the encoding for Fabric Data Warehouse, Latin characters and numbers take 1 byte of storage. However, there are Unicode characters that require more than 1 byte, such as Japanese characters that require 3 bytes to store, so the number of Unicode characters actually stored can be less than the data type length `n`. For more information, see [char and varchar Arguments](/sql/t-sql/data-types/char-and-varchar-transact-sql?view=fabric&preserve-view=true#char---n--).

### Avoid nullable columns when possible

Define columns as `NOT NULL` when the data model allows. By default, a column in a table allows `NULL` values. Nullable columns have the following characteristics:

- They add metadata overhead.
- Can reduce the effectiveness of query optimizations and statistics.
- Can impact performance in large-scale analytical queries. 

## Data ingestion and preparation into a warehouse 

### COPY INTO

The [T-SQL COPY INTO command](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true) is the recommended way for ingesting data from Azure Data Lake Storage into Fabric Data Warehouse. For more information and examples, see [Ingest data into your Warehouse using the COPY statement](ingest-data-copy.md).

Consider the following recommendations for best performance:

- **File size:** Ensure that each file you're ingesting is ideally between 100 MB and 1 GB for maximized throughput. This helps to optimize the ingestion process and improve performance. 
- **Number of files:** To maximize parallelism and query performance, aim to generate a high number of files. Prioritize creating as many files as possible while maintaining a minimum file size of 100 MB.
- **Parallel loading:** Utilize multiple `COPY INTO` statements running in parallel to load data into different tables. This approach can significantly reduce ETL/ELT window due to parallelism.
- **Capacity size**: For larger data volumes, consider scaling out to larger Fabric Capacity to get the additional compute resources needed to accommodate additional number of parallel processing and larger data volumes.

Fabric Data Warehouse also supports `BULK INSERT` statement that is a synonym for `COPY INTO`. The same recommendation applies to `BULK INSERT` statement.

### CTAS or INSERT

Use [CREATE TABLE AS SELECT (CTAS)](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) or `INSERT` combined with `SELECT FROM` Lakehouse table/shortcut commands. These methods could be more performant and efficient than using pipelines, allowing for faster and more reliable data transfers. For more information and examples, see [Ingest data into your Warehouse using Transact-SQL](ingest-data-tsql.md).

The concept of increasing the number of parallelism and scaling to larger Fabric Capacity also applies to CTAS/INSERT operations to increase throughput.

### Read data from Azure Data Lake Storage or Blob Storage with OPENROWSET

The [OPENROWSET](/sql/t-sql/functions/openrowset-transact-sql?view=fabric&preserve-view=true) function enables you to read CSV or Parquet files from Azure Data Lake or Azure Blob storage, without ingesting it to Warehouse. For more information and examples, see [Browse file content using OPENROWSET function](browse-file-content-with-openrowset.md).

When reading data using the OPENROWSET function, consider the following recommendations for best performance:

- **Parquet:** Try to use Parquet instead of CSV, or convert CSV to Parquet, if you're frequently querying the files. Parquet is a columnar format. Because data is compressed, its file sizes are smaller than CSV files that contain the same data. Fabric Data Warehouse skips the columns and rows that aren't needed in a query if you're reading Parquet files.
- **File size:** Ensure that each file you're ingesting is ideally between 100 MB and 1 GB for maximized throughput. This helps to optimize the ingestion process and improve performance. It's better to have equally sized files.
- **Number of files:** To maximize parallelism and query performance, aim to generate a high number of files. Prioritize creating as many files as possible while maintaining a minimum file size of 100 MB.
- **Partition:** Partition your data by storing partitions into different folders or file names if your workload filters them by partition columns.
- **Estimation:** Try to set `ROWS_PER_BATCH` to match the number of rows in the underlying files if you feel that you aren't getting the expected performance.
- **Capacity size:** For larger data volumes, consider scaling out to larger SKU to get more compute resources needed to accommodate extra number of parallel processing and larger data volumes.

### Avoid trickle inserts, updates, and deletes  

To ensure efficient file layout and optimal query performance in Fabric Data Warehouse, avoid using many small `INSERT`, `UPDATE`, and `DELETE` transactions. These row-level changes generate a new Parquet file for each operation, resulting in a large number of small files and fragmented row groups. This fragmentation leads to:

- Increased query latency due to inefficient file scanning.
- Higher storage and compute costs.
- Greater reliance on background compaction processes.

Recommended approaches:

- Batch transactions that write into Fabric Data Warehouse. 
   - For example, instead of many small `INSERT` statements, pre-stage data together, and insert data in one `INSERT` statement.
- Use [COPY INTO](#copy-into) for bulk inserts and perform updates and deletes in batches whenever possible.
- Maintain a minimum imported file size of 100 MB to ensure efficient row group formation.
- For more guidance and best practices on data ingestion, see [Best practices to ingest data into a warehouse](ingest-data.md#best-practices).

### Data compaction

In Fabric Data Warehouse, data compaction is a background optimization process that merges small, inefficient Parquet files into fewer, larger files. Often these files are created by frequent trickle `INSERT`, `UPDATE`, or `DELETE` operations. Data compaction reduces file fragmentation, improves row group efficiency, and enhances overall query performance.

Although the Fabric Data Warehouse engine automatically resolves fragmentation over time through data compaction, performance might degrade until the process completes. Data compaction runs automatically without user intervention for Fabric Data Warehouse. 

Data compaction doesn't apply to the Lakehouse. For Lakehouse tables accessed through SQL analytics endpoints, it's important to follow Lakehouse best practices and manually run the [OPTIMIZE command](../data-engineering/lakehouse-table-maintenance.md#table-maintenance-operations) after significant data changes to maintain optimal storage layout.

#### Data compaction preemption

Fabric Data Warehouse intelligently and actively avoids write-write conflicts between background compaction tasks and user operations. Starting in October 2025, data compaction preemption is enabled. 

Compaction checks for shared locks held by user queries. If data compaction detects a lock before it begins, it waits and will try again later. If data compaction starts and detects a lock before it commits, compaction aborts to avoid a write conflict with the user query.

Write-write conflicts with the Fabric Data Warehouse background data compaction service are still possible. It is possible to create a write-write conflict with data compaction, for example, if an application uses an explicit transaction and performs non-conflicting work (like `INSERT`) before a conflicting operation (`UPDATE`, `DELETE`, `MERGE`). Data compaction can commit successfully, causing the explicit transaction later to fail due to a conflict. For more information on write-write or update conflicts, see [Transactions in Warehouse tables in Microsoft Fabric](transactions.md#schema-locks).

## V-Order in Fabric Data Warehouse

[V-Order](../data-engineering/delta-optimization-and-v-order.md) is a write time optimization to the parquet file format that enables fast reads in Microsoft Fabric. V-Order in Fabric Data Warehouse improves query performance by applying sorting and compression to table files. 

By default, V-Order is enabled on all warehouses to ensure that read operations, especially analytical queries, are as fast and efficient as possible.

However, V-Order introduces a small ingestion overhead, noticeable in write-heavy workloads. For this reason, disabling V-Order should be considered only for warehouses that are strictly write-intensive and not used for frequent querying. It's important to note that once V-Order is disabled on a warehouse, it can't be re-enabled.

Before deciding to disable V-Order, users should thoroughly test their workload performance to ensure the trade-off is justified. A common pattern is to use a staging warehouse with V-Order disabled for high-throughput ingestion, data transformation, and ingest the underlying data into a V-Order enabled Data Warehouse for better read performance. For more information, see [Disable V-Order on Warehouse in Microsoft Fabric](disable-v-order.md). 

## Clone tables instead of copying tables

[Table clones in Fabric Data Warehouse](clone-table.md) provide a fast and efficient way to create tables without copying data. With a zero-copy cloning approach, only the table's metadata is duplicated, while the underlying data files are referenced directly from the OneLake. This allows users to create consistent, reliable table copies almost instantly, without the overhead of full data duplication. 

Zero-copy clones are ideal for scenarios such as development, testing, and backup, offering a high-performance, storage-efficient solution that helps reduce infrastructure costs.

- Cloned tables also copy all key [security features](security.md) from the source, including Row-Level Security (RLS), Column-Level Security (CLS), and Dynamic Data Masking (DDM), without the need for reapplying policies after cloning. 
- Clones can be created as of a specific point in time within the data retention period, supporting [time-travel capabilities](time-travel.md). 
- Cloned tables exist independently of their source, changes made to the source don't affect the clone, and changes to the clone don't impact the source. Either the source or the clone can be dropped independently.


## Query metadata views

- Query Execution History (30 days)
  - [queryinsights.exec_requests_history](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true)
  - [queryinsights.exec_sessions_history](/sql/relational-databases/system-views/queryinsights-exec-sessions-history-transact-sql?view=fabric&preserve-view=true)

- Aggregated Insights
  - [queryinsights.long_running_queries](/sql/relational-databases/system-views/queryinsights-long-running-queries-transact-sql?view=fabric&preserve-view=true)
  - [queryinsights.frequently_run_queries](/sql/relational-databases/system-views/queryinsights-frequently-run-queries-transact-sql?view=fabric&preserve-view=true)

For more information on the `queryinsights` views, see [Query insights in Fabric data warehousing](query-insights.md).

- Query lifecycle DMVs 
  - [sys.dm_exec_connections](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-connections-transact-sql?view=fabric&preserve-view=true)
  - [sys.dm_exec_sessions](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-sessions-transact-sql?view=fabric&preserve-view=true)
  - [sys.dm_exec_requests](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-requests-transact-sql?view=fabric&preserve-view=true)

For more information on query lifecycle DMVs, see [Monitor connections, sessions, and requests using DMVs](monitor-using-dmv.md).

## Related content
    
- [Monitor Fabric Data warehouse](monitoring-overview.md)
- [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
- [Query insights](query-insights.md)
- [Statistics in Fabric Data Warehouse](statistics.md)
- [Ingest data into your Warehouse using the COPY statement](ingest-data-copy.md)