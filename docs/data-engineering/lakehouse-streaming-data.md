---
title: Streaming data into lakehouse
description: Learn how to use Spark structured streaming and retry policy to set up streaming jobs to get data into lakehouse.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Lakehouse Spark Structured Streaming
---

# Get streaming data into lakehouse with Spark structured streaming

Structured Streaming is a scalable and fault-tolerant stream processing engine built on Spark. Spark takes care of running the streaming operation incrementally and continuously as data continues to arrive.

Structured streaming became available in Spark 2.2. Since then, it has been the recommended approach for data streaming. The fundamental principle behind structured stream is to treat a live data stream as a table where new data is always continuously appended, like a new row in a table. There are a few defined built-in streaming file sources such as CSV, JSON, ORC, Parquet and built-in support for messaging services like Kafka and Event Hubs.

This article provides insights into how to optimize the processing and ingestion of events through Spark structure streaming in production environments with high throughput. The suggested approaches include:

* Data streaming throughput optimization
* Optimizing write operations in the delta table and
* Event batching

## Spark job definitions and Spark notebooks

Spark notebooks are an excellent tool for validating ideas and doing experiments to get insights from your data or code. Notebooks are widely used in data preparation, visualization, machine learning, and other big data scenarios. Spark job definitions are non-interactive code-oriented tasks running on a Spark cluster for long periods. Spark job definitions provide robustness and availability.

Spark notebooks are excellent source to test the logic of your code and address all the business requirements. However to keep it running in a production scenario, Spark job definitions with Retry Policy enabled are the best solution.

## Retry policy for Spark Job Definitions

In Microsoft Fabric, the user can set a retry policy for Spark Job Definition jobs. Though the script in the job might be infinite, the infrastructure running the script might incur an issue requiring stopping the job. Or the job could be eliminated due to underlying infrastructure patching needs. The retry policy allows the user to set rules for automatically restarting the job if it stops because of any underlying issues. The parameters specify how often the job should be restarted, up to infinite retries, and setting time between retries. That way, the users can ensure that their Spark Job Definition jobs continue running infinitely until the user decides to stop them.

## Streaming sources

Setting up streaming with Event Hubs require basic configuration, which, includes Event Hubs namespace name, hub name, shared access key name, and the consumer group. A consumer group is a view of an entire event hub. It enables multiple consuming applications to have a separate view of the event stream and to read the stream independently at their own pace and with their offsets.

Partitions are an essential part of being able to handle a high volume of data. A single processor has a limited capacity for handling events per second, while multiple processors can do a better job when executed in parallel. Partitions allow the possibility of processing large volumes of events in parallel.

If too many partitions are used with a low ingestion rate, partition readers deal with a tiny portion of this data, causing nonoptimal processing. The ideal number of partitions directly depends on the desired processing rate. If you want to scale your event processing, consider adding more partitions. There's no specific throughput limit on a partition. However, the aggregate throughput in your namespace is limited by the number of throughput units. As you increase the number of throughput units in your namespace, you may want extra partitions to allow concurrent readers to achieve their maximum throughput.

The recommendation is to investigate and test the best number of partitions for your throughput scenario. But it's common to see scenarios with high throughput using 32 or more partitions.

