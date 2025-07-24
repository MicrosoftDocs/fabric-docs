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

# Driver Mode Snapshot Documentation

## Overview

**Driver Mode Snapshot** enables loading Delta table snapshots in the driver process, rather than using distributed Spark operations. This approach can provide significant performance improvements for snapshot loading operations, especially for small Delta logs.

## Configuration Options

Driver Mode Snapshot behavior is controlled through several Spark configuration options:

### Core Configuration

| Configuration | Type | Default | Description |
|---------------|------|---------|-------------|
| `spark.microsoft.delta.snapshot.driverMode.enabled` | Boolean | | Enables/disables Driver Mode Snapshot |
| `spark.microsoft.delta.snapshot.driverMode.fallback.enabled` | Boolean | `true` | Enables automatic fallback to Spark mode on errors |

### Size Limits

| Configuration | Type | Default | Description |
|---------------|------|---------|-------------|
| `spark.microsoft.delta.snapshot.driverMode.maxLogSize` | Long | 8MB | Maximum Delta Log size (bytes) to process in driver mode (per table/version) |
| `spark.microsoft.delta.snapshot.driverMode.maxLogFileCount` | Integer | 10 | Maximum number of Delta Log files to process in driver mode |

## Performance Benefits

1. **Reduced Latency**: Eliminates Spark job scheduling overhead
2. **Local Processing**: All operations occur on the driver, reducing network I/O

## Usage Examples

### Basic Usage

```scala
// Set size limits (example values)
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.maxLogSize", "4MB")
spark.conf.set("spark.microsoft.delta.snapshot.driverMode.maxLogFileCount", "10")

// Load Delta table - will automatically use driver mode if applicable
spark.read.format("delta").load(path).count()
```

## Best Practices

### When to Use

Driver Mode Snapshot is most beneficial for:

- **Small Delta Logs**: Tables with manageable log sizes
- **Low-Latency Requirements**: Applications requiring fast snapshot loading

### When to Avoid

Consider traditional mode for:

- **Large Delta Logs**: Tables exceeding size/file count limits
- **Memory-Constrained Drivers**: Environments with limited driver memory

### Configuration Recommendations

1. **Start Conservative**: Begin with default size limits and increase based on monitoring
2. **Enable Fallback**: Always enable fallback in production environments (default)

## Troubleshooting

1. **Driver OOM Errors**
   - Reduce `maxLogSize` and `maxLogFileCount` limits or disable Driver mode
   - Consider increasing driver node size

2. **Fallback to traditional mode**
   - Check logs for fallback reasons. Look for log messages containing "Driver mode error"
   - Review size limit configuration. Look for log messages containing "Log size check"

3. **Performance Issues**
   - Compare with traditional Spark mode performance
   - Adjust configuration based on workload characteristics
