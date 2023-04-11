---
title: Delta Lake logs in Synapse Data Warehouse in Microsoft Fabric
description: Learn how Synapse Data Warehouse in Microsoft Fabric publishes Delta Lake logs
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: conceptual
ms.date: 04/10/2023
---

# Delta Lake logs in Synapse Data Warehouse in Microsoft Fabric 

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] is built up open file formats. User tables are stored in parquet file format, and Delta Lake logs are published for all user tables.  

The Delta Lake logs opens up direct access to the warehouse's user tables for any engine that can read Delta Lake tables. This access is limited to read-only to ensure the user data maintains ACID transaction compliance. All inserts, updates, and deletes to the data in the tables must be executed through the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. Once a transaction is committed, a system background process is initiated to publish the updated Delta Lake log for the affected tables.

## Location

You can locate Delta Lake logs via the following methods:

1. Delta Lake logs can be queried through shortcuts created in a lakehouse. You can view the files using a [!INCLUDE [product-name](../includes/product-name.md)] Spark Notebook or the **Lakehouse explorer** in Synapse Data Engineering in the [!INCLUDE [product-name](../includes/product-name.md)] portal.
 
1. Delta Lake logs can be found through the OneLake Explorer in Windows, via the [Azure Storage Explorer], through Spark connections such as the Power BI Direct Lake mode, or using any other service that can read delta tables.

## Limitations

- Currently, tables with inserts only are supported.
- Currently, Delta Lake log checkpoint and vacuum functions are unavailable.

## Next steps

- [Query the Synapse Data Warehouse](query-warehouse.md)
- [How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md)
- [OneLake overview](../onelake/onelake-overview.md)