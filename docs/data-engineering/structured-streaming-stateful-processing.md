---
title: Stateful processing with Structured Streaming
description: Learn how Spark Structured Streaming in Fabric uses state, checkpoints, watermarks, joins, deduplication, and custom state logic.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 07/17/2026
ms.search.form: Spark Structured Streaming stateful processing
ai-usage: ai-assisted
---

# Stateful processing with Structured Streaming

Spark Structured Streaming supports both stateless and stateful operations. Stateless operations, such as `map`, `filter`, and `select`, process each input row independently. Stateful operations, such as aggregations, joins, and deduplication, remember information across microbatches so Spark can update results when new events arrive.

In Microsoft Fabric, you use the same open-source Apache Spark Structured Streaming concepts with Fabric Spark runtimes, notebooks, Spark job definitions, lakehouse tables, and other Fabric data engineering experiences.

## State store and checkpoints

Stateful streaming queries use a state store to keep intermediate data between microbatches. For example, a running count by device needs to remember the current count for each device key before it can process the next microbatch.

Spark persists state with the streaming checkpoint. The checkpoint tracks offsets, query progress, and state store data. If a query stops and restarts with the same checkpoint location, Spark reloads the state and resumes from the last committed progress.

> [!IMPORTANT]
> Use a durable checkpoint location, and don't share the same checkpoint between different streaming queries. The state schema and query plan are part of the checkpointed state, so major changes to stateful logic often require a new checkpoint.

State grows as Spark tracks more keys, windows, or buffered join rows. Bound state size with watermarks, time-to-live (TTL), and carefully chosen keys so the checkpoint doesn't grow without limit.

### Enable the RocksDB state store

By default, Spark uses an HDFS-backed state store whose working state is maintained in JVM-managed memory and whose durable versions are stored in the checkpoint. Enable the RocksDB state store provider so Spark manages active state in native memory and on each executor's local disk instead of the JVM heap. RocksDB reduces JVM heap pressure and gives more predictable memory use. It benefits stateful queries directly, and it's a reasonable default even for queries that keep little state.

# [Python](#tab/python)

```python
spark.conf.set(
    "spark.sql.streaming.stateStore.providerClass",
    "org.apache.spark.sql.execution.streaming.state.RocksDBStateStoreProvider"
)
```

# [Scala](#tab/scala)

```scala
spark.conf.set(
  "spark.sql.streaming.stateStore.providerClass",
  "org.apache.spark.sql.execution.streaming.state.RocksDBStateStoreProvider"
)
```

---

Set the state store provider before the query's first run and keep it consistent across restarts, because it's part of the checkpointed query.

### Enable RocksDB changelog checkpointing

Changelog checkpointing is an Apache Spark optimization for the RocksDB state store. It uploads incremental state changes and creates periodic snapshots, which can reduce checkpoint latency for large state.

# [Python](#tab/python)

```python
spark.conf.set(
    "spark.sql.streaming.stateStore.rocksdb.changelogCheckpointing.enabled",
    True
)
```

# [Scala](#tab/scala)

```scala
spark.conf.set(
  "spark.sql.streaming.stateStore.rocksdb.changelogCheckpointing.enabled",
  true
)
```

---

Changelog checkpointing is backward compatible with RocksDB snapshot checkpoints. You can enable it for an existing RocksDB query without discarding state, but you must restart the query for the setting to take effect.

## Windowed aggregations

Windowed aggregations group events by event time instead of processing time. They help you calculate metrics such as counts, sums, and averages over time ranges.

Common window types include:

- **Tumbling windows**. A tumbling window has a fixed size and doesn't overlap with other windows. For example, a five-minute tumbling window counts events from `10:00` through `10:05`, then starts a new count for `10:05` through `10:10`.
- **Sliding windows**. A sliding window has a fixed size and starts at a regular slide interval. For example, a 10-minute window that slides every one minute gives you a rolling 10-minute count.
- **Session windows**. A session window groups events that arrive close together for the same key. For example, a session window with a 15-minute gap closes a user session after that user has no events for 15 minutes.

The following example counts device events in five-minute tumbling windows.

# [Python](#tab/python)

```python
from pyspark.sql import functions as F

windowed_counts = (
    events
    .withWatermark("event_time", "10 minutes")
    .groupBy(
        F.window("event_time", "5 minutes"),
        F.col("device_id")
    )
    .count()
)
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions._

val windowedCounts = events
  .withWatermark("event_time", "10 minutes")
  .groupBy(
    window(col("event_time"), "5 minutes"),
    col("device_id")
  )
  .count()
```

