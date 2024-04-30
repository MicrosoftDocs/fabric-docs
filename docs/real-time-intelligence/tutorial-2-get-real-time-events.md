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
---
# Real-Time Intelligence tutorial part 2: Get data in the Real-Time Hub

> [!NOTE]
> This tutorial is part of a series. For the previous section, see:  [Tutorial part 1: Create resources](tutorial-1-resources.md).

## Create eventstream

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

1. Select **Open Eventstream**.
1. In the eventstream authoring canvas, select the eventstream tile in the center.
1. From the menu ribbon, select **Edit**.
1. Select **Transform events** > **Manage fields**.

    :::image type="content" source="media/tutorial/manage-fields.png" alt-text="Screenshot showing the edit window of eventstreams with transform events selected in Real-Time Intelligence in Microsoft Fabric.":::
1. From the TutorialEventstream item rightmost node, drag


## Related content

For more information about tasks performed in this tutorial, see:

* [Create and manage an eventstream](event-streams/create-manage-an-eventstream.md)
* [Add a sample data as a source](event-streams/add-source-sample-data.md#add-sample-data-as-a-source)
* [Add a KQL database as a destination](event-streams/add-destination-kql-database.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 3: Set a trigger on your event stream](tutorial-3-set-trigger.md)
