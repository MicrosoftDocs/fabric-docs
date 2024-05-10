---
title: Comparison between Fabric and Azure Synapse Spark.
description: Learn about the key differences between Azure Synapse Spark and Fabric Spark support.
ms.reviewer: snehagunda, aimurg
ms.author: jejiang
author: jejiang
ms.topic: overview
ms.custom:
  - fabric-cat
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Compare Fabric Data Engineering and Azure Synapse Spark

This comparison between Fabric Data Engineering and Azure Synapse Spark provides a summary of key features and an in-depth analysis across various categories, which include Spark pools, configuration, libraries, notebooks, and Spark job definitions.

The following table compares Azure Synapse Spark and Fabric Spark across different categories:

|Category | Azure Synapse Spark | Fabric Spark |
| --- | --- | --- |
| Spark pools | Spark pool <br>- <br>-| [Starter pool](configure-starter-pools.md) / [Custom pool](create-custom-spark-pools.md) <br>[V-Order](delta-optimization-and-v-order.md) <br>[High concurrency](configure-high-concurrency-session-notebooks.md) |
| Spark configurations | Pool level <br>Notebook or Spark job definition level| [Environment level](create-and-use-environment.md) <br>[Notebook](how-to-use-notebook.md) or [Spark job definition](spark-job-definition.md) level|
| Spark libraries | Workspace level packages <br>Pool level packages <br>Inline packages | - <br>[Environment libraries](environment-manage-library.md) <br>[Inline libraries](library-management.md)|
| Resources | Notebook (Python, Scala, Spark SQL, R, .NET) <br>Spark job definition (Python, Scala, .NET) <br>Synapse data pipelines <br>Pipeline activities (notebook, Spark job definition)| [Notebook](how-to-use-notebook.md) (Python, Scala, Spark SQL, R) <br>[Spark job definition](spark-job-definition.md) (Python, Scala, R) <br>[Data Factory data pipelines](../data-factory/create-first-pipeline-with-sample-data.md) <br> [Pipeline activities](../data-factory/activity-overview.md) (notebook)|
| Data | Primary storage (ADLS Gen2) <br>Data residency (cluster/region based) | Primary storage ([OneLake](../onelake/onelake-overview.md)) <br>Data residency (capacity/region based) |
| Metadata | Internal Hive Metastore (HMS) <br>External HMS (using Azure SQL DB) | Internal HMS ([lakehouse](lakehouse-overview.md)) <br>-|
| Connections | Connector type (linked services) <br>[Data sources](/azure/synapse-analytics/spark/apache-spark-secure-credentials-with-tokenlibrary) <br>Data source conn. with workspace identity | Connector type (DMTS) <br>[Data sources](/power-query/connectors/) <br> - |
| Security | RBAC and access control <br>Storage ACLs (ADLS Gen2) <br>Private Links <br>Managed VNet (network isolation) <br>Synapse workspace identity<br>Data Exfiltration Protection (DEP) <br>Service tags <br>Key Vault (via mssparkutils/ linked service) | [RBAC and access control](../get-started/roles-workspaces.md) <br> [OneLake RBAC](../onelake/security/data-access-control-model.md) <br> [Private Links](../security/security-private-links-overview.md) <br> [Managed VNet](../security/security-managed-vnets-fabric-overview.md) <br> [Workspace identity](../security/workspace-identity.md) <br>- <br>[Service tags](../security/security-service-tags.md) <br>Key Vault (via [mssparkutils](microsoft-spark-utilities.md)) |
| DevOps | Azure DevOps integration <br>CI/CD (no built-in support) | [Azure DevOps integration](../cicd/git-integration/intro-to-git-integration.md)<br> [Deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md) |
| Developer experience | IDE integration (IntelliJ) <br>Synapse Studio UI <br>Collaboration (workspaces) <br>Livy API <br>API/SDK <br>mssparkutils | IDE integration ([VS Code](setup-vs-code-extension.md)) <br>Fabric UI <br>Collaboration (workspaces and sharing) <br>- <br>[API](/rest/api/fabric/)/SDK <br>[mssparkutils](microsoft-spark-utilities.md) |
| Logging and monitoring | Spark Advisor <br>Built-in monitoring pools and jobs (through Synapse Studio) <br>Spark history server <br>Prometheus/Grafana <br>Log Analytics <br>Storage Account <br>Event Hubs | [Spark Advisor](spark-advisor-introduction.md) <br>Built-in monitoring pools and jobs (through [Monitoring hub](browse-spark-applications-monitoring-hub.md)) <br>[Spark history server](apache-spark-history-server.md) <br>- <br>- <br>- <br>- |
| Business continuity and disaster recovery (BCDR) | BCDR (data) ADLS Gen2 | [BCDR (data) OneLake](../onelake/onelake-disaster-recovery.md) |

