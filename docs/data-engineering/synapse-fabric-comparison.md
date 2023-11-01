---
title: Comparison between Azure synapse and Microsoft Fabric.
description: There are some differences between Azure Synapse Spark and Fabric Spark support. Below is a comparison table outlining the key differences. 
ms.reviewer: snehagunda
ms.author: jejiang
author: jejiang
ms.topic: overview
ms.custom: build-2023, build-2023-dataai, build-2023-fabric
ms.date: 11/01/2023
---

# Comparison between Azure synapse and Microsoft Fabric

Overview

## Azure Synapse Spark vs. Fabric Spark [NEW DOC]

There are some differences between Azure Synapse Spark and Fabric Spark support. Below is a comparison table outlining the key differences. Further down, a more in-depth analysis is available, detailing the distinctions in aspects such as Spark pools, configuration, libraries, notebooks, and Spark Job Definition (SJD).

[!INCLUDE [preview-note](../includes/preview-note.md)]

| | **Azure Synapse Spark** | **Fabric Spark** |
| --- | -- | -- |
| Spark Pools | Spark Pool <br>- <br>-| Starter Pool / Custom Pool <br>V-Order <br>High Concurrency (notebooks and pipelines - planned) |
| Spark Configurations | Pool level <br>Notebook/SJD level| Environment level <br>Notebook/SJD level|
| Spark Libraries | Workspace level packages <br>Pool level packages <br>Inline packages | - <br>Environment libraries <br>Inline libraries|
| Resources | Notebook (Python, Scala, Spark SQL, R, .Net) <br>Spark Job Definition (Python, Scala, .Net) <br>Pipelines <br>Spark-related pipeline activities (Notebook, SJD)| Notebook (Python, Scala, Spark SQL, R) <br>Spark Job Definition (Python, Scala, R) <br>Pipelines <br> Spark-related pipeline activities (Notebook)|
| Data | Primary storage (ADLS Gen2) <br>Data residency (Cluster/region based) | Primary storage (OneLake) <br>Data residency (Capacity/region based) |
| Metadata | Internal metastore <br>External metastore (using Azure SQL DB for HMS) | Internal metastore (lakehouse) <br>-|
| Connections | Connector type (Linked services) <br>Data Sources (13) <br>Data Source conn. with workspace identity | Connector type (DMTS*) <br>Data Sources (Dataflow Gen2) <br>Data Source conn. with workspace identity (Planned) |
| Security | RBAC and access control (11 roles at workspace level) <br>Storage ACLs (ADLS Gen2) <br>Private Links <br>Managed VNet (Network Isolation) <br>Fabric Workspace Identity (FWI) <br>Data Exfiltration Protection <br>IP Firewall <br>Trusted Service for Storage Firewall bypass (with workspace identity) <br>Service Tags <br>- <br>Key Vault (via mssparkutils and Linked service) | RBAC and access control (4 roles at workspace level) <br>Storage ACLs (Lakehouse security (planned)) <br>Private Links (Planned (only Control Plane)) <br>- <br>Fabric Workspace Identity (FWI) <br>- <br>- (only Control Plane) <br>Trusted Service for Storage Firewall bypass (Planned) <br>Service Tags <br>Policy Management-Spark pools (Planned) <br>Key Vault (via mssparkutils (public endpoint)) |
| DevOps | Azure DevOps integration <br>CI/CD (No built-in support) | Azure DevOps integration(Planned) <br>CI/CD (Deployment pipelines-planned)|
| Developer Experience | IDE Integration (IntelliJ) <br>Studio UI <br>Collaboration (through workspaces) <br>Livy API <br>API/SDK <br>mssparkutils | IDE Integration (VSCode) <br>Studio UI <br>Collaboration (through workspaces and sharing options) <br>- <br>API/SDK <br>mssparkutils |
| Logging and Monitoring | Spark Advisor <br>Built-in Monitoring Pools and Jobs (through Synapse Studio) <br>Spark History Server <br>Prometheus/Grafana <br>Log Analytics <br>Storage Account <br>Event Hubs | Spark Advisor <br>Built-in Monitoring Pools and Jobs (through Monitoring Hub) <br>Spark History Server <br>- <br>- <br>- <br>- |
| BC, HA & Disaster Recovery | BCDR (data)-via ADLS Gen2 | BCDR (data)-OneLake (planned) |

