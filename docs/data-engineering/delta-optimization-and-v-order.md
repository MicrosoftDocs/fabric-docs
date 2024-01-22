---
title: Delta Lake table optimization and V-Order
description: Learn how to keep your Delta Lake tables optimized across multiple scenarios
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 01/22/2024
ms.search.form: delta lake v-order optimization
---

# Delta Lake table optimization and V-Order

The [Lakehouse](lakehouse-overview.md) and the [Delta Lake](lakehouse-and-delta-tables.md) table format are central to [!INCLUDE [product-name](../includes/product-name.md)], assuring that tables are optimized for analytics is a key requirement. This guide covers Delta Lake table optimization concepts, configurations and how to apply it to most common Big Data usage patterns.

## What is V-Order?

__V-Order is a write time optimization to the parquet file format__ that enables lightning-fast reads under the Microsoft Fabric compute engines, such as Power BI, SQL, Spark, and others.

Power BI and SQL engines make use of Microsoft Verti-Scan technology and V-Ordered parquet files to achieve in-memory like data access times. Spark and other non-Verti-Scan compute engines also benefit from the V-Ordered files with an average of 10% faster read times, with some scenarios up to 50%.

V-Order works by applying special sorting, row group distribution, dictionary encoding and compression on parquet files, thus requiring less network, disk, and CPU resources in compute engines to read it, providing cost efficiency and performance. V-Order sorting has a 15% impact on average write times but provides up to 50% more compression.

It's __100% open-source parquet format compliant__; all parquet engines can read it as a regular parquet files. Delta tables are more efficient than ever; features such as Z-Order are compatible with V-Order. Table properties and optimization commands can be used on control V-Order on its partitions.

V-Order is applied at the parquet file level. Delta tables and its features, such as Z-Order, compaction, vacuum, time travel, etc. are orthogonal to V-Order, as such, are compatible and can be used together for extra benefits.

## Controlling V-Order writes

V-Order is __enabled by default__ in [!INCLUDE [product-name](../includes/product-name.md)] and in Apache Spark it's controlled by the following configurations.

|Configuration|Default value  |Description  |
|---------|---------|---------|
|spark.sql.parquet.vorder.enabled|true|Controls session level V-Order writing.|
|TBLPROPERTIES(“delta.parquet.vorder.enabled”)|false|Default V-Order mode on tables|
|Dataframe writer option: parquet.vorder.enabled|unset|Control V-Order writes using Dataframe writer|

Use the following commands to control usage of V-Order writes.

### Check V-Order configuration in Apache Spark session

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.sql.parquet.vorder.enabled 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.get('spark.sql.parquet.vorder.enabled')
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.get('spark.sql.parquet.vorder.enabled')
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.sql.parquet.vorder.enabled")
```

---

### Disable V-Order writing in Apache Spark session

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.sql.parquet.vorder.enabled=FALSE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.sql.parquet.vorder.enabled', 'false')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.sql.parquet.vorder.enabled", "false") 
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.sql.parquet.vorder.enabled", "false")
```

---

### Enable V-Order writing in Apache Spark session

> [!IMPORTANT]
> When enabled at the session level. All parquet writes are made with V-Order enabled. This includes non-Delta parquet tables and Delta tables with the ```parquet.vorder.enabled``` table property set to either ```true``` or ```false```.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.sql.parquet.vorder.enabled=TRUE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.sql.parquet.vorder.enabled', 'true')
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.sql.parquet.vorder.enabled", "true")
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.sql.parquet.vorder.enabled", "true")
```

---

### Control V-Order using Delta table properties

Enable V-Order table property during table creation:
```sql
%%sql 
CREATE TABLE person (id INT, name STRING, age INT) USING parquet TBLPROPERTIES("delta.parquet.vorder.enabled" = "true");
```

> [!IMPORTANT]
> When the table property is set to true; INSERT, UPDATE and MERGE commands will behave as expected and perform. If the V-Order session configuration is set to true or the spark.write enables it, then the writes will be V-Order even if the TBLPROPERTIES is set to false.

Enable or disable V-Order by altering the table property:

```sql
%%sql 
ALTER TABLE person SET TBLPROPERTIES("delta.parquet.vorder.enabled" = "true");

ALTER TABLE person SET TBLPROPERTIES("delta.parquet.vorder.enabled" = "false");

ALTER TABLE person UNSET TBLPROPERTIES("delta.parquet.vorder.enabled");
```

After you enable or disable V-Order using table properties, only future writes to the table are affected. Parquet files keep the ordering used when it was created. To change the current physical structure to apply or remove V-Order, read the "Control V-Order when optimizing a table" section bellow.

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

In a session where ```spark.sql.parquet.vorder.enabled``` is unset or set to false, the following commands would write using V-Order:

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

Optimize Write is a Delta Lake on [!INCLUDE [product-name](../includes/product-name.md)] and Azure Synapse Analytics feature in the Apache Spark engine that reduces the number of files written and aims to increase individual file size of the written data. The target file size can be changed per workload requirements using configurations.

The feature is __enabled by default__ in [!INCLUDE [product-name](../includes/product-name.md)] [Runtime for Apache Spark](./runtime.md). To learn more about Optimize Write usage scenarios, read the article [The need for optimize write on Apache Spark](/azure/synapse-analytics/spark/optimize-write-for-apache-spark).

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
