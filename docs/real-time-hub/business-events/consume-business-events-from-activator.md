---
title: Consume Business Events from Activator
description: Learn how to consume business events from Activator, a platform that provides real-time insights into customer behavior and preferences.
ms.date: 03/02/2026
ms.topic: how-to
---

# Consume business events from Activator

This article describes how to set alerts on business events in Real-Time hub. 

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](../includes/navigate-to-real-time-hub.md)] 

## Launch the Set alert page 

Follow the steps in one of the following sections. Each section opens a side panel where you can configure the following options:

* Events you want to monitor.
* Conditions you want to look for in the events.
* Action you want Activator to take.

### Using the events list

1. In Real-Time hub, select **Business events**.

1. If you don't have any business events, see the [Create event schema sets](../../real-time-intelligence/schema-sets/create-manage-event-schemas.md) article to create event schema sets first. After you have event schema sets, you can select business events under the event schema sets to set alerts on. 

1. Move the mouse over your target **Business events**, and do one of the following steps:

    * Select the **Set alert** button.
    * Select ellipsis (...), and select **Set alert**.

    :::image type="content" source="media/consume-business-event/set-alert-business-event.png" alt-text="Screenshot of the set alert options for the business event." lightbox="media/consume-business-event/set-alert-business-event.png":::

### Using the event detail page

1. Select the target business event from the list.

1. On the detail page, select **Set alert** button in the upper toolbar.

:::image type="content" source="media/consume-business-event/set-alert-ribbon.png" alt-text="Screenshot of the Set alert button in the upper toolbar.":::

## Details section 

On the **Add rule** page, in the **Details** section, enter a name for the rule in the **Rule name** field.

:::image type="content" source="media/consume-business-event/set-alerts-name.png" alt-text="Screenshot of the set alert Name field." lightbox="media/consume-business-event/set-alerts-name.png":::

## Monitor section

On the **Set alert** page, follow these steps:

1. In the **Monitor** section, add business events to your rule or configure filters. To do this, select **Business events** in the **Source** field.

1. In the **Connect data source** wizard, complete these steps:
    1. For Business events, select the business events to change the selected business event types that you want to monitor. You can select up to 25 business events under the same event schema set.

    1. This step is optional. To see the schemas for event types, select **View schemas**. If you select it, browse through schemas for the events, and then navigate back to previous page by selecting the backward arrow button at the top.

    1. Add filters to set the filter conditions by selecting fields to watch and the alert value. To add a filter:
        1. Select **+ Filter**.
        1. Select a field.
        1. Select an operator.
        1. Select one or more values to match.
        1. Select **Next** at the bottom of the page.
        1. On the **Review + connect** page, review the settings, and select **Save**.

:::image type="content" source="media/consume-business-event/set-alerts-monitor.png" alt-text="Screenshot of the set alert Monitor section." lightbox="media/consume-business-event/set-alerts-monitor.png":::

## Condition section

In the **Condition** section, select **On each event** for the **Check** option.

:::image type="content" source="media/consume-business-event/set-alerts-condition.png" alt-text="Screenshot of the set alert Condition section." lightbox="media/consume-business-event/set-alerts-condition.png":::

## Action section

In the **Action** section, select one of the following actions:

### Email

To configure the alert to send an email when the condition is met, follow these steps:

1. For **Select action**, select **Send email**.

1. For **To**, enter the email address of the receiver or use the drop-down list to select a property whose value is an email address.

1. For **Subject**, enter a subject for the email.

1. For **Headline**, enter a headline for the email.

1. For **Notes**, enter notes for the emails.

    > [!NOTE]
    > When entering subject, headline, or notes, you can refer to properties in the data by typing @ or by selecting the button next to the text boxes. For example, `@BikepointID`.

1. For **Context**, select values from the drop-down list that you want to include in the context.

:::image type="content" source="media/consume-business-event/set-alerts-email.png" alt-text="Screenshot of the set Action with the email option selected." lightbox="media/consume-business-event/set-alerts-email.png":::

### Teams message

