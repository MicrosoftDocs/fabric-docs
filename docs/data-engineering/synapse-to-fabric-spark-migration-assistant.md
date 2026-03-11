---
title: Spark Synapse to Fabric Spark Migration Assistant
description: This document describes the Spark Synapse to Fabric Migration Assistant, a Microsoft Fabric-owned experience that helps customers migrate Spark workloads from Azure Synapse Analytics to Microsoft Fabric.
ms.reviewer: jejiang
ms.topic: tutorial
ms.date: 03/18/2026
ai-usage: ai-assisted
---

# Spark Synapse to Fabric Spark Migration Assistant (Preview)

> [!NOTE]
> The Spark Synapse to Fabric Migration Assistant is currently in public preview.

Use the Spark Synapse to Fabric Spark Migration Assistant to migrate Spark workloads from Azure Synapse Analytics to Microsoft Fabric through a guided workflow.

In public preview, the assistant migrates Spark pools, notebooks, Spark job definitions, and lake databases.

Migration doesn't move your data. The assistant copies and transforms supported Spark items for Fabric and generates a migration report for each run.

The assistant supports migration of the following items:

- **Spark pools** are migrated to Fabric Pools and corresponding environments.
- **Notebooks** and associated environments are migrated.
- **Spark job definitions (SJDs)** are migrated with associated environments.
- **Lake databases** are mapped to Fabric schemas, and managed Delta tables are migrated by creating OneLake catalog shortcuts.

For lake database migration details, the default Synapse database maps to the `dbo` schema in Fabric, and more databases are migrated as schemas in the same Lakehouse.

## How migration works

To migrate Apache Spark pools, notebooks, Spark job definitions, and lake databases to Fabric, the assistant guides you through a short workflow.

### Copy and transform items

First, the assistant helps you locate the source workspace that contains the data engineering items you want to migrate. It then copies and transforms supported items so they can run in a Fabric workspace.

### Monitor migration

During migration, you can monitor progress and review a summary of migrated data engineering items. When migration is complete, the new items are available in your Fabric workspace.

## Get started with the migration assistant

1. Open a Fabric workspace, and then select **Migrate** from the toolbar.

1. In the wizard, select **Data engineering items**.

   :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/migrate-to-fabric.png" alt-text="Screenshot of migrate to fabric." lightbox="media/synapse-to-fabric-spark-migration-assistant/migrate-to-fabric.png":::

1. Specify the source Azure Synapse workspace details. You can search for the source workspace by subscription. After you select the subscription, you can select the source workspace from that subscription. 
   - Enter a migration **Name**.
   - Select the **Subscription** and source **Source workspace**.

   :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/select-a-source.png" alt-text="Screenshot of select a source." lightbox="media/synapse-to-fabric-spark-migration-assistant/select-a-source.png":::

1. Select the target Fabric workspace where items should be migrated.

   The source workspace and target Fabric workspace that you select in the wizard determine the migration direction.

   :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/select-a-destination.png" alt-text="Screenshot of select a destination." lightbox="media/synapse-to-fabric-spark-migration-assistant/select-a-destination.png":::

1. Review available data gateway connections that you can access. Add a new connection if needed.

   :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/select-or-create-a-data-gateway-connection.png" alt-text="Screenshot of select or create a data gateway connection." lightbox="media/synapse-to-fabric-spark-migration-assistant/select-or-create-a-data-gateway-connection.png":::

   - To create a new connection, select **Add new**.

   - The server and path are generated from the default Azure Data Lake Storage Gen2 account and container for the source workspace. This value is required because lake database migration creates shortcuts to the managed-table locations.
   
      :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/new-connection.png" alt-text="Screenshot of new connection." lightbox="media/synapse-to-fabric-spark-migration-assistant/new-connection.png":::

1. Optionally select the data gateway connection to use for this migration run.

   > [!NOTE]
   > If you don't select a gateway connection, databases aren't migrated.
   
1. Review migration details, and then select **Next**.

   :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/finish-and-migrate.png" alt-text="Screenshot of finish and migrate." lightbox="media/synapse-to-fabric-spark-migration-assistant/finish-and-migrate.png":::

   Closing the dialog at this point allows you to cancel the migration:

   :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/cancel-this-migration.png" alt-text="Screenshot of cancel this migration." lightbox="media/synapse-to-fabric-spark-migration-assistant/cancel-this-migration.png":::

1. Select **Migrate** to start migration. 

      :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/migrate.png" alt-text="Screenshot of migration button." lightbox="media/synapse-to-fabric-spark-migration-assistant/migrate.png":::

1. Monitor migration progress. During migration, you can see the status and summary of migrated items. 
   - The spinner indicates that migration started.
   - A notification at the **top-right** corner indicates the progress.
   - A link to the **Migration Report** is available.
   - After a few seconds, you're automatically redirected to the report.

      :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/migrate-spark-items.png" alt-text="Screenshot of migrate spark items." lightbox="media/synapse-to-fabric-spark-migration-assistant/migrate-spark-items.png":::

      >[!NOTE]
      > The migration report can also be accessed from the Monitoring Hub. You can search for the migration job by its migration name or filter by the Spark Job Definition item type.

1. Select the **Migration Report** link from the previous step to review results.

   :::image type="content" source="media/synapse-to-fabric-spark-migration-assistant/migration-summary.png" alt-text="Screenshot of migration summary." lightbox="media/synapse-to-fabric-spark-migration-assistant/migration-summary.png":::

    >[!NOTE]
    > Select **Details** to view additional information about errors or warnings encountered during migration.

## Public preview limitations

- Synapse workspaces under a virtual network (VNET) can't be migrated.
- Spark configurations, custom libraries, and custom executor settings aren't migrated.
- Non-Delta table formats aren't supported.

## Related content
- [Migrate from Azure Synapse Spark to Fabric](migrate-synapse-overview.md)
- [Compare Fabric Spark and Azure Synapse Spark](comparison-between-fabric-and-azure-synapse-spark.md)
- [Migrate Azure Synapse Spark pools to Fabric](migrate-synapse-spark-pools.md)
- [Migrate Azure Synapse notebooks to Fabric](migrate-synapse-notebooks.md)
- [Migrate Spark job definitions from Azure Synapse to Fabric](migrate-synapse-spark-job-definition.md)
- [Migrate Hive Metastore metadata from Azure Synapse to Fabric](migrate-synapse-hms-metadata.md)


