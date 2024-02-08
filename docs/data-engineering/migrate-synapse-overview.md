---
title: Migrating from Azure Synapse Spark to Fabric
description: Learn about key considerations on migrating from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: conceptual
ms.custom:
  - fabric-cat
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Migrating from Azure Synapse Spark to Fabric

Before you begin your migration, you should verify that [Fabric Data Engineering](data-engineering-overview.md) is the best solution for your workload. Fabric Data Engineering supports [lakehouse](lakehouse-overview.md), [notebook](how-to-use-notebook.md), [environment](create-and-use-environment.md), [Spark job definition (SJD)](spark-job-definition.md) and [data pipeline](../data-factory/data-factory-overview.md) items, including different runtime and Spark capabilities support.

## Key considerations

The initial step in crafting a migration strategy is to assess suitability. It's worth noting that certain Fabric features related to Spark are currently in development or planning. For more details and updates, visit the [Fabric roadmap](/fabric/release-plan/). 

For Spark, see a detailed comparison [differences between Azure Synapse Spark and Fabric](comparison-between-fabric-and-azure-synapse-spark.md).

## Migration scenarios

If you determine that Fabric Data Engineering is the right choice for migrating your existing Spark workloads, the migration process can involve multiple scenarios and phases:

* **Items**: Items migration involves the transfer of one or various items from your existing Azure Synapse workspace to Fabric. Learn more about migrating [Spark pools](migrate-synapse-spark-pools.md), [Spark configurations](migrate-synapse-spark-configurations.md), [Spark libraries](migrate-synapse-spark-libraries.md), [notebooks](migrate-synapse-notebooks.md), and [Spark job definition](migrate-synapse-spark-job-definition.md).
* **Data and pipelines**: Using [OneLake shortcuts](../onelake/create-adls-shortcut.md), you can make ADLS Gen2 data (linked to an Azure Synapse workspace) available in Fabric lakehouse. Pipeline migration involves moving existing data pipelines to Fabric, including notebook and Spark job definition pipeline activities. Learn more about [data and pipelines migration](migrate-synapse-data-pipelines.md).
* **Metadata**: Metadata migration involves moving Spark catalog metadata (databases, tables, and partitions) from an existing Hive MetaStore (HMS) in Azure Synapse to Fabric lakehouse. Learn more about [HMS metadata migration](migrate-synapse-hms-metadata.md).
* **Workspace**: Users can migrate an existing Azure Synapse workspace by creating a new workspace in Microsoft Fabric, including metadata. Workspace migration isn't covered in this guidance, assumption is that users need to [create a new workspace](../get-started/create-workspaces.md) or have an existing Fabric workspace. Learn more about [workspace roles](../get-started/roles-workspaces.md) in Fabric.

:::image type="content" source="media\migrate-synapse\migration-scenarios.png" alt-text="Screenshot showing the migration scenarios.":::

Transitioning from Azure Synapse Spark to Fabric Spark requires a deep understanding of your current architecture and the differences between Azure Synapse Spark and Fabric. The first crucial step is an assessment, followed by the creation of a detailed migration plan. This plan can be customized to match your system's unique traits, phase dependencies, and workload complexities.

## Related content

- [Fabric vs. Azure Synapse Spark](comparison-between-fabric-and-azure-synapse-spark.md)
- Learn more about migration options for [Spark pools](migrate-synapse-spark-pools.md), [configurations](migrate-synapse-spark-configurations.md), [libraries](migrate-synapse-spark-libraries.md), [notebooks](migrate-synapse-notebooks.md) and [Spark job definition](migrate-synapse-spark-job-definition.md)
- [Migrate data and pipelines](migrate-synapse-data-pipelines.md)
- [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md)
