---
title: Delta Lake Logs in Warehouse
description: Learn how Warehouse in Microsoft Fabric publishes Delta Lake logs
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: kecona
ms.date: 04/06/2025
ms.topic: how-to
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
ms.custom: sfi-image-nochange
---
# Delta Lake logs in Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] is built up on open file formats. User tables are stored in parquet file format, and Delta Lake logs are published for all user tables.  

The Delta Lake logs open up direct access to the warehouse's user tables for any engine that can read Delta Lake tables. This access is limited to read-only to ensure the user data maintains ACID transaction compliance. All inserts, updates, and deletes to the data in the tables must be executed through the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. Once a transaction is committed, a system background process is initiated to publish the updated Delta Lake log for the affected tables.

## How to get OneLake path

The following steps detail how to get the OneLake path from a table in a warehouse:

1. Open **Warehouse** in your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

1. In the **Object Explorer**, you find more options **(...)** on a selected table in the **Tables** folder. Select the **Properties** menu.

   :::image type="content" source="media/query-delta-lake-logs/select-properties.png" alt-text="Screenshot showing where to find the Properties option on a selected table.":::

1. On selection, the **Properties** pane shows the following information:
   1. Name
   1. Format
   1. Type
   1. URL
   1. Relative path
   1. [The Azure Data Lake Storage ABFS URI](/azure/storage/blobs/data-lake-storage-introduction-abfs-uri)

   :::image type="content" source="media/query-delta-lake-logs/properties-details.png" alt-text="Screenshot of the Properties pane." lightbox="media/query-delta-lake-logs/properties-details.png":::

## How to get Delta Lake logs path

You can locate Delta Lake logs via the following methods:

- Delta Lake logs can be queried through [shortcuts](../onelake/access-onelake-shortcuts.md) created in a lakehouse. You can view the files using a [!INCLUDE [product-name](../includes/product-name.md)] Spark Notebook or the [Fabric Lakehouse explorer](../data-engineering/navigate-lakehouse-explorer.md) in the [!INCLUDE [product-name](../includes/product-name.md)] portal.

- Delta Lake logs in the OneLake can be found via the [Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md), through Spark connections such as the Power BI Direct Lake mode, or using any other service that can read delta tables.
 
- Delta Lake logs can be found in the `_delta_log` folder of each table through the OneLake Explorer  in Windows, as shown in the following screenshot.

    :::image type="content" source="media/query-delta-lake-logs/onelake-explorer-delta-log.png" alt-text="Screenshot of the Windows OneLake Explorer, showing the path to the delta logs folder for the call_center table." lightbox="media/query-delta-lake-logs/onelake-explorer-delta-log.png":::

<a id="pausing-delta-lake-log-publishing"></a>

## Pause Delta Lake log publishing

Publishing of Delta Lake logs can be paused and resumed if needed. When publishing is paused, Microsoft Fabric engines that read tables outside of the Warehouse sees the data as it was before the pause. It ensures that reports remain stable and consistent, reflecting data from all tables as they existed before any changes were made to the tables. Once your data updates are complete, you can resume Delta Lake Log publishing to make all recent data changes visible to other analytical engines. Another use case for pausing Delta Lake log publishing is when users do not need interoperability with other compute engines in Microsoft Fabric, as it can help save on compute costs.

The syntax to pause and resume Delta Lake log publishing is as follows: 

```sql
ALTER DATABASE CURRENT SET DATA_LAKE_LOG_PUBLISHING = PAUSED | AUTO
```

### Example: pause and resume Delta Lake log publishing

To pause Delta Lake log publishing, use the following code snippet: 

```sql
ALTER DATABASE CURRENT SET DATA_LAKE_LOG_PUBLISHING = PAUSED
```

Queries to warehouse tables on the current warehouse from other Microsoft Fabric engines (for example, queries from a Lakehouse) now show a version of the data as it was before pausing Delta Lake log publishing. Warehouse queries still show the latest version of data. 

To resume Delta Lake log publishing, use the following code snippet: 

```sql
ALTER DATABASE CURRENT SET DATA_LAKE_LOG_PUBLISHING = AUTO
```

When the state is changed back to **AUTO**, the Fabric Warehouse engine publishes logs of all recent changes made to tables on the warehouse, allowing other analytical engines in Microsoft Fabric to read the latest version of data. 

<a id="checking-the-status-of-delta-lake-log-publishing"></a>

### Check the status of Delta Lake log publishing

To check the current state of Delta Lake log publishing on all warehouses for the current workspace, use the following code snippet: 

```sql
SELECT [name], [DATA_LAKE_LOG_PUBLISHING_DESC] FROM sys.databases
```

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