---

For sliding windows, add a slide duration. For example, `window("event_time", "10 minutes", "1 minute")` calculates a 10-minute window every minute. For session windows, use `session_window(event_time, '15 minutes')` in Spark SQL or `session_window("event_time", "15 minutes")` in the DataFrame API.

Session-window aggregations don't support `update` output mode. Use an output mode supported by the query and sink, and test the resulting emission timing with late data.

## Watermarks

A watermark tells Spark how late you expect event-time data to arrive. Spark uses the watermark to decide when old state can be removed and when late rows are too old to update a result.

Use `withWatermark` before a stateful event-time operation:

# [Python](#tab/python)

```python
events_with_watermark = events.withWatermark("event_time", "10 minutes")
```

# [Scala](#tab/scala)

```scala
val eventsWithWatermark = events
  .withWatermark("event_time", "10 minutes")
```

---

This example allows data to arrive up to 10 minutes late based on the `event_time` column. Spark can eventually drop state for windows that are older than the watermark.

> [!NOTE]
> Spark doesn't drop data that arrives within the configured watermark delay. Data older than the watermark might still be processed, but Spark doesn't guarantee it. State cleanup also occurs asynchronously rather than immediately when the watermark advances.

Choose watermark delays from real source behavior. A delay that's too short can drop valid late data. A delay that's too long keeps more state and increases checkpoint size.

Watermarks advance when Spark processes new input. If no data arrives, a watermark might not advance, so window output, outer-join unmatched rows, and state cleanup can be delayed until a later microbatch receives data.

## Stream-stream joins

A stream-stream join combines two streaming inputs. Spark buffers rows from both sides until it can determine whether matching rows arrive.

Inner joins can run without watermarks, but unbounded state can grow indefinitely. Add watermarks and an event-time range condition so Spark can remove old buffered rows.

# [Python](#tab/python)

```python
joined_events = (
    impressions.withWatermark("impression_time", "10 minutes")
    .join(
        clicks.withWatermark("click_time", "10 minutes"),
        """
        impression_id = click_impression_id AND
        click_time >= impression_time AND
        click_time <= impression_time + interval 5 minutes
        """,
        "inner"
    )
)
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions.expr

val joinedEvents = impressions
  .withWatermark("impression_time", "10 minutes")
  .join(
    clicks.withWatermark("click_time", "10 minutes"),
    expr("""
      impression_id = click_impression_id AND
      click_time >= impression_time AND
      click_time <= impression_time + interval 5 minutes
    """),
    "inner"
  )
```

---

Outer joins require enough event-time information for Spark to know when no future match can arrive. Use watermarks and a time-range condition. For a left outer join, watermark the right side that might produce the nullable match. For a right outer join, watermark the left side. For a full outer join, watermark at least one side; watermark both sides when Spark needs to clean up state for both inputs.

> [!IMPORTANT]
> Avoid broad stream-stream joins that have no time range. Spark must keep more buffered rows, and state can grow without a clear cleanup point.

Unmatched outer-join rows aren't emitted immediately. Spark waits until the watermark and time-range condition prove that a future match can no longer arrive.

When a query combines multiple input streams, Spark derives one query watermark from the input watermarks. By default, the slowest input controls progress so Spark doesn't prematurely drop data from that stream. A stalled input can therefore delay state cleanup and output for the whole query.

## Deduplication in streams

Streaming deduplication removes repeated events by remembering keys that Spark already processed. Use it when sources can resend the same event, such as retries from a messaging system.

`dropDuplicates` stores the column values used for duplicate detection. Without a watermark, Spark must remember those values for the life of the query. To let Spark evict legacy `dropDuplicates` state, include the watermark column in the duplicate key.

# [Python](#tab/python)

```python
deduplicated_events = (
    events
    .withWatermark("event_time", "10 minutes")
    .dropDuplicates(["event_id", "event_time"])
)
```

# [Scala](#tab/scala)

```scala
val deduplicatedEvents = events
  .withWatermark("event_time", "10 minutes")
  .dropDuplicates("event_id", "event_time")
```

---

Including the event time means two records with the same event ID but different timestamps aren't duplicates. Use `dropDuplicatesWithinWatermark` when your runtime supports it and the event ID alone defines a duplicate. Spark then keeps each event ID for the watermark horizon:

# [Python](#tab/python)

```python
deduplicated_events = (
    events
    .withWatermark("event_time", "10 minutes")
    .dropDuplicatesWithinWatermark(["event_id"])
)
```

