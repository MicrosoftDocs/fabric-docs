---
title: Use custom actions to trigger Power Automate flows
description: Understand how to use custom actions to trigger Power Automate flows with Activator and achieve seamless integration between systems.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter, ignite-2024
ms.search.form: Data Activator Custom Actions
ms.date: 12/12/2024
#customer intent: As a Fabric user I want to learn to use custom actions to trigger Power Automate flows.
---

# Activate custom actions (Power Automate flows)

You can activate external systems with a [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule by defining custom actions with Power Automate. Custom actions can be useful for:

* Sending notifications using systems other than Teams and email.
* Creating action items in ticketing systems.
* Calling line-of-business apps.

To activate custom actions from your rules, first define a custom action by creating a Power Automate flow. Then, call your custom action from your Activator rule.

## Create a custom action

A custom action is a reusable action that you can use in multiple rules within [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] items. Creating a custom action requires familiarity with Power Automate. However, once you create a custom action, other [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] users can use the action in any rule, without requiring any knowledge of Power Automate.

A custom action defines how to call a specific external system from a rule using a flow. It defines a set of *input fields* to pass from your rules to the flow, so that the flow calls the external system. For example, suppose you want to define a custom action that adds a task to [Microsoft To Do](https://to-do.office.com/tasks/). The input field for such an action might be *Task name*. This custom action would link to a flow that uses a Microsoft To Do connector to create the task on your behalf.

### Name your action and add input fields

Open Activator and select a rule to display the **Definition** pane. Scroll down to **Action** > **Type**, and select **New custom action**. 

Then, give your action a name such as *Add a To Do task* and define the input fields (such as _Task name_).

:::image type="content" source="media/activator-trigger-power-automate-flows/activator-new-custom-action.png" alt-text="Screenshot of creating an Activator new custom action.":::

The next step is to define your flow in Power Automate. Select **Copy** to copy the connection string, then choose **Open flow builder**. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] takes you to Power Automate so that you can define the flow.

### Define your flow

The flow is prepopulated with an action for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)].

You must paste the connection string from the previous step into this action. Select the Power Automate tile that displays the **Invalid parameters** error. Then paste the connection string that you copied in the previous step. This removes the error message and allows you to continue building your flow. 

:::image type="content" source="media/activator-trigger-power-automate-flows/activator-automate.png" alt-text="Screenshot of defining a flow for activator.":::

1. Select the plus sign (+) to add a new step to the flow. 
1. Search for **To Do** and choose **Add a to-do (V3)**.
    :::image type="content" source="media/activator-trigger-power-automate-flows/activator-add-task.png" alt-text="Screenshot of defining a flow for activator.":::

1. Fill in the necessary fields in the **Add a to-do (V3)** window. Start by selecting the **To-do list** dropdown and choosing the **Tasks** field that we created in an ealier step. 

### Use properties and dynamic content in your flow

Optionally, insert an expression into the Inputs field. If you select an input field and see the **fx** icon, select it.

When you select a property, it is added into the text box. In the pop-up window that opens, select a function to start your expression. To complete your expression, place the cursor in the function, and then select Dynamic content. Search for or select the content/tokens to add, and then select Add. Your completed expression appears in the Inputs field.

You can now click on the property inside of the action card and open it up again for further editing.

1. In this example, select the dropdown for **To-do List** and select the **Tasks** value you created earlier. 
1. Insert expressions in the **Title** field by selecting the **Title** field and **fx**. 
1. In the **Function** tab, search for utcNow() and add it. By adding a date to the title, you might avoid duplicate names. 
1. Still in the Function tab, search for **triggerBody** and select it. In the editing field, add one of the custom properties to update this field dynamically.  

    :::image type="content" source="media/activator-trigger-power-automate-flows/activator-edit-fx.png" alt-text="Screenshot of the Function tab's editing screen.":::

1. Select **Add** > **Save**.
To learn more about Power Automate, see [Power Automate](/power-automate).

1. Optionally, select **Test** from the menu bar to force the flow to run. 

### Complete your custom action

After you save your flow, return to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. Upon successful saving of the flow, you see a confirmation box in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. At this point, your custom action is complete, and you may move on to the next step, [calling your custom action from a rule](#call-your-custom-action-from-a-rule).

:::image type="content" source="media/activator-detection-conditions/data-activator-detection-conditions-07.png" alt-text="Screenshot of custom action completion for activator.":::

## Call your custom action from a rule

Once you create a custom action, it's available for use by all rules and users who have access to the activator item you defined in the custom action. To call your custom action, from a rule, select **Action** > **Type** from the **Definition** pane, and select your custom action from the list. 

:::image type="content" source="media/activator-trigger-power-automate-flows/activator-type-list.png" alt-text="Screenshot of the Type dropdown showing the newly created action.":::

Select the action to see the **Definiton** pane for your custom action. Then select **Edit action** to see the entry fields for your rule. Fill them out as appropriate for your rule definition:

:::image type="content" source="media/activator-trigger-power-automate-flows/activator-edit-action.png" alt-text="Screenshot of custom action input for activator.":::

When your rule activates, it calls your flow, sending it the values of the input fields that you defined.

## Related content

* [Get started with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-get-started.md)
* [Create [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rules in design mode](activator-create-activators.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../get-started/microsoft-fabric-overview.md)
