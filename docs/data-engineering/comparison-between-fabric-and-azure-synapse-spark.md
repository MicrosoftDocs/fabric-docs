---
title: Comparison between Fabric and Azure Synapse Spark.
description: There are some differences between Azure Synapse Spark and Fabric Spark support. This article outlines the key differences. 
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: overview
ms.custom: fabric-cat
ms.date: 11/01/2023
---

# Comparison between Fabric and Azure Synapse Spark

This article presents a comparison between Fabric Data Engineering and Azure Synapse Spark. It summarizes key features and provides an in-depth analysis across various categories. These categories include Spark pools, configuration, libraries, notebooks, and Spark job definition (SJD), along with corresponding details for Fabric Data Engineering.

The following table compares Azure Synapse Spark and Fabric Spark across different categories:

|Category | Azure Synapse Spark | Fabric Spark |
| --- | --- | --- |
| **Spark pools** | [Spark pool](/synapse-analytics/quickstart-create-apache-spark-pool-portal/) <br>- <br>-| [Starter pool](configure-starter-pools.md) / [Custom pool](create-custom-spark-pools.md) <br>[V-Order](delta-optimization-and-v-order.md) <br>[High concurrency](configure-high-concurrency-session-notebooks.md) |
| **Spark configurations** | Pool level <br>Notebook or Spark job definition level| Environment level <br>Notebook or Spark job definition level|
| Spark libraries | Workspace level packages <br>Pool level packages <br>Inline packages | - <br>Environment libraries <br>Inline libraries|
| Resources | Notebook (Python, Scala, Spark SQL, R, .NET) <br>Spark job definition (Python, Scala, .NET) <br>Pipelines <br>Spark-related pipeline activities (Notebook, SJD)| Notebook (Python, Scala, Spark SQL, R) <br>Spark job definition (Python, Scala, R) <br>Pipelines <br> Spark-related pipeline activities (Notebook)|
| Data | Primary storage (Azure Data Lake Storage Gen2) <br>Data residency (Cluster/region based) | Primary storage (OneLake) <br>Data residency (Capacity/region based) |
| Metadata | Internal metastore <br>External metastore (using Azure SQL DB for HMS) | Internal metastore (lakehouse) <br>-|
| Connections | Connector type (Linked services) <br>Data Sources ([13](/azure/synapse-analytics/spark/apache-spark-secure-credentials-with-tokenlibrary)) <br>Data Source conn. with workspace identity | Connector type (DMTS*) <br>Data Sources ([Dataflow Gen2](/power-query/connectors/)) <br> - |
| Security | RBAC and access control (11 roles at workspace level) <br>Storage ACLs (ADLS Gen2) <br>Private Links <br>Managed VNet (Network Isolation) <br>Fabric Workspace Identity (FWI) <br>Data Exfiltration Protection <br>IP Firewall <br>Trusted Service for Storage Firewall bypass (with workspace identity) <br>Service Tags <br>- <br>Key Vault (via mssparkutils and Linked service) | RBAC and access control (four roles at workspace level) <br> - <br> - <br>- <br>Fabric Workspace Identity (FWI) <br>- <br> Only Control plane <br> - <br>Service Tags <br> - <br>Key Vault (via mssparkutils (public endpoint)) |
| DevOps | Azure DevOps integration <br>CI/CD (No built-in support) | - <br> - |
| Developer Experience | IDE Integration (IntelliJ) <br>Studio UI <br>Collaboration (through workspaces) <br>Livy API <br>API/SDK <br>mssparkutils | IDE Integration (Visual Studio Code) <br>Studio UI <br>Collaboration (through workspaces and sharing options) <br>- <br>API/SDK <br>mssparkutils |
| Logging and Monitoring | Spark Advisor <br>Built-in Monitoring Pools and Jobs (through Synapse Studio) <br>Spark History Server <br>Prometheus/Grafana <br>Log Analytics <br>Storage Account <br>Event Hubs | Spark Advisor <br>Built-in Monitoring Pools and Jobs (through Monitoring Hub) <br>Spark History Server <br>- <br>- <br>- <br>- |
| BC, HA & Disaster Recovery | BCDR (data)-via ADLS Gen2 | - |

