---
title: Troubleshoot Spark application code, data, and library errors
description: Diagnose and resolve Spark application code, data, and library errors in Microsoft Fabric, including Delta Lake, streaming, user code, and NotebookUtils errors.
ms.topic: troubleshooting-error-codes
ms.date: 07/27/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Troubleshoot Spark application code, data, and library errors in Microsoft Fabric

Use this guide to diagnose and resolve application code, data transformation, and library errors in Microsoft Fabric Spark jobs, including Delta Lake and streaming exceptions, user code failures, library installation issues, and NotebookUtils empty string errors. For other Spark job errors, see [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md).

## Delta Lake and streaming errors

### DeltaLake DataTransformationException

**Error:** `Spark_Ambiguous_DeltaLake_DataTransformationException`

The full error code might include a user application exception class name rather than a Fabric-specific code.

**Why it happens:** A data transformation error occurred while processing data for a Delta Lake operation.

**What to do:**

- Examine the full stack trace—it usually identifies the specific column or transformation that failed.

- Check for data quality issues: null values in non-nullable columns, values exceeding column constraints.

- Verify source data schema matches the target Delta table schema:

```python
df.printSchema()  
spark.sql("DESCRIBE EXTENDED target_table").show(truncate=False)
```

- Add data validation before the write operation:

```python
df = df.filter(col("required_col").isNotNull())  
df = df.withColumn("col_a", col("col_a").cast("expected_type"))
```

### Streaming query exception

**Error:** `Spark_Ambiguous_DeltaLake_org.apache.spark.sql.streaming.StreamingQueryException`

**Why it happens:** An exception occurred during Spark structured streaming operations.

**What to do:**

- Read the full stack trace: it wraps the actual root cause (OOM, storage error, schema mismatch).

- Verify source and sink availability.

- Check streaming checkpoints are valid and accessible.

- If the checkpoint is corrupted, you might need to restart the stream from scratch.

- For `OutOfMemoryError` inside a streaming query, see the Memory Issues section.

## Application code errors

### UserApp NullPointerException

**Error:** `Spark_Ambiguous_UserApp_NullPointer`

**Why it happens:** A `NullPointerException` occurred in your application code.

**What to do:**

- Read the full stack trace: identify whether the null pointer is in your code or in a Spark internal component.

- Common causes:

- Null values in DataFrame columns passed to UDFs:

```python
@udf(returnType=StringType())  
def safe_upper(x):  
    return x.upper() if x is not None else None
```

- Filter nulls before processing:

```python
df = df.filter(col("my_col").isNotNull())
```

- Avoid referencing non-serializable objects inside Spark transformations.

### UserApp IllegalStateException

**Error:** `Spark_Ambiguous_UserApp_IllegalStateException`

**Why it happens:** An `IllegalStateException` occurred in your application code. Your code called an operation at an invalid time or in an invalid state.

**What to do:**

- Read the stack trace to identify the exact location.

- Don't call spark.stop() mid-notebook.

- Avoid sharing mutable state across Spark tasks.

- Spark iterators can only be traversed once—don't reuse them.

### UserApp JobAborted

**Error:** `Spark_Ambiguous_UserApp_JobAborted`

**Why it happens:** A Spark job was aborted, typically because a stage failed after exhausting retries.

**What to do:**

- Review the cause inside the "SparkException: Job aborted" message—it wraps the real error.

- Common wrapped errors: TaskFailedException, FetchFailedException, FileNotFoundException.

- In the Spark UI, select the **Stages** tab, select the failed stage, and review the task failure reason.

### Non-JVM user app failures

**Errors:** `Spark_Ambiguous_NonJvmUserApp_ExitWithStatus1`, `Spark_Ambiguous_NonJvmUserApp_FailedContainerLaunch`

**Why it happens:** A Python, R, or other non-JVM application failed to start or exited with an error.

**What to do:**

- ExitWithStatus1: Check driver logs (stderr) for the Python/R stack trace—SyntaxError, ModuleNotFoundError, and similar errors.

- FailedContainerLaunch: Incompatible or corrupted custom library, or resource constraints.

- Test your code locally or in a minimal notebook first.

- Remove custom libraries one by one to isolate the issue.

### UserApp ClassNotFound

**Error:** `Spark_User_UserApp_ClassNotFound`

**Why it happens:** Your Spark job tried to load a Java/Scala class that doesn't exist in the classpath. A missing library, incorrect import, or version mismatch typically causes this error.

**What to do:**

- **Missing JAR dependency:** Upload the required JAR to your Fabric environment or attach it to the session:

```python
%%configure  
{"jars": ["abfss://container@account.dfs.core.windows.net/libs/my-lib.jar"]}
```

- **Incorrect class name or package path:** Verify the fully qualified class name matches the library version you're using.

- **Library version mismatch:** The class might exist in a different version of the library. Check which version is installed:

```python
# Check installed libraries  
spark.sparkContext.getConf().get("spark.jars")
```

