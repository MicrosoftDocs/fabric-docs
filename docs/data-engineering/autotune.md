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

# What is autotune for Apache Spark configurations in Fabric and how to enable and disable it?

Autotune automatically tunes Apache Spark configurations to minimize workload execution time and optimizes workloads. It empowers you to achieve more with less. This feature reduces execution time and surpasses the gains accomplished by manually tuned workloads by experts, which require considerable effort and experimentation.

Autotune uses historical data execution from your workloads (Spark SQL queries) to iteratively learn the optimal configurations for a given workload and its execution time.

> [!NOTE]
> The autotune preview is available in two production regions: West Central US and East US 2.

## Query tuning

Currently, autotune configures three query levels of Apache Spark configurations:

- `spark.sql.shuffle.partitions` - Configures the number of partitions to use when shuffling data for joins or aggregations. Default is 200.
- `spark.sql.autoBroadcastJoinThreshold` - Configures the maximum size in bytes for a table that is broadcasted to all worker nodes when performing a join. Default is 10 MB.
- `spark.sql.files.maxPartitionBytes` - Defines the maximum number of bytes to pack into a single partition when reading files. Works for Parquet, JSON, and ORC file-based sources. Default is 128 MB.

Since there's no historical data available during the first run of autotune, configurations are set based on a baseline model. This model relies on heuristics related to the content and structure of the workload itself. However, as the same query or workload is run repeatedly, we observe increasingly significant improvements from autotune because the results of previous runs are used to fine-tune the model and tailor it to a specific workspace or workload. Autotune query tuning works for Spark SQL queries.

> [!NOTE]
> As the algorithm explores various configurations, you may notice minor differences in results. This is expected, as autotune operates iteratively and improves with each repetition of the same query.

## Configuration tuning algorithm overview

For the first run of the query, upon submission, a machine learning (ML) model initially trained using standard open-source benchmark queries (for example, TPC-DS) guides the search around the neighbors of the current setting (starting from the default). Among the neighbor candidates, the ML model selects the best configuration with the shortest predicted execution time. In this run, the "centroid" is the default config, around which the autotune generates new candidates.

Based on the performance of the second run per suggested configuration, we retrain the ML model by adding the new observation from this query, and update the centroid by comparing the performance of the last two runs. If the previous run is better, the centroid is updated in the inverse direction of the previous update (like the momentum approach in deep neural network (DNN) training); if the new run is better, the latest configuration setting becomes the new centroid. Iteratively, the algorithm gradually searches in the direction with better performance.

## Enable or disable autotune

Autotune is disabled by default in two mentioned regions, and you control it through Apache Spark configuration settings. You can easily enable autotune within a session by running the following code in your notebook or adding it to your Spark job definition code:

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.ms.autotune.queryTuning.enabled=TRUE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.ms.autotune.queryTuning.enabled', 'true')
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.ms.autotune.queryTuning.enabled", "true") 
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.ms.autotune.queryTuning.enabled", "true")
```

---

To verify and confirm its activation, use the following commands:

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
GET spark.ms.autotune.queryTuning.enabled
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.get('spark.ms.autotune.queryTuning.enabled')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.get('spark.ms.autotune.queryTuning.enabled')  
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.ms.autotune.queryTuning.enabled")
```

---

To disable autotune, execute the following commands:

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.ms.autotune.queryTuning.enabled=FALSE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.ms.autotune.queryTuning.enabled', 'false')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set('spark.ms.autotune.queryTuning.enabled', 'false')   
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.ms.autotune.queryTuning.enabled", "false")
```

---

## Transparency note

Microsoft follows the Responsible AI Standard and includes this transparency note to document the intended uses of autotune and evidence that the feature is fit for purpose before the service becomes externally available. We understand the importance of transparency and providing our customers with the necessary information to make informed decisions when using our services.

### Intended uses of autotune

The primary goal of autotune is to optimize the performance of Apache Spark workloads by automating the process of Apache Spark configuration tuning. The system is designed to be used by data engineers, data scientists, and other professionals who are involved in the development and deployment of Apache Spark workloads. The intended uses of autotune include:

- Automatic tuning of Apache Spark configurations to minimize workload execution time to accelerate development process
- Reducing the manual effort required for Apache Spark configuration tuning
- Leveraging historical data execution from workloads to iteratively learn optimal configurations

### Evidence that autotune is fit for purpose

To ensure that autotune meets the desired performance standards and is fit for its intended use, we have conducted rigorous testing and validation. The evidence includes:

- Thorough internal testing and validation using various Apache Spark workloads and datasets to confirm the effectiveness of the autotuning algorithms
- Comparisons with alternative Apache Spark configuration optimization techniques, demonstrating the performance improvements and efficiency gains achieved by autotune
- Customer case studies and testimonials showcasing successful applications of autotune in real-world projects
- Compliance with industry-standard security and privacy requirements, ensuring the protection of customer data and intellectual property

We prioritize data privacy and security. Your data is only used to train the model that serves your specific workload. We take stringent measures to ensure that no sensitive information is used in our storage or training processes.

## Related content

- [Concurrency limits and queueing in Microsoft Fabric Spark](spark-job-concurrency-and-queueing.md)
