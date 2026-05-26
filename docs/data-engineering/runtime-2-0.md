---
title: Runtime 2.0 in Fabric
description: Learn about Apache Spark-based Runtime 2.0 in Fabric, including its features, capabilities, and best practices for your data engineering and data science solutions.
ms.reviewer: arali
ms.topic: overview
ms.custom:
ms.date: 05/26/2026
---

# Fabric Runtime 2.0 (Preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

Fabric Runtime delivers seamless integration within the Microsoft Fabric ecosystem, offering a robust environment for data engineering and data science projects powered by Apache Spark.

This article introduces Fabric Runtime 2.0 Public Preview, the latest runtime designed for big data computations in Microsoft Fabric. It highlights the key features and components that make this release a significant step forward for scalable analytics and advanced workloads.

Fabric Runtime 2.0 incorporates the following components and upgrades designed to enhance your data processing capabilities:
- Apache Spark 4.1
- Operating System: Azure Linux 3.0 (Mariner 3.0)
- Java: 21
- Scala: 2.13
- Python: 3.13
- Delta Lake: 4.1
- R: 4.5.2

> [!IMPORTANT]
> Fabric Runtime 2.0 has been updated to Spark 4.1, Delta Lake 4.1, and Python 3.13. The Fabric Runtime version displayed in the portal (Workspace settings and Runtime option in Environment UX) doesn't change.
>
> | Component | Previous version | Current version |
> |---|---|---|
> | Spark | 4.0 | 4.1 |
> | Delta Lake | 4.0 | 4.1 |
> | Python | 3.12 | 3.13 |
>
> :::image type="content" source="media/runtime/runtime-2-0-upgrade.png" alt-text="Screenshot showing the Runtime 2.0 version change from Spark 4.0, Delta 4.0 to Spark 4.1, Delta 4.1." lightbox="media/runtime/runtime-2-0-upgrade.png":::
>
> **Breaking change:** The Python upgrade requires you to re-publish every Environment that has libraries. Until you re-publish, the **Public libraries** and **Custom libraries** tabs appear empty, and Spark jobs that target the affected Environment fail with "No module found" or "Class not found" errors.
>
> **Required actions**
>
> - Record or export your library list from each Environment.
> - Re-add the libraries and select **Publish** to rebuild them against Spark 4.1.

> [!TIP]
> Fabric Runtime 2.0 includes support for [the Native Execution Engine](./native-execution-engine-overview.md), which can significantly enhance performance without more costs. You can enable the native execution engine at the environment level so that all jobs and notebooks automatically inherit the enhanced performance capabilities.

## Enable Runtime 2.0

You can enable Runtime 2.0 at either the workspace level or the environment item level. Use the workspace setting to apply Runtime 2.0 as the default for all Spark workloads in your workspace. Alternatively, create an environment item with Runtime 2.0 to use with specific notebooks or Spark job definitions, which overrides the workspace default.

### Enable Runtime 2.0 in Workspace settings

To set Runtime 2.0 as the default for your entire workspace:

1. Navigate to the **Workspace settings** page within your Fabric workspace.

    :::image type="content" source="media\mrs\runtime-2.png" alt-text="Screenshot showing where to select runtime version for Workspace settings." lightbox="media\mrs\runtime-2.png":::

1. Select the **Data Engineering/Science** tab and then select **Spark settings**.
1. Select the **Environment** tab.
1. Under the **Runtime version** dropdown, select **2.0 Public Preview (Spark 4.1, Delta 4.1)** and save your changes. 
1. Runtime 2.0 is set as the default runtime for your workspace.


### Enable Runtime 2.0 in an Environment item

To use Runtime 2.0 with specific notebooks or Spark job definitions:

1. Create a new **Environment** item or open an existing one. 
1. Under the **Runtime** dropdown, select **2.0 Public Preview (Spark 4.1, Delta 4.1)**, **Save** and **Publish** your changes. 

    :::image type="content" source="media\mrs\runtime-2-environment.png" alt-text="Screenshot showing where to select runtime version for Environment item." lightbox="media\mrs\runtime-2-environment.png":::
    
1. Next, you can use this **Environment** item with your **Notebook** or **Spark Job Definition**.

You can now start experimenting with the newest improvements and functionalities introduced in Fabric Runtime 2.0 (Spark 4.1 and Delta Lake 4.1).

> [!NOTE]
> The WASB protocol for General Purpose v2 (GPv2) Azure Storage accounts is deprecated. You should use the latest ABFS protocol instead for reading from and writing to GPv2 storage accounts.

## Public preview

The Fabric Runtime 2.0 public preview stage gives you access to new features and APIs from both Spark 4.1 and Delta Lake 4.1. The preview lets you use the latest Spark and Delta-based enhancements right away as well as ensuring a smooth readiness and transition for enhanced and improved changes like the newer Java, Scala, and Python versions.  

