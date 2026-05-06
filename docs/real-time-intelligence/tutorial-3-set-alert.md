---
title: Real-Time Intelligence Tutorial Part 3 - Set an Alert on Your Eventstream
description: Learn how to set an alert on your eventstream in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: tutorial
ms.date: 05/06/2026
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to set an alert on my eventstream in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 3: Set an alert on your eventstream

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 2: Get data in the Real-Time hub](tutorial-2-get-real-time-events.md).

In this part of the tutorial, you set an Activator alert on your eventstream to receive a notification in Teams when the number of bikes falls below a certain threshold.

## Set an alert on the eventstream

Here you configure the rules for the alert. Your starting point is the eventstream details page for the eventstream you created in the previous tutorial. To get there, follow one of these two paths:

1. From the left navigation bar, select **Real-Time**.

1. In the list of recent Select the **TutorialEventstream** eventstream you created in the previous tutorial. The eventstream details page opens.

    :::image type="content" source="media/tutorial/set-alert.png" alt-text="Screenshot of eventstreams details page and set alert selected." lightbox="media/tutorial/set-alert.png":::

1. Select **Set alert**.

1. In the **Add rule** page, follow these steps:

    1. In the **Details** section, for **Rule name**, enter **TutorialRule**.

    1. In the **Condition** section, follow these steps to set the condition for the alert:

        1. For **Check**, select **On each event when**.

        1. For **When**, select **No_Bikes**.

        1. For **Condition**, select **Is equal to**.

        1. For **Value**, enter **0**.

            :::image type="content" source="media/tutorial/alert-logic-condition-sm.png" alt-text="Screenshot of alert condition settings." lightbox="media/tutorial/alert-logic-condition.png":::

    1. In the **Action** section, follow these steps to set the action for the alert:

        1. For **Select action**, select **Message to individuals**.

        1. For **To**, select your Teams account.

        1. For **Headline**, enter **@** or open the tag icon. In the list select **BikepointID**, and then type **has no bikes**. The resulting headline should be **@BikepointID has no bikes**.

        1. For **Notes**, enter **The bike point:​ @BikepointID has @No_Bikes bikes. Please replenish the station**.

        1. For **Context**, select **No_Bikes**.

    1. In the **Save location** section, follow these steps to set where the alert will be saved:

        1. For **Workspace**, select the workspace in which you created resources for this tutorial.
        1. For **Item**, select **Create a new item**.
        1. For **New item name**, enter **TutorialActivator**.
        1. Select **Create**.

            :::image type="content" source="media/tutorial/alert-logic-sm.png" alt-text="Screenshot of Set alert pane in Real-Time Intelligence." lightbox="media/tutorial/alert-logic.png":::

1. The alert is set and you receive a notification in **Teams** when the condition is met.

    :::image type="content" source="media/tutorial/activator-sample-alert-sm.png" alt-text="Screenshot of a sample Teams alert." lightbox="media/tutorial/activator-sample-alert.png":::

## Open, view, and stop the Activator item

1. In the **Alert created** pane, select **Open** at the bottom of the pane. The Activator item you just created opens in a new tab. 

    If you closed the pane, you can also get to the Activator item from the left navigation bar, or by going to the workspace where you saved it and selecting it from the list of items. 

    :::image type="content" source="media/tutorial/open-activator-button-sm.png" alt-text="Screenshot of Alert created pane in Real-Time Intelligence." lightbox="media/tutorial/open-activator-button.png" :::

1. After you receive a few notifications in Teams, select **Stop** in the Activator item to stop the alert.
 
    :::image type="content" source="media/tutorial/stop-activator-rule.png" alt-text="Screenshot of Activator item with Stop button." lightbox="media/tutorial/stop-activator-rule.png" :::

## Related content

For more information about tasks performed in this tutorial, see:

* [What is Activator?](data-activator/activator-introduction.md)
* [Set alerts on streams in Real-Time hub](../real-time-hub/set-alerts-data-streams.md)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 4: Transform data in a KQL database](tutorial-4-transform-kql-database.md)
