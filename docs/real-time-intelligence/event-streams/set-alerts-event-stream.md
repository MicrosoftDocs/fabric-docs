---
title: Set Alerts on Eventstream With Activator Destination
description: Learn how to set up alerts on an eventstream using an Activator destination. Follow step-by-step instructions to configure conditions and actions for effective monitoring and response.
#customer intent: As a data engineer, I want to set up alerts on an eventstream using an Activator destination so that I can monitor specific conditions and trigger actions automatically.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 03/02/2026
ms.search.form: Source and Destination
---

# Set alert on an eventstream with Activator destination

This article shows you how to set up alerts on an eventstream using an Activator destination.

## Set alert 

1. Publish your eventstream.

1. When the eventstream is in **Live** mode, select **Set alert** on the ribbon.

   :::image type="content" source="./media/set-alerts-event-stream/set-alert-ribbon.png" alt-text="Screenshot of the Set alert button on the ribbon." lightbox="./media/set-alerts-event-stream/set-alert-ribbon.png" border="true":::

1. In the **Add rule** pane, enter the following details and select **Save**.

    - **Rule name**: Enter a name for the rule.
    
    - **Condition**: Define a condition to trigger the rule. For example, set the condition to `airport_fee* > 0` to trigger the rule when the airport fee is greater than 0. The condition must be based on the keys in the JSON dictionary of the event. In this example, *airport_fee* is a key in the JSON dictionary of the event.
    
    - **Action**: Select an action to perform when the condition is met. For example, choose to send an email notification or trigger a Logic App.

       :::image type="content" source="media/add-destination-activator-enhanced/add-rule.png" alt-text="Screenshot of the Add rule pane for an activator destination." lightbox="media/add-destination-activator-enhanced/add-rule.png" border="true":::

        For more information on how to create rules in an activator instance, see [Create rules in an activator instance](../data-activator/activator-create-activators.md).

1. On the **Alert created** pane, you see the details of the alert you created. Select **Open** to view the Activation item in the Fabric Activator user interface (UI).

   :::image type="content" source="media/set-alerts-event-stream/alert-created.png" alt-text="Screenshot of the Alert created pane." lightbox="media/set-alerts-event-stream/alert-created.png" border="true":::

1. Select **Done** to close the **Alert created** window. 

1. An Activator destination should be added to the eventstream.

## Related content

See the following articles:  

- [Add Activator destination to an eventstream](add-destination-activator.md)

