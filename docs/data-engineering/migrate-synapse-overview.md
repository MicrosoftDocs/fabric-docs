---
title: Overview of migrating Azure Synapse Spark to Fabric
description: Learn how to migrate Azure Synapse Spark workloads to Microsoft Fabric, choose the right migration path, and navigate the available migration guidance.
ms.reviewer: aimurg
ms.topic: concept-article
ms.custom:
  - fabric-cat
ms.date: 04/20/2026
ai-usage: ai-assisted
---

# Overview of migrating Azure Synapse Spark to Fabric

Use this article as the starting point for migrating Azure Synapse Spark workloads to Microsoft Fabric. It helps you decide which guidance to use, what can be migrated directly, and where manual refactoring or validation is still required.

Fabric Data Engineering supports [lakehouse](lakehouse-overview.md), [notebook](how-to-use-notebook.md), [environment](create-and-use-environment.md), [Spark job definition](spark-job-definition.md), and [pipeline](../data-factory/data-factory-overview.md) items. Most Synapse Spark migrations involve some combination of item migration, data access changes, metadata migration, code refactoring, and post-migration validation.

## Before you migrate

Before you begin, confirm that Fabric Data Engineering is the right destination for your workload. Review the Spark runtime, security model, pool model, environment model, and data access patterns that your current Synapse implementation depends on.

Start with these articles:

- [Compare Fabric and Azure Synapse Spark: Key Differences](comparison-between-fabric-and-azure-synapse-spark.md)
- [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md)

If you're migrating an existing Synapse workspace, plan to create or use an existing Fabric workspace as the migration target. This article doesn't cover full workspace provisioning or non-Spark workload migration.

## What can you migrate?

Synapse-to-Fabric migration usually spans several workstreams.

| **Migration area** | **Typical scope** | **Primary guidance** |
|----|----|----|
| **Planning and assessment** | Inventory Spark pools, notebooks, Spark Job Definitions, lake databases, linked services, and blockers | [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md) |
| **Items** | Notebooks, Spark Job Definitions, Spark pools, and lake database mappings | [Step 2: Migrate Synapse Spark workloads with Migration Assistant](synapse-migration-spark-assistant.md) |
| **Code refactoring** | `mssparkutils`, linked services, file paths, catalog APIs, connector auth | [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md) |
| **Pools, configs, and libraries** | Environments, custom pools, Spark properties, library compatibility | [Step 4: Migrate Spark pools, environments, and libraries from Synapse to Fabric](synapse-migration-pools-environments-libraries.md) |
| **Hive Metastore and lake metadata** | Databases, tables, partitions, managed vs. external tables | [Step 5: Migrate Hive Metastore metadata and data paths to Fabric](synapse-migration-hms-data.md) |
| **Data access and pipelines** | OneLake shortcuts, ADLS Gen2 access, copy activities, pipeline migration | [Migrate data and pipelines](migrate-synapse-data-pipelines.md) |
| **Security, validation, and cutover** | Roles, connections, governance, verification, cutover planning | [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md) |

## Choose your migration path

Use the path that matches your goal.

- **You need an end-to-end migration plan.** Start with the 6-part best practices series. This is the best entry point for most production migrations.
- **You want to move supported Spark items quickly.** Start with the [Spark Migration Assistant](synapse-to-fabric-spark-migration-assistant.md) and then use the refactoring and validation articles to close the gaps.
- **You only need help with one area.** Use the task-specific articles for notebooks, Spark Job Definitions, pools, libraries, Hive Metastore metadata, or data/pipeline migration.

## Recommended reading order

For most teams, the fastest way to approach a Synapse Spark migration is:

1. Review [Compare Fabric and Azure Synapse Spark: Key Differences](comparison-between-fabric-and-azure-synapse-spark.md).
1. Read [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md).
1. Run the [Spark Synapse to Fabric Spark Migration Assistant](synapse-to-fabric-spark-migration-assistant.md) where applicable.
1. Refactor notebooks and Spark jobs using [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md).
1. Validate data access, metadata, security, and cutover readiness using the remaining best-practices articles.

:::image type="content" source="media\migrate-synapse\migration-scenarios.png" alt-text="Screenshot showing the migration scenarios." lightbox="media/migrate-synapse/migration-scenarios.png":::

Migration from Synapse Spark to Fabric is usually a copy-and-adapt process rather than a direct in-place move. You can migrate many assets quickly, but you should still expect to validate runtime behavior, replace Synapse-specific integrations, and align security, metadata, and operational patterns with Fabric.

## Best practices series

Use the best practices series for a structured, end-to-end migration path:

- [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md)
- [Step 2: Migrate Synapse Spark workloads with Migration Assistant](synapse-migration-spark-assistant.md)
- [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md)
- [Step 4: Migrate Spark pools, environments, and libraries from Synapse to Fabric](synapse-migration-pools-environments-libraries.md)
- [Step 5: Migrate Hive Metastore metadata and data paths to Fabric](synapse-migration-hms-data.md)
- [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md)

## Task-specific migration articles

If you need targeted guidance for a specific migration task, use these articles:

- [Spark Synapse to Fabric Spark Migration Assistant](synapse-to-fabric-spark-migration-assistant.md)
- [Migrate Azure Synapse notebooks to Fabric](migrate-synapse-notebooks.md)
- [Migrate Spark Job Definitions from Azure Synapse to Fabric](migrate-synapse-spark-job-definition.md)
- [Migrate Spark Pools from Azure Synapse to Fabric](migrate-synapse-spark-pools.md)
- [Migrate Spark configurations from Azure Synapse to Fabric](migrate-synapse-spark-configurations.md)
- [Migrate Spark Libraries from Azure Synapse to Fabric](migrate-synapse-spark-libraries.md)
- [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md)
- [Migrate data and pipelines](migrate-synapse-data-pipelines.md)

## Related content

- [Compare Fabric and Azure Synapse Spark: Key Differences](comparison-between-fabric-and-azure-synapse-spark.md)
- [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md)
- [Spark Synapse to Fabric Spark Migration Assistant](synapse-to-fabric-spark-migration-assistant.md)
- Learn more about migration options for [Spark pools](migrate-synapse-spark-pools.md), [configurations](migrate-synapse-spark-configurations.md), [libraries](migrate-synapse-spark-libraries.md), [notebooks](migrate-synapse-notebooks.md), and [Spark job definition](migrate-synapse-spark-job-definition.md)
- [Migrate data and pipelines](migrate-synapse-data-pipelines.md)
- [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md)
