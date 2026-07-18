---
title: Overview of Structured Streaming
description: Learn how Spark Structured Streaming works in Microsoft Fabric, including sources, sinks, execution modes, and reliability concepts.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 07/17/2026
ms.search.form: Spark Structured Streaming overview
ai-usage: ai-assisted
---

# Overview of Structured Streaming

Spark Structured Streaming is an incremental processing engine built on Apache Spark. It models an input stream as an unbounded table that new rows are appended to. You define the logic by using declarative Dataset and DataFrame APIs, and then choose whether the query runs continuously or processes the currently available data and stops.

In Microsoft Fabric, Structured Streaming supports both continuously running event processing and scheduled incremental workloads. You can use the same query and checkpoint to process events as they arrive or run the query periodically by using the available-now trigger. In both patterns, Spark tracks source progress and maintains state for aggregations, deduplication, joins, and custom stateful logic.

## Core processing model

A Structured Streaming query has three main parts: a source, transformations, and a sink.

- **Source**: The source reads new input records from a streaming system or incrementally discovered files.
- **Transformations**: Transformations define the query logic. You can filter rows, select columns, parse JSON, join data, aggregate values, and enrich events with reference data.
- **Sink**: The sink writes the output rows to storage, memory, or another destination.

This source-to-sink model is declarative. You describe what result you want, and Spark plans repeated execution as new input becomes available.

Streaming DataFrames use the familiar Spark DataFrame API, but not every batch operation supports streaming input. Spark validates the query plan when you start the streaming query and reports unsupported operations.

## Use one API for always-on and scheduled processing

Structured Streaming separates the query definition from how long the query runs. This design lets you use the same `readStream` and `writeStream` APIs for two operating patterns:

| Pattern | Query lifetime | Typical use |
|---|---|---|
| Always-on streaming | The query remains active and processes data as it arrives. | Event processing, continuous ingestion, operational alerts, and low-latency pipelines. |
| Scheduled incremental processing | An available-now trigger processes all data available when the query starts, then stops. A scheduler starts the query again later with the same checkpoint. | Incremental ETL, periodic file ingestion, stateful batch-style processing, backfills, and catch-up jobs. |

Both patterns use streaming checkpoints. For a scheduled available-now job, the checkpoint records which source data was already processed and preserves state between runs. The next run processes only new input while continuing the existing stateful computation.

Use available now when you want batch-style job scheduling without rebuilding incremental progress or state management yourself. Use a default, fixed-interval, or Real-time Mode trigger when the workload needs to remain active between arrivals. You can often change between these patterns by changing the trigger while keeping the query logic unchanged, but reuse a checkpoint only when the query remains checkpoint-compatible.

## Sources

Structured Streaming supports several source types in Fabric Spark workloads. Choose a source based on where the live data originates and how you need to test the query.

