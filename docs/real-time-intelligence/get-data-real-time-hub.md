---
title: Get data from Real-Time hub 
description: Learn how to get data from Real-Time hub in a KQL database in Real-time Intelligence.
ms.reviewer: aksdi
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 01/25/2026
ms.subservice: rti-eventhouse
ms.search.form: Get data in a KQL Database
---

# Get data from Real-Time hub

In this article, you learn how to get events from Real-Time hub into either a new or existing table.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* An [eventstream](event-streams/create-manage-an-eventstream.md) with a data source

## Step 1: Source

To get data from Real-Time hub, you need to select a Real-time stream as your data source. You can select Real-Time hub in the following ways:

On the lower ribbon of your KQL database, either:

* Select **Get Data** and then select a stream from the **Real-Time hub** section.

    :::image type="content" source="media/get-data-real-time-hub/get-data-real-time-hub-filter.png" alt-text="Screenshot of the get data window open with the Real-Time hub filter highlighted." lightbox="media/get-data-real-time-hub/get-data-real-time-hub-filter.png":::

* From the **Get Data** dropdown menu, select **Select more data sources**, * Select **Get Data** and then select a stream from the **Real-Time hub** section.

## Step 2: Configure

1. Select a target table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Under **Configure the data source**, fill out the settings using the information in the following table. Some setting information automatically fills from your eventstream.

    :::image type="content" source="media/get-data-real-time-hub/get-data-real-time-hub-destination.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-real-time-hub/get-data-real-time-hub-destination.png":::

    |**Setting** | **Description**|
    |----|----|
    | Workspace| Your eventstream workspace location. Your workspace name is automatically filled. |
    | Eventstream Name| The name of your eventstream. Your eventstream name is automatically filled.|
    | Data connection name| The name used to reference and manage your data connection in your workspace. The data connection name is automatically filled. Optionally, you can enter a new name. The name can only contain alphanumeric, dash, and dot characters, and be up to 40 characters in length.|
    | Process event before ingestion in Eventstream | This option allows you to configure data processing before data is ingested into the destination table. If selected, you continue the data ingestion process in Eventstream. For more information, see [Process event before ingestion in eventstream](get-data-eventstream.md#process-event-before-ingestion-in-eventstream).|

1. Select **Next**

## Step 3: Inspect

The **Inspect** tab shows a preview of the data.

Select **Finish** to complete the ingestion process.

:::image type="content" source="media/get-data-real-time-hub/inspect-data-real-time-hub.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-real-time-hub/inspect-data-real-time-hub.png":::

Optional:

* Use the file type dropdown to explore [Advanced options based on data type](#advanced-options-based-on-data-type).

* Use the **Table_mapping** dropdown to define a new mapping.

* Select **</>** to open the command viewer to view and copy the automatic commands generated from your inputs. You can also open the commands in a queryset.

* Select the pencil icon to [Edit columns](#edit-columns).

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-real-time-hub/edit-columns-real-time-hub.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-real-time-hub/edit-columns-real-time-hub.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

### Advanced options based on data type

**Tabular (CSV, TSV, and PSV)**: If you're ingesting tabular formats in an *existing table*, you can select **Table_mapping** > **Use existing mapping**. Tabular data doesn't always include the column names used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.

**JSON**: Select **Nested levels** to determine the column division of JSON data, from 1 to 100.

## Step 4: Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary. Select **Close** to close the window.

:::image type="content" source="media/get-data-real-time-hub/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-real-time-hub/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
* To get data from a new eventstream, see [Get data from a new eventstream](event-streams/get-data-from-eventstream-in-multiple-fabric-items.md#get-data-from-a-new-eventstream)
