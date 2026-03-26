---
title: Data streaming into a lakehouse with Spark
description: Learn about Spark structured streaming for ingesting data into a lakehouse, optimizing write performance, and running production streaming jobs.
ms.reviewer: tvilutis
ms.topic: concept-article
ms.date: 02/24/2026
ms.search.form: Lakehouse Spark Structured Streaming
---

# Data streaming into a lakehouse with Spark

Structured streaming is a scalable, fault-tolerant stream processing engine built on Spark. It treats a live data stream as a table that new rows are continuously appended to. Structured Streaming supports built-in file sources such as CSV, JSON, ORC, and Parquet, along with messaging services like Kafka and Azure Event Hubs.

This article covers setting up a streaming source such as Azure Event Hubs, ingesting streaming data into a lakehouse Delta table, optimizing write performance with partitioning and event batching, and running streaming jobs reliably in production.

## Set up a streaming source

To stream data into a lakehouse, first configure a connection to your streaming source. Azure Event Hubs is a common choice. Use the [Azure Event Hubs Connector for Apache Spark](https://github.com/Azure/azure-event-hubs-spark) to connect your Spark application to Azure Event Hubs.

A basic Event Hubs configuration requires the Event Hubs namespace name, hub name, shared access key name, and consumer group.

A consumer group is a view of an entire event hub. Consumer groups enable multiple consuming applications to each have a separate view of the eventstream and to read the stream independently at their own pace and with their own offsets.

Partitions in Event Hubs allow you to process large volumes of events in parallel. A single processor has a limited capacity for handling events per second, while multiple processors can work in parallel across partitions.

If too many partitions are used with a low ingestion rate, partition readers deal with a small portion of data, causing nonoptimal processing. The ideal number of partitions depends on the desired processing rate. As you increase the number of throughput units in your namespace, you might want extra partitions to allow concurrent readers to achieve their maximum throughput.

Test the best number of partitions for your throughput scenario. Scenarios with high throughput commonly use 32 or more partitions.

## Delta table as a streaming sink

Delta Lake is an open-source storage layer that provides ACID (atomicity, consistency, isolation, and durability) transactions on top of data lake storage. In Fabric Data Engineering, Delta Lake supports upserts, data compaction, time travel, schema evolution, and open-format storage.

With `delta` as the output format in `writeStream`, streaming data flows directly into a Delta table. The following example reads from Event Hubs, parses the message body, and writes to a Delta table:

```python
import pyspark.sql.functions as f
from pyspark.sql.types import *

df = (
    spark.readStream
    .format("eventhubs")
    .options(**ehConf)
    .load()
)

Schema = StructType([
    StructField("<column_name_01>", StringType(), False),
    StructField("<column_name_02>", StringType(), False),
    StructField("<column_name_03>", DoubleType(), True),
    StructField("<column_name_04>", LongType(), True),
    StructField("<column_name_05>", LongType(), True),
])

rawData = (
    df
    .withColumn("bodyAsString", f.col("body").cast("string"))
    .select(f.from_json("bodyAsString", Schema).alias("events"))
    .select("events.*")
    .writeStream
    .format("delta")
    .option("checkpointLocation", "Files/checkpoint")
    .outputMode("append")
    .toTable("deltaeventstable")
)
```

In the code, `format("delta")` sets Delta as the output format, `outputMode("append")` writes only new rows to the table, and `toTable("deltaeventstable")` persists the streamed data to a managed Delta table.

## Optimize streaming performance

Once basic streaming ingestion works, you can improve throughput and file organization with the optimization techniques in the following sections.

### Partition data for writes

To optimize throughput, partition your data effectively. Partitioning improves both write throughput and downstream query performance. You can partition data in memory, on disk, or both.

**On disk** — Use `partitionBy()` to organize data into subdirectories based on column values. Choose columns with good cardinality that produce optimally sized files. Avoid columns that create too many tiny partitions or too few large ones.

**In memory** — Use `repartition()` or `coalesce()` to distribute data across worker nodes before writing:

- `repartition()` increases or decreases partitions with a full shuffle, balancing data evenly.
- `coalesce()` only decreases partitions, minimizing data movement.

Combining both approaches works well for high-throughput scenarios. The following example splits data into 48 partitions in memory (matching available CPU cores) and then partitions on disk by two columns:

```python
rawData = (
    df
    .withColumn("bodyAsString", f.col("body").cast("string"))
    .select(f.from_json("bodyAsString", Schema).alias("events"))
    .select("events.*")
    .repartition(48)
    .writeStream
    .format("delta")
    .option("checkpointLocation", "Files/checkpoint")
    .outputMode("append")
    .partitionBy("<column_name_01>", "<column_name_02>")
    .toTable("deltaeventstable")
)
```

### Use Optimized Write

As an alternative to manual partitioning, Optimized Write merges or splits partitions before writing, maximizing disk throughput without manual `repartition()` or `coalesce()` calls. Enable it with a Spark configuration:

```python
spark.conf.set("spark.databricks.delta.optimizeWrite.enabled", True)
```

With Optimized Write enabled, you can remove `repartition()` or `coalesce()` from your code and let Spark handle partition sizing. You can still use `partitionBy()` for disk-level organization.

### Batch events with triggers

To further optimize write performance, batch events before writing them to disk. By default, Spark processes each microbatch as soon as the previous one completes. Setting a trigger interval accumulates data over a time period and writes it in fewer, larger operations. Larger batches produce bigger Delta files and reduce small-file overhead.

The following example processes events in one-minute intervals:

```python
rawData = (
    df
    .withColumn("bodyAsString", f.col("body").cast("string"))
    .select(f.from_json("bodyAsString", Schema).alias("events"))
    .select("events.*")
    .writeStream
    .format("delta")
    .option("checkpointLocation", "Files/checkpoint")
    .outputMode("append")
    .partitionBy("<column_name_01>", "<column_name_02>")
    .trigger(processingTime="1 minute")
    .toTable("deltaeventstable")
)
```

Analyze the volume of incoming data and choose a processing interval that produces well-sized Parquet files in the Delta table.

## Run streaming jobs in production

Spark notebooks are an effective tool for developing and testing streaming logic. However, for production workloads that need to run continuously, use Spark job definitions instead. Spark job definitions are non-interactive, code-oriented tasks that run on a Spark cluster and provide greater robustness and availability.

The infrastructure running a streaming job can encounter issues that stop the job, such as hardware failures or infrastructure patching. A retry policy automatically restarts the job when it stops unexpectedly. Configure the retry policy on a Spark job definition to specify how many times to restart the job (up to infinite retries) and the time interval between retries. With a retry policy enabled, your streaming job continues running until you explicitly stop it.

The [Fabric monitoring hub](spark-monitoring-overview.md) includes a Structured Streaming tab with metrics including Input Rate, Process Rate, Input Rows, Batch Duration, and Operation Duration.

## Related content

- [Get streaming data into a lakehouse and access with the SQL analytics endpoint](get-started-streaming.md)
- [Get streaming data into lakehouse with eventstreams](../real-time-intelligence/event-streams/add-destination-lakehouse.md)
