---
title: Add Fabric Activator Destination to Eventstream
description: Learn how to add an Activator destination to your Fabric eventstream. Follow step-by-step instructions to configure, publish, and manage rules effectively.
#customer intent: As a data engineer, I want to add an activator destination to an eventstream so that I can trigger automated actions based on event conditions.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 03/02/2026
ms.search.form: Source and Destination
---

# Add a Fabric activator destination to an eventstream

This article shows you how to add an activator destination to an eventstream.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the Trial license mode with Contributor or higher permissions. 
- If you already have an activator you want to use, access to the workspace where your activator is located with Contributor or higher permissions.
- Each event in the source must consist of a JSON dictionary.
- One of the dictionary keys must represent a unique object ID.

    Here's an example of an event that meets these criteria:
    
    ```json
    {
        "PackageID": "PKG123",
        "Temperature": 25
    }
    ```
    In this example, *PackageID* is the unique ID.

## Add activator as a destination

To add an activator destination to a default stream or derived stream, follow these steps.

1. In **Edit mode** for your eventstream, select **Add destination** on the ribbon and select **Activator** from the dropdown list.

   :::image type="content" source="./media/add-destination-activator-enhanced/add-destination.png" alt-text="Screenshot of the Add destination dropdown list with Activator highlighted." lightbox="./media/add-destination-activator-enhanced/add-destination.png" border="true":::

    You can also select **Transform events or add destination** tile on the canvas, and select **Activator** from the dropdown list. 

   :::image type="content" source="media/add-destination-activator-enhanced/add-destination-canvas.png" alt-text="Screenshot of the canvas for an eventstream with New destination, Activator menu selected." lightbox="media/add-destination-activator-enhanced/add-destination-canvas.png":::

1. On the **Activator** screen, enter a **Destination name**, select a **Workspace**, and select an existing **Activator** or select **Create new** to create a new one.

   :::image type="content" source="media/add-destination-activator-enhanced/activator-screen.png" alt-text="Screenshot of the Activator screen." lightbox="media/add-destination-activator-enhanced/activator-screen.png" border="true":::

1. Select **Save**.
1. To implement the newly added activator destination, select **Publish**.



1. After you complete these steps, the activator destination is available for visualization in **Live view**. Select **Edit** to switch to the Edit mode to make more changes to the eventstream.

   :::image type="content" source="media/add-destination-activator-enhanced/eventstream-edit-mode-publish.png" alt-text="Screenshot of the Activator destination available for visualization in Live view." lightbox="media/add-destination-activator-enhanced/eventstream-edit-mode-publish.png" border="true":::

## Create rules in the activator instance

1. When the eventstream is in **Live** mode, select the **Activator** icon on the Activator destination. In the **Rules** pane, select **Add rule**. 

   :::image type="content" source="media/add-destination-activator-enhanced/event-stream-live-view.png" alt-text="Screenshot of the Rules pane for an eventstream." lightbox="media/add-destination-activator-enhanced/event-stream-live-view.png" border="true":::

1. In the **Add rule** pane, enter the following details and select **Save**.

    - **Rule name**: Enter a name for the rule.
    
    - **Condition**: Define a condition to trigger the rule. For example, set the condition to `airport_fee* > 0` to trigger the rule when the airport fee is greater than 0. The condition must be based on the keys in the JSON dictionary of the event. In this example, *airport_fee* is a key in the JSON dictionary of the event.
    
    - **Action**: Select an action to perform when the condition is met. For example, choose to send an email notification or trigger a Logic App.

       :::image type="content" source="media/add-destination-activator-enhanced/add-rule.png" alt-text="Screenshot of the Add rule pane for an activator destination." lightbox="media/add-destination-activator-enhanced/add-rule.png" border="true":::

    For more information on how to create rules in an activator instance, see [Create rules in an activator instance](../data-activator/activator-create-activators.md).

1. You see the rule you created in the **Rules** pane. 

   :::image type="content" source="media/add-destination-activator-enhanced/rule-list.png" alt-text="Screenshot of the Rules pane with a rule created." lightbox="media/add-destination-activator-enhanced/rule-list.png" border="true":::

1. You can activate or deactivate the rule by **toggling** the switch next to the rule name. When the rule is active, it evaluates incoming events against the defined condition and performs the specified action when the condition is met.

1. If you select ellipsis (`...`) next to the rule, you see options to perform the following actions:

    - **Edit**: Edit the rule within the Eventstream editor to change the condition or action.
    
    - **Delete**: Delete the rule if you no longer need it.
    
    - **Open in Activator**: Open the activator instance in the Activator user interface (UI) to view more details or manage the activator instance.

       :::image type="content" source="media/add-destination-activator-enhanced/rule-actions.png" alt-text="Screenshot of the options to edit or delete a rule in the Rules pane." lightbox="media/add-destination-activator-enhanced/rule-actions.png" border="true":::

1. To add more rules to the Activator destination, select **Add rule** at the bottom of the *Rules** pane. 

1. Select **X** at the top right corner of the **Rules** pane to close it when you're done.
 
## Related content

To learn how to add other destinations to an eventstream, see the following articles:  

- [Route events to destinations](add-manage-eventstream-destinations.md)
- [Custom app destination](add-destination-custom-app.md)
- [Derived stream destination](add-destination-derived-stream.md)
- [Eventhouse destination](add-destination-kql-database.md)
- [Lakehouse destination](add-destination-lakehouse.md)
- [Create an eventstream](create-manage-an-eventstream.md)


