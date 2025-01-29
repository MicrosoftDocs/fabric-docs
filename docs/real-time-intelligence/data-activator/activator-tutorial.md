---
title: Activator tutorial using sample data
description: Learn how Activator works using sample data. Activator is a powerful tool for working with data and creating rules based on specific conditions.
author: mihart
ms.author: mihart
ms.topic: tutorial
ms.custom: FY25Q1-Linter
ms.date: 11/19/2024
ms.search.form: Data Activator Sample Tutorial
#customer intent: As a Fabric user I want to learn more about Activator using a tutorial and sample data.
---

# Tutorial: Create and activate an [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule

In this tutorial, you use sample data included with Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. You use the sample data to complete these tasks:  

> [!div class="checklist"]
> * Review a sample activator
> * Explore the data
> * Explore a rule
> * Start the rule
> * Create an object
> * Create a rule

## Prerequisites

Before you begin, you need a workspace with a Fabric capacity. You can learn about Fabric workspaces in the [Workspaces](../../fundamentals/workspaces.md) article. If you don't have Fabric, you're prompted to start a trial.

## Create a sample activator

Start by opening Fabric in your browser.

1. From the nav pane, select **Create** > **Activator**. If you don't see **Create**, select the ellipses(...) to display more options.

    :::image type="content" source="media/activator-tutorial/activator-create.png" alt-text="Screenshot showing the left navigation pane with Create selected.":::

1. Select **Try sample** to create an activator that is prepopulated with sample events and objects.

    :::image type="content" source="media/activator-tutorial/activator-sample.png" alt-text="Screenshot showing the option to add data or use the sample data.":::

## Explore the data

In this step, we explore the eventstream data this sample is built on.

The new activator has an **Explorer** section. Scroll down and select the **Package delivery events** stream.

:::image type="content" source="media/activator-tutorial/activator-eventstream.png" alt-text="Screenshot of Activator with the Package delivery events stream selected." lightbox="media/activator-tutorial/activator-eventstream.png":::

These events show the real-time status of packages that are in the process of being delivered.

Look at the incoming events and hover over the event data in the live table. Each data point contains information about the event. You might have to scroll to see it all. 

## Explore a rule

Use a rule to specify the event values you want to monitor, the conditions you want to detect, and the actions you want [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to take.

The Explorer pane displays objects, like eventstreams, for this activator. **Delivery events** is one of the objects created from the **Package delivery events** eventstream.

1. In the Explorer pane, select the object called **Delivery events**. You can create rules about objects that use data from the **Package delivery events** eventstream. For example, a rule that checks packages for temperature.

    :::image type="content" source="media/activator-tutorial/activator-temperature.png" alt-text="Screenshot showing Delivery events table and the temperature column.":::

1. Notice that the **Events by object ID** section is organized by **Package ID**. **Package ID** is the column ID that uniquely identifies each package. We use this unique ID to assign the Package events to Package objects.

    :::image type="content" source="media/activator-tutorial/data-activator-unique-id.png" alt-text="Screenshot showing the unique ID column in the Events by object ID screen."lightbox="media/activator-tutorial/data-activator-unique-id.png":::

1. Select the **Temperature** rule called **Too hot for medicine**. Scroll through the **Definition** pane to see how the rule works.

1. In the **Monitor** section, select **Temperature**. The temperature values come from the  *Temperature* column in the **Delivery events** table. You can see the **Temperature** column in an earlier screenshot.

    :::image type="content" source="media/activator-tutorial/data-activator-monitor.png" alt-text="Screenshot showing the Monitor section of the Definition pane.":::

1. Scroll down to **Condition**. Our rule is monitoring temperatures that **become greater than** **20** degrees Celsius.

1. Scroll further down to **Property filter**. Our rule applies only to packages containing medicine. In the **Delivery events** table, the rule looks at the column named **Special care contents**. In the **Special care contents** column, some of the packages have a value of **Medicine**.

    :::image type="content" source="media/activator-tutorial/activator-filter.png" alt-text="Screenshot showing the Property filter section of the Definition pane.":::

1. Lastly, scroll down to **Action**. Our rule sends a Teams message if the condition is met.

We created an [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule. The rule is running against the **Package delivery events** eventstream. The rule looks for packages that have medicine and checks to see if the temperature is now greater than 20 degrees Celsius. When the temperature becomes greater than 20 degrees Celsius, a Teams message is sent.

Look at the other rules to learn how they work.

## Start the rule

Now you're familiar with the events and objects used to create a rule. The next step is to start the rule.

1. Select **Too hot for medicine**.

1. Optionally, send a test message by selecting **Send me a test action**. First check that you're the **Recipient**. Make sure that you receive the message and that it looks the way you expect.

1. Select **Start**. This causes the rule to become active. You receive a Teams message whenever a medicine package is too hot. The rule should trigger several times every hour.

1. Later, you can turn off the rule using the **Stop** button.

## Create an object

Now it's time to create an object of your own. In this section, delete the *Package* object. Then, recreate it to track the status of packages in transit where the hours in delivery become greater than 25.

1. Select and delete the **Package** object.
1. Select the **Package delivery events** stream.
1. In the ribbon, select **New object**.
1. Name your new object **Package2** and choose *Package ID* as the unique ID.
1. Add *HoursInTransit* and *City* as properties of the object.
1. Select **Create**.

## Create a new rule

Create a rule that alerts you if the transit time in delivery exceeds a threshold.

1. Select your new **HoursInTransit** property. From the ribbon, select **New rule**. From the header, select the pencil icon to edit the name of the rule. Name it *Average transit time above target*. Your **Package2** object looks like this.

    :::image type="content" source="media/activator-tutorial/data-activator-new-rule.png" alt-text="Average transit time explorer view for activator tutorial.":::

2. Select **Edit details** to open the **Definition** pane. 

3. In the **Definition** pane, select **HoursInTransit**. Then select **Add summarization** > **Average**. Set an aggregation **Window size** of five minutes and a **Step size** of five minutes. The Monitor chart updates to reflect the summarization, and your rule Monitor chart looks like this.

    :::image type="content" source="media/activator-tutorial/activator-window.png" alt-text="Average transit time chart for activator tutorial.":::

4. In the **Condition** step, detect when the average transit time becomes greater than 25. Set the rule to alert you every time the condition is met. After you complete this step, the Condition chart updates, and the rule looks like this.

    :::image type="content" source="media/activator-tutorial/activator-conditions.png" alt-text="Screenshot showing average transit time rule detection chart for activator tutorial.":::

5. Specify an action for your rule. You can choose to send a Teams message or Email. Customize your action according to how you would like it to appear.

6. Test your rule by selecting the **Send me a test action** button. Make sure you get an alert. If using email, it might take a minute or two to arrive.

7. Start your rule by selecting **Save and start**.

You created your first object and rule. As next steps, you might try setting up some other rules on the *Package2* object. When you're ready to try using [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] on your own data, follow the steps in the [Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-get-data-eventstreams.md) article.

## Clean up resources

Once you finish with the rules you created as part of the tutorial, be sure to stop them. If you don't stop the rules, you continue to receive the rule notifications. You also might incur charges for background processing. Select each rule in turn and select the **Stop** button from the ribbon.

## Related content

* [What is [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]?](activator-introduction.md)
* [Get started with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-get-started.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