- **Fat JAR not built correctly:** If you use a fat/uber JAR, ensure all transitive dependencies are included. Check the JAR contents:

```bash
# From a terminal  
jar tf my-app.jar | grep ClassName
```

### NonJvmUserApp TypeError

**Error:** `Spark_User_NonJvmUserApp_TypeError`

**Why it happens:** Your PySpark code raised a Python `TypeError` exception. This error occurs when you apply an operation to an object of an inappropriate type.

**What to do:**

- Check for type mismatches in UDF return types—ensure your UDF return type annotation matches the actual return value.

- Verify DataFrame column types before operations like joins, filters, or aggregations.

- Use explicit type casting when needed:

```python
from pyspark.sql.functions import col  
df = df.withColumn("amount", col("amount").cast("double"))
```

- Check for `None`/null handling—PySpark UDFs receiving null values might cause `TypeError`s if not handled.

### UserApp KeyError

**Error:** `Spark_User_UserApp_KeyError`

**Why it happens:** Your PySpark code raised a Python `KeyError` exception, typically when accessing a dictionary with a key that doesn't exist.

**What to do:**

- Use .get() with a default value instead of direct dictionary access:

```python
# Instead of: value = my_dict[key]  
value = my_dict.get(key, default_value)
```

- Check for column name changes—if the upstream data schema changed, a previously valid key might no longer exist.

- Add error handling in UDFs:

```python
def safe_lookup(key):  
    try:  
        return lookup_dict[key]  
    except KeyError:  
        return None
```

### UserApp AssertionError

**Error:** `Spark_User_UserApp_AssertionError`

**Why it happens:** Your code raised a Python `AssertionError`. This happens when an assert statement fails, indicating a condition your code expected to be true was false.

**What to do:**

- Review your assert statements—the condition being checked isn't met at runtime:

```python
# This will raise AssertionError if df is empty  
assert df.count() > 0, "DataFrame is empty"
```

- Add proper error handling instead of relying on assertions:

```python
if df.count() == 0:  
    raise ValueError("No data to process")
```

- Check for data quality issues—assertions often guard data integrity assumptions that might fail with new data.

### UserApp AttributeError

**Error:** `Spark_User_UserApp_AttributeError`

**Why it happens:** Your PySpark code tried to access an attribute or method that doesn't exist on an object.

**What to do:**

- Check for API changes between Spark versions—a method that existed in Spark 3.3 might be renamed or removed in Spark 3.5. See [Spark SQL Migration Guide](https://spark.apache.org/docs/latest/sql-migration-guide.html) for version-specific breaking changes.

- Verify the object type. A common mistake is calling DataFrame methods on a Row, string, or None:

```python
# Wrong: df.collect() returns a list, not a DataFrame  
result = df.collect()  
result.show() # AttributeError!  
  
# Correct:  
result = df.collect() # This is a list  
df.show() # Call show() on the DataFrame
```

- Check for None values—calling methods on None objects causes AttributeError.

For the complete DataFrame API reference, see [PySpark DataFrame API](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html).

## Library and environment errors

### Conda PipFailed — library installation failure

**Error:** `Spark_User_Conda_PipFailed`

**Why it happens:** A library installation (via pip or conda) failed during environment setup for your Spark session. Fabric creates a custom environment based on your configuration, and this error occurs when that setup fails.

**What to do:**

- **Package doesn't exist on PyPI/Conda:** Verify the package name and version are correct:

  - Check on PyPI: `https://pypi.org/project/<package-name>/`
  - Or run locally: `pip install <package-name>==<version>`

- **Version conflict with pre-installed packages:** Fabric environments come with pre-installed packages. Your requested version might conflict. Check the Fabric runtime release notes for the list of pre-installed packages and their versions. Try removing the version pin to let pip resolve a compatible version.

- **Package requires system-level dependencies:** Some Python packages require C libraries or system packages that aren't available in the Fabric environment. Use pre-compiled wheels when possible, or choose a pure-Python alternative.

- **Network connectivity issue:** If you use a private endpoint or firewall, ensure the Fabric environment can reach PyPI or your private package feed.

- **Custom environment configuration error:** Review your environment.yml or requirements.txt for syntax errors. Test your environment locally before deploying to Fabric.

## NotebookUtils errors

### NotebookUtils EmptyString

**Error:** `Spark_Ambiguous_MsSparkUtils_EmptyString`

**Why it happens:** A notebookutils function received an empty string where it expected a value.

**What to do:**

- Check that all parameters passed to notebookutils functions are non-empty:

    ```python
    # Incorrect  
    notebookutils.fs.ls("")  
    
    # Correct  
    notebookutils.fs.ls("abfss://container@account.dfs.core.windows.net/path")
    ```

- Verify variables are initialized and non-empty before use.

- If you use notebook parameters, provide default values.

## Related content

- [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md)
- [Troubleshoot permissions and capacity errors](troubleshoot-permissions-capacity.md)
