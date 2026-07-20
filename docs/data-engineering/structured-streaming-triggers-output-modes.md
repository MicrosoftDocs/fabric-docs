---
title: Triggers and output modes in Structured Streaming
description: Learn how triggers and output modes control Spark Structured Streaming query timing and sink writes in Microsoft Fabric.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 07/17/2026
ms.search.form: Spark Structured Streaming triggers output modes
ai-usage: ai-assisted
---

# Triggers and output modes in Structured Streaming

Spark Structured Streaming runs a streaming query as a series of incremental executions. Triggers control when the query processes available data. Output modes control what rows Spark writes to the sink after each trigger.

Use both settings together. A trigger defines the processing schedule, and the output mode defines the write semantics for each processed batch.

## Triggers

A trigger controls both when Spark processes data and whether the query remains active. Fabric supports three trigger types:

- **Processing time** runs standard microbatches continuously, either as soon as possible or at a fixed interval.
- **Available now** processes the input available when the query starts, and then stops.
- **Real-time mode** runs low-latency, long-running batches for supported workloads.

### Processing-time trigger

A processing-time trigger runs microbatches continuously. Configure it in either of these ways:

- **As fast as possible:** Set the processing-time interval to `"0 seconds"`. Spark starts each microbatch as soon as the previous microbatch finishes. Omitting `.trigger(...)` uses the same behavior. This configuration provides the lowest latency that standard microbatch execution can sustain, but it can create many small writes when input is sparse or uneven.
- **Fixed interval:** In PySpark, use `.trigger(processingTime="1 minute")`. In Scala, use `.trigger(Trigger.ProcessingTime("1 minute"))`. Spark attempts to start a microbatch at the specified interval.

Specify a processing-time interval when you want to batch events into larger writes, reduce small files, or align processing with a predictable cadence. If a microbatch takes longer than the interval, Spark starts the next microbatch after the current one finishes.

### Available-now trigger

An available-now trigger processes all data that exists when the query starts, and then stops the query. Depending on the amount of input and source admission limits, Spark can use multiple microbatches before it stops.

Use `trigger(availableNow=True)` for incremental jobs that you schedule instead of running continuously. When each scheduled run uses the same checkpoint, Spark resumes source progress and state from the previous run. This pattern lets a batch-oriented scheduler run stateful incremental processing without requiring you to implement offset tracking, deduplication state, or aggregation state outside Structured Streaming.

Available-now triggers are a good fit for incremental ETL, periodic file ingestion, backfills, catch-up processing, and pipelines that need streaming checkpoint semantics without a long-running Spark application. The query still uses `readStream` and `writeStream`; only its lifetime changes.

> [!NOTE]
> Prefer available now over the legacy once trigger. Available now can divide a backlog into multiple microbatches, honor source admission limits, advance the watermark after each microbatch, and run a final no-data microbatch when needed to emit watermark-dependent results or clean up state. If any source doesn't support available now, Spark falls back to a one-time microbatch.

### Real-time mode trigger

Real-time Mode uses a low-latency trigger for scenarios that need faster event processing than standard microbatch execution. In Fabric Spark Runtime 2.0 and later, use Real-time Mode when your workload needs ultra-low end-to-end latency and supports the feature requirements.

For details, see [Real-time Mode](structured-streaming-real-time-mode.md).

### Trigger syntax

The following examples show the trigger options on a configured streaming writer.

# [Python](#tab/python)

```python
# Processing time, as fast as possible
writer.trigger(processingTime="0 seconds")

# Available now
writer.trigger(availableNow=True)

# Real-time Mode
rtm = spark._jvm.org.apache.spark.sql.streaming.Trigger.RealTime("5 minutes")
writer._jwrite = writer._jwrite.trigger(rtm)
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.streaming.Trigger

writer.trigger(Trigger.ProcessingTime("0 seconds"))
writer.trigger(Trigger.AvailableNow())
writer.trigger(Trigger.RealTime("5 minutes"))
```

---

### Trigger comparison

Choose the trigger that matches your latency, cost, and scheduling requirements.

| Trigger | Behavior | Typical use |
|---|---|---|
| Processing time | Runs microbatches continuously. Use `"0 seconds"` to run the next microbatch as soon as possible, or set a longer interval for a fixed cadence. | Always-on jobs that use standard microbatch execution. |
| Available now | Processes all currently available data, and then stops. | Scheduled incremental jobs, backfills, and catch-up processing. |
| Real-time Mode | Processes events with a low-latency trigger in supported runtimes. | Real-time workloads on Fabric Spark Runtime 2.0 and later that need lower latency than microbatch processing. |

> [!IMPORTANT]
> `start()` and `toTable()` launch streaming queries asynchronously. An active query doesn't prevent a triggered notebook or Spark job definition from reaching a terminal state. Call `query.awaitTermination()` for each query that the job must wait for. For multiple always-on queries, call `spark.streams.awaitAnyTermination()` to detect when one query stops.

## Output modes

An output mode tells Spark which rows to write to the sink after a trigger completes. The default output mode is `append`.

The valid output mode depends on your query and sink. Stateless queries can usually use `append`. Stateful aggregations often require `update` or `complete`, unless watermarks let Spark determine when rows are final.

### Append mode

Append mode writes only new rows that weren't written in earlier triggers. It works well for stateless transformations and event ingestion into a lakehouse Delta table.

