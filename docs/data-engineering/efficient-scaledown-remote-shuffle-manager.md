---
title: Efficient scaledown and remote shuffle manager
description: Learn how efficient scaledown with the remote shuffle manager decouples shuffle data from executor lifetime for faster cluster scaledown, lower compute cost, and more resilient Spark jobs in Microsoft Fabric.
ms.topic: conceptual
ms.custom: sfi-image-nochange
ms.date: 05/23/2026
ai-usage: ai-assisted
---

# Efficient scaledown and remote shuffle manager

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Efficient scaledown is a feature in Microsoft Fabric Spark that decouples Spark shuffle data from executor lifetime. Instead of pinning shuffle output to local executor disks, Fabric Spark routes shuffle data to Azure Blob Storage (or migrates it there on demand) and lets Adaptive Query Execution (AQE) shape the write itself. The result is faster cluster scaledown, lower compute cost, and more resilient jobs — with no changes to your queries, notebooks, or pipelines.

## Overview

Efficient scaledown is built from four cooperating capabilities:

| Capability | What it does |
|---|---|
| **Remote Shuffle Manager (RSM)** | Writes and reads shuffle data to Azure Blob Storage instead of executor local disks. |
| **Shuffle Migration** | Moves shuffle blocks off an executor before it's decommissioned, instead of dropping them. |
| **Decision Layer** | Per-stage runtime routing that keeps small shuffles local and offloads large shuffles to remote storage. |
| **AQE Shuffle Write** | Lets Adaptive Query Execution participate in the shuffle write phase so partitioning is right the first time. |

## Prerequisites

- Native Execution Engine (NEE) must be enabled.
- Autoscale enabled (recommended). Efficient scaledown also works without autoscale via the Spark configurations below.
- [Runtime 1.3 (Apache Spark 3.5)](./runtime-1-3.md) or later.

## How it works

When Spark processes a query, it often redistributes data between stages — a *shuffle*. Normally, shuffle data is stored on each executor's local disk, which ties executors to that data. They can't be released until every consumer has finished reading. That coupling is the single biggest reason clusters can't scale down quickly and why losing an executor causes expensive stage retries.

Efficient scaledown breaks this coupling:

- **Large shuffles** go directly to Azure Blob Storage via the Remote Shuffle Manager.
- **Small shuffles** stay on local disk for speed. If their executor later needs to be released, Shuffle Migration moves the blocks to peers or to fallback storage in the background.
- The **Decision Layer** picks the right path per stage at runtime.
- **AQE Shuffle Write** ensures the writer produces partitioning that downstream AQE consumes without re-coalescing, avoiding wasted I/O.

```
                ┌───────────────────────────┐
   Query  ───►  │   AQE + Decision Layer    │   per-stage choice
                └─────────────┬─────────────┘
                              │
                ┌─────────────▼─────────────┐
                │   AQE Shuffle Write       │   partition-aware writer
                └─────┬─────────────────┬───┘
                      │                 │
              local   ▼                 ▼   remote
        ┌────────────────────┐   ┌──────────────────┐
        │  Local disk +      │   │  RSM → Azure     │
        │  Shuffle Migration │   │  Blob Storage    │
        └─────────┬──────────┘   └─────────┬────────┘
                  │ on decommission        │
                  ▼                        ▼
        fallback storage   Remote shuffle store
```

### Smart routing (Decision Layer)

The Decision Layer evaluates each shuffle exchange and decides:

- **Large shuffles → Azure Blob Storage.** Maximum scaledown and fault-tolerance benefit.
- **Small shuffles → local disk.** No cloud I/O overhead for tiny transfers. If the executor later decommissions, Shuffle Migration takes over.

Routing is automatic and requires no user input. The recommended granularity is per-stage.

## Key benefits

### Lower costs — pay only for the compute you use

With efficient scaledown, executors are released as soon as their work is done. They no longer sit idle holding shuffle data that downstream tasks might eventually read.