To configure the alert to send a Teams message to an individual or a group chat or a channel when the condition is met, follow these steps:

1. For **Select action**, select **Teams** -> **Message to individuals** or **Group chat message**, or **Channel post**.

1. Follow one of these steps depending on the option you selected in the previous step:

    * If you selected the **Message to individuals** option, enter **email addresses** of receivers or use the drop-down list to select a property whose value is an email address. When the condition is met, a Teams message is sent to specified individuals.

    * If you selected the **Group chat message** option, select a **group chat** from the drop-down list. When the condition is met, a message is posted to the group chat.

    * If you selected the **Channel post** option, select a **team** and a **channel**. When the condition is met, a message is posted in the channel.

1. For **Headline**, enter a headline for the Teams message.

1. For **Notes**, enter notes for the Teams message.

    > [!NOTE]
    > When entering headline or notes, you can refer to properties in the data by typing @ or by selecting the button next to the text boxes. For example, `@BikepointID`.

    When entering headline or notes, you can refer to properties in the data by typing @ or by selecting the button next to the text boxes. For example, `@BikepointID`.

1. For **Context**, select values from the drop-down list that you want to include in the context.

:::image type="content" source="media/consume-business-event/set-alerts-teams.png" alt-text="Screenshot of the set Action with the Teams option selected." lightbox="media/consume-business-event/set-alerts-teams.png":::

## Run Fabric activities 

To configure the alert to launch a Fabric pipeline, dataflow (preview), notebook, or Spark job when the condition is met, follow these steps:

:::image type="content" source="media/consume-business-event/set-alerts-fabric.png" alt-text="Screenshot of the Fabric activities in the Actions dropdown menu." lightbox="media/consume-business-event/set-alerts-fabric.png":::

1. For **Select action**, select the appropriate Fabric item type within the "Run Fabric Activities" section.

1. On **Select Fabric item to run**, select the Fabric item from the list.

1. For the **Pipeline**, **Dataflow**, **Notebook**, and **Spark job** types, select **Add parameter** and specify the name of the parameter for the Fabric item and a value for it. You can add more than one parameter.

If you selected **Run function** option, follow these steps:

1. For **Function**, select a function from the list.

1. For parameters to the function, specify values for each of the parameters defined for the function as shown in the following example:

You can use properties from the data by typing @ or by selecting the button next to the text boxes. For example, `@BikepointID`.

## Custom action

To configure the alert to call a custom action when the condition is met, follow these steps:

:::image type="content" source="media/consume-business-event/set-alerts-custom.png" alt-text="Screenshot of the custom action setup in the Actions dropdown menu." lightbox="media/consume-business-event/set-alerts-custom.png":::

1. For **Select action**, select **Create custom action**.

1. As mentioned in the **Action** section, create the rule first, and then complete the custom action setup by following steps from [Trigger custom actions (Power Automate flows)](../../real-time-intelligence/data-activator/activator-trigger-power-automate-flows.md).

1. After you create the custom action, in the **Definition** pane of the rule, select the custom action from the **Action** drop-down list.

## Save location section

In the **Save location** section, for **Workspace**, select the workspace where you want to create the Fabric activator item or select an existing workspace. If you're creating a new activator item, enter a **name** for the activator item.

:::image type="content" source="media/consume-business-event/set-alerts-save.png" alt-text="Screenshot of the save location section." lightbox="media/consume-business-event/set-alerts-save.png":::

### Create a rule

1. Select **Create** at the bottom of the page to create the rule.

1. You see the **Alert created** page with a link to open the rule in the Activator user interface in a separate tab. Select **Done** to close the **Alert created** page.

1. You see a page with the activator item created by the **Add rule** wizard. If you are on the **Business events** page, select your business event to see this page.

1. Move the mouse over the **Activator** item, and select **Open**.

1. You see the **Activator** item in the **Fabric Activator** editor user interface. Select the rule if it's not already selected. You can update the rule in this user interface. For example, update the subject, headline, or change the action from email to Teams message.

## Related articles

- [Business events overview](business-events-overview.md)
