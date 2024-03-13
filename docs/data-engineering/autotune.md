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

Configuring Spark for optimal performance is highly challenging; ideally, it should be straightforward for everyone. This is the principle behind our creation of Autotune Query Tuning. Autotune automatically adjusts Apache Spark configurations to minimize workload execution times and optimize overall performance. This feature empowers you to achieve greater efficiency with fewer resources. It reduces execution time and surpasses the improvements realized by manually tuning workloads—a process typically requiring extensive effort, resources, time, and experimentation by experts. Autotune leverages historical execution data from your workloads to iteratively discover and apply the most effective configurations for a specific workload, optimizing execution time.

> [!NOTE]
> The autotune query tuning in Microsoft Fabric is currently in PREVIEW.

## Query tuning

Autotune configures three Spark settings for each of your queries separately:
- `spark.sql.shuffle.partitions` - configures the number of partitions to use when shuffling data for joins or aggregations. Default is 200.
- `spark.sql.autoBroadcastJoinThreshold` - Configures the maximum size in bytes for a table that is broadcast to all worker nodes when performing a join. Default is 10 MB.
- `spark.sql.files.maxPartitionBytes` - Defines the maximum number of bytes to pack into a single partition when reading files. Works for Parquet, JSON, and ORC file-based sources. Default is 128 MB.


> [!TIP]
> Autotune Query Tuning analyzes each of your queries separately, building one ML model per query. It specifically targets:
> - Repetitive queries
> - Long-running queries (those with more than 15 seconds of execution)
> - Spark SQL queries (excluding those written in the RDD API, which are very rare)
> This feature is compatible with Notebooks, Spark Job Definitions, and Pipelines!

:::image type="content" source="media\autotune\execution-over-time.png" alt-text="Execution time with Autotune Enabled."::: 

## AI-based intuition behind the Autotune

The Autotune feature operates based on a well-defined, iterative process aimed at optimizing query performance. Initially, the algorithm begins with a set of good default configurations, honed by experts over time. It then employs a machine learning model to evaluate these settings, identifying which configurations are effective or less so. When a user submits a query, the system retrieves and employs these machine learning models, which have been stored based on previous interactions and outcomes. It generates potential configuration candidates around a default setting, termed the 'centroid.' The best candidate, as predicted by the machine learning model, is then selected and applied to the user's query. After the query executes, the performance data is fed back into the system, contributing to the ongoing learning and adjustment of the machine learning model.

This feedback loop enables the centroid to shift gradually toward more optimal settings, thus refining the performance baseline over time. The approach ensures that adjustments are made conservatively, reducing the risk of significant performance regression. Additionally, the system updates continuously, learning from each new query, which allows it to adapt and refine the performance benchmarks specifically tailored to the user's patterns. Moreover, the process involves updating the 'centroid' of configurations to ensure the model moves towards more efficient settings incrementally. This is achieved by evaluating past performances and using them to guide future adjustments, effectively leveraging all data points to mitigate the impact of anomalies or outliers.

From a responsible AI perspective, the Autotune feature includes transparency mechanisms designed to keep users well-informed about how their data is used and the benefits they might receive. Security and privacy have been thoroughly vetted to align with Microsoft’s high compliance standards. Following the launch, continuous monitoring and adjustments have been implemented to ensure optimal performance and system integrity.


## Enable autotune

Autotune is available in all regions but is disabled by default, allowing each user to enable it as needed. You control it through Apache Spark configuration settings. You can easily enable Autotune within a session by executing the following code in your notebook or by incorporating it into your Spark Notebook or SJD (Spark Job Definition) code as listed below. Furthermore, Autotune has built-in mechanisms for self-performance awareness to detect performance regressions. For example, if your query suddenly behaves anomalously and processes significantly more data than usual, Autotune will automatically turn off. Therefore, using it's safe. Note that Autotune requires several iterations to learn and identify the best configurations over time. Typically, the convergence point, where optimal settings are determined, is reached after about 20-25 iterations.

> [!NOTE]
> The Autotune is compatible with Fabric Runtime 1.1 and Runtime 1.2. Autotune does not function when the HC mode or MPE is enabled. However, Autotune is agnostic to autoscaling, so it will work in conjunction with it.

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

When a Spark query is executed, Autotune generates a tailored ML model for that specific query. This model is designed to understand and optimize the query's execution by analyzing its patterns and resource requirements. Cnsider an initial query filtering a dataset based on a specific attribute, such as a country. While this example uses geographic filtering, the principle applies universally to any attribute or operation within the query:

```python
%%pyspark
df.filter(df.country == "USA")
```
Autotune learns from this query, optimizing subsequent executions. When the query changes, for instance, by altering the filter value or applying a different data transformation, the structural essence of the query often remains consistent:

```python
%%pyspark
df.filter(df.country == "Poland")
```

Despite modifications, Autotune recognizes the core structure of the new query, applying the same optimizations learned from the original. This capability ensures that the system maintains high efficiency without manual reconfiguration for each new iteration or variation of the query.


## Logs

For each of your queries, Autotune determines the most optimal settings for three Spark configurations. You can view the suggested settings by navigating to the logs. The configurations recommended by Autotune are located in the driver logs, specifically those entries starting with [Autotune].

:::image type="content" source="media\autotune\autotune-logs.jpg" alt-text="Autotune logs inside Monitoring Hub.":::

In your logs, you can find various types of entries. Here, we include the most important ones:
```
| Status                 | Description                                                                                      |
|------------------------|--------------------------------------------------------------------------------------------------|
| AUTOTUNE_DISABLED      | Skipped. Autotune is disabled, preventing telemetry data pull and subsequent query optimization features. Enable Autotune to fully leverage its capabilities while respecting customer privacy. |
| QUERY_TUNING_DISABLED  | Skipped. Autotune Query Tuning is disabled. Enable to fine-tune your Spark Settings for your Spark SQL queries. |
| QUERY_PATTERN_NOT_MATCH| Skipped. Query pattern did not match. Autotune Query Tuning is effective for read-only queries.  |
| QUERY_DURATION_TOO_SHORT| Skipped. Your query duration too short to optimize. Autotune Query Tuning requires longer (>15 seconds) queries for effective tuning. |
| QUERY_TUNING_SUCCEED   | Success. Query tuning completed. Optimal Spark Settings applied.                                  |
```


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
