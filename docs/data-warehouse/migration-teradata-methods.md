---
title: Migration Methods for Teradata to Fabric Data Warehouse
description: Learn how to migrate Teradata metadata and data to Microsoft Fabric Data Warehouse by using Migration Assistant, Copy job, and COPY INTO.
ms.reviewer: prlangad, arturv
ms.date: 09/21/2026
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ai-usage: ai-assisted
---

# Migration methods for Teradata to Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

A Teradata migration has two primary steps: migrate metadata with Fabric Migration Assistant, then move data with Copy job, a Fabric pipeline, or [COPY INTO](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true). Complete the migration by validating results and rerouting connections.

For program planning, see [Plan a migration from Teradata](migration-teradata-planning.md). For syntax and object mappings, see [Translate Teradata SQL for Fabric Data Warehouse](migration-teradata-sql-translation.md).

## Recommended migration path

| Stage | Recommended method | Result |
|---|---|---|
| Metadata | Upload a zip of Teradata `.sql` and/or `.bteq` files to Migration Assistant | Supported objects are translated and created in a new Warehouse |
| Remediation | Review **Objects to fix** and use documented mappings or Copilot suggestions | Required objects are corrected and deployed |
| Data | Use Copy job for a guided transfer; use staged files and `COPY INTO` for large bulk loads | Source data is loaded and reconciled |
| Cutover | Validate workloads and reroute loading and reporting connections | Applications use Fabric Data Warehouse |

> [!NOTE]
> Migration Assistant translates and deploys metadata and code. Data movement runs as a separate Copy job or ingestion step in the migration workflow.

## Prerequisites

Before you begin, prepare:

- A Fabric workspace with active capacity.
- A zip archive of `.sql` and/or `.bteq` files containing Teradata table, view, procedure, function, macro, and other required object definitions.
- All dependencies for the schemas in the migration wave.
- A destination Warehouse name and collation choice.
- Source credentials if you plan to use Copy job for data movement.

Include DDL definitions rather than files that contain only standalone `SELECT` statements. Migration Assistant ignores query-only files that don't define an object.

## Migrate metadata with Migration Assistant

Migration Assistant supports Teradata as a source and translates uploaded Teradata metadata to Fabric-compatible T-SQL.

1. In your Fabric workspace, select **Migrate**.
1. Under **Migrate to a warehouse**, select the **Teradata (Preview)** source tile.
1. On **Set the source**, select **Choose file**, browse your zip file, and then select **Next**.
1. Review the detected source objects and select the schemas or individual objects for this migration wave.
    - When you select an individual object, you can also see the dependent objects selected for migration.
1. On **Set the destination**, select the workspace, enter the new Warehouse name, and choose the collation.
1. Review the inputs, then select **Migrate**.
1. Wait while Migration Assistant translates supported metadata and creates the new Warehouse.
1. Review the metadata migration summary. Expand **Show migrated objects** to see each object and its state.
1. Select an object to review datatype or SQL adjustments in **Details**.
1. Export the summary when you need an offline record for review or migration tracking.

Objects with missing dependencies or unsupported constructs appear under **Objects to fix**.

## Fix metadata translation problems

Use Migration Assistant to review and correct objects that it doesn't create automatically:

1. Open **Fix problems** and select an object.
1. Review the source definition, automatic translation comments, and error details in the shared query.
1. If Copilot is enabled for your tenant and capacity, select **Fix query errors** to generate a suggested correction.
1. Review all AI-generated changes. Adjust the script as needed.
1. Select **Run** to validate the script and create the object.
1. Repeat for each required object. Skip objects that aren't needed in the target.

Copilot can make mistakes. Compare corrected code with Teradata behavior and test boundary, null, precision, and error cases.

## Copy data

After the required table metadata exists, choose one data movement method.

### Use Copy job

Use Copy job for a guided full or incremental transfer:

1. In Migration Assistant, open **Copy data**, and then select **Use a copy job**.
1. Name the job and connect to Teradata by using the source credentials.
1. Select the tables to copy.
1. Select the Warehouse from the OneLake catalog.
1. Review table and column mappings.
1. Choose a one-time full copy for the initial migration, or incremental copy for a coexistence period when the source configuration supports it.
1. Select **Save + Run**, and then monitor row counts, duration, and failures.

### Use staged files and COPY INTO

For large historical transfers, bulk unload Teradata tables to ADLS Gen2. Use Parquet files when supported, keep an extraction manifest, and load the files by using [COPY INTO](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true).

Example:

```sql
COPY INTO dbo.FactSales
FROM 'https://<storage-account>.dfs.core.windows.net/<container>/factsales/'
WITH (
    FILE_TYPE = 'PARQUET'
);
```

Use [trusted workspace access](../security/security-trusted-workspace-access.md) and a workspace identity when the storage account network configuration requires them. Use a Fabric pipeline instead when the flow requires multi-step orchestration, transformations, branching, or custom recovery.

## Replace Teradata loading utilities

Teradata utilities represent both data movement and orchestration behavior. Recreate the complete behavior rather than translating only the load statement.

| Teradata utility | Fabric method | Migration pattern |
|---|---|---|
| FastLoad | `COPY INTO` or Copy job | Bulk unload to staged files, create an empty target table, and load in parallel |
| MultiLoad | `COPY INTO` plus `MERGE` | Load files into a staging table, validate, then merge inserts, updates, and deletes into the target |
| Teradata Parallel Transporter | Fabric pipeline with copy and script activities | Recreate operators, sequencing, error handling, and dependencies as explicit pipeline steps |
| BTEQ `.IMPORT` | `COPY INTO` a table | Replace client-side import behavior with a governed staged-file load |
| BTEQ `.EXPORT` | Pipeline, notebook, or supported export pattern | Select the destination and file format based on the consuming system |

## Validate and reroute connections

Before cutover:

- Reconcile row counts, aggregates, nulls, decimals, timestamps, and collation-sensitive values.
- Test views, procedures, functions, BTEQ replacements, reports, and semantic models.
- Test failed-load replay, partial failure, incremental synchronization, and peak concurrency.
- Compare source and target results for representative business cycles.
- Run a final delta load and complete the cutover checklist.
- Update reporting, semantic model, application, and ETL/ELT connections to the Fabric Data Warehouse.

## Related content

- [Plan a migration from Teradata](migration-teradata-planning.md)
- [Translate Teradata SQL for Fabric Data Warehouse](migration-teradata-sql-translation.md)
- [Migrate by uploading a file](migrate-using-upload-file.md)
- [Ingest data into the Warehouse](ingest-data.md)
- [Create a Copy job](../data-factory/create-copy-job.md)
- [Develop Warehouse projects in Visual Studio Code](develop-warehouse-project.md)
