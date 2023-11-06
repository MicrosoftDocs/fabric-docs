---
title: Migrate data and pipelines from Azure Synapse to Microsoft Fabric
description: Learn about your different options for migrating data and pipelines from Azure Synapse to Microsoft Fabric.
ms.reviewer: sngun
ms.author: aimurg
author: murggu
ms.topic: conceptual
ms.date: 11/10/2023
---

# Migrate data and pipelines from Azure Synapse to Microsoft Fabric

The first step in data and pipeline migration is to identify the data that you want to make available in OneLake, and the pipelines you intend to move. You don't have to migrate every piece; you can prioritize specific datasets or pipelines. As you prioritize pipelines for migration, consider their dependencies, tools, and scripts. Additionally, make a note of the data properties, like sources, destinations, and formats.

You have two options for data migration:

- Option 1: Azure Data Lake Storage (ADLS) Gen2 as default storage. If you’re currently using ADLS Gen2 and want to avoid data copying, consider using [shortcuts](../onelake/onelake-shortcuts.md).

- Option 2: OneLake as default storage. If you want to move from ADLS Gen2 to OneLake as a storage layer, consider reading or writing to OneLake from your Azure Synapse Spark items.

## Data migration

### Option 1: ADLS Gen2 as storage (shortcuts)

If you’re interacting with ADLS Gen2 and want to avoid unnecessary data duplication, you can quickly create a shortcut to the ADLS Gen2 source path in OneLake. You should [create a Fabric lakehouse](../onelake/create-lakehouse-onelake.md) if you don’t have one. You can create shortcuts within the **Files** and **Tables** sections of the lakehouse with the following considerations:

- The **Files** section is the unmanaged area of the lake. If your data is in CSV, JSON, or Parquet format, we recommend creating a shortcut to this area.

- The **Tables** section is the managed area of the lake. All tables, both Spark-managed and unmanaged tables, are registered here. If your data is in Delta format, you can create a shortcut to this area and the automatic discovery process automatically registers those tables in the lakehouse’s metastore.

### Option 2: OneLake as storage

To use OneLake as a storage layer and move data from ADLS Gen2, you should initially point the Azure Synapse Spark-related items to OneLake and then transfer the existing data to OneLake.

For the former, see [integrate OneLake with Azure Synapse Spark](../onelake/onelake-azure-synapse-analytics.md) if you still have any notebook or Spark job definition item in Azure Synapse. You should [create a Fabric lakehouse](../onelake/create-lakehouse-onelake.md) if you don’t already have one. 

To move the existing data over, you have several options:

- **mssparkutils fastcp**: The [mssparkutils](microsoft-spark-utilities.md) library provides a fastcp API that enables you to copy data between ADLS accounts.

- **AzCopy**: A command-line utility designed for high-performance uploading, downloading, and copying data to and from Azure Storage.

- **Azure Synapse pipelines or Azure Data Factory**: Use copy activities to copy data.

- **Use shortcuts**: While new data can be read or written to OneLake from Azure Synapse, historical data can be enabled using shortcuts, with no data copy needed.

## Pipelines migration (Spark-related activities)

If use notebooks and/or Spark job activities in your pipelines, you must move the existing Azure Synapse pipelines to Fabric pipelines, and reference the target notebooks. The notebook activity is available in Fabric pipelines. Some considerations:


- The Spark job definition activity isn't supported within pipelines. If your primary use of the pipeline is to schedule Spark job definitions, consider using the scheduled runs feature for Spark job definitions in Fabric instead.

- Pool selection isn't available in notebook activity.

- For more data pipeline and dataflow migration considerations, see NEED LINK.

## Next steps

- [Migrate Spark notebooks](migrate-synapse-notebooks.md)
- [Migrate Spark job definition](migrate-synapse-spark-job-definition.md)
- [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md)
