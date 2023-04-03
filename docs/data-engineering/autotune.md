---
title: Spark autotune configuration and how to Enable or disable it?
description: Learn how autotune auto-adjusts Spark configurations, minimizing workload execution time and optimizing performance. You can enable or disable autotune.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.date: 03/22/2023
---

# What is Spark autotune configuration and how to Enable or disable it?
> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Autotune automatically tunes Spark configurations to minimize workload execution time and optimizes workloads. It empowers you to achieve more with less. This feature reduces execution time and surpasses the gains accomplished by manually tuned workloads by experts, which necessitate considerable effort and experimentation.

It leverages historical data execution from your workloads to iteratively learn the optimal configurations for a given workload and its execution time.

## Query tuning

Currently, autotune configures three query-level Spark configurations:
* `spark.sql.shuffle.partitions` - configures the number of partitions to use when shuffling data for joins or aggregations. Default is 200.
* `spark.sql.autoBroadcastJoinThreshold` - configures the maximum size in bytes for a table that will be broadcasted to all worker nodes when performing a join. Default is 10 MB.
* `spark.sql.files.maxPartitionBytes` - the maximum number of bytes to pack into a single partition when reading files. Works for Parquet, JSON and ORC file-based sources. Default is 128 MB.


Since there's no historical data available during the first run of autotune, configurations will be set based on a baseline model. This model relies on heuristics related to the content and structure of the workload itself. However, as the same query or workload is run repeatedly, we'll observe increasingly significant improvements from autotune. As the results of previous runs are used to fine-tune the model and tailor it to a specific workspace or workload.

>[!NOTE]
> As the algorithm explores various configurations, you may notice minor differences in results. This is expected, as autotune operates iteratively and improves with each repetition of the same query.

## Configuration tuning algorithm overview
For the first run of the query, upon submission, a machine learning (ML) model initially trained using standard open-source benchmark queries (e.g., TPC-DS) will guide the search around the neighbors of the current setting (starting from the default). Among the neighbor candidates, the ML model selects the best configuration with the shortest predicted execution time. In this run, the "centroid" is the default config, around which the autotune generates new candidates.

Based on the performance of the second run per suggested configuration, we retrain the ML model by adding the new observation from this query, and update the centroid by comparing the performance of the last two runs. If the previous run is better, the centroid will be updated in the inverse direction of the previous update (similar to the momentum approach in DNN training); if the new run is better, the latest configuration setting becomes the new centroid. Iteratively, the algorithm will gradually search in the direction with better performance.


## Enable or disable autotune

Autotune is enabled by default and it's controlled by Apache Spark Configuration Settings. To verify and confirm its activation, use the following commands:
1. SQL
   ```sql
   %%sql 
   SET spark.ms.autotune.queryTuning.enabled 
   ```
1. Python 
   ```python
   %%pyspark  
   spark.conf.get('spark.ms.autotune.queryTuning.enabled')   
   ```
1. Scala 
   ```scala
   %%spark  
   spark.conf.get("spark.ms.autotune.queryTuning.enabled") 
   ```
1. R
   ```r
   %%sparkr
   library(SparkR)
   sparkR.conf("spark.ms.autotune.queryTuning.enabled")
   ```

To disable Autotune, execute the following commands:
1. SQL
   ```
   %%sql 
   SET spark.ms.autotune.queryTuning.enabled=FALSE 
   ```
1. Python 
   ```
   %%pyspark  
   spark.conf.set('spark.ms.autotune.queryTuning.enabled', 'false')   
   ```
1. Scala 
   ```
   %%spark  
   spark.conf.set("spark.ms.autotune.queryTuning.enabled", "false") 
   ```
1. R
   ```
   %%sparkr
   library(SparkR)
   sparkR.conf("spark.ms.autotune.queryTuning.enabled", "false")
   ```

Easily enable Autotune within a session by running the following code in your notebook or adding it in your spark job definition code: 

1. SQL
   ```
   %%sql 
   SET spark.ms.autotune.queryTuning.enabled=TRUE 
   ```
1. Python 
   ```
   %%pyspark  
   spark.conf.set('spark.ms.autotune.queryTuning.enabled', 'true')   
   ```
1. Scala 
   ```
   %%spark  
   spark.conf.set("spark.ms.autotune.queryTuning.enabled", "true") 
   ```
1. R
   ```
   %%sparkr
   library(SparkR)
   sparkR.conf("spark.ms.autotune.queryTuning.enabled", "true")
   ```
