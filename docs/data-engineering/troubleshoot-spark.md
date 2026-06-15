---
title: Troubleshooting Guide for Spark Jobs in Microsoft Fabric
description: Use this guide to identify and resolve common issues when running Spark jobs in Microsoft Fabric. Each section includes error examples, root causes, and actionable steps to help you recover efficiently.
ms.topic: how-to
ms.date: 06/5/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Troubleshooting guide for Spark jobs in Microsoft Fabric

Use this guide to identify and resolve common issues when running Spark jobs in Microsoft Fabric. Each section includes error examples, root causes, and actionable steps to help you recover efficiently.

> [!NOTE]
> This guide focuses on Spark execution errors, runtime failures, and job-specific issues. For **capacity and throttling errors**, **permission and authorization errors**, **session timeout errors**, or **library installation errors**, see [Troubleshoot permissions and capacity errors](troubleshoot-permissions-capacity.md), [Fabric notebooks troubleshooting guide](../data-science/fabric-notebooks-troubleshooting-guide.md), and [Manage Apache Spark libraries](library-management.md).

## Common Spark job issues at a glance

These are the most common categories of Spark job issues in Fabric, along with their associated error codes. Use this table to quickly navigate to the relevant section for your error. If you tried the relevant steps and the issue persists, see [When to contact support](#when-to-contact-support).

| Section | Description |
|----|----|
| [Memory and executor failures](#memory-and-executor-failures) | Out-of-memory errors (exit code 137), executor crashes, container killed errors, and bad node failures. Includes `Spark_Ambiguous_Executor_MaxExecutorFailures`, `Spark_System_Executor_ExitCode137BadNode`, and memory tuning strategies. |
| [INCONSISTENT_BEHAVIOR_CROSS_VERSION](#inconsistent_behavior_cross_version) | Issues after upgrading Spark runtime versions, including changes in behavior, performance, or results. |
| [AnalysisException in Spark](#analysisexception-in-spark) | SQL query analysis errors, schema mismatches, column resolution failures. Includes `ANALYSIS_EXCEPTION`, `Spark_Ambiguous_SQL_AnalysisException`, and Delta Lake analysis exceptions. |
| [Session startup and submit errors](#session-startup-and-submit-errors) | Spark session initialization timeouts, SparkSubmit failures, configuration personalization errors. Includes `SparkContextInitializationTimedOut`, `SparkSubmitProcessTimedOut`, `PersonalizationFailed`, and YARN application startup issues. |
| [Storage and connectivity errors](#storage-and-connectivity-errors) | ABFS storage access failures, JDBC connection errors, and SQL Server exceptions. Includes `Spark_Ambiguous_ABFS_StorageAccountDoesNotExist`, `Spark_System_ABFS_OperationFailed`, `Spark_Ambiguous_JDBC_ConnectionFailed`, and `Spark_Ambiguous_JDBC_SQLServerException`. |
| [File and path errors](#file-and-path-errors) | File not found errors, path doesn't exist errors, and incorrect path references. Includes `Spark_User_FileInput_FileNotFound` and `Spark_User_SQL_PathDoesNotExist`. |
| [Authentication and token errors](#authentication-and-token-errors) | Token provider failures, unauthorized access (403), and authentication errors. Includes `UNABLE_TO_GENERATE_SESSION_TOKEN_WITH_TOKEN_PROVIDER`, `Spark_Ambiguous_CustomTokenProvider_Unauthorized`, `Spark_User_ABFS_Unauthorized`, and `TOKEN_PROVIDER_USER_ERROR`. |
| [Delta Lake and streaming errors](#delta-lake-and-streaming-errors) | Delta Lake data transformation exceptions, streaming query failures, and checkpoint issues. Includes `Spark_Ambiguous_DeltaLake_DataTransformationException` and `Spark_Ambiguous_DeltaLake_StreamingQueryException`. |
| [Application code errors](#application-code-errors) | User code exceptions including `NullPointerException`, `IllegalStateException`, and Python errors. Includes `Spark_Ambiguous_UserApp_NullPointer`, `Spark_Ambiguous_UserApp_JobAborted`, `Spark_User_NonJvmUserApp_TypeError`, `Spark_User_UserApp_KeyError`, and `Spark_User_UserApp_AttributeError`. |
| [Library and environment errors](#library-and-environment-errors) | Library installation failures, pip errors, conda environment issues, and package dependency conflicts. Includes `Spark_User_Conda_PipFailed`. |
| [Platform and engine errors](#platform-and-engine-errors) | Native Execution Engine errors, metastore/Hive exceptions, and platform-level failures. Includes `Spark_System_NativeExecutionEngine_InvalidState` and `Spark_System_MetaStore_HiveException`. |
| [NotebookUtils EmptyString](#notebookutils-emptystring) | Errors related to NotebookUtils returning empty strings when accessing notebook parameters or secrets. Includes `Spark_Ambiguous_MsSparkUtils_EmptyString`. |

## Access the Spark UI

The Spark UI is Apache Spark's built-in monitoring interface for viewing detailed execution metrics and logs. While you access it from within the Fabric portal, it opens as a separate browser-based interface that provides low-level diagnostic information about your Spark jobs. Throughout this guide, troubleshooting steps reference specific tabs in the Spark UI to help you identify root causes, such as checking exit codes in the **Executors** tab, detecting data skew in the **Stages** tab, or reviewing memory usage in the **Storage** tab. Access the Spark UI whenever you need to investigate a failed or slow-running Spark job.

To access the Spark UI for your application:

1. From the left navigation in your Fabric workspace, select the ellipsis (**...**), then select **Monitor** to open the Monitor hub.

1. In the Monitor hub, select the **Filter** button.

1. Filter by **Item type**, and select the type of item you want to view (for example, **Notebook**).

1. From the table of activities, select an **Activity name** to open the activity detail page.

1. Select the **Jobs** tab.

1. Select the **Description** of a job to open the Spark UI in a new tab.

Key tabs in the Spark UI:

- **Jobs** — Shows active and completed Spark jobs.

- **Stages** — Shows task-level duration and data size (useful for skew detection).

- **Storage** — Shows cached DataFrames and memory usage.

- **Environment** — Shows all active Spark configurations.

- **Executors** — Shows executor status, memory, and exit codes.

## How to access logs

While the Spark UI provides visual insights into job execution patterns and resource usage, you need to download text log files when troubleshooting specific error messages, examining stack traces, or reviewing application output (stdout/stderr). Use logs when you need to see the exact wording of an error, trace a failure through detailed driver or executor logs, or review what your code printed during execution.

To view or download Spark logs (driver logs, executor logs, stdout, stderr):

- **Monitor hub (Logs tab):** In the Monitor hub, select **Apache Spark applications**, select your application, then select the **Logs** tab. Choose **Driver**, **Livy**, or **Prelaunch** logs from the left panel. Use keyword search or filter by **Notebook** or **Lakehouse** for high-concurrency sessions, then select **Download log** to save locally. Logs might not be available if the job was queued or if cluster creation failed. In that case, check capacity utilization in the Capacity Metrics app.

- **Extended Spark History Server:** For completed applications, open the History Server from the application detail page. Use the **Diagnosis** tab for data skew, time skew, and executor usage analysis. The **Executors** tab provides per-executor log download. For long-running jobs (over one hour, or executor logs exceeding 16 MB), logs are automatically split into hourly segments for easier navigation.

- **Spark monitoring REST APIs:** For programmatic or automated log retrieval, Fabric provides REST APIs for driver logs, executor logs, and application metadata. For more information, see [Monitor Spark applications using Spark monitoring APIs](spark-monitoring-api-overview.md).

- **VS Code:** When using notebooks in VS Code, select **View Recent Runs**, select a run, then download logs including stdout, stderr, and Spark driver log.

For detailed instructions on accessing logs, viewing executor rolling logs for long-running jobs, and troubleshooting with logs, see [Apache Spark application detail monitoring](spark-detail-monitoring.md#logs-tab) and [Use extended Apache Spark history server to debug and diagnose Apache Spark applications](apache-spark-history-server.md).


## Memory and executor failures

### Spark MaxExecutorFailures

#### What does this error mean?

The error code Spark_Ambiguous_Executor_MaxExecutorFailures means your Spark application was terminated because too many executor processes crashed. Spark distributes work across executors; when one crashes, Spark retries it. But if executors keep failing past a threshold, Spark aborts the entire job.

> [!IMPORTANT]
> This error is always a symptom, not the root cause. The real question is: why are executors failing?

Typical messages you see:

```text
ExecutorLostFailure (executor N exited caused by one of the running tasks)  
Reason: Container killed on request. Exit code is 137

Max number of executor failures (N) reached
```

#### Step 1: Find the exit code

In the Spark UI, select the **Executors** tab to review the exit codes of failed executors:

| Exit Code | Meaning | Most Likely Cause |
|----|----|----|
| 137 | Killed by OS (`SIGKILL`) | Out of memory: container exceeded its memory limit |
| 143 | Terminated (`SIGTERM`) | Timeout, preemption, or node decommission |
| 134 | Aborted (`SIGABRT`) | JVM crash or native memory corruption |
| 1 | General error | User code exception, misconfiguration, or missing dependency |
| -100 | Container preempted/lost | The container was preempted or the node was lost |

#### Step 2: Match your scenario

##### Scenario A — Exit code 137 (out of memory)

**What you see:** Driver logs show "Container killed on request. Exit code is 137".

```text
Container killed by YARN for exceeding memory limits. 7.1 GB of 7 GB physical memory used.
```

**Why it happens:** The data processed by an executor exceeds its total memory (heap + overhead). Common triggers: data skew, large partitions, excessive caching, broadcast joins with large tables, PySpark UDFs, or insufficient disk space for shuffle spill operations.

**What to do:**

> [!IMPORTANT]
> Use `%%configure`, not `spark.conf.set()`, for resource configs: Settings for `spark.executor.*`, `spark.driver.*`, `spark.network.*`, and `spark.yarn.*` are read at session or executor launch and can't be changed mid-session with `spark.conf.set()`. Place these in a `%%configure` cell as the very first cell of your notebook (before any other code), or set them in your Fabric Environment. Only `spark.sql.*` settings (AQE, shuffle partitions, broadcast threshold, rebase modes) can be changed at runtime with `spark.conf.set()`. The `%%configure` cell must be the first cell and will restart the session when run.

- Increase executor memory and overhead:

    ```PySpark
    spark.conf.set("spark.executor.memory", "<VALUE>")  # Small=4g, Medium=8g, Large=16g, XLarge=28g
    spark.conf.set("spark.executor.memoryOverhead", "<VALUE>") # Small=2g, Medium=4g, Large=6g, XLarge=8g
    ```

- Repartition to create smaller, more uniform partitions:

  To choose a value for `N`, divide your estimated data size by 200 MB as a starting point (for example, 40 GB of data maps to `repartition(200)`). Aim for 128–256 MB per partition, and verify the actual task input sizes in the **Stages** tab of the Spark UI.

    ```PySpark
    df = df.repartition(N)  # Increase N to reduce per-partition size
    ```

- Enable Adaptive Query Execution (AQE):

    Adaptive Query Execution is enabled by default in all Fabric runtimes. The useful levers are the sub-settings such as `spark.sql.adaptive.skewJoin.enabled` for handling skewed joins. If you have a skewed join, enabling AQE allows Spark to automatically detect and handle skew at runtime by splitting large partitions.

    ```PySpark
    spark.conf.set("spark.sql.adaptive.enabled", "true")  
    spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
    ```

- Reduce caching: only cache DataFrames reused multiple times; call `df.unpersist()` when done.

- Disable broadcast for large tables:

    ```PySpark
    spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "-1")
    ```

##### Scenario B — Exit code 143 (SIGTERM: timeout, scale-down, or preemption)

**What you see:** Driver logs show "Executor heartbeat timed out after 120000 ms" or "ExecutorLostFailure".

**Why it happens:** Exit code 143 is `SIGTERM`, a graceful termination signal. With dynamic allocation (the Fabric default), this code is often normal, because Fabric scales down idle executors by sending `SIGTERM`. If all your executors exit with 143 and the job completes, no action is needed.

If executors exit with 143 during active work, the cause is usually one of the following:

- Heartbeat timeout, when an executor is stuck in garbage collection (GC) or processing a large task.
- Node preemption or decommission.
- Platform-initiated scale-down.

Investigate further only if the job fails or executors exit with 143 mid-stage.

**What to do:**

- Increase heartbeat and network timeouts:

    ```PySpark
    spark.conf.set("spark.executor.heartbeatInterval", "60s")  
    spark.conf.set("spark.network.timeout", "800s")
    ```

- If caused by GC pressure, the real issue is memory. Increase executor memory and overhead, repartition data to create smaller partitions, enable AQE, and reduce caching (see **Scenario A** for detailed steps).

- Check if tasks are processing large partitions (repartition to smaller sizes).

##### Scenario C — Data skew (few executors fail repeatedly)

**What you see:** Most tasks finish quickly, but a few take far longer and fail. The same executors keep failing.

**How to confirm:** In the Spark UI, select the **Stages** tab, select a failed stage, and review the **Duration** and **Input Size** columns. If a few tasks have 10×–100× more input than others, you have data skew.

**What to do:**

- Enable AQE skew join handling. Adaptive Query Execution is enabled by default in all Fabric runtimes. The useful levers are the sub-settings such as `spark.sql.adaptive.skewJoin.enabled` for handling skewed joins. Enabling AQE allows Spark to automatically detect and handle skew at runtime by splitting large partitions.

    ```PySpark
    spark.conf.set("spark.sql.adaptive.enabled", "true")  
    spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
    ```

- Use salting to break up large partitions:

    ```PySpark
    from pyspark.sql.functions import rand  
    df = df.withColumn("salt", (rand() * N).cast("int"))  
    # Join/group on (key, salt), then aggregate without salt
    ```

- Filter or process the heavily skewed key separately.

##### Scenario D — Storage / connectivity failures

**What you see:** Driver logs show `java.io.IOException: ABFS operation failed`, connection refused, `HTTP 403`/`401` errors, or throttling (`HTTP 429`/`503`).

**What to do:**

- Verify your storage account is accessible and permissions are correct.

- Check if authentication tokens are still valid. Long-running jobs might see token expiry.

- If throttled (429/503), reduce parallelism or spread the load over time.

- Check network security groups / firewall rules.

##### Scenario E — User code exceptions (exit code 1)

**What you see:** Executors fail with exit code `1`. Driver logs show a stack trace from your application code.

**What to do:**

- Read the full stack trace: it points to the exact line of code.

- Ensure your UDFs handle null values correctly.

- Verify all required libraries/JARs are available on every executor.

- Test on a small dataset first to isolate the problem.

##### Scenario F — PySpark / Pandas UDF crashes

**What you see:** Executors fail during Python UDF execution. Exit code `137` or messages about "worker exiting".

**Why it happens:** PySpark runs a separate Python process alongside the JVM. Both share the same node memory.

**What to do:**

- Replace Python UDFs with built-in Spark SQL functions wherever possible.

- Reduce Pandas UDF batch size:

```PySpark
spark.conf.set("spark.sql.execution.arrow.maxRecordsPerBatch", "5000")
```

- Increase memory overhead:

```PySpark
spark.conf.set("spark.executor.memoryOverhead", "<VALUE>")
```

##### Scenario G — Disk space exhaustion during shuffle

**What you see:** Executors fail with "No space left on device" or "IOException" during shuffle or sort operations.

**Why it happens:** When Spark can't fit data in memory, it spills to local disk. If the local disk fills up, the executor crashes.

**What to do:**

- Reduce the amount of data shuffled: filter early, select only needed columns.

- Increase the number of shuffle partitions to reduce per-partition size:

```PySpark
spark.conf.set("spark.sql.shuffle.partitions", "400")  # Default is 200
```

- Scale up to nodes with more local disk space.

- Check for data skew — a skewed partition spills disproportionately to one executor's disk.

#### Configuration quick reference

##### Memory and resources

| Configuration | Purpose |
|----|----|
| `spark.executor.memory` | JVM heap memory per executor |
| `spark.executor.memoryOverhead` | Off-heap memory for Python, native libs |
| `spark.driver.memory` | JVM heap memory for the driver |
| `spark.driver.memoryOverhead` | Off-heap memory for the driver |

##### Failure tolerance

| Configuration | Purpose |
|----|----|
| `spark.executor.maxNumFailures` | Max total executor failures before app is killed |
| `spark.executor.failuresValidityInterval` | Time window for counting failures (default: unlimited) |
| `spark.task.maxFailures` | Max retries per individual task (default: 4) |

> [!IMPORTANT]
> Increasing failure tolerance does NOT fix the root cause. It only allows the job to survive more transient failures.

For long-running jobs, set `spark.executor.failuresValidityInterval` to a time window (for example, "1h"). This makes Spark count only failures within that window, so a job running for many hours won't be killed by occasional transient failures that occurred hours apart.

##### Network and timeouts

| Configuration | Purpose |
|----|----|
| `spark.network.timeout` | General network timeout (default: 120s) |
| `spark.executor.heartbeatInterval` | Heartbeat frequency (default: 10s) |
| `spark.sql.adaptive.enabled` | Enables Adaptive Query Execution (dynamically optimizes shuffle partitions and join strategies at runtime). Adaptive Query Execution is enabled by default in all Fabric runtimes. The useful levers are the sub-settings such as `spark.sql.adaptive.skewJoin.enabled` for handling skewed joins. Enabling AQE allows Spark to automatically detect and handle skew at runtime by splitting large partitions. |
| `spark.sql.shuffle.partitions` | Partitions after shuffle (default: 200) |

##### Example: Applying via %%configure

```python
%%configure  
{  
"conf": {  
"spark.executor.memory": "<VALUE>",  
"spark.executor.memoryOverhead": "<VALUE>",  
"spark.executor.maxNumFailures": "<VALUE>",  
"spark.network.timeout": "800s",  
"spark.executor.heartbeatInterval": "60s",  
"spark.sql.adaptive.enabled": "true", 
"spark.sql.adaptive.skewJoin.enabled": "true"  
}  
}
```

In Fabric, some configurations are managed by the platform based on your node size. For the complete list of Spark configuration properties, see [Apache Spark Configuration](https://spark.apache.org/docs/latest/configuration.html).

#### Scaling options

| Option | When to Use |
|----|----|
| Scale Up (larger nodes) | Each executor gets more memory/CPU (reduces OOM risk) |
| Scale Out (more nodes) | Data is spread across more executors (reduces per-executor load) |
| Optimize first | Adding resources to a skewed workload won't help: the oversized partition still lands on one executor |

#### Quick-reference troubleshooting table

| Observation | Likely Cause | First Action |
|----|----|----|
| All executors fail with exit code 137 | OOM | Increase executor memory/overhead; check for data skew |
| All executors fail with exit code 143 | Heartbeat timeout | Increase network timeout and heartbeat interval |
| Only a few executors fail repeatedly | Data skew | Enable AQE skew join; repartition data |
| Failures happen on the same node | Faulty node | Retry the job; if same node fails again, contact support |
| Failures correlate with I/O operations | Storage connectivity | Check storage access, firewall, token validity |
| Failures show user code stack traces | Application bug | Fix the code: null handling, missing libs |
| Failures during Python UDF execution | Python process OOM | Increase memoryOverhead; replace UDFs with SQL functions |
| Failures with "No space left on device" | Disk space exhaustion | Increase shuffle partitions; filter early; scale up node size |

### Exit code 137 / container killed on request

This section covers out-of-memory (OOM) errors in Microsoft Fabric Spark jobs indicated by exit code 137. YARN kills a container when it exceeds its assigned memory limit, producing exit code 137 (SIGKILL). This is the most common OOM signal in Spark.

#### What does this error mean?

Exit code 137 means YARN's container memory monitor terminated the executor (or driver) container because it exceeded its allocated memory limit. Your Spark application requires more memory than its container was assigned.

> [!NOTE]
> The Linux OOM Killer can also produce exit code 137 (when the OS itself runs out of memory), but in Fabric the message "Container killed by YARN for exceeding memory limits" indicates YARN enforced the container limit, not the OS-level OOM Killer.

#### How container memory is calculated

Each executor runs inside a YARN container whose total memory is:

```text
Container size = spark.executor.memory + spark.executor.memoryOverhead
```

If the combined memory usage of the JVM heap, off-heap buffers, Python processes, and native libraries exceeds this container size, YARN kills the container (exit code `137`).

Fabric nodes come in sizes such as 32 GB, 64 GB, 128 GB, and 512 GB. In the **Storage** tab of the Spark UI, if **Size in Memory** approaches your node's total RAM, your application is at risk of OOM.

> [!IMPORTANT]
> In Fabric, `spark.executor.memoryOverhead` is set to a fixed 384 MB regardless of node size, unlike the open-source Spark default of `max(384 MB, 0.1 × executor memory)`. For memory-intensive workloads such as PySpark UDFs, large shuffles, and native libraries, 384 MB is often insufficient. Set `spark.executor.memoryOverhead` explicitly to a higher value.

For detailed guidance on memory tuning, see [Spark Tuning Guide: Memory Management](https://spark.apache.org/docs/latest/tuning.html#memory-management-overview).

#### Error messages to look for

```text
java.lang.OutOfMemoryError: Java heap space

java.lang.OutOfMemoryError: GC overhead limit exceeded

Container killed on request. Exit code is 137  
Container exited with a non-zero exit code 137  
Killed by external signal

os::commit_memory failed; error='Cannot allocate memory' (errno=12)  
Native memory allocation (mmap) failed to map <N> bytes
```

#### Where to check

- **Spark UI, Executors tab:** Check for failed executors and their exit codes

- **Spark UI, Storage tab:** Check "Size in Memory" relative to your node size

- **Spark UI, Stages tab:** Check for skewed tasks (one task processing far more data than others)

- **Driver logs (stderr):** Search for `OutOfMemoryError`, exit code `137`, or `Cannot allocate memory`

#### Common causes and fixes

##### 1. Driver OOM from `collect()`, `toPandas()`, or `display()`

**Symptom:** The driver process runs out of memory. Often no Spark tasks are running at the time of the crash.

**Cause:** These operations pull the entire dataset from executors into driver memory.

**What to do:**

- Add `.limit(N)` before `collect()` or `toPandas()` to restrict the rows returned.

- Use `.write` to save results to storage instead of collecting to the driver.

- Use `display(df.limit(1000))` instead of `display(df)`.

- If you must use `toPandas()`, filter or aggregate the data first.

##### 2. Executor OOM from data skew

**Symptom:** Most tasks complete quickly, but a few take long and fail with exit code `137`.

**Cause:** Uneven data distribution causes a few executors to process more data than others.

**What to do:**

- Identify skewed keys: inspect the Spark UI Stages tab for task duration variance.

- Use salting to break up large partitions.

- Enable AQE skew join handling. Adaptive Query Execution is enabled by default in all Fabric runtimes, so the key lever for skew is `spark.sql.adaptive.skewJoin.enabled`, which lets Spark detect and split large partitions at runtime.

```PySpark
spark.conf.set("spark.sql.adaptive.enabled", "true")  
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
```

##### 3. Executor OOM from caching too much data

**Symptom:** Memory usage climbs over time as cached DataFrames accumulate.

**Cause:** Calling `.cache()` or `.persist()` on multiple large DataFrames without releasing them.

**What to do:**

- Only cache DataFrames that are reused multiple times.

- Unpersist when done: `df.unpersist()`.

- Use `MEMORY_AND_DISK` storage level instead of `MEMORY_ONLY`:

```PySpark
from pyspark import StorageLevel  
df.persist(StorageLevel.MEMORY_AND_DISK)
```

##### 4. Executor OOM from too few partitions

**Symptom:** Tasks process large amounts of data per partition.

**Cause:** The DataFrame has too few partitions relative to the data size.

**What to do:**

- Repartition to increase parallelism:

```PySpark
df = df.repartition(N)  # Choose N based on your data size
```

- Aim for partitions around 128–256 MB each.

- For writes, use `coalesce()` only to reduce partitions (never to 1 for large data).

##### 5. Broadcast join OOM

**Symptom:** Driver or executor OOM during a join operation.

**Cause:** Spark broadcasts a table that is too large.

**What to do:**

- Disable auto-broadcast for large tables:

```PySpark
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "-1")
```

- Or reduce the threshold:

```PySpark
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "10MB")
```

##### 6. PySpark UDF / Pandas UDF memory pressure

**Symptom:** Executor memory spikes during UDF execution. Exit code `137`.

**Cause:** PySpark UDFs run in a separate Python process alongside the JVM executor. Both compete for the same node memory.

**What to do:**

- Replace Python UDFs with built-in Spark SQL functions where possible.

- For Pandas UDFs, reduce the batch size:

```PySpark
spark.conf.set("spark.sql.execution.arrow.maxRecordsPerBatch", "5000")
```

- Increase memory overhead:

```PySpark
spark.conf.set("spark.executor.memoryOverhead", "<VALUE>")
```

##### 7. Native Execution Engine off-heap memory pressure

**Symptom:** Executors fail with exit code `137` even though your workload previously ran without issues, or the OOM occurs on queries that don't seem memory-intensive.

**Cause:** The Fabric Native Execution Engine enables off-heap memory by default with dynamic sizing. In some cases, this reserves a large portion of off-heap memory even when the native engine isn't actively processing your query, putting pressure on JVM heap memory and causing OOM.

**What to do:**

- Try disabling the Native Execution Engine to confirm it is the cause:

```PySpark
spark.conf.set("spark.fabric.nativeExecution.enabled", "false")
```

- If the OOM goes away, the native engine's memory allocation was the trigger. Run with it disabled as a workaround while you contact support.

- If the OOM persists after disabling, the issue is a genuine memory shortage. Apply the other fixes in this section.

##### 8. Driver OOM from large query plans (AQE)

**Symptom:** The driver crashes with `OutOfMemoryError` during query planning, not during data processing. The error might include "Required array length ... is too large".

**Cause:** Adaptive Query Execution (AQE) is enabled by default in all Fabric runtimes. When your query is very complex (many joins, unions, or cached DataFrames), Spark regenerates the query plan text on every plan change. Extremely large plan strings can exceed memory limits.

**What to do:**

- Limit the plan string length:

```PySpark
spark.conf.set("spark.sql.maxPlanStringLength", "10000")
```

- If the issue persists, disable AQE for this specific job:

```PySpark
spark.conf.set("spark.sql.adaptive.enabled", "false")
```

- Simplify the query: break it into smaller steps with intermediate writes to storage.

#### General tuning options

##### Option A: Scale up (increase node size)

Increase your Spark pool's node size (for example, from Small to Medium or Large).

##### Option B: Scale out (add more nodes)

Increase the number of executors/nodes to distribute data across more nodes.

##### Option C: Reduce concurrent tasks per executor

Each executor runs multiple tasks in parallel (one per core). Reducing the number of concurrent tasks gives each task more memory, which can prevent OOM for memory-heavy operations.

```PySpark
spark.conf.set("spark.executor.cores", "2")  # Default varies by node size
```

Fewer concurrent tasks means slower throughput but more memory per task. Use this when individual tasks are memory-intensive (large aggregations, complex UDFs).

##### Option D: Adjust Spark configuration

| Configuration | Purpose |
|----|----|
| `spark.driver.memory` | Increase driver heap memory |
| `spark.executor.memory` | Increase executor heap memory |
| `spark.driver.memoryOverhead` | Extra off-heap memory for the driver (default: 384 MB) |
| `spark.executor.memoryOverhead` | Extra off-heap memory for executors (default: 384 MB) |
| `spark.executor.cores` | Cores per executor (fewer cores = more memory per task) |
| `spark.sql.adaptive.enabled` | Enables AQE auto-tuning (enabled by default in Fabric) |
| `spark.sql.adaptive.skewJoin.enabled` | Auto-handle skewed joins (the key lever, since AQE is already on) |
| `spark.sql.autoBroadcastJoinThreshold` | Control when tables are broadcast |
| `spark.sql.shuffle.partitions` | Number of partitions after shuffle (default: 200) |
| `spark.sql.maxPlanStringLength` | Limit query plan string length (prevents driver OOM on complex plans) |

##### Option E: Optimize your code

| Pattern to Avoid | Better Alternative |
|----|----|
| `df.collect()` on large data | `df.write.parquet(path)` |
| `df.toPandas()` on large data | `df.limit(N).toPandas()` or save to storage |
| `df.repartition(1)` on large data | `df.coalesce(N)` with reasonable N |
| `.cache()` everything | Only cache DataFrames reused \>1 time |
| Python UDFs | Built-in Spark SQL functions |
| `for row in df.collect(): ...` | Use Spark transformations (such as map or filter) |

### Spark_System_Executor_ExitCode137BadNode

#### What does this error mean?

This error code means an executor was killed with exit code 137 (out of memory), and the Fabric platform has identified that the failure occurred on a node that has been flagged as faulty. Unlike a regular exit code 137, this classification indicates the platform detected infrastructure-level problems with the specific node where your executor was running.

#### Error messages to look for

```text
ExecutorLostFailure Container from a bad node: container_XXXX_0001_01_000046  
on host: vm-XXXXXXXX. Exit status: 137.  
Diagnostics: Container killed on request. Exit code is 137  
Container exited with a non-zero exit code 137.  
Killed by external signal
```

#### How is this different from regular exit code 137?

| Aspect | Exit Code 137 (Regular) | ExitCode137BadNode |
|----|----|----|
| Root cause | Your application exceeded the memory limit | A faulty node caused the executor to crash |
| Whose fault? | Typically user code or configuration | Typically platform infrastructure |
| Retry behavior | Same failure might recur on any node | Retry usually succeeds on a healthy node |
| Action needed | Tune memory, fix skew, optimize code | Retry the job; contact support if persistent |

#### What to do

**Step 1:** Retry your job. The platform typically avoids scheduling work on nodes it has flagged as faulty. In most cases, the next run succeeds on a healthy node.

**Step 2:** If the error recurs on the same node across multiple retries, contact support with the Spark Application ID and the node information from the Spark UI Executors tab.

**Step 3:** If the error recurs on different nodes, the root cause might be your application rather than the infrastructure. Check if your workload has genuine OOM issues by reviewing the Exit Code 137 section above.

A single occurrence of this error is usually transient and doesn't require any code changes. The platform automatically manages faulty node detection and removal.

### Container from a bad node / exit status: 50

#### What does this error mean?

This error indicates that a Spark executor container was terminated because it was running on a node that the platform detected as unhealthy or decommissioned. Exit status 50 is a Fabric-specific signal indicating that the container was proactively killed due to node-level issues, not because of your application code.

#### Error messages to look for

```text
Container from a bad node. Exit status: 50

ExecutorLostFailure (executor N exited caused by one of the running tasks)  
Reason: Container from a bad node. Exit status: 50
```

#### Why it happens

The Fabric platform continuously monitors node health. When a node is detected as unhealthy (due to hardware issues, disk failures, network problems, or other infrastructure faults), the platform terminates containers on that node to prevent data corruption or silent failures.

Common triggers include:

- Hardware issues on the underlying compute node (disk, memory, CPU)

- Node being decommissioned during a maintenance operation

- Network connectivity loss between the node and the cluster manager

- Node failing platform health checks

#### What to do

**Step 1:** Retry the job. This error is typically transient. The platform routes subsequent work away from the faulty node, and the next run should succeed.

**Step 2:** Check how many executors were affected. If only one or two executors failed with exit status 50 and the rest completed normally, Spark's built-in retry mechanism might have already recovered the job automatically.

**Step 3:** If the job failed because these container losses pushed the total executor failures past the MaxExecutorFailures threshold, increase the failure tolerance to allow more retries:

```PySpark
# Start 10–20 for production; 30–50 for long jobs with spark.executor.failuresValidityInterval="1h"
spark.conf.set("spark.executor.maxNumFailures", "20")  
```

> [!IMPORTANT]
> Increasing the failure tolerance is appropriate here because the root cause is infrastructure, not your code. Unlike OOM errors, allowing more retries for bad-node failures is a valid mitigation.

**Step 4:** If the error persists across multiple retries or affects many executors in the same run, contact support. Provide the Spark Application ID and the timestamps of the failures.

#### How to distinguish from OOM (exit code 137)

| Signal | Exit Code 137 (OOM) | Exit Status 50 (Bad Node) |
|----|----|----|
| Error message | "Container killed on request. Exit code is 137" | "Container from a bad node. Exit status: 50" |
| Root cause | Application exceeded memory limit | Node infrastructure failure |
| Pattern | Often affects multiple executors or recurs on retry | Usually affects 1–2 executors; resolves on retry |
| Fix | Tune memory, fix skew, optimize code | Retry the job; increase maxNumFailures if needed |

## INCONSISTENT_BEHAVIOR_CROSS_VERSION

This error indicates your Spark application is producing different results, failing, or behaving differently after a runtime version change. The same code and data that worked on the previous version now produces unexpected output, errors, or performance degradation.

### Fabric runtime compatibility matrix

| Component | Runtime 1.1 | Runtime 1.2 | Runtime 1.3 |
|---------------|-----------------|-----------------|-----------------|
| Apache Spark  | 3.3             | 3.4             | 3.5             |
| Java          | JDK 8           | JDK 11          | JDK 11          |
| Scala         | 2.12            | 2.12            | 2.12            |
| Python        | 3.10            | 3.10            | 4.4.1            |
| R             | 4.2             | 4.2             | 4.3             |
| Delta Lake    | 2.2             | 2.4             | 3.2             |

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

**Why it happens:** Spark 3.0+ switched from hybrid Julian/Gregorian to Proleptic Gregorian calendar. Parquet INT96 and datetime formats written with the old behavior might now be misinterpreted. Legacy datetime settings might not propagate correctly in High Concurrency mode.

**Step 1:** Identify if this affects you. Does your data/workflow involve:

- Historical dates (pre-1900 or pre-1582)?

- Parquet files/tables created before a recent upgrade?

- Failures only in upgraded or high-concurrency environments?

- Error logs containing INCONSISTENT_BEHAVIOR_CROSS_VERSION or READ_ANCIENT_DATETIME?

**Step 2:** Set Spark configuration for datetime rebase modes:

```PySpark
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
> In High Concurrency mode, settings must be applied at the notebook/session level; environment or cluster-wide settings might not propagate.

**Step 3:** Validate:

- Rerun failed jobs/notebooks.

- Verify the setting took effect:

```PySpark
print(spark.conf.get("spark.sql.parquet.datetimeRebaseModeInRead"))
```

### Category B — Scala, Java, or Python version changes

| Fabric Runtime | Spark | Java   | Scala   | Python |
|----------------|-------|--------|---------|--------|
| Runtime 1.1    | 3.3   | JDK 8  | 2.12.15 | 3.10   |
| Runtime 1.2    | 3.4   | JDK 11 | 2.12.17 | 3.10   |
| Runtime 1.3    | 3.5   | JDK 11 | 2.12.18 | 3.11   |

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

```SparkSQL
DESCRIBE DETAIL my_table
```

### Category D — Spark SQL behavioral changes

**Why it happens:** Spark versions change default behaviors (ANSI mode, cast rules, null handling).

**What to do:**

- If ANSI mode causes stricter behavior:

```PySpark
spark.conf.set("spark.sql.ansi.enabled", "false")
```

- For date/time parsing changes:

```PySpark
spark.conf.set("spark.sql.legacy.timeParserPolicy", "LEGACY")
```

- For stricter INSERT type checking:

```PySpark
spark.conf.set("spark.sql.storeAssignmentPolicy", "LEGACY")
```

Using legacy settings is a short-term fix. Plan to update your code for the new behavior.

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

#### Scenario A — Table or view not found

```text
Table or view not found: my_table
```

- Typo in the table name: double-check spelling and case.

- Wrong database/schema: use a fully-qualified name:

```PySpark
spark.sql("SELECT * FROM my_catalog.my_schema.my_table")
```

- Temp view expired: if the session restarted, the view is gone. Re-create it:

```PySpark
df.createOrReplaceTempView("my_table")
```

- Table not yet written—ensure the upstream notebook/cell has completed.

- Lakehouse not attached—in Fabric, verify the lakehouse is attached to your notebook.

#### Scenario B — Column not found

```text
[UNRESOLVED_COLUMN.WITH_SUGGESTION] A column or function parameter  
with name 'X' cannot be resolved.
```

- Typo in the column name: compare with the suggestions in the error.

- Column was renamed or dropped upstream: check the schema:

```PySpark
df.printSchema()
```

- Column exists in a different DataFrame: after a join, reference the correct source:

```PySpark
df1.join(df2, df1.id == df2.id).select(df1.id, df2.name)
```

#### Scenario C — Ambiguous column reference

```text
[AMBIGUOUS_REFERENCE] Reference 'Quantity' is ambiguous,  
could be: [a.Quantity, b.Quantity]
```

**What to do:** Qualify the column with the table alias:

```PySpark
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

```PySpark
from pyspark.sql.functions import col  
df = df1.join(df2, df1["id"].cast("string") == df2["id_str"])
```

#### Scenario E — Function not found

```text
Undefined function: 'my_function'
```

- Typo: check the Spark SQL function reference.

- UDF not registered:

```PySpark
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

```PySpark
spark.sql("DESCRIBE my_table").show()
```

- Check what you're writing:

```PySpark
df.printSchema()
```

- Align columns and types:

```PySpark
df = df.select("col_a", "col_b", "col_c")  
df = df.withColumn("col_a", col("col_a").cast("int"))
```

- For Delta schema evolution:

```PySpark
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

- Typo in the path: double-check container name, storage account, and file path.

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

```PySpark
from delta.tables import DeltaTable  
DeltaTable.convertToDelta(spark, "parquet.`/path/to/table`")
```

### Debugging techniques

- Print the Schema:

```PySpark
df.printSchema()  
spark.sql("DESCRIBE EXTENDED my_table").show(truncate=False)
```

- List Available Tables:

```PySpark
spark.sql("SHOW TABLES").show()
```

- List Available Columns:

```PySpark
spark.sql("DESCRIBE my_table").show()
```

- Test Queries Incrementally — build step by step:

```PySpark
spark.sql("SELECT * FROM my_table LIMIT 5").show()  
spark.sql("SELECT col_a, col_b FROM my_table LIMIT 5").show()
```

- Check Spark Configuration:

```PySpark
for k, v in sorted(spark.sparkContext.getConf().getAll()):  
    print(f"{k} = {v}")
```

### Quick-reference troubleshooting table

| Error Message Contains | Likely Cause | First Action |
|----|----|----|
| Table or view not found | Missing table or wrong database | Check spelling; use fully-qualified name |
| can't resolve + column name | Missing or misspelled column | Run `df.printSchema()` or DESCRIBE table |
| Reference ... is ambiguous | Duplicate column name after join | Qualify with table alias: a.id |
| Data type mismatch | Incompatible types in comparison | Cast columns to a common type |
| Undefined function | Missing or unregistered UDF | Check spelling; register UDF if custom |
| Cannot write incompatible data | Schema mismatch on write | Compare source/target schemas; cast/select |
| Path doesn't exist | Wrong file path or deleted file | Verify path in storage explorer |
| Cannot safely cast | Strict type checking on INSERT | Cast column explicitly before writing |
| DeltaAnalysisException | Delta-specific schema/protocol issue | See Delta Lake section above |
| Unsupported operation | Feature not available for table format | Check if Delta format is required |

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
| SparkSubmitProcessFailedExitCode1 | spark-submit exited with error (bad config, missing JAR) |
| SparkSubmitProcessFailedExitCode143 | spark-submit was killed (resource limit or platform timeout) |
| PersonalizationFailed | Custom environment/library setup failed |
| ConfigPersonalizationFailed | Custom Spark configuration failed to apply |

**What to do:**

- Timed out: Check if large custom libraries are causing slow environment setup. Reduce library count/size.

- Exit code 1: Check driver logs for the actual error—typically misconfiguration or missing dependency.

- Exit code 143: Process was killed—could be resource exhaustion. Retry; if persistent, contact support.

- Personalization failed: Review your custom environment definition. Try removing custom packages one by one.

- Config personalization failed: Check that Spark configuration keys are valid. Some configs are read-only in managed environments.

### YARN application — KilledByTrustedServiceUser

**Error:** `Spark_System_YARNApplication_KilledByTrustedServiceUser`

**What it means:** Your Spark session failed during startup — the YARN application was killed before your code began executing. Exit code is typically 13.

#### Scenario 1 — Invalid Spark configuration

**Why it happens:** An incorrect or unsupported Spark configuration was passed, causing the session to crash on startup.

Common examples:

- spark.rpc.message.maxSize set with a unit suffix (for example "512m") instead of a plain integer

- spark.rpc.message.maxSize set above the 2047 MB maximum

- spark.network.timeout set to a value smaller than spark.executor.heartbeatInterval

**What to do:**

- Review all custom Spark configurations in your notebook %%configure cell or environment settings.

- Remove any recently added config keys and re-run.

- Ensure numeric configs use the expected units (some expect milliseconds, some expect plain numbers).

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

**Why it happens:** A required Java/Scala class couldn't be found during session initialization. This can happen if a custom JAR is missing, corrupted, or built for a different Spark/Scala version.

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

## Storage and connectivity errors

### ABFS StorageAccountDoesNotExist

**Error:** `Spark_Ambiguous_ABFS_StorageAccountDoesNotExist`

**Why it happens:** The specified Azure storage account doesn't exist or isn't accessible.

**What to do:**

- Verify the storage account name is spelled correctly:

```text
abfss://<container>@<storage_account>.dfs.core.windows.net/<path>
```

- Confirm the storage account exists in the Azure portal (it might have been deleted or renamed).

- Check that the storage account isn't behind a firewall that blocks your Spark cluster.

- Verify you have the correct permissions (Storage Blob Data Reader/Contributor) on the account.

### ABFS storage operation failed

**Error:** `Spark_System_ABFS_OperationFailed`

**What it means:** An Azure Blob File System (ABFS) storage operation failed. This typically points to a storage connectivity, permission, or networking issue rather than a Spark code error.

#### Scenario 1 — InvalidPrivateLink

**Why it happens:** Your request was denied because it didn't comply with private link settings. This occurs when Spark tries to access storage through a private endpoint that isn't properly configured.

**What to do:**

- Verify that your workspace's private link and managed virtual network settings are correctly configured.

- Ensure the private endpoint DNS records are intact and resolving correctly.

- If using managed virtual network, confirm Data Exfiltration Protection (DEP) is enabled consistently.

#### Scenario 2 — 403 authorization / SAS failure

**Why it happens:** The generated SAS token or authorization header is invalid or expired, causing a 403 Forbidden error.

Example error messages:

- "Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly."

- "AuthorizationPermissionMismatch" with HTTP 403

**What to do:**

- If the storage account recently changed keys or access policies, ensure the Fabric workspace connection is updated.

- Verify that the Lakehouse or warehouse shortcut has valid credentials.

- If using a service principal, confirm it has the Storage Blob Data Contributor role on the target storage account.

- Retry—token generation issues can be transient.

If the error includes "AccessDeniedException" on system staging paths (for example, _system/artifacts/), this is typically a platform-level issue. Retry first; if it persists, contact support.

#### Scenario 3 — Storage account connectivity

**Why it happens:** The Spark cluster can't reach the storage account due to firewall rules, virtual network restrictions, or the storage account being in a different region.

**What to do:**

- Check that the storage account firewall allows access from "Trusted Microsoft services".

- If using private endpoints, verify DNS resolution from within the workspace's virtual network.

- Confirm the storage account exists and hasn't been deleted or renamed.

### JDBC connection failed

**Error:** `Spark_Ambiguous_JDBC_ConnectionFailed`

**Why it happens:** The JDBC connection to the external database failed.

**What to do:**

- Verify connection parameters: host, port, database name, username, password.

- Test connectivity from outside Spark (for example, Python pyodbc) to isolate whether it's a Spark or network issue.

- Check firewall rules — does the database allow connections from your Spark cluster's IP range?

- Verify the database server is running and accepting connections.

- Check JDBC driver version compatibility.

### JDBC SQLServerException

**Error:** `Spark_Ambiguous_JDBC_SQLServerException`

**Why it happens:** A SQL Server-specific error occurred during a JDBC operation.

**What to do:**

- Read the SQL Server error code in the stack trace.

| Error Code | Meaning             | Fix                                     |
|------------|---------------------|-----------------------------------------|
| 18456      | Login failed        | Check username/password                 |
| 233        | Connection closed   | Check firewall, server availability     |
| 1205       | Deadlock victim     | Retry the operation; reduce parallelism |
| 8115       | Arithmetic overflow | Check data types and values             |

- Verify SQL Server permissions—your login needs appropriate rights.

- For timeout errors, increase the query timeout:

```PySpark
df = spark.read.format("jdbc") \
    .option("queryTimeout", "300") \
    .option("url", url) \
    .load()
```

## File and path errors

### FileInput — FileNotFound

#### What does this error mean?

The error code Spark_User_FileInput_FileNotFound means your Spark job tried to read a file or directory that doesn't exist at the specified path. This is a user error — the path you provided is either incorrect, the file was deleted, or it hasn't been created yet.

#### Error messages to look for

```text
org.apache.spark.sql.AnalysisException: Path does not exist: abfss://...

java.io.FileNotFoundException: No such file or directory

Input path does not exist: abfss://container@account.dfs.core.windows.net/...
```

#### Common causes and fixes

##### Incorrect path or typo

- Double-check the container name, storage account, and file path for typos.

- Verify the path exists using NotebookUtils:

```PySpark
notebookutils.fs.ls("abfss://container@account.dfs.core.windows.net/folder/")
```

##### File not yet created by upstream job

- If your notebook depends on output from another pipeline or job, ensure the upstream job completed successfully before this job runs.

- Add a dependency or checkpoint in your pipeline to wait for the file.

##### File was deleted or moved

- Check if a retention policy, cleanup job, or another user deleted the file.

- For Delta tables, check the transaction log to see if files were removed by VACUUM.

##### Partition path does not exist

- When reading partitioned data, ensure the partition filter matches existing partitions:

```PySpark
df = spark.read.parquet("abfss://.../data/").where("date = '2024-01-15'")
```

- List available partitions:

```PySpark
notebookutils.fs.ls("abfss://.../data/")
```

##### Case sensitivity

- ABFS paths are case-sensitive. Ensure the casing matches exactly.

### SQL — PathDoesNotExist

#### What does this error mean?

The error code Spark_User_SQL_PathDoesNotExist means a Spark SQL query referenced a path (table location, view, or external data source) that can't be found. This typically occurs when a table's underlying storage path has changed or been removed.

#### Common causes and fixes

##### Table's underlying storage was deleted or moved

- The table metadata points to a path that no longer exists. Recreate the table or update its LOCATION.

```SparkSQL
-- Check the table location  
DESCRIBE EXTENDED schema_name.table_name

-- Recreate pointing to correct path  
CREATE TABLE schema_name.table_name USING DELTA LOCATION "abfss://..."
```

##### Workspace or Lakehouse was renamed

- Renaming a workspace can break paths that were hardcoded. Use relative paths or notebookutils.fs to resolve paths dynamically.

> [!IMPORTANT]
> This is a common real-world trap specific to Fabric. If you recently renamed your workspace and tables stopped working, this is likely the cause.

##### Cross-workspace access without correct path

- When accessing tables in another workspace, use the full ABFS path:

```PySpark
spark.read.format("delta").load("abfss://container@account.dfs.core.windows.net/Tables/tablename")
```

##### Shortcut or mount point broken

- If using OneLake shortcuts, verify the shortcut target still exists and the connection is valid.

### WASB — NoCredentials

> [!IMPORTANT]
> WASB (Windows Azure Storage Blob) is a legacy protocol. The primary fix is to migrate to ABFS (Azure Blob File System) paths using the `abfss://` scheme, which is the modern and supported approach in Fabric. Use the steps below only if migration isn't immediately possible.

#### Error messages to look for

```text
Spark_User_WASB_NoCredentials

No credentials found for account <storage_account>.blob.core.windows.net

WASB authorization failed
```

#### Resolution steps

**1. Migrate to ABFS (recommended)**

- Convert your paths from `wasb[s]://` to `abfss://`:

```text
# Old (WASB): wasbs://container@account.blob.core.windows.net/path

# New (ABFS): abfss://container@account.dfs.core.windows.net/path
```

**2. If migration is not possible, configure the storage account key**

```PySpark
spark.conf.set("fs.azure.account.key.<account>.blob.core.windows.net", "<key>")
```

> [!IMPORTANT]
> Storing account keys in notebook code is a security risk. Use Fabric connections or Azure Key Vault instead.

## Authentication and token errors

### CustomTokenProvider Unauthorized

**Error:** `Spark_Ambiguous_CustomTokenProvider_Unauthorized`

**Why it happens:** The custom token provider encountered an authorization failure.

**What to do:**

- Verify that authentication credentials are correct and not expired.

- Check that the service principal / managed identity has the required role assignments.

- Ensure OAuth tokens haven't expired (long-running jobs might outlast token lifetimes).

- Review Microsoft Entra audit logs for specific authorization failures.

### Unable to generate session token

**Error:** `UNABLE_TO_GENERATE_SESSION_TOKEN_WITH_TOKEN_PROVIDER`

**What it means:** Fabric couldn't generate the authentication token required to start your Spark session. The session fails before any user code executes.

**What to do:**

- Verify that your Fabric workspace capacity is active and not paused.

- Check that your Microsoft Entra tenant isn't experiencing authentication issues.

- If you're using a service principal or managed identity, confirm it has the correct role assignments on the workspace.

- Try opening a new browser session or clearing cached credentials.

- If the error is intermittent, retry—token generation can have transient failures.

- If persistent, check the Fabric admin portal for any capacity or tenant-level issues, then contact support.

### ABFS unauthorized (403)

#### What does this error mean?

The error code Spark_User_ABFS_Unauthorized means your Spark job received a 403 Forbidden response when trying to access Azure Blob File System (ABFS) storage. Your identity or service principal doesn't have the required permissions.

#### Error messages to look for

```text
Operation failed: "This request is not authorized to perform this operation using this permission."

StatusCode=403, ErrorCode=AuthorizationPermissionMismatch

StorageRequestFailedException: Status code: 403
```

#### Common causes and fixes

##### Missing Storage Blob Data role

- Your Fabric identity needs at least Storage Blob Data Reader (for reads) or Storage Blob Data Contributor (for writes) on the storage account.

- In the Azure portal, go to your storage account, select **Access Control (IAM)**, and then select **Add role assignment**.

##### SAS token expired or insufficient permissions

- If using a SAS token, check the expiry date and ensure it has the correct permissions (read, write, list).

##### Firewall or Private Endpoint blocking access

- If the storage account has firewall rules, ensure the Fabric workspace IP ranges are allowed.

- For Private Link, ensure the private endpoint is correctly configured and approved.

##### OneLake access not properly configured

- For cross-tenant or cross-workspace access, verify sharing settings and permissions in Fabric admin.

### Token provider user error

#### What does this error mean?

The error code TOKEN_PROVIDER_USER_ERROR means the token provider configured for your Spark session returned an error when trying to obtain an access token. This prevents your job from authenticating to downstream services.

#### Common causes and fixes

##### Service principal credentials expired

- If using a service principal, check that the client secret hasn't expired.

- Renew the secret in Microsoft Entra ID and update the configuration in Fabric.

##### Incorrect tenant, client ID, or client secret

- Verify the values in your token provider configuration match the Microsoft Entra ID app registration.

##### Consent not granted

- Ensure the service principal has been granted the required API permissions and admin consent has been provided.

##### Linked service or connection misconfigured

- If using a Fabric connection or linked service, recreate it and test the connection.

## Delta Lake and streaming errors

### DeltaLake DataTransformationException

**Error:** `Spark_Ambiguous_DeltaLake_DataTransformationException`

The full error code might include a user application exception class name rather than a Fabric-specific code.

**Why it happens:** A data transformation error occurred while processing data for a Delta Lake operation.

**What to do:**

- Examine the full stack trace—it usually identifies the specific column or transformation that failed.

- Check for data quality issues: null values in non-nullable columns, values exceeding column constraints.

- Verify source data schema matches the target Delta table schema:

```PySpark
df.printSchema()  
spark.sql("DESCRIBE EXTENDED target_table").show(truncate=False)
```

- Add data validation before the write operation:

```PySpark
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

**Why it happens:** A `NullPointerException` occurred in the user's application code.

**What to do:**

- Read the full stack trace: identify whether the null pointer is in your code or in a Spark internal component.

- Common causes:

- Null values in DataFrame columns passed to UDFs:

```PySpark
@udf(returnType=StringType())  
def safe_upper(x):  
    return x.upper() if x is not None else None
```

- Filter nulls before processing:

```PySpark
df = df.filter(col("my_col").isNotNull())
```

- Avoid referencing non-serializable objects inside Spark transformations.

### UserApp IllegalStateException

**Error:** `Spark_Ambiguous_UserApp_IllegalStateException`

**Why it happens:** An `IllegalStateException` occurred in the user's application code. An operation was called at an invalid time or in an invalid state.

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

**Errors:** Spark_Ambiguous_NonJvmUserApp_ExitWithStatus1, Spark_Ambiguous_NonJvmUserApp_FailedContainerLaunch

**Why it happens:** A Python, R, or other non-JVM application failed to start or exited with an error.

**What to do:**

- ExitWithStatus1: Check driver logs (stderr) for the Python/R stack trace—SyntaxError, ModuleNotFoundError, and similar errors.

- FailedContainerLaunch: Incompatible or corrupted custom library, or resource constraints.

- Test your code locally or in a minimal notebook first.

- Remove custom libraries one by one to isolate the issue.

### UserApp ClassNotFound

#### What does this error mean?

The error code Spark_User_UserApp_ClassNotFound means your Spark job tried to load a Java/Scala class that doesn't exist in the classpath. This is typically caused by a missing library, incorrect import, or a version mismatch.

#### Common causes and fixes

##### Missing JAR dependency

- Upload the required JAR to your Fabric environment or attach it to the session:

```python
%%configure  
{"jars": ["abfss://container@account.dfs.core.windows.net/libs/my-lib.jar"]}
```

##### Incorrect class name or package path

- Verify the fully-qualified class name matches the library version you're using.

##### Library version mismatch

- The class might exist in a different version of the library. Check which version is installed:

```PySpark
# Check installed libraries  
spark.sparkContext.getConf().get("spark.jars")
```

##### Fat JAR not built correctly

- If using a fat/uber JAR, ensure all transitive dependencies are included.

- Check the JAR contents:

```bash
# From a terminal  
jar tf my-app.jar | grep ClassName
```

### NonJvmUserApp TypeError

#### What does this error mean?

The error code Spark_User_NonJvmUserApp_TypeError means your PySpark code raised a Python TypeError exception. This occurs when an operation is applied to an object of an inappropriate type.

#### Common causes and fixes

- Check for type mismatches in UDF return types—ensure your UDF return type annotation matches the actual return value.

- Verify DataFrame column types before operations like joins, filters, or aggregations.

- Use explicit type casting when needed:

```PySpark
from pyspark.sql.functions import col  
df = df.withColumn("amount", col("amount").cast("double"))
```

- Check for `None`/null handling—PySpark UDFs receiving null values might cause `TypeError`s if not handled.

### UserApp KeyError

#### What does this error mean?

The error code Spark_User_UserApp_KeyError means your PySpark code raised a Python KeyError exception, typically when accessing a dictionary with a key that doesn't exist.

#### Common causes and fixes

- Use .get() with a default value instead of direct dictionary access:

```PySpark
# Instead of: value = my_dict[key]  
value = my_dict.get(key, default_value)
```

- Check for column name changes—if the upstream data schema changed, a previously valid key might no longer exist.

- Add error handling in UDFs:

```PySpark
def safe_lookup(key):  
    try:  
        return lookup_dict[key]  
    except KeyError:  
        return None
```

### UserApp AssertionError

#### What does this error mean?

The error code Spark_User_UserApp_AssertionError means your code raised a Python AssertionError. This happens when an assert statement fails, indicating a condition your code expected to be true was false.

#### Common causes and fixes

- Review your assert statements—the condition being checked isn't met at runtime:

```PySpark
# This will raise AssertionError if df is empty  
assert df.count() > 0, "DataFrame is empty"
```

- Add proper error handling instead of relying on assertions:

```PySpark
if df.count() == 0:  
    raise ValueError("No data to process")
```

- Check for data quality issues—assertions often guard data integrity assumptions that might fail with new data.

### UserApp AttributeError

#### What does this error mean?

The error code Spark_User_UserApp_AttributeError means your PySpark code tried to access an attribute or method that doesn't exist on an object.

#### Common causes and fixes

- Check for API changes between Spark versions—a method that existed in Spark 3.3 might be renamed or removed in Spark 3.5. See [Spark SQL Migration Guide](https://spark.apache.org/docs/latest/sql-migration-guide.html) for version-specific breaking changes.

- Verify the object type. A common mistake is calling DataFrame methods on a Row, string, or None:

```PySpark
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

#### What does this error mean?

The error code Spark_User_Conda_PipFailed means that a library installation (via pip or conda) failed during environment setup for your Spark session. Fabric creates a custom environment based on your configuration, and this error occurs when that setup fails.

#### Common causes and fixes

##### Package does not exist on PyPI/Conda

Verify the package name and version are correct:
- Check on PyPI: `https://pypi.org/project/<package-name>/`
- Or run locally: `pip install <package-name>==<version>`

##### Version conflict with pre-installed packages

- Fabric environments come with pre-installed packages. Your requested version might conflict.

- Check the Fabric runtime release notes for the list of pre-installed packages and their versions.

- Try removing the version pin to let pip resolve a compatible version.

##### Package requires system-level dependencies

- Some Python packages require C libraries or system packages that are not available in the Fabric environment.

- Use pre-compiled wheels when possible, or choose a pure-Python alternative.

##### Network connectivity issue

- If using a private endpoint or firewall, ensure the Fabric environment can reach PyPI or your private package feed.

##### Custom environment configuration error

- Review your environment.yml or requirements.txt for syntax errors.

- Test your environment locally before deploying to Fabric.

## Platform and engine errors

### Native Execution Engine — InvalidState

**Error:** `Spark_System_NativeExecutionEngine_InvalidState`

**What it means:** The Fabric Native Execution Engine encountered an internal error and couldn't process your query. This is a platform-level issue, not a code error.

**What to do:**

- Retry the job—transient invalid state errors often resolve on the next run.

- If the error is reproducible, try disabling the native execution engine to confirm it is the cause:

```python
%%configure  
{  
"conf": {  
"spark.native.enabled": "false"  
}  
}
```

- If disabling the native engine resolves the issue, your query hit an unsupported edge case. Run with it disabled as a workaround while you contact support.

- Include the full error message and the query/code that triggered it in your support ticket.

> [!NOTE]
> The Native Execution Engine accelerates many common operations but doesn't yet support all Spark SQL features. Complex UDFs, certain data types, or unusual query patterns might fall back to the standard JVM engine or fail.

### MetaStore — HiveException

**Error:** `Spark_System_MetaStore_HiveException`

**What it means:** The Spark metastore (Hive-compatible catalog) encountered an error while processing a table or database operation.

#### Common causes

| Cause | Example Error Snippet |
|----|----|
| Table metadata corrupted or missing | `HiveException`: Unable to fetch table ... Table not found |
| Concurrent DDL operations on the same table | `HiveException`: ... lock acquisition timed out |
| Incompatible schema evolution | `HiveException`: Unable to alter table ... column type mismatch |
| Catalog connectivity timeout | `HiveException`: ... connection refused / read timed out |

**What to do:**

- Retry the job—catalog connectivity timeouts are often transient.

- Avoid running concurrent DDL (ALTER, DROP, CREATE) on the same table from multiple notebooks.

- If schema changes were recently applied, verify the table schema:

```SparkSQL
DESCRIBE EXTENDED my_database.my_table
```

- If the table appears corrupted, try recreating it from the underlying data:

```SparkSQL
-- For Delta tables  
CREATE TABLE my_table USING DELTA LOCATION 'abfss://...'  
  
-- For Parquet tables  
CREATE TABLE my_table USING PARQUET LOCATION 'abfss://...'
```

- If the error mentions "lock acquisition", wait a few minutes and retry—another session might be holding a metadata lock.

## NotebookUtils EmptyString

**Error:** `Spark_Ambiguous_MsSparkUtils_EmptyString`

**Why it happens:** A notebookutils function received an empty string where a value was expected.

**What to do:**

- Check that all parameters passed to notebookutils functions are non-empty:

    ```PySpark
    # Incorrect  
    notebookutils.fs.ls("")  
    
    # Correct  
    notebookutils.fs.ls("abfss://container@account.dfs.core.windows.net/path")
    ```

- Verify variables are initialized and non-empty before use.

- If using notebook parameters, ensure default values are provided.

## When to contact support

If you've tried the relevant self-help steps and the issue persists, open a support ticket with:

- Spark Application ID (for example, application_XXXXX_YYYY)

- The exact error code and message from the Spark UI or driver logs

- Full stack trace (copy from driver logs stderr)

- Spark UI screenshots—Executors tab, Stages tab, Storage tab

- Your Spark configuration—node size, node count, runtime version, any custom spark.conf.set() values

- Approximate data size being processed

- Whether the issue is reproducible, intermittent, or new (was it previously working?)

- Any recent changes to data, code, environment, or runtime version

- The SQL query or code that caused the error (if applicable)

For more information on monitoring and instrumenting Spark applications, see [Spark Monitoring & Instrumentation](https://spark.apache.org/docs/latest/monitoring.html).

## Related content

- [Troubleshoot permissions and capacity errors](troubleshoot-permissions-capacity.md)
- [Manage Apache Spark libraries](library-management.md)
- [Monitor Spark jobs within a notebook](spark-monitor-debug.md)
- [Debug apps with Apache Spark history server](apache-spark-history-server.md)
- [Concurrency limits and queueing](spark-job-concurrency-and-queueing.md)
- [Apache Spark runtimes in Fabric](runtime.md)
- [Fabric lakehouse overview](lakehouse-overview.md)
