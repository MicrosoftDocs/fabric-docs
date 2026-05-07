---
title: Migrate Hive Metastore metadata and data paths to Fabric
description: Migrate Hive Metastore objects and align data access with OneLake shortcuts and data movement options for Synapse to Fabric migration.
ms.topic: how-to
ms.date: 04/28/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Phase 3: Hive Metastore and data migration

This article is Phase 3 of 4 in the Azure Synapse Spark to Microsoft Fabric migration best practices series.

Use this article when you're ready to migrate your Hive Metastore catalog and plan data access in Fabric. This article focuses on two decisions: how to migrate your table metadata and whether to use OneLake shortcuts (zero-copy) or move data to accessible storage.

In this article, you learn how to:

- Assess managed vs. external tables to determine your migration approach.
- Export and import Hive Metastore metadata using notebook workflows.
- Create OneLake shortcuts for zero-copy access to existing data sources.
- Choose between shortcuts, copy pipelines, and bulk transfer tools for data movement.

> [!TIP]
> Create your target Lakehouse with schemas enabled. Lakehouse schemas allow you to organize tables into named collections (for example, sales, marketing, hr). The Spark Migration Assistant maps the default Synapse database to the `dbo` schema and additional databases to additional schemas in the same Lakehouse. Schemas are enabled by default when creating a new Lakehouse in the Fabric portal.

For the full HMS migration guide, see [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md).

## Assess managed vs. external tables

The critical first step is distinguishing managed from external tables in your Synapse Hive Metastore.

- **External tables:** If data is in ADLS Gen2 in Delta format, create OneLake shortcuts directly to the ADLS Gen2 paths. No data movement needed.
- **Managed tables:** Data is stored in Synapse's internal warehouse directory. You must create OneLake shortcuts to this path or copy data to an accessible ADLS Gen2 location.

Synapse managed table warehouse directory path:

```
abfss://<container>@<storage>.dfs.core.windows.net/synapse/workspaces/<workspace>/warehouse
```

## Migration workflow

Microsoft provides export/import notebooks for Hive Metastore migration. The process has two phases.

For the full HMS migration guide, see [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md).

### Phase 1: Export metadata from Synapse

1. **Import the HMS export notebook** into your Azure Synapse workspace. This notebook queries and exports HMS metadata of databases, tables, and partitions to an intermediate directory in OneLake.

1. **Configure parameters.** Set your Synapse workspace name, database names to export, and the target OneLake lakehouse for staging. The Spark internal catalog API is used to read catalog objects.

1. **Run the export.** Execute all notebook cells. Metadata is written to the Files section of your Fabric Lakehouse in a structured folder hierarchy.

### Phase 2: Import metadata into Fabric Lakehouse

1. **Create shortcuts for data access.** Create a shortcut within the Files section of the Lakehouse pointing to the Synapse Spark warehouse directory. This makes managed table data accessible to Fabric.

1. **Configure warehouse mappings.** For managed tables, provide `WarehouseMappings` to replace old Synapse warehouse directory paths with the shortcut paths in Fabric. All managed tables are converted to external tables during import.

1. **Run the import notebook** in Fabric to create catalog objects (databases, tables, partitions) in the Lakehouse using Spark's internal catalog API.

1. **Verify.** Check that all imported tables are visible in the Lakehouse Explorer UI's Tables section.

## Limitations and considerations

- The migration scripts use Spark's internal catalog API, not direct HMS database connections. This might not scale well for very large catalogs — for large environments, consider modifying the export logic to query the HMS database directly.

- There's no isolation guarantee during export. If Synapse Spark compute modifies the metastore concurrently, inconsistent data might be introduced. Schedule migration during a maintenance window.

- Functions aren't included in the current migration scripts.

- After migration, OneLake shortcuts provide ongoing data access. If Synapse continues writing to the same ADLS Gen2 paths, Fabric sees the updated data through shortcuts automatically (data-level sync). However, new tables or schema changes in the Synapse HMS won't propagate automatically — you must re-run the migration scripts or manually create new tables in the Fabric Lakehouse.

- **External Hive Metastore (Azure SQL DB / MySQL):** Some Synapse workspaces use an external HMS backed by Azure SQL Database or Azure Database for MySQL to persist catalog metadata outside the workspace and share it with HDInsight or Databricks. Fabric doesn't support connecting to an external Hive Metastore — it uses the Lakehouse catalog exclusively. If you use an external HMS, you must migrate the metadata into the Fabric Lakehouse catalog. You can do this by querying the external HMS database directly (via JDBC) to export table definitions and then recreating them in Fabric using Spark SQL or the HMS import notebooks. Note that external HMS support in Synapse is deprecated after Spark 3.4.

> [!TIP]
> For ongoing synchronization when both Synapse and Fabric are active: use OneLake shortcuts for data-level sync (automatic), and schedule periodic re-runs of the HMS export/import notebooks or build a reconciliation notebook to detect and sync new tables.

## Data migration options

You have data in ADLS Gen2 linked to your Synapse workspace that you need to make accessible in Fabric Lakehouse without unnecessary data duplication. Choose from the following approaches.

- **OneLake Shortcuts (recommended, zero-copy):** Create shortcuts in Fabric Lakehouse pointing to your existing ADLS Gen2 paths. Delta format data in the Tables section auto-registers in the Lakehouse catalog. CSV/JSON/Parquet data goes in the Files section. No data movement required.

- **mssparkutils fastcp:** For copying data from ADLS Gen2 to OneLake within notebooks.

- **AzCopy:** Command-line utility for bulk data copy from ADLS Gen2 to OneLake.

- **Data Factory Copy Activity:** Use Fabric Data Factory (or existing ADF/Synapse pipelines) to copy data to the Lakehouse.

- **Azure Storage Explorer:** Visual tool for moving files from ADLS Gen2 to OneLake.

> [!TIP]
> Prefer shortcuts over data movement whenever possible. Shortcuts avoid data duplication and storage costs, and Delta tables in the Tables section are automatically discoverable in the SQL analytics endpoint and Power BI.

## Related content

- [Phase 1: Migration strategy and planning](synapse-migration-strategy-planning.md)
- [Phase 2: Spark workload migration](synapse-migration-spark-workloads.md)
- [Phase 3: Hive Metastore and data migration](synapse-migration-hms-data.md)
- [Phase 4: Security and governance migration](synapse-migration-security-validation-cutover.md)
