---

title: Configure Delta driver mode snapshot in Fabric Spark
description: Learn how to configure driver mode snapshot in Fabric Spark to optimize cold query performance.
ms.reviewer: 
ms.author: fepessot
author: felipepessoto
ms.topic: how-to
ms.custom:
ms.date: 07/24/2025

---

# Driver mode snapshot

**Driver Mode Snapshot** enables loading Delta table snapshots in the driver process, rather than using distributed Spark operations. This approach can provide significant performance improvements for snapshot loading operations, especially for small Delta logs.

## Configuration options

Driver Mode Snapshot behavior is controlled through several Spark configuration options:

### Core configuration

| Configuration | Type | Default | Description |
|---------------|------|---------|-------------|
| `spark.microsoft.delta.snapshot.driverMode.enabled` | Boolean | `false` | Enables/disables Driver Mode Snapshot |
| `spark.microsoft.delta.snapshot.driverMode.fallback.enabled` | Boolean | `true` | Enables automatic fallback to traditional mode on errors |

### Size limits

| Configuration | Type | Default | Description |
|---------------|------|---------|-------------|
| `spark.microsoft.delta.snapshot.driverMode.maxLogSize` | Long | 8MB | Maximum Delta Log size (bytes) to process in driver mode (per table/version) |
| `spark.microsoft.delta.snapshot.driverMode.maxLogFileCount` | Integer | 10 | Maximum number of Delta Log files to process in driver mode (per table/version) |

## Performance benefits

1. **Reduced Latency**: Eliminates Spark job scheduling overhead
2. **Local Processing**: All operations occur on the driver, reducing network I/O

## Usage examples

### Basic usage

```scala
// Enable/Disable driver mode snapshot
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.enabled", "true") // "false" to disable

// Set size limits (example values)
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.maxLogSize", "4MB")
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.maxLogFileCount", "10")

// Load Delta table - will automatically use driver mode if applicable
spark.read.format("delta").load(path).count()
```

## Best practices

### When to use

Driver Mode Snapshot is optimized for seamless operation and is recommended to enhance performance of cold queries. Its default size limits ensure it's applied only to small delta logs, where it delivers the greatest benefit.

### When to avoid

Consider traditional mode for:

- **Memory-Constrained Drivers**: Environments with limited driver memory

### Configuration recommendations

- **Start Conservative**: Begin with default size limits and increase based on monitoring
- **Enable Fallback**: Always enable fallback in production environments (default)

## Troubleshooting

- **Driver OOM Errors**
  - Reduce `maxLogSize` and `maxLogFileCount` limits or disable Driver mode
  - Consider increasing driver node size

- **Fallback to traditional mode**
  - Check logs for fallback reasons. Look for log messages containing "Driver mode error"
  - Review size limit configuration. Look for log messages containing "Log size check"

- **Performance Issues**
  - Compare with traditional Spark mode performance
  - Adjust configuration based on workload characteristics
