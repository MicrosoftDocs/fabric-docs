---
title: One logical copy
description: Learn how to turn on KQL Database data availability in OneLake.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/02/2024
---

# One logical copy

You can create a one logical copy of KQL Database data by turning on **OneLake availability**. Turning on **OneLake availability** means that you can query the data in your KQL database in Delta Lake format via other Fabric engines such as Direct Lake mode in Power BI, Warehouse, Lakehouse, Notebooks, and more.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

Delta Lake is a unified data lake table format that achieves seamless data access across all compute engines in Microsoft Fabric. For more information on Delta Lake, see [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake).

In this article, you learn how to turn on availability of KQL Database data in OneLake.

## How it works

The following table describes the behavior of your KQL database and tables when you  turn on or turn off **OneLake availability**.

| | Turned on|Turned off|
|------|---------|--------|
|**KQL Database**| - Existing tables aren't affected. New tables are made available in OneLake. <br/> - The [Data retention policy](data-policies.md#data-retention-policy) of your KQL database is also applied to the data in OneLake. Data removed from your KQL database at the end of the retention period is also removed from OneLake. | - Existing tables aren't affected. New tables won't be available in OneLake. |
|**A table in KQL Database**| - New data is made available in OneLake. <br/> - Existing data isn't backfilled. <br/> - Data can't be deleted, truncated, or purged. <br/> - Table schema can't be altered and the table can't be renamed. | - New data isn't made available in OneLake. <br/> - Data can be deleted, truncated, or purged. <br/> - Table schema can be altered and the table can be renamed. <br/> - Data is soft deleted from OneLake.|

> [!IMPORTANT]
> There's no additional storage cost to turn on **OneLake availability**. For more information, see [resource consumption](kql-database-consumption.md#storage-billing).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data

## Turn on OneLake availability

You can turn on **OneLake availability** either on a KQL database or table level.

1. To turn on **OneLake availability**, browse to the details page of your KQL database or table.
1. Next to **OneLake availability** in the **Database details** pane, select the **Edit** (pencil) icon.

    :::image type="content" source="media/one-logical-copy/onelake-availability.png" alt-text="Screenshot of the Database details pane in Real-Time Intelligence showing an overview of the database with the edit OneLake availability option highlighted." lightbox="media/one-logical-copy/onelake-availability.png":::

1. Turn on the feature by toggling the button to **Active**, then select **Done**. The database refreshes automatically.

    :::image type="content" source="media/one-logical-copy/enable-data-copy.png" alt-text="Screenshot of the OneLake folder details window in Real-Time Intelligence in Microsoft Fabric. The option to expose data to OneLake is turned on.":::

You've turned on **OneLake availability** in your KQL database. You can now access all the new data added to your database at the given OneLake path in Delta Lake format. You can also choose to create a OneLake shortcut from a Lakehouse, Data Warehouse, or query the data directly via Power BI Direct Lake mode.

## View files

When you [turn on OneLake availability](#turn-on-onelake-availability) on a table, a delta log folder is created along with any corresponding JSON and parquet files. You can view the files that were made available in OneLake and their properties while remaining within Real-Time Intelligence.

> [!IMPORTANT]
> It can take up to a few hours for the files to appear after turning on **OneLake availability**.

* To view the files, hover over a table in the **Explorer** pane and then select the **More menu [...]** > **View files**.

    :::image type="content" source="media/one-logical-copy/view-files.png" alt-text="Screenshot of the Explorer pane showing the More menu dropdown of a table.":::

* To view the properties of the delta log folder or the individual files, hover over the folder or file and then select the **More menu [...]** > **Properties**.

* To view the files in the delta log folder:

    1. Select the **_delta_log** folder.
    1. Select a file to view the table metadata and schema. The editor that opens is in read-only format.

## Data types mapping

### Event house to Delta parquet data types mapping

 Event house data types are mapped to Delta Parquet data types using the following rules. For more information on Event house data types, see [Scalar data types](/azure/data-explorer/kusto/query/scalar-data-types/index?context=/fabric/context/context-rta&pivots=fabric).

| Event house Data Type | Delta Data Type |
| --------------- | -----------------
| `bool`     | `boolean` |
| `datetime` | `timestamp OR date (for date-bound partition definitions)` |
| `dynamic`  | `string` |
| `guid` | `string` |
| `int` | `integer` |
| `long` | `long` |
| `real` | `double` |
| `string` | `string` |
| `timespan` | `long` |
| `decimal` | `decimal(38,18)` |

## Access mirroring policy

Your OneLake copy includes a `policy mirroring` table where you can define the mirroring policies. You can use this table to monitor your data latency and partition your files.

## Check latency

Your KQL database is checked for new data to copy to the Delta Lake files every few hours. You can monitor how long ago new data was added by checking your data latency.

To check the current latency run the following query:

`.show` `table` `*` `policy mirroring`

`.show` `table` *tablename* `operations` `mirroring-status`

A result of zero means that data was just copied. Results are measured from the last time data was copied. For more information about the `.show` `table` command, see [.show table details command](/azure/data-explorer/kusto/management/show-table-details-command?context=%2Ffabric%2Fcontext%2Fcontext-rta&pivots=fabric).

### Partition OneLake files

You can partition your OneLake files to improve query speed in cases of need. For information about when to partition your OneLake files, see [When to partition tables on Azure Databricks](/azure/databricks/tables/partitions). Each partition is represented as a separate column using the *PartitionName* listed in the *Partitions* list. This means your OneLake copy has more columns than your source table.

To partition your OneLake files use the following command:

( `.alter` | `.alter-merge`) `table` *TableName* `policy mirroring`
[`partition` `by` `(`*Partitions*`)`]
`dataformat` `=` `parquet`

For information about the command parameters used to partition your files, see [Create and alter Azure Storage external tables](/azure/data-explorer/kusto/management/external-tables-azure-storage).

## Related content

* To expose the data in OneLake, see [Create a shortcut in OneLake](../onelake/create-onelake-shortcut.md)
* To create a OneLake shortcut in Lakehouse, see [What are shortcuts in lakehouse?](../data-engineering/lakehouse-shortcuts.md)
* To query referenced data from OneLake in your KQL database or table, see [Create a OneLake shortcut in KQL Database](onelake-shortcuts.md?tab=onelake-shortcut)