Not one-to-one mapping between Linked services and DMTS. Same for Synapse vs Fabric APIs. 

## Spark Pool considerations

Below is a table comparing the features and specifications of Azure Synapse Spark and Fabric Spark pools:

|  | Azure Synapse Spark | Fabric Spark |
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
| High Concurrency | No | Yes, notebooks and pipelines (planned) |
| V-Order | No | Yes |
| Spark Autotune | No | Yes |
| Concurrency limits | Fixed | Variable based on capacity |
| Multiple Spark Pools | Yes | Yes (Environments) |
| Intelligent Cache | Yes  | Yes |
| Toggle for Session Level Packages | Yes | Session libraries always available |
| API/SDK Support | Yes | No |

- Runtime: Spark 2.4, 3.1 and 3.2 versions are not supported in Fabric. Fabric Spark supports Spark 3.3 with Delta 2.2 within Runtime 1.1 and Spark 3.4 with Delta 2.4 within Runtime 1.2. 
- Autoscale: In Azure Synapse Spark the pool can scale up to 200 nodes regardless of the node size. In Fabric, the maximum number of nodes is subjected to node size and provisioned capacity. See an example below for F64 SKU.

    |  | Azure Synapse Spark | Fabric Spark (Custom Pool, SKU F64) |
    | -- | -- | -- |
    | Small | Min: 3, Max: 200 | Min: 1, Max: 32 |
    | Medium | Min: 3, Max: 200 | Min: 1, Max: 16 |
    | Large | Min: 3, Max: 200 | Min: 1, Max: 8 |
    | X-Large | Min: 3, Max: 200 | Min: 1, Max: 4 |
    | XX-Large | Min: 3, Max: 200 | Min: 1, Max: 2 |

