---
title: Troubleshoot Spark session, configuration, and platform errors
description: Diagnose and resolve Spark session startup, configuration, and platform errors in Microsoft Fabric, including initialization timeouts and submit failures.
ms.topic: troubleshooting-error-codes
ms.date: 07/27/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Troubleshoot Spark session, configuration, and platform errors

Use this guide to diagnose and resolve session startup, configuration, and platform errors in Microsoft Fabric Spark jobs, including session initialization timeouts, submit failures, invalid configuration arguments, and native execution engine or metastore failures. For other Spark job errors, see [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md).

## Session startup and submit errors

### SparkContextInitializationTimedOut

**Error:** `Spark_Ambiguous_ApplicationMaster_SparkContextInitializationTimedOut`

**Why it happens:** The Spark context (driver) failed to initialize within the timeout period. Causes include insufficient cluster resources, network issues during startup, or custom library installation taking too long.

**What to do:**

- Check if your cluster has sufficient resources—if other jobs are consuming capacity, wait or use a dedicated pool.

- Review custom library/environment configurations—large or numerous libraries slow down initialization.

- Check for network connectivity issues (virtual network configuration, private endpoints).

- Remove or reduce custom library dependencies to isolate the issue.

### SparkSubmit errors

| Error | Meaning |
|----|----|
| SparkSubmitProcessTimedOut | spark-submit took too long to start the application |
| SparkSubmitProcessFailedExitCode1 | spark-submit exited with error (bad configuration, missing JAR) |
| SparkSubmitProcessFailedExitCode143 | spark-submit was killed (resource limit or platform timeout) |
| PersonalizationFailed | Custom environment/library setup failed |
| ConfigPersonalizationFailed | Custom Spark configuration failed to apply |

**What to do:**

- Timed out: Check if large custom libraries are causing slow environment setup. Reduce library count/size.

- Exit code 1: Check driver logs for the actual error—typically misconfiguration or missing dependency.

- Exit code 143: Process was killed—could be resource exhaustion. Retry; if persistent, contact support.

- Personalization failed: Review your custom environment definition. Try removing custom packages one by one.

- Configuration personalization failed: Check that Spark configuration keys are valid. Some configurations are read-only in managed environments.

### YARN application — KilledByTrustedServiceUser

**Error:** `Spark_System_YARNApplication_KilledByTrustedServiceUser`

**What it means:** Your Spark session failed during startup—the YARN application was killed before your code began executing. Exit code is typically 13.

#### Scenario 1 — Invalid Spark configuration

**Why it happens:** Passing an incorrect or unsupported Spark configuration crashes the session on startup.

Common examples:

- spark.rpc.message.maxSize set with a unit suffix (for example "512m") instead of a plain integer

- spark.rpc.message.maxSize set above the 2047 MB maximum

- spark.network.timeout set to a value smaller than spark.executor.heartbeatInterval

**What to do:**

- Review all custom Spark configurations in your notebook %%configure cell or environment settings.

- Remove any recently added configuration keys and rerun.

- Ensure numeric configurations use the expected units (some expect milliseconds, some expect plain numbers).

```python
%%configure  
{  
"conf": {  
"spark.rpc.message.maxSize": "256",  
"spark.network.timeout": "800s",  
"spark.executor.heartbeatInterval": "60s"  
}  
}
```

#### Scenario 2 — ClassNotFoundException

**Why it happens:** Spark can't find a required Java/Scala class during session initialization. This can happen if a custom JAR is missing, corrupted, or built for a different Spark/Scala version.

**What to do:**

- Check your custom JARs—are they compiled for the correct Spark and Scala version (for example, Spark 3.4 / Scala 2.12)?

- If you recently added a library to the environment, remove it and retry.

- Search driver logs for `ClassNotFoundException` to identify the missing class.

- If the missing class belongs to Spark/Fabric internals (`org.apache.spark.*`)—retry; if it persists, contact support.

#### Scenario 3 — UnknownHostException (transient)

**Why it happens:** A transient DNS resolution failure during session startup. The cluster resource manager was briefly unreachable.

**What to do:**

- Retry the job. This error is typically transient and resolves on the next attempt.

- If it recurs repeatedly on the same Spark pool, contact support.

#### Scenario 4 — Container allocation failure

**Why it happens:** The cluster couldn't allocate containers for your application—usually due to resource exhaustion on the underlying infrastructure.

**What to do:**

- Retry the job after a few minutes.

- If you're running many concurrent sessions on the same pool, try reducing concurrency or scaling the pool.

- If the error persists across multiple retries, contact support—this might indicate an infrastructure capacity issue.

## IllegalArgumentException errors

**Error code:** `Spark_User_Requirements_IllegalArgumentException`

### What does this error mean?

An `IllegalArgumentException` means Spark rejects a value you supply before doing any work—most often a Spark configuration value that's malformed, out of range, or that you can't set in Fabric. It can also occur when a function argument in your code violates a precondition (`requirement failed`).