Considerations and limitations:

- **DMTS integration**: You can't use the DMTS via notebooks and Spark job definitions.

- **Workload level RBAC**: Fabric supports four different workspace roles. Fore more information, see [Roles in workspaces in Microsoft Fabric](../get-started/roles-workspaces.md).

- **Managed identity**: Currently, Fabric doesn't support running notebooks and Spark job definitions using the workspace identity or managed identity for Azure KeyVault in notebooks.

- **CI/CD**: You can use the Fabric API/SDK and [deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md).

- **Livy API and how to submit and manage Spark jobs**: Livy API is in the roadmap but not exposed yet in Fabric. You must create notebooks and Spark job definitions with the Fabric UI.

- **Spark logs and metrics**: In Azure Synapse you can emit Spark logs and metrics to your own storage, such as Log Analytics, blob, and Event Hubs. You can also get a list of Spark applications for the workspace from the API. Currently, both of these capabilities aren't available in Fabric.

- **Other considerations**:
  - **JDBC**: JDBC connection support isn't currently available in Fabric.

## Spark pool comparison

The following table compares Azure Synapse Spark and Fabric Spark pools.

|Spark setting | Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Live pool (pre-warm instances) | - | Yes, Starter pools |
| Custom pool| Yes | Yes |
| Spark versions (runtime) | 2.4, 3.1, 3.2, 3.3, 3.4 | 3.3, 3.4, 3.5 (experimental) |
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
| Concurrency limits | Fixed | Variable based on capacity |
| Multiple Spark pools | Yes | Yes (environments) |
| Intelligent cache | Yes | Yes |
| API/SDK support | Yes | No |

- **Runtime**: Fabric doesn't support Spark 2.4, 3.1, and 3.2 versions. Fabric Spark supports Spark 3.3 with Delta 2.2 within [Runtime 1.1](runtime-1-1.md), Spark 3.4 with Delta 2.4 within [Runtime 1.2](runtime-1-2.md) and Spark 3.5 with Delta 3.0 within [Runtime 1.3](runtime-1-3.md).

- **Autoscale**: In Azure Synapse Spark, the pool can scale up to 200 nodes regardless of the node size. In Fabric, the maximum number of nodes is subjected to node size and provisioned capacity. See the following example for the F64 SKU.

    | Spark pool size | Azure Synapse Spark | Fabric Spark (Custom Pool, SKU F64) |
    |--|--|--|
    | Small | Min: 3, Max: 200 | Min: 1, Max: 32 |
    | Medium | Min: 3, Max: 200 | Min: 1, Max: 16 |
    | Large | Min: 3, Max: 200 | Min: 1, Max: 8 |
    | X-Large | Min: 3, Max: 200 | Min: 1, Max: 4 |
    | XX-Large | Min: 3, Max: 200 | Min: 1, Max: 2 |

- **Adjustable node sizes**: In Azure Synapse Spark, you can go up to 200 nodes. In Fabric, the number of nodes you can have in your custom Spark pool depends on your node size and Fabric capacity. Capacity is a measure of how much computing power you can use in Azure. One way to think of it is that two Spark vCores (a unit of computing power for Spark) equals one capacity unit. For example, a Fabric Capacity SKU F64 has 64 capacity units, which is equivalent to 128 Spark VCores. So, if you choose a small node size, you can have up to 32 nodes in your pool (128/4 = 32). Then, the total of vCores in the capacity/vCores per node size = total number of nodes available. For more information, see [Spark compute](spark-compute.md).

- **Node size family**: Fabric Spark pools only support [Memory Optimized node size family](spark-compute.md) for now. If you're using a GPU-accelerated SKU Spark pool in Azure Synapse, they aren't available in Fabric.

- **Node size**: The xx-large node size comes with 432 GB of memory in Azure Synapse, while the same node size has 512 GB in Fabric including 64 vCores. The rest of the node sizes (small through x-large) have the same vCores and memory in both [Azure Synapse](/azure/synapse-analytics/spark/apache-spark-pool-configurations) and [Fabric](spark-compute.md).

- **Automatic pausing**: If you enable it in Azure Synapse Spark, the Apache Spark pool will automatically pause after a specified amount of idle time. This setting is configurable in Azure Synapse (minimum 5 minutes), but custom pools have [a noncustomizable default autopause duration of 2 minutes](create-custom-spark-pools.md) in Fabric after the session expires. The default session expiration is set to 20 minutes in Fabric.

- **High concurrency**: Fabric supports high concurrency in notebooks. For more information, see [High concurrency mode in Fabric Spark](high-concurrency-overview.md).

