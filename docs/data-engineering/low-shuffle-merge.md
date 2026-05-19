---
title: Low shuffle merge optimization on Delta tables
description: Low shuffle merge optimization on Delta tables for Apache Spark
ms.service: azure-synapse-analytics
ms.reviewer: saravi
ms.topic: reference
ms.subservice: spark
ms.date: 05/18/2026
author: milescole
ms.author: milescole
---

# Low shuffle merge optimization on Delta tables

Delta Lake [MERGE command](https://docs.delta.io/latest/delta-update.html#upsert-into-a-table-using-merge) allows users to update a delta table with advanced conditions. It can update data from a source table, view or DataFrame into a target table by using `MERGE` command. However, the current algorithm isn't fully optimized for handling *unmodified* rows. With the low shuffle merge optimization, unmodified rows are excluded from an expensive shuffling operation that is needed for updating matched rows.

> [!NOTE]
> Low shuffle merge is available and enabled by default in all Fabric Spark runtimes to dramatically improve the performance of `MERGE` operations.

## Why we need low shuffle merge

Currently `MERGE` operation is done by two Join executions. The first join is using the whole target table and source data, to find a list of *touched* files of the target table including any matched rows. After that, it performs the second join reading only those *touched* files and source data, to do actual table update. Even though the first join is to reduce the amount of data for the second join, there could still be a huge number of *unmodified* rows in *touched* files. The first join query is lighter as it only reads columns in the given matching condition. The second one for table update needs to load all columns, which incurs an expensive shuffling process.

With low shuffle merge optimization, Delta keeps the matched row result from the first join temporarily and utilizes it for the second join. Based on the result, it excludes *unmodified* rows from the heavy shuffling process. There would be two separate write jobs for *matched* rows and *unmodified* rows, thus it could result in 2x number of output files compared to the previous behavior. However, the expected performance gain outweighs the possible small files problem.

## Benefits of low shuffle merge

* Unmodified rows in *touched* files are handled separately and not going through the actual MERGE operation. It can save the overall MERGE execution time and compute resources. The gain would be larger when many rows are copied and only a few rows are updated.
* Row orderings are preserved for unmodified rows. Therefore, the output files of unmodified rows could be still efficient for data skipping if the file was sorted or Z-ORDERED.
* There would be tiny overhead even for the worst case when MERGE condition matches all rows in touched files.


## How to enable and disable Low Shuffle Merge

Low shuffle merge is enabled by default as a Spark session configuration:

# [Spark SQL](#tab/sparksql)

```sql
SET spark.microsoft.delta.merge.lowShuffle.enabled = TRUE
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set('spark.microsoft.delta.merge.lowShuffle.enabled', True)
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.microsoft.delta.merge.lowShuffle.enabled", "true")
```

---