Azure Event Hubs Connector for Apache Spark ([azure-event-hubs-spark](https://github.com/Azure/azure-event-hubs-spark)) is recommended to connect Spark application to Azure Event Hubs.

## Lakehouse as streaming sink

Delta Lake is an open-source storage layer that provides ACID (atomicity, consistency, isolation, and durability) transactions on top of data lake storage solutions. Delta Lake also supports scalable metadata handling, schema evolution, time travel (data versioning), open format, and other features.

In Fabric Data Engineering, Delta Lake is used to:

* Easily upsert (insert/update) and delete data using Spark SQL.
* Compact data to minimize the time spent querying data.
* View the state of tables before and after operations are executed.
* Retrieve a history of operations performed on tables.

Delta is added as one of the possible outputs sinks formats used in writeStream. For more information about the existing output sinks, see [Spark Structured Streaming Programming Guide](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#output-sinks).

The following example demonstrates how it's possible to stream data into Delta Lake.  

```python
import pyspark.sql.functions as f 
from pyspark.sql.types import * 

df = spark \ 
  .readStream \ 
  .format("eventhubs") \ 
  .options(**ehConf) \ 
  .load()  

Schema = StructType([StructField("<column_name_01>", StringType(), False), 
                     StructField("<column_name_02>", StringType(), False), 
                     StructField("<column_name_03>", DoubleType(), True), 
                     StructField("<column_name_04>", LongType(), True), 
                     StructField("<column_name_05>", LongType(), True)]) 

rawData = df \ 
  .withColumn("bodyAsString", f.col("body").cast("string")) \  
  .select(from_json("bodyAsString", Schema).alias("events")) \ 
  .select("events.*") \ 
  .writeStream \ 
  .format("delta") \ 
  .option("checkpointLocation", " Files/checkpoint") \ 
  .outputMode("append") \ 
  .toTable("deltaeventstable") 
```

 About the code snipped in the example:  

- *format()* is the instruction that defines the output format of the data.  
- *outputMode()* defines in which way the new rows in the streaming are written (that is, append, overwrite). 
- *toTable()* persists the streamed data into a Delta table created using the value passed as parameter.  

### Optimizing Delta writes 

Data partitioning is a critical part in creating a robust streaming solution: partitioning improves the way data is organized, and it also improves the throughput. Files easily get fragmented after Delta operations, resulting in too many small files. And too large files are also a problem, due to the long time to write them on the disk. The challenge with data partitioning is finding the proper balance that results in optimal file sizes. Spark supports partitioning in memory and on disk. Properly partitioned data can provide the best performance when persisting data to Delta Lake and querying data from Delta Lake. 

- When partitioning data on disk, you can choose how to partition the data based on columns by using *partitionBy()*. *partitionBy()* is a function used to partition large semantic model into smaller files based on one or multiple columns provided while writing to disk. Partitioning is a way to improve the performance of query when working with a large semantic model. Avoid choosing a column that generates too small or too large partitions. Define a partition based on a set of columns with a good cardinality and split the data into files of optimal size. 
- Partitioning data in memory can be done using *repartition()* or *coalesce()* transformations, distributing data on multiple worker nodes and creating multiple tasks that can read and process data in parallel using the fundamentals of Resilient Distributed Dataset (RDD). It allows dividing semantic model into logical partitions, which can be computed on different nodes of the cluster. 
    - *repartition()* is used to increase or decrease the number of partitions in memory. Repartition reshuffles whole data over the network and balances it across all partitions.  
    - *coalesce()* is only used to decrease the number of partitions efficiently. That is an optimized version of *repartition()* where the movement of data across all partitions is lower using coalesce(). 

Combining both partitioning approaches is a good solution in scenario with high throughput. *repartition()* creates a specific number of partitions in memory, while *partitionBy()* writes files to disk for each memory partition and partitioning column. The following example illustrates the usage of both partitioning strategies in the same Spark job: data is first split into 48 partitions in memory (assuming we have total 48 CPU cores), and then partitioned on disk based in two existing columns in the payload. 

```python
import pyspark.sql.functions as f 
from pyspark.sql.types import * 
import json 

rawData = df \ 
  .withColumn("bodyAsString", f.col("body").cast("string")) \  
  .select(from_json("bodyAsString", Schema).alias("events")) \ 
  .select("events.*") \ 
  .repartition(48) \ 
  .writeStream \ 
  .format("delta") \ 
  .option("checkpointLocation", " Files/checkpoint") \ 
  .outputMode("append") \ 
  .partitionBy("<column_name_01>", "<column_name_02>") \ 
  .toTable("deltaeventstable") 
```

### Optimized Write

Another option to optimize writes to Delta Lake is using Optimized Write. Optimized Write is an optional feature that improves the way data is written to Delta table. Spark merges or splits the partitions before writing the data, maximizing the throughput of data being written to the disk. However, it incurs full shuffle, so for some workloads it can cause a performance degradation. Jobs using *coalesce()* and/or *repartition()* to partition data on disk can be refactored to start using Optimized Write instead.  

The following code is an example of the use of Optimized Write. Note that *partitionBy()* is still used.  

```python
spark.conf.set("spark.microsoft.delta.optimizeWrite.enabled", true) 
 
rawData = df \ 
 .withColumn("bodyAsString", f.col("body").cast("string")) \  
  .select(from_json("bodyAsString", Schema).alias("events")) \ 
  .select("events.*") \ 
  .writeStream \ 
  .format("delta") \ 
  .option("checkpointLocation", " Files/checkpoint") \ 
  .outputMode("append") \ 
  .partitionBy("<column_name_01>", "<column_name_02>") \ 
  .toTable("deltaeventstable") 
```

### Batching events

In order to minimize the number of operations to improve the time spent ingesting data into Delta lake, batching events is a practical alternative.  

Triggers define how often a streaming query should be executed (triggered) and emit a new data, setting them up defines a periodical processing time interval for microbatches, accumulating data and batching events into few persisting operations, instead of writing into disk all the time.  

The following example shows a streaming query where events are periodically processed in intervals of one minute.  

```python
rawData = df \ 
  .withColumn("bodyAsString", f.col("body").cast("string")) \  
  .select(from_json("bodyAsString", Schema).alias("events")) \ 
  .select("events.*") \ 
  .repartition(48) \ 
  .writeStream \ 
  .format("delta") \ 
  .option("checkpointLocation", " Files/checkpoint") \ 
  .outputMode("append") \ 
  .partitionBy("<column_name_01>", "<column_name_02>") \ 
  .trigger(processingTime="1 minute") \ 
  .toTable("deltaeventstable") 
```

The advantage of combining batching of events in Delta table writing operations is that it creates larger Delta files with more data in them, avoiding small files. You should analyze the amount of data being ingested and find the best processing time to optimize the size of the Parquet files created by Delta library.

## Monitoring

Spark 3.1 and higher versions have a built-in [structured streaming UI](https://spark.apache.org/docs/latest/web-ui.html#structured-streaming-tab) containing the following streaming metrics:

* Input Rate
* Process Rate
* Input Rows
* Batch Duration
* Operation Duration

## Related content

* [Get streaming data into lakehouse](get-started-streaming.md) and access with the SQL analytics endpoint.