> [!NOTE]
> There isn't a one-to-one mapping between linked services and DMTS. The same is applicable for Synapse Vs Fabric APIs.  

## Fabric capability details

- **DMTS integration**: You can't use the DMTS via notebook and SJDs.
- **Git integration**: Git integration and versioning of Spark-related items is [in the roadmap](/fabric/release-plan/data-engineering) but not supported yet in Fabric.
- **Managed Identity**: Run notebooks/Spark jobs using the workspace identity and support for managed identity for Azure KeyVault in notebooks not supported yet in Fabric.
- **Livy API and the way to submit and manage Spark jobs**: Livy API is in the roadmap but not exposed yet in Fabric. Users need to create notebooks/SJD using the Fabric UI. 
- **CI/CD**: You can use the Fabric API/SDK, but not built-in support with Deployment Pipelines yet.
- **Spark logs and metrics**: In Azure Synapse you can emit Spark logs and metrics to your own storage, such as Log Analytics, Blob, and Event Hubs. Similarly, you can get a list of spark applications for the workspace from the API. Both capabilities are currently unavailable in Fabric.
- **JDBC**: JDBC connections support isn't available in Fabric.
- **Concurrency limits**: In terms of concurrency, Azure Synapse Spark has a limit of 50 simultaneous running jobs per Spark pool and 200 queued jobs per Spark pool. The maximum active jobs are 250 per Spark pool and 1000 per workspace. In Microsoft Fabric Spark, capacity SKUs define the concurrency limits. SKUs have varying limits on max concurrent jobs that range from 1 to 512. Also, Microsoft Fabric Spark has a dynamic reserve-based throttling system to manage concurrency and ensure smooth operation even during peak usage times. Learn more about [Spark concurrency limits](spark-job-concurrency-and-queueing.md) and [Fabric capacities](https://blog.fabric.microsoft.com/blog/fabric-capacities-everything-you-need-to-know-about-whats-new-and-whats-coming?ft=All). 
- **Workload level RBAC**: Fabric only supports four different roles, so more granular RBAC isn't supported.

## Spark pool comparison

The following table compares the features and specifications of Azure Synapse Spark and Fabric Spark pools:

|Spark setting | Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Live Pool (pre-warm instances) | - | Yes, Starter pools |
| Custom Pool Creation| Yes | Yes |
| Spark Versions (Runtime) | 2.4, 3.1, 3.2, 3.3 | 3.3, 3.4 |
| Autoscale | Yes | Yes |
| Dynamic Allocation of Executors | Yes, up to 200 | Yes, based on capacity |
| Adjustable Node Sizes	 | Ye, 3-200 | Yes, 1-based on capacity |
| Minimum Node Configuration | 3 nodes | 1 node |
| Node Size Family | Memory Optimized, GPU accelerated | Memory Optimized |
| Node Size | Small-XXXLarge | Small-XXLarge |
| Autopause | Yes, customizable minimum 5 minutes | Yes, noncustomizable 2 minutes |
| High Concurrency | No | Yes |
| V-Order | No | Yes |
| Spark Autotune | No | Yes |
| Concurrency limits | Fixed | Variable based on capacity |
| Multiple Spark pools | Yes | Yes (Environments) |
| Intelligent Cache | Yes  | Yes |
| Toggle for Session Level Packages | Yes | Session libraries always available |
| API/SDK Support | Yes | No |


- **Runtime**: Spark 2.4, 3.1, and 3.2 versions aren't supported in Fabric. Fabric Spark supports Spark 3.3 with Delta 2.2 within [Runtime 1.1](runtime-1-1.md) and Spark 3.4 with Delta 2.4 within [Runtime 1.2](runtime-1-2.md). 
- **Autoscale**: In Azure Synapse Spark, the pool can scale up to 200 nodes regardless of the node size. In Fabric, the maximum number of nodes is subjected to node size and provisioned capacity. See the following example for the F64 SKU.

    | Spark pool size | Azure Synapse Spark | Fabric Spark (Custom Pool, SKU F64) |
    | -- | -- | -- |
    | Small | Min: 3, Max: 200 | Min: 1, Max: 32 |
    | Medium | Min: 3, Max: 200 | Min: 1, Max: 16 |
    | Large | Min: 3, Max: 200 | Min: 1, Max: 8 |
    | X-Large | Min: 3, Max: 200 | Min: 1, Max: 4 |
    | XX-Large | Min: 3, Max: 200 | Min: 1, Max: 2 |

- **Adjustable node sizes**: In Azure Synapse Spark you can go up to 200 nodes. In Fabric, the number of nodes you can have in your custom Spark pool depends on your node size and Fabric capacity. Capacity is a measure of how much computing power you can use in Azure. One way to think of it is that two Spark VCores (a unit of computing power for Spark) equals one capacity unit. For example, a Fabric Capacity SKU F64 has 64 capacity units, which is equivalent to 128 Spark VCores. So, if you choose a small node size, you can have up to 32 nodes in your pool (128/4 = 32). Then, the total of VCores in the capacity/VCores per node size = total number of nodes available. Learn more [Spark compute](spark-compute.md).
- **Node size family**: Fabric Spark pools only support [Memory Optimized SKUs](spark-compute.md) for now. If you're using GPU-accelerated SKU Spark pool in Azure Synapse, they aren't available in Fabric.
- **Node size**: xxlarge node size comes with 432 GB of memory in Azure Synapse, while the same node size has 512 GB in Fabric including 64 VCores. The rest of the node sizes (small through xlarge) have the same VCores and memory in both [Azure Synapse](/azure/synapse-analytics/spark/apache-spark-pool-configurations) and [Fabric](spark-compute.md).
- **Automatic pausing**: if enabled in Azure Synapse Spark, the Apache Spark pool will automatically pause after a specified amount of idle time. This setting is configurable in Azure Synapse (minimum 5 minutes), but custom pools have [a noncustomizable default autopause duration of 2 minutes](create-custom-spark-pools.md) in Fabric after the session expires. The default session expiration is set to 20 minutes in Fabric. 
- **High concurrency**: Fabric supports [high concurrency in Notebooks](high-concurrency-overview.md).
- **Multiple Spark pools**: If you want to have multiple Spark pools, use Environments in Fabric to select a pool by notebook or Spark job. 
- **Allow session level packages**: in Azure Synapse Spark, you can enable/disable session level packages in a pool. Session level packages are always allowed in Fabric Spark pools.

## Spark Configurations comparison

Spark configurations can be applied at different levels:

- **Environment level**: those configurations are used as the default configuration for all jobs in the environment.
- **Inline level**: you can configure Spark configurations inline using notebooks and SJD.

    | Spark configuration| Azure Synapse Spark | Fabric Spark |
    | -- | -- | -- |
    | Environment level | Yes, Pools | Yes, Environments |
    | Inline | Yes | Yes |
    | Import/export | Yes | Yes (.yml from Environments) |
    | API/SDK Support | Yes | No |

  While both options are supported in Azure Synapse Spark and Fabric, there are some considerations:

- **Environment level**: In Azure Synapse, you can define multiple Spark configurations and assign them to different Spark pools. You can do that in Fabric by using Environments. 
- **Inline**: In Azure Synapse, both notebooks and Spark jobs support attaching different Spark configurations. In Fabric, session level configurations are customized with ```spark.conf.set(<conf_name>, <conf_value>)``` setting. For batch jobs, configurations can also be applied via SparkConf.  
- **Import/export**: this option for Spark configurations is available in the Fabric environment artifact. 
- **Other considerations:**
    
    - **Immutable Spark configurations**: Some Spark configurations are immutable. If you get ``` AnalysisException: Can't modify the value of a Spark config: <config_name>. See also 'https://spark.apache.org/docs/latest/sql-migration-guide.html#ddl-statements'``` means that that property is immutable. See the list of immutable Spark configurations here.
    - **FAIR scheduler**: Azure Synapse uses First in First Out (FIFO) by default, FAIR in Fabric Spark. 
    - [V-order](delta-optimization-and-v-order.md): write-time optimization applied to the parquet files enabled by default in Fabric Spark pools. This option is suitable for heavy read scenarios (optimized Delta tables) but might add extra write overhead. 
    - [Optimized write](/azure/synapse-analytics/spark/optimize-write-for-apache-spark): This functionality is disabled by default in Azure Synapse but enabled by default for Fabric Spark. It reduces the number of files written and aims to increase the individual file size of the written data. It dynamically optimizes partitions while generating files with a default 128-MB size (this configuration can be changed).

## Spark Libraries comparison

Spark libraries can be applied at different levels:

- **Workspace level**: you cannot upload/install these libraries to your workspace and later assign them to a specific Spark pool in Fabric. Libraries can be managed within an Environment.
- **Environment level**: you can upload/install these packages to an environment. Environment-level libraries are available to all notebooks and SJD running on the environment.
- **Inline**: in addition to environment-level libraries, you can also specify inline libraries. For example, at the beginning of a notebook session.

| Spark library | Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Workspace level | Yes | No |
| Environment level | Yes, Pools | Yes, Environments |
| Inline | Yes | Yes |
| Import/Export | Yes | Yes |
| API/SDK Support | Yes | No |

**For Python, Scala/Java, and R, see the summary of all library management behaviors currently available in Fabric [library management](library-management.md)**. There are some considerations:

- **Inline**: ``` %%configure``` magic command is still [not fully supported on Fabric at this moment](library-management.md). Don't use it to bring *.jar* file to your notebook session.
- **Other considerations:**
    - Fabric and Azure Synapse share a common core of Spark, but they can slightly differ in different support of their runtime libraries. Typically, using code is compatible with some exceptions. In that case, users might need compilation, the addition of custom libraries, and adjusting syntax. See all Fabric Spark pool libraries [here](https://github.com/microsoft/fabric-migration/tree/main/data-engineering/spark-pool-libraries).
    - When migrating workloads from Azure Synapse Spark to Fabric, users are required to manually verify the compatibility of libraries in Fabric. We recommend the following steps:
        * Initially, users should execute their notebooks or SJDs in Fabric to identify any missing libraries. Utilize the library management feature to add any libraries that aren't present.
        * Later, users should compile a list of libraries used in Azure Synapse and compare it against the libraries available in Fabric. Utilize the library management feature to install any necessary libraries not already available in Fabric.

## Notebook comparison

Notebooks and Spark job definitions (SJD) are primary code items for developing Apache Spark jobs in Fabric. There are some considerations between [Azure Synapse Spark notebooks](/azure/synapse-analytics/spark/apache-spark-development-using-notebooks#active-session-management) and [Fabric Spark notebooks](how-to-use-notebook.md):

|Notebook capability| Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Import or export | Yes | Yes |
| Session Configuration | Yes, UI and inline | Yes, UI (Environment) and inline |
| IntelliSense | Yes | Yes |
| mssparkutils | Yes | Yes* |
| Notebook Resources | No | Yes |
| Collaborate | No | Yes |
| High Concurrency | No | Yes |
| .NET for Spark C# | Yes* | No |
| Pipeline Activity Support | Yes | Yes |
| Built-in Scheduled Run Support | No | Yes |
| API or SDK Support | Yes | Yes |

- **mssparkutils**: since Linked services aren't supported in Fabric yet, only ```getToken``` and ```getSecret``` are supported for now in Fabric for ```mssparkutils.credentials```. ```mssparkutils.env``` isn't supported.
- **Notebooks resources**: Fabric notebook experience provides a Unix-like file system to help you manage your folders and files. Learn more [Fabric notebooks](how-to-use-notebook.md).
- **Collaborate**: Fabric notebook is a collaborative item that supports multiple users editing the same notebook. Learn more [Fabric notebooks](how-to-use-notebook.md).
- **High concurrency**: In Fabric, you could attach notebooks to the high concurrency session. This option is an alternative for users using ThreadPoolExecutor in Azure Synapse. Learn more [configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md). 
- **.NET for Spark C#**: Fabric doesn't support .NET Spark (C#). However, the recommendation is that users with [existing workloads written in C# or F# migrate to Python or Scala](/azure/synapse-analytics/spark/spark-dotnet).
- **Built-in scheduled run support**: Fabric supports scheduled runs for notebooks.
- **Other considerations:**
    - You can use features inside the Notebook that are only supported in a specific version of Spark. Remember that Spark 2.4 and 3.1 aren't supported in Fabric.
    - If your notebook or Spark job is using a linked service with different data source connections or mount points, you should modify your Spark jobs to use alternative methods for handling connections to external data sources and sinks. Use Spark code to connect to data sources using available Spark libraries.

## Spark job definition comparison

In terms of Spark job definition, the following are some important considerations:

|Spark job capability| Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| PySpark | Yes | Yes |
| Scala | Yes | Yes |
| .NET for Spark C# | Yes* | No |
| SparkR | No | Yes |
| Import or export | Yes (UI) | No |
| Pipeline Activity Support | Yes | No |
| Built-in Scheduled Run Support | No | Yes |
| Retry Policies | No | Yes |
| API/SDK Support | Yes | Yes |

- **Spark jobs**: you can bring your .py/.R/jar files. Fabric supports SparkR. A Spark job definition supports reference files, command line arguments, Spark configurations, and lakehouse references.
- **Import/export**: in Azure Synapse, you can import/export JSON-based Spark job definition from the UI. This feature isn't available yet in Fabric.
- **.NET for Spark C#**: Fabric doesn't support .NET Spark (C#). However, the recommendation is that users with [existing workloads written in C# or F# migrate to Python or Scala](/azure/synapse-analytics/spark/spark-dotnet).
- **Pipeline activity support**: Data pipelines in Fabric don't include Spark job definition activity yet. You could use scheduled runs if you want to run your Spark job periodically.
- **Built-in scheduled run support**: Fabric supports [scheduled runs for a Spark Job Definition](run-spark-job-definition.md).
- **Retry policies** enable users to run Spark structured streaming jobs indefinitely.

## Data and Pipelines comparison

Data and pipeline considerations:

### Data

- If the firewall is enabled on ADLS Gen2, you can use workspace identity as a trusted service in the storage firewall.
- Users can create shortcuts within the Files section and Tables section of the lakehouse. Autodiscovery within the Tables section only works with Delta tables.
- Shortcuts to ADLS Gen2 support read/write.

### pipelines

- Spark Job Definition pipeline activity isn't supported in Fabric Data Factory pipelines.

## Hive Metastore (HMS) comparison

In terms of Hive MetaStore (HMS), there are some differences:

|HIve store type| Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Internal metastore | Yes | Yes (lakehouse) |
| External metastore | Yes | No |

- **External metastore**: Fabric currently doesn't support a Catalog API and access to an external Hive MetaStore (HMS). Metadata import/export scripts are provided to import Spark catalog metadata into Fabric. Learn more about Metadata migration to migrate your databases, external and managed tables, and partitions to Fabric.
- **Other considerations:**
    - **Autodiscovery of Delta tables**: if you use Delta tables only, one way to import them to the metastore is by leveraging the auto-discovery over OneLake shortcuts within the "Tables" section in the lakehouse explorer. It registers existing Delta tables in lakehouse's internally managed metastore, allowing users to query Spark catalog objects produced by Azure Synapse Spark. However, it requires creating a shortcut per table now (for example, with multi-select) nested shortcuts (for example a shortcut to a folder that contains multiple Delta tables) aren't supported yet. See Metadata migration for more details.
    - **3-part naming**: Fabric doesn't support 3-part naming for now. So when importing multiple databases from the metastore to Fabric lakehouse, you can create one lakehouse per database, or (ii) move all tables from different databases to a single lakehouse. The former is used on Metadata migration.

## Next steps

- To learn more about lakehouses, see [What is a lakehouse in Microsoft Fabric?](lakehouse-overview.md)

- To get started with a lakehouse, see [Create a lakehouse in Microsoft Fabric](create-lakehouse.md).

- To learn more about Apache Spark job definitions, see [What is an Apache Spark job definition?](spark-job-definition.md)

- To get started with an Apache Spark job definition, see [How to create an Apache Spark job definition in Fabric](create-spark-job-definition.md).

- To learn more about notebooks, see [Author and execute the notebook](author-execute-notebook.md).

- To get started with pipeline copy activity, see [How to copy data using copy activity](..\data-factory\copy-data-activity.md).

- [Lakehouse end-to-end scenario: overview and architecture](tutorial-lakehouse-introduction.md)
