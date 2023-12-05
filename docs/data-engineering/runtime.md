---
title: Apache Spark runtime in Fabric
description: Learn about the Apache Spark-based runtimes available in Fabric.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Apache Spark Runtimes in Fabric

Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark that enables the execution and management of data engineering and data science experiences. It combines key components from both internal and open-source sources, providing customers with a comprehensive solution. For simplicity, we refer to Microsoft Fabric Runtime powered by Apache Spark as Fabric Runtime.

Major components of Fabric Runtime:

- **Apache Spark** - a powerful open-source distributed computing library that enables large-scale data processing and analytics tasks. Apache Spark provides a versatile and high-performance platform for data engineering and data science experiences.

- **Delta Lake** - an open-source storage layer that brings ACID transactions and other data reliability features to Apache Spark. Integrated within Fabric Runtime, Delta Lake enhances data processing capabilities and ensures data consistency across multiple concurrent operations.

- **Default-level packages for Java/Scala, Python, and R** - packages that support diverse programming languages and environments. These packages are automatically installed and configured, allowing developers to apply their preferred programming languages for data processing tasks.

- The Microsoft Fabric Runtime is built upon **a robust open-source operating system**, ensuring compatibility with various hardware configurations and system requirements.

Below, you find a comprehensive comparison of key components, including Apache Spark versions, supported operating systems, Java, Scala, Python, Delta Lake, and R, for both Runtime 1.1 and Runtime 1.2 within the Microsoft Fabric platform.

|                       | **[Runtime 1.1](./runtime-1-1.md)** | **[Runtime 1.2](./runtime-1-2.md)** |
|-----------------------|-------------------------------------|-------------------------------------|
| **Apache Spark**      | 3.3.1                               | 3.4.1                               |
| **Operating System**  | Ubuntu 18.04                        | Mariner 2.0                         |
| **Java**              | 8                                   | 11                                  |
| **Scala**             | 2.12.15                             | 2.12.17                             |
| **Python**            | 3.10                                | 3.10                                |
| **Delta Lake**        | 2.2.0                               | 2.4.0                               |
| **R**                 | 4.2.2                               | 4.2.2                               |

Visit [Runtime 1.1](./runtime-1-1.md) or [Runtime 1.2](./runtime-1-2.md) to explore details, new features, improvements, and migration scenarios for the specific runtime version.

## Fabric optimizations

In Microsoft Fabric, both the Spark engine and the Delta Lake implementations incorporate platform-specific optimizations and features. These features are designed to use native integrations within the platform. It's important to note that all these features can be disabled to achieve standard Spark and Delta Lake functionality. The Fabric Runtimes for Apache Spark encompass:
* The complete open-source version of Apache Spark.
* A collection of nearly 100 built-in, distinct query performance enhancements. These enhancements include features like partition caching (enabling the FileSystem partition cache to reduce metastore calls) and Cross Join to Projection of Scalar Subquery.
* Built-in intelligent cache.

Within the Fabric Runtime for Apache Spark and Delta Lake, there are native writer capabilities that serve two key purposes:

1. They offer differentiated performance for writing workloads, optimizing the writing process.
2. They default to V-Order optimization of Delta Parquet files. The Delta Lake V-Order optimization is crucial for delivering superior read performance across all Fabric engines. To gain a deeper understanding of how it operates and how to manage it, refer to the dedicated article on [Delta Lake table optimization and V-Order](./delta-optimization-and-v-order.md).


## Multiple runtimes support
Fabric supports multiple runtimes, offering users the flexibility to seamlessly switch between them, minimizing the risk of incompatibilities or disruptions.

**By default, all new workspaces use the latest runtime version, which is currently [Runtime 1.2](./runtime-1-2.md).** 

To change the runtime version at the workspace level, go to Workspace Settings > Data Engineering/Science > Spark Compute > Workspace Level Default, and select your desired runtime from the available options.

Once you make this change, all system-created items within the workspace, including Lakehouses, SJDs, and Notebooks, will operate using the newly selected workspace-level runtime version starting from the next Spark Session. If you're currently using a notebook with an existing session for a job or any lakehouse-related activity, that Spark session continue as is. However, starting from the next session or job, the selected runtime version will be applied.

:::image type="content" source="media\workspace-admin-settings\runtime-change.gif" alt-text="Gif showing how to change runtime version.":::

### Consequences of runtime changes on Spark Settings

In general, we aim to migrate all Spark settings. However, if we identify that the Spark setting isn't compatible with Runtime B, we issue a warning message and refrain from implementing the setting.

:::image type="content" source="media\mrs\spark-settings-runtime-change.png" alt-text="Spark Settings Runtime Change.":::


### Consequences of runtime changes on library management

In general, our approach is to migrate all libraries from Runtime A to Runtime B, including both Public and Custom Runtimes. If the Python and R versions remain unchanged, the libraries should function properly. However, for Jars, there's a significant likelihood that they may not work due to alterations in dependencies, and other factors such as changes in Scala, Java, Spark, and the operating system.

