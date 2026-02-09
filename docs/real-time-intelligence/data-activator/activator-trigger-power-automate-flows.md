---
title: Use custom actions to trigger Power Automate flows
description: Understand how to use custom actions to trigger Power Automate flows with Activator and achieve seamless integration between systems.
ms.topic: concept-article
ms.custom: FY25Q1-Linter, sfi-image-nochange
ms.search.form: Data Activator Custom Actions
ms.date: 12/12/2024
#customer intent: As a Fabric user I want to learn to use custom actions to trigger Power Automate flows.
---

# Trigger custom actions (Power Automate flows)

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

Then, give your action a name such as *Add a To Do task*. Define the input fields that you'd like to use later when creating a flow in Power Automate. You can pass [dynamic](#pass-an-input-field-to-your-flow) or hardcoded values to the Power Automate action with these input fields, such as *task name*, *assignee*, etc.

:::image type="content" source="media/activator-trigger-power-automate-flows/activator-new-custom-actions.png" alt-text="Screenshot of creating an Activator new custom action.":::

The next step is to define your flow in Power Automate. Select **Copy** to copy the connection string, then choose **Open flow builder**. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] takes you to Power Automate so that you can define the flow.

### Define your flow in Power Automate

The flow is prepopulated with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] as the triggering system.

You must paste the connection string from the previous step into this action. Select the Power Automate tile that displays the **Invalid parameters** error. Then paste the connection string that you copied in the previous step. This removes the error message and allows you to continue building your flow. 

:::image type="content" source="media/activator-trigger-power-automate-flows/activator-automate.png" alt-text="Screenshot of pasting the connection string.":::

#### Add an action to the flow

1. Select the plus sign (+) to add a new action to the flow.

1. In this example, we're adding a **To Do** task, so we search for **To Do** and choose **Add a to-do (V3)**.

    :::image type="content" source="media/activator-trigger-power-automate-flows/activator-add-task.png" alt-text="Screenshot of defining a flow for activator.":::

1. Fill in the necessary fields in the **Add a to-do (V3)** window. Start by selecting an existing list from the **To-do list** dropdown or choosing **Enter a custom value** and giving a new To Do list a name. 

Optionally, insert an expression into the input fields. If you select an input field and see an **fx** icon, that means that the field supports functions and dynamic content. Let's add dynamic content to the **Title** input field and pass a function in the **Body Content** input field. 

### Use dynamic content in your flow

**Dynamic content** lets you add fields from the Activator event itself. Select the field from the dropdown to dynamically pass it to the flow. 

1. With your cursor in the **Title** field, select **fx**.
1. Select the **Dynamic content** tab.  
    When you select dynamic content, it's added into the text box.
1. Add the date and time using **Activation time**. When you select **Add**, the expression appears in the **Title** field. Hover over **Activation time** to see what information is being passed. By adding a date to the title, you might avoid duplicate names.
1. Optionally, remove **DefaultToDo** placeholder text and replace it with something more meaningful, such as **Temperature task**.


#### Pass an input field to your flow

1. Move your cursor into the **Body Content** field, select **fx**.
1. Search for the **triggerBody** function or copy and paste this function: `triggerBody()?['customProperties/NAME_OF_INPUT_FIELD']`. Replace **NAME_OF_INPUT_FIELD** with one of the **Input fields** that you created earlier. In this example, we use *Task name*.

    You can use any predefined input field you create in Power Automate functions. 

    :::image type="content" source="media/activator-trigger-power-automate-flows/activator-edit-fx.png" alt-text="Screenshot of the Function tab's editing screen.":::
   
1. Select **Add** > **Save**. It might take a few minutes to save.

1. Optionally, select **Test** from the menu bar to force the flow to run. 

To learn more about Power Automate, see [Power Automate](/power-automate).

### Complete your custom action

After you save your flow, return to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. 

:::image type="content" source="media/activator-trigger-power-automate-flows/activator-to-do-success.png" alt-text="Screenshot showing success screen in Activator.":::

## Call your custom action from a rule

Once you create a custom action, it's available for use by all rules and users who have access to the activator item you defined in the custom action. To call your custom action, from a rule, select the rule and choose **Action** > **Type** from the **Definition** pane, and select your custom action from the list. 

:::image type="content" source="media/activator-trigger-power-automate-flows/activator-type-list.png" alt-text="Screenshot of the Type dropdown showing the newly created action.":::

Select **Edit action** to see the entry fields for your rule. Fill them out as appropriate for your rule definition:

When your rule activates, it calls your flow, sending it the values of the input fields that you defined. Since we asked our flow to update a To Do list, open Microsoft To Do to see the new task. 

:::image type="content" source="media/activator-trigger-power-automate-flows/activator-to-do-pane.png" alt-text="Screenshot of the Microsoft To Do screen showing the new tasks.":::

## Related content

* [Create [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rules in design mode](activator-create-activators.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)

