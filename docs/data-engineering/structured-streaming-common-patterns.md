---
title: Common Structured Streaming patterns
description: Learn Spark Structured Streaming patterns for fan-out, foreachBatch, stream-stream joins, and query monitoring in Microsoft Fabric.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 07/17/2026
ms.search.form: Spark Structured Streaming common patterns
ai-usage: ai-assisted
---

# Common Structured Streaming patterns

Spark Structured Streaming supports several ways to route one logical stream to multiple destinations, correlate streams, and observe query progress. This article shows common patterns for Microsoft Fabric, including fan-out with `foreachBatch`, independent streaming queries, stream-stream joins, durable Delta tables, and `StreamingQueryListener`.

The examples assume that `events` is a streaming DataFrame with `order_id`, `amount`, and `event_time` columns.

> [!IMPORTANT]
> `start()` and `toTable()` launch a streaming query asynchronously and return a `StreamingQuery` handle. An active query doesn't prevent a triggered notebook or Spark job definition from reaching a terminal state. Call `query.awaitTermination()` for each query that the triggered job must wait for. For multiple always-on queries, `spark.streams.awaitAnyTermination()` blocks until one query stops so the job can handle that termination.

## Choose a fan-out pattern

Choose the pattern based on the isolation, latency, and durability requirements of each destination.

| Pattern | Use when | Tradeoff |
|---|---|---|
| One query with `foreachBatch` | Destinations use batch writers and should process the same micro-batch together. | The destinations share a query lifecycle, and their writes aren't atomic as a group. |
| Independent streaming queries | Destinations need separate transformations, checkpoints, or restart behavior. | Each query reads and processes the source independently. |
| Ingest once to a bronze Delta table | Downstream streams need durable replay, different schedules, or separate failure domains. | The extra Delta write adds storage and latency. |

Don't share a checkpoint between fan-out queries. Each streaming query needs a dedicated checkpoint location.

## Write to multiple sinks with foreachBatch

`foreachBatch` passes each micro-batch DataFrame and its batch ID to a function. Use the function to apply batch DataFrame writers, `MERGE` operations, or writes to multiple destinations.

`foreachBatch` provides at-least-once processing by default. The following example persists the micro-batch so Spark doesn't recompute it for each sink. Delta transaction identifiers make each table write idempotent when Spark retries the same batch.

# [Python](#tab/python)

```python
def append_idempotently(batch_df, table_name, transaction_id, batch_id):
    (
        batch_df.write
        .format("delta")
        .mode("append")
        .option("txnAppId", transaction_id)
        .option("txnVersion", batch_id)
        .saveAsTable(table_name)
    )


def write_to_sinks(batch_df, batch_id):
    cached_batch = batch_df.persist()
    try:
        append_idempotently(
            cached_batch,
            "bronze_orders",
            "orders-fanout-bronze",
            batch_id,
        )
        append_idempotently(
            cached_batch.filter("amount >= 1000"),
            "high_value_orders",
            "orders-fanout-high-value",
            batch_id,
        )
    finally:
        cached_batch.unpersist()


query = (
    events.writeStream
    .queryName("orders-fanout")
    .outputMode("append")
    .option("checkpointLocation", "Files/checkpoints/orders-fanout")
    .foreachBatch(write_to_sinks)
    .start()
)

query.awaitTermination()
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.DataFrame

def appendIdempotently(
    batchDF: DataFrame,
    tableName: String,
    transactionId: String,
    batchId: Long): Unit = {
  batchDF.write
    .format("delta")
    .mode("append")
    .option("txnAppId", transactionId)
    .option("txnVersion", batchId)
    .saveAsTable(tableName)
}

def writeToSinks(batchDF: DataFrame, batchId: Long): Unit = {
  val cachedBatch = batchDF.persist()
  try {
    appendIdempotently(
      cachedBatch,
      "bronze_orders",
      "orders-fanout-bronze",
      batchId)
    appendIdempotently(
      cachedBatch.filter("amount >= 1000"),
      "high_value_orders",
      "orders-fanout-high-value",
      batchId)
  } finally {
    cachedBatch.unpersist()
  }
}

val query = events.writeStream
  .queryName("orders-fanout")
  .outputMode("append")
  .option("checkpointLocation", "Files/checkpoints/orders-fanout")
  .foreachBatch(writeToSinks _)
  .start()

query.awaitTermination()
```

