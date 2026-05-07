---
title: Private Link support for the Spark connector for Microsoft Fabric Data Warehouse
description: Learn about Private Link support and JDBC batch insert write strategies for the Spark connector for Microsoft Fabric Data Warehouse.
ms.reviewer: avinandac
ms.topic: how-to
ms.custom:
ms.date: 05/06/2026
---

# Private Link support for the Spark connector for Microsoft Fabric Data Warehouse

The [Spark connector for Fabric Data Warehouse](spark-data-warehouse-connector.md) supports read and write operations in environments where Private Link is enabled at either the tenant or workspace level. Write operations use JDBC batch insert strategies that send data directly through the JDBC connection without external staging.

## Prerequisites

> [!IMPORTANT]
> Run these import statements at the beginning of your notebook or before you start using the connector:

# [PySpark](#tab/pyspark)

```python
import com.microsoft.spark.fabric
from com.microsoft.spark.fabric.Constants import Constants
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark
import com.microsoft.spark.fabric.tds.implicits.read.FabricSparkTDSImplicits._
import com.microsoft.spark.fabric.tds.implicits.write.FabricSparkTDSImplicits._
import com.microsoft.spark.fabric.Constants
import org.apache.spark.sql.SaveMode
```

---

## JDBC batch insert write strategies

The connector exposes a `writeStrategy` option with two JDBC-based strategies:

| Strategy | Description | Duplicate safety |
|---|---|---|
| `MULTI_THREAD_NO_DUPLICATES_BATCH_INSERT` | Multi-threaded writes with staging tables | Full |
| `NO_DUPLICATES_BATCH_INSERT` | Single-threaded writes with staging tables | Full |

Both strategies use a two-phase commit approach. Data is first written to temporary staging tables, then atomically merged into the target table. This approach guarantees zero duplicates even when Spark retries failed tasks.

## Automatic strategy selection

In Private Link-enabled environments, the connector automatically selects `MULTI_THREAD_NO_DUPLICATES_BATCH_INSERT`. No configuration is needed.

# [PySpark](#tab/pyspark)

```python
df.write \
  .mode("overwrite") \
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

# [Scala Spark](#tab/scalaspark)

```scala
df.write
  .mode("overwrite")
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

---

## Explicit strategy selection

You can override the strategy manually by using the `writeStrategy` option.

# [PySpark](#tab/pyspark)

```python
# Multi-threaded (recommended for faster throughput)
df.write \
  .mode("overwrite") \
  .option("writeStrategy", "MULTI_THREAD_NO_DUPLICATES_BATCH_INSERT") \
  .synapsesql("<warehouse name>.<schema name>.<table name>")

# Single-threaded (use if you encounter OutOfMemoryErrors)
df.write \
  .mode("overwrite") \
  .option("writeStrategy", "NO_DUPLICATES_BATCH_INSERT") \
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

# [Scala Spark](#tab/scalaspark)

```scala
// Multi-threaded (recommended for faster throughput)
df.write
  .mode("overwrite")
  .option("writeStrategy", "MULTI_THREAD_NO_DUPLICATES_BATCH_INSERT")
  .synapsesql("<warehouse name>.<schema name>.<table name>")

// Single-threaded (use if you encounter OutOfMemoryErrors)
df.write
  .mode("overwrite")
  .option("writeStrategy", "NO_DUPLICATES_BATCH_INSERT")
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

---

## How it works

### Phase 1: Write to staging tables

Each Spark partition writes its rows into dedicated temporary staging tables using multi-row `INSERT INTO … VALUES` statements. Staging tables are truncated before each write, so if Spark retries a task, the data is cleanly re-inserted with no duplicates.

The multi-threaded strategy parallelizes this step by having each partition use multiple writer threads, each writing to its own staging table.

### Phase 2: Atomic merge

After all partitions complete, the driver merges every staging table into the target in a single atomic transaction. This approach guarantees that either all data lands in the target table or none does. All staging tables are cleaned up automatically.

## Choose a strategy

Use the following guidance to choose a strategy:

- **Start with `MULTI_THREAD_NO_DUPLICATES_BATCH_INSERT`**. It's the default in Private Link environments and provides the best throughput.
- **Switch to `NO_DUPLICATES_BATCH_INSERT`** if you encounter executor OutOfMemoryErrors. This strategy streams rows without buffering entire partitions, trading throughput for lower memory usage.

