---
title: Spark Basics
description: Understand core Spark concepts including partitions, skew, memory model, formats, UDF trade-offs, and baseline best practices.
author: eric-urban
ms.author: eur
ms.reviewer: anuve
ms.topic: concept-article
ms.date: 10/23/2025
---

# Spark Basics

Core concepts underpinning sizing, optimization, and troubleshooting. Read this first if you're new to Spark in Fabric.

## General Dos and Don'ts
##### Scenario: You're new to Spark. What are the Dos and Don'ts

| Use case | Best practices |
|---|---|
| Use optimized serialized formats | Do: Prefer formats like Avro, Parquet, or ORC because they embed schema, are compact, and are optimized for storage and processing. In Fabric, leverage Delta format for additional ACID guarantees and performance benefits |
| Be cautious with XML/JSON | Don't rely on schema inference for large JSON or XML files, as Spark reads the entire dataset to infer schema, which is slow and memory-intensive.<br/><br/>Provide a static master schema when reading JSON/XML or use `.option("samplingRatio", 0.1)` to speed up reads, but be aware that if the sample doesn't represent the full dataset, reads might fail. A safer approach is to infer schema from a representative sample and persist it for all reads.<br/><br/>Avoid parsing very large XML files. XML parsing is inherently slower due to tag processing and type casting. |
| Optimize joins & filtering | Do: Apply column pruning and row-level filtering before joins to reduce shuffle and memory usage.<br/><br/>Predicate pushdown is automatically handled by the Catalyst optimizer when using DataFrame APIs. Avoid using RDD APIs, as these bypass Catalyst optimizations. |
| Prefer DataFrames over RDDs | Do: Use DataFrames instead of RDDs for most operations. DataFrames leverage the Catalyst optimizer and Tungsten execution engine for efficient execution. |
| Enable adaptive query execution (AQE) | Do: Turn on AQE to dynamically optimize shuffle partitions and handle skewed data automatically. |

## Executor Memory Management

##### Scenario: You want to understand the executor memory management for performance tuning.

Even if an executor is configured with 56 GB memory, Spark does not allow all of it to be used directly for user data. Executor memory is divided and managed by Spark Core:

- **Reserved Memory:** A fixed portion reserved for system and Spark internal overhead (e.g., JVM, internals).

- **User Memory:** Stores UDFs, local variables, data structures (lists, maps, dictionaries), and objects created during computation.

- **Storage Memory:** Holds cached/persisted data, broadcast variables, and shuffle data that can be cached.

- **Execution Memory:** Used for intermediate computation (shuffles, joins, sorts, aggregations).

- **Dynamic Memory Sharing:** The boundary between Storage and Execution memory is movable. Spark can borrow memory from one region to the other, allowing flexible memory usage.

- **Spill:** Occurs when either Storage or Execution memory demand exceeds the memory available after borrowing. This forces data to be written to disk, which can impact performance.

    :::image type="content" source="media/spark-best-practices/spark-memory-management.png" alt-text="Diagram of Spark memory management and spilling." lightbox="media/spark-best-practices/spark-memory-management.png":::

## Out of Memory (OOM) Errors

##### Scenario: Spark jobs fail with Out of Memory (OOM) Errors.

**Driver OOM:**

Driver OOM errors occur when the Spark driver exceeds its allocated memory.

Common cause: driver-heavy operations such as `collect()`, `countByKey()`, or large `toPandas()` calls that pull too much data into driver memory.

Mitigation: Avoid driver-heavy operations whenever possible. If unavoidable, increase the driver size and benchmark to find the optimal configuration.

**Executor OOM:**

Executor OOM errors occur when a Spark executor exceeds its allocated memory.

Common cause: Memory- and compute-intensive transformations on large datasets (e.g., wide joins, aggregations, shuffles) or cached/persisted datasets that exceed the executor's available memory (execution + storage regions).

Mitigation: Increase executor memory if necessary, tune the Spark memory fractions (spark.memory.fraction, spark.memory.storageFraction) and persist selectively. Ensure that cached data fits into available memory.

**Data Skews**

Symptoms of skew:

- A few tasks take much longer than others in the Spark UI (stage tasks show heavy tail).  
- Large gap between median and max task times in stage metrics.  
- Stages with very large shuffle read or write sizes for a small number of partitions.

