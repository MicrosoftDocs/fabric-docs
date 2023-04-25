---
title: Configure Spark Autotune
description: Learn how autotune auto-adjusts Spark configurations, minimizing workload execution time and optimizing performance. You can enable or disable autotune.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.date: 05/23/2023
---

# What is Spark autotune configuration in Fabric and how to enable and disable it?

[!INCLUDE [preview-note](../includes/preview-note.md)]

Autotune automatically tunes Spark configurations to minimize workload execution time and optimizes workloads. It empowers you to achieve more with less. This feature reduces execution time and surpasses the gains accomplished by manually tuned workloads by experts, which necessitate considerable effort and experimentation.

It leverages historical data execution from your workloads to iteratively learn the optimal configurations for a given workload and its execution time.

## Query tuning

Currently, autotune configures three query-level Spark configurations:

- `spark.sql.shuffle.partitions` - configures the number of partitions to use when shuffling data for joins or aggregations. Default is 200.
- `spark.sql.autoBroadcastJoinThreshold` - configures the maximum size in bytes for a table that will be broadcasted to all worker nodes when performing a join. Default is 10 MB.
- `spark.sql.files.maxPartitionBytes` - the maximum number of bytes to pack into a single partition when reading files. Works for Parquet, JSON and ORC file-based sources. Default is 128 MB.

Since there's no historical data available during the first run of autotune, configurations will be set based on a baseline model. This model relies on heuristics related to the content and structure of the workload itself. However, as the same query or workload is run repeatedly, we'll observe increasingly significant improvements from autotune. As the results of previous runs are used to fine-tune the model and tailor it to a specific workspace or workload.

> [!NOTE]
> As the algorithm explores various configurations, you may notice minor differences in results. This is expected, as autotune operates iteratively and improves with each repetition of the same query.

## Configuration tuning algorithm overview

For the first run of the query, upon submission, a machine learning (ML) model initially trained using standard open-source benchmark queries (e.g., TPC-DS) will guide the search around the neighbors of the current setting (starting from the default). Among the neighbor candidates, the ML model selects the best configuration with the shortest predicted execution time. In this run, the "centroid" is the default config, around which the autotune generates new candidates.

Based on the performance of the second run per suggested configuration, we retrain the ML model by adding the new observation from this query, and update the centroid by comparing the performance of the last two runs. If the previous run is better, the centroid will be updated in the inverse direction of the previous update (similar to the momentum approach in DNN training); if the new run is better, the latest configuration setting becomes the new centroid. Iteratively, the algorithm will gradually search in the direction with better performance.

## Enable or disable autotune

Autotune is disabled by default and it's controlled by Apache Spark Configuration Settings. Easily enable Autotune within a session by running the following code in your notebook or adding it in your spark job definition code:

1. SQL
   ```sql
   %%sql 
   SET spark.ms.autotune.queryTuning.enabled=TRUE 
   ```
1. Python
   ```python
   %%pyspark
   spark.conf.set('spark.ms.autotune.queryTuning.enabled', 'true')   
   ```
1. Scala 
   ```scala
   %%spark  
   spark.conf.set("spark.ms.autotune.queryTuning.enabled", "true") 
   ```
1. R
   ```r
   %%sparkr
   library(SparkR)
   sparkR.conf("spark.ms.autotune.queryTuning.enabled", "true")
   ```

To verify and confirm its activation, use the following commands:
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
   ```sql
   %%sql 
   SET spark.ms.autotune.queryTuning.enabled=FALSE 
   ```
1. Python 
   ```python
   %%pyspark  
   spark.conf.set('spark.ms.autotune.queryTuning.enabled', 'false')   
   ```
1. Scala 
   ```scala
   %%spark
   spark.conf.set("spark.ms.autotune.queryTuning.enabled", "false") 
   ```
1. R
   ```r
   %%sparkr
   library(SparkR)
   sparkR.conf("spark.ms.autotune.queryTuning.enabled", "false")
   ```

## Transparency note

Microsoft follows Responsible AI Standard and this transparency note aims to provide clear documentation defining the intended uses of Autotune and the evidence that the feature is fit for purpose before the service becomes externally available. We understand the importance of transparency and ensuring that our customers have the necessary information to make informed decisions when using our services.

### Intended uses of the Autotune
The primary goal of Autotune is to optimize the performance of Spark workloads by automating the process of Spark configuration tuning. The system is designed to be used by data engineers, data scientists, and other professionals who are involved in the development and deployment of Spark workloads. The intended uses of the Autotune include:
1. Automatic tuning of Spark configurations to minimize workload execution time
1. Accelerating the Spark workload development process
1. Reducing the manual effort required for Spark configuration tuning
1. Leveraging historical data execution from workloads to iteratively learn optimal configurations

### Evidence that the Autotune is fit for purpose
To ensure that Autotune meets the desired performance standards and is fit for its intended use, we have conducted rigorous testing and validation. The evidence includes:
1. Thorough internal testing and validation using various Spark workloads and datasets to confirm the effectiveness of the autotuning algorithms
1. Comparisons with alternative Spark configuration optimization techniques, demonstrating the performance improvements and efficiency gains achieved by Autotune
1. Customer case studies and testimonials showcasing successful applications of Autotune in real-world projects
1. Compliance with industry-standard security and privacy requirements, ensuring the protection of customer data and intellectual property


We want to assure that we prioritize data privacy and security. Your data will only be used to train the model that serves your specific workload. We take stringent measures to ensure that no sensitive information is used in our storage or training processes.
