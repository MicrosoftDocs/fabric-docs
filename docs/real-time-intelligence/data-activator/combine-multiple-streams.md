---
title: Combine Multiple eventstreams in Activator Rule
description: Learn how to combine multiple eventstreams in Activator rules to monitor machine health and automate actions based on abnormal conditions.
#customer intent: As a data engineer, I want to combine multiple eventstreams in Activator so that I can monitor machine health effectively.
ms.reviewer: janettseng
ms.subservice: rti-activator
ms.date: 12/15/2025
ms.topic: how-to
---

# How to combine multiple streams in an Activator rule

This article shows you how to:

- Monitor data from multiple eventstreams and automate actions by defining an Activator rule
- Set up multiple advanced conditions, such as average, maximum, or minimum value of a data property, by using Activator modeling capabilities.

## Scenario

In this example, you can track the health of your water pumps (machines) by monitoring the *FlowRate* and *Vibration* of the machine. The goal is to automatically take action, such as sending an alert or starting a business process, if Vibration is abnormal while the machine is running and moving significant amount of water (FlowRate). High water pump vibration might signal underlying issues, however it's expected as long as FlowRate is insignificant.

Machines monitoring data flows into two eventstreams:

-  **MachineHeartbeat** eventstream contains *MachineId* column identifying a machine and *MachineRunning* column that indicates if machine is running (1) or not (0). An event is emitted every time a machine state changes.
-  **MachineSensorsReadings** eventstream contains a *MachineId* column together with *FlowRate* and *Vibration* columns. Every machine emits sensors readings every few seconds.

In this scenario, you want to raise an alert when **all** these conditions are true:

- Maximum *Vibration* in the last 1 hour increases above 18.
- Average *FlowRate* in the last 10 minutes is above 185.
- Machine is running.

Activator rules support complex conditions based on multiple eventstreams. You can create computed properties based on event columns and combine them in the rule condition.

In this scenario, you bring two eventstreams together by creating an *object* that feeds from both streams. When you add an eventstream to the object, you specify which column in the events uniquely identifies the instance of an object.

Then, you create a property that computes average(*FlowRate*), another one for max(*Vibration*), and combine them with *IsRunning* property. When evaluating the rule, Activator computes property values according to their definitions and maintains the last computed value of every property. These values are used when evaluating the condition.

In Activator rules, you must set **one** Condition, such as *max(Vibration) \> 18*, and add optional filters, such as *avg(FlowRate) \> 185 AND MachineRunning*. The rule fires when the Condition is met, provided the filters are also true.

The condition drives the rule as illustrated in the following picture:

:::image type="content" source="media/combine-multiple-streams/activator-rule-condition.png" alt-text="Screenshot of a diagram showing how the condition drives the rule in Activator with filters and actions." lightbox="media/combine-multiple-streams/activator-rule-condition.png":::

## Solution

1. Add **Activator** destination to both eventstreams. Make sure both eventstreams use the same Activator instance.

    :::image type="content" source="media/combine-multiple-streams/event-stream-destination.png" alt-text="Screenshot of the MachineHeartbeat eventstream with the Activator destination added." lightbox="media/combine-multiple-streams/event-stream-destination.png":::

    :::image type="content" source="media/combine-multiple-streams/activator-event-stream.png" alt-text="Screenshot of the MachineSensorsReadings eventstream with the Activator destination added." lightbox="media/combine-multiple-streams/activator-event-stream.png":::

    Both eventstreams are configured with the same Activator destination:

    :::image type="content" source="media/combine-multiple-streams/activator-destination.png" alt-text="Screenshot of both eventstreams configured with the same Activator destination." lightbox="media/combine-multiple-streams/activator-destination.png":::

1.  Open Activator item. Now you can combine both eventstreams in an object and set up a rule.

    :::image type="content" source="media/combine-multiple-streams/activator-event-streams-combine.png" alt-text="Screenshot of the Activator item showing the two eventstreams available to combine." lightbox="media/combine-multiple-streams/activator-event-streams-combine.png":::

