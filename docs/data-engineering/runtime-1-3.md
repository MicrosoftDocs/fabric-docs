---
title: Runtime 1.3 in Fabric
description: Learn about Apache Spark-based runtime 1.3 in Fabric. This article explains the unique features, capabilities, and best practices of Fabric and implement your data-related solutions.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom:
  - ignite-2023
ms.date: 3/13/2024
no-loc: [Copilot]
---

# Fabric Runtime 1.3

Fabric runtime offers a seamless integration with Azure. It provides a sophisticated environment for both data engineering and data science projects that use Apache Spark. This article provides an overview of the essential features and components of Fabric Runtime 1.3, the newest runtime for big data computations.

Fabric Runtime 1.3, incorporates the following components and upgrades designed to enhance your data processing capabilities:
- Apache Spark 3.5
- Operating System: Mariner 2.0
- Java: 11
- Scala: 2.12.17
- Python: 3.10
- Delta Lake: 3.0.0


> [!NOTE]
> Fabric Runtime 1.3 is currently in an experimental public preview stage. To learn more, see the [limitations and notes](./runtime-1-3.md#limitations).

Use the following instructions to integrate runtime 1.3 into your workspace and use its new features:

1. Navigate to the **Workspace settings** tab within your Fabric workspace.
2. Go to **Data Engineering/Science** tab and select **Spark Settings**.
3. Select the **Environment** tab.
4. Under the **Runtime Versions** dropdown, select **1.3 Experimental (Spark 3.5, Delta 3 OSS)** and save your changes. This action sets 1.3 as the default runtime for your workspace.

:::image type="content" source="media\mrs\runtime13.png" alt-text="Screenshot showing where to select runtime version." lightbox="media\mrs\runtime13.png":::

You can now start experimenting with the newest improvements and functionalities introduced in Fabric runtime 1.3 (Spark 3.5 and Delta Lake 3.0).

> [!IMPORTANT]
> Currently, it takes around 2-5 minutes for Spark 3.5 sessions to start, as starter pools are not part of the early experimental release.

## Experimental Public Preview

The Fabric runtime 1.3 experimental stage gives you early access to new features and Apache Spark APIs. This includes Spark 3.5, which is a Long-Term Support (LTS) version, offering stability before the major updates in Spark 4.0 arrive. The preview lets you use the latest Spark-based enhancements right away, ensuring a smooth transition and readiness for future changes like the Scala 2.13 upgrade. It also improves your data projects with advanced, reliable solutions in the Azure ecosystem.

> [!TIP]
> For up-to-date information, a detailed list of changes, and specific release notes for Fabric runtimes, check and subscribe [Spark Runtimes Releases and Updates](https://github.com/microsoft/synapse-spark-runtime).

### Limitations

Fabric Runtime 1.3 is currently in an experimental public preview stage, designed for users to explore and experiment with the latest features and APIs from Spark and Delta Lake. While this version offers access to core functionalities, there are certain limitations:

* You can use Spark 3.5 sessions, write code in notebooks, schedule Spark job definitions, and use with PySpark, Scala, and Spark SQL. However, R language isn't suppoted in this early release.

* You can install libraries directly in your code with pip and conda. You can set Spark settings via the %%configure options in notebooks and Spark Job Definitions (SJDs).

* You can read and write to the Lakehouse with Delta 3.0 OSS, but some advanced features like V-order, native Parquet writing, autocompaction, optimize write, low-shuffle merge, merge, schema evolution, and time travel are not included in this early release.

* The Spark Advisor is currently unavailable. However, monitoring tools such as Spark UI and logs are supported in this early release.

* Features such as Data Science integrations including Copilot and connectors including Kusto, SQL Analytics, Cosmos DB, and MySQL Java Connector are currently not supported in this early release. Data Science libraries aren't supported in PySpark environments. PySpark only works with a basic Conda setup, which includes PySpark alone without extra libraries.

* Integrations with environment artifact and VSCode are not supported in this early release.


> [!NOTE]
> Share your feedback on Fabric Runtime in the [Ideas platform](https://ideas.fabric.microsoft.com/). Be sure to mention the version and release stage you're referring to. We value community feedback and prioritize improvements based on votes, making sure we meet user needs.

## Key highlights

### Apache Spark 3.5
[Apache Spark 3.5.0](https://spark.apache.org/releases/spark-release-3-5-0.html) is the sixth version in the 3.x series. This version is a product of extensive collaboration within the open-source community, addressing more than 1,300 issues as recorded in Jira.

In this version, there's an upgrade in compatibility for structured streaming. Additionally, this release broadens the functionality within PySpark and SQL. It adds features such as the SQL identifier clause, named arguments in SQL function calls, and the inclusion of SQL functions for HyperLogLog approximate aggregations. Other new capabilities also include Python user-defined table functions, the simplification of distributed training via *DeepSpeed*, and new structured streaming capabilities like watermark propagation and the *dropDuplicatesWithinWatermark* operation.

You can check the full list and detailed changes here: [https://spark.apache.org/releases/spark-release-3-5-0.html](https://spark.apache.org/releases/spark-release-3-5-0.html).

### Delta Spark

Delta Lake 3.0 marks a collective commitment to making Delta Lake interoperable across formats, easier to work with, and more performant. Delta Spark 3.0.0 is built on top of [Apache Spark™ 3.5](https://spark.apache.org/releases/spark-release-3-5-0.html). The Delta Spark maven artifact has been renamed from **delta-core** to **delta-spark**.

You can check the full list and detailed changes here: [https://docs.delta.io/3.0.0/index.html](https://docs.delta.io/3.0.0/index.html).

## Related content

* Read about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
* [Spark Core migration guide](https://spark.apache.org/docs/3.5.0/core-migration-guide.html)
* [SQL, Datasets, and DataFrame migration guides](https://spark.apache.org/docs/3.5.0/sql-migration-guide.html)
* [Structured Streaming migration guide](https://spark.apache.org/docs/3.5.0/ss-migration-guide.html)
* [MLlib (Machine Learning) migration guide](https://spark.apache.org/docs/3.5.0/ml-migration-guide.html)
* [PySpark (Python on Spark) migration guide](https://spark.apache.org/docs/3.5.0/api/python/migration_guide/pyspark_upgrade.html)
* [SparkR (R on Spark) migration guide](https://spark.apache.org/docs/3.5.0/sparkr-migration-guide.html)