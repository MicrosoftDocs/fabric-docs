---
title: Native Execution Engine for Fabric Spark
description: How to enable and use the Native Execution Engine for executing Apache Spark Jobs (Notebooks and SJDs) for faster and eventually cheaper data processing in Microsoft Fabric
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom:
ms.date: 5/12/2024
---

# Native Execution Engine for Fabric Spark

The Native Execution Engine is a groundbreaking enhancement for Apache Spark job executions on Microsoft Fabric. This vectorized engine optimizes the performance and efficiency of your Spark queries by running them directly on your lakehouse infrastructure. Designed for seamless integration, it requires no code modifications and avoids vendor lock-in. **It supports Apache Spark APIs and is compatible with Runtime 1.2 (Spark 3.4), and works with both Parquet and Delta formats. Regardless of the data's location within OneLake or if accessed via shortcuts, the Native Execution Engine is engineered to maximize efficiency and performance.** 

The Native Execution Engine significantly elevates query performance while minimizing operational costs. It delivers a remarkable speed enhancement, achieving up to 4x faster performance compared to traditional OSS (Open source software) Spark as validated by the TPC-DS 1 TB benchmark. This engine is adept at managing a wide array of data processing scenarios—ranging from routine data ingestion, batch jobs, and ETL tasks to complex data science analytics and responsive interactive queries. Users benefit from not only accelerated processing times but also from heightened throughput, optimized resource utilization.

This documentation provides you with detailed steps on how to enable and effectively use the Native Execution Engine for your Spark applications on Microsoft Fabric.  