---

Keep each transaction ID stable while you reuse the checkpoint. If you start the query with a new checkpoint and its batch IDs restart, use new transaction IDs so Delta doesn't treat the new batches as transactions that it already committed.

The writes inside `foreachBatch` aren't one transaction across all destinations. If a later write fails, Spark retries the batch. Make every destination idempotent so successful earlier writes can safely run again. For non-Delta destinations, use a stable event key, an upsert operation, or a destination-specific transaction identifier.

`foreachBatch` uses the micro-batch execution model. Don't use it with Real-time Mode.

## Run independent streaming queries

Start a separate query when each destination needs its own checkpoint, trigger, output mode, or failure handling. The queries can use the same streaming DataFrame definition, but Spark executes each query independently.

# [Python](#tab/python)

```python
bronze_query = (
    events.writeStream
    .queryName("orders-bronze")
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "Files/checkpoints/orders-bronze")
    .toTable("bronze_orders")
)

high_value_query = (
    events.filter("amount >= 1000")
    .writeStream
    .queryName("orders-high-value")
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "Files/checkpoints/orders-high-value")
    .toTable("high_value_orders")
)

spark.streams.awaitAnyTermination()
```

# [Scala](#tab/scala)

```scala
val bronzeQuery = events.writeStream
  .queryName("orders-bronze")
  .format("delta")
  .outputMode("append")
  .option("checkpointLocation", "Files/checkpoints/orders-bronze")
  .toTable("bronze_orders")

val highValueQuery = events
  .filter("amount >= 1000")
  .writeStream
  .queryName("orders-high-value")
  .format("delta")
  .outputMode("append")
  .option("checkpointLocation", "Files/checkpoints/orders-high-value")
  .toTable("high_value_orders")

spark.streams.awaitAnyTermination()
```

---

Use independent queries for a small number of destinations when source rereads and repeated transformations are acceptable. Monitor and restart each query separately.

`awaitAnyTermination()` returns when either query stops. Inspect the query status and exception, then stop or restart the remaining query instead of allowing it to run without supervision. For multiple bounded available-now queries, start all queries first, then call `awaitTermination()` on every query handle so the job waits for all of them.

For larger fan-out topologies, ingest the source once into a bronze Delta table. Start downstream streams from that table with separate checkpoints. This pattern gives each consumer durable replay and prevents a slow destination from blocking ingestion. Standard Delta streaming reads expect append-only commits; use change data feed when downstream streams must receive updates or deletes.

## Join two streams with bounded state

A stream-stream join correlates events that arrive independently, such as an order and its payment. Both inputs can continue to receive late data, so add watermarks and a time-range condition to give Spark a point at which it can remove unmatched state.

The following example assumes that `orders` contains `order_id` and `order_time`, and `payments` contains `order_id`, `payment_id`, and `payment_time`.

# [Python](#tab/python)

```python
from pyspark.sql import functions as F

watermarked_orders = (
    orders
    .withWatermark("order_time", "10 minutes")
    .alias("orders")
)

watermarked_payments = (
    payments
    .withWatermark("payment_time", "10 minutes")
    .alias("payments")
)

matched_orders = (
    watermarked_orders.join(
        watermarked_payments,
        F.expr("""
            orders.order_id = payments.order_id
            AND payments.payment_time >= orders.order_time
            AND payments.payment_time
                <= orders.order_time + INTERVAL 30 MINUTES
        """),
        "inner",
    )
    .select(
        F.col("orders.order_id").alias("order_id"),
        F.col("orders.order_time"),
        F.col("payments.payment_id"),
        F.col("payments.payment_time"),
    )
)

query = (
    matched_orders.writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "Files/checkpoints/matched-orders")
    .toTable("matched_orders")
)

query.awaitTermination()
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions._

val watermarkedOrders = orders
  .withWatermark("order_time", "10 minutes")
  .alias("orders")

val watermarkedPayments = payments
  .withWatermark("payment_time", "10 minutes")
  .alias("payments")

val matchedOrders = watermarkedOrders
  .join(
    watermarkedPayments,
    expr("""
      orders.order_id = payments.order_id
      AND payments.payment_time >= orders.order_time
      AND payments.payment_time
        <= orders.order_time + INTERVAL 30 MINUTES
    """),
    "inner")
  .select(
    col("orders.order_id").alias("order_id"),
    col("orders.order_time"),
    col("payments.payment_id"),
    col("payments.payment_time"))

val query = matchedOrders.writeStream
  .format("delta")
  .outputMode("append")
  .option("checkpointLocation", "Files/checkpoints/matched-orders")
  .toTable("matched_orders")

query.awaitTermination()
```

