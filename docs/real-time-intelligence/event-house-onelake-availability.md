---
title: Turn on OneLake availability for an eventhouse
description: Learn how to turn on OneLake availability for a KQL database in an eventhouse so you can query the data in Delta Lake format across Fabric engines.
ms.reviewer: tzgitlin
ms.topic: how-to
ms.subservice: rti-eventhouse
ms.date: 05/18/2026
ai-usage: ai-assisted

#customer intent: As a Fabric data engineer, I want to turn on OneLake availability for a KQL database or table in an eventhouse so that I can query the data in Delta Lake format from other Fabric engines.
---

# Turn on OneLake availability for an eventhouse

You can create a logical copy of KQL database data in an eventhouse by turning on **OneLake availability**. When you turn on **OneLake availability**, you can query the data in your KQL database in Delta Lake format through other Fabric engines such as Direct Lake mode in Power BI, Warehouse, Lakehouse, Notebooks, and more. Delta Lake is the unified data lake table format that makes seamless data access possible across all compute engines in Fabric.

In this article, you learn how to turn on availability of KQL database data in OneLake.

When **OneLake availability** and schema synchronization are enabled, you can also use **Analyze data with** > **SQL endpoint** at the database level to query the Delta Lake representation in near real-time through SQL-based engines.

When **OneLake availability** and schema synchronization are enabled, you can also use **Analyze data with** > **SQL endpoint** at the database level to query the Delta Lake representation in near real-time through SQL-based engines.

## How OneLake availability works for KQL databases

