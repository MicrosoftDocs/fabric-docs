---
title: Delta Lake table optimization and V-Order
description: Learn how to keep your Delta Lake tables optimized across multiple scenarios, and how V-Order helps with optimization.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: how-to
ms.custom:
ms.date: 02/03/2025
ms.search.form: delta lake v-order optimization
---

# Delta Lake table optimization and V-Order

The [Lakehouse](lakehouse-overview.md) and the [Delta Lake](lakehouse-and-delta-tables.md) table format are central to [!INCLUDE [product-name](../includes/product-name.md)], assuring that tables are optimized for analytics is a key requirement. This guide covers Delta Lake table optimization concepts, configurations and how to apply it to most common Big Data usage patterns.

## What is V-Order?

__V-Order is a write time optimization to the parquet file format__ that enables lightning-fast reads under the Microsoft Fabric compute engines, such as Power BI, SQL, Spark, and others.

Power BI and SQL engines make use of Microsoft Verti-Scan technology and V-Ordered parquet files to achieve in-memory like data access times. Spark and other non-Verti-Scan compute engines also benefit from the V-Ordered files with an average of 10% faster read times, with some scenarios up to 50%.

V-Order works by applying special sorting, row group distribution, dictionary encoding and compression on parquet files, thus requiring less network, disk, and CPU resources in compute engines to read it, providing cost efficiency and performance. V-Order sorting has a 15% impact on average write times but provides up to 50% more compression.

It's __100% open-source parquet format compliant__; all parquet engines can read it as a regular parquet files. Delta tables are more efficient than ever; features such as Z-Order are compatible with V-Order. Table properties and optimization commands can be used to control the V-Order of its partitions.

V-Order is applied at the parquet file level. Delta tables and its features, such as Z-Order, compaction, vacuum, time travel, etc. are orthogonal to V-Order, as such, are compatible and can be used together for extra benefits.

## Controlling V-Order writes

V-Order is used to optimize parquet file layout for faster query performance, especially in read-heavy scenarios. In [!INCLUDE [product-name](../includes/product-name.md)], **V-Order is _disabled by default_ for all newly created workspaces** to optimize performance for write-heavy data engineering workloads.

V-Order behavior in Apache Spark is controlled through the following configurations:

| Configuration | Default Value | Description |
|---------------|----------------|-------------|
| `spark.sql.parquet.vorder.default` | `false` | Controls session-level V-Order writing. Set to `false` by default in new Fabric workspaces. |
| `TBLPROPERTIES("delta.parquet.vorder.default")` | `false` | Controls default V-Order behavior at the table level. |
| DataFrame writer option: `parquet.vorder.default` | Unset | Used to control V-Order at the write operation level. |

Use the following commands to enable or override V-Order writes as needed for your scenario.

> ⚠️ **Important:**  
> V-Order is **disabled by default** in new Fabric workspaces (`spark.sql.parquet.vorder.default=false`) to improve performance for data ingestion and transformation pipelines.  
>  
> If your workload is read-heavy—such as interactive queries or dashboarding—you can enable V-Order by:  
> - Setting the Spark property `spark.sql.parquet.vorder.default=true`  
> - Switching to the **`readHeavyforSpark`** or **`ReadHeavy`** resource profiles, which automatically enable V-Order for better read performance.

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
> When enabled at the session level. All parquet writes are made with V-Order enabled. This includes non-Delta parquet tables and Delta tables with the ```parquet.vorder.default``` table property set to either ```true``` or ```false```.

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
CREATE TABLE person (id INT, name STRING, age INT) USING parquet TBLPROPERTIES("delta.parquet.vorder.default" = "true");
```

> [!IMPORTANT]
> When the table property is set to true, INSERT, UPDATE and MERGE commands will behave as expected and perform the write-time optimization. If the V-Order session configuration is set to true or the spark.write enables it, then the writes will be V-Order even if the TBLPROPERTIES is set to false.

Enable or disable V-Order by altering the table property:

```sql
%%sql 
ALTER TABLE person SET TBLPROPERTIES("delta.parquet.vorder.default" = "true");

ALTER TABLE person SET TBLPROPERTIES("delta.parquet.vorder.default" = "false");

ALTER TABLE person UNSET TBLPROPERTIES("delta.parquet.vorder.default");
```

After you enable or disable V-Order using table properties, only future writes to the table are affected. Parquet files keep the ordering used when it was created. To change the current physical structure to apply or remove V-Order, read the "Control V-Order when optimizing a table" section below.

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
  .option("parquet.vorder.default ","true")\
  .saveAsTable("myschema.mytable")

DeltaTable.createOrReplace(spark)\
  .addColumn("id","INT")\
  .addColumn("firstName","STRING")\
  .addColumn("middleName","STRING")\
  .addColumn("lastName","STRING",comment="surname")\
  .addColumn("birthDate","TIMESTAMP")\
  .option("parquet.vorder.default","true")\
  .location("Files/people")\
  .execute()
```

