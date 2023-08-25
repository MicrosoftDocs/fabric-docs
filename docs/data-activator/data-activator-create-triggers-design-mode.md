---
title: Create Data Activator triggers in design mode
description: Learn how to create triggers in design mode for Data Activator.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom: 
ms.search.form: Data Activator Design Mode
ms.date: 09/15/2023
---

# Create Data Activator triggers in design mode

[!INCLUDE [preview-note](../includes/preview-note.md)]

Once you have [assigned data to objects](data-activator-assign-data-objects.md#assign-data-to-objects-in-data-activator), you can create triggers to act on your data. You do this in **Design Mode,** which you can access from the tab at the bottom of your screen. 

## Define a trigger condition and action

Triggers are where you specify the values you want to select from events, the conditions you want to detect, and the actions you want Data Activator to take. 

### Step 1: Make a new trigger

You use the ‘New trigger’ button in the ribbon to create a new trigger. You can give it a name by clicking the name of the trigger and editing it.

### Step 2: Select your data

The next step is to select the value for the trigger. You can either choose from a column from an event, or from a property you’ve already defined. See [create Properties](#create-properties) later in this article for information on properties.

Once you select a column or property, you see a preview of the values for a sample of the instances of the object.

### Step 3: Define the condition to detect

Next, you choose the type of condition that you want to detect. You can use conditions that check when a numeric value goes above/below a threshold (for example, Temperature is greater than 30), when a logical true/false value changes (for example, HasFault becomes True), or when a string value changes (for example, Status changes from InCompliance).

The Detect card then shows two charts:

The first shows, for the 5 sampled instances, when the condition was detected. In the screenshot above the instance labeled in yellow, RFX-9461367, crossed the threshold of 45 degrees four times. 

The second chart show the total number of times the trigger would have fired, for all instances that Data Activator is tracking. There are two spikes, around 5am and 7am, where the alert was fired four times. These might not be from the 5 instances sampled in the other charts.

### Step 4: Define the action to take

Finally, the act card lets you choose what to do when the condition is detected.

Different action types have different parameters, such as the email address you want to send to, the workflow you want to start, subject line or additional information etc.

## Test your trigger

After you have created a trigger, you can test it by selecting *Send me a test alert*. This finds a past event for which the trigger activation is true, then send you an alert so that you can see what the alert would have looked like for that event. Note that:

* The test alert will always go to you, regardless of the recipient field in the *Act* card
* The *Send me a test alert* option is only enabled if you have had at least one past event for which the trigger condition is true.

## Start and stop your trigger

Triggers are created in a 'Stopped' state. This means they're not being evaluated as data flows into the system, and won't take any actions as a result. You also need to select Start from the toolbar for Data Activator to start running the trigger and taking action. 

Once started, you'll see ‘Running’ appears in the title area of the property.

The toolbar changes to allow you to Stop the trigger. If you make changes to the trigger (for example changing the condition it looks for), you need to select Update in the toolbar to make sure that the running trigger uses the new values.

When you delete a trigger (or Object) it can take up to 5 minutes for any back-end processing of data to complete. This means your trigger may continue to monitor data, and take actions accordingly, for a few minutes after it has been deleted.

## Create Properties

Sometimes, you need to reuse trigger logic across multiple triggers. This is where properties come in. You can create a property that defines a reusable condition or measure, then reference that property from multiple triggers.

To create a property, select *New Property* from the ribbon, then define your property logic. Here, we define a property called *Maximum Temp last hour* on a package object:


Once you have defined a property, you can reference it from one or more triggers, via the select card. Here, we reference the property we made earlier in a *Package too warm* trigger:


## Next steps

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Get data for Data Activator](data-activator-get-data.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
