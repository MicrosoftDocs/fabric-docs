---
title: Real-Time Intelligence tutorial part 6 - Set an alert on your event stream
description: Learn how to set an alert on your event stream in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
#customer intent: I want to learn how to set an alert on my Event stream in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 6: Set an alert on your event stream

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 5: Create a Power BI report](tutorial-5-power-bi-report.md).

In this part of the tutorial, you learn how to set an alert on your event stream to receive a notification in Teams when the number of bikes falls below a certain threshold.

## Set an alert on the event stream

1. From the left navigation bar, select **Real-Time hub**.
1. Select the event stream you created in the previous tutorial named *TutorialEventstream*.
    The event stream details page opens.
    
    :::image type="content" source="media/tutorial/set-alert.png" alt-text="Screenshot of event streams details page and set alert selected." lightbox="media/tutorial/set-alert.png":::

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
    | New item name | Tutorial-Reflex |

    :::image type="content" source="media/tutorial/alert-logic.png" alt-text="Screenshot of Set alert pane in Real-Time Intelligence.":::

1. Select **Create**.

    The alert is set and you receive a notification in Teams when the condition is met.

## Related content

For more information about tasks performed in this tutorial, see:
* [What is Data Activator?](../data-activator/data-activator-introduction.md)
* [Set alerts on streams in Real-Time hub](../real-time-hub/set-alerts-data-streams.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 7: Clean up resources](tutorial-7-clean-up-resources.md)
