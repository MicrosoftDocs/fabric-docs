---
title: Delta Lake table optimization and V-Order
description: Learn how to keep your Delta Lake tables optimized across multiple scenarios, and how V-Order helps with optimization.
ms.reviewer: dacoelho
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 07/22/2025
ms.search.form: delta lake v-order optimization
ai-usage: ai-assisted
---

# Delta Lake table optimization and V-Order

The [Lakehouse](lakehouse-overview.md) and the [Delta Lake](lakehouse-and-delta-tables.md) table format are central to Microsoft Fabric, assuring that tables are optimized for analytics is a key requirement. This guide covers Delta Lake table optimization concepts, configurations and how to apply it to most common Big Data usage patterns.

> [!TIP]
> For comprehensive cross-workload guidance on when to apply V-Order based on consumption scenarios, see [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md).

> [!IMPORTANT]
> The `OPTIMIZE` commands in this article are **Spark SQL commands** and must be executed in Spark environments such as:
> - [Fabric notebooks](../data-engineering/how-to-use-notebook.md) with Spark runtime
> - [Spark job definitions](../data-engineering/spark-job-definition.md)
> - Lakehouse via the **Maintenance** option in the Explorer
> 
> These commands are **NOT supported** in the [SQL Analytics Endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md) or [Warehouse SQL query editor](../data-warehouse/sql-query-editor.md), which only support T-SQL commands. For table maintenance through the SQL Analytics Endpoint, use the Lakehouse **Maintenance** UI options or run the commands in a Fabric notebook.

## What is V-Order?

__V-Order is a write time optimization to the parquet file format__ that enables lightning-fast reads under the Microsoft Fabric compute engines, such as Power BI, SQL, Spark, and others.

Power BI and SQL engines make use of Microsoft Verti-Scan technology and V-Ordered parquet files to achieve in-memory like data access times. Spark and other non-Verti-Scan compute engines also benefit from the V-Ordered files with an average of 10% faster read times, with some scenarios up to 50%.

V-Order optimizes Parquet files through sorting, row group distribution, encoding, and compression—reducing resource usage and improving performance and cost efficiency. While it adds ~15% to write times, it can boost compression by up to 50%. V-Order sorting has a 15% impact on average write times but provides up to 50% more compression.

It's __100% open-source parquet format compliant__; all parquet engines can read it as a regular parquet files. Delta tables are more efficient than ever; features such as Z-Order are compatible with V-Order. Table properties and optimization commands can be used to control the V-Order of its partitions.

V-Order is applied at the parquet file level. Delta tables and its features, such as Z-Order, compaction, vacuum, time travel, etc. are orthogonal to V-Order, as such, are compatible and can be used together for extra benefits.

## Controlling V-Order writes

V-Order is used to optimize parquet file layout for faster query performance, especially in read-heavy scenarios. In Microsoft Fabric, **V-Order is _disabled by default_ for all newly created workspaces** to optimize performance for write-heavy data engineering workloads.

V-Order behavior in Apache Spark is controlled through the following configurations:

| Configuration | Default Value | Description |
|---------------|----------------|-------------|
| `spark.sql.parquet.vorder.default` | `false` | Controls session-level V-Order writing. Set to `false` by default in new Fabric workspaces. |
| `TBLPROPERTIES("delta.parquet.vorder.enabled")` | Unset | Controls default V-Order behavior at the table level. |
| DataFrame writer option: `parquet.vorder.enabled` | Unset | Used to control V-Order at the write operation level. |

Use the following commands to enable or override V-Order writes as needed for your scenario.

> [!IMPORTANT]  
> * V-Order is **disabled by default** in new Fabric workspaces (`spark.sql.parquet.vorder.default=false`) to improve performance for data ingestion and transformation pipelines.  
>  
> * If your workload is read-heavy such as interactive queries or dashboarding, enable V-Order with the following configurations:  
>   - Set the Spark property `spark.sql.parquet.vorder.default` to true`.  
>   - Switch resource profiles to **`readHeavyforSpark`** or **`ReadHeavy`** profiles. This profile automatically enables V-Order for better read performance.

In Fabric runtime 1.3 and higher versions, the `spark.sql.parquet.vorder.enable` setting is removed. As V-Order is applied automatically during Delta optimization using OPTIMIZE statements, there's no need to manually enable this setting in newer runtime versions. If you're migrating code from an earlier runtime version, you can remove this setting, as the engine now handles it automatically.

- [Learn more about resource profiles](configure-resource-profile-configurations.md)

### Check V-Order configuration in Apache Spark session

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.sql.parquet.vorder.default 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.get('spark.sql.parquet.vorder.default')
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.get('spark.sql.parquet.vorder.default')
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.sql.parquet.vorder.default")
```

