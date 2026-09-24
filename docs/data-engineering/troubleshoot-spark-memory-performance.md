---
title: Troubleshoot Spark memory and performance issues
description: Diagnose and resolve Spark memory and executor failures in Microsoft Fabric, including out-of-memory errors, exit codes, data skew, and shuffle spill.
ms.topic: troubleshooting-problem-resolution
ms.date: 07/27/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Troubleshoot Spark memory and performance issues

Use this guide to diagnose and resolve memory and executor failures in Microsoft Fabric Spark jobs, including out-of-memory errors, executor crashes, data skew, and shuffle spill. For other Spark job errors, see [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md).

## Spark MaxExecutorFailures

### What does this error mean?

The error code `Spark_Ambiguous_Executor_MaxExecutorFailures` means Spark terminated your application because too many executor processes crashed. Spark distributes work across executors. When one crashes, Spark retries it. But if executors keep failing past a threshold, Spark aborts the entire job.

> [!IMPORTANT]
> This error is always a symptom, not the root cause. The real question is: why are executors failing?

Typical messages you see:

```text
ExecutorLostFailure (executor N exited caused by one of the running tasks)  
Reason: Container killed on request. Exit code is 137

Max number of executor failures (N) reached
```

### Step 1: Find the exit code

In the Spark UI, select the **Executors** tab to review the exit codes of failed executors:

| Exit code | Meaning | Most likely cause |
|----|----|----|
| 137 | Killed by OS (`SIGKILL`) | Out of memory: container exceeded its memory limit |
| 143 | Terminated (`SIGTERM`) | Timeout, preemption, or node decommission |
| 134 | Aborted (`SIGABRT`) | JVM crash or native memory corruption |
| 1 | General error | User code exception, misconfiguration, or missing dependency |
| -100 | Container preempted/lost | The container was preempted or the node was lost |

### Step 2: Match your scenario

#### Scenario A — Exit code 137 (out of memory)

**What you see:** Driver logs show "Container killed on request. Exit code is 137".

```text
Container killed by YARN for exceeding memory limits. 7.1 GB of 7 GB physical memory used.
```

**Why it happens:** The data processed by an executor exceeds its total memory (heap + overhead). Common triggers: data skew, large partitions, excessive caching, broadcast joins with large tables, PySpark UDFs, or insufficient disk space for shuffle spill operations.

**What to do:**

> [!IMPORTANT]
> Use `%%configure`, not `spark.conf.set()`, for resource configurations: Settings for `spark.executor.*`, `spark.driver.*`, `spark.network.*`, and `spark.yarn.*` are read at session or executor launch and can't be changed mid-session with `spark.conf.set()`. Place these settings in a `%%configure` cell as the very first cell of your notebook (before any other code), or set them in your Fabric Environment. Only `spark.sql.*` settings (AQE, shuffle partitions, broadcast threshold, rebase modes) can be changed at runtime with `spark.conf.set()`. The `%%configure` cell must be the first cell and restarts the session when run.

- Increase executor memory and overhead:

    ```python
    spark.conf.set("spark.executor.memory", "<VALUE>")  # Small=4g, Medium=8g, Large=16g, XLarge=28g
    spark.conf.set("spark.executor.memoryOverhead", "<VALUE>") # Small=2g, Medium=4g, Large=6g, XLarge=8g
    ```

- Repartition to create smaller, more uniform partitions:

  To choose a value for `N`, divide your estimated data size by 200 MB as a starting point (for example, 40 GB of data maps to `repartition(200)`). Aim for 128–256 MB per partition, and verify the actual task input sizes in the **Stages** tab of the Spark UI.

    ```python
    df = df.repartition(N)  # Increase N to reduce per-partition size
    ```

- Enable Adaptive Query Execution (AQE):

    Adaptive Query Execution is enabled by default in all Fabric runtimes. The useful levers are the sub-settings such as `spark.sql.adaptive.skewJoin.enabled` for handling skewed joins. If you have a skewed join, enabling AQE allows Spark to automatically detect and handle skew at runtime by splitting large partitions.

    ```python
    spark.conf.set("spark.sql.adaptive.enabled", "true")  
    spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
    ```

