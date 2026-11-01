---
title: Activator tutorial using sample data
description: Learn how Activator works using sample data. Activator is a powerful tool for working with data and creating rules based on specific conditions.
ms.reviewer: jtmsft
ms.topic: tutorial
ms.custom: FY25Q1-Linter, sfi-image-nochange
ms.date: 10/29/2026
ai-usage: ai-assisted
ms.search.form: Data Activator Sample Tutorial
#customer intent: As a Fabric user I want to learn more about Activator using a tutorial and sample data.
---

# Tutorial: Create and activate a Fabric Activator rule

Fabric Activator in Microsoft Fabric enables you to take actions when it detects patterns or conditions in data streams. If you're new to Fabric Activator, see [What is Fabric Activator](activator-introduction.md). In this tutorial, you use the sample data included with Fabric Activator to complete the following tasks:

* Review a sample Activator item
* Explore the data
* Explore a rule
* Start the rule
* Create an object
* Create a rule

## Prerequisites

Before you begin, you need a workspace with a Fabric capacity. To learn about Fabric workspaces, see the [Workspaces](../../fundamentals/workspaces.md) article. If you don't have Fabric, you're prompted to start a trial.

## Create a sample Activator

1. On the Fabric homepage, in the left navigation pane, select the ellipsis (**...**), and then select **Create**.

    :::image type="content" source="media/activator-tutorial/create.png" alt-text="Screenshot showing the left navigation pane with Create selected." lightbox="media/activator-tutorial/create.png":::
   
2. On the **Create** page, under **Real-Time Intelligence**, select **Activator**.

    :::image type="content" source="media/activator-tutorial/activator.png" alt-text="Screenshot showing the Create page with Activator selected." lightbox="media/activator-tutorial/activator.png":::
   
3. On the **Activator** page, select **Try sample**.

    :::image type="content" source="media/activator-tutorial/activator-get-data-try-sample.png" alt-text="Screenshot showing the left Try samples entry point." lightbox="media/activator-tutorial/activator-get-data-try-sample.png":::
   
   Follow the guided prompts to enable the sample data and explore the Activator interface.
   
    
   
## Explore the data

In this step, you explore the eventstream data that the sample is built on.

The new Activator item has an **Explorer** section. Scroll down and select the **Bicycle readings stream**.

:::image type="content" source="media/activator-tutorial/bicycle-readings-eventstreams-page.png" alt-text="Screenshot of Activator UI Explorer pane showing Bicycle readings." lightbox="media/activator-tutorial/bicycle-readings-eventstreams-page.png":::

These events show bicycle readings in real-time.

Look at the incoming events and hover over the event data in the live table. Each data point contains information about the event. You might need to scroll to see it all.


## Explore a rule

Use a rule to specify the event values you want to monitor, the conditions you want to detect, and the actions you want Fabric Activator to take.

The Explorer pane displays objects, like eventstreams, for this activator. __Station readings__ is one of the objects created from the **Bicycles reading events** eventstreams.

1. In the Explorer pane, select the object called __Station readings__. You can create rules about objects that use data from the __Bicycles reading events__ eventstream. For example, a rule that checks stations for bike availability.

    :::image type="content" source="media/activator-tutorial/station-readings.png" alt-text="Screenshot showing the Bicycle station readings." lightbox="media/activator-tutorial/station-readings.png":::
   
   
2. Notice that the **Events by 'BikepointID'** section is organized by Bikepoint ID. Bikepoint ID is the column ID that uniquely identifies each bike station. Use this unique ID to assign bike events to bike objects.

    :::image type="content" source="media/activator-tutorial/station-readings-details.png" alt-text="Screenshot showing the station readings for bike point ID." lightbox="media/activator-tutorial/station-readings-details.png":::


