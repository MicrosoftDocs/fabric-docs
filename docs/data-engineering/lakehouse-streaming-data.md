---
title: Streaming data in lakehouse
description: Learn how to use Spark structured streaming and retry policy to set up streaming jobs.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: Lakehouse Spark Structured Streaming
---

# Spark Structure Streaming in Lakehouse
Structured Streaming is a scalable and fault-tolerant stream processing engine built on Spark. Spark takes care of running the streaming operation incrementally and continuously as data continues to arrive.

Structured Streaming became available in Spark 2.2. Since then, it’s the recommended approach for data streaming. The key principle behind Structure Stream is to treat a live data stream as a table where new data is always continuously appended, like a new row in a table. There are a few already defined built-in sources for file sources (CSV, JSON, ORC, Parquet) as for messaging services, like Kafka and Event Hub.

This guide has the motivation to share insights into how to optimize the processing and ingestion of events through Spark Structure Streaming in production with high throughput. The suggested approaches include data streaming throughput optimization, optimizing write operations in Delta Table and event batching.

## Spark Job Definitions and Spark Notebooks
Spark Notebooks are a great tool to validate ideas and quick experiments to get insights from your data or your code. Notebooks are widely used in data preparation, data visualization, machine learning, and other Big Data scenarios. Spark Job Definitions are non-interactive code-oriented tasks running for long periods of time on a Spark cluster. Spark job definitions provide better robustness and uptime guarantees. 

Spark Notebooks are excellent to test if the logic of your code is correct and address all business requirements, but in order to keep it running in a production scenario, Spark Job Definitions are the best solution. 


## Retry policy for Spark Job Definitions

## Streaming sources
Setting up Event Hub streaming will require basic configuration steps, including Event Hub namespace name, hub name, shared access key name, shared access key and the consumer group. A consumer group is a view of an entire event hub, and it enables multiple consuming applications to have a separate view of the event stream, and to read the stream independently at their own pace and with their own offsets.

Partitions are an important part of being able to handle a high volume of data. A single processor has a very limited capacity for handling events per second, while multiple processors can handle it better when executed in parallel. Partitions allow the possibility of processing large volumes of events in parallel.

If too many partitions are used with a low ingestion rate, partition readers will deal with a very small portion of this data, causing a non-optimal processing. The ideal number of partitions depends directly on the desired processing rate. If you are looking to scale your event processing, you may want to consider adding additional partitions. There is no specific throughput limit on a partition, however the aggregate throughput in your namespace is limited by the number of throughput units. As you increase the number of throughput units in your namespace, you may want additional partitions to allow concurrent readers to achieve their own maximum throughput.

The recommendation is to investigate and test what is the best number of partitions for your throughput scenario. But it’s common to see scenarios with high throughput using 32 or more partitions.

## Lakehouse as streaming sink
Delta Lake is an open-source storage layer which provides ACID (atomicity, consistency, isolation, and durability) transactions on top of data lake storage solutions. Delta Lake also supports scalable metadata handling, schema evolution, time travel (data versioning), open format and other features. 

In Synapse, Delta Lake can be used to:
- Easily upsert (insert/update) and delete data using Spark SQL.
- Compact data to minimize the time spent querying data.
- View the state of tables before and after operations are executed.
- Retrieve a history of operations performed on tables. 

Delta is added as one of the possible output sinks formats used in writeStream – for more information about the existing output sinks, access the following link: https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#output-sinks.

## Monitoring
Spark 3.1 and later has a built-in Structured Streaming UI containing the streaming metrics: 
- Input Rate
- Process Rate
- Input Rows
- Batch Duration
- Operation Duration

## Next steps