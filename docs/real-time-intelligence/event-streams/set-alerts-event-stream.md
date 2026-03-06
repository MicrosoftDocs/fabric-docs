---
title: Set Alerts on Eventstream With Activator Destination
description: Learn how to set up alerts on an eventstream with an Activator destination. Follow step-by-step instructions to monitor conditions and trigger actions effectively.
#customer intent: As a data engineer, I want to set up alerts on an eventstream using an Activator destination so that I can monitor specific conditions and trigger actions automatically.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 03/06/2026
ms.search.form: Source and Destination
---

# Set alert on an eventstream with Activator destination

This article shows you how to set up alerts on an eventstream. When you set an alert on an eventstream, an Activator destination is automatically added to the eventstream. 

## Set alert on an eventstream

1. If the eventstream is in **Edit** mode, select **Publish** on the ribbon to publish the eventstream.

   :::image type="content" source="./media/set-alerts-event-stream/publish-event-stream.png" alt-text="Screenshot of the Publish button on the ribbon." lightbox="./media/set-alerts-event-stream/publish-event-stream.png" border="true":::

1. Confirm that the eventstream is in **Live** mode. 

   :::image type="content" source="./media/set-alerts-event-stream/event-stream-live-view.png" alt-text="Screenshot of the Go live button on the ribbon." lightbox="./media/set-alerts-event-stream/event-stream-live-view.png" border="true":::

1. Select **Set alert** on the ribbon.

   :::image type="content" source="./media/set-alerts-event-stream/set-alert-ribbon.png" alt-text="Screenshot of the Set alert button on the ribbon." lightbox="./media/set-alerts-event-stream/set-alert-ribbon.png" border="true":::

1. In the **Add rule** pane, for **Rule name**, enter a name for the alert rule.

   :::image type="content" source="./media/set-alerts-event-stream/rule-name-input-field.png" alt-text="Screenshot of the Rule name field in the Add rule pane." lightbox="./media/set-alerts-event-stream/rule-name-input-field.png" border="true":::

1. In the **Condition** section on the **Add rule** pane, for **Check**, select one of these values:

    - **on each event**: The action triggers for every event that flows through the eventstream.
    
       :::image type="content" source="./media/set-alerts-event-stream/condition-each-event.png" alt-text="Screenshot of the Condition section of the Add rule pane with each event option selected." lightbox="./media/set-alerts-event-stream/condition-each-event.png" border="true":::        

    - **On each event when**: The action triggers only for the events that satisfy a specific condition. You define the condition using a field in the eventstream, an operation to perform, and the value to compare against. For example, you can set the condition to check if the value of the *No_Empty_Docs* field in the event data is `0`.
    
       :::image type="content" source="./media/set-alerts-event-stream/event-condition.png" alt-text="Screenshot of the Condition section of the Add rule pane with a condition specified." lightbox="./media/set-alerts-event-stream/event-condition.png" border="true":::    

    - **On each event grouped by**: The action triggers for groups of events that satisfy a specific condition. You define the condition using a field in the eventstream, an operation to perform, and the value to compare against. For example, you can set the condition to check if the value of the *No_Empty_Docs* field in the event data is `0` for a group of events grouped by the *Neighborhood* field.

      :::image type="content" source="./media/set-alerts-event-stream/group-condition-each-event.png" alt-text="Screenshot of the Condition section with the event grouped option selected." lightbox="./media/set-alerts-event-stream/group-condition-each-event.png" border="true":::