- Reduce caching: only cache DataFrames reused multiple times; call `df.unpersist()` when done.

- Disable broadcast for large tables:

    ```python
    spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "-1")
    ```

#### Scenario B — Exit code 143 (SIGTERM: timeout, scale-down, or preemption)

**What you see:** Driver logs show "Executor heartbeat timed out after 120000 ms" or "ExecutorLostFailure".

**Why it happens:** Exit code 143 is `SIGTERM`, a graceful termination signal. With dynamic allocation (the Fabric default), this code is often normal, because Fabric scales down idle executors by sending `SIGTERM`. If all your executors exit with 143 and the job completes, you don't need to take any action.

If executors exit with 143 during active work, the cause is usually one of the following:

- Heartbeat timeout, when an executor is stuck in garbage collection (GC) or processing a large task.
- Node preemption or decommission.
- Platform-initiated scale-down.

Investigate further only if the job fails or executors exit with 143 mid-stage.

**What to do:**

- Increase heartbeat and network timeouts:

    ```python
    spark.conf.set("spark.executor.heartbeatInterval", "60s")  
    spark.conf.set("spark.network.timeout", "800s")
    ```

- If GC pressure is the cause, the real issue is memory. Increase executor memory and overhead, repartition data to create smaller partitions, enable AQE, and reduce caching (see **Scenario A** for detailed steps).

- Check if tasks are processing large partitions (repartition to smaller sizes).

#### Scenario C — Data skew (few executors fail repeatedly)

**What you see:** Most tasks finish quickly, but a few take far longer and fail. The same executors keep failing.

**How to confirm:** In the Spark UI, select the **Stages** tab, select a failed stage, and review the **Duration** and **Input Size** columns. If a few tasks have 10×–100× more input than others, you have data skew.

**What to do:**

- Enable AQE skew join handling. Adaptive Query Execution is enabled by default in all Fabric runtimes. The useful levers are the sub-settings such as `spark.sql.adaptive.skewJoin.enabled` for handling skewed joins. Enabling AQE allows Spark to automatically detect and handle skew at runtime by splitting large partitions.

    ```python
    spark.conf.set("spark.sql.adaptive.enabled", "true")  
    spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
    ```

- Use salting to break up large partitions:

    ```python
    from pyspark.sql.functions import rand  
    df = df.withColumn("salt", (rand() * N).cast("int"))  
    # Join/group on (key, salt), then aggregate without salt
    ```

- Filter or process the heavily skewed key separately.

#### Scenario D — Storage / connectivity failures

**What you see:** Driver logs show `java.io.IOException: ABFS operation failed`, connection refused, `HTTP 403`/`401` errors, or throttling (`HTTP 429`/`503`).

**What to do:**

- Verify your storage account is accessible and permissions are correct.

- Check if authentication tokens are still valid. Long-running jobs might see token expiry.

- If you hit throttling (429/503), reduce parallelism or spread the load over time.

- Check network security groups / firewall rules.

#### Scenario E — User code exceptions (exit code 1)

**What you see:** Executors fail with exit code `1`. Driver logs show a stack trace from your application code.

**What to do:**

- Read the full stack trace: it points to the exact line of code.

- Ensure your UDFs handle null values correctly.

- Verify all required libraries/JARs are available on every executor.

- Test on a small dataset first to isolate the problem.

#### Scenario F — PySpark / Pandas UDF crashes

**What you see:** Executors fail during Python UDF execution. Exit code `137` or messages about "worker exiting".

**Why it happens:** PySpark runs a separate Python process alongside the JVM. Both share the same node memory.

**What to do:**

- Replace Python UDFs with built-in Spark SQL functions wherever possible.

- Reduce Pandas UDF batch size:

```python
spark.conf.set("spark.sql.execution.arrow.maxRecordsPerBatch", "5000")
```

- Increase memory overhead.

```python
spark.conf.set("spark.executor.memoryOverhead", "<VALUE>")
```

#### Scenario G — Disk space exhaustion during shuffle

**What you see:** Executors fail with "No space left on device" or "IOException" during shuffle or sort operations.

