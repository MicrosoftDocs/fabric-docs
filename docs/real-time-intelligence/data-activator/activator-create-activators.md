---
title: Create Activator Rules
description: Learn how to create rules for Fabric Activator. Rules take action on your data, such as sending notifications and starting automated workflows. 
ms.topic: how-to
ms.search.form: Data Activator Rule Creation
ms.date: 04/17/2026
ai-usage: ai-assisted
#customer intent: As a new Activator user, I want learn how to create a rule so that I can receive notifications about my streaming data or trigger automated workflows.
---

# Create a rule in Fabric Activator

When you bring streaming data into an activator or [assign events to objects](activator-assign-data-objects.md#assign-data-to-objects-in-activator), you can create rules to act on your data. The activation of those rules can be the sending of a notification, such as an email or Teams message. The activation of those rules can also trigger a workflow, such as starting a Power Automate flow.

Activator rules can also trigger actions based on Fabric events and Azure Blob Storage events received through Eventstream, enabling event-driven orchestration. For example, you can start Spark jobs or Dataflows when files land in a blob container. For more information on connecting event sources, see [Add a Fabric Activator destination to an eventstream](../event-streams/add-destination-activator.md).

## Prerequisites

- A workspace with a Microsoft Fabric-enabled capacity.

## Open Activator

> [!TIP]
> Alert creation and rule management are also embedded directly within Fabric Eventstream. You can author and manage Activator rules in-context while configuring event streams, without switching to a separate Activator experience.

Start by opening Fabric in your browser.

From the nav pane, select **Create** > **Activator**. If you don't see **Create**, select the ellipses (...) to display more options.

Select **Try sample** to create an activator that's prepopulated with sample events and objects.

## Define a rule condition and action

Use **Rules** to specify the values you want to monitor in your events, the conditions you want to detect, and the actions you want [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to take.

### Select your rule data

In the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] Explorer, select the property or eventstream to monitor in your rule. For information about properties, see the [Create properties](#create-properties) section.

After you select a property or eventstream, you see a preview of the values for a sample of the instances of the object.

> [!NOTE]
> Activator can also monitor published Power BI reports and notify you when a new row appears in a table visual. You configure this monitoring from the Power BI service. The resulting rule can trigger the same actions (email, Teams, Fabric item, or Power Automate). For more information, see [Create an alert in Power BI report](activator-get-data-power-bi.md).
>
> Activator supports creating rules on Fabric Data Warehouse SQL query results (preview). These rules evaluate a SQL query on a configurable schedule and trigger actions when conditions are met, enabling periodic monitoring of warehouse data.

### Make a new Activator rule

To create a new rule, select the stream you just added. You see a **Create rule** pane on the right side. The **Monitor** section of the rule is prepopulated with the data stream that you selected.

### Define the condition to detect

Next, choose the type of condition that you want to detect. You can use conditions that check:

- On each event, perform an action.
- On each event when a value is met, perform an action.
- On each event grouped by a field, perform an action (for example, on each PackageId event when Temperature is greater than 30)

Finally, select whether you want the action to send you an email or send you a Teams message, and select **Create**. You can modify the conditions and actions later.

The charts in the **Definition** tab update to show a sample of the events that meet the conditions that you set.

:::image type="content" source="media/activator-create-activators/activator-create-triggers-design-mode-05.png" alt-text="Screenshot of a detect card showing two charts." Lightbox="media/activator-create-activators/activator-create-triggers-design-mode-05.png":::

If you go to the **Analytics** tab, you see two charts. The first chart shows the total number of times the rule fired, for all object IDs that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is tracking. Use this chart to understand the volume of notifications that fired over all object IDs. The second chart shows the total number of times the rule activated, for the five object IDs. Use this chart to better understand if particular object IDs contribute the most to all the activations that fire.

### Define the action to take

Finally, use the **Action** section to choose what to do when the condition is detected.

:::image type="content" source="media/activator-create-activators/data-activator-create-triggers-design-mode-06.png" alt-text="Screenshot of selecting an action when a condition is detected.":::

Here are the supported action types:

- **Email** - Send an email to the specified recipients.
- **Teams** - Send a Teams message to specified recipients, group chat, or channel.
- **Fabric item** - Execute the selected Fabric pipeline, Fabric notebook, Fabric Spark Job Definition, Fabric Dataflow, or Fabric User Data Function. Use these actions to implement event-driven pipelines. For more information, see [Trigger Fabric items](activator-trigger-fabric-items.md).

- **Custom action** - Activate a Power Automate flow.

:::image type="content" source="media/activator-create-activators/actions.png" alt-text="Screenshot of the Action section in the Activator user interface." lightbox="media/activator-create-activators/actions.png":::

Different action types have different parameters. Some of those parameters include the email address you want to send to, the Teams channel or group chat, the workflow you want to start, the subject line, or additional information (**context**). For **Context**, you can select the additional properties to include in the alert message.

You can also tag properties by entering `@` to add context to the actions you send. For example: `@bikeId`.

If you summarize on the property in the Monitor card, the action sends the original value of the property rather than the summarized value.

Select **Edit action** to see an editor with a preview of the message that the action sends and options to add more information to the action.

## Test your rule

After you create a rule, test it by selecting **Send me a test alert**. Selecting this button finds a past event for which the rule activation is *true* and sends you an alert so that you can see what the alert looks like for that event.  

- The test alert always goes to you, regardless of the recipient field in the **Action** card.
- The **Send me a test alert** option is only enabled if you have at least one past event for which the rule condition is true.

## Start and stop your rule

Rules are created in a *Stopped* state. This state means the system isn't evaluating the rule as data flows into the system, and the rule doesn't take any actions as a result. After you define the rule, select **Save and start** to make the rule active. If you're not ready to start your rule, save it and come back later. When you're ready, select **Start** from the toolbar for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to start running the trigger and taking action.

:::image type="content" source="media/activator-create-activators/activator-create-triggers-design-mode-09.png" alt-text="Screenshot of starting an alert.":::

Once started, you see *Running* in the title area of the rule card. Also, the icon in the Explorer shows that the rule is running. When you start the rule, new activations start running against new ingested data. Your rule doesn't activate on data that already ingested. To stop the alert, select **Stop**.

If you make changes to the rule (for example, change the condition it looks for), select **Update** in the toolbar to make sure that the running rule uses the new values.

When you delete a rule (or object), it can take up to five minutes for any back-end processing of data to complete. Deleted rules might continue to monitor data, and take actions accordingly, for a few minutes after you delete them.

## Create properties

Sometimes, you need to reuse rule logic across multiple rules. Create a property to define a reusable condition or measure, and then reference that property from multiple rules.

To create a property, select the stream you added to the object that you're interested in, select **New Property** from the ribbon, and then select the property you'd like to use in the rule logic.

:::image type="content" source="media/activator-create-activators/activator-create-triggers-design-mode-10.png" alt-text="Screenshot of creating a property for an alert.":::

After you define a property, you can reference it from one or more rules. In this example, you reference the *Temperature* property *Too hot for medicine*.

:::image type="content" source="media/activator-create-activators/activator-create-triggers-design-mode-11.png" alt-text="Screenshot of package too warm property for an alert." lightbox="media/activator-create-activators/activator-create-triggers-design-mode-11.png":::

## Clean up resources

Delete the sample eventstream by selecting the ellipses (...) to the right of the **Package delivery events** eventstream, and selecting **Delete**.

## Next step

> [!div class="nextstepaction"]
> [Activator tutorial](activator-tutorial.md)

## Related content

- [Overview of Activator rules](activator-rules-overview.md)
- [Activator tutorial](activator-tutorial.md)