---

Stream-stream joins support `append` output mode. Inner joins can run without watermarks, but their state can grow without limit. Outer joins have additional watermark requirements and delay unmatched output until Spark can prove that no match can arrive. For details, see [Stream-stream joins](structured-streaming-stateful-processing.md#stream-stream-joins).

Real-time Mode supports only specific stream-stream join shapes and requires extra configuration. Confirm the Real-time Mode support matrix before you change this pattern to a Real-time Mode trigger.

## Observe queries with StreamingQueryListener

A `StreamingQueryListener` receives lifecycle and progress events for every streaming query in the Spark session. Use it to send query metrics and termination details to your logging or monitoring system.

# [Python](#tab/python)

```python
import json

from pyspark.sql.streaming import StreamingQueryListener


class QueryMetricsListener(StreamingQueryListener):
    def onQueryStarted(self, event):
        print(json.dumps({
            "event": "started",
            "id": str(event.id),
            "runId": str(event.runId),
            "name": event.name,
        }))

    def onQueryProgress(self, event):
        progress = event.progress
        print(json.dumps({
            "event": "progress",
            "name": progress.name,
            "batchId": progress.batchId,
            "numInputRows": progress.numInputRows,
            "inputRowsPerSecond": progress.inputRowsPerSecond,
            "processedRowsPerSecond": progress.processedRowsPerSecond,
        }, default=str))

    def onQueryIdle(self, event):
        pass

    def onQueryTerminated(self, event):
        print(json.dumps({
            "event": "terminated",
            "id": str(event.id),
            "runId": str(event.runId),
            "exception": event.exception,
        }))


query_listener = QueryMetricsListener()
spark.streams.addListener(query_listener)
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.streaming.StreamingQueryListener
import org.apache.spark.sql.streaming.StreamingQueryListener._

class QueryMetricsListener extends StreamingQueryListener {
  override def onQueryStarted(event: QueryStartedEvent): Unit = {
    println(
      s"event=started id=${event.id} runId=${event.runId} name=${event.name}")
  }

  override def onQueryProgress(event: QueryProgressEvent): Unit = {
    val progress = event.progress
    println(
      s"event=progress name=${progress.name} batchId=${progress.batchId} " +
      s"numInputRows=${progress.numInputRows} " +
      s"inputRowsPerSecond=${progress.inputRowsPerSecond} " +
      s"processedRowsPerSecond=${progress.processedRowsPerSecond}")
  }

  override def onQueryIdle(event: QueryIdleEvent): Unit = {}

  override def onQueryTerminated(event: QueryTerminatedEvent): Unit = {
    println(
      s"event=terminated id=${event.id} runId=${event.runId} " +
      s"exception=${event.exception.getOrElse("none")}")
  }
}

val queryListener = new QueryMetricsListener()
spark.streams.addListener(queryListener)
```

---

Listener callbacks run on the driver and can arrive from different threads. Keep `onQueryStarted` nonblocking because query startup waits for it. Keep the other callbacks short, protect shared mutable state, and enqueue telemetry for asynchronous delivery instead of making slow network calls in a callback.

Progress events are emitted when Spark publishes query progress. For Real-time Mode, that occurs at the boundary between long-running batches, not for every record. Use source lag and downstream latency monitoring between progress events. For details, see [Monitor real-time queries](structured-streaming-real-time-mode.md#monitor-real-time-queries).

In an interactive notebook, remove a listener before you register a replacement so rerunning a cell doesn't create duplicate callbacks:

# [Python](#tab/python)

```python
spark.streams.removeListener(query_listener)
```

# [Scala](#tab/scala)

```scala
spark.streams.removeListener(queryListener)
```

---

## Related content

- [Structured Streaming overview](structured-streaming-overview.md)
- [Structured Streaming best practices](structured-streaming-best-practices.md)
- [Triggers and output modes](structured-streaming-triggers-output-modes.md)
- [Stateful stream processing](structured-streaming-stateful-processing.md)
- [Real-time Mode](structured-streaming-real-time-mode.md)
