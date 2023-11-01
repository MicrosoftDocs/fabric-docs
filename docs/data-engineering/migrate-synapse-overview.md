---
title: Migrating from Azure Synapse Spark to Fabric
description: Learn about key considerations on migrating from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: migration
ms.custom: ignite-2023
ms.date: 11/03/2023
---

# Migrating from Azure Synapse Spark to Fabric

Before you begin your migration, you should verify that [Fabric Data Engineering](data-engineering-overview.md) is the best solution for your workload. Fabric Data Engineering supports Lakehouse, Notebook, Environment, Spark Job Definition (SJD) and Data Pipeline items, including different runtime and Spark capabilities support.

## Key considerations

The initial step in crafting a migration strategy is to assess suitability. It's worth noting that certain Fabric features related to Spark are currently in development or planning. For more details and updates, please visit the [Fabric roadmap](/fabric/release-plan/). 

You can also learn about Fabric security and governance guidance [here](TBC). For Spark, see a detailed comparison [differences between Azure Synapse Spark and Fabric](TBC).

## Migration scenarios

If you've determined that Fabric is the right choice for migrating your existing Spark workloads, the migration process can involve multiple scenarios and phases:

* **Items**: Items migration involves the transfer of one or various artifacts from your existing Azure Synapse workspace to Fabric. This includes Spark pools, configurations, libraries, notebooks, and Spark Job Definitions (SJD). Learn more about [Items migration](migrate-synapse-items.md).
* **Data and Pipelines**: Users can make available data from an existing ADLS Gen2 linked to an Azure Synapse workspace into Fabric lakehouse e.g., using OneLake shortcuts. Pipeline migration involves moving existing data pipelines to Fabric, including notebook and SJD pipeline activities. Learn more about [Data and Pipelines migration](TBC).
* **Metadata**: Metadata migration involves moving Spark catalog metadata (databases, tables, and partitions) from an existing Hive MetaStore (HMS) in Azure Synapse to Fabric lakehouse. Learn more about [HMS metadata migration](migrate-synapse-hms-metadata.md).
* **Workspace**: Users can migrate an existing Azure Synapse workspace by creating a new workspace in Microsoft Fabric, including metadata. Workspace migration is not covered in this guidance, assumption is that users will create or have an existing Fabric workspace.

:::image type="content" source="media\migrate-synapse-overview\migration-scenarios.png" alt-text="Screenshot showing the migration scenarios.":::

Transitioning from Azure Synapse Spark to Fabric Spark requires a deep understanding of your current architecture and the differences between Azure Synapse Spark and Fabric. The first crucial step is an assessment, followed by the creation of a detailed migration plan. This plan can be customized to match your system's unique traits, phase dependencies, and workload complexities.

## Next steps

- [Azure Synapse Spark vs. Fabric Spark](azure-synapse-spark-vs-fabric-spark.md)
- To learn more about migration options for Spark pools, libraries, configurations, notebooks and Spark Job Definitions (SJD) see [Migrate items](azure-synapse-spark-vs-fabric-spark.md)
