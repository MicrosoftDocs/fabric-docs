---
title: Create Activator rules
description: Learn how to create rules for Fabric Activator. Rules take action on your data, such as sending notifications and starting automated workflows. 
ms.topic: how-to
ms.custom: 
ms.search.form: Data Activator Rule Creation
ms.date: 12/09/2024

#customer intent: As a new Activator user, I want learn how to create a rule so that I can receive notifications about my streaming data or trigger automated workflows.
---

# Create a rule in Fabric Activator

Once you bring streaming data into an activator or [assign events to objects](activator-assign-data-objects.md#assign-data-to-objects-in-activator), you can create rules to act on your data. The activation of those rules can be the sending of a notification, such as an email or Teams message. And the activation of those rules can trigger a workflow, such as starting a Power Automate flow.

## Prerequisites

- To successfully complete this how-to, you need a workspace with a Microsoft Fabric-enabled capacity.

## Open Activator

Start by opening Fabric in your browser.

From the nav pane, select **Create** > **Activator**. If you don't see **Create**, select the ellipses (...) to display more options.

Select **Try sample** to create an activator that is prepopulated with sample events and objects.

## Define a rule condition and action

Use **Rules** to specify the values you want to monitor in your events, the conditions you want to detect, and the actions you want [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to take.

### Select your rule data

In the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] Explorer, select the property or eventstream to monitor in your rule. See [Create properties](#create-properties) section for information on properties.

Once you select a property or eventstream, you see a preview of the values for a sample of the instances of the object.

### Make a new Activator rule

To create a new rule, select the stream you just added and you should see a "Create rule" pane on the right hand side. The **Monitor** section of the rule is prepopulated with the data stream that you selected.

### Define the condition to detect

Next, choose the type of condition that you want to detect. You can use conditions that check:

- on each event, do an action
- on each event when a value is met, do an action
- on each event grouped by a field, do an action (for example, on each PackageId event when Temperature is greater than 30)

Finally, select whether you want the action performed to send you an email or send you a Teams message and select **Create**. The conditions and actions selected can be modified later on.

The charts in the Definition tab updates to show a sample of the events that meet the conditions that you set.

:::image type="content" source="media/activator-create-activators/activator-create-triggers-design-mode-05.png" alt-text="Screenshot of a detect card showing two charts." Lightbox="media/activator-create-activators/activator-create-triggers-design-mode-05.png":::

If you navigate to the **Analytics** tab, there are two charts. The first shows the total number of times the rule fired, for all object IDs that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is tracking. Use this chart to understand the volume of notifications that fired over all object IDs. The second chart shows the total number of times the rule activated, for the five object IDs. Use this chart to better understand if there were particular object IDs that contribute the most to all the activations that fire.

### Define the action to take

Finally, use the **Action** section to choose what to do when the condition is detected.

:::image type="content" source="media/activator-create-activators/data-activator-create-triggers-design-mode-06.png" alt-text="Screenshot of selecting an action when a condition is detected.":::

Here are the supported action types:

- **Email** - An email is sent to the specified recipients. 
- **Teams** - A Teams message is sent to specified recipients, group chat, or channel. 
- **Fabric item** - Executes the selected Fabric pipeline, Fabric notebook, Fabric Spark Job Definition, Fabric function.

- **Custom action** - Activates a Power Automate flow. 

:::image type="content" source="media/activator-create-activators/actions.png" alt-text="Screenshot of the Action section in the Activator user interface." lightbox="media/activator-create-activators/actions.png":::

Different action types have different parameters. Some of those parameters are: the email address you want to send to, the Teams channel or group chat, the workflow you want to start, subject line, or additional information (**context**). For **Context**, you can select the additional properties to be included in the alert message. 

You can also tag properties by entering `@` to add context to the actions you send. For example: `@bikeId`. 

Note that if you summarize on the property in the Monitor card, the original value of the property will be sent in the action rather than the summarized value.

You can also select **Edit action** to see an editor with a preview of the message that the action sends and options to add more information to the action.

## Test your rule

After you create a rule, test it by selecting **Send me a test alert**. Selecting this button finds a past event for which the rule activation is *true* and sends you an alert so that you can see what the alert looks like for that event.  

* The test alert always goes to you, regardless of the recipient field in the **Action** card
* The **Send me a test alert** option is only enabled if you have at least one past event for which the rule condition is true.

## Start and stop your rule

Rules are created in a *Stopped* state. This means they're not being evaluated as data flows into the system, and don't take any actions as a result. After defining the rule, select **Save and start** to make the rule active. If you're not ready to start your rule, save it and come back later. When you're ready, select **Start** from the toolbar for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to start running the trigger and taking action.

:::image type="content" source="media/activator-create-activators/activator-create-triggers-design-mode-09.png" alt-text="Screenshot of starting an alert.":::

Once started, you see *Running* in the title area of the rule card. Also, the icon in the Explorer shows that the rule is running. When you start the rule, new activations start running against new ingested data. Your rule doesn't activate on data that has already been ingested. To stop the alert, select **Stop**.

If you make changes to the rule (for example change the condition it looks for), select **Update** in the toolbar to make sure that the running rule uses the new values.

When you delete a rule (or object), it can take up to five minutes for any back-end processing of data to complete. Deleted rules might continue to monitor data, and take actions accordingly, for a few minutes after they're deleted.

## Create properties

Sometimes, you need to reuse rule logic across multiple rules. Create a property to define a reusable condition or measure, then reference that property from multiple rules.

To create a property, select the stream added to the object that you're interested in and select **New Property** from the ribbon and then select the property you'd like to use in the rule logic.

:::image type="content" source="media/activator-create-activators/activator-create-triggers-design-mode-10.png" alt-text="Screenshot of creating a property for an alert.":::

Once you define a property, you can reference it from one or more rules. Here we reference the *Temperature* property *Too hot for medicine*.

:::image type="content" source="media/activator-create-activators/activator-create-triggers-design-mode-11.png" alt-text="Screenshot of package too warm property for an alert." lightbox="media/activator-create-activators/activator-create-triggers-design-mode-11.png":::

## Clean up resources

Delete the sample eventstream by selecting the ellipses (...) to the right of the **Package delivery events** eventstream, and selecting **Delete**.

## Next step

> [!div class="nextstepaction"]
> [Activator tutorial](activator-tutorial.md)

## Related content

* [Overview of Activator rules](activator-rules-overview.md)
* [Activator tutorial](activator-tutorial.md)
