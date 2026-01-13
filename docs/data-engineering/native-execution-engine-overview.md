---
title: Native execution engine for Fabric Data Engineering
description: How to enable and use the native execution engine to execute Apache Spark jobs for faster and cheaper data processing in Microsoft Fabric.
ms.reviewer: sngun
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 10/01/2025
---

# Native execution engine for Fabric Data Engineering

The native execution engine is a groundbreaking enhancement for Apache Spark job executions in Microsoft Fabric. This vectorized engine optimizes the performance and efficiency of your Spark queries by running them directly on your lakehouse infrastructure. The engine's seamless integration means it requires no code modifications and avoids vendor lock-in. It supports Apache Spark APIs and is compatible with **[Runtime 1.3 (Apache Spark 3.5)](./runtime-1-3.md)**, and works with both Parquet and Delta formats. Regardless of your data's location within OneLake, or if you access data via shortcuts, the native execution engine maximizes efficiency and performance.

The native execution engine significantly elevates query performance while minimizing operational costs. It delivers a remarkable speed enhancement, achieving up to four times faster performance compared to traditional OSS (open source software) Spark, as validated by the TPC-DS 1-TB benchmark. The engine is adept at managing a wide array of data processing scenarios, ranging from routine data ingestion, batch jobs, and ETL (extract, transform, load) tasks, to complex data science analytics and responsive interactive queries. Users benefit from accelerated processing times, heightened throughput, and optimized resource utilization.

The Native Execution Engine is based on two key OSS components: [Velox](https://github.com/facebookincubator/velox), a C++ database acceleration library introduced by Meta, and [Apache Gluten (incubating)](https://github.com/apache/incubator-gluten), a middle layer responsible for offloading JVM-based SQL engines’ execution to native engines introduced by Intel.


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
> The native execution engine supports the latest GA runtime version, which is [Runtime 1.3 (Apache Spark 3.5, Delta Lake 3.2)](./runtime-1-3.md). With the release of the native execution engine in Runtime 1.3, support for the previous version—[Runtime 1.2 (Apache Spark 3.4, Delta Lake 2.4)](./runtime-1-2.md)—is discontinued. We encourage all customers to upgrade to the latest Runtime 1.3. If you're using the Native Execution Engine on Runtime 1.2, native acceleration will be disabled.

### Enable at the environment level

To ensure uniform performance enhancement, enable the native execution engine across all jobs and notebooks associated with your environment:

1. Navigate to the workspace containing your environment and select the environment. If you don't have environment created, see [Create, configure, and use an environment in Fabric](./create-and-use-environment.md).

1. Under **Spark compute** select **Acceleration**.

1. Check the box labeled **Enable native execution engine.**

1. **Save and Publish** the changes.

   :::image type="content" source="media\native\enablement.png" alt-text="Screenshot showing how to enable the native execution engine inside the environment item." lightbox="media\native\enablement.png":::

When enabled at the environment level, all subsequent jobs and notebooks inherit the setting. This inheritance ensures that any new sessions or resources created in the environment automatically benefit from the enhanced execution capabilities.

> [!IMPORTANT]
> Previously, the native execution engine was enabled through Spark settings within the environment configuration. The native execution engine can now be enabled more easily using a toggle in the **Acceleration** tab of the environment settings. To continue using it, go to the **Acceleration** tab and turn on the toggle. You can also enable it via Spark properties if preferred.

#### Enable for a notebook or Spark job definition

You can also enable the native execution engine for a single notebook or Spark job definition, you must incorporate the necessary configurations at the beginning of your execution script:

```json
%%configure 
{ 
   "conf": {
       "spark.native.enabled": "true", 
   } 
} 
```

For notebooks, insert the required configuration commands in the first cell. For Spark job definitions, include the configurations in the frontline of your Spark job definition. The Native Execution Engine is integrated with live pools, so once you enable the feature, it takes effect immediately without requiring you to initiate a new session.

### Control on the query level

The mechanisms to enable the Native Execution Engine at the tenant, workspace, and environment levels, seamlessly integrated with the UI, are under active development. In the meantime, you can disable the native execution engine for specific queries, particularly if they involve operators that aren't currently supported (see [limitations](#limitations)). To disable, set the Spark configuration spark.native.enabled to false for the specific cell containing your query.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.native.enabled=FALSE; 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.native.enabled', 'false')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.native.enabled", "false")   
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.native.enabled", "false")
```

---

:::image type="content" source="media\native\disable.jpg" alt-text="Screenshot showing how to disable the native execution engine inside a notebook." lightbox="media\native\disable.jpg":::

After executing the query in which the native execution engine is disabled, you must re-enable it for subsequent cells by setting spark.native.enabled to true. This step is necessary because Spark executes code cells sequentially.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.native.enabled=TRUE; 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.native.enabled', 'true')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.native.enabled", "true")   
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.native.enabled", "true")
```

---

## Identify operations executed by the engine

There are several methods to determine if an operator in your Apache Spark job was processed using the native execution engine.

### Spark UI and Spark history server

Access the Spark UI or Spark history server to locate the query you need to inspect. To access the Spark web UI, navigate to your Spark Job Definition and run it. From the **Runs** tab, select the **...** next to the **Application name** and select **Open Spark web UI**. You can also access the Spark UI from the **Monitor** tab in the workspace. Select the notebook or pipeline, from the monitoring page, there's a direct link to the **Spark UI** for active jobs.

:::image type="content" source="media\native\spark-web-ui.png" alt-text="Screenshot showing how to navigate to the Spark web UI." lightbox="media\native\spark-web-ui.png":::

