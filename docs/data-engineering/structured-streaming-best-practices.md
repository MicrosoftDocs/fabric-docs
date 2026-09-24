---
title: Best practices for Structured Streaming
description: Learn best practices for reliable, cost-effective Spark Structured Streaming jobs and Delta sinks in Microsoft Fabric lakehouses.
ms.reviewer: milescole
ms.topic: best-practice
ms.date: 07/17/2026
ms.search.form: Spark Structured Streaming best practices
ai-usage: ai-assisted
---

# Best practices for Structured Streaming

Spark Structured Streaming provides a single incremental processing API for continuously running streams and scheduled batch-style jobs. In Microsoft Fabric, use these best practices to run both patterns reliably, control costs, preserve state, and write healthy Delta tables in a lakehouse.

This article focuses on design and operation choices for streaming workloads. For an end-to-end example that writes streaming data to a lakehouse, see [Data streaming into a lakehouse with Spark](lakehouse-streaming-data.md).

## Run production workloads

Use notebooks to develop and test streaming logic. Run production queries as Spark job definitions instead of interactive notebooks.

> [!IMPORTANT]
> Streaming queries run asynchronously. An active query doesn't prevent a triggered notebook or Spark job definition from reaching a terminal state. Call `query.awaitTermination()` for each query that the job must wait for. For multiple always-on queries, call `spark.streams.awaitAnyTermination()` to detect when one query stops, then handle that termination and the remaining queries.

Choose the query lifetime based on the workload:

- Use a default, fixed-interval, or Real-time Mode trigger for a continuously running job. Configure an unlimited retry policy when the job must remain active through transient infrastructure failures, maintenance events, or timeouts.
- Use the available-now trigger for a scheduled incremental job. Each run processes all currently available input and stops. Schedule later runs with the same query and checkpoint to continue source progress and state without keeping Spark compute active between runs.

The query logic can remain the same when you change between scheduled and always-on operation. The checkpoint preserves source offsets and state in either pattern. Before you reuse a checkpoint with a different trigger, confirm that the source, query plan, state schema, and sink remain compatible.

