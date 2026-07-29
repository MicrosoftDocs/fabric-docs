---
title: Apache Spark runtime in Fabric
description: Learn about the Apache Spark-based runtimes available in Fabric, including Fabric optimizations and support.
ms.reviewer: arali
ms.topic: overview
ms.custom: sfi-image-nochange
ms.date: 07/24/2026
ai-usage: ai-assisted
---

# Apache Spark runtimes in Fabric

Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark that enables the execution and management of data engineering and data science experiences. It combines key components from both internal and open-source sources, providing customers with a comprehensive solution. For simplicity, refer to Microsoft Fabric Runtime powered by Apache Spark as Fabric Runtime.

Major components of Fabric Runtime:

- **Apache Spark** - a powerful open-source distributed computing library that enables large-scale data processing and analytics tasks. Apache Spark provides a versatile and high-performance platform for data engineering and data science experiences.

- **Delta Lake** - an open-source storage layer that brings ACID transactions and other data reliability features to Apache Spark. Integrated within Fabric Runtime, Delta Lake enhances data processing capabilities and ensures data consistency across multiple concurrent operations.

- **[The Native Execution Engine](./native-execution-engine-overview.md)** - a transformative enhancement for Apache Spark workloads, offering significant performance gains by directly executing Spark queries on lakehouse infrastructure. Integrated seamlessly, it requires no code changes and avoids vendor lock-in. It supports both Parquet and Delta formats across Apache Spark APIs in Runtime 1.3 (Spark 3.5) and Runtime 2.0 (Spark 4.1).

  Supported operators are offloaded from JVM-based Spark to a vectorized C++ execution path via Apache Gluten and Velox, providing columnar, SIMD-accelerated processing with native support for Parquet and Delta formats. When an operator isn't supported, execution automatically falls back to JVM-based Spark. In representative benchmarks (TPC-DS at scale factor 1000 using Delta), the engine achieved up to six times faster performance compared to open-source Spark, translating to approximately 83% compute-cost savings on a fixed-size Fabric cluster.

  The native path preserves Fabric Spark query optimizations, including adaptive query execution, cost-based rewrites, column pruning, and predicate pushdown. You can toggle native execution per application by using the `spark.native.enabled` configuration. During notebook cell execution, Fabric Spark Advisor surfaces real-time alerts when execution falls back to JVM-based Spark, helping you diagnose when native offload isn't applied.

- **Default-level packages for Java/Scala, Python, and R** - packages that support diverse programming languages and environments. These packages are automatically installed and configured, so developers can apply their preferred programming languages for data processing tasks.

- The Microsoft Fabric Runtime is built upon **a robust open-source operating system**, ensuring compatibility with various hardware configurations and system requirements.

In the following table, you find a comprehensive comparison of key components, including Apache Spark versions, supported operating systems, Java, Scala, Python, Delta Lake, and R, for Apache Spark-based runtimes within the Microsoft Fabric platform.

> [!TIP]
> Always use the most recent, generally available (GA) runtime version for your production workload, which currently is [Runtime 1.3](./runtime-1-3.md).

| Component | [Runtime 1.3](./runtime-1-3.md) | [Runtime 2.0](./runtime-2-0.md) |
|--|--|--|
| **Release Stage** | GA | Public Preview |
| **Apache Spark version** | 3.5.5 | 4.1 |
| **Operating System** | Mariner 2.0 | Mariner 3.0 |
| **Java version** | 11 | 21 |
| **Scala version** | 2.12.17 | 2.13.16 |
| **Python version** | 3.11 | 3.13 |
| **Delta Lake version** | 3.2 | 4.2 |

Visit [Runtime 1.3](./runtime-1-3.md) or [Runtime 2.0](./runtime-2-0.md) to explore details, new features, improvements, and migration scenarios for the specific runtime version.

## Fabric optimizations

In Microsoft Fabric, both the Spark engine and the Delta Lake implementations incorporate platform-specific optimizations and features. These features use native integrations within the platform. You can disable all these features to achieve standard Spark and Delta Lake functionality. The Fabric Runtimes for Apache Spark encompass:

- The complete open-source version of Apache Spark.
- A collection of nearly 100 built-in, distinct query performance enhancements. These enhancements include features like partition caching (enabling the FileSystem partition cache to reduce metastore calls) and Cross Join to Projection of Scalar Subquery.
- Built-in intelligent cache.

Within the Fabric Runtime for Apache Spark and Delta Lake, native writer capabilities serve two key purposes:

- They offer differentiated performance for writing workloads, optimizing the writing process.
- They default to V-Order optimization of Delta Parquet files. The Delta Lake V-Order optimization is crucial for delivering superior read performance across all Fabric engines. To gain a deeper understanding of how it operates and how to manage it, see [Delta Lake table optimization and V-Order](./delta-optimization-and-v-order.md).

## Multiple runtimes support

Fabric supports multiple runtimes, so you can switch between them and reduce the risk of compatibility problems or disruptions.

