---
title: Python UDFs, Scala UDFs, and complex data types in native execution engine
description: Learn how the native execution engine in Microsoft Fabric accelerates Python UDFs, Scala UDFs, and complex data types like arrays, maps, and structs for faster Spark processing.
ms.topic: conceptual
ms.custom: sfi-image-nochange
ms.date: 05/23/2026
ai-usage: ai-assisted
---

# Python UDFs, Scala UDFs, and complex data types in native execution engine

The native execution engine in Microsoft Fabric now supports Python user-defined functions (UDFs), Scala UDFs, and complex data types (arrays, maps, and structs). These capabilities allow you to write expressive Spark applications without sacrificing performance.

## Python UDF support

Python is one of the most popular languages in data engineering and data science. Historically, Python UDFs introduced significant overhead in Spark due to serialization costs between the JVM and Python worker processes. The native execution engine minimizes these expensive transitions, enabling faster execution without code changes.

### How Python UDFs work in native execution engine

In a conventional Spark execution model, Python UDF execution involves:

1. Data conversion from Spark's internal format.
1. Serialization and transfer to Python worker processes.
1. Python UDF execution.
1. Serialization of results back into the JVM.
1. Spark resumes execution.

This cross-runtime movement creates serialization/deserialization costs, CPU inefficiency, and broken columnar execution pipelines. The native execution engine reduces this overhead by optimizing the data transfer path and maintaining vectorized processing where possible.

### Supported Python UDF types

The native execution engine supports:

- **Scalar UDFs**: Row-by-row Python functions registered with `udf()`.
- **Vectorized (Pandas) UDFs**: Functions decorated with `@pandas_udf` that operate on batches of data using Apache Arrow for efficient transfer.

Vectorized UDFs see the largest performance gains because they align naturally with the columnar processing model of the native execution engine.

### Example: Vectorized Python UDF

```python
import pandas as pd
from pyspark.sql.functions import pandas_udf
from pyspark.sql.types import DoubleType

@pandas_udf(DoubleType())
def calculate_discount(price: pd.Series, rate: pd.Series) -> pd.Series:
    return price * (1 - rate)

df = spark.table("sales.transactions")
result = df.withColumn("discounted_price", calculate_discount(df.price, df.discount_rate))
result.show()
```

No additional configuration is required beyond enabling the native execution engine. Existing Python UDFs benefit automatically.

## Scala UDF support

The native execution engine also accelerates Scala UDFs. Because Scala UDFs run natively in the JVM, the engine can offload supported operations to the vectorized C++ execution path while keeping Scala UDF evaluation efficient within the same runtime.

### Example: Scala UDF

```scala
import org.apache.spark.sql.functions.udf

val toUpperCase = udf((s: String) => s.toUpperCase)
val df = spark.table("catalog.customers")
val result = df.withColumn("name_upper", toUpperCase(df("name")))
result.show()
```

Scala UDFs that operate on supported data types are accelerated without code changes when the native execution engine is enabled.

## Complex data types support

Modern lakehouse architectures depend on semi-structured and nested data. The native execution engine now provides optimized support for:

| Data type | Description | Example use case |
|---|---|---|
| **Array** | Ordered collection of elements | Event tags, product categories |
| **Map** | Key-value pairs | Configuration properties, metadata |
| **Struct** | Named fields with different types | Nested customer records, address objects |

### Operations supported for complex types

The native execution engine accelerates common operations on complex data types:

- Array functions: `explode`, `array_contains`, `size`, `flatten`, `transform`
- Map functions: `map_keys`, `map_values`, `element_at`
- Struct access: Dot notation field access, `getField`
- Nested combinations: Arrays of structs, maps with array values

### Example: Working with arrays and structs

```python
from pyspark.sql.functions import explode, col, size

# Read data with nested schema
df = spark.table("events.telemetry")

# Operations on arrays - accelerated by native engine
result = (df
    .filter(size(col("tags")) > 0)
    .select(
        col("event_id"),
        col("metadata.source"),  # Struct field access
        explode(col("tags")).alias("tag")
    )
)
result.show()
```

### Example: Working with maps

```python
from pyspark.sql.functions import map_keys, map_values, col

df = spark.table("config.settings")

# Map operations - accelerated by native engine
result = (df
    .select(
        col("setting_id"),
        map_keys(col("properties")).alias("keys"),
        map_values(col("properties")).alias("values")
    )
)
result.show()
```

## Performance results

Internal benchmarking demonstrates significant improvements across workloads that use Python UDFs and complex data types:

| Workload type | Performance improvement |
|---|---|
| Vectorized Python UDFs | Up to 5.76x faster |
| Scalar Python UDFs | Up to 1.08x faster |
| TPC-DS end-to-end (with complex types) | Up to 2.35x faster |

These gains result from reduced serialization overhead, improved vectorization, and end-to-end columnar execution.

## Benefits for advanced lakehouse patterns

Complex data type acceleration is especially important for:

- **Z-ORDER optimization**: Nested columns participate in optimized data layout.
- **Liquid clustering**: Complex type columns benefit from clustering without flattening.
- **Semi-structured analytics**: JSON payloads and event streams remain nested for natural querying.
- **Event-driven architectures**: Telemetry and IoT data retain their hierarchical structure.

Instead of flattening data or restructuring pipelines for performance, work naturally with complex schemas while maintaining high execution efficiency.

## Enable the feature

Python UDF, Scala UDF, and complex data type support is available when the native execution engine is enabled. No additional configuration is needed.

To enable the native execution engine, see [Native execution engine for Fabric Data Engineering](native-execution-engine-overview.md#enable-the-native-execution-engine).

## Prerequisites

- [Runtime 1.3 (Apache Spark 3.5)](./runtime-1-3.md) or [Runtime 2.0 (Apache Spark 4.0)](./runtime-2-0.md).
- Native execution engine enabled at the environment, notebook, or Spark job definition level.

## Limitations

- Not all Python libraries are supported within the vectorized path. Libraries that require arbitrary Python object serialization might still trigger fallback.
- Deeply nested complex types (for example, arrays of maps of structs) might fall back to the JVM engine for certain operations.
- ANSI mode isn't supported with the native execution engine.

## Related content

- [Native execution engine for Fabric Data Engineering](native-execution-engine-overview.md)
- [Apache Spark Runtimes in Fabric](./runtime.md)
- [What is autotune for Apache Spark configurations in Fabric?](./autotune.md)