1.  To combine these two streams, select any stream and select **New object**.

    :::image type="content" source="media/combine-multiple-streams/select-event-stream-new-object.png" alt-text="Screenshot of selecting an eventstream and clicking the New object button." lightbox="media/combine-multiple-streams/select-event-stream-new-object.png":::

1.  Select the column name used to identify the instance of an object and columns that are needed for the rule, and then select **Create**. The value of *MachineId* column in each event is the key identifying the machine that emitted the event.

    :::image type="content" source="media/combine-multiple-streams/build-object-machine-id-assign.png" alt-text="Screenshot of the Build object pane with MachineId selected as the unique identifier and relevant columns selected." lightbox="media/combine-multiple-streams/build-object-machine-id-assign.png":::

1.  Select another eventstream, select **New object**, and then select **Add to existing object** in the **Build object** pane. Choose *MachineId* column as unique identifier. Select **Assign**. Now the two streams are combined in one object.

    :::image type="content" source="media/combine-multiple-streams/build-object-computed-property.png" alt-text="Screenshot of the Build object pane with Add to existing object option selected and MachineId as the unique identifier." lightbox="media/combine-multiple-streams/build-object-computed-property.png":::

1.  Now you can define the computed property. Create an attribute for computing average of *FlowRate* in the last 10 min. Select *FlowRate* attribute and select **Edit details**.

    :::image type="content" source="media/combine-multiple-streams/flow-rate-edit-details.png" alt-text="Screenshot of selecting the FlowRate attribute and clicking Edit details." lightbox="media/combine-multiple-streams/flow-rate-edit-details.png":::

1.  On the **Definition** pane, select **Add summarization**, choose **Average**, and set 10 minutes as window size. Select **Save**.

    :::image type="content" source="media/combine-multiple-streams/definition-pane-summarization-average.png" alt-text="Screenshot of the Definition pane with Add summarization option and Average selected." lightbox="media/combine-multiple-streams/definition-pane-summarization-average.png":::

    :::image type="content" source="media/combine-multiple-streams/vibration-attribute-max-summarization.png" alt-text="Screenshot of the Average summarization configured with a 10-minute window size." lightbox="media/combine-multiple-streams/vibration-attribute-max-summarization.png":::

1.  Select *Vibration* attribute and select **Edit details**. On the **Definition** pane, select **Add summarization**, choose **Maximum**, and set 1 hour as window size. Select **Save**.

    :::image type="content" source="media/combine-multiple-streams/vibration-maximum-summarization.png" alt-text="Screenshot of the Vibration attribute with Maximum summarization configured for a one hour window." lightbox="media/combine-multiple-streams/vibration-maximum-summarization.png":::

1.  Now create the rule. Select **Vibration** property and select **New Rule**.

    :::image type="content" source="media/combine-multiple-streams/vibration-new-rule-setup.png" alt-text="Screenshot of selecting the Vibration property and clicking the New Rule button." lightbox="media/combine-multiple-streams/vibration-new-rule-setup.png":::

1. In the **Definition** pane, set up **Increases above** condition with 18 as threshold.

    :::image type="content" source="media/combine-multiple-streams/definition-pane-increases-above-18.png" alt-text="Screenshot of the Definition pane with the Increases above condition set to threshold value of 18." lightbox="media/combine-multiple-streams/definition-pane-increases-above-18.png":::

1. Add a filter for *FlowRate* property and one for *MachineRunning* property.

    :::image type="content" source="media/combine-multiple-streams/rule-filters-flow-rate-machine-running.png" alt-text="Screenshot of the rule with filters added for FlowRate and MachineRunning properties." lightbox="media/combine-multiple-streams/rule-filters-flow-rate-machine-running.png":::

1. Select an action of your choice like sending email or Teams messages, running business process like pipeline, notebook, or functions, or running no-code custom action with Power Automate. Select **Save and start**.

    :::image type="content" source="media/combine-multiple-streams/action-selection-page-options.png" alt-text="Screenshot of the action selection page with options to send notifications or run business processes." lightbox="media/combine-multiple-streams/action-selection-page-options.png":::

## Next step
To learn more about Activator rules, see [Create and manage Activator rules](activator-rules-overview.md).