The user is responsible for updating or replacing any libraries that don't work with Runtime B. If there's a conflict, which means that Runtime B includes a library originally defined in Runtime A, our library management system will try to create the necessary dependency for Runtime B based on the user's settings. However, the building process will fail if a conflict occurs. In the error log, users can see which libraries are causing conflicts and make adjustments to their versions or specifications.

:::image type="content" source="media\mrs\lm-runtime-change.png" alt-text="Library Management Runtime Change.":::

## Upgrade Delta Lake protocol

Delta Lake features are always backwards compatible, ensuring tables created in a lower Delta Lake version can seamlessly interact with higher versions. However, when certain features are enabled (for example, by using `delta.upgradeTableProtocol(minReaderVersion, minWriterVersion)` method, forward compatibility with lower Delta Lake versions may be compromised. In such instances, it's essential to modify workloads referencing the upgraded tables to align with a Delta Lake version that maintains compatibility.

Each Delta table is associated with a protocol specification, defining the features it supports. Applications that interact with the table, either for reading or writing, rely on this protocol specification to determine if they are compatible with the table's feature set. If an application lacks the capability to handle a feature listed as supported in the table's protocol, It's unable to read from or write to that table.

The protocol specification is divided into two distinct components: the read protocol and the write protocol. Visit the page ["How does Delta Lake manage feature compatibility?"
](https://docs.delta.io/2.4.0/versioning.html#language-python) to read details about it.

:::image type="content" source="media\mrs\delta-upgrade-table-protocol.gif" alt-text="GIF showing the immediate warning when upgradeTableProtocol method is used." lightbox="media\mrs\delta-upgrade-table-protocol.gif":::

Users can execute the command `delta.upgradeTableProtocol(minReaderVersion, minWriterVersion)` within the PySpark environment, and in Spark SQL and Scala. This command allows them to initiate an update on the Delta table. 

It's essential to note that when performing this upgrade, users receive a warning indicating that upgrading the Delta protocol version is a nonreversible process. This means that once the update is executed, it cannot be undone.

Protocol version upgrades can potentially impact the compatibility of existing Delta Lake table readers, writers, or both. Therefore, it's advisable to proceed with caution and upgrade the protocol version only when necessary, such as when adopting new features in Delta Lake.

:::image type="content" source="media\mrs\delta-upgrade-warning.png" alt-text="Screenshot showing the warning when upgrading the delta lake protocol.":::

Additionally, users should verify that all current and future production workloads and processes are compatible with Delta Lake tables using the new protocol version to ensure a seamless transition and prevent any potential disruptions.

## Delta 2.2 vs Delta 2.4 changes

In the latest [Fabric Runtime, version 1.2](./runtime-1-2.md), the default table format (`spark.sql.sources.default`) is now `delta`. In previous versions of [Fabric Runtime, version 1.1](./runtime-1-1.md) and on all Synapse Runtime for Apache Spark containing Spark 3.3 or below, the default table format was defined as `parquet`. Check [the table with Apache Spark configuratios details](./lakehouse-and-delta-tables.md) for  differences between Azure Synapse Analytics and Microsoft Fabric.

All tables created using Spark SQL, PySpark, Scala Spark, and Spark R, whenever the table type is omitted, will create the table as `delta` by default. If scripts explicitly set the table format, that will be respected. The command `USING DELTA` in Spark create table commands becomes redundant. 

Scripts that expect or assume parquet table format should be revised. The following commands are not supported in Delta tables:
* `ANALYZE TABLE $partitionedTableName PARTITION (p1) COMPUTE STATISTICS`
* `ALTER TABLE $partitionedTableName ADD PARTITION (p1=3)`
* `ALTER TABLE DROP PARTITION`
* `ALTER TABLE RECOVER PARTITIONS`
*  `ALTER TABLE SET SERDEPROPERTIES`
*  `LOAD DATA`
*  `INSERT OVERWRITE DIRECTORY`
*  `SHOW CREATE TABLE`
*  `CREATE TABLE LIKE `

## Versioning

Our runtime version numbering, while closely related to Semantic Versioning, follows a slightly different approach. The runtime major version corresponds to the Apache Spark major version. Therefore, Runtime 1 corresponds to Spark version 3. Similarly, the upcoming Runtime 2 will align with Spark 4.0. It's essential to note that between the current runtimes, Runtime 1.1 and Runtime 1.2, changes may occur, including the addition or removal of different libraries. Additionally, our platform offers [a library management feature](./library-management.md) that empowers users to install any desired libraries.

## Related content

- [Runtime 1.2 (Spark 3.4, Java 11, Python 3.10, Delta Lake 2.4)](./runtime-1-2.md)
- [Runtime 1.1 (Spark 3.3, Java 8, Python 3.10, Delta Lake 2.2)](./runtime-1-1.md)
