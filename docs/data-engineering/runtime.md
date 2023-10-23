---
title: Apache Spark runtime in Fabric
description: Gain a deep understanding of the Apache Spark-based runtimes available in Fabric. By learning about unique features, capabilities, and best practices, you can confidently choose Fabric and implement your data-related solutions.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom: build-2023
ms.date: 05/23/2023
---

# Apache Spark Runtime in Fabric

The Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark that enables the execution and management of data engineering and data science experiences. It combines key components from both internal and open-source sources, providing customers with a comprehensive solution. For simplicity, we refer to the Microsoft Fabric Runtime powered by Apache Spark as Fabric Runtime.

[!INCLUDE [preview-note](../includes/preview-note.md)]

Major components of the Fabric Runtime:

- **Apache Spark** - a powerful open-source distributed computing library, to enable large-scale data processing and analytics tasks. Apache Spark provides a versatile and high-performance platform for data engineering and data science experiences.

- **Delta Lake** - an open-source storage layer that brings ACID transactions and other data reliability features to Apache Spark. Integrated within the Microsoft Fabric Runtime, Delta Lake enhances the data processing capabilities and ensures data consistency across multiple concurrent operations.

- **Default-level Packages for Java/Scala, Python, and R** to support diverse programming languages and environments. These packages are automatically installed and configured, allowing developers to apply their preferred programming languages for data processing tasks.

- The Microsoft Fabric Runtime is built upon **a robust open-source operating system**, ensuring compatibility with various hardware configurations and system requirements.

Below, you'll find a comprehensive comparison of key components, including Apache Spark versions, supported operating systems, Java, Scala, Python, Delta Lake, and R, for both Runtime 1.1 and Runtime 1.2 within the Microsoft Fabric platform.

|                       | **[Runtime 1.1](./runtime-1-1.md)**   | **[Runtime 1.2](./runtime-1-2.md)** |
|-----------------------|---------------------------------------|-------------------------------------|
| **Apache Spark**      | 3.3.1                                 | 3.4.1                               |
| **Operating System**  | Ubuntu 18.04                          | Mariner 2.0                         |
| **Java**              | 8                                     | 11                                  |
| **Scala**             | 2.12.15                               | 2.12.15                             |
| **Python**            | 3.10                                  | 3.10                                |
| **Delta Lake**        | 2.2                                   | 2.4                                 |
| **R**                 | 4.2.2                                 | 4.2.2                               |

Please visit [Runtime 1.1](./runtime-1-1.md) or [Runtime 1.2](./runtime-1-2.md) to explore details, new features, improvements, and migration scenarios for the specific runtime version.

## Multiple Runtimes Support
Fabric supports multiple runtimes, offering users the flexibility to seamlessly switch between them, minimizing the risk of incompatibilities or disruptions.

**By default, all new workspaces use the latest stable runtime version, which is currently Runtime 1.1.** 

To change the runtime version at the workspace level, go to Workspace Settings > Data Engineering/Science > Spark Compute > Workspace Level Default, and select your desired runtime from the available options.

Once you make this change, all system-created items within the workspace, including Lakehouses, SJDs, and Notebooks, will operate using the newly selected workspace-level runtime version starting from the next Spark Session. If you are currently using a notebook with an existing session for a job or any lakehouse-related activity, that Spark session will continue as is. However, starting from the next session or job, the selected runtime version will be applied.

:::image type="content" source="media\workspace-admin-settings\runtime-change.gif" alt-text="Gif showing how to change runtime version.":::

### Upgrading Delta Lake

Each Delta table is associated with a protocol specification, defining the features it supports. Applications that interact with the table, either for reading or writing, rely on this protocol specification to determine if they are compatible with the table's feature set. If an application lacks the capability to handle a feature listed as supported in the table's protocol, it will be unable to read from or write to that table.

The protocol specification is divided into two distinct components: the read protocol and the write protocol. Visit the page [How does Delta Lake manage feature compatibility?
](https://docs.delta.io/2.4.0/versioning.html#language-python) to read details about it.

:::image type="content" source="media\mrs\DeltaLakeUpgradeTableProtocol.gif" alt-text="GIF showing the immediate warning when upgradeTableProtocol method is used.":::

Users can execute the command `delta.upgradeTableProtocol(minReaderVersion, minWriterVersion)` within the PySpark environment, as well as in Spark SQL and Scala. This command allows them to initiate an update on the Delta table. 

It's essential to note that when performing this upgrade, users will receive a warning indicating that upgrading the Delta protocol version is a non-reversible process. This means that once the update is executed, it cannot be undone.

Protocol version upgrades can potentially impact the compatibility of existing Delta Lake table readers, writers, or both. Therefore, it is advisable to proceed with caution and upgrade the protocol version only when necessary, such as when adopting new features in Delta Lake.

:::image type="content" source="media\mrs\DeltaLakeUpgradeWarning.png" alt-text="Screenshot showing the warning when upgrading the delta lake protocol.":::

Additionally, users should verify that all current and future production workloads and processes are compatible with Delta Lake tables using the new protocol version to ensure a seamless transition and prevent any potential disruptions.

## Versioning 

Our runtime version numbering, while closely related to Semantic Versioning, follows a slightly different approach. The runtime major version corresponds to the Apache Spark major version. Therefore, Runtime 1 corresponds to Spark version 3. Similarly, the upcoming Runtime 2 will align with Spark 4.0. It's essential to note that between the current runtimes, Runtime 1.1 and Runtime 1.2, changes may occur, including the addition or removal of different libraries. Additionally, our platform offers [a library management feature](./library-management.md) that empowers users to install any desired libraries. 
