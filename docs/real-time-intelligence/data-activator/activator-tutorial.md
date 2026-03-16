---
title: Activator tutorial using sample data
description: Learn how Activator works using sample data. Activator is a powerful tool for working with data and creating rules based on specific conditions.
ms.reviewer: jtmsft
ms.topic: tutorial
ms.custom: FY25Q1-Linter, sfi-image-nochange
ms.date: 12/08/2025
ms.search.form: Data Activator Sample Tutorial
#customer intent: As a Fabric user I want to learn more about Activator using a tutorial and sample data.
---

# Tutorial: Create and activate a Fabric Activator rule
Fabric Activator in Microsoft Fabric allows you to take actions when patterns or conditions are detected in data streams. If you're new to Fabric Activator, see [What is Fabric Activator](activator-introduction.md). In this tutorial, you use the sample data included with Fabric Activator to complete the following tasks: 

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

1. Navigate to the [Fabric portal]( https://app.fabric.microsoft.com). 
1. On the left navigation pane, select the ellipses (**...**), and then select **Create**. 

    :::image type="content" source="media/activator-tutorial/create.png" alt-text="Screenshot showing the left navigation pane with Create selected." lightbox="media/activator-tutorial/create.png":::

1. On the **Create** page, under the Real-Time Intelligence section, select **Data Activator**.

    :::image type="content" source="media/activator-tutorial/activator.png" alt-text="Screenshot showing the Create page with Data Activator selected." lightbox="media/activator-tutorial/activator.png":::

1. On the **Activator** page, select **Try sample**.

    :::image type="content" source="media/activator-tutorial/try-sample.png" alt-text="Screenshot showing the option to add data or use the sample data." lightbox="media/activator-tutorial/try-sample.png":::

## Explore the data

In this step, we explore the eventstream data this sample is built on.

The new activator has an **Explorer** section. Scroll down and select the **Package delivery events** stream.

:::image type="content" source="media/activator-tutorial/explore-data.png" alt-text="Screenshot of Activator with the Package delivery events stream selected." lightbox="media/activator-tutorial/explore-data.png":::

These events show the real-time status of packages that are in the process of being delivered.

Look at the incoming events and hover over the event data in the live table. Each data point contains information about the event. You might have to scroll to see it all. 

## Explore a rule

Use a rule to specify the event values you want to monitor, the conditions you want to detect, and the actions you want Fabric Activator to take.

The Explorer pane displays objects, like eventstreams, for this activator. **Delivery events** is one of the objects created from the **Package delivery events** eventstream.

1. In the Explorer pane, select the object called **Delivery events**. You can create rules about objects that use data from the **Package delivery events** eventstream. For example, a rule that checks packages for temperature.

    :::image type="content" source="media/activator-tutorial/explore-rule.png" alt-text="Screenshot showing Delivery events table and the temperature column." lightbox="media/activator-tutorial/explore-rule.png":::

1. Notice that the **Events by object ID** section is organized by **Package ID**. **Package ID** is the column ID that uniquely identifies each package. We use this unique ID to assign the Package events to Package objects.

    :::image type="content" source="media/activator-tutorial/id.png" alt-text="Screenshot showing the unique ID column in the Events by object ID screen."lightbox="media/activator-tutorial/id.png":::

1. Select the **Temperature** rule called **Too hot for medicine**. In the right-most pane, see the **Definition** pane to see how the rule works.

    :::image type="content" source="media/activator-tutorial/definition.png" alt-text="Screenshot showing the sample rule."lightbox="media/activator-tutorial/definition.png":::

1. In the **Monitor** section, select **Temperature**. The temperature values come from the *Temperature* column in the **Delivery events** table. You can see the **Temperature** column in an earlier screenshot.

    :::image type="content" source="media/activator-tutorial/monitor.png" alt-text="Screenshot showing the Monitor section of the Definition pane." lightbox="media/activator-tutorial/monitor.png":::

1. In the **Condition** section, you see the rule condition to monitor temperatures that **are higher than 20** degrees Celsius.

    :::image type="content" source="media/activator-tutorial/condition.png" alt-text="Screenshot showing the Condition section of the Definition pane." lightbox="media/activator-tutorial/condition.png":::

1. Scroll further down to **Property filter**. Our rule applies only to packages containing medicine. In the **Delivery events** table, the rule looks at the column named **Special care contents**. In the **Special care contents** column, some of the packages have a value of **Medicine**.

    :::image type="content" source="media/activator-tutorial/property-filter.png" alt-text="Screenshot showing the Property filter section of the Definition pane." lightbox="media/activator-tutorial/property-filter.png":::

1. Lastly, scroll down to **Action**. Choose one of the following actions if the condition is met:
    1. **Send email notification:** Sends an email to yourself or to others in your organization. 
        1. For Select action, select **Send email**.
        1. For **To**, enter **email addresses** of receivers or use the drop-down list to select a property whose value is an email address. By default your email is populated here.
        1. For **Subject**, enter the subject of the email notification.
        1. For **Headline**, enter the headline of the email notification.
        1. For **Notes**, enter notes for the email notification.
            > [!NOTE]
            > When entering the subject, headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`.
        1. For **Context**, select the values for the drop-down list you want to include in the email notification.

        :::image type="content" source="media/activator-tutorial/action-email.png" alt-text="Screenshot showing the Action section of the Definition pane with email action selected." lightbox="media/activator-tutorial/action-email.png":::

    1. **Send Microsoft Teams notification:** Sends a Microsoft Teams message to yourself. You can customize the title and message content.
        1. For Select action, select **Teams** --> **Message to individuals** or **Group chat message**, or **Channel post**.
        1. Follow one of these steps depending on your selection:
            * If you selected the **Message to individuals** option, enter **email addresses** of receivers or use the drop-down list to select a property whose value is an email address. When the condition is met, an email is sent to specified individuals.
            * If you selected the **Group chat message** option, select a **group chat** from the drop-down list. When the condition is met, a message is posted to the group chat.
            * If you selected the **Channel post** option, select a **team** and **channel** from the drop-down lists. When the condition is met, a message is posted to the selected channel.
        1. For **Headline**, enter the headline of the Teams notification.
        1. For **Notes**, enter notes for the Teams notification.
            > [!NOTE]
            > When entering the subject, headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@BikepointID`.
        1. For **Context**, select the values for the drop-down list you want to include in the Teams notification.

        :::image type="content" source="media/activator-tutorial/action.png" alt-text="Screenshot showing the Action section of the Definition pane." lightbox="media/activator-tutorial/action.png":::

    1. **Run Fabric activities:** To configure the alert to launch a Fabric pipeline, Spark job, or notebook when the condition is met, follow these steps:
        1. For **Select action**, select **Run Pipeline**, **Run Spark job**, **Run Notebook**, or **Run Function (preview)**.
        1. On **Select Fabric item to run**, select the Fabric item (pipeline, notebook, Spark job, or function) from the list.
        1. Select **Add parameter** and specify the name of the parameter for the Fabric item and a value for it. You can add more than one parameter. You can pass parameters from the alert data by typing @ or by selecting the button next to the text box. For example, @BikepointID.

            :::image type="content" source="media/activator-tutorial/fabric-actions.png" alt-text="Screenshot showing the Action section of the Definition pane with pipeline action selected." lightbox="media/activator-tutorial/pipeline.png":::

    1. **Custom actions:** To configure the alert to call a custom action when the condition is met, follow these steps:
        1. For **Select action**, select **Create custom action**.

            :::image type="content" source="media/activator-tutorial/custom-action.png" alt-text="Screenshot showing the Action section of the Definition pane with notebook action selected." lightbox="media/activator-tutorial/custom-action.png":::

        1. As mentioned in the Action section, create the rule first, and then complete the custom action setup by following steps from [Trigger custom actions (Power Automate flows)](activator-trigger-power-automate-flows.md).
        1. After you create the custom action, in the **Definition** pane, select your custom action from the **Select action** drop-down list.
    1. Select **Create** to save your Activator rule.

We created a Fabric Activator rule. The rule is running against the **Package delivery events** eventstream. The rule looks for packages that have medicine and checks to see if the temperature is now greater than 20 degrees Celsius. When the temperature becomes greater than 20 degrees Celsius, a Teams message is sent.

Look at the other rules to learn how they work.

## Start the rule

Now you're familiar with the events and objects used to create a rule. The next step is to start the rule.

1. Select **Too hot for medicine**.
1. Optionally, send a test message by selecting **Send me a test action**. First check that you're the **Recipient**. 

    :::image type="content" source="media/activator-tutorial/send-test-action.png" alt-text="Screenshot showing the Action section of the Definition pane with Send me a test action button highlighted." lightbox="media/activator-tutorial/send-test-action.png":::        
1. You should receive a message similar to the following one: 

    :::image type="content" source="media/activator-tutorial/teams-message.png" alt-text="Screenshot showing the sample Teams notification." lightbox="media/activator-tutorial/teams-message.png":::            
1. Select **Start**. This causes the rule to become active. You receive a Teams message whenever a medicine package is too hot. The rule should trigger several times every hour.

    :::image type="content" source="media/activator-tutorial/start-button.png" alt-text="Screenshot showing the Start button highlighted." lightbox="media/activator-tutorial/start-button.png":::                
1. Later, you can turn off the rule using the **Stop** button on the ribbon.

    :::image type="content" source="media/activator-tutorial/stop-button.png" alt-text="Screenshot showing the Stop button on the ribbon highlighted." lightbox="media/activator-tutorial/stop-button.png":::      

## Create an object

Now it's time to create an object of your own. In this section, delete the *Package* object. Then, recreate it to track the status of packages in transit where the hours in delivery become greater than 25.

1. In the **Explorer** pane, right-click **Package**, and select **Delete**. On the **Delete item** window, select **Delete**. 

    :::image type="content" source="media/activator-tutorial/package-delete-button.png" alt-text="Screenshot showing the Delete menu on the Package object." lightbox="media/activator-tutorial/package-delete-button.png":::      
1. Select the **Package delivery events** stream, and then select **New object** on the ribbon.

    :::image type="content" source="media/activator-tutorial/new-object-button.png" alt-text="Screenshot showing the New object button on the ribbon." lightbox="media/activator-tutorial/new-object-button.png":::          
1. In the **Build object** pane to the right, follow these steps:
    1. Name your new object **Package2**.
    1. Choose **PackageId** as the unique ID.
    1. Select **HoursInTransit** and **City** as properties of the object.
    1. Select **Create**.
    
        :::image type="content" source="media/activator-tutorial/build-object-pane.png" alt-text="Screenshot showing the Build object pane." lightbox="media/activator-tutorial/build-object-pane.png":::              
    

## Create a new rule

Create a rule that alerts you if the transit time in delivery exceeds a threshold.

1. Select your new **HoursInTransit** property. From the ribbon, select **New rule**. 

    :::image type="content" source="media/activator-tutorial/new-rule-button.png" alt-text="Screenshot showing the New rule button on the ribbon." lightbox="media/activator-tutorial/new-rule-button.png":::
1. In the **Definition** pane, follow these steps:
    1. For **Monitor**, choose the attribute to monitor and optionally add filters.
    1. For **Condition**, select the type of condition and occurrence. 
    1. For **Action**, select one of the options to send a message in Teams or email. 
    1. Select **Save**. 
    
        :::image type="content" source="media/activator-tutorial/create-rule.png" alt-text="Screenshot showing the Definition pane." lightbox="media/activator-tutorial/create-rule-pane.png":::      
1. You should see the rule under **HoursInTransit** in the Explorer pane. Select the rule. In the middle pane, select the pencil icon at the top, and update the name to **Average transit time above target**. 

    :::image type="content" source="media/activator-tutorial/edit-rule-name.png" alt-text="Screenshot showing the pencil icon to change the rule name." lightbox="media/activator-tutorial/edit-rule-name.png":::          
3. In the **Definition** pane to the right, select **HoursInTransit**. Then select **Add summarization** > **Average**. 

    :::image type="content" source="media/activator-tutorial/select-average.png" alt-text="Screenshot showing the Definition pane with Average aggregation selected." lightbox="media/activator-tutorial/select-average.png":::
1. Set an aggregation **Window size** of five minutes and a **Step size** of five minutes, and then select **Save**.

    :::image type="content" source="media/activator-tutorial/window-step-size.png" alt-text="Screenshot showing the Definition pane with the window and step size." lightbox="media/activator-tutorial/window-step-size.png"::: 
1. The Monitor chart updates to reflect the summarization, and your rule Monitor chart looks like this.

    :::image type="content" source="media/activator-tutorial/activator-window.png" alt-text="Screenshot of the Average transit time chart for activator tutorial." lightbox="media/activator-tutorial/activator-window.png":::
6. Test your rule by selecting the **Send me a test action** button. Make sure you get an alert. If using email, it might take a minute or two to arrive.

    :::image type="content" source="media/activator-tutorial/send-test-action-2.png" alt-text="Screenshot that shows the Test button selected on the ribbon." lightbox="media/activator-tutorial/send-test-action-2.png":::
1. Start your rule by selecting **Save and start** in the **Definition** pane or by selecting **Start** on the ribbon.

    :::image type="content" source="media/activator-tutorial/start-rule.png" alt-text="Screenshot that shows the Start button on the ribbon selected." lightbox="media/activator-tutorial/start-rule.png":::

    You created your first object and rule. As next steps, you might try setting up some other rules on the *Package2* object. 

    When you're ready to try using Fabric Activator on your own data, follow the steps in the [Get data for Fabric Activator](../event-streams/add-destination-activator.md) article.

## Clean up resources

Once you finish with the rules you created as part of the tutorial, be sure to stop them. If you don't stop the rules, you continue to receive the rule notifications. You also might incur charges for background processing. Select each rule in turn and select the **Stop** button from the ribbon.

## Related content

* [What is Fabric Activator?](activator-introduction.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