For aggregations, append mode is valid only when Spark can determine that a result row is final. Event-time windows with watermarks are a common pattern because the watermark tells Spark when late data for a window is no longer expected.

### Update mode

Update mode writes only rows that changed since the last trigger. It's common with aggregations because counts, sums, and other results can change as new events arrive.

Use update mode with sinks that can handle changed rows, or use `foreachBatch` to merge changed results into a target Delta table.

### Complete mode

Complete mode writes the entire result table after every trigger. It requires an aggregation because Spark needs a result table to emit.

Use complete mode only when the aggregation state stays bounded, such as a known small set of grouping keys. Avoid complete mode for high-cardinality or unbounded aggregations because each trigger rewrites all results.

### Output mode limits with aggregations and watermarks

Aggregations and watermarks determine which output modes are valid:

- Stateless queries typically use `append`.
- Aggregations without a watermark usually can't use `append` because Spark can't know when a result is final.
- Event-time aggregations with `withWatermark` can use `append` after the watermark passes the end of a window.
- `update` mode emits changed aggregate rows for each trigger.
- `complete` mode requires aggregation and rewrites the full result table each trigger.

### Output mode comparison

Choose the output mode based on the rows your downstream sink expects.

| Output mode | What's written | When to use |
|---|---|---|
| `append` | Only new rows that are final for the query. | Stateless transformations, event ingestion, and windowed aggregations with watermarks. |
| `update` | Rows that changed since the last trigger. | Aggregations where downstream logic can apply changed results. |
| `complete` | The full result table after every trigger. | Small or bounded aggregations that require a complete snapshot. |

## Practical examples

The following examples show common trigger and output mode combinations. Spark Structured Streaming exposes triggers and output modes through the DataFrame streaming writer.

### Scheduled stateful query with available now

This example maintains event counts with streaming state, processes all currently available input, and then stops. Schedule the same query again with the same checkpoint to process only new input and continue the existing aggregation state.

The example assumes that the set of device IDs remains bounded because complete mode rewrites the full result table and the aggregation retains one state entry per device.

# [Python](#tab/python)

```python
from pyspark.sql import functions as F

device_counts = (
    spark.readStream.table("device_events")
    .groupBy("device_id")
    .agg(F.count("*").alias("event_count"))
)

query = (
    device_counts.writeStream
    .format("delta")
    .outputMode("complete")
    .option("checkpointLocation", "Files/checkpoints/device_counts")
    .trigger(availableNow=True)
    .toTable("device_event_counts")
)

query.awaitTermination()
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions._
import org.apache.spark.sql.streaming.Trigger

val deviceCounts = spark.readStream
  .table("device_events")
  .groupBy("device_id")
  .agg(count("*").alias("event_count"))

val query = deviceCounts.writeStream
  .format("delta")
  .outputMode("complete")
  .option("checkpointLocation", "Files/checkpoints/device_counts")
  .trigger(Trigger.AvailableNow())
  .toTable("device_event_counts")

query.awaitTermination()
```

---

### Fixed interval append query

This example writes new events to a Delta table once per minute. Use this pattern when you want append-only ingestion and larger output files than the default trigger might produce.

# [Python](#tab/python)

```python
events = spark.readStream.table("raw_events")

query = (
    events
    .selectExpr("event_id", "event_time", "payload")
    .writeStream
    .format("delta")
    .option("checkpointLocation", "Files/checkpoints/events_append")
    .outputMode("append")
    .trigger(processingTime="1 minute")
    .toTable("bronze_events")
)

query.awaitTermination()
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.streaming.Trigger

val events = spark.readStream.table("raw_events")

val query = events
  .selectExpr("event_id", "event_time", "payload")
  .writeStream
  .format("delta")
  .option("checkpointLocation", "Files/checkpoints/events_append")
  .outputMode("append")
  .trigger(Trigger.ProcessingTime("1 minute"))
  .toTable("bronze_events")

query.awaitTermination()
```

---

### Aggregation with update mode

This example maintains five-minute event counts by device. The query uses a watermark to limit late data and update mode to emit only aggregates that changed in the latest trigger.

# [Python](#tab/python)

```python
from pyspark.sql.functions import col, window

events = spark.readStream.table("raw_events")

query = (
    events
    .withWatermark("event_time", "10 minutes")
    .groupBy(window(col("event_time"), "5 minutes"), col("device_id"))
    .count()
    .writeStream
    .format("console")
    .option("checkpointLocation", "Files/checkpoints/device_counts")
    .outputMode("update")
    .trigger(processingTime="1 minute")
    .start()
)

query.awaitTermination()
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions._
import org.apache.spark.sql.streaming.Trigger

val events = spark.readStream.table("raw_events")

val query = events
  .withWatermark("event_time", "10 minutes")
  .groupBy(window(col("event_time"), "5 minutes"), col("device_id"))
  .count()
  .writeStream
  .format("console")
  .option("checkpointLocation", "Files/checkpoints/device_counts")
  .outputMode("update")
  .trigger(Trigger.ProcessingTime("1 minute"))
  .start()

query.awaitTermination()
```

---

In production, replace the console sink with a sink that supports changed rows, or use `foreachBatch` to apply the changed aggregates to a Delta table.

## Related content

- [Structured Streaming overview](structured-streaming-overview.md)
- [Real-time Mode](structured-streaming-real-time-mode.md)
- [Stateful stream processing](structured-streaming-stateful-processing.md)
- [Structured Streaming best practices](structured-streaming-best-practices.md)