- **Faster scaledown.** Autoscale removes nodes immediately after task completion.
- **Less idle compute.** No "zombie" executors kept alive only to serve their local shuffle.
- **No disk over-provisioning.** Large shuffles go to blob storage instead of demanding large local disks.
- **Bounded storage cost.** Fallback storage is cleaned up automatically when blocks are no longer needed.

### More resilient jobs

When shuffle data lives only on local disk, an executor crash means that data is gone and Spark must recompute it. With efficient scaledown, data is either already in blob storage or migrated there before the executor goes away.

| Scenario | Without efficient scaledown | With efficient scaledown |
|---|---|---|
| Executor crashes | Shuffle data lost; stages re-executed | Data is safe in storage; no recomputation |
| Node preemption | Data gone, expensive retries | Data survives; job continues normally |
| Graceful decommission | Shuffle dropped on shutdown | Blocks migrated to peer or fallback storage |
| Network blips during fetch | Cascading `FetchFailedException` | Reads come from storage, unaffected |

This eliminates the most common cause of `FetchFailedException` in production.

### Faster, truly elastic scaling

Without efficient scaledown, the autoscaler can't reclaim a node while any executor on it still holds shuffle data or cached data. Efficient scaledown decouples both:

- Shuffle data is in blob storage (or migrates there on shutdown).
- Cache no longer pins executors. Reproducible caches such as Delta snapshot cache are excluded from scaledown protection.

The autoscaler can freely remove idle nodes and resize the cluster in response to workload changes.

### Better performance on skewed and large shuffles

AQE Shuffle Write lets Adaptive Query Execution shape the shuffle write itself — choosing partitioning that downstream AQE consumes without re-coalescing, and producing fewer, better-sized blocks for remote storage. Combined with the Decision Layer, you get faster wall-clock time on large/skewed queries and unchanged latency for small ones.

## Get started

### Recommended configuration

Apply this configuration to enable the full efficient scaledown stack:

```python
# Remote Shuffle Manager
spark.conf.set("spark.remote.shuffle.enabled", "true")

# Decision Layer — per-stage routing of local vs. remote shuffle
spark.conf.set("spark.sql.rsm.decisionlayer.enabled.level", "stage")

# AQE participates in shuffle write
spark.conf.set("spark.sql.adaptive.shuffleWrite.enabled", "true")

# Shuffle Migration on executor decommission
spark.conf.set("spark.storage.decommission.shuffleBlocks.enabled", "true")
spark.conf.set("spark.storage.decommission.shuffleBlocks.cleanup", "true")
spark.conf.set("spark.storage.decommission.shuffleBlocks.migrateToFallbackStorage", "true")
spark.conf.set("spark.storage.decommission.fallbackStorage.cleanUp", "true")
```

No code changes are required. You can also set these in your environment Spark properties.

## Configuration reference

### Remote Shuffle Manager (RSM)

| Setting | Recommended | What it controls |
|---|---|---|
| `spark.remote.shuffle.enabled` | `true` | Turns efficient scaledown on. Shuffle data goes to Azure Blob Storage instead of executor local disks. |

### Decision Layer

| Setting | Recommended | What it controls |
|---|---|---|
| `spark.sql.rsm.decisionlayer.enabled.level` | `stage` | Granularity at which the Decision Layer routes shuffle. `stage` evaluates each Spark stage independently. |

### AQE Shuffle Write

| Setting | Recommended | What it controls |
|---|---|---|
| `spark.sql.adaptive.shuffleWrite.enabled` | `true` | Lets AQE participate in the shuffle write phase. Produces partitioning that downstream AQE consumes without re-coalescing. |

> [!NOTE]
> AQE itself (`spark.sql.adaptive.enabled`) must be on. It's on by default in Fabric Spark.

### Shuffle Migration on decommission

| Setting | Recommended | What it controls |
|---|---|---|
| `spark.storage.decommission.shuffleBlocks.enabled` | `true` | Migrates shuffle blocks off an executor that is decommissioning, instead of dropping them. |
| `spark.storage.decommission.shuffleBlocks.cleanup` | `true` | Cleans up shuffle blocks on the source executor after a successful migration. |
| `spark.storage.decommission.shuffleBlocks.migrateToFallbackStorage` | `true` | If no peer executor can accept the blocks, migrates them to fallback storage (Azure Blob Storage). |
| `spark.storage.decommission.fallbackStorage.cleanUp` | `true` | Removes shuffle blocks from fallback storage once they're no longer needed, bounding storage cost. |