- Adjustable node sizes: In Azure Synapse Spark you can go up to 200 nodes. In Fabric, the number of nodes you can have in your custom Spark pool depends on your node size and Fabric capacity. Capacity is a measure of how much computing power you can use in Azure. One way to think of it is that two Spark vcores (a unit of computing power for Spark) equals one capacity unit. For example, a Fabric capacity SKU F64 has 64 capacity units, which is equivalent to 128 Spark vcores. So, if you choose small node size, you can have up to 32 nodes in your pool (128/4 = 32). Then, total of vcores in the capacity / vcores per node size = total number of nodes available. Learn more [here](https://learn.microsoft.com/en-us/fabric/data-engineering/spark-compute).
- Node size family: Fabric Spark Pools only support [Memory Optimized SKUs](https://learn.microsoft.com/en-us/fabric/data-engineering/spark-compute) for now. If you're using GPU accelerated SKU Spark pool in Azure Synapse, those are not available in Fabric.
- Node size: xxlarge node size comes with 432gb of memory in Azure Synapse, while the same node size has 512gb in Fabric including 64vcores. The rest of node sizes (small-xlarge) keep the same vcores and memory both in [Azure Synapse](https://learn.microsoft.com/en-us/azure/synapse-analytics/spark/apache-spark-pool-configurations) and [Fabric](https://learn.microsoft.com/en-us/fabric/data-engineering/spark-compute).
- Automatic pausing: if enabled in Azure Synapse Spark, the Apache Spark pool will automatically pause after a specified amount of idle time. This is configurable in Azure Synapse (minimum 5 minutes), but custom pools have [a noncustomizable default autopause duration of 2 minutes](https://learn.microsoft.com/en-us/fabric/data-engineering/create-custom-spark-pools) in Fabric after the session expires. The default session expiration is set to 20 minutes in Fabric. 
- High concurrency: Fabric supports [high concurrency in Notebooks](https://learn.microsoft.com/en-us/fabric/data-engineering/high-concurrency-overview) and high concurrency in pipelines is  planned. See [Data Engineering roadmap in Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/release-plan/data-engineering).
- Multiple Spark pools: If you want to keep multiple Spark pools, pool selection by notebook or Spark job is supported by Environments in Fabric. 
- Allow session level packages: in Azure Synapse Spark, users have an option to enable/disable session level packages in a pool. Session level packages are always allowed in Fabric Spark pools.

Please check the Spark pools section for options on transitioning Spark pools from Azure Synapse to Fabric.

## Spark Configurations considerations

Spark configurations can be applied at different levels:

- Environment level: those configurations will be used as the default configuration for all jobs in the environment.
- Inline level: you can configure Spark configurations inline using notebooks and SJD.

    |  | Azure Synapse Spark | Fabric Spark |
    | -- | -- | -- |
    | Environment level | Yes, Pools | Yes, Environments |
    | Inline | Yes | Yes |
    | Import/export | Yes | Yes (.yml from Environments) |
    | API/SDK Support | Yes | No |

While both options are supported in Azure Synapse Spark and Fabric, there are some considerations:

- Environment level: In Azure Synapse, you can define multiple Spark configurations and assign them to different Spark pools. You can do that in Fabric by using Environments. 
- Inline: In Azure Synapse, both notebooks and Spark jobs support attaching different Spark configurations. In Fabric, session level configurations can be customized by  spark.conf.set(<conf_name>, <conf_value>). For batch job, configurations can also be applied via SparkConf.  
- Import/export: this option for Spark configurations is available in Fabric environment artifact. 
- Additional considerations:
    
    - **Immutable Spark configurations**: Some Spark configurations are immutable. If you're getting ``` AnalysisException: Cannot modify the value of a Spark config: <config_name>. See also 'https://spark.apache.org/docs/latest/sql-migration-guide.html#ddl-statements'``` means that that property is immutable. See the list of immutable Spark configurations here.
    - **FAIR scheduler**: Azure Synapse uses FIFO by default, FAIR in Fabric Spark. 
    - [V-order](https://learn.microsoft.com/en-us/fabric/data-engineering/delta-optimization-and-v-order?tabs=sparksql): write-time optimization applied to the parquet files enabled by default in Fabric Spark pools. This is suitable for heavy read scenarios (optimized Delta tables) but may add additional write overhead. 
    - [Optimized write](https://learn.microsoft.com/en-us/azure/synapse-analytics/spark/optimize-write-for-apache-spark): This is disabled by default in Azure Synapse but enabled by default for Fabric Spark. This reduces the number of files written and aims to increase individual file size of the written data. It dynamically optimizes partitions while generating files with a default 128 MB size (this can be changed).

Please check the Spark configurations section for options on moving your Spark configurations to Fabric.

## Spark Libraries considerations

Spark libraries can be applied at different levels:

- Workspace level: you cannot upload/install these libraries to your workspace and later assign them to a specific Spark pool in Fabric. Libraries can be managed within an Environment.
- Environment level: you can upload/install these libraries packages to an environment. Environment-level libraries are available to all notebooks and SJD running on the environment.
- Inline: in addition to environment level libraries, you can also specify inline libraries e.g., at the beginning of a notebook session.

|   | Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Workspace level | Yes | No |
| Environment level | Yes, Pools | Yes, Environments |
| Inline | Yes | Yes |
| Import/Export | Yes | Yes |
| API/SDK Support | Yes | No |

**For Python, Scala/Java and R, see the summary all library management behaviors currently available in Fabric [here](https://learn.microsoft.com/en-us/fabric/data-engineering/library-management)**. There are some considerations:

- Inline: ``` %%configure``` magic command is still [not fully supported on Fabric at this moment](https://learn.microsoft.com/en-us/fabric/data-engineering/library-management). Please don't use it to bring *.jar* file to your notebook session.
- Additional considerations:
    - Fabric and Azure Synapse share a common core of Spark, but they can slightly differ in different support of their runtime libraries. Typically, using code will be compatible with some exceptions. In that case, users may need compilation, the addition of custom libraries and adjusting syntax. See all Fabric Spark pool libraries [here](https://github.com/microsoft/fabric-migration/tree/main/data-engineering/spark-pool-libraries).
    - When migrating workloads from Azure Synapse Spark to Fabric, users are required to manually verify the compatibility of libraries in Fabric. We recommend the following steps:
        - Initially, users should execute their notebooks or SJDs in Fabric to identify any missing libraries. Utilize the library management feature to add any libraries that are not present.
        - Subsequently, users should compile a list of libraries used in Azure Synapse and compare it against the libraries available in Fabric. Utilize the library management feature to install any necessary libraries not already available in Fabric.

Please check the Spark libraries section for options on moving your Spark configurations to Fabric.

## Notebook considerations

Notebooks and Spark Job Definitions (SJD) are primary code items for developing Apache Spark jobs in Fabric. There are some considerations between [Azure Synapse Spark notebooks](https://learn.microsoft.com/en-us/azure/synapse-analytics/spark/apache-spark-development-using-notebooks#active-session-management) and [Fabric Spark notebooks](https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook):

|   | Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Import/Export | Yes | Yes |
| Session Configuration | Yes, UI and inline | Yes, UI (Environment) and inline |
| IntelliSense | Yes | Yes |
| mssparkutils | Yes | Yes* |
| Notebook Resources | No | Yes |
| Collaborate | No | Yes |
| High Concurrency | No | Yes |
| .NET for Spark C# | Yes* | No |
| Pipeline Activity Support | Yes | Yes |
| Built-in Scheduled Run Support | No | Yes |
| API/SDK Support | Yes | Yes |

- **mssparkutils**: since Linked services are not supported in Fabric yet, only ```getToken``` and ```getSecret``` are supported for now in Fabric for ```mssparkutils.credentials```. ```mssparkutils.env``` is not supported.
- **Notebooks resources**: Fabric notebook experience provides a Unix-like file system to help you manage your folders and files. Learn more [here](https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook).
- **Collaborate**: Fabric notebook is a collaborative item that supports multiple users editing the same notebook. Learn more [here](https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook).
- **High concurrency**: In Fabric, you could attach notebooks to the high concurrency session. This could be a good alternative for users using ThreadPoolExecutor in Azure Synapse. Learn more [here](https://learn.microsoft.com/en-us/fabric/data-engineering/configure-high-concurrency-session-notebooks). 
- **.NET for Spark C#**: Fabric does not support .Net Spark (C#). However, the recommendation is that users with [existing workloads written in C# or F# migrate to Python or Scala](https://learn.microsoft.com/en-us/azure/synapse-analytics/spark/spark-dotnet).
- Built-in scheduled run support: Fabric supports scheduled runs for notebooks.
- Additional considerations:
    - You can be using features inside the Notebook that are only supported in a specific version of Spark. Remember that Spark 2.4 and 3.1 are not supported in Fabric.
    - If your notebook or Spark job is using a linked service with different data source connections and/or mount points, you will need to modify your Spark jobs to use alternative methods for handling connections to external data sources and sinks. Use Spark code to connect to data sources using available Spark libraries.

Please check the notebooks section for options on moving your Spark notebooks to Fabric.

## Spark Job Definition considerations

In terms of Spark job definition, these are important considerations:

|  | Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| PySpark | Yes | Yes |
| Scala | Yes | Yes |
| .NET for Spark C# | Yes* | No |
| SparkR | No | Yes |
| Import/Export | Yes (UI) | No |
| Pipeline Activity Support | Yes | No |
| Built-in Scheduled Run Support | No | Yes |
| Retry Policies | No | Yes |
| API/SDK Support | Yes | Yes |

- **Spark jobs**: you can bring your .py/.R/jar files. SparkR is now supported by Fabric. A SJD supports reference files, command line arguments, Spark configurations and lakehouse references.
- **Import/export**: in Azure Synapse Spark you can import/export json-based Spark job definition from the UI. This feature is not available yet in Fabric.
- **.NET for Spark C#**: Fabric does not support .Net Spark (C#). However, the recommendation is that users with [existing workloads written in C# or F# migrate to Python or Scala](https://learn.microsoft.com/en-us/azure/synapse-analytics/spark/spark-dotnet).
- **Pipeline activity support**: Data pipelines in Fabric don't include Spark job definition activity yet. You could use scheduled runs if you want to run your Spark job periodically.
- **Built-in scheduled run support**: Fabric supports [scheduled runs for SJD](https://learn.microsoft.com/en-us/fabric/data-engineering/run-spark-job-definition?source=recommendations).
- **Retry policies** enable users to run Spark structured streaming jobs indefinitely.

Please check the Spark Job Definition section for options on moving your Spark job definition to Fabric.

## Data and Pipelines considerations

Data and pipelines considerations:

- If firewall is enabled on ADLS Gen2, users will be able to use workspace identity as trusted service in storage firewall (planned).
- Users can create shortcuts within the Files section and Tables section of the lakehouse. Auto-discovery within the Tables section only works with Delta tables.
- Shortcuts to ADLS Gen2 support read/write.
- SJD pipeline activity is not supported in Fabric Data Factory pipelines.

Please check the data migration and pipelines migration sections for options on moving and enabling existing data in Fabric and migrating Spark related data pipeline activities to Fabric.

## Hive Metastore (HMS) considerations

In terms of Hive MetaStore (HMS), there are some differences:

|   | Azure Synapse Spark | Fabric Spark |
| -- | -- | -- |
| Internal metastore | Yes | Yes (lakehouse) |
| External metastore | Yes | No |

- **External metastore**: Fabric currently does not support a Catalog API and access to an external Hive MetaStore (HMS). Metadata import/export scripts are provided to import Spark catalog metadata into Fabric. Learn more about Metadata migration to migrate your databases, external and managed tables, partitions to Fabric.
- Additional considerations:
    - **Auto-discovery of Delta tables**: if you just using Delta tables, one way of importing those to the metastore is by leveraging the auto discovery over OneLake shortcuts within the “Tables” section in the lakehouse explorer. That will register existing Delta tables in lakehouse’s internal managed metastore, allowing users to query Spark catalog objects produced by Azure Synapse Spark. However, this requires to create a shortcut per table now (e.g. with multiselect) nested shortcuts (e.g. a shortcut to a folder that contains multiple Delta tables) are not supported yet. See Metadata migration for more details.
    - **3-part naming**: Fabric does not support 3-part naming for now but [planned](https://learn.microsoft.com/en-us/fabric/release-plan/data-engineering#security). So when importing multiple databases from the metastore to Fabric lakehouse, you can (i) create one lakehouse per database, or (ii) move all tables from different databases to a single lakehouse. The former is used on Metadata migration.

## Other considerations

- **DMTS integration**: Users still cannot leverage DMTS via notebook and SJDs. This is planned.
- **Git integration**: Git integration and versioning of Spark related items is [in the roadmap](https://learn.microsoft.com/en-us/fabric/release-plan/data-engineering#dit) but not supported yet in Fabric.
- **Managed Identity**: Run notebooks/Spark jobs using the workspace identity and support for managed identity for Azure KeyVault in notebooks not supported yet in Fabric.
- **Livy API and way to submit and managing Spark jobs**: Livy API is in the roadmap but not exposed yet in Fabric. Users need to create notebooks/SJD using the Fabric UI. 
- **CI/CD**: Users can leverage Fabric API/SDK, not built-in support with Deployment Pipelines yet.
- **Spark logs and metrics**: In Azure Synapse you can emit Spark logs and metrics to your own storage, such as Log Analytics, Blob, and Event Hubs.  Similarly, you can get list of spark applications for the workspace from the API. Both capabilities are currently unavailable in Fabric.
- **JDBC**: JDBC connections support not available in Fabric.
- **Concurrency limits**: In terms of concurrency, Azure Synapse Spark has a limit of 50 simultaneous running jobs per Spark pool, and 200 queued jobs per Spark pool. The maximum active jobs are 250 per Spark pool and 1000 per workspace. In Microsoft Fabric Spark, the concurrency limits are defined by capacity SKU with varying limits on max concurrent jobs ranging from 1 to 512. Also, Microsoft Fabric Spark has a dynamic reserve-based throttling system to manage concurrency and ensure smooth operation even during peak usage times. Learn more about [Spark concurrency limits](https://learn.microsoft.com/en-us/fabric/data-engineering/spark-job-concurrency-and-queueing) and [Fabric capacities](https://blog.fabric.microsoft.com/en-us/blog/fabric-capacities-everything-you-need-to-know-about-whats-new-and-whats-coming?ft=All). 
- **Workload level RBAC**: Fabric only supports four different roles, so more granular RBAC is not supported.

## Next steps

Get started with the Data Engineering experience:

- To learn more about lakehouses, see [What is a lakehouse in Microsoft Fabric?](lakehouse-overview.md)

- To get started with a lakehouse, see [Create a lakehouse in Microsoft Fabric](create-lakehouse.md).

- To learn more about Apache Spark job definitions, see [What is an Apache Spark job definition?](spark-job-definition.md)

- To get started with an Apache Spark job definition, see [How to create an Apache Spark job definition in Fabric](create-spark-job-definition.md).

- To learn more about notebooks, see [Author and execute the notebook](author-execute-notebook.md).

- To get started with pipeline copy activity, see [How to copy data using copy activity](..\data-factory\copy-data-activity.md).
