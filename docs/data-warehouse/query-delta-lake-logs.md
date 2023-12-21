---
title: Delta Lake logs in Warehouse
description: Learn how Warehouse in Microsoft Fabric publishes Delta Lake logs
author: KevinConanMSFT
ms.author: kecona
ms.reviewer: wiassaf
ms.date: 12/11/2023
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Delta Lake logs in Warehouse in Microsoft Fabric 

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] is built up open file formats. User tables are stored in parquet file format, and Delta Lake logs are published for all user tables.  

The Delta Lake logs opens up direct access to the warehouse's user tables for any engine that can read Delta Lake tables. This access is limited to read-only to ensure the user data maintains ACID transaction compliance. All inserts, updates, and deletes to the data in the tables must be executed through the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. Once a transaction is committed, a system background process is initiated to publish the updated Delta Lake log for the affected tables.

## How to get OneLake path

The following steps detail how to get the OneLake path from a table in a warehouse:

1. Open **Warehouse** in your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

1. In the **Object Explorer**, you find more options **(...)** on a selected table in the **Tables** folder. Select the **Properties** menu.

   :::image type="content" source="media\query-delta-lake-logs\select-properties.png" alt-text="Screenshot showing where to find the Properties option on a selected table." lightbox="media\query-delta-lake-logs\select-properties.png":::

1. On selection, the **Properties** pane shows the following information:
   1. Name
   1. Format
   1. Type
   1. URL
   1. Relative path
   1. [ABFS path](/azure/storage/blobs/data-lake-storage-introduction-abfs-uri)

   :::image type="content" source="media\query-delta-lake-logs\properties-details.png" alt-text="Screenshot of the Properties pane." lightbox="media\query-delta-lake-logs\properties-details.png":::

## How to get Delta Lake logs path

You can locate Delta Lake logs via the following methods:

- Delta Lake logs can be queried through [shortcuts](../onelake/access-onelake-shortcuts.md) created in a lakehouse. You can view the files using a [!INCLUDE [product-name](../includes/product-name.md)] Spark Notebook or the [Lakehouse explorer in Synapse Data Engineering](../data-engineering/navigate-lakehouse-explorer.md) in the [!INCLUDE [product-name](../includes/product-name.md)] portal.

- Delta Lake logs can be found via [Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md), through Spark connections such as the Power BI Direct Lake mode, or using any other service that can read delta tables.
 
- Delta Lake logs can be found in the `_delta_log` folder of each table through the OneLake Explorer  in Windows, as shown in the following screenshot.

    :::image type="content" source="media/query-delta-lake-logs/onelake-explorer-delta-log.png" alt-text="A screenshot of the Windows OneLake Explorer, showing the path to the delta logs folder for the call_center table.":::

## Limitations

- Table Names can only be used by Spark and other systems if they only contain these characters: A-Z a-z 0-9 and underscores.
- Column Names that will be used by Spark and other systems cannot contain:
  - spaces
  - tabs
  - carriage returns
  - [
  - ,
  - ;
  - {
  - }
  - (
  - )
  - =
  - ]

## Related content

- [Query the Warehouse](query-warehouse.md)
- [How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md)
- [OneLake overview](../onelake/onelake-overview.md)
- [Accessing shortcuts](../onelake/access-onelake-shortcuts.md)
- [Navigate the Fabric Lakehouse explorer](../data-engineering/navigate-lakehouse-explorer.md)
