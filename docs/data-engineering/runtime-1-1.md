---
title: Runtime 1.1 in Fabric
description: Learn about Apache Spark-based Runtime 1.1 that is available in Fabric, including unique features, capabilities, and best practices.
ms.reviewer: snehagunda
ms.author: sngun
author: SnehaGunda
ms.topic: overview
ms.custom:
ms.date: 10/14/2024
---

# Fabric Runtime 1.1 (deprecated)

Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark that enables the execution and management of the Data Engineering and Data Science experiences in Fabric. This document covers the Fabric Runtime 1.1 components and versions.

> [!CAUTION]
> Deprecation and disablement notification for Microsoft Fabric Runtime 1.1  
> Runtime 1.1, based on Apache Spark 3.3, will be **deprecated and disabled as of March 31, 2025.** The end of support date for Runtime 1.1 has been announced as July 12, 2024. __[Upgrade your Fabric workspace](/fabric/data-engineering/runtime)__ and environments to use [Runtime 1.3 (Apache Spark 3.5 and Delta Lake 3.2)](/fabric/data-engineering/runtime-1-3) For the complete lifecycle and support policies of Apache Spark runtimes in Fabric, refer to [Lifecycle of Apache Spark runtimes in Fabric](./lifecycle.md).

Microsoft Fabric Runtime 1.1 is one of the runtimes offered within the Microsoft Fabric platform. The Runtime 1.1 major components are:

- Apache Spark 3.3
- Operating System: Ubuntu 18.04
- Java: 1.8.0_282
- Scala: 2.12.15
- Python: 3.10
- Delta Lake: 2.2
- R: 4.2.2

> [!TIP]
> Always use the most recent, GA runtime version for your production workload, which currently is [Runtime 1.3](./runtime-1-3.md).

Microsoft Fabric Runtime 1.1 comes with a collection of default level packages, including a full Anaconda installation and commonly used libraries for Java/Scala, Python, and R. These libraries are automatically included when using notebooks or jobs in the Microsoft Fabric platform. Refer to the documentation for a complete list of libraries.

Microsoft Fabric periodically releases maintenance updates for Runtime 1.1, delivering bug fixes, performance enhancements, and security patches. Ensuring you stay up to date with these updates guarantees optimal performance and reliability for your data processing tasks. **If you are currently using Runtime 1.1, you can upgrade to Runtime 1.3 or to Runtime 1.2 by navigating to Workspace Settings > Data Engineering / Science > Spark Settings > Environment.**

:::image type="content" source="media\mrs\runtime13.png" alt-text="Screenshot showing where to select runtime version." lightbox="media\mrs\runtime13.png":::

## New features and improvements - Apache Spark 3.3.1

Read the full version of the release notes for a specific Apache Spark version by visiting both [Spark 3.3.0](https://spark.apache.org/releases/spark-release-3-3-0.html) and [Spark 3.3.1](https://spark.apache.org/releases/spark-release-3-3-1.html).

## New features and improvements - Delta Lake 2.2

Check the source and full release notes at [Delta Lake 2.2.0](https://github.com/delta-io/delta/releases/tag/v2.2.0).

## Default-level packages for Java/Scala

For a list of all the default level packages for Java, Scala, Python and their respective versions see the [release notes](https://github.com/microsoft/synapse-spark-runtime/tree/9ba4059c0d9433bf2b6e25cd70fe60c6e0acd51c/Fabric/Runtime%201.1%20(Spark%203.3)).

## Migration between different Apache Spark versions

Migrating your workloads to Fabric Runtime 1.1 (Apache Spark 3.3) from an older version of Apache Spark involves a series of steps to ensure a smooth migration. This guide outlines the necessary steps to help you migrate efficiently and effectively.

1. Review Fabric Runtime 1.1 release notes, including checking the components and default-level packages included into the runtime, to understand the new features and improvements.

1. Check compatibility of your current setup and all related libraries, including dependencies and integrations. Review the migration guides to identify potential breaking changes:

   - Review the [Spark Core migration guide](https://spark.apache.org/docs/latest/core-migration-guide.html).
   - Review the [SQL, Datasets and DataFrame migration guide](https://spark.apache.org/docs/latest/sql-migration-guide.html).
   - If your solution is Apache Spark Structure Streaming related, review the [Structured Streaming migration guide](https://spark.apache.org/docs/latest/ss-migration-guide.html).
   - If you use PySpark, review the [Pyspark migration guide](https://spark.apache.org/docs/latest/api/python/migration_guide/pyspark_upgrade.html).
   - If you migrate code from Koalas to PySpark, review the [Koalas to pandas API on Spark migration guide](https://spark.apache.org/docs/latest/api/python/migration_guide/koalas_to_pyspark.html).

1. Move your workloads to Fabric and ensure that you have backups of your data and configuration files in case you need to revert to the previous version.

1. Update any dependencies that the new version of Apache Spark or other Fabric Runtime 1.1 related components might impact, including third-party libraries or connectors. Make sure to test the updated dependencies in a staging environment before deploying to production.

1. Update the Apache Spark configuration on your workload, including updating configuration settings, adjusting memory allocations, and modifying any deprecated configurations.

1. Modify your Apache Spark applications (notebooks and Apache Spark job definitions) to use the new APIs and features introduced in Fabric Runtime 1.1 and Apache Spark 3.3. You might need to update your code to accommodate any deprecated or removed APIs, and refactor your applications to take advantage of performance improvements and new functionalities.

1. Thoroughly test your updated applications in a staging environment to ensure compatibility and stability with Apache Spark 3.3. Perform performance testing, functional testing, and regression testing to identify and resolve any issues that might arise during the migration process.

1. After validating your applications in a staging environment, deploy the updated applications to your production environment. Monitor the performance and stability of your applications after the migration to identify any issues that need to be addressed.

1. Update your internal documentation and training materials to reflect the changes introduced in Fabric Runtime 1.1. Ensure that your team members are familiar with the new features and improvements to maximize the benefits of the migration.

## Related content

- Read about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
- [Runtime 1.2 (Spark 3.4, Java 11, Python 3.10, Delta Lake 2.4)](./runtime-1-2.md)
