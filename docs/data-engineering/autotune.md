---
title: Configure Spark Autotune
description: Learn how autotune auto-adjusts Apache Spark configurations, minimizing workload execution time and optimizing performance. You can enable or disable autotune.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom: build-2023
ms.date: 05/23/2023
---

# What is autotune for Apache Spark configurations in Fabric and how to enable and disable it?

Autotune automatically tunes Apache Spark configurations to minimize workload execution time and optimizes workloads. It empowers you to achieve more with less. This feature reduces execution time and surpasses the gains accomplished by manually tuned workloads by experts, which necessitate considerable effort and experimentation.

It leverages historical data execution from your workloads (Spark SQL queries) to iteratively learn the optimal configurations for a given workload and its execution time.

[!INCLUDE [preview-note](../includes/preview-note.md)]

> [!NOTE]
> Autotune Preview Availability: available in two production regions: West Central US and East US 2.

## Query tuning

Currently, autotune configures three query-level of Apache Spark configurations:

- `spark.sql.shuffle.partitions` - configures the number of partitions to use when shuffling data for joins or aggregations. Default is 200.
- `spark.sql.autoBroadcastJoinThreshold` - configures the maximum size in bytes for a table that will be broadcasted to all worker nodes when performing a join. Default is 10 MB.
- `spark.sql.files.maxPartitionBytes` - the maximum number of bytes to pack into a single partition when reading files. Works for Parquet, JSON and ORC file-based sources. Default is 128 MB.

Since there's no historical data available during the first run of autotune, configurations will be set based on a baseline model. This model relies on heuristics related to the content and structure of the workload itself. However, as the same query or workload is run repeatedly, we'll observe increasingly significant improvements from autotune. As the results of previous runs are used to fine-tune the model and tailor it to a specific workspace or workload. Autotune Query Tuning works for Spark SQL queries. 

> [!NOTE]
> As the algorithm explores various configurations, you may notice minor differences in results. This is expected, as autotune operates iteratively and improves with each repetition of the same query.

## Configuration tuning algorithm overview

For the first run of the query, upon submission, a machine learning (ML) model initially trained using standard open-source benchmark queries (e.g., TPC-DS) will guide the search around the neighbors of the current setting (starting from the default). Among the neighbor candidates, the ML model selects the best configuration with the shortest predicted execution time. In this run, the "centroid" is the default config, around which the autotune generates new candidates.

Based on the performance of the second run per suggested configuration, we retrain the ML model by adding the new observation from this query, and update the centroid by comparing the performance of the last two runs. If the previous run is better, the centroid will be updated in the inverse direction of the previous update (similar to the momentum approach in DNN training); if the new run is better, the latest configuration setting becomes the new centroid. Iteratively, the algorithm will gradually search in the direction with better performance.

## Enable or disable autotune

Autotune is disabled by default in two mentioned regions, and it's controlled by Apache Spark Configuration Settings. Easily enable Autotune within a session by running the following code in your notebook or adding it in your spark job definition code:

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

To disable Autotune, execute the following commands:

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

Microsoft follows Responsible AI Standard and this transparency note aims to provide clear documentation defining the intended uses of Autotune and the evidence that the feature is fit for purpose before the service becomes externally available. We understand the importance of transparency and ensuring that our customers have the necessary information to make informed decisions when using our services.

### Intended uses of the Autotune

The primary goal of Autotune is to optimize the performance of Apache Spark workloads by automating the process of Apache Spark configuration tuning. The system is designed to be used by data engineers, data scientists, and other professionals who are involved in the development and deployment of Apache Spark workloads. The intended uses of the Autotune include:

* Automatic tuning of Apache Spark configurations to minimize workload execution time to accelerate development process
* Reducing the manual effort required for Apache Spark configuration tuning
* Leveraging historical data execution from workloads to iteratively learn optimal configurations

### Evidence that the Autotune is fit for purpose

To ensure that Autotune meets the desired performance standards and is fit for its intended use, we have conducted rigorous testing and validation. The evidence includes:

1. Thorough internal testing and validation using various Apache Spark workloads and datasets to confirm the effectiveness of the autotuning algorithms
1. Comparisons with alternative Apache Spark configuration optimization techniques, demonstrating the performance improvements and efficiency gains achieved by Autotune
1. Customer case studies and testimonials showcasing successful applications of Autotune in real-world projects
1. Compliance with industry-standard security and privacy requirements, ensuring the protection of customer data and intellectual property


We want to assure that we prioritize data privacy and security. Your data will only be used to train the model that serves your specific workload. We take stringent measures to ensure that no sensitive information is used in our storage or training processes.
