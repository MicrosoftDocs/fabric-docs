---
title: Real-Time Intelligence tutorial part 2- Get data in the Real-Time hub
description: Learn how to get data in the Real-Time hub in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
# customer intent: I want to learn how to get data in the Real-Time hub in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 2: Get data in the Real-Time hub

> [!NOTE]
> This tutorial is part of a series. For the previous section, see:  [Tutorial part 1: Create resources](tutorial-1-resources.md).

## Create an event stream

1. From the navigation bar, select **Real-Time Hub**.
1. Select **+ Get events**.
    
    :::image type="content" source="media/tutorial/get-events.png" alt-text="Screenshot of Real-time hub with get events highlighted.":::

1. The **Get events** pane opens. Select **Sample data**. 

### Sample data

1. In **Source name**, enter *TutorialSource*.
1. In **Sample data** select *Bicycles (Reflex compatible)*.

### Stream details

1. Edit the **Eventstream name** by selecting the pencil icon and entering *TutorialEventstream*.
1. Select **Next**.

:::image type="content" source="media/tutorial/connect-source.png" alt-text="Screenshot of connect window in Real-Time hub.":::

### Review and create

1. Review the event stream details and select **Create source**.

   A new event stream named *TutorialEventstream* is created.

## Transform events

1. Select **Open Eventstream** from the notification that appears after creating the event stream, or browse to the event stream from the Real-time hub and select **Open Eventstream**.
1. In the event stream authoring canvas, select the event stream tile in the center.
1. From the menu ribbon, select **Edit**.
1. Select the down arrow on the **Transform events or add destination** tile.  
1. Select **Manage fields**. The tile is renamed to *Manage_fields*.
1. Select the pencil icon on the *Manage_fields* tile.
1. In the **Manage fields** pane, do the following actions:
    1. In **Operation name**, enter *TutorialTransform*. 
    1. Select **Add all fields**
    1. Select **+ Add field**.
    1. From the **Built-in Date Time Function** dropdown, select **SYSTEM.Timestamp()**
    
        :::image type="content" source="media/tutorial/system-timestamp.png" alt-text="Screenshot showing the system timestamp selected in the event stream manage fields tile in Real-Time Intelligence.":::

    1. Enter *Timestamp* as the **Field name**.
    1. Select **Add**.
  1. Select **Done**.

## Create a destination

1. Hover over the right edge of the *TutorialTransform* tile and select the green plus icon.
1. Select **Destinations** > **KQL Database**.

    A new tile is created entitled *KQLDatabase1*.

1. Select the pencil icon on the *KQLDatabase1* tile.
1. Enter the following information in the **KQL Database** pane:

    :::image type="content" source="media/tutorial/kql-database-details.png" alt-text="Screenshot showing the KQL database destination pane in Real-Time Intelligence.":::

    | Field | Value |
    | --- | --- |
    | **Destination name** | *TutorialDestination* |
    | **Workspace** | Select the workspace in which you've created your resources. |
    | **KQL Database** | *Tutorial* |
    | **Destination table** | *Create new* - enter *TutorialTable* as table name |
    | **Input data format** | *JSON* |  

1. Select **Save**.
1. Select **Publish**.

The event stream is now set up to transform events and send them to a KQL database.

## Related content

For more information about tasks performed in this tutorial, see:

* [Create and manage an event stream](event-streams/create-manage-an-eventstream.md)
* [Add a sample data as a source](event-streams/add-source-sample-data.md#add-sample-data-as-a-source)
* [Add a KQL database as a destination](event-streams/add-destination-kql-database.md)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 3: Query streaming data in a KQL queryset](tutorial-3-query-data.md)
