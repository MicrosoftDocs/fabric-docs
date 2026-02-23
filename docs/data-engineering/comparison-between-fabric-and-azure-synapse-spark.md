---
title: "Compare Fabric and Azure Synapse Spark: Key Differences"
description: Compare Azure Synapse Spark and Fabric Spark across pools, configurations, libraries, notebooks, and Spark job definitions. Find out which platform fits your analytics needs.
ms.reviewer: jejiang
ms.topic: overview
ms.custom:
  - fabric-cat
ms.date: 02/13/2026
---

# Compare Fabric Data Engineering and Azure Synapse Spark

This article compares Azure Synapse Spark and Fabric Spark across Spark pools, configurations, libraries, notebooks, and Spark job definitions (SJD).

|Category | Azure Synapse Spark | Fabric Spark |
| --- | --- | --- |
| Spark pools | Spark pool <br>- <br>-| [Starter pool (pre-warmed)](configure-starter-pools.md) / [Custom pool](create-custom-spark-pools.md) <br>[V-Order](delta-optimization-and-v-order.md) <br>[High concurrency](configure-high-concurrency-session-notebooks.md) |
| Spark configurations | Pool level <br>Notebook or Spark job definition level| [Environment level](create-and-use-environment.md) <br>[Notebook](how-to-use-notebook.md) or [Spark job definition](spark-job-definition.md) level|
| Spark libraries | Workspace level packages <br>Pool level packages <br>Inline packages | - <br>[Environment libraries](environment-manage-library.md) <br>[Inline libraries](library-management.md)|
| Resources | Notebook (Python, Scala, Spark SQL, R, .NET) <br>Spark job definition (Python, Scala, .NET) <br>Synapse pipelines <br>Pipeline activities (notebook, Spark job definition)| [Notebook](how-to-use-notebook.md) (Python, Scala, Spark SQL, R) <br>[Spark job definition](spark-job-definition.md) (Python, Scala, R) <br>[Data Factory pipelines](../data-factory/create-first-pipeline-with-sample-data.md) <br> [Pipeline activities](../data-factory/activity-overview.md) (notebook, Spark job definition)|
| Data | Primary storage (ADLS Gen2) <br>Data residency (cluster/region based) | Primary storage ([OneLake](../onelake/onelake-overview.md)) <br>Data residency (capacity/region based) |
| Metadata | Internal Hive Metastore (HMS) <br>External HMS (using Azure SQL DB) | Internal HMS ([lakehouse](lakehouse-overview.md)) <br>-|
| Connections | Connector type (linked services) <br>[Data sources](/azure/synapse-analytics/spark/apache-spark-secure-credentials-with-tokenlibrary) <br>Data source conn. with workspace identity | Connector type (Data Movement and Transformation Services) <br>[Data sources](/power-query/connectors/) <br> - |
| Security | RBAC and access control <br>Storage ACLs (ADLS Gen2) <br>Private Links <br>Managed virtual network (VNet) for network isolation<br>Synapse workspace identity<br>Data Exfiltration Protection (DEP) <br>Service tags <br>Key Vault (via mssparkutils/ linked service) | [RBAC and access control](../fundamentals/roles-workspaces.md) <br> [OneLake RBAC](../onelake/security/data-access-control-model.md) <br> [Private Links](../security/security-private-links-overview.md) <br> [Managed virtual network (VNet)](../security/security-managed-vnets-fabric-overview.md) <br> [Workspace identity](../security/workspace-identity.md) <br>- <br>[Service tags](../security/security-service-tags.md) <br>Key Vault (via [notebookutils](microsoft-spark-utilities.md)) |
| DevOps | Azure DevOps integration <br>CI/CD (no built-in support) | [Azure DevOps integration](../cicd/git-integration/intro-to-git-integration.md)<br> [Deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md) |
| Developer experience | IDE integration (IntelliJ) <br>Synapse Studio UI <br>Collaboration (workspaces) <br>Livy API <br>API/SDK <br>mssparkutils | IDE integration ([VS Code](setup-vs-code-extension.md)) <br>Fabric UI <br>Collaboration (workspaces and sharing) <br>[Livy API](api-livy-overview.md) <br>[API](/rest/api/fabric/)/SDK <br>[notebookutils](microsoft-spark-utilities.md) |
| Logging and monitoring | Spark Advisor <br>Built-in monitoring pools and jobs (through Synapse Studio) <br>Spark history server <br>Prometheus/Grafana <br>Log Analytics <br>Storage Account <br>Event Hubs | [Spark Advisor](spark-advisor-introduction.md) <br>Built-in monitoring pools and jobs (through [Monitoring hub](browse-spark-applications-monitoring-hub.md)) <br>[Spark history server](apache-spark-history-server.md) <br>- <br>[Log Analytics](azure-fabric-diagnostic-emitters-log-analytics.md) <br>[Storage Account](azure-fabric-diagnostic-emitters-azure-storage.md) <br>[Event Hubs](azure-fabric-diagnostic-emitters-azure-event-hub.md) |
| Business continuity and disaster recovery (BCDR) | BCDR (data) ADLS Gen2 | [BCDR (data) OneLake](../onelake/onelake-disaster-recovery.md) |

