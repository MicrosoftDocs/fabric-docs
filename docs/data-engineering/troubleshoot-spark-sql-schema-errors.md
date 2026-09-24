---
title: Troubleshoot Spark SQL and schema errors
description: Resolve Spark SQL and schema errors in Fabric, including analysis exceptions, cross-version changes, missing tables or views, and Parquet inference failures.
ms.topic: troubleshooting-error-codes
ms.date: 07/27/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Troubleshoot Spark SQL and schema errors

Use this guide to diagnose and resolve SQL query, schema, and metadata errors in Microsoft Fabric Spark jobs, including analysis exceptions, cross-version behavior changes, unresolved tables or views, and Parquet schema inference failures. For other Spark job errors, see [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md).

## Inconsistent behavior across Spark versions

The `INCONSISTENT_BEHAVIOR_CROSS_VERSION` error indicates your Spark application is producing different results, failing, or behaving differently after a runtime version change. The same code and data that worked on the previous version now produces unexpected output, errors, or performance degradation.

### Fabric runtime compatibility matrix

| Component    | Runtime 1.2 | Runtime 1.3 | Runtime 2.0 |
|--------------|-------------|-------------|-------------|
| Apache Spark | 3.4         | 3.5         | 4.1         |
| Java         | 11          | 11          | 21          |
| Scala        | 2.12        | 2.12        | 2.13        |
| Python       | 3.10        | 3.11        | 3.13        |
| R            | 4.2         | 4.4         | 4.5         |
| Delta Lake   | 2.4         | 3.2         | 4.2         |

### Common categories

| Category | Examples |
|----|----|
| Datetime / Timestamp incompatibility | Different parsing, Proleptic Gregorian vs Julian calendar |
| Query result differences | Different row counts, values, or column ordering |
| New errors on existing code | `ClassNotFoundException`, deprecated API removal |
| Performance regression | Same job takes significantly longer |
| Delta Lake compatibility | `InvalidProtocolVersionException` |
| Library / dependency mismatch | Python package version changes, Scala/Java upgrade |

### Category A — Datetime and timestamp incompatibility

**Why it happens:** Spark 3.0+ switched from hybrid Julian/Gregorian to Proleptic Gregorian calendar. Parquet INT96 and datetime formats written with the old behavior might now be misinterpreted. Legacy datetime settings might not propagate correctly in high concurrency mode.

**Step 1:** Identify if this affects you. Does your data/workflow involve:

- Historical dates (pre-1900 or pre-1582)?

- Parquet files/tables created before a recent upgrade?

- Failures only in upgraded or high-concurrency environments?

- Error logs containing INCONSISTENT_BEHAVIOR_CROSS_VERSION or READ_ANCIENT_DATETIME?

**Step 2:** Set Spark configuration for datetime rebase modes:

```python
spark.conf.set("spark.sql.parquet.int96RebaseModeInRead", "CORRECTED")  
spark.conf.set("spark.sql.parquet.int96RebaseModeInWrite", "CORRECTED")  
spark.conf.set("spark.sql.parquet.datetimeRebaseModeInRead", "CORRECTED")  
spark.conf.set("spark.sql.parquet.datetimeRebaseModeInWrite", "CORRECTED")
```

> [!IMPORTANT]
> Validate before production use. Before applying `CORRECTED` mode to a production pipeline, test on a sample dataset first. Setting `CORRECTED` on data originally written with `LEGACY` behavior can cause silent date value shifts for historical dates (pre-1582). Run `SELECT MIN(date_col), MAX(date_col) FROM my_table` on a sample and compare the results between settings before you commit to a full pipeline run. If the results differ on historical dates, use `LEGACY` for existing data and plan a migration to `CORRECTED` for new data.

- Use "CORRECTED" for new and consistent behavior across environments (recommended).

- Use "LEGACY" only if you have data written with pre-upgrade runtimes that now fails to read back.

Or via %%configure:

