---
title: Z-Order and liquid clustering support in the native execution engine
description: Learn how Z-Order and liquid clustering work with the native execution engine in Microsoft Fabric Data Engineering to deliver compounding performance gains for large-scale analytical workloads.
ms.reviewer: saravi
ms.topic: how-to
ms.date: 03/18/2026
ai-usage: ai-assisted
---

# Z-Order and liquid clustering support in the native execution engine

The native execution engine includes support for Z-Order and 
liquid clustering. This means data layout techniques that reduce file 
scans at the storage level also benefit from the engine's accelerated 
execution paths, so the two optimizations compound rather than operate 
independently.

The result is fewer files scanned, fewer CPU cycles per query, and lower 
cost per query for real-world analytical workloads.

This article explains why these features work well together, shows internal benchmark results, and walks you through how to enable and use them.

## Why this matters

Modern analytical queries frequently:

- Filter on multiple high-cardinality columns.
- Scan large Delta tables repeatedly.
- Rely on selective predicates to narrow down results.

Without intelligent data layout, even a highly optimized execution engine can spend unnecessary time scanning data. By combining the native execution engine with Z-Order and liquid clustering, Fabric ensures that:

- Related data is colocated on disk, enabling aggressive file and row group skipping.
- Queries scan fewer files and fewer bytes.
- CPU-efficient native operators are paired with I/O-efficient data access.

### Performance benchmarks

On a one billion row dataset, internal benchmarks comparing fallback execution versus the native execution engine with clustering showed:

| Metric | Result |
|---|---|
| Absolute runtime reduction per query | 20–32 seconds |
| Improvement across clustered column combinations | ~20%–27% |
| Consistency | Gains observed across different predicate shapes and data distributions |

This brings a compounding performance effect: faster scans, fewer CPU cycles, and lower cost per query—without requiring users to rewrite Spark code or change query semantics.

## How to enable and use Z-Order and liquid clustering

To benefit from native acceleration for Z-Order and liquid clustering, follow these steps:

### Step 1: Enable the native execution engine

Ensure the native execution engine is enabled for your Spark workloads. Once enabled, supported Delta operations automatically run through native execution paths.

To enable at the environment level:

1. Navigate to your workspace and select the environment.
1. Under **Spark compute**, select **Acceleration**.
1. Check **Enable native execution engine**.
1. Select **Save and Publish**.

To enable for a specific notebook or Spark job definition, add the following configuration to the first cell:

```json
%%configure
{
   "conf": {
       "spark.native.enabled": "true"
   }
}
```

For full enablement options, see [Native execution engine for Fabric Data Engineering](native-execution-engine-overview.md).

### Step 2: Apply Z-Order or liquid clustering to Delta tables

With the native execution engine enabled, apply clustering using standard Delta Lake commands. No additional configuration or code changes are required to benefit from native acceleration.

>[!TIP]
> Choose liquid clustering when clustering columns are likely to change over time, or when the table is large and full rewrites are costly. Use Z-Order for established multi-column access patterns on tables that are already partitioned.

#### Use Z-Order for multi-column access patterns

Use `OPTIMIZE ... ZORDER BY` for tables where queries frequently filter on multiple columns:

# [Spark SQL](#tab/sparksql)

```sql
OPTIMIZE my_table
ZORDER BY (column1, column2);
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

delta_table = DeltaTable.forName(spark, "my_table")
delta_table.optimize().executeZOrderBy("column1", "column2")
```

# [Scala Spark](#tab/scalaspark)

```scala
import io.delta.tables.DeltaTable

val deltaTable = DeltaTable.forName(spark, "my_table")
deltaTable.optimize().executeZOrderBy("column1", "column2")
```

---

#### Use liquid clustering for flexible, incremental layout optimization

Define liquid clustering at table creation, or apply it to existing unpartitioned tables:

# [Spark SQL](#tab/sparksql)

Create a table with liquid clustering:

```sql
CREATE TABLE my_table (
    id BIGINT,
    event_date DATE,
    region STRING,
    value DOUBLE
)
CLUSTER BY (event_date, region);
```

Apply liquid clustering to an existing unpartitioned table:

```sql
ALTER TABLE my_table
CLUSTER BY (event_date, region);

-- Run OPTIMIZE to apply the clustering layout
OPTIMIZE my_table;
```

# [PySpark](#tab/pyspark)

```python
# Create table with liquid clustering
spark.sql("""
    CREATE TABLE my_table (
        id BIGINT,
        event_date DATE,
        region STRING,
        value DOUBLE
    )
    CLUSTER BY (event_date, region)
""")

# Apply OPTIMIZE to rewrite files with the clustering layout
spark.sql("OPTIMIZE my_table")
```

# [Scala Spark](#tab/scalaspark)

There's no Scala sample available at this time.

---

Liquid clustering is incremental and doesn't require a full table rewrite on every `OPTIMIZE` run. For large existing tables, the clustering layout improves progressively with each `OPTIMIZE` execution.

### Step 3: Confirm native execution is applied

After running queries on a Z-Ordered or liquid clustered table, verify that the native execution engine processed the operations:

1. Open the **Spark** page from the monitoring hub in your workspace.
1. Navigate to the **Gluten SQL / DataFrame** tab.
1. In the query plan, look for nodes ending with `Transformer`, `NativeFileScan`, or `VeloxColumnarToRowExec` — these confirm native execution paths were used.

For more detail on verifying native execution, see [Identify operations executed by the engine](native-execution-engine-overview.md#identify-operations-executed-by-the-engine).

## Limitations

- Native acceleration for Z-Order and liquid clustering applies to **Parquet and Delta** formats only. Queries on JSON, XML, or CSV files fall back to the standard JVM engine.
- If the native execution engine falls back for a query (due to unsupported operators or features), the clustering layout is still applied at the storage level but the query does not benefit from vectorized execution for that operation.
- For full native execution engine limitations, see [native execution engine limitations](native-execution-engine-overview.md#limitations).

## Related content

- [Native execution engine for Fabric Data Engineering](native-execution-engine-overview.md)
- [Apache Spark Runtimes in Fabric](runtime.md)
- [What is autotune for Apache Spark configurations in Fabric?](autotune.md)
- [Configure resource profile configurations](configure-resource-profile-configurations.md)