---

### Disable V-Order writing in Apache Spark session

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.sql.parquet.vorder.default=FALSE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.sql.parquet.vorder.default', 'false')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.sql.parquet.vorder.default", "false") 
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.sql.parquet.vorder.default", "false")
```

---

### Enable V-Order writing in Apache Spark session

> [!IMPORTANT]
> When enabled at the session level. All parquet writes are made with V-Order enabled which, includes non-Delta parquet tables and Delta tables with the ```parquet.vorder.enabled``` table property set to either ```true``` or ```false```.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.sql.parquet.vorder.default=TRUE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.sql.parquet.vorder.default', 'true')
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.sql.parquet.vorder.default", "true")
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.sql.parquet.vorder.default", "true")
```

---

### Control V-Order using Delta table properties

Enable V-Order table property during table creation:
```sql
%%sql 
CREATE TABLE person (id INT, name STRING, age INT) USING parquet TBLPROPERTIES("delta.parquet.vorder.enabled" = "true");
```

> [!IMPORTANT]
> When the table property is set to true, INSERT, UPDATE, and MERGE commands behave as expected and perform the write-time optimization. If the V-Order session configuration is set to true or the spark.write enables it, then the writes are V-Order even if the TBLPROPERTIES is set to false.

Enable or disable V-Order by altering the table property:

```sql
%%sql 
ALTER TABLE person SET TBLPROPERTIES("delta.parquet.vorder.enabled" = "true");

ALTER TABLE person SET TBLPROPERTIES("delta.parquet.vorder.enabled" = "false");

ALTER TABLE person UNSET TBLPROPERTIES("delta.parquet.vorder.enabled");
```