## What is Optimize Write?

Analytical workloads on Big Data processing engines such as Apache Spark perform most efficiently when using standardized larger file sizes. The relation between the file size, the number of files, the number of Spark workers and its configurations, play a critical role on performance. Ingesting data into data lake tables might have the inherited characteristic of constantly writing lots of small files; this scenario is commonly known as the "small file problem."

Optimize Write is a Delta Lake on Microsoft Fabric and Azure Synapse Analytics feature in the Apache Spark engine that reduces the number of files written and aims to increase individual file size of the written data. The target file size can be changed per workload requirements using configurations.

The feature is __enabled by default__ in Microsoft Fabric [Runtime for Apache Spark](./runtime.md). To learn more about Optimize Write usage scenarios, read the article [The need for optimize write on Apache Spark](/azure/synapse-analytics/spark/optimize-write-for-apache-spark).

## Merge optimization

Delta Lake MERGE command allows users to update a delta table with advanced conditions. It can update data from a source table, view, or DataFrame into a target table by using MERGE command. However, the current algorithm in the open source distribution of Delta Lake isn't fully optimized for handling unmodified rows. The Microsoft Spark Delta team implemented a custom Low Shuffle Merge optimization, unmodified rows are excluded from an expensive shuffling operation that is needed for updating matched rows.

The implementation is controlled by the ```spark.microsoft.delta.merge.lowShuffle.enabled``` configuration, __enabled by default__ in the runtime. It requires no code changes and is fully compatible with the open-source distribution of Delta Lake. To learn more about Low Shuffle Merge usage scenarios, read the article [Low Shuffle Merge optimization on Delta tables](/azure/synapse-analytics/spark/low-shuffle-merge-for-apache-spark).

## Delta table maintenance

As Delta tables change, performance and storage cost efficiency tend to degrade for the following reasons:

- New data added to the table might skew data.
- Batch and streaming data ingestion rates might bring in many small files.
- Update and delete operations eventually create read overhead; parquet files are immutable by design, so Delta tables adds new parquet files with the changeset, further amplifying  the issues imposed by the first two items.
- No longer needed data files and log files available in the storage.

In order to keep the tables at the best state for best performance, perform bin-compaction, and vacuuming operations in the Delta tables. Bin-compaction is achieved by the [OPTIMIZE](https://docs.delta.io/latest/optimizations-oss.html) command; it merges all changes into bigger, consolidated parquet files. Dereferenced storage clean-up is achieved by the [VACUUM](https://docs.delta.io/latest/delta-utility.html#-delta-vacuum) command.

The table maintenance commands *OPTIMIZE* and *VACUUM* can be used within notebooks and Spark Job Definitions, and then orchestrated using platform capabilities. Lakehouse in Fabric offers a functionality to use the user interface to perform ad-hoc table maintenance as explained in the [Delta Lake table maintenance](lakehouse-table-maintenance.md) article.

> [!IMPORTANT]
> Properly designing the table physical structure, based on the ingestion frequency and expected read patterns, is likely more important than running the optimization commands described in this section.

### Control V-Order when optimizing a table

The following command structures bin-compact and rewrite all affected files using V-Order, independent of the TBLPROPERTIES setting or session configuration setting:

```sql
%%sql 
OPTIMIZE <table|fileOrFolderPath> VORDER;

OPTIMIZE <table|fileOrFolderPath> WHERE <predicate> VORDER;

OPTIMIZE <table|fileOrFolderPath> WHERE <predicate> [ZORDER  BY (col_name1, col_name2, ...)] VORDER;
```

When ZORDER and VORDER are used together, Apache Spark performs bin-compaction, ZORDER, VORDER sequentially.

The following commands bin-compact and rewrite all affected files using the TBLPROPERTIES setting. If TBLPROPERTIES is set true to V-Order, all affected files are written as V-Order. If TBLPROPERTIES is unset or set to false to V-Order, it inherits the session setting; so in order to remove V-Order from the table, set the session configuration to false.

```sql
%%sql 
OPTIMIZE <table|fileOrFolderPath>;

OPTIMIZE <table|fileOrFolderPath> WHERE predicate;

OPTIMIZE <table|fileOrFolderPath> WHERE predicate [ZORDER BY (col_name1, col_name2, ...)];
```

## Related content

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Lakehouse and Delta Lake](lakehouse-and-delta-tables.md)
- [The need for optimize write on Apache Spark](/azure/synapse-analytics/spark/optimize-write-for-apache-spark)
- [Low Shuffle Merge optimization on Delta tables](/azure/synapse-analytics/spark/low-shuffle-merge-for-apache-spark)
