---
title: Native execution engine for Fabric Spark
description: How to enable and use the native execution engine to execute Apache Spark jobs for faster and cheaper data processing in Microsoft Fabric.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: conceptual
ms.custom:
ms.date: 5/13/2024
---

# Native execution engine for Fabric Spark

The native execution engine is a groundbreaking enhancement for Apache Spark job executions in Microsoft Fabric. This vectorized engine optimizes the performance and efficiency of your Spark queries by running them directly on your lakehouse infrastructure. The engine's seamless integration means it requires no code modifications and avoids vendor lock-in. It supports Apache Spark APIs and is compatible with Runtime 1.2 (Spark 3.4), and works with both Parquet and Delta formats. Regardless of your data's location within OneLake, or if you access data via shortcuts, the native execution engine maximizes efficiency and performance.

The native execution engine significantly elevates query performance while minimizing operational costs. It delivers a remarkable speed enhancement, achieving up to four times faster performance compared to traditional OSS (open source software) Spark, as validated by the TPC-DS 1TB benchmark. The engine is adept at managing a wide array of data processing scenarios, ranging from routine data ingestion, batch jobs, and ETL (extract, transform, load) tasks, to complex data science analytics and responsive interactive queries. Users benefit from accelerated processing times, heightened throughput, and optimized resource utilization.

