---
title: Migrate data and pipelines in Microsoft Fabric
description: Learn about your different options for migrating data and pipelines in Microsoft Fabric.
ms.reviewer: sngun
ms.author: aimurg
author: murggu
ms.topic: conceptual
ms.date: 11/10/2023
---

# Migrate data and pipelines in Microsoft Fabric

The first step in data and pipelines migration is to pinpoint the data that you want to make available in OneLake, and the pipelines you intend to move. You don't always need to migrate every piece; you can prioritize specific datasets or pipelines. As you single out pipelines for migration, ensure you understand their dependencies and the tools or scripts they incorporate. Also be aware of data properties, including sources, destinations, and formats (for example, csv, json, parquet, or sDelta).

You have two options for data:

- Option one: Azure Data Lake Storage (ADLS) Gen2 as default storage. If you’re currently using ADLS Gen2 and want to avoid data copying, consider *shortcuts*.

- Option two: OneLake as default storage. If you want to move from ADLS Gen2 to OneLake as storage layer, consider *reading/writing to OneLake from your Azure Synapse Spark* items.

## Data migration

### Option one: ADLS Gen2 as storage (shortcuts)

If you’re interacting with ADLS Gen2 and want to avoid unnecessary data duplication, you can quickly create a shortcut to the ADLS Gen2 source path in OneLake. You must [create a Fabric lakehouse](../onelake/create-lakehouse-onelake.md) if you don’t have one. You can create shortcuts within the **Files** and **Tables** sections of the lakehouse. Some considerations:

- The **Files** section is the unmanaged area of the lake. If your data is in csv, json, or parquet format, we recommend creating a shortcut to this area.

- The **Tables** section is the managed area of the lake. All tables, both Spark managed and unmanaged tables, are registered here. If your data is in Delta format, you can create a shortcut to this area and the automatic discovery process automatically registers those tables in the lakehouse’s metastore. (V-order optimization doesn't apply because the Fabric Spark engine didn't create the Delta tables.)

### Option two: OneLake as storage

If you want to use OneLake as a storage layer and move the data underneath from ADLS Gen 2 to OneLake, you need to first point the Azure Synapse Spark-related items to OneLake, and then move the existing data to OneLake.

For the former, see [integrate OneLake with Azure Synapse Spark](../onelake/onelake-azure-synapse-analytics.md) if you still keep any notebook or Spark job definition item in Azure Synapse. You must [create a Fabric lakehouse](../onelake/create-lakehouse-onelake.md) if you don’t have one. To move the existing data over, you have several options:

- **mssparkutils fastcp**: The mssparkutils library provides a fastcp API that enables you to copy data between ADLS accounts.

- **AzCopy**: A command-line utility designed for high-performance uploading, downloading, and copying data to and from Azure Storage.

- **Azure Synapse pipelines or Azure Data Factory**: Use copy activities to copy data.

- **Use shortcuts**: While new data can be landed read/write to OneLake from Azure Synapse, historical data can be enabled using shortcuts, with no data copy needed.

## Pipelines migration (Spark-related activities)

If use notebooks and/or Spark job activities in your pipelines, you must move the existing Azure Synapse pipelines to Fabric pipelines, and reference the target notebooks. The notebook activity is available in Fabric pipelines. Some considerations:

- Fabric doesn't currently support dynamic expressions for notebook names in pipelines. Instead, you can leverage parent/child notebook relationships.

- The Spark job definition activity isn't supported within pipelines. If your primary use of the pipeline is to schedule Spark job definitions, consider using the scheduled runs feature for Spark job definitions in Fabric instead.

- Pool selection isn't available in notebook activity.

- For more data pipeline and dataflow migration considerations, see NEED LINK.

## Next steps

- Migrate hive metastore