```python
%%configure  
{  
"conf": {  
"spark.sql.parquet.int96RebaseModeInRead": "CORRECTED",  
"spark.sql.parquet.int96RebaseModeInWrite": "CORRECTED",  
"spark.sql.parquet.datetimeRebaseModeInRead": "CORRECTED",  
"spark.sql.parquet.datetimeRebaseModeInWrite": "CORRECTED"  
}  
}
```

> [!IMPORTANT]
> In high concurrency mode, settings must be applied at the notebook/session level; environment or cluster-wide settings might not propagate.

**Step 3:** Validate:

- Rerun failed jobs/notebooks.

- Verify the setting took effect:

```python
print(spark.conf.get("spark.sql.parquet.datetimeRebaseModeInRead"))
```

### Category B — Scala, Java, or Python version changes

| Fabric Runtime | Spark | Java | Scala | Python |
|----------------|-------|------|-------|--------|
| Runtime 1.2    | 3.4   | 11   | 2.12  | 3.10   |
| Runtime 1.3    | 3.5   | 11   | 2.12  | 3.11   |
| Runtime 2.0    | 4.1   | 21   | 2.13  | 3.13   |

**What to do:**

- Rebuild custom JARs against the new Scala/Spark version. Use provided scope for Spark in Maven/SBT.

- For ClassNotFoundException with third-party JARs, verify the JAR has the correct Scala suffix (for example, _2.12).

- For Python ModuleNotFoundError, install missing packages explicitly:

```python
%pip install pandas==2.0.3
```

### Category C — Delta Lake protocol incompatibility

**Why it happens:** Delta Lake uses protocol versions to track table features. Protocol upgrades are irreversible.

| Scenario | Result |
|----|----|
| Enabled Deletion Vectors on Runtime 1.2, read on Runtime 1.1 | Fails: Runtime 1.1 doesn't support the protocol |
| Created table with TimestampNTZ on Runtime 1.2 | Requires reader version 3: Runtime 1.1 can't read |
| Table written externally with writer version 6 | Might not be supported by the Fabric Delta runtime |

**What to do:**

- Move forward, not backward: use a runtime that supports the protocol.

- Avoid mixing runtimes on the same Delta tables.

- Check protocol before enabling new features:

```sql
DESCRIBE DETAIL my_table
```

### Category D — Spark SQL behavioral changes

**Why it happens:** Spark versions change default behaviors (ANSI mode, cast rules, null handling).

**What to do:**

- If ANSI mode causes stricter behavior:

```python
spark.conf.set("spark.sql.ansi.enabled", "false")
```

- For date/time parsing changes:

```python
spark.conf.set("spark.sql.legacy.timeParserPolicy", "LEGACY")
```

- For stricter INSERT type checking:

```python
spark.conf.set("spark.sql.storeAssignmentPolicy", "LEGACY")
```

Legacy settings are a short-term fix. Plan to update your code for the new behavior.

## AnalysisException in Spark

An `AnalysisException` is thrown during Spark's query analysis phase, before any data is processed. Spark validates your SQL or DataFrame query and checks that all referenced tables, columns, functions, and types exist and are compatible. If something doesn't check out, Spark rejects the query immediately. This is almost always a user-side issue: a typo, a missing table, a schema mismatch, or an unsupported operation. Because it fails early, no compute resources are wasted.

Typical error patterns:

```text
org.apache.spark.sql.AnalysisException: Table or view not found: my_table

org.apache.spark.sql.AnalysisException: [UNRESOLVED_COLUMN.WITH_SUGGESTION]  
A column or function parameter with name 'NotARealColumn' cannot be resolved.  
Did you mean one of the following? [Revenue, GrossRevenue, Rating, Branch, City]

org.apache.spark.sql.AnalysisException: Data type mismatch: ...
```

### Step 1: Read the error message carefully

The `AnalysisException` message almost always contains:

- What failed: the table, column, function, or operation

- Why it failed: not found, type mismatch, ambiguous reference

