---
title: One logical copy (Preview)
description: Learn how to turn on KQL Database data availability in OneLake.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 02/04/2024
---
# One logical copy (Preview)

You can create a one logical copy of KQL Database data by turning on **OneLake availability**. Turning on **OneLake availability** means that you can query the data in your KQL database in Delta Lake format via other Fabric engines such as Direct Lake mode in Power BI, Warehouse, Lakehouse, Notebooks, and more.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

Delta Lake is a unified data lake table format that achieves seamless data access across all compute engines in Microsoft Fabric. For more information on Delta Lake, see [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake).

In this article, you learn how to turn on availability of KQL Database data in OneLake.

## How it works

The following table describes the behavior of your KQL database and tables when you  turn on or turn off **OneLake availability**.

| | Turned on|Turned off|
|------|---------|--------|
|**KQL Database**| - Existing tables aren't affected. New tables are made available in OneLake. <br/> - The [Data retention policy](data-policies.md#data-retention-policy) of your KQL database is also applied to the data in OneLake. Data that's removed from your KQL database at the end of the retention period is also removed from OneLake. | - Existing tables aren't affected. New tables won't be available in OneLake. |
|**A table in KQL Database**| - New data is made available in OneLake. <br/> - Existing data isn't backfilled. <br/> - Data can't be deleted, truncated, or purged. <br/> - Table schema can't be altered and the table can't be renamed. | - New data isn't made available in OneLake. <br/> - Data can be deleted, truncated, or purged. <br/> - Table schema can be altered and the table can be renamed. <br/> - Data is soft deleted from OneLake.|

> [!IMPORTANT]
> There's no additional storage cost to turn on **OneLake availability**, you're charged only once for the data storage.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data

## Turn on OneLake availability

You can turn on **OneLake availability** either on a KQL database or table level.

1. To turn on **OneLake availability**, browse to the details page of your KQL database or table.
1. Next to **OneLake availability** in the **Database details** pane, select the **Edit** (pencil) icon.

    :::image type="content" source="media/one-logical-copy/onelake-availability.png" alt-text="Screenshot of the Database details pane in Real-Time Analytics showing an overview of the database with the edit OneLake availability option highlighted." lightbox="media/one-logical-copy/onelake-availability.png":::

1. Turn on the feature by toggling the button to **Active**, then select **Done**. The database refreshes automatically. It might take up to a few  minutes for the data to be available in OneLake.

    :::image type="content" source="media/one-logical-copy/enable-data-copy.png" alt-text="Screenshot of the OneLake folder details window in Real-Time Analytics in Microsoft Fabric. The option to expose data to OneLake is turned on.":::

You've turned on **OneLake availability** in your KQL database. You can now access all the new data added to your database at the given OneLake path in Delta Lake format. You can also choose to create a OneLake shortcut from a Lakehouse, Data Warehouse, or query the data directly via Power BI Direct Lake mode.

## View files

When you turn on **OneLake availability** on a table, a delta log folder is created along with any corresponding JSON and parquet files. You can view the files that were made available in OneLake while remaining within Real-Time Analytics.

1. To view the files, ensure that you [Turn on OneLake availability](#turn-on-onelake-availability) on the table you want to view.
1. Hover over a table in the **Explorer** pane and then select the **More menu [...]** > **View files**.

:::image type="content" source="media/one-logical-copy/view-files.png" alt-text="Screenshot of the Explorer pane showing the More menu dropdown of a table.":::

The table file view opens with a [Delta log folder](#delta-log-folder) and one or more [Parquet files](#parquet-files).

> [!IMPORTANT]
> It might take up to a few hours for the parquet and JSON files to appear after turning on **OneLake availability**.

### Delta log folder

The delta log folder (**_delta_log**) includes files that contain the table's metadata. The table's metadata includes its schema, which parquet files are a part of the table, the history of changes, and the delta table configuration. When you ingest new data into a table that has **OneLake availability** enabled, or when you make changes to existing data in that table, a new file is created in the delta log folder.

1. To view the files, select the **_delta_log** folder.
1. Select a file to view the table metadata and schema. The editor that opens is in read-only format.

### Parquet files

Parquet files represent the data in your table that was made available in OneLake in Delta Lake format.

### Properties

You can view the properties of the delta log folder or the individual files. The properties include the resource name, the resource type, the URL, relative path, and the datetime the resource was last modified.

To view the resource's properties, hover over the folder or file and then select the **More menu [...]** > **Properties**.

:::image type="content" source="media/one-logical-copy/more-options.png" alt-text="Screenshot of the table file view showing the delta log folder and the parquet file. The More menu option is highlighted.":::

## Related content

* To expose the data in OneLake, see [Create a shortcut in OneLake](../onelake/create-onelake-shortcut.md)
* To create a OneLake shortcut in Lakehouse, see [What are shortcuts in lakehouse?](../data-engineering/lakehouse-shortcuts.md)
* To query referenced data from OneLake in your KQL database or table, see [Create a OneLake shortcut in KQL Database](onelake-shortcuts.md?tab=onelake-shortcut)