In the query plan displayed within the Spark UI interface, look for any node names that end with the suffix *Transformer*, *NativeFileScan, or *VeloxColumnarToRowExec*. The suffix indicates that the native execution engine executed the operation. For instance, nodes might be labeled as *RollUpHashAggregateTransformer*, *ProjectExecTransformer*, *BroadcastHashJoinExecTransformer*, *ShuffledHashJoinExecTransformer*, or *BroadcastNestedLoopJoinExecTransformer*.

:::image type="content" source="media\native\spark-ui.jpg" alt-text="Screenshot showing how to check DAG visualization that ends with the suffix Transformer." lightbox="media\native\spark-ui.jpg":::

### DataFrame explain

Alternatively, you can execute the `df.explain()` command in your notebook to view the execution plan. Within the output, look for the same *Transformer*, *NativeFileScan, or *VeloxColumnarToRowExec* suffixes. This method provides a quick way to confirm whether specific operations are being handled by the native execution engine.

:::image type="content" source="media\native\df-details.jpg" alt-text="Screenshot showing how to check the physical plan for your query, and see that the query was executed by the native execution engine." lightbox="media\native\df-details.jpg":::

### Fallback mechanism

In some instances, the native execution engine might not be able to execute a query due to reasons such as unsupported features. In these cases, the operation falls back to the traditional Spark engine. This **automatic** fallback mechanism ensures that there's no interruption to your workflow.

:::image type="content" source="media\native\fallback.jpg" alt-text="Screenshot showing the fallback mechanism." lightbox="media\native\fallback.jpg":::

:::image type="content" source="media\native\logs.jpg" alt-text="Screenshot showing how to check logs associated with the fallback mechanism." lightbox="media\native\logs.jpg":::

## Monitor Queries and DataFrames executed by the engine

To better understand how the Native Execution engine is applied to SQL queries and DataFrame operations, and to drill down to the stage and operator levels, you can refer to the Spark UI and Spark History Server for more detailed information about the native engine execution.

### Native Execution Engine Tab

You can navigate to the new 'Gluten SQL / DataFrame' tab to view the Gluten build information and query execution details. The Queries table provides insights into the number of nodes running on the Native engine and those falling back to the JVM for each query.

:::image type="content" source="media\native\native-execution-engine-tab.png" alt-text="Screenshot showing native execution engine tab." lightbox="media\native\native-execution-engine-tab.png":::

### Query Execution Graph

You can also select on the query description for the Apache Spark query execution plan visualization. The execution graph provides native execution details across stages and their respective operations. Background colors differentiate the execution engines: green represents the Native Execution Engine, while light blue indicates that the operation is running on the default JVM Engine.

:::image type="content" source="media\native\query-execution-graph.jpeg" alt-text="Screenshot showing query execution graph." lightbox="media\native\query-execution-graph.jpeg":::

## Limitations

While the Native Execution Engine (NEE) in Microsoft Fabric significantly boosts performance for Apache Spark jobs, it currently has the following limitations:

### Existing limitations

- **Incompatible Spark features**: Native execution engine doesn't currently support user-defined functions (UDFs), the `array_contains` function, or structured streaming. If these functions or unsupported features are used either directly or through imported libraries, Spark will revert to its default engine.

- **Unsupported file formats**: Queries against `JSON`, `XML`, and `CSV` formats aren't accelerated by native execution engine. These default back to the regular Spark JVM engine for execution.

- **ANSI mode not supported**: Native execution engine doesn't support ANSI SQL mode. If enabled, execution falls back to the vanilla Spark engine.

- **Date filter type mismatches**: To benefit from native execution engine's acceleration, ensure that both sides of a date comparison match in data type. For example, instead of comparing a `DATETIME` column with a string literal, cast it explicitly as shown:
  
  ```sql
  CAST(order_date AS DATE) = '2024-05-20'
  ```

### Other considerations and limitations

- **Decimal to Float casting mismatch**: When casting from `DECIMAL` to `FLOAT`, Spark preserves precision by converting to a string and parsing it. NEE (via Velox) performs a direct cast from the internal `int128_t` representation, which can result in rounding discrepancies.

- **Timezone configuration errors** : Setting an unrecognized timezone in Spark causes the job to fail under NEE, whereas Spark JVM handles it gracefully. For example:
  ```json
  "spark.sql.session.timeZone": "-08:00"  // May cause failure under NEE
  ```

- **Inconsistent rounding behavior**: The `round()` function behaves differently in NEE due to reliance on `std::round`, which doesn't replicate Spark’s rounding logic. This can lead to numeric inconsistencies in rounding results.

- **Missing duplicate key check in `map()` function**: When `spark.sql.mapKeyDedupPolicy` is set to _EXCEPTION_, Spark throws an error for duplicate keys. NEE currently skips this check and allows the query to succeed incorrectly.  
  Example:
  ```sql
  SELECT map(1, 'a', 1, 'b'); -- Should fail, but returns {1: 'b'}
  ```

- **Order variance in `collect_list()` with sorting**: When using `DISTRIBUTE BY` and `SORT BY`, Spark preserves the element order in `collect_list()`. NEE might return values in a different order due to shuffle differences, which can result in mismatched expectations for ordering-sensitive logic.

- **Intermediate type mismatch for `collect_list()` / `collect_set()`**: Spark uses `BINARY` as the intermediate type for these aggregations, whereas NEE uses `ARRAY`. This mismatch might lead to compatibility issues during query planning or execution.

> [!div class="nextstepaction"]
> [Watch this Fabric espresso video on native execution engine](https://youtu.be/8GJj4QlFlsw?si=r7M5VUI7NdyoR66v)

## Related content

- [Apache Spark Runtimes in Fabric](./runtime.md)
- [What is autotune for Apache Spark configurations in Fabric?](./autotune.md)