- What was available: the list of valid columns, tables, or types

Example of a column name typo:

```text
AnalysisException: cannot resolve '`salery`' given input columns:  
[employee.name, employee.salary, employee.dept]
```

The error shows you typed "salery" when the column is actually called "salary".

### Step 2: Match your error to a scenario

Compare your error text to the following scenarios, and then apply the matching fix.

#### Scenario A — Table or view not found

```text
Table or view not found: my_table
```

- Typo in the table name: double-check spelling and case.

- Wrong database/schema: use a fully qualified name:

```python
spark.sql("SELECT * FROM my_catalog.my_schema.my_table")
```

- Temp view expired: if the session restarted, the view is gone. Re-create it:

```python
df.createOrReplaceTempView("my_table")
```

- Table not yet written—ensure the upstream notebook/cell has completed.

- Lakehouse not attached—in Fabric, verify the lakehouse is attached to your notebook.

#### Scenario B — Column not found

```text
[UNRESOLVED_COLUMN.WITH_SUGGESTION] A column or function parameter  
with name 'X' cannot be resolved.
```

- Typographical error in the column name: compare with the suggestions in the error.

- Column was renamed or dropped upstream: check the schema:

```python
df.printSchema()
```

- Column exists in a different DataFrame: after a join, reference the correct source:

```python
df1.join(df2, df1.id == df2.id).select(df1.id, df2.name)
```

#### Scenario C — Ambiguous column reference

```text
[AMBIGUOUS_REFERENCE] Reference 'Quantity' is ambiguous,  
could be: [a.Quantity, b.Quantity]
```

**What to do:** Qualify the column with the table alias:

```python
# SQL  
spark.sql("""
  SELECT a.id, b.name  
  FROM table_a a JOIN table_b b ON a.id = b.id  
""")

# DataFrame API  
df1.alias("a").join(df2.alias("b"), col("a.id") == col("b.id")) \
  .select("a.id", "b.name")
```

