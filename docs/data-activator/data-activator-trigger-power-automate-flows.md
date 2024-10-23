---
title: Use custom actions to trigger Power Automate flows
description: Understand how to use custom actions to trigger Power Automate flows with Data Activator and achieve seamless integration between systems.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.search.form: Data Activator Custom Actions
ms.date: 09/18/2024
#customer intent: As a Fabric user I want to learn to use custom actions to trigger Power Automate flows.
---

# Activate custom actions (Power Automate flows)

You can activate external systems with a Data Activator rule by defining custom actions with Power Automate. Custom actions can be useful for:

* Sending notifications using systems other than Teams and email.
* Creating action items in ticketing systems.
* Calling line-of-business apps.

To activate custom actions from your rules, first define a custom action by creating a Power Automate flow. Then, call your custom action from your rule.

> [!IMPORTANT]
> Data Activator is currently in preview.

## Create a custom action

A custom action is a reusable action template that you can use in multiple rules within an activator items. Creating a custom action requires familiarity with Power Automate. However, once you create a custom action, other Data Activator users can use the action in any rule, without requiring any knowledge of Power Automate.

A custom action defines how to call a specific external system from a rule using a flow. It defines a set of *input fields* to pass from your rules to the flow, so that the flow can call the external system. For example, suppose you want to define a custom action that adds a task to [Microsoft To Do](https://to-do.office.com/tasks/). The input fields for such an action might be *Task name*. This custom action would link to a flow that uses a Microsoft To Do connector to create the task on your behalf.

### Name your action and add input fields

To create a custom action, select **Custom action** from the Home tab or select **New custom action** in the Action type drop down. 

Then, give your action a name such as *Add a To Do task* and define the input fields (such as _Task name_).

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-condition-05.png" alt-text="Screenshot of creating a Data Activator new custom action.":::

The next step is to define your flow in Power Automate. Select **Copy** to copy the connection string, then choose **Open flow builder****.** Data Activator takes you to Power Automate so that you can define the flow.

### Define your flow

The flow is prepopulated with an action for Data Activator.

> [!IMPORTANT]
> You must paste the connection string from the previous step into this action, as shown in the following screenshot. Select **When a Data Activator rule activates** and paste the connection string as shown in the following screenshot. Once you do so, add further steps to your flow as needed, and save the flow.
:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-06.png" alt-text="Screenshot of defining a flow for data activator.":::

To access your custom input fields in the flow, on the field you want to customize input click on **fx**. 

Replace NAME\_OF\_INPUT\_FIELD with the name of your input field and click **Add**. You can browse and select additional properties in the **Dynamic content** tab.

```json
triggerBody()?['customProperties/NAME_OF_INPUT_FIELD']
```

### Complete your custom action

After you save your flow, return to Data Activator. Upon successful saving of the flow, you see a confirmation box in Data Activator. At this point, your custom action is complete, and you may move on to the next step, [calling your custom action from a trigger](#call-your-custom-action-from-a-trigger). 

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-07.png" alt-text="Screenshot of custom action completion for data activator.":::

## Call your custom action from a trigger

Once you create a custom action, it's available for use by all rules and users who have access to the activator item which you defined the custom action. To call your custom action, from a rule, select action **Type** from the definition pane, and select your custom action from the list:

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-08.png" alt-text="Screenshot of calling a custom action for Data Activator.":::

You then see the input fields for your custom action. Fill them out as appropriate for your rule definition:

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-09.png" alt-text="Screenshot of custom action input for data activator.":::

When your rule activates, it calls your flow, sending it the values of the input fields that you defined.

## Related content

* [Get started with Data Activator](data-activator-get-started.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
