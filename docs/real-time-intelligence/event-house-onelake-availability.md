---
title: Eventhouse OneLake Availability
description: Learn how to turn on KQL Database data availability in OneLake.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2024
ms.date: 11/19/2024
---

# Eventhouse OneLake Availability

You can create a one logical copy of KQL database data in an eventhouse by turning on **OneLake availability**. Turning on **OneLake availability** means that you can query the data in your KQL database in Delta Lake format via other Fabric engines such as Direct Lake mode in Power BI, Warehouse, Lakehouse, Notebooks, and more.

Delta Lake is a unified data lake table format that achieves seamless data access across all compute engines in Microsoft Fabric. For more information on Delta Lake, see [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake).

In this article, you learn how to turn on availability of KQL Database data in OneLake.

## How it works

The following table describes the behavior of your KQL database and tables when you turn on or turn off **OneLake availability**.

| | Turned on|Turned off|
|------|---------|--------|
|**KQL Database**| - Existing tables aren't affected. New tables are made available in OneLake. <br/> - The [Data retention policy](data-policies.md#data-retention-policy) of your KQL database is also applied to the data in OneLake. Data removed from your KQL database at the end of the retention period is also removed from OneLake. | - Existing tables aren't affected. New tables won't be available in OneLake. |
|**A table in KQL Database**| - New data is made available in OneLake. <br/> - Existing data isn't backfilled. <br/> - Data can't be deleted, truncated, or purged. <br/> - Table schema can't be altered and the table can't be renamed. <br/> - Row Level Security can't be applied to the table. | - New data isn't made available in OneLake. <br/> - Data can be deleted, truncated, or purged. <br/> - Table schema can be altered and the table can be renamed. <br/> - Data is soft deleted from OneLake.|

> [!IMPORTANT]
> It can take up to a few hours for the data to appear in OneLake. For more information, see [Adaptive behavior](#adaptive-behavior).
>
> There's no additional storage cost to turn on **OneLake availability**. For more information, see [resource consumption](kql-database-consumption.md#storage-billing).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data

## Turn on OneLake availability

You can turn on **OneLake availability** either on a KQL database or table level.

1. To turn on **OneLake availability**, browse to the **OneLake** section in the details pane of your KQL database or table.
1. Set **Availability** to **On**.

    :::image type="content" source="media/event-house-onelake-availability/onelake-availability.png" alt-text="Screenshot of the OneLake section of the Database details pane in Real-Time Intelligence showing the Availability option highlighted." lightbox="media/event-house-onelake-availability/onelake-availability.png":::

1. The database refreshes automatically.

    :::image type="content" source="media/event-house-onelake-availability/enable-data-copy.png" alt-text="Screenshot of the OneLake section details in Real-Time Intelligence in Microsoft Fabric once Availability is set to On. The option to expose data to OneLake is turned on.":::

You turned on **OneLake availability** in your KQL database. You can now access all the new data added to your database at the given OneLake path in Delta Lake format. You can also choose to create a OneLake shortcut from a Lakehouse, Data Warehouse, or query the data directly via Power BI Direct Lake mode.

## Adaptive behavior

Eventhouse offers a robust mechanism that intelligently batches incoming data streams into one or more Parquet files, structured for analysis. Batching data streams is important when dealing with trickling data. Writing many small Parquet files into the lake can be inefficient resulting in higher costs and poor performance.

Eventhouse's adaptive mechanism can delay write operations for up to a few hours if there isn’t enough data to create optimal Parquet files. This ensures Parquet files are optimal in size and adhere to Delta Lake best practices. The Eventhouse adaptive mechanism ensures that the Parquet files are primed for analysis and balances the need for prompt data availability with cost and performance considerations.

You can monitor how long ago new data was added in the lake by checking your data latency using the [.show table mirroring operations command](/azure/data-explorer/kusto/management/show-table-mirroring-operations-command?context=/fabric/context/context-rti&pivots=fabric).

Results are measured from the last time data was added. When *Latency* results in 00:00:00, all the data in the KQL database is available in OneLake.

## View files

When you [turn on OneLake availability](#turn-on-onelake-availability) on a table, a delta log folder is created along with any corresponding JSON and Parquet files. You can view the files that were made available in OneLake and their properties while remaining within Real-Time Intelligence.

* To view the files, hover over a table in the **Explorer** pane and then select the **More menu [...]** > **View files**.

    :::image type="content" source="media/event-house-onelake-availability/view-files.png" alt-text="Screenshot of the Explorer pane showing the More menu dropdown of a table.":::

* To view the properties of the delta log folder or the individual files, hover over the folder or file and then select the **More menu [...]** > **Properties**.

* To view the files in the delta log folder:

    1. Select the **_delta_log** folder.
    1. Select a file to view the table metadata and schema. The editor that opens is in read-only format.

## Access mirroring policy

By default, when **OneLake availability** is turned on, a  [mirroring policy](/azure/data-explorer/kusto/management/mirroring-policy?context=/fabric/context/context-rti&pivots=fabric) is enabled. You can use the policy to monitor [data latency](#adaptive-behavior) or alter it to [partition delta tables](#partition-delta-tables).

> [!NOTE]
> If you turn off **OneLake availability**, the mirroring policy's `IsEnabled` property is set to *false* (`IsEnabled=false`).

### Partition delta tables

You can partition your delta tables to improve query speed. For information about when to partition your OneLake files, see [When to partition tables](/azure/databricks/tables/partitions). Each partition is represented as a separate column using the *PartitionName* listed in the *Partitions* list. This means your OneLake copy has more columns than your source table.

To partition your delta tables, use the [.alter-merge table policy mirroring](/azure/data-explorer/kusto/management/alter-merge-mirroring-policy-command?context=/fabric/context/context-rti&pivots=fabric) command.

## Related content

* To expose the data in OneLake, see [Create a shortcut in OneLake](../onelake/create-onelake-shortcut.md)
* To create a OneLake shortcut in Lakehouse, see [What are shortcuts in lakehouse?](../data-engineering/lakehouse-shortcuts.md)
* To query referenced data from OneLake in your KQL database or table, see [Create a OneLake shortcut in KQL Database](onelake-shortcuts.md?tab=onelake-shortcut)