After you enable or disable V-Order using table properties, only future writes to the table are affected. Parquet files keep the ordering used when it was created. To change the current physical structure to apply or remove V-Order, see how to [Control V-Order when optimizing a table](#control-v-order-when-optimizing-a-table).

### Controlling V-Order directly on write operations

All Apache Spark write commands inherit the session setting if not explicit. All following commands write using V-Order by implicitly inheriting the session configuration.

```python
df_source.write\
  .format("delta")\
  .mode("append")\
  .saveAsTable("myschema.mytable")

DeltaTable.createOrReplace(spark)\
  .addColumn("id","INT")\
  .addColumn("firstName","STRING")\
  .addColumn("middleName","STRING")\
  .addColumn("lastName","STRING",comment="surname")\
  .addColumn("birthDate","TIMESTAMP")\
  .location("Files/people")\
  .execute()

df_source.write\
  .format("delta")\
  .mode("overwrite")\
  .option("replaceWhere","start_date >= '2017-01-01' AND end_date <= '2017-01-31'")\
  .saveAsTable("myschema.mytable") 
```

> [!IMPORTANT]
> V-Order only applies to files affected by the predicate.

In a session where ```spark.sql.parquet.vorder.default``` is unset or set to false, the following commands would write using V-Order:

```python
df_source.write\
  .format("delta")\
  .mode("overwrite")\
  .option("replaceWhere","start_date >= '2017-01-01' AND end_date <= '2017-01-31'")\
  .option("parquet.vorder.enabled ","true")\
  .saveAsTable("myschema.mytable")

DeltaTable.createOrReplace(spark)\
  .addColumn("id","INT")\
  .addColumn("firstName","STRING")\
  .addColumn("middleName","STRING")\
  .addColumn("lastName","STRING",comment="surname")\
  .addColumn("birthDate","TIMESTAMP")\
  .option("parquet.vorder.enabled","true")\
  .location("Files/people")\
  .execute()
```

## What is Optimize Write?

Analytical workloads on Big Data processing engines such as Apache Spark perform most efficiently when using standardized larger file sizes. The relation between the file size, the number of files, the number of Spark workers and its configurations, play a critical role on performance. Ingesting data into data lake tables might have the inherited characteristic of constantly writing lots of small files; this scenario is commonly known as the "small file problem."

Optimize Write is a Delta Lake feature in Fabric and Synapse that reduces file count and increases individual file size during writes in Apache Spark. The target file size can be changed per workload requirements using configurations.

The feature is __enabled by default__ in Microsoft Fabric [Runtime for Apache Spark](./runtime.md). To learn more about Optimize Write usage scenarios, read the article [The need for optimize write on Apache Spark](/azure/synapse-analytics/spark/optimize-write-for-apache-spark).

## Merge optimization

Delta Lake MERGE command allows users to update a delta table with advanced conditions. It can update data from a source table, view, or DataFrame into a target table by using MERGE command. However, the current algorithm in the open source distribution of Delta Lake isn't fully optimized for handling unmodified rows. The Microsoft Spark Delta team implemented a custom Low Shuffle Merge optimization, unmodified rows are excluded from an expensive shuffling operation that is needed for updating matched rows.

The implementation is controlled by the ```spark.microsoft.delta.merge.lowShuffle.enabled``` configuration, __enabled by default__ in the runtime. It requires no code changes and is fully compatible with the open-source distribution of Delta Lake. To learn more about Low Shuffle Merge usage scenarios, read the article [Low Shuffle Merge optimization on Delta tables](/azure/synapse-analytics/spark/low-shuffle-merge-for-apache-spark).

## Delta table maintenance

As Delta tables change, performance and storage cost efficiency tend to degrade for the following reasons:

- New data added to the table might skew data.
- Batch and streaming data ingestion rates might bring in many small files.
- Update and delete operations add read overhead. Parquet files are immutable by design, as Delta tables adds new parquet files with the changeset, it further amplifies the issues imposed by the first two items.
- No longer needed data files and log files available in the storage.

In order to keep the tables at the best state for best performance, perform bin-compaction, and vacuuming operations in the Delta tables. Bin-compaction is achieved by the [OPTIMIZE](https://docs.delta.io/latest/optimizations-oss.html) command; it merges all changes into bigger, consolidated parquet files. Dereferenced storage clean-up is achieved by the [VACUUM](https://docs.delta.io/latest/delta-utility.html#-delta-vacuum) command.

The table maintenance commands *OPTIMIZE* and *VACUUM* can be used within notebooks and Spark Job Definitions, and then orchestrated using platform capabilities. Lakehouse in Fabric offers a functionality to use the user interface to perform ad-hoc table maintenance as explained in the [Delta Lake table maintenance](lakehouse-table-maintenance.md) article.

> [!IMPORTANT]
> Designing the table's physical structure based on ingestion frequency and read patterns is often more important than the optimization commands in this section.

### Control V-Order when optimizing a table

The following command structures bin-compact and rewrite all affected files using V-Order, independent of the TBLPROPERTIES setting or session configuration setting:

```sql
%%sql 
OPTIMIZE <table|fileOrFolderPath> VORDER;

OPTIMIZE <table|fileOrFolderPath> WHERE <predicate> VORDER;

OPTIMIZE <table|fileOrFolderPath> WHERE <predicate> [ZORDER  BY (col_name1, col_name2, ...)] VORDER;
```

When ZORDER and VORDER are used together, Apache Spark performs bin-compaction, ZORDER, VORDER sequentially.

The following commands bin-compact and rewrite all affected files using the TBLPROPERTIES setting. If TBLPROPERTIES is set true to V-Order, all affected files are written as V-Order. If TBLPROPERTIES is unset or set to false, it inherits the session setting. To remove V-Order from the table, set the session configuration to false.

> [!NOTE]
> When using these commands in Fabric notebooks, ensure there's a space between `%%sql` and the `OPTIMIZE` command. The correct syntax is:
> ```sql
> %%sql 
> OPTIMIZE table_name;
> ```
> 
> **Not:** `%%sqlOPTIMIZE table_name;` (this will cause a syntax error)

```sql
%%sql 
OPTIMIZE <table|fileOrFolderPath>;

OPTIMIZE <table|fileOrFolderPath> WHERE predicate;

OPTIMIZE <table|fileOrFolderPath> WHERE predicate [ZORDER BY (col_name1, col_name2, ...)];
```

## Related content

- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Table compaction](table-compaction.md)
- [Tune file size](tune-file-size.md)
- [Lakehouse table maintenance](lakehouse-table-maintenance.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Lakehouse and Delta Lake](lakehouse-and-delta-tables.md)
- [The need for optimize write on Apache Spark](/azure/synapse-analytics/spark/optimize-write-for-apache-spark)
- [Low Shuffle Merge optimization on Delta tables](/azure/synapse-analytics/spark/low-shuffle-merge-for-apache-spark)