The Native Execution Engine is based on two key OSS components: [Velox](https://github.com/facebookincubator/velox), a C++ database acceleration library introduced by Meta, and [Apache Gluten (incubating)](https://github.com/apache/incubator-gluten), a middle layer responsible for offloading JVM-based SQL engines’ execution to native engines introduced by Intel.

> [!NOTE]
> The native execution engine is currently in public preview. For more information, see the current [limitations](#limitations). **At this stage of the preview, there is no additional cost associated with using it.**

## When to use the native execution engine

The native execution engine offers a solution for running queries on large-scale data sets; it optimizes performance by using the native capabilities of underlying data sources and minimizing the overhead typically associated with data movement and serialization in traditional Spark environments. The engine supports various operators and data types, including rollup hash aggregate, broadcast nested loop join (BNLJ), and precise timestamp formats. However, to fully benefit from the engine's capabilities, you should consider its optimal use cases:

- The engine is effective when working with data in Parquet and Delta formats, which it can process natively and efficiently.
- Queries that involve intricate transformations and aggregations benefit significantly from the columnar processing and vectorization capabilities of the engine.
- Performance enhancement is most notable in scenarios where the queries don't trigger the fallback mechanism by avoiding unsupported features or expressions.
- The engine is well-suited for queries that are computationally intensive, rather than simple or I/O-bound.

For information on the operators and functions supported by the native execution engine, see [Apache Gluten documentation](https://github.com/apache/incubator-gluten/blob/main/docs/velox-backend-support-progress.md).

## Enable the native execution engine

To use the full capabilities of the native execution engine during the preview phase, specific configurations are necessary. The following procedures show how to activate this feature for notebooks, Spark job definitions, and entire environments.

> [!IMPORTANT]
> The native execution engine currently supports the latest GA runtime version, which is [Runtime 1.2 (Apache Spark 3.4, Delta Lake 2.4)](./runtime-1-2.md).

### Enable for a notebook or Spark job definition

To enable the native execution engine for a single notebook or Spark job definition, you must incorporate the necessary configurations at the beginning of your execution script:

```json
%%configure 
{ 
   "conf": { 
       "spark.gluten.enabled": "true", 
       "spark.shuffle.manager": "org.apache.spark.shuffle.sort.ColumnarShuffleManager" 
   } 
} 
```

For notebooks, insert the required configuration commands in the first cell. For Spark job definitions, include the configurations in the frontline of your Spark job definition.

:::image type="content" source="media\native\enable.jpg" alt-text="Screenshot showcasing how to enable the native execution engine inside the notebook." lightbox="media\native\enable.jpg":::

The native execution engine is integrated with custom pools, meaning that enabling this feature initiates a new session, typically taking up to two minutes to start.

> [!IMPORTANT]
> Configuration of the native execution engine must be done prior to the initiation of the Spark session. After the Spark session starts, the `spark.shuffle.manager` setting becomes immutable and can't be changed. Ensure that these configurations are set within the `%%configure` block in notebooks or in the Spark session builder for Spark job definitions.

### Enable at the environment level

To ensure uniform performance enhancement, enable the native execution engine across all jobs and notebooks associated with your environment:

1. Navigate to your environment settings.

1. Go to **Spark properties**.

1. Complete the fields on the **Spark properties** screen, as shown in the following image.

| Property | Value |
|:-:|:-:|
| spark.gluten.enabled | true |
| spark.shuffle.manager | org.apache.spark.shuffle.sort.ColumnarShuffleManager |

:::image type="content" source="media\native\enable-environment.png" alt-text="Screenshot showing how to enable the native execution engine inside the environment item." lightbox="media\native\enable-environment.png":::

When enabled at the environment level, all subsequent jobs and notebooks inherit the setting. This inheritance ensures that any new sessions or resources created in the environment automatically benefit from the enhanced execution capabilities.

### Control on the query level

You can disable the native execution engine for specific queries, particularly if they involve operators that aren't currently supported (see [limitations](#limitations)). To disable, set the Spark configuration spark.gluten.enabled to false for the specific cell containing your query.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.gluten.enabled=FALSE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.gluten.enabled', 'false')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.gluten.enabled", 'false')   
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.gluten.enabled", "false")
```

---

:::image type="content" source="media\native\disable.jpg" alt-text="Screenshot showing how to disable the native execution engine inside a notebook." lightbox="media\native\disable.jpg":::

After executing the query in which the native execution engine is disabled, you must re-enable it for subsequent cells by setting spark.gluten.enabled to true. This step is necessary because Spark executes code cells sequentially.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.gluten.enabled=TRUE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.gluten.enabled', 'true')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.gluten.enabled", "true")   
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.gluten.enabled", "true")
```

---

## Identify operations executed by the engine

There are several methods to determine if an operator in your Apache Spark job was processed using the native execution engine.

### Spark UI and Spark history server

Access the Spark UI or Spark history server to locate the query you need to inspect. In the query plan displayed within the interface, look for any node names that end with the suffix *Transformer*. The suffix indicates that the native execution engine executed the operation. For instance, nodes might be labeled as *RollUpHashAggregateTransformer*, *ProjectExecTransformer*, *BroadcastHashJoinExecTransformer*, *ShuffledHashJoinExecTransformer*, or *BroadcastNestedLoopJoinExecTransformer*.

:::image type="content" source="media\native\spark-ui.jpg" alt-text="Screenshot showing how to check DAG visualization that ends with the suffix Transformer." lightbox="media\native\spark-ui.jpg":::

### DataFrame explain

Alternatively, you can execute the `df.explain()` command in your notebook to view the execution plan. Within the output, look for the same *Transformer* suffixes. This method provides a quick way to confirm whether specific operations are being handled by the native execution engine.

:::image type="content" source="media\native\df-details.jpg" alt-text="Screenshot showing how to check the physical plan for your query, and see that the query was executed by the native execution engine." lightbox="media\native\df-details.jpg":::

### Fallback mechanism

In some instances, the native execution engine might not be able to execute a query due to reasons such as unsupported features. In these cases, the operation falls back to the traditional Spark engine. This fallback mechanism ensures that there's no interruption to your workflow.

:::image type="content" source="media\native\fallback.jpg" alt-text="Screenshot showing the fallback mechanism." lightbox="media\native\fallback.jpg":::

:::image type="content" source="media\native\logs.jpg" alt-text="Screenshot showing how to check logs associated with the fallback mechanism." lightbox="media\native\logs.jpg":::

## Limitations

While the native execution engine enhances performance for Apache Spark jobs, note its current limitations.

- The engine doesn't support partitioned writing for Delta tables. Some Delta-specific operations aren't supported, including merge operations, checkpoint scans, and deletion vectors.
- Certain Spark features and expressions aren't compatible with the native execution engine, such as user-defined functions (UDFs) and the `array contains` function, as well as Spark structured streaming. Usage of these incompatible operations or functions as part of an imported library will also cause fallback to the Spark engine.
- Scans from storage solutions that utilize private endpoints aren't supported.
- The engine doesn't support ANSI mode, so it searches, and once ANSI mode is enabled, it falls back to vanilla Spark.


When using date filters in queries, it is essential to ensure that the data types on both sides of the comparison match to avoid performance issues. Mismatched data types may not bring query execution boost and may require explicit casting. Always ensure that the data types of the left-hand side (LHS) and right-hand side (RHS) of a comparison are identical, as mismatched types will not always be automatically cast. If a type mismatch is unavoidable, use explicit casting to match the data types, such as `CAST(order_date AS DATE) = '2024-05-20'`. Queries with mismatched data types that require casting will not be accelerated by Native Execution Engine, so ensuring type consistency is crucial for maintaining performance. For example, instead of `order_date = '2024-05-20'` where `order_date` is `DATETIME` and the string is `DATE`, explicitly cast `order_date` to `DATE` to ensure consistent data types and improve performance. 


> [!NOTE]
> The native execution engine is currently in preview and your insights are important to us. We invite you to share your feedback and the outcomes of your evaluation directly with our product team. Please fill out the [feedback form](https://forms.office.com/r/zuZaK9cuLm). We look forward to your valuable input and are eager to discuss your findings in detail.

## Related content

- [Apache Spark Runtimes in Fabric](./runtime.md)
- [What is autotune for Apache Spark configurations in Fabric?](./autotune.md)