| Source | Behavior | Typical use |
|---|---|---|
| `rate` | Generates rows at a configured rate. | Development, demonstrations, and load tests. |
| Files | Reads new files that appear in a directory. Supported formats include `text`, `CSV`, `JSON`, `Parquet`, and `ORC`. | Incremental file ingestion. |
| Delta table | Reads the initial table snapshot and later append commits as an incremental stream. Use [change data feed](delta-lake-change-data-feed.md#read-change-data-with-structured-streaming) to process row-level updates and deletes. | Incremental lakehouse processing. |
| Apache Kafka | Reads messages from Kafka topics through the Spark Kafka connector. | Event-driven applications and streaming integration. |
| Azure Event Hubs | Reads events through the Spark Kafka connector and the Event Hubs Kafka-compatible endpoint. | Managed event ingestion in Azure. |
| Fabric Eventstream | Reads events through the Kafka-compatible endpoint exposed by an eventstream. | Fabric event ingestion, transformation, and routing. |

For lakehouse ingestion scenarios, Azure Event Hubs and Fabric Eventstream are common sources. For query development, the `rate` source provides a simple stream without external dependencies.

Add files to a streaming source directory atomically so Spark doesn't discover a partially written file. Don't write the output of a query into a path that its file source also reads.

## Sinks

A sink receives the output of a streaming query. In Fabric, a Delta table is the primary sink for durable streaming data because it provides ACID transactions, open-format storage, schema management, and compatibility with other Fabric experiences.

| Sink | Behavior | Typical use |
|---|---|---|
| Delta table | Writes streaming output to a managed or external Delta table in a lakehouse. | Durable analytical data and integration with other Fabric experiences. |
| Eventstream custom endpoint | Sends events through an Event Hubs-compatible or Kafka-compatible endpoint. For setup information, see [Add a custom endpoint source to an eventstream](../real-time-intelligence/event-streams/add-source-custom-app.md). | Eventstream processing, routing, and delivery. |
| Azure Event Hubs or Apache Kafka | Writes key-value messages through the Spark Kafka sink. | Event-driven applications, downstream streaming consumers, and low-latency routing. |
| `foreachBatch` | Runs custom logic for each microbatch. Make the logic idempotent because Spark can retry a microbatch. For examples, see [Common patterns](structured-streaming-common-patterns.md). | Delta merges, multiple destinations, and batch writers without a native streaming sink. |
| `console` | Prints rows to notebook output. | Short development tests only. |
| `memory` | Stores output in an in-memory table. | Interactive debugging in a notebook session. |

Choose the production sink based on how downstream consumers use the output. Use a Delta table for durable analytical data, or use an Eventstream, Azure Event Hubs, or Apache Kafka for continued event processing. Console and memory sinks don't provide durable storage and aren't suitable for production jobs.

## Execution models at a glance

The always-on and scheduled patterns describe the query lifetime. Separately, Structured Streaming uses the following execution models to process records:

| Execution model | Description | Best fit |
|---|---|---|
| Micro-batch Mode | Spark divides incoming data into small batches, runs the query plan for each batch, and commits results after each batch completes. | General-purpose streaming ingestion, aggregations, file processing, and reliable writes to Delta tables. |
| Real-time Mode | Spark processes records with ultra-low latency by executing long running streaming tasks. Real-time Mode requires Fabric Runtime 2.0 or later. | Low-latency event processing where response time is more important than maximum batch throughput. |

Start with the default microbatch model unless your workload has strict latency requirements. For more information, see [Real-time Mode](structured-streaming-real-time-mode.md).

## Reliability and fault tolerance

Structured Streaming provides fault tolerance through checkpoints and replayable input. A checkpoint stores query progress, metadata, offsets, and state information in durable storage. If a streaming query stops and restarts with the same checkpoint location, Spark resumes from the last committed progress instead of starting over.

Exactly-once processing depends on the source, sink, checkpoint, and query logic. With a replayable source, a durable checkpoint, and an idempotent or transactional sink such as Delta Lake, Spark can avoid duplicate committed results after failures. Keep each streaming query checkpoint in a dedicated location, and don't reuse a checkpoint across different query definitions.

Delivery guarantees vary by sink. Delta and file sinks support exactly-once writes, while Kafka and `foreach` sinks provide at-least-once delivery. Make custom and `foreach` writes idempotent so retries don't create duplicate results.

Stateful operations, such as aggregations and stream-stream joins, store intermediate state in the checkpoint. Plan checkpoint storage carefully because the checkpoint is part of the query's recovery contract.

## End-to-end Delta example

The following PySpark example reads from the `rate` source, adds a derived column, and writes the stream to a Delta table. Use it as a minimal pattern for source-to-Delta streaming.

```python
from pyspark.sql.functions import col

streaming_df = (
    spark.readStream
    .format("rate")
    .option("rowsPerSecond", 1000)
    .load()
    .select(
        col("timestamp"),
        col("value"),
        (col("value") % 10).alias("bucket")
    )
)

query = (
    streaming_df.writeStream
    .format("delta")
    .option("checkpointLocation", "Files/checkpoints/rate_to_delta")
    .outputMode("append")
    .toTable("rate_stream_delta")
)

query.awaitTermination()
```

In this example, the `rate` source creates a continuous input stream, `select()` defines the transformation, and `toTable("rate_stream_delta")` writes the output to a Delta table. The checkpoint location lets Spark recover query progress if the job restarts.

The query runs continuously because it doesn't specify a trigger. To run the same logic as a bounded incremental job, add `.trigger(availableNow=True)` before `toTable()`. Spark processes the available input, commits the checkpoint and state, and stops. A later run with the same checkpoint continues from that progress.

> [!IMPORTANT]
> `start()` and `toTable()` return a `StreamingQuery` handle immediately. The query runs asynchronously and doesn't prevent a triggered notebook or Spark job definition from reaching a terminal state. Call `query.awaitTermination()` for each query that the triggered job must wait for. For multiple always-on queries, use `spark.streams.awaitAnyTermination()` to detect when one query stops.

## Next steps

Use the related articles to move from concepts to implementation. Start with the lakehouse ingestion walkthroughs when you need a working source-to-Delta pattern. Review triggers and output modes before you tune when results are emitted. Study stateful streaming when your query uses aggregations, deduplication, or joins. Use the best practices article before you move a streaming job into production.

## Related content

- [Real-time Mode](structured-streaming-real-time-mode.md)
- [Triggers and output modes](structured-streaming-triggers-output-modes.md)
- [Stateful stream processing](structured-streaming-stateful-processing.md)
- [Common patterns](structured-streaming-common-patterns.md)
- [Structured Streaming best practices](structured-streaming-best-practices.md)
- [Data streaming into a lakehouse with Spark](lakehouse-streaming-data.md)
- [Get streaming data into a lakehouse and access with the SQL analytics endpoint](get-started-streaming.md)
