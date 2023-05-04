---
title: Streaming data into lakehouse
description: Learn how to use Spark structured streaming and retry policy to set up streaming jobs to get data into lakehouse.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: Lakehouse Spark Structured Streaming
---

# Get streaming data into lakehouse with Spark structured streaming

Structured Streaming is a scalable and fault-tolerant stream processing engine built on Spark. Spark takes care of running the streaming operation incrementally and continuously as data continues to arrive.

Structured streaming became available in Spark 2.2. Since then, it has been the recommended approach for data streaming. The fundamental principle behind structured stream is to treat a live data stream as a table where new data is always continuously appended, like a new row in a table. There are a few defined built-in file sources such as CSV, JSON, ORC, Parquet and for messaging services such Kafka and Event Hubs.

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article provides insights into how to optimize the processing and ingestion of events through Spark structure streaming in production environments with high throughput. The suggested approaches include:

* Data streaming throughput optimization
* Optimizing write operations in the delta table and
* Event batching

## Spark job definitions and Spark notebooks

Spark notebooks are an excellent tool for validating ideas and doing experiments to get insights from your data or code. Notebooks are widely used in data preparation, visualization, machine learning, and other big data scenarios. Spark job definitions are non-interactive code-oriented tasks running on a Spark cluster for long periods. Spark job definitions provide robustness and availability.

Spark notebooks are excellent source to test the logic of your code and address all the business requirements. However to keep it running in a production scenario, Spark job definitions are the best solution.

## Retry policy for Spark Job Definitions

## Streaming sources

Setting up streaming with event hubs require basic configuration, which, includes Event Hubs namespace name, hub name, shared access key name, and the consumer group. A consumer group is a view of an entire event hub. It enables multiple consuming applications to have a separate view of the event stream and to read the stream independently at their own pace and with their offsets.

Partitions are an essential part of being able to handle a high volume of data. A single processor has a limited capacity for handling events per second, while multiple processors can do a better job when executed in parallel. Partitions allow the possibility of processing large volumes of events in parallel.

If too many partitions are used with a low ingestion rate, partition readers will deal with a tiny portion of this data, causing non-optimal processing. The ideal number of partitions directly depends on the desired processing rate. If you want to scale your event processing, consider adding more partitions. There is no specific throughput limit on a partition. However, the aggregate throughput in your namespace is limited by the number of throughput units. As you increase the number of throughput units in your namespace, you may want extra partitions to allow concurrent readers to achieve their maximum throughput.

The recommendation is to investigate and test the best number of partitions for your throughput scenario. But it's common to see scenarios with high throughput using 32 or more partitions.

## Lakehouse as streaming sink

Delta Lake is an open-source storage layer that provides ACID (atomicity, consistency, isolation, and durability) transactions on top of data lake storage solutions. Delta Lake also supports scalable metadata handling, schema evolution, time travel (data versioning), open format, and other features.

In Fabric Data Engineering, Delta Lake is used to:

* Easily upsert (insert/update) and delete data using Spark SQL.
* Compact data to minimize the time spent querying data.
* View the state of tables before and after operations are executed.
* Retrieve a history of operations performed on tables.

Delta is added as one of the possible output sinks formats used in writeStream – for more information about the existing output sinks, access the following link: https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#output-sinks.

## Monitoring

Spark 3.1 and higher versions have a built-in structured streaming UI containing the following streaming metrics:

* Input Rate
* Process Rate
* Input Rows
* Batch Duration
* Operation Duration

## Next steps

* [Get streaming data into lakehouse](get-started-streaming.md) and access with SQL endpoint.