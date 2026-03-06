---
title: Add an alert rule to an eventstream
description: Learn how to add an alert rule to an eventstream in Real-Time Intelligence. Follow step-by-step instructions to set up conditions and actions for effective monitoring.
ms.topic: include
ms.date: 03/06/2026
---


## Add an alert rule

1. In the **Add rule** pane, for **Rule name**, enter a name for the alert rule.

   :::image type="content" source="../media/set-alerts-event-stream/rule-name-input-field.png" alt-text="Screenshot of the Rule name field in the Add rule pane." lightbox="../media/set-alerts-event-stream/rule-name-input-field.png" border="true":::

1. In the **Condition** section on the **Add rule** pane, for **Check**, select one of these values:

    - **on each event**: The action triggers for every event that flows through the eventstream.
    
       :::image type="content" source="../media/set-alerts-event-stream/condition-each-event.png" alt-text="Screenshot of the Condition section of the Add rule pane with each event option selected." lightbox="../media/set-alerts-event-stream/condition-each-event.png" border="true":::        

    - **On each event when**: The action triggers only for the events that satisfy a specific condition. You define the condition using a field in the eventstream, an operation to perform, and the value to compare against. For example, you can set the condition to check if the value of the *No_Empty_Docs* field in the event data is `0`.
    
       :::image type="content" source="../media/set-alerts-event-stream/event-condition.png" alt-text="Screenshot of the Condition section of the Add rule pane with a condition specified." lightbox="../media/set-alerts-event-stream/event-condition.png" border="true":::    

    - **On each event grouped by**: The action triggers for groups of events that satisfy a specific condition. You define the condition using a field in the eventstream, an operation to perform, and the value to compare against. For example, you can set the condition to check if the value of the *No_Empty_Docs* field in the event data is `0` for a group of events grouped by the *Neighborhood* field.

      :::image type="content" source="../media/set-alerts-event-stream/group-condition-each-event.png" alt-text="Screenshot of the Condition section with the event grouped option selected." lightbox="../media/set-alerts-event-stream/group-condition-each-event.png" border="true":::

1. In the **Action** section of the rule, select an action to perform when the condition is met, and configure other fields for the action. 

   :::image type="content" source="../media/set-alerts-event-stream/alert-actions.png" alt-text="Screenshot of the Action section of the Add rule pane." lightbox="../media/set-alerts-event-stream/alert-actions.png" border="true":::

    For more information about actions, see [Action section in the Add rule pane](../../../real-time-hub/set-alerts-azure-blob-storage-events.md#action-section).

    Here's an example of the action configuration:

   :::image type="content" source="../media/set-alerts-event-stream/action-section.png" alt-text="Screenshot of the Action section of the Add rule pane with information filled." lightbox="../media/set-alerts-event-stream/action-section.png" border="true":::    

1. In the **Save location** section, follow these steps:

    1. For **Workspace**, select the workspace where you want to save the alert.
    
    1. For **Item**, select an existing Activator item or select **Create a new item**. 
    
    1. If you selected **Create a new item**, enter the name of the new Activator item in the **New item name** field.
    
         :::image type="content" source="../media/set-alerts-event-stream/save-location.png" alt-text="Screenshot of the Save location section of the Add rule pane." lightbox="../media/set-alerts-event-stream/save-location.png" border="true":::

1. On the **Add rule** pane, select **Create** to create a rule in the new activator or an existing activator.

      :::image type="content" source="../media/set-alerts-event-stream/create-button.png" alt-text="Screenshot of the Add rule pane with Create button highlighted." lightbox="../media/set-alerts-event-stream/create-button.png" border="true":::    
 
1. On the **Alert created** pane, you see the details of the alert you created. Select **Done** to close the pane. Alternatively, you can select **Open** to view the Activator item in the Fabric Activator user interface (UI).

   :::image type="content" source="../media/set-alerts-event-stream/alert-created.png" alt-text="Screenshot of the Alert created pane." lightbox="../media/set-alerts-event-stream/alert-created.png" border="true":::