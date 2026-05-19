---
title: Z-Order for Delta tables
description: Learn how Z-Order data layout works for Delta tables in Microsoft Fabric, when to use it, and how it compares to liquid clustering.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 05/19/2026
ai-usage: ai-assisted
---

# Z-Order for Delta tables

Z-Order is a data layout technique that colocates related data in the same files by applying a Z-Order (Morton) space-filling curve across one or more columns. The technique tightens the min/max ranges stored in file-level statistics, which improves [file skipping](delta-lake-file-skipping.md) when queries filter on those columns.

> [!TIP]
> For most workloads starting in Fabric Runtime 2.0, **liquid clustering is the recommended data layout strategy**. It offers flexible column selection, incremental optimization, and no small-file penalties from high-cardinality columns. Use Z-Order only when you have an established workflow on an older runtime or don't need the flexibility of liquid clustering.
>
> For full liquid clustering guidance, see [Liquid clustering](liquid-clustering.md).

## When to use Z-Order

Use Z-Order when:

- You're on Fabric Runtime 1.2 or earlier, where liquid clustering isn't available or has limited support.
- You have an established Z-Order workflow and don't need to change columns frequently.
- You want multi-column file skipping without introducing partitioning.

## Apply Z-Order

Z-Order is applied as part of the `OPTIMIZE` command. Unlike liquid clustering, you specify the columns directly in the `OPTIMIZE` statement each time you run it—the columns aren't stored in table metadata.

# [Spark SQL](#tab/sparksql)

```sql
OPTIMIZE sales ZORDER BY (order_date, region)
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

deltaTable = DeltaTable.forName(spark, "sales")
deltaTable.optimize().executeZOrderBy("order_date", "region")
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "sales")
deltaTable.optimize().executeZOrderBy("order_date", "region")
```

---

> [!TIP]
> Starting in Fabric Runtime 2.0, the [Native execution engine](native-execution-engine-overview.md) supports performing `OPTIMIZE` with `ZORDER` specified, delivering 30–50% faster multi-dimensional clustering performance. Prior runtimes fall back to regular non-accelerated Spark execution.

## Scope Z-Order with a WHERE predicate

You can add a `WHERE` clause to limit which files `OPTIMIZE ZORDER BY` rewrites. Only files containing rows that match the predicate are candidates for compaction and Z-Order layout. The `WHERE` clause is useful for incremental maintenance, for example, Z-Ordering only the most recent data after an ingestion run.

# [Spark SQL](#tab/sparksql)

```sql
-- Z-Order only files that contain data from the last 7 days
OPTIMIZE sales
WHERE order_date >= current_date() - INTERVAL 7 DAYS
ZORDER BY (order_date, region)
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

# Z-Order only files matching the predicate
deltaTable = DeltaTable.forName(spark, "sales")
deltaTable.optimize().where("order_date >= current_date() - INTERVAL 7 DAYS").executeZOrderBy("order_date", "region")
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
// Z-Order only files matching the predicate
val deltaTable = DeltaTable.forName(spark, "sales")
deltaTable.optimize().where("order_date >= current_date() - INTERVAL 7 DAYS").executeZOrderBy("order_date", "region")
```

---

Using a `WHERE` predicate reduces the amount of data rewritten, which lowers compute cost and execution time. The predicate filters based on file-level statistics, so it works best on columns that already have tight min/max ranges per file (for example, a date column written in chronological order).

## Z-Order with partitioning

Z-Order and partitioning can be combined. When both are used, `OPTIMIZE ZORDER BY` applies the Z-Order layout within each partition independently. The combination is useful when you need partitioning for [concurrent writer isolation](delta-lake-partitioning.md#partitioning-and-concurrent-writes) and Z-Order for file skipping on other columns.

# [Spark SQL](#tab/sparksql)

```sql
-- Table is partitioned by region; Z-Order by order_date within each partition
OPTIMIZE sales ZORDER BY (order_date)
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

deltaTable = DeltaTable.forName(spark, "sales")
deltaTable.optimize().executeZOrderBy("order_date")
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "sales")
deltaTable.optimize().executeZOrderBy("order_date")
```

---

## Key considerations

- Z-Order columns aren't stored in table metadata. You must specify them each time you run `OPTIMIZE`.
- Z-Order rewrites all eligible files on every `OPTIMIZE` run unless you provide a `WHERE` predicate to limit scope. There's no incremental mode like liquid clustering.
- Z-Order and liquid clustering are **incompatible** on the same table. Use one or the other.
- For best results, choose 1 to 4 columns that appear frequently in `WHERE` clauses.

## Compare Z-Order and liquid clustering

| Aspect | Z-Order | Liquid clustering |
|---|---|---|
| **Column changes** | Must respecify on each `OPTIMIZE` | `ALTER TABLE CLUSTER BY` persists definition |
| **Incremental mode** | No. Full rewrite each run | Yes (Runtime 2.0+) |
| **Column storage** | Not persisted in metadata | Stored in table metadata |
| **Curve algorithm** | Z-Order curve | Z-Order (one column), Hilbert (2+ columns) |
| **Runtime requirement** | All runtimes | Runtime 1.2+ (incremental in 2.0+) |

## Related content

- [Liquid clustering](liquid-clustering.md)
- [Table compaction](table-compaction.md)
- [File skipping](delta-lake-file-skipping.md)
- [Partitioning](delta-lake-partitioning.md)
- [V-Order](delta-optimization-and-v-order.md)
