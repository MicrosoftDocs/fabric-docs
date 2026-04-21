---
title: Spark monitoring and performance optimization best practices
description: Learn Spark monitoring and performance optimization in Microsoft Fabric to troubleshoot failures, improve runtime, and reduce costs by choosing the right monitoring and tuning strategies.
ms.reviewer: jejiang
ms.date: 04/21/2026
ms.topic: best-practice
---

# Spark monitoring and performance optimization best practices

This best practices guide covers Spark monitoring and performance optimization in Microsoft Fabric to improve reliability, speed, and cost efficiency. Use it to choose recommended workflows and decisions for common operational situations.

Use this guide based on your immediate goal:

- Troubleshoot failed jobs and operational issues using the monitoring sections.
- Diagnose regressions and compare runs before tuning configuration.
- Optimize runtime, storage layout, and resource usage for sustained performance.

The guide is divided into two parts: monitoring-focused sections through [Monitoring decision quick reference](#monitoring-decision-quick-reference) for diagnosing failures and improving observability, and performance-focused sections from [Runtime selection and native execution engine](#runtime-selection-and-native-execution-engine) onward for tuning throughput and resource efficiency.

## Troubleshooting a failed Spark job

**Scenario:** A scheduled Spark notebook failed overnight. You need to find out what happened and fix it before the next run.

### Recommended investigation workflow

Follow these steps in order. Most failures are resolved by drilling into the logs; deeper steps are for intermittent or complex issues.

1.  **Start in the monitoring hub.** Select **Monitor** from the left navigation. Filter by **Status** (such as Failed) and your workspace. The hub shows the 100 most recent activities from the past 30 days. Identify the failed run and open its detail page by selecting the activity name.

1.  **Check the error summary first.** On the application detail page, look at the **Properties** panel (top-right icon). The high-level error message and failure stage are shown here. For pipeline-triggered failures, the inline error message is surfaced directly within the **Pipeline** activity view, so check there first if the job was orchestrated.

1.  **Drill into the Logs tab.** Select the **Logs** tab and choose **Driver logs**. Search for keywords like ERROR, Exception, or out-of-memory (OOM). For high-concurrency sessions, filter by the specific **Notebook** name to isolate logs from your workload.

1.  **Inspect the Jobs tab for stage-level failures.** Expand the failed Job ID to see which stage failed. Select the stage description to navigate to the Spark UI for task-level detail, including which executor failed and the specific error stacktrace.

1.  **Compare against a known-good run.** Use Item Snapshots to compare the code and parameters of the failed run against the last successful one. Parameter changes, environment drift, or data schema changes are common culprits that surface here.

> [!TIP]
> Logs might not be available if the job was queued or cluster creation failed. In that case, the error is infrastructure-level — check capacity utilization and throttling status in the Capacity Metrics app.

### Common failure patterns and where to look

| **Failure pattern** | **Where to investigate** | **What to look for** |
|----|----|----|
| **Driver OOM** | Logs tab > Driver logs; Spark UI > Executors | `collect()`, `toPandas()`, `countByKey()` pulling too much data into driver memory |
| **Executor OOM** | Logs tab > search for OutOfMemoryError; Jobs tab > stage with failed tasks | Wide joins, heavy aggregations, or cached datasets exceeding executor memory |
| **Data Skew** | Jobs tab > expand stage > check task metrics; Spark Advisor (Diagnostics panel) | Large gap between median and max task times; one partition with disproportionate data |
| **Schema Mismatch** | Logs tab > search for AnalysisException; Item Snapshots > compare parameters | Upstream schema change breaking downstream reads; column name or type drift |
| **Throttling (HTTP 430)** | Monitoring Hub > check if job was queued; Capacity Metrics app | Insufficient capacity units; too many concurrent Spark sessions on the capacity |
| **Cluster Creation Failed** | Monitoring Hub > status shows no logs available | Capacity exhausted; managed VNet or private endpoint misconfiguration |

### Use Spark Advisor for automated diagnosis

Before manually digging through logs, check whether the Spark Advisor has already identified the issue. The advisor analyzes Spark executions in real-time and provides three categories of advice: Info, Warning, and Error. It automatically detects data skew, caching misuse (for example, missing cache before `randomSplit`), and common code mistakes.

In the notebook view, advice icons with counts appear beneath each cell. On the application detail page, the Diagnostics panel surfaces the same advice. Start here — the advisor often pinpoints the root cause faster than manual log analysis.

**Antipattern:** Ignoring Spark Advisor warnings because the job succeeded. A "Warning" today (for example, skew detected or suboptimal caching) often becomes tomorrow's failure when data volume grows.

## Identify performance regressions over time

**Scenario:** A Spark notebook that used to complete in 12 minutes now takes 35 minutes. Nothing in the code changed. You need to find out what regressed and when.

### Use run series to visualize the trend

The run series feature groups all runs of the same notebook or Spark job definition into a duration trendline with data I/O overlays. It also auto-scans for anomalous runs. This is the single best tool for catching regressions.

1.  **Open run series.** From the Monitoring Hub, find your item, open Historical Runs, select a run, and choose Monitor Run Series. Alternatively, open the item's Recent Runs panel and select Monitor Run Series.

1.  **Identify the inflection point.** Look at the duration trend graph for the moment the bars started growing. Correlate with the data I/O trendline — if input data spiked at the same time, the regression might be data-driven rather than code-driven.

1.  **Select the anomalous run.** Selecting a specific run reveals Duration Time Distribution, Executor Execution Distribution, and the Spark Configuration used for that run. Compare these against a healthy baseline run.

### Use application comparison for side-by-side analysis

From the Run Series page, switch to the Compare Runs tab. Select the regressed run and a known-good baseline (up to four runs total). The comparison view shows side-by-side metrics across both runs. From here you can drill into Spark L2 monitoring pages for job, query, and task-level details.

Focus on these comparison signals:

- **Stage duration changes:** If a specific stage's duration ballooned, investigate that stage's shuffle size and task distribution.

- **Executor count changes:** If fewer executors were allocated in the slower run, autoscale limits or capacity contention might be the cause.

- **Spark configuration drift:** If any Spark configs differ between the runs (for example, shuffle partitions, native execution engine (NEE) enablement), that's likely the culprit.

- **Data volume changes:** If data read increased significantly, the regression is upstream — investigate data source growth or partition pruning effectiveness.

> [!NOTE]
> Cross-artifact comparison isn't yet supported. You can only compare runs within the same Notebook or Spark job definition.

### Establish baselines and catch regressions early

> [!TIP]
> Schedule a weekly review of Run Series for your critical pipelines. Set expectations for normal duration and data volume ranges. When a run falls outside the range, investigate immediately instead of waiting for the job to fail.

For programmatic regression detection, use the Job Insight Library (Preview, Runtime 1.3+) to persist execution metrics to Lakehouse tables. Build a notebook that queries these tables and flags runs where duration exceeds the trailing 4-week average by more than 50%.

## Secure production access for monitoring

**Scenario:** Your production Spark jobs run in a locked-down workspace. Developers can't access it directly, but the on-call support team reports a failure that requires developer investigation.

### The principle: least-privilege access

Don't grant developers direct access to production workspaces. Instead, follow a handoff workflow where privileged users (SREs, production support engineers) retrieve logs and share them with developers. This maintains the principle of least-privileged access while enabling effective debugging.

### Recommended production debugging workflow

1.  **Support engineer retrieves logs.** The production support engineer opens the failed Spark application in the Monitoring Hub, navigates to the Logs tab, and selects **Download Log** to save the driver and executor logs locally. They also navigate to the **Event Logs** tab and download the event logs.

1.  **Logs are shared with the developer.** The support engineer transfers the log files to the developer through your organization's standard secure channels (for example, Teams, SharePoint, shared storage).

1.  **Developer investigates locally.** The developer sets up a Spark History Server locally to replay the event logs. This provides the full Spark UI experience (stages, tasks, directed acyclic graph (DAG), executors, SQL plans) without requiring any access to the production workspace.

### Programmatic log retrieval via APIs

For teams that want to automate this handoff, Fabric provides REST application programming interfaces (APIs) for retrieving driver logs, executor logs, rolling logs, and application metadata. Build an automation pipeline that:

- Polls the Monitoring Hub API for failed runs in the production workspace.

- Retrieves logs via the Spark Monitoring APIs using a service principal with read-only access.

- Deposits logs into a shared Azure Storage account or Lakehouse accessible to developers.

- Sends a notification (for example, Teams webhook, email) with a link to the logs.

> [!TIP]
> Use the Spark Monitoring REST APIs to build a self-service log retrieval tool, reduce the operational burden on your site reliability engineering (SRE) team, and accelerate time to resolution.

### Use item snapshots for reproducibility

The Item Snapshots tab on the application detail page captures the exact code and parameter values at execution time. When investigating production issues, always retrieve the snapshot alongside the logs. This ensures the developer investigates the exact code that ran, not the current version of the notebook (which might have been edited since the failure).

## Set up cross-workspace observability and alerting

**Scenario:** You run Spark workloads across multiple Fabric workspaces. You need a single view of health across all of them, with alerts when jobs fail or performance degrades.

### Why built-in monitoring alone isn't enough

The Monitoring Hub is scoped to a single workspace and retains only 30 days of history. For enterprise observability, you need centralized collection across workspaces, long-term retention, Kusto Query Language (KQL)-based querying, and automated alerting. The Fabric Apache Spark Diagnostic Emitter bridges this gap.

### Choosing the right destination

| **Destination** | **Best For** | **Key Capability** | **Limitation** |
|----|----|----|----|
| **Azure Log Analytics** | Querying, dashboards, alerting | KQL queries over logs and metrics; fire alerts at set frequency | 30 MB per post; not supported with managed virtual network private endpoints |
| **Azure Storage** | Long-term archival, compliance | JSON lines format; batch analysis; AccessKey or KeyVault auth | No built-in query/alerting — pair with downstream analytics |
| **Azure Event Hubs** | Real-time streaming pipelines | Feed into Fabric eventstreams for live processing; managed PE supported | Connection string must include EntityPath |

> [!TIP]
> For most teams, start with Azure Log Analytics for immediate query and alerting capabilities. Add Azure Storage if you need long-term retention beyond Log Analytics' default limits. Add Event Hubs only if you have streaming processing requirements.

### Configuration steps

1.  **Create a Fabric Environment artifact.** Add the diagnostic emitter Spark properties with appropriate values (workspace key, connection strings, categories). Categories include DriverLog, ExecutorLog, EventLog, and Metrics. You can upload a .yml file with these properties already populated.

1.  **Attach the environment.** Either attach it to individual notebooks via the Environment menu on the Home tab, or set it as the workspace default under Workspace Settings > Data Engineering/Science > Spark Settings > Environment tab. The workspace default applies to all notebooks and Spark job definitions.

1.  **Filter emitted logs.** Use the `spark.synapse.diagnostic.emitter.<destination>.filter.loggerName.match` property to emit only logs from specific loggers (for example, your custom `log4j` logger). This reduces noise and storage costs.

1.  **Verify configuration.** After starting a Spark session, navigate to the Spark UI > Environment tab and check the settings under Spark Properties. Confirm that the Log Analytics workspace key, storage URI, or Event Hub connection string are correctly configured.

### Build alerts

Once logs and metrics are flowing to Log Analytics, set up Azure Monitor alerts to catch failures and performance degradation proactively:

- **Failure alerts:** Query `SparkListenerEvents` for application failure events. Fire an alert within minutes of any production job failure.

- **Duration regression alerts:** Query execution duration metrics. Alert when a job's duration exceeds a threshold (for example, 2x its historical average).

- **Memory pressure alerts:** Query JVM memory metrics (for example, `jvm.total.used`) to detect executors approaching memory limits before OOM occurs.

Use Azure Monitor's log alert rules to evaluate these KQL queries at a set frequency and trigger notifications via email, Teams, or webhooks.

**Antipattern:** Emitting all log categories to all destinations without filtering. This generates massive data volumes and costs. Start with EventLog and Metrics for operational monitoring, and add DriverLog/ExecutorLog only for workloads that need deep debugging.

## Use logging best practices for effective monitoring

**Scenario:** You want your Spark applications to produce logs that are useful when things go wrong and that integrate cleanly with the Diagnostic Emitter for centralized analysis.

### Use `log4j`, not `print()`

`print()` statements in PySpark burden the driver with serialized output and don't integrate with Spark's log infrastructure. Use `log4j` through the JVM bridge for production logging:

```python
log4jLogger = spark._jvm.org.apache.log4j
logger = log4jLogger.LogManager.getLogger("MyAppLogger")
logger.info("Processing started for partition: " + str(partition_id))
```

With log4j, your logs appear in the Driver Logs tab, are searchable by logger name, and can be emitted via the Diagnostic Emitter to external destinations.

### Structure your logging for debuggability

- Wrap reads, writes, and transformations in try/except blocks. Use `logger.error` with the full traceback for exceptions and `logger.info` for progress milestones.

- Log data volume checkpoints: row counts after key transformations, partition counts after repartition, and file counts after writes. These breadcrumbs are invaluable when diagnosing where things went wrong.

- Use descriptive logger names (e.g., "ETL.CustomerPipeline.Transform") so you can filter logs by pipeline stage in Log Analytics.

- For bad data capture, write failed rows/records to Lakehouse tables for record-level debugging. This supplements log-level analysis with data-level evidence.

**Antipattern:** Using generic logger names such as "main" or "app" across all notebooks. When logs from multiple notebooks arrive in Log Analytics, you can't distinguish them. Use unique, hierarchical logger names per pipeline or notebook.

## Monitoring decision quick reference

Use this table to quickly identify the right tool for your monitoring need.

Use this summary table to avoid the most common monitoring and operations mistakes.

| **Common antipattern** | **Why it hurts** | **Better approach** |
|----|----|----|
| Ignoring Spark Advisor warnings because a run succeeded | Latent issues (for example, skew or caching misuse) often become failures as data volume grows | Review warnings regularly and resolve high-impact findings before scale increases |
| Emitting all log categories to all destinations | Creates unnecessary volume, cost, and noise in downstream analysis | Start with `EventLog` and metrics, then add driver or executor logs only where needed |
| Using generic logger names such as `main` or `app` | Makes cross-notebook troubleshooting difficult in centralized logs | Use unique, hierarchical logger names per pipeline or notebook |

| **I need to** | **Start Here** | **Then Go Deeper With** |
|----|----|----|
| See what's running right now | Monitoring Hub (filter: Running) | Cell-level progress bars in Notebook |
| Find out why a job failed | Monitoring Hub > Detail page > Logs tab | Spark UI (task-level errors); Spark Advisor (Diagnostics) |
| Check if a job is slower than usual | Historical Runs > Monitor Run Series | Compare Runs (up to 4 side-by-side) |
| Determine if executors are over-provisioned | Detail page > Resources tab | Executor usage graph (Running vs. Allocated lines) |
| See exactly what code ran in a past execution | Detail page > Item Snapshots tab | Compare snapshots across runs for drift |
| Debug a production failure without prod access | SRE downloads logs + event logs from Spark UI | Developer replays in local Spark History Server |
| Monitor all workspaces in one place with alerting | Diagnostic Emitter > Azure Log Analytics | KQL queries + Azure Monitor log alert rules |
| Persist execution metrics for trend analysis | Job Insight Library (Scala, Runtime 1.3+) | Lakehouse tables for custom reporting |
| Build a custom monitoring dashboard or integration | Spark Monitoring REST APIs | Programmatic access to sessions, logs, app metadata |


## Runtime selection and native execution engine

### Always use the latest general availability runtime

Fabric Runtime 1.3 (Spark 3.5, Java 11, Python 3.11) is the current general availability (GA) runtime. It includes approximately 100 built-in query performance enhancements, partition caching to reduce metastore calls, and cross join to projection optimizations. Always start new workloads on the latest runtime to benefit from these improvements.

### Native execution engine (NEE)

The NEE is a vectorized engine based on Meta's Velox C++ library and Intel's Apache Gluten incubation project. It runs Spark queries directly on lakehouse infrastructure with no code modifications, achieving up to 4x faster performance on the TPC-DS 1-TB benchmark compared to traditional OSS Spark.

#### When to use NEE

- Workloads using Parquet or Delta format data (NEE's native formats).

- Queries involving complex transformations, aggregations, joins, and sorts.

- Computationally intensive workloads (not simple I/O-bound reads).

#### Limitations of NEE

- Doesn't support user-defined functions (UDFs), the `array_contains` function, or structured streaming. Operations fall back to the JVM engine automatically.

- Doesn't accelerate queries against JSON, XML, or CSV formats.

- Doesn't support ANSI SQL mode.

- The round() function might behave differently due to underlying C++ std::round differences.

- `collect_list()` ordering might differ due to shuffle behavior variations.

#### Enable NEE

Enable at the environment level via Spark Compute > Acceleration > Enable native execution engine. For session-level enablement:

```python
spark.conf.set("spark.native.enabled", "true")
```

#### Verify NEE execution

In the Spark UI, look for node names ending in `Transformer`, `NativeFileScan`, or `VeloxColumnarToRowExec`. The execution graph uses green for NEE operations and light blue for JVM engine operations. You can also use `df.explain()` to inspect the physical plan for these suffixes.

> [!IMPORTANT]
> If you're using runtime 1.2, NEE support isn't available. Upgrade to runtime 1.3 to re-enable native acceleration.

## Resource profiles

Fabric supports predefined Spark resource profiles that apply workload-optimized configurations out of the box, eliminating trial-and-error tuning. All new Fabric workspaces default to the `writeHeavy` profile.

| **Profile** | **Use Case** | **Key Configuration Details** |
|----|----|----|
| `writeHeavy` | High-frequency ingestion, ETL, streaming writes | V-Order disabled, OptimizeWrite partitioned enabled, stats collection disabled |
| `readHeavyForSpark` | Frequent Spark reads, interactive queries | OptimizeWrite enabled, 128 MB bin size, partitioned writes enabled |
| `readHeavyForPBI` | Power BI Direct Lake queries on Delta tables | V-Order enabled, OptimizeWrite enabled, 1 GB bin size |
| custom | Fully user-defined | Define any Spark configs (for example, custom shuffle partitions, Kryo serializer) |

Set at the environment level for workspace-wide defaults, or override at runtime:

```python
spark.conf.set("spark.fabric.resourceProfile", "readHeavyForSpark")
```

> [!NOTE]
> Runtime settings take precedence over environment-level configurations. V-Order is disabled by default on new workspaces to optimize for write-heavy data engineering workloads.

## Partitioning, data skew, and shuffle optimization

### Understand partitions

Partitions are the fundamental units of parallelism in Spark. When you partition 1 GB of data into 100 partitions, Spark processes them concurrently as separate tasks up to the number of available CPU cores. For optimal performance, data must be evenly distributed across partitions, but too many partitions introduce scheduling and shuffle overhead.

### Detect data skew

Data skew occurs when one or more partitions contain significantly more data than others. Symptoms include:

- A few tasks taking longer than others (heavy tail in Spark UI stage tasks).

- Large gap between median and max task times in stage metrics.

- Stages with large shuffle read/write sizes concentrated in a few partitions.

In the Spark Monitoring Jobs UI, check for skew indicators showing mean vs. max metrics. In the Spark UI, inspect task aggregation metrics for significant gaps between median, 75th percentile, and max.

### Handle skew

1.  **Enable AQE:** Adaptive Query Execution uses runtime statistics to coalesce post-shuffle partitions, convert sort merge joins into broadcast joins, and apply skew-join optimization.

1.  **Repartition or Coalesce:** Use repartition to increase or decrease partitions (involves shuffle but produces balanced partitions). Use coalesce only to reduce partitions (avoids shuffle).

1.  **Key Salting:** Apply key salting or custom partitioning to spread hot keys across partitions for join/group-by operations.

1.  **Broadcast Joins:** Use broadcast joins for small lookup tables to eliminate shuffles entirely.

1.  **Persist Intermediate Datasets:** Persist balanced intermediate datasets before expensive stages, then re-run.

### Shuffle optimization

Tune `spark.sql.shuffle.partitions` (default: 200) based on your data volume and transformations. Tune `spark.sql.files.maxPartitionBytes` for read optimization. Both require profiling and benchmarking since optimal values depend on data volume and shape.

## Delta table optimization

### V-Order

V-Order is a write-time optimization that reorganizes Parquet file layout to improve read efficiency. It's disabled by default on new workspaces.

| **Consumer** | **V-Order Impact** | **Recommendation** |
|----|----|----|
| Power BI Direct Lake | 40–60% improvement in cold-cache queries | Enable V-Order for tables used in Direct Lake |
| SQL Analytics Endpoint / Warehouse | ~10% read performance improvement | Enable V-Order if read-heavy |
| Spark | No inherent read benefit; 15–33% slower writes | Skip unless cross-engine consumption needed |

V-Order can be controlled at three levels: session, table property, and write operation level. Session-level settings take highest precedence.

### Z-Order

Z-Order clusters related values together to improve data skipping for selective filters. Combine with V-Order in a single OPTIMIZE command:

```sql
OPTIMIZE myTable WHERE date >= '2025-01-01' ZORDER BY (customer_id) VORDER;
```

### OPTIMIZE and VACUUM

OPTIMIZE performs bin compaction. VACUUM removes dereferenced files. Both are Spark SQL commands for notebooks, Spark job definitions, or Lakehouse Maintenance UI. Not supported in the SQL Analytics Endpoint or Warehouse editor.

> [!TIP]
> Table design based on ingestion frequency and read patterns often has more effect than optimization commands alone.

### Optimize Write and auto compaction

Optimize Write performs pre-write bin packing. Use selectively since the shuffle cost can add overhead. For ingestion pipelines with frequent small writes, prefer Auto Compaction:

```python
spark.conf.set('spark.databricks.delta.autoCompact.enabled', True)
```

## File size tuning

Target 128 MB to 1 GB per file depending on table size, with row groups of 1–2 million rows.

### Adaptive target file size

Uses Delta table heuristics to automatically estimate ideal target file size and re-evaluates at each OPTIMIZE. Can improve compaction performance by 30–60%.

```python
spark.conf.set('spark.ms.delta.adaptiveTargetFileSize.enabled', 'true')
```

> [!NOTE]
> Recommended by Microsoft for most workloads but not enabled by default.

## Memory management and OOM prevention

### Executor memory architecture

Spark divides executor memory into Reserved (JVM internals), User (UDFs, local variables), Storage (cached data, broadcast variables), and Execution (shuffles, joins, sorts). The Storage-Execution boundary is dynamic. When demand exceeds available memory, spill to disk occurs.

### Common OOM patterns

**Driver OOM:** Caused by `collect()`, `countByKey()`, or large `toPandas()` calls. Mitigation: avoid driver-heavy operations; if unavoidable, increase driver size and benchmark.

**Executor OOM:** Caused by wide joins, heavy aggregations, or oversized cached datasets. Mitigation: increase executor memory, tune `spark.memory.fraction` and `spark.memory.storageFraction`, persist selectively.

**Task CPU tuning:** `spark.task.cpus` (default: 1) controls cores per task. Reduce to 0.5 for CPU-bound tasks needing more parallelism; increase to 2 for memory-intensive tasks. Always benchmark.

## UDF best practices

Use Spark DataFrame APIs whenever possible for Catalyst optimizer benefits. When custom logic is unavoidable:

- **Pandas UDFs (Vectorized):** Apache Arrow for efficient JVM-to-Python transfer. Faster than row-by-row.

- **Scala/Java UDFs:** Run directly on JVM, avoiding Python serialization.

- **Avoid regular PySpark Python UDFs:** Each executor launches a separate Python process with serialization overhead.

> [!IMPORTANT]
> NEE doesn't support UDFs. Spark falls back to the JVM engine automatically for UDF operations.

## Capacity planning and cost optimization

### Pool selection

- **Starter Pools:** Pre-provisioned for fast startup. Ideal for development. Start with Medium (8 vCores, 64 GB).

- **Custom Pools:** Required for Managed Private Endpoint or Private Link.

### Right-sizing guidance

| **Workload Pattern** | **Guidance** |
|----|----|
| Transform-heavy (shuffles & joins) | Larger nodes (16–64 cores) |
| Bursty or unpredictable | Autoscale + Dynamic Allocation; cluster grows/shrinks as needed |
| Many small parallel jobs | Small/medium nodes; min nodes to avoid cold-start; `notebookutils.notebook.runMultiple()` |
| Small serial / development | Small/medium in single-node mode (driver + executor share 1 VM) |
| Large jobs, known partitioning | Pre-size manually based on data volume and shuffle stages |

### High concurrency mode and session lifecycle

Enable High Concurrency mode when running multiple notebooks with the same Lakehouse, environment, and Spark configs to share a single session and eliminate startup overhead. Active sessions accrue CU utilization — default timeout is 20 minutes. Stop sessions when not in use.

### Billing model

- **Reservations:** Best cost for stable workloads at >75% utilization (~40% discount over pay-as-you-go).

- **Autoscale Billing:** Same flexibility as pay-as-you-go but removes throttling risk.

- **Hybrid:** Reservations for stable baseline + Autoscale for variable/burst workloads.

## Session configuration best practices

### The %%configure magic command

- Always place %%configure in the first cell of a notebook.

- Configure via code for reproducibility; GUI-based settings might not reflect programmatic changes.

- %%configure applies at session level, taking precedence over GUI settings.

### Configuration hierarchy

Session-level (`%%configure` or `spark.conf.set`) overrides environment-level, which overrides workspace defaults. Standardize at the environment level; use session overrides sparingly for debugging.

### Quick reference: key Spark configurations

| **Configuration** | **Default** | **Purpose** |
|----|----|----|
| `spark.native.enabled` | false | Enable Native Execution Engine (Velox) |
| `spark.fabric.resourceProfile` | `writeHeavy` | Select predefined resource profile |
| `spark.sql.parquet.vorder.default` | false (new WS) | V-Order at session level |
| `spark.sql.shuffle.partitions` | 200 | Shuffle output partitions |
| `spark.sql.files.maxPartitionBytes` | 128 MB | Max bytes per read partition |
| `spark.task.cpus` | 1 | CPU cores per Spark task |
| `spark.memory.fraction` | 0.6 | Heap fraction for execution + storage |
| `spark.memory.storageFraction` | 0.5 | Fraction of memory.fraction for storage |
| `spark.databricks.delta.optimizeWrite.enabled` | varies | Pre-write bin packing |
| `spark.databricks.delta.autoCompact.enabled` | false | Auto compaction after writes |
| `spark.ms.delta.adaptiveTargetFileSize.enabled` | false | Adaptive file size for OPTIMIZE |

## Related content
- [Fabric Spark Best Practices Overview](./spark-best-practices-overview.md)
- [Apache Spark Monitoring Overview & Application Detail Monitoring](./spark-monitoring-overview.md)