**Why it happens:** When Spark can't fit data in memory, it spills to local disk. If the local disk fills up, the executor crashes.

**What to do:**

- Reduce the amount of data shuffled: filter early, select only needed columns.

- Increase the number of shuffle partitions to reduce per-partition size:

```python
spark.conf.set("spark.sql.shuffle.partitions", "400")  # Default is 200
```

- Scale up to nodes with more local disk space.

- Check for data skew — a skewed partition spills disproportionately to one executor's disk.

### Configuration quick reference

#### Memory and resources

| Configuration | Purpose |
|----|----|
| `spark.executor.memory` | JVM heap memory per executor |
| `spark.executor.memoryOverhead` | Off-heap memory for Python, native libs |
| `spark.driver.memory` | JVM heap memory for the driver |
| `spark.driver.memoryOverhead` | Off-heap memory for the driver |

#### Failure tolerance

| Configuration | Purpose |
|----|----|
| `spark.executor.maxNumFailures` | Max total executor failures before app is killed |
| `spark.executor.failuresValidityInterval` | Time window for counting failures (default: unlimited) |
| `spark.task.maxFailures` | Max retries per individual task (default: 4) |

> [!IMPORTANT]
> Increasing failure tolerance doesn't fix the root cause. It only allows the job to survive more transient failures.

For long-running jobs, set `spark.executor.failuresValidityInterval` to a time window (for example, "1h"). This setting makes Spark count only failures within that window, so a job running for many hours isn't killed by occasional transient failures that occurred hours apart.

#### Network and timeouts

| Configuration | Purpose |
|----|----|
| `spark.network.timeout` | General network timeout (default: 120s) |
| `spark.executor.heartbeatInterval` | Heartbeat frequency (default: 10s) |
| `spark.sql.adaptive.enabled` | Enables Adaptive Query Execution (dynamically optimizes shuffle partitions and join strategies at runtime). Adaptive Query Execution is enabled by default in all Fabric runtimes. The useful levers are the sub-settings such as `spark.sql.adaptive.skewJoin.enabled` for handling skewed joins. Enabling AQE allows Spark to automatically detect and handle skew at runtime by splitting large partitions. |
| `spark.sql.shuffle.partitions` | Partitions after shuffle (default: 200) |

#### Example: Applying via %%configure

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

