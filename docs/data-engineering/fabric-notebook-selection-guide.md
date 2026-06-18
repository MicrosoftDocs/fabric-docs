---
title: Choosing a notebook kernel in Microsoft Fabric
description: Compare the Python, Spark, and T-SQL notebook kernels in Microsoft Fabric based on compute cost, performance, and Delta Lake support.
ms.reviewer: jejiang
ms.topic: concept-article
ms.date: 06/17/2025
ai-usage: ai-assisted
---

# Choosing a notebook kernel in Microsoft Fabric

Notebooks in Microsoft Fabric support three kernel types: **Python**, **Spark**, and **T-SQL**. The Spark kernel supports four languages—PySpark, SparkSQL, Scala, and SparkR—all backed by the same Spark compute. This guide focuses on the decision between the Python kernel and the Spark kernel, as these kernels are the most common choices for data engineering workloads. Both run in the same notebook experience but differ in compute model, scalability, engine capabilities, and Delta Lake compatibility. This guide provides a balanced evaluation to help you choose the right kernel—and avoid common misconceptions about cost and performance.

> [!IMPORTANT]
> The choice of notebook kernel isn't simply about cost or data size. Compute configuration, Delta Lake feature requirements, engine maturity, and expected data growth all play important roles in making the right decision.

## Understand your compute options

A common misconception is that the Python kernel is always cheaper than the Spark kernel for small data workloads. In reality, cost depends on how you configure compute for each kernel.

### Python kernel compute

The Python kernel runs on a single-node machine that defaults to **2 vCores** (1 CU) and can be configured to start at up to **64 vCores** (32 CU). This environment has no distributed execution. The starter pool initializes in approximately 5 seconds, making it fast for interactive work.

### Spark kernel compute

The Spark kernel uses Spark pools with several configuration options:

| Cluster configuration | vCores available to executors | Session start time | CUs consumed after session start | 
|---|---|---|---|
| Starter pool (default) | 8-core worker nodes, autoscale enabled; starts as a single node and proactively scales to one dedicated worker within minutes of the session starting | ~5 seconds | 8 CUs (minimum, post proactive scale up) |
| Single-node*, 8-vCore (via Starter pool) | 8-core executor and driver share the same node | ~5 seconds (with prewarmed pool) | 4 CUs |
| Single-node*, 4-vCore custom pool | 4-core executor and driver share the same node | Requires a custom pool; session start is typically between 3-5 minutes | 2 CUs |
| Multi-node custom pool | Scales with cluster size | Session start is typically between 3-5 minutes | Varies |

When using the starter pool, a single-node 8-vCore Spark session starts in approximately 5 seconds—comparable to the Python kernel. A single-node Spark cluster keeps costs similar to the Python kernel while providing access to all Spark-native capabilities, including the Native Execution Engine (NEE).

> [!NOTE]
> There's two ways to configure single-node Spark pools. For most workloads, it's typically recommended to use the first method, _Overprovisioned single-node_. The second method, _Classic single-node_ is better when there's driver heavy processes but constrains the amount of resources usable by Spark executors.
> 
> - **Overprovisioned single-node**: start with a Spark Pool (that is, Starter Pool) configured with _autoscale_ and _dynamic allocation_ enabled with _autoscale_ set to 1 to > 1 nodes. Create an Environment item referencing the Spark Pool and set the number of executors to 1. Notebooks using this Environment provision with a single-node Spark cluster where both the driver and executor share all resources.
> - **Classic single-node**: create a Spark Pool with the maximum number of nodes set to 1. This configuration works with _autoscale_ and _dynamic allocation_ enabled or disabled, as the selection has no effect on the provisioning strategy. Notebooks using this Spark Pool have 50% of v-cores allocated to the driver and 50% allocated as executors.

## Performance by workload scale

Benchmarks comparing Fabric Spark with the Native Execution Engine against single-machine Python engines (like Pandas, DuckDB, or Polars) across end-to-end ELT workloads show clear patterns based on data scale:

