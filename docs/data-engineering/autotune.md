---
title: Configure autotune for Apache Spark
description: Learn how autotune automatically adjusts Apache Spark configurations, minimizing workload execution time and optimizing performance.
ms.topic: overview
ms.custom: sfi-image-nochange
ms.date: 03/05/2026
ai-usage: ai-assisted
#customer intent: As a Microsoft Fabric user I want to learn how to use autotune to automatically adjust Apache Spark configurations.
---

# What is autotune for Apache Spark configurations in Fabric?

Autotune automatically adjusts Apache Spark configurations to reduce workload execution time and improve performance. It helps you avoid manual tuning, which typically requires repeated trial and error. Autotune uses historical execution data from your workloads to iteratively discover and apply effective settings for each workload.

> [!NOTE]
> Autotune query tuning in Microsoft Fabric is currently in preview. It's available in all production regions, but it's disabled by default. Enable it in an environment Spark configuration, or for a single session in notebook or Spark Job Definition code.

## Configuration defaults and requirements

- **Default behavior**: Autotune is **off** by default.
- **No required setup when off**: If you don't enable autotune, Spark uses its standard configuration behavior.
- **Required setup to use autotune**: Set `spark.ms.autotune.enabled=true` either:
	- At the environment level so all notebooks and jobs that use that environment inherit the setting. See [Enable autotune](#enable-autotune).
	- In one notebook or Spark Job Definition session only. See [Enable autotune for a single session](#enable-autotune-for-a-single-session).

## Query tuning

Autotune tunes these three Apache Spark settings for each query:

- `spark.sql.shuffle.partitions`: Sets the partition count for data shuffling during joins or aggregations. Default is `200`.
- `spark.sql.autoBroadcastJoinThreshold`: Sets the maximum table size, in bytes, to broadcast to worker nodes during a join. Default is `10 MB`.
- `spark.sql.files.maxPartitionBytes`: Sets the maximum bytes to pack into one partition when reading files. Applies to Parquet, JSON, and ORC file sources. Default is `128 MB`.

Autotune query tuning examines each query and builds a separate machine learning model for that query. It works best for:

- Repetitive queries
- Long-running queries (more than 15 seconds)
- Apache Spark SQL API queries (not RDD API)

You can use autotune with notebooks, Spark Job Definitions, and pipelines. Benefit varies by query complexity and data shape. In testing, the largest gains appear in exploratory data analysis patterns such as reads, joins, aggregations, and sorts.

:::image type="content" source="media/autotune/execution-over-time.png" alt-text="Screenshot of execution time with autotune enabled." lightbox="media/autotune/execution-over-time.png":::

### How autotune works

Autotune uses an iterative optimization loop:

1. It starts from default Spark configuration values.
1. It generates candidate configurations around a baseline (*centroid*).
1. It predicts the best candidate with a model trained on previous runs.
1. It applies the candidate and executes the query.
1. It feeds execution results back into the model.

Over time, the baseline shifts toward better settings while reducing regression risk. Using all collected data points also helps reduce the impact of anomalies.

### Enable autotune

Autotune is available in all production regions, but it's disabled by default. To enable it at the environment level, set the Spark property `spark.ms.autotune.enabled=true` in a new or existing environment. All notebooks and jobs that use that environment inherit the setting.

:::image type="content" source="media/autotune/enable-autotune.png" alt-text="Screenshot of enabling autotune." lightbox="media/autotune/enable-autotune.png":::

Autotune includes built-in regression detection. For example, if a query processes an unusually large amount of data, autotune can automatically skip tuning for that run. In many scenarios, autotune needs about 20 to 25 iterations to converge on strong settings.

> [!NOTE]
> Autotune is compatible with [Runtime 1.2](./runtime-1-2.md). You can't enable it on runtime versions later than 1.2. It doesn't run when [high concurrency mode](./high-concurrency-overview.md) or [private endpoint](./../security/security-managed-private-endpoints-overview.md) is enabled. Autotune works with autoscaling in any autoscaling configuration.

You can also enable autotune for a single session by setting the Spark property in your notebook or Spark Job Definition.

### Enable autotune for a single session

# [Spark SQL](#tab/sparksql)

```sql
%%sql
SET spark.ms.autotune.enabled=TRUE
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.ms.autotune.enabled', 'true')
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark
spark.conf.set("spark.ms.autotune.enabled", "true")
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.ms.autotune.enabled", "true")
```

---

### Disable autotune for a single session

To disable autotune in a notebook or Spark Job Definition, run one of the following commands as the first cell or first line of code.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.ms.autotune.enabled=FALSE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.ms.autotune.enabled', 'false')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.ms.autotune.enabled", "false")
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.ms.autotune.enabled", "false")
```

---

### Case study

When you run an Apache Spark query, autotune builds a model for that query shape and learns the best settings over time. For example, start with this filter query:

```python
%%pyspark
df.filter(df.country == "country-A")
```

Autotune learns from this run. If you later change only the filter value, the query shape remains similar:

```python
%%pyspark
df.filter(df.country == "country-B")
```

Autotune can reuse previous learnings for this similar query pattern, which helps maintain performance without manual retuning.

### Logs

For each query, autotune calculates recommended values for the three supported Spark configurations. To inspect recommendations, check driver logs for entries that start with *[Autotune]*.

:::image type="content" source="media/autotune/autotune-logs.jpg" alt-text="Screenshot of autotune logs inside Monitoring Hub." lightbox="media/autotune/autotune-logs.jpg":::

Common log statuses include:

| Status | Description |
|---|---|
| `AUTOTUNE_DISABLED` | Skipped. Autotune is disabled, so telemetry collection and optimization aren't applied. |
| `QUERY_TUNING_DISABLED` | Skipped. Query tuning is disabled. |
| `QUERY_PATTERN_NOT_MATCH` | Skipped. Query pattern doesn't match supported read-only query types. |
| `QUERY_DURATION_TOO_SHORT` | Skipped. Query ran for less than 15 seconds, which is too short for effective tuning. |
| `QUERY_TUNING_SUCCEED` | Success. Query tuning completed and optimized Spark settings were applied. |

### Transparency note

In alignment with the Responsible AI Standard, this section explains how autotune is used and validated.

### Purpose of autotune

Autotune is designed to improve Apache Spark workload efficiency for data professionals. It:

- Automatically tunes Apache Spark configurations to reduce execution time.
- Reduces manual tuning effort.
- Uses historical workload data to iteratively refine configuration choices.

### Validation of autotune

Autotune undergoes extensive validation to help ensure effectiveness and safety:

- Uses rigorous tests across diverse Spark workloads to verify tuning algorithm effectiveness.
- Benchmarks against standard Spark optimization methods to demonstrate performance benefits.
- Includes real-world case studies to show practical value.
- Follows strict security and privacy standards to safeguard user data.

User data is exclusively used to enhance your workload's performance, with robust protections to prevent misuse or exposure of sensitive information.

### Related content

- [Concurrency limits and queueing in Apache Spark for Microsoft Fabric](spark-job-concurrency-and-queueing.md)
- [Apache Spark compute in Microsoft Fabric](spark-compute.md)
