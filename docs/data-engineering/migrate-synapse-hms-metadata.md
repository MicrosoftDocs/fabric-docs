---
title: Migrate Hive Metastore metadata
description: Learn about how to migrate HMS metadata from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: migration
ms.custom: ignite-2023
ms.date: 11/03/2023
---

# Migrate Hive Metastore metadata

The initial step in the Hive Metastore (HMS) migration involves determining the databases, tables, and partitions you want to transfer. It's not necessary to migrate everything; you can select specific databases. When identifying databases for migration, make sure to verify if there are managed or external Spark tables. Additionally, pay attention to table properties, including data formats (e.g., csv, json, parquet, Delta) and partitions.

## Option 1: Import/Export HMS to Lakehouse metastore

Follow these two key steps for migration:
* Pre-migration steps
* Step 1: Export metadata from source HMS
* Step 2: Import metadata into Fabric lakehouse
* Post-migration steps: Validate content

Note: scripts only copy Spark catalog objects (i.e., metadata in HMS) to Fabric lakehouse. Assumption is that the data is already copied (e.g., from warehouse location to ADLS Gen2) or available for managed and external tables (e.g. via shortcuts — preferred) into the Fabric lakehouse.  

### Pre-migration steps
The pre-migration steps include actions you need to consider prior to beginning Spark metadata migration from source HMS to Fabric lakehouse. These involves:

* If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.
* If you don’t have one already, create a [Fabric lakehouse](tutorial-build-lakehouse.md) in your workspace. 

### Step 1: Export metadata from source HMS

The focus of Step 1 is on exporting the metadata from source HMS to OneLake, i.e., to the Files section within your Fabric lakehouse. This process is as follows:

* 1.1) **Import migration notebook** to Azure Synapse. [This notebook](TBC) queries and exports HMS metadata of databases, tables, and partitions to an intermediate directory in OneLake (functions not included yet). Spark internal catalog API is used in this script to read catalog objects.
* 1.2) **Configure the parameters** in the first command to export metadata information to an intermediate storage (OneLake).

```scala

TBC

```

* 1.3) Run all notebook commands to export catalog objects to OneLake. Once all cells are completed, you will be able to see this folder structure under the intermediate output directory.

:::image type="content" source="media\migrate-synapse\migrate-hms-metadata-export-api.png" alt-text="Screenshot showing HMS export in OneLake.":::