**When to choose**: Use Fabric Spark for unified analytics with OneLake storage, built-in CI/CD pipelines, and capacity-based scaling. Use Azure Synapse Spark when you need GPU-accelerated pools, external Hive Metastore, or JDBC connections.

### Key limitations in Fabric

- **DMTS in notebooks**: Data Movement and Transformation Services can't be used in notebooks or Spark job definitions
- **Managed identity for Key Vault**: Not supported in notebooks
- **External Hive Metastore**: Not supported
- **GPU-accelerated pools**: Not available
- **.NET for Spark (C#)**: Not supported

### More Fabric considerations

- **Workload level RBAC**: Fabric supports four workspace roles. For more information, see [Roles in workspaces](../fundamentals/roles-workspaces.md).
- **CI/CD**: Use the Fabric API/SDK and [deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md).

## Spark pool comparison

The following table compares Azure Synapse Spark and Fabric Spark pools.

|Spark setting | Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Live pool (pre-warmed instances) | - | Yes, starter pool |
| Custom pool| Yes | Yes |
| Spark versions (runtime) | 2.4, 3.1, 3.2, 3.3, 3.4 | 3.4, 3.5, 4.0 |
| Autoscale | Yes | Yes |
| Dynamic allocation of executors | Yes, up to 200 | Yes, based on capacity |
| Adjustable node sizes | Yes, 3-200 | Yes, 1-based on capacity |
| Minimum node configuration | 3 nodes | 1 node |
| Node size family | Memory Optimized, GPU accelerated | Memory Optimized |
| Node size | Small-XXXLarge | Small-XXLarge |
| Autopause | Yes, customizable minimum 5 minutes | Yes, noncustomizable 2 minutes |
| High concurrency | No | Yes |
| V-Order | No | Yes |
| Spark autotune | No | Yes |
| Native Execution Engine | No | Yes |
| Concurrency limits | Fixed | Variable based on capacity |
| Multiple Spark pools | Yes | Yes (environments) |
| Intelligent cache | Yes | Yes |
| API/SDK support | Yes | Yes |

- **Runtime**: Fabric doesn't support Spark 3.3 and earlier versions. Fabric Spark supports Spark 3.4 with Delta 2.4 within [Runtime 1.2](runtime-1-2.md), Spark 3.5 with Delta 3.1 within [Runtime 1.3](runtime-1-3.md), and Spark 4.0 with Delta 4.0 within [Runtime 2.0](runtime-2-0.md).

**When to choose**: Use Fabric Spark pools for fast startup (starter pools), single-node jobs, high concurrency sessions, and V-Order optimization. Use Azure Synapse pools when you need GPU acceleration or fixed scaling up to 200 nodes.

### Understanding Spark pool models

Azure Synapse and Fabric use fundamentally different pool models:

- **Azure Synapse**: A Spark pool is a fixed compute resource with a maximum node count. Each job (notebook or Spark job definition) provisions a cluster inside the pool. The pool defines the upper bound of nodes available across all running artifacts.

- **Fabric**: A Spark pool is a configuration template, not a fixed backing compute resource. Each artifact provisions its own cluster, but sizing is constrained by Capacity vCores, not by a pool max-size property. [High concurrency sessions](high-concurrency-overview.md) allow artifacts to share the same session or cluster.

| Aspect | Azure Synapse | Fabric |
|--|--|--|
| What defines total compute? | Pool max nodes | Capacity (vCores + burst) |
| What does the pool represent? | Actual compute boundary | Template for cluster creation |
| Parallelism limited by | Pool node count | Total capacity vCores |

#### Practical example: concurrency comparison

The following table compares how many concurrent jobs can run under different configurations, assuming a cluster size of 1 driver + 6 workers (7 nodes, 28 vCores per job) with Small nodes (4 vCores each).

| Metric | Synapse (24-node pool) | Fabric F16 (96 Spark vCores) | Fabric F32 (192 Spark vCores) |
|--|--|--|--|
| Compute boundary | 24 nodes | 32 vCores × 3 burst = 96 vCores | 64 vCores × 3 burst = 192 vCores |
| Max concurrent jobs | 3 (uses 21 nodes) | 3 (uses 84 vCores) | 6 (uses 168 vCores) |
| Remaining capacity | 3 nodes | 12 vCores | 24 vCores |
| Queue limit | 200 per pool | 16 per capacity | 32 per capacity |

For more information about Fabric capacity and concurrency, see [Concurrency limits and queueing](spark-job-concurrency-and-queueing.md).

### Spark runtime versions

Fabric Spark supported versions:

- Spark 3.3 / Delta 2.2: [Runtime 1.1](runtime-1-1.md)
- Spark 3.4 / Delta 2.4: [Runtime 1.2](runtime-1-2.md)
- Spark 3.5 / Delta 3.1: [Runtime 1.3](runtime-1-3.md)

Fabric doesn't support Spark 2.4, 3.1, or 3.2.

### Adjustable node sizes

Azure Synapse Spark pools scale up to 200 nodes regardless of node size. In Fabric, the maximum number of nodes depends on node size and provisioned capacity (SKU).

Fabric capacity conversion: 2 Spark vCores = 1 capacity unit. **Formula**: total vCores in capacity ÷ vCores per node size = maximum nodes available.

For example, SKU F64 provides 64 capacity units (128 Spark vCores). The following table shows node limits for F64:

| Spark pool size | Azure Synapse Spark | Fabric Spark (Custom Pool, SKU F64) |
|--|--|--|
| Small (4 vCores) | Min: 3, Max: 200 | Min: 1, Max: 32 |
| Medium (8 vCores) | Min: 3, Max: 200 | Min: 1, Max: 16 |
| Large (16 vCores) | Min: 3, Max: 200 | Min: 1, Max: 8 |
| X-Large (32 vCores) | Min: 3, Max: 200 | Min: 1, Max: 4 |
| XX-Large (64 vCores) | Min: 3, Max: 200 | Min: 1, Max: 2 |

For more information, see [Spark compute](spark-compute.md).

### Node sizes

Fabric Spark pools support only the [Memory Optimized node family](spark-compute.md). GPU-accelerated pools available in Azure Synapse aren't supported in Fabric.

Node size comparison (XX-Large):

- Azure Synapse: 432 GB memory
- Fabric: 512 GB memory, 64 vCores

Node sizes Small through X-Large have identical vCores and memory in both [Azure Synapse](/azure/synapse-analytics/spark/apache-spark-pool-configurations) and [Fabric](spark-compute.md).

### Autopause behavior

Autopause settings comparison:

- **Azure Synapse**: Configurable idle timeout, minimum 5 minutes
- **Fabric**: Fixed 2-minute autopause after session expires ([not configurable](create-custom-spark-pools.md)), default session timeout is 20 minutes

### High concurrency

Fabric supports [high concurrency mode](high-concurrency-overview.md) for notebooks, allowing multiple users to share a single Spark session. Azure Synapse doesn't support this feature.

### Concurrency limits

Azure Synapse Spark limits (fixed):

- 50 concurrent jobs per pool, 200 queued jobs per pool
- 250 active jobs per pool, 1,000 per workspace

Fabric Spark limits (SKU-based):

- Concurrent jobs vary by capacity SKU: 1 to 512 max
- Dynamic reserve-based throttling manages peak usage

For more information, see [Concurrency limits and queueing in Microsoft Fabric Spark](spark-job-concurrency-and-queueing.md).

### Multiple Spark pools

In Fabric, use [environments](create-and-use-environment.md) to configure and select different Spark pools per notebook or Spark job definition.

> [!NOTE]
> Learn how to [migrate Azure Synapse Spark pools to Fabric](migrate-synapse-spark-pools.md).

## Spark configurations comparison

Spark configurations apply at two levels:

- **Environment level**: Default configuration for all Spark jobs in the environment
- **Inline level**: Per-session configuration in notebooks or Spark job definitions

| Spark configuration| Azure Synapse Spark | Fabric Spark |
|--|--|--|
| Environment level | Yes, pools | Yes, environments |
| Inline | Yes | Yes |
| Import/export | Yes | Yes (.yml from environments) |
| API/SDK support | Yes | Yes |

**When to choose**: Both platforms support environment and inline configurations. Fabric uses environments instead of pool-level configs.

- **Inline syntax**: In Fabric, use ```spark.conf.set(<conf_name>, <conf_value>)``` for session-level configs. For batch jobs, use SparkConf.
- **Immutable configs**: Some Spark configurations can't be modified. Error message: ```AnalysisException: Can't modify the value of a Spark config: <config_name>```
- **V-Order**: Enabled by default in Fabric; write-time optimization for parquet files. See [V-Order](delta-optimization-and-v-order.md).
- **Optimized Write**: Enabled by default in Fabric; disabled by default in Azure Synapse.

> [!NOTE]
> Learn how to [Migrate Spark configurations from Azure Synapse to Fabric](migrate-synapse-spark-configurations.md).

## Spark libraries comparison

Spark libraries apply at three levels:

- **Workspace level**: Available in Azure Synapse only
- **Environment level**: Libraries available to all notebooks and Spark job definitions in the environment
- **Inline**: Session-specific libraries installed at notebook startup

| Spark library | Azure Synapse Spark | Fabric Spark |
|--|--|--|
| Workspace level | Yes | No |
| Environment level | Yes, Pools | Yes, environments |
| Inline | Yes | Yes |
| Import/export | Yes | Yes |
| API/SDK support | Yes | Yes |

**When to choose**: Both platforms support environment and inline libraries. Fabric doesn't support workspace-level packages.

- **Built-in libraries**: Fabric and Azure Synapse runtimes share a common Spark core but differ in library versions. Some code might require recompilation or custom libraries. See [Fabric runtime libraries](runtime.md).

> [!NOTE]
> Learn how to [migrate Azure Synapse Spark libraries to Fabric](migrate-synapse-spark-libraries.md).

## Notebook comparison

Notebooks and Spark job definitions are primary code items for developing Apache Spark jobs in Fabric. There are some differences between [Azure Synapse Spark notebooks](/azure/synapse-analytics/spark/apache-spark-development-using-notebooks#active-session-management) and [Fabric Spark notebooks](how-to-use-notebook.md):

|Notebook capability| Azure Synapse Spark | Fabric Spark |
|--|--|--|
| Import/export | Yes | Yes |
| Session configuration | Yes. UI and inline | Yes. UI (environment) and inline |
| IntelliSense | Yes | Yes |
| mssparkutils | Yes | Yes |
| Notebook resources | No | Yes |
| Collaborate | No | Yes |
| High concurrency | No | Yes |
| .NET for Spark C# | Yes | No |
| Pipeline activity support | Yes | Yes |
| Built-in scheduled run support | No | Yes |
| API/SDK support | Yes | Yes |

**When to choose**: Use Fabric notebooks for collaboration, high concurrency sessions, built-in scheduling, and notebook resources. Use Azure Synapse notebooks if you require .NET for Spark (C#).

- **notebookutils.credentials**: Only ```getToken``` and ```getSecret``` are supported in Fabric (DMTS connections not available).
- **Notebook resources**: Fabric provides a Unix-like file system for managing files. See [How to use notebooks](how-to-use-notebook.md).
- **High concurrency**: Alternative to ThreadPoolExecutor in Azure Synapse. See [Configure high concurrency mode](configure-high-concurrency-session-notebooks.md).
- **.NET for Spark**: Migrate C#/F# workloads to [Python or Scala](/azure/synapse-analytics/spark/spark-dotnet).
- **Linked services**: Replace with Spark libraries for external data source connections.

> [!NOTE]
> Learn how to [Migrate notebooks from Azure Synapse to Fabric](migrate-synapse-notebooks.md).

## Spark job definition comparison

Important [Spark job definition](spark-job-definition.md) considerations:

|Spark job capability| Azure Synapse Spark | Fabric Spark |
|--|--|--|
| PySpark | Yes | Yes |
| Scala | Yes | Yes |
| .NET for Spark C# | Yes | No |
| SparkR | No | Yes |
| Import/export | Yes (UI) | No |
| Pipeline activity support | Yes | Yes |
| Built-in scheduled run support | No | Yes |
| Retry policies | No | Yes |
| API/SDK support | Yes | Yes |

**When to choose**: Use Fabric Spark job definitions for SparkR support, built-in scheduling, and retry policies. Use Azure Synapse if you need .NET for Spark (C#) or UI-based import/export.

- **Supported files**: .py, .R, and .jar files with reference files, command line arguments, and lakehouse references.
- **Import/export**: UI-based JSON import/export available in Azure Synapse only.
- **Retry policies**: Enable indefinite runs for Spark Structured Streaming jobs.
- **.NET for Spark**: Migrate C#/F# workloads to [Python or Scala](/azure/synapse-analytics/spark/spark-dotnet).

> [!NOTE]
> Learn how to [Migrate Spark job definitions from Azure Synapse to Fabric](migrate-synapse-spark-job-definition.md).

## Hive Metastore (HMS) comparison

|HMS type| Azure Synapse Spark | Fabric Spark |
|--|--|--|
| Internal HMS | Yes | Yes (lakehouse) |
| External HMS | Yes | No |

**When to choose**: Use Fabric if lakehouse-based internal HMS meets your needs. Use Azure Synapse if you require external Hive Metastore (Azure SQL DB) or Catalog API access.

> [!NOTE]
> Learn how to [migrate Azure Synapse Spark catalog HMS metadata to Fabric](migrate-synapse-hms-metadata.md).

## Related content

- Learn more about migration options for [Spark pools](migrate-synapse-spark-pools.md), [configurations](migrate-synapse-spark-configurations.md), [libraries](migrate-synapse-spark-libraries.md), [notebooks](migrate-synapse-notebooks.md), and [Spark job definitions](migrate-synapse-spark-job-definition.md)
- [Migrate data and pipelines](migrate-synapse-data-pipelines.md)
- [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md)