For a complete list of available SQL functions, see [Spark SQL Built-in Functions](https://spark.apache.org/docs/latest/api/sql/).

#### Scenario D — Data type mismatch

```text
Data type mismatch: differing types in '(col_a = col_b)': int vs string
```

**What to do:** Explicitly cast to a common type:

```python
from pyspark.sql.functions import col  
df = df1.join(df2, df1["id"].cast("string") == df2["id_str"])
```

#### Scenario E — Function not found

```text
Undefined function: 'my_function'
```

**What to do:**

- Typographical error: check the Spark SQL function reference.

- UDF not registered:

```python
spark.udf.register("my_function", my_function)
```

- Function removed in a version upgrade: check the migration guide.

#### Scenario F — Schema mismatch on write / INSERT

```text
[_LEGACY_ERROR_TEMP_DELTA_0007] A schema mismatch detected  
when writing to the Delta table...
```

**What to do:**

- Check what the target expects:

```python
spark.sql("DESCRIBE my_table").show()
```

- Check what you're writing:

```python
df.printSchema()
```

- Align columns and types:

```python
df = df.select("col_a", "col_b", "col_c")  
df = df.withColumn("col_a", col("col_a").cast("int"))
```

- For Delta schema evolution:

```python
df.write.format("delta") \
  .option("mergeSchema", "true") \
  .mode("append") \
  .save("/path/to/table")
```

#### Scenario G — Delta Lake AnalysisException

| Error | Cause | Fix |
|----|----|----|
| Cannot write to table that requires reader/writer version N | Delta protocol incompatibility | Use a runtime that supports the required protocol |
| A schema mismatch detected when writing to the Delta table | New data has extra/missing columns | Enable schema merging or fix the schema |
| Incompatible format detected | Writing to a Delta path with non-Delta format | Ensure the target path is a Delta table |
| Operation not allowed: can't change partition columns | Trying to alter partitioning | Create a new table with the desired partitioning |

For more information about Delta Lake schema evolution, table features, and protocol versions, see [Delta Lake Documentation](https://docs.delta.io/latest/index.html).

#### Scenario H — Path / file not found

```text
Path does not exist: abfss://container@account.dfs.core.windows.net/my/path
```

**What to do:**

- Typographical error in the path: double-check the container name, storage account, and file path.

- File was deleted or moved: verify the file exists in your lakehouse/storage explorer.

- Wrong storage account or workspace.

- Permissions issue: the error sometimes shows "path not found" when it's actually "access denied."

> [!IMPORTANT]
> In Fabric notebooks, reading from the nbresource folder with Spark isn't supported. Use Python file I/O (`open()`) instead of `spark.read` for notebook resource files. Use `.save()` instead of `.saveAsTable()` when writing to an explicit path.

#### Scenario I — Unsupported operation

```text
Unsupported operation: ALTER TABLE ADD COLUMNS ... for non-Delta tables
```

**What to do:** Check if the feature requires Delta format. Convert if needed:

```python
from delta.tables import DeltaTable  
DeltaTable.convertToDelta(spark, "parquet.`/path/to/table`")
```

### Debugging techniques

- Print the Schema:

```python
df.printSchema()  
spark.sql("DESCRIBE EXTENDED my_table").show(truncate=False)
```

- List Available Tables:

```python
spark.sql("SHOW TABLES").show()
```

- List Available Columns:

```python
spark.sql("DESCRIBE my_table").show()
```

- Test Queries Incrementally — build step by step:

```python
spark.sql("SELECT * FROM my_table LIMIT 5").show()  
spark.sql("SELECT col_a, col_b FROM my_table LIMIT 5").show()
```

- Check Spark Configuration:

```python
for k, v in sorted(spark.sparkContext.getConf().getAll()):  
    print(f"{k} = {v}")
```

### Quick-reference troubleshooting table

| Error message contains | Likely cause | First action |
|----|----|----|
| Table or view not found | Missing table or wrong database | Check spelling; use fully qualified name |
| can't resolve + column name | Missing or misspelled column | Run `df.printSchema()` or DESCRIBE table |
| Reference ... is ambiguous | Duplicate column name after join | Qualify with table alias: a.id |
| Data type mismatch | Incompatible types in comparison | Cast columns to a common type |
| Undefined function | Missing or unregistered UDF | Check spelling; register UDF if custom |
| Cannot write incompatible data | Schema mismatch on write | Compare source/target schemas; cast/select |
| Path doesn't exist | Wrong file path or deleted file | Verify path in storage explorer |
| Cannot safely cast | Strict type checking on INSERT | Cast column explicitly before writing |
| DeltaAnalysisException | Delta-specific schema/protocol issue | See Delta Lake section above |
| Unsupported operation | Feature not available for table format | Check if Delta format is required |

## Table or view not found

**Error code:** `Spark_User_MetaStore_TableOrViewNotFound`

### What does this error mean?

Spark couldn't resolve a table or view name against the metastore during query analysis - before Spark processes any data. The table either doesn't exist under the name you used, exists in a different database or workspace context, or was dropped or renamed.

### Error messages to look for

```text
Table or view not found: my_table
[TABLE_OR_VIEW_NOT_FOUND]
AnalysisException: Table or view not found
```

### Common causes and fixes

Review these typical causes to find the one that matches your situation, and then apply its fix.

#### Typo or unqualified table name

This cause is the most common. Check the spelling, and then use fully qualified names so name resolution doesn't depend on the current database context.

```sql
-- Prefer fully qualified names
SELECT * FROM my_lakehouse.dbo.sales_orders;

-- List what actually exists
SHOW TABLES IN my_lakehouse;
```

#### Wrong database or lakehouse context

The table exists, but it's in a different database, schema, or lakehouse than the one currently attached to the notebook. In Fabric, an unqualified table name resolves against the notebook's default lakehouse.

- Verify which lakehouse is attached as the default in the notebook explorer.
- Run `spark.catalog.currentDatabase()` to confirm the active database context.

#### Table dropped, renamed, or not yet created

An upstream pipeline, another notebook, or another user dropped or renamed the table. In multistep pipelines, a downstream activity might run before the upstream table-creation step completes.

- Check pipeline dependencies and activity ordering.
- Add an existence check before reading: `spark.catalog.tableExists("my_lakehouse.dbo.sales_orders")`.

#### Session restart cleared temporary views

Temporary views created with `createOrReplaceTempView()` live only for the current Spark session. If the session restarts (timeout, kernel restart, or `%%configure` rerun), earlier temporary views are gone, and you must re-create them.

#### Cross-workspace reference without access

You referenced a table in another workspace's lakehouse without the required permissions, or the shortcut backing the table points to a location that no longer exists.

> [!NOTE]
> Errors with this code that originate inside a notebook SQL cell surface as `AnalysisException`. For more information, see [AnalysisException in Spark](#analysisexception-in-spark). Errors from Spark job definitions and pipeline activities surface under this code directly. The resolution steps are the same.

### Quick-reference troubleshooting table

| Symptom | Likely cause | First action |
|----|----|----|
| Fails only with unqualified name | Wrong default lakehouse or database | Use `catalog.schema.table` |
| Worked yesterday, fails today | Table dropped or renamed upstream | Check pipeline lineage |
| Fails after kernel restart | Temporary view lost with session | Re-create the temporary view |
| Fails only for some users | Cross-workspace permissions | Verify workspace access |

## Unable to infer Parquet schema

**Error code:** `Spark_User_Parquet_NeedsManualSchema`

### What does this error mean?

Spark can't automatically infer a schema when reading Parquet files. Because Parquet files include their own schema metadata, this error usually means Spark found no usable Parquet files at the path. The directory might be empty, contain only non-Parquet files, or contain files whose schemas are inconsistent with each other.

### Error messages to look for

```text
Spark_User_Parquet_NeedsManualSchema
Unable to infer schema for Parquet
Schema must be specified manually
```

### Why this error happens

- You try to read from an empty directory - no Parquet files exist from which to infer a schema.
- The directory contains Parquet files with inconsistent schemas (for example, written by different pipeline versions).
- The path exists but has no Parquet metadata (wrong path, or the files are actually CSV or JSON).

### Resolution steps

1. Check whether the directory is empty before reading:

   ```python
   files = notebookutils.fs.ls("abfss://path")
   if len(files) == 0:
       print("Directory is empty - no schema to infer")
   ```

1. If an empty directory is a legitimate state (for example, no data yet for a partition), provide the schema explicitly:

   ```python
   from pyspark.sql.types import StructType, StructField, StringType, IntegerType

   schema = StructType([
       StructField("name", StringType(), True),
       StructField("age", IntegerType(), True),
   ])

   df = spark.read.schema(schema).parquet("abfss://path")
   ```

1. If schemas are inconsistent across files, enable schema merging to reconcile compatible differences:

   ```python
   df = spark.read.option("mergeSchema", "true").parquet("abfss://path")
   ```

1. Verify the files are actually Parquet - check file extensions and confirm the writing process succeeded.

> [!NOTE]
> `mergeSchema` reconciles compatible schema differences (added columns) but can't fix conflicting types for the same column. For type conflicts, read the file groups separately, cast to a common schema, and union.

### Quick-reference troubleshooting table

| Symptom | Likely cause | First action |
|----|----|----|
| Error on an empty directory | No Parquet files to infer a schema from | Provide the schema explicitly |
| Fails after mixing file versions | Inconsistent schemas across files | Enable `mergeSchema` |
| Path has no Parquet metadata | Wrong path, or files are CSV or JSON | Verify file extensions and the path |

## Related content

- [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md)
- [Troubleshoot permissions and capacity errors](troubleshoot-permissions-capacity.md)
