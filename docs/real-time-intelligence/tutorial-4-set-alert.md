---
title: Real-Time Intelligence tutorial part 4- Set an alert on your event stream
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
# Real-Time Intelligence tutorial part 4: Set an alert on your event stream

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 3: Query streaming data in a KQL queryset](tutorial-3-query-data.md).

## Set an alert on the event stream

1. From the left navigation bar, select **Real-Time hub**.
1. Select the event stream you created in the previous tutorial.
    The event stream details page opens.
    
    :::image type="content" source="media/tutorial/set-alert.png" alt-text="Screenshot of event streams details page and set alert selected." lightbox="media/tutorial/set-alert.png":::

1. Select **Set alert**
1. A new pane opens. Fill in the following fields:

    | Field | Value |
    | --- | --- |
    | **Condition** |  |
    | Check | On each event when |
    | Field | No_Empty_Docks |  
    | Condition | Is less than |
    | Value | 5 |
    | **Action** |  **Message me in Teams**
    | **Save location** | | 
    | Workspace | The workspace in which you created resources|
    | Item | Tutorial-reflex |

    :::image type="content" source="media/tutorial/alert-logic.png" alt-text="Screenshot of Set alert pane in Real-Time Intelligence.":::

1. Select **Create**.

    The alert is set and you'll receive a notification in Teams when the condition is met.

## Related content

For more information about tasks performed in this tutorial, see:
* [What is Data Activator?](../data-activator/data-activator-introduction.md)
* [Set alerts on streams in Real-Time hub](../real-time-hub/set-alerts-data-streams.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 5: Create a Real-Time dashboard](tutorial-5-create-dashboard.md)