You can turn on **OneLake availability** at the database or table level. When enabled at the database level, all new tables and their data are made available in OneLake. When turning on the feature, you can also choose to apply this option to existing tables by selecting the *Apply to existing tables* option, to include historic backfill. Turning on at the table level makes only that table and its data available in OneLake. The [Data retention policy](data-policies.md#data-retention-policy) of your KQL database is also applied to the data in OneLake. Data removed from your KQL database at the end of the retention period is also removed from OneLake. If you turn off **OneLake availability**, data is soft deleted from OneLake.

Backend schema synchronization keeps the Delta Lake representation aligned with the KQL database, enabling near-real-time querying through the SQL endpoint and notebooks. For expected latency and batching behavior, see [Adaptive behavior](#adaptive-behavior).

While **OneLake availability** is turned on, you can't do the following tasks:

* Rename tables.
* Alter a column type. Adding or deleting a column is supported.
* Apply row-level security to tables.
* Delete, truncate, or purge data.

If you need to do any of these tasks, use the following steps:

1. Turn off **OneLake availability**.
1. Perform the task.
1. Turn on **OneLake availability**.

> [!IMPORTANT]
> Turning off **OneLake availability** soft deletes your data from OneLake. When you turn availability back on, all data is available in OneLake, including historic backfill.

> [!NOTE]
> For information about the time it takes for data to appear in OneLake, see [Adaptive behavior](#adaptive-behavior-for-parquet-file-batching). There's no extra storage cost to turn on **OneLake availability**. For more information, see [resource consumption](kql-database-consumption.md#storage-billing).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with editing permissions and data.

## Turn on OneLake availability for a KQL database or table

You can turn on **OneLake availability** for either a KQL database or table.

1. Select a database or table.
1. In the **OneLake** section of the details pane, set **Availability** to **Enabled**.

    :::image type="content" source="media/event-house-onelake-availability/onelake-availability.png" alt-text="Screenshot of the OneLake section of the Database details pane showing the Availability option highlighted.":::

1. In the **Enable OneLake availability** window, select **Enable**.

    :::image type="content" source="media/event-house-onelake-availability/enable-onelake-availability.png" alt-text="Screenshot of the Enable OneLake availability window showing the Apply to existing tables option.":::

1. The database or table details refresh automatically.

    :::image type="content" source="media/event-house-onelake-availability/enable-data-copy.png" alt-text="Screenshot of the OneLake section details once Availability is set to Enabled. The option to expose data to OneLake is turned on.":::

When you turn on **OneLake availability** in your KQL database or table, you can access all the data at the given OneLake path in Delta Lake format. You can also create a OneLake shortcut from a lakehouse or warehouse, or query the data directly via Power BI Direct Lake mode.
With the **OneLake availability** in your KQL database or table turned on, you can now access all the data at the given OneLake path in Delta Lake format. You can also create a OneLake shortcut from a Lakehouse, Data Warehouse, or query the data directly via Power BI Direct Lake mode.

## Use with **Analyze data with** options

When **OneLake availability** is enabled, Eventhouse and KQL database items expose **Analyze data with** options at the database level:

* **SQL endpoint**: Available when both **OneLake availability** and schema synchronization are enabled.
* **Notebook**: Opens notebook-based analysis for the selected database.

If you turn off **OneLake availability**, the **SQL endpoint** option is removed from this menu until you enable it again.

## Adaptive behavior for parquet file batching

An eventhouse intelligently batches incoming data streams into one or more Parquet files structured for analysis. Batching data streams is important when dealing with trickling data, because writing many small Parquet files into the lake can be inefficient. This inefficiency results in higher costs and poor query performance.

The eventhouse adaptive mechanism can delay write operations to OneLake if there's not enough data to create optimal Parquet files. This behavior ensures that Parquet files are optimal in size and adhere to Delta Lake best practices. It balances the need for prompt data availability with cost and performance considerations.

Default and configurable write latency for OneLake availability:

| Setting | Default value | Allowed range |
|---|---|---|
| Write operation delay (`TargetLatencyInMinutes`) | Up to 3 hours, or until files of sufficient size (typically 200-256 MB) are created | 5 minutes to 3 hours |

For example, use the following Kusto command to set the write delay to 5 minutes for a single table:

```kusto
.alter-merge table <TableName> policy mirroring dataformat=parquet with (IsEnabled=true, TargetLatencyInMinutes=5);
```

> [!CAUTION]
> Adjusting the delay to a shorter period might result in a suboptimal delta table with a large number of small files, which can lead to inefficient query performance. The resultant table in OneLake is read-only and can't be optimized after creation.

You can monitor how long ago new data was added in the lake by checking your data latency using the [`.show table mirroring operations` command](/azure/data-explorer/kusto/management/show-table-mirroring-operations-command?context=/fabric/context/context-rti&pivots=fabric).

Results are measured from the last time data was added. When *Latency* returns `00:00:00`, all the data in the KQL database is available in OneLake.

## View Delta Lake files in OneLake

When you [turn on OneLake availability](#turn-on-onelake-availability-for-a-kql-database-or-table) on a table, the process creates a delta log folder along with any corresponding JSON and Parquet files. You can view the files that are available in OneLake and their properties while staying within Real-Time Intelligence.

* To view the files, hover over a table in the **Explorer** pane and then select the **More menu [...]** > **View files**.

    :::image type="content" source="media/event-house-onelake-availability/view-files.png" alt-text="Screenshot of the Explorer pane showing the More menu dropdown of a table.":::

* To view the properties of the delta log folder or the individual files, hover over the folder or file and then select the **More menu [...]** > **Properties**.

* To view the files in the delta log folder:

    1. Select the **_delta_log** folder.
    1. Select a file to view the table metadata and schema. The editor that opens is in read-only format.

## Access the OneLake mirroring policy

By default, when you turn on **OneLake availability** for a KQL database or table, the system enables a [mirroring policy](/azure/data-explorer/kusto/management/mirroring-policy?context=/fabric/context/context-rti&pivots=fabric). You can use the mirroring policy to monitor [data latency](#adaptive-behavior-for-parquet-file-batching) or alter it to [partition delta tables](#partition-delta-tables-in-onelake).

> [!NOTE]
> If you turn off **OneLake availability**, the mirroring policy's `IsEnabled` property is set to *false* (`IsEnabled=false`).

### Partition delta tables in OneLake

You can partition your delta tables to improve query speed. For information about when to partition your OneLake files, see [When to partition tables](/azure/databricks/tables/partitions). Each partition is represented as a separate column using the `PartitionName` listed in the `Partitions` list. This representation means your OneLake copy has more columns than your source table.

To partition your delta tables, use the [`.alter-merge table policy mirroring`](/azure/data-explorer/kusto/management/alter-merge-mirroring-policy-command?context=/fabric/context/context-rti&pivots=fabric) command.

## Query Delta tables from a Fabric notebook

You can use Fabric Notebook to read the OneLake data using the following code snippet.

> [!TIP]
> You can launch a new or existing Fabric notebook directly from **Analyze data with** > **Notebook** on an Eventhouse or KQL database. The notebook automatically attaches to the selected database context. Use the following code sample when you want manual path-based access.

> In the code snippet, replace `<workspaceGuid>`, `<workspaceGuid>`, and `<tableName>` with your own values.

```python
delta_table_path = 'abfss://<workspaceGuid>@onelake.dfs.fabric.microsoft.com/<eventhouseGuid>/Tables/<tableName>'

df = spark.read.format("delta").load(delta_table_path)

df.show()
```

> [!NOTE]
> For an Azure Data Explorer database, use this code:
>
> ```python
> delta_table_path = 'abfss://<workspaceName>@onelake.dfs.fabric.microsoft.com/<itemName>.KustoDatabase/Tables/<tableName>'
> ```

## Related content

* [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
* [Create a shortcut in OneLake](../onelake/create-onelake-shortcut.md)
* [What are shortcuts in lakehouse?](../data-engineering/lakehouse-shortcuts.md)
* [Create a OneLake shortcut in KQL database](onelake-shortcuts.md?tab=onelake-shortcut)
