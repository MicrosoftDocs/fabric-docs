---
title: Variant data type for Delta tables
description: Learn how the Variant data type stores semi-structured JSON-like data in Delta tables in Microsoft Fabric, how to query it, and its protocol requirements.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 07/16/2026
ms.search.form: delta lake variant semi-structured json
ai-usage: ai-assisted
---

# Variant data type for Delta tables

The Variant data type stores semi-structured, JSON-like data in a binary columnar format inside a Delta table. Instead of storing raw JSON as a `STRING` and parsing it at read time, store the data once as Variant and query nested fields directly by using dot and colon notation. This approach eliminates parsing overhead for each query.

Variant is a good fit for event data, application logs, API payloads, and other sources where the shape of the data varies or evolves over time.

> [!IMPORTANT]
> The Variant data type requires Fabric Spark runtime 2.0 (Delta 4.1) or later.

## Why use Variant

Teams often store semi-structured data as a `STRING` column and call `from_json()` every time they read it. That pattern repeats parsing work on every query and requires you to define the full schema upfront.

The Variant type improves on this pattern:

- **No repeated parsing** — Data is parsed once on write and stored in an efficient binary format, so queries read fields directly.
- **Schema-on-read** — You don't need to define every field upfront. New fields appear automatically as the source data changes.
- **Efficient access** — The binary columnar encoding lets the engine extract individual fields without deserializing the entire value.

## Create a table with a Variant column

Define a column with the `VARIANT` data type.

# [Spark SQL](#tab/sparksql)

```sql
CREATE TABLE analytics.events (
  event_id   BIGINT,
  event_time TIMESTAMP,
  data       VARIANT
)
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable
from pyspark.sql.types import LongType, TimestampType, VariantType

DeltaTable.create() \
    .tableName("analytics.events") \
    .addColumn("event_id", dataType=LongType()) \
    .addColumn("event_time", dataType=TimestampType()) \
    .addColumn("data", dataType=VariantType()) \
    .execute()
```

# [Scala](#tab/scala)

```scala
import io.delta.tables.DeltaTable
import org.apache.spark.sql.types._

DeltaTable.create()
  .tableName("analytics.events")
  .addColumn("event_id", LongType)
  .addColumn("event_time", TimestampType)
  .addColumn("data", VariantType)
  .execute()
```

---

## Load Variant data

Use `PARSE_JSON()` in Spark SQL, or `parse_json` in PySpark and Scala, to convert a JSON string into a Variant value on write. The following example loads a nested JSON document with objects and an array.

# [Spark SQL](#tab/sparksql)

```sql
INSERT INTO analytics.events
SELECT
  1 AS event_id,
  TIMESTAMP '2026-07-16 09:30:00' AS event_time,
  PARSE_JSON('{
    "user_id": 4471,
    "action": "checkout",
    "session": { "id": "a1b2c3", "duration.sec": 128 },
    "items": [
      { "sku": "TShirt-01", "qty": 2, "price": 19.99 },
      { "sku": "Mug-07", "qty": 1, "price": 8.50 }
    ],
    "beta_user": true
  }') AS data
```

# [PySpark](#tab/pyspark)

```python
from pyspark.sql.functions import parse_json, to_timestamp

json_str = '{"user_id": 4471, "action": "checkout", ' \
           '"session": {"id": "a1b2c3", "duration.sec": 128}, ' \
           '"items": [{"sku": "TShirt-01", "qty": 2, "price": 19.99}, ' \
           '{"sku": "Mug-07", "qty": 1, "price": 8.50}], "beta_user": true}'

spark.createDataFrame([(1, "2026-07-16 09:30:00", json_str)],
                      ["event_id", "event_time", "raw_json"]) \
    .select("event_id",
            to_timestamp("event_time").alias("event_time"),
            parse_json("raw_json").alias("data")) \
    .write.mode("append").saveAsTable("analytics.events")
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions.{parse_json, to_timestamp}

val jsonStr =
  """{"user_id": 4471, "action": "checkout",
     "session": {"id": "a1b2c3", "duration.sec": 128},
     "items": [{"sku": "TShirt-01", "qty": 2, "price": 19.99},
               {"sku": "Mug-07", "qty": 1, "price": 8.50}],
     "beta_user": true}"""

Seq((1L, "2026-07-16 09:30:00", jsonStr))
  .toDF("event_id", "event_time", "raw_json")
  .select($"event_id",
          to_timestamp($"event_time").as("event_time"),
          parse_json($"raw_json").as("data"))
  .write.mode("append").saveAsTable("analytics.events")
```