Common causes:

- Uneven data distribution for the join/group keys (hot keys).  
- Incorrect partitioning or too-few partitions for the data volume.  
- Upstream data anomalies that produce very large records or many null/empty keys.

Mitigation:

- Repartition or coalesce to increase partition parallelism and balance sizes.  
- Apply key salting or custom partitioning to spread hot keys across partitions.  
- Use AQE (Adaptive Query Execution) to coalesce post-shuffle partitions and enable skew-join optimizations.  
- Use broadcast joins for small lookup tables to avoid shuffles entirely.  
- Persist balanced intermediate datasets before expensive stages and re-run the job.

## UDF Best Practices 

##### Scenario: You need to apply custom logic that cannot be expressed via built-in DataFrame functions.

Leverage Spark DataFrame APIs whenever possible. Built-in functions are optimized by the Catalyst optimizer and run natively on the JVM, so they deliver the best performance.

If you must use a UDF (User Defined Function), avoid regular PySpark Python UDFs. Instead, consider the following alternatives:

- Pandas UDFs (a.k.a. Vectorized UDFs): It leverages Apache Arrow for efficient data transfer between JVM and Python. They allow vectorized operations, significantly improving performance compared to row-by-row Python UDFs.

- Scala/Java UDFs: Runs directly on the JVM, avoiding Python serialization overhead. These typically outperform Python UDFs.

Be cautious with Python UDFs. Each executor launches a separate Python process, and data must be serialized/deserialized between the JVM and Python. This creates a performance bottleneck, particularly at scale. 

## Error Logging

##### Scenario: Best Practices for Error Logging in Fabric Spark

1. Use `log4j` instead of `print()` that is heavy on the driver. With `log4j`, logs will be available in driver logs and searchable (With logger name for eg: PySparkLogger).

    :::image type="content" source="media/spark-best-practices/spark-event-logs.jpeg" alt-text="Diagram of Spark logs." lightbox="media/spark-best-practices/spark-event-logs.jpeg":::

1. Wrap reads, writes, and transformations in try/except blocks. Use `logger.error` for exceptions and `logger.info` for progress messages.

- **Python logging:** Ideal for logging operations, status updates, or debugging information from code that executes only on the Spark Driver. Python's logging module does not propagate to executor logs. Reference: /fabric/data-engineering/author-execute-notebook#python-logging-in-a-notebook

- **Spark log4j:** A standard for robust, production-level application logging in Spark as it integrates natively with Spark's driver/executor logs.

    Sample log4j usage in PySpark:

    ```python
    import traceback
    # Get log4j logger
    log4jLogger = spark._jvm.org.apache.log4j
    logger = log4jLogger.LogManager.getLogger("PySparkLogger")
    logger.info("Application started.")
    try:
       # Create DataFrame with 20 records
       data = [(f"Name{i}", i) for i in range(1, 21)]  # 20 records
       df = spark.createDataFrame(data, ["name", "age"])
       logger.info("DataFrame created successfully with 20 records.")
       df.show(s)  # 's' is not defined -> will throw error but the application will not fail
    except Exception as e:
       logger.error(f"Error while creating or showing DataFrame: {str(e)}\n{traceback.format_exc()}")
    ```


1. Centralize error monitoring:

- Use diagnostic emitter extension ([Monitor Apache Spark applications with Azure Log Analytics](/fabric/data-engineering/azure-fabric-diagnostic-emitters-log-analytics#available-apache-spark-configurations)) in environment and attach to the Notebooks running Spark applications. The emitter can send event logs, custom logs (like log4j) and metrics to Azure Log Analytics/Azure Storage/Azure Event Hubs. Pass the log4j name to the property: `spark.synapse.diagnostic.emitter.\<destination\>.filter.loggerName.match`.

- Additionally for debugging, you can also collect failed rows/records to LH tables for record level bad data capture.

## Related content

- [Fabric Spark Best Practices Overview](./spark-best-practices-overview.md)
- [Fabric Spark Capacity and Cluster Planning](spark-best-practices-capacity-planning.md)
- [Fabric Spark Security](spark-best-practices-security.md)
- [Development and Monitoring](spark-best-practices-development-monitoring.md)