### Cache-aware dynamic allocation

| Setting | Recommended | What it controls |
|---|---|---|
| `spark.dynamicAllocation.preventShutdownExecutorWithCache` | `false` | Allows dynamic allocation to release executors even when they hold cached blocks. |
| `spark.dynamicAllocation.excludeDeltaSnapshotCache` | `true` | Ignores Delta snapshot cache when deciding whether an executor still holds useful cache. Delta snapshot cache is reproducible and shouldn't block scaledown. |

### Advanced tuning (RSM)

Most users don't need to change these defaults.

#### Write performance

| Setting | Default | What it controls |
|---|---|---|
| `spark.remote.shuffle.partition.buffersize` | `16777216` (16 MB) | Buffer per partition before writing to storage. |
| `spark.remote.shuffle.blocksize` | `8388608` (8 MB) | Size of individual blocks uploaded to Blob Storage. |
| `spark.remote.shuffle.write.maxthreads` | `cores × 16` | Maximum threads used for writing shuffle data. |
| `spark.remote.shuffle.write.maxtasks` | `16384` | Maximum concurrent write operations. |

#### Read performance

| Setting | Default | What it controls |
|---|---|---|
| `spark.remote.shuffle.read.parallel.enabled` | `true` | Parallel download streams for shuffle reads. |
| `spark.remote.shuffle.read.parallelism` | `4` | Parallel download streams per task. |
| `spark.remote.shuffle.read.prefetchqueuesize` | `250` | Prefetch queue depth during reads. |
| `spark.remote.shuffle.read.maxthreads` | `cores × 4` | Maximum threads used for reading. |

#### Reliability

| Setting | Default | What it controls |
|---|---|---|
| `spark.remote.shuffle.retries` | `5` | Retry attempts on transient storage errors. |
| `spark.remote.shuffle.retrydelayms` | `800` | Initial backoff between retries. |
| `spark.remote.shuffle.retrymaxdelayms` | `60000` | Backoff cap. |

#### Compression

| Setting | Default | What it controls |
|---|---|---|
| `spark.remote.shuffle.compression` | Uses `spark.io.compression.codec` | Compression format for remote shuffle data (for example, `lz4`, `zstd`). |

## Performance results

### Compute cost savings (TPC-DS benchmark)

| Metric | Without efficient scaledown | With efficient scaledown |
|---|---|---|
| **Total Compute (VM-Minutes)** | 14,952 | 6,880 |
| **Cost Reduction** | — | **54%** |

The total job runtime might be longer (autoscale uses fewer concurrent executors), but billed compute is cut by more than half.

### Decision Layer performance (TPC-DS, RSM on)

Routing small shuffles to local disk and only large shuffles to remote storage delivers up to **57% runtime improvement** versus routing every shuffle remotely, with the same scaledown benefit.

## Limitations

- **NEE required.** Efficient scaledown depends on the Native Execution Engine.
- **Azure Blob Storage only.** Standard `BlockBlobStorage` with HNS disabled. Azure Data Lake Gen2 / HNS-enabled accounts aren't supported as the remote shuffle store.
- **Not supported with Azure Private Link.** Environments using private link networking aren't currently compatible.
- **Decision Layer granularity** is currently per-stage. Per-task or per-partition routing isn't in scope.
- **Cache behavior change.** With `preventShutdownExecutorWithCache=false`, executors holding `cache()`/`persist()` data might be scaled down. Workloads that depend heavily on executor-local cache for hot data should validate.

## Related content

- [Native execution engine for Fabric Data Engineering](native-execution-engine-overview.md)
- [Configure resource profiles in Microsoft Fabric](configure-resource-profiles.md)
- [Autoscale Spark billing overview](autoscale-billing-for-spark-overview.md)
- [Apache Spark Runtimes in Fabric](./runtime.md)
