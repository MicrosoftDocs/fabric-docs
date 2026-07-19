---
title: Real-time mode in Structured Streaming
description: Learn how Real-time Mode lowers Spark Structured Streaming latency in Microsoft Fabric and how to enable it in Runtime 2.0.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 07/17/2026
ms.search.form: Spark Structured Streaming real-time mode
ai-usage: ai-assisted
---

# Real-time mode in Structured Streaming

> [!IMPORTANT]
> Real-time mode is available only on Microsoft Fabric Spark Runtime 2.0 (Spark 4.1) or later. This new streaming mode isn't available on earlier Fabric runtimes.

Apache Spark 4.1 introduces the `Trigger.RealTime` API for real-time mode. Microsoft Fabric supports this ultra-low-latency Structured Streaming execution mode in Fabric Runtime 2.0. It uses long-running tasks that continuously read from streaming sources, apply supported transformations, and write to supported sinks. This model reduces scheduling delay because Spark doesn't wait for a discrete microbatch to start each unit of work.

Use real-time mode when your workload needs fresh events to move through the query as quickly as possible. Use standard micro-batch mode when you prioritize throughput, broad connector support, or batch-oriented operations.

## Real-time mode vs. micro-batch mode

Structured Streaming uses microbatch execution by default. In micro-batch mode, Spark plans, schedules, and commits a series of small batch jobs. A trigger interval controls how often Spark checks for new data and starts the next batch. This approach works well for most lakehouse ingestion, table maintenance, aggregations, and file-based sinks.

Real-time mode changes the execution pattern. Spark starts long-running tasks that stay active while the query runs. The tasks process records continuously instead of waiting for the next microbatch boundary. This pattern can reduce end-to-end latency for supported queries, especially when events must move between streaming systems with minimal delay.

The tradeoff is that real-time mode has a narrower support surface during preview. You need to validate your source, sink, output mode, and transformations on Fabric Runtime 2.0 or later before you use it for production workloads.

## How real-time mode processes data

Real-time mode replaces the short microbatch loop with a single long-running batch that stays active for the whole trigger interval and processes records as they arrive. Two design choices give it low latency. First, Spark launches every stage of the query at once and connects them with a streaming shuffle, so a record can move from the source through each transformation to the sink without pausing at a stage boundary. Second, because the tasks stay resident, Spark doesn't pay the per-batch planning and scheduling cost on every trigger.

Spark still needs a point to persist progress. It commits source offsets, updates the state store, and publishes streaming metrics at the boundary between one long-running batch and the next. That timing is why the trigger interval behaves differently than a microbatch interval: it sets how long each batch runs before Spark checkpoints, not how long Spark waits before it starts processing.

Tune the interval with that behavior in mind. A longer interval checkpoints and reports metrics less often, so a failure replays more data and the monitoring view refreshes more slowly. A shorter interval checkpoints more often for faster recovery and fresher metrics, but the extra checkpoint work can eat into latency. There's no universal best value, so benchmark a few intervals against your own workload. The examples in this article start from a five-minute interval.

## Prerequisites

Before you enable Real-time Mode, complete these requirements:

- Use Microsoft Fabric Spark Runtime 2.0 (Spark 4.1) or later. Real-time Mode isn't available on earlier runtimes.
- Run the workload in a Fabric Spark experience that supports Runtime 2.0, such as a notebook or Spark job definition.
- Use a streaming source and sink that support Real-time Mode in the selected runtime.
- Configure a durable checkpoint location for the query.
- Provide enough task slots for the query. Because Real-time Mode schedules all stages at once, the pool needs at least as many available task slots as the total number of tasks across every stage of the query. Plan for one Real-time Mode query per pool unless you confirm the pool has spare slots for more.

For Runtime 2.0 setup steps, see [Runtime 2.0 in Fabric](./runtime-2-0.md).

## Enable Real-time Mode

