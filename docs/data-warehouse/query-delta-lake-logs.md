---
title: Delta Lake logs in Synapse Data Warehouse
description: Learn how Synapse Data Warehouse in Microsoft Fabric publishes Delta Lake logs
author: KevinConanMSFT
ms.author: kecona
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: conceptual
ms.search.form: Warehouse design and development
---

# Delta Lake logs in Synapse Data Warehouse in Microsoft Fabric 

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] is built up open file formats. User tables are stored in parquet file format, and Delta Lake logs are published for all user tables.  

The Delta Lake logs opens up direct access to the warehouse's user tables for any engine that can read Delta Lake tables. This access is limited to read-only to ensure the user data maintains ACID transaction compliance. All inserts, updates, and deletes to the data in the tables must be executed through the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. Once a transaction is committed, a system background process is initiated to publish the updated Delta Lake log for the affected tables.

## Location

You can locate Delta Lake logs via the following methods:

- Delta Lake logs can be queried through [shortcuts](../onelake/access-onelake-shortcuts.md) created in a lakehouse. You can view the files using a [!INCLUDE [product-name](../includes/product-name.md)] Spark Notebook or the [Lakehouse explorer in Synapse Data Engineering](../data-engineering/navigate-lakehouse-explorer.md) in the [!INCLUDE [product-name](../includes/product-name.md)] portal.

- Delta Lake logs can be found via [Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md), through Spark connections such as the Power BI Direct Lake mode, or using any other service that can read delta tables.
 
- Delta Lake logs can be found in the `_delta_log` folder of each table through the OneLake Explorer (Preview) in Windows, as shown in the following screenshot.

    :::image type="content" source="media/query-delta-lake-logs/onelake-explorer-delta-log.png" alt-text="A screenshot of the Windows OneLake Explorer, showing the path to the delta logs folder for the call_center table.":::

## Limitations

- Currently, tables with inserts only are supported.
- Currently, Delta Lake log checkpoint and vacuum functions are unavailable.

## Next steps

- [Query the Synapse Data Warehouse](query-warehouse.md)
- [How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md)
- [OneLake overview](../onelake/onelake-overview.md)
- [Accessing shortcuts](../onelake/access-onelake-shortcuts.md)
- [Navigate the Fabric Lakehouse explorer](../data-engineering/navigate-lakehouse-explorer.md)