---

When you load from an existing column that already holds JSON text, pass that column to the same function instead of a literal string.

## Query Variant fields

You can extract fields from a Variant value in two ways, and both methods are available in Spark SQL:

- **Colon path notation** — `data:user_id` navigates into the Variant. This syntax is shorthand for the `variant_get` function.
- **The `variant_get` function** — `variant_get(data, '$.user_id', 'int')` takes the Variant value, a JSONPath-style path that starts with `$`, and a target type.

To convert an extracted value to a specific type, use the `::` operator, which is shorthand for `CAST(... AS type)`. For example, `data:user_id::INT` is equivalent to `CAST(variant_get(data, '$.user_id') AS INT)` and to `variant_get(data, '$.user_id', 'int')`.

To escape fields with special characters, use `['<field>']`. For example, `data:['duration.sec']`.

The following examples use colon notation in the Spark SQL tab because it's the most concise form, and the `variant_get` function in the PySpark and Scala tabs. In Spark SQL, you can use either form.

### Access top-level fields

# [Spark SQL](#tab/sparksql)

```sql
SELECT event_id,
       data:user_id::INT       AS user_id,
       data:action::STRING     AS action,
       data:beta_user::BOOLEAN AS beta_user
FROM   analytics.events
```

# [PySpark](#tab/pyspark)

```python
from pyspark.sql.functions import col, variant_get

spark.table("analytics.events").select(
    col("event_id"),
    variant_get(col("data"), "$.user_id", "int").alias("user_id"),
    variant_get(col("data"), "$.action", "string").alias("action"),
    variant_get(col("data"), "$.beta_user", "boolean").alias("beta_user"))
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions.{col, variant_get}

spark.table("analytics.events").select(
  col("event_id"),
  variant_get(col("data"), "$.user_id", "int").as("user_id"),
  variant_get(col("data"), "$.action", "string").as("action"),
  variant_get(col("data"), "$.beta_user", "boolean").as("beta_user"))
```

---

### Access nested objects

Chain accessors to reach fields inside nested objects.

# [Spark SQL](#tab/sparksql)

```sql
SELECT event_id,
       data:session:id::STRING        AS session_id,
       data:session:duration_sec::INT AS duration_sec
FROM   analytics.events
```

# [PySpark](#tab/pyspark)

```python
from pyspark.sql.functions import col, variant_get

spark.table("analytics.events").select(
    col("event_id"),
    variant_get(col("data"), "$.session.id", "string").alias("session_id"),
    variant_get(col("data"), "$.session.duration_sec", "int").alias("duration_sec"))
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions.{col, variant_get}

spark.table("analytics.events").select(
  col("event_id"),
  variant_get(col("data"), "$.session.id", "string").as("session_id"),
  variant_get(col("data"), "$.session.duration_sec", "int").as("duration_sec"))
```

---

### Access array elements

Use a zero-based index to access array elements. Combine it with field accessors to get values inside each element.

# [Spark SQL](#tab/sparksql)

```sql
SELECT event_id,
       data:items[0]:sku::STRING   AS first_sku,
       data:items[0]:qty::INT      AS first_qty,
       data:items[1]:price::DOUBLE AS second_price
FROM   analytics.events
```

# [PySpark](#tab/pyspark)

```python
from pyspark.sql.functions import col, variant_get

spark.table("analytics.events").select(
    col("event_id"),
    variant_get(col("data"), "$.items[0].sku", "string").alias("first_sku"),
    variant_get(col("data"), "$.items[0].qty", "int").alias("first_qty"),
    variant_get(col("data"), "$.items[1].price", "double").alias("second_price"))
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions.{col, variant_get}

spark.table("analytics.events").select(
  col("event_id"),
  variant_get(col("data"), "$.items[0].sku", "string").as("first_sku"),
  variant_get(col("data"), "$.items[0].qty", "int").as("first_qty"),
  variant_get(col("data"), "$.items[1].price", "double").as("second_price"))
```

