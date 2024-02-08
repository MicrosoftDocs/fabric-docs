---
title: Data Activator tutorial using sample data
description: Learn how Data Activator works using sample data.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom: 
ms.date: 11/16/2023
---

# Data Activator tutorial using sample data

> [!IMPORTANT]
> Data Activator is currently in preview.

This step-by-step tutorial uses the sample *Packages* data that comes with reflex. By the end of this tutorial, you'll have accomplished the following:

1. Explored the main features of data activator.
2. Created an object.
3. Created and started a trigger.

## Prerequisites

Before you begin, you need a workspace with a Fabric capacity. You can learn about Fabric workspaces in the [Workspaces](../get-started/workspaces.md) article.  

## Step-by-step guide

The following steps walk you through the tutorial and work with sample data for Data Activator.

### Step 1: Create a sample reflex

From the Fabric homepage, select a workspace with a Fabric capacity. Select the Data Activator experience then select *Reflex sample* to create a reflex that is prepopulated with sample events and objects.

:::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-01.png" alt-text="Selecting reflex sample for data activator tutorial data.":::


### Step 2: Explore the package events in data mode

In the following step, we explore data mode. 

1. In the newly created reflex, select on the *data* tab, then select the *Package in Transit* events stream. These events show the real-time status of packages that are in the process of being delivered by a logistics company. Look at the incoming events and note the columns on the events. The *PackageId* column uniquely identifies the Packages; this is the ID column that we use to assign the Package events to Package objects.
2. Select on the other two event streams. These come from different sources in the logistics company, but they're also about packages. They also have a *Package ID* column.

### Step 3: Explore the Package object in design mode

Now we explore design mode. 

1. Select the *Design* tab at the bottom of the screen to enter design mode.

2. In the left navigation pane, look at the *Events* section of the Package object. All three event streams from data mode are linked to the package object. This enables you to create triggers about packages that use data from any of the three event streams.

3. Select the trigger called *Medicine too warm*. Observe how it works:
    
    1. It selects the *Temperature* column from the *Package in Transit* events
    2. It detects the Temperature becoming greater than 50, but only if the *Special Care* column equals *Medicine*
    3. It sends an email if the condition is true

4. Look at the other triggers to learn how they work.

### Step 4: Start the *medicine package too warm* trigger

Now that you have familiarized yourself with the packages events and objects, you're ready to start a trigger.

1. Select the *medicine too warm* trigger
2. Review the *Act* step, which sends an email. Make sure that the email address on the trigger is your email address. Alter the subject and message fields to your liking.
3. Select *Send me a test alert*. You'll receive a test email (it might take a minute or two to arrive). Make sure it looks the way you expect.
4. In the ribbon, select **Start**. This causes the trigger to email you whenever a medicine package is too warm. The trigger should fire several times every hour. (You might have to wait 10 minutes or so for it to fire.)
5. Later, you can turn off the trigger using the **Stop** button.

### Step 5: Create a City object

Now it's time to create an object of your own. In this section, you'll create a *City* object that tracks the status of package deliveries at the level of Cities, rather than individual packages.

1. Return to data mode.
2. Select the *Package In Transit* stream.
3. Select *Assign your data* in the ribbon.
4. Name your new object *City* and choose *City* as the ID column.
5. Select **continue**.

### Step 6: Create a trigger on the City object

Now you'll create a trigger that alerts you if the average time in transit, for any city, exceeds a target.

1. Go to design mode and select your new *City* object. Select *New trigger* then name it *Average transit time above target*. After this step, your City object will look like this:

    :::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-02.png" alt-text="Average transit time trigger for data activator tutorial.":::

2. In your trigger’s *select* card, select *HoursInTransit.* Then select *Add* to set an *Average over time* aggregation of 1 hour. After this step, your trigger will look like this:

    :::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-03.png" alt-text="Average transit time chart for data activator tutorial.":::

3. In the *detect* card, detect whether the average transit time for a given City is greater than 5 hours. Set the trigger to alert you once per hour per city. After you complete this step, your Detect card will look like this:

    :::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-04.png" alt-text="Average transit time trigger detection chart for data activator tutorial.":::

4. Specify an action for your trigger. You can choose Email or Teams. Customize your action according to how you would like it to appear:

    :::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-05.png" alt-text="Action trigger window for data activator tutorial.":::

5. Test your trigger by selecting the **Send me a test alert** button. Make sure you get an alert (it might take a minute or two to arrive.)

6. Start your trigger by selecting the **Start** button.

### Congratulations on completing the tutorial

Congratulations on creating your first object and trigger. As next steps, you might want to try setting up some other triggers on either the *City* or *Package* objects. When you're ready to try using Data Activator on real data, follow the steps in the [Get data for Data Activator](data-activator-get-data-eventstreams.md) article.

Once you’ve finished with the triggers you created as part of the tutorial, be sure to stop them so you don’t incur any charges for background processing of the trigger. Select each trigger in turn, and press the Stop button from the ribbon.

:::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-06.png" alt-text="Screenshot that shows the trigger stop button for data activator tutorial.":::

## Related content

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md)
* [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Detection conditions in Data Activator](data-activator-detection-conditions.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
