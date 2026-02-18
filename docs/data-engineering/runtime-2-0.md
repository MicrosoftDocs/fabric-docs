---
title: Runtime 2.0 in Fabric
description: Learn about Apache Spark-based runtime 2.0 in Fabric. This article explains the unique features, capabilities, and best practices of Fabric and implement your data-related solutions.
ms.reviewer: arali
ms.topic: overview
ms.date: 12/11/2025
---

# Fabric Runtime 2.0 Experimental (Preview)

> [!NOTE]
> Fabric Runtime 2.0 is currently in an experimental preview stage. For more information, see the [limitations and notes](./runtime-2-0.md#limitations-and-notes).

Fabric Runtime delivers seamless integration within the Microsoft Fabric ecosystem, offering a robust environment for data engineering and data science projects powered by Apache Spark.

This article introduces Fabric Runtime 2.0 Experimental (Preview), the latest runtime designed for big data computations in Microsoft Fabric. It highlights the key features and components that make this release a significant step forward for scalable analytics and advanced workloads.

Fabric Runtime 2.0 incorporates the following components and upgrades designed to enhance your data processing capabilities:
- Apache Spark 4.0
- Operating System: Azure Linux 3.0 (Mariner 3.0)
- Java: 21
- Scala: 2.13
- Python: 3.12
- Delta Lake: 4.0

## Enable Runtime 2.0
You can enable Runtime 2.0 at either the workspace level or the environment item level. Use the workspace setting to apply Runtime 2.0 as the default for all Spark workloads in your workspace. Alternatively, create an Environment item with Runtime 2.0 to use with specific notebooks or Spark job definitions, which overrides the workspace default.

### Enable Runtime 2.0 in Workspace settings

To set Runtime 2.0 as the default for your entire workspace:

1. Navigate to the **Workspace settings** tab within your Fabric workspace.

    :::image type="content" source="media\mrs\runtime-2.png" alt-text="Screenshot showing where to select runtime version for Workspace settings." lightbox="media\mrs\runtime-2.png":::

1. Go to **Data Engineering/Science** tab and select **Spark settings**.
1. Select the **Environment** tab.
1. Under the **Runtime version** dropdown, select **2.0 Experimental (Spark 4.0, Delta 4.0)** and save your changes. This action sets Runtime 2.0 as the default runtime for your workspace.


### Enable Runtime 2.0 in an Environment item

To use Runtime 2.0 with specific notebooks or Spark job definitions:

1. Create a new **Environment** item or open and existing one. 
1. Under the **Runtime** dropdown, select **2.0 Experimental (Spark 4.0, Delta 4.0)**, `Save` and `Publish` your changes. 

    :::image type="content" source="media\mrs\runtime-2-environment.png" alt-text="Screenshot showing where to select runtime version for Environment item." lightbox="media\mrs\runtime-2-environment.png":::
    
    > [!IMPORTANT]
    > It can take around 2-5 minutes for Spark 2.0 sessions to start, as starter pools aren't part of the early experimental release.

1. Next, you can use this **Environment** item with your `Notebook` or `Spark Job Definition`.

You can now start experimenting with the newest improvements and functionalities introduced in Fabric Runtime 2.0 (Spark 4.0 and Delta Lake 4.0).

## Experimental Public Preview

The Fabric runtime 2.0 experimental preview stage gives you early access to new features and APIs from both Spark 4.0 and Delta Lake 4.0. The preview lets you use the latest Spark-based enhancements right away, ensuring a smooth readiness and transition for future changes like the newer Java, Scala, and Python versions.  

> [!TIP]
> For up-to-date information, a detailed list of changes, and specific release notes for Fabric runtimes, check and subscribe [Spark Runtimes Releases and Updates](https://github.com/microsoft/synapse-spark-runtime).

### Limitations and Notes

Fabric Runtime 2.0 is currently in an experimental public preview stage, designed for users to explore and experiment with the latest features and APIs from Spark and Delta Lake in the development or test environments. While this version offers access to core functionalities, there are certain limitations:

* You can use Spark 4.0 sessions, write code in notebooks, schedule Spark job definitions, and use with PySpark, Scala, and Spark SQL. However, R language isn't supported in this early release.

* You can install libraries directly in your code with pip and conda. You can set Spark settings via the %%configure options in notebooks and Spark Job Definitions (SJDs).

* You can read and write to the Lakehouse with Delta Lake 4.0, but some advanced features like V-order, native Parquet writing, autocompaction, optimize write, low-shuffle merge, merge, schema evolution, and time travel aren't included in this early release.

* The Spark Advisor is currently unavailable. However, monitoring tools such as Spark UI and logs are supported in this early release.

* Features such as Data Science integrations including Copilot and connectors including Kusto, SQL Analytics, Cosmos DB, and MySQL Java Connector are currently not supported in this early release. Data Science libraries aren't supported in PySpark environments. PySpark only works with a basic Conda setup, which includes PySpark alone without extra libraries.

* Integrations with environment item and Visual Studio Code aren't supported in this early release.

* It doesn't support reading and writing data to General Purpose v2 (GPv2) Azure Storage accounts with WASB or ABFS protocols.


> [!NOTE]
> Share your feedback on Fabric Runtime in the [Ideas platform](https://ideas.fabric.microsoft.com/). Be sure to mention the version and release stage you're referring to. We value community feedback and prioritize improvements based on votes, making sure we meet user needs.

## Key highlights

### Apache Spark 4.0
[Apache Spark 4.0](https://spark.apache.org/news/spark-4-0-0-released.html) marks a significant milestone as the inaugural release in the 4.x series, embodying the collective effort of the vibrant open-source community. 

In this version, Spark SQL is significantly enriched with powerful new features designed to boost expressiveness and versatility for SQL workloads, such as VARIANT data type support, SQL user-defined functions, session variables, pipe syntax, and string collation. PySpark sees continuous dedication to both its functional breadth and the overall developer experience, bringing a native plotting API, a new Python Data Source API, support for Python UDTFs, and unified profiling for PySpark UDFs, alongside numerous other enhancements. Structured Streaming evolves with key additions that provide greater control and ease of debugging, notably the introduction of the Arbitrary State API v2 for more flexible state management and the State Data Source for easier debugging.

You can check the full list and detailed changes here: [https://spark.apache.org/releases/spark-release-4-0-0.html](https://spark.apache.org/releases/spark-release-4-0-0.html).

> [!NOTE]
> In Spark 4.0, SparkR is deprecated and might be removed in a future version.

### Delta Lake 4.0

Delta Lake 4.0 marks a collective commitment to making Delta Lake interoperable across formats, easier to work with, and more performant. Delta 4.0 is a milestone release packed with powerful new features, performance optimizations, and foundational enhancements for the future of open data lakehouses. 

You can check the full list and detailed changes introduced with Delta Lake 3.3 and 4.0 here: 
[https://github.com/delta-io/delta/releases/tag/v3.3.0](https://github.com/delta-io/delta/releases/tag/v3.3.0).
[https://github.com/delta-io/delta/releases/tag/v4.0.0](https://github.com/delta-io/delta/releases/tag/v4.0.0).

> [!IMPORTANT]
> Delta Lake 4.0 specific features are experimental and only work on Spark experiences, such as Notebooks and Spark Job Definitions. If you need to use the same Delta Lake tables across multiple Microsoft Fabric workloads, don't enable those features. To learn more about which protocol versions and features are compatible across all Microsoft Fabric experiences, read [Delta Lake table format interoperability](../fundamentals/delta-lake-interoperability.md).

## Related content

* [Apache Spark Runtimes in Fabric - Overview, Versioning, and Multiple Runtimes Support](./runtime.md)
* [Spark Core migration guide](https://spark.apache.org/docs/latest/core-migration-guide.html)
* [SQL, Datasets, and DataFrame migration guides](https://spark.apache.org/docs/latest/sql-migration-guide.html)
* [Structured Streaming migration guide](https://spark.apache.org/docs/latest/streaming/ss-migration-guide.html)
* [MLlib (Machine Learning) migration guide](https://spark.apache.org/docs/latest/ml-migration-guide.html)
* [PySpark (Python on Spark) migration guide](https://spark.apache.org/docs/latest/pyspark-migration-guide.html)
* [SparkR (R on Spark) migration guide](https://spark.apache.org/docs/latest/sparkr-migration-guide.html)