---
title: Get data from Real-Time hub (Public Preview)
description: Learn how to get data from Real-Time hub in a KQL database in Real-Time Intelligence.
ms.reviewer: aksdi
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/18/2024
ms.search.form: Get data in a KQL Database
---

# Get data from Real-Time hub

In this article, you learn how to get events from Real-Time hub into either a new or existing table.

> [!NOTE]
> Currently Real-Time event hub only supports eventstreams as a source.
> Real-Time hub is currently in public preview.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* An [eventstream](event-streams/create-manage-an-eventstream.md) with a data source

## Source

To get data from Real-Time hub, you need to select a Real-Time stream from Real-Time data hub as your data source. You can select Real-Time hub in the following ways:

On the lower ribbon of your KQL database, either:

* From the **Get Data** dropdown menu, then under **Continuous**, select **Real-Time hub (Preview)**.

* Select **Get Data** and then in the **Get data** window, select a stream from the Real-Time hub section.

    :::image type="content" source="media/get-data-real-time-hub/select-data-source.png" alt-text="Screenshot of get data window with Real-Time hub options." lightbox="media/get-data-real-time-hub/select-data-source.png":::

* Select a data stream from the Real-Time hub stream list.

## Configure

1. Select a target table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.
1. Under **Configure the data source**, fill out the settings using the information in the following table. Some setting information automatically fills from your eventstream.

    :::image type="content" source="media/get-data-real-time-hub/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-real-time-hub/configure-tab.png":::

    |**Setting** | **Description**|
    |----|----|
    | Workspace| Your eventstream workspace location. Your workspace name is automatically filled. |
    | Eventstream Name| The name of your eventstream. Your eventstream name is automatically filled.|
    | Data connection name| The name used to reference and manage your data connection in your workspace. The data connection name is automatically filled. Optionally, you can enter a new name. The name can only contain alphanumeric, dash, and dot characters, and be up to 40 characters in length.|
    | Process event before ingestion in Eventstream | This option allows you to configure data processing before data is ingested into the destination table. If selected, you continue the data ingestion process in Eventstream. For more information, see [Process event before ingestion in Eventstream](#process-event-before-ingestion-in-eventstream).|
    | **Advanced filters**| |
    | Compression| Data compression of the events, as coming from the event hub. Options are None (default), or Gzip compression.|
    | Event system properties| If there are multiple records per event message, the system properties are added to the first one. For more information, see [Event system properties](get-data-event-hub.md#event-system-properties).|
    | Event retrieval start date| The data connection retrieves existing events created since the Event retrieval start date. It can only retrieve events retained by the event hub, based on its retention period. The time zone is UTC. If no time is specified, the default time is the time at which the data connection is created.|

1. Select **Next**

[!INCLUDE [get-data-process-event-preingestion-eventstream](includes/get-data-process-event-preingestion-eventstream.md)]

## Inspect

The **Inspect** tab opens with a preview of the data.

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-real-time-hub/inspect-data.png" alt-text="Screenshot of the inspect tab. " lightbox="media/get-data-real-time-hub/inspect-data.png":::

Optionally:

* Select **Command viewer** to view and copy the automatic commands generated from your inputs.
* Change the automatically inferred data format by selecting the desired format from the dropdown. Data is read from the event hub in the form of [EventData](/dotnet/api/microsoft.servicebus.messaging.eventdata?context=/fabric/context/context) objects. Supported formats are Avro, Apache Avro, CSV, JSON, ORC, Parquet, PSV, RAW, SCsv, SOHsv, TSV, TXT, and TSVE.
* [Edit columns](#edit-columns).
* Explore [Advanced options based on data type](#advanced-options-based-on-data-type).

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-eventstream/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-eventstream/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

[!INCLUDE [get-data-process-event-advanced-options-data-type](includes/get-data-process-event-advanced-options-data-type.md)]

## Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary. Select **Close** to close the window.

:::image type="content" source="media/get-data-real-time-hub/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-real-time-hub/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
* To get data from a new eventstream, see [Get data from a new eventstream](event-streams/get-data-from-eventstream-in-multiple-fabric-items.md#get-data-from-a-new-eventstream)
