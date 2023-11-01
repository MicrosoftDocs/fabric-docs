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

For HMS considerations, please refer to [differences between Azure Synapse Spark and Fabric](NEEDLINK).

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

* 1.1) **Import migration notebook** to Azure Synapse. [This notebook](NEEDLINK) queries and exports HMS metadata of databases, tables, and partitions to an intermediate directory in OneLake (functions not included yet). Spark internal catalog API is used in this script to read catalog objects.
* 1.2) **Configure the parameters** in the first command to export metadata information to an intermediate storage (OneLake).

```scala

ADD CODE

```

* 1.3) **Run all notebook commands** to export catalog objects to OneLake. Once all cells are completed, you will be able to see this folder structure under the intermediate output directory.

:::image type="content" source="media\migrate-synapse\migrate-hms-metadata-export-api.png" alt-text="Screenshot showing HMS export in OneLake.":::

### Step 2: Import metadata into Fabric lakehouse

Step 2 is when the actual metadata is imported from intermediate storage into the Fabric lakehouse. The output of this step is to have all HMS metadata (databases, tables, and partitions) migrated. This process is as follows:

* **2.1) Create a shortcut within the “Files” section** of the lakehouse. This shortcut needs to point to the source Spark warehouse directory in the HMS and it will be used later to do the replacement for Spark managed tables. In the example below, you can see three shortcuts pointing to Azure Databricks, Azure Synapse Spark and HDInsight Spark warehouse directories.

:::image type="content" source="media\migrate-synapse\migrate-hms-warehouse-directory.png" alt-text="Screenshot showing warehouse directory options.":::

* **2.2) Import metadata notebook** to Fabric lakehouse. Import [this notebook ](NEEDLINK)to import database, table, and partition objects from intermediate storage. Spark internal catalog API is used in this script to create catalog objects in Fabric.
* **2.3) Configure the parameters** in the first command. In Apache Spark, when you create a managed table, the data for that table is stored in a location managed by Spark itself, typically within the Spark's warehouse directory. The exact location is determined by Spark. This contrasts with external tables, where you specify the location and manage the underlying data. When you migrate the metadata of a managed table (without moving the actual data), the metadata still contains the original location information pointing to the old Spark warehouse directory. Hence, for managed tables, `WarehouseMappings` is used to do the replacement using the shortcut created in step 2.1. Similarly, for external tables, you can change the path using `WarehouseMappings` or keep original data location, e.g., ADLS Gen2 (assuming the right permissions are set to access the data). All source managed tables are converted as external tables into Fabric Spark metastore using this script. `LakehouseId` refers to the lakehouse created in step 2.1 containing shortcuts.

```scala

ADD CODE

```

* **2.4) Run all notebook commands** to import catalog objects from intermediate path.

> [!NOTE]
> When importing multiple databases, you can (i) create one lakehouse per database (the approach used here), or (ii) move all tables from different databases to a single lakehouse. For the latter, all migrated tables could be `<lakehouse>.<db_name>_<table_name>`, and you will need to adjust the import notebook accordingly.

### Step 3: Validate content

Step 3 is where you validate that metadata has been migrated successfully. See different examples below.
You can see the databases imported by running:

```python
%%sql
SHOW DATABASES
```

You can check all tables in a lakehouse (database) by running:

```python
%%sql
SHOW TABLES IN <lakehouse_name>
```

You can see the details of a particular table by running:

```python
%%sql
DESCRIBE EXTENDED <lakehouse_name>.<table_name>
```

Alternatively, all imported tables will be visible within the Lakehouse explorer UI “Tables” section for each lakehouse. 

:::image type="content" source="media\migrate-synapse\migrate-hms-metadata-import-lakehouse.png" alt-text="Screenshot showing HMS metadata imported in the lakehouse.":::


### Additional Considerations

-	Scalability: The solution here is using internal Spark catalog API to do import/export, but it is not connecting directly to HMS to get catalog objects, so the solution may not scale well if the catalog is large. You would need to change the export logic using HMS DB.
-	Data accuracy: There is no isolation guarantee, which means that if the source Spark compute engine is doing concurrent modifications to the metastore while the migration notebook is running, inconsistent data can be introduced in Fabric lakehouse.

## Next steps

- [Azure Synapse Spark vs. Fabric Spark](NEEDLINK)
- Learn more about migration options for [Spark pools](migrate-synapse-spark-pools.md), [configurations](migrate-synapse-spark-configurations.md), [libraries](migrate-synapse-spark-libraries.md), [notebooks](migrate-synapse-notebooks.md) and [Spark Job Definitions (SJD)](migrate-synapse-sjd.md)

