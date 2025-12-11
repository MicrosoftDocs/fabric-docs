---
title: Comparison between Fabric and Azure Synapse Spark.
description: Learn about the key differences between support for Azure Synapse Spark and Apache Spark for Fabric.
ms.reviewer: jejiang
ms.author: eur
author: eric-urban
ms.topic: overview
ms.custom:
  - fabric-cat
ms.date: 11/15/2023
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
| Security | RBAC and access control <br>Storage ACLs (ADLS Gen2) <br>Private Links <br>Managed VNet (network isolation) <br>Synapse workspace identity<br>Data Exfiltration Protection (DEP) <br>Service tags <br>Key Vault (via mssparkutils/ linked service) | [RBAC and access control](../fundamentals/roles-workspaces.md) <br> [OneLake RBAC](../onelake/security/data-access-control-model.md) <br> [Private Links](../security/security-private-links-overview.md) <br> [Managed VNet](../security/security-managed-vnets-fabric-overview.md) <br> [Workspace identity](../security/workspace-identity.md) <br>- <br>[Service tags](../security/security-service-tags.md) <br>Key Vault (via [notebookutils](microsoft-spark-utilities.md)) |
| DevOps | Azure DevOps integration <br>CI/CD (no built-in support) | [Azure DevOps integration](../cicd/git-integration/intro-to-git-integration.md)<br> [Deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md) |
| Developer experience | IDE integration (IntelliJ) <br>Synapse Studio UI <br>Collaboration (workspaces) <br>Livy API <br>API/SDK <br>mssparkutils | IDE integration ([VS Code](setup-vs-code-extension.md)) <br>Fabric UI <br>Collaboration (workspaces and sharing) <br>[Livy API](api-livy-overview.md) <br>[API](/rest/api/fabric/)/SDK <br>[notebookutils](microsoft-spark-utilities.md) |
| Logging and monitoring | Spark Advisor <br>Built-in monitoring pools and jobs (through Synapse Studio) <br>Spark history server <br>Prometheus/Grafana <br>Log Analytics <br>Storage Account <br>Event Hubs | [Spark Advisor](spark-advisor-introduction.md) <br>Built-in monitoring pools and jobs (through [Monitoring hub](browse-spark-applications-monitoring-hub.md)) <br>[Spark history server](apache-spark-history-server.md) <br>- <br>[Log Analytics](azure-fabric-diagnostic-emitters-log-analytics.md) <br>[Storage Account](azure-fabric-diagnostic-emitters-azure-storage.md) <br>[Event Hubs](azure-fabric-diagnostic-emitters-azure-event-hub.md) |
| Business continuity and disaster recovery (BCDR) | BCDR (data) ADLS Gen2 | [BCDR (data) OneLake](../onelake/onelake-disaster-recovery.md) |

**When to choose**: Use Fabric Spark for unified analytics with OneLake storage, built-in CI/CD pipelines, and capacity-based scaling. Use Azure Synapse Spark when you need GPU-accelerated pools, external Hive Metastore, or JDBC connections.

### Key limitations in Fabric

