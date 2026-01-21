---
title: Get data from Real-Time hub 
description: Learn how to get data from Real-Time hub in a KQL database in Real-time Intelligence.
ms.reviewer: aksdi
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 01/19/2026
ms.subservice: rti-eventhouse
ms.search.form: Get data in a KQL Database
---

# Get data from other data sources in the Real-Time Hub

In this article, you learn how to get events, from a wide range of data sources and connectors in the Real-Time Hub, into either a new or existing table. You can do this directly from the Get data experience in your KQL database in Real-Time Intelligence, without having to leave the workflow or set up an Eventstream first.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Step 1: Source

Select *more (RTH) data sources* as your data source:

1. In the Microsoft Fabric portal, navigate to your KQL database.

1. Select **Get Data** and then select **Connect more data sources**.

    You can do this from either the **Get Data** button in the top menu bar, or from the get data dropdown menu in the top menu bar, or from the database more actions menu. 

   :::image type="content" source="media/get-data-real-time-hub/get-data-other-sources-tile.png" alt-text="Screenshot of the get data tiles with the Connect more data sources option highlighted.":::

    :::image type="content" source="media/get-data-real-time-hub/get-data-other-sources.png" alt-text="Screenshot of the get data menu with the Connect more data sources option highlighted.":::

1. In the Select a data source window you see all the data sources available in Real-Time Hub. You can search for a source, or filter by category. In this example, select the sample scenario **Bicycle rentals**.

   :::image type="content" source="media/get-data-real-time-hub/select-data-source.png" alt-text="Screenshot of the Connect data source window with the Bicycle rentals sample scenario highlighted." lightbox="media/get-data-real-time-hub/select-data-source.png":::

## Step 2: Configure

Configure the connection settings. Connecting to the RTH data source generates both a stream and an eventstream.

1. Define the data **Source name**.

1. In the Stream details pane, fill out the eventstream settings or use the default values.

    |**Setting** | **Description**|
    |----|----|
    | Workspace | Your eventstream workspace location. This can be the same or different worskpace as the database. |
    | Eventstream Name | The name of your eventstream. |

    :::image type="content" source="media/get-data-real-time-hub/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-real-time-hub/configure-tab.png":::

1. Select **Next**

1. In the **Review and connect** pane, review your settings and select **Connect**.

    The status of the create tasks is shown. When each task is complete, a green check mark appears in the status column.

    :::image type="content" source="media/get-data-real-time-hub/get-data-review-connect-finish.png" alt-text="Screenshot of Review and connect tab with successful task status and the Finish button highlighted" lightbox="media/get-data-real-time-hub/get-data-review-connect-finish.png":::

    When the connection is successful, select **Finish**.

     > [!TIP]
     >
     > Optionally, you can select **Open Eventstream** and go to the created eventstream to define the destination table and complete the ingestion process from there.

1. In the Destination table window, select **New table** and enter a name for the new destination table.

    :::image type="content" source="media/get-data-real-time-hub/destination-table.png" alt-text="Screenshot of destination tab with new table selected and table name entered." lightbox="media/get-data-real-time-hub/destination-table.png":::

1. Define a data connection name, and decide whether to process events before ingestion in Eventstream.

    |**Setting** | **Description**|
    | Data connection name | The name used to reference and manage your data connection in your workspace. The data connection name is automatically filled. Optionally, you can enter a new name. The name can only contain alphanumeric, dash, and dot characters, and be up to 40 characters in length.|
    | Process event before ingestion in Eventstream | This option allows you to configure data processing before data is ingested into the destination table. If selected, you continue the data ingestion process in Eventstream. For more information, see [!INCLUDE [get-data-process-event-preingestion-eventstream](includes/get-data-process-event-preingestion-eventstream.md)].|

In progress......

## Step 3: Inspect

The **Inspect** tab opens with a preview of the data.

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-real-time-hub/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-real-time-hub/inspect-data.png":::

[!INCLUDE [get-data-inspect-formats](includes/get-data-inspect-formats.md)]

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-eventstream/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-eventstream/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

[!INCLUDE [get-data-process-event-advanced-options-data-type](includes/get-data-process-event-advanced-options-data-type.md)]

## Step 4: Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary. Select **Close** to close the window.

:::image type="content" source="media/get-data-real-time-hub/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-real-time-hub/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
* To get data from a new eventstream, see [Get data from a new eventstream](event-streams/get-data-from-eventstream-in-multiple-fabric-items.md#get-data-from-a-new-eventstream)



[!INCLUDE [get-data-process-event-preingestion-eventstream](includes/get-data-process-event-preingestion-eventstream.md)]

 
    | **Advanced filters**| |
    | Compression| Data compression of the events, as coming from the hub. Options are None (default), or Gzip compression.|
    | Event system properties| If there are multiple records per event message, the system properties are added to the first one. For more information, see [Event system properties](get-data-event-hub.md#event-system-properties).|
    | Event retrieval start date| The data connection retrieves existing events created since the Event retrieval start date. It can only retrieve events retained by the hub, based on its retention period. The time zone is UTC. If no time is specified, the default time is the time at which the data connection is created.|
