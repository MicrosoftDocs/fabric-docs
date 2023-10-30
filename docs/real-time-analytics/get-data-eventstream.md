---
title: Get data from Eventstream
description: Learn how to get data from an eventstream in a KQL database in Real-Time Analytics.
ms.reviewer: aksdi
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 10/29/2023
ms.search.form: Get data in a KQL Database
---

# Get data from Eventstream

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this article, you learn how to get data from an existing eventstream into either a new or existing table.

To get data from a new eventstream, see <!-- [Get data from a new eventstream](event-streams/get-data-from-eventstream-in-multiple-fabric-items.md#get-data-from-a-new-eventstream).-->

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* An [eventstream](event-streams/create-manage-an-eventstream.md) with a data source

## Select a data source

1. On the lower ribbon of your KQL database, select **Get Data**.

    In the **Get data** window, the **Source** tab is selected.

1. Select the data source from the available list. In this example, you're ingesting data from **Eventstream**.

    :::image type="content" source="media/get-data-eventstream/select-data-source.png" alt-text="Screenshot of get data window with source tab selected." lightbox="media/get-data-eventstream/select-data-source.png":::

### Configure tab

1. Select a target table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.
1. Under **Configure the data source**, fill out the following field according to the table:

    :::image type="content" source="media/get-data-eventstream/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-eventstream/configure-tab.png":::

    |**Setting** | **Description**|
    |----|----|----|
    | Workspace| The workspace in which your eventstream is located. Select a workspace from the dropdown.|
    | Eventstream Name| The name of your eventstream. Select an eventstream from the dropdown.|
    | Data connection name| The name used to reference and manage your data connection in your workspace. The data connection name is automatically filled. Optionally, you can enter a new name. The name can only contain alphanumeric, dash, and dot characters, and be up to 40 characters in length.|
    | **Advanced filters**| |
    | Compression| Data compression of the events, as coming from the event hub. Options are None (default), or Gzip compression.|
    | Event system properties| If there are multiple records per event message, the system properties are added to the first one. For more information, see [Event system properties](get-data-event-hub.md#event-system-properties).|
    | Event retrieval start date| The data connection retrieves existing events created since the Event retrieval start date. It can only retrieve events retained by the event hub, based on its retention period. The time zone is UTC. If no time is specified, the default time is the time at which the data connection is created.|

1. Select **Next**

## Inspect the data

The **Inspect** tab opens with a preview of the data.

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-eventstream/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-eventstream/inspect-data.png":::

Optionally:

* Select **Command viewer** to view and copy the automatic commands generated from your inputs.
* Change the automatically inferred data format by selecting the desired format from the dropdown. Data is read from the event hub in form of [EventData](/dotnet/api/microsoft.servicebus.messaging.eventdata?context=/fabric/context/context) objects. Supported formats are CSV, JSON, PSV, SCsv, SOHsv TSV, TXT, and TSVE.
* [Edit columns](#edit-columns).
* Explore [Advanced options based on data type](#advanced-options-based-on-data-type).

[!INCLUDE [get-data-edit-columns](../includes/real-time-analytics/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-eventstream/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-eventstream/edit-columns.png":::

[!INCLUDE [mapping-transformations](../includes/real-time-analytics/mapping-transformations.md)]

### Advanced options based on data type

**Tabular (CSV, TSV, PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Advanced** > **Keep table schema**. Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.
* To use the first row as column names, select  **Advanced** > **First row is column header**.

    :::image type="content" source="media/get-data-eventstream/advanced-csv.png" alt-text="Screenshot of advanced CSV options.":::

**JSON**:

* To determine column division of JSON data, select **Advanced** > **Nested levels**, from 1 to 100.
* If you select **Advanced** > **Skip JSON lines with errors**, the data is ingested in JSON format. If you leave this check box unselected, the data is ingested in multijson format.

    :::image type="content" source="media/get-data-eventstream/advanced-json.png" alt-text="Screenshot of advanced JSON options.":::

## Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary.

:::image type="content" source="media/get-data-eventstream/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-eventstream/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
