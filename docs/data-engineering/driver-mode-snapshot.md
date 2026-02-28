---
title: Configure Delta driver mode snapshot in Fabric Spark
description: Learn how to configure driver mode snapshot in Fabric Spark to optimize cold query performance.
ms.reviewer: fepessot
ms.topic: how-to
ms.date: 03/01/2026
ai-usage: ai-assisted
---

# Driver mode snapshot

Driver mode snapshot is a Delta snapshot-loading path that runs in the driver process instead of using distributed Spark operations.

Use this feature when you want to reduce cold-query startup latency for Delta tables with small Delta logs. In these cases, avoiding Spark job scheduling overhead can improve snapshot load time.

## When to use driver mode snapshot

Driver mode snapshot is a good fit when you need faster cold-query startup for tables with small Delta logs.

Benefits include:

- Reduced latency by avoiding Spark job scheduling overhead for snapshot loading.
- Local processing in the driver, which can reduce network I/O for eligible logs.

Consider traditional mode when driver memory is constrained.

## Configure driver mode snapshot

Driver mode snapshot behavior is controlled through Spark configuration options.

You can set these properties in your notebook session with `spark.conf.set`, or through Fabric environment Spark properties. To learn where to configure environment Spark properties, see [Create, configure, and use an environment in Fabric](create-and-use-environment.md) and [Spark compute configuration settings in Fabric environments](environment-manage-compute.md).

### Core settings

Use these settings to turn driver mode snapshot on or off and control fallback behavior.

| Configuration | Type | Default | Description |
|---------------|------|---------|-------------|
| `spark.microsoft.delta.snapshot.driverMode.enabled` | Boolean | `false` | Enables or disables driver mode snapshot |
| `spark.microsoft.delta.snapshot.driverMode.fallback.enabled` | Boolean | `true` | Enables automatic fallback to traditional mode on errors |

### Size limit settings

Use these limits to control when driver mode snapshot is allowed to process a Delta log in the driver.

| Configuration | Type | Default | Description |
|---------------|------|---------|-------------|
| `spark.microsoft.delta.snapshot.driverMode.maxLogSize` | Long | 8MB | Maximum Delta log size (bytes) to process in driver mode (per table/version) |
| `spark.microsoft.delta.snapshot.driverMode.maxLogFileCount` | Integer | 10 | Maximum number of Delta log files to process in driver mode (per table/version) |

### Basic usage

Use the following snippets in a notebook session. You can set configuration values in any order, but set them before you run the Delta read operation.

Enable driver mode snapshot:

# [PySpark](#tab/pyspark)

```python
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.enabled", "true")
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.enabled", "true")
```

Set size limits (example values):

# [PySpark](#tab/pyspark)

```python
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.maxLogSize", "4MB")
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.maxLogFileCount", "10")
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.maxLogSize", "4MB")
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.maxLogFileCount", "10")
```

Load a Delta table. If the table version fits the configured limits, driver mode snapshot is used.

# [PySpark](#tab/pyspark)

```python
spark.read.format("delta").load(path).count()
```

# [Scala](#tab/scala)

```scala
spark.read.format("delta").load(path).count()
```

### Configuration recommendations

Use the following recommendations as a safe baseline for production workloads.

- **Start Conservative**: Begin with default size limits and increase based on monitoring
- **Enable Fallback**: Always enable fallback in production environments (default)

## Troubleshooting

Use the following checks when driver mode snapshot doesn't behave as expected.

- **Driver OOM Errors**
  - Reduce `maxLogSize` and `maxLogFileCount` limits, or disable driver mode
  - Consider increasing driver node size

- **Fallback to traditional mode**
  - Check logs for fallback reasons. Look for log messages containing "Driver mode error"
  - Review size limit configuration. Look for log messages containing "Log size check"
  - Driver mode snapshot doesn't support storage accounts with hierarchical namespace disabled.

- **Performance Issues**
  - Compare with traditional Spark mode performance
  - Adjust configuration based on workload characteristics

## Related content

- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Run Delta table maintenance in Lakehouse](lakehouse-table-maintenance.md)
