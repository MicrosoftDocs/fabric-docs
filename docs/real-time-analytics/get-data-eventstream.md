---
title: Get data from Eventstream
description: Learn how to get data from an eventstream in a KQL database in Real-Time Analytics.
ms.reviewer: aksdi
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/16/2023
ms.search.form: Get data in a KQL Database
---

# Get data from Eventstream

In this article, you learn how to get data from an existing eventstream into either a new or existing table.

To get data from a new eventstream, see [Get data from a new eventstream](event-streams/get-data-from-eventstream-in-multiple-fabric-items.md#get-data-from-a-new-eventstream).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* An [eventstream](event-streams/create-manage-an-eventstream.md) with a data source

## Source

To get data from an eventstream, you need to select the eventstream as your data source. You can select an existing eventstream in the following ways:

On the lower ribbon of your KQL database, either:

* From the **Get Data** dropdown menu, then under **Continuous**, select **Eventstream** > **Existing Eventstream**.

* Select **Get Data** and then in the **Get data** window, select **Eventstream**.

    :::image type="content" source="media/get-data-eventstream/select-data-source.png" alt-text="Screenshot of get data window with source tab selected." lightbox="media/get-data-eventstream/select-data-source.png":::

## Configure

1. Select a target table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.
1. Under **Configure the data source**, fill out the settings using the information in the following table:

    :::image type="content" source="media/get-data-eventstream/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-eventstream/configure-tab.png":::

    |**Setting** | **Description**|
    |----|----|----|
    | Workspace| The workspace in which your eventstream is located. Select a workspace from the dropdown.|
    | Eventstream Name| The name of your eventstream. Select an eventstream from the dropdown.|
    | Data connection name| The name used to reference and manage your data connection in your workspace. The data connection name is automatically filled. Optionally, you can enter a new name. The name can only contain alphanumeric, dash, and dot characters, and be up to 40 characters in length.|
    | Process event before ingestion in Eventstream | This option allows you to configure data processing before data is ingested into the destination table. If selected, you continue the data ingestion process in Eventstream. For more information, see [Process event before ingestion in Eventstream](#process-event-before-ingestion-in-eventstream).|
    | **Advanced filters**| |
    | Compression| Data compression of the events, as coming from the event hub. Options are None (default), or Gzip compression.|
    | Event system properties| If there are multiple records per event message, the system properties are added to the first one. For more information, see [Event system properties](get-data-event-hub.md#event-system-properties).|
    | Event retrieval start date| The data connection retrieves existing events created since the Event retrieval start date. It can only retrieve events retained by the event hub, based on its retention period. The time zone is UTC. If no time is specified, the default time is the time at which the data connection is created.|

1. Select **Next**

### Process event before ingestion in Eventstream

The **Process event before ingestion in Eventstream** option enables you to process the data before it's ingested into the destination table. By selecting this option, the get data process seamlessly continues in Eventstream, with the destination table and data source details automatically populated.

To process event before ingestion in Eventstream:

1. On the **Configure** tab, select **Process event before ingestion in Eventstream**.

1. In the **Process events in Eventstream** dialog box, select **Continue in Eventstream**.

    > [!IMPORTANT]
    > Selecting **Continue in Eventstream** ends the get data process in Real-Time Analytics and continues in Eventstream with the destination table and data source details automatically populated.

    :::image type="content" source="media/get-data-eventstream/configure-tab-process-event-in-eventstream.png" alt-text="Screenshot of the Process events in Eventstream dialog box." lightbox="media/get-data-eventstream/configure-tab-process-event-in-eventstream.png":::

1. In Eventstream, select the **KQL Database** destination node, and in the **KQL Database** pane, verify that **Event processing before ingestion** is selected and that the destination details are correct.

    :::image type="content" source="media/get-data-eventstream/process-event-in-eventstream.png" alt-text="Screenshot of the Process events in Eventstream page." lightbox="media/get-data-eventstream/process-event-in-eventstream.png":::

1. Select **Open event processor** to configure the data processing and then select **Save**. For more information, see [Process event data with event processor editor](event-streams/process-events-using-event-processor-editor.md).
1. Back in the **KQL Database** pane, select **Add** to complete the **KQL Database** destination node setup.
1. Verify data is ingested into the destination table.

> [!NOTE]
> The process event before ingestion in Eventstream process is complete and the remaining steps in this article aren't required.

## Inspect

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

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary. Select **Close** to close the window.

:::image type="content" source="media/get-data-eventstream/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-eventstream/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
