---
title: Migrate data and pipelines from Azure Synapse to Microsoft Fabric
description: Learn about your different options for migrating data and pipelines from Azure Synapse to Microsoft Fabric.
ms.reviewer: sngun
ms.author: aimurg
author: murggu
ms.topic: conceptual
ms.custom:
  - fabric-cat
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Migrate data and pipelines from Azure Synapse to Microsoft Fabric

The first step in data and pipeline migration is to identify the data that you want to make available in OneLake, and the pipelines you intend to move.

You have two options for data migration:

* Option 1: Azure Data Lake Storage (ADLS) Gen2 as default storage. If you’re currently using ADLS Gen2 and want to avoid data copying, consider using [OneLake shortcuts](../onelake/onelake-shortcuts.md).
* Option 2: OneLake as default storage. If you want to move from ADLS Gen2 to OneLake as a storage layer, consider reading/writing from/to OneLake from your notebooks and Spark job definitions.

## Data migration

### Option 1: ADLS Gen2 as storage (shortcuts)

If you’re interacting with ADLS Gen2 and want to avoid data duplication, you can create a shortcut to the ADLS Gen2 source path in OneLake. You can create shortcuts within the **Files** and **Tables** sections of the lakehouse in Fabric with the following considerations:

* The **Files** section is the unmanaged area of the lake. If your data is in CSV, JSON, or Parquet format, we recommend creating a shortcut to this area.
* The **Tables** section is the managed area of the lake. All tables, both Spark-managed and unmanaged tables, are registered here. If your data is in Delta format, you can create a shortcut in this area and the automatic discovery process automatically registers those Delta tables in the lakehouse’s metastore.

Learn more on creating an [ADLS Gen2 shortcut](../onelake/create-adls-shortcut.md).

### Option 2: OneLake as storage

To use OneLake as a storage layer and move data from ADLS Gen2, you should initially point the Azure Synapse Spark-related items to OneLake and then transfer the existing data to OneLake. For the former, see [integrate OneLake with Azure Synapse Spark](../onelake/onelake-azure-synapse-analytics.md).

To move the existing data to OneLake, you have several options:

* **mssparkutils fastcp**: The [mssparkutils](microsoft-spark-utilities.md) library provides a fastcp API that enables you to copy data between from ADLS Gen2 to OneLake.
* **AzCopy**: You can use [AzCopy](/azure//storage/common/storage-use-azcopy-v10/) command-line utility to copy data from ADLS Gen2 to OneLake.
* **Azure Data Factory, Azure Synapse, and Data Factory in Fabric**: Use [copy activity](../data-factory/copy-data-activity.md) to copy data to the lakehouse.
* **Use shortcuts**: You can enable ADLS Gen2 historical data in OneLake using [shortcuts](../onelake/create-adls-shortcut.md). No data copy needed.
* **Azure Storage Explorer**: You can move files from ADLS Gen2 location to OneLake using Azure Storage Explorer. See [how integrate OneLake with Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md).

## Pipelines migration (Spark-related activities)

If your Azure Synapse data pipelines include notebook and/or Spark job definition activities, you will need to move those pipelines from Azure Synapse to Data Factory data pipelines in Fabric, and reference the target notebooks. The [notebook activity](../data-factory/notebook-activity.md) is available in Data Factory data pipelines. See all  supported data pipeline activities in Fabric [here](../data-factory/activity-overview.md).

- For Spark-related data pipeline activity considerations, refer to [differences between Azure Synapse Spark and Fabric](comparison-between-fabric-and-azure-synapse-spark.md).
- For notebook migration, refer to [migrate notebooks from Azure Synapse to Fabric](migrate-synapse-notebooks.md).
- For data pipeline migration, see [migrate to Data Factory in Fabric](../data-factory/upgrade-paths.md).

## Related content

- [Migrate Spark notebooks](migrate-synapse-notebooks.md)
- [Migrate Spark job definition](migrate-synapse-spark-job-definition.md)
- [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md)