For a walkthrough, see [Get streaming data into lakehouse and access with SQL analytics endpoint](get-started-streaming.md). For production guidance that covers Spark job definitions and retry behavior, see [Data streaming into a lakehouse with Spark](lakehouse-streaming-data.md#run-streaming-jobs-in-production).

## Manage checkpoints

Set a durable `checkpointLocation` for every streaming query. The checkpoint stores offsets, progress metadata, and state information that Spark uses to resume a query after a restart.

Use a separate checkpoint directory for each query. Don't share a checkpoint across queries, even when they read from the same source or write to the same table. Shared checkpoints corrupt recovery metadata and can cause duplicate processing, skipped records, or failed restarts.

```python
query = (
    events.writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "Files/checkpoints/orders-to-bronze")
    .toTable("bronze_orders")
)
```

Choose a lakehouse path for the checkpoint location. Don't use local driver storage for checkpoints because the data disappears when the Spark application stops.

> [!NOTE]
> Checkpoints help Spark provide fault-tolerant recovery and exactly-once processing with supported sinks such as Delta Lake. If you use custom sinks or `foreachBatch`, make the write logic idempotent because Spark might rerun a batch after a failure.

Treat the checkpoint as part of the deployed query. Changes to sources, stateful operators, grouping keys, state schemas, or sink types can be incompatible with an existing checkpoint. Test query changes against a copy of production-like data, and start with a new checkpoint when Spark doesn't support recovering the changed query.

## Enable RocksDB as the streaming state store

Enable the RocksDB state store provider for your streaming workloads.

By default, Spark uses an HDFS-backed state store whose working state is maintained in JVM-managed memory, which can add heap pressure and cause long garbage-collection pauses as state grows. RocksDB instead manages active state in native memory and on each executor's local disk, while durable snapshots or changelogs are stored in the query's checkpoint location in OneLake. This approach reduces JVM heap pressure and provides more predictable memory use. It benefits stateful queries such as windowed aggregations, stream-stream joins, deduplication, and `transformWithState`, and is a reasonable default even when queries maintain little or no state.


```python
spark.conf.set(
    "spark.sql.streaming.stateStore.providerClass",
    "org.apache.spark.sql.execution.streaming.state.RocksDBStateStoreProvider"
)
```

Set the state store provider before the query's first run and keep it consistent across restarts.

### Enable RocksDB changelog checkpointing

Apache Spark supports changelog checkpointing as an optimization for the RocksDB state store. Instead of uploading a RocksDB snapshot with every checkpoint, Spark uploads the changes since the previous checkpoint and creates snapshots periodically in the background. Enable this feature to reduce checkpoint latency for queries with large state.

```python
spark.conf.set(
    "spark.sql.streaming.stateStore.rocksdb.changelogCheckpointing.enabled",
    True
)
```

Changelog checkpointing is backward compatible with RocksDB snapshot checkpoints, so you can enable or disable it for an existing RocksDB query without discarding state. Restart the query after changing the setting, and test checkpoint and recovery performance with production-like state sizes.

Continue to bound state with watermarks, time-range join conditions, and time-to-live (TTL) even when you use RocksDB. RocksDB changes where state lives, but it doesn't remove the need to control how much state the query keeps. For more detail on stateful operators and state inspection, see [Stateful stream processing](structured-streaming-stateful-processing.md).

## Optimize Delta sinks

Streaming jobs often create small files because each microbatch commits data independently. Small files increase metadata overhead and slow downstream reads. Use write-side and maintenance strategies together:

- Enable [Optimize Write](tune-file-size.md#optimize-write) to let Delta Lake improve file sizes before it writes data.
- Use trigger intervals to batch input into fewer, larger commits.
- Choose partition columns that match common query filters and don't create too many tiny directories.
- Enable [Auto Compaction](table-compaction.md#auto-compaction) when the streaming workload tolerates periodic added latency from compaction to mitigate small-file accumulation.

For detailed examples of Optimize Write, trigger batching, and partitioning, see [Data streaming into a lakehouse with Spark](lakehouse-streaming-data.md#optimize-streaming-performance). For compaction options, see [Table compaction](table-compaction.md).

```python
spark.conf.set("spark.databricks.delta.optimizeWrite.enabled", True)

query = (
    events.writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "Files/checkpoints/orders-to-silver")
    .partitionBy("event_date")
    .trigger(processingTime="1 minute")
    .toTable("silver_orders")
)
```

Start with a trigger interval that matches your freshness target, then inspect file sizes and batch duration. Shorter intervals reduce latency but usually create more commits and smaller files.

## Manage schemas

Provide a schema for streaming jobs:

- File-based streaming sources, including Parquet, JSON, CSV, and ORC, require an explicit schema by default. Spark can infer a file-source schema only when you enable `spark.sql.streaming.schemaInference`, but schema inference isn't recommended for production streams.
- Kafka-compatible sources provide a fixed source schema for fields such as `key`, `value`, `topic`, and `timestamp`. Provide a schema when you parse the message value into structured columns.
- Delta streaming sources read the schema from the Delta table metadata. Treat incompatible changes to the source table schema as planned changes to the streaming query.

Explicit schemas make parsing predictable, avoid repeated file inspection, and help you identify invalid records before they reach downstream tables.

```python
from pyspark.sql import functions as F
from pyspark.sql.types import DoubleType, StringType, StructField, StructType, TimestampType

order_schema = StructType([
    StructField("order_id", StringType(), False),
    StructField("customer_id", StringType(), False),
    StructField("amount", DoubleType(), True),
    StructField("event_time", TimestampType(), False),
])

parsed_events = (
    raw_events
    .withColumn("body_text", F.col("body").cast("string"))
    .withColumn("order", F.from_json("body_text", order_schema))
    .select("order.*")
)
```

Handle schema drift deliberately. When producers add fields, decide whether to ignore the fields, capture them in a raw bronze table, or update the target table schema. When producers change data types or remove required fields, route affected records to a quarantine table before they break the streaming query.

Also plan for changes to a Delta source. A standard Delta streaming read expects append-only commits and can fail when the source table receives updates, deletes, merges, or overwrites. Use [change data feed](delta-lake-change-data-feed.md#read-change-data-with-structured-streaming) when downstream processing must observe row-level changes. Use options that skip change commits only when intentionally ignoring those changes is correct for the workload.

For a stateful query that applies an event-time watermark while reading an existing Delta table, consider enabling `withEventTimeOrder` for the initial snapshot. Processing the initial files in modification-time order can otherwise present older events after the watermark has advanced and cause Spark to treat them as late data.

## Keep Kafka-compatible connections healthy

Kafka client idle settings can conflict with a managed Kafka-compatible service. The Kafka Java client defaults `metadata.max.age.ms` to 300,000 milliseconds and `connections.max.idle.ms` to 540,000 milliseconds. Azure Event Hubs closes an idle Kafka connection after 240,000 milliseconds. The client can therefore try to reuse a connection that Event Hubs already closed, which can appear as an expired batch, a send timeout, or a latency gap while the client reconnects.

For Event Hubs Kafka-compatible sources and sinks, set both values to less than 240,000 milliseconds. The shorter metadata interval sends a request before the Event Hubs idle limit, while the shorter client idle threshold ensures the client retires an idle connection before the service does.

# [Python](#tab/python)

```python
event_hubs_idle_options = {
    "kafka.connections.max.idle.ms": "180000", # set to less than 240,000 ms
    "kafka.metadata.max.age.ms": "180000", # set to less than 240,000 ms
}

source = (
    spark.readStream
    .format("kafka")
    .options(**input_options)
    .options(**event_hubs_idle_options)
    .load()
)

sink = (
    source.writeStream
    .format("kafka")
    .options(**output_options)
    .options(**event_hubs_idle_options)
)
```

# [Scala](#tab/scala)

```scala
val eventHubsIdleOptions = Map(
  "kafka.connections.max.idle.ms" -> "180000", // set to less than 240,000 ms
  "kafka.metadata.max.age.ms" -> "180000") // set to less than 240,000 ms

val source = spark.readStream
  .format("kafka")
  .options(inputOptions)
  .options(eventHubsIdleOptions)
  .load()

val sink = source.writeStream
  .format("kafka")
  .options(outputOptions)
  .options(eventHubsIdleOptions)
```

---

Apply these options to both sides of a Kafka-to-Kafka query. This tuning is especially important for low-traffic queries and Real-time Mode queries where the connection can be idle near a long-running batch boundary. If you use Apache Kafka or another Kafka-compatible service, change the defaults only when its broker, load balancer, or firewall has a shorter idle timeout than the client.

For the complete Event Hubs recommendations and constraints, see [Apache Kafka client configurations for Azure Event Hubs](/azure/event-hubs/apache-kafka-configurations).

## Archive or delete processed source files

A file-source checkpoint records which files Spark processed, but it doesn't remove those files. Don't allow a landing directory to grow without limit. Large directories increase storage and listing overhead, which slows discovery of new files.

Use `cleanSource="archive"` to move processed files outside the source path. Keep the archive directory separate so the same stream can't discover the archived files again:

```python
file_orders = (
    spark.readStream
    .schema(order_schema)
    .format("json")
    .option("cleanSource", "archive")
    .option("sourceArchiveDir", "Files/archive/orders")
    .load("Files/landing/orders")
)

query = (
    file_orders.writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "Files/checkpoints/file-orders")
    .toTable("bronze_orders")
)
```

If you don't need to retain the source files, permanently delete them after processing by replacing the archive options with:

```python
file_orders = (
    spark.readStream
    .schema(order_schema)
    .format("json")
    .option("cleanSource", "delete")
    .load("Files/landing/orders")
)
```

Use built-in cleanup only when no other process needs the same source files. Cleanup runs asynchronously and can fall behind a high-volume stream. Monitor the landing directory, and use a separate retention or lifecycle process when built-in cleanup can't keep pace.

## Handle errors and resilience

Treat an always-on streaming job as a restartable service, not as a process that runs forever without interruption. The Spark application can eventually stop because of a run timeout, infrastructure maintenance, driver or executor failure, a transient network problem, source throttling, or an unavailable sink. Design every layer so a new application can resume safely.

Use the following response for each failure type:

| Failure type | Response |
|---|---|
| Transient source, sink, network, or infrastructure failure | Let connector retries handle short interruptions, then let the Spark job definition retry policy start a new application. |
| Planned timeout, maintenance event, or deployment | Restart the same query definition against its existing checkpoint. |
| Invalid record | Preserve the raw payload and route the record to a quarantine table. |
| Invalid credentials, incompatible schema change, or corrupted checkpoint | Alert and require intervention instead of restarting indefinitely without investigation. |
| Sustained input backlog | Scale compute, reduce per-record work, tune the source, or adjust the trigger interval. |

### Configure supervised restarts

Run production streams as Spark job definitions and configure a retry policy. Use unlimited retries for an always-on workload that must recover from expected application termination, and set a retry interval that avoids a tight restart loop.

Call `query.awaitTermination()` after starting the query. This call keeps the triggered Spark job definition or notebook running and surfaces a terminal query exception to the parent application. For multiple always-on queries, call `spark.streams.awaitAnyTermination()`, inspect which query stopped, and fail or stop the remaining queries so the job-level retry policy can restart the complete application.

Don't catch a terminal streaming exception and return success. A success-shaped exit prevents the job retry policy from recognizing the failure. Pair unlimited retries with alerts on repeated failures, restart frequency, and time since the last successful checkpoint. Deterministic failures, such as invalid credentials or incompatible state changes, need correction rather than an endless retry loop.

For Fabric retry configuration, see [Run streaming jobs in production](lakehouse-streaming-data.md#run-streaming-jobs-in-production).

### Preserve recovery across applications

Keep checkpoints in durable OneLake storage and reuse the same checkpoint after a timeout, maintenance event, or transient failure. A new Spark application reconstructs source progress and state from the checkpoint, then resumes from the last committed batch.

Keep the source replayable and every sink idempotent. For Delta sinks with `writeStream`, Spark and Delta coordinate commits through checkpoint metadata. For `foreachBatch` and custom sinks, use stable event keys, the batch ID, or destination transaction identifiers so replay doesn't create duplicate business records.

Don't delete a checkpoint to recover from a transient failure. Use a new checkpoint only for an intentionally incompatible query change, and treat that change as a new deployment with a defined replay or starting-offset plan. Ensure that credentials, libraries, environment settings, and source or sink configuration can be recreated whenever Fabric starts a new Spark application.

### Isolate invalid records

Design streaming jobs so a single bad record doesn't stop the pipeline. Keep the raw payload, parse into typed columns, and separate invalid records for later inspection.

```python
parsed = (
    raw_events
    .withColumn("body_text", F.col("body").cast("string"))
    .withColumn("order", F.from_json("body_text", order_schema))
)

valid_orders = parsed.where(F.col("order").isNotNull()).select("order.*")

invalid_orders = (
    parsed
    .where(F.col("order").isNull())
    .select("body_text", F.current_timestamp().alias("quarantine_time"))
)
```

### Plan controlled shutdown and deployment

When your code controls shutdown, call `query.stop()` and wait for the query to terminate before the application exits. If a planned deployment must process all currently available input first, use an available-now run with a compatible query and checkpoint. For a deployment, keep the existing checkpoint only when the source, query plan, state schema, and sink remain compatible.

Don't depend on graceful shutdown for correctness. Infrastructure failures can terminate an application without warning, so checkpoint recovery and idempotent sink behavior must also handle abrupt termination.

### Control backlog after recovery

A restarted query can return with a large backlog. If input rate consistently exceeds process rate, increase capacity, reduce per-record work, adjust the source rate, or use a longer trigger interval so each batch has enough time to finish before the next batch starts. Monitor recovery time and source retention so the source doesn't remove unread data before the query catches up.

## Monitor streaming queries

Use the Structured Streaming tab in the [Fabric monitoring hub](spark-monitoring-overview.md) to observe streaming queries. Watch these metrics together instead of relying on a single number:

- **Input Rate** shows how quickly records arrive.
- **Process Rate** shows how quickly Spark processes records.
- **Batch Duration** shows how long each microbatch takes.
- **Input Rows** helps you detect source pauses, spikes, and replay after restart.
- **Operation Duration** helps you identify expensive read, process, and write phases.

If batch duration grows while process rate falls behind input rate, the query is accumulating backlog. Investigate source volume, transformations, shuffle size, sink latency, and Delta file layout.

## Balance latency and cost

Pick a query lifetime and trigger that fit the business requirement. An available-now job releases compute after it processes the current backlog, which works well when periodic freshness is sufficient. A continuously running query avoids scheduler startup and processes new input without waiting for the next scheduled run.

For always-on microbatch jobs, short intervals lower end-to-end latency, but they can produce more small files. Longer intervals improve batching efficiency, but data arrives in the table later.

Real-time Mode targets lower latency for supported Spark Structured Streaming workloads. Use it when your scenario needs low-latency and record-by-record processing instead of standard microbatch processing. For details and limitations, see [Real-time Mode](structured-streaming-real-time-mode.md). For trigger behavior and output modes, see [Triggers and output modes](structured-streaming-triggers-output-modes.md).

## Summary of best practices

- Run production queries as Spark job definitions. Use a default, fixed-interval, or Real-time Mode trigger with retry policies for always-on processing, or use available now for scheduled incremental processing.
- Set a durable `checkpointLocation` for every query, and don't share checkpoints across queries.
- Enable the RocksDB state store provider and changelog checkpointing to reduce heap pressure, garbage collection pauses, and checkpoint latency.
- Use Delta Lake as the sink when you need reliable transactions and recovery.
- Enable Optimize Write, choose trigger intervals deliberately, and compact Delta tables when small files accumulate.
- Define explicit schemas for parsing, and treat schema drift as a planned compatibility event.
- Align Kafka client idle settings with Event Hubs or other Kafka-compatible service timeouts.
- Archive or delete processed source files so file-source directories don't grow without limit.
- Keep poison messages out of the main table by writing invalid records to a quarantine table.
- Treat every always-on job as restartable, configure supervised retries, and recover from a durable checkpoint.
- Make custom sinks and `foreachBatch` logic idempotent.
- Monitor input rate, process rate, batch duration, and operation duration in the Structured Streaming tab.
- Balance latency, file size, and compute cost when you choose between microbatch triggers and Real-time Mode.

## Related content

- [Structured Streaming overview](structured-streaming-overview.md)
- [Common patterns](structured-streaming-common-patterns.md)
- [Real-time Mode](structured-streaming-real-time-mode.md)
- [Triggers and output modes](structured-streaming-triggers-output-modes.md)
- [Stateful stream processing](structured-streaming-stateful-processing.md)
- [Data streaming into a lakehouse with Spark](lakehouse-streaming-data.md)
- [Get streaming data into lakehouse and access with SQL analytics endpoint](get-started-streaming.md)
- [Table compaction](table-compaction.md)
