---
title: Real-Time Intelligence Tutorial Part 3 - Set an Alert on Your Eventstream
description: Learn how to set an alert on your eventstream in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: tutorial
ms.date: 10/28/2025
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to set an alert on my eventstream in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 3: Set an alert on your eventstream

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 2: Get data in the Real-Time hub](tutorial-2-get-real-time-events.md).

In this part of the tutorial, you set an Activator alert on your eventstream to receive a notification in Teams when the number of bikes falls below a certain threshold.

## Set an alert on the eventstream

Here you configure the rules for the alert.

1. From the left navigation bar, select **Real-Time**.

1. Select the **TutorialEventstream** eventstream you created in the previous tutorial. The eventstream details page opens.

    :::image type="content" source="media/tutorial/set-alert.png" alt-text="Screenshot of eventstreams details page and set alert selected." lightbox="media/tutorial/set-alert.png":::

1. Select **Set alert**

1. A new pane opens. Fill in the fields as follows:

    | Field | Value |
    | --- | --- |
    | **Details** | |
    | Rule name | TutorialRule|
    | **Condition** |  |
    | Check | On each event when |
    | Field | No_Bikes |  
    | Condition | Is less than |
    | Value | 5 |
    | **Action** |  |
    | Select action| Message to individuals|
    | To | Your Teams account |
    | Headline | Activator alert |
    | Notes | The condition has been met |
    | Context | No_Bikes |
    | **Save location** | |
    | Workspace | The workspace in which you created resources|
    | Item | Create a new item |
    | New item name | Tutorial |

    :::image type="content" source="media/tutorial/alert-logic.png" alt-text="Screenshot of Set alert pane in Real-Time Intelligence.":::

1. Select **Create**.

    The alert is set and you receive a notification in Teams when the condition is met.

## Related content

For more information about tasks performed in this tutorial, see:

* [What is Activator?](data-activator/activator-introduction.md)
* [Set alerts on streams in Real-Time hub](../real-time-hub/set-alerts-data-streams.md)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 4: Transform data in a KQL database](tutorial-4-transform-kql-database.md)