- **Concurrency limits**: In terms of concurrency, Azure Synapse Spark has a limit of 50 simultaneous running jobs per Spark pool and 200 queued jobs per Spark pool. The maximum active jobs are 250 per Spark pool and 1000 per workspace. In Microsoft Fabric Spark, capacity SKUs define the concurrency limits. SKUs have varying limits on max concurrent jobs that range from 1 to 512. Also, Fabric Spark has a dynamic reserve-based throttling system to manage concurrency and ensure smooth operation even during peak usage times. For more information, see [Concurrency limits and queueing in Microsoft Fabric Spark](spark-job-concurrency-and-queueing.md) and [Fabric capacities](https://blog.fabric.microsoft.com/blog/fabric-capacities-everything-you-need-to-know-about-whats-new-and-whats-coming?ft=All).

- **Multiple Spark pools**: If you want to have multiple Spark pools, use Fabric environments to select a pool by notebook or Spark job definition. For more information, see [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md).

> [!NOTE]
> Learn how to [migrate Azure Synapse Spark pools to Fabric](migrate-synapse-spark-pools.md).

## Spark configurations comparison

Spark configurations can be applied at different levels:

- **Environment level**: These configurations are used as the default configuration for all Spark jobs in the environment.
- **Inline level**: Set Spark configurations inline using notebooks and Spark job definitions.

While both options are supported in Azure Synapse Spark and Fabric, there are some considerations:

| Spark configuration| Azure Synapse Spark | Fabric Spark |
|--|--|--|
| Environment level | Yes, pools | Yes, environments |
| Inline | Yes | Yes |
| Import/export | Yes | Yes (.yml from environments) |
| API/SDK support | Yes | No |

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

You can apply Spark libraries at different levels:

- **Workspace level**: You can't upload/install these libraries to your workspace and later assign them to a specific Spark pool in Azure Synapse.
- **Environment level**: You can upload/install libraries to an environment. Environment-level libraries are available to all notebooks and Spark job definitions running in the environment.
- **Inline**: In addition to environment-level libraries, you can also specify inline libraries. For example, at the beginning of a notebook session.

Considerations:

| Spark library | Azure Synapse Spark | Fabric Spark |
|--|--|--|
| Workspace level | Yes | No |
| Environment level | Yes, Pools | Yes, environments |
| Inline | Yes | Yes |
| Import/export | Yes | Yes |
| API/SDK support | Yes | No |

- **Other considerations**:
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

- **mssparkutils**: Because DMTS connections aren't supported in Fabric yet, only ```getToken``` and ```getSecret``` are supported for now in Fabric for ```mssparkutils.credentials```. ```mssparkutils.env``` isn't supported yet.

- **Notebooks resources**: The Fabric notebook experience provides a Unix-like file system to help you manage your folders and files. For more information, see [How to use Microsoft Fabric notebooks](how-to-use-notebook.md).

- **Collaborate**: The Fabric notebook is a collaborative item that supports multiple users editing the same notebook. For more information, see [How to use Microsoft Fabric notebooks](how-to-use-notebook.md).

- **High concurrency**: In Fabric, you can attach notebooks to a high concurrency session. This option is an alternative for users using ThreadPoolExecutor in Azure Synapse. For more information, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).

- **.NET for Spark C#**: Fabric doesn't support .NET Spark (C#). However, we recommendation that users with [existing workloads written in C# or F# migrate to Python or Scala](/azure/synapse-analytics/spark/spark-dotnet).

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
| Pipeline activity support | Yes | No |
| Built-in scheduled run support | No | Yes |
| Retry policies | No | Yes |
| API/SDK support | Yes | Yes |

- **Spark jobs**: You can bring your .py/.R/jar files. Fabric supports SparkR. A Spark job definition supports reference files, command line arguments, Spark configurations, and lakehouse references.

- **Import/export**: In Azure Synapse, you can import/export json-based Spark job definitions from the UI. This feature isn't available yet in Fabric.

- **.NET for Spark C#**: Fabric doesn't support .NET Spark (C#). However, the recommendation is that users with [existing workloads written in C# or F# migrate to Python or Scala](/azure/synapse-analytics/spark/spark-dotnet).

- **Pipeline activity support**: Data pipelines in Fabric don't include Spark job definition activity yet. You could use scheduled runs if you want to run your Spark job periodically.

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

- **External HMS**: Fabric currently doesn't support a Catalog API and access to an external Hive Metastore (HMS).

> [!NOTE]
> Learn how to [migrate Azure Synapse Spark catalog HMS metadata to Fabric](migrate-synapse-hms-metadata.md).

## Related content

- Learn more about migration options for [Spark pools](migrate-synapse-spark-pools.md), [configurations](migrate-synapse-spark-configurations.md), [libraries](migrate-synapse-spark-libraries.md), [notebooks](migrate-synapse-notebooks.md), and [Spark job definitions](migrate-synapse-spark-job-definition.md)
- [Migrate data and pipelines](migrate-synapse-data-pipelines.md)
- [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md)
