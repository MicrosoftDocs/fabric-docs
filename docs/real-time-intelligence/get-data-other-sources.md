---
title: Get data from other sources located in the Real-Time hub 
description: Learn how to get data from other sources into in a KQL database in Real-time Intelligence.
ms.reviewer: guyr
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 01/25/2026
ms.subservice: rti-eventhouse
ms.search.form: Get data in a KQL Database
---

# Get data from other data sources

In this article, you learn how to get events, from a wide range of data sources and connectors in the Real-Time Hub, into either a new or existing table. You can do this directly from the Get data experience in your KQL database in Real-Time Intelligence, without having to leave the workflow or set up an Eventstream first.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Step 1: Source

Select *more data sources* as your data source:

1. In the Microsoft Fabric portal, navigate to your KQL database.

1. Select **Get Data** and then select **Connect more data sources**.

    You can do this from either the **Get Data** button in the top menu bar, or from the get data dropdown menu in the top menu bar, or from the database more actions menu.

   :::image type="content" source="media/get-data-real-time-hub/get-data-other-sources-tile.png" alt-text="Screenshot of the get data tiles with the Connect more data sources option highlighted." lightbox="media/get-data-real-time-hub/get-data-other-sources-tile.png":::

    :::image type="content" source="media/get-data-real-time-hub/get-data-other-sources.png" alt-text="Screenshot of the get data menu with the Connect more data sources option highlighted." lightbox="media/get-data-real-time-hub/get-data-other-sources.png":::

1. In the *Select a data source* window you see all the data sources available in Real-Time Hub. You can search for a source, or filter by category. In this example, select the sample scenario **Bicycle rentals**.

   :::image type="content" source="media/get-data-real-time-hub/select-data-source.png" alt-text="Screenshot of the Connect data source window with the Bicycle rentals sample scenario highlighted." lightbox="media/get-data-real-time-hub/select-data-source.png":::

## Step 2: Configure

Configure the connection settings. Connecting to the data source generates both a stream and an eventstream.

1. Define the data **Source name**.

1. In the Stream details pane, fill out the eventstream settings or use the default values.

    |**Setting** | **Description**|
    |----|----|
    | Workspace | Your eventstream workspace location. This can be the same or different workspace as the database. |
    | Eventstream Name | The name of your eventstream. |

    :::image type="content" source="media/get-data-real-time-hub/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and one sample data file selected." lightbox="media/get-data-real-time-hub/configure-tab.png":::

1. Select **Next**.

1. In the **Review and connect** pane, review your settings and select **Connect**.

    The status of the create tasks is shown. When each task is complete, a green check mark appears in the status column.

    :::image type="content" source="media/get-data-real-time-hub/get-data-review-connect-finish.png" alt-text="Screenshot of Review and connect tab with successful task status and the Finish button highlighted." lightbox="media/get-data-real-time-hub/get-data-review-connect-finish.png":::

    When the connection is successful, select **Finish**.

     > [!TIP]
     >
     > Optionally, you can select **Open Eventstream** and go to the eventstream you just created, to define the destination table and complete the ingestion process.

1. In the *Pick a destination table* window, select **New table** and enter a name for the new table.

    :::image type="content" source="media/get-data-real-time-hub/destination-table.png" alt-text="Screenshot of destination tab with new table selected and table name entered." lightbox="media/get-data-real-time-hub/destination-table.png":::

1. The **Data connection name** is automatically filled. Optionally, you can enter a new name. The name can only contain alphanumeric, dash, and dot characters, and be up to 40 characters in length.

1. Decide whether to process events before ingestion in Eventstream.

    This option allows you to configure data processing before data is ingested into the destination table. If selected, you continue the data ingestion process in Eventstream. For more information, see [Process event before ingestion in eventstream](get-data-eventstream.md#process-event-before-ingestion-in-eventstream).

1. Select **Next** to continue to the **Inspect** tab.

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

**Tabular (CSV, TSV, and PSV)**: If you're ingesting tabular formats in an *existing table*, you can select **Table_mapping** > **Use existing mapping**. Tabular data doesn't always include the column names used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.

**JSON**: Select **Nested levels** to determine the column division of JSON data, from 1 to 100.

## Step 4: Summary

In the **Summary** window, all the steps are marked as completed when data ingestion finishes successfully. Select a card to explore the data, delete the ingested data, or create a dashboard with key metrics. Select **Close** to close the window.

:::image type="content" source="media/get-data-eventstream/summary.png" alt-text="Screenshot of the summary page showing successful data ingestion." lightbox="media/get-data-eventstream/summary.png":::

When you close the window, you return to the KQL database overview page. The new table appears in the **Tables** list in the left pane. The new eventstream appears in the **Data streams** list.

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
* To get data from a new eventstream, see [Get data from a new eventstream](event-streams/get-data-from-eventstream-in-multiple-fabric-items.md#get-data-from-a-new-eventstream)