---
title: Detection conditions in Data Activator
description: Understand how detection conditions in triggers and properties operate in Data Activator.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom: 
ms.date: 10/03/2023
---

# Detection conditions in Data Activator

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article describes the range of detection conditions available to you when you create a trigger.


## Summaries over time

Summaries are available in **select** cards in properties and triggers, using the “Add” button. 

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-01.png" alt-text="Screenshot of adding data activator summary.":::


When you create a summary, you specify a **time window** which can be between 1 minute and 24 hours long. A summary takes all of the values of the property/column during each time window and converts them into a single summary value for the time window.


|Summary type  |Description  |
|---------|---------|
|Average over time      |Computes the average value of the property/column over the time window|
|Count     |Computes the number of events containing the property/column over the time window|
|Minimum/Maximum over time     |Computes the minimum/maximum value of the property/column during the time window|


## Filters

Filters are available in **select** cards using the **Add** button, and in **detect** cards using the **Filter** button. In a filter, you specify a comparison condition on a property. The filter retains only those events that meet the comparison condition. All other events are removed from consideration for the trigger.

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-02.png" alt-text="Screenshot of using a data activator filter.":::

You can use filters on any type of property, but typically you'll use filters with text values, so that you can create a condition on a subset of your data. For example, you might set a filter of “City=’Redmond’” on some package-tracking events, to set a condition on only events on packages in Redmond.

You can specify multiple filters on a card.

## Conditions

You specify a condition in the **detect** card.

#### Condition types

The condition type specifies what type of condition should cause the trigger to activate:

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-03.png" alt-text="Screenshot of using data activator condition types.":::

Condition types fall into the following categories:

<table>
<tbody>
<tr class="odd">
<td>Condition type</td>
<td>Description</td>
</tr>
<tr class="even">
<td><strong>“Is” </strong>conditions</td>
<td>“Is” conditions activate for each event for which the condition is true.</td>
</tr>
<tr class="odd">
<td><strong>“Becomes” </strong>conditions</td>
<td>“Becomes” conditions activate only when the condition becomes true, after having previously been false. For example, “Becomes greater than 10” will activate if the value of the property changes from a value of 5 (less than 10) to a value of 11 (greater than 10). It will only activate again when the condition goes from being false to true.</td>
</tr>
<tr class="even">
<td><strong>Enters/Exits Range </strong>conditions</td>
<td><p>The Enters range condition specifies a range of values, and activates at the point when a property value enters the range. It only activates when the previous value of the property was outside of the range, and the current value is within the range.</p>
<p>The exits range condition is similar, except that it activates when the property value goes outside of the range.</p></td>
</tr>
<tr class="odd">
<td><strong>Changes, Changes to, Changes from</strong></td>
<td>These conditions activate when </td>
</tr>
</tbody>
</table>

#### Condition Timers

After you specify a condition type, you can specify a condition timer.

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-04.png" alt-text="Screenshot of using data activator condition timers.":::


The condition timer indicates how long, or how many times, the condition must be true before the trigger fires.

|                 |                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| Timer           | Description                                                                                                     |
| Each time       | Activate the trigger each time the condition is true                                                            |
| Number of times | Count how many times the condition is true, and activate the trigger only when it has been true this many times |
| Stays           | Activate the trigger if the condition is continuously true for this amount of time                              |

# Use Custom Actions to trigger Power Automate Flows

Using Power Automate, you can generate actions in external systems when your Data Activator triggers activate. This can be useful for:

1. Sending notifications via systems other than Teams and Email
2. Creating action items in ticketing systems
3. Calling line-of-business apps

To trigger Power Automate flows from your triggers, you first create a *custom action*. Then, you call your custom action from your triggers. 

## Create a Custom Action

A custom action is a reusable action template that you can use in multiple triggers, in multiple Reflex items. Creating a custom action requires familiarity with Power Automate. However, once you have created a custom action, other Data Activator users can use the action in any trigger, without requiring any knowledge of Power Automate. 

A custom action defines how to call a specific external system from a Data Activator trigger using a flow. It defines a set of* input fields* to pass from your triggers to the flow, so that the flow can call the external system. For example, suppose you wanted to define a custom action that sends an SMS message. The input fields for such an action might be “Phone number” and “Message”. This custom action would link to a flow that uses an SMS connector to send the message to the recipient.

### Name your action and add input fields

To create a custom action, select “new custom action” from the ribbon in the design pane. Then, give your action a name such as “Send SMS message” and define the input fields (such as “Phone number” and “Message”). 

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-05.png" alt-text="Screenshot of creating a data activator new custom action.":::


The next step is to define your flow in Power Automate. Select the “copy connection string” button, then select *Create Flow in Power Automate*. This creates a flow in Power Automate, and takes you to it so that you can define your flow.

### Define your flow

The flow is pre-populated with an action for data activator. 

> [!IMPORTANT]
> You must paste the connection string from the previous step into this action, as shown in the screenshot below. Once you have done so, add further steps to your flow as needed, and save the flow.

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-06.png" alt-text="Screenshot of defining a flow for data activator.":::


To access your input fields in the flow, use a Power Automate expression of the form shown below. Use the “Expression” tab in the field editor to add your expression. Replace NAME\_OF\_INPUT\_FIELD with the name of
your input field. 

triggerBody()?\['customProperties/NAME\_OF\_INPUT\_FIELD'\].

> [!NOTE]
> A future release of Data Activator will support dynamic properties, so that you don't have to use expressions to access your input fields.

### Complete your custom action

After you save your flow, return to Data Activator. Upon successful saving of the flow, you'll see a confirmation box in Data Activator as follows. At this point, your custom action is complete, and you may move on to the next step, [calling your custom action from a trigger](#call-your-custom-action-from-a-trigger). If you need to rename your action, or edit the list of input fields, you can still do so at this point. Select “Done” when you're ready.


:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-07.png" alt-text="Screenshot of custom action completion for data activator.":::


## Call your Custom Action from a Trigger

Once you have created a custom action, it will be available for use by all Data Activator users, in all triggers and reflexes. To call your custom action, from a trigger, click the “Custom Action” tile in the trigger’s “Act” card, and select your custom action from the list:

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-08.png" alt-text="Screenshot of calling a custom action for data activator.":::


You'll then get a card for your custom action, containing the input fields for your custom action. Fill them out as appropriate for your trigger definition:

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-09.png" alt-text="Screenshot of custom action input for data activator.":::

When your trigger activates, it will call your flow, sending it the values of the input fields that you defined.

## Next steps

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Get data for Data Activator](data-activator-get-data.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