3. Select the **No_Empty_Docks** rule (which stands for number of empty docks) called **No empty docks (Email)**. In the rightmost pane, view the **Definition** pane to see how the rule works.

    :::image type="content" source="media/activator-tutorial/activator-ui-no-empty-docs.png" alt-text="Screenshot showing No empty docks email rule Definitions pane. " lightbox="media/activator-tutorial/activator-ui-no-empty-docs.png":::


4. In the **Monitor** section, select **No_Empty_Docks**. The number of empty docks values come from the **No_Empty_Docks** column in the **Station readings** table. You can see the **No_Empty_Docks** column in an earlier screenshot.

5. In the **Condition** section, you see the rule condition to monitor number of empty docks that **are less than 1**.

    :::image type="content" source="media/activator-tutorial/monitor-attribute-conditions.png" alt-text="Screenshot showing the Monitor Definitions pane for number of empty docks." lightbox="media/activator-tutorial/monitor-attribute-conditions.png":::


6. Scroll further down to **Property filters**. The rule applies only to stations on Arlington Street. In the **Station Readings** table, the rule looks at the column named **Street**. In the Street column, some of the bikes have a value of Arlington Street.

    :::image type="content" source="media/activator-tutorial/property-filters.png" alt-text="Screenshot showing the property filters, more specifically Arlington Street." lightbox="media/activator-tutorial/property-filters.png":::


