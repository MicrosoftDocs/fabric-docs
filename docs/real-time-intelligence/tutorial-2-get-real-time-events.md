---
title: Real-Time Intelligence tutorial part 2- Get data in the Real-Time Hub
description: Learn how to get data in the Real-Time Hub in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
# customer intent: I want to learn how to get data in the Real-Time Hub in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 2: Get data in the Real-Time Hub

> [!NOTE]
> This tutorial is part of a series. For the previous section, see:  [Tutorial part 1: Create resources](tutorial-1-resources.md).

## Create an eventstream

1. From the navigation bar, select **Real-Time Hub**.
1. Select **+ Get events**.
1. The **Get events** pane opens. Select **Sample data**. 

### Sample data

1. In **Source name**, enter *TutorialSource*.
1. In **Sample data** select *Bicycles (Reflex compatible).

### Stream details

1. Edit the **Eventstream name** by selecting the pencil icon and entering *TutorialEventstream*.
1. Select **Next**.

### Review and create

1. Review the eventstream details and select **Create source**.

   A new eventstream named *TutorialEventstream* has been created with data flowing.

## Transform events

1. Select **Open Eventstream** from the notification that appears after creating the eventstream, or browse to the eventstream from the Real-time hub.
1. In the eventstream authoring canvas, select the eventstream tile in the center.
1. From the menu ribbon, select **Edit**.
1. Select **Transform events** > **Manage fields**.

    :::image type="content" source="media/tutorial/manage-fields.png" alt-text="Screenshot showing the edit window of eventstreams with transform events selected in Real-Time Intelligence in Microsoft Fabric.":::

     A new tile is created entitled *Managefields1*.

1. On the left edge of the *Managefields* tile, select the green circle and drag it to the righthand edge of the *TutorialEventstream* tile. A line appears connecting the two tiles.
1. Select the pencil icon on the *Managefields1* tile.
1. In the **Manage fields** pane, do the following actions:
    1. In **Operation name**, enter *TutorialTransform*. 
    1. Select **Add all fields**
    1. Select **+ Add field**.
    1. In the **Built-in Date Time Function** dropdown, select **SYSTEM.Timestamp()**
    
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
    1. In **Destination name**, enter *TutorialDestination*.
    1. In **Workspace**, select the workspace in which you've created your resources in a previous step.
    1. In **KQL Database**, select the database named *Tutorial*, which was created in a previous step.
    1. In **Destination table** select **Create new**. For the table name, enter *TutorialTable*.
    1. Leave **Input data format** as *JSON*.
    1. Select **Save**.
    
        :::image type="content" source="media/tutorial/kql-database-details.png" alt-text="Screenshot showing the KQL database destination pane in Real-Time Intelligence.":::

The eventstream is now set up to transform events and send them to a KQL database.

## Related content

For more information about tasks performed in this tutorial, see:

* [Create and manage an eventstream](event-streams/create-manage-an-eventstream.md)
* [Add a sample data as a source](event-streams/add-source-sample-data.md#add-sample-data-as-a-source)
* [Add a KQL database as a destination](event-streams/add-destination-kql-database.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 3: Set a trigger on your event stream](tutorial-3-set-trigger.md)
