---
title: Configure Spark autotune
description: Learn how autotune automatically adjusts Apache Spark configurations, minimizing workload execution time and optimizing performance.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/20/2023
---

# What is autotune for Apache Spark configurations in Fabric?

Autotune automatically adjusts Apache Spark configuration to speed up workload execution and to optimize overall performance. Autotune saves time and resources compared to manual tuning which, requires extensive effort, resources, time, and experimentation. Autotune uses historical execution data from your workloads to iteratively discover and apply the most effective configurations for a specific workload.

> [!NOTE]
> The autotune query tuning  feature in Microsoft Fabric is currently in preview.

## Query tuning

Autotune configures three Spark settings for each of your queries separately:
- `spark.sql.shuffle.partitions` - Sets the partition count for data shuffling during joins or aggregations. The default value is 200.
- `spark.sql.autoBroadcastJoinThreshold` - Sets the maximum table size in bytes that is broadcasted to all worker nodes when join operation is executed. The default value is 10 MB.
- `spark.sql.files.maxPartitionBytes` - Defines the maximum number of bytes to pack into a single partition when reading files. Works for Parquet, JSON, and ORC file-based sources. Default is 128 MB.


> [!TIP]
> Autotune query tuning examines individual queries and builds a distinct ML model for each query. It specifically targets:
> - Repetitive queries
> - Long-running queries (those with more than 15 seconds of execution)
> - Spark SQL queries (excluding those written in the RDD API, which are very rare)
>
> This feature is compatible with notebooks, Spark Job Definitions, and pipelines.

:::image type="content" source="media\autotune\execution-over-time.png" alt-text="Screenshot of execution time with autotune Enabled."::: 

## AI-based intuition behind the Autotune

The autotune feature utilizes an iterative process to optimize query performance. It begins with a default configuration and employs a machine learning model to evaluate effectiveness. When a user submits a query, the system retrieves the stored models based on the previous interactions. It generates potential configurations around a default setting named *centroid*. The best candidate predicted by the model, is applied. After query execution, the performance data is sent back to the system to refine the model.

The feedback loop gradually shifts the centroid towards optimal settings. It refines performance over time while minimizing the risk of regression. Continuous updates based on user queries enable refinement of performance benchmarks. Moreover, the process updates the *centroid* configurations to ensure the model moves towards more efficient settings incrementally. This is achieved by evaluating past performances and using them to guide future adjustments. It uses all the data points to mitigate the impact of anomalies.

From a responsible AI perspective, the Autotune feature includes transparency mechanisms designed to keep you informed about your data usage and benefits. The security and privacy align with Microsoft's standards. Ongoing monitoring maintains performance and system integrity post-launch.


## Enable autotune

Autotune is available in all regions but it's disabled by default.  You can enable it as needed through the Apache Spark configuration settings. You can enable autotune within a session by executing the following code in your notebook or by including it into your Spark notebook or Spark Job Definition code. Furthermore, Autotune has built-in mechanism for performance monitoring and to detect performance regressions. For example, if your query suddenly behaves anomalously and processes more data than usual, autotune automatically turns off. Autotune requires several iterations to learn and identify the optimal configuration. Typically the optimal configuration is determined after 20 to 25 iterations.

> [!NOTE]
> The Autotune is compatible with [Fabric Runtime 1.1](./runtime-1-1.md) and [Runtime 1.2](./runtime-1-2.md). Autotune doesn't function when [the high concurrency mode](./high-concurrency-overview.md) or when the [private endpoint](./../security/security-managed-private-endpoints-overview.md) is enabled. However, autotune seamlessly integrates with autoscaling, regardless of its configuration.

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

To verify and confirm its activation, use the following commands:

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
GET spark.ms.autotune.enabled
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.get('spark.ms.autotune.enabled')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.get('spark.ms.autotune.enabled')  
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.ms.autotune.enabled")
```

---

To disable autotune, execute the following commands:

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
spark.conf.set('spark.ms.autotune.enabled', 'false')   
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.ms.autotune.enabled", "false")
```

---

## Case study

When executing a Spark query, autotune creates a customized ML model dedicated to optimizing the query's execution. It analyzes query patterns and resource needs. Consider an initial query filtering a dataset based on a specific attribute, such as a country. While this example uses geographic filtering, the principle applies universally to any attribute or operation within the query:

```python
%%pyspark
df.filter(df.country == "country-A")
```
Autotune learns from this query, optimizing subsequent executions. When the query changes, for instance, by altering the filter value or applying a different data transformation, the structural essence of the query often remains consistent:

```python
%%pyspark
df.filter(df.country == "country-B")
```

Despite alterations, autotune identifies the fundamental structure of the new query, implementing previously learned optimizations. This capability ensures sustained high efficiency without the need for manual reconfiguration for each new query iteration.


## Logs

For each of your queries, autotune determines the most optimal settings for three Spark configurations. You can view the suggested settings by navigating to the logs. The configurations recommended by autotune are located in the driver logs, specifically those entries starting with *[Autotune]*.

:::image type="content" source="media\autotune\autotune-logs.jpg" alt-text="Screenshot of autotune logs inside Monitoring Hub." lightbox="media\autotune\autotune-logs.jpg":::

You can find various types of entries in your logs. The following include the key ones:

| Status                   | Description                                                                                                                                                                                     |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AUTOTUNE_DISABLED        | Skipped. Autotune is disabled; preventing telemetry data retrieval and query optimization. Enable Autotune to fully use its capabilities while respecting customer privacy.". |
| QUERY_TUNING_DISABLED    | Skipped. Autotune query tuning is disabled. Enable it to fine-tune settings for your Spark SQL queries.                                                                                 |
| QUERY_PATTERN_NOT_MATCH  | Skipped. Query pattern did not match. Autotune is effective for read-only queries.                                                                                                 |
| QUERY_DURATION_TOO_SHORT | Skipped. Your query duration too short to optimize. Autotune requires longer queries for effective tuning.  Queries should run for at least 15 seconds.                                                      |
| QUERY_TUNING_SUCCEED     | Success. Query tuning completed. Optimal spark settings applied.                                                                                                                                |

## Transparency note
In adherence to the Responsible AI Standard, this section aims to clarify the uses and validation of the Autotune feature, promoting transparency and enabling informed decision-making.

### Purpose of Autotune

Autotune is developed to enhance Apache Spark workload efficiency, primarily for data professionals. Its key functions include:

- Automating Apache Spark configuration tuning to reduce execution times.
- Minimizing manual tuning efforts.
- Utilizing historical workload data to refine configurations iteratively.

### Validation of Autotune

Autotune has undergone extensive testing to ensure its effectiveness and safety:

- Rigorous tests with diverse Spark workloads to verify tuning algorithm efficacy.
- Benchmarking against standard Spark optimization methods to demonstrate performance benefits.
- Real-world case studies highlighting Autotune's practical value.
- Adherence to strict security and privacy standards to safeguard user data.

User data is exclusively used to enhance your workload's performance, with robust protections to prevent misuse or exposure of sensitive information.

## Related content
- [Concurrency limits and queueing in Microsoft Fabric Spark](spark-job-concurrency-and-queueing.md)