### Error messages to look for

```text
IllegalArgumentException
requirement failed
Invalid value for configuration <key>
<value> is not a valid value
```

### Common causes and fixes

The following causes are the most common, along with how to fix each one.

#### Invalid configuration value format

A Spark configuration has the wrong format. Memory configurations expect a unit suffix (for example, `8g`), while numeric configurations expect a plain integer. A common example is setting `spark.rpc.message.maxSize` to `512m`—this key takes a plain integer number of megabytes.

```python
# Wrong - unit suffix on a numeric config
spark.conf.set("spark.rpc.message.maxSize", "512m")

# Correct - plain integer (MB)
spark.conf.set("spark.rpc.message.maxSize", "512")

# Correct - memory configs do use unit suffixes
spark.conf.set("spark.executor.memory", "28g")
```

#### Out-of-range value

The value is well-formed but exceeds the allowed range. For example, `spark.rpc.message.maxSize` has a maximum of 2047 MB; any larger value raises an `IllegalArgumentException`. Similarly, timeout configurations must be internally consistent—`spark.network.timeout` must be larger than `spark.executor.heartbeatInterval`.

#### Read-only configuration in Fabric

The Fabric platform manages some Spark configurations, so you can't override them. Setting them in a `%%configure` block or through `spark.conf.set()` fails with this error.

- Remove the configuration from your `%%configure` block and rerun.
- To learn where to configure Spark properties in Fabric, see [Spark compute configuration settings in Fabric environments](environment-manage-compute.md).
- If you believe the setting should be user-configurable for your scenario, file a support ticket.

#### Requirement failure in application code

Scala code (yours or a library's) calls `require(...)` with a condition that evaluates to `false`—for example, a negative partition count or an empty column list. The message after `requirement failed:` identifies the violated condition.

### Where to check

- **Driver logs (stderr)**: The full exception message names the offending configuration key or requirement.
- **Spark UI > Environment tab**: Review all active configuration values for the session.
- **Your `%%configure` cell and workspace environment settings**: Remove or correct the flagged key.

### Quick-reference troubleshooting table

| Error message contains | Likely cause | First action |
|----|----|----|
| `Invalid value for configuration` | Wrong format (unit suffix versus integer) | Check the expected format for that key |
| `is not a valid value` | Out-of-range or unsupported value | Consult the Spark configuration reference |
| `requirement failed` | Precondition violated in code or library | Read the condition in the message |
| `Cannot modify the value of` | Read-only configuration in Fabric | Remove the key from `%%configure` |

## Platform and engine errors

### Native execution engine — InvalidState

**Error:** `Spark_System_NativeExecutionEngine_InvalidState`

**What it means:** The Fabric native execution engine encountered an internal error and couldn't process your query. This is a platform-level issue, not a code error.

**What to do:**

- Retry the job—transient invalid state errors often resolve on the next run.

- If the error is reproducible, try disabling the native execution engine to confirm it's the cause:

```python
%%configure  
{  
"conf": {  
"spark.native.enabled": "false"  
}  
}
```

- If you disable the native engine and the issue resolves, your query hit an unsupported edge case. Run with it disabled as a workaround while you contact support.

- Include the full error message and the query/code that triggered it in your support ticket.

> [!NOTE]
> The native execution engine accelerates many common operations but doesn't yet support all Spark SQL features. Complex UDFs, certain data types, or unusual query patterns might fall back to the standard JVM engine or fail.

### MetaStore — HiveException

**Error:** `Spark_System_MetaStore_HiveException`

**What it means:** The Spark metastore (Hive-compatible catalog) encountered an error while processing a table or database operation.

#### Common causes

| Cause | Example error snippet |
|----|----|
| Table metadata corrupted or missing | `HiveException`: Unable to fetch table ... Table not found |
| Concurrent DDL operations on the same table | `HiveException`: ... lock acquisition timed out |
| Incompatible schema evolution | `HiveException`: Unable to alter table ... column type mismatch |
| Catalog connectivity timeout | `HiveException`: ... connection refused / read timed out |

**What to do:**

- Retry the job—catalog connectivity timeouts are often transient.

- Avoid running concurrent DDL (ALTER, DROP, CREATE) on the same table from multiple notebooks.

- If you recently applied schema changes, verify the table schema:

```sql
DESCRIBE EXTENDED my_database.my_table
```

- If the table appears corrupted, try recreating it from the underlying data:

```sql
-- For Delta tables  
CREATE TABLE my_table USING DELTA LOCATION 'abfss://...'  
  
-- For Parquet tables  
CREATE TABLE my_table USING PARQUET LOCATION 'abfss://...'
```

- If the error mentions "lock acquisition", wait a few minutes and retry—another session might be holding a metadata lock.

## Related content

- [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md)
- [Troubleshoot permissions and capacity errors](troubleshoot-permissions-capacity.md)