Both strategies provide identical zero-duplicate guarantees.

## Increase writer threads for faster writes

You can increase throughput by increasing writer threads per Spark task.

# [PySpark](#tab/pyspark)

```python
df.write \
  .mode("overwrite") \
  .option("writeStrategy", "MULTI_THREAD_NO_DUPLICATES_BATCH_INSERT") \
  .option("writerThreadsPerTask", "5") \
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

# [Scala Spark](#tab/scalaspark)

```scala
df.write
  .mode("overwrite")
  .option("writeStrategy", "MULTI_THREAD_NO_DUPLICATES_BATCH_INSERT")
  .option("writerThreadsPerTask", "5")
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

---

The following table describes the configuration details for writer threads:

| Setting | Details |
|---|---|
| Default threads per task | 3 |
| Effect of more threads | More concurrent JDBC connections to the warehouse |
| Consideration | Higher executor memory usage; too many threads might cause OutOfMemoryErrors |

## Code examples

### Write data with auto-detection

The following example writes a Spark DataFrame to a warehouse table. The connector automatically selects the appropriate write strategy.

# [PySpark](#tab/pyspark)

```python
from pyspark.sql.functions import concat, lit, col, current_timestamp

df = spark.range(100000).toDF("id") \
  .withColumn("name", concat(lit("user_"), col("id"))) \
  .withColumn("score", (col("id") % 100).cast("int"))

df.write \
  .mode("overwrite") \
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

# [Scala Spark](#tab/scalaspark)

```scala
val df = spark.range(100000).toDF("id")
  .withColumn("name", concat(lit("user_"), col("id")))
  .withColumn("score", (col("id") % 100).cast("int"))

df.write
  .mode("overwrite")
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

---

### Append data to an existing table

The following example appends new rows to an existing warehouse table:

# [PySpark](#tab/pyspark)

```python
newData = spark.createDataFrame([
  (1001, "Alice", 95),
  (1002, "Bob", 87),
  (1003, "Charlie", 92)
], ["id", "name", "score"])

newData.write \
  .mode("append") \
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

# [Scala Spark](#tab/scalaspark)

```scala
val newData = spark.createDataFrame(Seq(
  (1001, "Alice", 95),
  (1002, "Bob", 87),
  (1003, "Charlie", 92)
)).toDF("id", "name", "score")

newData.write
  .mode("append")
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

---

### Write data at scale

The following example shows a large-scale write operation with repartitioning:

# [PySpark](#tab/pyspark)

```python
from pyspark.sql.functions import concat, lit, col, current_timestamp

bigDf = spark.range(10000000).repartition(16).toDF("id") \
  .withColumn("name", concat(lit("user_"), col("id"))) \
  .withColumn("city", lit("Seattle")) \
  .withColumn("age", (col("id") % 100).cast("int")) \
  .withColumn("salary", (col("id") * 1.5).cast("double")) \
  .withColumn("active", col("id") % 2 == 0) \
  .withColumn("created_at", current_timestamp())

bigDf.write \
  .mode("overwrite") \
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

# [Scala Spark](#tab/scalaspark)

```scala
val bigDf = spark.range(10000000).repartition(16).toDF("id")
  .withColumn("name", concat(lit("user_"), col("id")))
  .withColumn("city", lit("Seattle"))
  .withColumn("age", (col("id") % 100).cast("int"))
  .withColumn("salary", (col("id") * 1.5).cast("double"))
  .withColumn("active", col("id") % 2 === 0)
  .withColumn("created_at", current_timestamp())

bigDf.write
  .mode("overwrite")
  .synapsesql("<warehouse name>.<schema name>.<table name>")
```

---

## Considerations

Currently, the connector with JDBC batch insert strategies:

- Supports all [DataFrame save modes](spark-data-warehouse-connector.md#supported-dataframe-save-modes) (ErrorIfExists, Ignore, Overwrite, Append).
- Is safe with Spark retries. Staging tables are truncated on retry.
- Doesn't support update, delete, or upsert operations.

## Related content

- [Spark connector for Microsoft Fabric Data Warehouse](spark-data-warehouse-connector.md)
- [Apache Spark runtimes in Fabric](runtime.md)
- [Security for data warehousing in Fabric](../data-warehouse/security.md)