---

### Filter on Variant fields

Filter and aggregate on extracted values just like regular columns.

# [Spark SQL](#tab/sparksql)

```sql
SELECT data:action::STRING AS action,
       COUNT(*)            AS event_count
FROM   analytics.events
WHERE  data:beta_user::BOOLEAN = true
GROUP BY data:action::STRING
```

# [PySpark](#tab/pyspark)

```python
from pyspark.sql.functions import col, count, variant_get

action = variant_get(col("data"), "$.action", "string")

spark.table("analytics.events") \
    .where(variant_get(col("data"), "$.beta_user", "boolean") == True) \
    .groupBy(action.alias("action")) \
    .agg(count("*").alias("event_count"))
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions.{col, count, variant_get}

val action = variant_get(col("data"), "$.action", "string")

spark.table("analytics.events")
  .where(variant_get(col("data"), "$.beta_user", "boolean") === true)
  .groupBy(action.as("action"))
  .agg(count("*").as("event_count"))
```

---

### Handle missing or mismatched fields

Use `try_variant_get` when a field might be missing or hold a value that can't be cast to the requested type. Instead of failing the query, it returns `NULL` for those rows.

# [Spark SQL](#tab/sparksql)

```sql
SELECT event_id,
       try_variant_get(data, '$.items[1].price', 'double') AS second_price
FROM   analytics.events
```

# [PySpark](#tab/pyspark)

```python
from pyspark.sql.functions import col, try_variant_get

spark.table("analytics.events").select(
    col("event_id"),
    try_variant_get(col("data"), "$.items[1].price", "double").alias("second_price"))
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions.{col, try_variant_get}

spark.table("analytics.events").select(
  col("event_id"),
  try_variant_get(col("data"), "$.items[1].price", "double").as("second_price"))
```

---

### Inspect the shape of Variant data

Use `schema_of_variant` to discover the inferred structure of a Variant value, which is helpful when the source schema isn't documented.

# [Spark SQL](#tab/sparksql)

```sql
SELECT DISTINCT schema_of_variant(data) AS inferred_schema
FROM   analytics.events
```

# [PySpark](#tab/pyspark)

```python
from pyspark.sql.functions import col, schema_of_variant

spark.table("analytics.events") \
    .select(schema_of_variant(col("data")).alias("inferred_schema")) \
    .distinct()
```

# [Scala](#tab/scala)

```scala
import org.apache.spark.sql.functions.{col, schema_of_variant}

spark.table("analytics.events")
  .select(schema_of_variant(col("data")).as("inferred_schema"))
  .distinct()
```

---

## Understand the protocol impact

The Variant type requires Delta reader version 3 and writer version 7. Both the reader and writer must support the Variant type table feature.

> [!IMPORTANT]
> Enabling the Variant type upgrades the table protocol permanently. Older readers and writers that don't support the Variant type feature can't read or write the table. Test the feature on nonproduction tables first, and verify that every engine and runtime that accesses the table supports Variant before you use it on shared tables.

You can inspect protocol-related metadata by using `DESCRIBE DETAIL` and by reviewing the table properties in the Delta log.

## Best practices

- Use Variant for genuinely semi-structured or evolving data rather than for well-defined columns that belong in a typed schema.
- Cast extracted Variant fields to explicit types so downstream consumers get stable, predictable data types.
- Confirm that all readers and writers support the Variant type feature before you enable it on shared tables.
- Validate the feature on a nonproduction table first, because the protocol upgrade is permanent.

## Related content

- [Schema evolution for Delta tables](delta-lake-schema-evolution.md)
- [Delta Lake interoperability](../fundamentals/delta-lake-interoperability.md)
- [Delta Lake in Microsoft Fabric overview](../fundamentals/delta-lake-overview.md)
