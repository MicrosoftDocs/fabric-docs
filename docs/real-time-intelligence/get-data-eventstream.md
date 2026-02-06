---
title: Get Data from Eventstream
description: Learn how to get data from an eventstream in a KQL database in Real-Time Intelligence.
ms.reviewer: aksdi
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.subservice: rti-eventhouse
ms.date: 12/17/2025
ms.search.form: Get data in a KQL Database
---

# Get data from Eventstream

In this article, you learn how to get data from an existing eventstream into a new or existing table.

You can ingest data from default or derived streams. A derived stream is created by adding a series of stream operations to the eventstream, such as **Filter** or **Manage Fields**. For more information, see [Eventstream concepts](event-streams/create-default-derived-streams.md#concepts).

To get data from a new eventstream, see [Get data from a new eventstream](event-streams/get-data-from-eventstream-in-multiple-fabric-items.md#get-data-from-a-new-eventstream).

> [!WARNING]
>
> * Data preview from an eventstream with large sample events (10 MB or larger) isn't supported in the Get Data wizard. Use small sample events (about 1 MB each) to configure the data connection.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with editing permissions.
* An [eventstream](event-streams/create-manage-an-eventstream.md) with a data source.

## Step 1: Source

To get data from an eventstream, select the eventstream as your data source. Select an eventstream in the following ways:

On the ribbon of the KQL database, either:

* From the **Get Data** option on the ribbon, select the **Eventstream** tile.

* From the **Get Data** dropdown menu, select **Eventstream** > **Existing Eventstream**.

* From the **Get Data** dropdown menu, select **Real-Time data hub**, and select an eventstream from the list.

## Step 2: Configure

1. Select a target table. To ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1,024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Under **Configure the data source**, complete the settings using the information in the following table:

    * When you select **Eventstream** as your source, specify the **Workspace**, **Eventstream**, and default or derived **Stream**.

    > [!IMPORTANT]
    > The feature to get data from derived streams is in [preview](../fundamentals/preview.md).

    :::image type="content" source="media/get-data-eventstream/configure-tab.png" alt-text="Screenshot of the configure tab with a new table entered and one eventstream selected." lightbox="media/get-data-eventstream/configure-tab.png":::

    * When you select **Real-Time hub** as your source, you choose a default or derived stream from the list, and the **Workspace**, **Eventstream**, and **Stream** are automatically populated and don't require configuration.

    :::image type="content" source="media/get-data-eventstream/configure-tab-derived-eventstream.png" alt-text="Screenshot of configure tab with new table entered and read-only configure data source settings." lightbox="media/get-data-eventstream/configure-tab-derived-eventstream.png":::

    |**Setting** | **Description**|
    |----|----|
    | Workspace | Your eventstream workspace location. Select a workspace from the dropdown.|
    | Eventstream | The name of your eventstream. Select an eventstream from the dropdown.|
    | Stream | The name of the default or derived stream. Select a stream from the dropdown.<br/>* For default streams, the stream name format is *Eventstream-stream*.<br/>* For derived streams, the name was defined when the stream was created.|
    | Process event before ingestion in Eventstream | This option allows you to configure data processing before data is ingested into the destination table. If selected, you continue the data ingestion process in Eventstream. For more information, see [Process event before ingestion in Eventstream](#process-event-before-ingestion-in-eventstream).|
    | Data connection name | The name used to reference and manage your data connection in your workspace. The data connection name is automatically populated, and you can edit the name to simplify managing the data connection in the workspace. The name can contain only alphanumeric, dash, and dot characters, and be up to 40 characters long.|

1. Select **Next** to continue.

---

[!INCLUDE [get-data-process-event-preingestion-eventstream](includes/get-data-process-event-preingestion-eventstream.md)]

## Step 3: Inspect

The **Inspect** tab shows a preview of the data.

Select **Finish** to complete the ingestion process.

:::image type="content" source="media/get-data-eventstream/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-eventstream/inspect-data.png":::

Optional:

* Use the file type dropdown to explore [Advanced options based on data type](#advanced-options-based-on-data-type).

* Use the **Table_mapping** dropdown to define a new mapping.

* Select **</>** to open the command viewer to view and copy the automatic commands generated from your inputs. You can also open the commands in a queryset.

* Select the pencil icon to [Edit columns](#edit-columns).

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-eventstream/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-eventstream/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

### Advanced options based on data type

**Tabular (CSV, TSV, and PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Table_mapping** > **Use existing mapping**. Tabular data doesn't always include the column names used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.

**JSON**:

* Select **Nested levels** to determine the column division of JSON data, from 1 to 100.

## Step 4: Summary

In the **Summary** window, all the steps are marked as completed when data ingestion finishes successfully. Select a card to explore the data, delete the ingested data, or create a dashboard with key metrics. Select **Close** to close the window.

:::image type="content" source="media/get-data-eventstream/summary.png" alt-text="Screenshot of the summary page showing successful data ingestion." lightbox="media/get-data-eventstream/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md).
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md).