- **JDBC**: Not supported
- **DMTS in notebooks**: Data Movement and Transformation Services can't be used in notebooks or Spark job definitions
- **Managed identity for Key Vault**: Not supported in notebooks
- **External Hive Metastore**: Not supported
- **GPU-accelerated pools**: Not available
- **.NET for Spark (C#)**: Not supported

### Additional considerations

- **Workload level RBAC**: Fabric supports four workspace roles. For more information, see [Roles in workspaces](../fundamentals/roles-workspaces.md).
- **CI/CD**: Use the Fabric API/SDK and [deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md).

## Spark pool comparison

The following table compares Azure Synapse Spark and Fabric Spark pools.

|Spark setting | Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Live pool (pre-warmed instances) | - | Yes, starter pool |
| Custom pool| Yes | Yes |
| Spark versions (runtime) | 2.4, 3.1, 3.2, 3.3, 3.4 | 3.3, 3.4, 3.5 |
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

**When to choose**: Use Fabric Spark pools for fast startup (starter pools), single-node jobs, high concurrency sessions, and V-Order optimization. Use Azure Synapse pools when you need GPU acceleration or fixed scaling up to 200 nodes.

### Spark runtime versions

Fabric Spark supported versions:

- Spark 3.3 / Delta 2.2: [Runtime 1.1](runtime-1-1.md)
- Spark 3.4 / Delta 2.4: [Runtime 1.2](runtime-1-2.md)
- Spark 3.5 / Delta 3.1: [Runtime 1.3](runtime-1-3.md)

Fabric doesn't support Spark 2.4, 3.1, or 3.2.

### Autoscale and node configuration

Azure Synapse Spark pools scale up to 200 nodes regardless of node size. In Fabric, the maximum nodes depends on node size and provisioned capacity (SKU).

Fabric capacity conversion: 2 Spark vCores = 1 capacity unit. For example, SKU F64 provides 64 capacity units (128 Spark vCores). With a small node size (4 vCores), you can have up to 32 nodes (128 ÷ 4 = 32).

**Formula**: total vCores in capacity ÷ vCores per node size = maximum nodes available.

For more information, see [Spark compute](spark-compute.md).

### F64 SKU capacity example

The following example shows node limits for the F64 SKU.

| Spark pool size | Azure Synapse Spark | Fabric Spark (Custom Pool, SKU F64) |
|--|--|--|
| Small | Min: 3, Max: 200 | Min: 1, Max: 32 |
| Medium | Min: 3, Max: 200 | Min: 1, Max: 16 |
| Large | Min: 3, Max: 200 | Min: 1, Max: 8 |
| X-Large | Min: 3, Max: 200 | Min: 1, Max: 4 |
| XX-Large | Min: 3, Max: 200 | Min: 1, Max: 2 |

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

- **Environment level**: In Azure Synapse, you can define multiple Spark configurations and assign them to different Spark pools. You can do this in Fabric by using [environments](create-and-use-environment.md).

- **Inline**: In Azure Synapse, both notebooks and Spark jobs support attaching different Spark configurations. In Fabric, session level configurations are customized with the ```spark.conf.set(<conf_name>, <conf_value>)``` setting. For batch jobs, you can also apply configurations via SparkConf.

- **Import/export**: This option for Spark configurations is available in Fabric environments.

- **Other considerations**:
  - **Immutable Spark configurations**: Some Spark configurations are immutable. If you get the message ```AnalysisException: Can't modify the value of a Spark config: <config_name>```, the property in question is immutable.
  - **FAIR scheduler**: FAIR scheduler is used in [high concurrency mode](high-concurrency-overview.md).
  - **V-Order**: [V-Order](delta-optimization-and-v-order.md) is write-time optimization applied to the parquet files enabled by default in Fabric Spark pools.
  - **Optimized Write**: [Optimized Write](delta-optimization-and-v-order.md) is disabled by default in Azure Synapse but enabled by default for Fabric Spark.

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
  - **Built-in libraries**: Fabric and Azure Synapse share a common core of Spark, but they can slightly differ in different support of their runtime libraries. Typically, using code is compatible with some exceptions. In that case, users might need compilation, the addition of custom libraries, and adjusting syntax. See built-in Fabric Spark runtime libraries [here](runtime.md).

> [!NOTE]
> Learn how to [migrate Azure Synapse Spark libraries to Fabric](migrate-synapse-spark-libraries.md).

## Notebook comparison

Notebooks and Spark job definitions are primary code items for developing Apache Spark jobs in Fabric. There are some differences between [Azure Synapse Spark notebooks](/azure/synapse-analytics/spark/apache-spark-development-using-notebooks#active-session-management) and [Fabric Spark notebooks](how-to-use-notebook.md):

|Notebook capability| Azure Synapse Spark | Fabric Spark |
|--|--|--|
| Import/export | Yes | Yes |
| Session configuration | Yes, UI and inline | Yes, UI (environment) and inline |
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
- **mssparkutils**: Because Data Movement and Transformation Services (DMTS) connections aren't supported in Fabric yet, only ```getToken``` and ```getSecret``` are supported for now in Fabric for ```mssparkutils.credentials```.

- **Notebooks resources**: Fabric notebooks provide a Unix-like file system to help you manage your folders and files. For more information, see [How to use Microsoft Fabric notebooks](how-to-use-notebook.md).

- **Collaborate**: The Fabric notebook is a collaborative item that supports multiple users editing the same notebook. For more information, see [How to use Microsoft Fabric notebooks](how-to-use-notebook.md).

- **High concurrency**: In Fabric, you can attach notebooks to a high concurrency session. This option is an alternative for users using ThreadPoolExecutor in Azure Synapse. For more information, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).

- **.NET for Spark C#**: Fabric doesn't support .NET Spark (C#). However, the recommendation that users with [existing workloads written in C# or F# migrate to Python or Scala](/azure/synapse-analytics/spark/spark-dotnet).

- **Built-in scheduled run support**: Fabric supports scheduled runs for notebooks.

- **Other considerations**:
  - You can use features inside a notebook that are only supported in a specific version of Spark. Remember that Spark 2.4 and 3.1 aren't supported in Fabric.
  - If your notebook or Spark job is using a linked service with different data source connections or mount points, you should modify your Spark jobs to use alternative methods for handling connections to external data sources and sinks. Use Spark code to connect to data sources using available Spark libraries.

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

- **Spark jobs**: You can bring your .py/.R/jar files. Fabric supports SparkR. A Spark job definition supports reference files, command line arguments, Spark configurations, and lakehouse references.

- **Import/export**: In Azure Synapse, you can import/export json-based Spark job definitions from the UI. This feature isn't available yet in Fabric.

- **.NET for Spark C#**: Fabric doesn't support .NET Spark (C#). However, the recommendation is that users with [existing workloads written in C# or F# migrate to Python or Scala](/azure/synapse-analytics/spark/spark-dotnet).

- **Built-in scheduled run support**: Fabric supports [scheduled runs for a Spark job definition](run-spark-job-definition.md).

- **Retry policies**: This option enables users to run Spark-structured streaming jobs indefinitely.

> [!NOTE]
> Learn how to [Migrate Spark job definitions from Azure Synapse to Fabric](migrate-synapse-spark-job-definition.md).

## Hive Metastore (HMS) comparison

Hive MetaStore (HMS) differences and considerations:

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