> [!NOTE]
> The Native Execution Engine is currently in a preview stage. To learn more, see the [limitations](./native-execution-engine-overview.md#limitations).


## When to Use the Native Execution Engine 

The Native Execution Engine offers a solution for running queries on large-scale data sets, optimizing performance by using the native capabilities of underlying data sources and minimizing the overhead typically associated with data movement and serialization in traditional Spark environments. While it supports various operators and data types—including rollup hash aggregate, broadcast nested loop join (BNLJ), and precise timestamp formats—it's important to recognize its optimal use cases to fully benefit from its capabilities. 

Key scenarios where the Native Execution Engine excels: 
* The engine is effective when working with data in Parquet and Delta formats, which it can process natively and efficiently. 
* Queries that involve intricate transformations and aggregations benefit significantly from the columnar processing and vectorization capabilities of the engine.  
* The performance enhancement is most notable in scenarios where the queries don't trigger the fallback mechanism by avoiding unsupported features or expressions. 
* The engine is well-suited for queries that are computationally intensive rather than simple or I/O-bound. 


## Enable the Native Execution Engine
To use the full capabilities of the Native Execution Engine in Microsoft Fabric, during the preview phase, specific configurations are necessary. This section provides a detailed guide on activating this feature for individual notebooks or Spark Job Definitions (SJDs), and universally across your environment. 

> [!IMPORTANT]
> The Native Execution Engine currently supports the latest GA runtime version, which is [Runtime 1.2 (Apache Spark 3.4, Delta Lake 2.4)](./runtime-1-2.md). 

### Enable for individual notebook or SJD 

To enable the Native Execution Engine for a single notebook or SJD, you must incorporate the necessary configurations at the beginning of your execution script: 

```json
%%configure 
{ 
   "conf": { 
       "spark.gluten.enabled": "true", 
       "spark.shuffle.manager": "org.apache.spark.shuffle.sort.ColumnarShuffleManager" 
   } 
} 
```

For Notebooks-insert the required configuration commands in the first cell. For SJDs-include the configurations in the frontline of your Spark job definition. 

:::image type="content" source="media\native\enable.jpg" alt-text="Screenshot showcasing how to enable the Native Execution Engine inside the notebook." lightbox="media\native\enable.jpg":::


The Native Execution Engine is integrated with custom pools, meaning that enabling this feature initiates a new session, typically taking up to two minutes to start.

> [!IMPORTANT]
> Configuration of the Native Execution Engine must be done prior to the initiation of the Spark session. Once the Spark session starts, "spark.shuffle.manager" setting become immutable and cannot be changed. Ensure that these configurations are set within the %%configure block in notebooks or in the Spark session builder for SJDs. 


### Enable on the environmental level 

You can enable the Native Execution Engine across all jobs and notebooks associated with your environment ensures uniform performance enhancement: 
1. Navigate to your environment settings. 
2. Go to Spark properties 
3. Add Spark properties as presented on the screenshot 

|        Property       |                         Value                        |
|:---------------------:|:----------------------------------------------------:|
|  spark.gluten.enabled |                         true                         |
| spark.shuffle.manager | org.apache.spark.shuffle.sort.ColumnarShuffleManager |

:::image type="content" source="media\native\enable-env.jpg" alt-text="Screenshot showcasing how to enable the Native Execution Engine inside the environment item." lightbox="media\native\enable-env.jpg":::


When enabled at the environmental level, the Native Execution Engine setting is inherited by all subsequent jobs and notebooks. This inheritance ensures that any new sessions or resources created under this environment automatically benefit from the enhanced execution capabilities. 


### Control on the query level

You can disable the Native Execution Engine for specific queries, particularly if they involve operators that aren't currently supported (review [limitations](./native-execution-engine-overview.md#limitations)). To do this, set the Spark configuration spark.gluten.enabled to false for the specific cell containing your query. 

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

:::image type="content" source="media\native\disable.jpg" alt-text="Screenshot showcasing how to disable the Native Execution Engine inside the notebook." lightbox="media\native\disable.jpg":::


After executing the query in which the Native Execution Engine is disabled, ensure you re-enable it for subsequent cells by setting spark.gluten.enabled to true. This is necessary because Spark executes code cells sequentially:

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


## Identify operations executed by the Native Execution Engine 
There are several methods to determine if an operator in your Apache Spark job was processed using the Native Execution Engine.

### Using the Spark UI and Spark History Server 

Access the Spark UI or Spark History Server to locate the query you need to inspect. In the query plan displayed within the interface, look for any node names that end with the suffix 'Transformer'. This indicates that the operation has been executed by the Native Execution Engine. For instance, nodes might be labeled as 'RollUpHashAggregateTransformer', 'ProjectExecTransformer', 'BroadcastHashJoinExecTransformer', 'ShuffledHashJoinExecTransformer' or 'BroadcastNestedLoopJoinExecTransformer'. 

:::image type="content" source="media\native\sparkui.jpg" alt-text="Screenshot showcasing how to check DAG visualization that end with the suffix Transformer, what indicated that it comes from, Native Execution Engine." lightbox="media\native\sparkui.jpg":::


### Using DataFrame Explain 

Alternatively, you can execute the df.explain() command in your notebook to view the execution plan. Within this output, look for the same "Transformer" suffixes. This method provides a straightforward way to confirm whether specific operations are being handled by the Native Execution Engine. 
 
:::image type="content" source="media\native\dfdetails.jpg" alt-text="Screenshot showcasing how to check physical plan for your query and see that the query was executed by Native Execution Engine." lightbox="media\native\dfdetails.jpg":::

### Fallback Mechanism 

Note that in some instances, the Native Execution Engine may not be able to execute a query due to reasons such as unsupported features. In these cases, the operation fallbacks to the traditional Spark engine. This fallback mechanism ensures that there's no interruption to your workflow. 

:::image type="content" source="media\native\fallback.jpg" alt-text="Screenshot showcasing the fallback mechanism." lightbox="media\native\fallback.jpg":::


:::image type="content" source="media\native\logs.jpg" alt-text="Screenshot showcasing how to check logs associated with the fallback mechanism." lightbox="media\native\logs.jpg":::


## Limitations

While the Native Execution Engine enhances performance for Apache Spark jobs, note its current preview-related limitations. 

* The engine does not support partitioned writing for Delta tables. Some Delta-specific operations aren't supported, including merge operations, checkpoint scans, and deletion vectors.
* Certain Spark features and expressions aren't compatible with the Native Execution Engine, such as user-defined functions (UDFs) and the array contains function as well as Spark Structured Streaming.
* Scans from storage solutions that utilize private endpoints aren't supported.
* The engine fallbacks to the traditional Spark engine when user code *jar libraries that are used and uploaded to executors.
* Native doesn't support ANSI mode, so it's looking and once ANSI mode is enabled it fallbacks to Vanilla Spark.


> [!NOTE]
> As the Native Execution Engine is currently in preview, your insights are important to us. We invite you to share the feedback and outcomes of your evaluations directly with our product team. Please fill out [the form provided](https://forms.office.com/r/zuZaK9cuLm) to initiate a streamlined communication process. We look forward to your valuable input and are eager to discuss your findings in detail. 


## Related content

* Read about [Apache Spark Runtimes in Fabric.](./runtime.md)
* [Automatically get your Apache Spark configuration adjusted to speed up workload execution and to optimize overall performance with Autotune.](./autotune.md)