# [Scala](#tab/scala)

```scala
val deduplicatedEvents = events
  .withWatermark("event_time", "10 minutes")
  .dropDuplicatesWithinWatermark("event_id")
```

---

Choose keys that uniquely identify a logical event. If the key is too broad, Spark can remove distinct events. If the key is too narrow, duplicates can pass through.

## Custom state logic

Built-in aggregations, joins, and deduplication cover many stateful workloads. Use arbitrary stateful processing when you need custom per-key logic, such as state machines, alert suppression, timeout handling, or multistep enrichment.

The `transformWithState` operator replaces the legacy `mapGroupsWithState` and `flatMapGroupsWithState` APIs for custom state logic. You group rows by key, implement a stateful processor, and manage state variables, timers, output mode, and time mode. Apache Spark introduced `transformWithState` in Spark 4.0, and Fabric Runtime 2.0 includes it through Spark 4.1.

> [!NOTE]
> `transformWithState` is a newer API. Validate your code with the Fabric runtime version that runs your production workload.

Use TTL for custom state whenever the business logic allows expiration. TTL helps Spark evict stale keys without waiting for a specific input event.

## State debug tools

Fabric Runtime 2.0 includes Apache Spark 4.1 and the State Data Source for Structured Streaming, which Apache Spark introduced in Spark 4.0. Use it to inspect state store contents from a checkpoint with a separate batch query.

> [!NOTE]
> The State Data Source is experimental in Apache Spark. Its options and output schema can change.

The `statestore` reader can inspect compatible state in an existing checkpoint, including a checkpoint created by an earlier Spark runtime. Run the separate batch reader with Fabric Runtime 2.0 or later; you don't need to recreate the checkpoint or restart the original query first.

# [Python](#tab/python)

```python
state_df = (
    spark.read
    .format("statestore")
    .load("Files/checkpoints/device-counts")
)

state_df.printSchema()
display(state_df)
```

# [Scala](#tab/scala)

```scala
val stateDf = spark.read
  .format("statestore")
  .load("Files/checkpoints/device-counts")

stateDf.printSchema()
display(stateDf)
```

---

The `state-metadata` source is a separate convenience for discovering operator IDs, store names, and available batch IDs. Spark creates this metadata only while the streaming query runs on Spark 4.0 or later. For an older checkpoint, resume the original query against that checkpoint on Fabric Runtime 2.0 before you use `state-metadata`.

# [Python](#tab/python)

```python
state_metadata_df = (
    spark.read
    .format("state-metadata")
    .load("Files/checkpoints/device-counts")
)

display(state_metadata_df)
```

# [Scala](#tab/scala)

```scala
val stateMetadataDf = spark.read
  .format("state-metadata")
  .load("Files/checkpoints/device-counts")

display(stateMetadataDf)
```

---

For queries with multiple stateful operators, use metadata to identify the operator you want to inspect. If you already know the operator ID and store name, you can skip the metadata source and pass those options directly to the `statestore` reader. For `transformWithState`, specify the state variable name when you read state.

> [!IMPORTANT]
> Treat checkpoint state as operational data. Don't manually edit checkpoint files. Use the State Data Source for inspection and use query code changes, watermarks, or TTL to control state behavior.

## Best practices for bounded state

Follow these practices to keep stateful streaming queries reliable:

- Add event-time watermarks for windowed aggregations, stream-stream joins, and deduplication when late-data rules allow it.
- Use time-range conditions for stream-stream joins so Spark can remove buffered rows.
- Choose keys with the right cardinality. Very high-cardinality keys increase state size, while overly broad keys can mix unrelated events.
- Enable the RocksDB state store provider and changelog checkpointing to reduce heap pressure, garbage collection pauses, and checkpoint latency.
- Use TTL with `transformWithState` when custom state doesn't need to live forever.
- Keep checkpoint locations stable for the lifetime of a query, and use a new checkpoint for incompatible state schema changes.
- Monitor state-related metrics, input rate, processing rate, and checkpoint growth during production runs.
- Test with realistic late data, duplicate data, and restart scenarios before you deploy a stateful query.

## Related content

- [Structured Streaming overview](structured-streaming-overview.md)
- [Triggers and output modes](structured-streaming-triggers-output-modes.md)
- [Real-time Mode](structured-streaming-real-time-mode.md)
- [Structured Streaming best practices](structured-streaming-best-practices.md)
- [Runtime 2.0 in Fabric](runtime-2-0.md)