| Data scale (compressed) | Engine advantage |
|---|---|
| Ultra-small (< ~140 MB) | Single-machine Python engines (DuckDB, Polars) are faster. |
| Small (~1–2 GB) | Python engines still have an advantage, but Fabric Spark with NEE becomes competitive as the number of cores available for each engine is increased, particularly for write-heavy operations. |
| Small-medium (~10–13 GB) | Fabric Spark with the Native Execution Engine is competitive with or faster than most single-machine engines. Single-machine Python engines can run into out-of-memory (OOM) errors at lower vCore counts. |
| Medium and above (~100 GB+) | For most workloads, Fabric Spark with the Native Execution Engine is the fastest and most reliable engine. |


### Scaling beyond small data

Consider the rate of data growth when selecting an engine. Non-distributed Python engines work well for truly small data, but migrating your code when data exceeds their limits is costly. Starting with Spark on a single-node configuration lets you scale out seamlessly to a multi-node configuration without rewriting your data engineering pipelines.

## Delta Lake compatibility

Delta Lake compatibility is a critical consideration when selecting an engine. Fabric Spark has native, full-featured Delta Lake support, while Python engines may have meaningful gaps:

> [!IMPORTANT]
> The following feature support table reflects the state of each engine as of June 2026 and is based on direct testing against Fabric Spark Runtime 1.3 and 2.0. The open-source software (OSS) Python ecosystem for Delta Lake is moving fast—delta-rs, DuckDB, and Polars all ship frequent releases that periodically add expanded support for Delta protocol. Always verify against the current documentation and release notes for each engine before relying on a specific feature in production:
> - **delta-rs**: [https://delta-io.github.io/delta-rs/](https://delta-io.github.io/delta-rs/)
> - **DuckDB Delta extension**: [https://duckdb.org/docs/extensions/delta](https://duckdb.org/docs/extensions/delta)
> - **Polars**: [https://docs.pola.rs/](https://docs.pola.rs/)
> - **Delta Lake protocol**: [https://github.com/delta-io/delta/blob/master/PROTOCOL.md](https://github.com/delta-io/delta/blob/master/PROTOCOL.md)


| Delta Lake feature | Fabric Spark | delta-rs (Python) | DuckDB | Polars |
|---|---|---|---|---|
| **Read Delta tables** | ✅ | ✅ | ✅ | ✅ |
| **Write Delta tables** | ✅ | ✅ Append, overwrite (incl. predicate-based), UPDATE, DELETE, MERGE | ⚠️ INSERT only (requires `ATTACH ... (TYPE delta, READ_WRITE)`); no UPDATE/DELETE/MERGE; use delta-rs for other write operations | ⚠️ Append, overwrite (incl. predicate-based), merge only; no UPDATE/DELETE |
| **ACID guarantees / Optimistic Concurrency Control** | ✅ | ✅ | ⚠️ INSERT is append-only; no native conflict detection; use delta-rs with version pinning for read-then-write isolation | ⚠️ OCC on writes; Polars reads are outside the transaction boundary—requires explicit version pinning for read-then-write isolation |
| **Schema evolution on write** | ✅ | ✅ | ❌ No schema evolution on INSERT | ✅ |
| **Column mapping** | ✅ | ❌ | ✅ | ❌ |
| **Deletion vectors (read)** | ✅ | ❌ | ✅ | ✅ |
| **Deletion vectors (write)** | ✅ | ❌ | ❌ | ❌ |
| **Type widening (read)** | ✅ | ❌ | ✅ | ❌ |
| **Type widening (write)** | ✅ | ❌ | ❌ | ❌ |
| **File skipping** | ✅ | ✅ | ✅ | ✅ |
| **Partitioned writes** | ✅ | ✅ | ❌ Use delta-rs to write with partitioning | ✅ |
| **Liquid Clustering (write)** | ✅ | ❌ | ❌ | ❌ |
| **Time travel** | ✅ | ✅ | ✅ | ✅ |
| **RESTORE** | ✅ | ✅ | ❌ Use delta-rs to restore tables | ❌ Use delta-rs to restore tables |
| **Shallow clone (create)** | ✅ | ❌ | ❌ | ❌ |
| **Shallow clone (read)** | ✅ | ❌ | ❌ | ❌ |
| **Row tracking** | ✅ | ⚠️ Reads and writes succeed but row tracking `_metadata` isn't accessible; pipelines relying on row_id for deduplication or change data capture (CDC) must use Spark to read | ⚠️ Reads and writes succeed but row tracking `_metadata` isn't accessible; pipelines relying on row_id for deduplication or CDC must use Spark to read | ⚠️ Reads and writes succeed but row tracking `_metadata` isn't accessible; pipelines relying on row_id for deduplication or CDC must use Spark to read |
| **Identity columns (read)** | ✅ | ✅ | ✅ | ✅ |
| **Identity columns (write)** | ✅ | ❌ | ❌ | ❌ |
| **Generated columns (read)** | ✅ | ✅ | ✅ | ✅ |
| **Generated columns (write)** | ✅ | ❌ | ❌ | ❌ |
| **Change Data Feed (read)** | ✅ | ✅ | ❌ Use delta-rs to read change data feed | ❌ Use delta-rs to read change data feed |
| **Change Data Feed (write)** | ✅ | ❌ | ❌ | ❌ |
| **V2 checkpoints (read)** | ✅ | ❌ | ✅ | ❌ |
| **V2 checkpoints (write)** | ✅ | ❌ | ❌ | ❌ |
| **Checkpoint interval** | ✅ Configurable (default 10) | ⚠️ Configurable (default 100) | ❌ INSERT doesn't write checkpoints; log grows unbounded without external maintenance via delta-rs | ⚠️ Configurable (default 100) |
| **OPTIMIZE** | ✅ | ✅ | ❌ Use delta-rs to optimize | ❌ Use delta-rs to optimize |
| **Auto compaction** | ✅ | ❌ | ❌ | ❌ |
| **VACUUM** | ✅ | ❌ Risk: accumulating orphaned files | ❌ Risk: accumulating orphaned files | ❌ Risk: accumulating orphaned files |
| **VACUUM LITE** | ✅ | ✅ | ❌ Use delta-rs to vacuum lite | ❌ Use delta-rs to vacuum lite |


Key implications:

- **Newer Delta features**: Support for newer Delta Lake features—including type widening, v2 checkpoints, liquid clustering, identity columns, Change Data Feed writes, and shallow clone reads—is inconsistent or absent across OSS Python engines. If your data pipeline depends on any of these features, use Fabric Spark. Treat Python engines as a complement to Spark for specific workloads (lightweight reads, local development, simple appends) rather than a general-purpose replacement.

- **Deletion vectors**: Deletion vectors are a best practice for Delta tables (enabled by default starting in Fabric Spark Runtime 2.0) as they greatly improve the performance of MERGE, UPDATE, and DELETE operations via a _merge-on-read_ strategy. No Python engine (delta-rs, DuckDB, or Polars) supports writing deletion vectors. If you use any Python engine to write to tables that have deletion vectors enabled, you encounter compatibility errors.

- **ACID guarantees**: Not all Python engines provide native ACID guarantees. Delta-rs supports optimistic concurrency control (OCC) for merge, update, and delete operations. However, cross-engine pipelines where DuckDB or Polars performs the read and delta-rs performs the write require explicit version pinning on both sides to maintain read-write isolation. DuckDB INSERT is an append-only operation with no conflict detection.

- **Checkpointing**: Not all Python engines write checkpoints, and those engines that do default to every 100 commits rather than Spark's default of every 10 commits. DuckDB INSERT never writes checkpoints, causing the Delta transaction log to grow unbounded. Consider setting a lower checkpoint interval in delta-rs and Polars, and run periodic delta-rs maintenance for tables written by DuckDB.

- **Row tracking**: All Python engines can read from and write to tables with row tracking enabled, but the `_metadata` column containing `row_id` and `row_commit_version` isn't accessible outside Spark. Pipelines that rely on `row_id` for deduplication or CDC must use Spark to read.

- **OPTIMIZE and VACUUM**: Python engines rely on the `deltalake` library for compaction and vacuum. While delta-rs can be fast for these operations, this approach introduces extra dependency management and the operations aren't natively orchestrated the way they are in Spark. Tables written exclusively via Python engines accumulate small files and unbounded transaction logs without explicit maintenance.

- **Shallow clones**: Python engines don't support reading tables created via shallow clone due to absolute path resolution limitations. No Python engine supports creating shallow clones.

## Engine maturity and Microsoft support

### Fabric Spark support

Fabric Spark is Microsoft's own fork of open-source Apache Spark. Microsoft maintains and ships the runtime, meaning:

- Microsoft supports Spark and Delta Lake internals end-to-end, including the Native Execution Engine (NEE), which is built on Velox and Apache Gluten.
- You can open support tickets for Spark behavior, query plans, memory issues, and engine bugs.
- Performance improvements are continuously shipped as part of Fabric runtime updates—your existing code gets faster without code changes.

### Python engine support

Microsoft doesn't maintain a fork of OSS Python engines like DuckDB or Polars. Support is limited to issues in the OneLake integrations shipped as part of the Fabric runtime, such as authentication or file system access. If you encounter a performance regression, an engine bug, or a broken API between library versions, you need to engage directly with the open-source communities for those libraries.

### Operational maturity

Real-world experience building end-to-end ELT benchmarks with these engines highlights meaningful differences in operational maturity:

- **Spark**: Code written for one runtime version runs without modification on newer versions and performs faster due to continuous Microsoft engineering investment. The Spark UI and Fabric telemetry provide live monitoring with full visibility into active queries, execution plans, and historical job runs.
- **DuckDB and Polars**: API and behavior changes between versions can require code refactoring as engines mature and APIs evolve. Both engines lack live monitoring—when a job runs longer than expected, there's no equivalent to the Spark UI to understand what's happening. Authentication to OneLake can require version-specific workarounds.
- **Composable data stack overhead**: Using DuckDB or Polars for a full ELT workflow typically means stitching together multiple libraries (for example, DuckDB for data scan and transformation, `delta-rs` for writes and maintenance). Library compatibility needs to be maintained between the components and should be considered anytime the version of the library is upgraded beyond what ships in the runtime.

## Decision guidance

### Use the Python kernel when

- Your data is small—under approximately 1 GB compressed—and raw performance on single-machine engines matters most.
- You're building lightweight API orchestration, REST/gRPC integrations, or control-flow automation where distributed compute adds unnecessary overhead.
- You're doing rapid interactive exploration of small datasets where ad-hoc query latency is the priority.
- Your workload requires an older Python version than what ships in the current Fabric Spark runtime.
- You understand and accept the Delta Lake feature limitations of the Python engine you're using.

### Use the Spark kernel when

- Your data is 1 GB or larger in compressed form, or you expect data to grow to that scale.
- You need full Delta Lake compatibility, including deletion vectors, column mapping, type widening, OPTIMIZE, VACUUM, and ACID guarantees.
- You require production-grade features such as environment variables, item-based library management, high-concurrency, and FAIR or first-in, first-out (FIFO) job scheduling.
- You need live monitoring and full operational visibility into running jobs.
- You rely on Spark-native APIs such as MLlib, Spark SQL, or Spark Streaming.
- You want Microsoft end-to-end support for your data processing engine.
- You want the ability to scale from single-node to multi-node compute without rewriting code.
- You need to author notebooks in PySpark, SparkSQL, Scala, or SparkR.

> [!TIP]
> For workloads at or above the 1 GB compressed scale, consider starting with a single-node 8-vCore Spark cluster using the starter pool. You get near-instant session start times, full Fabric Spark capabilities including NEE, and the ability to scale to multi-node when needed—all while operating on just a single node like the Python kernel.

## Key differences at a glance

| Category | Python kernel | Spark kernel |
|---|---|---|
| Default compute | 2-vCore single-node virtual machine (VM) (scalable up to 64 vCores) | Starter pool: 8-vCore worker nodes with autoscale |
| Minimum single-node config | 2 vCores | 8 vCores (starter pool, ~5 sec start); 4 vCores (custom pool, longer start) |
| Startup time | ~5 seconds | ~5 seconds (starter pool); longer for custom pools |
| Distributed execution | No | Yes |
| Supported languages | Python | PySpark, SparkSQL, Scala, SparkR |
| Python version | Multiple versions available | Tied to Fabric Spark runtime version |
| Delta Lake (full feature support) | No | Yes |
| Live monitoring | Limited | Full (Job monitoring page + Spark UI) |
| Microsoft engine support | OneLake integrations only | Full runtime support |
| Python library access | pip install | pip install + environment items |
| Spark-native APIs (MLlib, Streaming) | No | Yes |
| Production features (env vars, environments) | Limited | Full |
| High-concurrency support | No | Yes |
| V-Order for fast Direct Lake Semantic Models | No | Yes |
| Object store cache enabling accelerate repeat reads | Engine dependent (DuckDB has built-in caching but is not default, Polars doesn't support built-in caching) | Yes ([Intelligent cache](intelligent-cache.md)) |
| Scales to multi-node | No | Yes |

## Glossary

- **ACID transactions**: A set of properties (Atomicity, Consistency, Isolation, Durability) that guarantee database operations are processed reliably. Delta Lake implements ACID semantics using optimistic concurrency control and transaction logs.
- **Optimistic Concurrency Control (OCC)**: A concurrency strategy where transactions proceed without locking, then verify at commit time that no conflicting changes occurred. Delta Lake uses OCC; cross-engine pipelines (for example, Polars reads followed by delta-rs writes) require explicit version pinning to maintain isolation.
- **Auto compaction**: A Delta Lake feature in the Fabric Spark runtime that automatically merges small files into larger ones after write operations, reducing file fragmentation without a separate OPTIMIZE step.
- **Change Data Feed (CDF)**: A Delta Lake feature that records row-level changes (insert, update, delete) in a table, enabling incremental data processing and CDC pipelines. Only Fabric Spark supports writing Change Data Feed (CDF) metadata; OSS Python engines can read but not produce it.
- **Column mapping**: A Delta Lake feature that allows columns to be renamed or dropped without rewriting the underlying Parquet files. Supported by Fabric Spark; not supported by delta-rs or Polars.
- **delta-rs**: An open-source Rust implementation of the Delta Lake protocol with Python bindings (the `deltalake` PyPI package). Provides Delta read/write support in OSS Python environments but has narrower feature coverage than `delta-spark` which back the Fabric Spark runtime.
- **Deletion vectors**: A Delta Lake optimization that uses merge-on-read to reduce the amount of data rewritten during MERGE, UPDATE, and DELETE operations. Enabled by default in Fabric Spark Runtime 2.0; not supported for writes by any OSS Python engine.
- **FAIR scheduling**: A Spark scheduling policy that allocates cluster resources fairly across concurrent jobs, ensuring no single job monopolizes the cluster.
- **FIFO scheduling**: A Spark scheduling policy that executes jobs in First-In-First-Out order, giving priority to the first submitted job.
- **Liquid Clustering**: A Delta Lake feature that incrementally reorganizes data for optimal query performance without requiring explicit partitioning. Only supported by Fabric Spark.
- **NEE (Native Execution Engine)**: A vectorized C++ query engine built on Velox and Apache Gluten that accelerates Fabric Spark workloads. NEE is available at no extra compute cost and requires no code changes.
- **Row tracking**: A Delta Lake feature that assigns a stable `row_id` and `row_commit_version` to each row via a `_metadata` column. All engines can read from and write to tables with row tracking enabled, but only Fabric Spark can access the `_metadata` column contents.
- **Spark pool**: A shared compute resource for running distributed Spark workloads. The starter pool provides prewarmed nodes for near-instant session start times (~5 seconds) with autoscaling enabled by default.
- **V-Order**: A Fabric write optimization that sorts and compresses Parquet data in a way that improves read performance for Power BI Direct Lake semantic models and other Fabric read paths.
- **Intelligent cache**: An intelligent disk cache in Fabric Spark that speeds up repeated reads of the same Delta table files by caching file data locally on the executor nodes.

## Related content

- [How to use Microsoft Fabric notebooks](how-to-use-notebook.md)
- [Use Python experience on Notebook](using-python-experience-on-notebook.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](author-execute-notebook.md)
- [Introduction of Fabric NotebookUtils](notebook-utilities.md)
- [Native execution engine for Fabric Data Engineering](native-execution-engine-overview.md)
- [Configure and manage starter pools in Fabric Spark](configure-starter-pools.md)
- [Apache Spark compute for Data Engineering and Data Science](spark-compute.md)
- [Delta table maintenance in Microsoft Fabric](delta-lake-table-maintenance.md)
- [Deletion vectors for Delta tables](delta-lake-deletion-vectors.md)
- [Concurrency control for Delta tables](delta-lake-concurrency-control.md)