7. Scroll down to **Action**. Choose one of the following actions to take when the condition is met:
    1. **Send email notification:** Sends an email to yourself or to others in your organization.
        1. For **Select action**, select **Send email**.
        1. For **To**, enter the **email addresses** of the recipients, or use the dropdown list to select a property whose value is an email address. Your email address is populated here by default.
        1. For **Subject**, enter the subject of the email notification or leave as is.
        1. For **Headline**, enter the headline of the email notification or leave as is.
            1. For **Message**, enter notes for the email notification.

            > [!NOTE]
            > When you enter the subject, headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@No_Empty_Docks`.

        1. For **Context**, select the values from the dropdown list that you want to include in the email notification.

            :::image type="content" source="media/activator-tutorial/action-pane-email.png" alt-text="Screenshot showing the Actions pane with Email actions selected.  " lightbox="media/activator-tutorial/action-pane-email.png":::

    1.  **Send Microsoft Teams notification:** Sends a Microsoft Teams notification to individuals, a group chat, or a channel. You can customize the title and message content.
        1. For **Select action**, select **Teams** > **Message to individuals**, **Group chat message**, or **Channel post**.
        1. Follow one of these steps depending on your selection:
            * If you selected **Message to individuals**, enter the **email addresses** of the recipients, or use the dropdown list to select a property whose value is an email address. When the condition is met, Fabric Activator sends a Teams message to the specified individuals.
            * If you selected **Group chat message**, select a **group chat** from the dropdown list. When the condition is met, Fabric Activator posts a message to the group chat.
            * If you selected **Channel post**, select a **team** and **channel** from the dropdown lists. When the condition is met, Fabric Activator posts a message to the selected channel.
        1. For **Headline**, enter the headline of the Teams notification.
        1. For **Message**, enter notes for the Teams notification.
            > [!NOTE]
            > When you enter the subject, headline, or notes, you can refer to properties in the data by typing `@` or by selecting the button next to the text boxes. For example, `@No_Empty_Docks`.

        1. For **Context**, select the values from the dropdown list that you want to include in the Teams notification.

            :::image type="content" source="media/activator-tutorial/action-section-activator.png" alt-text="Screenshot showing the Action section of the Definition pane." lightbox="media/activator-tutorial/action-section-activator.png":::

    1. **Run Fabric activities:** To configure the alert to launch a Fabric pipeline, Dataflow, Spark job, notebook, Function, Copy job, or Publish business event (preview) when the condition is met, follow these steps:
        1. For **Select action**, select **Run Action**, **Run Pipeline**, **Run Dataflow**, **Run Spark job**, **Run Notebook**, **Run Function**, **Run Copy job**, or **Publish business event**.
        1. On **Select Fabric item to run**, select the Fabric item (Action, pipeline, dataflow, notebook, Spark job, function, copy job, or publish business event) from the list.
        1. Select **Add parameter**, and then specify the name of the parameter for the Fabric item and a value for it. You can add more than one parameter. You can pass parameters from the alert data by typing `@` or by selecting the button next to the text box. For example, `@BikePointID`. Copy jobs don't accept parameters, so this step doesn't apply to them.
        
        :::image type="content" source="media/activator-tutorial/action-pane.png" alt-text="Screenshot showing the Action section of the Definition pane with email action selected." lightbox="media/activator-tutorial/action-pane.png":::

    1. **Custom actions:** To configure the alert to call a custom action when the condition is met, follow these steps:
        1. For **Select action**, select **Create custom action**.
        
        :::image type="content" source="media/activator-tutorial/custom-action.png" alt-text="Screenshot showing the Action section of the Definition pane with custom action selected." lightbox="media/activator-tutorial/custom-action.png":::

        1. First, create the rule. Then complete the custom action setup by following the steps in [Trigger custom actions (Power Automate flows)](activator-trigger-power-automate-flows.md).
        1. After you create the custom action, in the **Definition** pane, select your custom action from the **Select action** dropdown list.


8. After you configure your selected action, select **Create** to save your Activator rule.


You created a Fabric Activator rule. The rule runs against the **Bicycle readings** eventstream. The rule looks for number of empty docks that has less than 1 bicycle and checks every time the condition is met. When the number of bikes are less than 1, the rule sends a Teams message.

This sample Activator item includes other rules. Explore them at your own pace to see how they work.


## Start the rule

Now that you're familiar with the events and objects used to create a rule, start the rule.

1. Select **No_empty_docks (Email)**.
2. Optionally, send a test message by selecting **Send me a test action**. First, check that you're the **Recipient**.

    :::image type="content" source="media/activator-tutorial/send-test-action.png" alt-text="Screenshot showing the Action section of the Definition pane with Send me a test action button highlighted." lightbox="media/activator-tutorial/send-test-action.png":::

3. You receive an email similar to the following one:

    :::image type="content" source="media/activator-tutorial/no-empty-docks-emails.png" alt-text="Screenshot showing activator email." lightbox="media/activator-tutorial/no-empty-docks-emails.png":::

4. Select **Start**. This action activates the rule. You receive an email whenever a dock has less than 1 bike available. The rule triggers every time the condition is met.  

    :::image type="content" source="media/activator-tutorial/start-button-definitions-pane.png" alt-text="Screenshot showing definitions pane start button." lightbox="media/activator-tutorial/start-button-definitions-pane.png":::

5. Later, you can turn off the rule by using the **Stop** button on the ribbon.

    :::image type="content" source="media/activator-tutorial/stop-rule-button.png" alt-text="Screenshot showing top ribbon stop button selected to stop rule." lightbox="media/activator-tutorial/stop-rule-button.png":::


## Create an object

Now create an object. In this section, you delete the **Bike station** object and recreate it with the properties you'll use in the next section to build a rule.

1. In the **Explorer** pane, right-click **Bike station**, and select **Delete**. On the **Delete item** window, select **Delete**.

    :::image type="content" source="media/activator-tutorial/bike-station-delete-button.png" alt-text="Screenshot showing delete button for Bike Station." lightbox="media/activator-tutorial/bike-station-delete-button.png":::

2. Select the **Bicycle readings** stream, and then select **New object** on the ribbon.

    :::image type="content" source="media/activator-tutorial/eventstream-new-object.png" alt-text="Screenshot showing creating a New object from Eventstream." lightbox="media/activator-tutorial/eventstream-new-object.png":::

3. In the **Build object** pane to the right, follow these steps:
    1. Name your new object **Bike station**.

    1. Choose **BikepointID** as the unique ID.

    1. Select **No_Bikes, No_Empty_Docks,** and **Street** as properties of the object.

    1. Select **Create**.

        :::image type="content" source="media/activator-tutorial/build-object-pane.png" alt-text="Screenshot showing build object pane" lightbox="media/activator-tutorial/build-object-pane.png":::


## Create a rule

Create a rule that alerts you when the number of empty docks is less than 1.

1. Select your new **No_Empty_Docks** property. From the ribbon, select **New rule**.

    :::image type="content" source="media/activator-tutorial/no-empty-dock.png" alt-text="Screenshot showing new rule - no empty docks." lightbox="media/activator-tutorial/no-empty-dock.png":::

2. In the **Definition** pane, follow these steps:
    1. For **Monitor**, choose the attribute to monitor and optionally add filters.
    1. For **Condition**, set the condition to trigger when **No_Empty_Docks** is less than **1**.
    1. For **Action**, select one of the options to send a message in Teams or email.
    1. Select **Save**.
      
        :::image type="content" source="media/activator-tutorial/definitions-pane.png" alt-text="Screenshot showing definitions pane." lightbox="media/activator-tutorial/definitions-pane.png":::

3. You see the rule under **No_Empty_Docks alert** in the Explorer pane. Select the rule. In the middle pane, select the pencil icon at the top, and update the name to  **No_Empty_Docks (Email).**

    :::image type="content" source="media/activator-tutorial/new-no-empty-docks-rule.png" alt-text="Screenshot showing new No_Empty_Docks (Email) rule. " lightbox="media/activator-tutorial/new-no-empty-docks-rule.png":::


4. In the **Definition** pane to the right, select **No_Empty_Docks**. Then select **Add summarization** > **Maximum**.

    :::image type="content" source="media/activator-tutorial/no-empty-docks-add-summarization-drop-down.png" alt-text="Screenshot showing Definitions pane with 'Add summarization' drop down to 'Maximum'." lightbox="media/activator-tutorial/no-empty-docks-add-summarization-drop-down.png":::


5. Set an aggregation **Window size** of one minute and a **Step size** to same as window size, and then select **Save**.

    :::image type="content" source="media/activator-tutorial/definition-pane-summarization-settings.png" alt-text="Screenshot of Definition pane showing summarization set to Maximum with 1-minute window size.":::

  
6. The Monitor chart updates to reflect the summarization, and your rule Monitor chart looks like this.

    :::image type="content" source="media/activator-tutorial/no-empty-docks-monitor-chart.png" alt-text="Screenshot of Monitor chart showing summarized data with 1-minute window and step size applied." lightbox="media/activator-tutorial/no-empty-docks-monitor-chart.png":::

 
7. Test your rule by selecting the **Send me a test action** button. Make sure you get an alert. If you use email, it might take a minute or two to arrive.

    :::image type="content" source="media/activator-tutorial/activator-rule-send-test-action.png" alt-text="Screenshot of rule editor with 'Send me a test action' button highlighted in red." lightbox="media/activator-tutorial/activator-rule-send-test-action.png":::

    
8. Start your rule by selecting **Save and start** in the **Definition** pane or by selecting **Start** on the ribbon.

    :::image type="content" source="media/activator-tutorial/activator-start-rule-highlighted.png" alt-text="Screenshot of Rules pane with the Start button highlighted on the ribbon and Definition panel open." lightbox="media/activator-tutorial/activator-start-rule-highlighted.png":::

 
You created your first object and rule. As a next step, try setting up other rules on the **Bike station** object.

When you're ready to try using Fabric Activator on your own data, follow the steps in the [Get data for Fabric Activator](../event-streams/add-destination-activator.md) article.


## Clean up resources

When you finish with the rules you created as part of the tutorial, stop them. If you don't stop the rules, you continue to receive the rule notifications. You might also incur charges for background processing. Select each rule in turn and select the **Stop** button from the ribbon.


## Related content

* [Tutorial: Create an end-to-end Activator rule using agentic AI](activator-agentic-tutorial.md)
* [What is Fabric Activator?](activator-introduction.md)

To learn more about Microsoft Fabric, see:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
