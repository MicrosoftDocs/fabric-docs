---
title: "Migrate from Azure Synapse Link to Azure Cosmos DB mirroring in Microsoft Fabric"
description: Learn how to migrate from Azure Synapse Link for Azure Cosmos DB to Cosmos DB mirroring in Microsoft Fabric, including standard migration and historical data backfill guidance.
author: jmaldonado
ms.author: jmaldonado
ms.reviewer: jmaldonado, mjbrown
ms.date: 03/13/2026
ms.topic: how-to
ai-usage: ai-assisted
no-loc: [Copilot]
---

# Migrate from Azure Synapse Link to Cosmos DB mirroring in Microsoft Fabric

This article guides you through migrating your analytical workloads from Azure Synapse Link for Azure Cosmos DB to Cosmos DB mirroring in Microsoft Fabric.

## Prerequisites

- An existing Azure Cosmos DB for NoSQL account with Synapse Link enabled.
- An existing Fabric capacity. If you don't have an existing capacity, [start a Fabric trial](../fundamentals/fabric-trial.md).
- Workspace permissions to create and manage mirrored databases.

## Overview

Azure Synapse Link for Azure Cosmos DB provided a no-ETL analytics path by replicating data into an analytical store. Azure Cosmos DB mirroring in Microsoft Fabric replaces this experience with improved performance, simpler configuration, and deeper integration with the Fabric analytics platform.

This guide covers two migration paths depending on your scenario:

- **[Standard migration](#standard-migration)** — For customers who want to move from Synapse Link to Cosmos DB mirroring. All current data in your transactional store is replicated by mirroring, and you can redirect downstream consumers directly.
- **[Migration with historical data preservation](#migration-with-historical-data-preservation)** — For customers whose Analytical TTL (ATTL) outlives their Transactional TTL (TTTL), including when ATTL is infinite (-1) and TTTL is finite, or when both are finite but ATTL > TTTL. In either case, historical data that has expired from the transactional store still exists in the analytical store and needs to be backfilled into Fabric.

### Quick comparison: Azure Synapse Link vs. Cosmos DB mirroring

| Feature | Azure Synapse Link | Cosmos DB mirroring |
|---|---|---|
| Supported APIs | NoSQL, MongoDB, Gremlin, Table, Cassandra | NoSQL only |
| Analytical store | Separate column store within Azure Cosmos DB | Delta tables in OneLake |
| Data format | Azure Cosmos DB analytical store format | Open-source Delta Lake format |
| Query engines | Synapse SQL serverless, Spark | Fabric SQL analytics endpoint, Spark, Power BI (DirectLake) |
| RU impact | Consumes RUs for analytical store writes | No RU consumption for replication |
| Configuration | Enable per-container analytical TTL | Configure at database level in Fabric |

<!-- TODO  Need to add this once comparison doc is complete
For a detailed feature-by-feature comparison, see [Compare Azure Synapse Link and Azure Cosmos DB mirroring in Microsoft Fabric](TODO: add link to comparison doc).
-->

> [!IMPORTANT]
> **Only the Azure Cosmos DB for NoSQL API has a migration path to Cosmos DB mirroring in Fabric.** The following APIs do not currently have a supported migration path:
>
> - Azure Cosmos DB for MongoDB
> - Azure Cosmos DB for Apache Gremlin
> - Azure Cosmos DB for Table
> - Azure Cosmos DB for Apache Cassandra
>
> If you use one of these APIs with Azure Synapse Link, there is no equivalent Cosmos DB mirroring experience available at this time. If you depend on Synapse Link for one of these APIs, continue using Azure Synapse Link until Cosmos DB mirroring support is announced.

## Identify containers with Synapse Link enabled

Before choosing a migration path, identify which containers in your Azure Cosmos DB account have Synapse Link (analytical TTL) enabled and review their TTL configuration.

> [!div class="nextstepaction"]
> [Download the Synapse Link script from the Azure Cosmos DB Fabric samples gallery](https://github.com/AzureCosmosDB/cosmos-fabric-samples/tree/main/disable-synapse-link)

<!-- TODO: Update link once discovery script is separated from disable script -->

The script enumerates all databases and containers in your Azure Cosmos DB account and detects which containers have analytical storage enabled (`analyticalStorageTTL != 0`). Use the `-ListEnabled` or `--list-enabled` flag to preview the list without making any changes.

To determine your migration path, you also need to check the Transactional TTL (TTTL) for each container. You can view TTTL settings in the Azure portal under each container's **Settings** > **Time to Live**, or by using the Azure CLI:

```azurecli
az cosmosdb sql container show \
  --resource-group <resource-group> \
  --account-name <account-name> \
  --database-name <database-name> \
  --name <container-name> \
  --query "{name:name, defaultTtl:resource.defaultTtl, analyticalStorageTtl:resource.analyticalStorageTtl}"
```

Use the output to determine which migration path applies to each container:

- If TTTL and ATTL are both infinite (-1), or your transactional store contains all the data you need, use the [standard migration](#standard-migration).
- If ATTL outlives TTTL (including ATTL infinite with TTTL finite), use [migration with historical data preservation](#migration-with-historical-data-preservation).

In addition to the container discovery, inventory your downstream dependencies — Synapse SQL serverless pools, Spark notebooks, Power BI reports, or pipelines that query the analytical store. Record any custom schemas or column mappings used in Synapse queries.

## Standard migration

Use this path if your transactional store contains all the data you need for analytics — that is, you don't have historical data in the analytical store that has expired from the transactional store. This includes scenarios where both your Transactional TTL (TTTL) and Analytical TTL (ATTL) are set to infinite (-1), since no data expires from the transactional store.

### Step 1: Create a Cosmos DB mirroring artifact

1. In your Fabric workspace, select **New item** > **Mirrored Azure Cosmos DB**.
1. Follow the [Azure Cosmos DB mirroring tutorial](azure-cosmos-db-tutorial.md) to configure the connection to your NoSQL account.
1. Verify that the initial replication completes successfully and that the expected containers appear as delta tables.

### Step 2: Validate data parity

1. Compare row counts and sample data between the Synapse Link analytical store and the new mirrored tables in Fabric.
1. Verify that schema representation, including nested and array properties, matches your expectations. For guidance, see [Query nested data](azure-cosmos-db-how-to-query-nested.md).

### Step 3: Redirect downstream consumers

1. Update Synapse SQL serverless queries to use the Fabric SQL analytics endpoint or Spark.
1. Reconfigure Power BI reports to use DirectLake mode against the mirrored database.
1. Migrate Synapse Spark notebooks to Fabric notebooks. For guidance, see [Access data using Lakehouse and notebooks](azure-cosmos-db-lakehouse-notebooks.md).
1. Test all downstream workflows to confirm they function correctly.

### Step 4: Disable Synapse Link

After confirming all consumers are using Cosmos DB mirroring:

> [!div class="nextstepaction"]
> [Download the disable Synapse Link script from the Azure Cosmos DB Fabric samples gallery](https://github.com/AzureCosmosDB/cosmos-fabric-samples/tree/main/disable-synapse-link)

1. Use the script from the samples gallery to disable the analytical TTL on each container and stop writing to the Synapse Link analytical store.
1. Remove the Synapse linked service and associated Synapse resources that are no longer needed.

> [!CAUTION]
> Only disable Synapse Link after you've fully validated the migration. Once the analytical store is disabled, historical data in it is no longer accessible.

## Migration with historical data preservation

Use this path if your Analytical TTL (ATTL) outlives your Transactional TTL (TTTL). This includes when ATTL is infinite (-1) and TTTL is finite, or when both are finite but ATTL > TTTL. In either case, records expire and are removed from the transactional store while still being retained in the analytical store. Because Cosmos DB mirroring replicates from the transactional store, it doesn't include those expired records.

> [!NOTE]
> If both TTTL and ATTL are set to infinite (-1), no data expires from the transactional store and you can use the [standard migration](#standard-migration) path instead.

For example, if your TTTL is 30 days and your ATTL is 365 days, you have up to 335 days of historical data that only exists in the analytical store. Without a backfill, that data would be lost when you disable Synapse Link.

The following steps migrate that historical analytical store data into OneLake and combine it with the mirrored data into a single queryable dataset.

### Target architecture

After migration, your data in Fabric consists of:

- **/table_historical** — A one-time backfill of historical data from the Synapse Link analytical store, written as delta tables.
- **/table** — The Cosmos DB mirroring target (read-only), containing ongoing incremental data.
- **Lakehouse** — Contains both datasets as shortcuts.
- **SQL view (final_table)** — A canonical view that unions both datasets, providing a single table for downstream consumers.

Downstream queries can use the unified view:

```sql
SELECT * FROM final_table;
```

No ongoing pipelines, MERGE jobs, or compute costs are required to maintain this architecture outside of query execution.

### Cutover timestamp strategy

To avoid duplicate records between the historical backfill and the mirrored data, this migration uses a deterministic cutover timestamp (`cutover_ts`):

- **Historical dataset**: all records where `_ts < cutover_ts`
- **Mirrored dataset**: all records where `_ts >= cutover_ts`

This boundary guarantees no duplicates without MERGE jobs. Choose a `cutover_ts` value (Unix timestamp) that aligns with when you enable mirroring.

### Step 1: Enable Cosmos DB mirroring

1. In your Fabric workspace, select **New item** > **Mirrored Azure Cosmos DB**.
1. Follow the [Azure Cosmos DB mirroring tutorial](azure-cosmos-db-tutorial.md) to configure the connection to your NoSQL account.
1. Record your cutover timestamp (`cutover_ts`) as a Unix timestamp at the time you enable mirroring. Mirroring starts from the earliest available data in the change feed, so it might overlap with historical data in the analytical store. The cutover timestamp resolves this overlap.
1. Verify that the initial replication completes successfully and that the expected containers appear as delta tables.

### Step 2: Run the historical backfill notebook

Use the migration notebook to perform a one-time backfill of historical data from the Synapse Link analytical store into OneLake, aligned to the Cosmos DB mirroring schema.

> [!div class="nextstepaction"]
> [Download the migration notebook from the Azure Cosmos DB Fabric samples gallery](https://github.com/AzureCosmosDB/cosmos-fabric-samples/tree/main/migrate-synapse-link)

The notebook handles:

- Reading the Cosmos DB mirroring schema from your delta tables in OneLake.
- Reading historical data from the Synapse Link analytical store.
- Aligning the analytical store schema to match the mirroring schema (nested type conversion, type casting, missing columns).
- Filtering records to only those before the cutover timestamp.
- Writing the aligned historical dataset as delta tables.

#### Prerequisites for the backfill

In addition to the [common prerequisites](#prerequisites), you also need:

- Access to the Synapse Link analytical store linked service name for your Azure Cosmos DB account.
- Workspace permissions to create and manage Lakehouses.

#### Notebook parameters

When you run the notebook, provide the following input parameters:

| Parameter | Description |
|---|---|
| `analytical_linked_service` | The Synapse linked service name for your Azure Cosmos DB analytical store. |
| `container_name` | The Azure Cosmos DB container name to migrate. |
| `mirror_path` | The OneLake path to the Cosmos DB mirroring delta table (for example, `abfss://<workspace>@onelake.dfs.fabric.microsoft.com/<lakehouse>.Lakehouse/Tables/<container>`). |
| `historical_data_write_path` | The OneLake path where the historical backfill delta table is written (for example, `abfss://<workspace>@onelake.dfs.fabric.microsoft.com/<lakehouse>.Lakehouse/Tables/<container>_historical`). |
| `cutover_ts` | The Unix timestamp you recorded in Step 1. |

This is a one-time execution. After the write completes, validate the row count before proceeding.

### Step 3: Set up Lakehouse and canonical view

Create a Lakehouse that provides a unified view of both the historical and mirrored data. This step uses metadata-level shortcuts — no data is copied or moved.

#### Add shortcuts

In your Lakehouse, add two shortcuts:

- **/table_historical** — Points to `historical_data_write_path` (the backfill output).
- **/table** — Points to `mirror_path` (the Cosmos DB mirroring target).

You can add shortcuts through the Fabric UI or the Fabric REST API.

#### Create the canonical view

Run the following SQL view script in the Fabric SQL analytics endpoint to create a unified view:

```sql
CREATE OR REPLACE VIEW final_table AS
SELECT * FROM table_historical WHERE _ts < <cutover_ts>
UNION ALL
SELECT * FROM table WHERE _ts >= <cutover_ts>;
```

Replace `<cutover_ts>` with the Unix timestamp you recorded in Step 1.

This view:

- Lives inside the Lakehouse.
- Requires no data movement.
- Incurs no compute cost unless queried.
- Provides a single canonical table for all downstream consumers.

### Step 4: Validate the migration

Run the following queries to verify the migration:

```sql
SELECT COUNT(*) FROM final_table;
SELECT MIN(_ts), MAX(_ts) FROM final_table;
```

Confirm that:

- The total row count matches your expectations.
- There's no overlap or gap across the cutover boundary.
- Downstream reports and queries return consistent results against `final_table`.

### Step 5: Disable Synapse Link

After validation, disable Azure Synapse Link and the analytical store on your Azure Cosmos DB containers.

> [!div class="nextstepaction"]
> [Download the disable Synapse Link script from the Azure Cosmos DB Fabric samples gallery](https://github.com/AzureCosmosDB/cosmos-fabric-samples/tree/main/disable-synapse-link)

1. Use the script from the samples gallery to disable the analytical TTL on each container and stop writing to the Synapse Link analytical store.
1. Remove the Synapse linked service and associated Synapse resources that are no longer needed.

> [!CAUTION]
> Only disable Synapse Link after you've fully validated the migration. Once the analytical store is disabled, historical data in it is no longer accessible.

### Frequently asked questions

The following table addresses common questions when combining historical and mirrored data.

| Question | Answer |
|---|---|
| Will I get duplicate records when combining historical and mirrored data? | No. The cutover timestamp (`cutover_ts`) creates a clean boundary — historical data includes records where `_ts < cutover_ts` and mirrored data includes records where `_ts >= cutover_ts`, so no records overlap. |
| Will the analytical store schema match the mirroring schema? | The migration notebook automatically aligns the analytical store schema to the mirroring schema, handling type conversions and missing columns. |
| Why can't I write historical data directly into the mirrored table? | Mirrored tables are read-only. Historical data is written to a separate delta table and combined with mirrored data through a SQL view. |
| Do I need ongoing pipelines to keep the data unified? | No. The SQL view combines both datasets at query time with no recurring jobs, data movement, or compute costs. |
| Will query performance be affected? | Cosmos DB mirroring uses Delta Lake format in OneLake, which provides better analytical performance than the Synapse Link analytical store. The SQL view unions both datasets using metadata-level operations with no additional compute. |

## APIs without a migration path

The following Azure Cosmos DB APIs are supported by Azure Synapse Link but do **not** currently have a Cosmos DB mirroring equivalent:

| API | Cosmos DB mirroring support |
|---|---|
| Azure Cosmos DB for MongoDB | Not available |
| Azure Cosmos DB for Apache Gremlin | Not available |
| Azure Cosmos DB for Table | Not available |
| Azure Cosmos DB for Apache Cassandra | Not available |

If you depend on Synapse Link for one of these APIs, continue using Azure Synapse Link until Cosmos DB mirroring support is announced. Check the [Azure Cosmos DB mirroring limitations](azure-cosmos-db-limitations.md) page for the latest updates.

## Troubleshooting

For common issues, see [Troubleshoot mirrored Azure Cosmos DB](azure-cosmos-db-troubleshooting.yml).

## Related content

- [Mirrored databases from Azure Cosmos DB](azure-cosmos-db.md)
- [Azure Cosmos DB mirroring tutorial](azure-cosmos-db-tutorial.md)
- [Query nested data](azure-cosmos-db-how-to-query-nested.md)
- [Access data using Lakehouse and notebooks](azure-cosmos-db-lakehouse-notebooks.md)
- [Limitations in mirrored Azure Cosmos DB](azure-cosmos-db-limitations.md)