In Fabric, the platform manages some configurations based on your node size. For the complete list of Spark configuration properties, see [Apache Spark Configuration](https://spark.apache.org/docs/latest/configuration.html).

### Scaling options

| Option | When to use |
|----|----|
| Scale up (larger nodes) | Each executor gets more memory and CPU resources (reduces out-of-memory (OOM) risk) |
| Scale out (more nodes) | Data spreads across more executors (reduces per-executor load) |
| Optimize first | Adding resources to a skewed workload doesn't help: the oversized partition still lands on one executor |

### Quick-reference troubleshooting table

| Observation | Likely cause | First action |
|----|----|----|
| All executors fail with exit code 137 | OOM | Increase executor memory and overhead; check for data skew |
| All executors fail with exit code 143 | Heartbeat timeout | Increase network timeout and heartbeat interval |
| Only a few executors fail repeatedly | Data skew | Enable AQE skew join; repartition data |
| Failures happen on the same node | Faulty node | Retry the job; if same node fails again, contact support |
| Failures correlate with I/O operations | Storage connectivity | Check storage access, firewall, token validity |
| Failures show user code stack traces | Application bug | Fix the code: null handling, missing libs |
| Failures during Python UDF execution | Python process OOM | Increase memoryOverhead; replace UDFs with SQL functions |
| Failures with "No space left on device" | Disk space exhaustion | Increase shuffle partitions; filter early; scale up node size |

## Exit code 137 or container killed on request

This section covers out-of-memory (OOM) errors in Microsoft Fabric Spark jobs that exit code 137 indicates. YARN kills a container when it exceeds its assigned memory limit, and it returns exit code 137 (SIGKILL). This code is the most common OOM signal in Spark.

### What does this error mean?

Exit code 137 means YARN's container memory monitor terminated the executor (or driver) container because it exceeded its allocated memory limit. Your Spark application requires more memory than its container provides.

> [!NOTE]
> The Linux OOM Killer can also produce exit code 137 (when the OS itself runs out of memory), but in Fabric the message "Container killed by YARN for exceeding memory limits" indicates YARN enforced the container limit, not the OS-level OOM Killer.

### How container memory is calculated

Each executor runs inside a YARN container whose total memory is:

```text
Container size = spark.executor.memory + spark.executor.memoryOverhead
```

If the combined memory usage of the JVM heap, off-heap buffers, Python processes, and native libraries exceeds this container size, YARN kills the container (exit code `137`).

Fabric nodes come in sizes such as 32 GB, 64 GB, 128 GB, and 512 GB. In the **Storage** tab of the Spark UI, if **Size in Memory** approaches your node's total RAM, your application is at risk of OOM.

> [!IMPORTANT]
> In Fabric, `spark.executor.memoryOverhead` is set to a fixed 384 MB regardless of node size, unlike the open-source Spark default of `max(384 MB, 0.1 × executor memory)`. For memory-intensive workloads such as PySpark UDFs, large shuffles, and native libraries, 384 MB is often insufficient. Set `spark.executor.memoryOverhead` explicitly to a higher value.

For detailed guidance on memory tuning, see [Spark Tuning Guide: Memory Management](https://spark.apache.org/docs/latest/tuning.html#memory-management-overview).

### Error messages to look for

```text
java.lang.OutOfMemoryError: Java heap space

java.lang.OutOfMemoryError: GC overhead limit exceeded

Container killed on request. Exit code is 137  
Container exited with a non-zero exit code 137  
Killed by external signal

os::commit_memory failed; error='Cannot allocate memory' (errno=12)  
Native memory allocation (mmap) failed to map <N> bytes
```

### Where to check

- **Spark UI, Executors tab:** Check for failed executors and their exit codes

- **Spark UI, Storage tab:** Check "Size in Memory" relative to your node size

- **Spark UI, Stages tab:** Check for skewed tasks (one task processing far more data than others)

- **Driver logs (stderr):** Search for `OutOfMemoryError`, exit code `137`, or `Cannot allocate memory`

### Common causes and fixes

#### Driver OOM from `collect()`, `toPandas()`, or `display()`

**Symptom:** The driver process runs out of memory. Often no Spark tasks are running at the time of the crash.

**Cause:** These operations pull the entire dataset from executors into driver memory.

**What to do:**

- Add `.limit(N)` before `collect()` or `toPandas()` to restrict the rows returned.

- Use `.write` to save results to storage instead of collecting to the driver.

- Use `display(df.limit(1000))` instead of `display(df)`.

- If you must use `toPandas()`, filter or aggregate the data first.

#### Executor OOM from data skew

**Symptom:** Most tasks complete quickly, but a few take long and fail with exit code `137`.

**Cause:** Uneven data distribution causes a few executors to process more data than others.

**What to do:**

- Identify skewed keys: inspect the Spark UI Stages tab for task duration variance.

- Use salting to break up large partitions.

- Enable AQE skew join handling. Adaptive Query Execution is enabled by default in all Fabric runtimes, so the key lever for skew is `spark.sql.adaptive.skewJoin.enabled`, which lets Spark detect and split large partitions at runtime.

```python
spark.conf.set("spark.sql.adaptive.enabled", "true")  
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
```

#### Executor OOM from caching too much data

**Symptom:** Memory usage climbs over time as cached DataFrames accumulate.

**Cause:** Calling `.cache()` or `.persist()` on multiple large DataFrames without releasing them.

**What to do:**

- Only cache DataFrames that you reuse multiple times.

- Unpersist when done: `df.unpersist()`.

- Use `MEMORY_AND_DISK` storage level instead of `MEMORY_ONLY`:

```python
from pyspark import StorageLevel  
df.persist(StorageLevel.MEMORY_AND_DISK)
```

#### Executor OOM from too few partitions

**Symptom:** Tasks process large amounts of data per partition.

**Cause:** The DataFrame has too few partitions relative to the data size.

**What to do:**

- Repartition to increase parallelism:

```python
df = df.repartition(N)  # Choose N based on your data size
```

- Aim for partitions around 128–256 MB each.

- For writes, use `coalesce()` only to reduce partitions (never to 1 for large data).

#### Broadcast join OOM

**Symptom:** Driver or executor OOM during a join operation.

**Cause:** Spark broadcasts a table that is too large.

**What to do:**

- Disable auto-broadcast for large tables:

```python
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "-1")
```

- Or reduce the threshold:

```python
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "10MB")
```

#### PySpark UDF / Pandas UDF memory pressure

**Symptom:** Executor memory spikes during UDF execution. Exit code `137`.

**Cause:** PySpark UDFs run in a separate Python process alongside the JVM executor. Both compete for the same node memory.

**What to do:**

- Replace Python UDFs with built-in Spark SQL functions where possible.

- For Pandas UDFs, reduce the batch size.

```python
spark.conf.set("spark.sql.execution.arrow.maxRecordsPerBatch", "5000")
```

- Increase memory overhead:

```python
spark.conf.set("spark.executor.memoryOverhead", "<VALUE>")
```

#### Native Execution Engine off-heap memory pressure

**Symptom:** Executors fail with exit code `137` even though your workload previously ran without issues, or the OOM occurs on queries that don't seem memory-intensive.

**Cause:** The Fabric Native Execution Engine enables off-heap memory by default with dynamic sizing. In some cases, this feature reserves a large portion of off-heap memory even when the native engine isn't actively processing your query. This reservation puts pressure on JVM heap memory and causes OOM.

**What to do:**

- Try disabling the Native Execution Engine to confirm it's the cause:

```python
spark.conf.set("spark.fabric.nativeExecution.enabled", "false")
```

- If the OOM goes away, the native engine's memory allocation was the trigger. Run with it disabled as a workaround while you contact support.

- If the OOM persists after disabling, the issue is a genuine memory shortage. Apply the other fixes in this section.

#### Driver OOM from large query plans (AQE)

**Symptom:** The driver crashes with `OutOfMemoryError` during query planning, not during data processing. The error might include "Required array length ... is too large".

**Cause:** Adaptive Query Execution (AQE) is enabled by default in all Fabric runtimes. When your query is very complex (many joins, unions, or cached DataFrames), Spark regenerates the query plan text on every plan change. Extremely large plan strings can exceed memory limits.

**What to do:**

- Limit the plan string length.

```python
spark.conf.set("spark.sql.maxPlanStringLength", "10000")
```

- If the issue persists, disable AQE for this specific job.

```python
spark.conf.set("spark.sql.adaptive.enabled", "false")
```

- Simplify the query: break it into smaller steps with intermediate writes to storage.

### General tuning options

#### Scale up (increase node size)

Increase your Spark pool's node size (for example, from Small to Medium or Large).

#### Scale out (add more nodes)

Increase the number of executors and nodes to distribute data across more nodes.

#### Reduce concurrent tasks per executor

Each executor runs multiple tasks in parallel (one per core). Reducing the number of concurrent tasks gives each task more memory, which can prevent OOM for memory-heavy operations.

```python
spark.conf.set("spark.executor.cores", "2")  # Default varies by node size
```

Fewer concurrent tasks mean slower throughput but more memory per task. Use this setting when individual tasks are memory-intensive (large aggregations, complex UDFs).

#### Adjust Spark configuration

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

#### Optimize your code

| Pattern to avoid | Better alternative |
|----|----|
| `df.collect()` on large data | `df.write.parquet(path)` |
| `df.toPandas()` on large data | `df.limit(N).toPandas()` or save to storage |
| `df.repartition(1)` on large data | `df.coalesce(N)` with reasonable N |
| `.cache()` everything | Only cache DataFrames reused \>1 time |
| Python UDFs | Built-in Spark SQL functions |
| `for row in df.collect(): ...` | Use Spark transformations (such as map or filter) |

## Spark_System_Executor_ExitCode137BadNode

### What does this error mean?

This error code means an executor stopped with exit code 137 (out of memory). The Fabric platform identifies that the failure occurred on a node that it flagged as faulty. Unlike a regular exit code 137, this classification indicates the platform detected infrastructure-level problems with the specific node where your executor was running.

### Error messages to look for

```text
ExecutorLostFailure Container from a bad node: container_XXXX_0001_01_000046  
on host: vm-XXXXXXXX. Exit status: 137.  
Diagnostics: Container killed on request. Exit code is 137  
Container exited with a non-zero exit code 137.  
Killed by external signal
```

### How is this different from regular exit code 137?

| Aspect | Exit code 137 (regular) | ExitCode137BadNode |
|----|----|----|
| Root cause | Your application exceeded the memory limit | A faulty node caused the executor to crash |
| Whose fault? | Typically user code or configuration | Typically platform infrastructure |
| Retry behavior | Same failure might recur on any node | Retry usually succeeds on a healthy node |
| Action needed | Tune memory, fix skew, optimize code | Retry the job; contact support if persistent |

### What to do

**Step 1:** Retry your job. The platform typically avoids scheduling work on nodes it flags as faulty. In most cases, the next run succeeds on a healthy node.

**Step 2:** If the error recurs on the same node across multiple retries, contact support with the Spark Application ID and the node information from the Spark UI Executors tab.

**Step 3:** If the error recurs on different nodes, the root cause might be your application rather than the infrastructure. Check if your workload has genuine OOM problems by reviewing the Exit Code 137 section.

A single occurrence of this error is usually transient and doesn't require any code changes. The platform automatically manages faulty node detection and removal.

## Container from a bad node / exit status: 50

### What does this error mean?

This error indicates that the platform terminated a Spark executor container because it ran on a node the platform detected as unhealthy or decommissioned. Exit status 50 is a Fabric-specific signal that indicates the platform proactively killed the container due to node-level problems, not because of your application code.

### Error messages to look for

```text
Container from a bad node. Exit status: 50

ExecutorLostFailure (executor N exited caused by one of the running tasks)  
Reason: Container from a bad node. Exit status: 50
```

### Why it happens

The Fabric platform continuously monitors node health. When the platform detects a node as unhealthy (due to hardware problems, disk failures, network problems, or other infrastructure faults), it terminates containers on that node to prevent data corruption or silent failures.

Common triggers include:

- Hardware issues on the underlying compute node (disk, memory, CPU)

- Node being decommissioned during a maintenance operation

- Network connectivity loss between the node and the cluster manager

- Node failing platform health checks

### What to do

**Step 1:** Retry the job. This error is typically transient. The platform routes subsequent work away from the faulty node, and the next run should succeed.

**Step 2:** Check how many executors were affected. If only one or two executors failed with exit status 50 and the rest completed normally, Spark's built-in retry mechanism might have already recovered the job automatically.

**Step 3:** If the job failed because these container losses pushed the total executor failures past the MaxExecutorFailures threshold, increase the failure tolerance to allow more retries:

```python
# Start 10–20 for production; 30–50 for long jobs with spark.executor.failuresValidityInterval="1h"
spark.conf.set("spark.executor.maxNumFailures", "20")  
```

> [!IMPORTANT]
> Increasing the failure tolerance is appropriate here because the root cause is infrastructure, not your code. Unlike OOM errors, allowing more retries for bad-node failures is a valid mitigation.

**Step 4:** If the error persists across multiple retries or affects many executors in the same run, contact support. Provide the Spark Application ID and the timestamps of the failures.

### How to distinguish from OOM (exit code 137)

| Signal | Exit code 137 (OOM) | Exit status 50 (bad node) |
|----|----|----|
| Error message | "Container killed on request. Exit code is 137" | "Container from a bad node. Exit status: 50" |
| Root cause | Application exceeded memory limit | Node infrastructure failure |
| Pattern | Often affects multiple executors or recurs on retry | Usually affects 1–2 executors; resolves on retry |
| Fix | Tune memory, fix skew, optimize code | Retry the job; increase maxNumFailures if needed |

## Related content

- [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md)
- [Troubleshoot permissions and capacity errors](troubleshoot-permissions-capacity.md)
