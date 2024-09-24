---
title: Data Activator tutorial using sample data
description: Learn how Data Activator works using sample data. Data Activator is a powerful tool for working with data and creating triggers based on specific conditions.
author: mihart
ms.author: mihart
ms.topic: how-to
ms.custom: FY25Q1-Linter
ms.date: 09/20/2024
#customer intent: As a Fabric user I want to learn more about Data Activator using a tutorial and sample data.
---

# Data Activator tutorial using sample data

This step-by-step tutorial uses the sample *Packages* data that comes with Data Activator. In this tutorial, you learn how to do these tasks:

- Explore the main features of Data Activator.
- Create an object.
- Create and start a rule.

> [!IMPORTANT]
> Data Activator is currently in preview.

## Prerequisites

* Before you begin, you need a workspace with a Fabric capacity. You can learn about Fabric workspaces in the [Workspaces](../get-started/workspaces.md) article.

## Step 1: Create a sample Data Activator reflex

From the Fabric homepage, select a workspace with a Fabric capacity and create a new Data Activator reflex. Select the sample to create a reflex that is prepopulated with sample events and objects.

:::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-image.png" alt-text="Screenshot showing Data Activator selected as well as the Reflex sample preview.":::

## Step 2: Explore the package delivery events

In this step, we explore the event stream data this sample is built on.

- In the newly created reflex, select the *Package delivery events* stream. These events show the real-time status of packages that are in the process of being delivered by a logistics company. Look at the incoming events and note the columns on the events. The *Package ID* column uniquely identifies the packages. This column is the unique ID column that we use to assign the Package events to Package objects.

## Step 3: Explore the Package object

1. In the Explorer pane to the left, look at the event stream called *Delivery events*. **Delivery events** is now added to the Package object. With this data, you can create rules about packages that use data from the event stream.

1. Select the rule called *Too hot for medicine*. Observe how it works:

   1. It monitors the *Temperature* column from *Delivery events*.

   1. It detects the temperature becoming greater than 10, but only if the *Special Care* column equals *Medicine*.

   1. It sends a Teams message if the condition is true.

1. Look at the other rules to learn how they work.

## Step 4: Start the *Too hot for medicine* rule

Now that you are familiar with the package events and objects, you're ready to start a rule.

1. Select *too hot for medicine*.

1. Review the *Action* step, which sends a Teams message. Make sure that the recipient is yourself.

1. Select **Edit action** to view a preview of the message you're sending. Alter the headline and message fields to your liking.

1. Select **Test action**. You receive a test Teams message. Make sure it looks the way you expect and matches the preview.

1. Select **Save and start**. This causes the rule to message you whenever a medicine package is too hot. The rule should trigger several times every hour.

1. Later, you can turn off the rule using the **Stop** button.

## Step 5: Recreate a package object

Now it's time to create an object of your own. In this section, delete the *Package* object. Then,  recreate it to track the status of packages in Redmond where the hours in delivery becomes greater than the average.

1. Select the *Package delivery events* stream.
1. Select *New object* in the ribbon.

1. Name your new object *Package* and choose *Package ID* as the unique ID.

1. Add *Hours in delivery* and *Current city* as properties of the object.

1. Select **Create**.

## Step 6: Create a rule on the Package object

Create a rule that alerts you if the average time in delivery exceeds a threshold.

1. Select your new *Hours in delivery* property. Select *New rule* then name it *Average transit time above target*. Your *Package* object looks like this.

    :::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-02.png" alt-text="Average transit time trigger for data activator tutorial.":::

1. In your rule's monitor card, select *Hours in delivery.* Then select *Summarize data* to set an aggregation window size of 1 hour and a step size of 1 hour. The Monitor chart updates to reflect the summarization, and your rule looks like this.

    :::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-03.png" alt-text="Average transit time chart for data activator tutorial.":::

1. In the *condition* step, detect when the average transit time becomes greater than 1. Set the rule to alert you every time the condition is met. After you complete this step, the Condition chart updates, and the rule looks like this.

    :::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-04.png" alt-text="Average transit time trigger detection chart for data activator tutorial.":::

1. Specify an action for your rule. You can choose to send a Teams message or Email. Customize your action according to how you would like it to appear.

    :::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-05.png" alt-text="Action trigger window for data activator tutorial.":::

1. Test your rule by selecting the **Test** button. Make sure you get an alert. If using email, it might take a minute or two to arrive.

1. Start your rule by selecting **Save and start**.

## Congratulations on completing the tutorial

You created your first object and rule. As next steps, you might try setting up some other rules on the *Package* object. When you're ready to try using Data Activator on your own data, follow the steps in the [Get data for Data Activator](data-activator-get-data-eventstreams.md) article.

Once you finish with the rules you created as part of the tutorial, be sure to stop them so you don’t incur any charges for background processing of the rules. Select each rule in turn and select the **Stop** button from the ribbon.

:::image type="content" source="media/data-activator-tutorial/data-activator-tutorial-06.png" alt-text="Screenshot that shows the trigger stop button for data activator tutorial.":::

## Related content
* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)

You can also learn more about Microsoft Fabric:
* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