Enable Real-time Mode by setting the streaming trigger to `Trigger.RealTime("<interval>")` on `writeStream`. The interval is the long-running batch duration that controls checkpoint and metric frequency, as described in [How Real-time Mode processes data](#how-real-time-mode-processes-data).

> [!IMPORTANT]
> Real-time Mode supports the `update` output mode only. The `append` and `complete` output modes aren't supported. Set `.outputMode("update")` on the query.

> [!NOTE]
> The real-time trigger is available in the JVM streaming API. During preview, PySpark doesn't expose it natively through `DataStreamWriter.trigger()`.

The examples assume that `input_options`, `output_options`, and `c_path` contain your source options, sink options, and checkpoint path. Run these examples only on Fabric Spark Runtime 2.0 (Spark 4.1) or later.

# [Python](#tab/python)

Create the streaming DataFrame in Python first.

```python
passthrough = (
    spark.readStream
    .format("kafka")
    .options(**input_options)
    .load()
    .selectExpr("CAST(key AS STRING) AS key", "CAST(value AS STRING) AS value")
)
```

Then apply the temporary JVM bridge workaround. PySpark doesn't yet surface `Trigger.RealTime` in `DataStreamWriter.trigger()`, so this workaround creates the JVM trigger through py4j and applies it to the underlying Java `DataStreamWriter`. Replace this code with the native PySpark trigger API after support ships.

```python
# Create RTM trigger object via JVM bridge
rtm_trigger = (
    spark._jvm.org.apache.spark.sql.streaming
        .Trigger.RealTime("5 minutes")
)

# Define streaming query
query = (
    passthrough.writeStream
    .format("kafka")
    .options(**output_options)
    .option("checkpointLocation", c_path)
    .outputMode("update")
)

# Apply RTM trigger via Java DataStreamWriter
query._jwrite = query._jwrite.trigger(rtm_trigger)

# Start streaming query
query = query.start()

query.awaitTermination()
```

# [Scala](#tab/scala)

Use the native JVM trigger API directly from Scala.

```scala
import org.apache.spark.sql.streaming.Trigger

val passthrough = spark.readStream
  .format("kafka")
  .options(inputOptions)
  .load()
  .selectExpr("CAST(key AS STRING) AS key", "CAST(value AS STRING) AS value")

val query = passthrough.writeStream
  .format("kafka")
  .options(outputOptions)
  .option("checkpointLocation", cPath)
  .outputMode("update")
  .trigger(Trigger.RealTime("5 minutes"))
  .start()

query.awaitTermination()
```

---

## Design queries for Real-time Mode

Real-time Mode validates the source, sink, output mode, and query plan when the query starts. During preview, it supports a focused set of streaming patterns. Confirm the exact support for your runtime version before you move a query to production, because preview coverage changes over time.

The best mental model is a low-latency path that moves events between streaming message systems and applies light processing along the way. Design your query around that model:

- **Read and write streaming message systems.** Real-time Mode is built for Kafka-compatible endpoints, including Apache Kafka and Azure Event Hubs through the Kafka connector. To push results to an external system directly, call `.foreach(...)` with a `ForeachWriter`.
- **Keep lakehouse and file I/O on a standard trigger.** Delta tables, lakehouse tables, and file-based sources and sinks aren't Real-time Mode targets. Land data into a lakehouse, maintain tables, or write files with a microbatch trigger instead, and reserve Real-time Mode for the latency-sensitive hop between message systems.
- **Favor lightweight transformations.** Projections, casts, filters, column expressions, and simple enrichment give the lowest latency. The more state and shuffling a query adds, the more you need to test it in Real-time Mode first.

When you use the Event Hubs Kafka-compatible endpoint, align the Kafka client idle and metadata intervals with the Event Hubs idle timeout. A timeout mismatch can cause a reconnect delay near a long-running batch boundary. For the recommended source and sink options, see [Keep Kafka-compatible connections healthy](structured-streaming-best-practices.md#keep-kafka-compatible-connections-healthy).

Real-time Mode runs many stateful operators, including windowed aggregations, deduplication, and joins, but the supported shapes are narrower than in micro-batch mode. Use the following matrices as a quick reference when you design a query, and confirm the current behavior on your runtime version.

The connector matrix summarizes where Real-time Mode fits in the pipeline:

| Connector | As a source | As a sink |
|---|---|---|
| Kafka-compatible endpoints (Apache Kafka, Azure Event Hubs through the Kafka connector) | Supported | Supported |
| Custom sink through `.foreach(...)` and `ForeachWriter` | Not applicable | Supported |
| Delta and lakehouse tables | Not supported | Not supported |
| File-based formats | Not supported | Not supported |

The operator matrix groups transformations by how well they fit the low-latency model:

| Transformation | Real-time Mode fit | What to do |
|---|---|---|
| Stateless work: select, filter, cast, project, scalar UDFs | Supported | Preferred path; gives the lowest latency |
| Aggregations and tumbling or sliding windows | Supported | Add a watermark to bound state |
| Deduplication with or within a watermark | Supported | Choose keys that identify a logical event |
| Session (gap-based) windows | Not supported | Run the query on a microbatch trigger |
| Stream-to-reference join | Supported when the reference side broadcasts | Keep the reference dataset small |
| Stream-to-stream join | Inner join only, with extra configuration | Avoid outer joins between two streams |
| Custom state with `transformWithState` | Supported with different semantics | See the note that follows |
| Partition-at-a-time operators: `mapPartitions`, `mapInPandas`, `mapInArrow` | Not supported | Rewrite with row-level UDFs, filters, or complex-type expressions |
| Self-union, union with a batch source, or union after a stateful operator | Not supported | Use independent streaming inputs and apply `union` before stateful work |

Supported doesn't mean that an operation preserves the lowest possible latency. Aggregations, joins, deduplication, custom state, and Python UDFs add state management, shuffles, serialization, or buffering. Benchmark the complete query with realistic input rates and state sizes rather than measuring a stateless pass-through query.

> [!IMPORTANT]
> If Spark rejects a source, sink, operation, or output mode for Real-time Mode, run that query with a standard microbatch trigger instead. Don't assume that a query that works in micro-batch mode also works in Real-time Mode.

If you build a custom stateful processor with `transformWithState`, expect the row-by-row execution model to change its behavior. Real-time Mode delivers events to your processor as they arrive rather than as a per-key batch, so write the processor without assuming it sees every row for a key in a single call. Event-time timers aren't supported, and processing-time timers can be delayed until data arrives or the long-running batch ends. The pandas-based variant of the API isn't available, so use the row-based API. For the general programming model, see [Stateful stream processing](structured-streaming-stateful-processing.md).

## Use cases

Real-time Mode works best when latency matters more than maximum throughput or broad feature coverage. Consider it for workloads such as event routing, operational alerts, lightweight stream enrichment, and low-latency movement between streaming systems.

Standard micro-batch mode is usually a better choice when you need:

- High-throughput ingestion into a lakehouse Delta table.
- Larger batches for optimized file sizes and lower write overhead.
- Complex aggregations, joins, or stateful processing.
- Broad connector and sink compatibility.
- Lower cost through less always-on compute activity.

Choose the mode per workload. A workspace can use Real-time Mode for latency-sensitive event paths and micro-batch mode for lakehouse ingestion or analytical pipelines.

## Monitor real-time queries

Monitor Real-time Mode queries from the Fabric monitoring hub. Open the Spark application and use the **Structured Streaming** tab to review streaming metrics such as input rate, process rate, input rows, query status, and operation duration.

Real-time Mode publishes query progress and checkpoints between long-running batches. The **Structured Streaming** tab and `lastProgress` update after a batch ends, so their freshness depends on the Real-time Mode trigger interval. Don't interpret batch duration or the age of `lastProgress` as per-record processing latency.

Use the query handle to check whether the query is active, inspect its current status, and retrieve the most recent completed-batch metrics:

# [Python](#tab/python)

```python
import json

monitoring_snapshot = {
    "isActive": query.isActive,
    "status": query.status,
    "lastProgress": query.lastProgress,
}

print(json.dumps(monitoring_snapshot, indent=2, default=str))

if not query.isActive and query.exception() is not None:
    raise query.exception()
```

# [Scala](#tab/scala)

```scala
println(s"isActive: ${query.isActive}")
println(s"status: ${query.status}")

Option(query.lastProgress).foreach { progress =>
  println(progress.prettyJson)
}

if (!query.isActive) {
  query.exception.foreach(error => throw error)
}
```

---

In the Spark application details, review the active stages and executors while a long-running batch is in progress. Look for failed tasks, unavailable executors, sustained CPU or memory pressure, and insufficient task slots.

Spark progress metrics alone aren't enough for live operational monitoring because they update at the batch boundary. Monitor Kafka consumer-group lag or equivalent source backlog, ingress and egress rates, throttling, and errors in the source and sink systems. For Azure Event Hubs, use Azure Monitor alongside the Fabric monitoring hub.

Measure end-to-end latency outside the Spark progress event. Include the producer event time in each record, then compare it with the time that a downstream consumer receives the result. This measurement captures source delay, Spark processing, network transfer, and sink delay. Alert on query termination, stale checkpoints, growing source lag, sink errors, and end-to-end latency that exceeds the workload target.

## Related content

- Read the [Structured Streaming overview](./structured-streaming-overview.md).
- Review [Triggers and output modes](./structured-streaming-triggers-output-modes.md).
- Apply [Structured Streaming best practices](./structured-streaming-best-practices.md).
- Use [Common patterns](./structured-streaming-common-patterns.md).
- Configure [Runtime 2.0 in Fabric](./runtime-2-0.md).
- Learn about [data streaming into a lakehouse with Spark](./lakehouse-streaming-data.md).