> [!TIP]
> For up-to-date information, a detailed list of changes, and specific release notes for Fabric runtimes, check and subscribe [Spark Runtimes Releases and Updates](https://github.com/microsoft/synapse-spark-runtime).

## Key highlights

### Performance and execution engine enhancements

Fabric Runtime 2.0 includes the [Native Execution Engine](./native-execution-engine-overview.md), which provides significant performance improvements over open-source Spark. The engine uses vectorized processing to accelerate Spark queries on lakehouse infrastructure without requiring code changes.

Key performance features in Runtime 2.0:

- **Up to six times faster**: Benchmarks show up to six times faster performance compared to open-source Spark on TPC-DS workloads.
- **Vectorized CSV parsing**: The native execution engine includes a vectorized CSV parser that accelerates CSV ingestion and query workloads. Vectorized JSON parsing and Spark Structured Streaming support are planned for future updates.

To enable the native execution engine, see [Native execution engine for Fabric Data Engineering](./native-execution-engine-overview.md).

### Apache Spark 4.1

[Apache Spark 4.0](https://spark.apache.org/news/spark-4-0-0-released.html) marked a significant milestone as the inaugural release in the 4.x series, embodying the collective effort of the vibrant open-source community. Fabric Runtime 2.0 now runs on [Apache Spark 4.1](https://spark.apache.org/news/spark-4-1-1-released.html), which builds on that foundation with additional improvements. 

In this version, Spark SQL is significantly enriched with powerful new features designed to boost expressiveness and versatility for SQL workloads, such as VARIANT data type support, SQL user-defined functions, session variables, pipe syntax, and string collation. PySpark sees continuous dedication to both its functional breadth and the overall developer experience, bringing a native plotting API, a new Python Data Source API, support for Python UDTFs, and unified profiling for PySpark UDFs, alongside numerous other enhancements. Structured Streaming evolves with key additions that provide greater control and ease of debugging, notably the introduction of the Arbitrary State API v2 for more flexible state management and the State Data Source for easier debugging.

You can check the full list and detailed changes here: 
* [Apache Spark 4.0](https://spark.apache.org/releases/spark-release-4-0-0.html).
* [Apache Spark 4.1](https://spark.apache.org/releases/spark-release-4.1.1.html).

> [!NOTE]
> In Spark 4.x, SparkR is deprecated and might be removed in a future version.

### Delta Lake 4.1

Delta Lake 4.1 builds on the Delta Lake 4.0 milestone release, continuing the commitment to making Delta Lake interoperable across formats, easier to work with, and more performant. It includes powerful new features, performance optimizations, and foundational enhancements for the future of open data lakehouses. 

You can check the full list and detailed changes introduced with Delta Lake 3.3, 4.0, and 4.1 here:

* [Delta Lake 3.3](https://github.com/delta-io/delta/releases/tag/v3.3.0)
* [Delta Lake 4.0](https://github.com/delta-io/delta/releases/tag/v4.0.0)
* [Delta Lake 4.1](https://github.com/delta-io/delta/releases/tag/v4.1.0)

### Data layout and optimization

Runtime 2.0 supports data layout and optimization features for Delta tables:

- **Z-ordering**: Organize data within Delta table files by specified columns to improve query performance for filtered queries.
- **Liquid Clustering**: A flexible clustering approach that automatically optimizes data layout without manual maintenance.
- **Parallel Delta snapshot loading**: The native execution engine loads Delta table snapshots in parallel, reducing query startup time for large tables.

> [!IMPORTANT]
> Delta Lake 4.1 specific features are experimental and only work on Spark experiences, such as Notebooks and Spark Job Definitions. If you need to use the same Delta Lake tables across multiple Microsoft Fabric workloads, don't enable those features. To learn more about which protocol versions and features are compatible across all Microsoft Fabric experiences, read [Delta Lake table format interoperability](../fundamentals/delta-lake-interoperability.md).

## Compute management in Runtime 2.0

Runtime 2.0 supports the following compute management features:

- **Resource profiles**: Configure predefined resource allocations for Spark sessions to match workload requirements and control costs.
- **Custom live pools (preview)**: Create dedicated, pre-warmed Spark pools that reduce session startup time. Custom live pools are available in preview for Runtime 2.0 workloads.

## Limitations and notes

- Delta Lake 4.x specific features are experimental and only work on Spark experiences, such as notebooks and Spark job definitions. If you need to use the same Delta Lake tables across multiple Fabric workloads, don't enable those features. For more information, see [Delta Lake table format interoperability](../fundamentals/delta-lake-interoperability.md).
- Runtime 2.0 is in public preview. Some features and APIs may change before general availability.
- The VS Code extension for Fabric Spark supports Runtime 2.0 for notebook and Spark job definition development.

## Related content

* [Apache Spark Runtimes in Fabric - Overview, Versioning, and Multiple Runtimes Support](./runtime.md)
* [Spark Core migration guide](https://spark.apache.org/docs/latest/core-migration-guide.html)
* [SQL, Datasets, and DataFrame migration guides](https://spark.apache.org/docs/latest/sql-migration-guide.html)
* [Structured Streaming migration guide](https://spark.apache.org/docs/latest/streaming/ss-migration-guide.html)
* [MLlib (Machine Learning) migration guide](https://spark.apache.org/docs/latest/ml-migration-guide.html)
* [PySpark (Python on Spark) migration guide](https://spark.apache.org/docs/latest/pyspark-migration-guide.html)
* [SparkR (R on Spark) migration guide](https://spark.apache.org/docs/latest/sparkr-migration-guide.html)