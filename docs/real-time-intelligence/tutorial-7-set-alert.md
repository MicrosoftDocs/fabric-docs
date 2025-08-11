---
title: Real-Time Intelligence tutorial part 7 - Set an alert on your event stream
description: Learn how to set an alert on your event stream in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 11/19/2024
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to set an alert on my eventstream in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 7: Set an alert on your event stream

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 6: Create a Power BI report](tutorial-6-power-bi-report.md).

In this part of the tutorial, you learn how to set an alert on your eventstream to receive a notification in Teams when the number of bikes falls below a certain threshold.

## Set an alert on the eventstream

1. From the left navigation bar, select **Real-Time**.
1. Select the eventstream you created in the previous tutorial named *TutorialEventstream*.
    The eventstream details page opens.
    
    :::image type="content" source="media/tutorial/set-alert.png" alt-text="Screenshot of eventstreams details page and set alert selected." lightbox="media/tutorial/set-alert.png":::

1. Select **Set alert**
1. A new pane opens. Fill in the fields as follows:

    | Field | Value |
    | --- | --- |
    | **Condition** |  |
    | Check | On each event when |
    | Field | No_Bikes |  
    | Condition | Is less than |
    | Value | 5 |
    | **Action** |  **Message me in Teams**
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
> [Tutorial part 8: Clean up resources](tutorial-8-clean-up-resources.md)