**By default, all new workspaces use the latest GA runtime version, which is currently [Runtime 1.3](./runtime-1-3.md).**

To change the runtime version at the workspace level, go to **Workspace Settings** > **Data Engineering/Science** > **Spark settings**. From the **Environment** tab, select your desired runtime version from the available options. Select **Save** to confirm your selection.

:::image type="content" source="media\mrs\runtime-2.png" alt-text="Screenshot showing where to select runtime version for Workspace settings." lightbox="media\mrs\runtime-2.png":::

After you make this change, all system-created items within the workspace, including Lakehouses, SJDs, and Notebooks, use the newly selected workspace-level runtime version starting from the next Spark Session. If you're currently using a notebook with an existing session for a job or any lakehouse-related activity, that Spark session continues as is. However, starting from the next session or job, the selected runtime version applies.

To change the runtime at the `Environment` item level, create a new **Environment** item or open an existing one. Under the **Runtime** dropdown, select your desired runtime version from the available options, select `Save`, and then `Publish` your changes. Next, you can use this `Environment` item with your `Notebook` or `Spark Job Definition`.

:::image type="content" source="media\mrs\runtime-2-environment.png" alt-text="Screenshot showing where to select runtime version for Environment item." lightbox="media\mrs\runtime-2-environment.png":::

### Consequences of runtime changes on Spark Settings

The system migrates all Spark settings. However, if the system identifies that a Spark setting isn't compatible with Runtime B, it shows a warning message and doesn't implement the setting.

:::image type="content" source="media\mrs\spark-settings-runtime-change.png" alt-text="Spark Settings Runtime Change." lightbox="media/mrs/spark-settings-runtime-change.png":::

### Consequences of runtime changes on library management

The library management system migrates all libraries from Runtime A to Runtime B, including both public and custom runtimes. If the Python and R versions stay the same, the libraries work properly. However, for JARs, there's a significant chance they don't work because of changes in dependencies and other factors such as changes in Scala, Java, Spark, and the operating system.

You're responsible for updating or replacing any libraries that don't work with Runtime B. If there's a conflict, which means that Runtime B includes a library originally defined in Runtime A, the library management system tries to create the necessary dependency for Runtime B based on your settings. However, the building process fails if a conflict occurs. In the error log, you can see which libraries cause conflicts and make adjustments to their versions or specifications.

:::image type="content" source="media\mrs\lm-runtime-change.png" alt-text="Library Management Runtime Change." lightbox="media/mrs/lm-runtime-change.png":::

## Upgrade Delta Lake protocol

Delta Lake features are always backward compatible, ensuring that tables created in a lower Delta Lake version can seamlessly interact with higher versions. However, when you enable certain features (for example, by using the `delta.upgradeTableProtocol(minReaderVersion, minWriterVersion)` method), you might compromise forward compatibility with lower Delta Lake versions. In such instances, you need to modify workloads that reference the upgraded tables to align with a Delta Lake version that maintains compatibility.

Each Delta table is associated with a protocol specification, which defines the features it supports. Applications that interact with the table, either for reading or writing, rely on this protocol specification to determine if they're compatible with the table's feature set. If an application lacks the capability to handle a feature listed as supported in the table's protocol, it can't read from or write to that table.

The protocol specification is divided into two distinct components: the "read" protocol and the "write" protocol. For more information, see [How does Delta Lake manage feature compatibility?](https://docs.delta.io/versioning.html#language-python)

:::image type="content" source="media\mrs\delta-upgrade-table-protocol.gif" alt-text="GIF showing the immediate warning when upgradeTableProtocol method is used." lightbox="media\mrs\delta-upgrade-table-protocol.gif":::

You can run the command `delta.upgradeTableProtocol(minReaderVersion, minWriterVersion)` in the PySpark environment, and in Spark SQL and Scala. This command initiates an update on the Delta table.

When you perform this upgrade, you receive a warning that upgrading the Delta protocol version is a nonreversible process. This process means that once you execute the update, you can't undo it.

Protocol version upgrades can potentially affect the compatibility of existing Delta Lake table readers, writers, or both. Therefore, proceed with caution and upgrade the protocol version only when necessary, such as when adopting new features in Delta Lake.

> [!IMPORTANT]
> To learn more about which protocol versions and features are compatible across all Microsoft Fabric experiences, see [Delta Lake table format interoperability](../fundamentals/delta-lake-interoperability.md).


:::image type="content" source="media\mrs\delta-upgrade-warning.png" alt-text="Screenshot showing the warning when upgrading the delta lake protocol." lightbox="media/mrs/delta-upgrade-warning.png":::

Additionally, verify that all current and future production workloads and processes are compatible with Delta Lake tables using the new protocol version to ensure a seamless transition and prevent any potential disruptions.

## Related content

- [Runtime 2.0 (Spark 4.1, Java 21, Python 3.13, Delta Lake 4.2)](./runtime-2-0.md)
- [Runtime 1.3 (Spark 3.5, Java 11, Python 3.11, Delta Lake 3.2)](./runtime-1-3.md)