1. In the **Action** section of the rule, select an action to perform when the condition is met, and configure other fields for the action. 

   :::image type="content" source="./media/set-alerts-event-stream/alert-actions.png" alt-text="Screenshot of the Action section of the Add rule pane." lightbox="./media/set-alerts-event-stream/alert-actions.png" border="true":::

    For more information about actions, see [Action section in the Add rule pane](../../real-time-hub/set-alerts-azure-blob-storage-events.md#action-section).

    Here's an example of the action configuration:

   :::image type="content" source="./media/set-alerts-event-stream/action-section.png" alt-text="Screenshot of the Action section of the Add rule pane with information filled." lightbox="./media/set-alerts-event-stream/action-section.png" border="true":::    

1. In the **Save location** section, follow these steps:

    1. For **Workspace**, select the workspace where you want to save the alert.
    
    1. For **Item**, select an existing Activator item or select **Create a new item**. 
    
    1. If you selected **Create a new item**, enter the name of the new Activator item in the **New item name** field.
    
         :::image type="content" source="./media/set-alerts-event-stream/save-location.png" alt-text="Screenshot of the Save location section of the Add rule pane." lightbox="./media/set-alerts-event-stream/save-location.png" border="true":::

1. On the **Add rule** pane, select **Create** to create a rule in the new activator or an existing activator.

      :::image type="content" source="./media/set-alerts-event-stream/create-button.png" alt-text="Screenshot of the Add rule pane with Create button highlighted." lightbox="./media/set-alerts-event-stream/create-button.png" border="true":::    
 
1. On the **Alert created** pane, you see the details of the alert you created. Select **Done** to close the pane. Alternatively, you can select **Open** to view the Activator item in the Fabric Activator user interface (UI).

   :::image type="content" source="media/set-alerts-event-stream/alert-created.png" alt-text="Screenshot of the Alert created pane." lightbox="media/set-alerts-event-stream/alert-created.png" border="true":::

1. Now, you should see the Activator destination added to the eventstream with the alert rule you created.

   :::image type="content" source="./media/set-alerts-event-stream/activator-destination.png" alt-text="Screenshot of the eventstream with an Activator destination added." lightbox="./media/set-alerts-event-stream/activator-destination.png" border="true":::

    Here's an example of an alert you receive when the condition of the rule is met:

    :::image type="content" source="./media/set-alerts-event-stream/alert-teams-message.png" alt-text="Screenshot of the alert message received in Teams." lightbox="./media/set-alerts-event-stream/alert-teams-message.png" border="true":::

## Manage rules

Select the **alert** icon on the Activator destination in the eventstream. You see the **Rules** pane where you perform the following actions:

- View all the rules in the Activator item.
- Stop or start a rule.
- Edit a rule.
- Delete a rule.
- Open rule in the Fabric Activator UI.
- Add more rules.

### Stop or start an alert rule

Select the **alert** icon on the Activator destination in the eventstream.

:::image type="content" source="./media/set-alerts-event-stream/stop-alert-rule-toggle.png" alt-text="Screenshot of the alert icon on the Activator destination and rule status toggle." lightbox="./media/set-alerts-event-stream/stop-alert-rule-toggle.png" border="true":::

You can use the same toggle to start the alert rule again after you stop it.

### Edit or delete a rule

In the **Rules** pane, select the **ellipsis (...)** on the Activator destination in the eventstream.

:::image type="content" source="./media/set-alerts-event-stream/edit-delete-rule.png" alt-text="Screenshot of the context menu for a rule in the Rules pane." lightbox="./media/set-alerts-event-stream/edit-delete-rule.png" border="true":::

### Open the rule in the Fabric Activator UI

In the **Rules** pane, select the **ellipsis (...)** on the Activator destination in the eventstream.

:::image type="content" source="./media/set-alerts-event-stream/open-activator.png" alt-text="Screenshot of the context menu for a rule in the Rules pane with Open in Activator highlighted." lightbox="./media/set-alerts-event-stream/open-activator.png" border="true":::

### Add another alert rule 

To add more rules to the Activator item, select **Add rule** at the bottom of the **Rules** pane. 


:::image type="content" source="./media/set-alerts-event-stream/rules-pane-add-rule-button.png" alt-text="Screenshot of the context menu for a rule in the Rules pane with Add rule highlighted." lightbox="./media/set-alerts-event-stream/rules-pane-add-rule-button.png" border="true":::


## Related content

See the following articles:  

- [Add Activator destination to an eventstream](add-destination-activator.md)

